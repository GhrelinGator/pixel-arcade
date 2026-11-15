/* Station 528 engine: FSRS-6 memory model, behavior-derived grading, certainty-based marking,
   and the exam-date scheduling rules from the build spec (§6–7). No DOM in this file. */
'use strict';

const DAY = 86400000;
const ROLLOVER_H = 4; /* a study day runs 4am to 4am, like Anki */

/* ---------- FSRS-6 ---------- */
/* Default FSRS-6 parameters w0..w20 (the ones Anki and py-fsrs 6 ship). */
const FSRS_W = [0.212, 1.2931, 2.3065, 8.2956, 6.4133, 0.8334, 3.0194, 0.001, 1.8722, 0.1666, 0.796,
  1.4835, 0.0614, 0.2629, 1.6483, 0.6014, 1.8729, 0.5425, 0.0912, 0.0658, 0.1542];
const S_MIN = 0.001, S_MAX = 36500;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const fsrsFactor = w => Math.pow(0.9, -1 / w[20]) - 1;

/* Recall probability after t days at stability s: R = (1 + factor·t/s)^(−w20). R(s, s) = 0.9. */
function retr(tDays, s, w = FSRS_W) {
  if (!(s > 0)) return 0;
  return Math.pow(1 + fsrsFactor(w) * Math.max(0, tDays) / s, -w[20]);
}
const initS = (g, w = FSRS_W) => Math.max(S_MIN, w[g - 1]);
const initDRaw = (g, w = FSRS_W) => w[4] - Math.exp(w[5] * (g - 1)) + 1;
const initD = (g, w = FSRS_W) => clamp(initDRaw(g, w), 1, 10);
function nextD(d, g, w = FSRS_W) {
  const dp = d + (-w[6] * (g - 3)) * (10 - d) / 9;            /* linear damping */
  return clamp(w[7] * initDRaw(4, w) + (1 - w[7]) * dp, 1, 10); /* mean reversion toward D0(Easy) */
}
function sRecall(d, s, r, g, w = FSRS_W) {
  const hard = g === 2 ? w[15] : 1, easy = g === 4 ? w[16] : 1;
  return clamp(s * (1 + Math.exp(w[8]) * (11 - d) * Math.pow(s, -w[9]) * (Math.exp((1 - r) * w[10]) - 1) * hard * easy), S_MIN, S_MAX);
}
function sForget(d, s, r, w = FSRS_W) {
  const longTerm = w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) * Math.exp((1 - r) * w[14]);
  return clamp(Math.min(longTerm, s / Math.exp(w[17] * w[18])), S_MIN, S_MAX);
}
function sShortTerm(s, g, w = FSRS_W) { /* a second review on the same day */
  let inc = Math.exp(w[17] * (g - 3 + w[18])) * Math.pow(s, -w[19]);
  if (g >= 2) inc = Math.max(inc, 1); /* as py-fsrs: Hard, Good and Easy never lower stability */
  return clamp(s * inc, S_MIN, S_MAX);
}
/* One review. card: {s, d, last (ms) or null}. Returns the new {s, d}.
   Elapsed time is counted in whole study days, as the reference implementations do (the parameters were fit that way);
   a second review on the same study day uses the short-term formula. Stability is updated with the pre-review difficulty. */
function fsrsStep(card, g, now, w = FSRS_W) {
  if (!card.last) return { s: initS(g, w), d: initD(g, w) };
  const tDays = Math.max(0, dayOf(now) - dayOf(card.last));
  let s;
  if (tDays < 1) s = sShortTerm(card.s, g, w);
  else s = g === 1 ? sForget(card.d, card.s, retr(tDays, card.s, w), w) : sRecall(card.d, card.s, retr(tDays, card.s, w), g, w);
  return { s, d: nextD(card.d, g, w) };
}
/* Days until recall falls to the target retention, rounded, within [1, maxIvl]. */
function ivlDays(s, retention, maxIvl, w = FSRS_W) {
  const t = s / fsrsFactor(w) * (Math.pow(retention, -1 / w[20]) - 1);
  return clamp(Math.round(t), 1, Math.max(1, maxIvl));
}
/* The standard FSRS fuzz, so cards learned together don't stay clumped. */
function fuzzIvl(ivl, maxIvl, rnd) {
  if (ivl < 2.5) return ivl;
  let delta = 1;
  for (const [a, b, f] of [[2.5, 7, 0.15], [7, 20, 0.1], [20, Infinity, 0.05]]) delta += f * Math.max(Math.min(ivl, b) - a, 0);
  const lo = Math.max(2, Math.round(ivl - delta)), hi = Math.min(Math.round(ivl + delta), maxIvl);
  if (hi <= lo) return clamp(lo, 1, Math.max(1, maxIvl));
  return Math.floor(rnd() * (hi - lo + 1)) + lo;
}

/* ---------- days ---------- */
/* Study-day index: local calendar date, rolling over at 4am. */
function dayOf(ms) {
  const d = new Date(ms - ROLLOVER_H * 3600000);
  return Math.floor(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY);
}
function dayOfDate(iso) { const [y, m, d] = iso.split('-').map(Number); return Math.floor(Date.UTC(y, m - 1, d) / DAY); }
function dateOfDay(day) { return new Date(day * DAY).toISOString().slice(0, 10); }
/* Local midnight-ish ms at the start of a study day (used for recall predictions on a given day). */
function msOfDay(day) { const d = new Date(day * DAY); return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), 12).getTime(); }

/* ---------- phases and exam-date rules (§6.5–6.6) ---------- */
const PHASE_START = { B: 259, C: 136, D: 60 }; /* days before the exam; with a mid-January exam: May 1, Sep 1, mid-Nov */
const PHASES = {
  A: { name: 'Foundation', newPerDay: 15 },
  B: { name: 'Integration', newPerDay: 10 },
  C: { name: 'Dedicated', newPerDay: 5 },
  D: { name: 'Final approach', newPerDay: 5 },
};
function phaseOn(today, T, override) {
  if (override && override !== 'auto') return override;
  if (today >= T - PHASE_START.D) return 'D';
  if (today >= T - PHASE_START.C) return 'C';
  if (today >= T - PHASE_START.B) return 'B';
  return 'A';
}
function retentionFor(phase, highYield, today, T) {
  if (today >= T - 75) return highYield ? 0.93 : 0.90; /* E3 */
  if (phase === 'A') return 0.88;
  if (phase === 'C') return highYield ? 0.92 : 0.90;
  return 0.90;
}
/* Longest allowed interval from today: A min(365, to T−60); B to T−60; C/D to T−2 (E1). */
function maxIvlFor(phase, today, T) {
  if (phase === 'A') return Math.max(1, Math.min(365, T - 60 - today));
  if (phase === 'B') return Math.max(1, T - 60 - today);
  return Math.max(1, T - 2 - today);
}
function lastDueDay(T) { return T - 2; }
function newQuota(phase, today, T, override) {
  if (today >= T - 21) return 0; /* E4 */
  return override != null ? override : PHASES[phase].newPerDay;
}
/* §6.4 throttle: average due over the next 7 days vs the review cap. */
/* §6.4 throttle, extended by delta v2 D2: the projected 7-day load includes any backlog today's
   Rounds can't absorb (due now beyond today's cap). Above 0.8× cap new cards halve; above the cap
   they pause, and resume on their own once the projection drops. todayCap is the cap at the chosen
   recovery pace; the thresholds use the base cap. */
function throttledQuota(quota, cards, today, cap, todayCap = cap) {
  let dueNow = 0, ahead = 0;
  for (const c of cards) {
    if (c.state !== 'review' || c.suspended) continue;
    if (c.due <= today) dueNow++; else if (c.due <= today + 7) ahead++;
  }
  const avg = (ahead + Math.max(0, dueNow - todayCap)) / 7;
  if (avg > cap) return 0;
  if (avg > 0.8 * cap) return Math.floor(quota / 2);
  return quota;
}
/* D13 sleep check: a short night halves today's new cards, a poor one sets them to 0. Nothing else changes. */
function sleepQuota(quota, flag) { return flag === 'poor' ? 0 : flag === 'short' ? Math.floor(quota / 2) : quota; }

/* D2 recovery pace: the daily review cap while catching up. */
const PACES = { normal: { name: 'Normal', mult: 1 }, faster: { name: 'Faster', mult: 1.2 }, fastest: { name: 'Fastest', mult: 1.5 } };
function paceCap(cap, pace) { return Math.round(cap * ((PACES[pace] || PACES.normal).mult)); }

/* D2 "Back on schedule by <date>": simulate the next 14 days at the given cap. carry0 is the backlog
   already past today's cap (0 if today's Rounds were built, since applyCap moved those cards to tomorrow).
   Returns the first day whose due reviews all fit, or null if that takes more than 14 days.
   Optimistic on purpose: it ignores reviews that come back within the window. */
function backOnSchedule(cards, today, cap, carry0) {
  const byDay = {};
  for (const c of cards) if (c.state === 'review' && !c.suspended && c.due > today && c.due <= today + 14) byDay[c.due] = (byDay[c.due] || 0) + 1;
  let carry = carry0;
  for (let d = today + 1; d <= today + 14; d++) {
    carry = Math.max(0, (byDay[d] || 0) + carry - cap);
    if (carry === 0) return d;
  }
  return null;
}

/* D13 time windows, in minutes after midnight. Evening Intake: bedtime −120 to −30 min.
   Morning alternative for early risers: wake +30 to +180 min. */
const hm = s => { const m = /^(\d{1,2}):(\d{2})/.exec(s || ''); return m ? (+m[1] * 60 + +m[2]) % 1440 : null; };
function intakeWindow(slot, wake, bed) {
  const w = hm(wake), b = hm(bed);
  if (slot === 'morning' && w != null) return [(w + 30) % 1440, (w + 180) % 1440];
  if (b == null) return null;
  return [(b - 120 + 1440) % 1440, (b - 30 + 1440) % 1440];
}
function inWindow(win, minutes) {
  if (!win) return false;
  const [a, b] = win;
  return a <= b ? minutes >= a && minutes < b : minutes >= a || minutes < b;
}
const clock = m => { const h = Math.floor(m / 60) % 24, mm = String(m % 60).padStart(2, '0'); return `${h % 12 || 12}:${mm}\u00a0${h < 12 ? 'am' : 'pm'}`; }; /* no line break before am/pm */

/* D16 calendar helpers: weeks start on Monday. */
function weekStart(day) { return day - ((day + 3) % 7); } /* day 0 (1970-01-01) was a Thursday */
const monthOf = day => dateOfDay(day).slice(0, 7);

/* ---------- cards ---------- */
function newCard(id) {
  return { id, state: 'new', s: 0, d: 0, last: null, due: null, reps: 0, lapses: 0, intro: null,
    sessionDay: null, sessionCorrect: 0, lapsedToday: false, echoes: [], deferrals: 0, deferDay: null, c3Wrong: 0 };
}
function rNow(card, now) { return card.state === 'new' || !card.last ? 0 : retr((now - card.last) / DAY, card.s); }
/* Predicted recall on exam day if no further reviews happen (spec §7.3). */
function rExam(card, T) { return card.state === 'new' || !card.last ? 0 : retr((msOfDay(T) - card.last) / DAY, card.s); }

/* Apply one graded attempt to a card. Returns {rExamBefore, rExamAfter, gain, ivl}. */
function schedule(card, g, now, ctx) {
  const { T, phase, highYield, rnd } = ctx;
  const today = dayOf(now);
  const before = rExam(card, T);
  const st = fsrsStep(card, g, now, ctx.w || FSRS_W);
  card.s = st.s; card.d = st.d; card.last = now; card.reps++;
  if (card.state === 'new') { card.state = 'review'; card.intro = card.intro || today; }
  if (g === 1) card.lapses++;
  const maxIvl = maxIvlFor(phase, today, T);
  let ivl = ivlDays(card.s, retentionFor(phase, highYield, today, T), maxIvl);
  ivl = clamp(fuzzIvl(ivl, maxIvl, rnd || Math.random), 1, maxIvl);
  card.due = Math.min(today + ivl, lastDueDay(T));   /* E1: never past T − 2 */
  if (card.due <= today) card.due = today + 1;        /* the exam is days away: still never "due" again today */
  card.deferrals = 0; card.deferDay = null;
  card.echoes = card.echoes.filter(e => e > today);   /* any echo today was satisfied by this review */
  const after = rExam(card, T);
  return { rExamBefore: before, rExamAfter: after, gain: Math.max(0, after - before), ivl: card.due - today };
}
/* §6.3: after a confident error, extra probes at +1 and +7 days unless the card is already due within ±1 day of them. */
function planEchoes(card, today, T) {
  for (const k of [1, 7]) {
    const at = Math.min(today + k, lastDueDay(T)); /* E5 */
    if (at <= today) continue;
    if (Math.abs(card.due - at) <= 1) continue;
    if (!card.echoes.includes(at)) card.echoes.push(at);
  }
  card.echoes.sort((a, b) => a - b);
}

/* ---------- grading (§6.2) ---------- */
/* attempt: {correct, conf: 1|2|3|0 (0 = don't know), hint, ms}; medianMs: player's median for this card type (or null) */
function gradeOf(a, medianMs) {
  if (!a.correct || a.conf === 0) return 1;
  if (a.hint || a.conf === 1) return 2;
  if (a.conf === 2) return 3;
  if (medianMs && a.ms > 2 * medianMs) return 3; /* C3 but slow */
  return 4;
}
/* §7.1 certainty-based marking */
const CBM = { 0: [0, 0], 1: [1, 0], 2: [2, -2], 3: [3, -6] };
const cbmPoints = (correct, conf) => CBM[conf][correct ? 0 : 1];
/* Calibration targets (§7.6): C1 ≤ 67%, C2 67–80%, C3 ≥ 80%. Implied midpoints for the overconfidence index. */
const CAL_BANDS = { 1: [0, 0.67], 2: [0.67, 0.80], 3: [0.80, 1] };
const CAL_IMPLIED = { 1: 0.5, 2: 0.735, 3: 0.9 };
function calibration(counts) { /* counts: {1:{n,correct},2:..,3:..} */
  let n = 0, exp = 0, got = 0;
  const levels = [1, 2, 3].map(l => {
    const c = counts[l] || { n: 0, correct: 0 };
    n += c.n; exp += c.n * CAL_IMPLIED[l]; got += c.correct;
    const acc = c.n ? c.correct / c.n : null, [lo, hi] = CAL_BANDS[l];
    const status = acc == null || c.n < 10 ? 'few' : acc < lo ? 'over' : acc > hi && l < 3 ? 'under' : 'ok';
    return { level: l, n: c.n, correct: c.correct, acc, lo, hi, status };
  });
  return { levels, n, overconfidence: n ? (exp - got) / n : null };
}

/* ---------- daily queue (§6.4) ---------- */
/* Cards due today, lowest current recall first; cards already pushed back 3 days in a row jump the line. */
function dueToday(cards, today, now) {
  return cards.filter(c => c.state === 'review' && !c.suspended && c.due <= today)
    .sort((a, b) => ((b.deferrals >= 3) - (a.deferrals >= 3)) || (rNow(a, now) - rNow(b, now)));
}
/* Split today's due list at the cap; push the rest back one day. Call once per day. */
function applyCap(cards, today, now, cap) {
  const due = dueToday(cards, today, now);
  const take = due.slice(0, cap), rest = due.slice(cap);
  for (const c of rest) { if (c.deferDay !== today) { c.deferrals++; c.deferDay = today; } c.due = today + 1; }
  return { take, rest };
}
const echoesDue = (cards, today) => cards.filter(c => !c.suspended && c.state === 'review' && c.echoes.some(e => e <= today));

/* E2 final sweep: at T − 60, cards with no review date inside [T − 60, T − 2] get one, spread over
   T − 60 … T − 7, lowest exam-day recall first and high-yield earliest. */
function finalSweep(cards, today, T, isHY) {
  if (today < T - 60) return 0;
  const lo = Math.max(today, T - 60), hi = T - 7;
  const need = cards.filter(c => c.state === 'review' && !c.suspended && !(c.due >= T - 60 && c.due <= T - 2));
  need.sort((a, b) => (isHY(b.id) - isHY(a.id)) || (rExam(a, T) - rExam(b, T)));
  const span = Math.max(1, hi - lo + 1);
  need.forEach((c, i) => { c.due = hi >= lo ? lo + Math.floor(i * span / need.length) : Math.min(T - 2, Math.max(today, lo)); });
  return need.length;
}

/* ---------- Station (§7.5) ---------- */
const WING_LEVELS = [0, 0.20, 0.40, 0.60, 0.80, 0.95];
function wingStats(cards, now) {
  const active = cards.filter(c => c.state === 'review' && !c.suspended);
  if (!active.length) return { n: 0, condition: null, level: 0, mature: 0 };
  const condition = active.reduce((a, c) => a + rNow(c, now), 0) / active.length;
  const mature = active.filter(c => c.s >= 21).length / active.length;
  let level = 0; WING_LEVELS.forEach((t, i) => { if (mature >= t) level = i; });
  if (mature === 0) level = 0;
  return { n: active.length, condition, level, mature };
}

/* ---------- typed answer checking ---------- */
function norm(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[’']/g, '').replace(/[^a-z0-9+\-./ ]+/g, ' ').replace(/\s+/g, ' ').trim()
    .replace(/^(the|a|an) /, '');
}
function lev(a, b) {
  if (a === b) return 0;
  const m = a.length, n = b.length; if (!m || !n) return m || n;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = [i];
    for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[n];
}
/* Also accepts "main answer (alternate name)" and "a, b" when every listed part is itself acceptable. */
function textMatches(given, accepted) {
  const raw = String(given);
  if (textMatch1(raw, accepted)) return true;
  const main = raw.replace(/\([^)]*\)/g, ' ').trim();
  if (main && main !== raw.trim() && textMatch1(main, accepted)) return true;
  const parts = main.split(/,|;|\/(?![^\s]*\d)| or /i).map(s => s.trim()).filter(Boolean);
  return parts.length > 1 && parts.every(p => textMatch1(p, accepted));
}
function textMatch1(given, accepted) {
  const g = norm(given); if (!g) return false;
  return accepted.some(a => {
    const t = norm(a); if (g === t) return true;
    if (g.replace(/ /g, '') === t.replace(/ /g, '')) return true;
    if (/\d/.test(t)) return false; /* numbers and formulas must match exactly */
    const tol = t.length >= 10 ? 2 : t.length >= 5 ? 1 : 0;
    return tol > 0 && lev(g, t) <= tol;
  });
}
/* Accepts 3e8, 3x10^8, 3×10^8, 3*10^8, 3 x 10^-8, 1,500, 0.5, .5, −2 (unicode minus), with units after. */
function parseNum(s) {
  let t = String(s).trim().replace(/[−–]/g, '-').replace(/,(?=\d{3}\b)/g, '').replace(/\s+/g, '');
  const p10 = t.match(/^10\^([+-]?\d+)/); /* "10^-14" */
  if (p10) return Math.pow(10, parseInt(p10[1], 10));
  const fr = t.match(/^([+-]?\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)/);
  if (fr) { const v = parseFloat(fr[1]) / parseFloat(fr[2]); return isFinite(v) ? v : null; }
  const m =t.match(/^([+-]?(?:\d+\.?\d*|\.\d+))(?:(?:[x×*]10\^?|e|E)([+-]?\d+))?/);
  if (!m) return null;
  const v = parseFloat(m[1]) * (m[2] != null ? Math.pow(10, parseInt(m[2], 10)) : 1);
  return isFinite(v) ? v : null;
}
function numMatches(given, spec) {
  let v = parseNum(given); if (v == null) return false;
  if (/%\s*$/.test(String(given)) && spec.unit !== '%') v /= 100; /* "25%" for a fraction */
  if (spec.tol != null) return Math.abs(v - spec.value) <= spec.tol + 1e-12;
  const pct = spec.tolPct != null ? spec.tolPct : 3;
  if (spec.value === 0) return Math.abs(v) < 1e-9;
  /* within the percent tolerance, or a correct rounding to 2 significant figures (12.5 -> 12 or 13) */
  const twoSF = 0.5 * Math.pow(10, Math.floor(Math.log10(Math.abs(spec.value))) - 1);
  return Math.abs(v - spec.value) <= Math.max(Math.abs(spec.value) * pct / 100, twoSF) + 1e-9 * Math.abs(spec.value);
}

/* ---------- random ---------- */
function mulberry32(a) {
  return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}
const median = xs => { if (!xs.length) return null; const a = xs.slice().sort((x, y) => x - y), m = a.length >> 1; return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2; };
