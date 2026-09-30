# feat-028 — shadcn UI migration and coin casting modes

## Goal

Deliver a consistent Base UI interface with simple three-/four-coin casting, readable line input, and a responsive bento layout across the web application.

## Scope

- Apply the selected shadcn preset across all web routes and shared controls.
- Replace Three.js with a fixed-position DOM/CSS coin flip.
- Rebuild Home, automatic/manual casting, and six-row direct input.
- Arrange Home, Result, Library, Library detail, Settings, and casting in task-focused bento cards. Use mobile top/back navigation and bottom tabs on every route; use a desktop top header without an application back link.
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
- [x] The web routes use the installed shadcn components and Sera preset for cards, controls, feedback, and contextual sheets without replacing shared component defaults.
- [x] Desktop layouts use content-led card spans; narrow screens stack cards without horizontal overflow at 320px.
- [x] Mobile has a contextual back link and persistent bottom tabs; desktop has a top navigation header without a back link.

## Dependencies

- `feat-005` — Casting core
- `feat-007` — Reading flow

## Plan

- [`docs/plans/feat-028.md`](../docs/plans/feat-028.md)

## Handoff

- State: done by explicit user direction on 2026-09-30; the responsive bento redesign is implemented across all routes and the PR #52 review fixes are applied. The unchecked acceptance criteria above remain unverified and are not claimed as passed.
- Evidence: `./init.sh` and `git diff --check` passed after the redesign and again after the review fixes. Browser review at 320px, 390px, and 1440px covered Home, automatic casting, direct six-line completion, Result with a fact Sheet, Library, Library detail, Settings, and offline feedback. These screens had no horizontal document overflow. A desktop result fact button was corrected from 18px to its intended 44px minimum. The earlier manual casting, reset, animation, and session evidence remains recorded in `progress.md`.
- Evidence (PR #52 review): Chromium measurements at 320px found the automatic-casting primary action clipped 28px by the card (`overflow-hidden`) and the two-row Library tab grid overflowing its 40px `TabsList` into the search label; both were fixed and re-measured at 0px clipping and no overlap. Search clear, rule filters, and tab triggers were restored to 44px targets. Section titles now expose `role="heading"`, list rows use `divide-y` instead of per-row borders, the mobile casting border seam is 1px, and the dead `route-page--*` modifiers are removed. Canonical preset `b59jumGwPA` was confirmed with `pnpm dlx shadcn@latest preset resolve`.
- Limits: `pnpm test:release` is absent from root and web scripts. Preview at 360–420px, user preview, physical-phone motion, actual screen-reader announcements, full keyboard traversal, fresh reload boundaries, and complete desktop/mobile flip review remain unverified.
- Blockers: none; the remaining checks need review before treating the full acceptance set as verified.
- Next: Push the review fixes to `refactor/ui-ux-web` and run the remaining visual, assistive-technology, and session-boundary checks.
