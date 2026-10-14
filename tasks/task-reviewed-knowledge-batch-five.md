# task-reviewed-knowledge-batch-five - Reviewed knowledge batch five

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reviewed-knowledge-batch-four](task-reviewed-knowledge-batch-four.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Expand the selected classical and Liu Yao groups with reviewed source evidence.

## Scope

- Tùy, Cổ, Lâm, Quán: three-book overviews and all six positions.
- BPCT chapter 5, sections 11–12: Phản ngâm and Phục ngâm.
- Author differences, supported source errors, exclusions, and citation review.
- Source documentation and a concrete next batch.

## Non-goals

Automated interpretation, calendars, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve IDs, display names, reviewed structures, aliases, and attributed summaries.
- [x] Advanced records preserve conditions and textual layers.
- [x] Each released claim has passage review and an exact edition citation.
- [x] Each content group has a separate verified commit.
- [x] Coverage and the manifest identify remaining gaps and the next batch.
- [x] `./init.sh`, fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Blockers: none for selected content. Ambiguous source statements remain excluded; coverage is incomplete.
- Next: Review Phệ Hạp, Bí, Bác, Phục and BPCT sections 13–14, PDF 72.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — task-reviewed-knowledge-batch-five completed source audit and handoff

- Historical status: done.
- Result: Completed both selected tracks and reconciled source locations, discrepancy routes, and advanced exclusions. Reviewed content, quality, model, and data-directory contracts remain accurate. Checked all 138 NHL citations across 71 cited pages and seven new BPCT printed locators.
- Commits: Four quẻ `ccf713b`; Phản ngâm and Phục ngâm `09e8a9f`.
- Evidence: Final `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, 74 local document targets, and diff checks passed. Coverage remains incomplete: 126 records, 659 claims, 510 locators; 20/64 quẻ and 120/384 positions per commentary book.
- Blockers: none for selected content. Ambiguous statements remain excluded; no independent specialist approval is claimed.
- Next: Review Phệ Hạp, Bí, Bác, Phục and BPCT chapter 5, sections 13–14 (Vượng tướng hưu tù, Trong hợp có khắc; PDF 72).
