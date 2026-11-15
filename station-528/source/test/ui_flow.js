/* End-to-end run on a phone viewport: setup, Intake, Rounds, surprise loop, flag, appeal, debrief,
   calibration, settings, backup round trip (spec §13.9). node test/ui_flow.js [desktop] */
const { chromium, devices } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const desktop = process.argv[2] === 'desktop';
const root = path.join(__dirname, '..', 'site');
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': p.endsWith('.html') ? 'text/html' : p.endsWith('.js') ? 'text/javascript' : 'application/octet-stream' }); res.end(d); });
}).listen(0);
(async () => {
  const port = server.address().port, url = `http://localhost:${port}/`;
  const b = await chromium.launch(); const errors = [];
  const ctx = await b.newContext(desktop ? { viewport: { width: 1280, height: 860 }, acceptDownloads: true } : { ...devices['iPhone 13'], deviceScaleFactor: 2, acceptDownloads: true });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  const tag = (desktop ? 'd' : 'm') + (process.env.UNITS ? 'x' : '');
  let n = 0; const shot = async name => { await page.waitForTimeout(150); await page.screenshot({ path: `shots/${tag}-${String(++n).padStart(2, '0')}-${name}.png`, fullPage: true }); };
  const ev = f => page.evaluate(f);

  await page.goto(url); await page.waitForTimeout(400);
  await shot('setup');
  for (const u of (process.env.UNITS || 'c-atoms,c-bond,b-cell,b-mem,p-kin').split(',')) await page.check(`[data-unit="${u}"]`);
  await page.click('[data-act="begin"]'); await page.waitForTimeout(300);
  await shot('station-day1');

  /* Intake: answer everything; first card "don't know", a C3 miss on the 3rd distinct card, otherwise mostly right */
  await page.click('a[href="#/intake"]'); await page.waitForTimeout(200);
  let steps = 0, distinct = new Set(), shots = {}, appealed = false, flagged = false;
  while (steps++ < 200) {
    const st = await ev(() => RUN && { id: RUN.it.id, type: RUN.it.type, phase: RUN.phase, key: RUN.it.type === 'choice' ? 0 : RUN.it.type === 'typed' ? RUN.it.accepted[0] : String(RUN.inst ? RUN.inst.value : RUN.it.num.value) });
    if (!st) break;
    const isFirst = !distinct.has(st.id); distinct.add(st.id);
    const k = distinct.size;
    const mode = isFirst && k === 1 ? 'dk' : isFirst && k === 3 ? 'c3wrong' : isFirst && k === 5 && st.type === 'typed' && !appealed ? 'appeal' : (isFirst && Math.random() < 0.15 ? 'wrong' : 'right');
    if (st.type === 'choice') {
      if (!shots.think) { await shot('choice-think'); shots.think = 1; }
      if (mode === 'dk') { await page.click('[data-act="dk"]'); }
      else {
        await page.waitForSelector('[data-act="reveal"]:not([disabled])', { timeout: 5000 });
        await page.click('[data-act="reveal"]');
        const pick = mode === 'right' ? 0 : 1;
        await page.click(`.opt[data-o="${pick}"]`);
        if (!shots.picked) { await shot('choice-picked'); shots.picked = 1; }
        await page.click(`.conf [data-c="${mode === 'c3wrong' ? 3 : mode === 'right' ? 2 : 1}"]`);
      }
    } else {
      if (mode === 'dk') await page.click('[data-act="dk"]');
      else {
        const text = mode === 'right' ? st.key : mode === 'appeal' ? 'definitely ' + st.key + ' thing' : (st.type === 'typed' ? 'zzzz' : '999999');
        await page.fill('#ans', text);
        if (!shots.typed) { await shot('typed'); shots.typed = 1; }
        await page.click(`.conf [data-c="${mode === 'c3wrong' ? 3 : 2}"]`);
      }
    }
    await page.waitForTimeout(80);
    const fb = await ev(() => RUN && RUN.result && { surprise: RUN.result.surprise, fixed: RUN.result.fixed, ok: RUN.result.ok });
    if (fb && fb.surprise && !fb.fixed) {
      await shot('surprise');
      if (st.type === 'choice') await page.click('.opt[data-fix="0"]');
      else await page.fill('#fix', st.key);
      await page.waitForTimeout(80);
      await shot('surprise-fixed');
    } else if (fb && !fb.ok && !shots.wrong) { await shot('feedback-wrong'); shots.wrong = 1; }
    else if (fb && fb.ok && !shots.right) { await shot('feedback-right'); shots.right = 1; }
    if (mode === 'appeal' && !(fb && fb.ok)) { await page.click('[data-act="appeal"]'); await page.waitForTimeout(80); appealed = (await ev(() => RUN.result.ok)) === true; await shot('appealed'); }
    if (!flagged && k === 7 && isFirst) { await page.click('[data-act="flag"]'); await page.waitForTimeout(100); await shot('flag-sheet'); await page.click('[data-reason="Typo or formatting"]'); flagged = true; }
    await page.click('#next');
    await page.waitForTimeout(60);
    if ((await ev(() => location.hash)).startsWith('#/debrief')) break;
  }
  await shot('intake-debrief');
  const after = await ev(() => ({ cards: Object.keys(MEM.cards).length, review: Object.values(MEM.cards).filter(c => c.state === 'review').length, flags: Object.keys(kvGet('flags', {})).length, calib: kvGet('calib', {}), day: dayStats(today()) }));

  /* Rounds: pretend a few days passed (move every card's last review and due date back), then review */
  await ev(() => { const t = today(); for (const c of Object.values(MEM.cards)) { if (c.state !== 'review') continue; c.last -= 3 * DAY; c.due = t; c.echoes = c.echoes.map(e => Math.min(e, t)); saveCard(c); } kvSet('sess:rounds', null); });
  await page.goto(url + '#/'); await page.waitForTimeout(300);
  await shot('station-due');
  await page.click('a[href="#/rounds"]'); await page.waitForTimeout(150);
  let rsteps = 0;
  while (rsteps++ < 200) {
    const st = await ev(() => RUN && { type: RUN.it.type, key: RUN.it.type === 'choice' ? 0 : RUN.it.type === 'typed' ? RUN.it.accepted[0] : String(RUN.inst ? RUN.inst.value : RUN.it.num.value) });
    if (!st) break;
    if (st.type === 'choice') { await page.waitForSelector('[data-act="reveal"]:not([disabled])', { timeout: 5000 }); await page.click('[data-act="reveal"]'); await page.click('.opt[data-o="0"]'); await page.click('.conf [data-c="3"]'); }
    else { await page.fill('#ans', st.key); await page.click('.conf [data-c="3"]'); }
    if (rsteps === 2) await shot('rounds-feedback');
    await page.click('#next'); await page.waitForTimeout(50);
    if ((await ev(() => location.hash)).startsWith('#/debrief')) break;
  }
  await shot('rounds-debrief');
  await page.goto(url + '#/'); await page.waitForTimeout(250); await shot('station-after');
  await page.goto(url + '#/calibration'); await page.waitForTimeout(200); await shot('calibration');
  await page.goto(url + '#/wing/2'); await page.waitForTimeout(200); await shot('wing');
  await page.goto(url + '#/settings'); await page.waitForTimeout(250); await shot('settings');
  await page.goto(url + '#/about'); await page.waitForTimeout(150); await shot('about');

  /* §13.9 backup round trip: export, wipe, import -> identical cards and logs */
  await page.goto(url + '#/settings'); await page.waitForTimeout(200);
  const [dl] = await Promise.all([page.waitForEvent('download'), page.click('[data-act="export"]')]);
  const file = path.join(__dirname, '..', 'shots', 'backup.json'); await dl.saveAs(file);
  const before = await ev(async () => ({ cards: JSON.stringify(Object.values(MEM.cards).sort((a, b) => a.id < b.id ? -1 : 1)), logs: (await allLogs()).length }));
  await ev(() => wipeAll());
  const wiped = await ev(async () => ({ cards: Object.keys(MEM.cards).length, logs: (await allLogs()).length }));
  page.once('dialog', d => d.accept());
  await page.setInputFiles('#import', file); await page.waitForTimeout(600);
  const restored = await ev(async () => ({ cards: JSON.stringify(Object.values(MEM.cards).sort((a, b) => a.id < b.id ? -1 : 1)), logs: (await allLogs()).length }));
  await page.reload(); await page.waitForTimeout(400);
  const reloaded = await ev(async () => ({ cards: JSON.stringify(Object.values(MEM.cards).sort((a, b) => a.id < b.id ? -1 : 1)), logs: (await allLogs()).length, setup: S.setupDone }));
  console.log(JSON.stringify({ intake: after, appealed, flagged, wiped, roundTrip: before.cards === restored.cards && before.logs === restored.logs && reloaded.cards === before.cards && reloaded.logs === before.logs, logs: before.logs, setupKept: reloaded.setup }));
  console.log(errors.length ? errors.join('\n') : 'no errors');
  await b.close(); server.close();
})();
