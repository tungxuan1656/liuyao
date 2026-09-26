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

- [x] Complete all F02 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: All 64 primary hexagrams and moving-line transformations match fixtures.
- [x] Pass the repository verification workflow in `./init.sh`.

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

- `docs/plans/feat-003.md` (implementation and verification recorded; PR #13 merged).

## Handoff

- State: done; PR #13 squash-merged as `ef2a99b`.
- Evidence: GitHub `verify` and GitGuardian checks passed at reviewed head `7ef963b`. `pnpm --filter @liuyao/core test` passed 113 tests, package typecheck passed, and `./init.sh` passed format, lint, length check, typecheck, build, and package tests. The fresh PR review passed 84 focused tests and core typecheck. The 64 primary and eight trigram fixtures use Stanford Encyclopedia of Philosophy Yijing Appendices 1 and 3; source errata for #37 and #45 and their figure-backed corrections are recorded in `packages/liuyao-core/tests/hexagram-fixtures.ts`. One existing non-failing web lint warning remains outside F02.
- Dependency check: `feat-002` is done.
- Next: Activate feat-004, which depends on feat-003.
