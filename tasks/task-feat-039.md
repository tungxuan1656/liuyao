# feat-039 - Reviewed knowledge batch eight

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-038](task-feat-038.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Evidence: Eight records add 110 claims and 96 citations; nine source errors resolved. Author differences and exclusions remain explicit.
- Verification: `./init.sh` passes 263 tests; fingerprints, generated freshness, and 101 local documentation routes pass. Checked 223 NHL citations and five new BPCT printed locators.
- Commits: Classical `3b9ab7e`; BPCT `b7fce51`.
- Blockers: none for selected content.
- Next: Review the [manifest's next batch](../docs/reviews/knowledge/README.md).

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — feat-039 completed source audit and handoff

- Historical status: done.
- Result: Added Khảm, Ly, Hàm, Hằng and four BPCT records. Preserved author differences and nine visually checked source-error resolutions. Kept conditional Tiến/Thoái effects, proxy relationships, and the source's religious setting explicit. Reconciled source locations and exclusions.
- Commits: Classical `3b9ab7e`; BPCT `b7fce51`.
- Evidence: Final `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, 101 local documentation routes, and diff checks passed. Checked all 223 NHL citations across 108 cited pages and five new BPCT printed locators.
- Coverage: 153 records, 995 cited claims, 812 locators. Classical coverage is 32/64 quẻ and 192/384 positions per commentary book. Thirty-two quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. The missing Tiến entry, ambiguous attribution, unlocated reference, and reported outcomes remain outside released authority. Full coverage and independent specialist approval remain incomplete.
- Next: Review Độn, Đại Tráng, Tấn, Minh Di and BPCT chapter 6, sentences 1–6 (PDF 77–79).

## Migration provenance

Migrated from [feat-039](../features/feat-039.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
