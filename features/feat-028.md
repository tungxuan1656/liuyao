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

- State: active on `feat/028-coin-casting`; implementation and broader acceptance remain in progress.
- Evidence: Final `./init.sh` and `git diff --check` passed; the earlier progress record reports a 17/17 release-scenario run before this follow-up. Browser QA verified four-coin casting from 1/6 through 6/6 with one-press next, revisit preserving 2/6, and result navigation. On the final CSS, Casting and Result had no horizontal overflow at 320px, 390px, or 1280px; Result board rows were 48px and its desktop inspector remained visible. Sitewide spacing and casting UI follow `docs/product-specs/ui-layout.md` and `docs/product-specs/reading-flow.md`.
- Limits: `pnpm test:release` is absent from the current root and web package scripts, so its old evidence does not verify this follow-up. User preview, physical-phone motion, and broader feat-028 criteria remain unverified. Do not infer manual mode, three-coin, reset-mid-animation, keyboard, or reduced-motion acceptance from the new browser evidence. Earlier evidence remains recorded in `progress.md`.
- Next: Review the updated preview and verify remaining acceptance criteria; resolve the stale release-check references before declaring the feature done.
