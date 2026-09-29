# feat-028 — Manual and automatic coin casting modes

## Goal

Support user-matched physical tosses and the selected three- or four-coin casting model in the reading flow.

## Scope

- Implement per-line manual coin flips with confirmation, plus direct six-line selection.
- Implement automatic per-line outcomes, a forming hexagram, and a 3D coin/camera reveal.
- Follow the canonical product behavior in `docs/product-specs/reading-flow.md` and presentation rules in `docs/product-specs/ui-layout.md`.

## Acceptance

- [ ] Manual mode lets users set each individual coin to match a physical toss, confirms each line, and preserves completed lines on revisit unless explicitly reset.
- [ ] Three- and four-coin line values and distributions match `reading-flow.md`.
- [ ] Automatic outcomes are generated before animation, revealed without changing, and cannot be retriggered while animating.
- [ ] **Highest-priority motion criterion:** Review the approved 3D launch, staggered contact, settle, overhead camera reveal, and face readability on mobile and desktop. Record evidence and limitations under `ui-layout.md` criteria.
- [ ] All casting modes show named outcomes without numeric 6/7/8/9; direct mode exposes all six rows at once.
- [ ] The coin visuals, reduced-motion behavior, responsive layout, stable action-bar position, and keyboard/screen-reader behavior meet `ui-layout.md`.
- [ ] No history or persistence is added; prior completed readings remain available on revisit unless the user explicitly resets or starts over.
- [ ] Relevant tests and repository verification pass.

## Dependencies

- `feat-005` — Casting core
- `feat-007` — Reading flow

## Plan

- [`docs/plans/feat-028.md`](../docs/plans/feat-028.md)

## Handoff

- State: active on PR #49; the readability follow-up adds always-on toss animation, shared moving-line symbols, and four elemental coin palettes.
- Verification: `./init.sh` passed (225 package tests, one existing lint warning); release E2E passed 16/16, including an active toss under reduced-motion emulation. Browser checks confirmed changed flight pixels and delayed reveal for WebGL and DOM fallback under reduced motion, both moving markers at 24×24px, and mid-flight reset without a stale reveal. Mobile direct/result screens have no horizontal overflow; the primary board shows four expected moving markers.
- Visual evidence: reviewed desktop 1280×900 and mobile 390×844 elemental faces, circle/cross markers, DOM fallback, and the mobile result board. Shared icon paths and palettes identify both faces in 3D and DOM. Previous six-line/revisit and offline evidence is recorded in progress history.
- Limits: viewport emulation does not establish physical-phone frame pacing. The lazy 3D chunk adds about 134kB gzip and produces a non-blocking Vite size warning.
- Next: Review the updated PR preview for motion and elemental-symbol readability on the user's device before marking the feature done.
