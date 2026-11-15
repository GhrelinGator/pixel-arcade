/* Engine invariants (spec §13 items 1–4, 6, 8 plus FSRS sanity). node test/engine_test.js */
const E = require('./load')(['engine.js']);
let fails = 0;
const ok = (c, msg) => { if (!c) { fails++; console.log('FAIL', msg); } };
const near = (a, b, tol, msg) => ok(Math.abs(a - b) <= tol, `${msg}: got ${a}, want ${b}`);

/* FSRS-6 against published py-fsrs examples: D=10, S=100, R=0.9, Good -> 125 days; D=5 -> 250 days */
near(E.ivlDays(E.sRecall(10, 100, 0.9, 3), 0.9, 36500), 125, 0, 'py-fsrs example D=10');
near(E.ivlDays(E.sRecall(5, 100, 0.9, 3), 0.9, 36500), 250, 0, 'py-fsrs example D=5');
near(E.retr(37, 37), 0.9, 1e-9, 'R(S,S)=0.9');
ok(E.initS(1) < E.initS(2) && E.initS(2) < E.initS(3) && E.initS(3) < E.initS(4), 'initial stability ordered');
ok(E.initD(1) > E.initD(4), 'Again starts harder than Easy');
ok(E.sForget(5, 50, 0.85) < 50, 'a lapse lowers stability');
ok(E.sShortTerm(2, 3) >= 2 && E.sShortTerm(30, 2) >= 30 && E.sShortTerm(2, 1) < 2, 'same-day Hard/Good/Easy never lower S; Again does');
ok(E.ivlDays(10, 0.88, 999) > E.ivlDays(10, 0.93, 999), 'higher retention target -> shorter interval');

/* §6.2 grading */
ok(E.gradeOf({ correct: false, conf: 3 }) === 1, 'wrong at C3 -> Again');
ok(E.gradeOf({ correct: true, conf: 0 }) === 1, "don't know -> Again");
ok(E.gradeOf({ correct: true, conf: 3, hint: true }) === 2, 'hint caps at Hard');
ok(E.gradeOf({ correct: true, conf: 1 }) === 2, 'C1 correct -> Hard');
ok(E.gradeOf({ correct: true, conf: 2 }) === 3, 'C2 correct -> Good');
ok(E.gradeOf({ correct: true, conf: 3, ms: 9000 }, 4000) === 3, 'slow C3 -> Good');
ok(E.gradeOf({ correct: true, conf: 3, ms: 7000 }, 4000) === 4, 'C3 within 2x median -> Easy');
ok(E.cbmPoints(true, 3) === 3 && E.cbmPoints(false, 3) === -6 && E.cbmPoints(false, 1) === 0 && E.cbmPoints(false, 0) === 0, 'CBM table');

/* §13.1 due-date cap, §13.6 memory gain, as properties over random histories */
const T = E.dayOfDate('2029-01-13');
for (let trial = 0; trial < 400; trial++) {
  const rnd = E.mulberry32(trial + 1);
  const card = E.newCard('x');
  let now = E.msOfDay(E.dayOfDate('2026-11-15')) + rnd() * 3e7;
  for (let k = 0; k < 40; k++) {
    const today = E.dayOf(now); if (today > T - 3) break;
    const phase = E.phaseOn(today, T);
    const g = 1 + Math.floor(rnd() * 4);
    const r = E.schedule(card, g, now, { T, phase, highYield: rnd() < 0.3, rnd });
    ok(card.due <= T - 2, `cap: due ${E.dateOfDay(card.due)} after T-2 (trial ${trial})`);
    ok(card.due > today, 'due is after today');
    ok(r.gain >= 0, 'gain never negative');
    if (g === 1) E.planEchoes(card, today, T);
    ok(card.echoes.every(e => e <= T - 2), 'E5 echoes capped');
    /* sometimes review late, sometimes on time, sometimes the same day */
    const step = rnd() < 0.15 ? 0.2 : (card.due - today) * (0.6 + rnd() * 1.4);
    now += Math.max(0.05, step) * E.DAY;
  }
  if (fails > 20) break;
}

/* Phase A interval ceiling: min(365, T-60-today) */
{
  const today = E.dayOfDate('2026-11-15');
  ok(E.maxIvlFor('A', today, T) === 365, 'phase A max interval 365 early on');
  ok(E.maxIvlFor('A', T - 300, T) === 240, 'phase A max interval shrinks to T-60');
  ok(E.phaseOn(T - 260, T) === 'A' && E.phaseOn(T - 259, T) === 'B' && E.phaseOn(T - 136, T) === 'C', 'A->B at T-259 (about May 1), C at T-136 (about Sep 1)');
  ok(E.phaseOn(E.dayOfDate('2028-11-14'), T) === 'D', 'D in the last 60 days');
}

/* §13.8 new-card stop */
ok(E.newQuota('D', T - 21, T) === 0 && E.newQuota('D', T - 22, T) === 5 && E.newQuota('A', 0, T) === 15, 'new-card quota and stop at T-21');

/* §13.3 overflow: highest-R pushed back first, never more than 3 days in a row */
{
  const now0 = E.msOfDay(E.dayOfDate('2027-03-01'));
  const cards = [];
  for (let i = 0; i < 30; i++) { const c = E.newCard('c' + i); c.state = 'review'; c.s = 1 + i; c.d = 5; c.last = now0 - (5 + i % 7) * E.DAY; c.due = E.dayOf(now0); cards.push(c); }
  let maxRun = 0;
  for (let day = 0; day < 20; day++) {
    const now = now0 + day * E.DAY, today = E.dayOf(now);
    const { take, rest } = E.applyCap(cards, today, now, 10);
    if (day === 0) {
      const rTake = Math.max(...take.map(c => E.rNow(c, now))), rRest = Math.min(...rest.map(c => E.rNow(c, now)));
      ok(rTake <= rRest + 1e-12, 'overflow defers the highest-R cards');
    }
    for (const c of rest) maxRun = Math.max(maxRun, c.deferrals);
    for (const c of take) E.schedule(c, 3, now, { T, phase: 'A', highYield: false, rnd: E.mulberry32(day) });
    /* keep the pile overloaded */
    for (const c of take) c.due = today + 1;
  }
  ok(maxRun <= 3, 'no card is pushed back more than 3 days in a row (max ' + maxRun + ')');
}

/* §13.2 final sweep */
{
  const today = T - 60;
  const cards = [];
  for (let i = 0; i < 200; i++) { const c = E.newCard('s' + i); c.state = 'review'; c.s = 2 + i; c.d = 5; c.last = E.msOfDay(today - 30 - i % 50); c.due = i % 3 ? today - 1 - (i % 9) : T - 10 - (i % 40); cards.push(c); }
  E.finalSweep(cards, today, T, id => +id.slice(1) % 5 === 0);
  ok(cards.every(c => c.due >= T - 60 && c.due <= T - 2), 'every active card has a date in [T-60, T-2] after the sweep');
}

/* calibration */
{
  const cal = E.calibration({ 1: { n: 20, correct: 18 }, 2: { n: 20, correct: 15 }, 3: { n: 40, correct: 28 } });
  ok(cal.levels[0].status === 'under' && cal.levels[1].status === 'ok' && cal.levels[2].status === 'over', 'calibration bands');
}

/* answer checking */
ok(E.textMatches('mitochondrion', ['mitochondria', 'mitochondrion']), 'exact');
ok(E.textMatches('Mitocondria', ['mitochondria']), 'one typo in a long word');
ok(!E.textMatches('Ne', ['Na']), 'short answers must be exact');
ok(!E.textMatches('sp2', ['sp3']), 'answers with digits must be exact');
ok(E.textMatches('the nucleus', ['nucleus']), 'leading article ignored');
ok(E.numMatches('3x10^8', { value: 3e8 }) && E.numMatches('3e8 m/s', { value: 3e8 }) && E.numMatches('2.9×10^8', { value: 3e8, tolPct: 5 }), 'scientific notation');
ok(E.numMatches('−2.0', { value: -2, tol: 0.05 }) && !E.numMatches('2', { value: -2, tol: 0.05 }), 'signs');
ok(E.numMatches('1,500 J', { value: 1500 }) && E.numMatches('.5', { value: 0.5 }), 'commas and leading dot');

ok(E.numMatches('3/16', { value: 3 / 16, tol: 0.005 }) && E.numMatches('25%', { value: 0.25, tol: 0.01, unit: '' }) && E.numMatches('25%', { value: 25, tolPct: 2, unit: '%' }), 'fractions and percents');
ok(E.textMatches('phosphofructokinase-1 (PFK-1)', ['phosphofructokinase-1', 'pfk-1']) && E.textMatches('Azimuthal (angular momentum) quantum number, l', ['l', 'azimuthal quantum number']), 'parenthetical alternates and listed parts');
ok(!E.textMatches('sp2, sp3', ['sp2']) && !E.textMatches('mitochondria or nucleus', ['mitochondria']), 'hedged lists are not accepted');
ok(E.numMatches('13', { value: 12.5, tolPct: 1 }) && E.numMatches('12', { value: 12.5, tolPct: 1 }) && E.numMatches('1.3', { value: 4 / 3, tolPct: 2 }) && !E.numMatches('1.2', { value: 4 / 3, tolPct: 2 }), '2-significant-figure answers accepted, wrong ones not');
ok(E.numMatches('10^-14', { value: 1e-14, tolPct: 1 }) && E.numMatches('1×10^-14', { value: 1e-14, tolPct: 1 }), 'bare powers of ten');
console.log(fails ? fails + ' failure(s)' : 'engine: all checks pass');
process.exit(fails ? 1 : 0);
