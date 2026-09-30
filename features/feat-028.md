# feat-028 — shadcn UI migration and coin casting modes

## Goal

Deliver a consistent Base UI interface with simple three-/four-coin casting and readable line input.

## Scope

- Apply the selected shadcn preset across all web routes and shared controls.
- Replace Three.js with a fixed-position DOM/CSS coin flip.
- Rebuild Home, automatic/manual casting, and six-row direct input.
- Follow `docs/product-specs/reading-flow.md` and the intended replacement in `docs/product-specs/ui-layout.md`.

## Acceptance

- [x] Manual mode lets users set each individual coin to match a physical toss, confirms each line, and preserves completed lines on revisit unless explicitly reset.
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

- State: active; manual and automatic casting share the workspace. Broader acceptance remains open.
- Evidence: Final `./init.sh` and `git diff --check` passed. Browser QA at 320px completed six manual lines, revisited locked faces, reset through confirmation, and opened the result. The shared footer stayed at one vertical position across waiting, animation, reveal, and six-line manual completion; reset and primary actions fit at 320px and 390px. An explicit automatic toss remained busy under emulated reduced motion, then revealed one saved result. A completed reading survived in-app navigation and cleared after confirmed “Lập mới.”
- Limits: `pnpm test:release` is absent from root and web scripts. User preview, physical-phone motion, actual screen-reader announcements, full keyboard traversal, fresh reload boundaries, and complete desktop/mobile flip review remain unverified.
- Next: Review the preview and verify the remaining visual, assistive-technology, and session-boundary criteria before marking the feature done.
