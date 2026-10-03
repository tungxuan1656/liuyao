# feat-037 — Reviewed knowledge batch six

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

## Evidence

- Nine classical source-error resolutions inspected visually. Selected author differences remain attributed.
- Five BPCT records retain conditions and Vĩnh Cao's separate Tam hình objection.
- 135 records, 771 claims, 614 locators. Coverage: 24/64 quẻ and 144/384 positions per commentary book.
- `./init.sh`: 263 tests passed. Fingerprints, generated freshness, locator labels, documentation targets, and diff checks pass.
- Commits: classical `3e01c29`, verification `159797e`, BPCT `3dd5355`.
- Verified the generated-import exception and authored-file limits.

## Handoff

- State: done.
- Blockers: none for selected claims. Full corpus and independent specialist review remain incomplete.
- Next: Review Vô Vọng, Đại Súc, Di, Đại Quá and BPCT sections 15–16, PDF 72–73.
