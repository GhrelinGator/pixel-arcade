/* Station 528 UI: Station hub, Daily Rounds, Intake, Debrief, Calibration, Settings. */
'use strict';

const $ = s => document.querySelector(s);
const app = () => $('#app');
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = s => esc(s).replace(/\^(-?\d+)/g, '<sup>$1</sup>');
const pct = (x, d = 0) => x == null ? '—' : (100 * x).toFixed(d) + '%';
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const UNIT_ORDER = Object.fromEntries(UNITS.map((u, i) => [u.id, { i, course: u.course }]));
const CATEGORY_COUNT = 31; /* AAMC content categories 1A … 10A */
let S = null;      /* settings */
let RUN = null;    /* the card on screen */

function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove('on'), 2600); }
self.toast = toast;

/* ---------- settings & helpers ---------- */
const DEFAULTS = { setupDone: false, examDate: '2029-01-20', phase: 'auto', openUnits: [], reviewCap: 150, newPerDay: null, lastExportAt: null, sweepDone: false,
  /* delta v2 */ wakeTime: '06:45', bedTime: '23:00', intakeSlot: 'evening', sleepCheck: true, recoveryPace: 'normal', semesterStarts: [] };
function loadSettings() { S = Object.assign({}, DEFAULTS, kvGet('settings', {})); }
function saveSettings() { return kvSet('settings', S); }
const now = () => Date.now();
const today = () => dayOf(now());
const examDay = () => dayOfDate(S.examDate);
const phase = () => phaseOn(today(), examDay(), S.phase);
const cardOf = id => MEM.cards[id];
const isActive = c => c && c.state === 'review' && !c.suspended && ITEM[c.id] && ITEM[c.id].status !== 'quarantined';
const activeCards = () => Object.values(MEM.cards).filter(isActive);
const flags = () => kvGet('flags', {});
const dayKey = d => 'day:' + dateOfDay(d);
const dayStats = d => kvGet(dayKey(d), { reviews: 0, newCards: 0, cbm: 0, gain: 0, calib: {} });
const medianFor = kind => { const xs = kvGet('times', {})[kind] || []; return xs.length >= 10 ? median(xs) : null; }; /* no 'slow' rule until there are 10 timings */
function wingOf(it) { return it.fc; }
const capNow = () => paceCap(S.reviewCap, S.recoveryPace);
const localMin = () => { const d = new Date(); return d.getHours() * 60 + d.getMinutes(); };
const fmtDay = d => new Date(msOfDay(d)).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
const whenText = d => d == null ? null : d === today() + 1 ? 'tomorrow' : fmtDay(d);
const thisWeek = () => { const w = kvGet('week', null); return w && w.start === weekStart(today()) ? w : null; };
const focusWing = () => { const w = thisWeek(); return w && w.focus != null ? w.focus : undefined; };
/* today's new-card quota and why it is what it is */
function quotaToday() {
  const t = today(), T = examDay();
  const base = newQuota(phase(), t, T, S.newPerDay);
  const thr = throttledQuota(base, Object.values(MEM.cards), t, S.reviewCap, capNow());
  const sleep = dayStats(t).sleepFlag;
  return { quota: sleepQuota(thr, sleep), base, thr, sleep, stopped: t >= T - 21 };
}
const curWindow = () => intakeWindow(S.intakeSlot, S.wakeTime, S.bedTime);
/* D2: "Back on schedule by <date>". null when nothing is piling up. */
function backlogInfo() {
  const t = today(), cap = capNow(), act = activeCards();
  const rs = kvGet('sess:rounds'), built = rs && rs.day === t;
  const carry0 = built ? 0 : Math.max(0, act.filter(c => c.due <= t).length - cap);
  const deferred = built ? act.filter(c => c.deferDay === t && c.due === t + 1).length : 0;
  if (!carry0 && !deferred) return null;
  return { by: backOnSchedule(act, t, cap, carry0), cap };
}
const backlogText = b => b.by == null ? 'more than two weeks to get back on schedule at this pace' : `back on schedule by ${whenText(b.by)}`;
/* activity: a day counts once any card is answered. Returns true on the first answer after 1+ idle days (D2). */
function markActive(t) {
  const L = kvGet('lastActive', null);
  if (L === t) return false;
  const comeback = L != null && t - L >= 2;
  if (comeback) { const n = kvGet('beacons', 0) + 1; kvSet('beacons', n); kvSet('lastComeback', { day: t, n }); }
  kvSet('lastActive', t);
  const a = kvGet('activeDays', []); if (!a.includes(t)) { a.push(t); while (a.length > 400) a.shift(); kvSet('activeDays', a); }
  return comeback;
}
const activeInWeek = ws => kvGet('activeDays', []).filter(d => d >= ws && d < ws + 7);

function initItems() {
  const fl = flags();
  for (const it of ITEMS) {
    const v = CROSSCHECK.verdicts[it.id];
    it.status = v === 'disagree' ? 'quarantined' : v ? 'active' : 'pending';
    if (fl[it.id] && fl[it.id].suspended) it.status = 'quarantined';
  }
}

/* ---------- routing ---------- */
function go(hash) { if (location.hash === hash) render(); else location.hash = hash; }
window.addEventListener('hashchange', render);
function render() {
  closeSheet();
  RUN = null;
  window.scrollTo(0, 0);
  if (!S.setupDone) return viewSetup();
  const h = location.hash.replace(/^#\/?/, '');
  const [r, arg] = h.split('/');
  if (r !== 'plans') PLAN_DRAFT = null; /* leaving Plans without saving discards the draft */
  if (!r || r === 'rounds' || r === 'intake') { dailyCheck(); const ci = kvGet('checkin'); if (ci && ci.day === today() && !ci.done) return viewCheckin(); }
  if (r === 'checkin') return viewCheckin();
  if (r === 'plans') return viewPlans();
  if (r === 'primer') return viewPrimer();
  if (r === 'tutor') return viewTutor(arg);
  if (r === 'rounds' || r === 'intake') return startRun(r);
  if (r === 'debrief') return viewDebrief(arg);
  if (r === 'calibration') return viewCalibration();
  if (r === 'settings') return viewSettings();
  if (r === 'flags') return viewFlags();
  if (r === 'wing') return viewWing(+arg);
  if (r === 'about') return viewAbout();
  return viewStation();
}
function topBar(title, sub, back = '#/') {
  return `<div class="top"><a class="ib" href="${back}" aria-label="Back to the Station">←</a><div class="grow"><h1>${esc(title)}</h1>${sub ? `<div class="sub">${sub}</div>` : ''}</div></div>`;
}

/* ---------- Station (hub) ---------- */
function todayCounts() {
  const t = today(), T = examDay();
  const rs = kvGet('sess:rounds');
  let rounds;
  if (rs && rs.day === t) rounds = { n: rs.queue.length, built: true, done: !rs.queue.length };
  else {
    const all = Object.values(MEM.cards).filter(isActive);
    const due = all.filter(c => c.due <= t).length, ech = all.filter(c => c.due > t && c.echoes.some(e => e <= t)).length;
    rounds = { n: Math.min(due, capNow()) + ech, built: false, done: false };
  }
  rounds.backlog = backlogInfo();
  const is = kvGet('sess:intake');
  const q = quotaToday(), quota = q.quota;
  const introduced = dayStats(t).newCards;
  const remaining = Math.max(0, quota - introduced);
  const avail = S.openUnits.length ? pickIntake(ITEMS, MEM.cards, S.openUnits, remaining, UNIT_ORDER, focusWing()).length : 0;
  const inQueue = is && is.day === t ? is.queue.length : 0;
  return { rounds, intake: { inQueue, newLeft: avail, quota, introduced, noUnits: !S.openUnits.length, q } };
}
function stationNumbers() {
  const act = activeCards(), T = examDay();
  const recall = act.length ? act.reduce((a, c) => a + rExam(c, T), 0) / act.length : null;
  const mature = {};
  for (const c of act) if (c.s >= 21) { const cat = ITEM[c.id].cat; mature[cat] = (mature[cat] || 0) + 1; }
  const covered = Object.values(mature).filter(n => n >= 20).length;
  let rank = 0; const wings = {};
  for (const w of WINGS) { const st = wingStats(act.filter(c => ITEM[c.id].fc === w.id), now()); wings[w.id] = st; rank += st.level; }
  return { recall, covered, rank, wings, n: act.length };
}
function viewStation() {
  const t = today(), T = examDay(), ph = phase();
  const tc = todayCounts(), sn = stationNumbers();
  const cal = calibration(kvGet('calib', {}));
  const exportDue = sn.n > 0 && (!S.lastExportAt || now() - Date.parse(S.lastExportAt) > 7 * DAY);
  const r = tc.rounds, ik = tc.intake, ds = dayStats(t);
  const roundsDone = r.done || (!r.built && r.n === 0);
  const pace = S.recoveryPace !== 'normal' ? ` at ${PACES[S.recoveryPace].name.toLowerCase()} pace` : '';
  const roundsTask = roundsDone
    ? `<div class="task done"><div class="grow"><b>Daily Rounds</b><span class="small">${r.done ? 'Cleared for today.' : 'Nothing due yet.'}${r.backlog ? ` ${backlogText(r.backlog)[0].toUpperCase() + backlogText(r.backlog).slice(1)}${pace}.` : ''}</span></div><div class="n">✓</div></div>`
    : `<div class="task"><div class="grow"><a href="#/rounds" style="text-decoration:none;color:inherit"><b>Daily Rounds</b><span class="small muted">Reviews the scheduler says are due</span></a>${r.backlog ? `<span class="small muted sub2">Catching up: ${backlogText(r.backlog)}${pace} · <a href="#" data-act="pace">change pace</a></span>` : ''}</div><div class="n">${r.n}</div><a class="btn primary" href="#/rounds">${r.built ? 'Resume' : 'Start'}</a></div>`;
  const win = curWindow(), nowIn = inWindow(win, localMin());
  const winText = win ? (nowIn ? ' · your Intake window is now' : ` · best ${clock(win[0])}–${clock(win[1])}`) : '';
  const sleepNote = ik.q.sleep === 'short' && ik.q.thr > 0 ? ` · Halved after a short night · <a href="#" data-act="sleep-change">change</a>` : '';
  let intakeTask;
  if (ik.inQueue) intakeTask = `<a class="task${nowIn ? ' now' : ''}" href="#/intake" style="text-decoration:none;color:inherit"><div class="grow"><b>Intake</b><span class="small muted">New cards, each until you recall it 3 times${winText}</span></div><div class="n">${ik.inQueue}</div><span class="btn">Resume</span></a>`;
  else if (ik.noUnits) intakeTask = `<a class="task" href="#/settings" style="text-decoration:none;color:inherit"><div class="grow"><b>Intake</b><span class="small muted">Choose the units your classes have covered.</span></div><span class="btn">Choose</span></a>`;
  else if (ik.newLeft) intakeTask = `<div class="task${nowIn ? ' now' : ''}"><div class="grow"><a href="#/intake" style="text-decoration:none;color:inherit"><b>Intake</b><span class="small muted">New cards from your open units (${ik.introduced}/${ik.quota} today)${winText}</span></a>${sleepNote ? `<span class="small muted sub2">${sleepNote.replace(/^ · /, '')}</span>` : ''}</div><div class="n">${ik.newLeft}</div><a class="btn" href="#/intake">Start</a></div>`;
  else {
    const why = ik.quota > 0 ? (ik.introduced ? 'Done for today.' : 'No new cards left in your open units. Open more in Settings.')
      : ik.q.stopped ? 'New cards have stopped for the final three weeks.'
      : ik.q.sleep === 'poor' && ik.q.thr > 0 ? 'No new cards today after a poor night. Reviews are unchanged. <a href="#" data-act="sleep-change">Change</a>'
      : ik.q.sleep === 'short' && ik.q.thr > 0 ? 'Done for today (halved after a short night). <a href="#" data-act="sleep-change">Change</a>'
      : 'Paused while you catch up on reviews. New cards come back on their own.';
    intakeTask = `<div class="task done"><div class="grow"><b>Intake</b><span class="small">${why}</span></div><div class="n">✓</div></div>`;
  }
  const intakeDone = !ik.inQueue && !ik.newLeft && !ik.noUnits;
  const essentials = roundsDone && (intakeDone || ik.noUnits) && ds.reviews > 0;
  const askSleep = S.sleepCheck && !ds.sleepFlag && kvGet('sleepAsked') !== t && !essentials;
  const sleepRow = askSleep ? `<div class="sleep"><div class="row between"><span class="small">How did you sleep last night?</span><button class="chip ghost" data-act="sleep-skip" aria-label="Skip the sleep question">✕</button></div><div class="sleepbtns">${['normal', 'short', 'poor'].map(f => `<button class="chip" data-sleep="${f}">${f[0].toUpperCase() + f.slice(1)}</button>`).join('')}</div></div>` : '';
  const beacons = kvGet('beacons', 0);
  const plan = ['BB', 'CP', 'PS', 'CARS'].map(sec => {
    const ws = WINGS.filter(w => w.sec === sec);
    const label = { BB: 'Bio / Biochem', CP: 'Chem / Phys', PS: 'Psych / Soc', CARS: 'Reading' }[sec];
    return `<div class="sect"><span class="lbl">${label}</span></div><div class="wings">${ws.map(w => wingHTML(w, sn.wings[w.id])).join('')}</div>`;
  }).join('');

  app().innerHTML = `
    <div class="top"><div class="grow"><h1>STATION 528</h1><div class="sub">${T - t} days to exam · Phase ${ph}, ${PHASES[ph].name}${beacons ? ` · <span title="Comeback beacons: one for each time you came back after a break">✦ ${beacons}</span>` : ''}</div></div>
      <a class="ib" href="#/calibration" aria-label="Calibration">◎</a><a class="ib" href="#/settings" aria-label="Settings">⚙</a></div>
    ${exportDue ? `<div class="banner">Your progress lives only in this browser. ${S.lastExportAt ? 'Your last backup is over a week old.' : 'You haven\'t made a backup yet.'}<div class="row"><button class="btn primary" data-act="export">Export backup</button></div></div>` : ''}
    ${essentials ? `<div class="essentials"><b>✓ Today's essentials are done.</b> Anything more is optional.</div>` : ''}
    ${sleepRow}
    ${thisWeek() ? '' : weekCardHTML()}
    ${kvGet('primerPhase', ph) !== ph ? `<div class="note small"><span class="grow">New phase. <a href="#/primer">A two-minute refresher</a> on what your bets mean.</span><button class="chip ghost" data-act="primer-ok" aria-label="Dismiss">✕</button></div>` : ''}
    <div class="today">${roundsTask}${intakeTask}</div>
    ${weekRowHTML()}
    <div class="tiles">
      <div class="tile"><div class="lbl">Exam-day recall</div><div class="v">${pct(sn.recall)}</div><div class="d">if you stopped reviewing today</div></div>
      <div class="tile"><div class="lbl">Outline</div><div class="v">${sn.covered}/${CATEGORY_COUNT}</div><div class="d">categories with 20 cards held 3+ weeks</div></div>
      <div class="tile"><div class="lbl">Station rank</div><div class="v">${sn.rank}</div><div class="d">sum of wing levels, max 55</div></div>
    </div>
    <a class="task" href="#/calibration" style="text-decoration:none;color:inherit"><div class="grow"><b>Calibration</b><span class="small muted">${calSummary(cal)}</span></div><span class="ib" aria-hidden="true">→</span></a>
    <div class="plan">${plan}</div>
    <p class="small muted" style="margin-top:16px">Lights show how much of each wing you'd recall right now; bars show how much has held for 3+ weeks. Nothing ever breaks: a dim wing just needs reviews.</p>`;
  bindWeekCard();
}
function wingHTML(w, st) {
  const total = ITEMS.filter(i => i.fc === w.id && i.status !== 'quarantined').length;
  if (!st.n) return `<a class="wing empty" href="#/wing/${w.id}" style="text-decoration:none"><span class="fc">${w.id ? 'FC' + w.id : 'CARS'}</span><div class="nm">${esc(w.name)}</div><div class="meta">${total ? total + ' cards waiting' : 'no cards yet'}</div></a>`;
  const lit = Math.round(st.condition * 8);
  return `<a class="wing" href="#/wing/${w.id}" style="text-decoration:none;color:inherit" aria-label="${esc(w.name)}: recall ${pct(st.condition)}, level ${st.level} of 5">
    <span class="fc">${w.id ? 'FC' + w.id : 'CARS'}</span><div class="nm">${esc(w.name)}</div>
    <div class="win">${Array.from({ length: 8 }, (_, i) => `<i class="${i < lit ? 'on' : ''}"></i>`).join('')}</div>
    <div class="pips">${Array.from({ length: 5 }, (_, i) => `<i class="${i < st.level ? 'on' : ''}"></i>`).join('')}</div>
    <div class="meta">${st.n}/${total} cards · ${pct(st.condition)} now</div></a>`;
}
function calSummary(cal) {
  if (cal.n < 10) return 'Bet honestly: after a few dozen answers this shows whether your "Sure" really means sure.';
  const c3 = cal.levels[2];
  const oc = cal.overconfidence;
  return `${cal.n} bets · ${c3.n >= 10 ? `"Sure" is right ${pct(c3.acc)} of the time (target 80%+)` : 'not enough "Sure" bets yet'} · ${oc > 0.03 ? 'overconfident by ' + Math.round(oc * 100) + ' pts' : oc < -0.03 ? 'underconfident by ' + Math.round(-oc * 100) + ' pts' : 'well calibrated'}`;
}

/* ---------- delta v2: re-entry, seasons, weekly card, plans ---------- */
/* First visit of each study day: spot a return after idle days (D2) and season changes (D16). */
function dailyCheck() {
  const t = today();
  if (kvGet('primerPhase') == null) kvSet('primerPhase', phase());
  if (kvGet('lastVisit') === t) return;
  kvSet('lastVisit', t);
  const L = kvGet('lastActive', null);
  const idle = L == null ? 0 : t - L - 1; /* whole days with no answers */
  let season = kvGet('season', null), fresh = null, prev = null;
  if (!season) kvSet('season', { id: 1, start: t, trigger: 'start' });
  else {
    const trig = idle >= 7 && season.start <= L ? 'lapse'
      : monthOf(t) !== monthOf(season.start) ? 'month'
      : (S.semesterStarts || []).some(x => { const d = dayOfDate(x); return d > season.start && d <= t; }) ? 'semester' : null;
    if (trig) { prev = seasonRecap(season, t); fresh = { id: season.id + 1, start: t, trigger: trig }; kvSet('season', fresh); }
  }
  if (idle >= 1 || fresh) kvSet('checkin', { day: t, welcome: idle >= 1, season: fresh, prev, done: false });
}
function seasonRecap(season, t) {
  let days = 0, learned = 0, gain = 0;
  for (let d = season.start; d < t; d++) { const x = kvGet(dayKey(d)); if (x && x.reviews) { days++; learned += x.newCards || 0; gain += x.gain || 0; } }
  return { id: season.id, days, learned, gain };
}
/* only what actually happened: no "0 cards learned" */
function seasonLine(p) {
  if (!p || !p.days) return '';
  const bits = [`${p.days} active day${p.days === 1 ? '' : 's'}`];
  if (p.learned) bits.push(`${p.learned} new card${p.learned === 1 ? '' : 's'} learned`);
  if (p.gain >= 0.1) bits.push(`+${p.gain.toFixed(1)} exam-day items`);
  return ` Last season: ${bits.length > 2 ? bits.slice(0, -1).join(', ') + ' and ' + bits[bits.length - 1] : bits.join(' and ')}.`;
}
const SEASON_TITLE = { month: 'A new month', semester: 'A new semester', lapse: 'A fresh start', start: 'Season one' };
function viewCheckin() {
  const t = today(), ci = kvGet('checkin');
  if (!ci || ci.day !== t || ci.done) return go('#/');
  RUN = null;
  const plans = kvGet('plans', []), b = backlogInfo();
  const welcome = ci.welcome ? `<div class="card stack"><h2>Welcome back</h2>
      <p>Good to see you. Coming back is the part that counts, and one gap doesn't undo a habit.</p>
      <p class="small muted">Your reviews are already sorted so the cards you're closest to forgetting come first. Your first answer today lights a comeback beacon on the Station.</p>
      ${b ? `<p class="small">At this pace you'll be <b>${backlogText(b)}</b>. Pick a pace for catching up:</p>${paceButtons()}` : ''}</div>` : '';
  const p = ci.prev, season = ci.season ? `<div class="card stack"><div class="lbl">Season ${ci.season.id}</div><h2>${SEASON_TITLE[ci.season.trigger]}</h2>
      <p>${ci.season.trigger === 'lapse' ? 'A new season starts today, with a clean slate.' : 'A new season starts today.'}${seasonLine(p)}</p>
      <p class="small muted">New seasons are a good moment to check that your plan still fits how your days run.</p></div>` : '';
  app().innerHTML = `<div class="top"><div class="grow"><h1>STATION 528</h1><div class="sub">${esc(fmtDay(t))}</div></div></div>
    ${welcome}${season}${planRehearsalHTML(plans, true)}
    <button class="btn primary block" data-act="checkin-done" style="margin-top:6px">Continue</button>`;
}
function paceButtons() {
  return `<div class="seg" role="group" aria-label="Recovery pace">${Object.entries(PACES).map(([k, v]) => `<button class="${S.recoveryPace === k ? 'on' : ''}" data-pace="${k}" aria-pressed="${S.recoveryPace === k}"><b>${v.name}</b><span>${paceCap(S.reviewCap, k)}/day</span></button>`).join('')}</div>`;
}
/* Pace change: if today's Rounds were already built, pull back cards that were pushed to tomorrow, up to the new cap. */
function setPace(p) {
  S.recoveryPace = p; saveSettings();
  const t = today(), rs = kvGet('sess:rounds');
  if (!rs || rs.day !== t || rs.taken == null) return;
  const extra = capNow() - rs.taken; if (extra <= 0) return;
  const n = now();
  const add = activeCards().filter(c => c.deferDay === t && c.due === t + 1)
    .sort((a, b) => ((b.deferrals >= 3) - (a.deferrals >= 3)) || (rNow(a, n) - rNow(b, n))).slice(0, extra);
  if (!add.length) return;
  for (const c of add) { c.due = t; c.deferrals = Math.max(0, (c.deferrals || 1) - 1); c.deferDay = null; }
  saveCards(add);
  rs.queue.push(...add.map(c => ({ id: c.id, kind: 'review' }))); rs.taken += add.length; rs.done = false;
  kvSet('sess:rounds', rs);
}
function paceSheet() {
  const b = backlogInfo();
  openSheet(`<h2>Catch-up pace</h2><p class="small">${b ? `At this pace: <b>${backlogText(b)}</b>.` : 'Nothing is piling up right now.'} The order stays the same: the cards you're closest to forgetting go first.</p>${paceButtons()}
    <div class="row end" style="margin-top:12px"><button class="btn" data-act="sheet-close">Done</button></div>`);
}

/* D3 if-then plans */
const CUES = ['I finish breakfast', 'I get back from class', 'I finish lunch', 'I finish dinner', 'I finish my homework for the night', 'I get to the library'];
const PLAN_ACTIONS = { rounds: 'do Daily Rounds', intake: 'do Intake', both: 'do Daily Rounds, then Intake' };
const PLACES = ['my desk', 'the library', 'the kitchen table', 'my usual study spot'];
const planText = p => `If ${p.cue}, then I will ${PLAN_ACTIONS[p.action] || p.action} at ${p.place}.`;
const planDefault = i => i === 0 ? { cue: CUES[0], action: 'rounds', place: PLACES[0] } : { cue: CUES[4], action: 'intake', place: PLACES[0] };
function planRehearsalHTML(plans, inCheckin) {
  const t = today();
  if (!plans.length) return `<div class="card small"><b>Make a plan.</b> Tying study to something you already do each day makes it far more likely to happen: "If I finish breakfast, then I will do Daily Rounds at my desk." <div class="row" style="margin-top:8px"><a class="btn" href="#/plans">Write a plan</a>${inCheckin ? '' : ''}</div></div>`;
  const done = plans.every(p => p.lastRehearsedAt === t);
  return `<div class="card"><div class="lbl">Your plan${plans.length > 1 ? 's' : ''}</div>${plans.map(p => `<p class="plantext">${esc(planText(p))}</p>`).join('')}
    ${done ? '<p class="small muted">✓ Still true.</p>' : `<div class="row"><button class="btn" data-act="plan-ok">Still true</button><a class="btn ghost" href="#/plans">Edit</a></div>`}</div>`;
}
let PLAN_DRAFT = null;
function planEditorHTML(p, i) {
  const opt = (list, v) => list.map(x => `<option ${x === v ? 'selected' : ''}>${esc(x)}</option>`).join('') + `<option value="__other" ${list.includes(v) ? '' : 'selected'}>Something else…</option>`;
  return `<div class="card planed" data-i="${i}">
    <div class="field"><label class="lbl" for="cue${i}">If…</label><select id="cue${i}" data-pf="cue">${opt(CUES, p.cue)}</select>${CUES.includes(p.cue) ? '' : `<input data-pt="cue" value="${esc(p.cue)}" placeholder="I finish…" aria-label="Your cue">`}</div>
    <div class="field"><label class="lbl" for="act${i}">then I will…</label><select id="act${i}" data-pf="action">${Object.entries(PLAN_ACTIONS).map(([k, v]) => `<option value="${k}" ${p.action === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
    <div class="field"><label class="lbl" for="pl${i}">at…</label><select id="pl${i}" data-pf="place">${opt(PLACES, p.place)}</select>${PLACES.includes(p.place) ? '' : `<input data-pt="place" value="${esc(p.place)}" placeholder="the place" aria-label="Your place">`}</div>
    <p class="plantext small" data-preview>${esc(planText(p))}</p>
    ${i > 0 || PLAN_DRAFT.length > 1 ? `<button class="btn ghost small" data-act="plan-del" data-i="${i}">Remove this plan</button>` : ''}</div>`;
}
function bindPlanEditor(rerender) {
  document.querySelectorAll('.planed').forEach(el => {
    const i = +el.dataset.i, p = PLAN_DRAFT[i];
    const preview = () => { el.querySelector('[data-preview]').textContent = planText(p); };
    el.querySelectorAll('[data-pf]').forEach(sel => sel.addEventListener('change', () => {
      const f = sel.dataset.pf;
      if (sel.value === '__other') { p[f] = ''; rerender(); const inp = document.querySelector(`.planed[data-i="${i}"] [data-pt="${f}"]`); if (inp) inp.focus(); return; }
      p[f] = sel.value; if (f !== 'action') rerender(); else preview();
    }));
    el.querySelectorAll('[data-pt]').forEach(inp => inp.addEventListener('input', () => { p[inp.dataset.pt] = inp.value.trim().replace(/[.,]+$/, ''); preview(); }));
  });
  document.querySelectorAll('[data-act="plan-del"]').forEach(b => b.addEventListener('click', () => { PLAN_DRAFT.splice(+b.dataset.i, 1); rerender(); }));
}
function viewPlans() {
  if (!PLAN_DRAFT) PLAN_DRAFT = kvGet('plans', []).map(p => Object.assign({}, p));
  if (!PLAN_DRAFT.length) PLAN_DRAFT.push(planDefault(0));
  app().innerHTML = `${topBar('PLANS', 'Up to two')}
    <p class="small muted">Pick something you already do every day as the cue, then say what you'll do and where. Specific plans like this make follow-through much more likely, especially when you look them over now and then.</p>
    ${PLAN_DRAFT.map(planEditorHTML).join('')}
    ${PLAN_DRAFT.length < 2 ? `<button class="btn ghost" data-act="plan-add">+ Add a second plan</button>` : ''}
    <button class="btn primary block" data-act="plan-save" style="margin-top:10px">Save</button>`;
  bindPlanEditor(viewPlans);
}
function savePlans() {
  const t = today(), clean = PLAN_DRAFT.filter(p => p.cue && p.place).slice(0, 2);
  kvSet('plans', clean.map((p, i) => ({ id: p.id || 'plan' + (i + 1) + '-' + t, cue: p.cue, action: p.action, place: p.place, createdAt: p.createdAt || dateOfDay(t), lastRehearsedAt: t })));
  PLAN_DRAFT = null;
}

/* D16 weekly card: plan rehearsal, active-days goal, optional focus wing */
let WEEK_DRAFT = null;
function weekCardHTML() {
  const last = kvGet('week', null), plans = kvGet('plans', []);
  if (!WEEK_DRAFT) WEEK_DRAFT = { goal: last ? last.goal : 5, focus: null };
  const avail = new Set(ITEMS.filter(i => S.openUnits.includes(i.unit) && i.status === 'active' && !(MEM.cards[i.id] && MEM.cards[i.id].state !== 'new')).map(i => i.fc));
  return `<div class="card week"><div class="lbl">This week</div>
    ${plans.length ? `${plans.map(p => `<p class="plantext">${esc(planText(p))}</p>`).join('')}${plans.every(p => p.lastRehearsedAt === today()) ? '' : `<div class="row"><button class="btn small" data-act="plan-ok">Still true</button><a class="btn ghost small" href="#/plans">Edit</a></div>`}`
      : `<p class="small">No plan yet. <a href="#/plans">Write one</a>: "If I finish breakfast, then I will do Daily Rounds at my desk."</p>`}
    <div class="two">
      <div class="field"><label class="lbl" for="goal">Active days goal</label><select id="goal">${[3, 4, 5, 6, 7].map(n => `<option value="${n}" ${WEEK_DRAFT.goal === n ? 'selected' : ''}>${n} days</option>`).join('')}</select></div>
      <div class="field"><label class="lbl" for="focus">Focus wing (optional)</label><select id="focus"><option value="">No focus</option>${WINGS.filter(w => avail.has(w.id)).map(w => `<option value="${w.id}" ${WEEK_DRAFT.focus === w.id ? 'selected' : ''}>${esc(w.name)}</option>`).join('')}</select></div>
    </div>
    <p class="small muted">A focus wing supplies up to half of each day's new cards. Reviews aren't affected.</p>
    <button class="btn primary" data-act="week-set">Set this week</button></div>`;
}
function bindWeekCard() {
  const g = $('#goal'), f = $('#focus'); if (!g) return;
  g.addEventListener('change', () => { WEEK_DRAFT.goal = +g.value; });
  f.addEventListener('change', () => { WEEK_DRAFT.focus = f.value === '' ? null : +f.value; });
}
function weekRowHTML() {
  const w = thisWeek(); if (!w) return '';
  const ws = weekStart(today()), act = new Set(activeInWeek(ws)), n = act.size;
  const dots = Array.from({ length: 7 }, (_, i) => `<i class="${act.has(ws + i) ? 'on' : ''}${ws + i === today() ? ' td' : ''}" title="${'MTWTFSS'[i]}"></i>`).join('');
  const fw = w.focus != null ? WINGS.find(x => x.id === w.focus) : null;
  return `<div class="weekrow small"><span class="lbl">This week</span><span class="dots" aria-label="${n} active day${n === 1 ? '' : 's'} this week">${dots}</span><span>${n} of ${w.goal} days${n >= w.goal ? ' ✓' : ''}</span>${fw ? `<span class="muted">· focus: ${esc(fw.name)}</span>` : ''}</div>`;
}
/* the weekly goal was reached today (for the Debrief only: celebrations stay out of study screens, D11) */
function goalReachedToday() {
  const w = thisWeek(); if (!w) return false;
  const days = activeInWeek(weekStart(today())).sort((a, b) => a - b);
  return days.length >= w.goal && days[w.goal - 1] === today();
}

/* ---------- delta v2: blocks (D14) ---------- */
let BLOCK = null;
function viewBlockDone(kind, sess) {
  RUN = null; BLOCK = { kind, sess };
  const left = new Set(sess.queue.map(q => q.id)).size, intake = kind === 'intake';
  const go1 = `<button class="btn ${intake ? '' : 'primary'}" data-act="block-go">Keep going</button>`, stop = `<button class="btn ${intake ? 'primary' : ''}" data-act="block-stop">Stop here for now</button>`;
  app().innerHTML = `<div class="top"><div class="grow"><h1>BLOCK DONE</h1><div class="sub">${left} card${left === 1 ? '' : 's'} left in ${intake ? 'Intake' : 'Daily Rounds'}</div></div></div>
    <div class="card stack"><p><b>That's about 20 minutes of answering.</b> A natural place to pause. ${intake ? 'New cards keep: the rest of this Intake will be here later today.' : 'Everything is saved, so you can pick this up any time today.'}</p>
      <p class="small muted">Optional: look away from the screen for two minutes. A short quiet rest after learning may help it settle. The evidence is mixed, so skip it freely.</p>
      <button class="btn block" data-act="lookaway">Look away for 2 minutes</button></div>
    <div class="row">${intake ? stop + go1 : go1 + stop}</div>`;
}
function lookAway() {
  const bg = document.createElement('div'); bg.className = 'rest';
  bg.innerHTML = `<div class="restin"><p>Look away from the screen.<br>It will brighten when two minutes are up.</p><div class="restbar"><i></i></div><button class="btn ghost" data-act="rest-end">Skip</button></div>`;
  document.body.appendChild(bg);
  requestAnimationFrame(() => bg.querySelector('.restbar i').classList.add('go'));
  lookAway.h = setTimeout(() => { bg.classList.add('up'); bg.querySelector('p').textContent = 'Ready when you are.'; bg.querySelector('[data-act="rest-end"]').textContent = 'Back to it'; }, 120000);
}
function endRest() { clearTimeout(lookAway.h); document.querySelectorAll('.rest').forEach(n => n.remove()); }

/* ---------- delta v2: post-mortems (D15) ---------- */
const PM = [['misread', 'Misread it'], ['content', 'Didn\'t know it'], ['reasoning', 'Reasoning slip'], ['trap', 'Fell for a trap'], ['careless', 'Careless']];
const PM_LABEL = Object.fromEntries(PM);
function setPostMortem(R, k) {
  const x = R.result, prev = x.pm;
  if (prev === k) return;
  const bump = (o, key, d) => { o[key] = Math.max(0, (o[key] || 0) + d); };
  const all = kvGet('pmAll', {}), st = R.sess.stats.pm || (R.sess.stats.pm = {});
  if (prev) { bump(all, prev, -1); bump(st, prev, -1); }
  bump(all, k, 1); bump(st, k, 1); x.pm = k;
  kvSet('pmAll', all); kvSet('sess:' + R.kind, R.sess);
  addLog({ ts: now(), itemId: R.it.id, mode: 'postmortem', postMortem: k, sessionId: R.sess.id, localHour: new Date().getHours() });
}
function pmBars(pm) {
  const tot = PM.reduce((a, [k]) => a + (pm[k] || 0), 0);
  return `<table class="t pmt"><tbody>${PM.map(([k, l]) => `<tr><td>${l}</td><td class="n">${pm[k] || 0}</td><td style="width:45%">${pm[k] ? `<span class="hbar" style="width:${Math.round(100 * pm[k] / tot)}%"></span>` : ''}</td></tr>`).join('')}</tbody></table>`;
}
const pmSummary = pm => Object.entries(pm || {}).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${n} ${PM_LABEL[k].toLowerCase()}`).join(', ');

/* ---------- delta v2: calibration trend (D15) ---------- */
function calTrend() {
  const cm = kvGet('calibMonth', {}), months = Object.keys(cm).sort().slice(-6);
  if (months.length < 2) return `<p class="small muted">The monthly trend appears once you have bets from two different months.</p>`;
  const names = ['Unsure', 'Fairly sure', 'Sure'], W = 112, H = 140, pad = { l: 6, r: 6, t: 22, b: 20 };
  const x = i => pad.l + (months.length === 1 ? 0 : i * (W - pad.l - pad.r) / (months.length - 1)), y = v => pad.t + (1 - v) * (H - pad.t - pad.b);
  const mlabel = m => new Date(m + '-15T12:00:00').toLocaleDateString(undefined, { month: 'short' });
  const panels = [1, 2, 3].map(c => {
    const band = CAL_BANDS[c];
    const pts = months.map((m, i) => { const b = (cm[m] || {})[c]; return b && b.n >= 5 ? { i, m, acc: b.correct / b.n, n: b.n } : null; });
    const segs = []; let cur = [];
    for (const p of pts) { if (p) cur.push(p); else if (cur.length) { segs.push(cur); cur = []; } }
    if (cur.length) segs.push(cur);
    let g = `<text x="${pad.l}" y="12" class="pt">${names[c - 1]}</text>`;
    g += `<rect class="band" x="${pad.l}" y="${y(band[1])}" width="${W - pad.l - pad.r}" height="${y(band[0]) - y(band[1])}" rx="2"><title>Target ${Math.round(band[0] * 100)}–${Math.round(band[1] * 100)}%</title></rect>`;
    g += `<line class="grid" x1="${pad.l}" y1="${y(0.5)}" x2="${W - pad.r}" y2="${y(0.5)}"/><line class="grid" x1="${pad.l}" y1="${y(1)}" x2="${W - pad.r}" y2="${y(1)}"/><line class="axis" x1="${pad.l}" y1="${y(0)}" x2="${W - pad.r}" y2="${y(0)}"/>`;
    for (const sg of segs) if (sg.length > 1) g += `<polyline class="ln" points="${sg.map(p => `${x(p.i)},${y(p.acc)}`).join(' ')}"/>`;
    for (const p of pts) if (p) g += `<circle class="dot" cx="${x(p.i)}" cy="${y(p.acc)}" r="4"><title>${mlabel(p.m)}: ${pct(p.acc)} right of ${p.n}</title></circle>`;
    g += `<text x="${pad.l}" y="${H - 4}">${mlabel(months[0])}</text><text x="${W - pad.r}" y="${H - 4}" text-anchor="end">${mlabel(months[months.length - 1])}</text>`;
    return `<svg class="chart smx" viewBox="0 0 ${W} ${H}" role="img" aria-label="${names[c - 1]}: accuracy by month against its target band">${g}</svg>`;
  }).join('');
  const rows = months.map(m => `<tr><td>${esc(mlabel(m))} ${m.slice(0, 4)}</td>${[1, 2, 3].map(c => { const b = (cm[m] || {})[c]; return `<td class="n">${b && b.n ? pct(b.correct / b.n) + `<span class="muted"> /${b.n}</span>` : '—'}</td>`; }).join('')}</tr>`).join('');
  return `<div class="smxrow">${panels}</div><p class="small muted">Share right each month, from 0% at the bottom line to 100% at the top. Shaded: the target range for that bet. Months with fewer than 5 bets at a level are left out.</p>
    <details class="why"><summary>Show as a table</summary><table class="t"><thead><tr><th>Month</th><th class="n">Unsure</th><th class="n">Fairly</th><th class="n">Sure</th></tr></thead><tbody>${rows}</tbody></table></details>`;
}

/* Calibration refresher (a short version of D15's Calibration Academy) */
function viewPrimer() {
  kvSet('primerPhase', phase());
  app().innerHTML = `${topBar('WHAT YOUR BETS MEAN', 'A two-minute refresher', '#/calibration')}
    <div class="card stack">
      <p><b>Each bet is a probability.</b> <i>Unsure</i> means you'd be right less than 2 times in 3. <i>Fairly sure</i> means about 2 to 4 times in 5. <i>Sure</i> means at least 4 times in 5. The scoring is built so that betting what you really believe always scores best over time.</p>
      <p><b>Most people bet too high.</b> Confidence runs ahead of accuracy, especially on topics that feel familiar. The fix is feedback, which is what the Calibration chart gives you. Check it every few weeks.</p>
      <p><b>Start from your base rate.</b> Before betting <i>Sure</i>, ask how often you're right on this kind of card. A wing page shows your recall by unit, so a shaky unit should pull your bet down.</p>
      <p><b>A quick test for Sure.</b> Could you say why each other option is wrong, or derive the number a second way? If not, <i>Fairly sure</i> is the honest bet.</p>
      <p><b>Name the miss.</b> After a wrong <i>Sure</i>, one tap says what happened. Over time the pattern tells you what to fix: misreads mean slow down on the question, missing content means more reviews, traps mean reading every option before betting.</p>
    </div>
    <a class="btn block" href="#/calibration">See your calibration</a>`;
}


/* ---------- tutor pack: study data for any AI chat ---------- */
const TUTOR = { range: '7', instr: true, text: '', name: '' };
const TUTOR_RANGES = [['today', 'Today'], ['7', '7 days'], ['30', '30 days'], ['all', 'All']];
async function viewTutor(arg) {
  const tok = viewTutor.tok = (viewTutor.tok || 0) + 1;
  if (arg && TUTOR_RANGES.some(([k]) => k === arg)) TUTOR.range = arg;
  const t = today();
  const start = { today: t, '7': t - 6, '30': t - 29, all: null }[TUTOR.range];
  const label = { today: 'today only', '7': 'the last 7 days', '30': 'the last 30 days', all: 'everything so far' }[TUTOR.range];
  const head = `${topBar('TUTOR PACK', 'For any AI chat')}
    <p>A file of what's tripping you up: missed cards with your answers, the right answers and each card's explanation, your weakest units, and how well your bets match your accuracy. It also tells the AI how to tutor: quiz you first, then go after the idea behind each miss.</p>
    <div class="seg seg4" role="group" aria-label="Period">${TUTOR_RANGES.map(([k, l]) => `<button class="${TUTOR.range === k ? 'on' : ''}" data-trange="${k}" aria-pressed="${TUTOR.range === k}"><b>${l}</b></button>`).join('')}</div>
    <label class="chk"><input type="checkbox" id="tinstr" ${TUTOR.instr ? 'checked' : ''}><span class="grow">Include instructions for the tutor<span class="small muted" style="display:block">Leave on unless you'd rather write your own.</span></span></label>`;
  app().innerHTML = head + `<p class="small muted">Building…</p>`;
  const logs = await allLogs();
  if (!location.hash.startsWith('#/tutor') || tok !== viewTutor.tok) return;
  const pack = tutorPack({ logs, cards: MEM.cards, items: ITEM, units: UNIT, courses: Object.fromEntries(COURSES.map(c => [c.id, c])), flags: flags(),
    today: t, examDay: examDay(), phase: phase(), openUnits: S.openUnits, rangeStart: start, rangeLabel: label, instructions: TUTOR.instr, now: now() });
  TUTOR.text = pack.text; TUTOR.name = `station528-tutor-${dateOfDay(t)}.md`;
  const canFile = !!shareFile('x');
  app().innerHTML = head + (pack.answers ? `<div class="card small">This pack: <b>${pack.missed}</b> missed card${pack.missed === 1 ? '' : 's'}${pack.units ? ` · ${pack.units} unit${pack.units === 1 ? '' : 's'} compared` : ''} · from ${pack.answers} answer${pack.answers === 1 ? '' : 's'}.</div>`
      : `<div class="card small">No answers in this period yet${TUTOR.range === 'all' ? '' : '. Try a longer period'}.</div>`) +
    `<div class="row">${canFile ? `<button class="btn primary" data-act="tutor-share">Share file</button>` : ''}<button class="btn ${canFile ? '' : 'primary'}" data-act="tutor-copy">Copy text</button><button class="btn" data-act="tutor-dl">Download</button></div>
    <p class="small muted">Then, in the AI chat: attach the file (or paste the text) and say "Let's start." Only study data goes in: no name, sleep, plans or schedule. Nothing leaves this device unless you send it.</p>
    <details class="why"><summary>Preview</summary><pre class="tpre">${esc(TUTOR.text)}</pre></details>`;
  $('#tinstr').addEventListener('change', e => { TUTOR.instr = e.target.checked; viewTutor(); });
}
function tutorDownload() {
  const blob = new Blob([TUTOR.text], { type: 'text/markdown' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = TUTOR.name;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  toast('Saved. Attach it in your AI chat.');
}
/* A shareable File for the pack: Markdown where the browser allows it, plain text otherwise. */
function shareFile(text) {
  if (!navigator.canShare || typeof File === 'undefined') return null;
  for (const [ext, type] of [['md', 'text/markdown'], ['txt', 'text/plain']]) {
    try { const f = new File([text], TUTOR.name.replace(/\.md$/, '.' + ext) || 'tutor.' + ext, { type }); if (navigator.canShare({ files: [f] })) return f; } catch (e) { /* try the next type */ }
  }
  return null;
}
async function tutorShare() {
  const file = shareFile(TUTOR.text);
  if (!file) return tutorDownload();
  try { await navigator.share({ files: [file], title: 'Station 528 tutor pack' }); }
  catch (e) { if (e && e.name !== 'AbortError') tutorDownload(); }
}
async function tutorCopy() {
  try { await navigator.clipboard.writeText(TUTOR.text); toast('Copied. Paste it into an AI chat.'); }
  catch (e) {
    const pre = $('.tpre'); if (!pre) return;
    pre.closest('details').open = true;
    const r = document.createRange(); r.selectNodeContents(pre); const sel = getSelection(); sel.removeAllRanges(); sel.addRange(r);
    toast('Selected. Use your device\'s Copy.');
  }
}

/* ---------- wing detail ---------- */
function viewWing(id) {
  const w = WINGS.find(x => x.id === id); if (!w) return go('#/');
  const act = activeCards().filter(c => ITEM[c.id].fc === id), st = wingStats(act, now());
  const units = UNITS.filter(u => ITEMS.some(i => i.unit === u.id && i.fc === id));
  const rows = units.map(u => {
    const its = ITEMS.filter(i => i.unit === u.id && i.fc === id), cs = its.map(i => cardOf(i.id)).filter(isActive);
    const r = cs.length ? cs.reduce((a, c) => a + rNow(c, now()), 0) / cs.length : null;
    return `<tr><td>${esc(u.name)}<div class="small muted">${esc(COURSES.find(c => c.id === u.course).name)} · ${S.openUnits.includes(u.id) ? 'open' : 'closed'}</div></td><td class="n">${cs.length}/${its.length}</td><td class="n">${pct(r)}</td></tr>`;
  }).join('');
  app().innerHTML = `${topBar(w.name.toUpperCase(), (w.id ? 'Foundational concept ' + w.id : 'CARS') + ` · level ${st.level}/5`)}
    ${st.n ? `<div class="tiles"><div class="tile"><div class="lbl">Recall now</div><div class="v">${pct(st.condition)}</div></div><div class="tile"><div class="lbl">Held 3+ wks</div><div class="v">${pct(st.mature)}</div></div><div class="tile"><div class="lbl">Cards</div><div class="v">${st.n}</div></div></div>` : ''}
    ${units.length ? `<table class="t"><thead><tr><th>Unit</th><th class="n">Active</th><th class="n">Now</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="small muted">Level thresholds: share of cards with stability of 21+ days — 20%, 40%, 60%, 80%, 95%.</p>`
    : `<div class="card"><p>No cards for this wing yet. ${w.sec === 'PS' ? 'Psych/Soc' : w.sec === 'CARS' ? 'CARS passages' : 'These'} arrive in a later version, ahead of when your courses cover them.</p></div>`}
    <div class="row"><a class="btn" href="#/settings">Open or close units</a></div>`;
}

/* ---------- runs (Daily Rounds and Intake) ---------- */
function getRun(kind) {
  const t = today(), key = 'sess:' + kind;
  let sess = kvGet(key);
  if (sess && sess.day === t && (sess.queue.length || kind === 'rounds')) return sess;
  if (kind === 'rounds') {
    const list = Object.values(MEM.cards).filter(c => isActive(c));
    const T = examDay();
    const b = buildRounds(list, t, now(), capNow(), T, id => ITEM[id] && ITEM[id].hy, S.sweepDone);
    if (b.swept) { S.sweepDone = true; saveSettings(); }
    saveCards(list);
    sess = newSession('rounds', t, b.queue);
    sess.taken = b.taken;
  } else {
    const remaining = Math.max(0, quotaToday().quota - dayStats(t).newCards);
    const ids = pickIntake(ITEMS, MEM.cards, S.openUnits, remaining, UNIT_ORDER, focusWing());
    const prev = sess && sess.day === t ? sess : null;
    sess = prev ? Object.assign(prev, { queue: ids.map(id => ({ id, kind: 'new' })), done: false }) : newSession('intake', t, ids.map(id => ({ id, kind: 'new' })));
  }
  kvSet(key, sess);
  return sess;
}
function startRun(kind) {
  const sess = getRun(kind);
  if (!sess.queue.length) {
    if (sess.stats.attempts) return go('#/debrief/' + kind);
    return go('#/');
  }
  if (sess.block && sess.block.ms >= BLOCK_MS) return viewBlockDone(kind, sess);
  nextCard(kind, sess);
}
function nextCard(kind, sess) {
  if (sess.day !== today()) return startRun(kind); /* the study day rolled over mid-session */
  if (!sess.queue.length) { sess.done = true; kvSet('sess:' + kind, sess); markCleared(kind); return go('#/debrief/' + kind); }
  const q = sess.queue[0], it = ITEM[q.id];
  if (!it || it.status === 'quarantined' || (cardOf(q.id) && cardOf(q.id).suspended)) { sess.queue.shift(); kvSet('sess:' + kind, sess); return nextCard(kind, sess); }
  const inst = it.type === 'gen' ? it.gen(Math.random) : null;
  const card = cardOf(q.id);
  const echo = q.kind === 'review' && card && card.due > today() && card.echoes.some(e => e <= today());
  RUN = { kind, sess, it, inst, phase: it.type === 'choice' ? 'think' : 'answer', picked: null, hint: false, shownAt: now(), order: shuffleIdx(it.options ? it.options.length : 0), echo, q };
  drawRun();
}
/* Continue after feedback: a filled block (about 20 min of answering) gets a "Block done" pause first (D14). */
function advance(R) {
  if (R.timer) clearTimeout(R.timer);
  if (R.sess.queue.length && R.sess.block && R.sess.block.ms >= BLOCK_MS && R.sess.day === today()) return viewBlockDone(R.kind, R.sess);
  nextCard(R.kind, R.sess);
}
function shuffleIdx(n) { const a = Array.from({ length: n }, (_, i) => i); for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function markCleared(kind) { if (kind !== 'rounds') return; const k = dayKey(today()), d = dayStats(today()); d.dueCleared = true; kvSet(k, d); }
const promptOf = R => R.inst ? R.inst.prompt : (R.echo && R.it.alt ? R.it.alt : R.it.prompt);

function drawRun() {
  const R = RUN, it = R.it, total = R.sess.queue.length + R.sess.stats.attempts, done = R.sess.stats.attempts;
  const label = R.kind === 'rounds' ? 'DAILY ROUNDS' : 'INTAKE';
  const tag = R.q.kind === 'new' ? 'new card' : R.q.kind.startsWith('relearn') ? 'again, to lock it in' : R.echo ? 'follow-up check' : 'review';
  let body = '';
  if (R.phase === 'feedback') body = feedbackHTML();
  else if (it.type === 'choice') body = choiceHTML();
  else body = typedHTML();
  const left = new Set(R.sess.queue.map(q => q.id)).size;
  app().innerHTML = `<div class="top"><a class="ib" href="#/" aria-label="Pause and go back to the Station">✕</a><div class="grow"><h1>${label}</h1><div class="sub">${left} card${left === 1 ? '' : 's'} left · ${tag}</div></div></div>
    <div class="prog"><i style="width:${total ? Math.round(100 * done / total) : 0}%"></i></div>
    <div class="prompt">${fmt(promptOf(R))}</div>${body}`;
  bindRun();
}
function confHTML(enabled) {
  const lock = RUN.hint;
  const b = (c, name, pts) => `<button data-c="${c}" ${!enabled || (lock && c > 1) ? 'disabled' : ''}><b>${name}</b><span>${pts}</span></button>`;
  return `<div class="conf" role="group" aria-label="How sure are you? This submits your answer.">${b(1, 'Unsure', '+1 / 0')}${b(2, 'Fairly sure', '+2 / −2')}${b(3, 'Sure', '+3 / −6')}</div>
    <div class="confhint">${lock ? 'You used the hint, so this one is scored as Unsure.' : 'Your bet submits the answer. Only a wrong "Sure" really costs you.'}</div>
    <div class="row" style="justify-content:center;margin-top:6px"><button class="btn ghost" data-act="dk">I don't know — show me</button></div>`;
}
function choiceHTML() {
  const R = RUN;
  if (R.phase === 'think') return `<p class="small muted">Answer it in your head first. The options appear when you reveal them.</p>
    <button class="btn block reveal go" data-act="reveal" disabled><i class="fill"></i><span>Reveal options</span></button>
    <div class="row" style="justify-content:center;margin-top:6px"><button class="btn ghost" data-act="dk">I don't know — show me</button></div>`;
  return `<div class="opts">${R.order.map((k, i) => `<button class="opt ${R.picked === k ? 'sel' : ''}" data-o="${k}"><span class="k">${'ABCD'[i]}</span><span>${fmt(R.it.options[k])}</span></button>`).join('')}</div>${confHTML(R.picked != null)}`;
}
function typedHTML() {
  const R = RUN, it = R.it, num = it.type !== 'typed', unit = R.inst ? R.inst.unit : (it.num && it.num.unit) || '';
  const hint = (R.inst && R.inst.hint) || it.hint;
  return `<div class="ans"><input id="ans" ${num ? 'inputmode="text" enterkeyhint="done"' : ''} autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${num ? 'Number' + (it.type === 'gen' && R.inst.fraction ? ' or fraction' : '') : 'Your answer'}" aria-label="Your answer" value="${esc(R.typed || '')}">${unit ? `<span class="u">${esc(unit)}</span>` : ''}</div>
    ${num ? `<div class="keys" aria-label="Insert a symbol">${['−', '×10^', '/', '.'].map(k => `<button type="button" class="key" data-ins="${k === '−' ? '-' : k === '×10^' ? 'x10^' : k}">${k}</button>`).join('')}</div>
      <p class="small muted" style="margin:6px 2px 0">e.g. 0.25, 3/16, 4.5e-3 or 4.5×10^-3</p>` : ''}
    ${hint && !R.hint ? `<div class="row" style="margin-top:8px"><button class="btn ghost" data-act="hint">Show the formula (scores as Unsure)</button></div>` : ''}
    ${R.hint ? `<p class="small" style="margin:8px 2px">Formula: <b>${fmt(hint)}</b></p>` : ''}
    ${confHTML(!!(R.typed && R.typed.trim()))}`;
}
function bindRun() {
  const R = RUN;
  const rv = $('[data-act="reveal"]');
  if (rv) { const h = setTimeout(() => { if (RUN === R && R.phase === 'think') rv.disabled = false; }, 3000); R.timer = h; }
  const inp = $('#ans');
  if (inp) {
    inp.addEventListener('input', () => { R.typed = inp.value; document.querySelectorAll('.conf button').forEach(b => { b.disabled = !inp.value.trim() || (R.hint && b.dataset.c > 1); }); });
    if (matchMedia('(pointer: fine)').matches || R.phase === 'answer') setTimeout(() => { if (RUN === R) inp.focus(); }, 30);
  }
}
function submit(conf) {
  const R = RUN, it = R.it;
  if (R.phase === 'feedback') return;
  let correct = false, given = '';
  if (conf !== 0) {
    if (it.type === 'choice') { if (R.picked == null) return; correct = R.picked === 0; given = it.options[R.picked]; }
    else {
      given = (R.typed || '').trim(); if (!given) return;
      if (it.type === 'typed') correct = textMatches(given, it.accepted.concat(kvGet('extraAccepted', {})[it.id] || []));
      else correct = numMatches(given, R.inst ? R.inst : it.num);
    }
  }
  if (R.hint && conf > 1) conf = 1;
  const ms = now() - R.shownAt;
  applyAttempt(R, { correct, conf, hint: R.hint, ms, given });
}
function applyAttempt(R, a) {
  const it = R.it, t = today(), T = examDay();
  let card = cardOf(it.id);
  const wasNew = !card || card.state === 'new';
  if (!card) card = newCard(it.id);
  const rBefore = rNow(card, now());
  /* snapshot everything this attempt touches, so an appeal ("my answer means the same") can redo it cleanly */
  const copy = o => JSON.parse(JSON.stringify(o));
  const undo = { card: copy(card), wasStored: !!cardOf(it.id), sess: copy(R.sess), day: copy(dayStats(t)), calib: copy(kvGet('calib', {})), calibUnit: copy(kvGet('calibUnit', {})), calibMonth: copy(kvGet('calibMonth', {})), pmAll: copy(kvGet('pmAll', {})) };
  const grade = gradeOf(a, medianFor(it.kind));
  const sch = schedule(card, grade, now(), { T, phase: phase(), highYield: it.hy });
  const res = recordAttempt(R.sess, it.id, { correct: a.correct, conf: a.conf, wasNew }, grade);
  const ok = a.correct && a.conf !== 0;
  if (res.first && !ok && a.conf === 3) {
    planEchoes(card, t, T);
    card.c3Wrong = (card.c3Wrong || 0) + 1;
    if (card.c3Wrong >= 2) autoFlag(it.id);
  }
  R.sess.stats.gain += sch.gain;
  if (wasNew && res.first) R.sess.stats.newLearned++;
  markActive(t);
  tickBlock(R.sess, now(), a.ms);
  if (!R.sess.id) R.sess.id = R.kind + '-' + t + '-old';
  saveCard(card);
  kvSet('sess:' + R.kind, R.sess);
  /* daily + all-time stats (first attempts only for scoring and calibration) */
  const d = dayStats(t);
  d.reviews++; d.gain += sch.gain; if (wasNew && res.first) d.newCards++;
  if (res.first) {
    d.cbm += res.cbm;
    if (a.conf >= 1) {
      const cal = kvGet('calib', {}); (cal[a.conf] = cal[a.conf] || { n: 0, correct: 0 }).n++; if (ok) cal[a.conf].correct++; kvSet('calib', cal);
      const cm = kvGet('calibMonth', {}), mo = cm[monthOf(t)] = cm[monthOf(t)] || {}; (mo[a.conf] = mo[a.conf] || { n: 0, correct: 0 }).n++; if (ok) mo[a.conf].correct++; kvSet('calibMonth', cm);
      (d.calib[a.conf] = d.calib[a.conf] || { n: 0, correct: 0 }).n++; if (ok) d.calib[a.conf].correct++;
      if (a.conf === 3) { const cu = kvGet('calibUnit', {}); const u = cu[it.unit] = cu[it.unit] || { n: 0, correct: 0 }; u.n++; if (ok) u.correct++; kvSet('calibUnit', cu); }
    }
    if (ok && !a.hint) { const tm = kvGet('times', {}); const arr = tm[it.kind] = tm[it.kind] || []; arr.push(a.ms); if (arr.length > 200) arr.shift(); kvSet('times', tm); }
  }
  kvSet(dayKey(t), d);
  addLog({ ts: now(), itemId: it.id, mode: R.kind === 'rounds' ? (R.echo ? 'echo' : 'rounds') : 'intake', firstAttempt: res.first, response: a.given, correct: ok,
    confidence: a.conf || null, cbm: res.cbm, grade, msTaken: a.ms, hintUsed: !!a.hint, rBefore, rExamBefore: sch.rExamBefore, rExamAfter: sch.rExamAfter,
    s: card.s, d: card.d, due: card.due, value: R.inst ? R.inst.value : undefined,
    prompt: R.inst ? R.inst.prompt : undefined, expl: R.inst ? R.inst.expl : undefined, unit: R.inst ? R.inst.unit : undefined, alt: R.echo && it.alt ? true : undefined,
    /* delta v2 D1 fields, so models can be refit offline */
    hintLevel: a.hint ? 2 : 0, sessionId: R.sess.id, blockId: R.sess.id + '/b' + (R.sess.block ? R.sess.block.n : 1), localHour: new Date().getHours(),
    sleepFlag: d.sleepFlag || null, recoveryPace: S.recoveryPace, selectionReason: R.echo ? 'echo' : R.q.kind,
    intakeSlot: R.kind === 'intake' ? S.intakeSlot : undefined, inIntakeWindow: R.kind === 'intake' ? inWindow(curWindow(), localMin()) : undefined });
  R.result = { a, ok, res, grade, gain: sch.gain, surprise: res.first && !ok && a.conf === 3, fixed: false, undo };
  R.phase = 'feedback';
  drawRun();
  window.scrollTo(0, 0);
}
function keyText(R) {
  const it = R.it;
  if (it.type === 'choice') return it.options[0];
  if (it.type === 'typed') return showAns(it);
  const v = R.inst ? R.inst.value : it.num.value;
  return (R.inst && R.inst.fraction ? fracText(v) + ' (' + sig(v, 3) + ')' : sig(v, 3)) + ' ' + ((R.inst && R.inst.unit) || (it.num && it.num.unit) || '');
}
function showAns(it) { const a = it.accepted[0]; return SHOW[it.id] || a[0].toUpperCase() + a.slice(1); }
function fracText(v) { for (const d of [2, 4, 8, 16]) { const n = v * d; if (Math.abs(n - Math.round(n)) < 1e-9) return Math.round(n) + '/' + d; } return sig(v, 3); }
function feedbackHTML() {
  const R = RUN, it = R.it, x = R.result, a = x.a;
  const pts = x.res.first ? (a.conf === 0 ? 'not scored' : `${['', 'Unsure', 'Fairly sure', 'Sure'][a.conf]} · ${x.res.cbm > 0 ? '+' : ''}${x.res.cbm}`) : 'repeat · not scored';
  const v = a.conf === 0 ? `<div class="verdict dk">Here's the answer<span class="pts">${pts}</span></div>`
    : x.ok ? `<div class="verdict ok">✓ Correct<span class="pts">${pts}</span></div>` : `<div class="verdict no">✗ Not quite<span class="pts">${pts}</span></div>`;
  const needFix = x.surprise && !x.fixed;
  let mid = '';
  if (it.type === 'choice') {
    mid = (needFix ? `<div class="yours">The answer is <b>${fmt(it.options[0])}</b>.</div>` : '') + `<div class="opts">${R.order.map((k, i) => {
      const cls = needFix ? (k === R.picked ? 'wrong' : R.fixPick === k ? 'sel' : '') : k === 0 ? 'right' : (k === R.picked ? 'wrong' : 'dim');
      return `<button class="opt ${cls}" ${needFix ? `data-fix="${k}"` : 'tabindex="-1"'}><span class="k">${'ABCD'[i]}</span><span>${fmt(it.options[k])}</span></button>`;
    }).join('')}</div>`;
  } else {
    mid = `${a.given ? `<div class="yours">You wrote <code>${esc(a.given)}</code></div>` : ''}<div class="yours">Answer: <b>${fmt(keyText(R))}</b>${it.type === 'typed' && it.accepted.length > 1 ? `<span class="muted small"> (also accepted: ${esc(it.accepted.slice(1, 4).join(', '))})</span>` : ''}</div>`;
    if (needFix) mid += `<div class="ans" style="margin-top:8px"><input id="fix" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Type the correct answer" aria-label="Type the correct answer"></div>`;
  }
  const sur = x.surprise ? (needFix
    ? `<div class="surprise"><b>High-confidence miss.</b> These are the errors that get corrected best — if you fix them now. ${it.type === 'choice' ? 'Tap it in the list to continue.' : 'Type the correct answer to continue.'}</div>`
    : `<div class="surprise"><b>Corrected.</b> This card comes back tomorrow and again in a week, to make sure the fix sticks.</div>`) : '';
  if (needFix) return v + sur + mid;
  const lures = it.type === 'choice' ? (() => {
    const order = [1, 2, 3].sort((p, q) => (q === R.picked) - (p === R.picked));
    return `<ul>${order.map(k => `<li>${k === R.picked ? '<b>Your pick:</b> ' : ''}<i>${fmt(it.options[k])}</i> — ${fmt(it.lures[k - 1])}</li>`).join('')}</ul>`;
  })() : '';
  const explText = R.inst ? R.inst.expl : it.expl;
  const open = !x.ok || a.conf <= 1;
  const explBody = `<div>${fmt(explText)}</div>${lures ? `<div class="lbl" style="margin-top:10px">Why the others are wrong</div>${lures}` : ''}`;
  const expl = open ? `<div class="expl">${explBody}</div>` : `<details class="why"><summary>Why</summary><div class="expl">${explBody}</div></details>`;
  const u = UNIT[it.unit];
  const appeal = it.type === 'typed' && !x.ok && a.conf !== 0 && a.given && !x.appealed ? `<button class="btn ghost small" data-act="appeal">My answer means the same — count it</button>` : '';
  const pm = x.surprise && x.fixed ? `<div class="pm"><div class="lbl">What went wrong? <span style="text-transform:none;letter-spacing:0">(one tap, optional)</span></div><div class="chips">${PM.map(([k, l]) => `<button class="chip ${x.pm === k ? 'on' : ''}" data-pm="${k}" aria-pressed="${x.pm === k}">${l}</button>`).join('')}</div></div>` : '';
  return `${v}${sur}${mid}${expl}${pm}
    <div class="where">${esc(COURSES.find(c => c.id === u.course).name)} · ${esc(u.name)} · ${it.cat}${x.ok && x.gain > 0.0005 ? ` · +${x.gain.toFixed(2)} exam-day items` : ''}</div>
    <button class="btn primary block" data-act="next" id="next" style="margin-top:14px">Continue</button>
    <div class="foot"><button class="btn ghost small" data-act="flag">⚑ Flag card</button>${appeal}</div>`;
}
function fixCheck() {
  const R = RUN, it = R.it;
  if (it.type === 'choice') return R.fixPick === 0;
  const v = ($('#fix') || {}).value || '';
  if (it.type === 'typed') return textMatches(v, it.accepted);
  return numMatches(v, R.inst ? R.inst : it.num);
}

/* ---------- debrief ---------- */
function viewDebrief(kind) {
  const sess = kvGet('sess:' + kind);
  if (!sess || !sess.stats.attempts) return go('#/');
  const s = sess.stats, t = today();
  const tomorrow = Object.values(MEM.cards).filter(c => isActive(c) && (c.due <= t + 1 && c.due > t || c.echoes.includes(t + 1))).length;
  const cal = calibration(s.calib), calAll = calibration(kvGet('calib', {}));
  const c3 = s.c3err.map(id => ITEM[id]).filter(Boolean);
  const tc = todayCounts(), back = tc.rounds.backlog;
  const roundsDone = tc.rounds.done || (!tc.rounds.built && tc.rounds.n === 0);
  const essentials = roundsDone && !tc.intake.inQueue && !tc.intake.newLeft;
  const nextBtn = kind === 'rounds' && (tc.intake.inQueue || tc.intake.newLeft) ? `<a class="btn primary block" href="#/intake">Go to Intake (${tc.intake.inQueue || tc.intake.newLeft} new)</a>`
    : kind === 'intake' && !roundsDone ? `<a class="btn primary block" href="#/rounds">Go to Daily Rounds</a>` : `<a class="btn primary block" href="#/">Back to the Station</a>`;
  const cb = kvGet('lastComeback'), comeback = cb && cb.day === sess.day;
  const pms = pmSummary(s.pm);
  /* celebrations live here, after the work, never during it (delta v2 D11) */
  const cheers = [comeback ? `<div class="cheer"><span class="beacon">✦</span><div><b>Comeback beacon lit.</b> Welcome back. That's beacon ${cb.n} on the Station.</div></div>` : '',
    goalReachedToday() ? `<div class="cheer"><span class="beacon">●</span><div><b>Weekly goal reached:</b> ${thisWeek().goal} active days this week.</div></div>` : '',
    essentials && sess.day === t ? `<div class="essentials"><b>✓ Today's essentials are done.</b> Anything more is optional.</div>` : ''].join('');
  app().innerHTML = `${topBar(kind === 'rounds' ? 'ROUNDS DEBRIEF' : 'INTAKE DEBRIEF', dateOfDay(sess.day))}
    ${cheers}
    <div class="card"><div class="lbl">Exam-day items gained</div><div class="big">+${(s.gain).toFixed(1)}</div>
      <p class="small muted">How much this session raised predicted recall on exam day, summed over the cards you reviewed. One point is one card's worth of recall.</p></div>
    <div class="card"><div class="kv">
      <span>Cards answered (first tries)</span><span>${s.first}</span>
      <span>Correct on first try</span><span>${s.firstCorrect}</span>
      ${kind === 'intake' ? `<span>New cards recalled 3 times</span><span>${Object.values(sess.cardSess).filter(c => c.isNew && c.correct >= 3).length}</span>` : ''}
      <span>Certainty-based score</span><span>${s.cbm > 0 ? '+' : ''}${s.cbm}</span>
      <span>Misses brought back to correct</span><span>${s.backToCriterion}</span>
      <span>Reviews tomorrow</span><span>${Math.min(tomorrow, capNow())}</span>
    </div>${back ? `<p class="small muted" style="margin-bottom:0">Catching up: ${backlogText(back)}.</p>` : ''}</div>
    ${c3.length ? `<div class="card"><div class="lbl">High-confidence misses today</div><ul>${c3.map(it => `<li class="small">${fmt(it.type === 'gen' ? it.title : it.prompt)}</li>`).join('')}</ul>${pms ? `<p class="small">What went wrong, by your call: ${esc(pms)}.</p>` : ''}<p class="small muted">Each returns tomorrow and in a week. Confident errors are corrected well, but they tend to creep back.</p></div>` : ''}
    <div class="card"><div class="lbl">Today's bets</div>${calTable(cal)}<p class="small muted">${calMessage(calAll)}</p></div>
    ${s.first > s.firstCorrect ? `<a class="task" href="#/tutor/today" style="text-decoration:none;color:inherit"><div class="grow"><b>Go over today's misses with an AI tutor</b><span class="small muted">Makes a file you can upload to Claude or any AI chat</span></div><span class="ib" aria-hidden="true">→</span></a>` : ''}
    ${kind === 'intake' && !kvGet('hideExNote') ? `<div class="note small"><span class="grow">Training today? Moderate or hard exercise in the hours after learning is the better slot; studying between sets isn't.</span><button class="chip ghost" data-act="hide-ex" aria-label="Dismiss this note">✕</button></div>` : ''}
    ${nextBtn}`;
}

/* ---------- calibration ---------- */
function calChart(cal) {
  const W = 340, H = 190, x0 = 40, y0 = 18, h = 130, bw = 54, gap = (W - x0 - 3 * bw) / 3;
  const y = v => y0 + h - v * h;
  let g = `<line class="axis" x1="${x0}" y1="${y(0)}" x2="${W}" y2="${y(0)}"/>`;
  for (const v of [0, 0.5, 1]) g += `<text x="${x0 - 6}" y="${y(v) + 4}" text-anchor="end">${v * 100}%</text>`;
  cal.levels.forEach((L, i) => {
    const bx = x0 + gap / 2 + i * (bw + gap);
    g += `<rect class="band" x="${bx - 6}" y="${y(L.hi)}" width="${bw + 12}" height="${y(L.lo) - y(L.hi)}" rx="3"><title>Target for ${['Unsure', 'Fairly sure', 'Sure'][i]}: ${Math.round(L.lo * 100)}–${Math.round(L.hi * 100)}%</title></rect>`;
    if (L.acc != null) {
      const top = Math.min(y(L.acc), y(0) - 2);
      g += (y(0) - top < 6 ? `<rect class="bar" x="${bx}" y="${top}" width="${bw}" height="${y(0) - top}">` : `<path class="bar" d="M${bx} ${y(0)} V${top + 4} q0 -4 4 -4 H${bx + bw - 4} q4 0 4 4 V${y(0)} Z">`) + `<title>${['Unsure', 'Fairly sure', 'Sure'][i]}: ${pct(L.acc)} correct of ${L.n}</title>` + (y(0) - top < 6 ? '</rect>' : '</path>');
      g += `<text class="val" x="${bx + bw / 2}" y="${top - 6}" text-anchor="middle">${pct(L.acc)}</text>`;
    }
    g += `<text x="${bx + bw / 2}" y="${y(0) + 17}" text-anchor="middle">${['Unsure', 'Fairly', 'Sure'][i]}</text><text x="${bx + bw / 2}" y="${y(0) + 32}" text-anchor="middle">n=${L.n}</text>`;
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Accuracy at each confidence level against its target band">${g}</svg>`;
}
const ST_LABEL = { ok: '✓ on target', over: '▲ overconfident', under: '▼ underconfident', few: 'need 10+' };
function calTable(cal) {
  return `<table class="t"><thead><tr><th>Bet <span class="muted small">(target)</span></th><th class="n">n</th><th class="n">Right</th><th></th></tr></thead><tbody>${cal.levels.map((L, i) =>
    `<tr><td>${['Unsure', 'Fairly sure', 'Sure'][i]}<div class="small muted">${i === 0 ? '≤ 67%' : i === 1 ? '67–80%' : '≥ 80%'}</div></td><td class="n">${L.n}</td><td class="n">${pct(L.acc)}</td><td style="text-align:right"><span class="st ${L.status}">${ST_LABEL[L.status]}</span></td></tr>`).join('')}</tbody></table>`;
}
function calMessage(cal) {
  const L = cal.levels;
  if (L[2].status === 'over') {
    const cu = kvGet('calibUnit', {});
    const worst = Object.entries(cu).filter(([, v]) => v.n >= 8).map(([u, v]) => ({ u, acc: v.correct / v.n, n: v.n })).sort((a, b) => a.acc - b.acc)[0];
    return `"Sure" answers are right ${pct(L[2].acc)} of the time, below the 80% that makes the bet pay. ${worst && worst.acc < 0.8 ? `Weakest: ${UNIT[worst.u].name} (${pct(worst.acc)} of ${worst.n}). ` : ''}Before betting Sure, check you could explain why the other options fail.`;
  }
  if (L[0].status === 'under') return `"Unsure" answers are right ${pct(L[0].acc)} of the time. You know more than you are betting — try "Fairly sure" more often; it pays +2.`;
  if (L[1].status === 'over') return `"Fairly sure" answers are right ${pct(L[1].acc)} of the time, under the 67% where that bet breaks even with "Unsure".`;
  if (cal.n < 30) return 'Calibration needs a few dozen bets before the bands mean much.';
  return 'Your bets match your accuracy. Keep betting honestly — the scoring rewards exactly that.';
}
function viewCalibration() {
  const cal = calibration(kvGet('calib', {}));
  app().innerHTML = `${topBar('CALIBRATION', 'First attempts only, all time')}
    <div class="card">${calChart(cal)}${calTable(cal)}</div>
    <div class="card"><p>${calMessage(cal)}</p>${cal.overconfidence != null ? `<p class="small muted">Overconfidence index: ${cal.overconfidence > 0 ? '+' : ''}${Math.round(cal.overconfidence * 100)} pts (how much your bets imply beyond your actual accuracy; 0 is ideal).</p>` : ''}</div>
    <div class="card"><div class="lbl">Month by month</div>${calTrend()}</div>
    ${pmSummary(kvGet('pmAll', {})) ? `<div class="card"><div class="lbl">Missed "Sure" bets, by your call</div>${pmBars(kvGet('pmAll', {}))}</div>` : ''}
    <a class="task" href="#/primer" style="text-decoration:none;color:inherit"><div class="grow"><b>What your bets mean</b><span class="small muted">A two-minute refresher on betting well</span></div><span class="ib" aria-hidden="true">→</span></a>
    <a class="task" href="#/tutor" style="text-decoration:none;color:inherit"><div class="grow"><b>Tutor pack</b><span class="small muted">Your misses and weak spots, as a file for any AI tutor</span></div><span class="ib" aria-hidden="true">→</span></a>
    <div class="card small"><div class="lbl">How the bets score</div>
      <p>Unsure: +1 if right, 0 if wrong. Fairly sure: +2 / −2. Sure: +3 / −6. "I don't know": 0.</p>
      <p class="muted">This is certainty-based marking, used in medical schools. It is a proper scoring rule: over many questions you score highest by betting what you really believe. "Sure" only pays when you're right more than 80% of the time; "Fairly sure" beats "Unsure" above 67%.</p></div>`;
}

/* ---------- settings ---------- */
function viewSettings() {
  const ph = phase(), T = examDay();
  const courses = COURSES.map(c => {
    const us = UNITS.filter(u => u.course === c.id);
    const all = us.every(u => S.openUnits.includes(u.id));
    return `<label class="chk course"><input type="checkbox" data-course="${c.id}" ${all ? 'checked' : ''}><span class="grow">${esc(c.name)}</span></label>` +
      us.map(u => `<label class="chk" style="padding-left:22px"><input type="checkbox" data-unit="${u.id}" ${S.openUnits.includes(u.id) ? 'checked' : ''}><span class="grow">${esc(u.name)}</span><span class="c">${ITEMS.filter(i => i.unit === u.id && i.status !== 'quarantined').length}</span></label>`).join('');
  }).join('');
  const fl = Object.keys(flags()).length;
  app().innerHTML = `${topBar('SETTINGS', '')}
    <h3>Exam</h3>
    <div class="field"><label class="lbl" for="exam">Exam date</label><input type="date" id="exam" value="${esc(S.examDate)}" min="${dateOfDay(today() + 30)}"></div>
    <p class="small muted">Phase ${ph} (${PHASES[ph].name}) · ${T - today()} days away. Phases switch on their own: B about 259 days out, C about 136, D in the last 60. Intervals never run past two days before the exam.</p>
    <div class="field"><label class="lbl" for="phase">Phase</label><select id="phase">${['auto', 'A', 'B', 'C', 'D'].map(p => `<option value="${p}" ${S.phase === p ? 'selected' : ''}>${p === 'auto' ? 'Automatic (recommended)' : p + ' — ' + PHASES[p].name}</option>`).join('')}</select></div>
    <h3>What your classes have covered</h3>
    <p class="small muted">New cards come only from open units. Opening a unit early is fine; nothing is locked.</p>
    <div class="units">${courses}</div>
    <h3>Daily limits</h3>
    <div class="field"><label class="lbl" for="cap">Review cap per day</label><input type="number" id="cap" min="20" max="500" value="${S.reviewCap}"></div>
    <div class="field"><label class="lbl" for="npd">New cards per day</label><select id="npd"><option value="">Automatic (${PHASES[ph].newPerDay} in this phase)</option>${[5, 10, 15, 20, 25].map(n => `<option value="${n}" ${S.newPerDay === n ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
    <p class="small muted">When the next week's reviews (plus anything still waiting) average over 80% of the cap, new cards halve; over the cap, they pause until you've caught up.</p>
    <div class="field"><span class="lbl">Catch-up pace</span>${paceButtons()}</div>
    <p class="small muted">Only matters when reviews pile up after a break. ${(() => { const b = backlogInfo(); return b ? 'Right now: ' + esc(backlogText(b)) + '.' : 'Nothing is waiting right now.'; })()}</p>
    <h3>Your day</h3>
    <div class="two"><div class="field"><label class="lbl" for="wake">Usually wake</label><input type="time" id="wake" value="${esc(S.wakeTime)}"></div>
      <div class="field"><label class="lbl" for="bed">Usually go to bed</label><input type="time" id="bed" value="${esc(S.bedTime)}"></div></div>
    <div class="field"><label class="lbl" for="slot">Intake slot</label><select id="slot">
      <option value="evening" ${S.intakeSlot === 'evening' ? 'selected' : ''}>Evening · ${(() => { const w = intakeWindow('evening', S.wakeTime, S.bedTime); return w ? clock(w[0]) + '–' + clock(w[1]) : '—'; })()}</option>
      <option value="morning" ${S.intakeSlot === 'morning' ? 'selected' : ''}>Morning · ${(() => { const w = intakeWindow('morning', S.wakeTime, S.bedTime); return w ? clock(w[0]) + '–' + clock(w[1]) : '—'; })()}</option></select></div>
    <p class="small muted">New material learned in the evening gets a night's sleep right away, which tends to help it stick. Whether that beats a morning person's peak alertness hasn't been tested, so either slot is fine; Intake is never blocked outside it.</p>
    <label class="chk"><input type="checkbox" id="sleepchk" ${S.sleepCheck ? 'checked' : ''}><span class="grow">Ask about last night's sleep at the first visit each day<span class="small muted" style="display:block">A short night halves that day's new cards; a poor one skips them. Reviews never change.</span></span></label>
    <h3>Plans and seasons</h3>
    ${kvGet('plans', []).map(p => `<p class="plantext small">${esc(planText(p))}</p>`).join('') || '<p class="small muted">No plan yet.</p>'}
    <div class="row"><a class="btn" href="#/plans">${kvGet('plans', []).length ? 'Edit plans' : 'Write a plan'}</a></div>
    <p class="small muted">A new season starts each month, after any break of a week or more, and on semester start dates you add here. Season ${(kvGet('season') || { id: 1 }).id} is running now.</p>
    <div class="stack">${(S.semesterStarts || []).map((d, i) => `<div class="row"><span class="mono small grow">Semester starts ${esc(d)}</span><button class="btn ghost small" data-semdel="${i}">Remove</button></div>`).join('')}</div>
    <div class="row" style="margin-top:6px"><input type="date" id="semadd" aria-label="Semester start date" style="height:46px;border:1.5px solid var(--rule);border-radius:10px;background:var(--panel);padding:0 12px"><button class="btn" data-act="semadd">Add</button></div>
    <h3>Backup</h3>
    <p class="small">Your cards and history live only in this browser. ${S.lastExportAt ? 'Last backup: ' + esc(S.lastExportAt.slice(0, 10)) + '.' : 'No backup yet.'} <span id="persist" class="muted"></span></p>
    <div class="row"><button class="btn primary" data-act="export">Export backup</button><label class="btn">Import backup<input type="file" id="import" accept="application/json,.json" hidden></label></div>
    <h3>AI tutoring</h3>
    <p class="small muted">Station 528 has no built-in AI. The tutor pack collects your misses, weak units and calibration into a file, with instructions, for whichever AI chat you use.</p>
    <div class="row"><a class="btn" href="#/tutor">Make a tutor pack</a></div>
    <h3>Cards</h3>
    <div class="row"><a class="btn" href="#/flags">Flagged cards (${fl})</a><a class="btn" href="#/about">About the cards</a></div>
    <hr><button class="btn danger" data-act="wipe">Erase everything in this browser</button>`;
  bindSettings();
  if (navigator.storage && navigator.storage.persisted) navigator.storage.persisted().then(p => { const e = $('#persist'); if (e) e.innerHTML = p ? 'Storage is marked persistent.' : 'The browser may clear storage under pressure — <a href="#" data-act="persist">ask it to keep it</a>, and add this page to your home screen.'; });
}
function bindSettings() {
  $('#exam').addEventListener('change', e => {
    if (!e.target.value) return;
    S.examDate = e.target.value; S.sweepDone = false; saveSettings();
    const T = examDay(), t = today(), moved = [];
    for (const c of Object.values(MEM.cards)) {
      if (c.state !== 'review') continue;
      const due0 = c.due, ech0 = c.echoes.join();
      if (c.due > T - 2) c.due = Math.max(t + 1, T - 2);
      c.echoes = c.echoes.filter(x => x <= T - 2);
      if (c.due !== due0 || c.echoes.join() !== ech0) moved.push(c);
    }
    if (moved.length) saveCards(moved);
    viewSettings(); toast(moved.length ? `Exam date saved; ${moved.length} review${moved.length === 1 ? '' : 's'} moved inside the new date.` : 'Exam date saved. Intervals will respect it.');
  });
  $('#phase').addEventListener('change', e => { S.phase = e.target.value; saveSettings(); viewSettings(); });
  $('#cap').addEventListener('change', e => { const v = Math.max(20, Math.min(500, parseInt(e.target.value, 10) || 150)); S.reviewCap = v; saveSettings(); });
  $('#npd').addEventListener('change', e => { S.newPerDay = e.target.value ? +e.target.value : null; saveSettings(); });
  $('#wake').addEventListener('change', e => { if (hm(e.target.value) != null) { S.wakeTime = e.target.value; saveSettings(); viewSettings(); } });
  $('#bed').addEventListener('change', e => { if (hm(e.target.value) != null) { S.bedTime = e.target.value; saveSettings(); viewSettings(); } });
  $('#slot').addEventListener('change', e => { S.intakeSlot = e.target.value; saveSettings(); });
  $('#sleepchk').addEventListener('change', e => { S.sleepCheck = e.target.checked; saveSettings(); });
  document.querySelectorAll('[data-semdel]').forEach(b => b.addEventListener('click', () => { S.semesterStarts.splice(+b.dataset.semdel, 1); saveSettings(); viewSettings(); }));
  $('[data-act="semadd"]').addEventListener('click', () => { const v = $('#semadd').value; if (!v) return; S.semesterStarts = [...new Set([...(S.semesterStarts || []), v])].sort(); saveSettings(); viewSettings(); });
  document.querySelectorAll('[data-unit]').forEach(b => b.addEventListener('change', () => { setUnit(b.dataset.unit, b.checked); viewSettings(); }));
  document.querySelectorAll('[data-course]').forEach(b => b.addEventListener('change', () => { UNITS.filter(u => u.course === b.dataset.course).forEach(u => setUnit(u.id, b.checked)); viewSettings(); }));
  $('#import').addEventListener('change', async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const data = JSON.parse(await f.text());
      if (!confirm(`Replace everything here with this backup (${(data.cards || []).length} cards, ${(data.logs || []).length} reviews)?`)) return;
      await importAll(data); loadSettings(); initItems(); migrate(); toast('Backup restored.'); go('#/');
    } catch (err) { toast(err.message || 'Could not read that file.'); }
  });
}
function setUnit(u, on) {
  const set = new Set(S.openUnits); on ? set.add(u) : set.delete(u);
  S.openUnits = UNITS.map(x => x.id).filter(id => set.has(id)); saveSettings();
  const is = kvGet('sess:intake'); if (is && is.day === today() && !is.queue.length) { /* lets Intake rebuild with the new units */ }
}
async function doExport() {
  const data = await exportAll();
  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `station528-backup-${dateOfDay(today())}.json`;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  S.lastExportAt = new Date().toISOString(); saveSettings(); toast('Backup saved. Keep it somewhere other than this device.');
  if (location.hash === '' || location.hash === '#/') render();
}

/* ---------- flags & about ---------- */
function flagItem(id, reason, auto) {
  const fl = flags(); fl[id] = Object.assign(fl[id] || {}, { at: new Date().toISOString(), reason, auto: !!auto, suspended: !auto });
  kvSet('flags', fl);
  if (!auto) { const c = cardOf(id); if (c) { c.suspended = true; saveCard(c); } ITEM[id].status = 'quarantined'; }
}
function autoFlag(id) { const fl = flags(); if (!fl[id]) flagItem(id, 'Wrong at "Sure" twice — check whether the key is right.', true); }
function viewFlags() {
  const fl = flags(), ids = Object.keys(fl);
  app().innerHTML = `${topBar('FLAGGED CARDS', ids.length + ' flagged', '#/settings')}
    <p class="small muted">Flagged cards are pulled from your reviews until you restore them. They are included in backups, so they can be fixed in the deck.</p>
    ${ids.length ? ids.map(id => { const it = ITEM[id], f = fl[id]; if (!it) return ''; return `<div class="flag-item"><div>${fmt(it.type === 'gen' ? it.title : it.prompt)}</div>
      <div class="small muted">Key: ${fmt(it.type === 'choice' ? it.options[0] : it.type === 'typed' ? it.accepted[0] : it.type === 'num' ? String(it.num.value) : 'computed')} · ${esc(f.reason || '')} · ${esc((f.at || '').slice(0, 10))}${f.auto ? ' · auto-flagged, still in reviews' : ''}</div>
      <div class="row" style="margin-top:6px"><button class="btn small" data-restore="${esc(id)}">Restore</button></div></div>`; }).join('') : '<div class="card">Nothing flagged.</div>'}`;
  document.querySelectorAll('[data-restore]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.restore, fl2 = flags(); delete fl2[id]; kvSet('flags', fl2);
    const c = cardOf(id); if (c) { c.suspended = false; saveCard(c); } initItems(); viewFlags(); toast('Restored.');
  }));
}
function viewAbout() {
  const v = Object.values(CROSSCHECK.verdicts), q = v.filter(x => x === 'disagree').length;
  app().innerHTML = `${topBar('ABOUT THE CARDS', ITEMS.length + ' cards', '#/settings')}
    <div class="card small stack">
      <p><b>Who wrote them.</b> Every card was written for this app by Claude (${esc(PROVENANCE.model)}) in November 2026. None is copied or paraphrased from AAMC or any prep company; AAMC category codes are used only as tags.</p>
      <p><b>How they were checked.</b> Two fresh checkers (${CROSSCHECK.checkers.map(esc).join('; ')}) answered every card with the key hidden. ${v.length - q} agreed with the key; ${q} were quarantined. Only checked cards enter Intake. Calculation cards compute their own answers in code, with new numbers each time.</p>
      <ul class="small muted" style="margin:0;padding-left:18px">${(CROSSCHECK.rounds || [CROSSCHECK.date]).map(r => `<li>${esc(r)}</li>`).join('')}</ul>
      <p><b>What that does not mean.</b> No human expert has reviewed them yet. If anything looks wrong, tap ⚑ Flag: the card leaves your reviews at once.</p>
      <p><b>Licenses.</b> Code: MIT. Cards: CC BY-NC-SA 4.0. Non-commercial: no ads, no payments.</p>
      <p><b>Use it with the real thing.</b> This complements AAMC's official materials; it doesn't replace them.</p>
    </div>`;
}

/* ---------- setup ---------- */
function viewSetup() {
  const sel = new Set(S.openUnits);
  if (!PLAN_DRAFT) PLAN_DRAFT = [planDefault(0)];
  app().innerHTML = `<div class="top"><div class="grow"><h1>STATION 528</h1><div class="sub">MCAT study, one day at a time</div></div></div>
    <div class="card stack"><p><b>How it works.</b> Each day the scheduler picks what you review (Daily Rounds) and what you learn new (Intake). You write or pick an answer, then bet how sure you are. The Station tracks what you'd remember on exam day.</p>
    <p class="small muted">Only confident mistakes cost points, so honest uncertainty is always safe.</p></div>
    <div class="field"><label class="lbl" for="exam">Exam date</label><input type="date" id="exam" value="${esc(S.examDate)}"></div>
    <p class="small muted">A placeholder until you register (January 2029 seats likely open around October 2028). You can change it any time.</p>
    <h3>Which units have your classes covered?</h3>
    <div class="units">${COURSES.map(c => `<div class="chk course"><span class="grow">${esc(c.name)}</span></div>` + UNITS.filter(u => u.course === c.id).map(u => `<label class="chk" style="padding-left:12px"><input type="checkbox" data-unit="${u.id}" ${sel.has(u.id) ? 'checked' : ''}><span class="grow">${esc(u.name)}</span></label>`).join('')).join('')}</div>
    <h3>Your day</h3>
    <div class="two"><div class="field"><label class="lbl" for="wake">Usually wake</label><input type="time" id="wake" value="${esc(S.wakeTime)}"></div>
      <div class="field"><label class="lbl" for="bed">Usually go to bed</label><input type="time" id="bed" value="${esc(S.bedTime)}"></div></div>
    <p class="small muted">Used to suggest when to learn new cards. Nothing is ever locked to a time.</p>
    <h3>Your plan</h3>
    <p class="small muted">Tie studying to something you already do. You can change it any time.</p>
    ${PLAN_DRAFT.map(planEditorHTML).join('')}
    <div class="card small"><b>Your data stays in this browser.</b> Next, your browser may ask whether this site can keep its storage. Say yes, and export a backup every week (the app will remind you).</div>
    <button class="btn primary block" data-act="begin">Open the Station</button>`;
  document.querySelectorAll('[data-unit]').forEach(b => b.addEventListener('change', () => { b.checked ? sel.add(b.dataset.unit) : sel.delete(b.dataset.unit); S.openUnits = UNITS.map(u => u.id).filter(id => sel.has(id)); }));
  ['exam', 'wake', 'bed'].forEach(id => $('#' + id).addEventListener('change', e => { const k = { exam: 'examDate', wake: 'wakeTime', bed: 'bedTime' }[id]; if (e.target.value) S[k] = e.target.value; }));
  bindPlanEditor(() => { const y = window.scrollY; viewSetup(); window.scrollTo(0, y); });
  $('[data-act="begin"]').addEventListener('click', async () => {
    const d = $('#exam').value; if (d) S.examDate = d;
    if (hm($('#wake').value) != null) S.wakeTime = $('#wake').value;
    if (hm($('#bed').value) != null) S.bedTime = $('#bed').value;
    savePlans();
    S.openUnits = UNITS.map(u => u.id).filter(id => sel.has(id));
    S.setupDone = true; await saveSettings();
    try { if (navigator.storage && navigator.storage.persist) await navigator.storage.persist(); } catch (e) { /* not supported */ }
    go('#/');
  });
}

/* ---------- sheets ---------- */
function openSheet(html) { closeSheet(); const bg = document.createElement('div'); bg.className = 'sheet-bg'; bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true">${html}</div>`; bg.addEventListener('click', e => { if (e.target === bg) closeSheet(); }); document.body.appendChild(bg); }
function closeSheet() { document.querySelectorAll('.sheet-bg').forEach(n => n.remove()); }
function flagSheet() {
  const R = RUN;
  flagItem(R.it.id, 'Flagged while studying');
  openSheet(`<h2>Card flagged</h2><p class="small">It's out of your reviews now. What's wrong? (Optional — it helps fix the deck.)</p>
    <div class="stack">${['The answer key is wrong', 'More than one answer is right', 'Unclear or ambiguous wording', 'Typo or formatting', 'Other'].map(r => `<button class="btn block" data-reason="${esc(r)}">${esc(r)}</button>`).join('')}</div>
    <div class="row end" style="margin-top:12px"><button class="btn ghost" data-act="undoflag">Undo flag</button></div>`);
  document.querySelectorAll('[data-reason]').forEach(b => b.addEventListener('click', () => { const fl = flags(); fl[R.it.id].reason = b.dataset.reason; kvSet('flags', fl); closeSheet(); toast('Thanks — noted.'); }));
  $('[data-act="undoflag"]').addEventListener('click', () => { const fl = flags(); delete fl[R.it.id]; kvSet('flags', fl); const c = cardOf(R.it.id); if (c) { c.suspended = false; saveCard(c); } initItems(); closeSheet(); toast('Flag removed.'); });
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-act],[data-o],[data-c],[data-fix],[data-ins],[data-pm],[data-sleep],[data-pace],[data-trange]'); if (!t) return;
  if (t.dataset.trange != null) { TUTOR.range = t.dataset.trange; if (location.hash !== '#/tutor') go('#/tutor'); else viewTutor(); return; }
  const R = RUN;
  if (t.dataset.ins != null) { /* helper keys for numbers on phones */
    const inp = $('#ans'); if (!inp) return;
    const a = inp.selectionStart ?? inp.value.length, b = inp.selectionEnd ?? inp.value.length;
    inp.value = inp.value.slice(0, a) + t.dataset.ins + inp.value.slice(b);
    inp.focus(); const p = a + t.dataset.ins.length; try { inp.setSelectionRange(p, p); } catch (err) { /* some inputs refuse */ }
    inp.dispatchEvent(new Event('input', { bubbles: true })); return;
  }
  if (t.dataset.o != null && R && R.phase === 'answer') { R.picked = +t.dataset.o; drawRun(); return; }
  if (t.dataset.fix != null && R) { R.fixPick = +t.dataset.fix; if (fixCheck()) { R.result.fixed = true; } drawRun(); return; }
  if (t.dataset.c != null && R) { submit(+t.dataset.c); return; }
  if (t.dataset.pm != null && R && R.result) { setPostMortem(R, t.dataset.pm); const y = window.scrollY; drawRun(); window.scrollTo(0, y); return; }
  if (t.dataset.sleep != null) {
    const k = dayKey(today()), d = dayStats(today()); d.sleepFlag = t.dataset.sleep; kvSet(k, d); kvSet('sleepAsked', today()); trimIntake();
    if (t.dataset.sleep !== 'normal') toast(t.dataset.sleep === 'poor' ? 'No new cards today. Reviews are unchanged.' : 'New cards halved for today. Reviews are unchanged.');
    render(); return;
  }
  if (t.dataset.pace != null) { setPace(t.dataset.pace); if (document.querySelector('.sheet-bg')) paceSheet(); else if (location.hash.startsWith('#/settings')) viewSettings(); else viewCheckin(); return; }
  const act = t.dataset.act;
  if (act === 'reveal' && R) { if (!t.disabled) { R.phase = 'answer'; drawRun(); } return; }
  if (act === 'dk' && R) { applyAttempt(R, { correct: false, conf: 0, hint: R.hint, ms: now() - R.shownAt, given: '' }); return; }
  if (act === 'hint' && R) { R.hint = true; drawRun(); return; }
  if (act === 'next' && R) { advance(R); return; }
  if (act === 'flag' && R) { flagSheet(); return; }
  if (act === 'appeal' && R) {
    const ex = kvGet('extraAccepted', {}); (ex[R.it.id] = ex[R.it.id] || []).push(R.result.a.given); kvSet('extraAccepted', ex);
    regrade(R); return;
  }
  if (act === 'export') { doExport(); return; }
  if (act === 'checkin-done') { const ci = kvGet('checkin'); if (ci) { ci.done = true; kvSet('checkin', ci); } if (location.hash.startsWith('#/checkin')) go('#/'); else render(); return; }
  if (act === 'plan-ok') { const ps = kvGet('plans', []); ps.forEach(p => { p.lastRehearsedAt = today(); }); kvSet('plans', ps); const y = window.scrollY; render(); window.scrollTo(0, y); return; }
  if (act === 'plan-add') { PLAN_DRAFT.push(planDefault(PLAN_DRAFT.length)); viewPlans(); return; }
  if (act === 'plan-save') { savePlans(); toast('Plan saved.'); go('#/'); return; }
  if (act === 'week-set') { const w = WEEK_DRAFT || { goal: 5, focus: null }; kvSet('week', { start: weekStart(today()), goal: w.goal, focus: w.focus, setAt: today() }); WEEK_DRAFT = null; const is = kvGet('sess:intake'); if (is && is.day === today() && !Object.keys(is.cardSess).length) { is.queue = []; kvSet('sess:intake', is); } viewStation(); return; }
  if (act === 'sleep-skip') { kvSet('sleepAsked', today()); viewStation(); return; }
  if (act === 'sleep-change') { e.preventDefault(); const k = dayKey(today()), d = dayStats(today()); delete d.sleepFlag; kvSet(k, d); kvSet('sleepAsked', null); viewStation(); return; }
  if (act === 'pace') { e.preventDefault(); paceSheet(); return; }
  if (act === 'sheet-close') { closeSheet(); render(); return; }
  if (act === 'primer-ok') { kvSet('primerPhase', phase()); viewStation(); return; }
  if (act === 'hide-ex') { kvSet('hideExNote', true); t.closest('.note').remove(); return; }
  if (act === 'block-go' && BLOCK) { nextBlock(BLOCK.sess, now()); kvSet('sess:' + BLOCK.kind, BLOCK.sess); const b = BLOCK; BLOCK = null; nextCard(b.kind, b.sess); return; }
  if (act === 'block-stop' && BLOCK) { nextBlock(BLOCK.sess, now()); kvSet('sess:' + BLOCK.kind, BLOCK.sess); BLOCK = null; go('#/'); return; }
  if (act === 'lookaway') { lookAway(); return; }
  if (act === 'tutor-copy') { tutorCopy(); return; }
  if (act === 'tutor-share') { tutorShare(); return; }
  if (act === 'tutor-dl') { tutorDownload(); return; }
  if (act === 'rest-end') { endRest(); return; }
  if (act === 'persist') { e.preventDefault(); navigator.storage.persist().then(p => { toast(p ? 'Storage will be kept.' : 'The browser declined. Add the page to your home screen and back up weekly.'); viewSettings(); }); return; }
  if (act === 'wipe') { if (confirm('Erase all cards, history and settings in this browser? Export a backup first if you might want them.') && confirm('Really erase everything?')) wipeAll().then(() => { loadSettings(); initItems(); go('#/'); }); return; }
});
document.addEventListener('input', e => {
  if (e.target.id === 'fix' && RUN && RUN.result && RUN.result.surprise && !RUN.result.fixed && fixCheck()) { RUN.result.fixed = true; drawRun(); }
});
document.addEventListener('keydown', e => {
  const R = RUN; if (!R) return;
  const inInput = e.target.tagName === 'INPUT';
  if (R.phase === 'feedback') { if (e.key === 'Enter' && !(R.result.surprise && !R.result.fixed)) { e.preventDefault(); advance(R); } return; }
  if (R.phase === 'think' && (e.key === ' ' || e.key === 'Enter')) { const b = $('[data-act="reveal"]'); if (b && !b.disabled) { e.preventDefault(); b.click(); } return; }
  if (R.phase === 'answer' && R.it.type === 'choice' && !inInput && /^[a-d]$/i.test(e.key)) { const i = 'abcd'.indexOf(e.key.toLowerCase()); if (i < R.order.length) { R.picked = R.order[i]; drawRun(); } return; }
  if (/^[123]$/.test(e.key) && !inInput) { const b = $(`.conf [data-c="${e.key}"]`); if (b && !b.disabled) b.click(); return; }
  if (e.key === 'Enter' && inInput && e.target.id === 'ans') { e.preventDefault(); const b = $('.conf [data-c="2"]'); if (b && !b.disabled) b.focus(); }
});
/* "My answer means the same": restore the state from before the attempt and re-apply it as correct with the same bet.
   The appeal is logged, and the wording is accepted for this card from now on. */
function regrade(R) {
  const x = R.result, it = R.it, u = x.undo;
  if (!u || x.appealed) return;
  addLog({ ts: now(), itemId: it.id, mode: 'appeal', response: x.a.given, correct: true, confidence: x.a.conf });
  const card = u.card;
  if (u.wasStored || card.state !== 'new') MEM.cards[it.id] = card; else delete MEM.cards[it.id];
  if (MEM.cards[it.id]) saveCard(card);
  R.sess = u.sess; kvSet('sess:' + R.kind, R.sess);
  kvSet(dayKey(today()), u.day); kvSet('calib', u.calib); kvSet('calibUnit', u.calibUnit); kvSet('calibMonth', u.calibMonth || {}); kvSet('pmAll', u.pmAll || {});
  const fl = flags(); if (fl[it.id] && fl[it.id].auto && (card.c3Wrong || 0) < 2) { delete fl[it.id]; kvSet('flags', fl); }
  applyAttempt(R, Object.assign({}, x.a, { correct: true }));
  R.result.appealed = true;
  drawRun(); toast('Counted. Your wording will be accepted for this card from now on.');
}

/* After a sleep answer: drop not-yet-started new cards beyond today's (possibly lower) quota. */
function trimIntake() {
  const t = today(), is = kvGet('sess:intake');
  if (!is || is.day !== t) return;
  let left = Math.max(0, quotaToday().quota - dayStats(t).newCards);
  is.queue = is.queue.filter(q => is.cardSess[q.id] || q.kind !== 'new' || left-- > 0);
  kvSet('sess:intake', is);
}
/* One-time fill-ins for data saved before delta v2: active days and monthly calibration, from daily stats. */
function migrate() {
  const days = Object.keys(MEM.kv).filter(k => /^day:\d{4}-\d{2}-\d{2}$/.test(k));
  if (kvGet('activeDays') == null) {
    const act = days.filter(k => (MEM.kv[k] || {}).reviews > 0).map(k => dayOfDate(k.slice(4))).sort((a, b) => a - b);
    kvSet('activeDays', act.slice(-400));
    if (act.length) kvSet('lastActive', act[act.length - 1]);
  }
  if (kvGet('calibMonth') == null) {
    const cm = {};
    for (const k of days) { const c = (MEM.kv[k] || {}).calib || {}, mo = k.slice(4, 11); for (const l of ['1', '2', '3']) if (c[l]) { const m = cm[mo] = cm[mo] || {}, b = m[l] = m[l] || { n: 0, correct: 0 }; b.n += c[l].n; b.correct += c[l].correct; } }
    kvSet('calibMonth', cm);
  }
}

/* ---------- boot ---------- */
async function boot() {
  try { await dbLoad(); }
  catch (e) { app().innerHTML = `<div class="card"><h2>Storage is unavailable</h2><p>This browser blocked local storage (private browsing can do this). Station 528 needs it to remember your reviews.</p></div>`; return; }
  loadSettings(); initItems(); migrate(); render();
  if ('serviceWorker' in navigator && location.protocol === 'https:') navigator.serviceWorker.register('sw.js').catch(() => {});
}
boot();
