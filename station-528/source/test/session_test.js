/* Session-layer rules: successive relearning, gaps, first-attempt scoring, intake selection. node test/session_test.js */
const E = require('./load')(['engine.js', 'session.js', 'content_core.js', 'content_chem.js', 'content_bio.js', 'content_phys.js', 'content_chem2.js', 'content_bio2.js', 'content_phys2.js', 'content_check.js']);
let fails = 0; const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } };

/* a new card must be recalled correctly 3 times, with at least 5 other items between repeats */
{
  const ids = Array.from({ length: 12 }, (_, i) => 'n' + i);
  const sess = E.newSession('intake', 100, ids.map(id => ({ id, kind: 'new' })));
  const seen = {}; let step = 0, guard = 0;
  while (sess.queue.length && guard++ < 500) {
    const id = sess.queue[0].id;
    const lastGap = seen[id] != null ? step - seen[id] - 1 : null;
    if (lastGap != null && sess.queue.length > 6) ok(lastGap >= 5, `at least 5 items between repeats of ${id} (got ${lastGap})`);
    seen[id] = step;
    const correct = (step % 4) !== 0; /* some misses */
    E.recordAttempt(sess, id, { correct, conf: correct ? 2 : 3, wasNew: true }, correct ? 3 : 1);
    step++;
  }
  ok(!sess.queue.length, 'intake session finishes');
  ok(Object.values(sess.cardSess).every(c => c.correct >= 3), 'every new card reached 3 correct recalls');
  ok(sess.stats.first === 12, 'only first attempts count as scored (' + sess.stats.first + ')');
  const cbmFirstOnly = sess.stats.cbm;
  ok(cbmFirstOnly <= 12 * 3, 'CBM only from first attempts');
}
/* a lapsed review card comes back once and leaves after one correct recall */
{
  const sess = E.newSession('rounds', 100, ['a', 'b', 'c'].map(id => ({ id, kind: 'review' })));
  E.recordAttempt(sess, 'a', { correct: false, conf: 2, wasNew: false }, 1);
  ok(sess.queue.map(q => q.id).join() === 'b,c,a', 'lapsed card is reinserted (as far back as the queue allows)');
  E.recordAttempt(sess, 'b', { correct: true, conf: 2 }, 3); E.recordAttempt(sess, 'c', { correct: true, conf: 3 }, 4);
  E.recordAttempt(sess, 'a', { correct: true, conf: 1 }, 2);
  ok(!sess.queue.length && sess.stats.backToCriterion === 1, 'lapse brought back to criterion once');
  ok(sess.stats.cbm === -2 + 2 + 3, 'CBM uses first attempts only: ' + sess.stats.cbm);
}
/* "don't know" scores 0 and counts as not recalled */
{
  const sess = E.newSession('intake', 100, [{ id: 'x', kind: 'new' }]);
  const r = E.recordAttempt(sess, 'x', { correct: false, conf: 0, wasNew: true }, 1);
  ok(r.cbm === 0 && r.back, "don't know: 0 points, card returns");
}
/* intake selection: open units only, every 5th pick reasoning (skill 2+), blocked by unit */
{
  const order = Object.fromEntries(E.UNITS.map((u, i) => [u.id, { i, course: u.course }]));
  const items = E.ITEMS.map(it => Object.assign({}, it, { status: 'active' }));
  const pick = E.pickIntake(items, {}, ['c-atoms', 'c-bond', 'b-cell', 'p-kin'], 15, order);
  ok(pick.length === 15, 'fills the quota');
  ok(pick.every(id => ['c-atoms', 'c-bond', 'b-cell', 'p-kin'].some(u => id.startsWith(u + '.'))), 'only open units');
  const byId = Object.fromEntries(items.map(i => [i.id, i]));
  ok(pick.filter((id, i) => i % 5 === 4).every(id => byId[id].sk >= 2), 'every 5th new card is a reasoning item');
  ok(E.pickIntake(items, {}, [], 15, order).length === 0, 'no open units, no new cards');
  const quarantined = items.map(i => i.id === pick[0] ? Object.assign({}, i, { status: 'quarantined' }) : i);
  ok(!E.pickIntake(quarantined, {}, ['c-atoms', 'c-bond', 'b-cell', 'p-kin'], 15, order).includes(pick[0]), 'quarantined items never enter intake');
}
console.log(fails ? fails + ' failure(s)' : 'session: all checks pass');
process.exit(fails ? 1 : 0);
