/* Physics expansion: oscillations, heat & thermodynamics, magnetism, photons & atoms, more electricity.
   Original items; MCAT conventions (g = 10 m/s²). Code computes every numeric key. */
'use strict';

/* ---------- Springs, pendulums & oscillation (4D) ---------- */
C('p-shm', 'pendulum-mass', 'A pendulum\'s bob is replaced with one twice as heavy (same length). Its period:', ['Stays the same', 'Doubles', 'Halves', 'Increases by √2'],
  ['Mass cancels out of T = 2π√(L/g).', 'A heavier bob is not slower.', 'Mass does not appear in the formula.'],
  'For small swings, T = 2π√(L/g): only length and g matter.', { hy: true, cs: ['cs-oscillator'] });
C('p-shm', 'pendulum-length', 'To double a pendulum\'s period, you must make it:', ['Four times as long', 'Twice as long', '√2 times as long', 'Half as long'],
  ['T ∝ √L, so doubling L only raises T by √2.', 'That raises T by 2^¼.', 'Shorter means a shorter period.'],
  'T ∝ √L: 2 = √(4).', { sk: 2, cs: ['cs-oscillator'] });
C('p-shm', 'spring-mass', 'A mass on a spring oscillates. Doubling the mass makes the period:', ['√2 times longer', 'Twice as long', 'Unchanged', 'Half as long'],
  ['T ∝ √m, not m.', 'Unlike a pendulum, a spring\'s period depends on mass.', 'More mass, more inertia, a longer period.'],
  'T = 2π√(m/k). Amplitude does not affect the period.', { cs: ['cs-oscillator'] });
C('p-shm', 'max-speed', 'In simple harmonic motion, where is the speed greatest?', ['At the equilibrium position', 'At maximum displacement', 'Halfway to maximum displacement', 'It is constant'],
  ['At the extremes the object momentarily stops.', 'Speed keeps rising all the way to equilibrium.', 'It speeds up and slows down every cycle.'],
  'All the energy is kinetic at equilibrium; all potential at the turning points, where acceleration is greatest.', { hy: true });
C('p-shm', 'period-freq', 'How are period and frequency related?', ['f = 1/T', 'f = T', 'f = 2T', 'f = T²'],
  ['They are reciprocals.', 'No factor of 2.', 'Not squared.'],
  'A 0.5 s period means 2 cycles per second (2 Hz).', { kind: 'equation' });
G('p-shm', 'g-hooke', 'Hooke\'s law', rnd => {
  const k = pickR(rnd, [50, 100, 200, 400]), x = pickR(rnd, [0.05, 0.1, 0.2]);
  return { prompt: `A spring with k = ${k} N/m is stretched ${x} m. What force (N) does it exert?`, value: k * x, tolPct: 2, unit: 'N',
    expl: `|F| = kx = ${k} × ${x} = ${sig(k * x)} N, directed back toward equilibrium.`, hint: 'F = −kx' };
}, { sk: 1 });
G('p-shm', 'g-spring-pe', 'Spring potential energy', rnd => {
  const k = pickR(rnd, [100, 200, 400, 800]), x = pickR(rnd, [0.1, 0.2, 0.5]);
  return { prompt: `How much elastic potential energy (J) is stored in a spring with k = ${k} N/m compressed ${x} m?`, value: 0.5 * k * x * x, tolPct: 2, unit: 'J',
    expl: `PE = ½kx² = ½ × ${k} × ${x}² = ${sig(0.5 * k * x * x)} J. Doubling x quadruples the energy.`, hint: 'PE = ½kx²' };
}, { hy: true });
G('p-shm', 'g-spring-t', 'Spring period', rnd => {
  const m = pickR(rnd, [0.5, 1, 2, 4]), k = pickR(rnd, [50, 100, 200]);
  const T = 2 * 3.14 * Math.sqrt(m / k);
  return { prompt: `A ${m} kg mass oscillates on a spring with k = ${k} N/m. What is the period (s)? (Use π ≈ 3.14.)`, value: T, tolPct: 3, unit: 's',
    expl: `T = 2π√(m/k) = 2 × 3.14 × √(${m}/${k}) = ${sig(T)} s.` };
});

/* ---------- Heat & thermodynamics (5E / 4B) ---------- */
C('p-heat', 'first-law', 'A gas absorbs 500 J of heat and does 200 J of work on its surroundings. Its internal energy:', ['Rises by 300 J', 'Rises by 700 J', 'Falls by 300 J', 'Rises by 500 J'],
  ['That adds the work instead of subtracting it.', 'Heat in exceeds work out, so it rises.', 'The work done by the gas must be subtracted.'],
  'ΔU = Q − W (W done by the gas). Chemistry writes ΔU = q + w, with w the work done on the system; it is the same law with the opposite sign for w.', { hy: true, sk: 2, cs: ['cs-first-law'] });
C('p-heat', 'isothermal', 'An ideal gas expands isothermally. Which is true?', ['ΔU = 0, so the heat absorbed equals the work done', 'No heat is exchanged with the surroundings', 'No work is done, since the volume is fixed', 'The temperature rises as the gas expands'],
  ['That describes an adiabatic process.', 'That describes a constant-volume process.', 'Isothermal means constant temperature.'],
  'An ideal gas\'s internal energy depends only on temperature, so constant T means ΔU = 0.', { cs: ['cs-first-law'] });
C('p-heat', 'adiabatic', 'A gas is compressed quickly, with no time for heat to escape (adiabatic). Its temperature:', ['Rises', 'Falls', 'Stays the same', 'Drops to zero'],
  ['Expansion, not compression, cools a gas adiabatically.', 'Work done on the gas raises its internal energy.', 'Not possible.'],
  'Q = 0, so ΔU = −W; the work done on the gas becomes internal energy. This is why a bike pump warms up.', { sk: 2, cs: ['cs-first-law'] });
C('p-heat', 'pv-area', 'On a pressure–volume diagram, the work done by a gas equals:', ['The area under the curve', 'The slope of the curve', 'The height of the curve', 'The product of the starting P and V'],
  ['The slope is not work.', 'Pressure alone is not work.', 'That is just one point\'s PV.'],
  'W = ∫P dV. At constant pressure, W = PΔV; at constant volume, W = 0.', { cs: ['cs-first-law'] });
C('p-heat', 'transfer', 'A heat lamp warms your hand across empty space by:', ['Radiation', 'Conduction', 'Convection', 'Evaporation'],
  ['Conduction needs direct contact.', 'Convection needs a moving fluid.', 'Evaporation is a phase change, not a transfer mode.'],
  'Radiation travels as electromagnetic waves and needs no medium (sunlight reaching Earth).', { cs: ['cs-heat-transfer'] });
C('p-heat', 'convection', 'Warm air rising from a radiator and circulating around a room transfers heat by:', ['Convection', 'Conduction', 'Radiation', 'Sublimation'],
  ['Conduction moves heat through direct contact without bulk flow.', 'Some radiation occurs, but the circulating air is convection.', 'That is a phase change.'],
  'Convection is heat carried by the bulk movement of a fluid.', { cs: ['cs-heat-transfer'] });
C('p-heat', 'second-law', 'Which statement follows from the second law of thermodynamics?', ['Heat flows spontaneously from hot to cold, not the reverse', 'Energy is always conserved, so it cannot be created', 'Absolute zero can be reached with enough cooling', 'The entropy of an isolated system can decrease'],
  ['That is the first law.', 'The third law says it can only be approached.', 'The second law says it never decreases.'],
  'The total entropy of an isolated system never decreases. Refrigerators move heat from cold to hot only by doing work.', { hy: true });
G('p-heat', 'g-melt', 'Heat to melt ice', rnd => {
  const m = pickR(rnd, [10, 50, 100, 200]);
  return { prompt: `How much heat (J) melts ${m} g of ice at 0 °C? (Heat of fusion of water = 334 J/g)`, value: 334 * m, tolPct: 2, unit: 'J',
    expl: `q = m·L_f = ${m} × 334 = ${334 * m} J. The temperature stays at 0 °C while it melts.`, hint: 'q = mL' };
}, { hy: true, cs: ['cs-phase'] });
G('p-heat', 'g-expand', 'Thermal expansion', rnd => {
  const L = pickR(rnd, [1, 2, 10, 100]), a = pickR(rnd, [{ m: 'steel', a: 12e-6 }, { m: 'aluminum', a: 23e-6 }]), dT = pickR(rnd, [10, 20, 50]);
  const dL = a.a * L * dT;
  return { prompt: `A ${L} m ${a.m} rod (α = ${sci(a.a, 2)} /°C) warms by ${dT} °C. How much longer does it get, in mm?`, value: dL * 1000, tolPct: 2, unit: 'mm',
    expl: `ΔL = αLΔT = ${sci(a.a, 2)} × ${L} × ${dT} = ${sci(dL, 3)} m = ${sig(dL * 1000)} mm.` };
});
G('p-heat', 'g-pdv', 'Work at constant pressure', rnd => {
  const P = pickR(rnd, [1e5, 2e5]), dV = pickR(rnd, [0.001, 0.002, 0.01]);
  return { prompt: `A gas at a constant ${sci(P, 1)} Pa expands by ${dV} m³. How much work (J) does it do?`, value: P * dV, tolPct: 2, unit: 'J',
    expl: `W = PΔV = ${sci(P, 1)} × ${dV} = ${sig(P * dV)} J.` };
}, { cs: ['cs-first-law'] });
G('p-heat', 'g-carnot', 'Maximum efficiency', rnd => {
  const Th = pickR(rnd, [400, 500, 600, 800]), Tc = pickR(rnd, [300, 200]);
  const e = 1 - Tc / Th;
  return { prompt: `A heat engine runs between ${Th} K and ${Tc} K. What is its maximum possible efficiency, as a percent?`, value: 100 * e, tolPct: 2, unit: '%',
    expl: `Carnot limit: e = 1 − Tc/Th = 1 − ${Tc}/${Th} = ${sig(100 * e)}%. Temperatures must be in kelvin.` };
});
G('p-heat', 'g-kelvin', 'Temperature scales', rnd => {
  const c = pickR(rnd, [-40, 0, 25, 37, 100]), toK = rnd() < 0.5;
  return toK
    ? { prompt: `Convert ${c} °C to kelvin.`, value: c + 273, tol: 1, unit: 'K', expl: `K = °C + 273 = ${c + 273} K.` }
    : { prompt: `Convert ${c} °C to °F.`, value: c * 9 / 5 + 32, tol: 1, unit: '°F', expl: `°F = (9/5)°C + 32 = ${c * 9 / 5 + 32} °F.${c === -40 ? ' −40 is where the two scales meet.' : ''}` };
}, { sk: 1 });

/* ---------- Magnetism (4C) ---------- */
C('p-mag', 'no-work', 'A charged particle moves through a uniform magnetic field. The magnetic force on it:', ['Changes its direction but not its speed', 'Speeds it up in the direction of motion', 'Slows it down, like a drag force would', 'Does positive work, raising its energy'],
  ['The force is always perpendicular to the velocity.', 'A perpendicular force cannot slow it.', 'Perpendicular forces do no work.'],
  'F = qv × B is perpendicular to v, so kinetic energy stays constant; the particle curves, often into a circle.', { hy: true, sk: 2 });
C('p-mag', 'parallel-v', 'A charge moves parallel to a magnetic field. The magnetic force on it is:', ['Zero', 'Maximum', 'Along the field', 'Opposite to its motion'],
  ['Maximum force comes at 90°.', 'Magnetic forces are perpendicular to B.', 'Magnetic forces never point opposite to v.'],
  'F = qvB sin θ, and sin 0° = 0.');
C('p-mag', 'wire-field', 'The magnetic field around a long straight current-carrying wire:', ['Forms circles around the wire', 'Points along the wire', 'Points straight out from the wire', 'Is zero'],
  ['The field circles; it does not run along the current.', 'That would be an electric field from a charged line.', 'Any current makes a magnetic field.'],
  'Right-hand rule: thumb along the current, fingers curl in the field direction. B weakens as 1/r.', { cs: ['cs-rhr'] });
C('p-mag', 'parallel-currents', 'Two parallel wires carry current in the same direction. They:', ['Attract each other', 'Repel each other', 'Feel no force', 'Twist around each other'],
  ['Opposite currents repel.', 'Each wire sits in the other\'s field.', 'The forces are along the line between them.'],
  'Each wire\'s field exerts a force on the other\'s current; same direction attracts.', { sk: 2, cs: ['cs-rhr'] });
T('p-mag', 'tesla', 'What is the SI unit of magnetic field strength?', ['tesla', 'teslas', 't'],
  'The tesla (T). MRI scanners typically use 1.5–3 T; Earth\'s field is about 50 μT.');
G('p-mag', 'g-qvb', 'Magnetic force', rnd => {
  const q = pickR(rnd, [1, 2, 5]), v = pickR(rnd, [1e3, 2e4, 5e5]), B = pickR(rnd, [0.1, 0.5, 2]), th = pickR(rnd, [90, 30]);
  const s = th === 90 ? 1 : 0.5, F = q * 1e-6 * v * B * s;
  return { prompt: `A ${q} μC charge moves at ${sci(v, 1)} m/s at ${th}° to a ${B} T magnetic field. What is the force on it (N)?${th === 30 ? ' (sin 30° = 0.5)' : ''}`, value: F, tolPct: 3, unit: 'N',
    expl: `F = qvB sin θ = ${q} × 10^-6 × ${sci(v, 1)} × ${B} × ${s} = ${sci(F, 2)} N.`, hint: 'F = qvB sin θ' };
}, { hy: true });
G('p-mag', 'g-radius', 'Circular orbit in a field', rnd => {
  const m = pickR(rnd, [1e-3, 2e-3]), v = pickR(rnd, [10, 20, 100]), q = pickR(rnd, [1e-3, 5e-3]), B = pickR(rnd, [1, 2, 4]);
  const r = m * v / (q * B);
  return { prompt: `A particle of mass ${sci(m, 1)} kg and charge ${sci(q, 1)} C moves at ${v} m/s perpendicular to a ${B} T field. What is the radius of its circular path (m)?`, value: r, tolPct: 3, unit: 'm',
    expl: `qvB = mv²/r → r = mv/(qB) = ${sci(m, 1)} × ${v} / (${sci(q, 1)} × ${B}) = ${sig(r)} m.` };
});

/* ---------- Photons & atomic physics (4E / 4D) ---------- */
C('p-atomic', 'intensity', 'In the photoelectric effect, making the light brighter (same frequency, above threshold):', ['Ejects more electrons without raising their maximum kinetic energy', 'Raises the maximum kinetic energy of the ejected electrons', 'Lowers the metal\'s work function, freeing electrons', 'Has no effect, since only frequency matters'],
  ['Each electron absorbs one photon; brighter light only means more photons.', 'The work function is a property of the metal.', 'More photons free more electrons.'],
  'KE_max = hf − φ depends on frequency, not intensity. This was key evidence that light comes in photons.', { hy: true, sk: 2, cs: ['cs-photoelectric'] });
C('p-atomic', 'threshold', 'Light below a metal\'s threshold frequency shines on it very brightly. What happens?', ['No electrons are ejected', 'Electrons are ejected slowly', 'Electrons are ejected after a delay', 'The work function falls'],
  ['No photon has enough energy, however many there are.', 'Energy does not build up in one electron over time.', 'The metal\'s work function does not change.'],
  'Each photon must have hf ≥ φ on its own.', { cs: ['cs-photoelectric'] });
C('p-atomic', 'absorption', 'A cool gas in front of a hot light source produces dark lines in the spectrum. These lines are at:', ['The same wavelengths the gas emits when heated', 'Random wavelengths that vary each time', 'Only infrared wavelengths, from heat', 'Wavelengths the gas is unable to absorb'],
  ['They are a fingerprint of the element.', 'They can be anywhere the element has transitions.', 'Dark lines mean light was absorbed.'],
  'An atom absorbs exactly the photon energies matching its level gaps, the same gaps it emits from.');
C('p-atomic', 'fluorescence', 'A fluorescent dye absorbs ultraviolet light and glows green. Why is the emitted light lower in energy?', ['Some energy is lost as heat before the photon is emitted', 'Green light has more energy per photon than UV', 'The dye gains energy from the surroundings', 'Photons slow down and lose energy in the dye'],
  ['Green has less energy and a longer wavelength than UV.', 'That would make the emitted light more energetic.', 'Photon energy depends on frequency, not speed in a medium.'],
  'Absorb high-energy light, relax a little non-radiatively, emit lower-energy (longer-wavelength) light.', { sk: 2 });
C('p-atomic', 'bohr', 'In the Bohr model of hydrogen, why does the atom emit only certain wavelengths?', ['Energy levels are quantized, so only certain energy gaps exist', 'The electron spirals continuously into the nucleus', 'The nucleus emits the light as protons vibrate', 'Every wavelength is emitted but most are absorbed'],
  ['That classical prediction is what the Bohr model fixed.', 'The light comes from electron transitions.', 'The emission spectrum is genuinely discrete.'],
  'E_photon = E_upper − E_lower = hf for allowed levels only.');
G('p-atomic', 'g-photoelectric', 'Photoelectric effect', rnd => {
  const E = pickR(rnd, [3, 4, 5, 6]), phi = pickR(rnd, [2.0, 2.3, 2.5, 4.5]);
  if (E <= phi) return { prompt: `Photons of ${phi + 2} eV hit a metal with a work function of ${phi} eV. What is the maximum kinetic energy of the ejected electrons (eV)?`, value: 2, tol: 0.05, unit: 'eV', expl: `KE_max = E_photon − φ = ${phi + 2} − ${phi} = 2 eV.` };
  return { prompt: `Photons of ${E} eV hit a metal with a work function of ${phi} eV. What is the maximum kinetic energy of the ejected electrons (eV)?`, value: E - phi, tol: 0.05, unit: 'eV',
    expl: `KE_max = E_photon − φ = ${E} − ${phi} = ${sig(E - phi)} eV.`, hint: 'KE = hf − φ' };
}, { hy: true, cs: ['cs-photoelectric'] });
G('p-atomic', 'g-hydrogen', 'Hydrogen energy levels', rnd => {
  const n = pickR(rnd, [2, 3, 4]);
  const E = 13.6 / (n * n);
  return { prompt: `Hydrogen levels follow Eₙ = −13.6 eV/n². How much energy (eV) must be added to ionize a hydrogen atom from n = ${n}?`, value: E, tolPct: 2, unit: 'eV',
    expl: `Ionization takes it from Eₙ = −13.6/${n * n} = −${sig(E)} eV up to 0, so ${sig(E)} eV.` };
});

/* ---------- Deeper: electrostatics & circuits (4C) ---------- */
C('p-elec', 'equipotential', 'How much work does the electric field do on a charge moved along an equipotential surface?', ['None', 'It depends on the charge\'s speed', 'The maximum possible', 'Work equal to qE'],
  ['Work depends on potential difference, not speed.', 'The potential difference is zero, so W = qΔV = 0.', 'qE is a force, not work.'],
  'Equipotentials are perpendicular to field lines, so the field has no component along them.', { sk: 2 });
C('p-elec', 'plate-gap', 'The plates of a parallel-plate capacitor are moved twice as far apart. Its capacitance:', ['Halves', 'Doubles', 'Quadruples', 'Stays the same'],
  ['C is inversely proportional to the gap.', 'Not squared.', 'C = ε₀A/d depends on d.'],
  'C = ε₀A/d: more plate area raises C; a wider gap lowers it.', { cs: ['cs-capacitor'] });
G('p-elec', 'g-cap-energy', 'Energy in a capacitor', rnd => {
  const C = pickR(rnd, [2, 5, 10, 100]), V = pickR(rnd, [10, 20, 100]);
  const U = 0.5 * C * 1e-6 * V * V;
  return { prompt: `A ${C} μF capacitor is charged to ${V} V. How much energy (J) does it store?`, value: U, tolPct: 2, unit: 'J',
    expl: `U = ½CV² = ½ × ${C} × 10^-6 × ${V}² = ${sci(U, 3)} J. (Q = CV = ${sci(C * 1e-6 * V, 2)} C.)`, hint: 'U = ½CV²' };
}, { hy: true, cs: ['cs-capacitor'] });
G('p-elec', 'g-field-plates', 'Field between plates', rnd => {
  const V = pickR(rnd, [10, 50, 100, 500]), d = pickR(rnd, [0.01, 0.02, 0.005]);
  return { prompt: `Two parallel plates ${d * 100} cm apart have a potential difference of ${V} V. What is the field between them (V/m)?`, value: V / d, tolPct: 2, unit: 'V/m',
    expl: `E = V/d = ${V} / ${d} = ${sig(V / d)} V/m (equivalently N/C), uniform between the plates.` };
}, { cs: ['cs-capacitor'] });
G('p-elec', 'g-terminal', 'Battery internal resistance', rnd => {
  const emf = pickR(rnd, [6, 9, 12]), r = pickR(rnd, [0.5, 1]), R = pickR(rnd, [2, 4, 5]);
  const I = emf / (R + r), V = emf - I * r;
  return { prompt: `A ${emf} V battery with ${r} Ω internal resistance drives a ${R} Ω resistor. What is the terminal voltage (V)?`, value: V, tolPct: 2, unit: 'V',
    expl: `I = ε/(R + r) = ${emf}/${R + r} = ${sig(I)} A; V = ε − Ir = ${emf} − ${sig(I)} × ${r} = ${sig(V)} V (= IR).` };
});
