# task-offline-hardening - Offline hardening

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reading-flow](task-reading-flow.md), [task-result-view](task-result-view.md), [task-knowledge-browser](task-knowledge-browser.md), [task-settings](task-settings.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #22 merged as `a70c8f3e145536cd48db84dd9c2e61b7c14f1265`.
- Evidence: `./init.sh` passed as noted above. Production-build offline/recovery checks at `localhost:4188`, isolated two-build update checks at `localhost:4192`, source/build audit, and no-install normal-use browser session are detailed above. Browser scope and native prompt observability limits are explicit.
- Dependency check: task-reading-flow, task-result-view, task-knowledge-browser, and task-settings are done.
- Merge: PR #22 head `509a079c45fa82809749384ba03bb566a720e96f` passed CI `verify` and GitGuardian, then merged at `a70c8f3e145536cd48db84dd9c2e61b7c14f1265`.
- Verification limits: Browser QA covered the tested Chromium production-build and isolated two-build fixture sessions, not a full cross-browser matrix or exhaustive network audit. Native `beforeunload` prompt absence was not definitively observable; the intentional UI update reload completed and `isUpdateAccepted` code guard suppresses that prompt for accepted updates.
- Next: Activate task-quality-hardening Quality hardening, already selected by the user.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-27 — task-offline-hardening complete

**State**: done; PR #22 merged as `a70c8f3e145536cd48db84dd9c2e61b7c14f1265`.
**Done**: Closed Offline hardening after PR #22 head `509a079c45fa82809749384ba03bb566a720e96f` passed CI `verify` and GitGuardian. Recorded merged status and QA limits in the feature handoff.
**Evidence**: `./init.sh`, production offline/recovery, draft-safe two-build update, source/build audit, and no-install normal-use browser evidence are recorded in `task-offline-hardening` and preceding progress entries. QA was limited to tested Chromium sessions; it was not a full cross-browser or exhaustive network audit. Native `beforeunload` prompt absence was not definitively observable, though intentional UI update reload completed and `isUpdateAccepted` suppresses the guard for accepted updates.
**Blockers**: none for task-offline-hardening.
**Next**: Activate task-quality-hardening Quality hardening, already selected by the user.
