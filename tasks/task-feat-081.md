# feat-081 - Review and improve quẻ 53–56 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-047](task-feat-047.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 53 Phong Sơn Tiệm; 54 Lôi Trạch Quy Muội; 55 Lôi Hỏa Phong; 56 Hỏa Sơn Lữ.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 53 · Sơ (1).
- [x] 53 · Nhị (2).
- [x] 53 · Tam (3).
- [x] 53 · Tứ (4).
- [x] 53 · Ngũ (5).
- [x] 53 · Thượng (6).
- [x] 54 · Sơ (1).
- [x] 54 · Nhị (2).
- [x] 54 · Tam (3).
- [x] 54 · Tứ (4).
- [x] 54 · Ngũ (5).
- [x] 54 · Thượng (6).
- [x] 55 · Sơ (1).
- [x] 55 · Nhị (2).
- [x] 55 · Tam (3).
- [x] 55 · Tứ (4).
- [x] 55 · Ngũ (5).
- [x] 55 · Thượng (6).
- [x] 56 · Sơ (1).
- [x] 56 · Nhị (2).
- [x] 56 · Tam (3).
- [x] 56 · Tứ (4).
- [x] 56 · Ngũ (5).
- [x] 56 · Thượng (6).
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

Dispatch briefs live outside product commits at `.agent-work/feat-081/brief.md` (writer) and
`.agent-work/feat-081/review-brief.md` (reviewer).

## Verify

Executed and passing on the reviewed content `f772018`:

- `./init.sh` → `=== Verification passed ===` — 181 core tests, 97 knowledge tests.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → `Knowledge: 381 records; 381
ready; 4 supplied books. Structural links and source pages valid.`
- Structure comparison against baseline `b9d306d` (artifact `.agent-work/feat-081/invariants-baseline.json`,
  checked by `.feat-081-work/invariants.py`): **0 of 4** files changed an invariant field; all 24
  `(position, polarity, label)` tuples unchanged; no `section`, `printedPages` or `condition` keys remain;
  every reference is exactly `{sourceId, pdfPages: [start, end]}`; all four records `status: "ready"`.
  Intended count changes: `entries` 7/6/6/6 → 5 (structure sentence plus four author layers); `notes`
  unchanged at 1/1/2/3.
- Review rounds: 1 exhaustive, one reviewer per quẻ (`728bbb81`, `94d76417`, `e08ea3cc`, `cac458e4`; quẻ 56
  resumed from `da13d6d2` after a stream disconnect) — PASS 29 units / FAIL 31 with 1 finding / PASS 30 /
  PASS 33 → 2 verification (`2d4dc9b3`) PASS, 0 findings, over the finding, all seven notes, the overview
  page ranges and the five deleted entries.
- PDF images: 15 printed-glyph/printed-label note claims, which no reviewer child can check. The Leader
  rendered those pages with PyMuPDF and read them; all 15 held. Record:
  `.agent-work/feat-081/image-verification.md`, crops in `.agent-work/feat-081/images/`.
- Gate review `round3-gate.md`: diff hygiene (exactly 6 files), structural invariants, the 24-hào
  acceptance map and provenance row parity (29/31/30/33 rows against 29/31/30/33 units) all PASS; FAIL 2
  findings — three note claims attested from extracted text only, and this handoff still stale — which were
  corrected (the three pages rendered and read) and are re-verified by `round4-gate.md`.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done — feat-081 content merged through PR #102 (merge `1b1aec7834177e0ced36ca0010c903e5207df451`); follow-up source-gloss and copy corrections are proposed separately.
- Evidence: rounds 1–2 as recorded in `## Verify`; `./init.sh` passed (181 core + 97 knowledge tests);
  `validate:corpus --check-books --check` passed (381 records / 381 ready / 4 supplied books); structural
  invariants unchanged for all 4 files; all 15 image-dependent note claims verified from page images;
  provenance reports (29/31/30/33 rows) kept outside published JSON in the batch checkpoint
  `workspaces/liuyao/.feat-081-work/checkpoint/`. PDF pages are rendered from `docs/books/`, symlinked to
  the canonical copies in the main checkout.
- Blockers: none.
- Limits: reviewer children cannot see PDF page images and said so; the printed-glyph checks rest on the
  Leader's rendering. Round 2 verified the finding, the seven notes, the overview page ranges and the
  deletions — it was not a second exhaustive pass. Quẻ 54's Trình Di commentary is truncated mid-sentence
  in NTT 814, and the record states that gap instead of filling it.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Review and merge the follow-up correction PR; its status and CI are tracked in that PR.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — feat-081 reviewed and improved quẻ 53–56

- Historical status: `done` on `main`. Original feature content landed via [PR #102](https://github.com/tungxuan1656/liuyao/pull/102) (squash commit `1b1aec7`); the subsequent source-gloss corrections and completion record were merged via [PR #109](https://github.com/tungxuan1656/liuyao/pull/109). PR #106 adds the missing historic verification log only; it does not edit the published quẻ data or feature status.
- Result: reviewed and improved all four assigned quẻ (53 Phong Sơn Tiệm, 54 Lôi Trạch Quy Muội, 55 Lôi Hỏa
  Phong, 56 Hỏa Sơn Lữ) and all twenty-four hào against the four supplied books.
- Content: each record now carries one structure sentence plus four attributed overview layers (Nguyễn Hiến
  Lê, Phan Bội Châu, Trình Di, Chu Hy) and four or more attributed explanations per hào. The legacy
  multi-paragraph Ngô Tất Tố glossary lumps, which only recorded that a heading or glossary exists, and the
  quoted Ngô Lâm Xuyên footnote are deleted, so `entries` goes 7/6/6/6 → 5; every reference is now exactly
  `{sourceId, pdfPages: [start, end]}` with the old `section`, `printedPages` and `condition` keys gone (net
  −1208 lines). Seven `notes[]` entries (1/1/2/3) record genuine source discrepancies: the Hán reading `lục`
  against a Vietnamese `âm` that reads `lăng` (53), Ngô Tất Tố's Thoán translation dropping the negation of
  `Thiên địa bất giao` (54), Nguyễn Hiến Lê's unsupported hào-tam/thượng correlation (55), Phan Bội Châu's
  `Cửu Nhị` label inside the Lục Nhị commentary (55), Ngô Tất Tố's “Hào Sáu Trên ở ngôi Năm” and Phan Bội
  Châu's `Cửu Nhị` on an âm hào (56), the Lục nhị–Lục ngũ “chính ứng” that Trình Di does not use (56), and
  `minh thuận`/`無咎` against `minh thận`/`無尤` (56).
- Review: two content rounds plus a two-pass delivery gate, under the batch acceptance bar the operator set
  (reference correctness and no invented content; a Vietnamese degree or superlative where the source gives
  none is a style difference, not a defect). Round 1 was exhaustive but split per quẻ — 29/31/30/33 units,
  116 attributed entries plus 7 notes — and returned PASS, FAIL with one finding, PASS, PASS. The single
  finding, that `hexagram-54.json` `entries[0].references[3]` (`nhl [59, 61]`) was a wrong page reference,
  was rejected as a false positive: NHL 59 is the `THUẬT NGỮ VÀ QUI TẮC CẦN NHỚ` chapter stating `Cách vạch
và xét trùng quái: từ dưới lên`, and 44 records including the accepted `hexagram-20.json` carry the same
  convention citation. Round 2 verified and independently CONFIRMED that rejection and returned PASS with no
  findings over the finding, all seven notes, the overview page ranges and the five deleted entries. Gate
  round 3 returned FAIL with two findings (three note claims attested from extracted text only, and the
  handoff not yet updated); both were corrected and gate round 4 returned PASS.
- Lesson: a coverage claim must count units that exist — the first single-reviewer brief asserted 128 units
  where 116 + 7 = 123, and that reviewer honestly reported reading 7 of them rather than claiming PASS. The
  same applies to evidence: a provenance or image record must not describe text extracts as page-image
  checks, which is exactly what gate round 3 caught. And a reviewer's “not in this quẻ's extract, therefore
  wrong” assumption about a repository-wide convention citation is a false-positive shape to expect again.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests;
  format, lint, typecheck, build). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4
  supplied books. The invariants artifact recorded **0 of 4** files with changed invariant fields, all 24
  `(position, polarity, label)` tuples unchanged, no legacy reference keys, and `notes` unchanged at
  1/1/2/3. Fifteen printed-glyph or printed-label note claims, which no reviewer child can check, were
  rendered with PyMuPDF and read by the Leader, and all fifteen held. Exact-head CI on `86d18a7` was green
  (`verify`, Cloudflare Pages, GitGuardian) with `mergeStateStatus: CLEAN`. Writer provenance reports
  (29/31/30/33 rows) and the review records are kept outside published JSON in
  `workspaces/liuyao/.feat-081-work/checkpoint/`.
- Limits: reviewer children inspect extracted page text only, never page images, and said so; the
  printed-page claims rest on the Leader's rendering, not on independent review. Round 2 verified the
  finding, the notes, the overview ranges and the deletions — it was not a second exhaustive pass. Quẻ 54's
  Trình Di commentary is truncated mid-sentence in Ngô Tất Tố PDF 814; the record states the gap instead of
  filling it.
- Blockers: none for feat-081.
- Next: leave `feat-081` as `done`; review/merge this documentation-only PR if the historical verification log is useful. `feat-080`, `feat-081`, and `feat-082` are `done` on `main`; `feat-083` remains `todo`. The unrelated `feat-074` index status remains `active` pending its separate cleanup.
- Follow-up verification (2026-10-09): current `main` retains four quẻ 53–56 with 24 ordered hào, overview count 5/5/5/5 and seven existing source-discrepancy notes (1/1/2/3), including the improvements already merged through PR #109. This block records the historical PR #102 review and CI outcomes, not a claim that the old `86d18a7` verification was rerun on current `main`.

## Migration provenance

Migrated from [feat-081](../features/feat-081.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
