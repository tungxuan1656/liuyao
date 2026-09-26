# feat-002 — Domain contracts

## Goal

Line order, values, stable IDs, errors, and ruleset contracts are fixed and tested.

## Scope

- Implement the V1 work defined for F01 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete all F01 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: Line order, values, stable IDs, errors, and ruleset contracts are fixed and tested.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F01-T01 — Define bottom-to-top six-line tuple and `LineValue` semantics
- [x] F01-T02 — Define stable IDs for trigrams, hexagrams, palaces, and rulesets
- [x] F01-T03 — Define `liuyao-standard-v1`
- [x] F01-T04 — Define input and structured result types
- [x] F01-T05 — Define domain error types for invalid or unsupported input
- [x] F01-T06 — Add runtime validation for exactly six values in `6..9`
- [x] F01-T07 — Define line position helpers without reversing domain order
- [x] F01-T08 — Create reusable fixture helpers for later golden tests

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`. The implementation plan is at `docs/plans/feat-002.md`.

## Evidence and decisions

- F01-T01/T04: `packages/liuyao-core/tests/contracts.test.ts` checks tuple length, allowed values, and complete typed structured result, including the six primary-line facts specified by `docs/design-docs/domain-model.md`. The package `typecheck` script now compiles `src` and `tests` via the no-emit `tsconfig.test.json`, so `@ts-expect-error` assertions are checked; the package build still emits only `src`.
- F01-T02/T03: contract tests check the exact independent ID inventories and uniqueness for public `liuyao-standard-v1`, eight trigrams, 64 hexagrams, and eight palaces. IDs are explicit and independent of display names; hexagram IDs use `hexagram-01` through `hexagram-64` without calculating the mapping.
- F01-T05/T06: `packages/liuyao-core/tests/validation.test.ts` checks invalid input, exactly six integers from 6 to 9, sparse arrays, distinct unsupported-ruleset error, and default ruleset normalization.
- F01-T07: `packages/liuyao-core/tests/positions.test.ts` checks all six position/index mappings, bounds, and unchanged bottom-to-top tuple order.
- F01-T08: `packages/liuyao-core/tests/fixtures.test.ts` checks fresh fixture instances, position overrides, and the standard ruleset default; helpers stay in package tests for future golden fixtures.
- `pnpm --filter @liuyao/core test` passed: five files, 29 tests; package typecheck covering tests passed. After the PR review fix, `./init.sh` passed format, lint, TypeScript length check, typecheck, build, and package tests; read-only `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` passed. Lint reports one pre-existing non-failing React Fast Refresh warning in `apps/web/src/components/ui/button.tsx`.
- Input retains the scaffold's optional datetime/timezone fields, but F01 calculations do not use them. Structured result types name future F02/F03 facts without implementing their calculations; no web, persistence, network, or knowledge logic was added.

## Dependencies

- None.

## Handoff

- State: implementation complete; active pending PR review and merge.
- Evidence: F01-T01–T08 package tests and `./init.sh` above; plan committed before implementation.
- Dependency check: none; feat-002 is the sole active feature.
- Next: Review and merge the feat-002 PR, then mark the feature done.
