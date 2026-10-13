# feat-010 - Settings

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-001](task-feat-001.md), [feat-003](task-feat-003.md), [feat-006](task-feat-006.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

A user can inspect versions, conventions, PWA state, and offline readiness.

## Scope

- Implement the V1 work defined for F09 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F09 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`. The handoff records versions, conventions, links, and conditional install-state handling, but the current browser check had no service worker registered and did not exercise an update-available registration state; no real offline transition was verified.
- [ ] Meet the V1 completion condition: A user can inspect versions, conventions, PWA state, and offline readiness. The recorded checks support versions, conventions, and the unregistered-worker state, but do not verify offline readiness or an actual online/offline transition.
- [x] Pass the repository verification workflow in `./init.sh`. The handoff records `./init.sh` passing after the update-state correction, including typecheck, build, package exports, and tests; PR #21's `verify` CI check also passed.

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
- [x] F09-T07 — Show update availability when observable from an existing service-worker registration
- [x] F09-T08 — Show fixed line and ruleset conventions
- [x] F09-T09 — Link About, licensing, privacy, and security information
- [x] F09-T10 — Do not add account, sync, history, analytics, or cloud controls

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #21 merged as `1a205250bb2a592b8280e9eb3e1316247a385c1d`.
- Evidence: see the Evidence section above.
- Dependency check: feat-001, feat-003, and feat-006 are done.
- Merge: PR #21 head `5a43db89c04110d5c60ae8629ffc4e10624c2357` passed CI `verify` and GitGuardian, then merged at `1a205250bb2a592b8280e9eb3e1316247a385c1d`.
- Handoff limits: No real offline transition or waiting service-worker update was available for browser verification. Settings only inspects an existing registration; service-worker registration and draft-safe update behavior remain assigned to feat-011. No standalone privacy policy exists; Privacy links to the in-page session-only data statement.
- Next: Activate feat-011 Offline hardening, already selected by the user.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-27 — feat-010 complete

**State**: done; PR #21 merged as `1a205250bb2a592b8280e9eb3e1316247a385c1d`.
**Done**: Closed Settings after PR #21 head `5a43db89c04110d5c60ae8629ffc4e10624c2357` passed CI `verify` and GitGuardian. Recorded merged status and verification limits in the feature handoff.
**Evidence**: `./init.sh` and browser checks are recorded in `features/feat-010.md` and preceding progress entries. Browser checks covered 390×844 and 1440×900 layouts and truthful available browser states. No real offline transition or waiting service-worker update was verified; update registration and draft-safe application remain feat-011 scope.
**Blockers**: none for feat-010.
**Next**: Activate feat-011 Offline hardening, already selected by the user.

## Migration provenance

Migrated from [feat-010](../features/feat-010.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
