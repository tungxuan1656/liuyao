# feat-041 - Reviewed knowledge batch ten

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-040](task-feat-040.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Commits: Classical `a73209e`; BPCT `f780804`.
- Result: Eleven new records; seven final fidelity corrections and reconciled source documentation.
- Blockers: None for selected claims. Unclear passages remain excluded; full coverage and specialist review remain incomplete.
- Next: Review Tổn, Ích, Quải, Cấu and BPCT chapter 6, sentences 12–16 (PDF 81–82).

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-02 — feat-041 completed source audit and handoff

- Historical status: done.
- Result: Added Gia Nhân, Khuê, Kiển, Giải and seven BPCT records. Preserved author differences, four visually checked source-error resolutions, conditional day, month, and year effects, and separate Thân meanings. Tightened seven classical summaries. Reconciled source locations and exclusions.
- Commits: Classical `a73209e`; BPCT `f780804`.
- Evidence: `./init.sh` passed 263 tests. Fingerprints, generated freshness, 121 documentation routes, and diff checks passed. Checked 279 NHL citations across 133 pages and six new BPCT printed locators.
- Coverage: 172 records, 1,226 cited claims, 1,015 locators. Classical coverage is 40/64 quẻ and 240/384 positions per commentary book. Twenty-four quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. Unclear references, full coverage, calendar algorithms, and independent specialist approval remain excluded or incomplete.
- Next: Review Tổn, Ích, Quải, Cấu and BPCT chapter 6, sentences 12–16 (PDF 81–82).

## Migration provenance

Migrated from [feat-041](../features/feat-041.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
