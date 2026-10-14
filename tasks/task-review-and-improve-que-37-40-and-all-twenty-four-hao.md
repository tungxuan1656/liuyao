# task-review-and-improve-que-37-40-and-all-twenty-four-hao - Review and improve quẻ 37–40 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-reviewed-knowledge-batch-ten](task-reviewed-knowledge-batch-ten.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 37 Phong Hỏa Gia Nhân; 38 Hỏa Trạch Khuê; 39 Thủy Sơn Kiển; 40 Lôi Thủy Giải.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 37 · Sơ (1).
- [x] 37 · Nhị (2).
- [x] 37 · Tam (3).
- [x] 37 · Tứ (4).
- [x] 37 · Ngũ (5).
- [x] 37 · Thượng (6).
- [x] 38 · Sơ (1).
- [x] 38 · Nhị (2).
- [x] 38 · Tam (3).
- [x] 38 · Tứ (4).
- [x] 38 · Ngũ (5).
- [x] 38 · Thượng (6).
- [x] 39 · Sơ (1).
- [x] 39 · Nhị (2).
- [x] 39 · Tam (3).
- [x] 39 · Tứ (4).
- [x] 39 · Ngũ (5).
- [x] 39 · Thượng (6).
- [x] 40 · Sơ (1).
- [x] 40 · Nhị (2).
- [x] 40 · Tam (3).
- [x] 40 · Tứ (4).
- [x] 40 · Ngũ (5).
- [x] 40 · Thượng (6).
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

Executed at reviewed head `afe0a65f676e177d862a0b6f5c0d845863bdcd71` (content commit `75540faf1cedacad9854e8eba9fc641dbc5f60db`, PR [#101](https://github.com/tungxuan1656/liuyao/pull/101)):

- `./init.sh` → `=== Verification passed ===`; 97 knowledge tests pass. Re-run green at the record commit
  `8153f87` with no formatting drift.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → `Knowledge: 381 records; 381
ready; 4 supplied books. Structural links and source pages valid.` Run the generating form
  (`--check-books`, no `--check`) after any source edit, because `--check` compares the generated
  `dist/` and `.generated/` outputs against the sources.
- Structure comparison against baseline `b9d306d` (artifact `.agent-work/task-review-and-improve-que-37-40-and-all-twenty-four-hao/invariants.md`): **0 of
  4** files changed an invariant field; all 24 `(position, polarity, label)` tuples unchanged; no
  `section`, `printedPages` or `condition` keys remain; every reference is exactly `{sourceId,
pdfPages: [start, end]}`; each file has 5 overview entries and 4 entries on all six hào; all four
  records `status: "ready"`.
- Review rounds: 1 exhaustive (`70a9416d`, 28 of 28 attributed cells per quẻ) → 40 PASS, 37/38/39 FAIL
  with 4 P1 findings → corrections applied and re-verified against the cited pages (`.agent-work/
task-review-and-improve-que-37-40-and-all-twenty-four-hao/fix3{7,8,9}.md`) → 2 verification of the corrections and their direct uses (`e0ccc0d3`)
  → 37, 38, 39 all PASS, 0 new findings. Quẻ 40 owns no correction to verify and its file is
  byte-identical (`3bf1eedf46ad1af4708f232ea6e3bd8a35408a2a`) to the revision round 1 passed, so round 2
  had nothing to inspect there.
- PDF images: 3 of the 4 notes assert something about a printed page image, which no reviewer can check.
  The Leader rendered those pages with PyMuPDF and read them: NHL 249 (the hào-two gloss is `vô du
loại`), NHL 252 (the hào heading is `Lục tam` while the gloss below says `dương mà ở vị âm`) and NTT
  620 (Chu Hy writes `hào Sáu Năm`). 38's second note is a prose claim the extracted text already
  attests (NTT 603).
- Leader spot-checks of cells round 1 marked clean (NTT 600 Khổng Tử với Dương Hóa, NTT 629 `Chỉ có
lánh mà đi mới khỏi`, NTT 631–632 `Kẻ tiểu nhân lui xuống, thì đấng quân tử tiến lên`) agreed with
  the entries.
- All four overview entries carry the inherited `source-book-nhl` `[59, 61]` declaration for `Hào được
đếm từ dưới lên`; NHL 59 does state `Cách vạch và xét trùng quái: từ dưới lên`, so the declaration is
  correct, and `hexagram-20.json` carries the same pair.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done, verified at `8153f87`; feature PR [#101](https://github.com/tungxuan1656/liuyao/pull/101)
  is open against `main` from branch `tungxuan1656/task-review-and-improve-que-37-40-and-all-twenty-four-hao`.
- Evidence: content commit `75540fa`, corrections `afe0a65`, records `8153f87`; `./init.sh` passed (97
  knowledge tests); `validate:corpus --check-books --check` passed (381 records / 381 ready / 4 supplied
  books); invariants unchanged for all 4 files; round 1 (4 reviewers) and round 2 (3 verifiers) recorded
  above; 3 image-dependent notes verified by rendering the source pages.
- Blockers: none.
- Limits: reviewer children cannot see PDF page images and reported that plainly, so the 3 image claims
  were verified by the Leader only; round 2 ran on `9router/cx/gpt-6-luna` rather than the round-1
  `9router/cx/gpt-6.1-sol` because of provider quota. PR #101 CI is green on the reviewed content head
  `d97fbeb` (`verify` pass, Cloudflare Pages pass, GitGuardian pass, `mergeStateStatus: CLEAN`);
  human review is pending.
- Dependencies: [frozen index](../tasks/index.md).
- Next: resolve PR #101 CI and review feedback, then activate the next unstarted batch feature.

#### Follow-up review and merge preparation — 2026-10-09

- Rechecked quẻ 37–40 and their 24 hào against the supplied book pages (Nguyễn Hiến Lê PDF 248–260, Phan Bội Châu PDF 358–394, Ngô Tất Tố PDF 583–634), in addition to the two earlier review rounds. The structural and source checks remained intact.
- **Kiển Lục Tứ:** Ngô Tất Tố PDF 617 prints `Chín Hai` in Chu Hy's explanation where `Cửu Tam` is the adjacent yang line (see NTT PDF 616–617 and quẻ structure). Confirmed on the rendered page, corrected the explanation and recorded a separate note rather than silently modifying the source.
- **Khuê Sơ Cửu/Cửu Tứ:** Ngô Tất Tố PDF 599–600 explicitly distinguishes their same-yang informal alliance from a formal yin–yang `chính ứng`; Nguyễn Hiến Lê PDF 252 and Phan Bội Châu PDF 373 use `ứng` to describe their cooperation. Added an editorial note preserving both readings.
- **Restored meaningful cautionary context:** the original batch removed every `condition`, including displays that distinguish ancient family roles, coercion, fortune imagery, directionality and political violence from modern instructions. The canonical knowledge model continues to support conditions, and the web UI renders them. Reinstated 18 targeted inherited cautions across the four quẻ without bringing back repetitive boilerplate or the optional `section` / `printedPages` metadata.
- Existing quẻ structures, 24 hào, 96 attributed line entries and author attributions remain unchanged. The two new notes bring total `notes` to 6 (1, 3, 2, 0).
- Synchronized branch with current `main`, retained the newer append-only progress history and marked `task-review-and-improve-que-37-40-and-all-twenty-four-hao` `done` for operator merge. PR #101 remains open; do not merge automatically. Run verification on the final head.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — task-review-and-improve-que-37-40-and-all-twenty-four-hao reviewed and improved quẻ 37–40

- Historical status: `done`; PR [#101](https://github.com/tungxuan1656/liuyao/pull/101) remains open for the operator to merge. Follow-up review included two source-specific corrections, preserved important context conditions and integrated current `main`.
- Result: reviewed and improved all four assigned quẻ (37 Phong Hỏa Gia Nhân, 38 Hỏa Trạch Khuê, 39 Thủy Sơn Kiển, 40 Lôi Thủy Giải) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy. The baseline carried only three entries on eighteen hào and four overview layers in Gia Nhân and Khuê; the missing Chu Hy layer was written from the `Bản nghĩa của Chu Hy` sections already on the NTT pages, so `hexagram-37.json` and `hexagram-38.json` move from overview 4 → 5 and 18 hào gain their fourth entry. Every reference is exactly `{sourceId, pdfPages: [start, end]}`; optional `section` and `printedPages` metadata are omitted, while targeted meaningful `condition` cautions are restored. Four `notes[]` entries record genuine source discrepancies with page locators — a hào-two reading that disagrees across three books (NHL 249 `vô du loại` vs NTT 587 `toại` vs PBC 364 `tụy`), a hào heading that contradicts its own gloss (NHL 252 `Lục tam` over `dương mà ở vị âm`), a Tượng gloss that swaps the neighbouring polarities (NTT 603), and Chu Hy naming `hào Sáu Năm` where the quẻ and the other books put the great man at the fifth position (NTT 620).
- Review: two rounds under the batch acceptance bar — **reference + invention only**. Round 1 was exhaustive (28 attributed cells, each quẻ's overview entries and notes) and returned 40 **PASS**, 37/38/39 **FAIL** with four P1s: PBC's reading in Gia Nhân's note was spelled `Âm tuy` where PBC 364 says `tụy`; Khuê's Phan Bội Châu entry stated the outcome as certain where PBC 376 says `có lẽ`; Kiển's Trình Di entry gave hào Hai extra friends it does not bring (NTT 618–619) and gave the relief the accomplishment of `việc lớn` where NTT 620 says `chỉ có thể thư dãn … được thư dãn cũng là tốt rồi`. All four were re-checked against the cited page before the edit, recorded in `.agent-work/task-review-and-improve-que-37-40-and-all-twenty-four-hao/fix37.md`, `fix38.md` and `fix39.md`, and committed as `afe0a65`. Round 2 verified the corrections and their direct uses: 37/38/39 **PASS**, 0 new findings; quẻ 40 carried no correction and its file is byte-identical to the revision round 1 passed, so there was nothing to verify.
- Lesson: the same author-layer failure mode as task-review-and-improve-que-09-12-and-all-twenty-four-hao to task-review-and-improve-que-17-20-and-all-twenty-four-hao recurred, but in the opposite direction — the defects were a dropped possibility word and an imported consequence clause, not padding. Reading the corrected sentence back against the page is what catches both.
- Verification: `./init.sh` passed (97 knowledge tests); `validate:corpus --check-books --check` passed with 381 records / 381 ready / 4 supplied books; structure invariants unchanged for all 4 files (`b9d306d` → `afe0a65`); three of the four notes assert something about a printed page image, and the Leader rendered NHL 249, NHL 252 and NTT 620 with PyMuPDF and read them.
- Blockers: none for task-review-and-improve-que-37-40-and-all-twenty-four-hao.
- Next: operator reviews final CI and merges PR #101; the agent leaves it unmerged.
- Follow-up findings: corrected Kiển Lục Tứ reading to Cửu Tam where NTT PDF 617 prints Chín Hai; added Khuê note distinguishing informal alliance of two yang lines from formal chính ứng (NTT 599–600, NHL 252, PBC 373). Restored 18 targeted contextual cautions previously erased; total source notes now 6. Verified the cited NTT 617 spelling on the rendered PDF page.
