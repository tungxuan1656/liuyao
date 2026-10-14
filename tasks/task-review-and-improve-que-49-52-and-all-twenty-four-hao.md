# task-review-and-improve-que-49-52-and-all-twenty-four-hao - Review and improve quẻ 49–52 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-reviewed-que-49-52-and-bpct-sentences-25-32](task-reviewed-que-49-52-and-bpct-sentences-25-32.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 49 Trạch Hỏa Cách; 50 Hỏa Phong Đỉnh; 51 Thuần Chấn; 52 Thuần Cấn.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 49 · Sơ (1).
- [x] 49 · Nhị (2).
- [x] 49 · Tam (3).
- [x] 49 · Tứ (4).
- [x] 49 · Ngũ (5).
- [x] 49 · Thượng (6).
- [x] 50 · Sơ (1).
- [x] 50 · Nhị (2).
- [x] 50 · Tam (3).
- [x] 50 · Tứ (4).
- [x] 50 · Ngũ (5).
- [x] 50 · Thượng (6).
- [x] 51 · Sơ (1).
- [x] 51 · Nhị (2).
- [x] 51 · Tam (3).
- [x] 51 · Tứ (4).
- [x] 51 · Ngũ (5).
- [x] 51 · Thượng (6).
- [x] 52 · Sơ (1).
- [x] 52 · Nhị (2).
- [x] 52 · Tam (3).
- [x] 52 · Tứ (4).
- [x] 52 · Ngũ (5).
- [x] 52 · Thượng (6).
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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Evidence: reviewed corpus head `c78b044779194c891599d36fa7c75851640155f8` — the complete corpus change;
  the commits that follow it add only records (`ed0f7d6` activation, `ba77b62` completion) and the `main`
  merge. Open PR #108, **not merged**, exact-head CI green (`verify`, Cloudflare Pages, GitGuardian) with
  `mergeStateStatus: CLEAN`. `./init.sh` passed with `=== Verification passed ===` (181 core tests + 97
  knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check`
  reported 381
  records, 381 ready, 4 supplied books. Structure invariants unchanged against baseline `b9d306d`: 0 of 4
  files changed an invariant field, all 24 `(position, polarity, label)` tuples and every entry count
  unchanged; references 65→64 (Cách, duplicate dropped), 63→63, 57→57, 63→65 (Cấn, two Chu Hy pages
  added). Review rounds 1–2 recorded above; the five `notes[]` image claims were rendered with PyMuPDF and
  read by the Leader. Reports: `.agent-work/task-review-and-improve-que-49-52-and-all-twenty-four-hao/reports/h{49,50,51,52}-report.md`,
  `.agent-work/task-review-and-improve-que-49-52-and-all-twenty-four-hao/reviews/r1-h*.md` and `r2-h*.md`, `.agent-work/task-review-and-improve-que-49-52-and-all-twenty-four-hao/notes-image-verification.md`.
- Blockers: none.
- Limits: the reviewer children read extracted page text and cannot see page images, and they did not run
  the test commands; the invariant comparison is Leader-generated. Round 2 verified the four corrections
  and 41 risk cells rather than re-walking all 122 entries, so a defect outside those cells would still be
  undetected. The reviewer's provider losing credentials mid-feature is an environment limit worth
  expecting again in this batch.
- Dependencies: [frozen index](../tasks/index.md).
- Next: review and merge PR #108; the rest of the batch (task-review-and-improve-que-53-56-and-all-twenty-four-hao, task-review-and-improve-que-57-60-and-all-twenty-four-hao, task-review-and-improve-que-61-64-and-all-twenty-four-hao) is still `todo`.

#### Follow-up review and integration — 2026-10-09

- The operator requested review and fixes on PR #108 while leaving it unmerged. Confirmed PR #112 / task-review-and-improve-que-45-48-and-all-twenty-four-hao already merged and fetched updated `main`; the feature index on `main` was `task-review-and-improve-que-49-52-and-all-twenty-four-hao: todo`, `task-review-and-improve-que-53-56-and-all-twenty-four-hao: done`, `task-review-and-improve-que-57-60-and-all-twenty-four-hao: done`, `task-review-and-improve-que-61-64-and-all-twenty-four-hao: todo`. Kept these later statuses and preserved the older `task-review-and-improve-que-25-28-and-all-twenty-four-hao: active` entry without changing unrelated features.
- Inspected four quẻ / 24 hào / citation shapes and re-read the disputed Ngô Tất Tố, Phan Bội Châu and Nguyễn Hiến Lê pages for quẻ 49–52. One further **source-content defect** was found in a previously reviewed cell: `hexagram-52.json`, Lục Nhị, Phan Bội Châu text states `cứu được tam nên không vui`, directly reversing his explanation. **PBC PDF 497** explicitly says `Nhị ... không sức chỉ được Tam`, `không thể chữa được` and `không cứu chửng được` in the Tiểu Tượng, so this entry now correctly says Nhị cannot restrain or repair Tam, must follow and is unhappy.
- No further actionable source-text discrepancy was confirmed in the high-risk passages checked. Earlier reviewer reports and their limitations remain described above; this follow-up does not claim to redo the entire independent two-round audit.
- Synchronized the branch with latest `main` via a merge commit preserving all new append-only `task handoff history` entries, `tasks/index.md` changes from other PRs, and the reviewed quẻ 49–52 data. No identity, polarity, author-layer count or reference shape changed; five source notes remain.
- Marked `task-review-and-improve-que-49-52-and-all-twenty-four-hao` **done** in the feature index on this PR, before operator merge as directed. Run CI against final branch head. PR remains open; the operator will squash merge manually.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — task-review-and-improve-que-49-52-and-all-twenty-four-hao reviewed and improved quẻ 49–52

- Historical status: `done` on PR [#108](https://github.com/tungxuan1656/liuyao/pull/108), left open for manual operator merge. Follow-up review integrated the latest `main` after PR #112 merged and corrected a further book-fidelity defect in Cấn.
- Result: reviewed and improved all four assigned quẻ (49 Trạch Hỏa Cách, 50 Hỏa Phong Đỉnh, 51 Thuần Chấn, 52 Thuần Cấn) and all twenty-four hào under the simplified knowledge model.
- Content: overview layers and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy (the last two via “Ngô Tất Tố — dịch và chú giải”); Cách adds Hồ Vân Phong and Trình Truyện (via Phan Bội Châu) on hào five and six. Five `notes[]` entries record genuine source discrepancies: PBC 484 calling a hào `Cửu Ngũ` inside the hào-three Tiểu Tượng where the rest of the page and hào five print `Lục Ngũ` (the hexagram figure has yin at position five); PBC 491 printing Hán `Lục tứ` beneath the `Cửu Tứ` heading while NTT 785 splits its own label and gloss; NTT 782–783 and PBC 490 giving conflicting `Chín Hai` / `Cửu Nhị` names for a yin position two; PBC 5 and PBC 493 printing `51` for both Bát Thuần Chấn and Bát Thuần Cấn; and NHL 295 / PBC 497 shifting a hào-three label by one position. No record was restructured — the legacy `section` / `printedPages` fields and the `condition` string were deliberately left alone, unlike task-review-and-improve-que-09-12-and-all-twenty-four-hao/072 where normalising them was in scope.
- Review: two rounds, both by a read-only reviewer under the batch acceptance bar — **reference + invention only**. Round 1 walked all 122 entries (118 attributed), the four introductions and the five notes: Cách PASS 0 findings; Đỉnh FAIL 1 P1; Chấn FAIL 1 P0; Cấn FAIL 2 P1. Round 2 verified the four corrections, their direct uses and 41 risk cells: **PASS, 0 findings, no new defects**.
- Defects found and fixed (each re-verified against the cited page before the edit):
  - `hexagram-50.json` `lines[2].entries[2]` (Trình Di, NTT 772–773) weakened a definite conclusion to “có thể kết thúc tốt”; the source says “sau chót nên được tốt lành” and “sau cùng ắt hòa hợp”.
  - `hexagram-51.json` `entries[5]` (**P0**) asserted an invented “đại từ” (pronoun) marked in the ruler's-sacrifice sentence. NTT 780 prints `Ra khá lấy[3] giữ tôn miếu xã tắc`, and footnote [3] on NTT 789 says only “chữ này muốn chỉ về con trưởng của vua chúa”; the marked word is `lấy` (gloss of 以), confirmed glyph by glyph from the page's rawdict codepoints.
  - `hexagram-52.json` `lines[3].entries[0]` narrowed Nguyễn Hiến Lê's “không làm được việc gì” (NHL 295) to “không làm công việc lớn”.
  - `hexagram-52.json` `entries[5].references` cited only the six Ngô Tất Tố footnote pages while the prose compares Chu Hy's 止/趾 reading and summarises his kháp-vần note; NTT 793 and NTT 799 were added.
- Round-1 write also corrected two Phan Bội Châu reference ranges onto the pages that carry the end of the passage (`hexagram-49.json` `[469,469]`→`[469,470]`, `[473,473]`→`[473,474]`) and dropped a duplicated `[475,475]` declaration, and normalised mid-sentence “Ông” to “ông” in three records.
- Evidence: `./init.sh` passed via `=== Verification passed ===` before and after the fix commit and again on the merged head (181 core tests + 97 knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. Structure invariants against baseline `b9d306d`: 0 of 4 files changed an invariant field, all 24 `(position, polarity, label)` tuples and every entry count unchanged. Exact-head CI green (`verify`, Cloudflare Pages, GitGuardian). All five `notes[]` entries assert printed-page images, so the Leader rendered every cited page with PyMuPDF and read it; all five held, including the Tốn/Ly figure extracted from PBC 479 as an embedded image (xref 1738) with position five broken.
- Limits: reviewer children read extracted page text only, never page images, and did not execute the test commands; the invariant comparison is Leader-generated. Round 2 re-checked the four fixes and 41 risk cells rather than all 122 entries, so a defect outside those cells is still undetected. Round 2 also had to run on a different model (`9router/ag/gemini-3.8-flash`) because the round-1 reviewer's provider lost its credentials mid-session — the task, role and bar were unchanged, but the rounds are not a like-for-like model comparison.
- Blockers: none for task-review-and-improve-que-49-52-and-all-twenty-four-hao.
- Next: review latest CI on the updated PR branch, then operator manually merges PR #108. Future quẻ 53–60 (`task-review-and-improve-que-53-56-and-all-twenty-four-hao`, `task-review-and-improve-que-57-60-and-all-twenty-four-hao`) are already `done` on `main`; `task-review-and-improve-que-61-64-and-all-twenty-four-hao` remains `todo`.
- Follow-up correction: in quẻ 52 Lục Nhị, Phan Bội Châu PDF 497 explicitly writes that Nhị cannot restrain or remedy Tam's mistake; previous corpus text mistakenly said `cứu được tam`. Corrected to `không thể hạn chế hay cứu sửa được Tam`, retaining the meaning that Nhị must follow unwillingly. Audited book page excerpts for this and other risk cells and preserved all existing author layers, references and five source notes.
