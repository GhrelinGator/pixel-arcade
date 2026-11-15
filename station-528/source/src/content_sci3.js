/* Science top-ups for the thinnest categories: amino acids and proteins (1A), metabolism (1D),
   prokaryotes and viruses (2B), and organic chemistry basics (5D). Original items. */
'use strict';

/* ---------- Amino acids & proteins (1A) ---------- */
C('b-mol', 'pi', 'At a pH above its isoelectric point, an amino acid carries a net:', ['Negative charge', 'Positive charge', 'Zero charge', 'Charge set only by its size'],
  ['A net positive charge happens below the pI, when groups are protonated.', 'The net charge is zero only at the pI.', 'Charge depends on pH and pKa values, not size.'],
  'Above the pI there are fewer protons, so groups lose H⁺ and the molecule becomes negative. This is why proteins move toward the + electrode in electrophoresis at high pH.', { cat: '1A', hy: true, cs: ['cs-aa-charge'] });
C('b-mol', 'zwitterion', 'At pH 7.4, a simple amino acid such as alanine exists mainly as a:', ['Zwitterion: –NH₃⁺ and –COO⁻', 'Neutral molecule: –NH₂ and –COOH', 'Cation: –NH₃⁺ and –COOH', 'Anion: –NH₂ and –COO⁻'],
  ['At pH 7.4 both groups are ionized, not neutral.', 'The carboxyl group (pKa about 2) has lost its proton at pH 7.4.', 'The amino group (pKa about 9 to 10) is still protonated at pH 7.4.'],
  'Between the two pKa values, the carboxyl is deprotonated and the amino group protonated.', { cat: '1A', cs: ['cs-aa-charge'] });
C('b-mol', 'his', 'Which amino acid\'s side chain has a pKa near 6, so it can gain or lose a proton near physiological pH (useful in enzyme active sites)?', ['Histidine', 'Lysine', 'Aspartate', 'Serine'],
  ['Lysine\'s side chain pKa is about 10.5: almost always protonated at pH 7.4.', 'Aspartate\'s side chain pKa is about 3.9: almost always deprotonated.', 'Serine\'s hydroxyl is not acidic or basic at physiological pH.'],
  'Histidine\'s imidazole ring shuttles protons in many enzymes and helps buffer hemoglobin.', { cat: '1A', hy: true, cs: ['cs-aa-class'] });
C('b-mol', 'proline', 'Which amino acid often breaks α-helices because its side chain loops back to bond to the backbone nitrogen?', ['Proline', 'Alanine', 'Leucine', 'Glutamate'],
  ['Alanine is one of the strongest helix formers.', 'Leucine readily forms helices.', 'Glutamate readily forms helices.'],
  'Proline\'s ring locks the backbone angle and leaves no N–H to hydrogen-bond, so it kinks the chain.', { cat: '1A', cs: ['cs-aa-class'] });
C('b-mol', 'core', 'In a water-soluble globular protein, which amino acids are most likely buried in the core?', ['Nonpolar ones such as leucine, valine and phenylalanine', 'Charged ones such as lysine, arginine and glutamate', 'Polar ones such as serine, threonine and asparagine', 'All kinds, spread evenly through the protein'],
  ['Charged side chains are usually on the surface, interacting with water.', 'Polar side chains mostly sit on the surface too.', 'Folding sorts side chains by polarity.'],
  'The hydrophobic effect drives folding: burying nonpolar side chains raises the entropy of surrounding water.', { cat: '1A', hy: true, cs: ['cs-protein-levels'] });
C('b-mol', 'tertiary', 'Which interaction is part of tertiary structure but not secondary structure?', ['Side-chain interactions, such as salt bridges', 'Hydrogen bonds between backbone C=O and N–H groups', 'Peptide bonds joining neighboring amino acids', 'The sequence of amino acids in the chain'],
  ['Backbone hydrogen bonds define secondary structure.', 'Peptide bonds make up primary structure.', 'The sequence is primary structure.'],
  'Tertiary structure is the 3D fold of one chain, held by side-chain interactions and the hydrophobic effect.', { cat: '1A', cs: ['cs-protein-levels'] });
C('b-mol', 'chaperone', 'Proteins that help other proteins fold correctly, without being part of the final structure, are:', ['Chaperones', 'Proteasomes', 'Ribosomes', 'Kinases'],
  ['Proteasomes break down tagged proteins.', 'Ribosomes make the polypeptide chain.', 'Kinases add phosphate groups.'],
  'Chaperones, such as heat shock proteins, keep chains from misfolding or clumping, especially under stress.', { cat: '1A' });

/* ---------- Metabolism (1D) ---------- */
C('b-energy', 'beta-ox', 'Where does β-oxidation of fatty acids take place?', ['Mitochondrial matrix', 'Cytosol', 'Smooth ER', 'Nucleus'],
  ['Fatty acid synthesis happens in the cytosol.', 'The smooth ER makes lipids; it doesn\'t break fatty acids down for energy.', 'The nucleus holds DNA.'],
  'Each round cuts off two carbons as acetyl-CoA and makes NADH and FADH₂.', { cat: '1D', hy: true, cs: ['cs-metab-site'] });
C('b-energy', 'ppp', 'The main products of the pentose phosphate pathway are:', ['NADPH and ribose-5-phosphate', 'ATP and pyruvate', 'Acetyl-CoA and CO₂', 'Lactate and NAD⁺'],
  ['ATP and pyruvate come from glycolysis.', 'Acetyl-CoA and CO₂ come from pyruvate dehydrogenase.', 'Lactate and NAD⁺ come from fermentation.'],
  'NADPH is used for fatty acid synthesis and to fight oxidative damage; ribose-5-phosphate is used to make nucleotides.', { cat: '1D', hy: true });
C('b-energy', 'ketone', 'During a long fast, the liver makes ketone bodies from:', ['Acetyl-CoA from fatty acid breakdown', 'Glucose taken up from the blood', 'Lactate released by muscle', 'Glycogen stored in the liver'],
  ['Glucose is scarce during a fast; ketones spare it.', 'Lactate is recycled into glucose (the Cori cycle).', 'Liver glycogen runs out within about a day.'],
  'The brain can use ketones for much of its energy during starvation, reducing its need for glucose.', { cat: '1D', cs: ['cs-fasting'] });
C('b-energy', 'phosphorylase', 'Which enzyme breaks glycogen down into glucose-1-phosphate?', ['Glycogen phosphorylase', 'Glycogen synthase', 'Hexokinase', 'Glucose-6-phosphatase'],
  ['Glycogen synthase builds glycogen.', 'Hexokinase phosphorylates free glucose.', 'Glucose-6-phosphatase removes the phosphate from glucose-6-phosphate so the liver can release glucose.'],
  'Glucagon and epinephrine activate glycogen phosphorylase; insulin favors glycogen synthase.', { cat: '1D', hy: true, cs: ['cs-glycogen'] });
C('b-energy', 'insulin', 'Insulin promotes which process?', ['Glycogen synthesis', 'Gluconeogenesis', 'Breakdown of stored fat', 'Ketone body production'],
  ['Gluconeogenesis is driven by glucagon and cortisol.', 'Insulin inhibits fat breakdown and promotes fat storage.', 'Insulin suppresses ketogenesis.'],
  'Insulin is the fed-state hormone: it moves glucose into cells and promotes storage as glycogen and fat.', { cat: '1D', hy: true, cs: ['cs-fasting'] });
C('b-energy', 'cori', 'In the Cori cycle, lactate made by working muscle is:', ['Carried to the liver and converted back to glucose', 'Burned by the muscle in the citric acid cycle', 'Excreted by the kidneys', 'Stored as glycogen in the muscle'],
  ['During intense work the muscle exports lactate rather than oxidizing it.', 'Little lactate is lost in urine.', 'Muscle sends lactate to the liver rather than storing it.'],
  'The liver uses gluconeogenesis to return glucose to the muscle, at an ATP cost paid by the liver.', { cat: '1D', sk: 2, cs: ['cs-fasting'] });
C('b-energy', 'glucagon', 'Which hormone stimulates the liver to make new glucose during fasting?', ['Glucagon', 'Insulin', 'Oxytocin', 'Calcitonin'],
  ['Insulin lowers blood glucose.', 'Oxytocin acts in childbirth and milk release.', 'Calcitonin lowers blood calcium.'],
  'Glucagon from pancreatic α cells drives gluconeogenesis and glycogen breakdown in the liver.', { cat: '1D', cs: ['cs-fasting'] });

/* ---------- Prokaryotes & viruses (2B) ---------- */
C('b-prok', 'fission', 'Bacteria reproduce mainly by:', ['Binary fission', 'Mitosis', 'Meiosis', 'Budding off viruses'],
  ['Mitosis needs a nucleus and spindle apparatus, which bacteria lack.', 'Bacteria do not make gametes by meiosis.', 'Viruses are not how bacteria reproduce.'],
  'The circular chromosome is copied and the cell splits in two; under good conditions this can take about 20 minutes.', { cat: '2B' });
C('b-prok', 'endospore', 'Some bacteria, such as Clostridium and Bacillus, survive boiling and drying by forming:', ['Endospores', 'Capsules', 'Plasmids', 'Pili'],
  ['A capsule protects against immune cells and drying, but not boiling.', 'Plasmids are extra DNA, not survival structures.', 'Pili are for attachment and DNA transfer.'],
  'Endospores are dormant, tough structures that can germinate when conditions improve.', { cat: '2B' });
C('b-prok', 'flagellum', 'How does a bacterial flagellum differ from a eukaryotic one?', ['It is made of flagellin and spins like a rotary motor', 'It is built of microtubules in a 9 + 2 pattern', 'It is powered directly by ATP hydrolysis along its length', 'It whips back and forth'],
  ['The 9 + 2 microtubule pattern is the eukaryotic flagellum.', 'The bacterial motor is driven by the flow of H⁺ ions across the membrane.', 'Eukaryotic flagella whip; bacterial ones rotate.'],
  'A convergent solution to movement: same job, very different structure.', { cat: '2B' });
C('b-prok', 'resistance', 'Antibiotic resistance genes often spread quickly between different bacteria because they:', ['Sit on plasmids that can pass from cell to cell by conjugation', 'Are created in bacteria by exposure to the antibiotic itself', 'Are passed only from parent to daughter cells', 'Are handed to bacteria by the patient\'s own immune cells'],
  ['Antibiotics select for resistance; they do not create the genes.', 'Horizontal transfer lets genes jump between unrelated bacteria.', 'Human cells do not hand genes to bacteria.'],
  'Horizontal gene transfer (conjugation, transformation, transduction) plus selection by antibiotic use drives resistance.', { cat: '2B', sk: 2, cs: ['cs-gene-transfer'] });
C('b-prok', 'prion', 'Prions cause disease by:', ['Converting normal proteins into a misfolded form', 'Inserting their DNA into the host genome', 'Reverse-transcribing their RNA', 'Producing toxins like bacteria do'],
  ['Prions have no DNA.', 'Prions have no RNA; that is a retrovirus.', 'Prions are proteins only; they make nothing.'],
  'The misfolded protein, rich in β-sheets, templates further misfolding and builds up in the brain.', { cat: '2B' });

/* ---------- Organic chemistry basics (5D) ---------- */
C('o-func', 'nucleophile', 'A nucleophile is a species that:', ['Donates an electron pair to form a new bond', 'Accepts an electron pair to form a new bond', 'Always carries a positive charge', 'Donates a proton'],
  ['Accepting an electron pair makes something an electrophile.', 'Nucleophiles are electron-rich, often neutral or negative.', 'Donating a proton is what an acid does.'],
  'Nucleophiles ("nucleus-loving") seek positive or electron-poor centers, such as a carbonyl carbon.', { hy: true, cs: ['cs-nuc-elec'] });
C('o-func', 'sn2', 'An SN2 reaction at a chiral carbon gives:', ['Inversion of configuration', 'Retention of configuration', 'A racemic mixture', 'No reaction at chiral carbons'],
  ['Retention is not what backside attack gives.', 'A racemic mixture comes from SN1, through a flat carbocation.', 'SN2 works at chiral carbons, especially primary and secondary ones.'],
  'The nucleophile attacks from the side opposite the leaving group in one step, flipping the molecule like an umbrella in wind.', { hy: true, cs: ['cs-sn'] });
C('o-func', 'sn1', 'Which substrate reacts fastest by the SN1 mechanism?', ['A tertiary alkyl halide', 'A primary alkyl halide', 'A methyl halide', 'A vinyl halide'],
  ['A primary carbocation is very unstable, so SN1 is slow.', 'A methyl carbocation is the least stable.', 'A vinyl carbocation is very unstable.'],
  'SN1 goes through a carbocation; more alkyl groups stabilize it (tertiary > secondary > primary).', { hy: true, cs: ['cs-sn'] });
C('o-func', 'carbonyl', 'Where do nucleophiles attack a carbonyl group, and why?', ['At the carbon, because oxygen pulls electron density away from it', 'At the oxygen, because its lone pairs make it electron-rich', 'At the α-hydrogen, because that hydrogen is somewhat acidic', 'Nowhere, because carbonyl groups are too stable to react'],
  ['Electron-rich sites attract electrophiles, not nucleophiles.', 'Bases remove α-hydrogens; nucleophiles attack the carbon.', 'Carbonyls are among the most reactive groups in biology.'],
  'The C=O bond is polarized (C δ+, O δ−), which makes the carbon electrophilic.', { hy: true, cs: ['cs-nuc-elec'] });
C('o-func', 'acidity', 'Which is the most acidic?', ['A carboxylic acid', 'An alcohol', 'An alkane', 'An amine'],
  ['Alcohols (pKa about 16) are much weaker acids.', 'Alkanes (pKa about 50) are essentially not acidic.', 'Amines act as bases; their N–H is a very weak acid.'],
  'The carboxylate ion is stabilized by resonance, spreading the negative charge over two oxygens (pKa about 4 to 5).', { cs: ['cs-acidity-org'] });
C('o-func', 'ester-hyd', 'Hydrolyzing an ester with acid and water gives:', ['A carboxylic acid and an alcohol', 'An aldehyde and an alcohol', 'An amide and water', 'Two alcohols'],
  ['Aldehydes don\'t come from simple ester hydrolysis.', 'Amides form from amines, not water.', 'Only one product is an alcohol.'],
  'Ester hydrolysis reverses esterification. In base it is saponification, which gives a carboxylate salt (soap from fats).', { hy: true });
C('o-func', 'amide', 'Why are amides, such as peptide bonds, less reactive than esters?', ['Resonance from nitrogen\'s lone pair makes the carbonyl carbon less electrophilic', 'Nitrogen is more electronegative than oxygen, so it holds electrons tighter', 'Amides have no carbonyl group for a nucleophile to attack', 'Amides carry a charge that repels incoming nucleophiles'],
  ['Nitrogen is less electronegative than oxygen, which is why it donates its lone pair so well.', 'Amides do have a carbonyl group.', 'Amides are neutral.'],
  'That same resonance makes the peptide bond planar and rigid.', { sk: 2 });
C('o-func', 'enantiomers', 'Enantiomers have:', ['Identical physical properties except opposite optical rotation', 'Different boiling and melting points from each other', 'Different molecular formulas despite a similar structure', 'Mirror-image shapes that can be stacked exactly on each other'],
  ['Enantiomers share boiling points, melting points and solubility.', 'All stereoisomers share a molecular formula.', 'Enantiomers are non-superimposable mirror images.'],
  'They can still behave differently with other chiral molecules, such as enzymes and receptors.', { hy: true, cs: ['cs-isomers'] });
C('o-func', 'diastereomers', 'Two stereoisomers that are not mirror images of each other are:', ['Diastereomers', 'Enantiomers', 'Constitutional isomers', 'Identical'],
  ['Enantiomers are mirror images.', 'Constitutional isomers have different connectivity, so they aren\'t stereoisomers.', 'Stereoisomers are different compounds.'],
  'Diastereomers, such as cis/trans isomers, have different physical properties and can be separated by ordinary methods.', { cs: ['cs-isomers'] });
C('o-func', 'pcc', 'Oxidizing a primary alcohol with a mild oxidant such as PCC gives:', ['An aldehyde', 'A ketone', 'A carboxylic acid', 'An alkane'],
  ['Ketones come from oxidizing secondary alcohols.', 'Strong oxidants such as chromic acid take a primary alcohol all the way to a carboxylic acid.', 'An alkane would be a reduction.'],
  'PCC stops at the aldehyde because it is used without water.', { hy: true });
