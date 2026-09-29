# feat-028 — Manual and automatic coin casting modes

## Goal

Support user-matched physical tosses and the selected three- or four-coin casting model in the reading flow.

## Scope

- Implement per-line manual coin flips with confirmation, plus direct six-line selection.
- Implement automatic per-line outcomes and the coin/shell reveal interaction.
- Follow the canonical product behavior in `docs/product-specs/reading-flow.md` and presentation rules in `docs/product-specs/ui-layout.md`.

## Acceptance

- [ ] Manual mode lets users set each individual coin to match a physical toss, confirms each line, and preserves completed lines on revisit unless explicitly reset.
- [ ] Three- and four-coin line values and distributions match `reading-flow.md`.
- [ ] Automatic outcomes are generated before animation, revealed without changing, and cannot be retriggered while animating.
- [ ] **Highest-priority motion criterion:** The shell has a natural inertial shake/tip; coins fall individually with staggered timing and restrained contact/settle wobble, without synchronized repetitive spins or bounces. Visually review smoothness on mobile and desktop, confirm no layout shift or dropped-feeling motion, and record that review (a generic “smooth” claim is insufficient).
- [ ] Direct mode exposes all six rows at once with yin, yang, moving yin, and moving yang choices.
- [ ] The coin visuals, reduced-motion behavior, responsive layout, and keyboard/screen-reader behavior meet `ui-layout.md`.
- [ ] No history or persistence is added; prior completed readings remain available on revisit unless the user explicitly resets or starts over.
- [ ] Relevant tests and repository verification pass.

## Dependencies

- `feat-005` — Casting core
- `feat-007` — Reading flow

## Plan

- [`docs/plans/feat-028.md`](../docs/plans/feat-028.md)

## Handoff

- State: active on `feat/028-coin-casting`; implementation and automated verification are complete, but visual motion review and end-to-end flow checks remain.
- Verification: `./init.sh` passed after the component split: formatting, lint (two warnings), typecheck, build, 225 package tests, and package exports. Browser sampling confirmed desktop/iPhone coin faces and stable casting-stage height (242px desktop, 220px mobile); a non-reduced-motion sample remained in `is-casting` at 80/450/900/1400ms, revealed the result by 1900ms, and kept stage height constant. Reduced motion revealed immediately. Three- and four-coin mappings were checked exhaustively in core tests. Manual/direct browser checks were partial; full six-line completion, revisit, and reset were not validated.
- Blocker: The required meaningful mobile and desktop live-animation visual review is not complete. Timing and layout samples do not prove natural motion quality; do not check the motion acceptance criterion or mark feat-028 done.
- Next: Perform and record meaningful live-animation visual review on mobile and desktop, then validate full six-line completion, revisit, and reset behavior before finalizing acceptance.
