# feat-072 — Review and improve quẻ 17–20 and all twenty-four hào

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 17 Trạch Lôi Tùy; 18 Sơn Phong Cổ; 19 Địa Trạch Lâm; 20 Phong Địa Quan.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 17 · Sơ (1).
- [x] 17 · Nhị (2).
- [x] 17 · Tam (3).
- [x] 17 · Tứ (4).
- [x] 17 · Ngũ (5).
- [x] 17 · Thượng (6).
- [x] 18 · Sơ (1).
- [x] 18 · Nhị (2).
- [x] 18 · Tam (3).
- [x] 18 · Tứ (4).
- [x] 18 · Ngũ (5).
- [x] 18 · Thượng (6).
- [x] 19 · Sơ (1).
- [x] 19 · Nhị (2).
- [x] 19 · Tam (3).
- [x] 19 · Tứ (4).
- [x] 19 · Ngũ (5).
- [x] 19 · Thượng (6).
- [x] 20 · Sơ (1).
- [x] 20 · Nhị (2).
- [x] 20 · Tam (3).
- [x] 20 · Tứ (4).
- [x] 20 · Ngũ (5).
- [x] 20 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and improve one quẻ at a time.
2. Repair material content findings and check affected source passages.
3. Verify all twenty-four positions before closing the feature.

## Verify

Executed and passing at merge head `4092aae` (PR #100, squash of `07b800dd6d1ae80fb059648633f9e08410f03433`):

- `./init.sh` → `=== Verification passed ===` — 181 core tests, 97 knowledge tests.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → `Knowledge: 381 records; 381
ready; 4 supplied books. Structural links and source pages valid.`
- Structure comparison against baseline `792fcaa1ac38a049a8227f74f18e7c7d21403ede` (artifact
  `.agent-work/feat-072/invariants.md`): **0 of 4** files changed an invariant field; all 24
  `(position, polarity, label)` tuples unchanged; no `section`, `printedPages` or `condition` keys remain;
  every reference is exactly `{sourceId, pdfPages: [start, end]}`; all four records `status: "ready"`.
  The only intended count change is quẻ 20's overview 4 → 5 (its missing Chu Hy layer).
- Review rounds: 1 exhaustive (`fdb18901`) PASS 0 findings → 2 verification (`c51fd69d`) **FAIL 3 P1** →
  3 verification of the corrections (`e388f248`) PASS 0 findings.
- PDF images: 5 of the 13 notes assert something about a printed page image, which no reviewer can check.
  The Leader rendered those pages with PyMuPDF and read them; all five held (NTT 333's `☵` before "Đoái",
  PBC 210's `2. Cửu Nhị` above a `初九` Hán line, NTT 351's `Cán mẫu chi cổ`, NTT 352 reproducing Tùy's
  `初九: 官有渝…`, PBC 219 printing `咎不長也` above a negation-less Vietnamese sentence). The other eight
  notes make prose/numeral claims the extracted text already attests.
- Exact-head CI on `07b800d`: `verify` pass, Cloudflare Pages pass, GitGuardian pass,
  `mergeStateStatus: CLEAN`.
- Distinguishing the two commits: `3c38ac7` is the reviewed content, `07b800d` the three round-2
  corrections. Both are squashed into `4092aae`.

## Decision log

### Four parallel writers, one file each

- **Question:** how to review four quẻ in one feature.
- **Decision:** four `worker` children in parallel, each owning exactly one `hexagram-NN.json`.
- **Alternatives:** one writer for all four files (serial, slow); the Leader writing them (no independent
  authorship).
- **Rationale:** disjoint files, so no write conflict; matches feat-070 and feat-071.
- **Evidence:** the same dispatch shape produced the accepted feat-070 and feat-071 content.
- **Effect:** `hexagram-17.json` `09b747c5` (resumed as `39adf6fa`), `hexagram-18.json` `ac9d2eb7`,
  `hexagram-19.json` `a0d08701`, `hexagram-20.json` `35f6fbbe`.

### Reported speech is attributed to the reporting book's page, not to NTT

- **Question:** quẻ 19 Lâm Sơ cửu — NTT PDF 362–363 carries Trình Di plus Lời bàn của Tiên Nho but has
  no "Bản nghĩa của Chu Hy" (Chu Hy reappears on NTT 364 under Cửu nhị), so the hào cannot reach four
  attributed entries from NTT alone. How should the fourth entry be handled?
- **Decision:** use Nguyễn Hiến Lê's report of Chu Hy — `{"author": "Chu Hy, được Nguyễn Hiến Lê dẫn
lại"}` with `references: [{"sourceId": "source-book-nhl", "pdfPages": [195, 195]}]`, its text limited
  to what NHL 195 states (Chu Hi, following Trình Di, takes `hàm` as cảm; hào 1 dương ứng hợp hào 4 âm,
  so it comes because it is moved by hào 4).
- **Alternatives:** cite NTT 362–363 for Chu Hy (unsupported — the page has no Chu Hy); leave the hào with
  three entries; add a `notes[]` entry for the gap.
- **Rationale:** the corpus already marks reported speech this way, always citing the page where the
  sentence actually appears — `hexagram-41.json` lines[4] and `hexagram-42.json` lines[0] use
  `{"author": "Chu Hy, được dẫn trong lời Tiên Nho"}`; `hexagram-42.json` lines[2] uses
  `{"author": "Y Xuyên (Trình Di), được Chu Hy dẫn lại"}`; `hexagram-44.json` overview uses
  `{"author": "Phan Bội Châu", "via": "dẫn lời Thầy Thiệu"}`. A missing commentary section is a source
  gap, not a source error, so it does not belong in `notes[]`; it is recorded in the writer's report and
  in the writer's final message instead.
- **Evidence:** the cited precedent entries above; NTT 362–364 read directly.
- **Effect:** the hào reaches four entries with every clause traceable to NHL 195. If the source had
  carried no report of Chu Hy at all, the correct outcome would have been three entries, not an invented
  gloss.

### Resume the failed writer rather than replace it

- **Question:** the quẻ 17 writer `09b747c5` finished a full research pass and produced no file — it
  streamed its provenance report into the final message, which was truncated.
- **Decision:** resume the same run (`subagent({action:'resume'})`), revived as `39adf6fa`, with a message
  that states the file is untouched, drops the report requirement for that pass, and orders the `edit`
  call first. It delivered.
- **Alternatives:** dispatch a fresh writer (loses the completed research and the recovery contract's
  preference); apply the edits as Leader (no independent authorship).
- **Rationale:** the run was eligible for resume and the only defect was output shape, not research.
- **Evidence:** `09b747c5` produced no file; `39adf6fa` produced `[4,4,4,4,4,4]` and a clean validator run.
- **Effect:** none on content. This was a lane recovery, not a scope or requirement change.

### `pshow.sh` resolves its own directory

- **Question:** the quẻ 18 writer ran `./pshow.sh` from the repo root, while the script assumed cwd
  `.agent-work`; the resulting `awk: can't open file pdftext/NHL.txt` / `exit 2` ended the run before
  anything was written.
- **Decision:** the script now derives its own directory (`dir="$(cd "$(dirname "${BASH_SOURCE[0]}")"
&& pwd)"`), and `.agent-work/feat-072/brief.md` warns that a non-zero bash exit ends the run.
- **Alternatives:** require every child to `cd .agent-work` first (fragile, depends on the child).
- **Rationale:** a tool that only works from one working directory is the failure mode, not the call site.
- **Evidence:** reproduced the failure and the fix from both the repo root and `.agent-work`.
- **Effect:** tooling only; no content impact.

### Correct the three defects the verification round found in the exhaustive round's PASS

- **Question:** round 1 (exhaustive, all 112 attributed entries) returned PASS with zero findings; round 2
  (independent verification of 32 risk-selected cells) found 3 P1s. Which round governs?
- **Decision:** round 2's findings govern, and all three were corrected.
- **Alternatives:** treat round 1's PASS as final (round 2 audited only 32 cells, so its PASS would not
  have outranked round 1 either); drop the two findings that were pre-existing in the baseline.
- **Rationale:** a PASS from either round is only a claim about the cells that round actually read, so the
  union of the two rounds is the weaker constraint. The feature's acceptance criterion is that the four
  quẻ are correct now, not that no regression was introduced.
- **Evidence:** each finding was re-verified against the cited page before the edit.
  - F1 `hexagram-17.json` `lines[0].entries[0]` — NHL 189 gives the second reading as "cái thể của mình
    thay đổi" (Phan Bội Châu: hào 1 dương should master the two yin above but must instead follow them);
    the entry said "người mình theo", a different claim. Text corrected.
  - F2 `hexagram-19.json` `entries[0].references` — the entry keeps the sentence "Hào được đếm từ dưới
    lên" but its NHL reference `[194, 194]` does not carry the bottom-up rule; `hexagram-17/18/20.json`
    all cite `[59, 61]`, which does (NHL 59 "Cách vạch và xét trùng quái: từ dưới lên", NHL 61 "Hào thứ
    nhì từ dưới lên"). The declaration was dropped from quẻ 19 by this feature's own diff. Restored.
  - F3 `hexagram-19.json` `lines[2].entries[0]` — NHL 195 names hào two only ("để dụ dỗ hào 2", "dùng
    lời ngọt ngào mà dụ dỗ hào 2"); the broader "hai hào dương" target is Phan Bội Châu's on PBC 218 and
    was misattributed here. Narrowed to "hào hai".
- **Effect:** the quẻ 19 introduction again carries the citation its retained sentence needs, and two
  unsupported clauses are gone. Both pre-existing defects (F1, F3) were in prose that dates from the
  baseline, so this also repairs inherited error, not only this feature's own.

## Handoff

- State: done.
- Evidence: merge head `4092aae` (PR #100, one PR for this feature); reviewed head
  `07b800dd6d1ae80fb059648633f9e08410f03433`; `./init.sh` passed (181 core + 97 knowledge tests);
  `validate:corpus --check-books --check` passed (381 records / 381 ready / 4 supplied books); structure
  invariants unchanged for all 4 files; review rounds 1–3 recorded above; 5 note image claims verified by
  rendering the source pages.
- Blockers: none.
- Limits: the reviewer children cannot see PDF page images and reported that plainly; 5 of 13 notes were
  image-verified by the Leader and the remaining 8 rest on extracted text. Round 2 confirmed its finding
  that one reference declaration (`hexagram-19.json` `entries[0].references`) was dropped by this
  feature's own diff while the sentence needing it was retained — worth watching in later features.
- Dependencies: [feature index](../feature_index.json).
- Next: Activate feat-073 (quẻ 21–24).
