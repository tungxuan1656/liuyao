# feat-004 — Liu Yao board

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

## Dependencies

- `feat-003`

## Implementation plan

- `docs/plans/feat-004.md` (approved; implementation and local verification recorded).

## Handoff

- State: done; PR #14 merged by squash as `994ba1afcc1dcf190808d693dd5f701f06eb4246`.
- Evidence: Fresh Codex review approved PR head `5dee51279af59c264fed6681ee0caa1d505685fe`; GitHub `verify` and GitGuardian checks passed. The worker's `./init.sh` passed 127 core tests in 12 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. The final documentation-only commit passed format, diff, pre-push lint, typecheck, and tests. One pre-existing, non-failing web `react-refresh` warning remains.
- Dependency check: feat-003 is done; feat-002 is done.
- Next: Activate feat-005 after confirming its dependency and canonical task map.
