# feat-079 — Review and improve quẻ 45–48 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 45 Trạch Địa Tụy; 46 Địa Phong Thăng; 47 Trạch Thủy Khốn; 48 Thủy Phong Tỉnh.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 45 · Sơ (1).
- [x] 45 · Nhị (2).
- [x] 45 · Tam (3).
- [x] 45 · Tứ (4).
- [x] 45 · Ngũ (5).
- [x] 45 · Thượng (6).
- [x] 46 · Sơ (1).
- [x] 46 · Nhị (2).
- [x] 46 · Tam (3).
- [x] 46 · Tứ (4).
- [x] 46 · Ngũ (5).
- [x] 46 · Thượng (6).
- [x] 47 · Sơ (1).
- [x] 47 · Nhị (2).
- [x] 47 · Tam (3).
- [x] 47 · Tứ (4).
- [x] 47 · Ngũ (5).
- [x] 47 · Thượng (6).
- [x] 48 · Sơ (1).
- [x] 48 · Nhị (2).
- [x] 48 · Tam (3).
- [x] 48 · Tứ (4).
- [x] 48 · Ngũ (5).
- [x] 48 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

Each `[x]` rests on the round-2 verdict for that quẻ: the two records whose correction was verified in round 2 (45, 46) and the two that were unchanged after a round-1 PASS (47, 48).

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

## Decision log

Recorded while executing the [batch policy](../docs/product-specs/knowledge-quality.md#hexagram-review-batches).

- Confirmed page ranges against the extracted body headings: 45 NHL 274–276 / NTT 698–713 / PBC 432–439;
  46 NHL 277–279 / NTT 714–723 / PBC 440–446; 47 NHL 280–282 / NTT 724–738 / PBC 447–457;
  48 NHL 283–285 / NTT 739–752 / PBC 458–466.
- Normalized each record to one unattributed structural overview entry plus one overview entry per
  commentator (Nguyễn Hiến Lê, Phan Bội Châu, Trình Di, Chu Hy) and exactly four entries per hào in the
  same order. Consolidated duplicate author entries and the extra Ngô Tất Tố and Tiên Nho layers
  (Chu Hán Thương, Hồ Song Hồ, Trình Sa Tùy, Họ Lôi, Phùng Hội Vân, Lý Xuân Niên, Khâu Kiến An,
  Từ Tiến Trai, Lý Long Sơn, Trương Trung Khê) and dropped the boilerplate `condition` field.
- Dropped the `section` and `printedPages` keys so every reference is exactly `{sourceId, pdfPages}`.
- Applied the operator bar: a defect is a wrong or too-narrow reference or invented content; degree and
  emphasis wording is a style difference. One exhaustive round-1 review and one round-2 verification.
- No interpretation, calendar, or UI behavior changes.
- Quẻ 47's first writer run failed with no file written; it was re-dispatched before review.

## Verify

- `./init.sh` → `=== Verification passed ===`. Format, lint, typecheck, build and package exports passed; tests 181 (`liuyao-core`) + 97 (`knowledge`). Corpus line: `Knowledge: 381 records; 381 ready; 4 supplied books. Structural links and source pages valid.`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → exit 0, same corpus line. (The `--check` comparison needs the `packages/knowledge/.generated` and `dist` output that `pnpm build` writes; both are Git-ignored, so `--check` only works after a build in the same checkout.)
- Round 1 (read-only, one reviewer per quẻ, all 112 attributed entries and every note): r45 PASS 1 P2, r46 PASS 1 P2, r47 PASS 0 findings, r48 PASS 0 findings.
- Round 2 (read-only verification): v45 PASS, v46 PASS, both with no new findings. Quẻ 47 and 48 were unchanged after round 1, so no round-2 run applied to them.
- Image-dependent `notes[]` claims rendered with PyMuPDF 1.28.0 and read as images; the mapping is in `.agent-work/feat-079/image-checks.md`.
- Baseline `b9d306d` → reviewed tree: no identity key changed, all twenty-four `(position, polarity, label)` tuples identical (`.agent-work/feat-079/invariants.md`).

## Handoff

- State: done. All four records reviewed, corrected, verified and committed on `tungxuan1656/feat-079`; the PR is opened and left unmerged.
- Evidence: `.agent-work/feat-079/` — `h45/h46/h48-report.md` (writer provenance tables), `r45/r46/r47/r48-review.md` (round 1), `fix45.md`/`fix46.md` (Leader's change record), `v45/v46-verify.md` (round 2), `image-checks.md`, `invariants.md`.
- Blockers: none. Out-of-scope observations left untouched: NTT PDF 740 prints `vô đắc vô táng` against 無喪無得, and NTT PDF 746 heads a Tiểu Tượng as `九二`; no entry in quẻ 45–48 depends on either.
- Dependencies: See [feature index](../feature_index.json).
- Next: review and merge the open PR for `tungxuan1656/feat-079`, then activate feat-080 from `main`.
