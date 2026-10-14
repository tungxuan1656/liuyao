# task-review-and-improve-que-05-08-and-all-twenty-four-hao - Review and improve quẻ 05–08 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-reviewed-knowledge-batch-ten](task-reviewed-knowledge-batch-ten.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 05 Thủy Thiên Nhu; 06 Thiên Thủy Tụng; 07 Địa Thủy Sư; 08 Thủy Địa Tỷ.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 05 · Sơ (1).
- [x] 05 · Nhị (2).
- [x] 05 · Tam (3).
- [x] 05 · Tứ (4).
- [x] 05 · Ngũ (5).
- [x] 05 · Thượng (6).
- [x] 06 · Sơ (1).
- [x] 06 · Nhị (2).
- [x] 06 · Tam (3).
- [x] 06 · Tứ (4).
- [x] 06 · Ngũ (5).
- [x] 06 · Thượng (6).
- [x] 07 · Sơ (1).
- [x] 07 · Nhị (2).
- [x] 07 · Tam (3).
- [x] 07 · Tứ (4).
- [x] 07 · Ngũ (5).
- [x] 07 · Thượng (6).
- [x] 08 · Sơ (1).
- [x] 08 · Nhị (2).
- [x] 08 · Tam (3).
- [x] 08 · Tứ (4).
- [x] 08 · Ngũ (5).
- [x] 08 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and improve one quẻ at a time.
2. Repair material content findings and check affected source passages.
3. Verify all twenty-four positions before closing the feature.

## Verify

- `./init.sh` passed 100% (181 core tests + 97 knowledge tests; knowledge suite ran in 2.15s).
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed: 381 records; 381 ready; 4 supplied books verified against SHA-256 fingerprints.
- Independent reviewer validated schema, references, line counts, and Vietnamese prose across all four hexagrams.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Evidence: Full repository verification passed via `./init.sh`. All 4 hexagrams and 24 hào positions reviewed and updated with Chu Hy, Trình Di, Nguyễn Hiến Lê, and Phan Bội Châu perspectives.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Select and activate `task-review-and-improve-que-09-12-and-all-twenty-four-hao` (Review and improve quẻ 09–12 and all twenty-four hào).

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — task-review-and-improve-que-05-08-and-all-twenty-four-hao reviewed and improved quẻ 05–08

- Historical status: done; reviewed and verified against supplied books.
- Result: Reviewed and improved all four assigned quẻ (05 Thủy Thiên Nhu, 06 Thiên Thủy Tụng, 07 Địa Thủy Sư, 08 Thủy Địa Tỷ) and all twenty-four hào positions under the simplified knowledge model.
- Content updates:
  - Cleaned legacy `section` and `printedPages` fields across all four hexagrams; preserved required entry IDs in quẻ 06 for lesson link resolution.
  - Enriched structural and thematic overviews across NHL, PBC, and NTT with distinct viewpoints (General, Nguyễn Hiến Lê, Phan Bội Châu, Trình Di, Chu Hy).
  - Added and checked Chu Hy classical commentaries across overview entries and individual hào positions (quẻ 05 line 1, lines 2–6; quẻ 06 lines 1–6; quẻ 07 lines 1–6; quẻ 08 lines 1–6).
  - Polished Vietnamese prose for natural readability, philosophical precision, and adherence to traditional I Ching doctrine.
- Evidence: `./init.sh` passed 100% (181 core tests + 97 knowledge tests; knowledge suite ran in 2.15s). Full corpus validation with `--check-books` verified 381 records and all 4 supplied PDF fingerprints.
- Coverage: All 4 assigned quẻ and 24 hào positions have complete, verified coverage.
- Blockers: none for task-review-and-improve-que-05-08-and-all-twenty-four-hao.
- Next: User selection and activation of task-review-and-improve-que-09-12-and-all-twenty-four-hao (Review and improve quẻ 09–12 and all twenty-four hào).
