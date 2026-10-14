# feat-079 - Review and improve quẻ 45–48 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-045](task-feat-045.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Verify

- `./init.sh` → `=== Verification passed ===`. Format, lint, typecheck, build and package exports passed; tests 181 (`liuyao-core`) + 97 (`knowledge`). Corpus line: `Knowledge: 381 records; 381 ready; 4 supplied books. Structural links and source pages valid.`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` → exit 0, same corpus line. (The `--check` comparison needs the `packages/knowledge/.generated` and `dist` output that `pnpm build` writes; both are Git-ignored, so `--check` only works after a build in the same checkout.)
- Round 1 (read-only, one reviewer per quẻ, all 112 attributed entries and every note): r45 PASS 1 P2, r46 PASS 1 P2, r47 PASS 0 findings, r48 PASS 0 findings.
- Round 2 (read-only verification): v45 PASS, v46 PASS, both with no new findings. Quẻ 47 and 48 were unchanged after round 1, so no round-2 run applied to them.
- Image-dependent `notes[]` claims rendered with PyMuPDF 1.28.0 and read as images; the mapping is in `.agent-work/feat-079/image-checks.md`.
- Baseline `b9d306d` → reviewed tree: no identity key changed, all twenty-four `(position, polarity, label)` tuples identical (`.agent-work/feat-079/invariants.md`).

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done. All four records reviewed, corrected, verified and committed on `tungxuan1656/feat-079`; the PR is opened and left unmerged.
- Evidence: `.agent-work/feat-079/` — `h45/h46/h48-report.md` (writer provenance tables), `r45/r46/r47/r48-review.md` (round 1), `fix45.md`/`fix46.md` (Leader's change record), `v45/v46-verify.md` (round 2), `image-checks.md`, `invariants.md`.
- Blockers: none. Out-of-scope observations left untouched: NTT PDF 740 prints `vô đắc vô táng` against 無喪無得, and NTT PDF 746 heads a Tiểu Tượng as `九二`; no entry in quẻ 45–48 depends on either.
- Dependencies: See [frozen index](../feature_index.json).
- Next: review and merge the open PR for `tungxuan1656/feat-079`, then activate feat-080 from `main`.

#### Follow-up review and integration — 2026-10-09

- Reviewed the source references and contested interpretations against the supplied book pages: Ngô Tất Tố PDF 698–752, Phan Bội Châu PDF 432–466 and Nguyễn Hiến Lê PDF 274–285, with special attention to the author's headings in Thăng PDF 718–719 and the Tiên Nho material in Tỉnh PDF 739–741.
- **Thăng Cửu Nhị:** NTT PDF 718–719 actually prints `Bản nghĩa của Chu Hy` above the long passage, the short cross-reference, and the Tiểu Tượng commentary; no explicit `Truyện của Trình Di` heading appears on these pages. The record's Trình Di allocation is an **editorial hypothesis**, not source-verified authorship. Clarified the source note and added a visible entry condition identifying this uncertainty rather than asserting certainty.
- **Tỉnh:** restored three distinct, source-attested overviews by **Từ Tiến Trai** (NTT 739), **Lý Long Sơn** (NTT 739–740) and **Trương Trung Khê** (NTT 740–741), which the earlier simplification had entirely removed. They remain independent author entries rather than being misattributed to Chu Hy or Ngô Tất Tố. The eight overviews in Tỉnh (structural + four standard authors + three additional scholars) are intentional; other quẻ retain five.
- **Tỉnh, Phan Bội Châu:** retained his source-attested comment on tỉnh điền, phú thuế and tư bản chủ nghĩa (PBC 461) as historical political-economic commentary without asserting the model has been historically proven or is a present-day policy. Added an editorial source discrepancy note for the printed `Khốn/Khôn` inconsistency in Trương Trung Khê's NTT PDF 740 account.
- Restored **eight targeted `condition` cautions**: Tụy 1 (ceremonial reading), Thăng 1 (uncertain attribution), Khốn 3 (historic bodily-sacrifice imagery and a death passage), Tỉnh 3 (historic economic claim, analogy about physiology and uncertain source-transformation). These optional UI-supported fields are meaning-bearing, unlike repetitive generic boilerplate, and are permitted by `docs/design-docs/knowledge-model.md`. `section` and `printedPages` remain omitted; all citations retain valid `sourceId` / `pdfPages`.
- Invariants: all four ids, titles, polarity patterns and 24 ordered hào remain unchanged; 4 attributed explanations per hào (96 total). The five source notes now distribute (45:1, 46:1, 47:2, 48:1).
- Feature index is `done` for `feat-079`. PR #112 is **left open for manual operator merge**. CI must pass on the final main-synchronized head; the older validation results apply only to their historical revisions.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — feat-079 reviewed and improved quẻ 45–48

- Historical status: `done` on PR [#112](https://github.com/tungxuan1656/liuyao/pull/112) for operator merge; the agent leaves this PR open. The final review retains source-supported supplementary scholars and documents uncertain authorship.
- Result: reviewed and improved all four assigned quẻ (45 Trạch Địa Tụy, 46 Địa Phong Thăng, 47 Trạch Thủy Khốn, 48 Thủy Phong Tỉnh) and all twenty-four hào under the simplified knowledge model.
- Content: one structural overview and four standard attributed commentaries per quẻ, **plus three genuine Tiên Nho author views in Tỉnh** (8 overview entries for 48; 5 each for 45–47). Every hào has four attributed explanations in NHL/PBC/Trình Di/Chu Hy order. Common generic conditions and optional section/printedPages were removed, but eight meaningful contextual conditions were restored as UI-supported editorial safeguards. The five source-discrepancy notes are 1/1/2/1 across quẻ 45–48.
- Review: two rounds with the batch bar the operator set — **reference + invention only**. Round 1 was exhaustive over all 112 attributed entries and every note: r45 **PASS** (1 P2), r46 **PASS** (1 P2), r47 and r48 **PASS** with no findings. The two P2s were both reference defects: `hexagram-45.json` `notes[0]` cited NHL `[274,274]`, a page that carries no polarity statement and no hào text, while the PBC hình-quẻ page 432 that the note's retained sentence depends on was uncited; and `hexagram-46.json` left the Cửu nhị authorship split — NTT p.718 prints `Bản nghĩa của Chu Hy.` twice, once over the long passage and once over the one-line `Câu này đã thấy ở quẻ Tụy.` — recorded only in an out-of-record writer report. Both were corrected (NHL widened to `[274,276]`, PBC `[432,432]` added; the quẻ 46 note written into the record) and round 2 returned **PASS** for each with no new findings.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check` exited 0 with 381 records, 381 ready, 4 supplied books. The invariants artifact recorded **0** changed identity keys and all 24 `(position, polarity, label)` tuples unchanged against `b9d306d`. Six image-dependent `notes[]` claims were rendered with PyMuPDF 1.28.0 and read as images, all holding; the mapping is in `.agent-work/feat-079/image-checks.md`.
- Limits: the reviewer children ran on extracted page text only and reported that limitation, so the image-dependent notes rest on the Leader's rendered-page reads; `./init.sh` was run by the Leader, not by a reviewer. The reviewer lane also needed an explicit `deepseek-v4.1-flash` model override because the configured `reviewer` model resolved to an unavailable provider — two dispatch attempts failed on provider errors before that.
- Blockers: none for feat-079. Out-of-scope observations left untouched: NTT PDF 740 prints `vô đắc vô táng` against 無喪無得, and NTT PDF 746 heads a Tiểu Tượng as `九二`; no entry in quẻ 45–48 depends on either.
- Next: operator checks the final CI and merges PR #112; the agent must not merge.
- Follow-up review: NTT 718–719's duplicated Chu Hy attribution cannot substantiate definite Trình Di authorship, so the data explicitly calls it a provisional editorial grouping. Restored Từ Tiến Trai, Lý Long Sơn and Trương Trung Khê (NTT 739–741) as individually attributed Tỉnh commentaries; retained PBC 461's historically framed political-economic remarks; recorded NTT 740's Khốn/Khôn inconsistency. Preserved author distinctions, added eight meaningful conditions, and kept all 24 hào unchanged.

## Migration provenance

Migrated from [feat-079](../features/feat-079.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
