# feat-040 — Reviewed knowledge batch nine

## Goal

Expand the next classical and Liu Yao groups with reviewed evidence.

## Scope

- Độn, Đại Tráng, Tấn, Minh Di: three-book overviews and all six positions.
- BPCT chapter 6, sentences 1–6: moving changes, balance, support, control, and Sinh/Vượng.
- Author differences, source discrepancies, exclusions, and citation review.
- Source documentation and the next exact batch.

## Non-goals

Automated interpretation, calendars, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve IDs, reviewed names, structures, aliases, and attribution.
- [x] Advanced records preserve source conditions and textual layers.
- [x] Each released claim has complete passage review and an exact edition citation.
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

## Verification

- Baseline, classical, and advanced `./init.sh`: pass; 263 tests.
- Current corpus: 161 records, 1,111 claims, 916 citations.
- Four quẻ add 100 claims, 96 citations, and seven resolved source discrepancies.
- Advanced: four new records and moving-line context add 16 claims and eight citations.
- Fingerprints, generated freshness, diff checks, all 251 NHL citations, and eight new BPCT printed locators: pass.

## Handoff

- State: active.
- Blockers: none.
- Next: Reconcile source locations, discrepancies, exclusions, and the final handoff.
