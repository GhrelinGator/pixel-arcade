/* Station 528 content model. Every item is original (written for this app, not copied from any prep
   company or AAMC material). AAMC content-category codes are used as tags only. */
'use strict';

const COURSES = [
  { id: 'chem1', name: 'General Chemistry I' },
  { id: 'chem2', name: 'General Chemistry II' },
  { id: 'bio1', name: 'General Biology I' },
  { id: 'bio2', name: 'General Biology II' },
  { id: 'phys1', name: 'Physics I' },
  { id: 'phys2', name: 'Physics II' },
];
const UNITS = [
  { id: 'c-atoms', course: 'chem1', name: 'Atoms, electrons & periodic trends', cat: '4E' },
  { id: 'c-bond', course: 'chem1', name: 'Bonding, Lewis structures & shapes', cat: '5B' },
  { id: 'c-imf', course: 'chem1', name: 'Intermolecular forces & phases', cat: '5B' },
  { id: 'c-stoich', course: 'chem1', name: 'Moles, stoichiometry & concentration', cat: '4E' },
  { id: 'c-gas', course: 'chem1', name: 'Gases', cat: '4B' },
  { id: 'c-thermo', course: 'chem1', name: 'Thermochemistry & free energy', cat: '5E' },
  { id: 'c-kin', course: 'chem2', name: 'Kinetics', cat: '5E' },
  { id: 'c-eq', course: 'chem2', name: 'Equilibrium', cat: '5E' },
  { id: 'c-acid', course: 'chem2', name: 'Acids, bases & buffers', cat: '5A' },
  { id: 'c-sol', course: 'chem2', name: 'Solubility & colligative properties', cat: '5A' },
  { id: 'c-redox', course: 'chem2', name: 'Redox & electrochemistry', cat: '4C' },
  { id: 'c-nuc', course: 'chem2', name: 'Nuclear chemistry', cat: '4E' },
  { id: 'b-mol', course: 'bio1', name: 'Biomolecules', cat: '1A' },
  { id: 'b-cell', course: 'bio1', name: 'Cells & organelles', cat: '2A' },
  { id: 'b-mem', course: 'bio1', name: 'Membranes & transport', cat: '2A' },
  { id: 'b-energy', course: 'bio1', name: 'Enzymes & cellular respiration', cat: '1D' },
  { id: 'b-div', course: 'bio1', name: 'Cell cycle, mitosis & meiosis', cat: '2C' },
  { id: 'b-gen', course: 'bio1', name: 'Mendelian genetics', cat: '1C' },
  { id: 'b-dna', course: 'bio1', name: 'DNA, replication & gene expression', cat: '1B' },
  { id: 'b-prok', course: 'bio2', name: 'Prokaryotes & viruses', cat: '2B' },
  { id: 'b-sys', course: 'bio2', name: 'Nerves, hormones & organ systems', cat: '3B' },
  { id: 'p-kin', course: 'phys1', name: 'Kinematics', cat: '4A' },
  { id: 'p-force', course: 'phys1', name: 'Forces & Newton\'s laws', cat: '4A' },
  { id: 'p-energy', course: 'phys1', name: 'Work, energy & power', cat: '4A' },
  { id: 'p-mom', course: 'phys1', name: 'Momentum, torque & equilibrium', cat: '4A' },
  { id: 'p-fluid', course: 'phys1', name: 'Fluids', cat: '4B' },
  { id: 'p-elec', course: 'phys2', name: 'Electrostatics & circuits', cat: '4C' },
  { id: 'p-wave', course: 'phys2', name: 'Waves & sound', cat: '4D' },
  { id: 'p-light', course: 'phys2', name: 'Light & optics', cat: '4D' },
];
const UNIT = Object.fromEntries(UNITS.map(u => [u.id, u]));
/* The Station's eleven wings: the ten foundational concepts plus CARS. Short labels are this app's own. */
const WINGS = [
  { id: 1, sec: 'BB', name: 'Biomolecules' }, { id: 2, sec: 'BB', name: 'Cells' }, { id: 3, sec: 'BB', name: 'Organ systems' },
  { id: 4, sec: 'CP', name: 'Physical systems' }, { id: 5, sec: 'CP', name: 'Chemistry' },
  { id: 6, sec: 'PS', name: 'Perception' }, { id: 7, sec: 'PS', name: 'Behavior' }, { id: 8, sec: 'PS', name: 'Self & others' },
  { id: 9, sec: 'PS', name: 'Society' }, { id: 10, sec: 'PS', name: 'Inequality' }, { id: 0, sec: 'CARS', name: 'Reading' },
];
const secOfCat = cat => { const f = parseInt(cat, 10); return f <= 3 ? 'BB' : f <= 5 ? 'CP' : 'PS'; };

/* How to display typed answers whose first accepted form is lower-case shorthand. */
const SHOW = {
  'c-atoms.l-shape': 'l, the azimuthal (angular momentum) quantum number', 'c-atoms.hund': 'Hund\'s rule', 'c-atoms.pauli': 'The Pauli exclusion principle',
  'c-bond.co2-hyb': 'sp', 'c-bond.ch4-hyb': 'sp³', 'c-bond.c2h4-hyb': 'sp²', 'c-imf.london': 'London dispersion forces',
  'c-gas.ideal': 'PV = nRT', 'c-thermo.hess': 'Hess\'s law', 'b-cell.ser': 'Smooth ER', 'b-cell.rer': 'Rough ER', 'b-cell.mito': 'Mitochondria',
  'b-dna.primase': 'RNA', 'b-dna.start': 'AUG', 'b-dna.ligase': 'DNA ligase', 'b-energy.pfk': 'Phosphofructokinase-1 (PFK-1)', 'b-energy.km': 'Half',
  'p-force.newton-unit': 'The newton (N)', 'p-energy.watt': 'The watt (W)', 'c-atoms.element-id': 'Which element it is (its atomic number)',
};
const PROVENANCE = { author: 'llm', model: 'claude-opus-5-5', createdAt: '2026-11-14', license: 'original', humanReviewed: false };
const ITEMS = [];
function addItem(u, id, o) {
  const unit = UNIT[u]; if (!unit) throw new Error('no unit ' + u);
  const cat = o.cat || unit.cat;
  const it = Object.assign({ id: u + '.' + id, unit: u, cat, fc: parseInt(cat, 10), sec: secOfCat(cat), sk: 1, hy: false, cs: [], kind: 'fact' }, o);
  ITEMS.push(it); return it;
}
/* Typed recall: the player writes the answer. accepted: answers that count. */
function T(u, id, prompt, accepted, expl, o = {}) { return addItem(u, id, Object.assign({ type: 'typed', prompt, accepted, expl }, o)); }
/* Typed number: value with tolerance (tol absolute or tolPct percent). */
function N(u, id, prompt, num, expl, o = {}) { return addItem(u, id, Object.assign({ type: 'num', prompt, num, expl }, o)); }
/* Choice: options[0] is the key (shuffled on screen); lures[i] says why options[i+1] is wrong. */
function C(u, id, prompt, options, lures, expl, o = {}) { return addItem(u, id, Object.assign({ type: 'choice', prompt, options, lures, expl }, o)); }
/* Generated problem: gen(rnd) returns {prompt, value, tol|tolPct, unit, expl}. New numbers every review; code computes the key. */
function G(u, id, title, gen, o = {}) { return addItem(u, id, Object.assign({ type: 'gen', kind: 'problem', sk: 2, title, gen }, o)); }

/* helpers for generators */
const pickR = (rnd, a) => a[Math.floor(rnd() * a.length)];
const rintR = (rnd, lo, hi) => lo + Math.floor(rnd() * (hi - lo + 1));
const sig = (x, n = 3) => { if (x === 0 || !isFinite(x)) return String(x); const p = Math.pow(10, n - 1 - Math.floor(Math.log10(Math.abs(x)))); return String(Math.round(x * p) / p); };
const sci = (x, n = 2) => { if (x === 0) return '0'; const e = Math.floor(Math.log10(Math.abs(x))); const m = x / Math.pow(10, e); return (Math.abs(e) < 4) ? sig(x, n + 1) : `${sig(m, n)} × 10^${e}`; };
