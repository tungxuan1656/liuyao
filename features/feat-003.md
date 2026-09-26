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

- [ ] F02-T01 — Implement polarity conversion for `6,7,8,9`
- [ ] F02-T02 — Encode all 8 trigram polarity patterns
- [ ] F02-T03 — Identify lower and upper trigrams from six lines
- [ ] F02-T04 — Add the canonical 64-hexagram mapping
- [ ] F02-T05 — Identify the primary hexagram
- [ ] F02-T06 — Transform only changing lines
- [ ] F02-T07 — Identify the changed hexagram when changes exist
- [ ] F02-T08 — Return no changed hexagram when no line changes
- [ ] F02-T09 — Return one structured calculation result
- [ ] F02-T10 — Add regression fixtures for mixed moving-line combinations

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`

## Implementation plan

- `docs/plans/feat-003.md` (plan only; implementation not started).

## Handoff

- State: active; plan ready, implementation pending
- Evidence: —
- Dependency check: `feat-002` is done.
- Next: Execute the F02 plan without implementing F03 board facts.
