# feat-036 — Reviewed knowledge batch five

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

## Completed plan

1. Read complete classical passages and footnotes; inspect diagrams and source errors.
2. Author four quẻ, migrate legacy records, verify, and commit `ccf713b`.
3. Read BPCT and related evidence; author three terms and two articles, verify, and commit `09e8a9f`.
4. Reconcile source documentation and verify the handoff.

## Verification

- Corpus: 126 records, 659 claims, 510 citations; 20/64 quẻ and 120/384 positions per commentary book.
- Checked 14 Phục ngâm pairs, all 138 NHL citations across 71 pages, and seven new BPCT printed locators.
- Final `./init.sh`: 263 tests passed. Fingerprints, generated freshness, 74 local document targets, and diff checks passed.

## Handoff

- State: done.
- Blockers: none for selected content. Ambiguous source statements remain excluded; coverage is incomplete.
- Next: Review Phệ Hạp, Bí, Bác, Phục and BPCT sections 13–14, PDF 72.
