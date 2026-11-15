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

### Added in v0.1.1 (from build spec delta v2)

- **Re-entry ramp (D2).** After one or more days away, the first visit opens a Welcome back screen. It never shows how many days were missed or how many cards are overdue. Backlog appears only as "back on schedule by ‹date›", from a 14-day simulation, and you can pick a catch-up pace: Normal, Faster (+20%) or Fastest (+50%). The first answer after a break lights a cosmetic comeback beacon, celebrated in the Debrief. The new-card throttle now counts backlog that today's cap can't absorb.
- **If-then plans (D3).** One or two plans ("If I finish breakfast, then I will do Daily Rounds at my desk") are written at setup or on the Plans page. You rehearse them on the weekly card and when you come back after a break.
- **Weeks and seasons (D16).** The first visit each week shows a "This week" card: rehearse your plan, set an active-days goal (default 5) and optionally pick a focus wing, which supplies up to half of the day's new cards. A new season starts each month, on semester start dates you add, and after a break of 7 or more days, with a recap and a re-plan prompt.
- **Sleep-aware Intake (D13).** Wake time and bedtime set an Intake window: evening (bedtime −2 h to −30 min) or a one-tap morning alternative. Intake is never blocked outside it. An optional daily sleep check halves new cards after a short night and skips them after a poor one. Reviews never change.
- **Blocks and a stopping point (D14).** After about 20 minutes of answering, "Block done" offers an optional, skippable two-minute look-away. Once Rounds and Intake are done, the Station shows "Today's essentials are done."
- **Post-mortems and calibration trend (D15).** After a corrected wrong "Sure", one optional tap records what happened: misread, didn't know it, reasoning slip, trap or careless. Debrief and Calibration tally the answers. Calibration adds a month-by-month trend for each bet level and a short primer, offered again at each phase change.
- **Exercise note (D23).** A modest, dismissible note in the Intake debrief.
- **Logging (D1, partial).** Logs gain session and block ids, local hour, sleep flag, hint level, selection reason, recovery pace and Intake slot, so the D1 experiments can be analyzed later.

Planned for later versions, per the spec: Scout pretests, the Workshop ladder, contrast-set Expeditions and Boss runs (v0.2); Case Files and CARS (v0.3); Psych/Soc and biochemistry coverage (v0.4); Exam Sim (v1.0).

## The cards

- **Deck.** 516 original cards across 44 units of General Chemistry I–II, General Biology I–II and Physics I–II, covering every Bio/Biochem and Chem/Phys content category (1A–5E). 81 of them are calculation cards that generate fresh numbers on every review, and code computes their answers. Psych/Soc and CARS arrive in later versions.
- **No AAMC material.** AAMC content-category codes are used as tags only.
- **Blind cross-check.** Two fresh-context checkers (Claude Opus 5.5 and Claude Sonnet 5.5) answered every card with the key hidden and the options shuffled differently, as in spec §8.3, step 4: the first 354 cards on Nov 14, the 162 expansion cards on Nov 15. Every card agreed with its key; three that a checker called loosely worded were rewritten and passed a second blind check. Only cross-checked cards can enter Intake. The audit trail is in `check/` and `check/round2/`.
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
node test/ui_habit.js         # delta v2: re-entry, pace, plans, weeks, seasons, sleep, blocks, post-mortems
```

## Licenses

The code is MIT and the cards (`src/content_*.js`) are CC BY-NC-SA 4.0. The project is non-commercial: no ads and no payments.
