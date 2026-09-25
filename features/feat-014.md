# feat-014 — Production delivery

## Goal

Hosting, domain, deployment, cache, diagnostics, rollback, and smoke-test paths are launch-ready.

## Scope

- Implement the V1 work defined for F13 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F13 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Hosting, domain, deployment, cache, diagnostics, rollback, and smoke-test paths are launch-ready.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F13-T01 — Define production hosting requirements from `docs/release.md`
- [ ] F13-T02 — Select a static hosting provider
- [ ] F13-T03 — Select and register the production domain
- [ ] F13-T04 — Configure DNS and HTTPS
- [ ] F13-T05 — Configure SPA route fallback
- [ ] F13-T06 — Configure safe cache behavior for HTML, service worker, and fingerprinted assets
- [ ] F13-T07 — Define build command, output directory, and Node/pnpm versions
- [ ] F13-T08 — Add preview deployment for release review
- [ ] F13-T09 — Add production deployment from the approved main revision
- [ ] F13-T10 — Prevent production deployment when required CI fails
- [ ] F13-T11 — Stamp app version and build revision into production diagnostics
- [ ] F13-T12 — Verify manifest URLs and base paths on the production domain
- [ ] F13-T13 — Add production security headers supported by the host
- [ ] F13-T14 — Document the rollback command or provider action
- [ ] F13-T15 — Exercise the hosting rollback mechanism in Preview before first production launch
- [ ] F13-T16 — Define the production smoke-test procedure used by launch
- [ ] F13-T17 — Add canonical production URL metadata after domain selection
- [ ] F13-T18 — Review host logging and confirm app code does not log question text

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-011`
- `feat-013`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
