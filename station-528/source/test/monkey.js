/* Random tapping across the whole app. node test/monkey.js [steps] [seed] */
const { chromium, devices } = require('playwright');
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..', 'site');
const server = http.createServer((req, res) => { const p = path.join(root, req.url.split('?')[0].replace(/\/$/, '/index.html')); fs.readFile(p, (e, d) => { if (e) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': p.endsWith('.html') ? 'text/html' : 'application/octet-stream' }); res.end(d); }); }).listen(0);
const steps = +process.argv[2] || 300; let seed = +process.argv[3] || 1;
const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
(async () => {
  const url = `http://localhost:${server.address().port}/`;
  const b = await chromium.launch(); const ctx = await b.newContext({ ...devices['iPhone 13'] });
  const page = await ctx.newPage(); const errors = [];
  page.on('pageerror', e => errors.push(e.message)); page.on('dialog', d => (rnd() < 0.2 ? d.accept() : d.dismiss()));
  await page.goto(url); await page.waitForTimeout(300);
  await page.check('[data-unit="c-gas"]'); await page.check('[data-unit="p-fluid"]'); await page.check('[data-unit="b-gen"]'); await page.click('[data-act="begin"]');
  for (let i = 0; i < steps; i++) {
    const els = await page.$$('button:not([disabled]), a[href], input[type=checkbox], input#ans, input#fix, select');
    if (!els.length) { await page.goto(url + '#/'); continue; }
    const el = els[Math.floor(rnd() * els.length)];
    try {
      const tag = await el.evaluate(e => e.tagName + (e.type ? ':' + e.type : '') + (e.dataset.act ? ':' + e.dataset.act : ''));
      if (tag.includes('wipe') && rnd() < 0.8) continue;
      if (tag.startsWith('INPUT:text') || tag.startsWith('INPUT:search')) await el.fill(rnd() < 0.5 ? String(Math.round(rnd() * 100)) : 'answer');
      else if (tag.startsWith('SELECT')) { const opts = await el.$$eval('option', o => o.map(x => x.value)); await el.selectOption(opts[Math.floor(rnd() * opts.length)]); }
      else await el.click({ timeout: 1000 });
      if (tag.includes('reveal')) await page.waitForTimeout(3100);
    } catch (e) { /* element went away: fine */ }
    await page.waitForTimeout(25);
  }
  const st = await page.evaluate(() => ({ cards: Object.keys(MEM.cards).length, hash: location.hash }));
  console.log(`monkey ${steps} taps: ${errors.length} error(s)`, JSON.stringify(st)); errors.slice(0, 5).forEach(e => console.log(' ', e));
  await b.close(); server.close();
})();
