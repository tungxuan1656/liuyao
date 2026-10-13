# feat-038 - Reviewed knowledge batch seven

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-037](task-feat-037.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Expand the next classical and Liu Yao groups with reviewed evidence.

## Scope

- Vô Vọng, Đại Súc, Di, Đại Quá: three-book overviews and all six positions.
- BPCT chapter 5, sections 15–16: Hợp xứ phùng xung / Xung trung phùng hợp and Tuyệt xứ phùng sinh / Khắc xứ phùng sinh.
- Author differences, source discrepancies, exclusions, and citation review.
- Correct the reversed Đại Súc display name against the supplied editions.
- Source documentation and the next exact batch.

## Non-goals

Automated interpretation, calendars, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve IDs, reviewed names, structures, aliases, and attribution.
- [x] Advanced records preserve source conditions and textual layers.
- [x] Each released claim has complete passage review and an exact edition citation.
- [x] Content groups have separate verified commits.
- [x] Coverage and manifest identify remaining gaps and the next batch.
- [x] `./init.sh`, fingerprints, generated freshness, and diff checks pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review complete classical passages, footnotes, diagrams, and source errors. Done.
2. Author four quẻ, migrate legacy records, verify, and commit. Done.
3. Review related BPCT passages, author conditional records, verify, and commit. Done.
4. Reconcile source documentation, verify, and commit the handoff. Done.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Blockers: none.
- Next: Review Khảm, Ly, Hàm, Hằng and BPCT sections 17–18, PDF 73.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — feat-038 completed source audit and handoff

- Historical status: done.
- Result: Added four reviewed quẻ and six BPCT records. Corrected Đại Súc's reversed display name. Preserved author differences, six visually checked source-error resolutions, conditional support, and translator objections. Reconciled source locators and exclusions.
- Commits: Name `743b17e`, classical `2443953`, BPCT `31d8866`.
- Evidence: `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, 92 local documentation routes, and diff checks passed. Checked all 195 NHL citations across 96 cited pages and nine new BPCT printed locators.
- Coverage: 145 records, 885 cited claims, 716 locators. Classical coverage is 28/64 quẻ and 168/384 positions per commentary book. Thirty-six quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. Ambiguous passages, reported health outcomes, complete coverage, and independent specialist approval remain outside this completed batch.
- Next: Review Khảm, Ly, Hàm, Hằng and BPCT chapter 5, sections 17–18 (PDF 73).

## Migration provenance

Migrated from [feat-038](../features/feat-038.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
