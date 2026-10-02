# feat-041 — Reviewed knowledge batch ten

## Goal

Expand the next classical and Liu Yao groups with reviewed evidence.

## Scope

- Gia Nhân, Khuê, Kiển, Giải: three-book overviews and all six positions.
- BPCT chapter 6, sentences 7–11: Tử/Mộ/Tuyệt/Không, day, month, year, and Quái thân.
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

## Verification

- `./init.sh`: 263 tests passed.
- Fingerprints, generated freshness, 121 documentation routes, and diff checks passed.
- Checked 279 NHL citations across 133 pages and six new BPCT printed locators.

## Handoff

- State: done.
- Commits: Classical `a73209e`; BPCT `f780804`.
- Result: Eleven new records; seven final fidelity corrections and reconciled source documentation.
- Blockers: None for selected claims. Unclear passages remain excluded; full coverage and specialist review remain incomplete.
- Next: Review Tổn, Ích, Quải, Cấu and BPCT chapter 6, sentences 12–16 (PDF 81–82).
