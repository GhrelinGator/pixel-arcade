/* Tutor pack: appeals void misses, post-mortems attach, ranking, content, privacy. node test/tutor_test.js */
const E = require('./load')(['engine.js', 'session.js', 'content_core.js', 'content_chem.js', 'content_bio.js', 'content_phys.js', 'content_chem2.js', 'content_bio2.js', 'content_phys2.js', 'content_sci3.js', 'content_ps.js', 'content_check.js', 'tutor.js']);
let fails = 0; const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } };
const ITEM = Object.fromEntries(E.ITEMS.map(i => [i.id, i]));
const pick = t => E.ITEMS.find(i => i.type === t);
const typed = ITEM['b-cell.ser'] || pick('typed'), choice = E.ITEMS.find(i => i.type === 'choice' && i.lures && i.lures.length), num = pick('num'), gen = pick('gen');
const t = E.dayOfDate('2026-11-15'), ms = d => E.msOfDay(d);
const inst = gen.gen(E.mulberry32(7));
const logs = [
  { ts: ms(t - 20), itemId: num.id, mode: 'rounds', firstAttempt: true, correct: false, response: '3', confidence: 1 },          /* out of a 7-day range */
  { ts: ms(t - 2), itemId: typed.id, mode: 'intake', firstAttempt: true, correct: false, response: 'golgi apparatus', confidence: 3 },
  { ts: ms(t - 2) + 1, itemId: typed.id, mode: 'postmortem', postMortem: 'misread' },
  { ts: ms(t - 1), itemId: choice.id, mode: 'rounds', firstAttempt: true, correct: false, response: choice.options[1], confidence: 2 },
  { ts: ms(t - 1) + 1, itemId: choice.id, mode: 'appeal', correct: true },                                                         /* overturned */
  { ts: ms(t - 1) + 2, itemId: choice.id, mode: 'rounds', firstAttempt: true, correct: true, response: choice.options[1], confidence: 2 },
  { ts: ms(t), itemId: gen.id, mode: 'rounds', firstAttempt: true, correct: false, response: '12', confidence: 2, value: inst.value, prompt: inst.prompt, expl: inst.expl, unit: inst.unit },
  { ts: ms(t) + 5, itemId: choice.id, mode: 'echo', firstAttempt: true, correct: false, response: choice.options[2], confidence: 1 },
  { ts: ms(t) + 9, itemId: 'no-such-card', mode: 'rounds', firstAttempt: true, correct: false, response: 'x', confidence: 3 },
];
const cards = { [typed.id]: Object.assign(E.newCard(typed.id), { state: 'review', s: 3, d: 6, last: ms(t - 2), due: t + 1, lapses: 1 }),
  [num.id]: Object.assign(E.newCard(num.id), { state: 'review', s: 2, d: 7, last: ms(t - 20), due: t, lapses: 4 }) };
const base = { logs, cards, items: ITEM, units: E.UNIT, courses: Object.fromEntries(E.COURSES.map(c => [c.id, c])), flags: { [typed.id]: { auto: true } },
  today: t, examDay: E.dayOfDate('2029-01-20'), phase: 'A', openUnits: ['b-cell', 'c-atoms'], now: ms(t) + 3600e3 };
const p7 = E.tutorPack(Object.assign({}, base, { rangeStart: t - 6, rangeLabel: 'the last 7 days', instructions: true }));
const x = p7.text;
ok(p7.missed === 3, `three cards missed in range (got ${p7.missed})`);
ok(x.includes('## Instructions for the tutor') && x.includes('Make them retrieve before you explain'), 'instructions included');
ok(x.indexOf(typed.prompt.replace(/\s+/g, ' ')) > 0 && x.indexOf('★') > 0, 'confident miss listed with a star');
ok(x.indexOf('### 1. ★') >= 0, 'the Sure miss ranks first');
ok(x.includes('"golgi apparatus" (Sure') && x.includes('their label: misread it'), 'their answer, bet and post-mortem label');
ok(!x.includes(`"${choice.options[1]}" (Fairly sure`), 'appealed miss is dropped');
ok(x.includes(`Why "${choice.options[2].replace(/\s+/g, ' ')}" is wrong`), 'lure rationale for the option they picked');
ok(x.includes(inst.prompt.replace(/\s+/g, ' ')) && x.includes("Card's worked solution"), 'generated problem: the exact question and solution');
ok(!x.includes(num.prompt.replace(/\s+/g, ' ').slice(0, 40)) || x.includes('keep slipping'), 'out-of-range miss only appears as a slipping card');
ok(x.includes('Other cards that keep slipping') && x.includes('missed 4 times'), 'slipping cards section');
ok(x.includes('Answer keys the student or the app flagged') && x.includes('auto-flagged'), 'flagged keys section');
ok(!x.includes('no-such-card'), 'unknown items skipped');
ok(!/sleep|bedtime|plan:|@/i.test(x.replace('## Instructions for the tutor', '').replace(/don't build a study schedule/, '')), 'no personal details (sleep, plans, emails)');
const pAll = E.tutorPack(Object.assign({}, base, { rangeStart: null, rangeLabel: 'everything so far', instructions: false }));
ok(pAll.missed === 4 && !pAll.text.includes('## Instructions for the tutor'), 'all-time range, instructions off');
const pNone = E.tutorPack(Object.assign({}, base, { logs: [], rangeStart: t, rangeLabel: 'today only', instructions: true }));
ok(pNone.answers === 0 && pNone.text.includes('No answers in this period yet'), 'empty period');
ok(x.length < 40000, `pack stays small (${x.length} chars)`);
if (process.env.SHOW) console.log(x);
console.log(fails ? fails + ' failure(s)' : 'tutor: all checks pass');
process.exit(fails ? 1 : 0);
