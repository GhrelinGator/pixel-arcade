/* Chemistry expansion: separations (5C) and deeper acid–base, solution and electrochemistry cards. Original items. */
'use strict';

/* ---------- Separations & lab techniques (5C) ---------- */
C('c-sep', 'simple-dist', 'Two liquids boil at 60 °C and 140 °C. What is the simplest method that separates them well?', ['Simple distillation', 'Fractional distillation', 'Vacuum distillation', 'Recrystallization'],
  ['It would work, but its column is only needed when boiling points are within about 25 °C.', 'Vacuum distillation is for very high-boiling or heat-sensitive compounds.', 'Recrystallization purifies solids.'],
  'A large boiling-point gap (more than about 25 °C) lets one simple distillation do the job.', { hy: true, cs: ['cs-distill'] });
C('c-sep', 'fractional', 'Two liquids boil at 78 °C and 85 °C. Which method separates them?', ['Fractional distillation', 'Simple distillation', 'Filtration', 'Gravity extraction'],
  ['Close boiling points would co-distill in a simple setup.', 'Filtration separates solids from liquids.', 'Not a standard technique.'],
  'The fractionating column gives many vaporization–condensation cycles, each enriching the lower-boiling component.', { cs: ['cs-distill'] });
C('c-sep', 'vacuum', 'Why use vacuum distillation?', ['Lowering the pressure lowers the boiling point, so high-boiling or heat-sensitive compounds don\'t decompose', 'It raises the boiling point', 'It separates solids', 'It removes water only'],
  ['The opposite.', 'Distillation separates liquids.', 'It is a general technique.'],
  'A liquid boils when its vapor pressure equals the external pressure; less external pressure means a lower boiling point.', { cs: ['cs-distill'] });
C('c-sep', 'acid-extract', 'An ether solution holds a carboxylic acid and a neutral compound. Shaking it with aqueous NaHCO₃:', ['Moves the acid into the water layer as its carboxylate salt', 'Moves the neutral compound into the water layer', 'Leaves both in the ether', 'Destroys the acid'],
  ['Neutral organics stay in the organic layer.', 'Bicarbonate is basic enough to deprotonate a carboxylic acid (pKa ≈ 4–5).', 'It is only deprotonated, and reacidifying recovers it.'],
  'Charged salts are water-soluble. Phenols (pKa ≈ 10) need stronger NaOH; amines are pulled into water with HCl.', { hy: true, sk: 2, cs: ['cs-extraction'] });
C('c-sep', 'amine-extract', 'To pull an amine out of an organic layer into water, you wash with:', ['Dilute HCl', 'NaHCO₃', 'NaOH', 'Pure water'],
  ['Bicarbonate would leave the amine neutral.', 'Base keeps the amine neutral and in the organic layer.', 'A neutral amine is only slightly water-soluble.'],
  'HCl protonates the amine to an ammonium salt, which dissolves in water.', { cs: ['cs-extraction'] });
C('c-sep', 'layers', 'In an extraction with dichloromethane (density 1.33 g/mL) and water, the organic layer is:', ['On the bottom', 'On top', 'Mixed with the water', 'Whichever was added first'],
  ['Diethyl ether (0.71 g/mL) floats on water; dichloromethane sinks.', 'They are immiscible.', 'Density decides, not order of addition.'],
  'The denser liquid sits below. Check densities before you drain the wrong layer.', { cs: ['cs-extraction'] });
C('c-sep', 'tlc', 'On a silica TLC plate (polar stationary phase) with a nonpolar solvent, which compound has the lowest Rf?', ['The most polar compound', 'The least polar compound', 'The heaviest compound', 'All have the same Rf'],
  ['Nonpolar compounds travel farthest (highest Rf).', 'Polarity, not mass, dominates here.', 'They separate by polarity.'],
  'Polar compounds stick to polar silica and move little. Reverse-phase (nonpolar) plates flip the order.', { hy: true, cs: ['cs-chromatography'] });
C('c-sep', 'sec', 'In size-exclusion chromatography, which proteins come off the column first?', ['The largest', 'The smallest', 'The most charged', 'The most hydrophobic'],
  ['Small proteins wander into the beads\' pores and take longer.', 'Size-exclusion ignores charge.', 'It ignores hydrophobicity.'],
  'Large molecules can\'t enter the pores, so they take the short path around the beads.', { sk: 2, cs: ['cs-chromatography'] });
C('c-sep', 'ion-exchange', 'A cation-exchange column has negatively charged beads. Which proteins bind most strongly?', ['Positively charged proteins', 'Negatively charged proteins', 'Neutral proteins', 'The largest proteins'],
  ['Like charges repel; they flow through.', 'Little attraction.', 'Size is not the basis.'],
  'Bound proteins are eluted with rising salt or a pH change.', { cs: ['cs-chromatography'] });
C('c-sep', 'affinity', 'Which chromatography uses a ligand (such as an antibody or substrate) bound to beads?', ['Affinity chromatography', 'Size-exclusion chromatography', 'Gas chromatography', 'Thin-layer chromatography'],
  ['Size-exclusion separates by size.', 'Gas chromatography separates by volatility.', 'TLC separates by polarity.'],
  'Only the protein that binds the ligand is retained; it is then released with free ligand or a change in conditions.', { cs: ['cs-chromatography'] });
C('c-sep', 'sds', 'In SDS-PAGE, proteins separate mainly by:', ['Size (mass), smaller ones moving faster', 'Charge, most negative ones moving faster', 'Isoelectric point', 'Shape, because they stay folded'],
  ['SDS gives every protein a similar charge-to-mass ratio, cancelling native charge.', 'That is isoelectric focusing.', 'SDS (often with a reducing agent) unfolds proteins.'],
  'The gel sieves the uniformly negative, unfolded chains, which run toward the positive electrode.', { hy: true, cs: ['cs-electrophoresis'] });
C('c-sep', 'ief', 'In isoelectric focusing, a protein stops moving where:', ['The pH equals its isoelectric point (net charge zero)', 'The gel ends', 'The pH equals 7', 'It reaches the positive electrode'],
  ['It stops well before that.', 'Each protein stops at its own pI.', 'Neutral proteins feel no pull to either electrode.'],
  'Above its pI a protein is negative; below it, positive. It migrates until neither applies.', { sk: 2, cs: ['cs-electrophoresis'] });
C('c-sep', 'recryst', 'A good recrystallization solvent dissolves your compound:', ['Well when hot and poorly when cold', 'Well when cold and poorly when hot', 'Well at all temperatures', 'Poorly at all temperatures'],
  ['Then nothing crystallizes on cooling.', 'Then nothing crystallizes.', 'Then you cannot dissolve it to begin with.'],
  'Dissolve in the minimum hot solvent, cool slowly, and impurities stay in solution.', { cs: ['cs-solid-purify'] });
G('c-sep', 'g-rf', 'Rf value', rnd => {
  const solvent = pickR(rnd, [8, 10, 12]), spot = pickR(rnd, [2, 3, 4, 5, 6]);
  return { prompt: `On a TLC plate the solvent front travels ${solvent} cm and a spot travels ${spot} cm. What is the spot\'s Rf?`, value: spot / solvent, tol: 0.01, unit: '',
    expl: `Rf = distance of spot ÷ distance of solvent front = ${spot}/${solvent} = ${sig(spot / solvent, 2)}. Rf is always between 0 and 1.` };
}, { sk: 1 });

/* ---------- Deeper: acids, bases & buffers (5A) ---------- */
C('c-acid', 'salt-hydrolysis', 'Which salt makes an acidic solution in water?', ['NH₄Cl', 'NaCl', 'CH₃COONa', 'KNO₃'],
  ['Na⁺ and Cl⁻ are spectators from a strong base and strong acid: neutral.', 'Acetate is a weak base: basic solution.', 'K⁺ and NO₃⁻ are spectators: neutral.'],
  'NH₄⁺ is the conjugate acid of the weak base NH₃, so it donates H⁺ to water.', { hy: true, sk: 2, cs: ['cs-acid-strength'] });
C('c-acid', 'pka-pkb', 'For a conjugate acid–base pair in water at 25 °C, pKa + pKb equals:', ['14', '7', '1', '0'],
  ['7 is neutral pH, not this sum.', 'Off by a lot.', 'They are not opposites that cancel.'],
  'Ka × Kb = Kw = 10^-14, so pKa + pKb = 14. A stronger acid has a weaker conjugate base.', { cs: ['cs-acid-strength'] });
C('c-acid', 'polyprotic', 'Phosphoric acid (H₃PO₄) has three acidic protons. How do its successive dissociation constants compare?', ['Ka₁ > Ka₂ > Ka₃', 'Ka₁ = Ka₂ = Ka₃', 'Ka₁ < Ka₂ < Ka₃', 'Ka₂ is the largest'],
  ['Each proton comes off a more negative ion, so they are not equal.', 'Each later proton is harder to remove, not easier.', 'The first proton, leaving a neutral molecule, is the easiest to remove.'],
  'Pulling H⁺ away from an already negative ion costs more, so each Ka is far smaller (pKa ≈ 2.1, 7.2, 12.4). A titration in water shows two clear equivalence points; the third is too weak to see.', { sk: 2 });
C('c-acid', 'indicator', 'For a weak acid titrated with NaOH (equivalence pH ≈ 8.5), the best indicator is one whose color change is near:', ['pH 8–10, like phenolphthalein', 'pH 3–4, like methyl orange', 'pH 5', 'pH 12–13'],
  ['That would change color long before equivalence.', 'Too early.', 'Too late: the curve has already passed the steep rise.'],
  'Choose an indicator whose pKa sits within the steep part of the curve, near the equivalence pH.', { cs: ['cs-titration'] });
G('c-acid', 'g-weak-ph', 'pH of a weak acid', rnd => {
  const n = pickR(rnd, [4, 5, 6]), m = pickR(rnd, [1, 2]);
  const pH = (n + m) / 2;
  return { prompt: `A weak acid has Ka = 1 × 10^-${n}. What is the pH of a 1 × 10^-${m} M solution? (Assume x is small.)`, value: pH, tol: 0.05, unit: '',
    expl: `[H⁺] ≈ √(Ka·C) = √(10^-${n} × 10^-${m}) = 10^-${pH}. pH = ${pH}. Shortcut: pH = ½(pKa − log C).`, hint: '[H⁺] ≈ √(Ka × C)' };
}, { hy: true });
G('c-acid', 'g-ka', 'Ka from pH', rnd => {
  const pH = pickR(rnd, [2, 3, 4]), C = pickR(rnd, [0.1, 0.01]);
  const h = Math.pow(10, -pH), Ka = h * h / C;
  if (h > 0.05 * C) return { prompt: `A 0.1 M weak acid solution has pH 3. Estimate Ka.`, value: 1e-5, tolPct: 5, unit: '', expl: '[H⁺] = 10^-3; Ka ≈ x²/C = (10^-3)² / 0.1 = 1 × 10^-5.' };
  return { prompt: `A ${C} M weak acid solution has pH ${pH}. Estimate Ka.`, value: Ka, tolPct: 5, unit: '',
    expl: `[H⁺] = [A⁻] = 10^-${pH}; Ka ≈ x²/C = (10^-${pH})² / ${C} = ${sci(Ka, 2)}.` };
});

/* ---------- Deeper: solubility & colligative properties (5A) ---------- */
G('c-sol', 'g-osmotic', 'Osmotic pressure', rnd => {
  const c = pickR(rnd, [{ f: 'NaCl', i: 2 }, { f: 'glucose', i: 1 }, { f: 'CaCl₂', i: 3 }]), M = pickR(rnd, [0.1, 0.2, 0.5]), T = pickR(rnd, [300, 310]);
  const pi = c.i * M * 0.0821 * T;
  return { prompt: `What is the osmotic pressure (atm) of ${M} M ${c.f} at ${T} K? (R = 0.0821 L·atm/(mol·K); assume complete dissociation.)`, value: pi, tolPct: 2, unit: 'atm',
    expl: `π = iMRT = ${c.i} × ${M} × 0.0821 × ${T} = ${sig(pi)} atm.`, hint: 'π = iMRT' };
}, { cs: ['cs-colligative'] });
G('c-sol', 'g-raoult', 'Raoult\'s law', rnd => {
  const x = pickR(rnd, [0.9, 0.8, 0.95, 0.75]), P0 = pickR(rnd, [24, 40, 100, 760]);
  return { prompt: `Pure water has a vapor pressure of ${P0} torr. What is the vapor pressure (torr) of a solution with a nonvolatile solute where the mole fraction of water is ${x}?`, value: x * P0, tolPct: 2, unit: 'torr',
    expl: `P = X_solvent × P° = ${x} × ${P0} = ${sig(x * P0)} torr.` };
}, { cs: ['cs-colligative'] });

/* ---------- Deeper: redox & electrochemistry (4C) ---------- */
C('c-redox', 'conc-cell', 'A concentration cell has the same metal and solution in both halves, at different concentrations. Which is true?', ['E°cell = 0, but current flows until the concentrations become equal', 'It produces no current at all', 'The more dilute side is the cathode', 'Its voltage rises over time'],
  ['A difference in concentration drives it (Nernst equation).', 'Reduction happens on the more concentrated side, which is the cathode.', 'The voltage falls as the concentrations even out.'],
  'E = −(RT/nF) ln Q. Q < 1 while the cathode side is more concentrated, so E > 0.', { sk: 2, cs: ['cs-cells'] });
C('c-redox', 'nernst', 'In a running galvanic cell, product concentrations rise. What happens to the cell voltage?', ['It falls toward zero', 'It rises', 'It stays at E°', 'It reverses sign at once'],
  ['Q increases, which lowers E.', 'E equals E° only at standard conditions.', 'It approaches zero at equilibrium (a dead battery).'],
  'E = E° − (RT/nF) ln Q. At equilibrium Q = K and E = 0.', { cs: ['cs-cells'] });
G('c-redox', 'g-dg-nfe', 'ΔG° = −nFE°', rnd => {
  const n = pickR(rnd, [1, 2, 3]), E = pickR(rnd, [0.46, 0.78, 1.10, 1.56]);
  const dG = -n * 96500 * E / 1000;
  return { prompt: `A cell reaction transfers ${n} mol of electrons with E° = +${E} V. What is ΔG°, in kJ? (F = 96,500 C/mol)`, value: dG, tolPct: 2, unit: 'kJ',
    expl: `ΔG° = −nFE° = −${n} × 96,500 × ${E} J = ${sig(dG)} kJ. Negative, so spontaneous.`, hint: 'ΔG° = −nFE°' };
}, { hy: true, cs: ['cs-cells'] });
G('c-redox', 'g-faraday', 'Electrolysis', rnd => {
  const I = pickR(rnd, [1, 2, 5]), t = pickR(rnd, [965, 1930, 9650]), metal = pickR(rnd, [{ f: 'Cu²⁺', n: 2, M: 63.5 }, { f: 'Ag⁺', n: 1, M: 108 }]);
  const mol = I * t / 96500 / metal.n, g = mol * metal.M;
  return { prompt: `A current of ${I} A runs for ${t} s through a ${metal.f} solution. What mass of metal (g) plates out? (F = 96,500 C/mol; molar mass ${metal.M} g/mol)`, value: g, tolPct: 2, unit: 'g',
    expl: `Charge = It = ${I * t} C → ${sig(I * t / 96500)} mol e⁻ → ÷ ${metal.n} = ${sig(mol)} mol metal → × ${metal.M} = ${sig(g)} g.` };
}, { cs: ['cs-cells'] });
