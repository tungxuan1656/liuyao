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

- State: done. [PR #104](https://github.com/tungxuan1656/liuyao/pull/104) was squash-merged into `main` on 2026-10-09 as `9ae0b1aee853c6ba8a361a6e4d3ee3fc0ff4f1e7`. This tracking closeout follows that merge; no quẻ data is changed here.
- Evidence: reviewed at `074033c`, fixed in `7b29b62` (11 cells, only `text`/`pdfPages` changed). Round 1 (one reviewer per quẻ, 28/25/27/29 cells): PASS, PASS, PASS, FAIL — quẻ 28 `lines[5].entries[3]` cited NTT `[481,481]` where the passage is on PDF 482 (P0, inherited). Round 2 (`afb32196`, one reviewer per quẻ, different model): all four PASS, every hunk CONFIRMED, no new findings. `./init.sh` → `=== Verification passed ===`; `validate:corpus --check-books --check` → 381 records, 381 ready, 4 supplied books. Artifacts: `.agent-work/feat-074/{review-1,review-2}-h25..h28.md`, `fix-1.md`, `image-verify.md`, `leader-audit.md`, `cells.md` (git-ignored scratch).
- Follow-up in PR #104: corrected NHL Sơ Cửu `printedPages` to `[213,214]`, updated summary counts, and integrated newer `main` without changing quẻ structures.
- Dependencies: feat-067 and feat-041 are done.
- Verification boundary: `./init.sh` and `validate:corpus --check-books --check` above are the historical checks reported in PR #104, not reruns on this documentation-only closeout branch. New-branch CI must pass before merging this closeout.
- Next: leave feat-074 as `done`; follow the separately tracked post-audit issues as needed. Feat-084 remains `todo` until the operator activates it.

## Decision log

- **Branch name.** Question: the delivery skill names feature branches `feat/<id>-<slug>`, while this checkout
  is the operator-created worktree branch `tungxuan1656/feat-074`. Decision: publish that branch as it is.
  Rationale: the parallel feature in the same batch shipped PR #101 from `tungxuan1656/feat-077`, so the
  worktree naming is already the convention for this batch, and renaming the branch would remap the enclosing
  worktree for no gain. Effect on scope or acceptance: none.
- **Quẻ 25 and 26 keep the baseline text.** Question: both writers reported deleting the shared introduction
  reference `source-book-nhl [59,61]`. Decision: keep the reference and the text unchanged. Rationale: NHL 59
  ("Cách vạch và xét trùng quái: từ dưới lên.") and NHL 61 ("Hào cửu – Hào lục") do carry the retained
  sentence "Hào được đếm từ dưới lên.", and the merged feat-072 records carry the same fourth reference;
  the deletion was a writer regression, so review of these two quẻ became an inherited-error audit. Subsequent
  fixes to other entries changed three cells in quẻ 25 and two in quẻ 26 relative to `main`.
- **Quẻ 27 keeps its two overview `condition` caveats.** Question: the writer had deleted the caveat
  "Đây là quan điểm dưỡng thân, dưỡng đức trong sách cổ, không là chế độ dinh dưỡng hoặc phương pháp điều trị
  hiện đại." from overview entries 1 and 2. Decision: restore both. Rationale: `condition` renders to users
  (`apps/web/src/knowledge-entries.tsx:67-68`) and quẻ 28 keeps its analogous caveats, so removing the
  guardrail was a regression, not a cleanup.
- **Image-word trim extended past the reviewed locations.** Question: round 1 named the invented word
  "mầm" in two quẻ 28 hào-2 cells only, but the same hào's Phan Bội Châu and Trình Di cells also said
  "mầm"/"chồi". Decision: align all four cells to their own source wording (NHL 222, PBC 290, NTT 477).
  Rationale: leaving one invented word in three of four parallel cells is incoherent; round 2 then checked the
  two extra trims independently and confirmed neither went too far. Effect: two cells changed beyond the
  findings list, both inside the same hào and the same acceptance bar.
- **Two further book typos were not catalogued.** Question: NTT 438 prints "hữu du chung" for "hữu du vãng"
  and NTT 470 prints 庚 where 慶 is meant. Decision: leave them out of `notes[]`. Rationale: the acceptance
  bar requires every recorded source error to be correct, not that every typo in the books be catalogued;
  both are single-glyph printing slips that do not change the reading.
