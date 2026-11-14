/* General biology starter deck. Original items. */
'use strict';

/* ---------- Biomolecules (1A / 5D) ---------- */
T('b-mol', 'aa-monomer', 'What are the monomers of proteins?', ['amino acids', 'amino acid', 'aminoacids'],
  'Twenty standard amino acids, joined into polypeptides by peptide bonds.', { cat: '1A' });
T('b-mol', 'peptide', 'What bond links one amino acid to the next in a protein chain?', ['peptide bond', 'peptide', 'amide bond', 'amide', 'peptide bonds'],
  'A peptide (amide) bond between the carboxyl carbon of one amino acid and the amino nitrogen of the next, formed by dehydration.', { cat: '1A' });
C('b-mol', 'peptide-planar', 'Which describes the peptide bond?', ['Planar and rigid, with partial double-bond character', 'Free to rotate like any single bond', 'An ionic bond between charged groups', 'Formed by hydrolysis'],
  ['Resonance with the carbonyl gives the C–N bond partial double-bond character, which blocks rotation.', 'It is a covalent amide bond.', 'Hydrolysis breaks peptide bonds; dehydration forms them.'],
  'Because of resonance, the six atoms around each peptide bond lie in one plane. Rotation happens only at the bonds to the α-carbon (φ and ψ), which shapes secondary structure.', { cat: '1A', sk: 2, hy: true });
C('b-mol', 'secondary', 'α-helices and β-sheets are held together mainly by:', ['Hydrogen bonds between backbone C=O and N–H groups', 'Disulfide bonds', 'Hydrophobic interactions between side chains', 'Peptide bonds'],
  ['Disulfide bonds are covalent links between cysteine side chains, part of tertiary (or quaternary) structure.', 'Side-chain interactions drive tertiary structure.', 'Peptide bonds make the primary structure.'],
  'Secondary structure is local folding of the backbone, stabilized by backbone hydrogen bonds; side chains do not take part.', { cat: '1A', hy: true, cs: ['cs-protein-levels'] });
C('b-mol', 'disulfide', 'Disulfide bonds form between the side chains of which amino acid?', ['Cysteine', 'Methionine', 'Serine', 'Tyrosine'],
  ['Methionine contains sulfur, but as a thioether with no free –SH to bond.', 'Serine has an –OH, not –SH.', 'Tyrosine has a phenol group.'],
  'Two cysteine thiols (–SH) oxidize to form a covalent S–S bridge (cystine). Common in secreted proteins.', { cat: '1A', hy: true });
C('b-mol', 'quaternary', 'Which level of protein structure exists only in proteins made of more than one polypeptide chain?', ['Quaternary', 'Tertiary', 'Secondary', 'Primary'],
  ['Every folded polypeptide has a tertiary structure.', 'Every polypeptide can have local helices and sheets.', 'Every protein has an amino acid sequence.'],
  'Quaternary structure is how subunits assemble, as in hemoglobin\'s four chains.', { cat: '1A', cs: ['cs-protein-levels'] });
C('b-mol', 'glycine', 'Which standard amino acid is not chiral?', ['Glycine', 'Alanine', 'Proline', 'Cysteine'],
  ['Alanine\'s α-carbon carries four different groups.', 'Proline is chiral, though its side chain loops back to the backbone.', 'Cysteine is chiral (L-cysteine is even the one standard L-amino acid with R configuration).'],
  'Glycine\'s side chain is a hydrogen, so its α-carbon has two identical H substituents.', { cat: '1A', hy: true });
C('b-mol', 'lys-charge', 'At physiological pH (about 7.4), which side chain carries a positive charge?', ['Lysine', 'Aspartate', 'Serine', 'Leucine'],
  ['Aspartate is negatively charged (acidic side chain).', 'Serine is polar but uncharged.', 'Leucine is nonpolar.'],
  'The basic amino acids lysine and arginine are protonated (+) at pH 7.4; histidine (pKa ≈ 6) is mostly neutral.', { cat: '1A', hy: true, cs: ['cs-aa-class'] });
C('b-mol', 'asp-charge', 'Which amino acid has a negatively charged side chain at physiological pH?', ['Glutamate', 'Glutamine', 'Lysine', 'Threonine'],
  ['Glutamine is glutamate\'s amide: polar but uncharged.', 'Lysine is positively charged.', 'Threonine is polar and uncharged.'],
  'Aspartate and glutamate have carboxylic acid side chains (pKa ≈ 4), deprotonated at pH 7.4.', { cat: '1A', cs: ['cs-aa-class'] });
C('b-mol', 'sucrose', 'Sucrose is made of which two monosaccharides?', ['Glucose and fructose', 'Glucose and galactose', 'Glucose and glucose', 'Fructose and galactose'],
  ['That is lactose.', 'That is maltose (or other glucose dimers).', 'No common disaccharide.'],
  'Sucrose (table sugar) = glucose + fructose; lactose = glucose + galactose; maltose = glucose + glucose.', { cat: '5D', cs: ['cs-sugars'] });
C('b-mol', 'cellulose', 'What makes cellulose indigestible to humans while starch is digestible?', ['Cellulose uses β(1→4) glycosidic bonds; starch uses α(1→4)', 'Cellulose is made of fructose', 'Cellulose is a protein', 'Starch is branched and cellulose is not'],
  ['Both are polymers of glucose.', 'Both are polysaccharides.', 'Amylose (part of starch) is unbranched too; branching is not the key.'],
  'Our amylases cut α linkages only. The β linkages of cellulose need cellulase, which cows rely on gut microbes to supply.', { cat: '5D', hy: true, cs: ['cs-sugars'] });
C('b-mol', 'saturated', 'Compared with unsaturated fatty acids, saturated fatty acids:', ['Have no C=C double bonds, pack tightly and melt at higher temperatures', 'Have cis double bonds that kink the chain', 'Are liquid at room temperature', 'Make membranes more fluid'],
  ['Kinks come from cis double bonds, found in unsaturated fats.', 'That describes oils, which are mostly unsaturated.', 'Tight packing makes membranes less fluid.'],
  'Straight saturated chains stack closely with strong dispersion forces (butter is solid). Unsaturated kinks disrupt packing (olive oil is liquid).', { cat: '5D' });
T('b-mol', 'amphipathic', 'A molecule with both a hydrophilic and a hydrophobic region, like a phospholipid, is called ___.', ['amphipathic', 'amphiphilic'],
  'Amphipathic. Phospholipids put their polar heads toward water and their fatty acid tails together, forming bilayers.', { cat: '5D' });
C('b-mol', 'nucleotide', 'A nucleotide is made of:', ['A phosphate group, a five-carbon sugar and a nitrogenous base', 'A sugar and a base only', 'An amino acid and a phosphate', 'Glycerol and fatty acids'],
  ['That is a nucleoside.', 'Amino acids are not part of nucleic acids.', 'That is a fat (triglyceride).'],
  'Nucleoside = sugar + base; add one or more phosphates to get a nucleotide.', { cat: '1B' });
C('b-mol', 'denature', 'Heat denatures a protein. What does it disrupt?', ['Secondary, tertiary and quaternary structure, but not peptide bonds', 'The amino acid sequence', 'The peptide bonds', 'The side chains\' chemical identity'],
  ['The sequence (primary structure) survives denaturation.', 'Breaking peptide bonds takes hydrolysis, not ordinary heating.', 'The side chains are intact; only their interactions change.'],
  'Denaturation unfolds a protein by breaking noncovalent interactions (and sometimes disulfides). Some proteins refold when conditions return, as Anfinsen showed.', { cat: '1A', sk: 2, cs: ['cs-protein-levels'] });
T('b-mol', 'dehydration', 'Polymers such as proteins and starch are built by ___ reactions, which release water.', ['dehydration', 'condensation', 'dehydration synthesis', 'condensation reactions', 'dehydration reactions', 'dehydration synthesis reactions'],
  'Dehydration (condensation) synthesis joins monomers and releases H₂O. Hydrolysis adds water to break them apart.', { cat: '5D' });
C('b-mol', 'steroid', 'Which lipid is built from four fused carbon rings?', ['Cholesterol', 'A triglyceride', 'A phospholipid', 'A wax'],
  ['Triglycerides are glycerol plus three fatty acids.', 'Phospholipids are glycerol, two fatty acids and a phosphate head.', 'Waxes are long fatty acids esterified to long alcohols.'],
  'Steroids share a four-ring core. Cholesterol is the precursor of steroid hormones, bile acids and vitamin D.', { cat: '5D' });

/* ---------- Cells & organelles (2A) ---------- */
T('b-cell', 'mito', 'In which organelle does oxidative phosphorylation make most of a cell\'s ATP?', ['mitochondria', 'mitochondrion', 'the mitochondria', 'inner mitochondrial membrane', 'mitochondrial inner membrane'],
  'Mitochondria. The electron transport chain and ATP synthase sit in the inner mitochondrial membrane.', { hy: true });
T('b-cell', 'ser', 'Which organelle makes lipids and detoxifies drugs in liver cells?', ['smooth er', 'smooth endoplasmic reticulum', 'ser', 'smooth reticulum'],
  'The smooth ER. It has no ribosomes, and it also stores Ca²⁺ in muscle (as the sarcoplasmic reticulum).', { cs: ['cs-er'] });
T('b-cell', 'rer', 'Proteins destined for secretion are made on ribosomes bound to which organelle?', ['rough er', 'rough endoplasmic reticulum', 'rer', 'rough reticulum', 'the rough er'],
  'The rough ER. A signal sequence directs the ribosome there, and the growing protein enters the ER lumen, then travels to the Golgi.', { hy: true, cs: ['cs-er'] });
C('b-cell', 'golgi', 'What does the Golgi apparatus mainly do?', ['Modifies, sorts and packages proteins and lipids for their destinations', 'Makes ATP', 'Replicates DNA', 'Digests worn-out organelles'],
  ['That is the mitochondria.', 'That happens in the nucleus.', 'That is the lysosome.'],
  'Proteins arrive from the ER, get glycosylation trimmed and added, and leave in vesicles for the membrane, lysosomes or secretion.');
C('b-cell', 'lysosome', 'Which describes lysosomes?', ['Membrane sacs of hydrolytic enzymes that work best at acidic pH', 'Sites of protein synthesis', 'Organelles that break down hydrogen peroxide', 'Stores of calcium for muscle contraction'],
  ['That is ribosomes.', 'That is the peroxisome.', 'That is the (smooth/sarcoplasmic) ER.'],
  'Lysosomes keep a pH near 5. If enzymes leak into the neutral cytosol, they work poorly, a built-in safety feature.', { cs: ['cs-organelle-digest'] });
C('b-cell', 'peroxisome', 'Which organelle breaks down very-long-chain fatty acids and hydrogen peroxide?', ['Peroxisome', 'Lysosome', 'Golgi apparatus', 'Nucleolus'],
  ['Lysosomes digest macromolecules with acid hydrolases.', 'The Golgi packages proteins.', 'The nucleolus makes ribosomal RNA.'],
  'Peroxisomes do β-oxidation of very-long-chain fatty acids and use catalase to convert H₂O₂ to water and O₂.', { cs: ['cs-organelle-digest'] });
C('b-cell', 'prok-lack', 'Which do prokaryotic cells lack?', ['A membrane-bound nucleus', 'Ribosomes', 'A plasma membrane', 'DNA'],
  ['Prokaryotes have ribosomes (70S).', 'Every cell has a plasma membrane.', 'Their DNA sits in the nucleoid region.'],
  'Prokaryotes have no membrane-bound organelles at all: no nucleus, ER, Golgi or mitochondria.', { hy: true, cs: ['cs-pro-euk'] });
C('b-cell', 'ribosome-size', 'Eukaryotic cytoplasmic ribosomes are:', ['80S, made of 60S and 40S subunits', '70S, made of 50S and 30S subunits', '80S, made of 50S and 30S subunits', '100S'],
  ['That is prokaryotic (and mitochondrial) ribosomes.', 'Mixes up the two systems.', 'Not a ribosome size.'],
  'Svedberg units measure sedimentation, so they do not add: 60S + 40S make an 80S ribosome, and 50S + 30S make a 70S one. Antibiotics such as streptomycin target 70S ribosomes.', { cs: ['cs-pro-euk'] });
C('b-cell', 'microtubule', 'Microtubules are made of ___ and form ___.', ['Tubulin; the mitotic spindle, cilia and flagella', 'Actin; the cleavage furrow', 'Keratin; anchoring junctions', 'Myosin; thick filaments'],
  ['Actin makes microfilaments.', 'Keratin is an intermediate filament.', 'Myosin is a motor protein, not a cytoskeletal polymer of this type.'],
  'Hollow tubes of α/β-tubulin dimers. Kinesin and dynein walk along them. Cilia and flagella use a 9+2 arrangement.', { hy: true, cs: ['cs-cytoskeleton'] });
C('b-cell', 'microfilament', 'Which cytoskeletal element pinches a dividing animal cell in two?', ['Actin microfilaments', 'Microtubules', 'Intermediate filaments', 'Centrioles'],
  ['Microtubules separate the chromosomes but do not cleave the cell.', 'Intermediate filaments give mechanical strength.', 'Centrioles help organize microtubules.'],
  'A contractile ring of actin and myosin forms the cleavage furrow during cytokinesis.', { cs: ['cs-cytoskeleton'] });
C('b-cell', 'intermediate-fil', 'Keratin and nuclear lamins are examples of:', ['Intermediate filaments', 'Microtubules', 'Microfilaments', 'Motor proteins'],
  ['Those are tubulin polymers.', 'Those are actin polymers.', 'Motor proteins (myosin, kinesin, dynein) move along filaments.'],
  'Intermediate filaments are rope-like and resist tension; they anchor desmosomes and support the nuclear envelope.', { cs: ['cs-cytoskeleton'] });
C('b-cell', 'tight', 'Which junction seals neighboring epithelial cells so fluid cannot leak between them?', ['Tight junctions', 'Gap junctions', 'Desmosomes', 'Hemidesmosomes'],
  ['Gap junctions are channels between cytoplasms.', 'Desmosomes anchor cells mechanically but do not seal.', 'Hemidesmosomes anchor cells to the basement membrane.'],
  'Tight junctions block paracellular passage, as in the blood-brain barrier and the gut lining.', { hy: true, cs: ['cs-junctions'] });
C('b-cell', 'gap', 'Which junction lets ions and small molecules pass directly between neighboring cells?', ['Gap junctions', 'Tight junctions', 'Desmosomes', 'Adherens junctions'],
  ['Tight junctions seal; they do not connect cytoplasms.', 'Desmosomes provide strength, not passage.', 'Adherens junctions link actin networks for adhesion.'],
  'Connexin channels couple cells electrically, which is how cardiac muscle contracts in sync.', { cs: ['cs-junctions'] });
C('b-cell', 'desmosome', 'Which junction anchors cells together via intermediate filaments to resist mechanical stress?', ['Desmosomes', 'Gap junctions', 'Tight junctions', 'Plasmodesmata'],
  ['Gap junctions are for communication.', 'Tight junctions seal.', 'Plasmodesmata are plant cell channels.'],
  'Desmosomes are spot welds, abundant in skin and heart muscle.', { cs: ['cs-junctions'] });
T('b-cell', 'nucleolus', 'Where in the nucleus is ribosomal RNA made and ribosome subunit assembly begun?', ['nucleolus', 'the nucleolus', 'nucleoli'],
  'The nucleolus: a dense region where rRNA genes are transcribed and subunits are started before export.');
C('b-cell', 'endosym', 'Which observation supports the endosymbiotic origin of mitochondria?', ['They have their own circular DNA and bacteria-like ribosomes', 'They are made by the Golgi', 'They lack membranes', 'Their proteins are all encoded in the nucleus'],
  ['Mitochondria divide by fission; they are not built by the Golgi.', 'They have two membranes, consistent with engulfment.', 'Not true: mitochondrial DNA still encodes some proteins (13 in humans). Most are nuclear-encoded, but that reflects genes moving to the nucleus later.'],
  'Circular genomes, 70S-type ribosomes, double membranes and binary fission all resemble bacteria.', { sk: 2 });

/* ---------- Membranes & transport (2A) ---------- */
C('b-mem', 'cholesterol', 'What does cholesterol do to membrane fluidity?', ['Buffers it: less fluid at high temperature, prevents stiffening at low temperature', 'Always makes the membrane more fluid', 'Always makes the membrane more rigid', 'Has no effect'],
  ['It restrains phospholipid movement when warm.', 'It keeps tails from packing tightly when cold.', 'Its effect is substantial in animal cells.'],
  'Cholesterol\'s rigid rings slot between phospholipids, damping fluidity changes in both directions.', { sk: 2 });
C('b-mem', 'simple', 'Which crosses a lipid bilayer by simple diffusion?', ['O₂', 'Glucose', 'Na⁺', 'Insulin'],
  ['Glucose is too large and polar; it uses GLUT carriers (facilitated diffusion).', 'Ions cannot cross the hydrophobic core and need channels.', 'A protein hormone this large cannot cross; it binds a surface receptor.'],
  'Small, nonpolar molecules (O₂, CO₂, steroids) dissolve through the bilayer down their gradients.', { hy: true, cs: ['cs-transport'] });
C('b-mem', 'facilitated', 'Facilitated diffusion:', ['Moves solutes down their gradient through a protein, without ATP', 'Moves solutes against their gradient using ATP', 'Needs no protein at all', 'Uses another ion\'s gradient to move a solute uphill'],
  ['That is primary active transport.', 'That is simple diffusion.', 'That is secondary active transport.'],
  'Channels and carriers speed passive movement. Carrier transport saturates (it has a Vmax), like an enzyme.', { cs: ['cs-transport'] });
C('b-mem', 'primary', 'Which is primary active transport?', ['The Na⁺/K⁺-ATPase', 'The Na⁺-glucose cotransporter (SGLT)', 'GLUT4', 'Aquaporins'],
  ['SGLT uses the Na⁺ gradient, not ATP directly: secondary active transport.', 'GLUT carriers are facilitated diffusion.', 'Aquaporins are water channels (passive).'],
  'Primary active transport hydrolyzes ATP directly to pump against a gradient.', { hy: true, cs: ['cs-transport'] });
C('b-mem', 'secondary', 'The intestinal Na⁺-glucose cotransporter moves glucose into cells against its gradient. Its energy comes from:', ['The Na⁺ gradient built by the Na⁺/K⁺ pump', 'Direct ATP hydrolysis by the cotransporter', 'The glucose gradient itself', 'The membrane\'s cholesterol'],
  ['The cotransporter has no ATPase activity.', 'Glucose is moving uphill, so its own gradient cannot drive it.', 'Cholesterol is structural.'],
  'Secondary active transport: Na⁺ flowing down its gradient drags glucose along. Block the Na⁺/K⁺ pump and glucose uptake eventually stops too.', { sk: 2, cs: ['cs-transport'] });
C('b-mem', 'nak', 'Each cycle of the Na⁺/K⁺-ATPase moves:', ['3 Na⁺ out and 2 K⁺ in per ATP', '2 Na⁺ out and 3 K⁺ in per ATP', '3 Na⁺ in and 2 K⁺ out per ATP', '1 Na⁺ out and 1 K⁺ in per ATP'],
  ['Swaps the numbers.', 'Reverses the directions: Na⁺ is pumped out.', 'Unequal: that is why the pump is electrogenic.'],
  'Three positive charges out, two in: a small net outward current that contributes to the negative resting potential.', { hy: true });
C('b-mem', 'hypotonic', 'A red blood cell is placed in a hypotonic solution. What happens?', ['Water enters; the cell swells and may burst', 'Water leaves; the cell shrinks', 'Nothing: the solution is isotonic', 'Solute enters and the cell shrinks'],
  ['That happens in a hypertonic solution.', 'Hypotonic means lower solute concentration outside.', 'Water moves, not (mainly) solute.'],
  'Hypotonic outside = more concentrated inside, so water moves in by osmosis. Plant cells resist bursting thanks to their walls.', { hy: true, cs: ['cs-tonicity'] });
C('b-mem', 'hypertonic', 'A red blood cell in a hypertonic solution will:', ['Lose water and shrink (crenate)', 'Gain water and swell', 'Stay the same size', 'Burst'],
  ['That is a hypotonic solution.', 'Only an isotonic solution leaves volume unchanged.', 'Bursting happens in hypotonic solution.'],
  'More solute outside pulls water out by osmosis.', { cs: ['cs-tonicity'] });
T('b-mem', 'osmosis', 'In osmosis, water moves toward the side with ___ solute concentration.', ['higher', 'high', 'greater', 'more', 'higher solute concentration', 'the higher'],
  'Water moves down its own concentration gradient, which means toward higher solute (lower water) concentration.', { cs: ['cs-tonicity'] });
C('b-mem', 'clathrin', 'Receptor-mediated endocytosis, such as LDL uptake, uses:', ['Clathrin-coated pits', 'Gap junctions', 'Ion channels', 'Exocytic vesicles'],
  ['Gap junctions connect neighboring cells.', 'Channels move ions, not particles like LDL.', 'Exocytosis moves material out.'],
  'Ligands bind receptors clustered in clathrin-coated pits, which pinch off as vesicles. Defective LDL receptors cause familial hypercholesterolemia.');
C('b-mem', 'integral', 'An integral membrane protein:', ['Spans or is embedded in the bilayer and needs detergent to remove', 'Sits loosely on the surface and washes off with salt', 'Is always on the cytoplasmic side only', 'Is made of lipid'],
  ['That describes a peripheral protein.', 'Many span both leaflets.', 'They are proteins, with hydrophobic segments in the bilayer.'],
  'Integral proteins have hydrophobic regions inside the membrane; peripheral proteins bind to surfaces or to integral proteins.');

/* ---------- Enzymes & cellular respiration (1D / 1A) ---------- */
C('b-energy', 'enzyme', 'How do enzymes speed up reactions?', ['By lowering the activation energy', 'By making ΔG more negative', 'By shifting the equilibrium toward products', 'By raising the temperature'],
  ['ΔG depends only on the start and end states.', 'Enzymes speed both directions equally, so equilibrium is unchanged.', 'Enzymes work at the cell\'s temperature.'],
  'They stabilize the transition state, giving a lower-energy pathway.', { cat: '1A', hy: true, cs: ['cs-kin-thermo'] });
C('b-energy', 'comp-inh', 'A competitive inhibitor changes enzyme kinetics how?', ['Apparent Km rises; Vmax is unchanged', 'Vmax falls; Km is unchanged', 'Both Km and Vmax fall', 'Both Km and Vmax rise'],
  ['That is noncompetitive (pure) inhibition.', 'That is uncompetitive inhibition.', 'No common inhibitor raises Vmax.'],
  'It competes for the active site, so enough substrate outcompetes it (Vmax recoverable) but more substrate is needed for half-maximal rate (higher Km).', { cat: '1A', hy: true, cs: ['cs-inhibition'] });
C('b-energy', 'noncomp-inh', 'A noncompetitive inhibitor:', ['Lowers Vmax without changing Km', 'Raises Km without changing Vmax', 'Lowers both Km and Vmax', 'Can be overcome with more substrate'],
  ['That is competitive inhibition.', 'That is uncompetitive inhibition.', 'It binds elsewhere, so substrate cannot displace it.'],
  'It binds E and ES equally at an allosteric site, effectively removing working enzyme.', { cat: '1A', cs: ['cs-inhibition'] });
C('b-energy', 'uncomp-inh', 'An inhibitor binds only to the enzyme–substrate complex. What happens to Km and Vmax?', ['Both decrease', 'Km rises, Vmax unchanged', 'Vmax falls, Km unchanged', 'Neither changes'],
  ['That is competitive.', 'That is noncompetitive.', 'Binding ES does change both.'],
  'Uncompetitive inhibition pulls ES out of play, which raises apparent affinity (lower Km) while capping turnover (lower Vmax).', { cat: '1A', sk: 2, cs: ['cs-inhibition'] });
T('b-energy', 'km', 'Km is the substrate concentration at which the reaction rate is ___ of Vmax.', ['half', '1/2', 'one half', 'one-half', '50%', '50', '0.5', 'half of'],
  'Km = [S] at v = ½ Vmax. A lower Km generally means higher apparent affinity for substrate.', { cat: '1A', hy: true });
C('b-energy', 'glyc-loc', 'Where does glycolysis take place?', ['Cytosol', 'Mitochondrial matrix', 'Inner mitochondrial membrane', 'Intermembrane space'],
  ['The citric acid cycle runs there.', 'The electron transport chain sits there.', 'Protons collect there; no pathway runs there.'],
  'Glycolysis is cytosolic and needs no oxygen, which is why every cell, even red blood cells without mitochondria, can do it.', { hy: true, cs: ['cs-resp-location'] });
C('b-energy', 'tca-loc', 'Where does the citric acid (Krebs) cycle take place in eukaryotes?', ['Mitochondrial matrix', 'Cytosol', 'Inner mitochondrial membrane', 'Outer mitochondrial membrane'],
  ['That is glycolysis.', 'Succinate dehydrogenase is the one cycle enzyme embedded there, but the cycle runs in the matrix.', 'No respiration step is located there.'],
  'Matrix enzymes oxidize acetyl-CoA to CO₂, loading NADH and FADH₂.', { cs: ['cs-resp-location'] });
C('b-energy', 'etc-loc', 'Where is the electron transport chain located?', ['Inner mitochondrial membrane', 'Outer mitochondrial membrane', 'Mitochondrial matrix', 'Cytosol'],
  ['The outer membrane is porous and holds no ETC.', 'The matrix holds the citric acid cycle.', 'Glycolysis is cytosolic.'],
  'Complexes I–IV and ATP synthase are embedded in the inner membrane; its folds (cristae) increase the surface area.', { hy: true, cs: ['cs-resp-location'] });
C('b-energy', 'final-acc', 'What is the final electron acceptor of the electron transport chain?', ['O₂', 'NAD⁺', 'Pyruvate', 'CO₂'],
  ['NAD⁺ is regenerated when NADH donates electrons at complex I.', 'Pyruvate accepts electrons in fermentation, not the ETC.', 'CO₂ is a product, not an acceptor.'],
  'Complex IV passes electrons to O₂, forming water. No O₂, no flow: the chain backs up.', { hy: true });
N('b-energy', 'glyc-net', 'What is the net ATP yield of glycolysis per glucose?', { value: 2, tol: 0 },
  '4 ATP made, 2 ATP spent in the investment phase: net 2 ATP (plus 2 NADH).', { hy: true });
T('b-energy', 'pyruvate', 'What three-carbon molecule does glycolysis end with?', ['pyruvate', 'pyruvic acid'],
  'Two pyruvate per glucose. With oxygen it becomes acetyl-CoA; without, it is reduced to lactate (or ethanol in yeast).');
C('b-energy', 'ferment', 'What is the main point of fermentation?', ['To regenerate NAD⁺ so glycolysis can keep making ATP', 'To make additional ATP from pyruvate', 'To produce oxygen', 'To feed the citric acid cycle'],
  ['Fermentation itself makes no ATP.', 'No pathway in animal cells makes O₂.', 'Fermentation runs when the cycle and ETC cannot.'],
  'Glycolysis consumes NAD⁺. Converting pyruvate to lactate oxidizes NADH back to NAD⁺, keeping glycolysis running.', { sk: 2, hy: true });
C('b-energy', 'atp-synthase', 'ATP synthase is driven directly by:', ['Protons flowing down their gradient back into the matrix', 'Electrons moving through the enzyme', 'Hydrolysis of GTP', 'The oxidation of glucose in the matrix'],
  ['Electrons move through complexes I–IV, not ATP synthase.', 'GTP is made in the citric acid cycle; it does not drive ATP synthase.', 'Glucose is not oxidized in the matrix.'],
  'Chemiosmosis: the ETC pumps H⁺ into the intermembrane space, and H⁺ returning through ATP synthase turns its rotor.', { hy: true });
C('b-energy', 'pdh', 'Pyruvate dehydrogenase converts pyruvate into:', ['Acetyl-CoA, CO₂ and NADH', 'Lactate', 'Oxaloacetate', 'Glucose'],
  ['That is lactate dehydrogenase (fermentation).', 'That is pyruvate carboxylase (gluconeogenesis).', 'Glucose comes from gluconeogenesis.'],
  'The PDH complex links glycolysis to the citric acid cycle in the matrix and is irreversible.');
T('b-energy', 'pfk', 'What is the main rate-limiting enzyme of glycolysis?', ['phosphofructokinase', 'phosphofructokinase-1', 'phosphofructokinase 1', 'pfk', 'pfk-1', 'pfk1'],
  'PFK-1, which commits fructose-6-phosphate. ATP and citrate inhibit it; AMP and fructose-2,6-bisphosphate activate it.', { hy: true });
C('b-energy', 'atp-yield', 'Current estimates of the ATP made from one glucose by full aerobic respiration are about:', ['30–32', '2', '36–38', '100'],
  ['That is glycolysis alone.', 'Older textbooks give this, assuming whole-number ATP per NADH. Proton leak and transport costs bring it to about 30–32.', 'Far too high.'],
  'About 2.5 ATP per NADH and 1.5 per FADH₂ gives roughly 30–32 per glucose.', { sk: 1 });
C('b-energy', 'uncoupler', 'An uncoupler such as DNP makes the inner mitochondrial membrane leaky to H⁺. What happens?', ['O₂ use continues or rises, ATP synthesis falls, and heat is released', 'O₂ use stops and ATP synthesis stops', 'ATP synthesis rises', 'The ETC reverses'],
  ['That is what an ETC blocker such as cyanide does.', 'The proton gradient that drives ATP synthase is dissipated.', 'The ETC keeps running forward, even faster.'],
  'Electron flow is no longer held back by the gradient, so O₂ consumption continues, but the energy escapes as heat instead of ATP. Brown fat does this on purpose (UCP1).', { sk: 2, cs: ['cs-etc-poisons'] });
C('b-energy', 'cyanide', 'Cyanide blocks complex IV. What happens to oxygen consumption and ATP synthesis?', ['Both stop', 'O₂ use rises, ATP falls', 'O₂ use stops, ATP rises', 'Neither changes'],
  ['That is an uncoupler.', 'No electron flow means no proton pumping, so ATP falls.', 'Complex IV is essential.'],
  'Electrons cannot reach O₂, the chain backs up, pumping stops and oxidative ATP production collapses.', { sk: 2, cs: ['cs-etc-poisons'] });

/* ---------- Cell cycle, mitosis & meiosis (2C / 1C) ---------- */
C('b-div', 'crossover', 'When does crossing over occur?', ['Prophase I of meiosis', 'Metaphase II of meiosis', 'Anaphase I of meiosis', 'Prophase of mitosis'],
  ['Homologs have already separated by meiosis II.', 'By anaphase I the homologs are being pulled apart.', 'Homologs do not pair in mitosis.'],
  'Homologous chromosomes pair (synapsis) in prophase I, forming tetrads where nonsister chromatids exchange segments.', { cat: '1C', hy: true, cs: ['cs-mitosis-meiosis'] });
C('b-div', 'homologs-sep', 'Homologous chromosomes separate during:', ['Anaphase I', 'Anaphase II', 'Anaphase of mitosis', 'Telophase II'],
  ['Sister chromatids separate then.', 'Sister chromatids separate then.', 'By telophase II everything has separated.'],
  'Meiosis I is the reductional division (homologs part); meiosis II is like mitosis (sisters part).', { cat: '1C', hy: true, cs: ['cs-mitosis-meiosis'] });
C('b-div', 'sisters-sep', 'Sister chromatids separate during:', ['Anaphase II and mitotic anaphase', 'Anaphase I only', 'Prophase I', 'Metaphase I'],
  ['Sisters stay joined at their centromeres through meiosis I.', 'Prophase I is pairing and crossing over.', 'Metaphase I lines up homolog pairs.'],
  'Cohesin is cleaved at the centromere in anaphase of mitosis and anaphase II, freeing the sisters.', { cs: ['cs-mitosis-meiosis'] });
C('b-div', 'meiosis-out', 'What does meiosis produce from one diploid cell?', ['Four haploid, genetically distinct cells', 'Two diploid, identical cells', 'Four diploid cells', 'Two haploid, identical cells'],
  ['That is mitosis.', 'Meiosis halves the chromosome number.', 'Crossing over and independent assortment make them distinct, and there are four.'],
  'Two divisions after one round of DNA replication.', { cat: '1C', hy: true, cs: ['cs-mitosis-meiosis'] });
C('b-div', 's-phase', 'DNA is replicated during which phase of the cell cycle?', ['S phase', 'G₁', 'G₂', 'M phase'],
  ['G₁ is growth before replication.', 'G₂ is preparation for mitosis after replication.', 'M is division.'],
  'Synthesis (S) phase doubles the DNA; each chromosome then has two sister chromatids.', { hy: true });
T('b-div', 'metaphase', 'In which phase of mitosis do chromosomes line up at the cell\'s equator?', ['metaphase'],
  'Metaphase. The spindle checkpoint holds the cell there until every kinetochore is attached.', { cs: ['cs-mitosis-phases'] });
C('b-div', 'nondis-1', 'Nondisjunction in meiosis I produces gametes that are:', ['All abnormal: two with an extra chromosome, two missing one', 'Half normal, half abnormal', 'All normal', 'All triploid'],
  ['That is the outcome of nondisjunction in meiosis II.', 'A failed separation must unbalance some gametes.', 'Only one chromosome pair was affected.'],
  'If a homolog pair fails to separate, both daughter cells of meiosis I are unbalanced, and so are all four gametes.', { cat: '1C', sk: 2, cs: ['cs-nondisjunction'] });
C('b-div', 'nondis-2', 'Nondisjunction in meiosis II (in one of the two cells) produces:', ['Two normal gametes, one with an extra chromosome and one missing one', 'Four abnormal gametes', 'Four normal gametes', 'Two diploid gametes'],
  ['That is meiosis I nondisjunction.', 'Sisters failed to separate in one cell, so something is unbalanced.', 'Only the affected cell\'s two products are unbalanced.'],
  'The other meiosis II cell divides normally, giving two normal gametes.', { cat: '1C', sk: 2, cs: ['cs-nondisjunction'] });
T('b-div', 'cohesin', 'Which protein complex holds sister chromatids together until anaphase?', ['cohesin', 'cohesins'],
  'Cohesin. Separase cleaves it at anaphase, after the anaphase-promoting complex destroys separase\'s inhibitor (securin).');
C('b-div', 'cyclin', 'Through the cell cycle, which statement about cyclins and CDKs is true?', ['Cyclin levels rise and fall; CDK levels stay fairly constant', 'CDK levels rise and fall; cyclins stay constant', 'Both stay constant', 'Both are made only in S phase'],
  ['It is the reverse.', 'Cyclin oscillation is what times the cycle.', 'Different cyclins peak in different phases.'],
  'CDKs are active only when bound to their cyclin, so cyclin synthesis and destruction switch CDK activity on and off.');
C('b-div', 'p53', 'What does p53 do when DNA is damaged?', ['Halts the cell cycle (at G₁/S) for repair or triggers apoptosis', 'Speeds the cell into S phase', 'Repairs DNA directly as a polymerase', 'Separates sister chromatids'],
  ['That is the opposite of its role.', 'It is a transcription factor, not a repair enzyme.', 'That is separase.'],
  'p53 is a tumor suppressor; loss of function is found in roughly half of human cancers.', { hy: true });
C('b-div', 'indep', 'The law of independent assortment follows from:', ['The random orientation of homolog pairs at metaphase I', 'Crossing over in prophase I', 'Sister chromatid separation in anaphase II', 'DNA replication in S phase'],
  ['Crossing over recombines linked genes; independent assortment concerns different chromosome pairs.', 'Sisters carry the same alleles (barring crossing over).', 'Replication copies, it does not sort.'],
  'Each homolog pair lines up independently, so alleles on different chromosomes sort independently into gametes.', { cat: '1C', cs: ['cs-mendel-laws'] });

/* ---------- Mendelian genetics (1C) ---------- */
C('b-gen', 'segregation', 'Mendel\'s law of segregation states that:', ['The two alleles of a gene separate into different gametes', 'Genes on different chromosomes sort independently', 'Dominant alleles are always more common', 'Traits blend in offspring'],
  ['That is the law of independent assortment.', 'Dominance says nothing about allele frequency.', 'Mendel\'s results disproved blending.'],
  'Each gamete gets one allele of each gene. The physical basis is homologs separating in anaphase I.', { hy: true, cs: ['cs-mendel-laws'] });
C('b-gen', 'codominance', 'A person with blood type AB expresses both A and B antigens. This is:', ['Codominance', 'Incomplete dominance', 'Epistasis', 'Pleiotropy'],
  ['Incomplete dominance gives an intermediate phenotype (red × white → pink).', 'Epistasis is one gene masking another gene.', 'Pleiotropy is one gene affecting many traits.'],
  'In codominance both alleles are fully and separately expressed.', { hy: true, cs: ['cs-dominance'] });
C('b-gen', 'incomplete', 'Red snapdragons crossed with white ones give pink offspring. This is:', ['Incomplete dominance', 'Codominance', 'Sex linkage', 'Epistasis'],
  ['Codominance would show red and white separately (patches), not a blend.', 'Nothing here depends on sex.', 'Only one gene is involved.'],
  'The heterozygote has an intermediate phenotype. Crossing two pinks gives 1 red : 2 pink : 1 white.', { cs: ['cs-dominance'] });
C('b-gen', 'xlinked', 'An X-linked recessive trait appears in a father; the mother is homozygous normal. What about their children?', ['All daughters are carriers; no sons are affected', 'All sons are affected', 'Half the daughters are affected', 'All children are unaffected and non-carriers'],
  ['Sons get their X from their mother, who is normal.', 'Daughters get one normal X from the mother, so they are carriers, not affected.', 'Every daughter gets the father\'s X with the allele.'],
  'Fathers pass their X to every daughter and their Y to every son.', { sk: 2, hy: true });
C('b-gen', 'hw-cond', 'Which is a condition for Hardy–Weinberg equilibrium?', ['A very large population', 'Natural selection', 'Assortative (non-random) mating', 'Frequent migration'],
  ['Selection changes allele frequencies.', 'Random mating is required.', 'Gene flow changes allele frequencies.'],
  'The five conditions: no mutation, random mating, no selection, very large population (no drift), no gene flow.', { hy: true });
T('b-gen', 'testcross', 'To tell whether a dominant-phenotype organism is homozygous or heterozygous, you cross it with a ___ individual.', ['homozygous recessive', 'recessive', 'homozygous recessive individual', 'aa'],
  'A test cross. If any offspring show the recessive phenotype, the parent must be heterozygous.');
C('b-gen', 'linkage', 'Two genes show 10% recombinant offspring. What does this suggest?', ['They are linked, about 10 map units apart', 'They are on different chromosomes', 'They are unlinked and 50 map units apart', 'They are the same gene'],
  ['Unlinked genes give about 50% recombinants.', '50% recombinants would mean unlinked.', 'Recombination between them implies two loci.'],
  'Recombination frequency ≈ distance: 1% = 1 centimorgan. Close genes cross over between each other less often.', { sk: 2 });
C('b-gen', 'epistasis', 'In Labrador retrievers, a dog with genotype ee is yellow no matter which alleles it has at the B (black/brown) gene. This is:', ['Epistasis', 'Codominance', 'Incomplete dominance', 'Linkage'],
  ['Codominance involves two alleles of one gene.', 'Incomplete dominance involves one gene\'s alleles blending.', 'Linkage is about genes inherited together.'],
  'The E gene controls whether pigment is deposited; ee masks the B gene entirely. Expect 9:3:4 ratios from dihybrid crosses.', { sk: 2 });
C('b-gen', 'penetrance', 'Only 70% of people with a disease genotype show any symptoms. This describes:', ['Incomplete penetrance', 'Variable expressivity', 'Codominance', 'Pleiotropy'],
  ['Expressivity is how severe the phenotype is among those who show it.', 'Codominance is about expressing two alleles.', 'Pleiotropy is one gene affecting several traits.'],
  'Penetrance is all-or-none per person (do they show it?). Expressivity is degree (how strongly?).', { cs: ['cs-penetrance'] });
G('b-gen', 'g-mono', 'Monohybrid cross', rnd => {
  const cross = pickR(rnd, [['Aa', 'Aa'], ['Aa', 'aa'], ['AA', 'Aa']]), ask = pickR(rnd, ['aa', 'Aa', 'dominant phenotype']);
  const gam = s => [s[0], s[1]], g1 = gam(cross[0]), g2 = gam(cross[1]);
  let hit = 0;
  for (const x of g1) for (const y of g2) { const geno = [x, y].sort().join(''); if (ask === 'dominant phenotype' ? geno.includes('A') : geno === ask) hit++; }
  const p = hit / 4;
  return { prompt: `${cross[0]} × ${cross[1]}. What fraction of offspring ${ask === 'dominant phenotype' ? 'show the dominant phenotype' : 'are ' + ask}? (Answer as a decimal or fraction.)`, value: p, tol: 0.01, unit: '', fraction: true,
    expl: `Gametes ${g1.join('/')} × ${g2.join('/')} give four equally likely boxes; ${hit} of 4 match: ${p}.` };
}, { hy: true, sk: 1 });
G('b-gen', 'g-dihybrid', 'Dihybrid cross', rnd => {
  const ask = pickR(rnd, [['aabb', 1 / 16], ['both dominant traits', 9 / 16], ['dominant A trait and recessive b trait', 3 / 16], ['AaBb', 4 / 16]]);
  return { prompt: `AaBb × AaBb (genes on different chromosomes). What fraction of offspring are ${ask[0]}?`, value: ask[1], tol: 0.005, unit: '', fraction: true,
    expl: `Multiply the single-gene probabilities. ${ask[0] === 'aabb' ? '¼ × ¼ = 1/16' : ask[0] === 'both dominant traits' ? '¾ × ¾ = 9/16' : ask[0] === 'AaBb' ? '½ × ½ = 4/16 = ¼' : '¾ × ¼ = 3/16'}.` };
});
G('b-gen', 'g-hw', 'Hardy–Weinberg', rnd => {
  const q2 = pickR(rnd, [0.01, 0.04, 0.09, 0.16, 0.25, 0.0001]), q = Math.sqrt(q2), p = 1 - q;
  return { prompt: `A recessive condition affects ${sig(q2 * 100)}% of a population in Hardy–Weinberg equilibrium. What fraction of the population are carriers (heterozygotes)?`, value: 2 * p * q, tolPct: 2, unit: '',
    expl: `q² = ${q2}, so q = ${sig(q)} and p = ${sig(p)}. Carriers = 2pq = ${sig(2 * p * q)}.`, hint: 'q² is the affected fraction; carriers are 2pq.' };
}, { hy: true });
G('b-gen', 'g-map', 'Map distance', rnd => {
  const total = pickR(rnd, [200, 500, 1000]), rf = pickR(rnd, [0.05, 0.1, 0.15, 0.2, 0.3]);
  const rec = Math.round(total * rf);
  return { prompt: `A test cross gives ${total} offspring, ${rec} of them recombinant. How many map units (cM) apart are the genes?`, value: 100 * rec / total, tolPct: 2, unit: 'cM',
    expl: `Recombination frequency = ${rec}/${total} = ${sig(rec / total)}, i.e. ${sig(100 * rec / total)} cM.` };
});

/* ---------- DNA, replication & gene expression (1B) ---------- */
C('b-dna', 'dnapol', 'DNA polymerase synthesizes new DNA:', ['5′ → 3′, and only by extending an existing primer', '3′ → 5′, starting from nothing', 'In both directions equally', '5′ → 3′, starting from nothing'],
  ['It reads the template 3′→5′ but builds 5′→3′, and it cannot start chains.', 'Each new nucleotide is added to a free 3′-OH.', 'It cannot start a chain; primase lays an RNA primer first.'],
  'New nucleotides attach to the 3′-OH of the growing strand, so all synthesis runs 5′→3′.', { hy: true, cs: ['cs-replication'] });
C('b-dna', 'lagging', 'Why is the lagging strand made in Okazaki fragments?', ['Polymerase can only build 5′→3′, so on that strand it must work away from the fork in short pieces', 'Helicase unwinds that strand more slowly', 'It is made of RNA', 'It is copied only after the leading strand is finished'],
  ['Helicase unwinds both strands together.', 'Only the primers are RNA.', 'Both strands are copied at the same fork, at the same time.'],
  'Template strands are antiparallel. The lagging strand\'s new copy must be started repeatedly with new primers, then the pieces are joined.', { sk: 2, cs: ['cs-replication'] });
T('b-dna', 'helicase', 'Which enzyme unwinds the double helix at the replication fork?', ['helicase', 'dna helicase'],
  'Helicase breaks the hydrogen bonds between base pairs. Single-strand binding proteins keep the strands apart.', { cs: ['cs-replication-enzymes'] });
T('b-dna', 'ligase', 'Which enzyme joins Okazaki fragments into one continuous strand?', ['ligase', 'dna ligase'],
  'DNA ligase seals the sugar-phosphate backbone after the RNA primers are replaced with DNA.', { hy: true, cs: ['cs-replication-enzymes'] });
T('b-dna', 'topo', 'Which enzyme relieves the supercoiling that builds up ahead of the replication fork?', ['topoisomerase', 'topoisomerases', 'gyrase', 'dna gyrase', 'topoisomerase ii', 'topoisomerase i'],
  'Topoisomerases cut and rejoin DNA to release tension. Bacterial DNA gyrase is the target of fluoroquinolone antibiotics.', { cs: ['cs-replication-enzymes'] });
T('b-dna', 'primase', 'Primase lays down short primers made of ___.', ['rna'],
  'RNA. DNA polymerase then extends the primer; the primers are later removed and replaced with DNA.', { cs: ['cs-replication-enzymes'] });
C('b-dna', 'rnapol', 'During transcription, RNA polymerase:', ['Reads the template strand 3′→5′ and builds RNA 5′→3′ without a primer', 'Reads 5′→3′ and builds RNA 3′→5′', 'Needs an RNA primer to start', 'Copies both DNA strands of a gene'],
  ['Synthesis is always 5′→3′.', 'Unlike DNA polymerase, it can start chains on its own.', 'Only the template (antisense) strand is read for a given gene.'],
  'The RNA has the same sequence as the coding strand (with U for T).', { cs: ['cs-polymerase'] });
C('b-dna', 'processing', 'Which modifications does a eukaryotic pre-mRNA receive before leaving the nucleus?', ['A 5′ cap, a 3′ poly-A tail and splicing out of introns', 'A 3′ cap and a 5′ poly-A tail', 'Removal of exons', 'Addition of a start codon'],
  ['The cap is at 5′ and the tail at 3′.', 'Introns are removed; exons are kept and joined.', 'The start codon is already encoded in the gene.'],
  'The cap and tail protect the mRNA and help translation; the spliceosome removes introns. Prokaryotic mRNA gets none of these.', { hy: true });
C('b-dna', 'codons', 'How many codons are there, and how many specify amino acids?', ['64 codons; 61 code for amino acids and 3 are stops', '20 codons; all code for amino acids', '64 codons; all code for amino acids', '61 codons; 3 are starts'],
  ['There are 4³ = 64 three-base combinations.', 'Three are stop codons (UAA, UAG, UGA).', 'There is one main start codon (AUG), and it also codes for methionine.'],
  '61 sense codons for 20 amino acids makes the code degenerate (redundant).');
T('b-dna', 'start', 'What is the start codon?', ['aug'],
  'AUG, which codes for methionine (formyl-methionine in bacteria).', { hy: true });
C('b-dna', 'silent', 'A point mutation changes a codon from GAA to GAG; both code for glutamate. This is a:', ['Silent mutation', 'Missense mutation', 'Nonsense mutation', 'Frameshift mutation'],
  ['Missense changes the amino acid.', 'Nonsense creates a stop codon.', 'A frameshift needs an insertion or deletion.'],
  'Degeneracy, usually at the third base, means some substitutions do not change the protein.', { hy: true, cs: ['cs-mutation'] });
C('b-dna', 'nonsense', 'A mutation turns a codon into UAG. This is a:', ['Nonsense mutation', 'Missense mutation', 'Silent mutation', 'Frameshift mutation'],
  ['Missense swaps one amino acid for another.', 'Silent leaves the amino acid unchanged.', 'No bases were inserted or deleted.'],
  'UAG is a stop codon, so the protein is cut short (truncated).', { cs: ['cs-mutation'] });
C('b-dna', 'frameshift', 'Which change causes a frameshift?', ['Deleting one nucleotide from a coding sequence', 'Deleting three nucleotides', 'Swapping one base for another', 'Changing a base in an intron'],
  ['Removing a whole codon keeps the frame (an in-frame deletion).', 'Substitutions do not shift the frame.', 'Introns are spliced out, so they do not set the reading frame.'],
  'Insertions or deletions that are not multiples of 3 shift every downstream codon.', { cs: ['cs-mutation'] });
C('b-dna', 'missense', 'A point mutation changes one codon so that valine replaces glutamate. This is a:', ['Missense mutation', 'Nonsense mutation', 'Silent mutation', 'Frameshift mutation'],
  ['No stop codon was created.', 'The amino acid changed.', 'Only one base changed.'],
  'This is the sickle-cell mutation in β-globin: one substitution, one amino acid change.', { cs: ['cs-mutation'] });
C('b-dna', 'lac', 'When is the lac operon transcribed at a high level?', ['When lactose is present and glucose is low', 'When glucose is high and lactose absent', 'When both are high', 'When both are absent'],
  ['No lactose: the repressor stays on the operator.', 'Glucose keeps cAMP low, so CAP cannot boost transcription much.', 'No inducer, and no reason to activate.'],
  'Lactose (allolactose) releases the repressor; low glucose raises cAMP, which lets CAP activate the promoter. Both are needed for full expression.', { sk: 2, hy: true });
C('b-dna', 'purines', 'Which bases are purines?', ['Adenine and guanine', 'Cytosine and thymine', 'Cytosine and uracil', 'Adenine and thymine'],
  ['Those are pyrimidines.', 'Those are pyrimidines.', 'A is a purine; T is a pyrimidine.'],
  'Purines have two fused rings ("Pure As Gold"). A purine always pairs with a pyrimidine, keeping the helix a constant width.', { cs: ['cs-bases'] });
N('b-dna', 'gc-hbonds', 'How many hydrogen bonds hold a G–C base pair together?', { value: 3, tol: 0 },
  'Three (A–T has two). GC-rich DNA melts at a higher temperature.', { cs: ['cs-bases'] });
C('b-dna', 'rna-dna', 'How does RNA differ chemically from DNA?', ['RNA has ribose (with a 2′-OH) and uracil instead of thymine', 'RNA has deoxyribose and thymine', 'RNA has no phosphate backbone', 'RNA uses different purines'],
  ['That is DNA.', 'Both have sugar-phosphate backbones.', 'Both use adenine and guanine.'],
  'The 2′-OH makes RNA more reactive and less stable than DNA.', { cs: ['cs-bases'] });
C('b-dna', 'meselson', 'Bacteria grown in ¹⁵N medium are moved to ¹⁴N. After one round of replication, all the DNA forms a single band of intermediate density. Which model does this rule out?', ['Conservative replication', 'Semiconservative replication', 'Dispersive replication', 'None of them'],
  ['This result is exactly what semiconservative replication predicts.', 'Dispersive replication also predicts one intermediate band after one round; the second round (half intermediate, half light) is what rules it out.', 'Conservative replication predicted two bands (heavy and light), which were not seen.'],
  'Meselson and Stahl (1958). One generation eliminated the conservative model; the second generation eliminated dispersive.', { sk: 3, hy: true });

/* ---------- Prokaryotes & viruses (2B) ---------- */
C('b-prok', 'gram-pos', 'Gram-positive bacteria have:', ['A thick peptidoglycan wall and no outer membrane; they stain purple', 'A thin peptidoglycan wall and an outer membrane; they stain pink', 'No cell wall', 'A cellulose wall'],
  ['That is gram-negative.', 'Most bacteria have peptidoglycan walls (mycoplasma are the exception).', 'Cellulose walls belong to plants.'],
  'The thick wall traps the crystal violet stain.', { hy: true, cs: ['cs-gram'] });
C('b-prok', 'gram-neg', 'Which feature belongs to gram-negative bacteria?', ['An outer membrane containing lipopolysaccharide (endotoxin)', 'A thick peptidoglycan layer', 'Teichoic acids in the wall', 'Retaining crystal violet stain'],
  ['That is gram-positive.', 'Teichoic acids are a gram-positive feature.', 'Gram-negatives lose the purple stain and take the pink counterstain.'],
  'Their thin peptidoglycan sits between two membranes; LPS triggers strong immune responses.', { cs: ['cs-gram'] });
C('b-prok', 'transformation', 'A bacterium takes up naked DNA from its surroundings. This is:', ['Transformation', 'Transduction', 'Conjugation', 'Binary fission'],
  ['Transduction uses a virus as carrier.', 'Conjugation uses a direct connection (pilus) between cells.', 'Binary fission is reproduction.'],
  'Griffith\'s experiment showed it: harmless pneumococci became virulent after taking up DNA from heat-killed virulent cells.', { hy: true, cs: ['cs-gene-transfer'] });
C('b-prok', 'transduction', 'Bacterial DNA carried into another bacterium by a bacteriophage is:', ['Transduction', 'Transformation', 'Conjugation', 'Transposition'],
  ['Transformation is uptake of free DNA.', 'Conjugation is cell-to-cell transfer through a pilus.', 'Transposition is a gene moving within a genome.'],
  'A phage accidentally packages host DNA and delivers it to its next host.', { cs: ['cs-gene-transfer'] });
C('b-prok', 'conjugation', 'An F⁺ bacterium transfers a plasmid to an F⁻ bacterium through a sex pilus. This is:', ['Conjugation', 'Transduction', 'Transformation', 'Lysogeny'],
  ['No virus is involved.', 'The DNA is not free in the environment.', 'Lysogeny is a viral life cycle.'],
  'Conjugation spreads plasmids, including antibiotic-resistance genes, between bacteria.', { cs: ['cs-gene-transfer'] });
C('b-prok', 'retro', 'What enzyme lets a retrovirus such as HIV insert its genome into host DNA?', ['Reverse transcriptase (then integrase)', 'RNA polymerase', 'DNA ligase only', 'Helicase'],
  ['Host RNA polymerase transcribes DNA into RNA; retroviruses need the reverse.', 'Integration uses viral integrase.', 'Helicase unwinds DNA; it neither copies RNA into DNA nor inserts it.'],
  'Reverse transcriptase makes DNA from the viral RNA genome; integrase splices it into a host chromosome.', { hy: true });
C('b-prok', 'lysogenic', 'In the lysogenic cycle, a phage:', ['Integrates its genome into the host chromosome as a prophage', 'Immediately makes new viruses and bursts the cell', 'Kills the host by releasing toxins', 'Copies itself outside the cell'],
  ['That is the lytic cycle.', 'Phages do not kill by toxins in this way.', 'Viruses replicate only inside host cells.'],
  'The prophage is copied with the host DNA until a trigger (such as DNA damage) switches it to the lytic cycle.', { cs: ['cs-phage'] });
C('b-prok', 'growth', 'In what order do the phases of a bacterial growth curve occur?', ['Lag, exponential (log), stationary, death', 'Exponential, lag, stationary, death', 'Lag, stationary, exponential, death', 'Stationary, lag, exponential, death'],
  ['Cells must first adapt to the new medium.', 'Exponential growth precedes the plateau.', 'Stationary comes when nutrients run low.'],
  'Lag (adjusting), log (doubling at a steady rate), stationary (growth = death), death (decline).');
C('b-prok', 'plasmid', 'Plasmids are:', ['Small circular DNA molecules separate from the chromosome, often carrying antibiotic resistance', 'Protein coats of viruses', 'Ribosomes', 'The bacterial chromosome'],
  ['That is a capsid.', 'Ribosomes are RNA-protein machines.', 'Plasmids are extra, not the main chromosome.'],
  'They replicate independently and can be shared by conjugation, which spreads resistance.');

/* ---------- Nerves, hormones & organ systems (3A / 3B) ---------- */
C('b-sys', 'rmp', 'The resting membrane potential of a neuron (about −70 mV) is set mainly by:', ['K⁺ leaking out through open K⁺ channels', 'Na⁺ rushing in', 'Ca²⁺ entering the cell', 'Cl⁻ being pumped in'],
  ['Na⁺ influx happens during an action potential.', 'Ca²⁺ entry triggers neurotransmitter release.', 'Cl⁻ contributes a little but is not the main factor.'],
  'At rest the membrane is most permeable to K⁺, so the potential sits near K⁺\'s equilibrium potential (about −90 mV), pulled up slightly by Na⁺ leak.', { cat: '3A', hy: true, cs: ['cs-ap'] });
C('b-sys', 'depol', 'During the rising (depolarization) phase of an action potential:', ['Voltage-gated Na⁺ channels open and Na⁺ flows in', 'Voltage-gated K⁺ channels open and K⁺ flows out', 'The Na⁺/K⁺ pump reverses', 'Cl⁻ channels open'],
  ['That is repolarization.', 'The pump keeps working normally; it is not what makes the spike.', 'Cl⁻ entering would hyperpolarize the cell (an inhibitory effect), not make the spike.'],
  'Positive feedback: depolarization opens more Na⁺ channels, driving the potential toward Na⁺\'s equilibrium potential.', { cat: '3A', hy: true, cs: ['cs-ap'] });
C('b-sys', 'repol', 'What causes repolarization after the peak of an action potential?', ['Na⁺ channels inactivate and voltage-gated K⁺ channels let K⁺ flow out', 'Na⁺ channels open further', 'The Na⁺/K⁺ pump alone', 'Ca²⁺ flowing in'],
  ['Na⁺ channels inactivate at the peak.', 'The pump is too slow to account for repolarization; it maintains gradients over time.', 'Ca²⁺ entry does not repolarize a neuron.'],
  'The slow K⁺ channels also cause the brief hyperpolarization (undershoot).', { cat: '3A', cs: ['cs-ap'] });
C('b-sys', 'refractory', 'Why can\'t a second action potential fire during the absolute refractory period?', ['Voltage-gated Na⁺ channels are inactivated and cannot reopen yet', 'The neuron has run out of Na⁺', 'K⁺ channels are all closed', 'The Na⁺/K⁺ pump has stopped'],
  ['Only a tiny fraction of ions crosses per spike; the gradients barely change.', 'K⁺ channels are open then.', 'The pump keeps running.'],
  'Inactivated channels must reset (by repolarization) before they can open again. This keeps action potentials one-way.', { cat: '3A', sk: 2, cs: ['cs-ap'] });
C('b-sys', 'myelin', 'How does myelin speed up nerve conduction?', ['Action potentials jump between nodes of Ranvier (saltatory conduction)', 'It adds more Na⁺ channels under the myelin', 'It makes axons narrower', 'It releases neurotransmitter along the axon'],
  ['Na⁺ channels cluster at the nodes, not under the myelin.', 'Wider axons are faster; myelin insulates rather than narrowing.', 'Neurotransmitter is released at synapses.'],
  'Myelin insulates the axon, so current flows quickly to the next node. Loss of myelin (as in multiple sclerosis) slows or blocks conduction.', { cat: '3A' });
C('b-sys', 'hormone-class', 'How do steroid hormones differ from peptide hormones in signaling?', ['Steroids cross the membrane and bind intracellular receptors that alter transcription', 'Steroids bind surface receptors and use second messengers', 'Steroids are stored in vesicles before release', 'Steroids act within seconds'],
  ['That is how peptide hormones work.', 'Steroids are made on demand and diffuse out; peptides are stored.', 'Steroid effects take hours, because they work through gene expression.'],
  'Lipid-soluble steroids diffuse through membranes; water-soluble peptides cannot, so they rely on cell-surface receptors.', { cat: '3A', hy: true, cs: ['cs-hormone-class'] });
C('b-sys', 'insulin', 'What does insulin do?', ['Lowers blood glucose by promoting uptake into cells and glycogen synthesis', 'Raises blood glucose by stimulating glycogen breakdown', 'Raises blood calcium', 'Increases water reabsorption in the kidney'],
  ['That is glucagon.', 'That is parathyroid hormone.', 'That is ADH.'],
  'Released by pancreatic β cells after a meal. It moves GLUT4 to the surface in muscle and fat.', { cat: '3A', hy: true });
C('b-sys', 'bohr', 'Which change shifts the oxygen–hemoglobin dissociation curve to the right?', ['A rise in CO₂ and H⁺ (lower pH)', 'A fall in temperature', 'Lower 2,3-BPG', 'A higher pH'],
  ['Cooling shifts it left (hemoglobin holds O₂ more tightly).', 'Lower 2,3-BPG shifts it left.', 'Higher pH (alkalosis) shifts it left.'],
  'A right shift lowers hemoglobin\'s O₂ affinity, unloading more O₂ in active tissues that are warm, acidic and high in CO₂ (the Bohr effect).', { cat: '3B', sk: 2, hy: true, cs: ['cs-o2-curve'] });
C('b-sys', 'alveoli', 'Where does gas exchange between air and blood happen in the lungs?', ['Alveoli', 'Bronchi', 'Trachea', 'Pleural space'],
  ['Bronchi conduct air; their walls are too thick for exchange.', 'The trachea conducts air.', 'The pleural space lies between the lungs and the chest wall.'],
  'Alveolar walls are one cell thick and wrapped in capillaries, giving a huge surface with a tiny diffusion distance.', { cat: '3B' });
C('b-sys', 'co2-transport', 'How is most CO₂ carried in the blood?', ['As bicarbonate (HCO₃⁻) in plasma', 'Bound to the heme iron of hemoglobin', 'Dissolved as CO₂ gas', 'As carbonic acid'],
  ['CO₂ binds hemoglobin\'s amino groups (carbaminohemoglobin), not heme iron, and that is only about 20–25%.', 'Only about 5–10% is dissolved.', 'Carbonic acid is a brief intermediate.'],
  'Carbonic anhydrase in red cells converts CO₂ + H₂O to H₂CO₃, which splits into H⁺ and HCO₃⁻ (about 70% of CO₂ transport).', { cat: '3B', hy: true });
C('b-sys', 'pct', 'Where in the nephron is most filtered water and Na⁺ reabsorbed?', ['Proximal convoluted tubule', 'Loop of Henle', 'Distal convoluted tubule', 'Collecting duct'],
  ['The loop builds the concentration gradient; it reabsorbs less overall.', 'The DCT fine-tunes a small fraction.', 'The collecting duct makes the final, hormone-controlled adjustments.'],
  'The PCT reclaims about two-thirds of filtered water and Na⁺, plus nearly all glucose and amino acids.', { cat: '3B', hy: true, cs: ['cs-nephron'] });
C('b-sys', 'adh', 'What does ADH (vasopressin) do in the kidney?', ['Inserts aquaporins in the collecting duct, increasing water reabsorption', 'Increases Na⁺ reabsorption in the distal tubule', 'Increases glomerular filtration', 'Increases K⁺ reabsorption'],
  ['That is aldosterone.', 'ADH works on water permeability, not on filtration rate.', 'K⁺ handling is aldosterone\'s job, and it increases K⁺ secretion.'],
  'More ADH → more concentrated urine and more water retained. Alcohol inhibits ADH release.', { cat: '3B', hy: true, cs: ['cs-nephron'] });
C('b-sys', 'aldosterone', 'Aldosterone acts on the distal nephron to:', ['Increase Na⁺ reabsorption and K⁺ secretion', 'Insert aquaporins', 'Decrease Na⁺ reabsorption', 'Increase glucose reabsorption'],
  ['That is ADH.', 'The opposite.', 'Glucose is reabsorbed in the PCT, not regulated by aldosterone.'],
  'A steroid from the adrenal cortex, released in response to angiotensin II and high K⁺. Water follows the reabsorbed Na⁺, raising blood volume.', { cat: '3B', cs: ['cs-nephron'] });
C('b-sys', 'desc-loop', 'The descending limb of the loop of Henle is:', ['Permeable to water but not to salt', 'Permeable to salt but not to water', 'Impermeable to both', 'Where ADH acts'],
  ['That is the ascending limb.', 'The descending limb loses water to the salty medulla.', 'ADH acts on the collecting duct.'],
  'Water leaves the descending limb into the hypertonic medulla; the ascending limb pumps salt out but keeps water in.', { cat: '3B', sk: 2, cs: ['cs-nephron'] });
C('b-sys', 'pepsin', 'Pepsin:', ['Digests protein in the stomach and is activated from pepsinogen by acid', 'Digests fat in the small intestine', 'Digests starch in the mouth', 'Is made by the liver'],
  ['That is pancreatic lipase, helped by bile.', 'That is salivary amylase.', 'Pepsinogen comes from chief cells in the stomach.'],
  'Secreting it as an inactive zymogen protects the cells that make it.', { cat: '3B' });
C('b-sys', 'pulm', 'Blood leaving the right ventricle goes next to:', ['The pulmonary artery, then the lungs', 'The aorta', 'The left atrium', 'The vena cava'],
  ['The aorta leaves the left ventricle.', 'Blood reaches the left atrium after the lungs.', 'The venae cavae return blood to the right atrium.'],
  'Right heart → lungs → left heart → body. The pulmonary artery carries deoxygenated blood (an artery carries blood away from the heart).', { cat: '3B' });
C('b-sys', 'cardiac', 'Cardiac muscle is:', ['Striated, involuntary and linked by intercalated discs with gap junctions', 'Smooth, involuntary and unbranched', 'Striated, voluntary and multinucleated', 'Unstriated and voluntary'],
  ['That describes smooth muscle (no visible sarcomeres).', 'That is skeletal muscle.', 'No muscle type is unstriated and voluntary.'],
  'Gap junctions let the action potential spread cell to cell, so the heart contracts as a unit.', { cat: '3B', cs: ['cs-muscle'] });
