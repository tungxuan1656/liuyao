# feat-075 — Review and improve quẻ 29–32 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 29 Thuần Khảm; 30 Thuần Ly; 31 Trạch Sơn Hàm; 32 Lôi Phong Hằng.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 29 · Sơ (1).
- [x] 29 · Nhị (2).
- [x] 29 · Tam (3).
- [x] 29 · Tứ (4).
- [x] 29 · Ngũ (5).
- [x] 29 · Thượng (6).
- [x] 30 · Sơ (1).
- [x] 30 · Nhị (2).
- [x] 30 · Tam (3).
- [x] 30 · Tứ (4).
- [x] 30 · Ngũ (5).
- [x] 30 · Thượng (6).
- [x] 31 · Sơ (1).
- [x] 31 · Nhị (2).
- [x] 31 · Tam (3).
- [x] 31 · Tứ (4).
- [x] 31 · Ngũ (5).
- [x] 31 · Thượng (6).
- [x] 32 · Sơ (1).
- [x] 32 · Nhị (2).
- [x] 32 · Tam (3).
- [x] 32 · Tứ (4).
- [x] 32 · Ngũ (5).
- [x] 32 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Four parallel writers, one per quẻ file, with per-entry provenance tables and no length target.
2. Round 1 exhaustive review across all attributed entries against source texts.
3. Round 2 verification of corrections and high-risk passages.
4. Leader runs shared validation, verifies any image-dependent notes, and records evidence.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: done. [PR #111](https://github.com/tungxuan1656/liuyao/pull/111) was merged into `main` on 2026-10-09 as `d427907ab75d62369ee112017e8a2ee2e4df5fe9`; its feature record was not updated during the original PR. This closeout synchronizes documentation, not the quẻ content.
- Scope and review: quẻ 29–32 each retain five overview entries and six correctly ordered lines; every hào has four attributed explanations (Nguyễn Hiến Lê, Phan Bội Châu, Trình Di, Chu Hy). PR #111 reports four independent, exhaustive, read-only round-1 reviewer PASS results and a targeted round-2 follow-up fixing two errors (Ly Lục Nhị/Lục Ngũ “ứng” vs formal chính ứng; Hàm Đại Tượng vs Cửu Tứ note location). Fifteen source-discrepancy notes remain attributed to their cited pages.
- Evidence: PR #111 reports `./init.sh` passing (12 knowledge test files / 97 tests), `validate:corpus --check-books --check` passing (381/381 ready records, four supplied books), and final-head CI passing. This closeout re-read the four committed JSON records on `main`: 24/24 lines are ordered with four author entries per position, and all four records remain `ready`. Focused post-merge PDF image spot checks read 14 cited pages for image-dependent notes: NHL 225, 226, 233; PBC 306, 318, 327; NTT 491, 499, 500, 505, 514, 515, 517, 532. These are additional local image observations, not evidence of an independent exhaustive re-review of all 96 line entries.
- Verification boundary: the command results above belong to the merged PR #111, not to this documentation-only branch. No `--check-books` check is claimed for the closeout branch; final-branch GitHub CI is required before merge. The original source-review record and image spot check do not establish universal book completeness.
- Dependencies: feat-067 and feat-041 are `done`.
- Next: leave feat-075 as `done`; resolve any future source discrepancies in focused follow-up issues. Feat-084 remains `todo` unless explicitly activated.
