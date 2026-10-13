# feat-035 - Reviewed knowledge batch four

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-034](task-feat-034.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Expand the next selected classical and Liu Yao groups with reviewed source evidence.

## Scope

- Add Đồng Nhân, Đại Hữu, Khiêm, and Dự with three-book overviews and all six line positions.
- Add BPCT chapter 5, sections 8–10: Tứ sinh, Nguyệt phá, and Tuần không.
- Resolve supported source errors and preserve author differences or explicit exclusions.
- Audit existing citation metadata and repair stale knowledge documentation.

## Non-goals

Automated interpretation, calendar calculations, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve stable IDs, reviewed structures, source spelling variants, and attributed line summaries.
- [x] Advanced records preserve source conditions and distinguish author text from translator notes.
- [x] Each released claim has passage review and an exact supplied-edition citation.
- [x] Each content group has a separate verified commit.
- [x] Coverage and the manifest identify remaining gaps and the next exact batch.
- [x] `./init.sh`, PDF fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Plan

Continue the approved JSON design and batch sequence with an inline plan.

1. Read complete quẻ passages and footnotes; inspect diagrams and discrepancy pages.
2. Author four quẻ, remove duplicate legacy records, regenerate coverage, verify, and commit.
3. Read BPCT sections 8–10 with related evidence; author conditional advanced records, verify, and commit.
4. Reconcile source documentation, record the next batch, verify, and commit the handoff.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Result: Both selected groups released. Added printed labels to 84 existing NHL citations; checked all 109 NHL citations. Repaired stale validator documentation and cross-checked Tuần Không against chapter 6.
- Evidence: Final `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, 51 local documentation targets, and diff checks passed. Content commits: `be42a75`, `b964a5d`.
- Blockers: none for this batch. Ambiguous source examples remain excluded in the source document.
- Next: Review Tùy, Cổ, Lâm, Quán and BPCT chapter 5, sections 11–12 (Phản ngâm, Phục ngâm; PDF 70–71).

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — feat-035 completed source audit and handoff

- Historical status: done.
- Result: Completed both selected tracks. Added printed locators to 84 NHL citations across three batches and checked all 109 NHL citations against 59 footer labels. Reconciled source locations and exclusions, added chapter 6 cross-checks for Tuần Không, and corrected stale model and directory documentation. Content and quality contracts remain accurate.
- Commits: Four quẻ `be42a75`; Tứ sinh, Nguyệt phá, and Tuần không `b964a5d`.
- Evidence: Final `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, 51 local documentation targets, and diff checks passed. Coverage remains incomplete: 117 records, 548 claims, 411 locators; 16/64 quẻ and 96/384 positions in each commentary book.
- Blockers: none for this batch. Ambiguous and contradictory source examples remain explicitly excluded; no independent specialist approval is claimed.
- Next: Review Tùy, Cổ, Lâm, Quán and BPCT chapter 5, sections 11–12 (Phản ngâm, Phục ngâm; PDF 70–71).

## Migration provenance

Migrated from [feat-035](../features/feat-035.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
