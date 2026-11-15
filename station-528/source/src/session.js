/* Session layer: today's queues, successive relearning, first-attempt scoring, intake selection.
   Pure functions over plain objects; the UI persists them. */
'use strict';

const GAP = 5;                 /* at least 5 other items between repeats of a card (§6.2) */
const NEW_CRITERION = 3;       /* new cards: 3 correct recalls in the session */
const LAPSE_CRITERION = 1;     /* lapsed cards: 1 correct recall */

/* Rounds queue for a day: capped due list (lowest R first) + echo probes. Mutates deferred cards. */
function buildRounds(cardList, today, now, cap, T, isHY, sweepDone) {
  let swept = 0;
  if (!sweepDone && today >= T - 60) swept = finalSweep(cardList, today, T, isHY);
  const { take, rest } = applyCap(cardList, today, now, cap);
  const ids = take.map(c => c.id);
  for (const c of echoesDue(cardList, today)) if (!ids.includes(c.id)) ids.push(c.id);
  return { queue: ids.map(id => ({ id, kind: 'review' })), deferred: rest.length, swept, taken: take.length };
}

/* New cards for today: blocked by unit within each course (concepts are introduced in blocks
   before any interleaving), courses taken in turn, and every 5th pick a reasoning (Skill 2+) item.
   focus (delta v2 D16): an optional wing id; up to half of today's new cards come from it first. */
function pickIntake(items, cards, openUnits, quota, unitOrder, focus) {
  if (quota <= 0) return [];
  const fresh = items.filter(it => openUnits.includes(it.unit) && it.status === 'active' && /* only cross-checked items (spec §8.3) */ (!cards[it.id] || cards[it.id].state === 'new') && !(cards[it.id] && cards[it.id].suspended));
  if (focus == null) return pickBlocks(fresh, quota, unitOrder);
  const first = pickBlocks(fresh.filter(it => it.fc === focus), Math.ceil(quota / 2), unitOrder);
  const taken = new Set(first);
  return first.concat(pickBlocks(fresh.filter(it => !taken.has(it.id)), quota - first.length, unitOrder));
}
function pickBlocks(fresh, quota, unitOrder) {
  if (quota <= 0) return [];
  const byCourse = {};
  for (const it of fresh) (byCourse[unitOrder[it.unit].course] = byCourse[unitOrder[it.unit].course] || []).push(it);
  for (const k in byCourse) byCourse[k].sort((a, b) => unitOrder[a.unit].i - unitOrder[b.unit].i);
  const courses = Object.keys(byCourse).sort();
  const picked = [];
  let ci = 0, guard = 0;
  while (picked.length < quota && courses.some(c => byCourse[c].length) && guard++ < 10000) {
    const c = courses[ci % courses.length]; ci++;
    const pool = byCourse[c]; if (!pool.length) continue;
    /* take a small block (up to 3) from the front unit of this course */
    const unit = pool[0].unit;
    for (let k = 0; k < 3 && picked.length < quota; k++) {
      const wantReasoning = (picked.length % 5) === 4;
      let idx = pool.findIndex(it => it.unit === unit && (wantReasoning ? it.sk >= 2 : true));
      if (idx < 0) idx = pool.findIndex(it => it.unit === unit);
      if (idx < 0) break;
      picked.push(pool.splice(idx, 1)[0].id);
    }
  }
  return picked;
}

/* After an attempt, decide whether the card comes back this session.
   st: the card's session record {correct, isNew, lapsed}. Returns the reinsertion index or -1. */
function requeueIndex(st, queueLenAfterRemoval) {
  const need = st.isNew ? NEW_CRITERION : (st.lapsed ? LAPSE_CRITERION : 0);
  if (st.correct >= need) return -1;
  return Math.min(GAP, queueLenAfterRemoval);
}

/* Record one attempt. sess: {queue, scored: {id:true}, stats, cardSess: {id: {correct, isNew, lapsed, attempts}}}.
   Returns {first, cbm, grade, criterionMet, back}. */
function recordAttempt(sess, id, attempt, grade) {
  const cs = sess.cardSess[id] || (sess.cardSess[id] = { correct: 0, isNew: !!attempt.wasNew, lapsed: false, attempts: 0, c3miss: false });
  cs.attempts++;
  const first = !sess.scored[id];
  if (first) sess.scored[id] = true;
  const ok = attempt.correct && attempt.conf !== 0;
  if (ok) cs.correct++;
  else { if (!cs.isNew) cs.lapsed = true; }
  if (!ok && attempt.conf === 3 && first) cs.c3miss = true;
  const pts = first ? cbmPoints(ok, attempt.conf) : 0;
  const s = sess.stats;
  s.attempts++;
  if (first) {
    s.first++; s.cbm += pts; if (ok) s.firstCorrect++;
    if (attempt.conf >= 1) { const b = s.calib[attempt.conf] || (s.calib[attempt.conf] = { n: 0, correct: 0 }); b.n++; if (ok) b.correct++; }
    if (!ok && attempt.conf === 3) s.c3err.push(id);
  }
  /* pull the card off the front of the queue and maybe reinsert it */
  const qi = sess.queue.findIndex(q => q.id === id);
  if (qi >= 0) sess.queue.splice(qi, 1);
  const at = requeueIndex(cs, sess.queue.length);
  if (at >= 0) sess.queue.splice(at, 0, { id, kind: cs.isNew ? 'relearn-new' : 'relearn' });
  const criterionMet = at < 0 && (cs.lapsed || cs.c3miss || cs.isNew);
  if (at < 0 && (cs.lapsed || cs.c3miss)) s.backToCriterion++;
  return { first, cbm: pts, grade, criterionMet, back: at >= 0 };
}

function newSession(kind, day, queue) {
  return { kind, day, queue, scored: {}, cardSess: {}, startedAt: Date.now(), done: false,
    id: kind + '-' + day + '-' + Math.random().toString(36).slice(2, 7), block: { n: 1, ms: 0, lastAt: null },
    stats: { attempts: 0, first: 0, firstCorrect: 0, cbm: 0, gain: 0, calib: {}, c3err: [], backToCriterion: 0, newLearned: 0, pm: {} } };
}

/* Delta v2 D14 blocks: count answering time (gaps capped at 3 min; a 10+ min gap starts a fresh block).
   A block is done after about 20 minutes. Returns true when the block just filled up. */
const BLOCK_MS = 20 * 60000, IDLE_MS = 10 * 60000, GAP_CAP_MS = 3 * 60000;
function tickBlock(sess, nowMs, answerMs) {
  const b = sess.block || (sess.block = { n: 1, ms: 0, lastAt: null });
  const gap = b.lastAt == null ? answerMs : nowMs - b.lastAt;
  if (b.lastAt != null && gap > IDLE_MS) { b.n++; b.ms = Math.min(answerMs, GAP_CAP_MS); }
  else b.ms += Math.min(gap, GAP_CAP_MS);
  b.lastAt = nowMs;
  return b.ms >= BLOCK_MS;
}
function nextBlock(sess, nowMs) { const b = sess.block || (sess.block = { n: 0 }); b.n++; b.ms = 0; b.lastAt = nowMs; }
