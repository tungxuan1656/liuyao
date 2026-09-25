# feat-005 — Casting core

## Goal

Coin outcome model, secure random generation adapter, LineValue mapping, and normalized casting output.

## Scope

- Implement the V1 work defined for F04 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F04 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Coin outcome model, secure random generation adapter, LineValue mapping, and normalized casting output.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F04-T01 — Define normalized casting result model consumed by core
- [ ] F04-T02 — Implement secure random generation adapter using browser crypto
- [ ] F04-T03 — Implement three-coin outcome distribution model (1/8, 3/8, 3/8, 1/8)
- [ ] F04-T04 — Map three-coin outcomes to `6,7,8,9` `LineValue`
- [ ] F04-T05 — Implement `CastingService` producing typed `CoinTossResult`
- [ ] F04-T06 — Normalize sequential and direct inputs into core `LineValue` tuple
- [ ] F04-T07 — Add table-driven tests verifying coin generation bounds and mapping

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
