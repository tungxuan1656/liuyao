# feat-073 — Review and improve quẻ 21–24 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 21 Hỏa Lôi Phệ Hạp; 22 Sơn Hỏa Bí; 23 Sơn Địa Bác; 24 Địa Lôi Phục.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 21 · Sơ (1).
- [x] 21 · Nhị (2).
- [x] 21 · Tam (3).
- [x] 21 · Tứ (4).
- [x] 21 · Ngũ (5).
- [x] 21 · Thượng (6).
- [x] 22 · Sơ (1).
- [x] 22 · Nhị (2).
- [x] 22 · Tam (3).
- [x] 22 · Tứ (4).
- [x] 22 · Ngũ (5).
- [x] 22 · Thượng (6).
- [x] 23 · Sơ (1).
- [x] 23 · Nhị (2).
- [x] 23 · Tam (3).
- [x] 23 · Tứ (4).
- [x] 23 · Ngũ (5).
- [x] 23 · Thượng (6).
- [x] 24 · Sơ (1).
- [x] 24 · Nhị (2).
- [x] 24 · Tam (3).
- [x] 24 · Tứ (4).
- [x] 24 · Ngũ (5).
- [x] 24 · Thượng (6).
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

Executed on the reviewed content:

- `./init.sh` → `=== Verification passed ===` — 181 core tests, 97 knowledge tests.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → `Knowledge: 381 records; 381
ready; 4 supplied books. Structural links and source pages valid.`
- Structure comparison against baseline `b9d306d`: all four records keep id, type, title, aliases,
  topicIds, relatedIds, kingWenNumber, trigram ids and `status: "ready"`; all 24 `(position, polarity,
label)` tuples unchanged; every reference keeps the `{sourceId, pdfPages: [start, end]}` shape (plus
  optional `section`/`printedPages`) with ascending pages. The only intended count change is quẻ 21's
  overview 4 → 5 (its missing Chu Hy layer); quẻ 21 lines 20 / notes 2, quẻ 22 5/20/1, quẻ 23 4/18/2,
  quẻ 24 5/19/4 all unchanged.
- Review rounds: 1 exhaustive (workflow `ce9cd57b`: `ca41f091`, `c2dbbff3`, `2af55256`, `36ab08e4`) →
  **FAIL 13 findings (11 P1 + 2 P2)**; 2 verification of those corrections (workflow `aba44837`:
  `18162c40`, `b3246efd`, `c31daf4a`, `359c0b7e`) → **PASS 0 residual findings** on all four quẻ.
- PDF images: 10 notes assert something about a printed page, which no reviewer child can check. The
  Leader rendered those pages directly from the supplied PDFs with PyMuPDF (200 dpi crops) and read
  them; all ten held — NHL 94 and NTT 420 print `Cấn`; NTT 425 reproduces `初九:不遠復,無祗悔,元吉` with
  the `元吉` repetition; NTT 426 prints `lớn`; NTT 431 chú thích [1] prints `Chữ 後 (Phục) nghĩa là trở
lại`; NHL 206 Thoán truyện prints `ngoại quái là Chấn có nghĩa là ngưng`; NTT 418 chú thích [1] prints
  `Chữ 利 (Bác)`; PBC 235 prints `công việc Cửu Ngũ làm được đúng`; NTT 383 prints `trên động dưới sáng,
dưới sấm trên chớp`; NHL 203 prints `quẻ Búi`.

## Decision log

### Four parallel writers, one file each

- **Question:** how to review four quẻ in one feature.
- **Decision:** four `worker` children in parallel, each owning exactly one `hexagram-NN.json`, each
  producing a per-entry provenance report and no length target.
- **Alternatives:** one writer for all four files (serial, slow); the Leader authoring the content (no
  independent authorship).
- **Rationale:** disjoint files, so no write conflict; matches feat-070 through feat-072.
- **Evidence:** `hexagram-21.json` `463c126a`, `hexagram-22.json` `15aab480`, `hexagram-23.json`
  `503a566f` (resumed as `19c307dc`), `hexagram-24.json` `e63a26d6` (resumed as `6bdcddb5`).
- **Effect:** 104 attributed entries reviewed, 27 + 26 + 24 + 28 provenance rows.

### Resume a writer whose output stream was truncated instead of re-dispatching it

- **Question:** the quẻ 23 and quẻ 24 writers reported `ok: true` yet produced zero edits and a report
  cut off mid-sentence.
- **Decision:** resume both runs with guidance to write the report with `write`, apply edits with
  `edit`, and answer in four lines.
- **Alternatives:** dispatch fresh writers (discards a completed research pass); have the Leader write
  the content (no independent authorship).
- **Rationale:** the only defect was output shape; the research was done. A resumed entry must not carry
  `agent` (`runs.all item 0 resume and agent are mutually exclusive`).
- **Evidence:** `503a566f`/`e63a26d6` wrote 2.4/2.6 KB truncated reasoning; `19c307dc`/`6bdcddb5` wrote a
  24-row and a 28-row report and their edits.
- **Effect:** none on scope. An `ok: true` writer is not evidence of a deliverable — the diff is.

### The round-1 FAIL governs, and the Leader applies the smallest fix

- **Question:** the writers' own passes reported 0–1 P1, while round 1 found 13 findings across the four
  quẻ, including nine cases where a source's certainty ("ắt", "bị", "không bao giờ") had become a
  possibility in the record.
- **Decision:** every round-1 finding was corrected by the Leader as a text-level edit, and round 2
  re-verified each correction against the source wording on the cited page.
- **Alternatives:** accept the writers' self-reports; rebuild the JSON files from the parsed objects.
- **Rationale:** a writer's pass and a reviewer's pass only cover the cells they actually read; the JSON
  files are prettier-formatted with compact short arrays, so a re-serialize would rewrite every file
  and hide the real change.
- **Evidence:** the four diffs plus the round-2 CONFIRMED rows; `git diff --stat` shows 4 files, 59
  insertions and 41 deletions.
- **Effect:** quẻ 21 lines[3]/lines[5], quẻ 22 lines[3]/lines[4]/lines[5], quẻ 23 overview.1 and
  lines[5], quẻ 24 lines[0]–lines[3] now match their cited sources, with two missing references added
  (NHL 210 and PBC 256 for quẻ 24 lines[0]) and two page ranges widened (NHL 206–208, NHL 210–211).

### `condition` carries only a meaning-changing condition

- **Question:** six entries (quẻ 23 lines[5] ×3, quẻ 24 lines[5] ×3) repeated one `condition` string
  that disclaimed a literary image rather than changing the entry's meaning.
- **Decision:** remove all six; keep the sentence's own framing in the entry text.
- **Alternatives:** keep the repeats (contract noise) or rewrite them shorter.
- **Rationale:** the knowledge model uses `condition` for a condition that changes the reading; a
  disclaimer about imagery does not.
- **Evidence:** the model contract in `docs/design-docs/knowledge-model.md`; round 2 re-read both lines
  and found no meaning-changing condition lost.
- **Effect:** zero `condition` keys remain in the four records.

### The Leader verifies image-dependent notes

- **Question:** 10 `notes` entries claim a fact about a printed page (`Ảnh PDF N xác nhận …`), and the
  reviewer child has no shell and cannot render a PDF page.
- **Decision:** the Leader renders the page with PyMuPDF and reads the crop, then tells the reviewer the
  finding is resolved instead of leaving the reviewer to raise it.
- **Alternatives:** leave the claims unverified (they would block the review).
- **Rationale:** the acceptance criterion is that the notes are checkable on the pages they name.
- **Evidence:** `$W/images/*.png`, all ten claims confirmed.
- **Effect:** round 2 reports 0 unresolved image-dependent claims.

### Round 2 ran on a fallback model after the reviewer model's quota was exhausted

- **Question:** the first round-2 dispatch failed on all four children with
  `9router API error (503) … [codex/gpt-6.1-sol] [429]`, and the retry on
  `9router/ag/claude-sonnet-4-6` failed with `Unavailable (reset after 145h 6m)`.
- **Decision:** run round 2 on `9router/ag/gemini-3.8-flash`, then give the feature's post-freeze
  independent review to a fresh reviewer on the strongest model available at that time.
- **Alternatives:** wait ~22 minutes for the reviewer quota to reset.
- **Rationale:** round 2 is a source check against quoted wording; the model family does not change what
  the pages say.
- **Evidence:** workflows `ce09175f`, `c4af91bb` (all children failed, no output) and `aba44837` (all
  four completed, PASS).
- **Effect:** the round-2 reports are still from a fresh-context reviewer that did not write the
  content, but they are not from the default `reviewer` model.

## Handoff

- State: active — implementation verified locally; independent review and PR pending.
- Evidence: see Verify above; 4 records changed, 13 findings corrected, round 2 PASS.
- Blockers: none.
- Limits: the reviewer children cannot see PDF page images and reported that plainly; the 10
  image-dependent notes were checked by the Leader instead. `pack/hexagram-24.md` omits NHL 94 and PBC
  244–247 even though the record cites them, so quẻ 24 reviewers read `$W/pdftext/*.txt` directly.
- Dependencies: See [feature index](../feature_index.json).
- Next: commit, take a fresh independent review of the frozen SHA, then push and open the PR.
