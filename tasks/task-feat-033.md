# feat-033 - Reviewed knowledge batch two

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-032](task-feat-032.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Expand both approved content tracks and commit each reviewed group.

## Scope

- Add PBC/NTT line comparisons to Càn, Khôn, Tụng, and Lý.
- Add Truân, Mông, Nhu, and Sư with attributed overviews and six line positions.
- Add BPCT chapter 5, sections 1–4: Dụng thần, Thế–Ứng, Nguyên thần, Cừu thần, and Kỵ thần.

## Non-goals

Automated interpretation, calendar behavior, UI changes, and complete corpus certification.

## Acceptance

- [x] Pilot comparisons preserve author attribution, special passages, and exact edition locators.
- [x] Four additional quẻ have source-reviewed structure and six cited line summaries.
- [x] Advanced records preserve source conditions and remain descriptive knowledge.
- [x] Each content group has passage review, valid references, and a separate verified commit.
- [x] Coverage and the next batch reflect the released corpus.
- [x] `./init.sh`, fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Plan

Execute inline under the approved content sequence and the user's continuation request.

1. Read complete PBC/NTT pilot passages, add line comparisons, verify, and commit.
2. Read Truân–Mông–Nhu–Sư chapters, replace legacy IDs, verify, and commit.
3. Read BPCT PDF 67–68 and related definitions, preserve conditions, verify, and commit.
4. Reconcile source review and coverage, record the next batch, and commit the handoff.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Evidence: 84 records, 303 claims, 202 locators; 8/64 quẻ and 48/384 positions. All groups pass `./init.sh` with 263 tests and PDF fingerprint/freshness checks.
- Commits: Pilot comparisons `33c7097`; four quẻ `fb93a79`; advanced BPCT `69c4683`.
- Blockers: none.
- Next: Review Tỷ, Tiểu Súc, Thái, Bĩ and BPCT chapter 5, sections 5–7 (PDF 68–69), as recorded in the manifest.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-01 — feat-033 completed handoff

- Historical status: done.
- Result: Completed both selected content tracks. Reconciled content, model, quality, and source documents with the released corpus. Retained explicit incomplete coverage and linked the manifest's next batch.
- Commits: Foundation `da4f1ab`; pilot line comparisons `33c7097`; Truân–Mông–Nhu–Sư `fb93a79`; advanced BPCT `69c4683`.
- Evidence: 84 released records, 303 cited claims, 202 locators; 8/64 quẻ and 48/384 positions in each of the three commentary books. Each group passed `./init.sh` with 263 tests, source fingerprints, generated-output freshness, and diff checks.
- Blockers: none for this batch. Complete corpus review remains unfinished.
- Next: Review Tỷ, Tiểu Súc, Thái, Bĩ and BPCT chapter 5, sections 5–7 (Phi thần, Phục thần, Lục thú; PDF 68–69).

## Migration provenance

Migrated from [feat-033](../features/feat-033.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
