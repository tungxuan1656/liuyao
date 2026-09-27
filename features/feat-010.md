# feat-010 — Settings

## Goal

A user can inspect versions, conventions, PWA state, and offline readiness.

## Scope

- Implement the V1 work defined for F09 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F09 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: A user can inspect versions, conventions, PWA state, and offline readiness.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F09-T01 — Show web app version
- [x] F09-T02 — Show `@liuyao/core` version
- [x] F09-T03 — Show `@liuyao/knowledge` version
- [x] F09-T04 — Show ruleset ID
- [x] F09-T05 — Show online or offline state
- [x] F09-T06 — Show install state when the browser exposes it
- [x] F09-T07 — Show update availability
- [x] F09-T08 — Show fixed line and ruleset conventions
- [x] F09-T09 — Link About, licensing, privacy, and security information
- [x] F09-T10 — Do not add account, sync, history, analytics, or cloud controls

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Bounded plan

1. Replace the Settings route placeholder with responsive diagnostics using the existing app shell and package metadata.
2. Show live network and install state only when supported browser signals are available; reuse the existing service-worker update signal and require an explicit update action.
3. Link existing About, license, privacy, and security information without inventing policies or adding out-of-scope controls.
4. Run `./init.sh` and check compact/wide layouts plus available PWA states in a browser.

## Evidence

- Starting point: branch `feat/010-settings`, clean at `1f004fd133677d3eb1d7866d6bcdd5d572c0adb2`.
- Design: coordinator approved a compact diagnostics layout with truthful browser-state handling.
- `./init.sh` passed after implementation: lint had only the existing Fast Refresh warning in `components/ui/button.tsx`; typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests passed.
- Agent-browser at 390×844 and 1440×900 showed all diagnostics and no horizontal overflow. At 390px document width was 375px; at 1440px it was 1425px. Chromium exposed install availability during the first browser session; later session did not expose an install prompt. The page reported the available/unreported state accordingly.
- The browser showed no waiting update, so the available-update action was not exercised. No real offline transition was verified; synthetic online/offline event dispatch did not change Chromium's `navigator.onLine` value.
- About, license, and security link to repository information; Privacy links to the in-page session-only data statement. No standalone privacy policy exists yet.
- `git diff --check` passed. No browser console errors were reported.

## Dependencies

- `feat-001`
- `feat-003`
- `feat-006`

## Handoff

- State: implementation complete locally; coordinator validation pending.
- Evidence: see the Evidence section above.
- Dependency check: feat-001, feat-003, and feat-006 are done.
- Next: Coordinator validates F09 scope and evidence; do not mark done until coordinator acceptance.
