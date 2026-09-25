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

- [ ] F09-T01 — Show web app version
- [ ] F09-T02 — Show `@liuyao/core` version
- [ ] F09-T03 — Show `@liuyao/knowledge` version
- [ ] F09-T04 — Show ruleset ID
- [ ] F09-T05 — Show online or offline state
- [ ] F09-T06 — Show install state when the browser exposes it
- [ ] F09-T07 — Show update availability
- [ ] F09-T08 — Show fixed line and ruleset conventions
- [ ] F09-T09 — Link About, licensing, privacy, and security information
- [ ] F09-T10 — Do not add account, sync, history, analytics, or cloud controls

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-003`
- `feat-006`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
