# feat-038 — Reviewed knowledge batch seven

## Goal

Expand the next classical and Liu Yao groups with reviewed evidence.

## Scope

- Vô Vọng, Đại Súc, Di, Đại Quá: three-book overviews and all six positions.
- BPCT chapter 5, sections 15–16: Hợp xứ phùng xung / Xung trung phùng hợp and Tuyệt xứ phùng sinh / Khắc xứ phùng sinh.
- Author differences, source discrepancies, exclusions, and citation review.
- Correct the reversed Đại Súc display name against the supplied editions.
- Source documentation and the next exact batch.

## Non-goals

Automated interpretation, calendars, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve IDs, reviewed names, structures, aliases, and attribution.
- [x] Advanced records preserve source conditions and textual layers.
- [x] Each released claim has complete passage review and an exact edition citation.
- [x] Content groups have separate verified commits.
- [x] Coverage and manifest identify remaining gaps and the next batch.
- [ ] `./init.sh`, fingerprints, generated freshness, and diff checks pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review complete classical passages, footnotes, diagrams, and source errors. Done.
2. Author four quẻ, migrate legacy records, verify, and commit. Done.
3. Review related BPCT passages, author conditional records, verify, and commit. Done.
4. Reconcile source documentation, verify, and commit the handoff.

## Evidence

Released corpus: 145 records, 885 claims, 716 citations.
`./init.sh` passed (263 tests). Fingerprints, freshness, and diff checks passed.
All 195 NHL and nine new BPCT citations have verified printed labels.

## Handoff

- State: active.
- Blockers: none.
- Next: Reconcile source documentation and verify the handoff.
