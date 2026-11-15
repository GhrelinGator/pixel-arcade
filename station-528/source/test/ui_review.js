/* Review pass scenarios: fresh install, study-day rollover into a new week, re-entry, month season,
   restoring a pre-v0.1.1 backup, and "no link inside a link" on every screen. node test/ui_review.js */
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
  const mk = async (dev, name) => {
    const ctx = await b.newContext({ ...dev, timezoneId: 'America/Chicago', acceptDownloads: true });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(name + ' pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(name + ' console: ' + m.text()); });
    page.on('dialog', d => d.accept());
    return page;
  };
  const page = await mk({ ...devices['iPhone 13'], deviceScaleFactor: 2 }, 'phone');
  const ev = (f, a) => page.evaluate(f, a);
  const text = () => ev(() => document.querySelector('#app').innerText);
  const shot = async n => { await page.waitForTimeout(150); await page.screenshot({ path: `shots/r-${n}.png`, fullPage: true }); };
  const nested = () => ev(() => document.querySelectorAll('a a, a button, button a, button button').length);
  const visit = async (hash = '') => { await page.goto(url + '#/' + hash); await page.waitForTimeout(300); };
  const at = async iso => { await page.clock.setSystemTime(new Date(iso)); await page.reload(); await page.waitForTimeout(350); };

  /* A. fresh install, Sunday 10 pm Central (inside the default 9:00–10:30 pm Intake window) */
  await page.clock.install({ time: new Date('2026-11-15T22:00:00-06:00') });
  await page.goto(url); await page.waitForTimeout(350);
  ok(/Your plan/.test(await text()) && await page.$('#wake') && await page.$('#bed'), 'setup asks for day times and a plan');
  ok(await nested() === 0, 'setup: no nested links');
  await shot('setup');
  for (const u of ['b-cell', 'c-atoms']) await page.check(`[data-unit="${u}"]`);
  await page.click('[data-act="begin"]'); await page.waitForTimeout(350);
  const st = await text();
  ok(/your Intake window is now/.test(st) && await page.$('.task.now'), 'Intake marked as suggested inside its window');
  ok(!/Welcome back/.test(st) && await page.$('.week') && await page.$('.sleep'), 'first day: weekly card and sleep check, no Welcome back');
  ok(await nested() === 0, 'Station: no nested links');
  await shot('first-station');
  await page.click('[data-act="week-set"]'); await page.waitForTimeout(150);
  await page.click('[data-sleep="short"]'); await page.waitForTimeout(150);
  ok(await nested() === 0 && /Halved after a short night/.test(await text()), 'short-night note sits outside the Intake link');
  await shot('short-night');
  /* answer two new cards with "I don't know" so today counts as active */
  await visit('intake');
  for (let i = 0; i < 2; i++) {
    if (await ev(() => RUN && RUN.it.type === 'choice')) await page.waitForTimeout(50);
    await page.click('[data-act="dk"]'); await page.waitForTimeout(80);
    ok(await nested() === 0, 'run feedback: no nested links');
    await page.click('#next'); await page.waitForTimeout(80);
  }
  ok(await ev(() => kvGet('lastActive') === today()), 'today marked active');

  /* B. 3:30 am Monday is still Sunday's study day; 4:30 am starts Monday and a new week */
  await at('2026-11-16T03:30:00-06:00');
  ok(await ev(() => dateOfDay(today())) === '2026-11-15' && await page.$('.sleep') == null && await page.$('.week') == null, '3:30 am: same study day, no repeat questions');
  await at('2026-11-16T04:30:00-06:00'); await visit('');
  ok(await ev(() => dateOfDay(today())) === '2026-11-16', '4:30 am: new study day');
  ok(await page.$('.week') && await page.$('.sleep') && !/Welcome back/.test(await text()), 'Monday: new weekly card and sleep check, no Welcome back after one night');
  ok((await ev(() => quotaToday().sleep)) == null, 'yesterday\'s short night does not carry over');

  /* C. three idle days, then back: Welcome back; 10 idle days: a fresh-start season; next month: a month season */
  const answerOne = async () => {
    await visit('rounds'); if (!(await ev(() => !!RUN))) await visit('intake');
    if (await ev(() => RUN && RUN.phase === 'think')) await page.waitForTimeout(50);
    await page.click('[data-act="dk"]'); await page.waitForTimeout(100);
  };
  await at('2026-11-19T09:00:00-06:00'); await visit('');
  const wb = await text();
  ok(/Welcome back/.test(wb) && !/\d+ days?\b/.test(wb.replace(/\d+ active days?/g, '')), 'Thursday: Welcome back without counting days');
  ok(!/Season/i.test(wb), 'a 3-day gap is not a new season');
  await page.click('[data-act="checkin-done"]'); await page.waitForTimeout(200);
  await answerOne();
  ok(await ev(() => kvGet('beacons')) === 1, 'beacon on the first answer back');
  await at('2026-11-30T09:00:00-06:00'); await visit('');
  const fs1 = await text();
  ok(/A fresh start/.test(fs1) && /Season 2/i.test(fs1) && /Welcome back/.test(fs1), '10 idle days: Welcome back and a fresh-start season');
  await page.click('[data-act="checkin-done"]'); await page.waitForTimeout(200);
  await answerOne();
  await at('2026-12-01T09:00:00-06:00'); await visit('');
  const ms = await text();
  ok(/A new month/.test(ms) && /Season 3/i.test(ms) && !/Welcome back/.test(ms), 'December 1, active the day before: a new-month season, no Welcome back');
  ok(/Last season: 1 active day/.test(ms) && !/\b0 new cards|\+0\.0/.test(ms), 'season recap leaves out zeros');
  await shot('season-month');
  await page.click('[data-act="checkin-done"]'); await page.waitForTimeout(200);

  /* D. restore a backup made before v0.1.1 */
  const old = await ev(async () => {
    const d = await exportAll(), kv = Object.assign({}, d.kv);
    for (const k of ['activeDays', 'lastActive', 'calibMonth', 'lastVisit', 'season', 'checkin', 'week', 'plans', 'beacons', 'lastComeback', 'pmAll', 'primerPhase', 'sleepAsked', 'hideExNote']) delete kv[k];
    const s = Object.assign({}, kv.settings); for (const k of ['wakeTime', 'bedTime', 'intakeSlot', 'sleepCheck', 'recoveryPace', 'semesterStarts']) delete s[k]; kv.settings = s;
    for (const k of Object.keys(kv)) if (k.startsWith('sess:')) { const x = JSON.parse(JSON.stringify(kv[k])); delete x.id; delete x.block; delete x.taken; delete x.stats.pm; x.day = today(); kv[k] = x; }
    kv['day:2026-10-20'] = { reviews: 30, newCards: 10, cbm: 12, gain: 3, calib: { 2: { n: 12, correct: 9 }, 3: { n: 8, correct: 7 } } };
    kv['day:2026-11-03'] = { reviews: 25, newCards: 8, cbm: 9, gain: 2, calib: { 1: { n: 5, correct: 2 }, 3: { n: 10, correct: 8 } } };
    return Object.assign(d, { kv });
  });
  fs.writeFileSync('/tmp/old-backup.json', JSON.stringify(old));
  await visit('settings');
  await page.setInputFiles('#import', '/tmp/old-backup.json'); await page.waitForTimeout(600);
  const mig = await ev(() => ({ act: kvGet('activeDays'), last: kvGet('lastActive'), cm: kvGet('calibMonth'), s: S, oct: dayOfDate('2026-10-20') }));
  ok(mig.act.length >= 3 && mig.act.includes(mig.oct), 'old backup: active days rebuilt');
  ok(mig.last === Math.max(...mig.act), 'old backup: last active day rebuilt');
  ok(mig.cm['2026-10'] && mig.cm['2026-10'][3].n === 8 && mig.cm['2026-11'][1].n === 5, 'old backup: monthly calibration rebuilt from daily stats');
  ok(mig.s.wakeTime === '06:45' && mig.s.recoveryPace === 'normal' && Array.isArray(mig.s.semesterStarts), 'old backup: new settings get defaults');
  await visit('');
  const st2 = await text();
  ok(/STATION 528/.test(st2) && await nested() === 0, 'old backup: Station renders');
  await visit('rounds'); await page.waitForTimeout(200);
  const onRun = await ev(() => !!RUN || /DEBRIEF|STATION/.test(document.querySelector('#app').innerText));
  ok(onRun, 'old backup: a run starts from an old session');
  if (await ev(() => !!RUN)) {
    if (await ev(() => RUN.phase === 'think')) { await page.waitForTimeout(3100); }
    await page.click('[data-act="dk"]'); await page.waitForTimeout(100);
    ok(await ev(() => !!(RUN.sess.id && RUN.sess.block)), 'old session gains an id and block tracking');
  }
  await visit('calibration');
  ok(await ev(() => document.querySelectorAll('svg.smx').length) === 3, 'old backup: trend chart from rebuilt months');

  /* E. every screen, phone and desktop: no nested links, no overflow past the viewport */
  const desk = await mk({ viewport: { width: 1280, height: 900 } }, 'desktop');
  await desk.clock.install({ time: new Date('2026-12-01T09:30:00-06:00') });
  await desk.goto(url); await desk.waitForTimeout(300);
  await desk.setInputFiles('#import', '/tmp/old-backup.json').catch(() => {});
  if (await desk.$('[data-act="begin"]')) { await desk.check('[data-unit="b-cell"]'); await desk.click('[data-act="begin"]'); await desk.waitForTimeout(300); }
  for (const [p, nm] of [[page, 'phone'], [desk, 'desktop']]) {
    for (const h of ['', 'settings', 'calibration', 'primer', 'plans', 'tutor', 'flags', 'about', 'wing/2']) {
      await p.goto(url + '#/' + h); await p.waitForTimeout(h === 'tutor' ? 500 : 220);
      const r = await p.evaluate(() => ({ nested: document.querySelectorAll('a a, a button, button a, button button').length, over: document.documentElement.scrollWidth - document.documentElement.clientWidth, ci: !!document.querySelector('[data-act="checkin-done"]') }));
      if (r.ci) { await p.click('[data-act="checkin-done"]'); await p.waitForTimeout(200); }
      ok(r.nested === 0, `${nm} #/${h}: no nested links`);
      ok(r.over <= 0, `${nm} #/${h}: nothing wider than the screen (${r.over}px)`);
    }
    await p.goto(url + '#/'); await p.waitForTimeout(250);
    await p.screenshot({ path: `shots/r-${nm}-station.png`, fullPage: true });
  }
  console.log(errors.length ? errors.join('\n') : 'no errors');
  console.log(fails ? fails + ' failure(s)' : 'review: all checks pass');
  await b.close(); server.close(); process.exit(fails || errors.length ? 1 : 0);
})();
