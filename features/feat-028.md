# feat-028 — shadcn UI migration and coin casting modes

## Goal

Deliver a consistent Base UI interface with simple three-/four-coin casting and readable line input.

## Scope

- Apply the selected shadcn preset across all web routes and shared controls.
- Replace Three.js with a fixed-position DOM/CSS coin flip.
- Rebuild Home, automatic/manual casting, and six-row direct input.
- Follow `docs/product-specs/reading-flow.md` and the intended replacement in `docs/product-specs/ui-layout.md`.

## Acceptance

- [ ] Manual mode lets users set each individual coin to match a physical toss, confirms each line, and preserves completed lines on revisit unless explicitly reset.
- [x] Three- and four-coin line values and distributions match `reading-flow.md`.
- [x] Automatic outcomes are generated before animation, revealed without changing, and cannot be retriggered while animating.
- [x] Preset and Base UI configuration match `ui-layout.md` across all web routes.
- [x] Three.js, Radix, obsolete renderers, and duplicated control styling are removed.
- [ ] Triangle/square coin layouts, Unicode faces, and in-place flips pass desktop/mobile visual review.
- [x] All casting modes show named outcomes without numeric 6/7/8/9; direct mode exposes all six rows at once.
- [ ] The coin visuals, reduced-motion behavior, responsive layout, stable action-bar position, and keyboard/screen-reader behavior meet `ui-layout.md`.
- [ ] No history or persistence is added; prior completed readings remain available on revisit unless the user explicitly resets or starts over.
- [x] Relevant tests and repository verification pass.

## Dependencies

- `feat-005` — Casting core
- `feat-007` — Reading flow

## Plan

- [`docs/plans/feat-028.md`](../docs/plans/feat-028.md)

## Handoff

- State: active on `feat/028-coin-casting`, PR #49; implementation and automated verification are complete locally.
- Evidence: `./init.sh` passed with 225 package tests; `pnpm test:release` passed 17/17; `git diff --check` passed. Browser audit at 320/390/1280px verified direct-choice widths, manual action targets, Library tabs, fixed coin centers, alternating glyphs, and Home mouse/keyboard navigation.
- Limit: Physical-phone motion pacing and user review of the PR preview remain outstanding. Build logs include sourcemap-location and >500KB chunk warnings.
- Next: Present the updated PR #49 preview for user visual review after implementation changes are committed and pushed.
