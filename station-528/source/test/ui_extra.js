/* Optional extra study: review ahead, extra new cards, catch-up; framed as optional. node test/ui_extra.js */
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
  const ctx = await b.newContext({ ...devices['iPhone 13'], deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  page.on('pageerror', e => errors.push('pageerror: ' + e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push('console: ' + m.text()); });
  const ev = (f, a) => page.evaluate(f, a);
  const text = () => ev(() => document.querySelector('#app').innerText);
  const fresh = async () => { await page.goto(url + '#/'); await page.reload(); await page.waitForSelector('#app .top'); await page.waitForTimeout(150); };

  await page.goto(url); await page.waitForTimeout(300);
  await page.check('[data-unit="b-cell"]'); await page.check('[data-unit="c-atoms"]');
  await page.click('[data-act="begin"]'); await page.waitForTimeout(300);
  /* 30 learned cards due over the next 3–10 days; today's Rounds done; today's Intake quota used up */
  await ev(async () => {
    const t = today(), ids = ITEMS.filter(i => i.status === 'active' && ['b-cell', 'b-mem', 'b-mol'].includes(i.unit)).slice(0, 30).map(i => i.id);
    ids.forEach((id, k) => { const c = newCard(id); Object.assign(c, { state: 'review', s: 6 + k, d: 5, last: now() - 5 * DAY, due: t + 3 + (k % 8), reps: 3, intro: t - 9 }); MEM.cards[id] = c; });
    await saveCards(ids.map(id => MEM.cards[id]));
    S.newPerDay = 5; await saveSettings();
    const r = newSession('rounds', t, []); r.done = true; r.taken = 0; r.stats.attempts = 3; await kvSet('sess:rounds', r);
    await kvSet(dayKey(t), { reviews: 12, newCards: 5, cbm: 4, gain: 1, calib: {} });
    await kvSet('week', { start: weekStart(t), goal: 5, focus: null }); await kvSet('sleepAsked', t);
  });
  await fresh();
  let st = await text();
  ok(/Today's essentials are done/.test(st), 'essentials done first');
  ok(/EXTRA STUDY · OPTIONAL/i.test(st) && /Review ahead: 20 cards/.test(st) && /Learn 5 more new cards/.test(st), 'extra study card with review-ahead and new-card options');
  ok(/already enough to stay on track/.test(st) && /2 to 4 reviews/.test(st), 'framed as optional, with the cost of new cards');
  await page.screenshot({ path: 'shots/x-extra.png', fullPage: true });

  /* review ahead: shakiest first, real FSRS review, logged as "ahead" */
  const shakiest = await ev(() => aheadCandidates()[0].id);
  await page.click('[data-act="extra-ahead"]'); await page.waitForTimeout(250);
  ok(await ev(() => RUN && RUN.q.kind === 'ahead' && RUN.it.id) === shakiest, 'review ahead starts with the shakiest card');
  ok(/review ahead \(extra\)/.test(await text()), 'card is labeled as extra');
  const before = await ev(() => ({ due: cardOf(RUN.it.id).due, s: cardOf(RUN.it.id).s, id: RUN.it.id }));
  if (await ev(() => RUN.phase === 'think')) await page.waitForTimeout(3100);
  if (await ev(() => RUN.phase === 'think')) await page.click('[data-act="reveal"]');
  if (await ev(() => RUN.it.type === 'choice')) { await page.click('[data-o="0"]'); await page.click('.conf [data-c="2"]'); }
  else { await ev(() => { RUN.typed = RUN.it.accepted[0]; }); await page.fill('#ans', await ev(() => RUN.it.accepted[0])); await page.click('.conf [data-c="2"]'); }
  await page.waitForTimeout(150);
  const after = await ev(id => ({ due: cardOf(id).due, s: cardOf(id).s, last: dayOf(cardOf(id).last) === today() }), before.id);
  ok(after.last && after.due > await ev(() => today()), 'review ahead updates the schedule');
  const lg = await ev(async () => { const l = await allLogs(); return l[l.length - 1]; });
  ok(lg.selectionReason === 'ahead' && lg.mode === 'rounds', 'logged as a review-ahead');
  await page.click('#next'); await page.waitForTimeout(150);
  await fresh();
  st = await text();
  ok(/Daily Rounds/.test(st) && /\b19\b/.test(st) && !/Today's essentials are done/.test(st), 'Station shows the extra Rounds in progress');
  ok(await ev(() => aheadCandidates().every(c => !kvGet('sess:rounds').queue.some(q => q.id === c.id))), 'queued cards are not offered twice');

  /* extra new cards */
  await ev(async () => { const r = kvGet('sess:rounds'); r.queue = []; r.done = true; await kvSet('sess:rounds', r); });
  await fresh();
  await page.click('[data-act="extra-new"]'); await page.waitForTimeout(300);
  ok(await ev(() => RUN && RUN.q.kind === 'new'), 'extra new cards open Intake');
  ok(await ev(() => quotaToday().quota === 10 && quotaToday().extra === 5), 'quota grows by 5 for today only');
  ok(await ev(() => new Set(kvGet('sess:intake').queue.map(q => q.id)).size) === 5, '5 new cards queued');

  /* backlog: catch-up offered, extra new cards held back */
  await ev(async () => {
    const t = today(), ids = ITEMS.filter(i => i.status === 'active' && ['c-atoms', 'c-bond', 'c-imf'].includes(i.unit)).slice(0, 40).map(i => i.id);
    for (const id of ids) { const c = newCard(id); Object.assign(c, { state: 'review', s: 4, d: 5, last: now() - 6 * DAY, due: t + 1, deferDay: t, deferrals: 1, reps: 2 }); MEM.cards[id] = c; }
    await saveCards(ids.map(id => MEM.cards[id]));
    const is = kvGet('sess:intake'); is.queue = []; await kvSet('sess:intake', is);
    const d = dayStats(t); d.newCards = 10; await kvSet(dayKey(t), d);
  });
  await fresh();
  st = await text();
  ok(/Catch up: 25 more waiting reviews/.test(st) && !/Learn 5 more/.test(st) && /wait until you've caught up/.test(st), 'backlog: catch-up offered, extra new cards held');
  await page.click('[data-act="extra-catchup"]'); await page.waitForTimeout(250);
  ok(await ev(() => RUN && RUN.kind === 'rounds' && kvGet('sess:rounds').queue.length === 25), 'catch-up adds 25 waiting reviews');

  /* final three weeks: no extra new cards */
  await ev(async () => { const t = today(); S.examDate = dateOfDay(t + 15); await saveSettings(); const d = dayStats(t); d.extraNew = 5; await kvSet(dayKey(t), d); });
  ok(await ev(() => quotaToday().quota === 0 && extraOptions().fresh === 0), 'no extra new cards in the last three weeks');

  console.log(errors.length ? errors.join('\n') : 'no errors');
  console.log(fails ? fails + ' failure(s)' : 'extra: all checks pass');
  await b.close(); server.close(); process.exit(fails || errors.length ? 1 : 0);
})();
