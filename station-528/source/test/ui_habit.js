/* Delta v2 checks: plans in setup, weekly card, sleep check, re-entry (no missed-day or overdue counts),
   comeback beacon, recovery pace, lapse season, blocks + look-away, post-mortems, calibration trend,
   exercise note, essentials, no countdowns in study screens. node test/ui_habit.js */
const { chromium, devices } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'site');
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': p.endsWith('.html') ? 'text/html' : 'application/octet-stream' }); res.end(d); });
}).listen(0);
let fails = 0; const ok = (c, m) => { if (!c) { fails++; console.log('FAIL', m); } };
(async () => {
  const url = `http://localhost:${server.address().port}/`;
  const b = await chromium.launch(); const errors = [];
  const ctx = await b.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 2, colorScheme: process.env.DARK ? 'dark' : 'light' });
  await ctx.grantPermissions(['clipboard-read', 'clipboard-write'], { origin: `http://localhost:${server.address().port}` });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  const ev = (f, a) => page.evaluate(f, a);
  const shot = async name => { await page.waitForTimeout(150); await page.screenshot({ path: `shots/h${process.env.DARK ? 'd' : ''}-${name}.png`, fullPage: true }); };
  const text = () => ev(() => document.querySelector('#app').innerText);
  const reload = async (hash = '') => { await page.goto(url + hash); await page.reload(); await page.waitForTimeout(350); };

  /* 1. setup with a custom plan cue */
  await page.goto(url); await page.waitForTimeout(350);
  ok(await page.$('.planed') != null, 'setup shows a plan editor');
  await page.selectOption('#cue0', '__other'); await page.waitForTimeout(100);
  await page.fill('[data-pt="cue"]', 'I get home from the gym');
  ok((await ev(() => document.querySelector('[data-preview]').textContent)).startsWith('If I get home from the gym, then I will do Daily Rounds at my desk'), 'plan preview updates');
  for (const u of ['c-atoms', 'b-cell', 'p-kin']) await page.check(`[data-unit="${u}"]`);
  await shot('setup');
  await page.click('[data-act="begin"]'); await page.waitForTimeout(300);
  const plans = await ev(() => kvGet('plans'));
  ok(plans.length === 1 && plans[0].cue === 'I get home from the gym', 'setup saves the plan');

  /* 2. weekly card + sleep check */
  ok(await page.$('.week') != null && await page.$('.sleep') != null, 'first visit shows the weekly card and the sleep check');
  await shot('station-first');
  ok(await page.$('[data-act="plan-ok"]') == null, 'a plan written today needs no rehearsal');
  await ev(() => { const p = kvGet('plans'); p[0].lastRehearsedAt = today() - 7; kvSet('plans', p); viewStation(); });
  await page.selectOption('#goal', '4');
  await page.click('[data-act="plan-ok"]'); await page.waitForTimeout(150);
  ok(await page.$('#goal') != null && (await ev(() => document.querySelector('#goal').value)) === '4', 'goal choice survives the plan rehearsal tap');
  await page.click('[data-act="week-set"]'); await page.waitForTimeout(150);
  ok((await ev(() => kvGet('week').goal)) === 4 && await page.$('.weekrow') != null && await page.$('.week') == null, 'week set: card gone, active-days row shown');
  const base = await ev(() => quotaToday().thr);
  await page.click('[data-sleep="short"]'); await page.waitForTimeout(150);
  ok((await ev(() => quotaToday().quota)) === Math.floor(base / 2), 'short night halves new cards');
  ok(await page.$('.sleep') == null, 'sleep row goes away once answered');
  await page.click('[data-act="sleep-change"]'); await page.waitForTimeout(150);
  await page.click('[data-sleep="poor"]'); await page.waitForTimeout(150);
  ok((await ev(() => quotaToday().quota)) === 0 && /poor night/.test(await text()), 'poor night: no new cards, and the Station says why');
  await page.click('[data-act="sleep-change"]'); await page.waitForTimeout(100);
  await page.click('[data-sleep="normal"]'); await page.waitForTimeout(150);
  ok((await ev(() => quotaToday().quota)) === base, 'normal sleep restores the quota');

  /* 3. Intake: a confident miss gets the post-mortem row; no countdowns while studying */
  await ev(() => { kvSet('sess:intake', newSession('intake', today(), [{ id: 'b-cell.ser', kind: 'new' }, { id: 'p-kin.g-vsq', kind: 'new' }, { id: 'c-atoms.mass-number', kind: 'new' }].filter(q => ITEM[q.id]))); });
  await page.goto(url + '#/intake'); await page.waitForTimeout(250);
  ok(!/\b\d{1,2}:\d{2}\b/.test(await text()), 'no clock or countdown on a study screen');
  await page.fill('#ans', 'golgi apparatus'); await page.click('.conf [data-c="3"]'); await page.waitForTimeout(120);
  ok(await page.$('[data-pm]') == null, 'post-mortem waits until the miss is corrected');
  await page.fill('#fix', 'smooth er'); await page.waitForTimeout(120);
  ok(await page.$('[data-pm]') != null, 'post-mortem row after the correction');
  await page.click('[data-pm="trap"]'); await page.waitForTimeout(80);
  await page.click('[data-pm="misread"]'); await page.waitForTimeout(80);
  const pm = await ev(() => ({ all: kvGet('pmAll'), sess: RUN.sess.stats.pm, on: document.querySelector('[data-pm].on').dataset.pm }));
  ok(pm.all.misread === 1 && !pm.all.trap && pm.sess.misread === 1 && pm.on === 'misread', 'post-mortem: one answer per miss, changeable');
  await shot('postmortem');
  const logs1 = await ev(async () => (await allLogs()).filter(l => l.mode === 'intake'));
  const L = logs1[logs1.length - 1];
  ok(L && L.sessionId && L.blockId && typeof L.localHour === 'number' && L.hintLevel === 0 && L.sleepFlag === 'normal' && L.intakeSlot === 'evening' && typeof L.inIntakeWindow === 'boolean', 'log carries the new D1 fields');

  /* 4. block done after ~20 minutes of answering */
  await ev(() => { RUN.sess.block.ms = BLOCK_MS; kvSet('sess:intake', RUN.sess); });
  await page.click('#next'); await page.waitForTimeout(150);
  ok(/BLOCK DONE/.test(await text()), 'Continue after a full block shows Block done');
  ok(await ev(() => document.querySelector('[data-act="block-stop"]').classList.contains('primary')), 'after an Intake block, stopping is the suggested option');
  await shot('block');
  await page.click('[data-act="lookaway"]'); await page.waitForTimeout(200);
  ok(await page.$('.rest') != null, 'look-away screen opens');
  await shot('rest');
  await page.click('[data-act="rest-end"]'); await page.waitForTimeout(100);
  ok(await page.$('.rest') == null, 'look-away can be skipped');
  await page.click('[data-act="block-go"]'); await page.waitForTimeout(150);
  ok(await ev(() => RUN && RUN.sess.block.n === 2 && RUN.sess.block.ms === 0), 'keep going starts block 2');

  /* 5. Intake debrief: exercise note, dismissible */
  await page.goto(url + '#/debrief/intake'); await page.waitForTimeout(200);
  ok(/Training today\?/.test(await text()), 'exercise note in the Intake debrief');
  await page.click('[data-act="hide-ex"]'); await page.waitForTimeout(80);
  ok(await ev(() => kvGet('hideExNote')) === true && !/Training today\?/.test(await text()), 'exercise note dismissed for good');

  /* 5b. tutor pack from the Debrief */
  await page.goto(url + '#/debrief/intake'); await page.waitForTimeout(200);
  ok(await page.$('a[href="#/tutor/today"]') != null, 'Debrief links to the tutor pack after misses');
  await page.click('a[href="#/tutor/today"]'); await page.waitForTimeout(500);
  const tp = await text();
  ok(/1\s*missed card/.test(tp) && /Copy text/.test(tp), 'tutor pack page summarizes today');
  ok((await ev(() => TUTOR.text)).includes('"golgi apparatus" (Sure') && (await ev(() => TUTOR.text)).includes('their label: misread it'), 'pack holds the miss, bet and label');
  ok(await ev(() => document.querySelector('[data-trange="today"]').classList.contains('on')), 'Debrief link opens on Today');
  await shot('tutor');
  const dl = page.waitForEvent('download'); await page.click('[data-act="tutor-dl"]');
  const d1 = await dl; ok(/^station528-tutor-\d{4}-\d{2}-\d{2}\.md$/.test(d1.suggestedFilename()), 'download is a dated .md file');
  await page.click('[data-act="tutor-copy"]'); await page.waitForTimeout(150);
  ok((await ev(() => navigator.clipboard.readText())).startsWith('# Station 528 tutor pack'), 'copy puts the pack on the clipboard');
  await page.uncheck('#tinstr'); await page.waitForTimeout(400);
  ok(!(await ev(() => TUTOR.text)).includes('## Instructions for the tutor'), 'instructions can be left out');
  await page.check('#tinstr'); await page.click('[data-trange="all"]'); await page.waitForTimeout(400);
  ok(await ev(() => location.hash === '#/tutor' && TUTOR.range === 'all'), 'period switch');

  /* 6. re-entry after idle days with a big backlog: no missed-day or overdue counts anywhere */
  await ev(async () => {
    const t = today(), ids = ITEMS.filter(i => i.status === 'active').slice(0, 400).map(i => i.id);
    for (const id of ids) { const c = newCard(id); Object.assign(c, { state: 'review', s: 5, d: 5, last: now() - 9 * DAY, due: t - 4, reps: 2 }); MEM.cards[id] = c; }
    await Promise.all([saveCards(ids.map(id => MEM.cards[id])), kvSet('lastActive', t - 3), kvSet('lastVisit', t - 3), kvSet('sess:rounds', null)]);
  });
  await reload();
  const wb = await text();
  ok(/Welcome back/.test(wb), 're-entry shows Welcome back');
  ok(!/\b[0-9]+ (missed )?days?\b/i.test(wb) && !/\b(400|39\d|25\d)\b/.test(wb) && !/overdue/i.test(wb), 'Welcome back shows no missed-day or overdue counts');
  ok(/back on schedule by/i.test(wb), 'Welcome back gives a back-on-schedule date');
  await shot('welcome');
  await page.click('[data-pace="fastest"]'); await page.waitForTimeout(150);
  ok(await ev(() => S.recoveryPace) === 'fastest', 'pace chosen on the Welcome screen');
  await page.click('[data-act="checkin-done"]'); await page.waitForTimeout(200);
  const st = await text();
  ok(/Catching up: back on schedule by/.test(st) && !/pushed to tomorrow/.test(st), 'Station shows the catch-up date, not a pushed count');
  ok(/\b225\b/.test(st), 'Rounds shows today\'s portion at the fastest pace (225)');
  await shot('station-backlog');
  /* first answer after the gap lights a beacon, once */
  await page.goto(url + '#/rounds'); await page.waitForTimeout(250);
  ok(await ev(() => kvGet('sess:rounds').taken) === 225, 'Rounds built at the fastest cap');
  const answerOne = async () => {
    const tp = await ev(() => RUN.it.type);
    if (tp === 'choice') { await page.waitForTimeout(3100); await page.click('[data-act="reveal"]'); await page.click(`[data-o="0"]`); await page.click('.conf [data-c="1"]'); }
    else { await page.click('[data-act="dk"]'); }
    await page.waitForTimeout(120); await page.click('#next'); await page.waitForTimeout(120);
  };
  await answerOne(); await answerOne();
  ok(await ev(() => kvGet('beacons')) === 1, 'comeback beacon granted once');
  await page.goto(url + '#/debrief/rounds'); await page.waitForTimeout(200);
  ok(/Comeback beacon lit/.test(await text()), 'beacon celebrated in the Debrief');
  await shot('debrief-beacon');
  await reload();
  ok(!/Welcome back/.test(await text()), 'no second Welcome back the same day');
  /* switching pace mid-day pulls deferred cards back in */
  await ev(() => setPace('normal'));
  const before = await ev(() => kvGet('sess:rounds').queue.length);
  await ev(() => { kvSet('sess:rounds', Object.assign(kvGet('sess:rounds'), { taken: 150 })); setPace('faster'); });
  ok(await ev(() => kvGet('sess:rounds').queue.length) === before + 30, 'a faster pace adds deferred cards to today\'s Rounds');

  /* 7. a lapse of 7+ days starts a new season */
  await ev(async () => { const t = today(); await Promise.all([kvSet('lastActive', t - 10), kvSet('lastVisit', t - 10), kvSet('season', { id: 1, start: t - 20, trigger: 'start' }), kvSet('checkin', null)]); });
  await reload();
  const ss = await text();
  ok(/Season 2/i.test(ss) && /A fresh start/.test(ss) && /Welcome back/.test(ss), 'lapse: Welcome back plus a new season');
  ok(!/\b(10|9) days\b/.test(ss), 'season screen does not count the missed days');
  await shot('season');
  await page.click('[data-act="checkin-done"]'); await page.waitForTimeout(150);

  /* 8. calibration trend + post-mortem bars + primer */
  await ev(() => kvSet('calibMonth', { '2026-09': { 1: { n: 12, correct: 6 }, 2: { n: 20, correct: 13 }, 3: { n: 30, correct: 21 } }, '2026-10': { 1: { n: 9, correct: 5 }, 2: { n: 25, correct: 18 }, 3: { n: 40, correct: 33 } }, '2026-11': { 1: { n: 4, correct: 2 }, 2: { n: 22, correct: 16 }, 3: { n: 35, correct: 30 } } }));
  await page.goto(url + '#/calibration'); await page.waitForTimeout(200);
  ok(await ev(() => document.querySelectorAll('svg.smx').length) === 3 && await ev(() => document.querySelectorAll('svg.smx circle').length) === 8, 'trend: three small multiples, months under 5 bets left out');
  ok(await page.$('.pmt') != null, 'post-mortem tally on the Calibration page');
  await shot('calibration');
  await page.goto(url + '#/primer'); await page.waitForTimeout(150);
  ok(/Each bet is a probability/.test(await text()), 'primer page');

  /* 9. settings: pace, day times, semester dates; plans page */
  await page.goto(url + '#/settings'); await page.waitForTimeout(200);
  await page.fill('#bed', '00:30'); await page.dispatchEvent('#bed', 'change'); await page.waitForTimeout(150);
  ok(/10:30\spm–12:00\sam/.test(await ev(() => document.querySelector("#slot").innerText)), 'evening window follows bedtime across midnight');
  await page.fill('#semadd', '2027-01-19'); await page.click('[data-act="semadd"]'); await page.waitForTimeout(120);
  ok((await ev(() => S.semesterStarts)).includes('2027-01-19'), 'semester start saved');
  await shot('settings');
  await page.goto(url + '#/plans'); await page.waitForTimeout(150);
  await page.click('[data-act="plan-add"]'); await page.waitForTimeout(100);
  await page.click('[data-act="plan-save"]'); await page.waitForTimeout(150);
  ok((await ev(() => kvGet('plans').length)) === 2, 'second plan saved');

  /* 10. essentials-done state */
  await ev(() => { const t = today(); for (const c of Object.values(MEM.cards)) if (c.state === 'review' && c.due <= t) c.due = t + 5; const r = kvGet('sess:rounds'); r.queue = []; r.done = true; kvSet('sess:rounds', r); S.openUnits = []; saveSettings(); });
  await page.goto(url); await page.waitForTimeout(250);
  ok(/Today's essentials are done/.test(await text()), 'essentials-done state on the Station');
  await shot('essentials');

  console.log(errors.length ? errors.join('\n') : 'no errors');
  console.log(fails ? fails + ' failure(s)' : 'habit: all checks pass');
  await b.close(); server.close(); process.exit(fails || errors.length ? 1 : 0);
})();
