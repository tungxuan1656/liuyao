# Placeholder return-link target implementation plan

> **Execution:** Follow the repository's implementation and verification rules. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every shared placeholder's Return to home link at least 44×44 CSS pixels with visible keyboard focus.

**Architecture:** Keep the change within `RouteShell` in `apps/web/src/routes.ts`. Apply the existing library-detail link's minimum-size and focus utilities to the home-return link without changing `ROUTES.home` or the shared router.

**Tech Stack:** React 19, React Router, Tailwind CSS, pnpm.

## Global Constraints

- F00 routing and AppShell foundation only; no future Library, Settings, or Casting screens.
- Preserve the `/library`, `/settings`, and `/casting` route destinations and Return to home navigation to `ROUTES.home`.
- Meet the minimum interactive target of 44×44 CSS pixels and visible keyboard focus in `docs/product-specs/ui-layout.md`.
- Keep this work in the assigned checkout on `feat/feat-001-placeholder-target-fix`; do not alter merged PR #10 or unrelated features.

---

## Scope and tasks

### Task 1: Shared placeholder return link

**Files:** Modify `apps/web/src/routes.ts`.

**Interface:** `RouteShell` continues to render the same `Link` to `ROUTES.home` on `/library`, `/settings`, and `/casting`. The library detail link continues to point to `ROUTES.library`.

- [ ] Confirm the existing Return to home anchor lacks minimum target dimensions and focus utilities; confirm the library-detail link already has both.
- [ ] Reuse the library-detail anchor's `inline-flex min-h-11 min-w-11 items-center` and `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring` utilities for the Return to home anchor, retaining underline utilities and its `to: ROUTES.home`.
- [ ] Check `/library`, `/settings`, and `/casting` at a compact viewport: each Return to home anchor has a bounding box at least 44px wide and high, is keyboard-focusable with a visible focus outline, and navigates to `/`. Check the library detail back link still navigates to `/library`.

### Task 2: Verification and handoff

**Files:** Modify `feature_index.json` and `features/feat-001.md`; append to `progress.md`.

- [ ] Inspect `git status` and `git diff` before running `./init.sh`, which runs write-capable fixers. Run it only when unrelated user changes will not be rewritten; otherwise coordinate first. Inspect any fixer output rather than silently including unrelated changes. Run the read-only verification in `docs/development.md` if needed to substantiate the handoff.
- [ ] Transition feat-001 in `feature_index.json` from `done` to `active` for this follow-up, because merged PR #10 left the index done while this review finding is unresolved. Keep it `active` in the follow-up PR; transition `active` to `done` only after that PR merges and acceptance is confirmed.
- [ ] Record the P2 review finding, route-size/focus/navigation evidence, verification results, and PR handoff in `features/feat-001.md`. Append one material update to `progress.md` noting PR #10 merged and follow-up PR pending; keep feat-001 active until merge.
- [ ] Commit only scoped work, push this branch, and open a follow-up PR against `main` with verification evidence and any limitations.

## Acceptance

- All three Return to home links render an interactive target at least 44×44 CSS pixels with visible keyboard focus.
- All three continue to target `ROUTES.home`; library detail navigation is unchanged.
- `./init.sh` passes; the plan and updated feature handoff are part of the follow-up PR.

## Decision log

- **2026-09-26 — Scope:** Address the P2 in the shared F00 placeholder component rather than introducing destination-specific styling or later-feature screens.
- **2026-09-26 — Verification:** Use direct UI measurement for app-only behavior because `docs/development.md` disallows app test files.
- **2026-09-26 — Plan review:** Record the explicit feat-001 status transition and the pre-`./init.sh` working-tree guard; both are required even for this narrow follow-up because the harness runs write-capable fixers.
