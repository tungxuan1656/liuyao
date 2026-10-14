# task-book-backed-json-knowledge-foundation-and-pilot - Book-backed JSON knowledge foundation and pilot

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-book-backed-domain-documentation](task-book-backed-domain-documentation.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Deliver a cited JSON pilot for classical Kinh Dịch and Liu Yao learning.

## Scope

- Validated JSON, edition citations, review states, and coverage.
- Eight trigrams; Càn, Khôn, Tụng, Lý; 24 lines and separate special passages.
- Casting, foundational Liu Yao tables, and compatible readonly APIs.

## Non-goals

Full corpus certification, automated interpretation, calendar changes, core rewrites, and PDF redistribution.

## Acceptance

- [x] Four editions have fingerprints, bibliographic metadata, and rights boundaries.
- [x] Checks reject invalid shapes, references, evidence, and release states.
- [x] Eight trigrams and four quẻ have cited structure; each quẻ has six cited line summaries.
- [x] Casting and Liu Yao records preserve conditions and resolve documented discrepancies.
- [x] JSON owns migrated content; adapters preserve IDs and readonly APIs.
- [x] Coverage distinguishes reviewed content, missing author commentary, and remaining corpus.
- [x] `./init.sh` and `git diff --check` pass; source review has separate evidence.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [model](../docs/design-docs/knowledge-model.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md),
[ruleset](../docs/design-docs/liuyao-ruleset-v1.md), [licensing](../LICENSING.md).

## Plan

The user approved both tracks. Follow [the staged plan](../docs/plans/task-book-backed-json-knowledge-foundation-and-pilot.md) in this workspace.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; pilot only. Blockers: none.
- Next: Truân, Mông, Nhu, Sư; BPCT chapter 5, sections 1–4, PDF 67–68; missing PBC/NTT pilot line comparisons.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-01 — task-book-backed-json-knowledge-foundation-and-pilot JSON pilot and package migration

**State**: done for the approved pilot.
**Done**: Added four fingerprinted source editions, strict schemas, cited JSON records, release checks, generated coverage, and readonly book APIs. Existing lookups use reviewed JSON plus an explicitly unaudited compatibility snapshot.
**Evidence**: `./init.sh` passes with 263 package tests. Corpus fingerprint/freshness checks and `git diff --check` pass. Codex compared pilot passages and rendered symbol/table pages. Chromium loaded Càn and edition metadata after the production server stopped.
**Limits**: Coverage is 4/64 quẻ and 24/384 line positions. PBC/NTT line commentary and independent specialist approval remain missing. The main JS bundle is approximately 679kB, 197kB gzip. Existing build/lint warnings remain.
**Next**: Continue Truân, Mông, Nhu, Sư and BPCT chapter 5, sections 1–4, PDF 67–68. Include the missing PBC/NTT pilot line comparisons. Changes remain uncommitted.

#### 2026-10-01 — task-book-backed-json-knowledge-foundation-and-pilot pre-commit source review

**State**: done for the pilot.
**Done**: Rechecked authored claims against their cited passages and inspected the PBC/NTT Lý diagrams. Added BPCT PDF 13 to the Thiên can and Địa chi definitions so their Nạp Giáp clauses have direct evidence.
**Evidence**: The corpus still has 73 records, 119 claims, and 43 citations. Full verification and fingerprint checks run before the pilot commit.
**Blockers**: None.
**Next**: Continue the approved next batch in a separate feature and commit each reviewed content group.
