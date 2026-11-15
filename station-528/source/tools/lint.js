/* Content lint (spec §8.3 step 3, adapted): structure, one key per choice item, NOT/EXCEPT share,
   generators produce finite, self-consistent answers. node tools/lint.js */
const load = require('../test/load');
const E = load(['engine.js', 'content_core.js', 'content_chem.js', 'content_bio.js', 'content_phys.js', 'content_chem2.js', 'content_bio2.js', 'content_phys2.js']);
const { ITEMS, UNIT } = E;
let errs = 0; const err = (id, m) => { errs++; console.log('ERR', id, m); };
const ids = new Set();
let negStems = 0, choice = 0;
for (const it of ITEMS) {
  if (ids.has(it.id)) err(it.id, 'duplicate id'); ids.add(it.id);
  if (!UNIT[it.unit]) err(it.id, 'bad unit');
  if (!/^\d+[A-E]$/.test(it.cat)) err(it.id, 'bad category ' + it.cat);
  if (it.type !== 'gen' && (!it.prompt || !it.expl)) err(it.id, 'missing prompt/explanation');
  if (it.type === 'choice') {
    choice++;
    if (it.options.length !== 4) err(it.id, 'needs 4 options');
    if (it.lures.length !== it.options.length - 1) err(it.id, 'needs a rationale for every lure');
    if (new Set(it.options).size !== it.options.length) err(it.id, 'duplicate options');
    if (/\b(NOT|EXCEPT)\b/.test(it.prompt)) negStems++;
    if (it.options.some(o => /all of the above|none of the above/i.test(o))) err(it.id, '"of the above" options break shuffling');
  }
  if (it.type === 'typed' && (!it.accepted || !it.accepted.length)) err(it.id, 'no accepted answers');
  if (it.type === 'typed') for (const a of it.accepted) if (!E.norm(a)) err(it.id, 'accepted answer normalizes to empty: ' + a);
  if (it.type === 'num' && !(isFinite(it.num.value))) err(it.id, 'bad number');
  if (it.type === 'gen') {
    for (let s = 1; s <= 300; s++) {
      const q = it.gen(E.mulberry32(s));
      if (!q.prompt || !q.expl || !isFinite(q.value)) { err(it.id, 'generator seed ' + s + ' gave ' + JSON.stringify(q)); break; }
      if (/NaN|undefined|Infinity/.test(q.prompt + q.expl)) { err(it.id, 'generator text has NaN/undefined: ' + q.prompt); break; }
      /* its own key, formatted the way a student would type it, must be accepted */
      if (!E.numMatches(String(q.value), q)) { err(it.id, 'key not accepted by its own tolerance'); break; }
    }
  }
}
const by = k => Object.entries(ITEMS.reduce((a, it) => (a[it[k]] = (a[it[k]] || 0) + 1, a), {})).map(([a, b]) => a + ':' + b).join('  ');
console.log(`${ITEMS.length} items  |  types ${by('type')}`);
console.log(`courses: ${Object.entries(ITEMS.reduce((a, it) => { const c = UNIT[it.unit].course; a[c] = (a[c] || 0) + 1; return a; }, {})).map(([a, b]) => a + ':' + b).join('  ')}`);
console.log(`wings: ${by('fc')}  |  skill ${by('sk')}  |  high-yield ${ITEMS.filter(i => i.hy).length}`);
console.log(`NOT/EXCEPT stems: ${negStems}/${choice} choice items (${(100 * negStems / choice).toFixed(1)}%, limit 10%)`);
if (negStems / choice > 0.1) err('-', 'too many NOT/EXCEPT stems');
console.log(errs ? errs + ' error(s)' : 'lint: clean');
process.exit(errs ? 1 : 0);
