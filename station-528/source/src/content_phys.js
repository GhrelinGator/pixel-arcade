/* Physics starter deck. Original items; MCAT conventions (g = 10 m/s²). Code computes every numeric key. */
'use strict';

/* ---------- Kinematics (4A) ---------- */
C('p-kin', 'apex', 'A ball is thrown upward at an angle. At the top of its path (no air resistance):', ['Vertical velocity is zero, but acceleration is still g downward', 'Velocity and acceleration are both zero for an instant', 'Acceleration is zero and velocity is horizontal', 'Horizontal velocity is zero, but vertical is not'],
  ['The horizontal velocity is unchanged throughout the flight.', 'Gravity never switches off; only the vertical velocity is momentarily zero.', 'Horizontal velocity stays constant the whole time.'],
  'Gravity accelerates the ball at 10 m/s² downward everywhere on its path, including the top.', { hy: true, sk: 2, cs: ['cs-projectile'] });
C('p-kin', 'horiz-v', 'Ignoring air resistance, a projectile\'s horizontal velocity:', ['Stays constant', 'Increases steadily', 'Decreases steadily', 'Is zero at the top'],
  ['No horizontal force acts, so nothing speeds it up.', 'Only air resistance would slow it.', 'Only the vertical component is zero at the top.'],
  'Horizontal and vertical motion are independent; only the vertical has an acceleration (g).', { cs: ['cs-projectile'] });
C('p-kin', 'drop-vs-throw', 'One ball is dropped and another is thrown horizontally from the same height at the same moment. Which lands first?', ['They land at the same time', 'The dropped ball', 'The thrown ball', 'It depends on their masses'],
  ['Horizontal speed does not affect vertical fall.', 'Its horizontal motion does not slow its fall.', 'Free-fall acceleration does not depend on mass.'],
  'Both start with zero vertical velocity and fall with the same acceleration, so both fall the same height in the same time.', { sk: 2, cs: ['cs-projectile'] });
C('p-kin', 'vt-slope', 'The slope of a velocity–time graph gives:', ['Acceleration', 'Displacement', 'Velocity', 'Jerk'],
  ['Displacement is the area under a v–t graph.', 'Velocity is the slope of a position–time graph.', 'Jerk is the slope of an acceleration–time graph.'],
  'Slope = rise/run = Δv/Δt = acceleration.', { hy: true, cs: ['cs-graphs'] });
C('p-kin', 'vt-area', 'The area under a velocity–time graph gives:', ['Displacement', 'Acceleration', 'Average speed', 'Force'],
  ['Acceleration is the slope.', 'You would still divide by time to get an average.', 'Force needs mass and acceleration.'],
  'Area = velocity × time = displacement (areas below the axis count as negative).', { cs: ['cs-graphs'] });
C('p-kin', 'xt-slope', 'The slope of a position–time graph gives:', ['Velocity', 'Acceleration', 'Displacement', 'Distance traveled'],
  ['Acceleration would show as the curvature, or the slope of v–t.', 'Displacement is read from the graph directly as a change in position.', 'Distance needs the path length, not the slope.'],
  'Δx/Δt = velocity. A straight line means constant velocity; a curve means acceleration.', { cs: ['cs-graphs'] });
C('p-kin', 'speed-vel', 'A runner completes one lap of a 400 m track in 80 s. Her average velocity is:', ['0 m/s', '5 m/s', '400 m/s', '80 m/s'],
  ['5 m/s is her average speed (distance/time).', 'That is the distance, not a velocity.', 'That is the time.'],
  'She ends where she started, so displacement is zero and average velocity is zero. Speed uses distance; velocity uses displacement.', { sk: 2 });
G('p-kin', 'g-fall', 'Free-fall time', rnd => {
  const h = pickR(rnd, [5, 20, 45, 80, 125, 180]), t = Math.sqrt(2 * h / 10);
  return { prompt: `An object is dropped from rest ${h} m above the ground. How long (s) does it take to land? (g = 10 m/s², no air resistance)`, value: t, tolPct: 2, unit: 's',
    expl: `h = ½gt² → t = √(2h/g) = √(2 × ${h} / 10) = ${sig(t)} s.`, hint: 'h = ½gt²' };
}, { hy: true, cs: ['cs-projectile'] });
G('p-kin', 'g-vf', 'Final velocity', rnd => {
  const v0 = pickR(rnd, [0, 2, 5, 10]), a = pickR(rnd, [2, 3, 4, 5]), t = pickR(rnd, [2, 3, 4, 5, 10]);
  return { prompt: `A cart starts at ${v0} m/s and accelerates at ${a} m/s² for ${t} s. What is its final speed, in m/s?`, value: v0 + a * t, tolPct: 1, unit: 'm/s',
    expl: `v = v₀ + at = ${v0} + ${a} × ${t} = ${v0 + a * t} m/s.` };
}, { sk: 1 });
G('p-kin', 'g-vsq', 'v² = v₀² + 2aΔx', rnd => {
  const v0 = pickR(rnd, [10, 20, 30]), a = pickR(rnd, [2, 4, 5]);
  const d = v0 * v0 / (2 * a);
  return { prompt: `A car moving at ${v0} m/s brakes at a constant ${a} m/s². How far (m) does it travel before stopping?`, value: d, tolPct: 2, unit: 'm',
    expl: `0 = v₀² − 2ad → d = v₀² / (2a) = ${v0 * v0} / ${2 * a} = ${sig(d)} m. Doubling the speed quadruples the stopping distance.`, hint: 'v² = v₀² + 2aΔx, with v = 0' };
}, { hy: true });
G('p-kin', 'g-proj', 'Horizontal launch', rnd => {
  const h = pickR(rnd, [5, 20, 45, 80]), v = pickR(rnd, [3, 5, 10, 15]);
  const t = Math.sqrt(2 * h / 10);
  return { prompt: `A ball rolls off a ${h} m high cliff at ${v} m/s horizontally. How far from the base of the cliff (m) does it land? (g = 10 m/s²)`, value: v * t, tolPct: 2, unit: 'm',
    expl: `Fall time t = √(2h/g) = ${sig(t)} s. Horizontal distance = v·t = ${v} × ${sig(t)} = ${sig(v * t)} m.` };
}, { cs: ['cs-projectile'] });

/* ---------- Forces & Newton's laws (4A) ---------- */
C('p-force', 'third-law', 'A book rests on a table. By Newton\'s third law, the reaction to Earth\'s gravitational pull on the book is:', ['The book\'s gravitational pull on Earth', 'The table\'s normal force on the book', 'The book\'s weight', 'Friction from the table'],
  ['The normal force balances gravity on the same object; that is the first law (equilibrium), not a third-law pair.', 'Weight is the force in question, not its partner.', 'No horizontal force is involved.'],
  'Third-law pairs act on different objects and are the same type of force: Earth pulls the book, the book pulls Earth.', { hy: true, sk: 2 });
C('p-force', 'const-v', 'An object moves at constant velocity. The net force on it is:', ['Zero', 'In the direction of motion', 'Opposite to the motion', 'Equal to its weight'],
  ['A net force would change the velocity.', 'That would slow it down.', 'Weight is only one of the forces, and it is balanced.'],
  'Newton\'s first law: constant velocity (including rest) means balanced forces.', { hy: true });
C('p-force', 'friction', 'For two surfaces, how do the coefficients of static and kinetic friction usually compare?', ['μs > μk', 'μk > μs', 'They are always equal', 'μs is always zero'],
  ['Kinetic friction is the smaller one.', 'They are usually different.', 'Static friction is what lets you walk.'],
  'It takes more force to start something sliding than to keep it sliding.');
C('p-force', 'mass-weight', 'An astronaut goes from Earth to the Moon. What happens to her mass and weight?', ['Mass is unchanged; weight decreases', 'Both decrease', 'Mass decreases; weight is unchanged', 'Both are unchanged'],
  ['Mass is the amount of matter and does not depend on location.', 'This reverses them.', 'Weight = mg depends on the local g.'],
  'The Moon\'s g is about 1/6 of Earth\'s, so her weight drops to about 1/6.');
C('p-force', 'centripetal', 'For an object moving in a circle at constant speed, the net force points:', ['Toward the center', 'Along the direction of motion', 'Outward from the center', 'There is no net force'],
  ['Constant speed means no tangential force.', '"Centrifugal force" is not a real force in an inertial frame.', 'Its direction changes constantly, so it is accelerating.'],
  'Centripetal acceleration v²/r points inward; something (tension, gravity, friction) must supply the inward force.', { hy: true });
C('p-force', 'elevator', 'You stand on a scale in an elevator accelerating upward. The scale reads:', ['More than your weight', 'Less than your weight', 'Exactly your weight', 'Zero'],
  ['That happens when accelerating downward.', 'Only at rest or constant velocity.', 'Only in free fall.'],
  'N − mg = ma, so N = m(g + a) > mg.', { sk: 2 });
T('p-force', 'newton-unit', 'What is the SI unit of force?', ['newton', 'newtons', 'n'],
  'The newton: 1 N = 1 kg·m/s².');
G('p-force', 'g-fma', 'F = ma with friction', rnd => {
  const m = pickR(rnd, [2, 4, 5, 10]), F = pickR(rnd, [20, 30, 40, 60]), mu = pickR(rnd, [0, 0.1, 0.2]);
  const f = mu * m * 10, a = (F - f) / m;
  if (a <= 0) return { prompt: `A ${m} kg box is pushed with ${F + 50} N on a frictionless floor. What is its acceleration (m/s²)?`, value: (F + 50) / m, tolPct: 2, unit: 'm/s²', expl: `a = F/m = ${F + 50}/${m} = ${sig((F + 50) / m)} m/s².` };
  return { prompt: `A ${m} kg box is pushed horizontally with ${F} N. The coefficient of kinetic friction is ${mu}. What is its acceleration (m/s²)? (g = 10 m/s²)`, value: a, tolPct: 2, unit: 'm/s²',
    expl: `Friction = μmg = ${mu} × ${m} × 10 = ${f} N. Net force = ${F} − ${f} = ${F - f} N. a = ${F - f}/${m} = ${sig(a)} m/s².` };
}, { hy: true });
G('p-force', 'g-incline', 'Frictionless incline', rnd => {
  const th = pickR(rnd, [30, 45, 60]), s = { 30: 0.5, 45: Math.SQRT1_2, 60: Math.sqrt(3) / 2 }[th];
  return { prompt: `A block slides down a frictionless ${th}° incline. What is its acceleration (m/s²)? (g = 10 m/s²; sin 30° = 0.5, sin 45° ≈ 0.71, sin 60° ≈ 0.87)`, value: 10 * s, tolPct: 2, unit: 'm/s²',
    expl: `Only the component of gravity along the slope accelerates it: a = g sin θ = 10 × ${sig(s, 2)} = ${sig(10 * s)} m/s². Mass cancels.` };
});
G('p-force', 'g-circ', 'Centripetal acceleration', rnd => {
  const v = pickR(rnd, [2, 4, 5, 10, 20]), r = pickR(rnd, [1, 2, 5, 10, 50]);
  return { prompt: `A car rounds a curve of radius ${r} m at ${v} m/s. What is its centripetal acceleration (m/s²)?`, value: v * v / r, tolPct: 2, unit: 'm/s²',
    expl: `a = v²/r = ${v * v}/${r} = ${sig(v * v / r)} m/s², pointing toward the center.` };
}, { hy: true });

/* ---------- Work, energy & power (4A) ---------- */
C('p-energy', 'normal-work', 'A box slides 5 m across a level floor. How much work does the normal force do?', ['Zero', 'Equal to the weight times 5 m', 'Negative, equal to friction\'s work', 'Positive, equal to the kinetic energy gained'],
  ['W = Fd cos θ, and θ = 90° between the normal force and the motion.', 'That is friction\'s job, not the normal force\'s.', 'The normal force does no work here at all.'],
  'Forces perpendicular to the displacement do no work. The same goes for gravity during horizontal motion.', { hy: true, sk: 2 });
C('p-energy', 'conservative', 'Which is a conservative force, whose work does not depend on the path?', ['Gravity', 'Kinetic friction', 'Air resistance', 'A push from your hand'],
  ['Friction\'s work depends on how far you slide, so a longer path loses more energy.', 'Drag depends on path and speed.', 'Applied forces in general are path-dependent.'],
  'Gravity, spring forces and electrostatic forces are conservative, so each has a potential energy.', { cs: ['cs-conservative'] });
C('p-energy', 'wet', 'The net work done on an object equals:', ['Its change in kinetic energy', 'Its change in potential energy', 'Its momentum', 'Its power'],
  ['Potential energy is tied to the work of conservative forces only.', 'Momentum is a different quantity, mv.', 'Power is work per unit time.'],
  'The work–energy theorem: W_net = ΔKE.', { hy: true });
T('p-energy', 'watt', 'What is the SI unit of power?', ['watt', 'watts', 'w', 'j/s', 'joules per second', 'joule per second'],
  'The watt: 1 W = 1 J/s.');
C('p-energy', 'ramp', 'Pushing a crate up a long, gentle frictionless ramp instead of lifting it straight up:', ['Takes less force but the same work', 'Takes less work', 'Takes more work', 'Takes less force and less work'],
  ['Work = mgh either way, ignoring friction.', 'It takes the same work without friction (more with friction).', 'Simple machines trade force for distance; they never reduce the work.'],
  'Force × distance is conserved: a smaller force over a longer distance does the same mgh of work.', { sk: 2 });
G('p-energy', 'g-ke', 'Kinetic energy', rnd => {
  const m = pickR(rnd, [1, 2, 4, 10, 50]), v = pickR(rnd, [2, 3, 4, 10, 20]);
  return { prompt: `What is the kinetic energy (J) of a ${m} kg object moving at ${v} m/s?`, value: 0.5 * m * v * v, tolPct: 1, unit: 'J',
    expl: `KE = ½mv² = ½ × ${m} × ${v}² = ${0.5 * m * v * v} J. Doubling v quadruples KE.` };
}, { sk: 1 });
G('p-energy', 'g-drop-v', 'Energy conservation', rnd => {
  const h = pickR(rnd, [5, 20, 45, 80]), v = Math.sqrt(20 * h);
  return { prompt: `A ball slides from rest down a frictionless track, dropping ${h} m in height. What is its speed at the bottom (m/s)? (g = 10 m/s²)`, value: v, tolPct: 2, unit: 'm/s',
    expl: `mgh = ½mv² → v = √(2gh) = √(2 × 10 × ${h}) = ${sig(v)} m/s. Mass and track shape do not matter.` };
}, { hy: true });
G('p-energy', 'g-work', 'Work at an angle', rnd => {
  const F = pickR(rnd, [10, 20, 50]), d = pickR(rnd, [2, 4, 5, 10]), th = pickR(rnd, [0, 60, 90]);
  const c = { 0: 1, 60: 0.5, 90: 0 }[th];
  return { prompt: `A ${F} N force pulls a sled ${d} m. The force makes a ${th}° angle with the motion. How much work (J) does it do?${th === 60 ? ' (cos 60° = 0.5)' : ''}`, value: F * d * c, tol: 0.5, unit: 'J',
    expl: `W = Fd cos θ = ${F} × ${d} × ${c} = ${F * d * c} J.${th === 90 ? ' A perpendicular force does no work.' : ''}` };
});
G('p-energy', 'g-power', 'Power', rnd => {
  const m = pickR(rnd, [50, 60, 70, 80]), h = pickR(rnd, [3, 5, 10]), t = pickR(rnd, [2, 4, 5, 10]);
  const P = m * 10 * h / t;
  return { prompt: `A ${m} kg person climbs ${h} m of stairs in ${t} s. What average power (W) does she produce against gravity? (g = 10 m/s²)`, value: P, tolPct: 2, unit: 'W',
    expl: `P = W/t = mgh/t = ${m} × 10 × ${h} / ${t} = ${sig(P)} W.` };
});

/* ---------- Momentum, torque & equilibrium (4A) ---------- */
C('p-mom', 'conserve', 'The total momentum of a system is conserved when:', ['The net external force on the system is zero', 'Kinetic energy is conserved as well', 'The collision is perfectly elastic', 'All the objects involved have the same mass'],
  ['Momentum is conserved even when kinetic energy is not (inelastic collisions).', 'Momentum is conserved in elastic and inelastic collisions alike.', 'Masses do not matter.'],
  'Internal forces come in third-law pairs and cancel; only an outside force can change total momentum.', { hy: true, cs: ['cs-collisions'] });
C('p-mom', 'elastic', 'In an elastic collision:', ['Both momentum and kinetic energy are conserved', 'Only momentum is conserved, not kinetic energy', 'Only kinetic energy is conserved, not momentum', 'Neither momentum nor kinetic energy is conserved'],
  ['That is an inelastic collision.', 'Momentum is always conserved in an isolated collision.', 'Momentum is conserved in every isolated collision.'],
  'Elastic collisions keep kinetic energy; inelastic ones turn some into heat, sound or deformation.', { hy: true, cs: ['cs-collisions'] });
C('p-mom', 'inelastic', 'In a perfectly inelastic collision:', ['The objects stick together and the most kinetic energy is lost', 'Kinetic energy is conserved', 'Momentum is lost', 'The objects bounce apart at their original speeds'],
  ['That is elastic.', 'Momentum is still conserved.', 'That describes a perfectly elastic bounce (seen from the center-of-mass frame), the opposite extreme.'],
  'Sticking together loses the maximum kinetic energy allowed while still conserving momentum.', { cs: ['cs-collisions'] });
C('p-mom', 'equilibrium', 'An object is in static equilibrium. Which must be true?', ['Net force is zero and net torque is zero', 'Net force is zero; torque can be anything', 'Net torque is zero; force can be anything', 'All the forces acting on it are equal'],
  ['A seesaw with balanced forces can still rotate if torques are unbalanced.', 'An object can be balanced in rotation yet still slide.', 'Forces can differ as long as they cancel.'],
  'Translational equilibrium (ΣF = 0) and rotational equilibrium (Στ = 0) are both needed.', { hy: true });
G('p-mom', 'g-inelastic', 'Perfectly inelastic collision', rnd => {
  const m1 = pickR(rnd, [1, 2, 3, 4]), v1 = pickR(rnd, [4, 6, 8, 10]), m2 = pickR(rnd, [1, 2, 4, 6]);
  const vf = m1 * v1 / (m1 + m2);
  return { prompt: `A ${m1} kg cart moving at ${v1} m/s hits a stationary ${m2} kg cart, and they stick. What is their speed afterward (m/s)?`, value: vf, tolPct: 2, unit: 'm/s',
    expl: `Momentum: ${m1} × ${v1} = (${m1} + ${m2})v → v = ${m1 * v1}/${m1 + m2} = ${sig(vf)} m/s.` };
}, { hy: true, cs: ['cs-collisions'] });
G('p-mom', 'g-impulse', 'Impulse', rnd => {
  const m = pickR(rnd, [0.1, 0.2, 0.5]), v = pickR(rnd, [10, 20, 30]), t = pickR(rnd, [0.01, 0.02, 0.05, 0.1]);
  const F = m * v / t;
  return { prompt: `A ${m} kg ball moving at ${v} m/s is caught and stopped in ${t} s. What is the average force (N) on it?`, value: F, tolPct: 2, unit: 'N',
    expl: `Impulse = FΔt = Δp, so F = mΔv/Δt = ${m} × ${v} / ${t} = ${sig(F)} N. A longer stopping time (soft hands, airbags) lowers the force.` };
});
G('p-mom', 'g-seesaw', 'Torque balance', rnd => {
  const m1 = pickR(rnd, [20, 30, 40]), r1 = pickR(rnd, [1, 1.5, 2]), m2 = pickR(rnd, [20, 40, 60]);
  const r2 = m1 * r1 / m2;
  return { prompt: `A ${m1} kg child sits ${r1} m from a seesaw\'s pivot. How far (m) on the other side must a ${m2} kg child sit to balance it?`, value: r2, tolPct: 2, unit: 'm',
    expl: `Torques balance: m₁gr₁ = m₂gr₂ → r₂ = ${m1} × ${r1} / ${m2} = ${sig(r2)} m.` };
}, { hy: true });
G('p-mom', 'g-torque', 'Torque', rnd => {
  const F = pickR(rnd, [10, 20, 40]), r = pickR(rnd, [0.2, 0.5, 1]), th = pickR(rnd, [90, 30, 0]);
  const s = { 90: 1, 30: 0.5, 0: 0 }[th];
  return { prompt: `A ${F} N force is applied ${r} m from a hinge, at ${th}° to the lever arm. What is the torque (N·m)?${th === 30 ? ' (sin 30° = 0.5)' : ''}`, value: F * r * s, tol: 0.05, unit: 'N·m',
    expl: `τ = rF sin θ = ${r} × ${F} × ${s} = ${sig(F * r * s) } N·m.${th === 0 ? ' A force along the lever arm cannot rotate it.' : ''}` };
});

/* ---------- Fluids (4B) ---------- */
C('p-fluid', 'depth', 'Three tanks of different shapes are filled with water to the same depth. The pressure at the bottom is:', ['The same in all three', 'Greatest in the widest tank', 'Greatest in the tank with the most water', 'Greatest in the narrowest tank'],
  ['Width does not enter P = ρgh.', 'Total volume does not matter, only depth.', 'Shape does not matter.'],
  'Hydrostatic pressure depends only on fluid density, g and depth (plus the pressure at the surface).', { hy: true, sk: 2 });
C('p-fluid', 'archimedes', 'The buoyant force on a submerged object equals:', ['The weight of the fluid it displaces', 'The object\'s own weight', 'The object\'s volume times its density', 'The pressure at its depth'],
  ['Only true for a floating object, and then because it displaces its own weight of fluid.', 'That is the object\'s mass, not the buoyant force.', 'Pressure is force per area; buoyancy comes from the pressure difference.'],
  'Archimedes\' principle: F_b = ρ_fluid × V_submerged × g.', { hy: true });
C('p-fluid', 'float', 'An object floats with exactly 60% of its volume under water. What is its density?', ['600 kg/m³', '400 kg/m³', '1600 kg/m³', '60 kg/m³'],
  ['That is the fraction above water (40%) times water\'s density.', 'An object denser than water would sink.', 'Off by a factor of 10.'],
  'Fraction submerged = ρ_object / ρ_fluid, so ρ = 0.60 × 1000 kg/m³ = 600 kg/m³.', { sk: 2 });
C('p-fluid', 'continuity', 'Water flows from a wide pipe into a narrower one. Its speed:', ['Increases', 'Decreases', 'Stays the same', 'Drops to zero'],
  ['The same volume per second must pass through a smaller area.', 'Flow rate is constant, so speed must rise.', 'The fluid keeps moving.'],
  'Continuity: A₁v₁ = A₂v₂ for an incompressible fluid.', { hy: true, cs: ['cs-bernoulli'] });
C('p-fluid', 'bernoulli', 'In a horizontal pipe, where the fluid flows faster its pressure is:', ['Lower', 'Higher', 'Unchanged', 'Zero'],
  ['Bernoulli: faster flow means lower pressure.', 'Kinetic energy rises at the expense of pressure energy.', 'Not zero; just lower.'],
  'P + ½ρv² + ρgh is constant along a streamline. This is the Venturi effect: the narrow, fast-flowing part of a pipe (or a narrowed artery) has lower pressure.', { hy: true, sk: 2, cs: ['cs-bernoulli'] });
C('p-fluid', 'poiseuille', 'By Poiseuille\'s law, halving a blood vessel\'s radius (pressure difference unchanged) changes the flow by a factor of:', ['1/16', '1/2', '1/4', '1/8'],
  ['Flow goes as r⁴, not r.', 'That would be r².', 'That would be r³.'],
  'Q ∝ r⁴: (½)⁴ = 1/16. Small changes in vessel radius control blood flow powerfully.', { sk: 2 });
C('p-fluid', 'gauge', 'How are absolute pressure and gauge pressure related?', ['Absolute = gauge + atmospheric', 'Gauge = absolute + atmospheric', 'They are equal', 'Absolute = gauge × atmospheric'],
  ['Reversed.', 'They differ by atmospheric pressure.', 'They differ by atmospheric pressure, added not multiplied.'],
  'A tire gauge reads pressure above atmospheric. At depth h: P_abs = P_atm + ρgh.');
G('p-fluid', 'g-hydro', 'Hydrostatic pressure', rnd => {
  const h = pickR(rnd, [1, 2, 5, 10, 20]), abs = rnd() < 0.5;
  const P = 1000 * 10 * h + (abs ? 1e5 : 0);
  return { prompt: `What is the ${abs ? 'absolute' : 'gauge'} pressure (Pa) ${h} m below the surface of water? (ρ = 1000 kg/m³, g = 10 m/s²${abs ? ', P_atm = 1 × 10^5 Pa' : ''})`, value: P, tolPct: 2, unit: 'Pa',
    expl: `ρgh = 1000 × 10 × ${h} = ${sci(1e4 * h)} Pa${abs ? `; add atmospheric pressure: ${sci(P, 3)} Pa` : ' (gauge pressure leaves out the atmosphere)'}.`, hint: 'P = ρgh' };
}, { hy: true });
G('p-fluid', 'g-buoy', 'Buoyant force', rnd => {
  const V = pickR(rnd, [0.001, 0.002, 0.005, 0.01]);
  return { prompt: `A ${V * 1000} L (${V} m³) object is fully submerged in water. What is the buoyant force on it (N)? (ρ = 1000 kg/m³, g = 10 m/s²)`, value: 1000 * V * 10, tolPct: 2, unit: 'N',
    expl: `F_b = ρVg = 1000 × ${V} × 10 = ${sig(1e4 * V)} N, whatever the object is made of.` };
});
G('p-fluid', 'g-cont', 'Continuity equation', rnd => {
  const r1 = pickR(rnd, [2, 4, 6]), k = pickR(rnd, [2, 3]), v1 = pickR(rnd, [1, 2, 3]);
  const r2 = r1 / k, v2 = v1 * k * k;
  return { prompt: `Water flows at ${v1} m/s in a pipe of radius ${r1} cm, which narrows to a radius of ${sig(r2)} cm. What is the speed in the narrow section (m/s)?`, value: v2, tolPct: 2, unit: 'm/s',
    expl: `A ∝ r², so the area shrinks by ${k}² = ${k * k}. A₁v₁ = A₂v₂ → v₂ = ${v1} × ${k * k} = ${v2} m/s.` };
}, { cs: ['cs-bernoulli'] });

/* ---------- Electrostatics & circuits (4C) ---------- */
C('p-elec', 'coulomb', 'Two charges are moved twice as far apart. The electric force between them becomes:', ['¼ as large', '½ as large', 'Twice as large', 'Unchanged'],
  ['Force goes as 1/r², not 1/r.', 'Moving apart weakens the force.', 'Distance matters.'],
  'Coulomb\'s law: F = kq₁q₂/r². Doubling r divides F by 4.', { hy: true });
C('p-elec', 'series', 'Resistors connected in series all have the same:', ['Current', 'Voltage', 'Resistance', 'Power'],
  ['Voltage divides among series resistors in proportion to resistance.', 'They can have any resistances.', 'Power differs unless resistances are equal.'],
  'There is only one path, so the same current passes through each.', { hy: true, cs: ['cs-series-parallel'] });
C('p-elec', 'parallel', 'Resistors connected in parallel all have the same:', ['Voltage', 'Current', 'Resistance', 'Charge'],
  ['Current splits among the branches, most through the smallest resistance.', 'They can differ.', 'What branches share is the potential difference, not charge.'],
  'Each branch connects across the same two nodes, so each sees the same potential difference. Household outlets are wired in parallel.', { hy: true, cs: ['cs-series-parallel'] });
C('p-elec', 'add-parallel', 'Adding another resistor in parallel to a circuit makes the total resistance:', ['Decrease', 'Increase', 'Stay the same', 'Become infinite'],
  ['Adding in series increases it; in parallel you add another path.', 'A new path always carries some current.', 'More paths, less resistance.'],
  '1/R_total = Σ 1/Rᵢ; a new term makes 1/R larger, so R smaller (and the battery supplies more current).', { sk: 2, cs: ['cs-series-parallel'] });
C('p-elec', 'cap-parallel', 'How do capacitors combine in parallel?', ['Their capacitances add', 'Their reciprocals add', 'The total equals the smallest one', 'The total equals the largest one'],
  ['That is capacitors in series (the opposite of resistors).', 'In series the total is even smaller than the smallest; in parallel it is larger than any one.', 'Parallel capacitance is larger than any single capacitor, because the plate areas add.'],
  'Capacitors combine opposite to resistors: parallel adds directly (more plate area), series adds reciprocals.', { sk: 2, cs: ['cs-series-parallel'] });
C('p-elec', 'dielectric', 'A charged capacitor is disconnected from its battery, then a dielectric is slid in. What happens?', ['Capacitance rises and voltage falls (charge is fixed)', 'Capacitance rises and stored charge rises', 'Capacitance falls and the voltage across it rises', 'Nothing changes, since the battery is gone'],
  ['Charge cannot change once disconnected.', 'A dielectric always increases C.', 'The dielectric does change C.'],
  'C = κC₀ goes up; with Q fixed, V = Q/C goes down. (If it stayed connected, V would be fixed and Q would rise instead.)', { sk: 2 });
C('p-elec', 'field-dir', 'Electric field lines point:', ['Away from positive charges and toward negative charges', 'Toward positive charges', 'In circles around charges', 'Perpendicular to the force on a positive charge'],
  ['Reversed.', 'Circular field lines describe the magnetic field around a current.', 'The field points along the force on a positive test charge.'],
  'The field direction is the direction a positive test charge would be pushed.');
C('p-elec', 'pe-field', 'A positive charge moves in the direction of an electric field. Its electric potential energy:', ['Decreases', 'Increases', 'Stays the same', 'Becomes zero'],
  ['It is moving the way the field pushes it, like a ball falling.', 'The field does positive work on it.', 'Work is done, so energy changes.'],
  'Moving along the field is moving to lower potential; for a positive charge, lower potential means lower potential energy. A negative charge would gain potential energy.', { sk: 2 });
C('p-elec', 'wire-r', 'A wire is replaced by one of the same material that is twice as long with twice the diameter. Its resistance:', ['Halves', 'Doubles', 'Quadruples', 'Stays the same'],
  ['Length doubles R, but the area grows 4×.', 'The area increase outweighs the length.', 'They do not cancel exactly.'],
  'R = ρL/A. Doubling the diameter multiplies the area by 4; so R × 2 / 4 = ½R.', { sk: 2 });
C('p-elec', 'meters', 'How should an ammeter and a voltmeter be connected?', ['Ammeter in series (low resistance); voltmeter in parallel (high resistance)', 'Ammeter in parallel (low resistance); voltmeter in series (high resistance)', 'Both in series, so the same current flows through each', 'Both in parallel, so each sees the same voltage'],
  ['That swaps them and could short the circuit through the ammeter.', 'A series voltmeter would block the current.', 'A parallel ammeter would short the component.'],
  'Ideal meters do not disturb the circuit: no voltage drop across the ammeter, no current through the voltmeter.');
G('p-elec', 'g-ohm', 'Ohm\'s law', rnd => {
  const V = pickR(rnd, [6, 9, 12, 24, 120]), R = pickR(rnd, [2, 3, 4, 6, 12, 60]);
  return { prompt: `A ${V} V battery drives current through a ${R} Ω resistor. What is the current (A)?`, value: V / R, tolPct: 2, unit: 'A',
    expl: `I = V/R = ${V}/${R} = ${sig(V / R)} A.`, hint: 'V = IR' };
}, { hy: true, sk: 1 });
G('p-elec', 'g-req', 'Equivalent resistance', rnd => {
  const kind = pickR(rnd, ['series', 'parallel', 'mixed']);
  const a = pickR(rnd, [2, 3, 4, 6, 12]), b = pickR(rnd, [3, 4, 6, 12]), c = pickR(rnd, [2, 4, 5, 10]);
  const par = (x, y) => x * y / (x + y);
  let R, desc, ex;
  if (kind === 'series') { R = a + b + c; desc = `${a} Ω, ${b} Ω and ${c} Ω in series`; ex = `${a} + ${b} + ${c} = ${R} Ω.`; }
  else if (kind === 'parallel') { R = par(a, b); desc = `${a} Ω and ${b} Ω in parallel`; ex = `R = (${a} × ${b})/(${a} + ${b}) = ${sig(R)} Ω. Always less than the smallest branch.`; }
  else { R = c + par(a, b); desc = `${c} Ω in series with a parallel pair of ${a} Ω and ${b} Ω`; ex = `Parallel pair: ${sig(par(a, b))} Ω; plus ${c} Ω = ${sig(R)} Ω.`; }
  return { prompt: `What is the equivalent resistance (Ω) of ${desc}?`, value: R, tolPct: 2, unit: 'Ω', expl: ex };
}, { hy: true, cs: ['cs-series-parallel'] });
G('p-elec', 'g-power', 'Electrical power', rnd => {
  const V = pickR(rnd, [10, 12, 20, 120]), R = pickR(rnd, [2, 4, 5, 10, 20]);
  return { prompt: `A ${R} Ω resistor sits across ${V} V. How much power (W) does it dissipate?`, value: V * V / R, tolPct: 2, unit: 'W',
    expl: `P = V²/R = ${V * V}/${R} = ${sig(V * V / R)} W (equivalently IV or I²R).` };
});
G('p-elec', 'g-coulomb', 'Coulomb scaling', rnd => {
  const q = pickR(rnd, [2, 3]), r = pickR(rnd, [2, 3, 0.5]), F0 = pickR(rnd, [4, 9, 12, 36]);
  const F = F0 * q / (r * r);
  return { prompt: `Two charges attract with ${F0} N. One charge is multiplied by ${q} and the distance is multiplied by ${r}. What is the new force (N)?`, value: F, tolPct: 2, unit: 'N',
    expl: `F ∝ q₁q₂/r²: × ${q} ÷ ${r}² = × ${sig(q / (r * r))}. New force = ${sig(F)} N.` };
});

/* ---------- Waves & sound (4D) ---------- */
C('p-wave', 'sound-medium', 'Sound travels fastest in:', ['Steel', 'Water', 'Air', 'A vacuum'],
  ['Faster than air but slower than steel.', 'Slowest of the material media.', 'Sound needs a medium; it cannot travel in a vacuum.'],
  'Sound speed depends on stiffness relative to density; solids are by far the stiffest. Roughly: air 340 m/s, water 1500 m/s, steel about 5000 m/s.', { hy: true });
C('p-wave', 'pitch', 'Pitch and loudness of a sound correspond to:', ['Frequency and amplitude', 'Amplitude and frequency', 'Wavelength and speed', 'Speed and frequency'],
  ['Reversed.', 'Speed is set by the medium, not by the sound.', 'Speed does not set pitch.'],
  'Higher frequency → higher pitch; larger amplitude (intensity) → louder.');
C('p-wave', 'doppler', 'An ambulance siren approaches you. Compared with the emitted sound, you hear:', ['A higher frequency', 'A lower frequency', 'The same frequency, louder', 'A faster speed of sound'],
  ['That is what you hear as it moves away.', 'The frequency really is shifted, not just the loudness.', 'The speed of sound is set by the air.'],
  'Approaching sources compress the wavefronts toward you: shorter wavelength, higher frequency (Doppler effect). Ultrasound uses this to measure blood flow.', { hy: true });
C('p-wave', 'medium-change', 'When a wave passes from one medium into another, what stays the same?', ['Frequency', 'Speed', 'Wavelength', 'Direction'],
  ['Speed is set by the medium.', 'Since v = fλ and f is fixed, λ changes with v.', 'It can bend (refract).'],
  'Frequency is set by the source; each new crest arrives as often as the old ones did.', { hy: true, sk: 2 });
C('p-wave', 'closed-pipe', 'A pipe closed at one end supports:', ['Only odd harmonics', 'Only even harmonics', 'All harmonics', 'No standing waves'],
  ['Even harmonics need antinodes (or nodes) at both ends.', 'A pipe open at both ends supports all.', 'It does resonate.'],
  'Closed end = node, open end = antinode. The fundamental fits ¼ λ in the pipe (λ = 4L); only odd multiples fit.', { cs: ['cs-pipes'] });
C('p-wave', 'longitudinal', 'Sound waves in air are:', ['Longitudinal', 'Transverse', 'Electromagnetic', 'Standing waves only'],
  ['Air cannot support the shear needed for transverse waves.', 'Sound is a mechanical wave.', 'Sound travels; standing waves are a special case.'],
  'Air molecules oscillate along the direction the wave travels, making compressions and rarefactions.');
G('p-wave', 'g-vfl', 'v = fλ', rnd => {
  const v = pickR(rnd, [340, 1500, 3e8]), f = v === 3e8 ? pickR(rnd, [6e14, 5e14, 1e8]) : pickR(rnd, [170, 340, 680, 1000]);
  const lam = v / f;
  return { prompt: `A wave travels at ${sci(v, 2)} m/s with frequency ${sci(f, 2)} Hz. What is its wavelength (m)?`, value: lam, tolPct: 2, unit: 'm',
    expl: `λ = v/f = ${sci(v, 2)} / ${sci(f, 2)} = ${sci(lam, 3)} m.`, hint: 'v = fλ' };
}, { hy: true, sk: 1 });
G('p-wave', 'g-db', 'Decibels', rnd => {
  const k = pickR(rnd, [1, 2, 3, 4]), base = pickR(rnd, [40, 50, 60, 70]);
  return { prompt: `A sound is ${base} dB. If its intensity is multiplied by ${Math.pow(10, k)}, what is the new sound level (dB)?`, value: base + 10 * k, tol: 0.5, unit: 'dB',
    expl: `Each factor of 10 in intensity adds 10 dB: ${base} + 10 × ${k} = ${base + 10 * k} dB.` };
}, { hy: true });
G('p-wave', 'g-string', 'Standing waves on a string', rnd => {
  const L = pickR(rnd, [0.5, 1, 2]), v = pickR(rnd, [100, 200, 400]), n = pickR(rnd, [1, 2, 3]);
  const f = n * v / (2 * L);
  return { prompt: `A string ${L} m long, fixed at both ends, carries waves at ${v} m/s. What is the frequency (Hz) of harmonic n = ${n}?`, value: f, tolPct: 2, unit: 'Hz',
    expl: `λₙ = 2L/n = ${sig(2 * L / n)} m; f = v/λ = ${v}/${sig(2 * L / n)} = ${sig(f)} Hz.` };
}, { cs: ['cs-pipes'] });
G('p-wave', 'g-pipe', 'Closed pipe', rnd => {
  const L = pickR(rnd, [0.25, 0.5, 0.85, 1]), v = 340;
  return { prompt: `What is the fundamental frequency (Hz) of a ${L} m pipe closed at one end? (v = 340 m/s)`, value: v / (4 * L), tolPct: 2, unit: 'Hz',
    expl: `Closed at one end: λ = 4L = ${4 * L} m; f = v/λ = 340/${4 * L} = ${sig(v / (4 * L))} Hz.` };
}, { cs: ['cs-pipes'] });

/* ---------- Light & optics (4D) ---------- */
C('p-light', 'conv-real', 'A real image formed by a single converging lens is always:', ['Inverted', 'Upright', 'Smaller than the object', 'On the same side as the object'],
  ['Upright images from a converging lens are virtual.', 'Real images can be larger or smaller depending on object distance.', 'Real images form on the far side of a lens.'],
  'For one lens or mirror: real ↔ inverted, virtual ↔ upright.', { hy: true, cs: ['cs-lens-mirror'] });
C('p-light', 'diverging', 'A diverging lens always forms an image that is:', ['Virtual, upright and smaller', 'Real, inverted and larger', 'Real, upright and smaller', 'Virtual, inverted and larger'],
  ['Diverging lenses cannot form real images of real objects.', 'Real and upright cannot go together for one lens.', 'Virtual images are upright.'],
  'Same as a convex mirror: always virtual, upright and reduced (a shop\'s security mirror).', { cs: ['cs-lens-mirror'] });
C('p-light', 'convex-mirror', 'A convex (diverging) mirror forms what kind of image?', ['Virtual, upright and smaller', 'Real, inverted and larger', 'Real, inverted and smaller', 'Virtual, upright and larger'],
  ['Convex mirrors cannot form real images of real objects.', 'Same issue: it is virtual.', 'It is reduced, not enlarged (that is a concave mirror close up).'],
  'Like a diverging lens. Car side mirrors use this: "objects are closer than they appear".', { cs: ['cs-lens-mirror'] });
C('p-light', 'magnifier', 'An object is placed inside the focal length of a converging lens. The image is:', ['Virtual, upright and magnified', 'Real, inverted and magnified', 'Real, inverted and reduced', 'Not formed'],
  ['Real images need the object outside f.', 'That is an object beyond 2f.', 'An image forms; it is virtual. Only an object exactly at f gives no image.'],
  'This is how a magnifying glass works.', { sk: 2, cs: ['cs-lens-mirror'] });
C('p-light', 'refract', 'Light passes from air into glass at an angle. It bends:', ['Toward the normal', 'Away from the normal', 'Not at all', 'Parallel to the surface'],
  ['That happens going from glass into air (higher n to lower n).', 'At an angle, it does bend. Only along the normal does it go straight.', 'It refracts into the glass.'],
  'Snell\'s law, n₁ sin θ₁ = n₂ sin θ₂: entering a higher index slows the light and bends it toward the normal.', { hy: true, cs: ['cs-refraction'] });
C('p-light', 'tir', 'Total internal reflection requires:', ['Light going from higher n to lower n, beyond the critical angle', 'Light going from lower n to higher n at a steep angle', 'Any angle of incidence at a glass surface', 'A reflective mirror coating on the surface'],
  ['Going into a higher index, light always refracts in.', 'Below the critical angle, light partly escapes.', 'It needs no coating; that is the point of fiber optics.'],
  'sin θc = n₂/n₁ (n₁ > n₂). Endoscopes rely on it.', { hy: true, cs: ['cs-refraction'] });
C('p-light', 'violet', 'Among visible colors, violet light has the:', ['Shortest wavelength and highest photon energy', 'Longest wavelength and lowest photon energy', 'Lowest frequency of the visible colors', 'Fastest speed in a vacuum of any color'],
  ['Red has the longest visible wavelength.', 'Violet has the highest visible frequency.', 'All light travels at c in a vacuum.'],
  'Visible range: about 400 nm (violet) to 700 nm (red). E = hf = hc/λ.');
C('p-light', 'myopia', 'Nearsightedness (myopia) is corrected with:', ['A diverging lens', 'A converging lens', 'A cylindrical lens', 'A prism'],
  ['Converging lenses correct farsightedness (hyperopia).', 'Cylindrical lenses correct astigmatism.', 'Prisms correct misalignment of the eyes.'],
  'A myopic eye focuses distant light in front of the retina; a diverging lens spreads the rays so they focus farther back.');
C('p-light', 'polar', 'Which kind of wave can be polarized?', ['Transverse waves, such as light', 'Longitudinal waves, such as sound', 'Both equally', 'Neither'],
  ['Longitudinal waves oscillate along the travel direction, leaving nothing to filter.', 'Only transverse.', 'Polarized sunglasses show it works for light.'],
  'Polarization restricts the direction of oscillation perpendicular to travel, which needs a transverse wave.');
C('p-light', 'double-slit', 'In a double-slit experiment, bright fringes appear where the path difference is:', ['A whole number of wavelengths (mλ)', 'An odd number of half wavelengths', 'Zero only', 'Equal to the slit spacing'],
  ['That gives dark fringes (destructive interference).', 'Zero is just the central bright fringe.', 'Not the condition.'],
  'Constructive interference: d sin θ = mλ.');
G('p-light', 'g-lens', 'Thin lens equation', rnd => {
  const f = pickR(rnd, [10, 20]), dobj = pickR(rnd, [15, 30, 40, 60].filter(x => x !== f));
  const di = 1 / (1 / f - 1 / dobj);
  return { prompt: `An object is ${dobj} cm from a converging lens with f = ${f} cm. Where is the image (cm from the lens)? Give a negative answer for a virtual image.`, value: di, tolPct: 2, unit: 'cm',
    expl: `1/f = 1/dₒ + 1/dᵢ → 1/dᵢ = 1/${f} − 1/${dobj} → dᵢ = ${sig(di)} cm (${di > 0 ? 'real, inverted, on the far side' : 'virtual, upright, same side'}). Magnification m = −dᵢ/dₒ = ${sig(-di / dobj)}.`, hint: '1/f = 1/dₒ + 1/dᵢ' };
}, { hy: true, cs: ['cs-lens-mirror'] });
G('p-light', 'g-snell', 'Snell\'s law', rnd => {
  const c = pickR(rnd, [{ n2: Math.SQRT2, s1: 0.5 * Math.SQRT2, t1: 45, t2: 30 }, { n2: Math.sqrt(3), s1: Math.sqrt(3) / 2, t1: 60, t2: 30 }]);
  return { prompt: `Light in air (n = 1) hits a material with n = ${sig(c.n2, 3)} at ${c.t1}° from the normal. What is the refraction angle, in degrees? (sin 30° = 0.5, sin 45° ≈ 0.707, sin 60° ≈ 0.866)`, value: c.t2, tol: 1, unit: '°',
    expl: `sin θ₂ = (1 × sin ${c.t1}°)/${sig(c.n2, 3)} = 0.5, so θ₂ = 30°. The ray bends toward the normal.` };
}, { cs: ['cs-refraction'] });
G('p-light', 'g-critical', 'Critical angle', rnd => {
  const n1 = pickR(rnd, [2, Math.SQRT2]), t = n1 === 2 ? 30 : 45;
  return { prompt: `Light travels from a material with n = ${sig(n1, 3)} toward air (n = 1). What is the critical angle, in degrees?`, value: t, tol: 1, unit: '°',
    expl: `sin θc = n₂/n₁ = 1/${sig(n1, 3)} = ${sig(1 / n1, 3)}, so θc = ${t}°. Beyond that, all light reflects.` };
}, { cs: ['cs-refraction'] });
G('p-light', 'g-diopter', 'Lens power', rnd => {
  const f = pickR(rnd, [0.5, 0.25, 0.2, 2, -0.5]);
  return { prompt: `What is the power, in diopters, of a lens with focal length ${f} m?`, value: 1 / f, tolPct: 2, unit: 'D',
    expl: `P = 1/f (in meters) = 1/${f} = ${sig(1 / f)} D.${f < 0 ? ' Negative: a diverging lens.' : ''}` };
});
