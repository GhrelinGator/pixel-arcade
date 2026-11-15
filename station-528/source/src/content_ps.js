/* Psychology & sociology (foundational concepts 6–10). Original items written for this app;
   AAMC category codes are tags only. Mostly scenario questions, as on the real section. */
'use strict';

/* ---------- Sensation & perception (6A) ---------- */
T('ps-sense', 'weber', 'The rule that the just-noticeable difference is a constant fraction of the original stimulus is called ___.', ['weber\'s law', 'webers law', 'weber law'],
  'Weber\'s law: ΔI / I = k. If you can just tell 100 g from 102 g, you would need about 4 g of difference to notice a change from 200 g.', { hy: true, cs: ['cs-psychophysics'] });
G('ps-sense', 'g-jnd', 'Weber\'s law', rnd => {
  const I0 = pickR(rnd, [50, 100, 200]), k = pickR(rnd, [0.02, 0.04, 0.05]), m = pickR(rnd, [2, 3, 4]);
  const d0 = +(k * I0).toFixed(2), I1 = I0 * m, v = k * I1;
  return { prompt: `Someone can just tell a ${I0} g weight from a ${I0 + d0} g weight. By Weber's law, what is the just-noticeable difference for a ${I1} g weight, in g?`, value: v, tolPct: 2, unit: 'g',
    expl: `k = ΔI / I = ${d0} / ${I0} = ${k}. For ${I1} g: ΔI = ${k} × ${I1} = ${sig(v)} g.`, hint: 'ΔI / I = k' };
}, { sk: 2, cs: ['cs-psychophysics'] });
C('ps-sense', 'sdt-fa', 'A radiologist reports a tumor on a scan when there is none. In signal detection theory, this is a:', ['False alarm', 'Miss', 'Hit', 'Correct rejection'],
  ['A miss is failing to report a signal that is there.', 'A hit is correctly reporting a signal that is there.', 'A correct rejection is correctly reporting that no signal is there.'],
  'Signal detection theory crosses signal present or absent with "yes" or "no": hit, miss, false alarm, correct rejection.', { hy: true, cs: ['cs-sdt'] });
C('ps-sense', 'sdt-crit', 'A lifeguard decides to respond to any splash that might be a swimmer in trouble. In signal detection terms, the lifeguard has adopted:', ['A liberal criterion', 'A conservative criterion', 'Greater sensitivity (d′)', 'A lower absolute threshold'],
  ['A conservative criterion means saying "yes" only when sure: fewer false alarms but more misses.', 'Sensitivity is how well signal can be told from noise; it doesn\'t change with a decision rule.', 'The absolute threshold is a sensory limit, not a choice about how to respond.'],
  'A liberal criterion trades more false alarms for fewer misses, which makes sense when a miss is costly.', { sk: 2, cs: ['cs-sdt'] });
C('ps-sense', 'adaptation', 'After a few minutes you no longer notice the smell of your own kitchen, because the receptors respond less to an unchanging stimulus. This is:', ['Sensory adaptation', 'Habituation', 'Top-down processing', 'Perceptual constancy'],
  ['Habituation is a learned drop in a behavioral response, not receptors firing less.', 'Top-down processing is using expectations to interpret input.', 'Perceptual constancy is seeing an object as unchanged despite changing input, such as size with distance.'],
  'Adaptation happens at the sense organ; habituation is a simple form of learning in the nervous system.', { cs: ['cs-adapt-habit'] });
C('ps-sense', 'topdown', 'You read a smudged word correctly because the sentence around it tells you what it should be. This is:', ['Top-down processing', 'Bottom-up processing', 'Feature detection', 'Sensory adaptation'],
  ['Bottom-up processing builds a percept from the raw features alone, which the smudge hides.', 'Feature detectors respond to lines and edges; they can\'t use sentence meaning.', 'Adaptation is a reduced response to an unchanging stimulus.'],
  'Top-down processing uses knowledge, context and expectation to interpret what the senses deliver.', { hy: true, cs: ['cs-processing'] });
C('ps-sense', 'gestalt', 'You see four dots that sit close together as one group and two dots farther away as another. Which Gestalt principle is this?', ['Proximity', 'Similarity', 'Closure', 'Continuity'],
  ['Similarity groups items that look alike, such as the same color or shape.', 'Closure fills in gaps to see a complete figure.', 'Continuity favors smooth, continuous lines over sharp turns.'],
  'Gestalt principles describe how we organize parts into wholes; proximity groups things that are near each other.', { cs: ['cs-gestalt'] });
C('ps-sense', 'place', 'According to place theory, how does the ear code the pitch of a high-frequency sound?', ['By which part of the basilar membrane vibrates most', 'By how fast the auditory nerve fires in step with the sound', 'By how loud the sound is', 'By which semicircular canal is stimulated'],
  ['Matching firing rate to frequency is frequency (temporal) theory, which works for low pitches.', 'Loudness is coded by how many neurons fire and how fast, not pitch.', 'Semicircular canals sense head rotation (balance), not sound.'],
  'High frequencies peak near the base of the cochlea, where the membrane is narrow and stiff; low frequencies peak near the apex.', { hy: true });
C('ps-sense', 'rods', 'Which statement about rods is correct?', ['They work in dim light but do not detect color', 'They are packed most densely in the fovea', 'They come in three types for red, green and blue', 'They give the sharpest detailed vision'],
  ['The fovea is almost all cones.', 'That describes cones.', 'Cones in the fovea give the highest acuity.'],
  'Rods are very sensitive and pool their signals, which helps in dim light but blurs detail. Cones give color and sharp vision in bright light.', { cs: ['cs-photoreceptor'] });

/* ---------- Attention, thinking & language (6B) ---------- */
C('ps-cog', 'cocktail', 'At a noisy party you suddenly notice your name in a conversation you weren\'t listening to. This shows:', ['The cocktail party effect', 'Inattentional blindness', 'Change blindness', 'Divided attention'],
  ['Inattentional blindness is failing to notice something unexpected while attending elsewhere.', 'Change blindness is missing a change in a scene.', 'Divided attention is doing two tasks at once.'],
  'Unattended input is still processed somewhat, especially when it is personally important, which strict early-filter models of attention couldn\'t explain.', { cs: ['cs-attention'] });
C('ps-cog', 'object-perm', 'A 10-month-old searches for a toy after watching it get hidden under a blanket. In Piaget\'s terms, the baby has developed:', ['Object permanence', 'Conservation', 'Abstract reasoning', 'Egocentrism'],
  ['Conservation arrives in the concrete operational stage, around ages 7 to 11.', 'Abstract reasoning is the formal operational stage, around age 12 and up.', 'Egocentrism is a limit of preoperational thinking, not an achievement.'],
  'Object permanence, knowing that things still exist when out of sight, develops during the sensorimotor stage (birth to about 2).', { hy: true, cs: ['cs-piaget'] });
C('ps-cog', 'preop', 'A 5-year-old insists a tall thin glass holds more juice than a short wide one, even after watching the same juice poured from one to the other. Which Piaget stage fits?', ['Preoperational', 'Sensorimotor', 'Concrete operational', 'Formal operational'],
  ['The sensorimotor stage (0 to 2) is about learning through senses and movement.', 'Concrete operational children understand conservation.', 'The formal operational stage brings abstract, hypothetical reasoning.'],
  'Failing at conservation is the classic sign of the preoperational stage (about 2 to 7), along with egocentrism and symbolic play.', { hy: true, sk: 2, cs: ['cs-piaget'] });
C('ps-cog', 'availability', 'After seeing news coverage of plane crashes, someone judges flying more dangerous than driving. This reflects:', ['The availability heuristic', 'The representativeness heuristic', 'Confirmation bias', 'Belief perseverance'],
  ['Representativeness is judging by how well something matches a prototype.', 'Confirmation bias is seeking information that supports what you already believe.', 'Belief perseverance is keeping a belief after its basis is discredited.'],
  'Vivid, recent examples come to mind easily, so we overestimate how often they happen.', { hy: true, cs: ['cs-heuristics'] });
C('ps-cog', 'represent', 'Told that Sam is quiet and loves poetry, people guess he is more likely a poetry professor than a truck driver, though truck drivers far outnumber poetry professors. This is:', ['The representativeness heuristic', 'The availability heuristic', 'The framing effect', 'Anchoring'],
  ['Availability is judging by how easily examples come to mind.', 'Framing is a choice changing with how options are worded.', 'Anchoring is sticking too close to a first number.'],
  'Judging by resemblance to a stereotype leads people to ignore base rates.', { sk: 2, cs: ['cs-heuristics'] });
C('ps-cog', 'fixedness', 'Someone needs a screwdriver and never thinks to use a coin, because coins are for money. This is:', ['Functional fixedness', 'Mental set', 'Confirmation bias', 'Insight'],
  ['Mental set is sticking with a strategy that worked before.', 'Confirmation bias is favoring information that supports a belief.', 'Insight is a sudden realization of a solution: the opposite of being stuck.'],
  'Functional fixedness is seeing objects only in their usual use.', { cs: ['cs-problem-solving'] });
C('ps-cog', 'broca', 'A patient understands speech but speaks slowly, with great effort, in short broken phrases. Which area is most likely damaged?', ['Broca\'s area, in the frontal lobe', 'Wernicke\'s area, in the temporal lobe', 'The arcuate fasciculus', 'The occipital lobe'],
  ['Wernicke\'s damage gives fluent speech that makes little sense, with poor comprehension.', 'Damage there gives conduction aphasia: trouble repeating phrases.', 'The occipital lobe handles vision.'],
  'Broca\'s (expressive) aphasia: comprehension largely spared, production impaired.', { hy: true, cs: ['cs-aphasia'] });
C('ps-cog', 'whorf', 'The idea that the language you speak shapes how you think and perceive is the:', ['Sapir–Whorf hypothesis (linguistic relativity)', 'Nativist theory of language', 'Learning (behaviorist) theory of language', 'Interactionist theory of language'],
  ['Nativist theory (Chomsky) says humans have an inborn capacity for grammar.', 'Learning theory (Skinner) says language is shaped by reinforcement.', 'Interactionist theory says biology and social interaction together drive language learning.'],
  'The strong version (language determines thought) is rejected; a weaker version (language influences thought) has some support.', { cs: ['cs-language'] });
C('ps-cog', 'goed', 'Young children say "goed" and "mouses", forms they have almost never heard adults use. This is evidence against which view?', ['Language is learned mainly by imitating and being reinforced', 'Children apply grammatical rules they have worked out', 'Humans have an inborn capacity for language', 'Language and thought influence each other'],
  ['Overregularizing is exactly what applying a rule looks like.', 'Rule-finding fits nativist ideas well.', 'This error says nothing against linguistic relativity.'],
  'Imitation and reinforcement can\'t easily explain forms no one models. Overregularization suggests children extract rules, a point for nativist and interactionist views.', { sk: 2, cs: ['cs-language'] });

/* ---------- Memory (6B) ---------- */
C('ps-mem', 'iconic', 'A visual image held for less than a second as a nearly exact copy is in:', ['Sensory (iconic) memory', 'Short-term memory', 'Working memory\'s phonological loop', 'Long-term memory'],
  ['Short-term memory lasts up to about half a minute and holds few items.', 'The phonological loop holds sounds and words, not visual images.', 'Long-term memory lasts much longer and is not an exact copy.'],
  'Sensory memory is brief and large; attention moves a little of it into short-term memory.', { cs: ['cs-memory-stores'] });
T('ps-mem', 'chunking', 'Remembering 1-9-4-5-2-0-0-1 as two years, 1945 and 2001, is called ___.', ['chunking'],
  'Chunking groups items into meaningful units, getting more into short-term memory\'s limited capacity (about 7 ± 2 items).', { cs: ['cs-memory-stores'] });
C('ps-mem', 'primacy', 'People recalling a list remember the first items well because they had time to rehearse them into long-term memory. This is:', ['The primacy effect', 'The recency effect', 'The spacing effect', 'Proactive interference'],
  ['The recency effect is good recall of the last items, still in short-term memory.', 'The spacing effect is that spread-out study beats cramming.', 'Proactive interference is old learning disrupting new learning.'],
  'Together, primacy and recency make the U-shaped serial position curve.', { cs: ['cs-serial-position'] });
C('ps-mem', 'retroactive', 'After learning a new phone number, you can\'t recall your old one. This is:', ['Retroactive interference', 'Proactive interference', 'Decay', 'Encoding failure'],
  ['Proactive interference runs the other way: old learning blocks new.', 'Decay is fading from disuse with time, not disruption by new learning.', 'Encoding failure means the old number was never stored.'],
  'Retro = backward: new learning interferes with recalling older information.', { hy: true, cs: ['cs-interference'] });
C('ps-mem', 'procedural', 'You can ride a bike but can\'t explain exactly how you balance. This skill is stored as:', ['Procedural (implicit) memory', 'Episodic memory', 'Semantic memory', 'Flashbulb memory'],
  ['Episodic memory is for personal events.', 'Semantic memory is for facts and meanings.', 'Flashbulb memories are vivid memories of emotional events.'],
  'Implicit memories show in performance without conscious recall; they rely more on the basal ganglia and cerebellum than the hippocampus.', { hy: true, cs: ['cs-memory-types'] });
C('ps-mem', 'hm', 'After his hippocampi were removed, patient H.M.:', ['Couldn\'t form new memories of facts and events, but could learn new motor skills', 'Lost all memories of his life before surgery but could form new ones', 'Could not hold anything in short-term memory, even for a few seconds', 'Could still form new memories of facts but could no longer learn motor skills'],
  ['His loss of older memories was limited, mostly the years just before surgery.', 'His short-term memory worked normally.', 'He improved at mirror tracing over days without remembering practicing.'],
  'H.M. had anterograde amnesia for declarative memory. Procedural learning does not depend on the hippocampus.', { hy: true, sk: 2, cs: ['cs-memory-types'] });
C('ps-mem', 'misinfo', 'Witnesses asked how fast cars were going when they "smashed" (rather than "hit") later report broken glass that wasn\'t there. This shows:', ['The misinformation effect', 'Mood-congruent memory', 'The spacing effect', 'The primacy effect'],
  ['Mood-congruent memory is recalling memories that match your current mood.', 'The spacing effect is about study timing.', 'The primacy effect is good recall of first items in a list.'],
  'Memory is reconstructive: wording and information given after an event can change what people remember.', { hy: true });
C('ps-mem', 'context', 'Divers who learned words underwater recalled them better underwater than on land. This is:', ['Context-dependent memory', 'State-dependent memory', 'Mood-congruent memory', 'Priming'],
  ['State-dependent memory depends on internal state, such as mood or a drug.', 'Mood-congruent memory is recalling memories that match your current mood.', 'Priming is earlier exposure to a stimulus shaping a later response.'],
  'Retrieval works best when cues at recall match those at encoding (encoding specificity).', { cs: ['cs-retrieval-cues'] });
C('ps-mem', 'ltp', 'The lasting strengthening of a synapse after repeated stimulation, thought to underlie learning, is:', ['Long-term potentiation', 'Synaptic pruning', 'Habituation', 'Neurogenesis'],
  ['Pruning removes unused synapses.', 'Habituation is a drop in response to a repeated stimulus.', 'Neurogenesis is the birth of new neurons.'],
  'In long-term potentiation, stimulated synapses respond more strongly; it is well studied in the hippocampus.', { cat: '6B' });

/* ---------- Consciousness, sleep & drugs (6B) ---------- */
C('ps-sleep', 'rem', 'Which sleep stage has rapid eye movements, vivid dreams, and near-paralysis of skeletal muscles?', ['REM sleep', 'Stage N1', 'Stage N2', 'Stage N3'],
  ['N1 is light sleep with theta waves.', 'N2 has sleep spindles and K-complexes.', 'N3 is deep slow-wave sleep with delta waves.'],
  'REM is "paradoxical sleep": the EEG looks almost awake while the body is nearly paralyzed.', { hy: true, cs: ['cs-sleep'] });
C('ps-sleep', 'delta', 'Delta waves dominate the EEG during:', ['Stage N3 (slow-wave sleep)', 'REM sleep', 'Relaxed wakefulness with eyes closed', 'Stage N1'],
  ['REM looks like waking beta activity.', 'Relaxed wakefulness shows alpha waves.', 'N1 shows theta waves.'],
  'N3 is the deepest sleep; sleepwalking and night terrors happen here.', { cs: ['cs-sleep'] });
C('ps-sleep', 'n2', 'Sleep spindles and K-complexes mark which stage?', ['N2', 'N1', 'N3', 'REM'],
  ['N1 is the brief transition into sleep, with theta waves.', 'N3 is defined by slow delta waves.', 'REM shows fast, low-voltage activity.'],
  'Adults spend about half the night in N2.', { cs: ['cs-sleep'] });
C('ps-sleep', 'beta', 'An alert, awake person concentrating on a problem shows mostly which brain waves?', ['Beta', 'Alpha', 'Theta', 'Delta'],
  ['Alpha waves appear when awake but relaxed, often with eyes closed.', 'Theta waves appear in drowsiness and N1.', 'Delta waves appear in deep N3 sleep.'],
  'From alert to deep sleep, waves get slower and larger: beta, alpha, theta, delta.', { cs: ['cs-sleep'] });
C('ps-sleep', 'scn', 'Which structure is the body\'s master clock, setting circadian rhythms from light information from the eyes?', ['The suprachiasmatic nucleus of the hypothalamus', 'The pineal gland in the center of the brain', 'The pons, in the brainstem below the midbrain', 'The amygdala, deep in the temporal lobe'],
  ['The pineal gland releases melatonin under the master clock\'s control.', 'The pons helps generate REM sleep.', 'The amygdala handles fear and emotion.'],
  'Light reaches the SCN through the retina; darkness lets it signal the pineal gland to release melatonin.', { hy: true });
C('ps-sleep', 'narcolepsy', 'Sudden attacks of sleep during the day, sometimes with sudden loss of muscle tone, describe:', ['Narcolepsy', 'Insomnia', 'Sleep apnea', 'Somnambulism'],
  ['Insomnia is persistent trouble falling or staying asleep.', 'Sleep apnea is breathing that stops repeatedly during sleep.', 'Somnambulism is sleepwalking, during N3.'],
  'Narcolepsy can bring REM straight into wakefulness; the loss of muscle tone is called cataplexy.', { cs: ['cs-sleep-disorders'] });
C('ps-sleep', 'depressant', 'Alcohol and benzodiazepines are both:', ['Depressants that boost the inhibitory effect of GABA', 'Stimulants that raise dopamine and norepinephrine', 'Opioids that act on endorphin receptors', 'Hallucinogens that act on serotonin receptors'],
  ['Stimulants include caffeine, cocaine and amphetamines.', 'Opioids include morphine, heroin and fentanyl.', 'Hallucinogens include LSD and psilocybin.'],
  'Combining depressants is dangerous because their effects on breathing add up.', { hy: true, cs: ['cs-drugs'] });
C('ps-sleep', 'reward', 'Most addictive drugs raise dopamine in which pathway?', ['The mesolimbic pathway, from the ventral tegmental area to the nucleus accumbens', 'The nigrostriatal pathway, from the substantia nigra to the striatum', 'The corticospinal tract, from the motor cortex to the spinal cord', 'The optic tract, from the eyes toward the thalamus'],
  ['The nigrostriatal pathway controls movement; its loss causes Parkinson\'s disease.', 'The corticospinal tract carries motor commands to the spinal cord.', 'The optic tract carries visual signals.'],
  'This "reward pathway" reinforces behaviors, which is how drugs can hijack learning.', { hy: true });

/* ---------- Emotion & stress (6C) ---------- */
C('ps-emo', 'james-lange', '"I feel afraid because I notice my heart pounding." Which theory of emotion says this?', ['James–Lange', 'Cannon–Bard', 'Schachter–Singer', 'Lazarus\'s appraisal theory'],
  ['Cannon–Bard says arousal and feeling happen at the same time, independently.', 'Schachter–Singer says arousal plus a cognitive label makes the emotion.', 'Lazarus says your appraisal of the situation comes first.'],
  'James–Lange: stimulus, then bodily arousal, then the felt emotion, which is our perception of that arousal.', { hy: true, cs: ['cs-emotion-theory'] });
C('ps-emo', 'cannon-bard', 'Which theory holds that bodily arousal and the conscious feeling of emotion happen at the same time but independently?', ['Cannon–Bard', 'James–Lange', 'Schachter–Singer', 'Yerkes–Dodson'],
  ['James–Lange says the feeling follows from noticing the arousal.', 'Schachter–Singer adds a cognitive label to arousal.', 'Yerkes–Dodson is about arousal and performance, not where emotion comes from.'],
  'Cannon pointed out that different emotions share similar arousal and that feelings can arise faster than bodily changes.', { cs: ['cs-emotion-theory'] });
C('ps-emo', 'two-factor', 'People given adrenaline felt happy or angry depending on how an actor in the room behaved. This supports:', ['Schachter–Singer two-factor theory', 'James–Lange theory', 'Cannon–Bard theory', 'Drive-reduction theory'],
  ['James–Lange would predict the same arousal gives the same emotion.', 'Cannon–Bard says feeling doesn\'t depend on interpreting arousal.', 'Drive-reduction theory is about motivation, not emotion.'],
  'Same arousal, different labels, different emotions: the cognitive label matters.', { sk: 2, cs: ['cs-emotion-theory'] });
C('ps-emo', 'amygdala', 'Which brain structure is most closely tied to fear and detecting threats?', ['Amygdala', 'Hippocampus', 'Cerebellum', 'Broca\'s area'],
  ['The hippocampus forms new explicit memories.', 'The cerebellum coordinates movement and balance.', 'Broca\'s area produces speech.'],
  'The amygdala, part of the limbic system, also tags memories with emotional significance.', { hy: true });
C('ps-emo', 'ekman', 'Ekman\'s six basic emotions, with facial expressions recognized across cultures, are happiness, sadness, fear, anger, surprise and:', ['Disgust', 'Jealousy', 'Pride', 'Guilt'],
  ['Jealousy is not one of Ekman\'s six.', 'Pride is not one of Ekman\'s six; it shows mostly through posture.', 'Guilt is not one of Ekman\'s six.'],
  'Six basic emotions with universal expressions support a biological basis for emotion; contempt is sometimes added as a seventh.', {});
C('ps-emo', 'appraisal', 'In Lazarus\'s model, deciding whether a situation is a threat at all is:', ['Primary appraisal', 'Secondary appraisal', 'Coping', 'The alarm stage'],
  ['Secondary appraisal judges whether you can handle it.', 'Coping is what you do in response.', 'Alarm is the first stage of Selye\'s general adaptation syndrome.'],
  'How stressful something feels depends on these appraisals, not just the event.', { cs: ['cs-stress'] });
C('ps-emo', 'gas', 'What is the order of Selye\'s general adaptation syndrome?', ['Alarm, resistance, exhaustion', 'Resistance, alarm, exhaustion', 'Alarm, exhaustion, resistance', 'Exhaustion, alarm, resistance'],
  ['Alarm comes first: the sympathetic fight-or-flight burst.', 'Exhaustion comes last, after long resistance.', 'Exhaustion cannot come first.'],
  'Under prolonged stress, resistance (high cortisol) wears resources down until exhaustion, when illness becomes more likely.', { hy: true, cs: ['cs-stress'] });
C('ps-emo', 'coping', 'An anxious student makes a study schedule for an upcoming exam. This is:', ['Problem-focused coping', 'Emotion-focused coping', 'Primary appraisal', 'A defense mechanism'],
  ['Emotion-focused coping changes how you feel, as with relaxing or reframing, not the situation.', 'Appraisal is judging the situation, not acting on it.', 'Defense mechanisms are unconscious distortions of reality.'],
  'Problem-focused coping tackles the source of stress directly.', { sk: 2, cs: ['cs-stress'] });

/* ---------- Brain, behavior & motivation (7A) ---------- */
C('ps-brain', 'parkinson', 'Parkinson\'s disease involves the loss of neurons that make which neurotransmitter?', ['Dopamine', 'Serotonin', 'Acetylcholine', 'GABA'],
  ['Low serotonin is linked to depression, not Parkinson\'s.', 'Losing acetylcholine neurons is linked to Alzheimer\'s disease.', 'GABA is the main inhibitory transmitter; it is linked to anxiety.'],
  'Dopamine neurons in the substantia nigra die, causing tremor, rigidity and slow movement.', { hy: true, cs: ['cs-neurotransmitters'] });
C('ps-brain', 'gage', 'Phineas Gage survived an iron rod through his frontal lobe but became impulsive and socially inappropriate. This shows the frontal lobe\'s role in:', ['Planning, impulse control and personality', 'Vision', 'Hearing and understanding language', 'Touch and body position'],
  ['Vision is the occipital lobe.', 'Hearing and language comprehension are mainly the temporal lobe.', 'Touch and body position are the parietal lobe.'],
  'The prefrontal cortex supports executive functions: planning, judgment and controlling impulses.', { hy: true, cs: ['cs-lobes'] });
C('ps-brain', 'split', 'A split-brain patient sees an object only in the left visual field and can\'t name it. Why?', ['The image reaches only the right hemisphere, and speech is usually in the left', 'The left eye is disconnected from the brain', 'The left visual field goes to the left hemisphere, which can\'t see', 'The corpus callosum carries all visual input into the brain'],
  ['Each eye sends information to both hemispheres; nothing is disconnected.', 'The left visual field goes to the right hemisphere.', 'Visual input enters through the optic tracts; the corpus callosum only links the hemispheres.'],
  'With the corpus callosum cut, the right hemisphere can recognize the object (the left hand can pick it out) but can\'t pass it to the speaking left hemisphere.', { sk: 2 });
C('ps-brain', 'drive', 'Eating because hunger is an unpleasant internal state you want to relieve fits:', ['Drive-reduction theory', 'Incentive theory', 'Arousal theory', 'Instinct theory'],
  ['Incentive theory is being pulled by outside rewards, like a dessert that looks good.', 'Arousal theory says we seek an optimal level of arousal.', 'Instinct theory says behavior comes from innate, fixed patterns.'],
  'Drive reduction: a physiological need creates a drive, and behavior reduces it, restoring homeostasis.', { hy: true, cs: ['cs-motivation'] });
C('ps-brain', 'maslow', 'In Maslow\'s hierarchy of needs, which level comes directly above safety?', ['Love and belonging', 'Esteem', 'Self-actualization', 'Physiological needs'],
  ['Esteem comes above love and belonging.', 'Self-actualization is at the top.', 'Physiological needs are the base, below safety.'],
  'From the base: physiological, safety, love and belonging, esteem, self-actualization.', { cs: ['cs-motivation'] });
C('ps-brain', 'yerkes', 'Performance is best at moderate arousal, and the best level is lower for hard, complex tasks. This is:', ['The Yerkes–Dodson law', 'Drive-reduction theory', 'The James–Lange theory', 'The general adaptation syndrome'],
  ['Drive reduction is about relieving biological needs.', 'James–Lange is about where emotions come from.', 'The general adaptation syndrome describes the body\'s response to prolonged stress.'],
  'The relationship is an inverted U: too little arousal is sluggish, too much is overwhelming.', { hy: true, cs: ['cs-motivation'] });
C('ps-brain', 'overjust', 'Children who already enjoyed drawing were promised a reward for it, and afterward they drew less on their own than children who got no reward. This is:', ['The overjustification effect', 'Drive reduction', 'Cognitive dissonance', 'Learned helplessness'],
  ['Drive reduction is about relieving biological needs.', 'Dissonance is discomfort from inconsistent beliefs and actions.', 'Learned helplessness is giving up after uncontrollable bad events.'],
  'An outside reward can undermine intrinsic motivation for something already enjoyed.', { sk: 2, cs: ['cs-motivation'] });
C('ps-brain', 'twins', 'Identical twins raised apart are more alike in a trait than fraternal twins raised together. This suggests:', ['Genes contribute substantially to the trait', 'Shared family environment is the main cause', 'The trait has no genetic basis', 'The trait is learned by imitation'],
  ['Fraternal twins raised together share family environment yet are less alike.', 'The identical twins\' similarity despite separation points to genes.', 'Twins raised apart had little chance to imitate each other.'],
  'Identical twins share nearly all their genes; fraternal twins share about half on average.', { sk: 2 });

/* ---------- Personality & psychological disorders (7A) ---------- */
C('ps-pers', 'conscientious', 'Someone organized, dependable and self-disciplined scores high in which Big Five trait?', ['Conscientiousness', 'Agreeableness', 'Openness to experience', 'Extraversion'],
  ['Agreeableness is being warm, trusting and cooperative.', 'Openness is curiosity and liking new ideas and experiences.', 'Extraversion is being outgoing and energized by others.'],
  'The Big Five: openness, conscientiousness, extraversion, agreeableness, neuroticism (OCEAN).', { cs: ['cs-personality'] });
C('ps-pers', 'id', 'In Freud\'s model, which part of the personality follows the pleasure principle and wants immediate gratification?', ['The id', 'The ego', 'The superego', 'The persona'],
  ['The ego follows the reality principle and mediates.', 'The superego is the internalized moral conscience.', 'The persona is Jung\'s idea of the public mask we wear.'],
  'The ego balances the id\'s demands, the superego\'s ideals and reality.', { hy: true, cs: ['cs-freud'] });
C('ps-pers', 'projection', 'A man attracted to a coworker accuses his wife of wanting to cheat. Which defense mechanism is this?', ['Projection', 'Displacement', 'Reaction formation', 'Sublimation'],
  ['Displacement is redirecting feelings onto a safer target.', 'Reaction formation is acting the opposite of what you feel.', 'Sublimation is channeling an impulse into something socially acceptable.'],
  'Projection attributes your own unacceptable feelings to someone else.', { sk: 2, cs: ['cs-defense'] });
C('ps-pers', 'displacement', 'After being yelled at by his boss, a man comes home and kicks the door. Which defense mechanism is this?', ['Displacement', 'Projection', 'Regression', 'Rationalization'],
  ['Projection is seeing your own feelings in someone else.', 'Regression is falling back to childlike behavior.', 'Rationalization is giving a reasonable-sounding excuse.'],
  'The anger is redirected from a risky target (the boss) to a safe one.', { sk: 2, cs: ['cs-defense'] });
C('ps-pers', 'humanistic', 'Which approach to personality stresses free will, unconditional positive regard and the drive to reach one\'s potential?', ['Humanistic', 'Psychoanalytic', 'Behaviorist', 'Trait'],
  ['Psychoanalytic theory stresses unconscious conflicts and early childhood.', 'Behaviorism explains personality through learned responses.', 'Trait theory describes stable dimensions, not growth.'],
  'Rogers and Maslow led the humanistic approach.', { cs: ['cs-personality'] });
C('ps-pers', 'mdd-bipolar', 'What distinguishes bipolar I disorder from major depressive disorder?', ['At least one manic episode', 'Depressive episodes lasting longer than two weeks', 'Psychotic symptoms during an episode', 'Starting in adulthood'],
  ['Long depressive episodes occur in both.', 'Psychotic features can occur in either.', 'Age of onset doesn\'t separate them.'],
  'A manic episode (elevated or irritable mood, less need for sleep, racing thoughts) defines bipolar I.', { hy: true, cs: ['cs-disorders'] });
C('ps-pers', 'negative', 'Which is a negative symptom of schizophrenia?', ['Flat affect and loss of motivation', 'Hallucinations, such as hearing voices', 'Delusions, such as believing one is being watched', 'Disorganized, hard-to-follow speech'],
  ['Hallucinations are a positive symptom, an added experience.', 'Delusions are a positive symptom.', 'Disorganized speech is a positive symptom.'],
  'Negative symptoms are absences of normal functions: flat affect, little speech, low motivation, withdrawal.', { hy: true, cs: ['cs-disorders'] });
C('ps-pers', 'dopamine-schiz', 'The dopamine hypothesis links too much dopamine activity to which disorder\'s positive symptoms?', ['Schizophrenia', 'Major depressive disorder', 'Parkinson\'s disease', 'Generalized anxiety disorder'],
  ['Depression is linked more to serotonin and norepinephrine.', 'Parkinson\'s involves too little dopamine.', 'Anxiety is linked more to GABA and serotonin.'],
  'Antipsychotic drugs that block dopamine receptors reduce hallucinations and delusions.', { cs: ['cs-neurotransmitters'] });
C('ps-pers', 'ocd', 'Repeated intrusive thoughts and urges to perform rituals, such as checking the stove many times, describe:', ['Obsessive–compulsive disorder', 'Generalized anxiety disorder', 'Panic disorder', 'Specific phobia'],
  ['Generalized anxiety is broad, ongoing worry without rituals.', 'Panic disorder is repeated, sudden attacks of intense fear.', 'A specific phobia is intense fear of one object or situation.'],
  'Obsessions are the thoughts; compulsions are the behaviors that relieve the anxiety they cause.', { cs: ['cs-disorders'] });
C('ps-pers', 'diathesis', 'A disorder appears when an inherited vulnerability meets enough life stress. This is the:', ['Diathesis–stress model', 'Biomedical model', 'Psychoanalytic model', 'Drive-reduction model'],
  ['The biomedical model looks only at biological causes.', 'The psychoanalytic model stresses unconscious conflict.', 'Drive reduction is a theory of motivation.'],
  'The diathesis is the vulnerability; it fits the biopsychosocial view of mental illness.', {});

/* ---------- Learning & attitude change (7C) ---------- */
C('ps-learn', 'cs', 'In Pavlov\'s experiment, once the bell alone makes the dog salivate, the bell is the:', ['Conditioned stimulus', 'Unconditioned stimulus', 'Unconditioned response', 'Neutral stimulus'],
  ['The unconditioned stimulus is the food, which causes salivation without learning.', 'The unconditioned response is salivating to the food.', 'The bell was neutral only before conditioning.'],
  'Classical conditioning pairs a neutral stimulus with an unconditioned stimulus until the neutral one alone triggers a response.', { hy: true, cs: ['cs-classical'] });
C('ps-learn', 'cr', 'In Pavlov\'s experiment, after conditioning, a dog salivating when the bell rings is showing the:', ['Conditioned response', 'Unconditioned response', 'Conditioned stimulus', 'Unconditioned stimulus'],
  ['Salivating to the food itself is the unconditioned response.', 'The bell is the conditioned stimulus.', 'The food is the unconditioned stimulus.'],
  'The same behavior (salivating) is unconditioned when caused by food and conditioned when caused by the bell.', { cs: ['cs-classical'] });
C('ps-learn', 'extinction', 'The bell keeps ringing without food, and the dog gradually stops salivating. After a rest, the response briefly returns. These are:', ['Extinction, then spontaneous recovery', 'Generalization, then discrimination', 'Acquisition, then extinction', 'Habituation, then sensitization'],
  ['Generalization and discrimination are about responding to similar stimuli.', 'The response was already acquired before it faded.', 'Habituation and sensitization are non-associative learning, not about a learned pairing.'],
  'Spontaneous recovery shows extinction suppresses the learned response rather than erasing it.', { sk: 2, cs: ['cs-classical'] });
C('ps-learn', 'generalize', 'A child bitten by a German shepherd becomes afraid of all dogs. This is:', ['Stimulus generalization', 'Stimulus discrimination', 'Extinction', 'Negative reinforcement'],
  ['Discrimination would mean fearing only German shepherds.', 'Extinction is the fear fading.', 'Negative reinforcement strengthens a behavior by removing something unpleasant.'],
  'A conditioned response spreads to stimuli similar to the original.', { cs: ['cs-classical'] });
C('ps-learn', 'negreinf', 'Aspirin makes your headaches go away, so you take aspirin more often when they start. This is:', ['Negative reinforcement', 'Positive reinforcement', 'Positive punishment', 'Negative punishment'],
  ['Positive reinforcement adds something pleasant.', 'Punishment makes a behavior less likely, but this behavior increases.', 'Negative punishment removes something pleasant to reduce a behavior.'],
  'Reinforcement increases a behavior; "negative" means something (the headache) is taken away.', { hy: true, sk: 2, cs: ['cs-operant'] });
C('ps-learn', 'negpun', 'A teenager loses phone privileges for breaking curfew and then breaks curfew less. This is:', ['Negative punishment', 'Negative reinforcement', 'Positive punishment', 'Extinction'],
  ['Reinforcement would make the behavior more likely.', 'Positive punishment adds something unpleasant, such as extra chores.', 'Extinction is stopping a reward that kept a behavior going.'],
  'Punishment decreases a behavior; "negative" means something pleasant is removed.', { hy: true, sk: 2, cs: ['cs-operant'] });
C('ps-learn', 'vr', 'Which reinforcement schedule gives a high, steady response rate and the most resistance to extinction, as with slot machines?', ['Variable ratio', 'Fixed ratio', 'Fixed interval', 'Variable interval'],
  ['Fixed ratio gives high rates but with pauses after each reward.', 'Fixed interval gives a scalloped pattern: little responding until the time nears.', 'Variable interval gives steady but slower responding.'],
  'Reward after an unpredictable number of responses: the next one might always pay.', { hy: true, cs: ['cs-schedules'] });
C('ps-learn', 'fi', 'A student barely studies early in the term but studies hard just before each exam, which comes on a fixed date. This pattern matches which schedule?', ['Fixed interval', 'Fixed ratio', 'Variable interval', 'Variable ratio'],
  ['Fixed ratio rewards a set number of responses, not timing.', 'Variable interval makes timing unpredictable, so responding stays steady.', 'Variable ratio gives steady high responding, not bursts.'],
  'Fixed intervals give the "scallop": responding speeds up as the expected time approaches.', { sk: 2, cs: ['cs-schedules'] });
C('ps-learn', 'bobo', 'Children who watched an adult hit a Bobo doll later hit the doll themselves. This shows:', ['Observational learning', 'Classical conditioning', 'Shaping', 'Latent learning'],
  ['No neutral stimulus was paired with an unconditioned one.', 'Shaping rewards closer and closer approximations; the children weren\'t rewarded.', 'Latent learning is learning that shows only once a reward appears.'],
  'Bandura showed learning by watching a model, without direct reinforcement.', { hy: true });
C('ps-learn', 'elm', 'A viewer is persuaded by an ad because a celebrity appears in it, without thinking much about the claims. In the elaboration likelihood model, this is the:', ['Peripheral route', 'Central route', 'Foot-in-the-door technique', 'Cognitive dissonance'],
  ['The central route means weighing the arguments carefully.', 'Foot-in-the-door is a compliance tactic: a small request first.', 'Dissonance is discomfort from inconsistent beliefs and actions.'],
  'Peripheral-route attitude change is quick but tends to be less lasting than central-route change.', { hy: true, cs: ['cs-attitude'] });
C('ps-learn', 'dissonance', 'Someone who paid a lot for a car that keeps breaking down insists it\'s a great car. This reduces:', ['Cognitive dissonance', 'Learned helplessness', 'Social loafing', 'Stereotype threat'],
  ['Learned helplessness is giving up after uncontrollable bad events.', 'Social loafing is putting in less effort in a group.', 'Stereotype threat is underperforming when a negative stereotype is made salient.'],
  'Festinger: when actions and beliefs clash, we often change the belief to match the action.', { cs: ['cs-attitude'] });

/* ---------- Social influence & groups (7B) ---------- */
C('ps-social', 'asch', 'In Asch\'s line experiments, many people gave clearly wrong answers to match the group. This demonstrates:', ['Conformity', 'Obedience', 'Group polarization', 'Social loafing'],
  ['Obedience is following direct orders from an authority, as in Milgram\'s studies.', 'Group polarization is discussion pushing a group toward a more extreme view.', 'Social loafing is less effort when working in a group.'],
  'Conformity dropped sharply when even one other person gave the right answer.', { hy: true, cs: ['cs-social-influence'] });
C('ps-social', 'milgram', 'Which change to Milgram\'s procedure sharply reduced obedience?', ['The experimenter gave orders by phone from another room', 'Participants were paid before the session began', 'The learner mentioned a heart condition', 'The experimenter wore a gray lab coat'],
  ['Participants were always paid in advance; money wasn\'t what kept them going.', 'A standard version included the heart condition, and obedience stayed about 65%.', 'The lab coat was part of the standard procedure.'],
  'Obedience fell when the authority was distant, and fell further when peers refused or the learner was physically close.', { hy: true, sk: 2, cs: ['cs-social-influence'] });
C('ps-social', 'facilitation', 'An experienced pianist plays better with an audience, but a beginner plays worse. This is:', ['Social facilitation', 'Social loafing', 'Deindividuation', 'Group polarization'],
  ['Social loafing is slacking off when individual effort is hidden in a group.', 'Deindividuation is losing self-awareness in a crowd.', 'Group polarization is about attitudes becoming more extreme.'],
  'An audience raises arousal, which helps on simple or well-practiced tasks and hurts on hard or new ones.', { hy: true, cs: ['cs-group-effects'] });
C('ps-social', 'bystander', 'A person collapses on a busy sidewalk and no one helps, each assuming someone else will. This is:', ['The bystander effect', 'Social loafing', 'Groupthink', 'Deindividuation'],
  ['Social loafing is less effort on a shared task.', 'Groupthink is a group suppressing doubts to keep harmony in decisions.', 'Deindividuation is losing self-awareness in a crowd.'],
  'Diffusion of responsibility: the more people present, the less any one feels responsible.', { hy: true, cs: ['cs-group-effects'] });
C('ps-social', 'groupthink', 'A close-knit committee ignores warnings and silences doubters to keep agreement, leading to a bad decision. This is:', ['Groupthink', 'Group polarization', 'Social facilitation', 'The bystander effect'],
  ['Polarization is a shift to a more extreme view, not suppressing dissent.', 'Social facilitation is about performance in front of others.', 'The bystander effect is about failing to help.'],
  'Groupthink: pressure for consensus overrides realistic judgment.', { cs: ['cs-group-effects'] });
C('ps-social', 'polarization', 'After discussion, a group of mildly pro-policy members becomes strongly pro-policy. This is:', ['Group polarization', 'Groupthink', 'Deindividuation', 'Social loafing'],
  ['Groupthink is about silencing doubts for harmony, not shifting the average view.', 'Deindividuation is loss of self-awareness in crowds.', 'Social loafing is about effort.'],
  'Discussion tends to push a group further in the direction its members already leaned.', { cs: ['cs-group-effects'] });
C('ps-social', 'fitd', 'A canvasser first asks you to sign a petition, then later asks you to volunteer for a weekend. Saying yes to the small request makes yes to the big one more likely. This is:', ['The foot-in-the-door technique', 'The door-in-the-face technique', 'The peripheral route', 'The reciprocity norm'],
  ['Door-in-the-face starts with a big request that is refused, then a smaller one.', 'The peripheral route is persuasion by surface cues.', 'Reciprocity is returning a favor someone did for you.'],
  'Agreeing once shifts how people see themselves ("I\'m someone who helps").', { cs: ['cs-compliance'] });
C('ps-social', 'strain', 'Merton\'s strain theory says deviance happens when:', ['People lack legitimate means to reach goals their culture values', 'Other people label someone as deviant, and the label sticks', 'People learn deviant behavior from friends and family around them', 'People\'s bonds to family, school and community are weak'],
  ['That is labeling theory.', 'That is differential association (Sutherland).', 'That is social control theory (Hirschi).'],
  'For example, someone who values wealth but lacks access to good jobs may turn to theft (innovation, in Merton\'s terms).', { hy: true, cs: ['cs-deviance'] });
C('ps-social', 'labeling', 'A teen arrested once comes to see himself as a delinquent and commits more crimes. Which theory of deviance does this fit?', ['Labeling theory', 'Strain theory', 'Differential association', 'Social control theory'],
  ['Strain theory is about blocked access to valued goals.', 'Differential association is learning deviance from others.', 'Social control theory is about weak social bonds.'],
  'Being labeled deviant (primary deviance) can lead people to adopt the identity (secondary deviance).', { sk: 2, cs: ['cs-deviance'] });

/* ---------- Identity & development (8A) ---------- */
C('ps-self', 'erik-teen', 'In Erikson\'s theory, the central conflict of adolescence is:', ['Identity vs. role confusion', 'Intimacy vs. isolation', 'Industry vs. inferiority', 'Generativity vs. stagnation'],
  ['Intimacy vs. isolation is young adulthood.', 'Industry vs. inferiority is school age, about 6 to 12.', 'Generativity vs. stagnation is middle adulthood.'],
  'Adolescents try out roles and values to form a stable sense of who they are.', { hy: true, cs: ['cs-erikson'] });
C('ps-self', 'erik-old', 'A 75-year-old looking back on whether their life had meaning faces which Erikson stage?', ['Integrity vs. despair', 'Generativity vs. stagnation', 'Intimacy vs. isolation', 'Identity vs. role confusion'],
  ['Generativity is middle adulthood: contributing to the next generation.', 'Intimacy is young adulthood: forming close relationships.', 'Identity is adolescence.'],
  'Erikson\'s eighth and final stage.', { cs: ['cs-erikson'] });
C('ps-self', 'erik-infant', 'Erikson\'s first stage, in infancy, is:', ['Trust vs. mistrust', 'Autonomy vs. shame and doubt', 'Initiative vs. guilt', 'Industry vs. inferiority'],
  ['Autonomy vs. shame is the toddler stage.', 'Initiative vs. guilt is the preschool stage.', 'Industry vs. inferiority is school age.'],
  'Consistent, responsive care builds basic trust.', { cs: ['cs-erikson'] });
C('ps-self', 'kohlberg', 'A teen says, "You shouldn\'t steal because it\'s against the law, and society needs rules." In Kohlberg\'s theory, this is:', ['Conventional morality', 'Preconventional morality', 'Postconventional morality', 'Formal operational thought'],
  ['Preconventional reasoning is about avoiding punishment or getting rewards.', 'Postconventional reasoning appeals to principles that can override laws.', 'Formal operations is Piaget\'s cognitive stage, not a level of moral reasoning.'],
  'The conventional level is about approval, rules and maintaining social order.', { hy: true, sk: 2, cs: ['cs-kohlberg'] });
C('ps-self', 'zpd', 'Tasks a child can do with help but not yet alone fall in Vygotsky\'s:', ['Zone of proximal development', 'Sensorimotor stage', 'Latency stage', 'Conventional level'],
  ['The sensorimotor stage is Piaget\'s first stage.', 'Latency is one of Freud\'s psychosexual stages.', 'The conventional level is Kohlberg\'s middle level of moral reasoning.'],
  'Vygotsky stressed learning through social interaction with more skilled people (scaffolding).', { hy: true });
C('ps-self', 'looking-glass', 'Cooley\'s idea that we form our self-image from how we imagine others see us is the:', ['Looking-glass self', 'Generalized other', 'Self-serving bias', 'Ideal self'],
  ['The generalized other is Mead\'s idea of society\'s internalized expectations.', 'Self-serving bias is taking credit for successes and blaming failures on circumstances.', 'The ideal self is Rogers\' idea of who we want to be.'],
  'We imagine how we appear, imagine others\' judgments, and feel pride or shame in response.', { hy: true, cs: ['cs-self'] });
C('ps-self', 'mead-i', 'In Mead\'s theory, the spontaneous, acting part of the self, as opposed to the socialized part that sees itself as others do, is the:', ['"I"', '"Me"', 'Generalized other', 'Looking-glass self'],
  ['The "me" is the socialized self, shaped by others\' attitudes.', 'The generalized other is society\'s expectations as we come to take them in.', 'The looking-glass self is Cooley\'s idea.'],
  'The "I" acts; the "me" is the self as an object, seen through others\' eyes.', { cs: ['cs-self'] });
C('ps-self', 'efficacy', 'A student believes she can master organic chemistry if she puts in the work. This belief is her:', ['Self-efficacy', 'Self-esteem', 'Self-concept', 'External locus of control'],
  ['Self-esteem is overall feeling of self-worth, not confidence about a task.', 'Self-concept is the overall picture of who you are.', 'An external locus would mean believing outside forces decide the outcome.'],
  'Bandura: self-efficacy is belief in your ability to succeed at a specific task, and it predicts effort and persistence.', { sk: 2, cs: ['cs-self'] });
C('ps-self', 'locus', 'Someone who believes their grades depend mostly on luck and the teacher has:', ['An external locus of control', 'An internal locus of control', 'High self-efficacy', 'A strong reference group'],
  ['An internal locus means believing your own actions decide outcomes.', 'High self-efficacy means believing you can succeed through your own effort.', 'A reference group is who you compare yourself with.'],
  'Locus of control (Rotter) is a general belief about who controls outcomes: oneself or outside forces.', { cs: ['cs-self'] });

/* ---------- Social thinking, bias & prejudice (8B) ---------- */
C('ps-think', 'fae', 'A stranger trips on the stairs and you assume they\'re clumsy, without considering that the steps were slippery. This is:', ['The fundamental attribution error', 'The actor–observer bias', 'The self-serving bias', 'The halo effect'],
  ['The actor–observer bias specifically contrasts how you explain your own behavior with others\'.', 'Self-serving bias is about explaining your own successes and failures.', 'The halo effect is one good trait coloring how you see others.'],
  'We overestimate personality and underestimate the situation when explaining other people\'s behavior.', { hy: true, cs: ['cs-attribution'] });
C('ps-think', 'actor-obs', 'You say you were late because of traffic, but when a classmate is late you think they\'re disorganized. This is:', ['The actor–observer bias', 'The self-serving bias', 'The just-world hypothesis', 'In-group bias'],
  ['Self-serving bias is about successes vs. failures, not self vs. others.', 'The just-world hypothesis is believing people get what they deserve.', 'In-group bias is favoring your own group.'],
  'For ourselves we see the situation; for others we see their personality.', { sk: 2, cs: ['cs-attribution'] });
C('ps-think', 'selfserving', 'After an A, a student credits her intelligence; after a C, she blames an unfair test. This is:', ['The self-serving bias', 'The fundamental attribution error', 'The actor–observer bias', 'Stereotype threat'],
  ['The fundamental attribution error is about judging others.', 'Actor–observer is about the self vs. others, not success vs. failure.', 'Stereotype threat is underperforming when a negative stereotype is salient.'],
  'Taking credit for successes and blaming failures on circumstances protects self-esteem.', { cs: ['cs-attribution'] });
C('ps-think', 'threat', 'Women reminded of a stereotype about gender and math score lower on a math test than women who weren\'t reminded. This is:', ['Stereotype threat', 'A self-fulfilling prophecy', 'Discrimination', 'In-group bias'],
  ['In a self-fulfilling prophecy, others\' expectations change how they treat someone.', 'Discrimination is unfair treatment by others.', 'In-group bias is favoring your own group.'],
  'Worry about confirming a negative stereotype about your group can hurt performance.', { hy: true, cs: ['cs-prejudice'] });
C('ps-think', 'discrim', 'Which of these is discrimination rather than prejudice or a stereotype?', ['Refusing to rent an apartment to someone because of their ethnicity', 'Disliking a group without knowing any of its members', 'Believing all members of a group are lazy', 'Feeling uneasy around people of another religion'],
  ['That is prejudice, a negative attitude.', 'That is a stereotype, an overgeneralized belief.', 'That is a feeling, prejudice, not an action.'],
  'Stereotypes are beliefs, prejudice is an attitude or feeling, discrimination is behavior.', { hy: true, cs: ['cs-prejudice'] });
C('ps-think', 'pygmalion', 'Teachers told that certain students (actually picked at random) would bloom academically saw those students\' scores rise. This is:', ['A self-fulfilling prophecy', 'Stereotype threat', 'The halo effect', 'The just-world hypothesis'],
  ['Stereotype threat comes from the student\'s own worry about a stereotype.', 'The halo effect is one positive trait coloring overall impressions.', 'The just-world hypothesis is believing people get what they deserve.'],
  'Expectations changed how teachers treated the students, which produced the expected result.', { hy: true });
C('ps-think', 'ethnocentrism', 'Judging another culture\'s customs as inferior by the standards of your own is:', ['Ethnocentrism', 'Cultural relativism', 'Cultural lag', 'Assimilation'],
  ['Cultural relativism is judging a culture by its own standards.', 'Cultural lag is norms falling behind changes in technology.', 'Assimilation is a minority group adopting the dominant culture.'],
  'Ethnocentrism can strengthen in-group ties but feeds prejudice toward outsiders.', { hy: true, cs: ['cs-culture'] });
C('ps-think', 'justworld', 'After a disaster, some people blame the victims, as if "people get what they deserve." This reflects:', ['The just-world hypothesis', 'The self-serving bias', 'The actor–observer bias', 'Cognitive dissonance'],
  ['Self-serving bias is about explaining your own successes and failures.', 'Actor–observer is about explaining your own behavior vs. others\'.', 'Dissonance is discomfort from your own inconsistent beliefs and actions.'],
  'Believing the world is fair is comforting, but it can lead to victim blaming.', { cs: ['cs-attribution'] });

/* ---------- Status, roles, groups & organizations (8C) ---------- */
C('so-interact', 'ascribed', 'Which is an ascribed status?', ['Being someone\'s daughter', 'Being a college graduate', 'Being a physician', 'Being a marathon runner'],
  ['A degree is earned: an achieved status.', 'Becoming a physician is earned: achieved.', 'Running marathons is chosen and earned: achieved.'],
  'Ascribed statuses are assigned at birth or without choice, such as age or family position.', { hy: true, cs: ['cs-status'] });
C('so-interact', 'master', 'A status that dominates how others see a person, overshadowing their other statuses, is a:', ['Master status', 'Ascribed status', 'Role', 'Reference group'],
  ['An ascribed status is assigned, but it need not dominate.', 'A role is the behavior expected of a status.', 'A reference group is who you compare yourself with.'],
  'For example, a serious illness or a famous job can become a master status.', { cs: ['cs-status'] });
C('so-interact', 'role-conflict', 'A student-athlete\'s big game falls the night before a major exam. This clash between two of her roles is:', ['Role conflict', 'Role strain', 'Role exit', 'Status inconsistency'],
  ['Role strain is competing demands within a single role.', 'Role exit is leaving a role behind.', 'Status inconsistency is holding statuses of very different rank.'],
  'Conflict = between roles; strain = within one role.', { hy: true, sk: 2, cs: ['cs-roles'] });
C('so-interact', 'role-strain', 'A new nurse feels pulled between charting, caring for many patients and training a student, all parts of the one job. This is:', ['Role strain', 'Role conflict', 'Role exit', 'A master status'],
  ['Role conflict is a clash between two different roles.', 'Role exit is leaving a role.', 'A master status dominates how others see someone.'],
  'Role strain: tension among the demands of a single role.', { sk: 2, cs: ['cs-roles'] });
C('so-interact', 'primary', 'A small group with close, personal, long-lasting ties, such as a family, is a:', ['Primary group', 'Secondary group', 'Reference group', 'Out-group'],
  ['Secondary groups are larger and impersonal, built around a goal, like a workplace.', 'A reference group is one you compare yourself with.', 'An out-group is a group you don\'t belong to.'],
  'Cooley\'s term: primary groups shape identity and offer emotional support.', { cs: ['cs-groups'] });
C('so-interact', 'gemeinschaft', 'Tönnies used "Gemeinschaft" to describe:', ['Community bound by personal ties and shared values, as in a small village', 'Society based on impersonal, goal-driven ties, as in a big city', 'A formal organization with written rules', 'A loose social network'],
  ['That is Gesellschaft.', 'That describes a bureaucracy.', 'Networks are a separate concept.'],
  'Tönnies contrasted Gemeinschaft (community) with Gesellschaft (society) to describe the shift to modern life.', { cs: ['cs-groups'] });
C('so-interact', 'bureaucracy', 'Which is a feature of Weber\'s ideal bureaucracy?', ['Hiring and promotion based on qualifications, under written rules', 'Decisions based on personal loyalty to the leader rather than rules', 'No clear chain of command between levels of staff', 'Duties that change from day to day as needed'],
  ['Personal loyalty is what bureaucracy replaces.', 'Bureaucracies have a clear hierarchy of authority.', 'Bureaucracies have a fixed division of labor.'],
  'Weber\'s ideal type: hierarchy, division of labor, written rules, impersonality, merit-based employment.', { cs: ['cs-organizations'] });
C('so-interact', 'oligarchy', 'Michels\' "iron law of oligarchy" says that organizations tend to:', ['Come under the control of a small group of leaders, even if they start out democratic', 'Grow more democratic as they get bigger', 'Run on efficiency, predictability and control, like fast-food chains', 'Spread one culture around the world'],
  ['Michels argued the opposite.', 'That is McDonaldization (Ritzer).', 'That describes cultural globalization.'],
  'Leaders gain expertise and control over information, and the organization comes to serve their interests.', { cs: ['cs-organizations'] });
C('so-interact', 'dramaturgy', 'Goffman compared social life to theater, with a "front stage" where we manage the impression we make. This is the:', ['Dramaturgical approach', 'Looking-glass self', 'Social exchange theory', 'Labeling theory'],
  ['The looking-glass self is Cooley\'s idea of seeing ourselves through others\' eyes.', 'Social exchange theory says we weigh rewards and costs in relationships.', 'Labeling theory is about how deviant labels shape identity.'],
  'Backstage is where we relax and drop the performance.', { hy: true, cs: ['cs-self'] });
C('so-interact', 'secure', 'In the Strange Situation, a toddler is upset when the mother leaves and is quickly comforted when she returns. This is:', ['Secure attachment', 'Avoidant attachment', 'Ambivalent (resistant) attachment', 'Disorganized attachment'],
  ['Avoidant children show little distress and ignore the parent on return.', 'Ambivalent children are very distressed and hard to soothe, even resisting the parent.', 'Disorganized children show confused, contradictory behavior.'],
  'Ainsworth\'s procedure; secure attachment grows from consistent, responsive care.', { hy: true, cs: ['cs-attachment'] });
C('so-interact', 'institutional', 'A height rule for a job excludes most women, though no one meant to discriminate. This is:', ['Institutional discrimination', 'Individual discrimination', 'Prejudice', 'Stereotype threat'],
  ['Individual discrimination is one person treating another unfairly.', 'Prejudice is an attitude, not a policy.', 'Stereotype threat affects the performance of the stereotyped person.'],
  'Institutional discrimination is built into policies and practices, whatever anyone intends.', { hy: true, cs: ['cs-prejudice'] });

/* ---------- Theories, institutions & culture (9A) ---------- */
C('so-theory', 'functionalism', 'Which perspective sees society as interdependent parts that each serve a function in keeping the whole stable?', ['Functionalism', 'Conflict theory', 'Symbolic interactionism', 'Social constructionism'],
  ['Conflict theory stresses competition for power and resources.', 'Symbolic interactionism studies how people create meaning in everyday interaction.', 'Social constructionism studies how shared agreement creates social reality.'],
  'Durkheim and Parsons are the classic functionalists.', { hy: true, cs: ['cs-soc-theory'] });
C('so-theory', 'conflict', 'Which perspective, rooted in Marx, sees society as shaped by groups competing for power and scarce resources?', ['Conflict theory', 'Functionalism', 'Symbolic interactionism', 'Social exchange theory'],
  ['Functionalism stresses how parts work together for stability.', 'Symbolic interactionism focuses on everyday meaning-making.', 'Social exchange theory looks at individuals weighing costs and rewards.'],
  'Conflict theory asks who benefits from social arrangements and how inequality is kept in place.', { hy: true, cs: ['cs-soc-theory'] });
C('so-theory', 'interactionism', 'A sociologist studies how a handshake, a uniform or a nickname takes on shared meaning between people. Which perspective?', ['Symbolic interactionism', 'Functionalism', 'Conflict theory', 'Rational choice theory'],
  ['Functionalism looks at large-scale structures and their functions.', 'Conflict theory looks at power and inequality between groups.', 'Rational choice looks at individuals maximizing benefit.'],
  'A micro-level perspective (Mead, Blumer): people act on the meanings things have for them.', { cs: ['cs-soc-theory'] });
C('so-theory', 'constructionism', 'The idea that money is valuable only because people collectively agree it is fits:', ['Social constructionism', 'Functionalism', 'Conflict theory', 'Social exchange theory'],
  ['Functionalism explains features by what they do for society.', 'Conflict theory focuses on competition for resources.', 'Social exchange theory focuses on costs and rewards in relationships.'],
  'Socially constructed things are real in their effects even though they rest on shared agreement.', { cs: ['cs-soc-theory'] });
C('so-theory', 'exchange', 'Someone stays in a friendship because its rewards outweigh its costs. Which theory explains this?', ['Social exchange theory', 'Functionalism', 'Conflict theory', 'Symbolic interactionism'],
  ['Functionalism explains society-wide institutions, not individual choices.', 'Conflict theory is about group competition for resources.', 'Symbolic interactionism is about shared meanings.'],
  'Social exchange (and rational choice) theory: people weigh costs and benefits in interactions.', { cs: ['cs-soc-theory'] });
C('so-theory', 'latent', 'A university\'s manifest function is to educate. Which is a latent function?', ['Students meet future spouses there', 'It teaches courses to its students', 'It awards degrees to graduates', 'Its faculty conduct research'],
  ['Teaching is an intended (manifest) function.', 'Granting degrees is intended.', 'Research is an intended function of universities.'],
  'Merton: manifest functions are intended and recognized; latent functions are unintended.', { hy: true, sk: 2, cs: ['cs-functions'] });
C('so-theory', 'hidden', 'Schools teach punctuality, obedience and competition without listing them as goals. This is the:', ['Hidden curriculum', 'Teacher expectancy effect', 'Tracking', 'Credentialism'],
  ['Teacher expectancy is teachers\' expectations shaping students\' performance.', 'Tracking is grouping students by perceived ability.', 'Credentialism is the growing emphasis on degrees for jobs.'],
  'Conflict theorists argue the hidden curriculum prepares students for their expected place in the class structure.', { cs: ['cs-education'] });
C('so-theory', 'sickrole', 'In Parsons\' "sick role", people who are ill are excused from normal duties, but in return they are expected to:', ['Try to get well and seek appropriate medical help', 'Prove that the illness was not their fault', 'Stay away from doctors', 'Pay for their own care'],
  ['Not being blamed for the illness is one of the rights of the sick role, not something to prove.', 'Seeking competent help is an obligation of the role.', 'Payment is not part of Parsons\' model.'],
  'Rights: exemption from duties and from blame. Obligations: want to recover and cooperate with treatment.', { hy: true });
C('so-theory', 'medicalization', 'Treating something once seen as a normal part of life, such as aging or shyness, as a medical condition is:', ['Medicalization', 'The sick role', 'Secularization', 'Cultural lag'],
  ['The sick role is about expectations of people who are ill.', 'Secularization is the decline of religion\'s influence.', 'Cultural lag is norms falling behind technology.'],
  'Medicalization expands what doctors treat, for better or worse.', { cs: ['cs-health-soc'] });
C('so-theory', 'lag', 'Laws and social norms struggling to keep up with new technology, such as social media, is:', ['Cultural lag', 'Culture shock', 'Cultural diffusion', 'Ethnocentrism'],
  ['Culture shock is disorientation in an unfamiliar culture.', 'Diffusion is the spread of cultural traits between groups.', 'Ethnocentrism is judging other cultures by your own standards.'],
  'Ogburn: nonmaterial culture (values, norms, laws) changes more slowly than material culture.', { cs: ['cs-culture'] });
C('so-theory', 'nonmaterial', 'Which is part of a society\'s nonmaterial (symbolic) culture?', ['Its values and language', 'Its buildings', 'Its tools', 'Its clothing'],
  ['Buildings are physical objects: material culture.', 'Tools are material culture.', 'Clothing is material culture, though it can carry symbolic meaning.'],
  'Nonmaterial culture: values, beliefs, norms, symbols and language.', { cs: ['cs-culture'] });

/* ---------- Demographics & social change (9B) ---------- */
C('so-demo', 'transition', 'In the demographic transition model, stage 2 is marked by:', ['Falling death rates while birth rates stay high, so the population grows fast', 'High birth rates and high death rates, so growth stays slow', 'Falling birth rates as death rates level off, so growth slows', 'Low birth and death rates, so the population is fairly stable'],
  ['That is stage 1, before industrialization.', 'That is stage 3.', 'That is stage 4.'],
  'Better food, sanitation and medicine cut deaths first; birth rates fall later, with urbanization and education.', { hy: true, cs: ['cs-demographic'] });
C('so-demo', 'malthus', 'Malthus predicted that:', ['Population would outgrow the food supply, bringing famine and disease', 'Population growth would stop on its own as societies industrialized', 'Technology would always keep food ahead of population', 'Wealthier societies would have more children'],
  ['That is closer to the demographic transition model.', 'That is the usual critique of Malthus, not his claim.', 'Wealth tends to go with lower birth rates.'],
  'Malthus argued population grows geometrically while food grows only arithmetically.', { hy: true, cs: ['cs-demographic'] });
C('so-demo', 'push', 'A family leaves its country because of war. In migration terms, the war is a:', ['Push factor', 'Pull factor', 'Brain drain', 'Chain migration'],
  ['A pull factor draws people to a new place, such as jobs or safety there.', 'Brain drain is the loss of skilled people from a country.', 'Chain migration is following relatives who moved earlier.'],
  'Push factors drive people out; pull factors draw them in.', { cs: ['cs-migration'] });
T('so-demo', 'cbr', 'The number of live births per 1,000 people per year is the crude ___ rate.', ['birth'],
  'Crude birth rate. The total fertility rate is different: the average number of children per woman.', { cs: ['cs-demographic'] });
C('so-demo', 'reform', 'The civil rights movement sought specific legal changes that would affect everyone. In Aberle\'s terms, it was a:', ['Reformative movement', 'Revolutionary movement', 'Redemptive movement', 'Alternative movement'],
  ['A revolutionary movement seeks to replace the whole social order.', 'A redemptive movement seeks deep change in particular individuals.', 'An alternative movement seeks limited change in particular individuals.'],
  'Aberle sorted movements by how much change they seek and for whom.', { sk: 2 });
C('so-demo', 'sexgender', 'How do sociologists distinguish sex from gender?', ['Sex is biological; gender is socially constructed roles and expectations', 'They are interchangeable terms for the same biological traits', 'Gender refers to biology, while sex refers to social expectations', 'Sex is a status, while gender is never a status'],
  ['Sociology uses the terms differently.', 'That reverses the definitions.', 'Gender is also a status, one that shapes expected roles.'],
  'Gender roles and expectations vary across cultures and over time.', {});
C('so-demo', 'race-eth', 'How do sociologists distinguish race from ethnicity?', ['Race rests on perceived physical traits; ethnicity on shared culture or ancestry', 'Race rests on shared culture and language; ethnicity on physical traits', 'They are interchangeable terms that sort people into the same groups', 'Race can change over a person\'s lifetime, but ethnicity is fixed at birth'],
  ['That reverses the definitions.', 'Sociology uses the terms differently.', 'Both are socially constructed, and the categories people use change over time.'],
  'Both are social constructions: the categories and their meanings vary across societies and eras.', {});
C('so-demo', 'globalization', 'The growing integration of economies and cultures worldwide through trade, travel and communication is:', ['Globalization', 'Urbanization', 'Gentrification', 'Assimilation'],
  ['Urbanization is the growing share of people living in cities.', 'Gentrification is wealthier people moving into poorer neighborhoods.', 'Assimilation is a minority group adopting the dominant culture.'],
  'Globalization spreads goods, ideas and people, along with diseases and inequalities.', {});

/* ---------- Class, mobility & inequality (10A) ---------- */
C('so-ineq', 'cultural-cap', 'Knowing how to talk, dress and act in the ways valued by elite schools and employers is Bourdieu\'s:', ['Cultural capital', 'Social capital', 'Economic capital', 'Human capital'],
  ['Social capital is the value of your social networks.', 'Economic capital is money and assets.', 'Human capital is skills and education that raise productivity.'],
  'Cultural capital helps pass advantage from one generation to the next.', { hy: true, cs: ['cs-capital'] });
C('so-ineq', 'social-cap', 'Getting a job interview through a friend of a friend draws on:', ['Social capital', 'Cultural capital', 'Economic capital', 'Meritocracy'],
  ['Cultural capital is know-how and tastes valued by elites.', 'Economic capital is money.', 'Meritocracy is advancement by ability, not connections.'],
  'Weak ties (acquaintances) are especially useful for finding jobs.', { sk: 2, cs: ['cs-capital'] });
C('so-ineq', 'intergen', 'A child of farm laborers becomes a surgeon. This is:', ['Upward intergenerational mobility', 'Upward intragenerational mobility', 'Horizontal mobility', 'Downward mobility'],
  ['Intragenerational mobility is a change within one person\'s own career.', 'Horizontal mobility is moving to a different job of similar rank.', 'Becoming a surgeon is a move up.'],
  'Inter = between generations (parent to child); intra = within one lifetime.', { hy: true, cs: ['cs-mobility'] });
C('so-ineq', 'intragen', 'A cashier works her way up to store manager over her career. This is:', ['Upward intragenerational mobility', 'Upward intergenerational mobility', 'Horizontal mobility', 'Structural mobility'],
  ['Intergenerational mobility compares a person with their parents.', 'Horizontal mobility keeps the same rank.', 'Structural mobility comes from society-wide changes, such as new industries.'],
  'Moving up within one\'s own working life.', { cs: ['cs-mobility'] });
C('so-ineq', 'relative', 'Having less than most people in your society consider a normal standard of living, even though basic needs are met, is:', ['Relative poverty', 'Absolute poverty', 'Social exclusion', 'Downward mobility'],
  ['Absolute poverty means not having enough for basic needs such as food and shelter.', 'Social exclusion is being cut off from taking part in society.', 'Downward mobility is a fall in status over time.'],
  'Relative poverty is measured against others in the same society.', { hy: true, cs: ['cs-poverty'] });
C('so-ineq', 'meritocracy', 'A system in which people rise mainly through talent and effort is a:', ['Meritocracy', 'Caste system', 'Estate system', 'Oligarchy'],
  ['A caste system fixes status at birth.', 'An estate system (as in feudal Europe) ties status largely to birth and land.', 'An oligarchy is rule by a small elite.'],
  'Many societies describe themselves as meritocratic, but inherited advantages still shape outcomes.', {});
C('so-ineq', 'gentrify', 'Wealthier residents move into a low-income neighborhood, rents rise, and long-time residents are pushed out. This is:', ['Gentrification', 'Residential segregation', 'Suburbanization', 'Urban sprawl'],
  ['Segregation is the separation of groups into different neighborhoods.', 'Suburbanization is people moving from cities to suburbs.', 'Sprawl is low-density growth spreading outward from cities.'],
  'An example of spatial inequality: where people live shapes their access to resources.', { cs: ['cs-space'] });
C('so-ineq', 'envjustice', 'Pollution and waste sites placed disproportionately in poor and minority neighborhoods are the central concern of:', ['Environmental justice', 'Gentrification', 'Globalization', 'Cultural relativism'],
  ['Gentrification is wealthier newcomers displacing residents.', 'Globalization is worldwide economic and cultural integration.', 'Cultural relativism is judging a culture by its own standards.'],
  'Environmental hazards add to health disparities between neighborhoods.', { cs: ['cs-space'] });
C('so-ineq', 'gradient', 'Across many countries, lower socioeconomic status goes with:', ['Higher rates of illness and shorter life expectancy', 'Lower rates of chronic diseases such as diabetes', 'No consistent difference in health or longevity', 'Longer life expectancy and fewer hospital stays'],
  ['Chronic disease is more common at lower SES.', 'The health gradient is one of the most consistent findings in social science.', 'Life expectancy rises with SES.'],
  'The social gradient in health runs all the way up the income ladder, not just at the bottom.', { hy: true });
C('so-ineq', 'reproduction', 'The way inequality passes from one generation to the next, partly through schools and inheritance, is called:', ['Social reproduction', 'Social mobility', 'Meritocracy', 'Globalization'],
  ['Mobility is movement between positions, the opposite tendency.', 'Meritocracy is advancement by ability.', 'Globalization is worldwide integration.'],
  'Bourdieu argued that schools reward the cultural capital of advantaged families.', { cs: ['cs-capital'] });
