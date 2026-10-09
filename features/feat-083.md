# feat-083 — Review and improve quẻ 61–64 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 61 Phong Trạch Trung Phu; 62 Lôi Sơn Tiểu Quá; 63 Thủy Hỏa Ký Tế; 64 Hỏa Thủy Vị Tế.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 61 · Sơ (1).
- [x] 61 · Nhị (2).
- [x] 61 · Tam (3).
- [x] 61 · Tứ (4).
- [x] 61 · Ngũ (5).
- [x] 61 · Thượng (6).
- [x] 62 · Sơ (1).
- [x] 62 · Nhị (2).
- [x] 62 · Tam (3).
- [x] 62 · Tứ (4).
- [x] 62 · Ngũ (5).
- [x] 62 · Thượng (6).
- [x] 63 · Sơ (1).
- [x] 63 · Nhị (2).
- [x] 63 · Tam (3).
- [x] 63 · Tứ (4).
- [x] 63 · Ngũ (5).
- [x] 63 · Thượng (6).
- [x] 64 · Sơ (1).
- [x] 64 · Nhị (2).
- [x] 64 · Tam (3).
- [x] 64 · Tứ (4).
- [x] 64 · Ngũ (5).
- [x] 64 · Thượng (6).
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

Executed at `cb4a84d` (PR head):

- `./init.sh` → `=== Verification passed ===` (format, lint/length, typecheck, build, package exports, test placement, 181 core and 97 knowledge tests; only the pre-existing shadcn Fast Refresh warnings remain).
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → `Knowledge: 381 records; 381 ready; 4 supplied books. Structural links and source pages valid.` The command needs `pnpm --filter @liuyao/knowledge build` first, otherwise it stops on `Stale or missing build output`.

Review evidence, all outside product commits:

- Round 1, four read-only reviewers, one per quẻ, exhaustive: 61 → 33 items, 62 → 32, 63 → 31, 64 → 32. Verdicts 61 FAIL 4 P0, 62 FAIL 1 P0 + 1 P1, 63 PASS 0, 64 FAIL 1 P0. Reports: `.agent-work/feat-083/reviews/r1-h61.md` … `r1-h64.md`.
- All seven findings corrected in `cb4a84d`; every correction was re-checked by the Leader against the page-delimited source slices (`.agent-work/feat-083/src/q6*-*.txt`).
- Writer provenance tables: `.agent-work/feat-083/reports/h61-report.md` … `h64-report.md` (one source-locator row per attributed entry).
- The six `notes[]` record genuine source errors. Four name an image-level check, so the Leader rendered NHL PDF 331, NTT PDF 911 and NTT PDF 930 with PyMuPDF (dpi 130, `.agent-work/feat-083/img/`) and read them; the quẻ-63 note was checked on the PBC 588 text and PBC 655 endnote [21]. All four held.

## Handoff

- State: active; content reviewed and corrected at `cb4a84d`, verification green. Independent round 2 was intentionally not run.
- Evidence: the commands and review artifacts above; `feature_index.json` marks feat-083 `active`.
- Blockers: none.
- Next: run the prepared round-2 verification, `.agent-work/feat-083-r2-review.js`, against the frozen revision `cb4a84d363975034900137fa9a9179007b290138`, or record an explicit waiver, before merging.

## Follow-up review and operator handoff — 2026-10-09

- Operator requested PR #107 to be reviewed, reconciled with latest `main`, and marked `feat-083` `done` on the PR branch before operator merge. This sign-off deliberately supersedes the earlier handoff's `active` state, but does **not** assert the original independent round-2 review ran.
- A **new targeted source-fidelity verification pass** checked the seven previously corrected findings and high-risk interpretation/source-note cells in quẻ 61–64 against the supplied NHL, Phan Bội Châu and Ngô Tất Tố PDFs. Source-text spot checks included NHL 321–323, 325–326, 328, 331–333; PBC 568, 571, 578–579, 588, 594, 600, 655; NTT 899, 903, 911–912, 914, 916, 921, 925, 930–931 and 935.
- Re-rendered and visually inspected the printed glyph/layout claims on **NHL PDF 331** (printed '5 hào' despite six-line quẻ), **NTT PDF 911** (hào Tam's Tiểu Tượng text misplaced within hào Nhị section), and **NTT PDF 930** (dịch âm 'đuôi' versus dịch nghĩa 'đầu'). Kept the existing editorial source-discrepancy notes; no new high-confidence defect was established in checked passages. PBC PDF 655 carries an uncredited contributor footnote; it stays attributed as unidentified, not silently assigned to PBC.
- Verified structural invariants by comparing branch against current `main`: four quẻ, 24 bottom-up hào, unchanged `position`, `polarity`, labels and entry counts. Attributed overview count 5 each (plus structural entry); line entry totals 26/24/24/24 = **98**; six source-discrepancy notes distributed 1/2/1/2; all 281 per-entry source references are well-formed and within the sizes of the supplied PDFs. The optional `condition` and `printedPages` fields remain supported in this corpus and were deliberately preserved.
- **Review limitation:** This was a follow-up verification by the current reviewer, **not** a second independent reviewer. It checked the original seven corrections, structurally validated all entries and sampled risk cells rather than exhaustively re-performing all 128 source line-by-line comparisons. The old original round-2 omission is disclosed, not falsely marked as an independent PASS.
- Merge-current-`main` integration protects newer feature states and append-only `progress.md` history; `feat-083` is marked `done` for operator merge. CI is required on the final synchronized head. Do not auto-merge.
