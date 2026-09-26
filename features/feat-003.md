# feat-003 — Hexagram calculation

## Goal

All 64 primary hexagrams and moving-line transformations match fixtures.

## Scope

- Implement the V1 work defined for F02 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F02 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: All 64 primary hexagrams and moving-line transformations match fixtures.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F02-T01 — Implement polarity conversion for `6,7,8,9`
- [x] F02-T02 — Encode all 8 trigram polarity patterns
- [x] F02-T03 — Identify lower and upper trigrams from six lines
- [x] F02-T04 — Add the canonical 64-hexagram mapping
- [x] F02-T05 — Identify the primary hexagram
- [x] F02-T06 — Transform only changing lines
- [x] F02-T07 — Identify the changed hexagram when changes exist
- [x] F02-T08 — Return no changed hexagram when no line changes
- [x] F02-T09 — Return one structured calculation result
- [x] F02-T10 — Add regression fixtures for mixed moving-line combinations

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`

## Implementation plan

- `docs/plans/feat-003.md` (plan only; implementation not started).

## Handoff

- State: active; implementation verified locally, pending Orca review/merge
- Evidence: `pnpm --filter @liuyao/core test` (113 tests), `pnpm --filter @liuyao/core typecheck`, and `./init.sh` pass. The 64 primary and eight trigram fixtures are in `packages/liuyao-core/tests/`; Stanford Encyclopedia of Philosophy Yijing Appendices 1 and 3 supply the independent source. The fixture comment records two apparent source-code typos (#37 and #45) and their figure-backed corrections. One existing non-failing web lint warning remains outside F02.
- Dependency check: `feat-002` is done.
- Next: Obtain Orca review of the implementation and verification, then close the feature after accepted integration.
