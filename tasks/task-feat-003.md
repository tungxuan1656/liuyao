# feat-003 - Hexagram calculation

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-002](task-feat-002.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

All 64 primary hexagrams and moving-line transformations match fixtures.

## Scope

- Implement the V1 work defined for F02 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete all F02 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: All 64 primary hexagrams and moving-line transformations match fixtures.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F02-T01 — Implement polarity conversion for `6,7,8,9`
- [x] F02-T02 — Encode all 8 trigram polarity patterns
- [x] F02-T03 — Identify lower and upper trigrams from six lines
- [x] F02-T04 — Add the canonical 64-hexagram mapping
- [x] F02-T05 — Identify the primary hexagram
- [x] F02-T06 — Transform only changing lines
- [x] F02-T07 — Identify the changed hexagram when changes exist
- [x] F02-T08 — Return no changed hexagram when no line changes
- [x] F02-T09 — Return one structured calculation result
- [x] F02-T10 — Add regression fixtures for mixed moving-line combinations

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #13 squash-merged as `ef2a99b`.
- Evidence: GitHub `verify` and GitGuardian checks passed at reviewed head `7ef963b`. `pnpm --filter @liuyao/core test` passed 113 tests, package typecheck passed, and `./init.sh` passed format, lint, length check, typecheck, build, and package tests. The fresh PR review passed 84 focused tests and core typecheck. The 64 primary and eight trigram fixtures use Stanford Encyclopedia of Philosophy Yijing Appendices 1 and 3; source errata for #37 and #45 and their figure-backed corrections are recorded in `packages/liuyao-core/tests/hexagram-fixtures.ts`. One existing non-failing web lint warning remains outside F02.
- Dependency check: `feat-002` is done.
- Next: Activate feat-004, which depends on feat-003.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-26 — feat-003

**State**: done; PR #13 squash-merged as `ef2a99b`.
**Done**: Completed F02-T01–T10: polarity and trigram identification, the 64-hexagram mapping, moving-line transformations, and the structured calculation API. Updated the architecture summary to reflect F02 and reserved board calculations for F03.
**Evidence**: Fresh Codex review approved PR #13 at `7ef963b`; GitHub `verify` and GitGuardian checks passed. The worker ran 113 core tests, package typecheck, and `./init.sh`; the reviewer ran 84 focused tests and core typecheck. Fixture provenance and source errata are documented in `features/feat-003.md` and `packages/liuyao-core/tests/hexagram-fixtures.ts`.
**Blockers**: none.
**Next**: Activate feat-004 Liu Yao board.

## Migration provenance

Migrated from [feat-003](../features/feat-003.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
