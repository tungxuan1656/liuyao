# task-reviewed-knowledge-batch-three - Reviewed knowledge batch three

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-reviewed-knowledge-batch-two](task-reviewed-knowledge-batch-two.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Evidence: Both groups pass `./init.sh` with 263 tests and PDF fingerprint/freshness checks. Coverage is 100 records, 427 claims, 303 locators; 12/64 quẻ and 72/384 positions.
- Commits: Four quẻ `c5bf201`; advanced BPCT `5fa328c`.
- Exclusions: Phi thần type 2 and Đằng Xà’s own element remain outside released claims because the wording is unclear.
- Blockers: none.
- Next: Review Đồng Nhân, Đại Hữu, Khiêm, Dự and BPCT chapter 5, sections 8–10 (Tứ sinh, Nguyệt phá, Tuần không; PDF 70), as recorded in the manifest.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-01 — task-reviewed-knowledge-batch-three completed handoff

- Historical status: done.
- Result: Completed both selected tracks and reconciled the source inventory with exact passage locations, seven supported discrepancy resolutions, and explicit advanced exclusions. Reviewed content, quality, and model documents remain accurate; they link the canonical coverage report.
- Commits: Four quẻ `c5bf201`; Phi–Phục and Lục thú `5fa328c`.
- Evidence: Final `./init.sh` passed 263 tests. Coverage remains incomplete: 100 records, 427 cited claims, 303 locators; 12/64 quẻ and 72/384 positions in each commentary book. PDF fingerprints, generated-output freshness, and diff checks passed.
- Blockers: none for this batch. Phi thần type 2 and Đằng Xà’s own element remain excluded pending clearer source evidence.
- Next: Review Đồng Nhân, Đại Hữu, Khiêm, Dự and BPCT chapter 5, sections 8–10 (Tứ sinh, Nguyệt phá, Tuần không; PDF 70).
