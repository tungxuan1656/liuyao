# feat-081 — Review and improve quẻ 53–56 and all twenty-four hào

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

## Decision log

### Four parallel writers, one file each

- **Question:** how to review four quẻ in one feature.
- **Decision:** four `worker` children in parallel, each owning exactly one `hexagram-NN.json`.
- **Alternatives:** one writer for all four files (serial, slow); the Leader writing them (no independent
  authorship).
- **Rationale:** disjoint files, so no write conflict; matches feat-070, feat-071 and feat-072.
- **Evidence:** the same dispatch shape produced the accepted feat-070–072 content.
- **Effect:** `hexagram-53.json` `7a994334`, `hexagram-54.json` `72d377d7`, `hexagram-55.json` `9d8e6cee`,
  `hexagram-56.json` `333d253b`, all with a per-entry provenance report (29/31/30/33 rows).

### Legacy Ngô Tất Tố glossary entries were deleted, not rewritten

- **Question:** the baseline carried an extra trailing `entries[]` per record — a multi-paragraph Ngô Tất Tố
  lump, plus a quoted Ngô Lâm Xuyên footnote on quẻ 53 — that only recorded that a glossary or heading
  exists. The writing unit forbids content whose only job is to note existence.
- **Decision:** keep the useful Ngô Tất Tố clauses inside the entry they belong to, delete the rest of the
  lump, and delete the quoted Ngô Lâm Xuyên footnote outright; `entries` becomes structure + four authors.
- **Alternatives:** rewrite the lumps into a fifth author layer (pads one author's gloss with another's
  reasoning, and Ngô Tất Tố is a translator/editor here, not the attributed author); keep them as-is.
- **Rationale:** `docs/product-specs/knowledge-content.md` writing-unit rule and the "do not create content
  merely to record that a heading exists" rule.
- **Evidence:** round-2 JOB 4 checked all five deleted lumps against the sources and confirmed no distinct
  attributable interpretation was lost; the deleted Ngô Lâm Xuyên line is NTT PDF 813 footnote [3] (`Đợi
lúc đáng tiến mới tiến, không phải chỉ ăn uống cho no để tự nuôi mình mà thôi`), whose substance the
  hào-2 `no không` gloss already carries through Chu Hy in `lines[1]`.
- **Effect:** `entries` 7/6/6/6 → 5 in all four records; 1208 lines of duplicated legacy material removed.

### Round-1 quẻ 54 finding rejected as a false positive

- **Question:** round 1 reported P1 that `hexagram-54.json` `entries[0].references[3]` (`nhl [59, 61]`) is a
  wrong or redundant page reference for the structure sentence, because quẻ 54's own text is on PDF
  300–302.
- **Decision:** rejected; the reference stays.
- **Alternatives:** remove it (would break the corpus-wide convention citation); narrow it to the quẻ's own
  pages (would drop the bottom-up hào rule the sentence states).
- **Rationale:** NHL PDF 59 opens `THUẬT NGỮ VÀ QUI TẮC CẦN NHỚ` and states `Cách vạch và xét trùng quái: từ
dưới lên`; NHL 60–61 name the six hào and cửu/lục. The structure sentence asserts exactly that rule, so
  the citation is the source of the claim, not a stray page.
- **Evidence:** 44 records carry the same `[59, 61]` NHL reference, including the already-reviewed precedent
  `hexagram-20.json`; the reviewer's reasoning (`not in this quẻ's extract, therefore wrong`) ignored the
  general-convention chapter. Round-2 JOB 1 independently re-read NHL 59–61 and returned CONFIRM.
- **Effect:** no content change. The rejection is recorded rather than silently dropped.

### One reviewer per quẻ in round 1, on a substituted model

- **Question:** the default reviewer model `9router/cx/gpt-6.1-sol` returned `[429]: The usage limit has
been reached (reset after 29m 52s)` and `9router/ag/claude-sonnet-4-6` returned `Unavailable (reset after
145h 15m 30s)`. A single reviewer over all four records also reported only 7 of the claimed units read.
- **Decision:** split round 1 into one reviewer per quẻ and run rounds 1–2 on `9router/cx/gpt-6-luna`.
- **Alternatives:** wait out the quota reset (blocks the feature); keep one reviewer for four records.
- **Rationale:** coverage is an acceptance property; a reviewer that cannot finish must say so, and it did.
  Per-quẻ reviewers cover 29/31/30/33 units exactly.
- **Evidence:** `round1-review.md` (superseded, 7/128 units, `Verdict: FAIL — review coverage incomplete`)
  versus `round1-review-q53..q56.md`. It also caught a Leader briefing error: the unit total is 116
  attributed entries + 7 notes = 123, not 128.
- **Effect:** review budget unchanged (one exhaustive round plus one verification round); the first round-2
  dispatch died on a transient provider fault and was re-run as `2d4dc9b3`.

### Printed-glyph and printed-label claims are verified by the Leader from page images

- **Question:** seven `notes[]` entries assert what a printed page actually shows (a Hán reading against its
  Vietnamese `âm`, a mislabelled hào, `minh thuận` vs `minh thận`, `無咎` vs `無尤`). Reviewer children
  cannot see PDF images, so no review round can attest them.
- **Decision:** the Leader renders every page behind such a claim and reads the image, and keeps the record
  and crops outside published JSON.
- **Alternatives:** let the notes rest on extracted text (a text layer can mangle glyphs, and the claim is
  precisely about the printed form); drop the notes.
- **Rationale:** the batch policy says a text-only review cannot attest image-dependent checks, and each of
  these notes is a claim about the printed page rather than about its meaning.
- **Evidence:** 15 claims verified from 15 crops (`.agent-work/feat-081/image-verification.md`, images in
  `.agent-work/feat-081/images/`); the gate review caught three of them attested from extract text only
  (PBC 522, PBC 529, NTT 851), which were then rendered and read too. All 15 held; no note overstates its
  source.
- **Effect:** every surviving note in the four records is confirmed against its cited page, and the limit
  (the Leader, not an independent reviewer, checked the images) is recorded in the handoff.

## Handoff

- State: active — content reviewed and frozen at `f772018`; awaiting push, PR, exact-head CI and merge.
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
- Dependencies: See [feature index](../feature_index.json).
- Next: push `feat/081-hexagram-review-53-56`, open one PR, wait for exact-head CI, merge, then record the
  merge SHA and set feat-081 to `done`.
