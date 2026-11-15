/* Tutor pack: a Markdown file the player can hand to any AI chat for tutoring.
   It holds study data only: misses with the player's own answers, the keys and the cards' explanations,
   weak units, calibration and flagged keys, plus optional instructions for the tutor.
   Pure: everything comes in through `inp`, so it can be tested without a browser. */

const TYPE_LABEL = { typed: 'typed recall', num: 'number', choice: 'multiple choice', gen: 'calculation (new numbers each time)' };
const PM_TEXT = { misread: 'misread it', content: "didn't know it", reasoning: 'reasoning slip', trap: 'fell for a trap', careless: 'careless' };
const BET = { 1: 'Unsure', 2: 'Fairly sure', 3: 'Sure' };
const TUTOR_MAX_ITEMS = 40;

function answerOf(it) {
  if (it.type === 'choice') return it.options[0];
  if (it.type === 'typed') { const a = it.accepted[0]; return SHOW[it.id] || a[0].toUpperCase() + a.slice(1); }
  if (it.type === 'num') return `${it.num.value}${it.num.unit ? ' ' + it.num.unit : ''}`;
  return null;
}
const oneLine = s => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const quote = s => `"${oneLine(s).replace(/"/g, "'")}"`;

/* Walk the log in order: appeals void the miss they overturned; post-mortems attach to the latest miss. */
function tutorAttempts(logs) {
  const out = [], lastWrong = {};
  for (const l of logs) {
    if (l.mode === 'rounds' || l.mode === 'intake' || l.mode === 'echo') {
      const a = Object.assign({}, l); out.push(a);
      if (!l.correct) lastWrong[l.itemId] = a;
    } else if (l.mode === 'appeal') { const w = lastWrong[l.itemId]; if (w) { w.voided = true; delete lastWrong[l.itemId]; } }
    else if (l.mode === 'postmortem') { const w = lastWrong[l.itemId]; if (w) w.postMortem = l.postMortem; }
  }
  return out.filter(a => !a.voided);
}

const TUTOR_INSTRUCTIONS = `## Instructions for the tutor

You're tutoring a college student preparing for the MCAT. This file comes from Station 528, a spaced-repetition study app that schedules their reviews, so don't build a study schedule. Your job is understanding: fix the ideas behind the misses below.

How to tutor:
1. **Start by asking which area they want to work on**, or suggest the top one from "Where to start". Work on one concept at a time.
2. **Make them retrieve before you explain.** Open each topic with a short question and let them answer before teaching. Never give the answer to a question you've just asked until they've tried.
3. **Go after the misconception, not the fact.** Their wrong answers are listed. Work out what belief would produce that answer, name it, and show why it fails. Misses they bet "Sure" on matter most: confident errors are very fixable but tend to creep back, so revisit them later in the session.
4. **Use their own diagnosis.** Each confident miss may carry their label: misread, didn't know it, reasoning slip, fell for a trap, careless. Misreads call for slowing down on the question stem; missing content needs teaching; trap answers need practice spotting why a tempting option is wrong.
5. **Ask them to explain.** Have them say why an answer is right and why each tempting alternative is wrong. Push for the mechanism ("why does that happen?").
6. **For calculations**, show one fully worked example, then give a similar problem with fewer steps shown, then one they solve alone.
7. **Contrast look-alikes.** When two ideas get confused, put them side by side and quiz the difference.
8. **Keep it at MCAT level.** Stay inside the AAMC content outline; skip detail beyond it.
9. **If an answer key here looks wrong or ambiguous, say so** and explain why. The student can flag it in the app.
10. **Wrap up** with 3 to 5 short questions mixing today's topics, then a two-line summary of what to keep reviewing.

Be concise and conversational. Ask one question at a time.
`;

/* inp: { logs, cards, items (id→item), units (id→unit), courses (id→course), flags, today, examDay, phase,
   openUnits, rangeStart (day index or null for everything), rangeLabel, instructions, now } */
function tutorPack(inp) {
  const { items, cards, units, courses, today: t, now: nowMs } = inp;
  const inRange = l => inp.rangeStart == null || dayOf(l.ts) >= inp.rangeStart;
  const all = tutorAttempts(inp.logs.slice().sort((a, b) => a.ts - b.ts));
  const att = all.filter(inRange).filter(a => items[a.itemId]);
  const first = att.filter(a => a.firstAttempt);
  const studyDays = new Set(att.map(a => dayOf(a.ts))).size;
  const fmtD = ms => new Date(ms).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const pctS = x => Math.round(100 * x) + '%';
  const unitName = id => { const u = units[id]; return u ? `${u.name} (${courses[u.course] ? courses[u.course].name : u.course})` : id; };

  /* misses, grouped by card */
  const byItem = {};
  for (const a of att) {
    const g = byItem[a.itemId] = byItem[a.itemId] || { id: a.itemId, tries: 0, right: 0, misses: [] };
    g.tries++; if (a.correct) g.right++; else g.misses.push(a);
  }
  const missed = Object.values(byItem).filter(g => g.misses.length);
  const weight = g => g.misses.reduce((s, m) => s + ({ 3: 4, 2: 2, 1: 1 }[m.confidence] || 1), 0);
  missed.sort((a, b) => weight(b) - weight(a) || b.misses.length - a.misses.length || b.misses[b.misses.length - 1].ts - a.misses[a.misses.length - 1].ts);

  /* units: first-attempt accuracy in range, plus current recall of their cards */
  const ust = {};
  for (const a of first) { const u = items[a.itemId].unit, s = ust[u] = ust[u] || { n: 0, right: 0, sureMiss: 0 }; s.n++; if (a.correct) s.right++; else if (a.confidence === 3) s.sureMiss++; }
  const unitRows = Object.entries(ust).filter(([, s]) => s.n >= 3).map(([u, s]) => {
    const cs = Object.values(cards).filter(c => items[c.id] && items[c.id].unit === u && c.state === 'review' && !c.suspended);
    const rec = cs.length ? cs.reduce((x, c) => x + rNow(c, nowMs), 0) / cs.length : null;
    return { u, acc: s.right / s.n, n: s.n, sureMiss: s.sureMiss, rec };
  }).sort((a, b) => a.acc - b.acc || b.sureMiss - a.sureMiss);

  /* calibration from first attempts in range */
  const cal = {};
  for (const a of first) if (a.confidence >= 1 && a.confidence <= 3) { const b = cal[a.confidence] = cal[a.confidence] || { n: 0, correct: 0 }; b.n++; if (a.correct) b.correct++; }
  const calc = calibration(cal);
  const pms = {}; for (const a of att) if (a.postMortem) pms[a.postMortem] = (pms[a.postMortem] || 0) + 1;

  const active = Object.values(cards).filter(c => c.state === 'review' && !c.suspended && items[c.id]);
  const exRecall = active.length ? active.reduce((x, c) => x + rExam(c, inp.examDay), 0) / active.length : null;

  const L = [];
  L.push(`# Station 528 tutor pack`, '');
  L.push(`MCAT study data for an AI tutor. Generated ${dateOfDay(t)}; covers ${inp.rangeLabel}.`, '');
  if (inp.instructions) L.push(TUTOR_INSTRUCTIONS);
  L.push(`## The student`, '');
  L.push(`- Exam date: ${dateOfDay(inp.examDay)} (${inp.examDay - t} days away), study phase ${inp.phase}.`);
  L.push(`- Cards in regular review: ${active.length}. Projected recall on exam day if they stopped reviewing now: ${exRecall == null ? 'n/a' : pctS(exRecall)}.`);
  L.push(`- Units opened so far (what their classes have covered): ${inp.openUnits.length ? inp.openUnits.map(id => units[id] ? units[id].name : id).join('; ') : 'none yet'}.`);
  L.push(`- In this period: ${att.length} answers on ${studyDays} study day${studyDays === 1 ? '' : 's'}; ${first.length} first tries, ${first.filter(a => a.correct).length} right.`, '');
  L.push(`How the app works, so the data makes sense: the student types answers (or picks from options shown only after they've thought) and bets on each first try: Unsure (right less than 2 in 3 times), Fairly sure (2 to 4 in 5), or Sure (at least 4 in 5). Each card is a short MCAT fact, concept or calculation.`, '');

  /* where to start */
  L.push(`## Where to start`, '');
  if (!att.length) L.push(`No answers in this period yet.`, '');
  else {
    const top = [];
    const sure = missed.filter(g => g.misses.some(m => m.confidence === 3));
    if (sure.length) top.push(`${sure.length} card${sure.length === 1 ? ' was' : 's were'} missed while betting Sure. Start there (marked ★ below).`);
    const weakU = unitRows.filter(r => r.acc < 0.7).slice(0, 3);
    if (weakU.length) top.push(`Weakest units: ${weakU.map(r => `${units[r.u] ? units[r.u].name : r.u} (${pctS(r.acc)} right first try)`).join('; ')}.`);
    const calcMiss = missed.filter(g => items[g.id].type === 'gen' || items[g.id].type === 'num').length;
    if (calcMiss) top.push(`${calcMiss} calculation card${calcMiss === 1 ? '' : 's'} missed: worth one worked example each.`);
    const nBets = Object.values(cal).reduce((a, b) => a + b.n, 0);
    if (nBets >= 20 && calc.overconfidence != null && calc.overconfidence > 0.1) top.push(`They tend to bet higher than their accuracy (overconfidence index +${Math.round(calc.overconfidence * 100)} points). Ask "how sure are you?" before revealing answers.`);
    if (!top.length) top.push(`Few misses in this period. Probe understanding with "why" questions on recent units instead.`);
    top.forEach((x, i) => L.push(`${i + 1}. ${x}`));
    L.push('');
  }

  /* missed cards */
  if (missed.length) {
    L.push(`## Missed cards`, '');
    L.push(`Most important first. ★ means at least one miss came with a "Sure" bet. "Their answers" are exactly what they typed or picked.`, '');
    missed.slice(0, TUTOR_MAX_ITEMS).forEach((g, i) => {
      const it = items[g.id], last = g.misses[g.misses.length - 1], star = g.misses.some(m => m.confidence === 3) ? '★ ' : '';
      const card = cards[g.id];
      L.push(`### ${i + 1}. ${star}${unitName(it.unit)}`);
      L.push(`AAMC category ${it.cat} · ${TYPE_LABEL[it.type] || it.type}${it.sk >= 2 ? ' · reasoning item' : ''}`, '');
      if (it.type === 'gen') {
        const withPrompt = g.misses.filter(m => m.prompt).pop();
        if (withPrompt) {
          L.push(`**Question (the version they missed):** ${oneLine(withPrompt.prompt)}`);
          L.push(`**Correct answer:** ${withPrompt.value != null ? sig(withPrompt.value, 3) + (withPrompt.unit ? ' ' + withPrompt.unit : '') : 'see the worked solution'}`);
          if (withPrompt.expl) L.push(`**Card's worked solution:** ${oneLine(withPrompt.expl)}`);
        } else {
          L.push(`**Problem type:** ${oneLine(it.title)} (numbers change each time; this miss was logged before the app saved the exact question).`);
          if (last.value != null) L.push(`**Correct answer to the version they missed:** ${sig(last.value, 3)}`);
        }
      } else {
        L.push(`**Question:** ${oneLine(last.alt && it.alt ? it.alt : it.prompt)}`);
        if (it.type === 'choice') {
          L.push(`**Options:** ${it.options.map((o, k) => `${k === 0 ? '(correct) ' : ''}${oneLine(o)}`).join(' | ')}`);
        }
        L.push(`**Correct answer:** ${oneLine(answerOf(it))}${it.type === 'typed' && it.accepted.length > 1 ? ` (also accepted: ${it.accepted.slice(1, 5).join(', ')})` : ''}${it.type === 'num' && (it.num.tol != null || it.num.tolPct != null) ? ` (within ${it.num.tol != null ? '±' + it.num.tol : '±' + it.num.tolPct + '%'})` : ''}`);
      }
      const ans = g.misses.slice(-4).map(m => `${m.response ? quote(m.response) : "\"I don't know\""} (${m.confidence ? BET[m.confidence] : 'no bet'}, ${fmtD(m.ts)}${m.postMortem ? `; their label: ${PM_TEXT[m.postMortem]}` : ''})`);
      L.push(`**Their answers:** ${ans.join('; ')}`);
      if (it.type === 'choice') {
        const picked = [...new Set(g.misses.map(m => it.options.indexOf(m.response)).filter(k => k > 0))];
        for (const k of picked) if (it.lures && it.lures[k - 1]) L.push(`**Why "${oneLine(it.options[k])}" is wrong (card's note):** ${oneLine(it.lures[k - 1])}`);
      }
      if (it.type !== 'gen' && it.expl) L.push(`**Card's explanation:** ${oneLine(it.expl)}`);
      L.push(`**Record in this period:** ${g.right} of ${g.tries} right${card && card.lapses ? ` · missed ${card.lapses} time${card.lapses === 1 ? '' : 's'} overall` : ''}`, '');
    });
    if (missed.length > TUTOR_MAX_ITEMS) L.push(`(${missed.length - TUTOR_MAX_ITEMS} more missed cards left out to keep this file short.)`, '');
  }

  /* units */
  if (unitRows.length) {
    L.push(`## Units, weakest first`, '');
    L.push(`| Unit | First tries | Right | "Sure" misses | Recall now |`, `|---|---|---|---|---|`);
    for (const r of unitRows.slice(0, 12)) L.push(`| ${unitName(r.u)} | ${r.n} | ${pctS(r.acc)} | ${r.sureMiss} | ${r.rec == null ? '–' : pctS(r.rec)} |`);
    L.push('', `"Recall now" is the app's estimate of how much of that unit they'd remember today.`, '');
  }

  /* calibration */
  if (Object.keys(cal).length) {
    L.push(`## Calibration (how well their bets match their accuracy)`, '');
    L.push(`| Bet | Target | Times | Right |`, `|---|---|---|---|`);
    const target = { 1: 'under 67%', 2: '67–80%', 3: '80% or more' };
    for (const c of [1, 2, 3]) if (cal[c]) L.push(`| ${BET[c]} | ${target[c]} | ${cal[c].n} | ${pctS(cal[c].correct / cal[c].n)} |`);
    const nb = Object.values(cal).reduce((a, b) => a + b.n, 0);
    L.push('', nb < 30 ? `Only ${nb} bets so far, so treat these as rough.` : `Overconfidence index: ${calc.overconfidence > 0 ? '+' : ''}${Math.round(calc.overconfidence * 100)} points (0 is ideal; positive means bets run higher than accuracy).`);
    if (Object.keys(pms).length) L.push(`Their own labels for missed "Sure" bets: ${Object.entries(pms).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${PM_TEXT[k]} ×${n}`).join(', ')}.`);
    L.push('');
  }

  /* stubborn cards outside the range */
  const shown = new Set(missed.slice(0, TUTOR_MAX_ITEMS).map(g => g.id));
  const leeches = Object.values(cards).filter(c => items[c.id] && (c.lapses || 0) >= 3 && !shown.has(c.id)).sort((a, b) => b.lapses - a.lapses).slice(0, 10);
  if (leeches.length) {
    L.push(`## Other cards that keep slipping (missed 3+ times overall)`, '');
    for (const c of leeches) { const it = items[c.id]; L.push(`- ${oneLine(it.type === 'gen' ? it.title : it.prompt)} → **${oneLine(answerOf(it) || 'calculated')}** (${units[it.unit] ? units[it.unit].name : it.unit}; missed ${c.lapses} times)`); }
    L.push('');
  }

  /* flagged keys */
  const fl = Object.entries(inp.flags || {}).filter(([id]) => items[id]);
  if (fl.length) {
    L.push(`## Answer keys the student or the app flagged`, '');
    L.push(`Please check these keys and say whether each is right.`, '');
    for (const [id, f] of fl) { const it = items[id]; L.push(`- ${oneLine(it.type === 'gen' ? it.title : it.prompt)} → key: **${oneLine(answerOf(it) || 'calculated')}**${f.auto ? ' (auto-flagged: missed twice while betting Sure)' : f.reason ? ` (their note: ${quote(f.reason)})` : ''}`); }
    L.push('');
  }
  L.push(`---`, `Cards © Station 528, CC BY-NC-SA 4.0.`);
  return { text: L.join('\n'), missed: missed.length, units: unitRows.length, answers: att.length };
}
