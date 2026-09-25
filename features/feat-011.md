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
- [ ] F10-T04 — Add a visible non-blocking offline state
- [ ] F10-T05 — Keep cached navigation usable without network
- [ ] F10-T06 — Replace unsafe forced auto-update behavior with a draft-safe update flow
- [ ] F10-T07 — Preserve active draft until the user accepts an update
- [ ] F10-T08 — Keep normal browser use when installation is unavailable
- [ ] F10-T09 — Verify direct-route reload under service-worker control
- [ ] F10-T10 — Verify online → offline → reload → online recovery

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-007`
- `feat-008`
- `feat-009`
- `feat-010`

## Handoff

- State: todo
- Evidence: —
- Blockers: none
- Next: Check dependency status, then select this feature for implementation.
