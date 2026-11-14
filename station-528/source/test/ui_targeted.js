/* Targeted checks: calculation card, appeal after a confident miss, hint lock, keyboard flow on desktop.
   node test/ui_targeted.js */
const { chromium, devices } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'site');
const server = http.createServer((req, res) => {
  const p = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': p.endsWith('.html') ? 'text/html' : 'application/octet-stream' }); res.end(d); });
}).listen(0);
(async () => {
  const url = `http://localhost:${server.address().port}/`;
  const b = await chromium.launch(); const errors = [];
  const out = {};
  for (const dev of ['phone', 'desktop']) {
    const ctx = await b.newContext(dev === 'desktop' ? { viewport: { width: 1280, height: 860 } } : { ...devices['iPhone 13'], deviceScaleFactor: 2 });
    const page = await ctx.newPage();
    page.on('pageerror', e => errors.push(dev + ' pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(dev + ' console: ' + m.text()); });
    const ev = f => page.evaluate(f);
    const shot = async name => { await page.waitForTimeout(150); await page.screenshot({ path: `shots/t-${dev}-${name}.png`, fullPage: dev === 'phone' }); };
    await page.goto(url); await page.waitForTimeout(300);
    await page.check('[data-unit="p-kin"]'); await page.click('[data-act="begin"]'); await page.waitForTimeout(200);
    await ev(() => { kvSet('sess:intake', newSession('intake', today(), [{ id: 'p-kin.g-vsq', kind: 'new' }, { id: 'b-cell.ser', kind: 'new' }, { id: 'c-bond.nh3-shape', kind: 'new' }])); });
    await page.goto(url + '#/intake'); await page.waitForTimeout(250);
    /* 1. calculation card with the hint: bets above Unsure are locked */
    await shot('calc');
    await page.click('[data-act="hint"]');
    const val = await ev(() => RUN.inst.value);
    await page.fill('#ans', String(+val.toFixed(1)));
    const locked = await ev(() => [...document.querySelectorAll('.conf button')].map(b => b.disabled));
    await page.click('.conf [data-c="1"]'); await page.waitForTimeout(100);
    const calc = await ev(() => ({ ok: RUN.result.ok, grade: RUN.result.grade, cbm: RUN.result.res.cbm }));
    await shot('calc-feedback');
    await page.click('#next'); await page.waitForTimeout(100);
    /* 2. typed: confident miss with a synonym the key lacks, fix it, then appeal */
    await page.fill('#ans', 'smooth endoplasmic retic.');
    await page.click('.conf [data-c="3"]'); await page.waitForTimeout(100);
    const miss = await ev(() => ({ ok: RUN.result.ok, surprise: RUN.result.surprise, echoes: MEM.cards['b-cell.ser'].echoes.length, cbm: RUN.result.res.cbm }));
    await page.fill('#fix', 'smooth er'); await page.waitForTimeout(100);
    await page.click('[data-act="appeal"]'); await page.waitForTimeout(150);
    const appeal = await ev(() => ({ ok: RUN.result.ok, surprise: RUN.result.surprise, echoes: MEM.cards['b-cell.ser'].echoes.length, lapses: MEM.cards['b-cell.ser'].lapses, cbm: RUN.result.res.cbm, sessCbm: RUN.sess.stats.cbm, c3: kvGet('calib', {})[3], extra: kvGet('extraAccepted', {})['b-cell.ser'] }));
    await shot('appealed');
    await page.click('#next'); await page.waitForTimeout(100);
    /* 3. choice by keyboard on desktop: wait for reveal, Space, letter, 2, Enter */
    let kb = null;
    if (dev === 'desktop') {
      await page.waitForTimeout(3100);
      await page.keyboard.press(' '); await page.waitForTimeout(80);
      const keyLetter = await ev(() => 'abcd'[RUN.order.indexOf(0)]);
      await page.keyboard.press(keyLetter); await page.keyboard.press('2'); await page.waitForTimeout(100);
      kb = await ev(() => ({ phase: RUN.phase, ok: RUN.result && RUN.result.ok }));
      await shot('keyboard-feedback');
      await page.keyboard.press('Enter'); await page.waitForTimeout(100);
    }
    out[dev] = { locked, calc, miss, appeal, kb };
    await ctx.close();
  }
  console.log(JSON.stringify(out, null, 1));
  console.log(errors.length ? errors.join('\n') : 'no errors');
  await b.close(); server.close();
})();
