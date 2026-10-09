# feat-039 — Reviewed knowledge batch eight

## Goal

Expand the next classical and Liu Yao groups with reviewed evidence.

## Scope

- Khảm, Ly, Hàm, Hằng: three-book overviews and all six positions.
- BPCT chapter 5, sections 17–18: Tiến thần / Thoái thần and Quẻ nghiệm / không nghiệm.
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

- State: done.
- Evidence: Eight records add 110 claims and 96 citations; nine source errors resolved. Author differences and exclusions remain explicit.
- Verification: `./init.sh` passes 263 tests; fingerprints, generated freshness, and 101 local documentation routes pass. Checked 223 NHL citations and five new BPCT printed locators.
- Commits: Classical `3b9ab7e`; BPCT `b7fce51`.
- Blockers: none for selected content.
- Next: Review the [manifest's next batch](../docs/reviews/knowledge/README.md).
