# feat-004 — Liu Yao board

## Goal

Palace, Shi/Ying, Na Jia, elements, and Six Relatives match fixtures.

## Scope

- Implement the V1 work defined for F03 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F03 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Palace, Shi/Ying, Na Jia, elements, and Six Relatives match fixtures.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F03-T01 — Add Eight Palace classification
- [ ] F03-T02 — Add palace element mapping
- [ ] F03-T03 — Add Shi and Ying line positions
- [ ] F03-T04 — Add Na Jia Heavenly Stem assignments
- [ ] F03-T05 — Add Na Jia Earthly Branch assignments
- [ ] F03-T06 — Cover inner and outer trigram assignments separately
- [ ] F03-T07 — Map Earthly Branches to Five Elements
- [ ] F03-T08 — Derive Six Relatives from palace and line elements
- [ ] F03-T09 — Build six structured line results
- [ ] F03-T10 — Expose board facts without explanatory prose

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-003`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
