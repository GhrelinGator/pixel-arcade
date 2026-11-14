/* General chemistry starter deck. Original items; code computes every numeric key. */
'use strict';

/* ---------- Atoms, electrons & periodic trends (4E) ---------- */
T('c-atoms', 'element-id', 'What does the number of protons in a nucleus determine?', ['the element', 'element', 'which element it is', 'atomic number', 'element identity', 'identity of the element'],
  'The proton count is the atomic number Z, and Z alone fixes which element an atom is. Neutrons change the isotope; electrons change the charge.', { hy: true });
T('c-atoms', 'isotope', 'Isotopes of the same element differ in their number of ___.', ['neutrons', 'neutron'],
  'Same protons (same element), different neutrons, so different mass numbers. Chemistry is nearly identical because the electron arrangement is the same.');
C('c-atoms', 'radius', 'Which atom has the largest atomic radius?', ['Cs', 'Na', 'Cl', 'F'],
  ['Na is in the same group as Cs but three periods higher: fewer occupied shells, so smaller.', 'Cl is right of Na in period 3; its higher effective nuclear charge pulls electrons closer.', 'F is high and to the right, so it is one of the smallest atoms.'],
  'Atomic radius grows down a group (new shells) and shrinks across a period (effective nuclear charge rises with no new shell). Cs is lowest and farthest left of these.', { hy: true, cs: ['cs-periodic'] });
C('c-atoms', 'ie-max', 'Which has the highest first ionization energy?', ['Ne', 'F', 'O', 'Li'],
  ['F is close, but Ne has one more proton in the same shell and a filled, very stable 2p subshell.', 'O is lower even than N, because its paired 2p electron is easier to remove.', 'Li has a lone 2s electron far from a weakly felt nucleus: the lowest of the period.'],
  'Ionization energy rises across a period as effective nuclear charge increases, peaking at the noble gas.', { hy: true, cs: ['cs-periodic'] });
C('c-atoms', 'ie-n-o', 'Nitrogen\'s first ionization energy is higher than oxygen\'s. Why?', ['Oxygen\'s fourth 2p electron is paired, and the pairing repulsion makes it easier to remove', 'Nitrogen has a larger nuclear charge', 'Oxygen atoms are larger than nitrogen atoms', 'Nitrogen\'s 2p subshell is completely filled'],
  ['Oxygen has more protons (8 vs 7), not fewer.', 'Oxygen is slightly smaller, which on its own would raise its ionization energy.', 'Nitrogen\'s 2p is half-filled (3 of 6), not full. Half-filled is the stable arrangement.'],
  'N is 2p³ with one electron in each p orbital. O is 2p⁴, so one orbital holds a pair; the extra electron-electron repulsion lets that electron leave more easily. The same dip appears between Be and B for a different reason (B removes a higher-energy 2p electron).', { sk: 2, cs: ['cs-periodic'] });
C('c-atoms', 'cr-config', 'What is the ground-state electron configuration of chromium (Z = 24)?', ['[Ar] 4s¹ 3d⁵', '[Ar] 4s² 3d⁴', '[Ar] 3d⁶', '[Ar] 4s² 3d⁵'],
  ['This is what simple filling order predicts, but moving one 4s electron to make a half-filled 3d set is lower in energy.', 'Right electron count, but neutral Cr keeps one electron in 4s; an empty 4s is wrong.', 'This has 25 electrons: it is manganese.'],
  'Cr and Cu are the classic exceptions: Cr takes 4s¹3d⁵ (half-filled d) and Cu takes 4s¹3d¹⁰ (filled d).', { hy: true });
C('c-atoms', 'fe-ion', 'When iron forms Fe²⁺, which electrons leave first?', ['The two 4s electrons', 'Two 3d electrons', 'One 4s and one 3d electron', 'Two 4p electrons'],
  ['3d fills after 4s, but in the ion the 4s electrons are higher in energy and leave first.', 'Both removed electrons come from 4s.', 'Neutral Fe has no 4p electrons.'],
  'Transition metals lose their ns electrons before their (n−1)d electrons. Fe is [Ar]4s²3d⁶, so Fe²⁺ is [Ar]3d⁶.', { hy: true });
N('c-atoms', 'd-max', 'What is the maximum number of electrons a d subshell can hold?', { value: 10, tol: 0 },
  'A d subshell has five orbitals (mₗ = −2…+2), each holding two electrons of opposite spin: 10.');
T('c-atoms', 'l-shape', 'Which quantum number describes the shape of an orbital (s, p, d, f)?', ['l', 'azimuthal', 'azimuthal quantum number', 'angular momentum', 'angular momentum quantum number', 'orbital angular momentum', 'secondary quantum number'],
  'The azimuthal (angular momentum) quantum number l sets the shape: l = 0 is s, 1 is p, 2 is d, 3 is f. n sets energy level and size; mₗ sets orientation; mₛ sets spin.');
C('c-atoms', 'qn-bad', 'Which set of quantum numbers (n, l, mₗ, mₛ) is NOT allowed?', ['(2, 2, 0, +½)', '(3, 2, −2, −½)', '(2, 1, −1, +½)', '(1, 0, 0, −½)'],
  ['Allowed: l = 2 is fine when n = 3, and mₗ = −2 lies within −l…+l.', 'Allowed: a 2p electron.', 'Allowed: a 1s electron.'],
  'l can only run from 0 to n − 1. With n = 2, l can be 0 or 1, never 2.');
T('c-atoms', 'hund', 'Which rule says electrons occupy degenerate orbitals singly, with parallel spins, before any pairing?', ['hund', 'hunds rule', 'hund rule', 'hunds', 'rule of maximum multiplicity'],
  'Hund\'s rule. Spreading out first minimizes electron-electron repulsion. Do not confuse it with the Pauli exclusion principle (no two electrons share all four quantum numbers).', { cs: ['cs-electron-rules'] });
T('c-atoms', 'pauli', 'Which principle says no two electrons in an atom can share all four quantum numbers?', ['pauli exclusion principle', 'pauli', 'pauli exclusion', 'pauli principle', 'exclusion principle'],
  'The Pauli exclusion principle, which is why each orbital holds at most two electrons, with opposite spins.', { cs: ['cs-electron-rules'] });
C('c-atoms', 'en', 'Which element is the most electronegative?', ['F', 'O', 'Cl', 'N'],
  ['O is second (3.4 vs 4.0 on the Pauling scale).', 'Cl sits below F, with its valence electrons farther from the nucleus.', 'N is to the left of O and F in the same period.'],
  'Electronegativity increases up and to the right (noble gases aside). Fluorine is the most electronegative element.', { hy: true, cs: ['cs-periodic'] });
C('c-atoms', 'isoelectronic', 'These ions all have 10 electrons. Which is largest?', ['O²⁻', 'F⁻', 'Na⁺', 'Mg²⁺'],
  ['F⁻ has one more proton than O²⁻ pulling on the same 10 electrons.', 'Na⁺ has 11 protons on 10 electrons, so it is contracted.', 'Mg²⁺ has the most protons (12) of the set, so it is smallest.'],
  'In an isoelectronic series, radius falls as nuclear charge rises. O²⁻ has the fewest protons (8).', { sk: 2, cs: ['cs-periodic'] });
C('c-atoms', 'h-transition', 'In hydrogen, which electron transition emits the highest-energy photon?', ['n = 2 → n = 1', 'n = 3 → n = 2', 'n = 4 → n = 3', 'n = 6 → n = 5'],
  ['About 1.9 eV: levels get closer together as n rises.', 'Smaller still, about 0.66 eV.', 'Smallest of the set, about 0.13 eV.'],
  'Hydrogen levels follow Eₙ = −13.6 eV / n². The gap from n = 2 to n = 1 (10.2 eV) is bigger than any gap above it, so that drop emits the most energetic photon.', { sk: 2 });
T('c-atoms', 'emit', 'When an electron drops from a higher to a lower energy level, the atom ___ a photon.', ['emits', 'emit', 'releases', 'gives off', 'emission'],
  'Dropping to a lower level releases the energy difference as a photon (emission). Absorbing a photon of exactly that energy moves the electron up.');
G('c-atoms', 'g-photon', 'Photon energy from wavelength', rnd => {
  const lam = pickR(rnd, [124, 248, 310, 400, 413, 496, 620, 650, 700]);
  const E = 1240 / lam;
  return { prompt: `A photon has a wavelength of ${lam} nm. What is its energy in eV? (Use hc ≈ 1240 eV·nm.)`, value: E, tolPct: 3, unit: 'eV',
    expl: `E = hc/λ = 1240 eV·nm ÷ ${lam} nm ≈ ${sig(E)} eV. Shorter wavelength means higher energy.`, hint: 'E = hc / λ' };
}, { hy: true });
G('c-atoms', 'g-avgmass', 'Average atomic mass from isotopes', rnd => {
  const cases = [
    { el: 'chlorine', a: 35, b: 37, fa: 75 }, { el: 'boron', a: 10, b: 11, fa: 20 }, { el: 'copper', a: 63, b: 65, fa: 69 },
    { el: 'a hypothetical element X', a: 50, b: 52, fa: pickR(rnd, [40, 60, 25]) }];
  const c = pickR(rnd, cases), m = (c.a * c.fa + c.b * (100 - c.fa)) / 100;
  return { prompt: `${c.el[0].toUpperCase() + c.el.slice(1)} is ${c.fa}% mass-${c.a} and ${100 - c.fa}% mass-${c.b} (treat isotope masses as whole numbers). What is the average atomic mass, in amu?`, value: m, tol: 0.05, unit: 'amu',
    expl: `Weighted average: ${c.a}(${c.fa / 100}) + ${c.b}(${(100 - c.fa) / 100}) = ${sig(m, 4)} amu. The average sits closer to the more abundant isotope.` };
});

/* ---------- Bonding, Lewis structures & shapes (5B) ---------- */
C('c-bond', 'nh3-shape', 'What is the molecular geometry of NH₃?', ['Trigonal pyramidal', 'Tetrahedral', 'Trigonal planar', 'Bent'],
  ['Tetrahedral is the electron geometry (four domains). The molecular shape counts only atoms, and one corner is a lone pair.', 'Trigonal planar needs three domains and no lone pair, like BF₃.', 'Bent has two bonded atoms (H₂O); NH₃ has three.'],
  'Three bonds plus one lone pair: four electron domains (tetrahedral arrangement), so the atoms form a pyramid with angles near 107°.', { hy: true, cs: ['cs-vsepr'] });
C('c-bond', 'h2o-angle', 'The H–O–H bond angle in water is closest to:', ['104.5°', '109.5°', '120°', '180°'],
  ['109.5° is the ideal tetrahedral angle; water\'s two lone pairs squeeze the bonds closer.', '120° is trigonal planar (three domains).', '180° is linear, as in CO₂.'],
  'Four electron domains (two bonds, two lone pairs). Lone pairs repel more than bonding pairs, compressing the angle below 109.5° to about 104.5°.', { hy: true, cs: ['cs-vsepr'] });
T('c-bond', 'co2-hyb', 'What is the hybridization of the carbon atom in CO₂?', ['sp'],
  'Two electron domains (two double bonds) → sp, linear, 180°. Each C=O has one σ bond and one π bond made from the unhybridized p orbitals.', { cs: ['cs-hybrid'] });
T('c-bond', 'ch4-hyb', 'What is the hybridization of the carbon atom in CH₄?', ['sp3'],
  'Four electron domains → sp³, tetrahedral, 109.5°.', { cs: ['cs-hybrid'] });
T('c-bond', 'c2h4-hyb', 'What is the hybridization of each carbon in ethene (C₂H₄)?', ['sp2'],
  'Each carbon has three electron domains (two C–H and one C=C) → sp², trigonal planar. The leftover p orbital forms the π bond.', { cs: ['cs-hybrid'] });
C('c-bond', 'sf6', 'What is the molecular geometry of SF₆?', ['Octahedral', 'Trigonal bipyramidal', 'Square planar', 'Hexagonal planar'],
  ['That is five domains, as in PCl₅.', 'Square planar is six domains with two lone pairs (XeF₄); SF₆ has six bonds and no lone pairs.', 'VSEPR never gives a planar arrangement for six domains: they spread in three dimensions.'],
  'Six bonding domains, no lone pairs, point to the corners of an octahedron with 90° angles.', { cs: ['cs-vsepr'] });
C('c-bond', 'xef4', 'XeF₄ has four bonds and two lone pairs on xenon. What is its molecular geometry?', ['Square planar', 'Tetrahedral', 'Seesaw', 'Octahedral'],
  ['Tetrahedral is four domains with no lone pairs.', 'Seesaw is five domains with one lone pair (SF₄).', 'Octahedral is the electron geometry; the shape counts only the atoms.'],
  'Six domains sit octahedrally. The two lone pairs go opposite each other (180°) to minimize repulsion, leaving the four F atoms in a square.', { sk: 2, cs: ['cs-vsepr'] });
C('c-bond', 'nonpolar', 'Which molecule has polar bonds but is nonpolar overall?', ['CO₂', 'H₂O', 'NH₃', 'HCl'],
  ['Water is bent, so its bond dipoles add to a net dipole.', 'The pyramid shape leaves a net dipole.', 'One polar bond, no symmetry to cancel it.'],
  'CO₂ is linear and symmetric: the two C=O dipoles are equal and opposite, so they cancel.', { hy: true });
C('c-bond', 'fc-nh4', 'What is the formal charge on nitrogen in NH₄⁺?', ['+1', '0', '−1', '+4'],
  ['0 is the formal charge of N in neutral NH₃ (three bonds, one lone pair).', '−1 would need N to own more electrons than its 5 valence electrons.', 'Formal charge is not the number of bonds.'],
  'Formal charge = valence electrons − nonbonding electrons − ½(bonding electrons) = 5 − 0 − ½(8) = +1.');
C('c-bond', 'nacl', 'What kind of bond holds sodium and chloride together in table salt?', ['Ionic', 'Polar covalent', 'Nonpolar covalent', 'Metallic'],
  ['The electronegativity difference (about 2.1) is large enough for a near-complete electron transfer.', 'Nonpolar covalent bonds join atoms of similar electronegativity.', 'Metallic bonding is a sea of shared electrons among metal atoms.'],
  'A metal (Na) gives up an electron to a nonmetal (Cl), and the resulting ions attract electrostatically in a lattice.', { cs: ['cs-bond-type'] });
C('c-bond', 'polar-bond', 'Which bond is the most polar?', ['H–F', 'H–Cl', 'N–H', 'C–H'],
  ['Cl is less electronegative than F (3.2 vs 4.0).', 'N–H (difference ≈ 0.9) is less polar than H–F (≈ 1.8).', 'C–H is nearly nonpolar (difference ≈ 0.4).'],
  'Bond polarity tracks the electronegativity difference, and F is the most electronegative element.', { cs: ['cs-bond-type'] });
N('c-bond', 'triple-pi', 'A triple bond contains one σ bond and how many π bonds?', { value: 2, tol: 0 },
  'The first bond between two atoms is σ (head-on overlap). Each additional bond is π (side-by-side p overlap). Triple = 1 σ + 2 π.', { hy: true });
C('c-bond', 'cc-strong', 'Which carbon–carbon bond is the strongest?', ['C≡C', 'C=C', 'C–C', 'All three are equally strong'],
  ['A double bond is weaker than a triple bond.', 'A single bond is the weakest and longest of the three.', 'More shared electron pairs mean a stronger, shorter bond.'],
  'Bond order up → bond strength up and bond length down. (Each π bond is weaker than the σ bond, but the total still rises.)', { cs: ['cs-bond-order'] });
C('c-bond', 'resonance', 'Which statement about the carbonate ion\'s resonance structures is true?', ['The real ion is a single hybrid in which all three C–O bonds are identical', 'The ion flips rapidly between the three structures', 'At any moment one C–O bond is double and two are single', 'The structure with the most formal charge contributes most'],
  ['Resonance is not motion: no structure ever exists on its own.', 'All three C–O bonds are measured equal, between single and double in length.', 'The opposite: structures with the least formal charge contribute most.'],
  'Resonance structures are drawings of one delocalized electron distribution. In CO₃²⁻ each C–O bond has a bond order of 4/3.', { sk: 2 });
C('c-bond', 'coordinate', 'When NH₃ bonds to BF₃, where do the two electrons of the new B–N bond come from?', ['Both come from nitrogen', 'Both come from boron', 'One from each atom', 'None: the B–N bond is ionic'],
  ['Boron has an empty p orbital and no lone pair to give.', 'That would be an ordinary covalent bond; here N supplies the pair.', 'It is a shared electron pair, so it is covalent.'],
  'This is a coordinate covalent bond: NH₃ (Lewis base) donates its lone pair into boron\'s empty orbital (Lewis acid).', { cs: ['cs-acid-def'] });
C('c-bond', 'expanded', 'Which central atom can have more than eight electrons around it?', ['P', 'N', 'O', 'C'],
  ['N is in period 2 and is limited to an octet.', 'O is in period 2 and is limited to an octet.', 'C is in period 2 and is limited to an octet.'],
  'Atoms in period 3 and below (P, S, Cl, Xe…) can hold an expanded octet, as in PCl₅ or SF₆. Second-period atoms cannot.');
T('c-bond', 'radical', 'A species with an unpaired electron, like NO, is called a ___.', ['radical', 'free radical', 'radicals', 'free radicals'],
  'An odd electron count forces an unpaired electron, which makes radicals reactive. They are one of the octet-rule exceptions.');

/* ---------- Intermolecular forces & phases (5B) ---------- */
C('c-imf', 'water-imf', 'What is the strongest intermolecular force between water molecules?', ['Hydrogen bonding', 'London dispersion', 'Dipole–induced dipole', 'Ion–dipole'],
  ['Present, but weak for a molecule this small.', 'Needs a nonpolar partner; water molecules are all polar.', 'Needs an ion. Pure water has almost none.'],
  'H bonded to O, N or F on one molecule is attracted to a lone pair on O, N or F of a neighbor. Water makes up to four such bonds each.', { hy: true, cs: ['cs-imf'] });
C('c-imf', 'bp-water', 'Which has the highest boiling point?', ['H₂O', 'H₂S', 'CH₄', 'Ne'],
  ['H₂S is heavier but cannot hydrogen-bond (S is not electronegative enough), so it boils at about −60 °C.', 'Nonpolar, dispersion only.', 'A single small atom with weak dispersion forces.'],
  'Hydrogen bonding gives water an unusually high boiling point (100 °C) for its size.', { cs: ['cs-imf'] });
C('c-imf', 'pentane', 'n-Pentane boils at 36 °C; neopentane, with the same formula, boils at 10 °C. Why?', ['n-Pentane\'s long shape gives more surface contact, so stronger London dispersion forces', 'n-Pentane can hydrogen-bond', 'n-Pentane has a higher molar mass', 'n-Pentane has more polar bonds'],
  ['Neither molecule has H on O, N or F.', 'They are isomers with the same molar mass.', 'Both are hydrocarbons with nearly nonpolar C–H bonds.'],
  'Dispersion forces grow with contact area. Compact, branched neopentane touches its neighbors less than the rod-like n-pentane.', { sk: 2, cs: ['cs-imf'] });
C('c-imf', 'hbond-self', 'Which compound can form hydrogen bonds with other molecules of itself?', ['CH₃OH', 'CH₃OCH₃', 'CH₃F', 'CH₄'],
  ['The ether oxygen can accept a hydrogen bond, but no H is attached to O, so it cannot donate one to another ether.', 'The H atoms are on carbon, not on F.', 'No electronegative atom at all.'],
  'A donor needs H directly bonded to O, N or F. Methanol has an O–H, so it both donates and accepts.', { hy: true, cs: ['cs-imf'] });
T('c-imf', 'london', 'Which intermolecular force is present between all molecules, polar or not?', ['london dispersion', 'london dispersion forces', 'dispersion', 'dispersion forces', 'london forces', 'london', 'van der waals forces', 'van der waals'],
  'London dispersion forces, from momentary electron imbalances. They are the only force between nonpolar molecules.', { cs: ['cs-imf'] });
C('c-imf', 'sublimation', 'A solid turning directly into a gas is called:', ['Sublimation', 'Deposition', 'Evaporation', 'Fusion'],
  ['Deposition is the reverse: gas directly to solid.', 'Evaporation is liquid to gas.', 'Fusion is melting, solid to liquid.'],
  'Sublimation (dry ice at room pressure is the classic example). It crosses the solid–gas line of a phase diagram.', { cs: ['cs-phase'] });
T('c-imf', 'triple', 'What is the point on a phase diagram where solid, liquid and gas coexist?', ['triple point', 'the triple point'],
  'The triple point: one temperature and pressure where all three phase boundaries meet.', { cs: ['cs-phase'] });
C('c-imf', 'water-slope', 'Water\'s solid–liquid line slopes to the left (negative slope). What does that mean?', ['Ice is less dense than liquid water, so raising pressure favors melting', 'Hydrogen bonds break under pressure', 'Water has an unusually high heat capacity', 'Ice cannot exist above 1 atm'],
  ['Pressure does not break hydrogen bonds; it favors whichever phase takes up less volume.', 'True of water, but it explains temperature changes, not this slope.', 'Ice exists at high pressure too, just with a slightly lower melting point.'],
  'For most substances the solid is denser and the line slopes right. Water expands on freezing, so squeezing ice pushes it toward the denser liquid.', { sk: 2, cs: ['cs-phase'] });
C('c-imf', 'melting-heat', 'While ice melts at 0 °C, the heat you add mainly:', ['Overcomes intermolecular attractions, so the temperature stays constant', 'Raises the molecules\' average kinetic energy', 'Breaks covalent O–H bonds', 'Is released back to the surroundings'],
  ['Temperature (average kinetic energy) does not change during a phase change.', 'Melting leaves the molecules intact; only intermolecular forces change.', 'Melting absorbs heat (it is endothermic).'],
  'During a phase change, added energy goes into potential energy (separating molecules), which is why heating curves have flat plateaus.', { cs: ['cs-phase'] });
C('c-imf', 'boil', 'A liquid boils when:', ['Its vapor pressure equals the external pressure', 'Its vapor pressure reaches 1 atm, whatever the surroundings', 'It reaches its critical point', 'Its vapor pressure drops to zero'],
  ['1 atm is the normal boiling point only. At altitude the external pressure, and so the boiling point, is lower.', 'The critical point is where liquid and gas stop being distinguishable, far above boiling.', 'Vapor pressure rises with temperature.'],
  'Bubbles of vapor can form inside the liquid only when its vapor pressure matches the pressure pushing on it.', { hy: true });
C('c-imf', 'vp-raise', 'Which change raises a liquid\'s vapor pressure?', ['Raising the temperature', 'Dissolving a nonvolatile solute in it', 'Stronger intermolecular forces', 'Moving it to a bigger closed container'],
  ['A nonvolatile solute lowers vapor pressure (a colligative property).', 'Stronger attractions hold molecules in the liquid, lowering vapor pressure.', 'Vapor pressure depends on temperature and the substance, not the container size.'],
  'Higher temperature gives more molecules enough energy to escape the liquid.', { sk: 2, cs: ['cs-colligative'] });

/* ---------- Moles, stoichiometry & concentration (4E / 5A) ---------- */
N('c-stoich', 'avogadro', 'What is Avogadro\'s number (particles per mole)?', { value: 6.022e23, tolPct: 1 },
  '6.02 × 10^23 particles per mole. It links the atomic scale (amu) to grams: one mole of carbon-12 is 12 g.', { hy: true });
T('c-stoich', 'limiting', 'The reactant that runs out first, capping how much product can form, is the ___.', ['limiting reagent', 'limiting reactant', 'limiting agent', 'limiting'],
  'The limiting reagent. Find it by converting each reactant to moles and dividing by its coefficient: the smallest result limits.');
C('c-stoich', 'empirical', 'What is the empirical formula of glucose, C₆H₁₂O₆?', ['CH₂O', 'C₆H₁₂O₆', 'C₂H₄O₂', 'CHO'],
  ['That is the molecular formula; the empirical formula is the simplest whole-number ratio.', 'This ratio can still be divided by 2.', 'The H:C ratio is 2:1, not 1:1.'],
  'Divide every subscript by the greatest common factor, 6: CH₂O.');
T('c-stoich', 'molarity', 'Molarity is moles of solute per ___.', ['liter of solution', 'litre of solution', 'liters of solution', 'l of solution', 'liter solution', 'liter', 'litre', 'l'],
  'Molarity (M) = mol solute / L of solution, so it changes slightly with temperature as the solution expands.', { cs: ['cs-conc'] });
C('c-stoich', 'molality', 'Molality is defined as moles of solute per:', ['Kilogram of solvent', 'Kilogram of solution', 'Liter of solvent', 'Liter of solution'],
  ['The divisor is the solvent alone, not the whole solution.', 'Molality uses mass, which does not change with temperature.', 'That is molarity.'],
  'Molality (m) = mol solute / kg solvent. Because it uses mass, it is the unit used for boiling-point elevation and freezing-point depression.', { cs: ['cs-conc', 'cs-colligative'] });
G('c-stoich', 'g-moles', 'Grams to moles', rnd => {
  const c = pickR(rnd, [{ f: 'NaCl', M: 58.5 }, { f: 'H₂O', M: 18 }, { f: 'CO₂', M: 44 }, { f: 'C₆H₁₂O₆', M: 180 }, { f: 'NaOH', M: 40 }, { f: 'CaCO₃', M: 100 }]);
  const n = pickR(rnd, [0.25, 0.5, 1.5, 2, 3, 0.1]), g = +(n * c.M).toFixed(1);
  return { prompt: `How many moles are in ${g} g of ${c.f}? (Molar mass ${c.M} g/mol.)`, value: g / c.M, tolPct: 2, unit: 'mol',
    expl: `n = mass / M = ${g} g ÷ ${c.M} g/mol = ${sig(g / c.M)} mol.`, hint: 'n = m / M' };
}, { hy: true, sk: 1 });
G('c-stoich', 'g-dilution', 'Dilution', rnd => {
  const M1 = pickR(rnd, [2, 6, 12, 1, 5]), V1 = pickR(rnd, [10, 25, 50, 100]), V2 = V1 * pickR(rnd, [2, 4, 5, 10]);
  const M2 = M1 * V1 / V2;
  return { prompt: `You dilute ${V1} mL of ${M1} M HCl with water to a final volume of ${V2} mL. What is the new concentration, in M?`, value: M2, tolPct: 2, unit: 'M',
    expl: `Moles of solute stay the same: M₁V₁ = M₂V₂, so M₂ = ${M1} × ${V1} / ${V2} = ${sig(M2)} M.`, hint: 'M₁V₁ = M₂V₂' };
}, { hy: true, cs: ['cs-conc'] });
G('c-stoich', 'g-molarity', 'Molarity from grams', rnd => {
  const c = pickR(rnd, [{ f: 'NaOH', M: 40 }, { f: 'NaCl', M: 58.5 }, { f: 'KCl', M: 74.5 }, { f: 'glucose', M: 180 }]);
  const mol = pickR(rnd, [0.1, 0.2, 0.5, 0.25]), V = pickR(rnd, [250, 500, 1000, 200]), g = +(mol * c.M).toFixed(2);
  return { prompt: `${g} g of ${c.f} (${c.M} g/mol) is dissolved to make ${V} mL of solution. What is the molarity?`, value: mol / (V / 1000), tolPct: 2, unit: 'M',
    expl: `${g} g ÷ ${c.M} g/mol = ${mol} mol; ${V} mL = ${V / 1000} L; M = ${mol} / ${V / 1000} = ${sig(mol / (V / 1000))} M.` };
}, { cs: ['cs-conc'] });
G('c-stoich', 'g-limiting', 'Limiting reagent', rnd => {
  const h = pickR(rnd, [2, 3, 4, 5, 6]), o = pickR(rnd, [1, 2, 3]);
  const water = Math.min(h, 2 * o), lim = h < 2 * o ? 'H₂' : h > 2 * o ? 'O₂' : 'neither (exact ratio)';
  return { prompt: `2 H₂ + O₂ → 2 H₂O. You start with ${h} mol H₂ and ${o} mol O₂. How many moles of water can form?`, value: water, tol: 0.01, unit: 'mol',
    expl: `H₂ alone could make ${h} mol water; O₂ alone could make ${2 * o} mol. The smaller amount wins: ${water} mol, with ${lim} limiting.` };
}, { hy: true });
G('c-stoich', 'g-pct', 'Mass percent', rnd => {
  const c = pickR(rnd, [{ f: 'CO₂', el: 'C', m: 12, M: 44 }, { f: 'H₂O', el: 'O', m: 16, M: 18 }, { f: 'CH₄', el: 'C', m: 12, M: 16 }, { f: 'NaCl', el: 'Na', m: 23, M: 58.5 }, { f: 'CaCO₃', el: 'Ca', m: 40, M: 100 }]);
  return { prompt: `What is the mass percent of ${c.el} in ${c.f}? (${c.el} = ${c.m} g/mol; ${c.f} = ${c.M} g/mol.)`, value: 100 * c.m / c.M, tolPct: 2, unit: '%',
    expl: `${c.m} / ${c.M} × 100 = ${sig(100 * c.m / c.M)}%.` };
}, { sk: 1 });

/* ---------- Gases (4B) ---------- */
T('c-gas', 'ideal', 'Write the ideal gas law.', ['pv=nrt', 'pv = nrt', 'p v = n r t'],
  'PV = nRT. With R = 0.0821 L·atm/(mol·K), pressure in atm, volume in L, temperature in kelvin.', { hy: true, kind: 'equation' });
N('c-gas', 'stp-vol', 'What volume does 1 mol of an ideal gas occupy at STP (0 °C, 1 atm), in liters?', { value: 22.4, tolPct: 1 },
  '22.4 L. From PV = nRT: V = (1)(0.0821)(273)/1 ≈ 22.4 L.', { hy: true });
C('c-gas', 'charles', 'At constant pressure and amount of gas, volume is directly proportional to:', ['Absolute (kelvin) temperature', 'Celsius temperature', '1 / pressure', 'Molar mass'],
  ['Proportionality only works on an absolute scale: doubling 10 °C to 20 °C does not double the volume.', 'That is Boyle\'s law, at constant temperature.', 'Ideal gas volume does not depend on what the gas is.'],
  'Charles\'s law: V/T = constant (T in kelvin).', { cs: ['cs-gaslaws'] });
C('c-gas', 'boyle', 'Which law says PV is constant for a fixed amount of gas at constant temperature?', ['Boyle\'s law', 'Charles\'s law', 'Avogadro\'s law', 'Gay-Lussac\'s law'],
  ['Charles: V ∝ T at constant P.', 'Avogadro: V ∝ n at constant P and T.', 'Gay-Lussac: P ∝ T at constant V.'],
  'Boyle\'s law: halve the volume and the pressure doubles (lungs use this when you inhale).', { cs: ['cs-gaslaws'] });
C('c-gas', 'real-dev', 'Real gases deviate most from ideal behavior at:', ['High pressure and low temperature', 'Low pressure and high temperature', 'Low pressure and low temperature', 'High temperature only'],
  ['These are the conditions where gases behave most ideally.', 'Low pressure keeps molecules far apart, which helps ideality.', 'High temperature helps; it is high pressure that hurts.'],
  'At high pressure the molecules\' own volume matters; at low temperature their attractions matter. The ideal model ignores both.', { hy: true, sk: 2 });
C('c-gas', 'real-vol', 'At very high pressure, a real gas takes up more volume than the ideal gas law predicts. Why?', ['The molecules themselves occupy space that cannot be compressed', 'Intermolecular attractions push molecules apart', 'Collisions become perfectly elastic', 'The gas cools as it is compressed'],
  ['Attractions pull molecules together, which would make the volume smaller.', 'Ideal gases already assume elastic collisions.', 'Compression does not explain a larger-than-ideal volume.'],
  'The ideal model treats molecules as points. When they are packed tightly, their finite size makes the gas less compressible (the "b" term in van der Waals).', { sk: 2 });
C('c-gas', 'kmt-ke', 'The average kinetic energy of gas molecules depends only on:', ['Absolute temperature', 'Molar mass', 'Pressure', 'Volume'],
  ['At a given temperature, heavy and light molecules have the same average kinetic energy; heavy ones just move slower.', 'Pressure can change without a change in average kinetic energy (compress at constant T).', 'Same reasoning as pressure.'],
  'KE_avg = (3/2)kT per molecule. Temperature is a measure of average kinetic energy.', { hy: true });
C('c-gas', 'rms', 'H₂ (2 g/mol) and O₂ (32 g/mol) are at the same temperature. H₂\'s average speed is:', ['4 times O₂\'s', '16 times O₂\'s', 'Equal to O₂\'s', '¼ of O₂\'s'],
  ['Speed goes as the square root of 1/M; 16 is the mass ratio itself.', 'Equal kinetic energy does not mean equal speed when masses differ.', 'The lighter molecule moves faster.'],
  'Same KE, so speed ∝ 1/√M: √(32/2) = 4. This is also why H₂ effuses 4 times faster (Graham\'s law).', { sk: 2 });
G('c-gas', 'g-ideal', 'Ideal gas law', rnd => {
  const n = pickR(rnd, [0.5, 1, 2]), T = pickR(rnd, [273, 300, 350, 400]), P = pickR(rnd, [1, 2, 0.5]);
  const V = n * 0.0821 * T / P;
  return { prompt: `What volume (in L) does ${n} mol of an ideal gas occupy at ${T} K and ${P} atm? (R = 0.0821 L·atm/(mol·K))`, value: V, tolPct: 2, unit: 'L',
    expl: `V = nRT/P = (${n})(0.0821)(${T}) / ${P} = ${sig(V)} L.`, hint: 'PV = nRT' };
}, { hy: true });
G('c-gas', 'g-combined', 'Combined gas law', rnd => {
  const P1 = pickR(rnd, [1, 2, 3]), V1 = pickR(rnd, [2, 4, 6, 10]), T1 = pickR(rnd, [200, 300, 400]);
  const P2 = pickR(rnd, [1, 2, 4]), T2 = pickR(rnd, [300, 400, 600]);
  const V2 = P1 * V1 * T2 / (T1 * P2);
  return { prompt: `A gas at ${P1} atm, ${V1} L and ${T1} K is changed to ${P2} atm and ${T2} K. What is the new volume, in L?`, value: V2, tolPct: 2, unit: 'L',
    expl: `P₁V₁/T₁ = P₂V₂/T₂ → V₂ = ${P1} × ${V1} × ${T2} / (${T1} × ${P2}) = ${sig(V2)} L.`, hint: 'P₁V₁/T₁ = P₂V₂/T₂' };
}, { cs: ['cs-gaslaws'] });
G('c-gas', 'g-dalton', 'Partial pressure', rnd => {
  const a = pickR(rnd, [1, 2, 3]), b = pickR(rnd, [1, 2, 3, 5]), P = pickR(rnd, [1, 2, 4, 6]);
  const x = a / (a + b);
  return { prompt: `A container holds ${a} mol N₂ and ${b} mol O₂ at a total pressure of ${P} atm. What is the partial pressure of N₂, in atm?`, value: x * P, tolPct: 2, unit: 'atm',
    expl: `Dalton: P_N₂ = X_N₂ × P_total = (${a}/${a + b}) × ${P} = ${sig(x * P)} atm.` };
});
G('c-gas', 'g-graham', 'Graham\'s law', rnd => {
  const pairs = [['He', 4, 'CH₄', 16], ['H₂', 2, 'O₂', 32], ['He', 4, 'O₂', 32], ['CH₄', 16, 'SO₂', 64], ['H₂', 2, 'CH₄', 16]];
  const [a, Ma, b, Mb] = pickR(rnd, pairs), r = Math.sqrt(Mb / Ma);
  return { prompt: `How many times faster does ${a} (${Ma} g/mol) effuse than ${b} (${Mb} g/mol)?`, value: r, tolPct: 2, unit: '×',
    expl: `rate₁/rate₂ = √(M₂/M₁) = √(${Mb}/${Ma}) = ${sig(r)}.` };
});

/* ---------- Thermochemistry & free energy (5E) ---------- */
C('c-thermo', 'exo-sign', 'An exothermic reaction has a ΔH that is:', ['Negative', 'Positive', 'Zero', 'Equal to TΔS'],
  ['Positive ΔH means heat is absorbed (endothermic).', 'Zero would mean no net heat exchanged at constant pressure.', 'ΔH = TΔS only at the temperature where ΔG = 0.'],
  'Exothermic: the system releases heat, so its enthalpy drops (ΔH < 0).', { hy: true, cs: ['cs-gibbs'] });
C('c-thermo', 'gibbs-pp', 'A reaction has ΔH > 0 and ΔS > 0. When is it spontaneous?', ['Only at high temperature', 'At all temperatures', 'Never', 'Only at low temperature'],
  ['Positive ΔH works against spontaneity; only a big enough TΔS overcomes it.', 'At high enough T, −TΔS outweighs ΔH.', 'Low temperature leaves ΔH in charge, which is unfavorable here.'],
  'ΔG = ΔH − TΔS. With both positive, ΔG goes negative only when T > ΔH/ΔS. Melting ice is an example.', { hy: true, sk: 2, cs: ['cs-gibbs'] });
C('c-thermo', 'gibbs-nn', 'A reaction has ΔH < 0 and ΔS < 0. When is it spontaneous?', ['Only at low temperature', 'Only at high temperature', 'At all temperatures', 'Never'],
  ['High T makes −TΔS large and positive, which wins over the negative ΔH.', 'The entropy term turns unfavorable as T rises.', 'At low T the favorable ΔH dominates.'],
  'Freezing water is the classic case: favorable enthalpy, unfavorable entropy, so it happens only below 0 °C.', { sk: 2, cs: ['cs-gibbs'] });
C('c-thermo', 'gibbs-np', 'A reaction has ΔH < 0 and ΔS > 0. When is it spontaneous?', ['At all temperatures', 'Only at low temperature', 'Only at high temperature', 'Never'],
  ['Both terms favor it at every temperature.', 'Both terms favor it at every temperature.', 'Both terms make ΔG negative.'],
  'ΔH negative and −TΔS negative: ΔG is negative whatever the temperature.', { cs: ['cs-gibbs'] });
C('c-thermo', 'state-fn', 'Which quantity is NOT a state function?', ['Work', 'Enthalpy', 'Entropy', 'Internal energy'],
  ['Enthalpy depends only on the current state.', 'Entropy depends only on the current state.', 'Internal energy depends only on the current state.'],
  'Work and heat depend on the path taken between two states. Their difference (ΔU = q + w) does not.');
T('c-thermo', 'hess', 'Which law says the ΔH of an overall reaction equals the sum of the ΔH values of its steps?', ['hess', 'hesss law', 'hess law', 'hess’s law'],
  'Hess\'s law. It works because enthalpy is a state function.', { cs: ['cs-hess'] });
C('c-thermo', 'hf-element', 'What is the standard enthalpy of formation of O₂(g)?', ['Zero', 'Positive', 'Negative', 'It depends on the reaction'],
  ['Elements in their standard states are the reference point.', 'Same reasoning: it is defined as zero.', 'ΔH°f is a fixed property of a substance.'],
  'By definition, ΔH°f = 0 for any element in its most stable form at 1 atm and 25 °C (O₂ gas, graphite, Fe solid…).', { hy: true });
C('c-thermo', 'bond-enth', 'Using bond enthalpies, ΔH of a reaction is estimated as:', ['Σ(bonds broken) − Σ(bonds formed)', 'Σ(bonds formed) − Σ(bonds broken)', 'Σ(products) − Σ(reactants) of bond enthalpies', 'The sum of all bond enthalpies'],
  ['This flips the sign: forming bonds releases energy.', 'This is the formation-enthalpy pattern, which runs the opposite way for bond enthalpies.', 'You need the difference between breaking and forming.'],
  'Breaking bonds costs energy (+), forming bonds releases it (−). Note the order is reversed from ΔH°rxn = Σ ΔH°f(products) − Σ ΔH°f(reactants).', { hy: true, sk: 2, cs: ['cs-hess'] });
C('c-thermo', 'ds-pos', 'Which process has ΔS > 0?', ['Liquid water evaporating', 'Liquid water freezing', '2 SO₂(g) + O₂(g) → 2 SO₃(g)', 'N₂(g) + 3 H₂(g) → 2 NH₃(g)'],
  ['Freezing orders the molecules: entropy falls.', 'Three moles of gas become two.', 'Four moles of gas become two.'],
  'Gas has far more possible arrangements than liquid. Look for more particles or more gas.', { hy: true, cs: ['cs-entropy'] });
C('c-thermo', 'spont-rate', 'A reaction is described as spontaneous. What does that tell you about its rate?', ['Nothing: spontaneity is thermodynamics, rate is kinetics', 'It must be fast', 'It needs no activation energy', 'It must release heat'],
  ['Diamond turning into graphite is spontaneous and immeasurably slow.', 'Spontaneous reactions still have activation barriers.', 'Endothermic reactions can be spontaneous if entropy rises enough.'],
  'ΔG says whether products are favored; activation energy sets how fast you get there.', { hy: true, sk: 2, cs: ['cs-kin-thermo'] });
T('c-thermo', 'cp', 'The heat needed to raise 1 g of a substance by 1 °C is its ___.', ['specific heat', 'specific heat capacity', 'specific heat capacity c'],
  'Specific heat, c (water: 4.18 J/(g·°C)). Then q = mcΔT.');
G('c-thermo', 'g-q', 'q = mcΔT', rnd => {
  const m = pickR(rnd, [50, 100, 200, 250]), dT = pickR(rnd, [5, 10, 20, 25]);
  const q = m * 4.18 * dT;
  return { prompt: `How much heat (in J) warms ${m} g of water by ${dT} °C? (c = 4.18 J/(g·°C))`, value: q, tolPct: 2, unit: 'J',
    expl: `q = mcΔT = ${m} × 4.18 × ${dT} = ${sig(q, 4)} J.`, hint: 'q = mcΔT' };
}, { hy: true });
G('c-thermo', 'g-dg', 'ΔG = ΔH − TΔS', rnd => {
  const dH = pickR(rnd, [-100, -50, 40, 90, 120]), dS = pickR(rnd, [-200, -100, 100, 150, 300]), T = pickR(rnd, [200, 298, 400, 500]);
  const dG = dH - T * dS / 1000;
  return { prompt: `ΔH = ${dH} kJ/mol and ΔS = ${dS} J/(mol·K). What is ΔG at ${T} K, in kJ/mol?`, value: dG, tol: Math.max(0.5, Math.abs(dG) * 0.02), unit: 'kJ/mol',
    expl: `Convert ΔS to kJ: ${dS / 1000} kJ/(mol·K). ΔG = ${dH} − (${T})(${dS / 1000}) = ${sig(dG)} kJ/mol (${dG < 0 ? 'spontaneous' : 'not spontaneous'} at ${T} K). The classic slip is forgetting the J→kJ conversion.`, hint: 'Watch the units: ΔS is in J, ΔH in kJ.' };
}, { hy: true, cs: ['cs-gibbs'] });
G('c-thermo', 'g-crossover', 'Temperature where ΔG = 0', rnd => {
  const dH = pickR(rnd, [30, 45, 60, 90]), dS = pickR(rnd, [100, 150, 200]);
  const T = dH * 1000 / dS;
  return { prompt: `A reaction has ΔH = +${dH} kJ/mol and ΔS = +${dS} J/(mol·K). Above what temperature (K) is it spontaneous?`, value: T, tolPct: 2, unit: 'K',
    expl: `ΔG = 0 when T = ΔH/ΔS = ${dH * 1000} J ÷ ${dS} J/K = ${sig(T)} K. Above that, −TΔS outweighs ΔH.` };
}, { cs: ['cs-gibbs'] });

/* ---------- Kinetics (5E) ---------- */
C('c-kin', 'catalyst', 'What does a catalyst change?', ['The activation energy (and so the rate), not ΔG or K', 'The equilibrium constant', 'ΔH of the reaction', 'Which side the equilibrium favors'],
  ['K depends only on ΔG°, which a catalyst does not touch.', 'Reactants and products have the same energies with or without a catalyst.', 'A catalyst speeds forward and reverse equally, so equilibrium is reached sooner but sits at the same place.'],
  'A catalyst provides a lower-energy pathway and is regenerated. Enzymes are biological catalysts.', { hy: true, cs: ['cs-kin-thermo'] });
T('c-kin', 'rds', 'The slowest step of a reaction mechanism, which sets the overall rate, is the ___.', ['rate-determining step', 'rate determining step', 'rate-limiting step', 'rate limiting step', 'slow step'],
  'The rate-determining step. The rate law follows that step\'s molecularity (adjusted for any fast equilibria before it).', { cs: ['cs-mechanism'] });
C('c-kin', 'order2', 'Doubling [A] quadruples the reaction rate. What is the order in A?', ['2', '1', '4', '0'],
  ['First order: doubling [A] would double the rate.', 'Order is the exponent: 2^x = 4 gives x = 2, not 4.', 'Zero order: the rate would not change.'],
  'rate ∝ [A]^x, so the rate ratio equals (concentration ratio)^x: 4 = 2^x, x = 2.', { hy: true, cs: ['cs-order'] });
C('c-kin', 'zero-order', 'In a zero-order reaction, the rate:', ['Does not depend on reactant concentration', 'Is zero', 'Doubles when concentration doubles', 'Has a constant half-life'],
  ['The reaction proceeds; the rate is just constant (rate = k).', 'That is first order.', 'A constant half-life is the signature of first order.'],
  'Rate = k. Common when a catalyst or enzyme is saturated: adding more substrate does not speed it up.', { cs: ['cs-order'] });
C('c-kin', 'first-half', 'What is special about the half-life of a first-order reaction?', ['It does not depend on the starting concentration', 'It doubles as the reaction goes on', 'It equals the rate constant', 'It is shorter at higher concentration'],
  ['That pattern belongs to second-order reactions.', 't½ = 0.693/k, not k.', 'That describes second order too.'],
  't½ = ln2/k, a constant. Radioactive decay is first order, which is why isotopes have fixed half-lives.', { hy: true, cs: ['cs-order'] });
C('c-kin', 'k-units', 'What are the units of a first-order rate constant?', ['s⁻¹', 'M·s⁻¹', 'M⁻¹·s⁻¹', 'M'],
  ['M·s⁻¹ belongs to a zero-order k (and to rates themselves).', 'M⁻¹·s⁻¹ belongs to a second-order k.', 'k always involves time.'],
  'rate (M/s) = k[A] (M), so k must be in 1/s.', { cs: ['cs-order'] });
C('c-kin', 'arrhenius', 'Why does raising temperature speed up most reactions?', ['A larger fraction of collisions have energy above the activation energy', 'It lowers the activation energy', 'It makes ΔH more negative', 'It only raises collision frequency'],
  ['Ea is a property of the pathway; temperature does not lower it (a catalyst does).', 'ΔH is barely affected by temperature and does not set rate.', 'Collisions do get more frequent, but that effect is small compared with the energy effect.'],
  'k = A·e^(−Ea/RT). The exponential term, the fraction of energetic enough collisions, rises steeply with T.', { sk: 2 });
C('c-kin', 'intermediate', 'How does a reaction intermediate differ from a transition state?', ['An intermediate sits in an energy dip and can in principle be detected; a transition state is an energy peak', 'An intermediate is an energy peak; a transition state is a dip', 'They are the same thing', 'An intermediate appears in the overall equation'],
  ['That reverses them.', 'A transition state has partial bonds and exists for one vibration; an intermediate is a real species.', 'Intermediates are made and then used up, so they cancel out of the overall equation.'],
  'On an energy diagram, intermediates are local minima between steps; transition states are the maxima above each step.', { cs: ['cs-mechanism'] });
G('c-kin', 'g-order', 'Order from rate data', rnd => {
  const x = pickR(rnd, [0, 1, 2]), f = pickR(rnd, [2, 3]);
  const r = Math.pow(f, x);
  return { prompt: `When [A] is multiplied by ${f} (all else constant), the initial rate is multiplied by ${r}. What is the reaction order in A?`, value: x, tol: 0, unit: '',
    expl: `${f}^x = ${r} → x = ${x}.` };
}, { cs: ['cs-order'] });
G('c-kin', 'g-half', 'Half-lives', rnd => {
  const t = pickR(rnd, [2, 5, 8, 10, 30]), n = pickR(rnd, [1, 2, 3, 4]), m0 = pickR(rnd, [80, 160, 64, 200]);
  return { prompt: `A first-order reactant has a half-life of ${t} min. Starting with ${m0} g, how many grams remain after ${t * n} min?`, value: m0 / Math.pow(2, n), tolPct: 1, unit: 'g',
    expl: `${t * n} min is ${n} half-lives: ${m0} × (½)^${n} = ${sig(m0 / Math.pow(2, n))} g.` };
}, { hy: true, cs: ['cs-order'] });

/* ---------- Equilibrium (5E) ---------- */
C('c-eq', 'add-prod', 'A reaction is at equilibrium. You add more product. What happens?', ['The reaction shifts toward reactants until Q again equals K', 'K increases', 'Nothing: the system was already at equilibrium', 'The reaction shifts toward more product'],
  ['Only temperature changes K.', 'Adding product makes Q > K, which the system corrects.', 'The system moves to use up the added product, not make more.'],
  'Le Châtelier: the system counteracts the change. Mathematically, Q > K, so the reverse reaction runs.', { hy: true, cs: ['cs-lechat', 'cs-qk'] });
C('c-eq', 'heat-exo', 'For an exothermic reaction at equilibrium, raising the temperature:', ['Shifts it toward reactants and decreases K', 'Shifts it toward products and increases K', 'Shifts it but leaves K unchanged', 'Has no effect'],
  ['That is what happens for an endothermic reaction.', 'Temperature is the one change that does alter K.', 'Temperature affects every reaction with ΔH ≠ 0.'],
  'Treat heat as a product of an exothermic reaction. Adding heat pushes the reaction backward, and K itself falls.', { hy: true, sk: 2, cs: ['cs-lechat'] });
C('c-eq', 'inert', 'You add argon to a fixed-volume vessel containing N₂ + 3 H₂ ⇌ 2 NH₃ at equilibrium. What happens?', ['No shift: the partial pressures of the reacting gases are unchanged', 'Shift toward NH₃ (fewer moles of gas)', 'Shift toward N₂ and H₂', 'K increases'],
  ['That happens when you shrink the volume, not when you add an inert gas at constant volume.', 'Nothing has changed the reacting gases\' concentrations.', 'Only temperature changes K.'],
  'Total pressure rises, but each reactant\'s concentration (and partial pressure) stays the same, so Q still equals K.', { sk: 2, cs: ['cs-lechat'] });
C('c-eq', 'compress', 'For N₂ + 3 H₂ ⇌ 2 NH₃, halving the container volume shifts the equilibrium:', ['Toward NH₃', 'Toward N₂ and H₂', 'Not at all', 'Toward whichever side is exothermic'],
  ['The system relieves the pressure increase by favoring fewer gas moles: 2 on the right vs 4 on the left.', 'Moles of gas differ between sides, so it does shift.', 'Pressure effects follow gas moles, not ΔH.'],
  'Compressing raises all partial pressures; the side with fewer moles of gas is favored.', { cs: ['cs-lechat'] });
C('c-eq', 'q-k', 'If Q < K, the reaction will:', ['Proceed forward, making more products', 'Proceed in reverse', 'Stay put; it is at equilibrium', 'Change K until it matches Q'],
  ['Reverse happens when Q > K.', 'Equilibrium means Q = K.', 'K is fixed at a given temperature; Q moves toward K.'],
  'Q < K means there are too few products relative to equilibrium, so the forward reaction runs.', { hy: true, cs: ['cs-qk'] });
C('c-eq', 'k-change', 'Which change alters the value of an equilibrium constant?', ['Changing the temperature', 'Adding a reactant', 'Compressing the container', 'Adding a catalyst'],
  ['This shifts the position, not K.', 'This shifts the position, not K.', 'A catalyst changes neither the position nor K.'],
  'K = e^(−ΔG°/RT) depends only on temperature (for a given reaction).', { hy: true, cs: ['cs-lechat'] });
C('c-eq', 'solids', 'How do pure solids and pure liquids appear in an equilibrium expression?', ['They are left out (their activity is 1)', 'As their molar concentrations', 'As their masses', 'In the denominator only'],
  ['Their "concentration" does not change as the reaction runs, so it is folded into K.', 'Amount does not matter: a bigger lump of solid does not shift equilibrium.', 'They appear on neither side.'],
  'Only gases (partial pressures) and dissolved species (molarities) appear in K expressions.');
C('c-eq', 'dg-k', 'If K > 1 for a reaction, then ΔG° is:', ['Negative', 'Positive', 'Zero', 'Undefined'],
  ['Positive ΔG° gives K < 1.', 'ΔG° = 0 gives K = 1.', 'ΔG° = −RT ln K is defined for any positive K.'],
  'ΔG° = −RT ln K. ln K > 0 when K > 1, so ΔG° < 0: products are favored at standard conditions.', { hy: true, cs: ['cs-gibbs'] });
G('c-eq', 'g-kc', 'Calculate K', rnd => {
  const A = pickR(rnd, [0.1, 0.2, 0.5]), B = pickR(rnd, [0.1, 0.2, 0.4]), Cc = pickR(rnd, [0.2, 0.4, 0.6, 1.0]);
  const K = Cc * Cc / (A * B);
  return { prompt: `For A + B ⇌ 2 C at equilibrium, [A] = ${A} M, [B] = ${B} M and [C] = ${Cc} M. What is K?`, value: K, tolPct: 2, unit: '',
    expl: `K = [C]² / ([A][B]) = ${Cc}² / (${A} × ${B}) = ${sig(K)}. Coefficients become exponents.` };
}, { cs: ['cs-qk'] });

/* ---------- Acids, bases & buffers (5A) ---------- */
N('c-acid', 'kw', 'What is Kw, the ion-product constant of water, at 25 °C?', { value: 1e-14, tolPct: 1 },
  'Kw = [H⁺][OH⁻] = 1 × 10^-14 at 25 °C, so pH + pOH = 14. Kw rises with temperature.', { hy: true });
C('c-acid', 'bronsted', 'A Brønsted–Lowry acid is a:', ['Proton (H⁺) donor', 'Proton acceptor', 'Electron-pair acceptor', 'Substance that releases OH⁻ in water'],
  ['That is a Brønsted–Lowry base.', 'That is a Lewis acid, a broader definition.', 'That is an Arrhenius base.'],
  'Brønsted–Lowry: acids donate H⁺, bases accept it. Lewis: acids accept electron pairs, bases donate them.', { hy: true, cs: ['cs-acid-def'] });
C('c-acid', 'conj-base', 'What is the conjugate base of H₂PO₄⁻?', ['HPO₄²⁻', 'H₃PO₄', 'PO₄³⁻', 'OH⁻'],
  ['That is its conjugate acid (one more H⁺).', 'That removes two protons.', 'OH⁻ is water\'s conjugate base.'],
  'A conjugate base is the acid minus one H⁺, with the charge one lower.', { cs: ['cs-acid-def'] });
C('c-acid', 'stronger', 'Compared with a weaker acid, a stronger acid has:', ['A larger Ka, a smaller pKa and a weaker conjugate base', 'A smaller Ka and a larger pKa', 'A larger pKa and a stronger conjugate base', 'A larger Ka and a stronger conjugate base'],
  ['That describes a weaker acid.', 'Larger pKa means weaker acid.', 'Strong acids have weak conjugate bases.'],
  'pKa = −log Ka, so bigger Ka means smaller pKa. A strong acid lets go of H⁺ easily, so its conjugate base holds H⁺ weakly.', { hy: true, cs: ['cs-acid-strength'] });
C('c-acid', 'strong-acid', 'Which of these is a strong acid?', ['HCl', 'HF', 'CH₃COOH', 'H₂CO₃'],
  ['HF is weak despite F\'s electronegativity: the H–F bond is very strong.', 'Acetic acid is weak (pKa ≈ 4.8).', 'Carbonic acid is weak (pKa₁ ≈ 6.4).'],
  'The common strong acids: HCl, HBr, HI, HNO₃, H₂SO₄ (first proton), HClO₄. They ionize essentially completely in water.', { hy: true, cs: ['cs-acid-strength'] });
C('c-acid', 'half-eq', 'At the half-equivalence point of a weak acid titrated with strong base:', ['pH = pKa', 'pH = 7', 'pH = 14 − pKa', 'All the acid has been neutralized'],
  ['pH 7 is the equivalence point only for a strong acid + strong base.', 'This mixes up pKa and pKb.', 'Only half has been; that is the point.'],
  'Half the HA has become A⁻, so [A⁻] = [HA] and Henderson–Hasselbalch gives pH = pKa + log 1 = pKa. Buffering is strongest here.', { hy: true, cs: ['cs-titration'] });
C('c-acid', 'eq-weak', 'Weak acid titrated with strong base: the pH at the equivalence point is:', ['Above 7', 'Exactly 7', 'Below 7', 'Equal to pKa'],
  ['Only strong + strong gives pH 7.', 'Below 7 happens for weak base + strong acid.', 'pH = pKa at the half-equivalence point.'],
  'At equivalence the solution holds the conjugate base A⁻, which reacts with water to make OH⁻.', { sk: 2, cs: ['cs-titration'] });
C('c-acid', 'buffer-pick', 'Which pair would make the best buffer at pH 4.7?', ['Acetic acid / acetate (pKa 4.76)', 'HCl / NaCl', 'NH₄⁺ / NH₃ (pKa 9.25)', 'H₂PO₄⁻ / HPO₄²⁻ (pKa 7.2)'],
  ['HCl is a strong acid; Cl⁻ is too weak a base to buffer.', 'Buffers work within about ±1 of their pKa; 9.25 is far from 4.7.', 'pKa 7.2 is more than 2 units away.'],
  'Choose a weak acid whose pKa is close to the target pH.', { sk: 2, cs: ['cs-titration'] });
T('c-acid', 'amphoteric', 'A species that can act as either an acid or a base, like water, is called ___.', ['amphoteric', 'amphiprotic'],
  'Amphoteric (amphiprotic for proton transfer specifically). H₂O, HCO₃⁻ and amino acids are examples.');
G('c-acid', 'g-ph-strong', 'pH of a strong acid or base', rnd => {
  const acid = rnd() < 0.6, e = rintR(rnd, 1, 4);
  const pH = acid ? e : 14 - e;
  return { prompt: `What is the pH of 1 × 10^-${e} M ${acid ? 'HCl' : 'NaOH'} at 25 °C?`, value: pH, tol: 0.05, unit: '',
    expl: acid ? `HCl ionizes completely: [H⁺] = 10^-${e}, pH = ${e}.` : `NaOH dissociates completely: [OH⁻] = 10^-${e}, pOH = ${e}, pH = 14 − ${e} = ${pH}.` };
}, { hy: true });
G('c-acid', 'g-hh', 'Henderson–Hasselbalch', rnd => {
  const pKa = pickR(rnd, [3.8, 4.8, 6.4, 7.2, 9.2]), ratio = pickR(rnd, [[10, 1], [1, 10], [1, 1], [100, 1], [1, 100]]);
  const pH = pKa + Math.log10(ratio[0] / ratio[1]);
  return { prompt: `A buffer has a weak acid with pKa ${pKa}. The ratio [A⁻]:[HA] is ${ratio[0]}:${ratio[1]}. What is the pH?`, value: pH, tol: 0.05, unit: '',
    expl: `pH = pKa + log([A⁻]/[HA]) = ${pKa} + log(${ratio[0]}/${ratio[1]}) = ${sig(pH)}.`, hint: 'pH = pKa + log([A⁻]/[HA])' };
}, { hy: true, cs: ['cs-titration'] });
G('c-acid', 'g-ph-log', 'pH from [H⁺]', rnd => {
  const a = pickR(rnd, [2, 3, 5]), b = rintR(rnd, 2, 9), pH = b - Math.log10(a);
  return { prompt: `[H⁺] = ${a} × 10^-${b} M. What is the pH? (log 2 ≈ 0.30, log 3 ≈ 0.48, log 5 ≈ 0.70)`, value: pH, tol: 0.05, unit: '',
    expl: `pH = −log(${a} × 10^-${b}) = ${b} − log ${a} = ${sig(pH)}. Quick check: the answer must lie between ${b - 1} and ${b}.` };
});

/* ---------- Solubility & colligative properties (5A) ---------- */
C('c-sol', 'common-ion', 'Adding NaCl to a saturated AgCl solution does what to AgCl\'s solubility?', ['Lowers it (common-ion effect)', 'Raises it', 'Leaves it unchanged', 'Raises its Ksp'],
  ['The extra Cl⁻ drives AgCl back toward the solid.', 'Ksp is fixed; extra Cl⁻ means less Ag⁺ can stay dissolved.', 'Ksp changes only with temperature.'],
  'Q = [Ag⁺][Cl⁻] rises above Ksp, so AgCl precipitates until the product falls back to Ksp.', { hy: true });
C('c-sol', 'colligative', 'Colligative properties depend on:', ['The number of dissolved particles, not their identity', 'The identity of the solute', 'The solute\'s molar mass only', 'The solvent\'s color'],
  ['A mole of glucose and a mole of urea lower the freezing point equally.', 'Molar mass matters only in converting grams to moles.', 'Only particle count matters.'],
  'Freezing-point depression, boiling-point elevation, vapor-pressure lowering and osmotic pressure all scale with particle concentration (times i).', { hy: true, cs: ['cs-colligative'] });
C('c-sol', 'lowest-fp', 'Which solution has the lowest freezing point?', ['0.10 m CaCl₂', '0.10 m NaCl', '0.15 m glucose', '0.10 m glucose'],
  ['NaCl gives 2 particles: 0.20 m particles, less than CaCl₂\'s 0.30.', 'Glucose does not dissociate: 0.15 m particles.', 'Only 0.10 m particles.'],
  'Multiply by the van\'t Hoff factor: CaCl₂ → Ca²⁺ + 2 Cl⁻ gives i = 3, so 0.30 m particles, the most.', { sk: 2, cs: ['cs-colligative'] });
N('c-sol', 'vant-hoff', 'What is the ideal van\'t Hoff factor (i) for NaCl in water?', { value: 2, tol: 0 },
  'NaCl → Na⁺ + Cl⁻: two particles per formula unit. Real solutions come in slightly lower because of ion pairing.', { cs: ['cs-colligative'] });
C('c-sol', 'hexane', 'Which substance dissolves best in hexane (nonpolar)?', ['I₂', 'NaCl', 'Glucose', 'KNO₃'],
  ['An ionic solid needs a polar solvent to stabilize its ions.', 'Glucose has many OH groups and dissolves in water, not hexane.', 'Ionic.'],
  '"Like dissolves like": nonpolar I₂ mixes with nonpolar hexane through dispersion forces.');
G('c-sol', 'g-ksp', 'Solubility from Ksp', rnd => {
  const s = pickR(rnd, [1e-3, 2e-4, 3e-5, 1e-5, 4e-4]), Ksp = s * s;
  return { prompt: `A salt MX dissolves as MX ⇌ M⁺ + X⁻ with Ksp = ${sci(Ksp, 2)}. What is its molar solubility (M)?`, value: s, tolPct: 3, unit: 'M',
    expl: `Ksp = s·s = s², so s = √Ksp = ${sci(s, 2)} M.` };
});
G('c-sol', 'g-fpd', 'Freezing-point depression', rnd => {
  const c = pickR(rnd, [{ f: 'NaCl', i: 2 }, { f: 'glucose', i: 1 }, { f: 'CaCl₂', i: 3 }]), m = pickR(rnd, [0.5, 1, 2]);
  const dT = c.i * 1.86 * m;
  return { prompt: `By how many °C does ${m} m ${c.f} lower water\'s freezing point? (Kf = 1.86 °C·kg/mol; assume complete dissociation.)`, value: dT, tolPct: 2, unit: '°C',
    expl: `ΔTf = i·Kf·m = ${c.i} × 1.86 × ${m} = ${sig(dT)} °C.`, hint: 'ΔT = i·K·m' };
}, { cs: ['cs-colligative'] });

/* ---------- Redox & electrochemistry (4C) ---------- */
T('c-redox', 'oxidation', 'Oxidation is the ___ of electrons.', ['loss', 'losing', 'loss of electrons'],
  'OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons). Oxidation raises the oxidation number.', { hy: true, cs: ['cs-redox-agent'] });
C('c-redox', 'anode', 'In a galvanic cell, oxidation takes place at the:', ['Anode', 'Cathode', 'Salt bridge', 'External wire'],
  ['Reduction happens at the cathode ("red cat").', 'The salt bridge carries ions, not reactions.', 'The wire carries electrons.'],
  'An Ox, Red Cat: anode = oxidation, cathode = reduction, in every kind of electrochemical cell.', { hy: true, cs: ['cs-cells'] });
C('c-redox', 'e-flow', 'In the external circuit of a galvanic cell, electrons flow:', ['From anode to cathode', 'From cathode to anode', 'Through the salt bridge', 'Both ways equally'],
  ['Electrons leave where they are released (oxidation, at the anode).', 'Ions move in the salt bridge; electrons stay in the wire.', 'Current has a direction.'],
  'Electrons are produced by oxidation at the anode and consumed by reduction at the cathode.', { cs: ['cs-cells'] });
C('c-redox', 'galvanic', 'A galvanic (voltaic) cell has:', ['E°cell > 0 and ΔG < 0', 'E°cell < 0 and ΔG > 0', 'E°cell > 0 and ΔG > 0', 'E°cell = 0'],
  ['That describes an electrolytic cell, which needs an outside power source.', 'ΔG = −nFE: they always have opposite signs.', 'A cell at E = 0 is at equilibrium (a dead battery).'],
  'Galvanic cells run spontaneously and produce electrical work. ΔG = −nFE°.', { hy: true, cs: ['cs-cells'] });
C('c-redox', 'electrolytic-anode', 'In an electrolytic cell, the anode is:', ['Positive', 'Negative', 'Where reduction happens', 'Neutral'],
  ['The anode is negative in a galvanic cell. In an electrolytic cell the power supply makes it positive.', 'Oxidation still happens at the anode.', 'Electrodes carry a charge sign set by the cell type.'],
  'Anode = oxidation always. Its sign flips: negative in galvanic cells, positive in electrolytic cells (attached to the supply\'s + terminal).', { sk: 2, cs: ['cs-cells'] });
C('c-redox', 'kmno4', 'What is the oxidation state of Mn in KMnO₄?', ['+7', '+5', '+3', '−1'],
  ['Check the sum: +1 + 5 − 8 = −2, not 0.', 'Same check fails.', 'Mn in a polyatomic ion with four oxygens is not negative.'],
  'K is +1 and each O is −2 (total −8). For a neutral compound, Mn = 0 − 1 + 8 = +7.');
C('c-redox', 'ox-agent', 'The oxidizing agent in a redox reaction is the species that:', ['Gets reduced (gains electrons)', 'Gets oxidized', 'Loses electrons', 'Is unchanged'],
  ['The species that is oxidized is the reducing agent.', 'Losing electrons is oxidation, which makes it the reducing agent.', 'Agents always change oxidation state.'],
  'An oxidizing agent causes oxidation in something else by taking its electrons, and is itself reduced.', { hy: true, cs: ['cs-redox-agent'] });
C('c-redox', 'salt-bridge', 'What does the salt bridge in a galvanic cell do?', ['Lets ions flow to keep each half-cell electrically neutral', 'Carries electrons between the half-cells', 'Supplies the reactants', 'Raises the cell voltage'],
  ['Electrons travel through the wire only.', 'Its ions are spectators.', 'It enables current but does not add voltage.'],
  'Without it, charge builds up (positive at the anode, negative at the cathode) and the current stops almost immediately.', { cs: ['cs-cells'] });
N('c-redox', 'faraday', 'What is Faraday\'s constant, in coulombs per mole of electrons?', { value: 96485, tolPct: 1.5 },
  'About 96,500 C/mol e⁻. It converts moles of electrons to charge: ΔG = −nFE and Q = nF.');
G('c-redox', 'g-ecell', 'Standard cell potential', rnd => {
  const pairs = [['Cu²⁺/Cu', 0.34, 'Zn²⁺/Zn', -0.76, 2], ['Ag⁺/Ag', 0.80, 'Cu²⁺/Cu', 0.34, 2], ['Cu²⁺/Cu', 0.34, 'Fe²⁺/Fe', -0.44, 2], ['Ag⁺/Ag', 0.80, 'Zn²⁺/Zn', -0.76, 2]];
  const [c, Ec, a, Ea] = pickR(rnd, pairs);
  const E = Ec - Ea;
  return { prompt: `A galvanic cell uses ${c} (E° = ${Ec > 0 ? '+' : ''}${Ec} V) and ${a} (E° = ${Ea} V). What is E°cell, in volts?`, value: E, tol: 0.02, unit: 'V',
    expl: `The higher reduction potential (${c}) is reduced at the cathode. E°cell = E°cathode − E°anode = ${Ec} − (${Ea}) = ${sig(E)} V. Never multiply potentials by coefficients.`, hint: 'E°cell = E°cathode − E°anode' };
}, { hy: true, cs: ['cs-cells'] });

/* ---------- Nuclear chemistry (4E) ---------- */
C('c-nuc', 'alpha', 'In alpha decay, the nucleus\'s mass number and atomic number change by:', ['A − 4, Z − 2', 'A unchanged, Z + 1', 'A unchanged, Z − 1', 'A − 2, Z − 4'],
  ['That is beta-minus decay.', 'That is positron emission or electron capture.', 'This swaps them: an alpha particle is ⁴₂He.'],
  'An alpha particle is a helium-4 nucleus (2 protons, 2 neutrons).', { hy: true, cs: ['cs-decay'] });
C('c-nuc', 'beta', 'In beta-minus decay:', ['A neutron becomes a proton and an electron is emitted; Z rises by 1, A is unchanged', 'A proton becomes a neutron; Z falls by 1', 'Z falls by 2 and A by 4', 'Only energy is released'],
  ['That is positron emission (β⁺).', 'That is alpha decay.', 'That is gamma emission.'],
  'n → p + e⁻ + antineutrino. The atom moves one place right on the periodic table.', { hy: true, cs: ['cs-decay'] });
C('c-nuc', 'positron', 'Positron emission changes the nucleus how?', ['Z falls by 1; A is unchanged', 'Z rises by 1; A is unchanged', 'Z falls by 2; A falls by 4', 'Nothing changes'],
  ['That is beta-minus.', 'That is alpha.', 'A proton becomes a neutron, so Z changes.'],
  'p → n + e⁺ + neutrino. The element moves one place left.', { cs: ['cs-decay'] });
C('c-nuc', 'gamma', 'What does gamma emission change about the nucleus?', ['Only its energy: Z and A stay the same', 'Z rises by 1', 'A falls by 4', 'Z falls by 1'],
  ['That is beta-minus.', 'That is alpha.', 'That is positron emission or electron capture.'],
  'A gamma ray is a high-energy photon released as an excited nucleus relaxes, often right after another decay.', { cs: ['cs-decay'] });
C('c-nuc', 'mass-defect', 'A nucleus weighs less than its separate protons and neutrons. The missing mass:', ['Was released as binding energy, E = mc²', 'Was lost as electrons', 'Is a measurement error', 'Became neutrinos only'],
  ['Electrons are not part of the nuclear mass comparison.', 'It is real and measurable (the mass defect).', 'Neutrinos are not how binding energy is accounted for.'],
  'Mass defect × c² = nuclear binding energy, the energy needed to pull the nucleus apart.');
G('c-nuc', 'g-decay', 'Half-life of an isotope', rnd => {
  const h = pickR(rnd, [5730, 8, 12, 30]), n = pickR(rnd, [1, 2, 3, 4, 5]), unit = h === 5730 ? 'years' : pickR(rnd, ['days', 'hours']);
  const frac = 100 / Math.pow(2, n);
  return { prompt: `An isotope has a half-life of ${h} ${unit}. What percent of a sample remains after ${h * n} ${unit}?`, value: frac, tolPct: 2, unit: '%',
    expl: `${h * n} ÷ ${h} = ${n} half-lives; 100% × (½)^${n} = ${sig(frac)}%.` };
}, { hy: true, cs: ['cs-order'] });
