# feat-015 — Product polish and trust

## Goal

Copy, legal surfaces, SEO metadata, security posture, and visible edge states are release-ready.

## Scope

- Implement the V1 work defined for F14 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F14 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Copy, legal surfaces, SEO metadata, security posture, and visible edge states are release-ready.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F14-T01 — Freeze V1 navigation labels and common button copy
- [ ] F14-T02 — Use consistent Liu Yao terminology across UI and knowledge content
- [ ] F14-T03 — Remove scaffold, placeholder, debug, and developer-facing copy
- [ ] F14-T04 — Add About product information
- [ ] F14-T05 — Publish software and content licensing information
- [ ] F14-T06 — Publish a concise privacy statement matching actual V1 data behavior
- [ ] F14-T07 — Decide and publish an appropriate divination-use disclaimer
- [ ] F14-T08 — Link the security reporting path
- [ ] F14-T09 — Add canonical page title and description metadata
- [ ] F14-T10 — Add Open Graph or equivalent social preview metadata
- [ ] F14-T11 — Add robots and sitemap behavior appropriate to the chosen public pages
- [ ] F14-T12 — Audit third-party packages and assets for license compatibility
- [ ] F14-T13 — Check production bundle for accidental secrets or development endpoints
- [ ] F14-T14 — Verify all public links and source references are valid

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-007`
- `feat-008`
- `feat-009`
- `feat-010`
- `feat-011`
- `feat-013`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
