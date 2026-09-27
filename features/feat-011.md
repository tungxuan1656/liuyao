# feat-011 — Offline hardening

## Goal

Core V1 flows survive network loss, reload, install, and safe app updates.

## Scope

- Implement the V1 work defined for F10 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F10 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Core V1 flows survive network loss, reload, install, and safe app updates.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F10-T01 — Precache application shell
- [ ] F10-T02 — Precache required knowledge assets
- [ ] F10-T03 — Remove remote runtime dependencies from core flows
- [x] F10-T04 — Add a visible non-blocking offline state
- [ ] F10-T05 — Keep cached navigation usable without network
- [ ] F10-T06 — Replace unsafe forced auto-update behavior with a draft-safe update flow
- [ ] F10-T07 — Preserve active draft until the user accepts an update
- [ ] F10-T08 — Keep normal browser use when installation is unavailable
- [ ] F10-T09 — Verify direct-route reload under service-worker control
- [ ] F10-T10 — Verify online → offline → reload → online recovery

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Bounded plan

1. Preserve the assigned fixer changes to Vite registration and the PWA update store; do not edit those paths.
2. Add a global, non-blocking update banner backed by the shared update snapshot. “Later” dismisses only for the current mount; accepting an update prompts before reload if a draft or completed reading is held in React state.
3. Keep the home question and selected method in the in-memory reading session, and confirm an update whenever the question, non-default method, draft, or completed reading would be lost. Suppress the casting `beforeunload` guard only after explicit update acceptance.
4. Make Settings consume the same snapshot for update and offline readiness, with labels that distinguish reported from unconfirmed state.
5. Run `./init.sh`; verify production-preview routes, offline behavior, and update flow where browser conditions permit.

## Decisions

- UI scope owns the banner, Settings presentation, and route placement only. The existing `pwa-update.ts` store and registration bootstrap are owned by the parallel fixer and must remain untouched.
- No persistence is added. Draft and completed-reading detection uses the existing `ReadingSessionProvider` state.
- No update is applied automatically; dismissal does not call the update API.
- The accepted-update marker is session memory only. It suppresses the casting `beforeunload` prompt for the intentional update reload and is cleared after the casting component observes it; ordinary navigation remains protected by the route blocker.

## Evidence

- `./init.sh` passed after the UI safety correction: format, lint/length (one existing Fast Refresh warning), typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. `git diff --check` passed.
- Production preview direct navigation of `/settings` and `/library/hexagram/hexagram-01` rendered app routes at 390×844. Settings layout document width was 375px (viewport 390px), with no horizontal overflow. Preview reported offline readiness and exposed install availability; it had no registered worker/waiting update.
- Offline emulation retained the direct hexagram route/content, but Chromium still reported `navigator.onLine === true`; the offline notice was not verified, and this is not claimed as an online→offline recovery test.
- No waiting update existed to test the update banner, Later action, draft/completed-reading confirmation, or actual apply/reload path. No F10 completion is claimed from this UI lane alone.
- F10-T06/T07 remain unchecked until a two-build waiting-update test verifies Later, confirmation, and accepted reload with draft state.
- `git diff --check` passed. Browser automation reported no page errors.

## Dependencies

- `feat-007`
- `feat-008`
- `feat-009`
- `feat-010`

## Handoff

- State: active; UI safety correction implemented and locally verified, coordinator validation pending.
- Evidence: Starting branch `feat/011-offline-reliability` at `1bc1ad4ab232d699fdc54078b828a102566254bb`; expected fixer-owned dirty paths are preserved.
- Dependency check: feat-007, feat-008, feat-009, and feat-010 are done.
- Next: Coordinator validates the combined lanes; the two-build update lifecycle remains outstanding and F10-T06/T07 stay unchecked.
