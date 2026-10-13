# feat-002 - Domain contracts

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: none
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #12 merged by squash at `8761e4aa84dcb4ef71816ca03e61f26871f576d9`.
- Evidence: F01-T01–T08 package tests and `./init.sh` above; plan committed before implementation.
- Dependency check: none; feat-002 is the sole active feature.
- Next: feat-003 is active; implement F02 after confirming its canonical task map and architecture constraints.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-26 — feat-002

**State**: done; PR #12 merged by squash at `8761e4aa84dcb4ef71816ca03e61f26871f576d9`.
**Done**: F01-T01–T08 domain contracts, typed errors and validation, stable IDs, ordered positions, and reusable package fixtures.
**Evidence**: `pnpm --filter @liuyao/core test` passed 29 tests; `./init.sh` passed format, lint, length check, typecheck, build, and package tests. Details are in `features/feat-002.md`.
**Blockers**: none; one pre-existing non-failing web lint warning remains outside F01 scope.
**Next**: feat-003 is active; implement F02 after confirming its canonical task map and architecture constraints.

## Migration provenance

Migrated from [feat-002](../features/feat-002.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
