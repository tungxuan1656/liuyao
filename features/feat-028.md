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
- [ ] Three- and four-coin line values and distributions match `reading-flow.md`.
- [ ] Automatic outcomes are generated before animation, revealed without changing, and cannot be retriggered while animating.
- [ ] Preset and Base UI configuration match `ui-layout.md` across all web routes.
- [ ] Three.js, Radix, obsolete renderers, and duplicated control styling are removed.
- [ ] Triangle/square coin layouts, Unicode faces, and in-place flips pass desktop/mobile visual review.
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

- State: active on `feat/028-coin-casting`, PR #49. The user superseded the 3D direction and selected six vertical direct-input rows.
- Evidence: Planning inspected preset decoding, CLI migration flags, current components, and affected routes. Earlier runtime evidence remains in progress history.
- Limit: The application still uses the previous implementation. The new plan has no implementation or runtime-verification claim.
- Next: Obtain review of the replacement plan, then execute Task 1 inline on this branch.
