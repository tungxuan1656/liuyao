# task-reviewed-knowledge-batch-six - Reviewed knowledge batch six

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reviewed-knowledge-batch-five](task-reviewed-knowledge-batch-five.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Expand classical and Liu Yao content with reviewed evidence.

## Scope

- Phệ Hạp, Bí, Bác, Phục: three-book overviews and six positions.
- BPCT chapter 5, sections 13–14: Vượng tướng hưu tù and Trong hợp có khắc.
- Author differences, source errors, exclusions, and citation review.
- Source documentation, generated-import verification, and the next batch.

## Non-goals

Automated interpretation, calendars, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve IDs, display names, structures, aliases, and attribution.
- [x] Advanced records preserve source conditions and textual layers.
- [x] Each released claim has passage review and an edition citation.
- [x] Content groups have separate verified commits.
- [x] Coverage and manifest identify gaps and the next batch.
- [x] Full verification, fingerprints, generated freshness, and diff checks pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review complete classical passages, footnotes, diagrams, and source errors.
2. Author, migrate, verify, and commit the four quẻ.
3. Review BPCT, author conditional records, verify, and commit.
4. Reconcile source documentation, verify, and commit the handoff.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Blockers: none for selected claims. Full corpus and independent specialist review remain incomplete.
- Next: Review Vô Vọng, Đại Súc, Di, Đại Quá and BPCT sections 15–16, PDF 72–73.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — task-reviewed-knowledge-batch-six completed source audit and handoff

- Historical status: done.
- Result: Completed both selected tracks. Reconciled source locations, nine discrepancy routes, and classical/advanced exclusions. Content, quality, model, and data-directory contracts remain accurate.
- Commits: Classical `3e01c29`, generated-import verification `159797e`, BPCT `3dd5355`.
- Evidence: Final `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, documentation targets, and diff checks passed. Checked all 167 NHL citations across 84 cited pages and eight new BPCT printed locators.
- Coverage: 135 records, 771 cited claims, 614 locators. Classical coverage remains 24/64 quẻ and 144/384 positions per commentary book.
- Blockers: none for selected claims. Ambiguous statements remain excluded. Full corpus and independent specialist review remain incomplete.
- Next: Review Vô Vọng, Đại Súc, Di, Đại Quá and BPCT chapter 5, sections 15–16 (PDF 72–73).
