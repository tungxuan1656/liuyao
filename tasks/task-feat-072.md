# feat-072 - Review and improve quẻ 17–20 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-041](task-feat-041.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
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
- Dependencies: [frozen index](../feature_index.json).
- Next: Activate feat-073 (quẻ 21–24).

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — feat-072 reviewed and improved quẻ 17–20

- Historical status: done; merged to `main` in `4092aae` (PR #100), squash-merged at the exact reviewed head `07b800dd6d1ae80fb059648633f9e08410f03433`.
- Result: reviewed and improved all four assigned quẻ (17 Trạch Lôi Tùy, 18 Sơn Phong Cổ, 19 Địa Trạch Lâm, 20 Phong Địa Quan) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy. Quán had only four overview layers and gained the missing Chu Hy layer (`hexagram-20.json`, overview 4 → 5); that is the only intended count change. The legacy `section` and `printedPages` reference fields are gone from these four records, leaving exactly `{sourceId, pdfPages: [start, end]}`. Thirteen `notes[]` entries record genuine source errors, including a trigram symbol that does not match its name (NTT 333), a hào heading that disagrees with its own Hán line (PBC 210), and Chinese lines copied from the wrong quẻ (NTT 352–353).
- Review: three rounds with the acceptance bar the operator set for the batch — **reference + invention only**. Round 1 was exhaustive (all 112 attributed entries, 4 introductions, 13 notes) and returned PASS with **zero** findings. Round 2 audited a risk-selected 32 cells and returned **FAIL with 3 P1s**, and all three sat in cells round 1 had explicitly marked clean: `hexagram-17.json` `lines[0].entries[0]` gave NHL 189's second reading of hào one as “người mình theo” where the source says “cái thể của mình thay đổi”; `hexagram-19.json` `lines[2].entries[0]` attributed Phan Bội Châu's two-yang target to Nguyễn Hiến Lê, who names hào two only; and `hexagram-19.json` `entries[0].references` had lost the `source-book-nhl` `[59, 61]` declaration that carries the bottom-up numbering put in its retained sentence while the other three introductions still had it. Round 3 verified the corrections and their blast radius: **PASS**, 0 findings.
- Lesson: an exhaustive round's PASS is not a gate, because a “clean” disposition is only a claim about the clause that happened to be read. Two of the three defects were **inherited from the baseline**, not introduced by this feature — a frozen-corpus audit is not a regression test, so writers and reviewers must not treat unchanged prose as thereby correct.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. The invariants artifact recorded **0 of 4** files with changed invariant fields and all 24 `(position, polarity, label)` tuples unchanged. Five of the thirteen notes assert something about a printed page image, which no reviewer can check; the Leader rendered those pages with PyMuPDF and read them, and all five held. Exact-head CI on `07b800d` was green (`verify`, Cloudflare Pages, GitGuardian) with `mergeStateStatus: CLEAN`.
- Limits: reviewer children inspect extracted page text only, never page images, and reported that limitation explicitly; 8 of the 13 notes therefore rest on text evidence alone. Two writer-lane failure modes cost a round: all four round-1 writers researched and then streamed their report into the truncated final message without ever calling `edit`/`write`, and one re-dispatched writer died because `.agent-work/pshow.sh` only worked from one working directory. Both are fixed at the root (procedure-first brief; the script resolves its own directory).
- Blockers: none for feat-072.
- Next: the operator directed that the batch stop after feat-072. The next selected feature is feat-073 (Review and improve quẻ 21–24 and all twenty-four hào); it has not been activated and no branch exists for it.

## Migration provenance

Migrated from [feat-072](../features/feat-072.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
