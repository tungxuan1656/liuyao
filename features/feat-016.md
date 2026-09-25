# feat-016 — Launch

## Goal

Release candidate is versioned, deployed, smoke-tested, documented, and usable immediately.

## Scope

- Implement the V1 work defined for F15 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F15 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Release candidate is versioned, deployed, smoke-tested, documented, and usable immediately.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F15-T01 — Freeze the release candidate revision
- [ ] F15-T02 — Set the V1 semantic version
- [ ] F15-T03 — Write concise release notes
- [ ] F15-T04 — Run all repository verification commands
- [ ] F15-T05 — Run the full desktop and mobile user-flow matrix
- [ ] F15-T06 — Run install, offline, update, and recovery scenarios
- [ ] F15-T07 — Verify production name, logo, icons, metadata, and social preview
- [ ] F15-T08 — Verify privacy, licensing, disclaimer, and security links
- [ ] F15-T09 — Deploy the release candidate to production
- [ ] F15-T10 — Run the production smoke test
- [ ] F15-T11 — Confirm rollback procedure and any previous production target are recorded
- [ ] F15-T12 — Create the Git tag or GitHub release for V1
- [ ] F15-T13 — Update README status from early development to released V1
- [ ] F15-T14 — Record known limitations without hiding them
- [ ] F15-T15 — Verify the public product from a clean browser profile
- [ ] F15-T16 — Verify the installed PWA from a clean supported device or browser
- [ ] F15-T17 — Check production again after service-worker activation
- [ ] F15-T18 — Open follow-up issues for non-blocking post-V1 defects

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-012`
- `feat-014`
- `feat-015`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
