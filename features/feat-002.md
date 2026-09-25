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

- [ ] Complete all F01 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Line order, values, stable IDs, errors, and ruleset contracts are fixed and tested.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F01-T01 — Define bottom-to-top six-line tuple and `LineValue` semantics
- [ ] F01-T02 — Define stable IDs for trigrams, hexagrams, palaces, and rulesets
- [ ] F01-T03 — Define `liuyao-standard-v1`
- [ ] F01-T04 — Define input and structured result types
- [ ] F01-T05 — Define domain error types for invalid or unsupported input
- [ ] F01-T06 — Add runtime validation for exactly six values in `6..9`
- [ ] F01-T07 — Define line position helpers without reversing domain order
- [ ] F01-T08 — Create reusable fixture helpers for later golden tests

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- None.

## Handoff

- State: todo
- Evidence: —
- Blockers: none
- Next: Check dependency status, then select this feature for implementation.
