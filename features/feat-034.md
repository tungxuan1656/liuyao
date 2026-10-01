# feat-034 — Reviewed knowledge batch three

## Goal

Expand the next selected classical and Liu Yao groups with reviewed source evidence.

## Scope

- Add Tỷ, Tiểu Súc, Thái, and Bĩ with three-book overviews and all six line positions.
- Add BPCT chapter 5, sections 5–7: Phi thần, Phục thần, and Lục thú.
- Resolve supported source errors and preserve author differences or explicit exclusions.

## Non-goals

Automated interpretation, calendar calculations, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve stable IDs, reviewed structures, source spelling variants, and attributed line summaries.
- [x] Advanced records preserve conditions, textual layers, and unresolved evidence boundaries.
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
3. Read BPCT sections 5–7 with related evidence; author conditional advanced records, verify, and commit.
4. Reconcile source documentation, record the next batch, verify, and commit the handoff.

## Handoff

- State: done.
- Evidence: Both groups pass `./init.sh` with 263 tests and PDF fingerprint/freshness checks. Coverage is 100 records, 427 claims, 303 locators; 12/64 quẻ and 72/384 positions.
- Commits: Four quẻ `c5bf201`; advanced BPCT `5fa328c`.
- Exclusions: Phi thần type 2 and Đằng Xà’s own element remain outside released claims because the wording is unclear.
- Blockers: none.
- Next: Review Đồng Nhân, Đại Hữu, Khiêm, Dự and BPCT chapter 5, sections 8–10 (Tứ sinh, Nguyệt phá, Tuần không; PDF 70), as recorded in the manifest.
