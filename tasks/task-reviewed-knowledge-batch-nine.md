# task-reviewed-knowledge-batch-nine - Reviewed knowledge batch nine

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reviewed-knowledge-batch-eight](task-reviewed-knowledge-batch-eight.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Expand the next classical and Liu Yao groups with reviewed evidence.

## Scope

- Độn, Đại Tráng, Tấn, Minh Di: three-book overviews and all six positions.
- BPCT chapter 6, sentences 1–6: moving changes, balance, support, control, and Sinh/Vượng.
- Author differences, source discrepancies, exclusions, and citation review.
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

1. Review complete classical passages, footnotes, diagrams, and source errors.
2. Author four quẻ, migrate legacy records, verify, and commit.
3. Review related BPCT passages, author conditional records, verify, and commit.
4. Reconcile source documentation, verify, and commit the handoff.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Result: Eight new records and moving-line context add 116 claims and 104 citations. Seven source discrepancies have supported resolutions. Final review tightened seven classical summaries and one advanced condition.
- Verification: `./init.sh` passed 263 tests. Fingerprints, generated freshness, 112 local documentation routes, and diff checks passed. Checked 251 NHL citations across 120 pages and eight new BPCT printed locators.
- Commits: Classical `ea12e18`; BPCT `1610f8b`.
- Blockers: none for selected content. Full coverage and independent specialist approval remain incomplete.
- Next: Review the [manifest's next batch](../docs/reviews/knowledge/README.md).

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — task-reviewed-knowledge-batch-nine completed source audit and handoff

- Historical status: done.
- Result: Added Độn, Đại Tráng, Tấn, Minh Di and four BPCT records; extended moving-line evidence. Preserved distinct readings, seven source-discrepancy resolutions, conditional support, and Nhật thần scope. Tightened seven classical summaries and one advanced condition. Reconciled source locations and exclusions.
- Commits: Classical `ea12e18`; BPCT `1610f8b`.
- Evidence: `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, 112 documentation routes, and diff checks passed. Checked 251 NHL citations across 120 pages and eight new BPCT printed locators.
- Coverage: 161 records, 1,111 cited claims, 916 locators. Classical coverage is 36/64 quẻ and 216/384 positions per commentary book. Twenty-eight quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. Unclear wording, incomplete tables, reported outcomes, full coverage, and independent specialist approval remain excluded or incomplete.
- Next: Review Gia Nhân, Khuê, Kiển, Giải and BPCT chapter 6, sentences 7–11 (PDF 79–81).
