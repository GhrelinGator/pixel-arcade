/* Blind cross-check (spec §8.3 step 4).
   node tools/blind.js export      -> check/blind_A.json, check/blind_B.json (no keys; different option orders), check/keys.json
   node tools/blind.js compare     -> compares check/answers_A.json and check/answers_B.json to the keys */
const fs = require('fs'), path = require('path');
const load = require('../test/load');
const E = load(['engine.js', 'content_core.js', 'content_chem.js', 'content_bio.js', 'content_phys.js', 'content_chem2.js', 'content_bio2.js', 'content_phys2.js', 'content_sci3.js', 'content_ps.js', 'content_check.js']);
const idsArg = (process.argv.find(a => a.startsWith('ids=')) || '').slice(4);
const ONLY_IDS = idsArg ? new Set(JSON.parse(fs.readFileSync(idsArg))) : null; /* recheck a given list (e.g. edited cards) */
const ONLY_NEW = process.argv.includes('new') || !!ONLY_IDS; /* export/compare only a subset, merging verdicts on write */
const POOL = E.ITEMS.filter(it => ONLY_IDS ? ONLY_IDS.has(it.id) : (!ONLY_NEW || !E.CROSSCHECK.verdicts[it.id]));
const dirArg = (process.argv.find(a => a.startsWith('dir=')) || '').slice(4);
const dir = path.join(__dirname, '..', 'check', dirArg || (process.argv.includes('new') ? 'round2' : ''));
fs.mkdirSync(dir, { recursive: true });
const L = 'ABCD';

function shuffle(a, rnd) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

if (process.argv[2] === 'export') {
  const keys = {};
  for (const [tag, seed] of [['A', 11], ['B', 29]]) {
    const rnd = E.mulberry32(seed), out = [];
    for (const it of POOL) {
      if (it.type === 'choice') {
        const order = shuffle([0, 1, 2, 3], rnd);
        out.push({ id: it.id, format: 'choice', question: it.prompt, options: Object.fromEntries(order.map((k, i) => [L[i], it.options[k]])) });
        (keys[it.id] = keys[it.id] || { type: 'choice', key: it.options[0] });
      } else if (it.type === 'typed') {
        out.push({ id: it.id, format: 'short answer', question: it.prompt });
        keys[it.id] = { type: 'typed', accepted: it.accepted };
      } else if (it.type === 'num') {
        out.push({ id: it.id, format: 'number', question: it.prompt });
        keys[it.id] = { type: 'num', num: it.num };
      } else {
        const q = it.gen(E.mulberry32(7));
        out.push({ id: it.id, format: 'number', question: q.prompt });
        keys[it.id] = { type: 'num', num: { value: q.value, tol: q.tol, tolPct: q.tolPct, unit: q.unit } };
      }
    }
    /* different item order too, so neither checker sees the deck in authoring order */
    /* opaque ids: the real ids name the concept and would leak answers */
    const shuffled = shuffle(out, E.mulberry32(seed * 7)), map = {};
    shuffled.forEach((q, i) => { const o = 'Q' + String(i + 1).padStart(3, '0'); map[o] = q.id; q.id = o; });
    fs.writeFileSync(path.join(dir, `blind_${tag}.json`), JSON.stringify(shuffled, null, 1));
    fs.writeFileSync(path.join(dir, `map_${tag}.json`), JSON.stringify(map));
  }
  fs.writeFileSync(path.join(dir, 'keys.json'), JSON.stringify(keys, null, 1));
  console.log('exported', Object.keys(keys).length, 'items');
}

if (process.argv[2] === 'compare') {
  const keys = JSON.parse(fs.readFileSync(path.join(dir, 'keys.json')));
  const mapOf = t => JSON.parse(fs.readFileSync(path.join(dir, `map_${t}.json`)));
  const blind = t => { const m = mapOf(t); return Object.fromEntries(JSON.parse(fs.readFileSync(path.join(dir, `blind_${t}.json`))).map(q => [m[q.id], q])); };
  const ans = t => { const m = mapOf(t), raw = JSON.parse(fs.readFileSync(path.join(dir, `answers_${t}.json`))); return Object.fromEntries(Object.entries(raw).map(([k, v]) => [m[k], v])); };
  const B = { A: blind('A'), B: blind('B') }, A = { A: ans('A'), B: ans('B') };
  const verdict = {}, report = [];
  for (const [id, k] of Object.entries(keys)) {
    const res = {};
    for (const t of ['A', 'B']) {
      const a = A[t][id];
      if (!a || a.answer == null) { res[t] = { ok: false, why: 'no answer' }; continue; }
      let ok;
      if (k.type === 'choice') { const picked = B[t][id].options[String(a.answer).trim().toUpperCase().slice(0, 1)]; ok = picked === k.key; res[t] = { ok, got: picked, note: a.note }; }
      else if (k.type === 'typed') { ok = E.textMatches(String(a.answer), k.accepted); res[t] = { ok, got: a.answer, note: a.note }; }
      else { ok = E.numMatches(String(a.answer), k.num); res[t] = { ok, got: a.answer, note: a.note }; }
    }
    const flagged = [res.A.note, res.B.note].some(n => n && String(n).trim());
    verdict[id] = res.A.ok && res.B.ok ? (flagged ? 'pass-noted' : 'pass') : 'disagree';
    if (verdict[id] !== 'pass') report.push({ id, verdict: verdict[id], key: k.key || k.accepted || k.num, A: res.A, B: res.B });
  }
  fs.writeFileSync(path.join(dir, 'report.json'), JSON.stringify(report, null, 1));
  if (process.argv.includes('write')) {
    const merged = ONLY_NEW ? Object.assign({}, E.CROSSCHECK.verdicts, verdict) : verdict;
    const out = `/* Generated by tools/blind.js compare write. Blind cross-check (spec §8.3 step 4): two fresh-context
   checkers answered every item with the key hidden; any disagreement quarantines the item. */
'use strict';
const CROSSCHECK = ${JSON.stringify({ date: new Date().toISOString().slice(0, 10), checkers: ['claude-opus-5-5, fresh context', 'claude-sonnet-5-5, fresh context'], rounds: (E.CROSSCHECK.rounds || [E.CROSSCHECK.date]).concat(ONLY_NEW ? [new Date().toISOString().slice(0, 10) + ': ' + Object.keys(verdict).length + (ONLY_IDS ? ' edited items rechecked blind' : ' new items')] : []), verdicts: merged })};
`;
    fs.writeFileSync(path.join(__dirname, '..', 'src', 'content_check.js'), out);
    console.log('wrote src/content_check.js');
  }
  const n = v => Object.values(verdict).filter(x => x === v).length;
  console.log(`pass ${n('pass')}  pass-with-note ${n('pass-noted')}  disagree ${n('disagree')}  (report: check/report.json)`);
}
