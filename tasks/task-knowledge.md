# task-knowledge - Knowledge

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-domain-contracts](task-domain-contracts.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

V1 entities, terms, rules, and sources are local, licensed, and validated.

## Scope

- Implement the V1 work defined for F05 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete all F05 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: V1 entities, terms, rules, and sources are local, licensed, and validated.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F05-T01 — Define knowledge entity, term, rule, source, and source-reference schemas
- [x] F05-T02 — Define stable IDs for knowledge entities, terms, rules, sources, and source references
- [x] F05-T03 — Add display metadata for all 8 trigrams
- [x] F05-T04 — Add display metadata for all 64 hexagrams
- [x] F05-T05 — Add V1 terminology required by result screens
- [x] F05-T06 — Add V1 rule explanations for displayed deterministic facts
- [x] F05-T07 — Add bibliographic source metadata
- [x] F05-T08 — Add source locations when chapter, section, or page is known
- [x] F05-T09 — Remove or rewrite unlicensed modern text
- [x] F05-T10 — Validate duplicate IDs and broken references
- [x] F05-T11 — Expose read-only lookup APIs
- [x] F05-T12 — Expose local normalized search APIs

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #16 squash-merged as `691f80d724f332f49a2c295e4e484a3d6cbdcbe5`.
- Evidence: fresh plan and PR reviews approved exact head `e6382698f88fdfdaa573b49a4c051cd6fa6409aa`; GitHub `verify` and GitGuardian passed. Full `./init.sh` passed with 34 knowledge tests and 153 core tests; one pre-existing non-failing web Fast Refresh warning remains. Details and sourcing limits are in `docs/plans/task-knowledge.md`.
- Dependency check: passed; task-domain-contracts is done.
- Next: Stop after task-knowledge as instructed; leave later features todo until selected again.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-26 — task-knowledge

**State**: done locally; PR review and merge pending.
**Done**: Completed F05-T01–T12: typed schemas, stable IDs, 8/64 entity metadata, V1 terms and rules, source metadata, validated references, readonly lookups, and offline normalized search. Source locations remain absent where unverified.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, 31 knowledge tests in 6 files, and 153 core tests in 13 files. One pre-existing non-failing web `react-refresh` warning remains. The first web build failed on a missing optional native Tailwind binding; a forced frozen-lockfile reinstall restored it before the successful full run. Details: `docs/plans/task-knowledge.md`.
**Blockers**: Fresh plan and PR review approval and merge remain; no unverified source locator was invented.
**Next**: Submit the current head for fresh plan and PR review, address findings, then hand off for merge.

#### 2026-09-26 — task-knowledge plan review follow-up

**State**: done locally; fresh plan and PR review pending.
**Done**: Resolved plan review findings with broken-term-reference validation, independent 64-hexagram identity fixtures, and exhaustive displayed-fact-to-rule coverage; removed duplicate task ownership of F05-T10.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, 34 knowledge tests in 6 files, and 153 core tests in 13 files. One pre-existing non-failing web Fast Refresh lint warning remains; details are in `docs/plans/task-knowledge.md`.
**Blockers**: Current-head plan and PR approval and merge remain pending.
**Next**: Request fresh plan review on the corrected head, then resolve any findings before requesting PR review.

#### 2026-09-26 — task-knowledge merged

**State**: done; PR #16 squash-merged as `691f80d724f332f49a2c295e4e484a3d6cbdcbe5`.
**Done**: Completed F05-T01–T12 and addressed plan-review findings for broken-term validation, independent 64-hexagram fixtures, exhaustive fact-to-rule coverage, and accurate handoff status.
**Evidence**: Fresh plan and PR reviews approved exact head `e6382698f88fdfdaa573b49a4c051cd6fa6409aa`; GitHub `verify` and GitGuardian passed. `./init.sh` passed with 34 knowledge tests and 153 core tests; one pre-existing non-failing web Fast Refresh warning remains. Evidence and sourcing limits are in `docs/plans/task-knowledge.md`.
**Blockers**: none.
**Next**: Stop after task-knowledge as instructed; leave later features todo until selected again.
