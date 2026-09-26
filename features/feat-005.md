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

- [x] Complete all F04 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: Coin outcome model, secure random generation adapter, LineValue mapping, and normalized casting output.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`
- `docs/plans/feat-005.md` — implementation plan and verification evidence

## Tasks

- [x] F04-T01 — Define normalized casting result model consumed by core
- [x] F04-T02 — Implement secure random generation adapter using browser crypto
- [x] F04-T03 — Implement three-coin outcome distribution model (1/8, 3/8, 3/8, 1/8)
- [x] F04-T04 — Map three-coin outcomes to `6,7,8,9` `LineValue`
- [x] F04-T05 — Implement `CastingService` producing typed `CoinTossResult`
- [x] F04-T06 — Normalize sequential and direct inputs into core `LineValue` tuple
- [x] F04-T07 — Add table-driven tests verifying coin generation bounds and mapping

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`

## Handoff

- State: done locally; PR review and merge pending.
- Evidence: `./init.sh` passed with 152 core tests in 13 files and 2 knowledge tests; format, lint, TypeScript length check, typecheck, build, and package tests passed. One pre-existing non-failing web `react-refresh` warning remains at `apps/web/src/components/ui/button.tsx:49`. Focused test/typecheck evidence and implementation decisions are in `docs/plans/feat-005.md`.
- Dependency check: passed; `feat-002` is done.
- Next: Submit the verified changes for fresh PR review and address any findings; no PR approval is claimed.
