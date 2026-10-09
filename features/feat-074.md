# feat-074 — Review and improve quẻ 25–28 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 25 Thiên Lôi Vô Vọng; 26 Sơn Thiên Đại Súc; 27 Sơn Lôi Di; 28 Trạch Phong Đại Quá.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 25 · Sơ (1).
- [x] 25 · Nhị (2).
- [x] 25 · Tam (3).
- [x] 25 · Tứ (4).
- [x] 25 · Ngũ (5).
- [x] 25 · Thượng (6).
- [x] 26 · Sơ (1).
- [x] 26 · Nhị (2).
- [x] 26 · Tam (3).
- [x] 26 · Tứ (4).
- [x] 26 · Ngũ (5).
- [x] 26 · Thượng (6).
- [x] 27 · Sơ (1).
- [x] 27 · Nhị (2).
- [x] 27 · Tam (3).
- [x] 27 · Tứ (4).
- [x] 27 · Ngũ (5).
- [x] 27 · Thượng (6).
- [x] 28 · Sơ (1).
- [x] 28 · Nhị (2).
- [x] 28 · Tam (3).
- [x] 28 · Tứ (4).
- [x] 28 · Ngũ (5).
- [x] 28 · Thượng (6).
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

- State: active. Implementation, round 1 review, the fix pass, and round 2 verification are complete on the feature branch; no PR, push, or merge was requested.
- Evidence: reviewed at `074033c`, fixed in `7b29b62` (11 cells, only `text`/`pdfPages` changed). Round 1 (one reviewer per quẻ, 28/25/27/29 cells): PASS, PASS, PASS, FAIL — quẻ 28 `lines[5].entries[3]` cited NTT `[481,481]` where the passage is on PDF 482 (P0, inherited). Round 2 (`afb32196`, one reviewer per quẻ, different model): all four PASS, every hunk CONFIRMED, no new findings. `./init.sh` → `=== Verification passed ===`; `validate:corpus --check-books --check` → 381 records, 381 ready, 4 supplied books. Artifacts: `.agent-work/feat-074/{review-1,review-2}-h25..h28.md`, `fix-1.md`, `image-verify.md`, `leader-audit.md`, `cells.md` (git-ignored scratch).
- Dependencies: feat-067 and feat-041 are done.
- Next: obtain operator approval to open the branch/PR for the reviewed head and record the merge, then flip this feature to done.
