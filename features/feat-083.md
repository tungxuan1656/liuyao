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

## Independent retrospective round-2 review — 2026-10-10 (issue #118)

**Verdict: PASS for all seven previously corrected findings, their tested direct uses, and nearby/high-risk passages.** This is a new, independently conducted source review of the *merged* record content, separate from feat-083's original writer and Leader. It did **not** run the originally prepared round-2 worker, enlist an external human scholar, or repeat all 128 round-1 comparisons. Those distinctions remain explicit; this targeted verification meets the written round-2 scope of checking fixes, their uses and risk cells, rather than claiming full new certification.

- Reviewed `main` SHA: `a4bffd2d729a9f465d938cf4d7d4490d62f99cde` (after PR #122).
- Exact reviewed record blob SHAs: quẻ 61 `797fb751ff59f3b8779c64cbfcb8051ac619df0c`; 62 `947773f7eb3b8ca9ed9457437ce848da92d74df7`; 63 `166998fb676e6a2601bd9dbb18340eed720325c0`; 64 `fbf41d961721a8a1d7070aaf70ba56f215ac2198`.
- SHA-256 of all four supplied PDFs was independently recomputed and matches `packages/knowledge/data/sources.json` exactly. Reviewed NHL (393 PDF pages), PBC (655), NTT (938); the BPCT file (467) was fingerprinted but was not a source for these four quẻ.
- The original PR #107 supplied the **locations of the findings**, not the verdicts. The following conclusions come from a fresh comparison of current JSON with independently read source pages.

| Historical finding and current pointer | Independent book evidence and result |
| --- | --- |
| **61-1** `entries[1]` NHL overview inverted the response relationship | **PASS** — NHL PDF **321** explicitly has upper Tốn *thuận với người dưới* and lower Đoài *phục tòng người trên*. The corrected explanation preserves both directions and the *chính đạo* requirement. |
| **61-2** `entries[5].references` cited only the translator's final notes | **PASS** — NTT **895** contains Tự Quái, NTT **899** contains hào-nhị's `ràng`, and NTT **904** footnotes **[1]–[2]** give the title gloss and *Dịch theo Chu Hy*. The entry now cites all relevant pages and retains Ngô Tất Tố's own attribution. |
| **61-3** `lines[4].entries[3]` wrongly embedded a project polarity gloss in Chu Hy's reading | **PASS** — NTT **903** credits Chu Hy with ngũ/nhị `ứng`; current line 5 attribution contains only that reading. The distinction from **formal chính ứng** lives separately in `notes[0]`; nhị and ngũ are both **yang**. |
| **61-4** `notes[0].references` omitted the ngũ page | **PASS** — NTT **899** (nhị) and **903** (ngũ) separately support the note; the current references include both, plus NHL **322** and PBC **568–569**. |
| **62-1** `entries[4]` assigned the three *Đại Tượng* examples to the wrong NTT source pages | **PASS** — Chu Hy's `ba điều đó` and its limits occur on NTT **909**, while footnote **[3]** defining them as *nết, tang và dùng* is at NTT **916**. The present references include both; `entries[5]` separately attributes the footnote expansion to Ngô Tất Tố. |
| **62-2** `lines[2].entries[0]` weakened NHL's hào-tam harm judgment | **PASS** — NHL **326** says *bị chúng làm hại* and *bị vạ*, not merely “at risk.” Current line 3 preserves **`nên bị vạ`**. Neighbouring PBC **579–580** and NTT **911–912** were read without merging other authors' conditions into NHL's judgment. |
| **64-1** `notes[0].references` cited only NHL 331 for the complete six-line passage | **PASS** — NHL **331** twice prints **5 hào** in overview prose, yet its quẻ diagram and the **six line sections run from NHL 331 through 333**. The corrected `[331,333]` range actually supports the claim; PBC **593–594** and NTT **928** independently confirm the six-line structure. |

### Additional independent high-risk checks

- **61**: NTT **899/903**, NHL **322**, PBC **568–569** support the distinct *same-yang tín ứng* wording; it does not create a structural *chính ứng*. NTT **900** explicitly names **Trương Trung Khê** as the extra tam commentator. PBC **655** endnote **[21]** gives the Vị Sinh anecdote but does not identify the endnote's author; `lines[5].entries[4]` correctly retains *người chú chưa xác định* instead of inventing authorship.
- **62**: NHL **325**, PBC **578–579**, NTT **910–911** preserve the difference between the two **yin** nhị/ngũ lines *meeting* and the formal yin/yang correspondence rule. NTT **914** explicitly says they are not `ứng`; NTT **912** confirms yang tam's separate position and judgment. No polarity/line-order change is supported.
- **63**: PBC **588** visibly begins the block with *Lục Nhị* but later prints *Cửu Nhị*, exactly as the current source-error note says. NTT **921** distinguishes Trình Di and Chu Hy's readings. NTT **926**, footnote **[2]**, distinguishes the translator's *khăn trùm* from Chu Hy's *mui xe*; the current Ngô Tất Tố attribution is warranted.
- **64**: NHL **331–333** confirms the six printed hào and its two separate “5 hào” overview slips. NTT **930** prints the Chinese *濡其尾* and *nhu kỳ vĩ* (tail) while the adjacent printed Vietnamese translation and Trình Di explanation read *đầu* (head); `notes[1]` accurately keeps the textual discrepancy instead of silently emending the book.

**Rendered-image checks actually performed by this reviewer:** NHL **331** (diagram and both 5-hào slips); NTT **911** (the Chinese tam Tiểu Tượng unexpectedly placed under the nhị discussion, next to a different Vietnamese gloss); NTT **930** (*đuôi* vs *đầu* in the same printed passage); PBC **588** (*Lục Nhị* heading vs later *Cửu Nhị*). Extracted-text checks on other cited pages are **not** presented as visual inspections.

**Independent structural inventory of current JSON:** 4 `ready` quẻ, 24 correctly ordered lines (1–6), 98 attributed line entries (26/24/24/24), six notes (1/2/1/2) and **281 valid in-bounds source references**. Additional scholarly voices, unknown contributors and optional `condition`, `section` and `printedPages` values remain unchanged. No established P0/P1 or source-fidelity defect warrants a data patch in this bounded review.

**Handoff:** original feature `done` status remains unchanged, and original skipped round-2 history above is preserved. This *new* separate round-2 source check resolves the documented correction-verification gap **without** claiming a new 128-unit audit or external human certification. Final-head CI and operator review/merge remain required; no new feature is activated.
