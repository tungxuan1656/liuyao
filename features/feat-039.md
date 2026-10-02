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
- [ ] Advanced records preserve source conditions and textual layers.
- [ ] Each released claim has complete passage review and an exact edition citation.
- [ ] Content groups have separate verified commits.
- [ ] Coverage and manifest identify remaining gaps and the next batch.
- [ ] `./init.sh`, fingerprints, generated freshness, and diff checks pass.

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

- State: active.
- Blockers: none.
- Evidence: Classical passages and rendered errors reviewed; 95 claims, 91 citations, nine source-error resolutions. Full verification and fingerprints pass (263 tests).
- Next: Review BPCT sections 17–18 and related conditions.
