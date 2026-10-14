# feat-005 - Casting core

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-002](task-feat-002.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #15 squash-merged as `bcc89d0` (`feat(core): add three-coin casting and secure browser adapter`).
- Evidence: `./init.sh` passed after the sparse-coin regression with 153 core tests in 13 files and 2 knowledge tests; format, lint, TypeScript length check, typecheck, build, and package tests passed. One pre-existing non-failing web `react-refresh` warning remains at `apps/web/src/components/ui/button.tsx:49`. Focused test/typecheck evidence and implementation decisions are in `docs/plans/feat-005.md`.
- Dependency check: passed; `feat-002` is done.
- Review: Fresh plan and PR reviews approved exact head `5e7815ae35cec1a94b4454f2cc5afac3cdc218c2` against base `215ceb3c0f98c03916003465366adf43a105f164`; GitHub `verify` and GitGuardian checks passed.
- Next: Continue with selected feature `feat-006`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-26 — feat-005

**State**: active; feat-002 dependency is done.
**Done**: Selected F04 Casting core from the user-approved feat-001–012 batch and confirmed its canonical task map and product scope.
**Evidence**: `feature_index.json` records feat-002 done and feat-005 active; F04 tasks and acceptance are defined in `docs/product-specs/v1-task-map.md` and `features/feat-005.md`.
**Blockers**: none.
**Next**: Commit the implementation plan and request fresh plan review.

#### 2026-09-26 — feat-005 (additional snapshot 1)

**State**: done locally; PR review and merge pending.
**Done**: Completed F04-T01–T07: deterministic three-coin outcomes, injected casting service, normalized direct/sequential inputs, and a web-only browser crypto adapter; updated observed architecture and product summaries.
**Evidence**: Parent-run `./init.sh` passed with 152 core tests in 13 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, build, and package tests. One pre-existing non-failing web `react-refresh` warning remains at `apps/web/src/components/ui/button.tsx:49`. Plan and focused evidence are in `docs/plans/feat-005.md`.
**Blockers**: Fresh PR review and merge remain outstanding; no PR approval is claimed.
**Next**: Submit the verified changes for fresh PR review and address any findings.

#### 2026-09-26 — feat-005 PR review follow-up

**State**: done locally; PR #15 fresh review and merge pending.
**Done**: Corrected plan evidence chronology and rejected sparse three-coin arrays that could bypass iteration validation; added a regression.
**Evidence**: `./init.sh` passed with 153 core tests in 13 files and 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. One pre-existing non-failing web `react-refresh` warning remains.
**Blockers**: Updated PR head requires fresh review approval.
**Next**: Request fresh review of PR #15 on the corrected head and address any findings.

#### 2026-09-26 — feat-005 merged; feat-006 activated

**State**: feat-005 done; feat-006 active.
**Done**: Squash-merged PR #15 as `bcc89d0` after fresh plan and PR review approval of exact head `5e7815ae35cec1a94b4454f2cc5afac3cdc218c2`; activated feat-006 Knowledge from the user-approved batch.
**Evidence**: The worker passed `./init.sh` with 153 core tests and 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. GitHub `verify` and GitGuardian passed; one pre-existing non-failing web `react-refresh` warning remains.
**Blockers**: none.
**Next**: Read the canonical F05 requirements and licensing boundaries, then commit the feat-006 implementation plan and request review.

## Migration provenance

Migrated from [feat-005](../features/feat-005.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
