# feat-077 — Review and improve quẻ 37–40 and all twenty-four hào

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

Executed at reviewed head `afe0a65f676e177d862a0b6f5c0d845863bdcd71` (content commit `75540faf1cedacad9854e8eba9fc641dbc5f60db`):

- `./init.sh` → `=== Verification passed ===`; 97 knowledge tests pass.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → `Knowledge: 381 records; 381
ready; 4 supplied books. Structural links and source pages valid.` Run the generating form
  (`--check-books`, no `--check`) after any source edit, because `--check` compares the generated
  `dist/` and `.generated/` outputs against the sources.
- Structure comparison against baseline `b9d306d` (artifact `.agent-work/feat-077/invariants.md`): **0 of
  4** files changed an invariant field; all 24 `(position, polarity, label)` tuples unchanged; no
  `section`, `printedPages` or `condition` keys remain; every reference is exactly `{sourceId,
pdfPages: [start, end]}`; each file has 5 overview entries and 4 entries on all six hào; all four
  records `status: "ready"`.
- Review rounds: 1 exhaustive (`70a9416d`, 28 of 28 attributed cells per quẻ) → 40 PASS, 37/38/39 FAIL
  with 4 P1 findings → corrections applied and re-verified against the cited pages (`.agent-work/
feat-077/fix3{7,8,9}.md`) → 2 verification of the corrections and their direct uses (`e0ccc0d3`)
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

## Decision log

### `notes` stays absent where there is no source error

- **Question:** quẻ 40 has no `notes` key at all after the review. Is that a defect?
- **Decision:** leave it absent.
- **Rationale:** `notes?` is optional in `packages/knowledge/src/content-schema.ts`, and 12 of the 64
  hexagram records omit it, including merged records such as `hexagram-06.json` and `hexagram-07.json`.
  Adding `"notes": []` would be an empty ledger, not knowledge.
- **Evidence:** schema line 71 (`readonly notes?: readonly ContentEntry[]`), and a scan of
  `packages/knowledge/data/hexagrams/`.

### Round 2 ran on a different model than round 1

- **Question:** the round-2 verifier children all failed on provider quota (`9router/cx/gpt-6.1-sol` HTTP
  429; `9router/ag/claude-sonnet-4-6` unavailable), so the round could not run on the round-1 model.
- **Decision:** keep the same `reviewer` agent and the same brief, and pass `9router/cx/gpt-6-luna` for
  the round-2 children.
- **Alternatives:** wait out the quota reset, or skip round 2 for these three quẻ.
- **Rationale:** the round's value is a second independent read of the corrections, and the brief pins the
  acceptance bar; the model is an implementation detail of the lane, not of the verdict.
- **Evidence:** failed workflows `22506956` and `ede0f357` (all three children each), passing workflow
  `e0ccc0d3`.

## Handoff

- State: done, verified locally at `afe0a65`; no PR opened from this Orca worktree (branch
  `tungxuan1656/feat-077`, no upstream).
- Evidence: content commit `75540fa`, corrections `afe0a65`; `./init.sh` passed (97 knowledge tests);
  `validate:corpus --check-books --check` passed (381 records / 381 ready / 4 supplied books);
  invariants unchanged for all 4 files; round 1 (4 reviewers) and round 2 (3 verifiers) recorded above;
  3 image-dependent notes verified by rendering the source pages.
- Blockers: none.
- Limits: reviewer children cannot see PDF page images and reported that plainly, so the 3 image claims
  were verified by the Leader only; round 2 ran on `9router/cx/gpt-6-luna` rather than the round-1
  `9router/cx/gpt-6.1-sol` because of provider quota.
- Dependencies: [feature index](../feature_index.json).
- Next: push `tungxuan1656/feat-077` and open the feature PR; then activate the next unstarted batch
  feature.
