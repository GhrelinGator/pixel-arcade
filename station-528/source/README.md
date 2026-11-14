# Station 528

A local-first MCAT study game for one learner, built from the "Gamify the Retrieval, Not the Reward" spec. This is version 0.1, "Rounds".

Live: https://ghrelingator.github.io/pixel-arcade/station-528/

## What v0.1 does

- **Daily Rounds.** FSRS-6 decides what is due. Reviews are capped at 150 a day by default; when more are due, the lowest current recall goes first and the rest are pushed back, but never more than 3 days in a row. Cards are never shown early.
- **Intake.** New cards come only from the units you open in Settings, introduced in blocks, with every 5th one a reasoning (Skill 2) item. Each new card stays in the session until you recall it correctly 3 times, with at least 5 other cards between repeats.
- **Generate, then choose.** For typed and numeric cards you write the answer. Multiple-choice options stay hidden for at least 3 seconds until you press Reveal.
- **Confidence bets (certainty-based marking).** Unsure scores +1 / 0, Fairly sure +2 / −2 and Sure +3 / −6. "I don't know" scores 0. Only first attempts are scored.
- **Grades come from behavior, never self-rating.** A wrong answer or "don't know" is Again; correct at Unsure or with the hint is Hard; correct at Fairly sure, or at Sure but slow, is Good; correct at Sure within 2× your median time is Easy.
- **Hypercorrection loop.** A wrong "Sure" opens a Surprise panel. You must re-enter the correct answer, the card is rated Again, and echo probes come back at +1 and +7 days.
- **Feedback.** Every attempt gets an explanation, and choice cards say why each wrong option is wrong.
- **Exam-date rules.** Phases A–D switch on their own, setting target retention and maximum interval. No due date falls later than T − 2 days. The final sweep runs at T − 60, and new cards stop at T − 21.
- **Station hub.** It has 11 wings: foundational concepts 1–10 plus CARS. A wing's lights show its mean current recall; its level (0–5) is the share of its cards with stability of 21 days or more. Station rank is the sum of the wing levels.
- **Headline numbers.** Projected exam-day recall, outline coverage, and calibration against target bands.
- **Debrief.** Shows exam-day items gained, the certainty-based score, high-confidence misses and tomorrow's load.
- **Data stays local.** Storage is IndexedDB, with `navigator.storage.persist()`, one-click JSON export and import, and a weekly backup reminder.
- **Flagging.** One tap suspends and quarantines a card. A card answered wrong at Sure twice is auto-flagged so its answer key gets a second look.

Planned for later versions, per the spec: Scout pretests, the Workshop ladder, contrast-set Expeditions and Boss runs (v0.2); Case Files and CARS (v0.3); Psych/Soc and biochemistry coverage (v0.4); Exam Sim (v1.0).

## The cards

- **Deck.** 354 original cards across 29 units of General Chemistry I–II, General Biology I–II and Physics I–II. 58 of them are calculation cards that generate fresh numbers on every review, and code computes their answers.
- **No AAMC material.** AAMC content-category codes are used as tags only.
- **Blind cross-check.** Two fresh-context checkers (Claude Opus 5.5 and Claude Sonnet 5.5) answered every card with the key hidden and the options shuffled differently, as in spec §8.3, step 4. All 354 agreed with the key. The audit trail is in `check/`.
- **No human expert review yet.** Use ⚑ Flag on anything doubtful.

## Build and test

There are no npm dependencies; FSRS-6 is implemented in `src/engine.js`.

```
python3 build.py              # -> site/ (single-file index.html, sw.js, manifest, icons)
node test/engine_test.js      # FSRS-6 checks vs py-fsrs examples; spec §13 items 1–4, 6, 8
node test/session_test.js     # successive relearning, gaps, first-attempt scoring, intake rules
node tools/lint.js            # content lint (structure, one key, NOT/EXCEPT share, generators)
node tools/blind.js export    # key-hidden sets for a new cross-check; `compare write` records verdicts
node test/ui_flow.js          # end-to-end on a phone viewport, incl. backup round trip (§13.9)
node test/ui_targeted.js      # calculation card, hint lock, appeal, keyboard flow
```

## Licenses

The code is MIT and the cards (`src/content_*.js`) are CC BY-NC-SA 4.0. The project is non-commercial: no ads and no payments.
