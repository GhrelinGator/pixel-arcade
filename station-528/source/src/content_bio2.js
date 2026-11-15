/* Biology expansion: signaling and organ systems, reproduction, evolution. Original items. */
'use strict';

/* ---------- Cell signaling (2A / 3A) ---------- */
C('b-signal', 'gpcr', 'A hormone binds a G protein-coupled receptor that activates adenylyl cyclase. What is the second messenger?', ['cAMP', 'IP₃', 'Ca²⁺ from the ER', 'Tyrosine phosphate'],
  ['IP₃ comes from the phospholipase C (Gq) branch, not adenylyl cyclase.', 'Ca²⁺ is released by IP₃, a different branch.', 'Phosphotyrosine docking belongs to receptor tyrosine kinases.'],
  'Gs swaps GDP for GTP, activates adenylyl cyclase, and cAMP activates protein kinase A. Epinephrine and glucagon work this way.', { cat: '3A', hy: true, cs: ['cs-second-messenger'] });
C('b-signal', 'gq', 'A Gq-coupled receptor activates phospholipase C. What happens next?', ['PIP₂ is split into IP₃, which releases Ca²⁺ from the ER, and DAG, which activates protein kinase C', 'ATP is converted to cAMP', 'The receptor phosphorylates itself on tyrosines', 'An ion channel in the receptor opens'],
  ['That is the Gs / adenylyl cyclase branch.', 'That is a receptor tyrosine kinase.', 'That is a ligand-gated ion channel.'],
  'Two messengers from one lipid: IP₃ (soluble, to the ER) and DAG (stays in the membrane).', { cat: '3A', sk: 2, cs: ['cs-second-messenger'] });
C('b-signal', 'rtk', 'How does a receptor tyrosine kinase such as the insulin receptor pass on its signal?', ['Ligand binding brings receptor halves together and they phosphorylate each other\'s tyrosines', 'It activates a G protein', 'It opens a channel for Na⁺', 'It moves into the nucleus and binds DNA'],
  ['That is a GPCR.', 'That is a ligand-gated ion channel.', 'That is how intracellular (steroid) receptors act.'],
  'The phosphotyrosines become docking sites for signaling proteins (for example the Ras–MAP kinase pathway).', { cat: '3A', hy: true, cs: ['cs-receptor-type'] });
C('b-signal', 'fastest', 'Which receptor type gives the fastest response, within milliseconds?', ['A ligand-gated ion channel', 'A G protein-coupled receptor', 'A receptor tyrosine kinase', 'An intracellular steroid receptor'],
  ['GPCRs need several enzyme steps: seconds.', 'Kinase cascades take seconds to minutes.', 'Changing gene expression takes hours.'],
  'Binding opens the channel directly, as when acetylcholine opens nicotinic receptors at the neuromuscular junction.', { cat: '3A', cs: ['cs-receptor-type'] });
T('b-signal', 'paracrine', 'A signal that acts on nearby cells, without traveling through the blood, is called ___ signaling.', ['paracrine'],
  'Paracrine. Autocrine acts on the cell that made it; endocrine travels in the blood; synaptic crosses a synapse.', { cs: ['cs-signal-range'] });
C('b-signal', 'amplify', 'One hormone molecule can lead to thousands of product molecules inside a cell. This is because:', ['Each step of the cascade activates many molecules of the next', 'The hormone is copied inside the cell', 'Receptors divide when activated', 'Second messengers are made by the ribosome'],
  ['Hormones are not copied.', 'Receptors do not divide.', 'cAMP and IP₃ are made by enzymes, not ribosomes.'],
  'Signal amplification: one receptor activates many G proteins, each adenylyl cyclase makes many cAMP, each kinase phosphorylates many targets.', { cat: '3A' });
C('b-signal', 'pde', 'Caffeine inhibits phosphodiesterase. What happens to cAMP signaling?', ['It lasts longer, because cAMP is broken down more slowly', 'It stops, because no cAMP is made', 'Nothing: phosphodiesterase makes cAMP', 'Receptors are destroyed'],
  ['Adenylyl cyclase still makes cAMP.', 'Phosphodiesterase breaks cAMP down; adenylyl cyclase makes it.', 'Receptors are unaffected.'],
  'Signals are switched off by breaking down messengers (phosphodiesterase) and by Gα hydrolyzing its own GTP.', { cat: '3A', sk: 2 });

/* ---------- Synapses & the nervous system (3A) ---------- */
C('b-nerve', 'ca-release', 'What directly triggers neurotransmitter release at an axon terminal?', ['Ca²⁺ entering through voltage-gated channels', 'Na⁺ entering the terminal', 'K⁺ leaving the terminal', 'Neurotransmitter binding to the terminal'],
  ['Na⁺ drives the action potential that arrives, but not vesicle fusion itself.', 'K⁺ efflux repolarizes the membrane.', 'Release comes before binding.'],
  'The action potential opens Ca²⁺ channels; Ca²⁺ lets vesicles fuse with the membrane and release their contents by exocytosis.', { hy: true, cs: ['cs-synapse'] });
C('b-nerve', 'ipsp', 'An inhibitory postsynaptic potential (IPSP) usually results from:', ['Cl⁻ entering or K⁺ leaving the cell, making the membrane more negative', 'Na⁺ entering the cell', 'Ca²⁺ entering the dendrite', 'The Na⁺/K⁺ pump stopping'],
  ['Na⁺ entry depolarizes: that is an EPSP.', 'Ca²⁺ entry depolarizes too.', 'Stopping the pump would slowly depolarize the cell.'],
  'Hyperpolarization moves the membrane away from threshold. GABA and glycine are classic inhibitory transmitters.', { cs: ['cs-synapse'] });
C('b-nerve', 'summation', 'Several EPSPs arriving at once from different synapses add together to reach threshold. This is:', ['Spatial summation', 'Temporal summation', 'Saltatory conduction', 'Facilitated diffusion'],
  ['Temporal summation is repeated input from one synapse in quick succession.', 'That is how myelinated axons conduct.', 'That is membrane transport.'],
  'Neurons integrate inputs at the axon hillock: spatial summation adds across synapses, temporal adds over time.', { sk: 2, cs: ['cs-synapse'] });
C('b-nerve', 'ache', 'A drug inhibits acetylcholinesterase. At the neuromuscular junction, this:', ['Prolongs acetylcholine\'s action, so stimulation lasts longer', 'Blocks acetylcholine release', 'Blocks acetylcholine receptors', 'Has no effect'],
  ['Release depends on Ca²⁺ entry, which is unaffected.', 'That is how curare works, the opposite effect.', 'The enzyme normally clears ACh within milliseconds.'],
  'Acetylcholinesterase breaks ACh down in the synaptic cleft. Inhibitors (some nerve agents and myasthenia gravis drugs) let ACh linger.', { sk: 2 });
C('b-nerve', 'sympathetic', 'Which response is driven by the sympathetic nervous system?', ['Pupils dilate and heart rate rises', 'Digestion speeds up', 'The bronchioles constrict', 'The heart slows'],
  ['Digestion is a parasympathetic, "rest and digest" function.', 'Sympathetic activity dilates the airways.', 'Slowing the heart is parasympathetic (vagus nerve).'],
  'Fight or flight: more heart rate and blood glucose, dilated pupils and airways, digestion paused.', { hy: true, cs: ['cs-autonomic'] });
C('b-nerve', 'parasym-nt', 'What neurotransmitter do postganglionic parasympathetic neurons release?', ['Acetylcholine', 'Norepinephrine', 'Epinephrine', 'Dopamine'],
  ['Most postganglionic sympathetic neurons release norepinephrine.', 'Epinephrine comes mainly from the adrenal medulla.', 'Dopamine acts mostly in the brain.'],
  'All preganglionic autonomic neurons use ACh; postganglionic parasympathetic neurons use ACh too.', { cs: ['cs-autonomic'] });
C('b-nerve', 'glia', 'Which cells make myelin in the peripheral nervous system?', ['Schwann cells', 'Oligodendrocytes', 'Astrocytes', 'Microglia'],
  ['Oligodendrocytes myelinate axons in the central nervous system.', 'Astrocytes support neurons and help form the blood–brain barrier.', 'Microglia are the CNS\'s immune cells.'],
  'One Schwann cell wraps one segment of one axon; one oligodendrocyte can myelinate segments of many axons.', { hy: true, cs: ['cs-glia'] });
C('b-nerve', 'roots', 'In the spinal cord, sensory (afferent) fibers enter through the:', ['Dorsal root', 'Ventral root', 'Brainstem only', 'Sympathetic chain only'],
  ['The ventral root carries motor (efferent) fibers out.', 'Spinal sensory input enters at every level.', 'The sympathetic chain is autonomic, not the main sensory entry.'],
  'Dorsal in, ventral out. Sensory cell bodies sit in the dorsal root ganglia.');
C('b-nerve', 'reflex', 'The knee-jerk reflex works without the brain because:', ['The sensory neuron synapses directly on a motor neuron in the spinal cord', 'Muscles contract on their own when stretched', 'The brainstem controls it', 'Interneurons in the brain relay it'],
  ['The muscle contracts because a motor neuron fires.', 'The reflex arc closes in the spinal cord.', 'The brain is not in the loop, though it is informed afterward.'],
  'A monosynaptic reflex arc: stretch receptor → sensory neuron → spinal motor neuron → quadriceps.', { sk: 2 });

/* ---------- Endocrine glands & feedback (3A) ---------- */
C('b-endo', 'posterior', 'Which hormones are released from the posterior pituitary?', ['ADH and oxytocin', 'FSH and LH', 'TSH and ACTH', 'Growth hormone and prolactin'],
  ['These come from the anterior pituitary.', 'These come from the anterior pituitary.', 'These come from the anterior pituitary.'],
  'Both are made in the hypothalamus and travel down axons to the posterior pituitary, which stores and releases them.', { hy: true, cs: ['cs-pituitary'] });
C('b-endo', 'anterior', 'Which hormone does the anterior pituitary release?', ['ACTH', 'Oxytocin', 'ADH', 'Cortisol'],
  ['Oxytocin is released from the posterior pituitary.', 'ADH is released from the posterior pituitary.', 'Cortisol comes from the adrenal cortex (in response to ACTH).'],
  'Anterior pituitary: FSH, LH, ACTH, TSH, prolactin, growth hormone. It is controlled by hypothalamic releasing hormones through the portal blood vessels.', { cs: ['cs-pituitary'] });
C('b-endo', 'thyroid-fb', 'In primary hypothyroidism the thyroid itself fails. What do you expect for TSH?', ['High, because low thyroid hormone removes negative feedback', 'Low, because the thyroid is not responding', 'Normal', 'Zero'],
  ['Low TSH would mean the pituitary is the problem (secondary).', 'Feedback changes TSH.', 'The pituitary keeps secreting TSH.'],
  'T₃/T₄ normally inhibit TRH and TSH release. Without them, the pituitary drives TSH up.', { sk: 2, hy: true });
C('b-endo', 'cortisol', 'Cortisol, released during prolonged stress, tends to:', ['Raise blood glucose and suppress the immune response', 'Lower blood glucose', 'Increase water excretion', 'Lower blood calcium'],
  ['It raises glucose through gluconeogenesis.', 'That is not its role.', 'That is calcitonin\'s small effect.'],
  'A glucocorticoid from the adrenal cortex (zona fasciculata), released in response to ACTH.', { hy: true, cs: ['cs-adrenal'] });
C('b-endo', 'medulla', 'Epinephrine is secreted by the:', ['Adrenal medulla', 'Adrenal cortex', 'Anterior pituitary', 'Thyroid'],
  ['The cortex makes steroids: cortisol, aldosterone and androgens.', 'The pituitary releases peptide hormones that control other glands.', 'The thyroid makes T₃, T₄ and calcitonin.'],
  'The adrenal medulla is modified sympathetic tissue, releasing epinephrine and norepinephrine within seconds.', { cs: ['cs-adrenal'] });
C('b-endo', 'thyroid-role', 'What is the main effect of thyroid hormone (T₃/T₄)?', ['It raises basal metabolic rate', 'It lowers blood calcium', 'It controls water reabsorption', 'It triggers ovulation'],
  ['Calcitonin, also from the thyroid, lowers calcium slightly.', 'That is ADH.', 'That is the LH surge.'],
  'T₃/T₄ increase oxygen use and heat production in most tissues. They need iodine.');
C('b-endo', 'pth', 'When blood calcium falls, parathyroid hormone:', ['Raises calcium: bone resorption, kidney reabsorption and vitamin D activation', 'Lowers calcium further', 'Builds bone to store calcium', 'Has no effect on the kidney'],
  ['PTH responds to low calcium by raising it.', 'PTH mobilizes calcium from bone.', 'It acts strongly on the kidney.'],
  'Calcitonin opposes PTH. Active vitamin D (calcitriol) raises calcium absorption in the gut.', { hy: true, cs: ['cs-calcium'] });
C('b-endo', 'releasing', 'How do hypothalamic releasing hormones reach the anterior pituitary?', ['Through the hypophyseal portal blood vessels', 'Down the axons of the pituitary stalk', 'Through the general circulation', 'Through the cerebrospinal fluid'],
  ['Axons carry ADH and oxytocin to the posterior pituitary.', 'The portal system delivers them directly, before dilution in the body\'s blood.', 'Not the route.'],
  'A portal system links two capillary beds, so small amounts of releasing hormone arrive concentrated.', { cs: ['cs-pituitary'] });
T('b-endo', 'melatonin', 'Which gland secretes melatonin, which helps regulate sleep?', ['pineal gland', 'pineal', 'the pineal gland'],
  'The pineal gland, which releases more melatonin in the dark.');

/* ---------- Heart, blood & circulation (3B) ---------- */
T('b-circ', 'sa', 'Which structure sets the normal heart rate?', ['sa node', 'sinoatrial node', 'sinoatrial', 'the sa node', 'sa'],
  'The sinoatrial (SA) node in the right atrium: its cells depolarize on their own.', { hy: true, cs: ['cs-conduction'] });
C('b-circ', 'av', 'Why does the AV node delay the impulse?', ['So the atria finish contracting and the ventricles fill before they contract', 'To speed up the heart', 'To prevent the SA node from firing', 'To let the valves open during systole'],
  ['The delay slows conduction; it does not set rate.', 'The SA node keeps firing regularly.', 'The delay is about filling, not valve timing directly.'],
  'Conduction path: SA node → atria → AV node (delay) → bundle of His → Purkinje fibers → ventricles.', { cs: ['cs-conduction'] });
C('b-circ', 'velocity', 'Where is blood flow slowest?', ['Capillaries', 'Aorta', 'Large veins', 'Arterioles'],
  ['The aorta has the smallest total cross-section and the fastest flow.', 'Veins collect blood into fewer, larger vessels, and it speeds up again.', 'Arterioles are where pressure drops most, not where flow is slowest.'],
  'Capillaries have the largest total cross-sectional area, so blood moves slowest there, leaving time for exchange (continuity: Av = constant).', { sk: 2, hy: true });
C('b-circ', 'starling', 'At the arterial end of a capillary, fluid leaves the vessel mainly because:', ['Hydrostatic pressure exceeds oncotic pressure', 'Oncotic pressure exceeds hydrostatic pressure', 'Proteins are pumped out', 'Lymph pulls it out'],
  ['That describes the venous end, where fluid returns.', 'Plasma proteins mostly stay inside.', 'Lymph collects the excess later.'],
  'Starling forces: blood pressure pushes fluid out; plasma proteins (oncotic pressure) pull it back. Low plasma protein causes edema.', { sk: 2, cs: ['cs-starling'] });
C('b-circ', 'lymph', 'What does the lymphatic system do with excess interstitial fluid?', ['Returns it to the blood near the heart', 'Excretes it in urine', 'Stores it in the spleen', 'Converts it to plasma proteins'],
  ['The kidney excretes water from blood, not lymph directly.', 'The spleen filters blood; it does not store lymph.', 'Fluid is not converted.'],
  'Lymph drains into the subclavian veins. Lacteals in the gut also carry absorbed fats as chylomicrons.', { cs: ['cs-starling'] });
C('b-circ', 'epo', 'Which organ releases erythropoietin when blood oxygen is low?', ['Kidney', 'Liver', 'Bone marrow', 'Spleen'],
  ['The liver makes most plasma proteins.', 'Bone marrow responds to EPO by making red cells.', 'The spleen removes old red cells.'],
  'Low O₂ delivery to the kidney → EPO → more red blood cells. This is why kidney disease often causes anemia.', { hy: true });
C('b-circ', 'type-o', 'Why can type O red cells be given to patients of any ABO type?', ['They carry neither A nor B antigens', 'They carry both A and B antigens', 'Type O plasma has no antibodies', 'Type O cells are Rh-negative'],
  ['That is type AB, the universal recipient.', 'Type O plasma has both anti-A and anti-B antibodies.', 'Rh status is separate from ABO.'],
  'Recipients\' antibodies attack donor antigens; type O cells offer none to attack.', { hy: true });
C('b-circ', 'fetal-hb', 'Compared with adult hemoglobin, fetal hemoglobin:', ['Binds O₂ more tightly, so it can take O₂ from the mother\'s blood', 'Binds O₂ less tightly', 'Cannot bind O₂', 'Binds CO₂ instead of O₂'],
  ['Lower affinity would hand O₂ back to the mother.', 'It carries O₂ normally.', 'It carries O₂.'],
  'Its curve is shifted left, partly because fetal hemoglobin binds 2,3-BPG weakly.', { cs: ['cs-o2-curve'] });
C('b-circ', 'clot', 'In blood clotting, thrombin converts:', ['Fibrinogen into fibrin', 'Fibrin into fibrinogen', 'Platelets into red cells', 'Plasminogen into thrombin'],
  ['The reverse.', 'Platelets come from megakaryocytes.', 'Plasminogen becomes plasmin, which dissolves clots.'],
  'Fibrin threads stabilize the platelet plug.');
C('b-circ', 's1', 'The first heart sound ("lub") is caused by:', ['The AV valves closing as the ventricles start to contract', 'The semilunar valves closing', 'The atria contracting', 'Blood entering the aorta'],
  ['That is the second sound ("dub"), at the start of diastole.', 'Atrial contraction is normally silent.', 'Ejection itself is not the sound.'],
  'S1 marks the start of ventricular systole; S2 marks its end.');
G('b-circ', 'g-co', 'Cardiac output', rnd => {
  const hr = pickR(rnd, [60, 70, 75, 80, 120]), sv = pickR(rnd, [60, 70, 80, 100]);
  return { prompt: `Heart rate is ${hr} beats/min and stroke volume is ${sv} mL. What is cardiac output, in L/min?`, value: hr * sv / 1000, tolPct: 2, unit: 'L/min',
    expl: `CO = HR × SV = ${hr} × ${sv} mL = ${hr * sv} mL/min = ${sig(hr * sv / 1000)} L/min.` };
}, { hy: true, sk: 1 });

/* ---------- Breathing & gas exchange (3B) ---------- */
C('b-resp', 'inhale', 'During a normal inhalation:', ['The diaphragm contracts, chest volume rises and lung pressure falls below atmospheric', 'The diaphragm relaxes and pushes air in', 'Air is pumped in by positive pressure', 'Lung pressure rises above atmospheric'],
  ['The diaphragm relaxes during exhalation.', 'Breathing on your own is negative-pressure breathing.', 'That happens during exhalation.'],
  'Boyle\'s law: bigger volume, lower pressure, so air flows in. Quiet exhalation is passive recoil.', { hy: true, cs: ['cs-breathing'] });
C('b-resp', 'surfactant', 'What does pulmonary surfactant do?', ['Lowers surface tension so alveoli don\'t collapse', 'Kills inhaled bacteria', 'Carries O₂ across the membrane', 'Raises surface tension to help exhalation'],
  ['Alveolar macrophages handle microbes.', 'O₂ crosses by diffusion.', 'It lowers surface tension.'],
  'Made by type II pneumocytes. Premature infants may lack it (respiratory distress syndrome).');
C('b-resp', 'drive', 'What normally drives the urge to breathe most strongly?', ['Rising CO₂ (sensed through falling pH)', 'Falling O₂ at normal altitude', 'Rising blood glucose', 'Rising blood pressure'],
  ['Low O₂ becomes a strong driver only when it falls well below normal.', 'Not a respiratory signal.', 'Not the main driver.'],
  'Central chemoreceptors in the medulla respond to CO₂ via the pH of cerebrospinal fluid.', { hy: true });
C('b-resp', 'hypervent', 'Hyperventilation leads to:', ['Respiratory alkalosis, from blowing off CO₂', 'Respiratory acidosis', 'Metabolic acidosis', 'No change in pH'],
  ['Acidosis follows hypoventilation (CO₂ builds up).', 'The cause here is respiratory.', 'Lower CO₂ shifts CO₂ + H₂O ⇌ H⁺ + HCO₃⁻ left, lowering H⁺.'],
  'Less CO₂ means less carbonic acid, so pH rises.', { sk: 2, hy: true, cs: ['cs-acid-base-body'] });
C('b-resp', 'co', 'Why is carbon monoxide so dangerous?', ['It binds hemoglobin far more tightly than O₂ does, blocking O₂ transport', 'It destroys red blood cells', 'It blocks the airways', 'It lowers blood pressure'],
  ['Red cells survive; their hemoglobin is occupied.', 'It is a transport problem, not airflow.', 'Not the main mechanism.'],
  'CO binds with roughly 200–250 times O₂\'s affinity and also shifts the curve left, so the remaining O₂ is unloaded poorly.');
T('b-resp', 'residual', 'The air left in the lungs after the most forceful exhalation is the ___ volume.', ['residual', 'residual volume'],
  'Residual volume: it keeps alveoli open. Vital capacity is the most you can exhale after a full breath.');
C('b-resp', 'diffusion', 'O₂ moves from alveoli into the blood by:', ['Simple diffusion down its partial-pressure gradient', 'Active transport', 'Facilitated diffusion through carriers', 'Bulk flow through pores'],
  ['No ATP-driven pump is involved.', 'O₂ crosses the membranes directly.', 'Exchange happens across cell membranes, not pores.'],
  'Alveolar P_O₂ (about 100 mmHg) exceeds that of venous blood (about 40 mmHg).');

/* ---------- Digestion & absorption (3B) ---------- */
C('b-digest', 'parietal', 'Gastric parietal cells secrete:', ['HCl and intrinsic factor', 'Pepsinogen', 'Bicarbonate', 'Gastrin'],
  ['Chief cells secrete pepsinogen.', 'The pancreas (and surface mucus cells) secrete bicarbonate.', 'G cells secrete gastrin, which stimulates parietal cells.'],
  'Intrinsic factor is needed to absorb vitamin B₁₂ in the ileum.', { hy: true, cs: ['cs-gi-cells'] });
C('b-digest', 'trypsin', 'How is pancreatic trypsinogen activated?', ['Enteropeptidase on the small-intestine lining cleaves it to trypsin', 'Stomach acid activates it', 'Bile activates it', 'It is active as soon as it is made'],
  ['Pepsinogen is the one activated by acid.', 'Bile emulsifies fats; it does not activate proteases.', 'It is made inactive to protect the pancreas.'],
  'Trypsin then activates the other pancreatic zymogens.', { sk: 2 });
C('b-digest', 'bile', 'Bile is made by the ___ and helps digestion by ___.', ['Liver; emulsifying fats', 'Gallbladder; digesting proteins', 'Pancreas; emulsifying fats', 'Liver; digesting fats enzymatically'],
  ['The gallbladder only stores and concentrates bile, and bile does not digest protein.', 'The pancreas makes enzymes and bicarbonate, not bile.', 'Bile contains no digestive enzymes; lipase does the chemistry.'],
  'Bile salts break fat into small droplets, giving pancreatic lipase more surface to work on.', { hy: true });
C('b-digest', 'cck', 'Fat entering the duodenum triggers release of:', ['Cholecystokinin (CCK), which contracts the gallbladder and stimulates pancreatic enzymes', 'Secretin, which mainly stimulates bicarbonate release', 'Gastrin, which increases stomach acid', 'Insulin'],
  ['Secretin responds mainly to acid.', 'Gastrin comes from the stomach in response to food there.', 'Insulin responds to glucose.'],
  'CCK also slows stomach emptying, giving fat more time to be digested.', { cs: ['cs-gi-hormones'] });
C('b-digest', 'secretin', 'Acidic chyme entering the duodenum triggers secretin, which causes:', ['The pancreas to release bicarbonate-rich fluid', 'The gallbladder to contract', 'More HCl secretion', 'Insulin release'],
  ['That is mainly CCK.', 'Secretin reduces stomach acid secretion.', 'Not secretin\'s role.'],
  'Bicarbonate neutralizes the acid so pancreatic enzymes can work.', { cs: ['cs-gi-hormones'] });
C('b-digest', 'chylomicron', 'After absorption, most dietary fats reach the blood by:', ['Packaging into chylomicrons that enter the lacteals (lymph)', 'Direct entry into the hepatic portal vein', 'Diffusion into capillaries as free fatty acids', 'Binding to hemoglobin'],
  ['Sugars and amino acids go to the portal vein; long-chain fats do not.', 'They are reassembled into triglycerides first.', 'Hemoglobin carries gases.'],
  'Chylomicrons travel through the lymphatics and enter the blood at the thoracic duct.', { hy: true });
C('b-digest', 'large-int', 'What is the main job of the large intestine?', ['Absorbing water and electrolytes', 'Digesting proteins', 'Absorbing most nutrients', 'Making bile'],
  ['Protein digestion happens in the stomach and small intestine.', 'The small intestine absorbs most nutrients.', 'The liver makes bile.'],
  'Gut bacteria there also produce vitamin K and some B vitamins.');
C('b-digest', 'glucagon', 'During fasting, glucagon raises blood glucose by:', ['Stimulating glycogen breakdown and gluconeogenesis in the liver', 'Stimulating glucose uptake into muscle', 'Stimulating glycogen synthesis', 'Slowing fat breakdown'],
  ['That is insulin.', 'That is insulin.', 'Glucagon promotes fat breakdown.'],
  'Released by pancreatic α cells. Muscle lacks glucagon receptors, so muscle glycogen serves the muscle itself.', { hy: true });
T('b-digest', 'amylase', 'Which enzyme in saliva starts starch digestion?', ['amylase', 'salivary amylase', 'alpha-amylase', 'ptyalin'],
  'Salivary amylase. Pancreatic amylase finishes the job in the small intestine.');

/* ---------- Immune system (3B) ---------- */
C('b-immune', 'innate', 'Which belongs to the innate immune system?', ['Neutrophils', 'B cells', 'Helper T cells', 'Memory cells'],
  ['B cells are adaptive: specific antibodies and memory.', 'T cells are adaptive.', 'Memory is a hallmark of adaptive immunity.'],
  'Innate defenses (skin, neutrophils, macrophages, NK cells, complement) are fast and nonspecific, with no memory.', { hy: true, cs: ['cs-innate-adaptive'] });
C('b-immune', 'mhc2', 'Helper T cells (CD4⁺) recognize antigen presented on:', ['MHC class II on antigen-presenting cells', 'MHC class I on all nucleated cells', 'Free antigen in the blood', 'Antibodies'],
  ['MHC I is read by cytotoxic (CD8⁺) T cells.', 'T cells need antigen presented on MHC; B cells bind free antigen.', 'Antibodies are made by B cells.'],
  'Dendritic cells, macrophages and B cells present ingested antigen on MHC II.', { hy: true, cs: ['cs-mhc'] });
C('b-immune', 'mhc1', 'A virus-infected cell is killed by a cytotoxic T cell. What did the T cell recognize?', ['A viral peptide on MHC class I', 'A viral peptide on MHC class II', 'An antibody on the cell', 'Complement on the cell'],
  ['MHC II is found on antigen-presenting cells and read by helper T cells.', 'T cell receptors read peptides on MHC, not antibodies.', 'Complement does not activate T cells this way.'],
  'Every nucleated cell shows samples of its own proteins on MHC I, so infected cells display viral peptides.', { cs: ['cs-mhc'] });
C('b-immune', 'maturation', 'Where do T cells mature?', ['Thymus', 'Bone marrow', 'Spleen', 'Lymph nodes'],
  ['B cells mature in the bone marrow; T cells start there but mature in the thymus.', 'The spleen filters blood and hosts immune responses.', 'Lymph nodes are where mature lymphocytes meet antigen.'],
  'In the thymus, T cells that would attack self are eliminated (negative selection).', { hy: true });
C('b-immune', 'plasma', 'Which cells secrete antibodies?', ['Plasma cells (activated B cells)', 'Helper T cells', 'Macrophages', 'Neutrophils'],
  ['Helper T cells release cytokines that help B cells.', 'Macrophages engulf and present antigen.', 'Neutrophils engulf bacteria.'],
  'Each plasma cell makes one antibody specificity, inherited from the B cell clone it came from.', { cs: ['cs-b-t'] });
C('b-immune', 'antibody', 'Which part of an antibody binds the antigen?', ['The variable regions at the tips of the heavy and light chains', 'The constant region of the heavy chain', 'The disulfide bonds', 'The hinge only'],
  ['The constant region sets the class (IgG, IgM…) and engages immune cells.', 'Disulfide bonds hold the chains together.', 'The hinge gives flexibility.'],
  'Two identical heavy and two identical light chains; the variable regions form two identical antigen-binding sites.');
C('b-immune', 'secondary', 'Why is the response to a second exposure (or after a vaccine) faster and stronger?', ['Memory B and T cells specific to the antigen already exist', 'The antigen is weaker the second time', 'Innate immunity has learned', 'Antibodies from the first response last forever'],
  ['The antigen is the same.', 'Innate immunity has no antigen-specific memory.', 'Antibody levels fall over time; memory cells persist.'],
  'Clonal selection expanded the matching clones the first time; memory cells remain for years.', { hy: true });
C('b-immune', 'clonal', 'Clonal selection means that:', ['An antigen activates the lymphocytes whose receptors already match it, and they multiply', 'Lymphocytes change their receptors to fit each new antigen', 'All lymphocytes respond to every antigen', 'Antigens are copied by B cells'],
  ['Receptor diversity is generated beforehand, by gene rearrangement.', 'Each lymphocyte has one specificity.', 'Antigens are not copied.'],
  'The antigen selects pre-existing clones; it does not instruct new ones.', { sk: 2 });
C('b-immune', 'ige', 'Allergic reactions involve which antibody class, bound to mast cells?', ['IgE', 'IgG', 'IgA', 'IgM'],
  ['IgG is the main circulating antibody and crosses the placenta.', 'IgA protects mucous membranes and is in breast milk.', 'IgM is made first in a response.'],
  'Allergen cross-links IgE on mast cells, which release histamine.', { cs: ['cs-ig-class'] });
C('b-immune', 'igg', 'Which antibody class crosses the placenta to protect the fetus?', ['IgG', 'IgM', 'IgE', 'IgD'],
  ['IgM is a large pentamer and does not cross.', 'IgE mediates allergy.', 'IgD sits on naive B cells.'],
  'This is passive immunity: protective, but with no memory, and it fades over months.', { cs: ['cs-ig-class'] });
C('b-immune', 'nk', 'Natural killer cells destroy cells that:', ['Display too little MHC class I', 'Display too much MHC class II', 'Are coated in IgE', 'Have divided recently'],
  ['MHC II is on antigen-presenting cells normally.', 'IgE-coated mast cells are not their targets.', 'Division alone is not a trigger.'],
  'Some viruses and tumors hide from cytotoxic T cells by lowering MHC I; NK cells catch exactly those.', { sk: 2, cs: ['cs-innate-adaptive'] });
C('b-immune', 'hiv', 'HIV weakens the whole adaptive immune response because it destroys:', ['CD4⁺ helper T cells', 'Red blood cells', 'Neutrophils', 'Plasma cells only'],
  ['HIV does not infect red cells.', 'Neutrophils are innate and not the main target.', 'Plasma cells are not its main target.'],
  'Helper T cells coordinate both B cell and cytotoxic T cell responses.', { hy: true });

/* ---------- Muscle & bone (3B) ---------- */
C('b-muscle', 'troponin', 'In skeletal muscle, Ca²⁺ triggers contraction by binding to:', ['Troponin, which moves tropomyosin off myosin-binding sites on actin', 'Myosin, which then binds ATP', 'Actin directly', 'Calmodulin'],
  ['Ca²⁺ does not bind myosin in skeletal muscle.', 'Ca²⁺ acts through the troponin–tropomyosin complex.', 'Calmodulin is the Ca²⁺ sensor in smooth muscle.'],
  'With binding sites exposed, myosin heads can form cross-bridges.', { hy: true, cs: ['cs-muscle-type'] });
C('b-muscle', 'atp-release', 'In the cross-bridge cycle, ATP binding to myosin:', ['Releases myosin from actin', 'Causes the power stroke', 'Exposes the binding sites on actin', 'Pumps Na⁺ into the cell'],
  ['The power stroke comes with phosphate release.', 'That is Ca²⁺ binding troponin.', 'Not myosin\'s job.'],
  'Without ATP, myosin stays locked to actin: rigor mortis.', { hy: true, sk: 2 });
C('b-muscle', 'sarcomere', 'When a sarcomere contracts, which band stays the same length?', ['The A band', 'The I band', 'The H zone', 'The whole sarcomere'],
  ['The I band (actin only) shortens.', 'The H zone (myosin only) shortens.', 'The sarcomere shortens.'],
  'The A band is the length of the myosin filaments, which do not change; the filaments slide past each other.', { sk: 2 });
C('b-muscle', 'ttubule', 'What do T-tubules do in a muscle fiber?', ['Carry the action potential deep into the fiber to trigger Ca²⁺ release from the sarcoplasmic reticulum', 'Store calcium', 'Make ATP', 'Connect neighboring fibers'],
  ['The sarcoplasmic reticulum stores Ca²⁺.', 'Mitochondria make ATP.', 'Skeletal fibers are not linked by T-tubules.'],
  'This lets the whole fiber contract at once.');
C('b-muscle', 'smooth', 'In smooth muscle, Ca²⁺ triggers contraction by binding:', ['Calmodulin, which activates myosin light-chain kinase', 'Troponin', 'Tropomyosin', 'Actin'],
  ['Smooth muscle lacks troponin.', 'Ca²⁺ does not bind tropomyosin.', 'Ca²⁺ does not bind actin.'],
  'Phosphorylating the myosin head allows cross-bridges to form.', { cs: ['cs-muscle-type'] });
C('b-muscle', 'motor-unit', 'How does the nervous system make a muscle contract more forcefully?', ['By recruiting more motor units and firing them faster', 'By making each fiber contract more strongly on its own', 'By adding new muscle fibers', 'By releasing more Ca²⁺ into the blood'],
  ['Each fiber follows an all-or-none twitch to a single stimulus.', 'Fiber number does not change during a contraction.', 'Blood calcium is not the control.'],
  'Recruitment of more motor units plus higher firing rates (summation) increases force.');
C('b-muscle', 'slow-twitch', 'Type I (slow-twitch) muscle fibers are:', ['Rich in mitochondria and myoglobin, and fatigue-resistant', 'Fast, glycolytic and quick to fatigue', 'Found only in the heart', 'Unable to use oxygen'],
  ['That describes type IIx fast-twitch fibers.', 'They are skeletal muscle fibers.', 'They depend on aerobic metabolism.'],
  'Marathon runners have a higher proportion; sprinters, more fast-twitch fibers.');
C('b-muscle', 'osteo', 'Which cells break down bone and release calcium?', ['Osteoclasts', 'Osteoblasts', 'Osteocytes', 'Chondrocytes'],
  ['Osteoblasts build bone.', 'Osteocytes maintain bone from inside it.', 'Chondrocytes make cartilage.'],
  'Clasts cut, blasts build. PTH increases osteoclast activity (indirectly, via osteoblasts).', { hy: true, cs: ['cs-calcium'] });
C('b-muscle', 'nmj', 'At the neuromuscular junction, the motor neuron releases:', ['Acetylcholine', 'Norepinephrine', 'Dopamine', 'GABA'],
  ['Norepinephrine is released by most sympathetic postganglionic neurons.', 'Dopamine acts mainly in the brain.', 'GABA is inhibitory in the CNS.'],
  'ACh opens nicotinic receptors on the muscle fiber, depolarizing it.');
C('b-muscle', 'calcitonin', 'Calcitonin, from the thyroid, tends to:', ['Lower blood calcium by reducing bone resorption', 'Raise blood calcium', 'Activate vitamin D', 'Increase osteoclast activity'],
  ['That is PTH.', 'That is PTH\'s effect in the kidney.', 'That is the opposite.'],
  'Calcitonin opposes PTH; its effect in adults is modest.', { cs: ['cs-calcium'] });

/* ---------- Reproduction & development (2C / 3B) ---------- */
C('b-repro', 'oogenesis', 'Meiosis in a woman produces from one primary oocyte:', ['One egg, plus small polar bodies that degenerate', 'Four eggs', 'Two eggs', 'One egg and nothing else'],
  ['That is spermatogenesis (four sperm).', 'Unequal division gives one large egg.', 'The other meiotic products become polar bodies.'],
  'Unequal cytokinesis keeps most cytoplasm in the egg. There are two polar bodies, or three if the first one also divides.', { cat: '2C', hy: true, cs: ['cs-gametogenesis'] });
C('b-repro', 'arrest', 'At ovulation, the secondary oocyte is arrested in:', ['Metaphase II, completing meiosis only if fertilized', 'Prophase I', 'Interphase', 'Anaphase I'],
  ['Primary oocytes wait in prophase I from before birth until puberty.', 'It has already begun meiosis.', 'Meiosis I is finished at ovulation.'],
  'Two arrests: prophase I (until a follicle matures) and metaphase II (until fertilization).', { cat: '2C', sk: 2, cs: ['cs-gametogenesis'] });
C('b-repro', 'lh-surge', 'What triggers ovulation?', ['A surge of LH', 'A drop in estrogen', 'A rise in progesterone', 'hCG from the embryo'],
  ['Estrogen rises before ovulation, which helps cause the LH surge.', 'Progesterone rises after ovulation (corpus luteum).', 'hCG appears only after implantation.'],
  'High estrogen switches to positive feedback, producing the mid-cycle LH (and FSH) surge.', { cat: '3B', hy: true, cs: ['cs-cycle'] });
C('b-repro', 'corpus', 'After ovulation, the corpus luteum secretes mainly:', ['Progesterone, which maintains the uterine lining', 'FSH', 'LH', 'Oxytocin'],
  ['FSH comes from the anterior pituitary.', 'LH comes from the anterior pituitary.', 'Oxytocin comes from the posterior pituitary.'],
  'If no pregnancy occurs, the corpus luteum regresses, progesterone falls and menstruation begins.', { cat: '3B', cs: ['cs-cycle'] });
C('b-repro', 'hcg', 'What keeps the corpus luteum alive in early pregnancy?', ['hCG made by the embryo', 'FSH', 'Estrogen from the mother\'s adrenal glands', 'Oxytocin'],
  ['FSH stimulates follicles, not the corpus luteum.', 'Not the rescue signal.', 'Oxytocin acts in labor and milk ejection.'],
  'hCG acts like LH. Pregnancy tests detect it.', { cat: '3B', hy: true, cs: ['cs-cycle'] });
C('b-repro', 'leydig', 'In the testes, LH stimulates:', ['Leydig cells to make testosterone', 'Sertoli cells to make sperm directly', 'The epididymis to store sperm', 'The prostate'],
  ['FSH acts on Sertoli cells, which support sperm development.', 'Storage is not under LH control.', 'Not LH\'s target.'],
  'LH → Leydig → testosterone; FSH → Sertoli → supports spermatogenesis.', { cat: '3B' });
C('b-repro', 'fert-site', 'Where does fertilization usually occur?', ['In the fallopian tube (oviduct)', 'In the uterus', 'In the ovary', 'In the vagina'],
  ['The embryo implants in the uterus about a week later.', 'The egg leaves the ovary at ovulation.', 'Sperm must travel much farther.'],
  'Usually in the ampulla of the fallopian tube.', { cat: '2C' });
C('b-repro', 'polyspermy', 'After one sperm enters the egg, what prevents others from fertilizing it?', ['The cortical reaction, which hardens the zona pellucida', 'The acrosome reaction', 'Cleavage', 'Implantation'],
  ['The acrosome reaction is the sperm releasing enzymes to reach the egg.', 'Cleavage happens after fertilization.', 'Implantation comes days later.'],
  'Cortical granules release enzymes that modify the zona so no further sperm can bind.', { cat: '2C', sk: 2 });
C('b-repro', 'germ-layers', 'Which germ layer gives rise to the nervous system and the epidermis?', ['Ectoderm', 'Mesoderm', 'Endoderm', 'Trophoblast'],
  ['Mesoderm gives muscle, bone, blood, heart and kidneys.', 'Endoderm gives the gut lining, lungs, liver and pancreas.', 'The trophoblast forms part of the placenta.'],
  'Gastrulation forms the three layers: "ecto = attract-o" (skin and nerves face the world).', { cat: '2C', hy: true, cs: ['cs-germ-layers'] });
C('b-repro', 'mesoderm', 'Which tissue comes from mesoderm?', ['Skeletal muscle', 'The lining of the gut', 'The brain', 'The lining of the lungs'],
  ['The gut lining is endoderm.', 'The brain is ectoderm.', 'The lung lining is endoderm.'],
  'Mesoderm: muscle, bone, connective tissue, blood, heart, kidneys, gonads.', { cat: '2C', cs: ['cs-germ-layers'] });
C('b-repro', 'cleavage', 'During cleavage, the early embryo:', ['Divides into more, smaller cells without growing overall', 'Grows rapidly in size', 'Forms three germ layers', 'Implants in the uterus'],
  ['Total size stays about the same at first.', 'That is gastrulation, later.', 'Implantation follows blastocyst formation.'],
  'Zygote → morula → blastocyst (inner cell mass + trophoblast) → implantation → gastrulation.', { cat: '2C' });
C('b-repro', 'induction', 'The notochord signals the overlying ectoderm to form the neural tube. This is an example of:', ['Induction', 'Apoptosis', 'Determination by cytoplasm alone', 'Dedifferentiation'],
  ['Apoptosis is programmed cell death (it sculpts fingers, for example).', 'Here the signal comes from neighboring tissue.', 'The ectoderm becomes more specialized, not less.'],
  'One tissue changes the fate of another through signals.', { cat: '2C' });

/* ---------- Evolution & population genetics (1C) ---------- */
C('b-evo', 'fitness', 'In evolutionary terms, the fittest individual is the one that:', ['Leaves the most surviving, fertile offspring', 'Is strongest', 'Lives longest', 'Is largest'],
  ['Strength helps only if it increases reproduction.', 'A long life without offspring has zero fitness.', 'Size is not fitness.'],
  'Fitness is relative reproductive success.', { hy: true });
C('b-evo', 'drift', 'Genetic drift has the biggest effect in:', ['Small populations', 'Large populations', 'Populations under strong selection', 'Populations with high gene flow'],
  ['Large populations average out chance events.', 'Selection is not chance.', 'Gene flow tends to keep populations similar.'],
  'Drift is random change in allele frequency; small samples swing more.', { hy: true, cs: ['cs-drift'] });
C('b-evo', 'bottleneck', 'A disaster kills most of a population, and the survivors happen to carry only a few alleles. This is:', ['A bottleneck effect', 'A founder effect', 'Directional selection', 'Gene flow'],
  ['The founder effect is a small group starting a new population elsewhere.', 'Survivors were random, not selected for traits.', 'No migration is involved.'],
  'Both bottlenecks and founder effects are forms of genetic drift.', { cs: ['cs-drift'] });
C('b-evo', 'founder', 'A few settlers start an isolated colony, which ends up with an unusual frequency of a rare disease allele. This is:', ['The founder effect', 'A bottleneck effect', 'Natural selection for the disease', 'Mutation'],
  ['A bottleneck shrinks an existing population in place.', 'The disease is not favored.', 'The allele was already present in a founder.'],
  'The founders\' alleles are a chance sample of the original population.', { cs: ['cs-drift'] });
C('b-evo', 'stabilizing', 'Human birth weight clusters near an average because very small and very large babies have lower survival. This is:', ['Stabilizing selection', 'Directional selection', 'Disruptive selection', 'Sexual selection'],
  ['Directional selection shifts the mean one way.', 'Disruptive selection favors both extremes.', 'Mate choice is not the mechanism here.'],
  'Selection against both extremes narrows variation around the mean.', { sk: 2, cs: ['cs-selection'] });
C('b-evo', 'disruptive', 'In a habitat with only very large and very small seeds, birds with medium beaks do worst. Over time, this leads to:', ['Disruptive selection, favoring both extremes', 'Stabilizing selection', 'Directional selection toward medium beaks', 'No change'],
  ['Stabilizing favors the middle.', 'Medium beaks are the ones losing.', 'Unequal survival changes the population.'],
  'Disruptive selection can split a population and contribute to speciation.', { sk: 2, cs: ['cs-selection'] });
C('b-evo', 'homologous', 'A human arm and a bat wing have the same bones in the same arrangement. They are:', ['Homologous structures, from a common ancestor', 'Analogous structures, from convergent evolution', 'Vestigial structures', 'Unrelated'],
  ['Analogous structures (bird wing vs insect wing) share function but not ancestry.', 'Both are fully functional.', 'Shared bone layout points to shared ancestry.'],
  'Homology = same origin, possibly different functions.', { cs: ['cs-homology'] });
C('b-evo', 'allopatric', 'A river splits a population in two, and over time the groups can no longer interbreed. This is:', ['Allopatric speciation', 'Sympatric speciation', 'Gene flow', 'Convergent evolution'],
  ['Sympatric speciation happens without a geographic barrier.', 'The barrier stops gene flow.', 'Convergence is unrelated groups becoming similar.'],
  'Separated groups accumulate different mutations, selection and drift.', { cs: ['cs-speciation'] });
C('b-evo', 'mule', 'A horse and a donkey produce a healthy but sterile mule. This is which kind of reproductive barrier?', ['Postzygotic (hybrid sterility)', 'Prezygotic (behavioral isolation)', 'Prezygotic (mechanical isolation)', 'No barrier'],
  ['They did mate, so mating behavior was not the barrier.', 'Mating worked mechanically.', 'Sterile hybrids keep the species separate.'],
  'Postzygotic barriers act after fertilization: hybrid inviability, sterility or breakdown.', { sk: 2, cs: ['cs-speciation'] });
C('b-evo', 'kin', 'A worker bee helps raise her sisters instead of reproducing. The best explanation is:', ['Kin selection: helping relatives passes on shared genes (inclusive fitness)', 'Group selection for the good of the species', 'Genetic drift', 'She is unfit and cannot reproduce for other reasons'],
  ['Selection acts mainly on genes and individuals, not species.', 'This is a consistent behavior, not chance.', 'Her behavior raises the spread of her own genes.'],
  'Hamilton\'s rule: altruism spreads when relatedness × benefit > cost.', { sk: 2 });
C('b-evo', 'unit', 'Which evolves: individuals or populations?', ['Populations: allele frequencies change across generations', 'Individuals: they adapt their genes during life', 'Both equally', 'Neither'],
  ['An individual\'s genes do not change in response to need.', 'Only populations show changes in allele frequency.', 'Populations do evolve.'],
  'Natural selection acts on individuals\' phenotypes, but evolution is the resulting change in the population.');
