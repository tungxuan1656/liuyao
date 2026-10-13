# feat-004 - Liu Yao board

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-003](task-feat-003.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Palace, Shi/Ying, Na Jia, elements, and Six Relatives match fixtures.

## Scope

- Implement the V1 work defined for F03 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete all F03 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: Palace, Shi/Ying, Na Jia, elements, and Six Relatives match fixtures.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F03-T01 — Add Eight Palace classification
- [x] F03-T02 — Add palace element mapping
- [x] F03-T03 — Add Shi and Ying line positions
- [x] F03-T04 — Add Na Jia Heavenly Stem assignments
- [x] F03-T05 — Add Na Jia Earthly Branch assignments
- [x] F03-T06 — Cover inner and outer trigram assignments separately
- [x] F03-T07 — Map Earthly Branches to Five Elements
- [x] F03-T08 — Derive Six Relatives from palace and line elements
- [x] F03-T09 — Build six structured line results
- [x] F03-T10 — Expose board facts without explanatory prose

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #14 merged by squash as `994ba1afcc1dcf190808d693dd5f701f06eb4246`.
- Evidence: Fresh Codex review approved PR head `5dee51279af59c264fed6681ee0caa1d505685fe`; GitHub `verify` and GitGuardian checks passed. The worker's `./init.sh` passed 127 core tests in 12 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. The final documentation-only commit passed format, diff, pre-push lint, typecheck, and tests. One pre-existing, non-failing web `react-refresh` warning remains.
- Dependency check: feat-003 is done; feat-002 is done.
- Next: Activate feat-005 after confirming its dependency and canonical task map.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-26 — feat-004

**State**: done locally; PR review and merge pending.
**Done**: Completed F03-T01–T10: Eight Palace and Shi/Ying classification, Na Jia stems and branches, element mapping, Six Relatives, and six structured board lines; updated the product-scope and architecture summaries.
**Evidence**: Parent-run `./init.sh` passed 125 core tests in 12 files and 2 knowledge tests; format, lint, TypeScript length check, typecheck, and build passed. Lint reported one pre-existing, non-failing web `react-refresh` warning. Fixture and acceptance details remain linked in `features/feat-004.md` and `docs/product-specs/v1-task-map.md`.
**Blockers**: Plan revision `28e13b6` is pending fresh feedback; PR review and merge are not complete.
**Next**: Obtain fresh PR review feedback, address it, and merge after approval.

#### 2026-09-26 — feat-004 PR review follow-up

**State**: done locally; PR #14 fresh review and merge pending.
**Done**: Isolated public palace and Na Jia lookup results after reviewer found mutation could corrupt later board facts; added runtime mutation regressions.
**Evidence**: `./init.sh` passed 127 core tests in 12 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. One pre-existing, non-failing web lint warning remains.
**Blockers**: Updated PR head requires fresh review approval.
**Next**: Request fresh PR #14 review on the corrected head and address any findings before merge.

#### 2026-09-26 — feat-004 (additional snapshot 1)

**State**: done; PR #14 squash-merged as `994ba1afcc1dcf190808d693dd5f701f06eb4246`.
**Done**: Completed F03-T01–T10 and addressed review findings for isolated readonly lookup results and feature documentation.
**Evidence**: Fresh Codex review approved head `5dee51279af59c264fed6681ee0caa1d505685fe`; GitHub `verify` and GitGuardian passed. The worker passed `./init.sh` with 127 core tests and 2 knowledge tests, format, lint, typecheck, and build; final docs-only changes passed focused format/diff/pre-push checks.
**Blockers**: none.
**Next**: Activate feat-005 Casting core.

## Migration provenance

Migrated from [feat-004](../features/feat-004.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
