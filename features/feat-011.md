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

- [x] Complete all F10 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: Core V1 flows survive network loss, reload, install, and safe app updates.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F10-T01 — Precache application shell
- [x] F10-T02 — Precache required knowledge assets
- [x] F10-T03 — Remove remote runtime dependencies from core flows
- [x] F10-T04 — Add a visible non-blocking offline state
- [x] F10-T05 — Keep cached navigation usable without network
- [x] F10-T06 — Replace unsafe forced auto-update behavior with a draft-safe update flow
- [x] F10-T07 — Preserve active draft until the user accepts an update
- [x] F10-T08 — Keep normal browser use when installation is unavailable
- [x] F10-T09 — Verify direct-route reload under service-worker control
- [x] F10-T10 — Verify online → offline → reload → online recovery

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

- Prior implementation validation: `./init.sh` passed format, lint/length (one existing Fast Refresh warning), typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. Browser QA below was performed against production builds.
- Production build at `localhost:4188`: confirmed the service worker activated and controlled the page, application shell and fonts were precached, observed network requests were same-origin, and offline route/settings content plus the non-blocking offline banner worked. The controlled sequence online → offline → reload → online recovered successfully.
- Isolated two-build fixture at `localhost:4192`: confirmed v1→v2 update detection via a conditional 200 response and a waiting worker. The waiting-update banner appeared without reloading; the question, manual method, and two entered lines remained intact. “Later” retained state (also observed in a prior run). “Update now” opened confirmation; “Keep reading” preserved the draft and waiting worker. Accepting reload/update loaded v2 and cleared the in-memory draft as expected.
- F10-T03 source/build audit found no required remote runtime APIs or assets in reading, casting, result, Library, or Settings. Core assets are same-origin and precached; external GitHub/source links are user-initiated. Browser QA observed only same-origin requests. This was not a full network or cross-browser audit.
- F10-T08: In a production-fixture browser session with no `beforeinstallprompt` event observed (the API exists, so an unsupported browser is not established), the user completed a question/manual casting with six lines `7, 8, 9, 6, 7, 8` to result Ji Ji/Sui, then opened the Library hexagram detail Qian and Settings without installing. This confirms normal use in that session without installation; it does not establish behavior in browsers that lack the API.
- The native `beforeunload` prompt's absence was not definitively observable in browser QA, although the accepted reload completed. Code guard `isUpdateAccepted` suppresses the prompt for the intentional update. Browser QA covered this production build and isolated fixture only; no full cross-browser matrix was run.
- All F10-T01–T10 tasks and acceptance criteria have implementation/test or browser evidence recorded above. Browser evidence is limited to the tested Chromium sessions, and native `beforeunload` prompt absence was not definitively observed.

## Dependencies

- `feat-007`
- `feat-008`
- `feat-009`
- `feat-010`

## Handoff

- State: active; all F10 acceptance evidence recorded; coordinator/PR gate pending.
- Evidence: `./init.sh` passed as noted above. Production-build offline/recovery checks at `localhost:4188`, isolated two-build update checks at `localhost:4192`, source/build audit, and no-install normal-use browser session are detailed above. Browser scope and native prompt observability limits are explicit.
- Dependency check: feat-007, feat-008, feat-009, and feat-010 are done.
- Next: Coordinator validates the complete F10 evidence and proceeds with the coordinator/PR gate; no task-level evidence remains outstanding.
