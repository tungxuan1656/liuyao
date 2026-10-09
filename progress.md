# Progress

Append-only history for repository-local tracked features. Do not record no-feature work here.

<!-- Log template

## YYYY-MM-DD — <id>

**State**: todo
**Done**: —
**Evidence**: —
**Blockers**: none
**Next**: <One action.>

-->

<!-- Newest entry first. Add each new block directly below this note, above older blocks. Do not edit older blocks. -->

## 2026-10-09 — feat-080 reviewed and improved quẻ 49–52

- Status: `done` on PR [#108](https://github.com/tungxuan1656/liuyao/pull/108), left open for manual operator merge. Follow-up review integrated the latest `main` after PR #112 merged and corrected a further book-fidelity defect in Cấn.
- Result: reviewed and improved all four assigned quẻ (49 Trạch Hỏa Cách, 50 Hỏa Phong Đỉnh, 51 Thuần Chấn, 52 Thuần Cấn) and all twenty-four hào under the simplified knowledge model.
- Content: overview layers and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy (the last two via “Ngô Tất Tố — dịch và chú giải”); Cách adds Hồ Vân Phong and Trình Truyện (via Phan Bội Châu) on hào five and six. Five `notes[]` entries record genuine source discrepancies: PBC 484 calling a hào `Cửu Ngũ` inside the hào-three Tiểu Tượng where the rest of the page and hào five print `Lục Ngũ` (the hexagram figure has yin at position five); PBC 491 printing Hán `Lục tứ` beneath the `Cửu Tứ` heading while NTT 785 splits its own label and gloss; NTT 782–783 and PBC 490 giving conflicting `Chín Hai` / `Cửu Nhị` names for a yin position two; PBC 5 and PBC 493 printing `51` for both Bát Thuần Chấn and Bát Thuần Cấn; and NHL 295 / PBC 497 shifting a hào-three label by one position. No record was restructured — the legacy `section` / `printedPages` fields and the `condition` string were deliberately left alone, unlike feat-070/072 where normalising them was in scope.
- Review: two rounds, both by a read-only reviewer under the batch acceptance bar — **reference + invention only**. Round 1 walked all 122 entries (118 attributed), the four introductions and the five notes: Cách PASS 0 findings; Đỉnh FAIL 1 P1; Chấn FAIL 1 P0; Cấn FAIL 2 P1. Round 2 verified the four corrections, their direct uses and 41 risk cells: **PASS, 0 findings, no new defects**.
- Defects found and fixed (each re-verified against the cited page before the edit):
  - `hexagram-50.json` `lines[2].entries[2]` (Trình Di, NTT 772–773) weakened a definite conclusion to “có thể kết thúc tốt”; the source says “sau chót nên được tốt lành” and “sau cùng ắt hòa hợp”.
  - `hexagram-51.json` `entries[5]` (**P0**) asserted an invented “đại từ” (pronoun) marked in the ruler's-sacrifice sentence. NTT 780 prints `Ra khá lấy[3] giữ tôn miếu xã tắc`, and footnote [3] on NTT 789 says only “chữ này muốn chỉ về con trưởng của vua chúa”; the marked word is `lấy` (gloss of 以), confirmed glyph by glyph from the page's rawdict codepoints.
  - `hexagram-52.json` `lines[3].entries[0]` narrowed Nguyễn Hiến Lê's “không làm được việc gì” (NHL 295) to “không làm công việc lớn”.
  - `hexagram-52.json` `entries[5].references` cited only the six Ngô Tất Tố footnote pages while the prose compares Chu Hy's 止/趾 reading and summarises his kháp-vần note; NTT 793 and NTT 799 were added.
- Round-1 write also corrected two Phan Bội Châu reference ranges onto the pages that carry the end of the passage (`hexagram-49.json` `[469,469]`→`[469,470]`, `[473,473]`→`[473,474]`) and dropped a duplicated `[475,475]` declaration, and normalised mid-sentence “Ông” to “ông” in three records.
- Evidence: `./init.sh` passed via `=== Verification passed ===` before and after the fix commit and again on the merged head (181 core tests + 97 knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. Structure invariants against baseline `b9d306d`: 0 of 4 files changed an invariant field, all 24 `(position, polarity, label)` tuples and every entry count unchanged. Exact-head CI green (`verify`, Cloudflare Pages, GitGuardian). All five `notes[]` entries assert printed-page images, so the Leader rendered every cited page with PyMuPDF and read it; all five held, including the Tốn/Ly figure extracted from PBC 479 as an embedded image (xref 1738) with position five broken.
- Limits: reviewer children read extracted page text only, never page images, and did not execute the test commands; the invariant comparison is Leader-generated. Round 2 re-checked the four fixes and 41 risk cells rather than all 122 entries, so a defect outside those cells is still undetected. Round 2 also had to run on a different model (`9router/ag/gemini-3.8-flash`) because the round-1 reviewer's provider lost its credentials mid-session — the task, role and bar were unchanged, but the rounds are not a like-for-like model comparison.
- Blockers: none for feat-080.
- Next: review latest CI on the updated PR branch, then operator manually merges PR #108. Future quẻ 53–60 (`feat-081`, `feat-082`) are already `done` on `main`; `feat-083` remains `todo`.
- Follow-up correction: in quẻ 52 Lục Nhị, Phan Bội Châu PDF 497 explicitly writes that Nhị cannot restrain or remedy Tam's mistake; previous corpus text mistakenly said `cứu được tam`. Corrected to `không thể hạn chế hay cứu sửa được Tam`, retaining the meaning that Nhị must follow unwillingly. Audited book page excerpts for this and other risk cells and preserved all existing author layers, references and five source notes.

## 2026-10-09 — feat-079 reviewed and improved quẻ 45–48

- Status: `done` on PR [#112](https://github.com/tungxuan1656/liuyao/pull/112) for operator merge; the agent leaves this PR open. The final review retains source-supported supplementary scholars and documents uncertain authorship.
- Result: reviewed and improved all four assigned quẻ (45 Trạch Địa Tụy, 46 Địa Phong Thăng, 47 Trạch Thủy Khốn, 48 Thủy Phong Tỉnh) and all twenty-four hào under the simplified knowledge model.
- Content: one structural overview and four standard attributed commentaries per quẻ, **plus three genuine Tiên Nho author views in Tỉnh** (8 overview entries for 48; 5 each for 45–47). Every hào has four attributed explanations in NHL/PBC/Trình Di/Chu Hy order. Common generic conditions and optional section/printedPages were removed, but eight meaningful contextual conditions were restored as UI-supported editorial safeguards. The five source-discrepancy notes are 1/1/2/1 across quẻ 45–48.
- Review: two rounds with the batch bar the operator set — **reference + invention only**. Round 1 was exhaustive over all 112 attributed entries and every note: r45 **PASS** (1 P2), r46 **PASS** (1 P2), r47 and r48 **PASS** with no findings. The two P2s were both reference defects: `hexagram-45.json` `notes[0]` cited NHL `[274,274]`, a page that carries no polarity statement and no hào text, while the PBC hình-quẻ page 432 that the note's retained sentence depends on was uncited; and `hexagram-46.json` left the Cửu nhị authorship split — NTT p.718 prints `Bản nghĩa của Chu Hy.` twice, once over the long passage and once over the one-line `Câu này đã thấy ở quẻ Tụy.` — recorded only in an out-of-record writer report. Both were corrected (NHL widened to `[274,276]`, PBC `[432,432]` added; the quẻ 46 note written into the record) and round 2 returned **PASS** for each with no new findings.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check` exited 0 with 381 records, 381 ready, 4 supplied books. The invariants artifact recorded **0** changed identity keys and all 24 `(position, polarity, label)` tuples unchanged against `b9d306d`. Six image-dependent `notes[]` claims were rendered with PyMuPDF 1.28.0 and read as images, all holding; the mapping is in `.agent-work/feat-079/image-checks.md`.
- Limits: the reviewer children ran on extracted page text only and reported that limitation, so the image-dependent notes rest on the Leader's rendered-page reads; `./init.sh` was run by the Leader, not by a reviewer. The reviewer lane also needed an explicit `deepseek-v4.1-flash` model override because the configured `reviewer` model resolved to an unavailable provider — two dispatch attempts failed on provider errors before that.
- Blockers: none for feat-079. Out-of-scope observations left untouched: NTT PDF 740 prints `vô đắc vô táng` against 無喪無得, and NTT PDF 746 heads a Tiểu Tượng as `九二`; no entry in quẻ 45–48 depends on either.
- Next: operator checks the final CI and merges PR #112; the agent must not merge.
- Follow-up review: NTT 718–719's duplicated Chu Hy attribution cannot substantiate definite Trình Di authorship, so the data explicitly calls it a provisional editorial grouping. Restored Từ Tiến Trai, Lý Long Sơn and Trương Trung Khê (NTT 739–741) as individually attributed Tỉnh commentaries; retained PBC 461's historically framed political-economic remarks; recorded NTT 740's Khốn/Khôn inconsistency. Preserved author distinctions, added eight meaningful conditions, and kept all 24 hào unchanged.

## 2026-10-09 — feat-077 reviewed and improved quẻ 37–40

- Status: `done`; PR [#101](https://github.com/tungxuan1656/liuyao/pull/101) remains open for the operator to merge. Follow-up review included two source-specific corrections, preserved important context conditions and integrated current `main`.
- Result: reviewed and improved all four assigned quẻ (37 Phong Hỏa Gia Nhân, 38 Hỏa Trạch Khuê, 39 Thủy Sơn Kiển, 40 Lôi Thủy Giải) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy. The baseline carried only three entries on eighteen hào and four overview layers in Gia Nhân and Khuê; the missing Chu Hy layer was written from the `Bản nghĩa của Chu Hy` sections already on the NTT pages, so `hexagram-37.json` and `hexagram-38.json` move from overview 4 → 5 and 18 hào gain their fourth entry. Every reference is exactly `{sourceId, pdfPages: [start, end]}`; optional `section` and `printedPages` metadata are omitted, while targeted meaningful `condition` cautions are restored. Four `notes[]` entries record genuine source discrepancies with page locators — a hào-two reading that disagrees across three books (NHL 249 `vô du loại` vs NTT 587 `toại` vs PBC 364 `tụy`), a hào heading that contradicts its own gloss (NHL 252 `Lục tam` over `dương mà ở vị âm`), a Tượng gloss that swaps the neighbouring polarities (NTT 603), and Chu Hy naming `hào Sáu Năm` where the quẻ and the other books put the great man at the fifth position (NTT 620).
- Review: two rounds under the batch acceptance bar — **reference + invention only**. Round 1 was exhaustive (28 attributed cells, each quẻ's overview entries and notes) and returned 40 **PASS**, 37/38/39 **FAIL** with four P1s: PBC's reading in Gia Nhân's note was spelled `Âm tuy` where PBC 364 says `tụy`; Khuê's Phan Bội Châu entry stated the outcome as certain where PBC 376 says `có lẽ`; Kiển's Trình Di entry gave hào Hai extra friends it does not bring (NTT 618–619) and gave the relief the accomplishment of `việc lớn` where NTT 620 says `chỉ có thể thư dãn … được thư dãn cũng là tốt rồi`. All four were re-checked against the cited page before the edit, recorded in `.agent-work/feat-077/fix37.md`, `fix38.md` and `fix39.md`, and committed as `afe0a65`. Round 2 verified the corrections and their direct uses: 37/38/39 **PASS**, 0 new findings; quẻ 40 carried no correction and its file is byte-identical to the revision round 1 passed, so there was nothing to verify.
- Lesson: the same author-layer failure mode as feat-070 to feat-072 recurred, but in the opposite direction — the defects were a dropped possibility word and an imported consequence clause, not padding. Reading the corrected sentence back against the page is what catches both.
- Verification: `./init.sh` passed (97 knowledge tests); `validate:corpus --check-books --check` passed with 381 records / 381 ready / 4 supplied books; structure invariants unchanged for all 4 files (`b9d306d` → `afe0a65`); three of the four notes assert something about a printed page image, and the Leader rendered NHL 249, NHL 252 and NTT 620 with PyMuPDF and read them.
- Blockers: none for feat-077.
- Next: operator reviews final CI and merges PR #101; the agent leaves it unmerged.
- Follow-up findings: corrected Kiển Lục Tứ reading to Cửu Tam where NTT PDF 617 prints Chín Hai; added Khuê note distinguishing informal alliance of two yang lines from formal chính ứng (NTT 599–600, NHL 252, PBC 373). Restored 18 targeted contextual cautions previously erased; total source notes now 6. Verified the cited NTT 617 spelling on the rendered PDF page.

## 2026-10-09 — feat-076 marked done for operator merge

- Status: `done` in `feature_index.json` on PR #110 by explicit operator request, ahead of the operator's manual merge. The PR stays open and unmerged by the agent.
- Evidence: two content review rounds for quẻ 33–36, the follow-up review and current-main synchronisation in `3a56c91`, and successful CI on that revision. The sign-off intentionally supersedes the older `todo until merge` handoff; source details remain recorded in `features/feat-076.md`.
- Next: operator merges PR #110 into `main` after the final check.

## 2026-10-09 — feat-076 reviewed and improved quẻ 33–36

- Status: review complete; PR [#110](https://github.com/tungxuan1656/liuyao/pull/110) remains open on `tungxuan1656/feat-076` (historical reviewed head `4e69953`, now synchronised with `main`). `feat-076` stays `todo` until merge; `feat-074` currently holds the single `active` slot.
- Result: reviewed and improved quẻ 33 Thiên Sơn Độn, 34 Lôi Thiên Đại Tráng, 35 Hỏa Địa Tấn and 36 Địa Hỏa Minh Di — all twenty-four hào plus every overview layer — against the four supplied books. The four records now carry 95 attributed layers: four per hào except quẻ 35 hào three, where NTT 564 carries Trình Di alone.
- Content: 15 new source-backed layers (Chu Hy overviews for quẻ 34 NTT 546–548 and quẻ 36 NTT 569–571; Chu Hy commentary for quẻ 33 hào 1, 3, 4, 5, 6, quẻ 34 hào 1 and 6, quẻ 35 hào 1, quẻ 36 hào 1, 2, 3, 5, 6), one widened Trình Di range (`hexagram-33.json` `lines[3].entries[2]` `[539,539]` → `[538,539]`), and one new note in `hexagram-34.json` recording that NHL 240 reads “quân tử dụng võng” as Chu Hy, Legge and Wilhelm do while NTT 552's Chu Hy reads it otherwise. The seven pre-existing notes are byte-identical to the baseline.
- Defects: round 1 (exhaustive, read-only, four lanes over the frozen `81283ac`) returned 13 P1 findings and 0 P0 — 33: 1, 34: 5, 35: 2, 36: 5. Nine were inherited from the corpus baseline and four sat in the newly added layers. Classes: a categorical negative weakened to a difficulty (33 hào 3), changed consequence and imagery (34 hào 3 — the horn is injured, not the animal trapped), a causal clause given to the wrong author (34 hào 4), a knowing-failure rendered as physical inability (34 hào 6), a widened scope (35 hào 5), a substitute reason for the author's own (36 hào 4), and a reading imported from a “Lời bàn của Tiên Nho” paragraph (36 hào 4).
- Review: round 2 verified every correction plus the high-risk passages and returned **PASS** on all four quẻ (33: 1/1, 34: 5/5, 35: 2/2, 36: 5/5), 0 blocking defects, and asked for two further repairs that are applied — `hexagram-36.json` `lines[5].entries[1]` now states Phan Bội Châu's own “bỏ mất hết nguyên tắc đức minh” (PBC 356 Tượng 失則, glossed on PBC 357) instead of “mất vị”, and `hexagram-34.json` `lines[2].entries[0]` uses Nguyễn Hiến Lê's own word “cừu đực” (NHL 240). Four observations were declined with reasons recorded in `.agent-work/feat-076/self-review.md`.
- Evidence: `./init.sh` → `=== Verification passed ===` on `4e69953` (format, lint, typecheck, build, 181 core + 97 knowledge tests); `validate:corpus --check-books --check` → 381 records, 381 ready, 4 supplied books, source pages valid. The invariant diff against the recorded baseline reports **0 invariant fields changed** (ids, `kingWenNumber`, trigrams, aliases, topics, relations, status, all six line tuples), so only entry lists and `hexagram-34.json` `notes` grew. The Leader also re-derived all thirteen corrected cells clause by clause from the pages that carry them (13/13 faithful) and re-read the seven image-dependent note claims from PyMuPDF renders of NTT 541, 543, 556, 563, 576 and NHL 241, 247 — all hold.
- Limits: reviewer lanes read extracted page text only and never page images, so those seven image claims stay Leader-verified; the invariant comparison and page renders are Leader-generated. Round 2 cost three attempts: the reviewer role's configured model returned “No active credentials for provider: codex” for both workflow lanes, and a retry on `gpt-6-luna` exited with no output at all, so verification ran on `deepseek-v4.1-flash` (high) and said so in its own report.
- Blockers: none.
- Next: verify CI on the synchronised branch, then seek operator approval before merging PR [#110](https://github.com/tungxuan1656/liuyao/pull/110). Only after merge set `feat-076` to `done`. Separate cleanup: PR #104 already merged `feat-074`, but its index entry remains `active` on `main`; `feat-073` is already `done`.
- Follow-up review (2026-10-09): compared the newly added Chu Hy layers and disputed Đại Tráng/Minh Di commentary against NTT PDF 538–581, NHL PDF 236–247, PBC PDF 329–357. No further source-fidelity defect found in reviewed passages. Integrated the current `main` history without dropping newer progress entries.

## 2026-10-09 — feat-082 reviewed and improved quẻ 57–60

- Status: done; delivered as PR #115 on `tungxuan1656/feat-082`, reviewed heads `3cd0363` (writer pass) and `c5141d8` (fix pass).
- Result: reviewed and improved all four assigned quẻ (57 Thuần Tốn, 58 Thuần Đoài, 59 Phong Thủy Hoán, 60 Thủy Trạch Tiết) and all twenty-four hào under the simplified knowledge model.
- Content: an unattributed structural introduction, four attributed overview layers and four attributed entries on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy (the last two via “Ngô Tất Tố — dịch và chú giải”). Quẻ 57, 59 and 60 add a Ngô Tất Tố layer for his own translator observations; genuine extra views are kept rather than flattened — quẻ 57 keeps Hồ Song Hồ and Trương Trung Khuê (NTT 859) and R. Wilhelm's `Tần tốn` reading reported by Nguyễn Hiến Lê (NHL 310), quẻ 59 keeps Lý Long Sơn (NTT 880), Lão Tô (PBC 552) and Lục Tuyên Công (PBC 553). The records lost 873 net lines: the legacy `condition`, `section` and `printedPages` keys are gone, together with the repeated `condition` disclaimers, the boilerplate overview paragraph with its ~21 inventory references, a glossary-inventory overview entry and meta/audit sentences such as “giữ note gọi …” and a not-a-prediction disclaimer. Every reference is exactly `{sourceId, pdfPages: [start, end]}`. Eight `notes[]` record real source errors and unresolved readings, all verified against rendered page images.
- Review: two rounds under the governing acceptance bar **reference + invention only**. Round 1 was exhaustive (every attributed overview and line entry clause by clause, the four introductions, all notes and the removals) and returned **FAIL with 0 P0** for all four quẻ — 57: 8 P1 + 4 P2, 58: 2 + 7, 59: 7 + 5, 60: 14 + 0. All 47 findings were applied in `c5141d8`, including the ~36 that reported genuine attributed content deleted by the condensing pass, because the operator's recorded precedent for this batch is to apply the findings even where the written bar does not require them. Round 2 verified each finding on its cited page plus the direct uses and adjacent pages: quẻ 57 and 58 passed as independent reviewer runs with zero findings, while the quẻ 59 and 60 verifier children both died on the provider quota (`9router API error (503): [codex/gpt-6.1-sol] [429] usage limit`) and produced no report, so the Leader re-verified their 12 and 14 findings directly against NTT 874–884, NHL 318–320 and PBC 546–563 — **PASS**, no open P0/P1/P2.
- Lesson: one candidate P1 was opened and retracted. The địch→埸 emendation and “chữ máu chỉ sự đau hại” at quẻ 59 Thượng Cửu looked like they sat in the wrong author layer, but NTT 883 ends with the heading “Bản nghĩa của Chu Hy” whose sentence continues at the top of NTT 884, and the page's own footnotes say “Dịch theo Chu Hy” — a commentary block can span a page break, so a sentence at the top of page n+1 belongs to the heading last seen on page n. A second false lead came from case-sensitive searching: an early instruction to delete quẻ 57's R. Wilhelm entry rested on `Wilhelm` having no hit on NHL 309–311, but the scan prints “R. WilheLm” on NHL 310.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. The invariants artifact recorded **0 of 4** files with changed invariant fields and all 24 `(position, polarity, label)` tuples unchanged. The eight `notes[]` claims were verified by rendering the cited pages with PyMuPDF and reading them — for example NTT 860 drops the negation its own `dịch âm` and both commentators carry, NTT 865 prints `民忘其死` while translating 念 for 忘, NTT 881 prints the hào Tư `Lời Tượng` under the hào Năm heading, and NTT 889–890 has Trình Di and Chu Hy call hào Hai “mất đức cứng giữa” where Nguyễn Hiến Lê and Phan Bội Châu read it as dương cương đắc trung.
- Limits: the two round-2 verifier children for quẻ 59 and 60 could not run because of the provider quota, so that round-2 evidence is Leader-executed rather than independent; the round-1 review brief initially omitted the operator's “reference + invention only” ruling and invited exclusion findings, which is what produced most of the 47 findings — the brief was corrected afterwards. Quẻ 60 Thượng Lục has three entries because NTT 893–894 prints a Trình Di layer and no Chu Hy `Bản nghĩa` for that hào.
- Blockers: none for feat-082.
- Next: activate the next batch feature (feat-083, quẻ 61–64) from `main` once the operator selects it; no feature is active now.

## 2026-10-09 — feat-074 reviewed and improved quẻ 25–28

- Status: active; implementation and two source-review rounds completed; PR #104 is open for review and remains unmerged.
- Result: reviewed and improved all four assigned quẻ (25 Thiên Lôi Vô Vọng, 26 Sơn Thiên Đại Súc, 27 Sơn Lôi Di, 28 Trạch Phong Đại Quá) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ, with three or four attributed explanations per hào (quẻ 25: 3/4/4/3/3/3; 26: 3/3/3/3/3/4; 27: 3/4/3/4/3/3; 28: 4/4/4/4/4/4). Quẻ 27 and 28 each gained the missing Chu Hy overview layer (overview 4 → 5), and quẻ 28 gained Chu Hy on all six hào (3 → 4 per hào). Quẻ 25 and 26 gained no new author layer, but their inherited-error audit corrected three and two cells respectively relative to `main`. Six `notes[]` entries record genuine source errors, including NTT 434 calling hào 2 “Chín Hai” where its own quẻ hình prints 六二, NTT 442 printing the same `象曰` twice, and NTT 470 glossing 觀 where 頤 is meant.
- Review: two rounds with the acceptance bar the operator set for the batch — **reference + invention only**. Round 1 was exhaustive, one reviewer per quẻ (cell counts 28/25/27/29, all attributed entries, all introductions, all notes), and returned PASS/PASS/PASS/**FAIL**: quẻ 28 `lines[5].entries[3]` (Chu Hy Thượng lục) cited `source-book-ntt` `[481,481]` while the whole “Bản nghĩa của Chu Hy” passage is on PDF 482 — a **P0 inherited from the baseline**, because the writer report repeated the same wrong locator. Round 1 also filed seven P2s, every one of them inherited: an unsourced “từ tư ý”, a Phan Bội Châu clause that contradicted its own page, two clauses carrying another author's rationale, one reference range too narrow, and an invented image word (“mầm”/“chồi”) in quẻ 28's hào 2 cells. The Leader fixed all eleven cells in `7b29b62` (only `text` and `pdfPages` lines changed) and round 2 re-verified each hunk against its page on a different model: **PASS on all four quẻ, every hunk CONFIRMED, no new findings**. The two hào-2 trims that went beyond round 1's named locations were independently checked and judged faithful.
- Lesson: two writer reports claimed to have removed the `source-book-nhl [59,61]` introduction reference; the records never lost it and the reference is correct (NHL 59 “Cách vạch và xét trùng quái: từ dưới lên.”). Writer self-reports are claims, not evidence — validate against the frozen JSON, not against the report.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (12 files, 97 tests). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books, structural links and source pages valid. `git diff 074033c 7b29b62` contains 11 insertions and 11 deletions, all in `text` and `pdfPages`, so all four records kept their invariant fields, line tuples, author layers and ordering. Six `notes[]` clauses assert something about a printed page image, which no reviewer can check; the Leader rendered those pages with PyMuPDF and read them, and all six held (`image-verify.md`).
- Limits: reviewer children have no shell, so JSON parse, `validate:corpus` and `./init.sh` are Leader-side; they inspect extracted page text, never page images, and said so in every report. No third round was run: round 2 verified the corrections and their direct neighbours only, so a defect outside the eleven corrected cells would still be undetected.
- Follow-up on PR #104: corrected Nguyễn Hiến Lê Sơ Cửu `printedPages` from `[213,213]` to `[213,214]` to match the expanded PDF span; corrected scope/count descriptions and synced with newer `main` changes, preserving unrelated features.
- Blockers: none for content review; await fresh PR checks and merge decision.
- Next: review PR #104 checks and merge only after approval, then flip this feature to done.

## 2026-10-09 — feat-078 audited quẻ 41–44

- Status: done; merged to `main` in `025efaf` (PR #103), squash-merged at the exact reviewed head `d32735968fce8b51afe4e4445b6dcec89e27248d`.
- Result: audited quẻ 41 Sơn Trạch Tổn, 42 Phong Lôi Ích, 43 Trạch Thiên Quải and 44 Thiên Phong Cấu — all twenty-four hào plus every overview entry — against the four supplied books, and repaired every material defect found.
- Why reopened: the feature was `done` from the retired audit machinery, but feat-068 migrated these four records to the simplified model mechanically and never reviewed them; the batch checkpoint had recorded feat-078 as already done and skipped it.
- Scope: operator-set bounded audit, not a restructure. Content correctness only — no five-overview / four-entry normalisation, no length target, and the optional `section`, `printedPages` and `condition` fields stay. All four records keep their pre-audit shape (overview 8/7/12/14 entries; hào counts 24–43 attributed entries per quẻ).
- Defects: 22 findings over two exhaustive rounds — quẻ 41: 3 P1; 42: 2 P0 + 1 P1; 43: 6 P0; 44: 4 P0 + 6 P1. Dominant classes were changed certainty (“có thể” where the source says “quyết chắc”/“ắt”), changed causation or object (quẻ 44 `lines[4].entries[1]` turned PBC's restraint of Sơ into sheltering Sơ), omitted conditions, and quotes or instructions attributed to a page that does not carry them. Corrections are 27 `text` edits, 1 `condition` edit, 4 added references (PBC 403, NTT 683 notes 9–10, NTT 684) and one narrowed range (`hexagram-43.json` `entries[1].references[0]` 268–269 → 268, since NHL 269 carries only hào 1–4).
- Review: four writers audited one quẻ each with a per-entry provenance table outside the JSON; then independent read-only reviewers ran a full round 1 over all 150 attributed entries, and a round 2 that re-checked every correction against the page that carries it. `r2-h41`, `r2-h42`, `r2-h43` and `r2-h44` all returned `PASS`, 0 new defects.
- Evidence: `./init.sh` → `=== Verification passed ===` on the reviewed head (format, lint, typecheck, build, 181 core + 97 knowledge tests); `validate:corpus` → 381 records, 381 ready, 4 supplied books, source pages valid. Exact-head CI on `d327359` was green (`verify`, Cloudflare Pages, GitGuardian) with `mergeStateStatus: CLEAN`. Structure invariants (ids, `kingWenNumber`, trigrams, aliases, topics, relations, status, line tuples, entry and reference counts) are unchanged apart from the four added references.
- Image claims: `notes[]` is empty in all four records, so no entry asserted a page image. The Leader still rendered the two pages a decision hinged on with PyMuPDF — NTT PDF 662 prints “hình thi, thì không thể thế.” (the quẻ-42 wording), and NTT PDF 676 shows the hào-3 Chinese line with visibly corrupt glyphs, which is why `hexagram-43.json` `lines[2].entries[2].condition` keeps the reading explicitly unresolved.
- Limits: reviewers read extracted page text, never page images, and did not execute the gates; the structure invariant comparison and the image renders are Leader-generated. Quẻ 44's round-1 reviewer was killed by a provider usage limit and had to be re-dispatched, and its round-2 report was written to the managed artifact path rather than the reviewer directory.
- Blockers: none.
- Next: none inside this feature. The batch continues with the next queued hexagram record — feat-073 (Review and improve quẻ 21–24 and all twenty-four hào, dependencies feat-067 and feat-041 both done) — which needs operator selection before activation.

## 2026-10-09 — feat-072 reviewed and improved quẻ 17–20

- Status: done; merged to `main` in `4092aae` (PR #100), squash-merged at the exact reviewed head `07b800dd6d1ae80fb059648633f9e08410f03433`.
- Result: reviewed and improved all four assigned quẻ (17 Trạch Lôi Tùy, 18 Sơn Phong Cổ, 19 Địa Trạch Lâm, 20 Phong Địa Quan) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy. Quán had only four overview layers and gained the missing Chu Hy layer (`hexagram-20.json`, overview 4 → 5); that is the only intended count change. The legacy `section` and `printedPages` reference fields are gone from these four records, leaving exactly `{sourceId, pdfPages: [start, end]}`. Thirteen `notes[]` entries record genuine source errors, including a trigram symbol that does not match its name (NTT 333), a hào heading that disagrees with its own Hán line (PBC 210), and Chinese lines copied from the wrong quẻ (NTT 352–353).
- Review: three rounds with the acceptance bar the operator set for the batch — **reference + invention only**. Round 1 was exhaustive (all 112 attributed entries, 4 introductions, 13 notes) and returned PASS with **zero** findings. Round 2 audited a risk-selected 32 cells and returned **FAIL with 3 P1s**, and all three sat in cells round 1 had explicitly marked clean: `hexagram-17.json` `lines[0].entries[0]` gave NHL 189's second reading of hào one as “người mình theo” where the source says “cái thể của mình thay đổi”; `hexagram-19.json` `lines[2].entries[0]` attributed Phan Bội Châu's two-yang target to Nguyễn Hiến Lê, who names hào two only; and `hexagram-19.json` `entries[0].references` had lost the `source-book-nhl` `[59, 61]` declaration that carries the bottom-up numbering put in its retained sentence while the other three introductions still had it. Round 3 verified the corrections and their blast radius: **PASS**, 0 findings.
- Lesson: an exhaustive round's PASS is not a gate, because a “clean” disposition is only a claim about the clause that happened to be read. Two of the three defects were **inherited from the baseline**, not introduced by this feature — a frozen-corpus audit is not a regression test, so writers and reviewers must not treat unchanged prose as thereby correct.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. The invariants artifact recorded **0 of 4** files with changed invariant fields and all 24 `(position, polarity, label)` tuples unchanged. Five of the thirteen notes assert something about a printed page image, which no reviewer can check; the Leader rendered those pages with PyMuPDF and read them, and all five held. Exact-head CI on `07b800d` was green (`verify`, Cloudflare Pages, GitGuardian) with `mergeStateStatus: CLEAN`.
- Limits: reviewer children inspect extracted page text only, never page images, and reported that limitation explicitly; 8 of the 13 notes therefore rest on text evidence alone. Two writer-lane failure modes cost a round: all four round-1 writers researched and then streamed their report into the truncated final message without ever calling `edit`/`write`, and one re-dispatched writer died because `.agent-work/pshow.sh` only worked from one working directory. Both are fixed at the root (procedure-first brief; the script resolves its own directory).
- Blockers: none for feat-072.
- Next: the operator directed that the batch stop after feat-072. The next selected feature is feat-073 (Review and improve quẻ 21–24 and all twenty-four hào); it has not been activated and no branch exists for it.

## 2026-10-09 — feat-071 reviewed and improved quẻ 13–16

- Status: done; merged to `main` in `67e0565` (PR #99), squash-merged at the exact reviewed head `c5e78bf6c4be0b8e0f552bacd1a3efe61f1b9b79`.
- Result: reviewed and improved all four assigned quẻ (13 Thiên Hỏa Đồng Nhân, 14 Hỏa Thiên Đại Hữu, 15 Địa Sơn Khiêm, 16 Lôi Địa Dự) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy (the last two via “Ngô Tất Tố — dịch và chú giải”). Author-specific readings are kept distinct rather than harmonised and unresolved readings stay explicit. The legacy `section` and `printedPages` reference fields are gone from these four records; two reference ranges were widened where the cited passage continued onto a neighbouring page (`hexagram-14.json` `[308,309]` → `[306,309]`; `hexagram-15.json` `[317,317]` → `[316,317]`).
- Defect class: **author-layer padding** — a writer working to a per-hào length target filled the short Nguyễn Hiến Lê layers with other commentators' explaining clauses, causal connectives, general premises and degree words. Seven review rounds found 10, 5, 11, 10, 15 and 18 instances; 69 clauses were removed and replaced with the source's own wording. The class did not converge under spot-fixing, because each broader audit found it in cells a narrower one had cleared.
- Acceptance bar: after six non-converging rounds the operator fixed the governing standard — the **written acceptance criteria** (correct book/page references and no invented content), with a Vietnamese degree or superlative word where the source gives none treated as a style difference rather than a defect. All eighteen round-6 findings and the two baseline-era dispositions (`E01`, `E02`) were applied anyway. This is the only decision in the feature that changes what “pass” means and it now governs the rest of the batch.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. Round 6 was the first fully exhaustive audit (all 112 attributed entries, 94 clean, plus 4 introductions and 8 notes); round 7 was verification-only and returned **PASS**, no P0, confirming all twenty corrections landed and the acceptance bar holds.
- Limits: reviewers inspected extracted page text, not page images, and did not execute the test commands; the baseline-vs-final invariant comparison (0 of 4 files changed invariant fields, all line tuples unchanged) is Leader-generated.
- Blockers: none for feat-071.
- Next: activate feat-072 (Review and improve quẻ 17–20 and all twenty-four hào) from `main` at `67e0565`, using the writer and review briefs in `.agent-work/batch-writer-brief.md` and `.agent-work/batch-review-brief.md`.

## 2026-10-09 — feat-070 reviewed and improved quẻ 09–12

- Status: done; merged to `main` in `9162858` (PR #98), squash-merged at the exact reviewed head `69375fd9b1f7d76046fd66a497e9874e3dd45ba3`.
- Result: reviewed and improved all four assigned quẻ (09 Phong Thiên Tiểu Súc, 10 Thiên Trạch Lý, 11 Địa Thiên Thái, 12 Thiên Địa Bĩ) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy (the last two via “Ngô Tất Tố — dịch và chú giải”). Author-specific readings are kept distinct rather than harmonised, unresolved readings stay explicit, and seven `notes[]` entries record genuine source discrepancies with page locators.
- Model: removed the legacy `section` and `printedPages` reference fields from these four records. Of the twelve `condition` values dropped from quẻ 09 and 11, the two that carried substance moved into attributed prose; the rest were authoring boilerplate that `docs/product-specs/knowledge-quality.md` forbids repeating.
- Evidence: `./init.sh` passed (181 core tests + 97 knowledge tests; format, lint, typecheck, build, package exports). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. Four independent read-only review rounds: round 1 found 6 P1 and 4 P2; rounds 2–3 confirmed each fix and raised four further P2s in total; round 4 returned no findings.
- Limits: reviewers inspected extracted page text, not page images, and did not execute the test commands; the baseline-vs-final invariant comparison (0 deviations, all 24 position/polarity/label tuples unchanged) is Leader-generated.
- Blockers: none for feat-070.
- Next: activate feat-071 (Review and improve quẻ 13–16 and all twenty-four hào) from `main` at `9162858`.

## 2026-10-09 — feat-068 completed: simplified linked knowledge

- Design approved. Migrated 381 canonical records to coherent entries, direct book/page references, and stable record/line/section links.
- Removed claim/citation registries, review/hash ledgers, audit gates, source-unit inventories, and the committed monolithic release. Git retains prior history.
- Rebuilt Càn, Khôn, Truân, Mông and 24 positions with distinct author views. Added source-checked Chu Hy Khôn views; retained the unlocated NTT Mông referral.
- Detailed assets load by ID; compact metadata supports lookup/search. Node access, tables, worked examples, and current calculation behavior remain usable.
- JavaScript: 832.67 KB raw / 232.14 KB gzip. Full offline precache: 5,346.54 KiB raw; 381 record assets included.
- Verification: ./init.sh passed (181 core + 85 knowledge tests). Knowledge suite: 1.86 seconds versus 151.75 seconds at the main baseline. Corpus freshness and four supplied-PDF checks passed.
- Direct browser checks covered offline routes/search/reload with the server stopped, interrupted-load recovery, articles, source references, and mobile hào anchors.
- Documentation now describes the implemented model; the source guide was reduced to the supplied inventory, core discrepancies, and canonical-record routes.
- Status: done; no blockers and no dependent feature activated. Source gaps remain record-level notes.
- Handoff: [feat-068](features/feat-068.md). Changes remain uncommitted on feat/068-knowledge-simplification. Old branch remains unchanged at c80c38d.

## 2026-10-09 — feat-068 pull request delivery

- User requested a pull request into main from feat/068-knowledge-simplification.
- Prepared the completed implementation and documentation for commit and branch publication.
- Status remains done; merge is the next delivery action. No dependent feature has been activated.

## 2026-10-09 — feat-068 PR #96 review repairs

- Reproduced malformed-asset acceptance, duplicate rendered targets, and omitted table/figure sources with focused regression cases; corrected all three.
- Loader uses the authored schema through a generated standalone validator. It loads with the selected asset, preserves failed-load retry, and adds a separate 14.11 KB gzip chunk.
- Shared table IDs resolve consistently in validation and rendering. Metadata and compatibility references include every figure reference layer and tables.
- Direct browser checks confirmed collapsed-entry deep links, custom table targets, malformed Mông recovery, mobile layout, and first-use offline validator loading after stopping the server.
- Evidence: final ./init.sh passed (181 core + 97 knowledge tests; knowledge 2.14 seconds). Corpus/source freshness, Node access, 619 local links, and diff checks passed.
- Initial JavaScript: 832.86 KB raw / 232.47 KB gzip. Full precache: 400 build entries, 5,473.54 KiB raw. Authored corpus content remains unchanged.
- Status: done. Repairs are prepared on the existing PR branch; merge remains pending. No dependent feature was activated.

## 2026-10-09 — feat-069 reviewed and improved quẻ 05–08

- Status: done; reviewed and verified against supplied books.
- Result: Reviewed and improved all four assigned quẻ (05 Thủy Thiên Nhu, 06 Thiên Thủy Tụng, 07 Địa Thủy Sư, 08 Thủy Địa Tỷ) and all twenty-four hào positions under the simplified knowledge model.
- Content updates:
  - Cleaned legacy `section` and `printedPages` fields across all four hexagrams; preserved required entry IDs in quẻ 06 for lesson link resolution.
  - Enriched structural and thematic overviews across NHL, PBC, and NTT with distinct viewpoints (General, Nguyễn Hiến Lê, Phan Bội Châu, Trình Di, Chu Hy).
  - Added and checked Chu Hy classical commentaries across overview entries and individual hào positions (quẻ 05 line 1, lines 2–6; quẻ 06 lines 1–6; quẻ 07 lines 1–6; quẻ 08 lines 1–6).
  - Polished Vietnamese prose for natural readability, philosophical precision, and adherence to traditional I Ching doctrine.
- Evidence: `./init.sh` passed 100% (181 core tests + 97 knowledge tests; knowledge suite ran in 2.15s). Full corpus validation with `--check-books` verified 381 records and all 4 supplied PDF fingerprints.
- Coverage: All 4 assigned quẻ and 24 hào positions have complete, verified coverage.
- Blockers: none for feat-069.
- Next: User selection and activation of feat-070 (Review and improve quẻ 09–12 and all twenty-four hào).

## 2026-10-08 — feat-068 simplified knowledge design

- Status: active; written design complete, implementation pending design review.
- Result: Started feat/068-knowledge-simplification from main. Replaced audit-first contracts with coherent JSON entries, direct book/page references, stable links, and small generated assets. Aligned future feature routes and marked old contracts historical.
- Recovery: Preserved feat/068-audit-hexagrams-01-04 at c80c38d; existing writing remains recoverable.
- Evidence: Baseline and post-documentation ./init.sh passed (181 core + 6,197 knowledge tests). Corpus/source freshness and 437 local documentation links passed.
- Limitations: Runtime, authored data, and the large generated release still use the old implementation. No simplified payload or rebuilt quẻ is claimed.
- Next: Review docs/design-docs/knowledge-model.md, implement the storage/runtime migration, then rebuild Càn, Khôn, Truân, and Mông.

## 2026-10-07 — feat-066 merged

**State**: done; merged to `main` in PR #95 at `46af5cd9069c061ecd2986df1f6e1d220138da9d`; exact reviewed head `54977cc614c22041f62fddd61f18ffb7a2fa2ca2`.
**Done**: Added a deterministic authoring crosswalk joining source units, expected-unit groups, released records, commentary routes, topics, legacy state, exclusions, and `nextBatch`. It reports 4,488 selected-only groups,108 unmapped content groups,42 non-content groups, and all4,638 discovery states unresolved. All17 existing exclusions are linked to basis units, but their rationale reviews remain pending. All381 released records are accounted for; 254 have direct mappings and127 remain unmapped and routed to feat-094. No source records, claims, citations, or exclusions were added.
**Evidence**: Fresh exact-head review returned `OK`, no findings. Verify run `37599352568`/job `112719642987`, Cloudflare Pages, and GitGuardian passed. The pre-push `./init.sh` passed6,378 tests (6,197 knowledge,181 core); corpus/source fingerprint, package-export and focused18-test checks passed. The generated 3.6MiB report remains under `packages/knowledge/reports/`, outside runtime/PWA. The repository's auto-delete-on-merge setting was temporarily disabled to preserve the feature branch and restored to `true`; remote feature ref remains at the reviewed head.
**Coverage**: All64 quẻ have six positions across each of three commentary books (1,152 cells). BPCT chapter6 labels1–16 and25–56 remain without direct mappings;17–24 and57–69 are mapped only to their selected records. `topic-classical-traditions` remains pending despite23 released records, routed to feat-094. Source discovery, audit, specialist review, and certification remain open/incomplete; no complete passage coverage or certification is claimed.
**Blockers**: none for feat-066.
**Next**: Continue with selected feat-068 from updated `main`.

## 2026-10-07 — feat-065 merged

**State**: done; merged to `main` in PR #93 at `8be7513287bbc642990d87f0c853249214b03244`; reviewed exact head `133009eda92d3f9e146f88999770c7ede3a10ca4`.
**Done**: Added four ordered V2 lessons with 17 original Vietnamese blocks supported by existing released, reviewed claims, and three independently checked worked examples. No new claims, citations, book source units, or source exclusions were added.
**Evidence**: Independent exact-head review returned `OK WITH NOTES` with no P0–P2 findings. Verify run `37586251857`/job `112676934117`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed 6,360 tests (6,179 knowledge, 181 core); corpus/books, package-export, deterministic core/table checks and prior-corpus preservation passed. Only lesson V2 may have an empty `claims` array; non-lesson V2 and V1 claim requirements remain unchanged.
**Coverage**: Release has381 records,9,503 claims,9,744 citations; all377 prior records and9,744 citations are preserved. Source inventory and expected-units registry are unchanged. Required audit targets increase from6,471 to6,492 only for four lesson owners and17 blocks; feat-093 remains outstanding. The12,667,914-byte asset remains under the13 MiB Workbox cap with963,574 bytes headroom; all18 precache entries remain. Global source review, audit, verification and certification remain open/incomplete; no independent audit or certification is claimed.
**Blockers**: none for feat-065.
**Next**: Continue with selected feat-066 from updated `main`.

## 2026-10-07 — feat-064 merged

**State**: done; merged to `main` in PR #92 at `681faef23facdb2b621019f4d752b2e50ae008b7`; reviewed exact head `6acf20dd0777b3e5217885f440c2c7f415547953`.
**Done**: Migrated four terms and two rules from the unaudited legacy catalog to V2 project-convention records, preserving all six stable IDs, with no invented book citations or source units. Updated the domain-model result fields to document the already-existing `ReadingResult.ruleset`.
**Evidence**: Independent exact-head review returned `OK`, no findings. Verify run `37577158278`/job `112648505629`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed 6,339 tests (6,158 knowledge, 181 core); corpus/books validation, typecheck, package exports, 94 focused tests and prior-corpus preservation checks passed. V2 schema regression coverage accepts project `evidenceClaimIds` without weakening book-citation gates; V1 schema is unchanged.
**Coverage**: Release has 377 records/9,503 claims/9,744 citations; all371 prior records and citations are preserved. Source inventory and expected units remain unchanged (revision57, 4,638 groups, 17 exclusions). The 12,647,813-byte bundle remains under the 13 MiB cap, with all18 precache entries. Source audit, global source review and certification remain open/incomplete.
**Blockers**: none for feat-064.
**Next**: Continue with selected feat-065 from updated `main`.

## 2026-10-07 — feat-063 merged

**State**: done; merged to `main` in PR #91 at `7ecd2c127895dab81890d40250ec7168fb1ab48f`; reviewed exact head `89b36378161e1e2fd66449fc0a0b482aee27f705`.
**Done**: Added edition-specific Càn/Khôn special-passage summaries for three editions across six owners, with 260 new original claims and261 exact-edition citations. All94 assigned pages were individually inspected. Added281 child dispositions/287 audit groups routed feat-063→feat-068; explicitly defer PBC Càn Văn Ngôn PDF43–57. Special passages remain outside the six-position line inventory.
**Evidence**: Fresh exact-head review returned `OK`, no findings. Verify run37572313369/job112633450697,Cloudflare Pages and GitGuardian passed. Post-optimization and pre-push `./init.sh` passed6,321 tests (6,140 knowledge,181 core); focused generator suite passed7 tests in69.79s. All120s test/setup and30s child timeouts and assertions remain intact. Corpus/books validation,package exports/preservation,201 local documentation routes and offline precache checks passed.
**Coverage**: Corpus has371 records/9,497 claims/9,744 citations and registry revision57 with4,638 groups/17 exclusions. Snapshot identity is `liuyao-knowledge-snapshot-v1:sha256:ae4cf07c76db4ea1a863c21222c3bf6506afa90e423d4c006a2a56b887b68854`. The12,641,410-byte integrated bundle fits the13 MiB Workbox cap by990,078 bytes; all18 precache entries remain. Audit068,global source/layer review and certification remain closed/incomplete. PBC year/rights and the explicitly deferred scope remain unresolved. No efficacy or modern advice is claimed.
**Blockers**: none for feat-063.
**Next**: Continue with selected feat-064 from updated `main`.

## 2026-10-07 — feat-062 merged

**State**: done; merged to `main` in PR #90 at `f08dd82241cf505c3e00c9b69497ea8d63ccadb0`; reviewed exact head `2d65e1e28aadb1ceb98c5326b5c740e1f7e95242`.
**Done**: Added24 articles for NHL Hệ Từ Hạ PDF363–388 and PBC PDF631–648, with370 source-attributed claims/citations and370 child dispositions. All44 assigned pages were individually image-inspected and recorded. NHL and PBC states remain distinct; PBC's `lược trích`, missing sections and referrals are not transferred to NHL or reconstructed.
**Evidence**: Independent exact-head review returned `OK with notes`, no findings. Verify run `37562090969`/job `112601424630`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed6,027 tests (5,846 knowledge,181 core); corpus/books validation, package exports, preservation,376 focused cases and199 offline documentation-route checks passed.
**Coverage**: Release now has371 records,9,237 claims,9,483 citations; all347 prior records and9,113 citations remain byte-identical. Registry revision56 has4,351 groups and17 exclusions. The12,364,549-byte integrated JS remains under the unchanged12 MiB cap by218,363 bytes; all18 precache entries remain. Audit092, global source review, corpus verification/certification and rights remain unresolved/closed. No source attachment coverage, efficacy or modern advice is claimed.
**Blockers**: none for feat-062.
**Next**: Continue with selected feat-063 from updated `main`.

## 2026-10-07 — feat-061 merged

**State**: done and merged to `main` in PR #89 at `eb66085cc62686686e388e23e7a2b5e4ba5f9ac4`; reviewed exact head `125a3a4928d3c917db3338a1bfa9df28bd5a13f7`.
**Done**: Added 26 source-comparison records for Hệ Từ Thượng across NHL PDF 334–362 and PBC PDF 601–630, with 430 source-attributed claims/citations. NHL and PBC dispositions remain edition-specific; no NTT (Ngô Tất Tố) text or citation is used. PBC's explicit missing notices, partial sections and cross-references are preserved without reconstruction.
**Evidence**: Independent exact-head review returned `OK`, no findings; it reconciled 50 paths from base `6139d39`, including the parent-owned activation change. Verify run `37556788220`/job `112584763898`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed 5,651 tests (5,470 knowledge, 181 core); corpus/books, focused 436 cases, package exports, preservation and 194 offline documentation-route checks passed.
**Coverage**: Total corpus is 347 records/8,867 claims/9,113 citations; prior 321 records/8,683 citations and public projections are byte-identical. Registry revision55 has3,981 groups and17 exclusions. The 11,892,554-byte integrated asset fits the measured 12 MiB Workbox cap by690,358 bytes; all18 precache entries remain. Source audit092, global source review and certification remain closed/incomplete; no efficacy or modern advice is claimed.
**Blockers**: none for feat-061.
**Next**: Continue with selected feat-062 from updated `main`.

## 2026-10-07 — feat-060 merged

**State**: done and merged to `main` in PR #88 at `d082eeaad74affb181ec3f1904e312fd35f4a436`; reviewed exact head `e2304267076afb81115c99c6fafd101f021fa29e`.
**Done**: Added 23 NTT/PBC source-comparison articles with 487 new claims/citations, 489 dispositions including two reused selections, and 18 visually inspected V2 figures with 235 supported labels. PBC scope includes PDF 1–26 and 649–655 after user approval to align with the canonical Phàm Lệ/Cương Lĩnh inventory; NTT scope is PDF 1–79 and 938. NTT PDF 79's heading and substantive Giải Nghĩa prose are separate dispositions; PDF 80 remains out of scope.
**Evidence**: Independent exact-head review returned `OK`, no findings. Verify run `37549113356`/job `112560098877`, Cloudflare Pages and GitGuardian passed. Pre-push and post-merge `./init.sh` passed 5,215 tests (5,034 knowledge, 181 core); `validate:corpus --check-books --check`, package-export/types and production-preservation checks passed. Post-merge validation added `.codegraph/` to `.prettierignore` after Prettier attempted to read a missing transient `codegraph.lock` in local ignored CodeGraph state. The 11,346,876-byte asset fits the unchanged 11 MiB Workbox cap with 187,460 bytes headroom; all 18 precache entries remain.
**Coverage**: Existing 298 released records and 8,196 citations are preserved; total release is 321 records/8,437 claims/8,683 citations. Note 13 and note 21 stay under existing PBC quẻ owners. PBC's missing-wing notices and NTT's lack of a separate full Hệ Từ appendix are recorded without reconstructing text. Source audit 092, global source review, and certification remain open; their approval gates remain closed. PBC year/rights remain unconfirmed. No efficacy or modern advice is claimed.
**Blockers**: none for feat-060.
**Next**: Continue with selected feat-061 from updated `main`.

## 2026-10-06 — feat-059 merged

**State**: done and merged to `main` in PR #87 at `b474aeb74bdabad5448b482e253993bbdd7c983f`; reviewed exact head `68d44f5a4610cf8a9ed7e36bd9697142d1a3a591`.
**Done**: Added NHL foreword and chapters 1–7 (PDF 10–126), Part II framing (127–130), retrospective (389–392), and explicit front-matter/blank-page accounting. Eleven records contain 208 new source-attributed claims/citations, 213 child dispositions and five reused selections. Disputed traditional authorship, quoted voices, diagram/text differences, and orphan note markers remain attributed rather than repaired or inferred.
**Evidence**: Independent exact-head review returned `OK`, no findings. Verify run `37518032396`/job `112455890038`, Cloudflare Pages, and GitGuardian passed. Pre-push `./init.sh` passed 4,719 tests (4,538 knowledge, 181 core); `validate:corpus --check-books --check`, package-export/type, and prior-corpus preservation checks passed. The measured 10,666,746-byte asset fits the 11 MiB Workbox cap with 867,590 bytes headroom; all 18 precache entries remain.
**Coverage**: The supplied 393-page edition matches SHA-256 `9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e`. Prior 287 authored records, 41 citation collections, 7,988 public citations, all 17 exclusions, and existing layer/cell rosters remain unchanged. Existing Hệ Từ Hạ 12 registry bounds are reconciled to PDF 386–388 without adding feat-059 claims or changing feat-062 ownership. Source audit 092, global review, verification/certification, publication year and rights remain open or unconfirmed. No efficacy or modern advice is claimed.
**Blockers**: none for feat-059.
**Next**: Continue with selected feat-060 from updated `main`.

## 2026-10-06 — feat-058 merged

**State**: done and merged to `main` in PR #86 at `914bef4d7e98bd5784303a00cf37261b01e9abbe`; reviewed exact head `93f9e943fe0b0a2fe2b3c995b5b2f9ea38fe2fdf`.
**Done**: Published 19 BPCT casting-supplement and criticism records for PDF 429–466, with 328 new source-attributed claims/citations and 329 dispositions including one reused note. Preserved source layers, repeated/conflicting labels, unprinted sections and differing printed folios without inference.
**Evidence**: Independent exact-head review returned `OK`, no findings. PR verify run `37504128763`/job `112408327418`, Cloudflare Pages, and GitGuardian passed. The pre-push `./init.sh` passed 4,499 tests (4,318 knowledge, 181 core); corpus validation and package-export/preservation checks passed. The 10,384,705-byte integrated asset fits the 10 MiB Workbox cap with 101,055 bytes headroom; all 18 precache entries remain.
**Coverage**: Section II's title claims 64 hexagrams/384 lines, but the supplied pages show only eight named entries/48 rows before IV. The other56 obligations remain unresolved pending source audit/edition reconciliation; they are not represented as source-reported omissions or invented entries. The cohort adds325 registry units; 445 obligations total with389 mapped. Source audit feat-091, global review, and certification remain open; no efficacy or modern medical/legal/safety advice is claimed.
**Blockers**: none for feat-058.
**Next**: Continue with selected feat-059 from updated `main`.

## 2026-10-06 — feat-057 merged

**State**: done and merged to `main` in PR #85 at `1e1a5d53ecabd3344cd41c15cecc32068819ee0b`; reviewed exact head `2e69eef1250f202f34be7e8244c1e8a0790201a3`.
**Done**: Added 18 BPCT questions, the unsigned moving-lines insertion, and Hà Tri Chương items 1–60 (PDF 365–428): 20 records, 608 new claims/citations, 611 locator dispositions plus one insertion parent. PDF 413 is an image-checked folio-only page. Preserved examples, translator disagreements, incomplete numbering, and source uncertainty; retained prior selected Q5, Q6, Q10, Q12–14 claims.
**Evidence**: Independent exact-head review returned `OK`, no findings. PR verify run `37494127883`/job `112374155807`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 4,163 tests (3,982 knowledge, 181 core); `validate:corpus --check-books --check`, package-export checks, and generator freshness passed. Integrated asset 9,862,515 bytes under the 10 MiB Workbox cap with 623,245 bytes headroom; all 18 precache entries remain.
**Coverage**: Added 612 registry groups (611 mapped dispositions plus one insertion parent), bringing the total to 2,536. Prior 248 records, 6,806 claims, 7,052 citations, 17 exclusions, and 19 layer rosters remain semantically unchanged. feat-091 audit remains 0/813; global source audit and corpus certification remain open. No efficacy or modern medical, legal, or safety authority is claimed.
**Blockers**: none for feat-057.
**Next**: Continue with selected feat-058 from updated `main`.

## 2026-10-06 — feat-056 merged

**State**: done and merged to `main` in PR #84 at `bf6b0c09a5fe800259c5e7e59dd8a21166c08f8c`; reviewed exact head `2d4fa7b702754f9a380424935095e1a5ef109f0a`.
**Done**: Added nine source-compared BPCT application chapters 27–35 (PDF 302–364), with 294 child units and 813 claim-specific citations. Preserved source gaps, repeated labels, truncations, translation disagreements, and attribution uncertainty without reconstructing missing content or adding modern advice.
**Evidence**: Fresh exact-head independent review returned `OK`, no findings. PR-head verify run `37481096035`/job `112329099531`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 3,547 tests (3,366 knowledge, 181 core); corpus validation and generated package checks passed. Integrated asset 8,848,657 bytes under the 9 MiB Workbox cap with 588,527 bytes headroom; all 18 precache entries remain.
**Coverage**: The 294 child units and nine chapter parents remain routed to feat-090; source audit and corpus certification remain open. Prior records, exclusions, and layer rosters remain unchanged; no efficacy, medical, legal, or safety authority is claimed.
**CI adjustment**: Three synthetic audit-test deadlines increased from 20/45/25 seconds to 90 seconds after measured CI runtimes exceeded the originals; assertions and child-process timeouts are unchanged. After CI reported `[vitest-worker]: Timeout calling "onTaskUpdate"` despite all tests passing with two workers, the knowledge test command was changed to one worker; final PR checks passed.
**Blockers**: none for feat-056.
**Next**: Continue with selected feat-057 from updated `main`.

## 2026-10-06 — feat-055 merged

**State**: done and merged to `main` in PR #83 at `d0848eb7de6e776b8e421acc21f53fa209ee7e2d`; reviewed head `ddc8c1932a62e00752bc6e7b6b3b09f31a3e8220`.
**Done**: Added four source-compared BPCT application articles for chapters 23–26 (PDF 270–301), with 145 child units and 379 claim-specific citations. Preserved chapter layers and notes, question roles, source disagreements, and missing/repeated labels. PDF 279 remains a folio-only non-content disposition.
**Evidence**: Independent exact-head review returned `OK`, no P0–P2 findings. PR-head verify run `37463702490`/job `112269320088`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 3,245 tests (181 core, 3,064 knowledge); corpus validation passed for 239 records, 5,993 claims, and 6,239 citations. Prior 235 records and 5,614 claims remain semantically unchanged. The 7,613,685-byte integrated asset fits the 8 MiB Workbox cap with 774,923 bytes reserve; all 18 precache entries remain.
**Coverage**: 150 source obligations, including 145 child units, four chapter parents, and PDF 279, remain assigned to feat-089 audit. Source audit and corpus certification remain open; no efficacy or medical, legal, or travel advice is claimed.
**Blockers**: none for feat-055.
**Next**: Continue with selected feat-056 from updated `main`.

## 2026-10-06 — feat-054 merged

**State**: done and merged to `main` in PR #81 at `7a9ceec25f5032f193149eab5894c768f126f4de`; reviewed PR head `f8530256ce39960ef64660f05b6e8a56eb929547`.
**Done**: Added four source-compared BPCT Part I records for chapter 20 housing, its supplement, chapter 21 boats, and chapter 22 Xướng Gia (PDF 231–269): 494 claims/citations and 185 mapped child obligations. Preserved overlapping folios, actual layer boundaries, source gaps and uncertainties, and unresolved feat-088 audit obligations. Corrected the historical feat-053 handoff sentence in `docs/references/book-sources.md`.
**Evidence**: Independent exact-head review returned `OK`, no P0–P2 findings. PR-head CI run 37447755511/job 112216577067, Cloudflare Pages, and GitGuardian passed. Parent `./init.sh` passed 3,093 tests (181 core, 2,912 knowledge); corpus freshness and package exports passed. Integrated asset 7,112,047 bytes under the 7,340,032-byte Workbox cap; all 18 precache entries remain. All 231 prior released records and 5,366 citations remain semantically unchanged. The independent review's initial path attribution error was corrected in its addendum; the verdict remained OK.
**Coverage**: 185 children and four parent obligations remain unresolved for feat-088. Global source-review, audit, and certification obligations remain open. No efficacy, safety advice, rights clearance, or corpus certification is claimed.
**Blockers**: none for feat-054.
**Next**: Continue with selected feat-055 from updated `main`.

## 2026-10-06 — feat-053 merged

**State**: done and merged to `main` in PR #80 at `b4f3ccf42fdb0f80e8ff116ef14af7e5e6282f82`; reviewed PR head `d9b080c03c8780f1eff713bed4f678bb4b9f9eda`.
**Done**: Published seven BPCT Part I chapters 13–19 records with 760 source-compared claims/citations and 276 child source dispositions. Individually inspected PDFs 190 and 222 are folio-only; chapter 15 closes on 189 and chapter 18 item 42 ends on 221. Parent page intervals remain unchanged.
**Evidence**: Fresh exact-head independent review returned `OK`, no findings. PR-head CI run 37435012519, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 2,901 tests (181 core, 2,720 knowledge); corpus freshness and package-export checks passed. Final asset 6,458,670 bytes fits the 6,553,600-byte Workbox per-file cap; all 18 assets remain precached. To address measured CI contention on the expanded registry, knowledge tests use serial file scheduling at two workers and two case-specific timeouts were raised; assertions and the generator child-process timeout remain unchanged.
**Coverage**: 276 children and seven parent obligations remain discovery/audit-unresolved for feat-087; source review and certification gates remain closed. Prior 224 records and 4,606 citations remain semantically unchanged. Contact-sheet inspection limits and source ambiguities are documented; no efficacy or clinical/safety authority is implied.
**Blockers**: none for feat-053.
**Next**: Stop here as requested; wait for the user's explicit direction before starting feat-054.

## 2026-10-06 — feat-052 merged

**State**: done and merged to `main` in PR #79 at `a01d4d3d94d91196cd8c220c435dd8e4a2e7e77a`.
**Done**: Published six BPCT application units: chapter 7 Thiên Thời, unnumbered Niên Thời, and chapters 9–12. Added 941 source-compared claims/citations and mapped 399 child dispositions beneath the existing six parent intervals. Corrected the chapter 12 close to PDF 164 and recorded PDF 165 as folio-only non-content.
**Evidence**: Exact-head independent review returned `OK WITH NOTES`, no P0/P1/P2 findings. PR-head `verify` run 37423315939, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 2,342 tests (2,161 knowledge, 181 core); corpus `--check-books --check` and package-export checks passed. Workbox cap is measured at 5,570,560 bytes for the 5,523,385-byte integrated asset; all 18 precache entries remain.
**Coverage**: Historical divination outcomes remain attributed claims, not efficacy evidence. Source review and certification gates remain open; contact-sheet inspection limits are recorded, and full-size inspection of every page is not claimed.
**Blockers**: none for feat-052; unattributed layers and source discrepancies remain explicitly documented.
**Next**: Continue with selected feat-053 from updated `main`.

## 2026-10-06 — feat-051 merged

**State**: done and merged to `main` in PR #78 at `2d30586b7989c255209750b0bac23cd9efca30aa`.
**Done**: Published BPCT front matter and Part I chapters 1–5 (PDF 1–76), including all 64 annotated boards, all 18 chapter 5 discussions, and the distinct unnumbered postscript. Added 15 V2 records, 960 claims/citations, and dispositions for 196 assigned obligations while preserving earlier released records and citations.
**Evidence**: Exact-head independent reviews returned `OK WITH NOTES` with no P0/P1/P2 findings; final reviewed branch head `b98e555a476a130c5a3d83dab741555f547f3c36`. PR-head `verify` run 37417899865, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 544 tests (363 knowledge, 181 core); corpus `--check-books --check` and package-export checks passed. Knowledge test concurrency is capped at two workers after two CI runs exposed timeout/RPC contention; full verification and exact-head checks now pass.
**Coverage**: Workbox precaches all 18 assets; integrated main asset 4,413,242 bytes under the measured 4,456,448-byte cap, leaving 43,206 bytes. Corpus source review and certification remain incomplete; no full-corpus audit or certification is claimed.
**Blockers**: none for feat-051. Source ambiguities and unattributed layers remain explicitly recorded.
**Next**: Continue with selected feat-052 from updated `main`.

## 2026-10-06 — feat-050 merged

**State**: done and merged to `main` in PR #77 at `51bcdb956aacd434c7bceeb3893f10458db00eee`.
**Done**: Added complete source-compared verse, Vietnamese meaning, commentary, notes, and closing for BPCT chapter 6 sentences 57–69. Reconciled all 13 unit dispositions and extended page-continuation bounds without changing prior released content.
**Evidence**: Exact-head independent review returned `OK` with zero P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 512 tests; corpus validation passed with 203 records, 2,459 claims, and 2,705 citations. Package-export and service-worker inclusion checks passed. See [feat-050](features/feat-050.md).
**Coverage**: BPCT chapter 6 authoring now reaches sentence 69. Corpus audit and certification remain open. Workbox cap remains 3,211,264 bytes, with 20,077 bytes measured headroom.
**Blockers**: none for feat-050.
**Next**: Continue with selected feat-051 from updated `main`.

## 2026-10-06 — feat-049 merged

**State**: done and merged to `main` in PR #76 at `c6357316a47d10ae9c1c143f2291d5bd0f9836fc`.
**Done**: Added source-compared quẻ 61–64 and BPCT chapter 6 sentences 49–56, registered 64 reviewed hexagrams, retired remaining legacy entities, and recorded source limitations. Raised only the measured Workbox per-file cap; all 18 entries remain precached.
**Evidence**: Exact-head independent review returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 493 tests; corpus validation passed with 202 records, 2,398 claims, and 2,662 citations. Package-export and service-worker inclusion checks passed. See [feat-049](features/feat-049.md).
**Coverage**: 64/64 quẻ and 384/384 positions have selected source-compared coverage. Corpus audit and certification remain open; contact-sheet review is not full-size inspection of every classical page.
**Blockers**: none for feat-049.
**Next**: Continue with selected feat-050 from updated `main`.

## 2026-10-06 — feat-048 merged

**State**: done and merged to `main` in PR #75 at `b662861d63ac65f167ed871f93cd890f5f7fface`.
**Done**: Added reviewed quẻ 57–60 and BPCT chapter 6 sentences 41–48, updated source inventory and release coverage, retired four legacy records, and retained offline precaching. Added the repository rule for measured Workbox per-file limit increases driven by knowledge growth.
**Evidence**: Exact-head independent reviews returned `OK WITH NOTES`, with no P0/P1/P2 findings. PR-head `verify`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed 482 tests; corpus `--check-books --check` passed with 197 records, 2,207 claims, and 2,392 citations; package-export checks passed. See [feat-048](features/feat-048.md).
**Coverage**: 60/64 quẻ and 360/384 line positions. Corpus-wide specialist audit and certification remain open.
**Blockers**: none for feat-048.
**Next**: Continue with selected feat-049 from updated `main`.

## 2026-10-06 — feat-047 merged

**State**: done and merged to `main` in PR #74 at `6d9a7a00e0063e65629ddb3604bab7f4664f79ca`.
**Done**: Added source-compared quẻ 53–56 and BPCT chapter 6 sentences 33–40, citations, attribution, source discrepancies, inventory routes, cohort tests, generated outputs, and legacy retirement. Applied the user-authorized Workbox cap adjustment for this measured cohort and raised two test-only timeouts after exact-head CI exposed limits under runner load.
**Evidence**: Final PR head `08efc247ca2559591e5de8d04f7238c38a70e4f1` passed GitHub `verify`, Cloudflare Pages, and GitGuardian. Fresh independent review at both integration and final PR heads returned `OK WITH NOTES`, with no P0/P1/P2 findings. `./init.sh` passed with 472 tests; corpus `--check-books --check` passed with 192 records, 2,017 claims, and 2,123 citations. See [feat-047](features/feat-047.md); review reports `feat-047-final-independent-review.md` and `feat-047-ci-timeout-review.md` remain in the session artifact store.
**Coverage**: 56/64 quẻ, 336/384 line positions. Full-corpus specialist review and certification remain separate open gates.
**Blockers**: none for feat-047. The 2,686,976-byte Workbox cap leaves 71,384 bytes for this cohort; no authorization for later cap changes is inferred.
**Next**: Continue at feat-048 from updated `main`; measure the integrated asset and obtain authorization before any further cap increase.

## 2026-10-06 — feat-049 authored source-compared batch

- Status: active; implementation complete, final verification pending.
- Result: Added quẻ 61–64 with all 24 positions and actual author layers, plus BPCT 49–56 with separate verses/commentaries and notes 10–11. Preserved eight NTT notes, named/anonymous supplements, source discrepancies and missing text. Removed only the four remaining legacy entities without changing IDs.
- Evidence: Baseline full verification passed 482 tests and source fingerprints; package tests now pass 312. Coverage is 202 records, 2,398 claims, 2,662 citations, 64 quẻ and 384 positions. Inventory and registry revision/hash reconcile only this batch.
- Offline: Measured integrated main asset 3,113,895 bytes exceeded prior 2,949,120 cap. Authorized measured increase to 3,211,264 keeps all 18 entries precached with 97,369 bytes reserve; no other PWA behavior changes.
- Limitations: Source comparison is not corpus certification. Missing/ambiguous passages, layer rosters, remainder and independent verification stay open. No medical, gender, ritual, calendar, scoring or automatic-interpretation authority added.
- Next: Finish full verification, exact package-export evidence and diff inspection, then close feat-049.

## 2026-10-06 — feat-049 completed local acceptance and verification

- Status: done; independent branch acceptance review remains the handoff gate, not corpus certification.
- Result: Final classical authoring slots complete: 64 quẻ and 384 positions have selected source-compared coverage. BPCT 49–56 preserves all numbered verse/commentary layers and notes 10–11; actual absent commentary and source limitations remain explicit.
- Commit: Implementation `0bd626a7406f7e26b01e820f54ac8afef21574ee`.
- Evidence: Final `./init.sh` passed all checks and 493 tests (181 core + 312 knowledge). `validate:corpus --check-books --check`, format freshness, package-export comparison of five records/191 claims, SW precache inclusion, 153 documentation routes and final diff checks passed. All 197 prior released records and 2,392 prior citations remain semantically unchanged. Worktree had no unrelated changes.
- Offline: `index-DtlSMMtK.js` is 3,113,895 bytes; cap 3,211,264; 97,369-byte reserve. All 18 assets stay precached and other PWA settings stay unchanged.
- Limitations: Contact-sheet review is not full-size review of every classical page. Missing/ambiguous text, unlocated NHL reference, uncredited PBC note and author alternatives are retained without repair. Audit/verification/certification gates stay closed; no full corpus or efficacy approval claimed.
- Next: Independent acceptance review of feat-049; then user selection of feat-050, BPCT chapter 6 sentences 57–69 (PDF 94–100).

## 2026-10-05 — feat-046 merged

**State**: done and merged to `main` in PR #73 at `eb862ff2c5a734dbb8306a7258e1c93b6b5eda16`.
**Done**: Added source-compared commentary for quẻ 49–52 and BPCT chapter 6 sentences 25–32, including citations, attribution, notes, discrepancies, legacy retirement, inventory routes, focused tests, and generated outputs. Applied the explicitly approved Workbox limit/comment change.
**Evidence**: Final PR head `41e05a511de004390c5d56fbc34e310c10321e8d` passed GitHub `verify`, Cloudflare Pages, and GitGuardian. Independent review: `Merge verdict: OK with notes`, no P0/P1/P2 findings. `./init.sh` passed with 461 tests; corpus `--check-books --check` passed with 187 records, 1,806 claims, and 1,833 citations. See [feat-046](features/feat-046.md).
**Blockers**: none for feat-046. Corpus-wide specialist audit/verification and certification remain separate open gates.
**Next**: Continue with selected feat-047 from updated `main`.

## 2026-10-05 — feat-045 merged

**State**: done and merged to `main` in PR #72 at `7e54934af4520ad897fdbb5bdd701053e6e7320f`.
**Done**: Authored and released quẻ 45–48 and BPCT chapter 6 sentences 17–24 with claim-level source citations, attribution, inventory coverage, and tests. Applied the user-authorized narrow Workbox precache threshold adjustment.
**Evidence**: Final PR head `0ede97ad9d8cc57b9d5716d4eb89b147dce31ca5` passed GitHub `verify`, Cloudflare Pages, and GitGuardian. Three fresh independent reviews returned `Merge verdict: OK` with no P0/P1/P2 findings. `./init.sh` passed, including 451 tests; corpus `--check-books --check` passed with 182 records, 1,614 claims, and 1,560 citations. Details are in [feat-045](features/feat-045.md).
**Blockers**: none for feat-045. Corpus-wide independent specialist review and certification remain separate and open.
**Next**: Stop here as instructed; wait for the user's explicit request before starting feat-046.

## 2026-10-05 — feat-044 and feat-078 merged

**State**: Both features are done and merged to `main`.
**Done**: Confirmed feat-044 in PR #66 and feat-078 in PR #67. Their completion records now reflect the merged state; the feat-078 merge prerequisite no longer blocks feat-045.
**Evidence**: Main contains `d14a7b49c03140c938a18acc655693cfa0a0c880` (feat-044) and `52b0c19bdb42102e74048fa44dc26354ad1d8a40` (feat-078). Feature-specific acceptance and verification evidence remains in [feat-044](features/feat-044.md) and [feat-078](features/feat-078.md).
**Blockers**: Corpus-wide specialist review, rights clearance, and certification remain open; they do not block the next authoring feature.
**Next**: Continue the selected sequence at feat-045.

## 2026-10-05 — feat-078 scoped audit finalized

**State**: done for scoped local implementation and audit acceptance; coordinator commit, exact-SHA review, PR, and merge remain pending.
**Done**: Completed independent AI source comparison for four overviews and all 24 positions: 84 current accepted decisions, 308 layer entries, and a 197-claim union. Recorded source errors, exclusions, and remainders explicitly; this is not full-corpus closure.
**Evidence**: Coordinator receipt `sh_10a410857001tx6Qv6i1EXnh2u` passed `./init.sh`, format, lint, corpus `--check-books --check`, and diff checks; 440 tests passed (181 core, 259 knowledge). See the [feat-078 ledgers](features/feat-078.md) and linked four JSON/Markdown records. External ora-44 report found no blockers in scope.
**Blockers**: Specialist review is pending for all 84 decisions; approved decisions remain zero. Global gates remain closed; unresolved source rosters/discovery and certification remain. No full-corpus coverage or rights clearance is claimed.
**Next**: Coordinator commits the exact owned batch and requests exact-SHA review, then opens the PR; do not activate feat-045 before feat-078 merges.

## 2026-10-05 — feat-044 implementation finalized

**State**: done for implementation and local acceptance; exact-SHA review, PR, and merge remain pending.
**Done**: Completed full-source review and attribution-applicability follow-up for the authored quẻ 41–44 and BPCT 12–16 batch; recorded the feature as done without claiming merged delivery or audit completion.
**Evidence**: Coordinator run `sh_10819f80b00103gkUOz5438OgP` passed generation, `./init.sh`, format, lint, corpus `--check-books --check`, and diff checks; 416 tests passed (181 core, 235 knowledge). Full-source review and ora-11/ora-12 findings are recorded in [feat-044](features/feat-044.md).
**Blockers**: Exact-SHA review and PR/merge remain. Audit decisions, audits 078/085, independent specialist approval, rights clearance, and certification remain incomplete.
**Next**: Coordinator commits the explicitly owned batch paths and requests exact-SHA review.

## 2026-10-05 — feat-044 verification handoff

**State**: active; assigned repository verification passed, with final attribution applicability review and delivery gates pending.
**Done**: Removed the Hồ Vân Phong clause from the Chu Hy caution claim; retained its attribution and citation span. Ora-11 accepted the earlier P1–P4 correction snapshot.
**Evidence**: Coordinator shell `sh_10819f80b00103gkUOz5438OgP` passed validator refresh, `./init.sh`, format check, lint, corpus `--check-books --check`, and diff checks. Tests: 416 (181 core, 235 knowledge). Corpus: 177 records, 1,395 claims, 1,265 citations, 44 released quẻ, and 264 line positions. Four nonfatal web lint warnings and build font, sourcemap, and chunk warnings remain.
**Blockers**: Fresh ora-12 review of the one-claim attribution delta is pending. Audits 078/085, independent specialist approval, and certification remain incomplete.
**Next**: Reconcile ora-12's attribution applicability review, then proceed with coordinator commit, exact-SHA review, and PR gates.

## 2026-10-04 — feat-097 implementation verified

**State**: done for implementation and locally verified acceptance; PR #64 current-head CI and merge pending.
**Done**: Closed feat-097 implementation criteria after exact-head review; preserved the correction route and synthetic-only approval boundary.
**Evidence**: Review SHA `4b7ea6b9121ac03b9afe6c35514e2d0d9d39ed0c` closed F1/F2 with no material findings. Coordinator init receipt `sh_1065aa617001KhSL6yo2WJaB6D` passed 405 tests (181 core, 224 knowledge) and required checks; fresh follow-up focused (2), correction (14), knowledge (224), typecheck, lint/format/diff, and pre-push (405) checks passed. 177 protected assets and both audit reports are unchanged. No real audit decisions, qualified approval, or corpus certification exist.
**Blockers**: Current-head PR #64 CI watcher `sh_10673bc1d001Pmek1pV6cbOcRf` is pending; prior `a534eac` CI is not evidence for this head.
**Next**: Merge PR #64 after final-head checks, then continue the feat-044 batch order.

## 2026-10-04 — feat-097 coordinator verification receipt

**State**: active; implementation criteria and assigned local verification pass, with final review and PR CI pending.
**Done**: Recorded the coordinator's fresh verification receipt and protected-asset comparison. The earlier pending-verification note remains unchanged as history.
**Evidence**: `./init.sh` receipt `sh_1065aa617001KhSL6yo2WJaB6D` passed: 405 tests (181 core, 224 knowledge), format, lint (0 errors; 4 baseline warnings), typecheck, build, package exports, test placement, length, and corpus/book freshness. 177 protected assets and both audit-status/coverage reports are byte-identical. All 14 synthetic probes pass in the 2,064-target full-floor fixture. Validators are unchanged; zero real decisions and no certification exist. No actual qualified review or corpus certification is claimed.
**Blockers**: Final test-proof review and PR CI.
**Next**: Commit the immutable test-proof, request final review, and complete PR CI; keep feat-097 active until coordinator acceptance.

## 2026-10-04 — feat-097 correction probes

**State**: active; implementation and local package checks pass, coordinator verification remains.
**Done**: Added in-memory-only synthetic full-floor approvals, input/dependency invalidation probes, append-only correction-history coverage, and the human correction/reapproval route.
**Evidence**: Knowledge tests pass (224/224); typecheck, build, format check, corpus/book checks, and `git diff --check` pass. Lint has 0 errors and four existing warnings. The workspace build reports existing sourcemap, font, and chunk warnings. Protected manifest/schema/source hashes and audit status/coverage files are unchanged. Synthetic targets number 2,064 as expected from 1,344 cells + 6 special + 518 source units + 17 exclusions + 172 records + 1 table + 1 figure + 4 lessons + 1 fixture. No actual source review or specialist approval is claimed.
**Blockers**: Fresh `./init.sh` and coordinator verification remain. No production data, schemas, validators, real ledgers, or certification artifacts changed.
**Next**: Coordinator runs assigned verification on the complete working tree and determines feat-097 acceptance.

## 2026-10-04 — feat-067 implementation accepted

**State**: done for implementation and verified acceptance; PR #63 awaits final lifecycle-head CI and merge.
**Done**: Closed feat-067 implementation criteria after exact-SHA review and coordinator validation; retained open real-audit and certification gates.
**Evidence**: Reviewed SHA `9a347b365a554fd85767d0ece97b67d5a5fcdbea`; F1/F2/F3/F7 closed without material findings, 37 focused tests passed. `./init.sh` receipt `sh_105d93047001obGaDflxxH16W3` passed 391 tests (181 core, 210 knowledge), typecheck/build/exports/length/lint and corpus/book checks. CI run `37186502264` job `111389426336` passed. 175 protected files remain unchanged. Audit gates are closed: 2,057 decisions missing, 0/1,226 claims covered, no certification.
**Blockers**: Final lifecycle-head CI and PR #63 merge. No source audit or specialist approval is claimed.
**Next**: Merge PR #63 after final-head CI, then activate feat-097 for the correction drill.

## 2026-10-04 — feat-067 coordinator verification

**State**: active; coordinator verification passed, with exact-SHA review and CI/PR pending.
**Done**: Recorded fresh `./init.sh` receipt and expected fail-closed completion check.
**Evidence**: Receipt `sh_10575faea001SigKv3L0CXTuyy` passed 387 tests (181 core, 206 knowledge), format, lint (0 errors; 4 baseline warnings), typecheck, build, exports, placement, length, and corpus/book freshness. All 175 protected files remain unchanged. `validate:corpus --require-complete` exited 1 as expected: both gates closed, 2,057 decisions missing, zero current, 0/1,226 released claims covered, certification absent. No source audit or approval is claimed.
**Blockers**: Exact-SHA review and CI/PR; feat-067 acceptance remains open.
**Next**: Complete exact-SHA review and CI/PR while keeping feat-067 active.

## 2026-10-04 — feat-067 bounded documentation handoff

**State**: active; implementation and assigned root checks are reported complete, but feature acceptance and delivery remain open.
**Done**: Updated the canonical audit implementation status, package route, plan evidence, and feature handoff. Preserved all original feat-067 acceptance criteria as pending.
**Evidence**: 29 focused audit tests; root format, lint (0 errors; 4 baseline warnings), typecheck, 387 tests (181 core, 206 knowledge), build, corpus/book freshness, and protected identity checks passed. Registry has 2,057 required targets, zero current decisions, and 0/1,226 covered released claims. No source audit or certification is claimed. Report-shape mismatch is documented in the model and plan.
**Blockers**: Coordinator's fresh `./init.sh` receipt, contract mismatch resolution, exact-SHA review, CI/PR, and final acceptance. Prior init execution was reported but not independently receipted here.
**Next**: Resolve the report-shape mismatch and complete coordinator verification/review; keep feat-067 active until all acceptance criteria pass.

## 2026-10-03 — feat-101 lifecycle finalization

**State**: done for implementation/local validation; PR #62 awaits final-head CI and merge.
**Done**: Set feat-101 done after all implementation criteria and reviewed-SHA verification passed; preserved certification and authoring boundaries.
**Evidence**: Reviewed SHA `ae1d1f5c647408bc38d9fa2cffe6db80f54c84c1`; init `sh_102393ac4001AJk2OSBMttFf5u` passed with 354 tests (181 core, 173 knowledge), typecheck/build/exports/length/lint (4 baseline warnings), corpus/book freshness, and locale checks. 173 protected V1 files are unchanged. PR #62 CI run `37130792089`, job `111225312559`, passed.
**Blockers**: Final-head CI and merge; no V2 content, independent feat-095 approval, feat-067 audit, or corpus certification is claimed.
**Next**: Coordinator verifies CI on this lifecycle commit and merges PR #62.

## 2026-10-03 — feat-101 verification handoff

**State**: active; implementation and repository verification pass, delivery review remains.
**Done**: Reconciled schema, evidence-validation, release-projection, snapshot, and runtime lesson-review documentation. Kept acceptance and specialist/audit claims open.
**Evidence**: `./init.sh` receipt `sh_10215cc44001Abxn70zd09XAk5` passed. Root format, lint, typecheck, build, exports, placement, and 352 tests passed (181 core, 171 knowledge); lint has four baseline warnings. Corpus/book checks passed for 172 records, 1,226 claims, 1,015 citations. Protected V1 records/schema comparison passed for 173 files. Runtime lesson tests cover direct and transitive support.
**Blockers**: Independent review, CI/PR, and final feat-101 acceptance. No V2 lesson, figure, or project-convention content was authored.
**Next**: Coordinator commits the verified batch and requests risk review; keep feat-101 active until review and delivery gates resolve.

## 2026-10-03 — feat-043

**State**: done; source-section crosswalk and repository verification complete.
**Done**: Partitioned all four supplied editions and mapped sections, dispositions, existing evidence, and author/audit routes in `docs/reviews/knowledge/source-inventory.md`; preserved source discrepancies in the canonical catalog.
**Evidence**: External structural checks confirmed 2,453 pages, all four PDF fingerprints/counts, manifest/document/feature routes, and ordered PBC quẻ ranges. `./init.sh` passed: 263 tests (181 core, 82 knowledge), package exports, format, lint (0 errors; 4 existing warnings), typecheck, build (existing source-map/font/chunk warnings), and test placement. Knowledge corpus validation with `--check-books --check` and `git diff --check` passed.
**Blockers**: Fine source-layer reconciliations, 1,152 book-position audit cells, specialist approval, and corpus certification remain open under routed owners; no passage-fidelity or certification claim is made.
**Next**: After coordinator PR merge, select feat-101 and use this inventory to implement extended knowledge records and provenance contracts.

## 2026-10-03 — feat-013

**State**: done.
**Done**: Closed product identity after the Product Owner confirmed the physical-iOS install retest and the launch research.
**Evidence**: Product Owner confirmation (2026-10-03) covers the F12-T16 install retest and the F12-T07 name-conflict, domain-availability, and trademark-risk research; the repository adds no device or research artifact of its own. Earlier approvals, waivers, and browser-level checks remain recorded in the 2026-10-01 and 2026-10-02 blocks.
**Blockers**: none.
**Next**: None. Reopen if installed-PWA rendering or identity metadata regresses.

## 2026-10-03 — feat-101–103 extended roadmap planning

- Status: todo; planning recorded, implementation not started.
- Result: Added extended-record/provenance contracts, package/web fidelity verification, and payload/offline snapshot hardening. Broadened Library plans to include trigrams, terms, rules, figures, and project conventions. The backlog now contains 61 execution features.
- Decision: Sequence inventory → feat-101 → feat-067 → feat-097 before bulk authoring. Keep feat-066 closure required by final reconciliation. Web integration starts after feat-101 without waiting for full-corpus certification.
- Evidence: `./init.sh` passed 263 tests with existing warnings. Edition fingerprints, generated freshness, 167 local documentation targets, dependency checks, and diff checks passed. All 384 audit items, corpus data, application code, and previous statuses remain unchanged.
- Blockers: None for planning. Extended contracts, web fidelity, volume checks, and specialist approval remain unimplemented or pending.
- Next: Select feat-043 and build the source-to-record/exclusion crosswalk, then complete feat-101.

## 2026-10-02 — feat-013 PR review follow-up

**State**: active; review fixes are implemented and verified, with physical-device safe-area/blur retest still pending.
**Done**: Clarified the approved single light-background V1 icon set and the distinction between static white manifest colors and dynamic HTML theme color. Added horizontal safe-area spacing for header, route content, and bottom sheet. Replaced the asset-generation shell one-liner with a cleanup-safe Node script and documented its command and source-image behavior. Kept the harmless duplicate `includeAssets` entry unchanged.
**Evidence**: Designer's final `./init.sh` passed after the source changes. Synthetic browser checks passed with 59px left/right insets at 844×390 and zero horizontal inset in portrait; this is not native-device evidence. Two asset generations reproduced the five generated icon hashes and the source hash. Controlled subprocess checks preserved generator failure exit 23 and returned 143 on SIGTERM; the temporary copy was removed in both cases. Targeted ESLint, Node syntax, Prettier, JSON parse, and `git diff --check` passed. F1-F3 from PR review are addressed; F4 is intentionally retained as harmless.
**Blockers**: Retest on physical iOS in portrait and landscape, including initial view, normal scroll, top overscroll, controls, themes, all safe-area edges, and bottom spacing; blur recurrence and OS root cause remain unconfirmed. Naming/domain/trademark-risk research and final terminology/copy review remain open.
**Next**: Ask the Product Owner to retest the installed PWA on physical iOS in portrait and landscape; keep feat-013 active and do not claim the candidate header mitigation fixes native behavior.

## 2026-10-02 — feat-013 iOS header mitigation

**State**: active; mitigation is implemented and browser-checked, but no native iOS fix is claimed.
**Done**: Made the opaque app header sticky at the top with a deliberate local stacking context. Added Apple's standalone-capable and default status-bar metadata as a legacy compatibility choice, not a proposed cure. Preserved the dynamic HTML theme color and light initial/manifest color.
**Evidence**: Apple Safari HTML Reference documents that `apple-mobile-web-app-status-bar-style` applies to capable web apps, and that `default` leaves web content below the status bar (https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html). Librarian research found no authoritative guaranteed blur mechanism; opaque sticky/header coverage is the best user-corroborated experiment. Agent-browser checks at 390×844 and 1440×900 confirmed the sticky header remains at viewport top after scrolling, has a fully opaque theme-matched background in light/dark mode, and updates the dynamic `theme-color` meta value. On mobile, home, direct casting, Library navigation, and cancel-confirmation dialog were usable; Dialog remains above the header with its focus/modal behavior. The app has no modal navigation drawer. `./init.sh` passed format, lint (0 errors; four existing Fast Refresh warnings), typecheck, build, package exports, test-placement checks, 44 knowledge tests, and 181 core tests. Existing font-resolution, sourcemap, and chunk-size build warnings remain. `git diff --check` passed. Physical iOS behavior, including the reported persistent gradient blur, remains unverified; normal scroll and top overscroll recurrence are explicit native retest cases.
**Blockers**: Native iOS installed-PWA retest, including top overscroll, and outstanding name-conflict, domain-availability, and obvious trademark-risk research; final terminology/copy review remains open.
**Next**: Ask the Product Owner to retest the installed PWA on physical iOS with normal scroll and top overscroll, then inspect header controls and bottom spacing. Keep feat-013 active and do not publish from this lane.

## 2026-10-02 — feat-035 four-quẻ group

- Status: active.
- Result: Added Đồng Nhân, Đại Hữu, Khiêm, and Dự with three-book overviews and 24 positions. Preserved distinct author readings, Ngô Tất Tố's selected translator note, and six supported source-error resolutions after visual inspection. Removed duplicate legacy records.
- Coverage: 104 records, 525 claims, 398 locators; 16/64 quẻ and 96/384 positions in each commentary book. The remaining 48 quẻ retain unaudited compatibility content.
- Evidence: `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, and diff checks passed.
- Blockers: none.
- Next: Commit this group, then review BPCT chapter 5, sections 8–10 and related evidence.

## 2026-10-02 — feat-035 Tứ sinh, Nguyệt phá, and Tuần không group

- Status: active.
- Result: Added ten terms and three articles from BPCT chapter 5, sections 8–10. Cross-checked stage lists and calendar definitions, preserved compound conditions, and separated Vĩnh Cao's notes. Excluded the unclear Lâm Quan/Thoái sentence and the contradictory điền thực example.
- Coverage: 117 records, 548 claims, 408 locators; 16/64 quẻ and 96/384 positions. Advanced coverage remains partial.
- Evidence: `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, and diff checks passed. Four-quẻ group committed as `be42a75`.
- Blockers: none for selected claims. Excluded passages need clearer evidence before publication.
- Next: Commit this group, reconcile source documentation, and complete the handoff.

## 2026-10-02 — feat-035 completed source audit and handoff

- Status: done.
- Result: Completed both selected tracks. Added printed locators to 84 NHL citations across three batches and checked all 109 NHL citations against 59 footer labels. Reconciled source locations and exclusions, added chapter 6 cross-checks for Tuần Không, and corrected stale model and directory documentation. Content and quality contracts remain accurate.
- Commits: Four quẻ `be42a75`; Tứ sinh, Nguyệt phá, and Tuần không `b964a5d`.
- Evidence: Final `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, 51 local documentation targets, and diff checks passed. Coverage remains incomplete: 117 records, 548 claims, 411 locators; 16/64 quẻ and 96/384 positions in each commentary book.
- Blockers: none for this batch. Ambiguous and contradictory source examples remain explicitly excluded; no independent specialist approval is claimed.
- Next: Review Tùy, Cổ, Lâm, Quán and BPCT chapter 5, sections 11–12 (Phản ngâm, Phục ngâm; PDF 70–71).

## 2026-10-02 — feat-036 four-quẻ group

- Status: active.
- Result: Added Tùy, Cổ, Lâm, and Quán with three-book overviews and 24 positions. Preserved author differences, uncertain readings, and 13 visually checked source-error resolutions. Removed duplicate legacy records and retained the existing Quan display name with Quán aliases.
- Coverage: 121 records, 644 claims, 503 locators; 20/64 quẻ and 120/384 positions in each commentary book. The remaining 44 quẻ retain unaudited compatibility content.
- Evidence: After correcting the display-name change caught by compatibility tests, `./init.sh` passed 263 tests. PDF fingerprints, generated-output freshness, and diff checks passed before commit.
- Blockers: none.
- Next: Commit this group, then finish BPCT chapter 5, sections 11–12 and related evidence.

## 2026-10-02 — feat-036 Phản ngâm and Phục ngâm group

- Status: active.
- Result: Added three terms and two articles from BPCT chapter 5, sections 11–12. Preserved the distinction between directional examples and line-branch opposition. Checked 14 Phục ngâm pairs against Nạp Giáp, retained Dụng/Thế/Ứng conditions, and resolved a Cấn naming error. Ambiguous parentheticals and the mixed Phản/Phục name in question 6 remain excluded.
- Coverage: 126 records, 659 claims, 510 locators; 20/64 quẻ and 120/384 positions. Advanced coverage remains partial.
- Evidence: Final advanced `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, and diff checks passed before commit. Classical group committed as `ccf713b`.
- Blockers: none for selected claims. Excluded wording needs clearer evidence before publication.
- Next: Commit this group, reconcile source documentation, and complete the handoff.

## 2026-10-02 — feat-036 completed source audit and handoff

- Status: done.
- Result: Completed both selected tracks and reconciled source locations, discrepancy routes, and advanced exclusions. Reviewed content, quality, model, and data-directory contracts remain accurate. Checked all 138 NHL citations across 71 cited pages and seven new BPCT printed locators.
- Commits: Four quẻ `ccf713b`; Phản ngâm and Phục ngâm `09e8a9f`.
- Evidence: Final `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, 74 local document targets, and diff checks passed. Coverage remains incomplete: 126 records, 659 claims, 510 locators; 20/64 quẻ and 120/384 positions per commentary book.
- Blockers: none for selected content. Ambiguous statements remain excluded; no independent specialist approval is claimed.
- Next: Review Phệ Hạp, Bí, Bác, Phục and BPCT chapter 5, sections 13–14 (Vượng tướng hưu tù, Trong hợp có khắc; PDF 72).

## 2026-10-02 — feat-037 four-quẻ group

- Status: active.
- Result: Added Phệ Hạp, Bí, Bác, and Phục with three-book overviews and all 24 positions. Preserved Trình Di/Chu Hy differences, historical context, and nine visually checked source-error resolutions. Used NHL's explicit seven-quẻ sequence and excluded unclear wording; removed duplicate legacy records.
- Coverage: 130 records, 754 claims, 606 locators; 24/64 quẻ and 144/384 positions in each commentary book. Forty quẻ retain unaudited compatibility content.
- Evidence: `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, and diff checks passed before commit.
- Blockers: none for selected claims. Ambiguous wording remains excluded.
- Next: Commit this group, then review BPCT chapter 5, sections 13–14 and related evidence.

## 2026-10-02 — feat-037 seasonal strength and combination/control group

- Status: active.
- Result: Added three terms and two articles for BPCT chapter 5, sections 13–14. Kept compound conditions, the directional Thân-to-Tị exception, and Vĩnh Cao's Tam hình objection separate from main commentary. No calendar, scoring, or automatic interpretation was added.
- Coverage: 135 records, 771 claims, 614 locators; 24/64 quẻ and 144/384 positions. Advanced coverage remains partial.
- Evidence: Initial full verification hit the 304-line generated import inventory. Fix `159797e` exempts only that generated file; an isolated probe still rejects oversized authored TypeScript. The subsequent `./init.sh` passed 263 tests; PDF fingerprints, generated freshness, and diff checks passed. Classical group committed as `3e01c29`.
- Blockers: none for selected claims. Unspecified Hưu/Tù assignments and mixed support/control cases remain outside general classifiers.
- Next: Commit this group, reconcile source documentation, and complete the handoff.

## 2026-10-02 — feat-037 completed source audit and handoff

- Status: done.
- Result: Completed both selected tracks. Reconciled source locations, nine discrepancy routes, and classical/advanced exclusions. Content, quality, model, and data-directory contracts remain accurate.
- Commits: Classical `3e01c29`, generated-import verification `159797e`, BPCT `3dd5355`.
- Evidence: Final `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, documentation targets, and diff checks passed. Checked all 167 NHL citations across 84 cited pages and eight new BPCT printed locators.
- Coverage: 135 records, 771 cited claims, 614 locators. Classical coverage remains 24/64 quẻ and 144/384 positions per commentary book.
- Blockers: none for selected claims. Ambiguous statements remain excluded. Full corpus and independent specialist review remain incomplete.
- Next: Review Vô Vọng, Đại Súc, Di, Đại Quá and BPCT chapter 5, sections 15–16 (PDF 72–73).

## 2026-10-02 — feat-038 completed source audit and handoff

- Status: done.
- Result: Added four reviewed quẻ and six BPCT records. Corrected Đại Súc's reversed display name. Preserved author differences, six visually checked source-error resolutions, conditional support, and translator objections. Reconciled source locators and exclusions.
- Commits: Name `743b17e`, classical `2443953`, BPCT `31d8866`.
- Evidence: `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, 92 local documentation routes, and diff checks passed. Checked all 195 NHL citations across 96 cited pages and nine new BPCT printed locators.
- Coverage: 145 records, 885 cited claims, 716 locators. Classical coverage is 28/64 quẻ and 168/384 positions per commentary book. Thirty-six quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. Ambiguous passages, reported health outcomes, complete coverage, and independent specialist approval remain outside this completed batch.
- Next: Review Khảm, Ly, Hàm, Hằng and BPCT chapter 5, sections 17–18 (PDF 73).

## 2026-10-02 — feat-039 completed source audit and handoff

- Status: done.
- Result: Added Khảm, Ly, Hàm, Hằng and four BPCT records. Preserved author differences and nine visually checked source-error resolutions. Kept conditional Tiến/Thoái effects, proxy relationships, and the source's religious setting explicit. Reconciled source locations and exclusions.
- Commits: Classical `3b9ab7e`; BPCT `b7fce51`.
- Evidence: Final `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, 101 local documentation routes, and diff checks passed. Checked all 223 NHL citations across 108 cited pages and five new BPCT printed locators.
- Coverage: 153 records, 995 cited claims, 812 locators. Classical coverage is 32/64 quẻ and 192/384 positions per commentary book. Thirty-two quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. The missing Tiến entry, ambiguous attribution, unlocated reference, and reported outcomes remain outside released authority. Full coverage and independent specialist approval remain incomplete.
- Next: Review Độn, Đại Tráng, Tấn, Minh Di and BPCT chapter 6, sentences 1–6 (PDF 77–79).

## 2026-10-02 — feat-040 completed source audit and handoff

- Status: done.
- Result: Added Độn, Đại Tráng, Tấn, Minh Di and four BPCT records; extended moving-line evidence. Preserved distinct readings, seven source-discrepancy resolutions, conditional support, and Nhật thần scope. Tightened seven classical summaries and one advanced condition. Reconciled source locations and exclusions.
- Commits: Classical `ea12e18`; BPCT `1610f8b`.
- Evidence: `./init.sh` passed 263 tests. PDF fingerprints, generated freshness, 112 documentation routes, and diff checks passed. Checked 251 NHL citations across 120 pages and eight new BPCT printed locators.
- Coverage: 161 records, 1,111 cited claims, 916 locators. Classical coverage is 36/64 quẻ and 216/384 positions per commentary book. Twenty-eight quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. Unclear wording, incomplete tables, reported outcomes, full coverage, and independent specialist approval remain excluded or incomplete.
- Next: Review Gia Nhân, Khuê, Kiển, Giải and BPCT chapter 6, sentences 7–11 (PDF 79–81).

## 2026-10-02 — feat-041 completed source audit and handoff

- Status: done.
- Result: Added Gia Nhân, Khuê, Kiển, Giải and seven BPCT records. Preserved author differences, four visually checked source-error resolutions, conditional day, month, and year effects, and separate Thân meanings. Tightened seven classical summaries. Reconciled source locations and exclusions.
- Commits: Classical `a73209e`; BPCT `f780804`.
- Evidence: `./init.sh` passed 263 tests. Fingerprints, generated freshness, 121 documentation routes, and diff checks passed. Checked 279 NHL citations across 133 pages and six new BPCT printed locators.
- Coverage: 172 records, 1,226 cited claims, 1,015 locators. Classical coverage is 40/64 quẻ and 240/384 positions per commentary book. Twenty-four quẻ retain unaudited compatibility content.
- Blockers: none for selected claims. Unclear references, full coverage, calendar algorithms, and independent specialist approval remain excluded or incomplete.
- Next: Review Tổn, Ích, Quải, Cấu and BPCT chapter 6, sentences 12–16 (PDF 81–82).

## 2026-10-02 — feat-042 complete-corpus roadmap

- Status: active.
- Result: Created 55 intended execution features for remaining authoring, audit tooling, sixteen four-quẻ audits, ten group audits, and independent certification. Preserved 384 separate hào acceptance items. The roadmap lists all 24 missing quẻ, source ownership, and chapter checkpoints for separate commits.
- Decision: Group coherent work in features; retain detailed quẻ, hào, and passage decisions in acceptance items and future ledgers.
- Evidence: Baseline `./init.sh` passed 263 tests. Final graph, coverage-unit, route, fingerprint, and repository checks remain pending.
- Blockers: None for planning. Future independent approval requires a named specialist.
- Next: Verify and commit the backlog; keep execution features `todo`.

## 2026-10-02 — feat-042 completed roadmap and verification

- Status: done.
- Result: Created the complete intended backlog, feat-043 through feat-097, and a linked roadmap. Consolidated the draft into 55 execution features, retaining chapter checkpoints, sixteen four-quẻ audits with 384 distinct hào items, and ten group audits. Added versioned evidence, independent approval, and correction gates.
- Evidence: Final `./init.sh` passed 263 tests with existing warnings. Edition fingerprints, generated freshness, 158 local documentation targets, dependency graph, complete hào inventory, and diff checks passed. The prior 41 feature entries and current corpus remain unchanged.
- Blockers: None for planning. No future content or audit feature has executed; specialist approval remains pending.
- Next: Select feat-043 and build the source-to-record/exclusion crosswalk.

## 2026-10-02 — feat-098–100 web integration planning

- Status: todo; planning recorded, implementation not started.
- Result: Added three web features for Library quẻ/hào details, contextual reading explanations, and topic/article/learning browsing with local search. Linked their intended contracts and dependencies into the roadmap. The backlog now contains 58 execution features.
- Decision: Reuse released content without waiting for full-corpus certification. Complete feat-098 before its two dependents; future lessons do not block article browsing.
- Evidence: `./init.sh` passed 263 tests with existing warnings. Corpus fingerprints, generated freshness, 163 local documentation targets, dependency graph, and diff checks passed. Prior feature entries, 384 audit items, corpus data, and application code remain unchanged.
- Blockers: None for planning. Web behavior and direct UI checks remain unimplemented.
- Next: Select feat-098 and assess implementation scope and external-plan criteria.

## 2026-10-01 — feat-013 identity approvals and iOS install observation

**State**: active; the approved identity decisions are recorded, but required naming research and a device safe-area fix remain.
**Done**: Recorded approval of the supplied bagua mark/current wordmark treatment, current theme colors, and no-tagline decision. Recorded Product Owner waivers for the V1 editable vector master and social-sharing image without claiming either asset exists.
**Evidence**: User reports installing and opening the PWA on a physical iOS device. The top blur obscures the title and buttons, and bottom safe spacing is insufficient. This is observed failure evidence, not a passed native install check. No code was changed in this docs-only update. Rights remain recorded as Product Owner project-use confirmation; creator is unidentified and no independent legal audit is claimed.
**Blockers**: Fix and retest the iOS safe-area issue; complete outstanding name-conflict, domain-availability, and obvious trademark-risk research. Final terminology/copy review also remains tracked in `docs/product-specs/vietnamese-language.md`.
**Next**: Fix the installed-PWA safe-area defect and retest title, controls, and bottom spacing; continue the required naming research before launch. The concurrent safe-area UI work remains with designer des-3.

## 2026-10-01 — feat-013 safe-area implementation follow-up

**State**: active; safe-area CSS changes are implemented, but native iOS retest and naming research remain.
**Done**: Added viewport edge-to-edge support and top/bottom safe-area spacing for the app header, shell, and bottom sheet.
**Evidence**: Designer-reported browser safe-area simulation at 390×844 showed 59px top and 34px bottom insets; this does not verify physical iOS. The OS treatment remains a hypothesis, not a confirmed root cause. `./init.sh` passed format, lint (0 errors; four existing Fast Refresh warnings), typecheck, build, package exports, test placement, 44 knowledge tests, and 181 core tests. The build emitted font-resolution, sourcemap, and large-chunk warnings. `git diff --check` passed.
**Blockers**: Retest the installed PWA on physical iOS; complete name-conflict, domain-availability, and obvious trademark-risk research. Final terminology/copy review remains open.
**Next**: Retest the installed PWA on physical iOS and complete naming research. Keep feat-013 active; the implementation follow-up is published to PR #55.

## 2026-10-01 — feat-013 approved identity slice

**State**: active; the approved product name, description, supplied bitmap identity, and icon/metadata implementation are in place. feat-013 remains incomplete.
**Done**: Reconciled the in-progress identity spec and preview, removed the rejected taijitu study, generated the favicon, 192/512, maskable and Apple touch icons from the Product Owner-selected `docs/design-docs/batquai.avif`, and aligned the header, document metadata, PWA manifest, and README product description. Preserved the source image and existing application themes/layout; no redraw, tracing, crop, or bagua removal. Recorded that asset usage rights were confirmed by Product Owner, not independently audited.
**Evidence**: `@vite-pwa/assets-generator` produced 48×48 ICO, 192×192, 512×512, maskable 512×512 and Apple 180×180 PNG assets using 5% standard, 45% maskable-safe-area, and 30% Apple padding. Vite production build emitted a manifest with Lục Hào name/short name, the approved exact description, `lang: vi`, and correct icon paths. Production browser preview showed a 36px compact and 40px wide header logo; app rendered at 390×844 and 1440×900 in light and dark themes. Preview screenshots: `/private/var/folders/y_/7jmnw4n12f9686g6xqj07hj80000gn/T/opencode/feat-013-identity-preview.png`, `feat-013-header-mobile.png`, `feat-013-mobile-dark.png`, `feat-013-header-desktop.png`, and `feat-013-header-desktop-dark.png` in the same directory. `pnpm format:check`, `pnpm --filter @liuyao/web typecheck`, `pnpm lint` (four existing Fast Refresh warnings), `pnpm build`, `pnpm test` (225 package tests), and `./init.sh` passed. Manifest/favicon/192/maskable dev-server responses returned 200 when PWA dev mode was temporarily enabled; that generated `dev-dist` and caused lint errors, so the option was removed and generated artifacts cleaned before final verification. Native PWA install surface was not available in this headless browser.
**Blockers**: Naming research, tagline decision, final Product Owner preview approval, editable vector master, theme/background-color approval, social sharing image and actual install UI audit remain open; creator is unidentified despite Product Owner usage-rights confirmation. The selected art appears small in the compact app header because the source includes substantial white margin around the bagua; no crop is made because the user explicitly required preserving the entire artwork.
**Next**: Product Owner reviews `docs/product-specs/previews/feat-013-logo-preview.html` and decides whether to approve the selected art/wordmark treatment or request a specific change.

## 2026-10-01 — feat-029 compact casting and header navigation

**Result**: Completed the approved layout on `feat/compact-casting-mobile`. Both sequential workspaces place the hexagram beside the coins, with one outcome row and compact actions below. Mobile header icons replace bottom tabs. Connection status remains in Settings. Updated the canonical layout contract.

**Evidence**: Final `./init.sh` passed with 225 package tests; `git diff --check` passed. Chromium review covered 320×568, 390×664, and 1440×900 without horizontal overflow. The automatic footer stayed at 517px through six busy/revealed states. Manual confirmation/revisit, reset, cancel, draft protection, reading retention, and keyboard coin activation passed.

**Limits**: Physical-phone rendering and actual screen-reader announcements remain unverified. Existing verification warnings remain.

**Next**: Review the interface on the user's phone. Changes remain uncommitted.

## 2026-10-01 — feat-029 PR handoff

**State**: PR #53 is open.
**Done**: Pushed `feat/compact-casting-mobile` and opened PR #53.
**Evidence**: The pre-push hook passed workspace typecheck and all 225 package tests. `git diff --check` passed. Browser review confirmed that the input group shows only its bottom focus border.
**Blockers**: None.
**Next**: Review PR #53.

## 2026-10-01 — feat-030 Light and Dark theme preference

**Result**: Added the F09-T11 theme preference. Settings gains a Giao diện card with Sáng/Tối choices; the choice persists on the device, applies to every route before first paint through an `index.html` bootstrap, and drives `color-scheme` and `theme-color`. The Dark palette now fills the canonical semantic tokens from `docs/product-specs/v1-mvp.md`; the Light palette is unchanged. The moving-line marker and four-coin labels moved onto tokens so both stay readable in Dark.

**Evidence**: Final `./init.sh` passed (format, lint, typecheck, build, package exports, 225 package tests). Chromium reviewed the production build: default Light with empty storage; Tối set `html.dark` with body `#151B1E`, surface `#1E2629`, muted text `#B3C1BD`, and `theme-color` `#151b1e` on `/`, `/library`, `/settings`, and `/result`; reload restored the class by `DOMContentLoaded`; with the service worker active and the preview server stopped, `/` and `/settings` still loaded with the saved dark theme; 390×844 settings had no horizontal overflow. Light keeps `#8f2e24` for moving markers; Dark renders `#e8836f` (6.5:1, up from 2.1:1).

**Limits**: PWA manifest theme colors and the favicon remain Light-only identity assets. Chromium-only review; physical-device rendering unverified. No package-level test exists for the theme module because app test files are not allowed.

**Next**: Review the uncommitted theme changes and commit them.

## 2026-10-01 — feat-030 storage-failure review fix

**Result**: Updated the Settings appearance control to initialize from the active document theme, so route remounts keep the selection aligned when localStorage writes fail. Corrected the feat-030 handoff to include the committed implementation and this review fix.

**Evidence**: With writes to `liuyao-theme` forced to fail, selecting Tối applied Dark; after navigating Home and returning to Settings, Tối remained active and selected, with no page errors. `./init.sh` passed format, lint, typecheck, build, package exports, and package tests.

**Next**: Commit the review fix.

## 2026-10-01 — feat-030 PR handoff

**State**: PR #54 is open against `main`.
**Done**: Pushed `feat/030` with the theme implementation and storage-failure review fix.
**Evidence**: `./init.sh` passed format, lint, typecheck, build, package exports, and 225 package tests. The pre-push hook passed typecheck and all package tests. Chromium review covered persistence, offline launch, responsive Settings, theme contrast, and storage-write failure.
**Blockers**: None.
**Next**: Review PR #54.

## 2026-10-01 — feat-031 book-backed domain documentation

**Result**: Added the supplied-book source catalog, V1 board derivations, and intended knowledge quality contract. Documented current TypeScript storage and proposed JSON/database options. Updated canonical routes and the release evidence gate. Recorded four source discrepancies and the unresolved relationship between product coin symbols and traditional physical faces.

**Evidence**: Fresh `./init.sh` passed with 225 package tests. Local documentation links and four PDF fingerprints passed. Documentation tables match eight trigram patterns, 64 palace memberships, and 48 Na Jia assignments in current code. `git diff --check` passed.

**Limits**: This is focused documentation review. Runtime records and fixtures still need individual supplied-book provenance. Full commentary review and JSON migration are not implemented. Supplied PDFs remain user-provided inputs.

**Next**: Select the supplied-book audit of runtime knowledge records and calculation fixtures.

## 2026-10-01 — feat-032 JSON pilot and package migration

**State**: done for the approved pilot.
**Done**: Added four fingerprinted source editions, strict schemas, cited JSON records, release checks, generated coverage, and readonly book APIs. Existing lookups use reviewed JSON plus an explicitly unaudited compatibility snapshot.
**Evidence**: `./init.sh` passes with 263 package tests. Corpus fingerprint/freshness checks and `git diff --check` pass. Codex compared pilot passages and rendered symbol/table pages. Chromium loaded Càn and edition metadata after the production server stopped.
**Limits**: Coverage is 4/64 quẻ and 24/384 line positions. PBC/NTT line commentary and independent specialist approval remain missing. The main JS bundle is approximately 679kB, 197kB gzip. Existing build/lint warnings remain.
**Next**: Continue Truân, Mông, Nhu, Sư and BPCT chapter 5, sections 1–4, PDF 67–68. Include the missing PBC/NTT pilot line comparisons. Changes remain uncommitted.

## 2026-10-01 — feat-032 pre-commit source review

**State**: done for the pilot.
**Done**: Rechecked authored claims against their cited passages and inspected the PBC/NTT Lý diagrams. Added BPCT PDF 13 to the Thiên can and Địa chi definitions so their Nạp Giáp clauses have direct evidence.
**Evidence**: The corpus still has 73 records, 119 claims, and 43 citations. Full verification and fingerprint checks run before the pilot commit.
**Blockers**: None.
**Next**: Continue the approved next batch in a separate feature and commit each reviewed content group.

## 2026-10-01 — feat-033 pilot commentary comparisons

**State**: active. The foundation is committed as `da4f1ab`.
**Done**: Added PBC and NTT summaries for all 24 pilot line positions and separate Dụng cửu/Dụng lục readings. Preserved distinct Trình Di/Chu Hy interpretations. Recorded and visually confirmed the PBC PDF 66 and NTT PDF 144 Khôn label errors.
**Evidence**: Fingerprint validation passes. Coverage reports 73 records, 175 claims, and 99 citations; all three commentary sources now cover the 24 pilot positions. Schema and passage review remain separate checks.
**Blockers**: None.
**Next**: Verify and commit these comparisons, then author Truân, Mông, Nhu, and Sư.

## 2026-10-01 — feat-033 four-quẻ source review

- Status: active.
- Result: Released Truân, Mông, Nhu, and Sư with three-book overviews and all six positions. Preserved selected Chu Hy differences, including Nhu's final line and Sư's “dư thi”. Recorded five source-label/reference discrepancies with visual and passage evidence. Corrected NTT's supplied-edition year from its PDF 938 colophon and recorded missing referenced end criticism.
- Coverage: 77 records, 274 claims, 194 locators; 8/64 quẻ and 48/384 positions. The remaining 56 quẻ retain unaudited compatibility content.
- Evidence: `./init.sh` passed all 263 tests. PDF fingerprints match; generated imports and coverage were regenerated. No source PDF or core calculation changed.
- Blockers: none.
- Next: Commit this group, then author BPCT chapter 5, sections 1–4.

## 2026-10-01 — feat-033 advanced BPCT group

- Status: active.
- Result: Added four Dụng/Nguyên/Kỵ/Cừu terms and three articles covering question-specific selection, Thế–Ứng roles, and conditional effects. Extended the existing Thế/Ứng terms. Kept Vĩnh Cao's footnotes separate from Vương Hồng Tự's chapter text; preserved dynamic, strength, calendar, and protection conditions.
- Coverage: 84 records, 303 claims, 202 locators; advanced coverage is partial. No calendar or automated interpretation behavior was added.
- Evidence: Full `./init.sh` passed 263 tests after the final passage review. PDF fingerprint/freshness checks and `git diff --check` passed. The four-quẻ group is committed as `fb93a79`.
- Blockers: none.
- Next: Commit this group, then reconcile canonical documentation and complete the feature handoff.

## 2026-10-01 — feat-033 completed handoff

- Status: done.
- Result: Completed both selected content tracks. Reconciled content, model, quality, and source documents with the released corpus. Retained explicit incomplete coverage and linked the manifest's next batch.
- Commits: Foundation `da4f1ab`; pilot line comparisons `33c7097`; Truân–Mông–Nhu–Sư `fb93a79`; advanced BPCT `69c4683`.
- Evidence: 84 released records, 303 cited claims, 202 locators; 8/64 quẻ and 48/384 positions in each of the three commentary books. Each group passed `./init.sh` with 263 tests, source fingerprints, generated-output freshness, and diff checks.
- Blockers: none for this batch. Complete corpus review remains unfinished.
- Next: Review Tỷ, Tiểu Súc, Thái, Bĩ and BPCT chapter 5, sections 5–7 (Phi thần, Phục thần, Lục thú; PDF 68–69).

## 2026-10-01 — feat-034 four-quẻ group

- Status: active.
- Result: Added Tỷ, Tiểu Súc, Thái, and Bĩ with three-book overviews and 24 positions. Preserved selected Trình Di/Chu Hy differences, source spelling variants, and seven visually checked source discrepancies. Removed the equivalent legacy records.
- Coverage: 88 records, 401 claims, 297 locators; 12/64 quẻ and 72/384 positions in each commentary book. The remaining 52 quẻ retain unaudited compatibility content.
- Evidence: `./init.sh` passed 263 tests; supplied PDF fingerprints, generated-output freshness, and diff checks passed.
- Blockers: none.
- Next: Commit this group, then finish BPCT chapter 5, sections 5–7 with related passages.

## 2026-10-01 — feat-034 Phi–Phục and Lục thú group

- Status: active.
- Result: Added nine terms and three articles from BPCT chapter 5, sections 5–7. Checked Phi–Phục examples against the chapter 4 boards and Lục thú conditions against chapter 6 commentary. Excluded the unclear type-2 Phi wording and Đằng Xà element attribution; selected historical examples retain their context.
- Coverage: 100 records, 427 claims, 303 locators; 12/64 quẻ and 72/384 positions. Advanced coverage remains partial.
- Evidence: `./init.sh` passed 263 tests; PDF fingerprints, generated-output freshness, and diff checks passed. The four-quẻ group is committed as `c5bf201`.
- Blockers: none for the selected claims. The two excluded passages need clearer evidence before later publication.
- Next: Commit this group, then reconcile source documentation and complete the handoff.

## 2026-10-01 — feat-034 completed handoff

- Status: done.
- Result: Completed both selected tracks and reconciled the source inventory with exact passage locations, seven supported discrepancy resolutions, and explicit advanced exclusions. Reviewed content, quality, and model documents remain accurate; they link the canonical coverage report.
- Commits: Four quẻ `c5bf201`; Phi–Phục and Lục thú `5fa328c`.
- Evidence: Final `./init.sh` passed 263 tests. Coverage remains incomplete: 100 records, 427 cited claims, 303 locators; 12/64 quẻ and 72/384 positions in each commentary book. PDF fingerprints, generated-output freshness, and diff checks passed.
- Blockers: none for this batch. Phi thần type 2 and Đằng Xà’s own element remain excluded pending clearer source evidence.
- Next: Review Đồng Nhân, Đại Hữu, Khiêm, Dự and BPCT chapter 5, sections 8–10 (Tứ sinh, Nguyệt phá, Tuần không; PDF 70).

## 2026-09-30 — feat-028 casting layout and flow follow-up

**State**: active on `feat/028-coin-casting`; broader acceptance remains open.
**Done**: Implemented the shared sitewide spacing contract and refined casting UI. Parent browser QA verified four-coin one-press casting from 1/6 through 6/6, revisit preserving 2/6, result navigation, and visible desktop aside. Result widths matched the viewport content widths at 320px (305px), 390px (375px), and 1280px (1265px); board rows measured 48px.
**Evidence**: Final `./init.sh` and `git diff --check` passed with 225 package tests. After the global 320px body minimum was removed, browser checks reconfirmed no horizontal overflow on Casting and Result at 320/390/1280px; Result rows remained 48px and its desktop inspector visible.
**Blockers**: `pnpm test:release` is absent from the current root and web package scripts; its older 17/17 result does not verify this follow-up. User preview, physical-phone motion, and remaining feature criteria are unverified; no new evidence is claimed for manual mode, three-coin, reset-mid-animation, keyboard, or reduced motion.
**Next**: Present the updated preview, verify remaining acceptance criteria, and resolve stale release-check references before marking the feature done.

## 2026-09-30 — feat-028 shared manual casting workspace

**Result**: Manual and automatic casting now share the same card structure, coin arrangement, result region, and action bar. Manual coins remain individually editable until confirmation; confirmed lines remain locked on revisit. The obsolete detached manual action card was removed.

**Evidence**: `./init.sh` and `git diff --check` passed. Desktop browser review verified the shared layout; at 320px and 390px, four-coin manual casting had no horizontal overflow and preserved clearance for focus outlines. Browser interaction verified selection, confirmation, and next-line navigation.

**Remaining**: User preview and the other unchecked feat-028 acceptance criteria still need verification. Do not mark the feature done from this UI follow-up alone.

## 2026-09-30 — feat-028 shared footer and state review

**Result**: Moved reset into both sequential workspaces. Fixed clipped mobile actions and vertical footer movement when a line appears. Kept direct-entry reset separate.

**Evidence**: Final `./init.sh` and `git diff --check` passed. Browser QA at 320px completed six manual lines and opened Result; a confirmed line retained its faces on revisit. Reset required confirmation after input and cleared all lines. At 320px and 390px, all footer buttons fit the Card. At 320px the footer stayed at the same vertical position through automatic waiting, reduced-motion toss, reveal, and manual six-line completion. A completed result survived Library-to-Home navigation and was removed by confirmed “Lập mới.” Keyboard Space flipped a focused coin; Tab exposed its focus outline.

**Remaining**: User preview, physical-phone motion, actual screen-reader announcements, full keyboard traversal, fresh reload boundaries, and full visual flip review. Keep feat-028 active.

## 2026-09-30 — feat-028 responsive bento redesign

**Result**: Reorganized Home, casting, Result, Library, Library detail, and Settings around content-led shadcn cards. Added a mobile contextual back bar and persistent bottom tabs, including during casting; desktop uses a top navigation header without an application back link. Kept the installed Sera/Base UI preset, domain calculations, session behavior, and confirmation gates.

**Evidence**: Final `./init.sh` passed format, lint, typecheck, build, package exports, and 225 package tests; `git diff --check` passed. Direct browser review at 320px, 390px, and 1440px covered navigation, automatic and direct casting layouts, six-line direct completion, Result fact Sheet, Library search/list, a rule detail, Settings, and offline feedback. The inspected routes had no horizontal document overflow. Mobile Library tabs were changed to two rows at 320px, and result fact controls were made readable with a 44px minimum target.

**Remaining**: Existing feat-028 acceptance still needs user preview, physical-phone flip review, actual screen-reader announcements, full keyboard traversal, and session-boundary checks. Keep the feature active.

**Next**: Review the redesigned preview and complete the remaining casting acceptance checks before closing feat-028.

## 2026-09-30 — feat-028 closure and PR handoff

**Result**: Marked feat-028 done at the user's explicit request and prepared the responsive bento redesign for PR review. This is a directed closure with the unchecked acceptance criteria in `features/feat-028.md` still unverified.

**Evidence**: Fresh `./init.sh` passed format, lint, typecheck, build, package exports, and 225 package tests. The prior browser review covered 320px, 390px, and 1440px layouts and primary route flows.

**Remaining**: Physical-phone flip review, actual screen-reader announcements, full keyboard traversal, fresh reload boundaries, complete desktop/mobile flip review, and user preview are unverified. `pnpm test:release` is not defined.

**Next**: Review the PR and perform the remaining visual, assistive-technology, and session-boundary checks.

## 2026-09-30 — PR #52 review fixes

**Result**: Fixed the defects found while reviewing PR #52 against the shadcn and shadcn-ui skills. The automatic-casting primary action no longer clips against the card at 320px; the two-row Library tab list sizes to its content; search clear, rule filters, tab triggers, and remaining default-size buttons reach the 44px target; section titles expose heading roles; list rows use `divide-y`; the mobile casting border seam is 1px; and the dead `route-page--*` modifiers and stale canonical-doc statements are gone.

**Evidence**: `./init.sh` passed format, lint, typecheck, build, package exports, and 225 package tests. Chromium at 320px re-measured the fixed surfaces: footer buttons 0px clipped, tab list 100px with no label overlap and 44px triggers, clear button 44x44, filter toggles 44px, fact buttons 54px, heading roles level 2 (level 3 for Library records), 1px hexagram/coin seam, and no horizontal document overflow. Desktop at 1440px kept the 1280px wrapper, a 52px single-row tab list, and the three-column record grid. `pnpm dlx shadcn@latest preset resolve` confirmed preset `b59jumGwPA`.

**Remaining**: Preview at 360-420px, user preview, physical-phone flip review, actual screen-reader announcements, full keyboard traversal, fresh reload boundaries, and complete desktop/mobile flip review are still unverified. `pnpm test:release` is not defined.

**Next**: Push the fixes to `refactor/ui-ux-web` for PR #52 review.

## 2026-09-29 — feat-028 casting UX refinement

**State**: implementation refined on `feat/028-coin-casting`; live visual review is still required before marking the feature done.
**Changed**: Replaced bare 6/7/8/9 result headlines with Lão âm / Thiếu dương / Thiếu âm / Lão dương terminology, stabilized the automatic-casting result/action regions, simplified the shell/coin/dish visual language, shortened and staggered motion, and routed casting controls through the shared shadcn-style Button/Card/UI primitives. The destructive confirmation dialog now uses the shared alert-dialog primitive with centered overlay and open animation.
**Tests**: Release E2E expectations were updated for canonical line names and a mobile regression test now checks that the automatic primary action does not shift vertically after a reveal.
**Remaining**: Run repository verification and perform the required desktop/mobile live-animation visual review before checking feat-028 motion acceptance.

## 2026-09-29 — feat-028 3D casting redesign

**State**: active; implemented the user-approved replacement concept on PR #49.
**Changed**: Replaced turtle/dish animation with a lazy Three.js bronze-coin stage, staggered launch/contact, camera reveal, and six-line forming hexagram. Removed numeric outcome copy from casting modes. Scene completion replaces the independent reveal timer; reset cancels motion. Added static fallback for unavailable/lost WebGL.
**Evidence**: `./init.sh` passed with 225 package tests; release E2E passed 16/16. Direct desktop/mobile checks completed six fixed four-coin outcomes, revisit, and calculation with stationary actions. Reduced motion, fallback, context loss, reset, cancel, and production offline lazy loading passed. Reviewed launch/contact/reveal frame captures at both viewport sizes.
**Limits**: Physical-phone frame pacing remains unverified; the 3D chunk adds approximately 133kB gzip. Feature remains active pending live preview motion acceptance.
**Next**: Review the updated PR preview on desktop and a physical phone.

## 2026-09-29 — feat-028 always-on motion and readable identities

**State**: active; user requested three concrete follow-up changes on PR #49.
**Changed**: Explicit tosses now animate regardless of reduced-motion preferences, including a cancellable DOM fallback. Added a shared `YaoSymbol` for automatic/manual/direct casting and result boards, with fixed 24px high-contrast SVG moving markers. Four-coin faces now share gold/blue/red/white palettes and large mountain/drop/flame/wind paths across textures, DOM controls, and a named legend.
**Evidence**: `./init.sh` passed (225 package tests); release E2E passed 16/16. Reduced-motion browser checks verified changed flight pixels, animation-length reveal, both moving markers, mobile layout, and mid-flight reset in WebGL and fallback modes. Reviewed desktop/mobile face captures and mobile direct/result layouts; no horizontal overflow.
**Next**: Review the updated preview on the user's device for motion and elemental-symbol readability; keep the feature active until visual acceptance.

## 2026-09-29 — feat-028 Base UI replacement plan

**State**: active on `feat/028-coin-casting`. The user superseded the 3D design and requested full-shadcn migration on this branch.
**Done**: Replaced the execution plan with staged Base UI migration, fixed coin flips, page redesign, cleanup, and verification. The user selected six vertical direct-input rows. Canonical specs mark the new presentation as intended and the flip timing as proposed.
**Evidence**: CLI decoded preset `b59jufSZGa` as Sera/Neutral/Lucide/Noto Sans/Noto Serif. `info --json` reports the existing base as Radix. CLI help confirms explicit `--base base`, `--pointer`, and reinstallation flags.
**Limit**: Planning only. The application and dependencies still match commit `46441cc`.
**Next**: Review `docs/plans/feat-028.md`, then execute Task 1 inline on the current branch.

## 2026-09-29 — feat-028 Base UI migration verified

**State**: active on `feat/028-coin-casting`; implementation is locally verified.
**Done**: Completed the approved Sera/Base UI migration across casting modes, routes, and shared controls; replaced Three.js with predetermined DOM/CSS coin flips and fixed responsive layout defects found in browser review.
**Evidence**: `./init.sh` passed with 225 package tests; `pnpm test:release` passed 17/17; `git diff --check` passed. Browser audits at 320/390/1280px verified direct-choice sizing, manual action targets, Library tabs, stable coin centers, alternating faces under normal/reduced motion, and Home mouse/keyboard navigation.
**Blockers**: Physical-phone motion pacing and user review of the PR preview remain outstanding. Build logs report sourcemap-location and >500KB chunk warnings.
**Next**: Present the updated PR #49 preview for user visual review after implementation changes are committed and pushed.

## 2026-09-28 — feat-018 web localization and verification

**State**: active on `feat/018-vietnamese-language`; implementation and verification are committed locally, with final workflow, push, and PR remaining.
**Done**: Localized the web reading, casting, result, Library, Settings, accessibility copy, HTML/PWA metadata, and related product-spec examples. Removed CJK-only runtime fonts, font coverage scripts, licensing copies, and CI machinery while keeping Vietnamese/Latin fonts. Completed production browser review at 390×844 and 1440×900, including all casting modes, confirmation/recovery, results and fact explanations, Library search/categories/no-results/details, Settings, and service-worker offline loading.
**Evidence**: `./init.sh` passed (format, lint with one existing warning, typecheck, build, package exports, and 217 package tests); production manifest and HTML both report `vi`, no Han characters appeared in sampled rendered/accessibility text, six direct `7` inputs yielded `hexagram-01` / Thuần Càn, and offline Library navigation worked under the service worker. Update-ready and install-prompt states were not forced. Detailed checklist: `docs/plans/feat-018.md`.
**Blockers**: none; PWA update/install prompt states remain untested and are recorded as such.
**Next**: Run the final repository workflow, push `feat/018-vietnamese-language`, and open the PR.

## 2026-09-28 — feat-018 pull request opened

**State**: done; PR #24 is open for review.
**Done**: Pushed the verified implementation and created [PR #24](https://github.com/tungxuan1656/liuyao/pull/24). Updated the feature index and handoff to reflect completion and review status.
**Evidence**: `./init.sh` passed before push; branch `feat/018-vietnamese-language` tracks `origin/feat/018-vietnamese-language`.
**Blockers**: none; PWA update-ready and install-prompt states remain untested as noted in the PR.
**Next**: Address review feedback, then merge PR #24.

## 2026-09-28 — feat-018 search review fixes

**State**: active follow-up on `feat/018-vietnamese-language`; PR #24 is open.
**Done**: Reproduced the two review findings in knowledge search. Updated normalization to prefer diacritic-preserving matches for accented queries, use accent-insensitive fallback otherwise, fold `đ` to `d`, and match stable IDs only as identifiers. Added regression coverage for Đoài/doai, Càn versus Cấn, Thuần Càn versus Thuần Cấn, and the requested hexagram/trigram/term/rule IDs.
**Evidence**: `pnpm --filter @liuyao/knowledge test` passed (41 tests); `pnpm --filter @liuyao/knowledge typecheck` passed.
**Blockers**: none.
**Next**: Run the full repository workflow, commit the search fix, and push it to PR #24.

## 2026-09-28 — feat-018 search fixes pushed

**State**: done; PR #24 has the review fixes and is awaiting CI.
**Done**: Committed and pushed the search normalization, ID matching, regression tests, and matching search-spec clarification to PR #24.
**Evidence**: `./init.sh` passed on the implementation; knowledge tests passed (41/41), knowledge typecheck passed, and the branch head is `8a9d8b7`. GitHub reports the PR as mergeable; CI for the new head is queued.
**Blockers**: none; wait for CI completion.
**Next**: Confirm CI is green, then merge PR #24.

## 2026-09-28 — feat-018 planning

**State**: todo; implementation not started.
**Done**: Recorded the approved Vietnamese-only product language, no-Han display rule, canonical language spec, and staged implementation plan for web UI and knowledge.
**Evidence**: `docs/product-specs/vietnamese-language.md`, `features/feat-018.md`, and `docs/plans/feat-018.md`; working tree was clean before these planning changes.
**Blockers**: The canonical Vietnamese domain glossary requires review before data translation.
**Next**: Activate feat-018 after confirming feat-012 is done.

## 2026-09-28 — feat-018 activated

**State**: active on `feat/018-vietnamese-language`.
**Done**: User approved branch-based implementation, a plan-first commit, separate commits per implementation stage, and PR creation after verification. Dependencies are satisfied; plan defines the remaining work and verification gates.
**Evidence**: `feature_index.json` records feat-018 as the sole active feature; plan is `docs/plans/feat-018.md`.
**Blockers**: Final Vietnamese Liu Yao terminology requires editorial/source review before bulk catalog translation.
**Next**: Review Vietnamese reference sources and add the canonical glossary; commit that stage before implementation.

## 2026-09-28 — feat-018 glossary

**State**: active on `feat/018-vietnamese-language`.
**Done**: Added canonical Vietnamese names for all trigrams and hexagrams, core Liu Yao terms, and source notes before catalog translation.
**Evidence**: `docs/product-specs/vietnamese-language.md`; names and ordering cross-checked against the Vietnamese Wikipedia hexagram list, and terminology against Vietnamese-language Liu Yao references. Commit: pending.
**Blockers**: none for the knowledge localization stage.
**Next**: Commit the glossary, then localize catalog fields and add no-Han contract tests.

## 2026-09-28 — feat-018 knowledge localization

**State**: active on `feat/018-vietnamese-language`.
**Done**: Localized all knowledge entities, terms, rules, source descriptions, references, and package metadata; removed the Han display field; kept stable IDs and core pair mappings. Added full-catalog CJK, canonical-name, and Vietnamese search assertions.
**Evidence**: `pnpm --filter @liuyao/knowledge test` (7 files, 41 tests passed); `pnpm --filter @liuyao/knowledge typecheck`; `git diff --check`.
**Blockers**: none.
**Next**: Commit the knowledge package stage, then localize the reading and navigation UI.

## 2026-09-28 — feat-019

- Result: Corrected changed-board labels so only moving lines announce a polarity change; added one-moving-line coverage for all six positions.
- Verification: `./init.sh` passed; lint reported one pre-existing warning and zero errors.
- Handoff: feat-019 implementation complete on `feat/019-static-line-annotations`; integration and issue #25 closure remain.
- Next: Integrate feat-019 and confirm issue #25 closed before starting feat-020.

## 2026-09-28 — feat-020

- Result: Install prompt is captured at application startup and retained across navigation until Settings uses it.
- Verification: `./init.sh` passed. Headless Chromium simulated Home `beforeinstallprompt` → Settings use → dismissed outcome and cleared action; native install was not tested.
- Handoff: feat-020 implementation complete on `feat/020-global-install-prompt`; integration and issue #26 closure remain.
- Next: Integrate feat-020 and confirm issue #26 closed before starting feat-021.

## 2026-09-28 — feat-021

- Result: Update bypass is armed only in the service-worker takeover reload callback, not when update acceptance is clicked; failed/no-op application and cancellation cannot arm it by code inspection.
- Verification: `./init.sh` passed. Oracle reviewed the implementation. Headless Chrome 148 registered a waiting worker and cancellation was observed; a synthetic casting `beforeunload` was prevented. Successful takeover/reload and rejected/no-op acceptance were not runtime-tested. User approved code-inspection evidence for these gaps; automated regression is deferred to feat-025.
- Handoff: feat-021 implementation complete on `feat/021-transient-update-bypass`; integration and issue #27 closure remain.
- Next: Integrate feat-021 and confirm issue #27 closed, then start feat-022.

## 2026-09-28 — feat-022

- Result: Changed-board trigrams link to their Library identities instead of primary-result fact inspectors. Rule inspectors link internally to Library; source links remain separate.
- Verification: `./init.sh` passed. No new fact mapping requires a test. Browser interaction was not verified; the navigation paths were inspected in source.
- Handoff: feat-022 implementation complete on `feat/022-changed-result-facts`; integration and issue #28 closure remain.
- Next: Integrate feat-022 and confirm issue #28 closed before starting feat-023.

## 2026-09-28 — feat-023

- Result: V1 Library term/entity details link explicitly modeled applicable rules. Source references support hexagrams and trigrams as well as terms and rules without conflating rules with sources.
- Verification: `./init.sh` passed; knowledge regression tests cover accepted/retrievable figure references and broken targets. Browser interaction was not tested.
- Handoff: feat-023 implementation complete on `feat/023-library-relationships`; integration and issue #30 closure remain.
- Next: Integrate feat-023 and confirm issue #30 closed before starting feat-024.

## 2026-09-28 — feat-024

- Result: Automatic casting now proceeds one line at a time; six immutable three-coin outcomes remain with the active reading, without invented manual/direct tosses.
- Verification: `./init.sh` passed. Core package tests cover toss snapshot integrity. UI flow was inspected in source but not browser-tested; web E2E was not added.
- Handoff: feat-024 implementation complete on `feat/024-automatic-toss-evidence`; integration and issue #29 closure remain.
- Next: Integrate feat-024 and confirm issue #29 closed before starting feat-025.

## 2026-09-28 — feat-025

- Result: Added root Playwright release E2E with deterministic casting, Library, offline and real two-build PWA update scenarios; CI now runs the suite. Reassessed F11 gaps in feat-012 without claiming a full release matrix.
- Verification: `pnpm test:release` passed 12/12 on Playwright 1.63.0 / Chromium 153.0.8010.12 / macOS 26.5.1. `./init.sh` passed. Synthetic install-event handling is not native installation; other unverified F11 items remain listed in feat-012.
- Handoff: feat-025 implementation complete on `feat/025-release-e2e`; PR integration and issue #31 closure remain.
- Next: Merge feat-025 after CI, close issue #31, then start feat-026.

## 2026-09-28 — feat-026

- Result: The V1 result layout contract now uses the implemented 900px breakpoint, close/Escape/scrim drawer dismissal, and feat-024's per-line automatic casting panel. Feat-009 and feat-010 acceptance records now distinguish supported PR evidence from incomplete original task checks; feat-012 waivers remain unchecked.
- Verification: `git diff --check` and targeted Prettier checks passed. No new runtime behavior was introduced or claimed.
- Handoff: feat-026 documentation changes are complete on `feat/026-spec-evidence-reconciliation`; PR integration and issue #32 closure remain.
- Next: Integrate feat-026 and confirm issue #32 closed before starting feat-027.

## 2026-09-28 — feat-027

- Result: Library ID search now requires a full stable identifier; partial technical IDs no longer match by ID. Trigram details list all related hexagrams with a count.
- Verification: `./init.sh` passed, including knowledge regression tests. The release suite passed 12/12 before the final test-only edit; no responsive browser visual check was performed.
- Handoff: feat-027 implementation complete on `feat/027-library-search-relationships`; PR integration and issue #33 closure remain.
- Next: Merge feat-027 after CI and confirm issue #33 closed.

## 2026-09-28 — feat-028 implementation handoff

**State**: active on `feat/028-coin-casting`; automated verification passed, visual and complete-flow validation remain.
**Done**: Implemented manual per-coin confirmation, direct six-line choices, and three-/four-coin automatic casting. Split casting presentation into focused components to meet the TypeScript file-size limit.
**Evidence**: `./init.sh` passed after the split (format, lint with two warnings, typecheck, build, 225 package tests, and package exports). Browser checks sampled desktop/iPhone coin faces and stable stage heights (242px desktop; 220px mobile); non-reduced animation was active at 80/450/900/1400ms, revealed by 1900ms with unchanged stage height, while reduced motion revealed immediately. Core tests exhaustively cover three-/four-coin mappings. Manual/direct browser checks were partial; complete six-line completion/revisit/reset remains unverified.
**Blockers**: Meaningful mobile and desktop live-animation visual review is still required; timing samples alone do not establish motion quality.
**Next**: Record live-animation visual review on mobile and desktop, then validate full six-line completion, revisit, and reset before finalizing acceptance.

## 2026-09-27 — feat-007 draft PR

**State**: blocked; PR #18 is open as a draft and plan/PR review is pending.
**Done**: Pushed the F06 implementation on `tungxuan1656/feat-007-reading-flow` and opened [PR #18](https://github.com/tungxuan1656/liuyao/pull/18). Updated the feature index/handoff to blocked because F06-T12 needs Product Owner approval; kept later features todo.
**Evidence**: `./init.sh` passed with 155 core tests and 41 knowledge tests; direct UI flows/viewports and identity limitation are recorded in `docs/plans/feat-007.md` and `features/feat-007.md`.
**Blockers**: Plan/PR review pending; feat-013 has not approved the public name or primary language required by F06-T12.
**Next**: Resolve current-head review feedback and obtain Product Owner identity approval through feat-013; only then complete T12 and mark feat-007 done.

## 2026-09-27 — feat-007 review follow-up

**State**: active; implementation acceptance complete locally; PR #18 plan/PR review remains pending.
**Done**: Confirmed user approval of Lục Hào and English for the reading-flow UI, completed F06-T12 for this scope, preserved broader identity decisions for feat-013, and fixed typed-question cancel safety, stacked confirmation dialogs, duplicate dialog IDs, and a stray feature-record artifact.
**Evidence**: `./init.sh` passed: 41 knowledge tests in 7 files, 155 core tests in 13 files, format, lint/length, typecheck, build, package exports, and test placement. One pre-existing non-failing Fast Refresh warning remains at `apps/web/src/components/ui/button.tsx:49`. Identity decision and earlier direct UI flow/viewports are recorded in `docs/plans/feat-007.md`.
**Blockers**: Updated PR head still needs plan/PR review. PWA update-badge removal is deferred to feat-011.
**Next**: Send the verified updated head for plan/PR review and address any findings.

## 2026-09-27 — feat-007 identity decision recorded

**State**: active; plan/PR review pending.
**Done**: Recorded the explicit approval of Lục Hào as final public name and English as primary interface language in the canonical identity spec. Marked feat-013 F12-T02 complete; kept F12-T04 and all other identity tasks open. Restored the dated provisional-identity decision in the feat-007 plan and reconciled its later approval record.
**Evidence**: `docs/product-specs/product-identity.md` owns the approval and remaining identity scope; `features/feat-013.md` records T02 complete and T04 open. Feat-007 plan and handoff link to the canonical decision.
**Blockers**: Feat-007 plan/PR review remains pending; feat-013 identity work remains todo.
**Next**: Complete feat-007 PR review and merge; leave remaining feat-013 identity decisions for its separately selected feature.

## 2026-09-27 — feat-007 complete

**State**: done; PR #18 merged at `dda7973c12d4191ae43f4260fe661c49717e04ef`.
**Done**: Closed feat-007 after PR review and acceptance. F06-T12 is complete for the approved Lục Hào name and English interface; broader identity tasks remain with feat-013.
**Evidence**: PR head `08d19d5` passed CI `verify` and GitGuardian; code review had no blocking findings. `./init.sh` previously passed, with evidence in `docs/plans/feat-007.md`.
**Blockers**: none for feat-007.
**Next**: Activate feat-008, already selected in the user's feat-007–012 batch.

## 2026-09-27 — feat-008 browser validation follow-up

**State**: implementation complete; coordinator validation pending.
**Done**: Improved compact result readability by stacking primary and changed hexagram boards at 390px. Added guards to keep keyboard focus inside the compact drawer.
**Evidence**: `./init.sh` passed after latest code edits; `git diff --check` passed. Browser checks showed the one-control drawer retains focus on Close after Tab and Shift+Tab. A real mouse click on the scrim dismissed the dialog, restored focus to the triggering trigram, and unlocked body scrolling; CSS-selector click was inconclusive. Earlier checks for no-change/changed results and wide layout remain recorded in `features/feat-008.md`. F07-T14 is code-audited, not runtime-forced: `finish` catches calculation errors and copies all submitted values to the draft.
**Blockers**: Forced calculation failure was not reproduced; dependency-state confirmation remains for coordinator validation.
**Next**: Coordinator reviews evidence and decides whether forced-failure runtime coverage is required.

## 2026-09-27 — feat-008 interim result semantics and responsive review

**State**: implementation complete; coordinator validation pending.
**Done**: Applied coordinator decision to limit the changed board to changed polarity and trigram identities. Unified compact/drawer breakpoint through 899px; added drawer resize cleanup and refocus; added accessible Yao symbols and an honest unavailable changed-hexagram state.
**Evidence**: `./init.sh` passed after the module split. At 390px, changed board contains only polarity and changed trigram identities; no-change has no changed board. With drawer open at 390px, active element was Close, overflow hidden, dialog present. Resize to 900px removed dialog, restored focus to trigger, cleared overflow; back to 768px retained trigger focus, reopened dialog, relocked overflow. Full evidence in `features/feat-008.md`.
**Blockers**: Coordinator validation and dependency-state confirmation.
**Next**: Coordinator validates feat-008 implementation and browser evidence.

## 2026-09-27 — feat-008 compact drawer visibility fix

**State**: implementation complete; coordinator validation pending.
**Done**: Changed the drawer’s CSS wide-hide breakpoint to 900px, matching the 899px compact layout boundary.
**Evidence**: On Vite, open drawer at 768, 800, and 864px computed `display: block` and `visibility: visible`; focus remained on Close, body overflow was hidden, and one dialog was present. Escape at 864px dismissed, restored trigger focus, and unlocked body scroll. At 900px drawer was absent and wide inspector visible. `./init.sh` and `git diff --check` passed.
**Blockers**: Coordinator validation and dependency-state confirmation.
**Next**: Coordinator validates the final feat-008 result view.

## 2026-09-27 — feat-008 complete

**State**: done; PR #19 merged at `93df44096fd0eabbb5c6a65cb3a9e2205f6e90d1`.
**Done**: Closed feat-008 after PR #19 head `5b27046d8e64ed5a23ca757050a61c10a256be00` passed CI `verify` and GitGuardian. Updated the result-view handoff and feature index to reflect merged completion.
**Evidence**: `./init.sh` and browser checks are recorded in `features/feat-008.md` and earlier progress entries. Forced calculation failure was code-audited but not runtime-forced.
**Blockers**: none for feat-008.
**Next**: Activate feat-009, already selected in the user's feat-007–012 batch.

## 2026-09-27 — feat-009

**State**: active; implementation and assigned browser checks complete, coordinator validation pending.
**Done**: Built Library category browsing and filters, local search/no-results UI, canonical list/detail routing, related figure links, rule detail references, and source metadata/location display. Exported required record types from the knowledge package public entry.
**Evidence**: `./init.sh` passed format, lint, typecheck, build, package exports, and 196 package tests; lint reports one pre-existing Fast Refresh warning in `apps/web/src/components/ui/button.tsx`. Agent-browser verified compact (390×844) and wide (1440×900), category counts (64/8/55/10), alias search (`heaven` → Qian), no-results state, direct detail reload, related links, rule source/location, and offline reload of built-preview `/library` and hexagram detail. Development-server offline failure was not treated as PWA evidence.
**Blockers**: No known implementation blocker; term-to-rule associations are absent in the existing knowledge catalog.
**Next**: Coordinator reviews the implementation and verification evidence.

## 2026-09-27 — feat-009 evidence clarification

**State**: active; coordinator validation pending.
**Done**: Clarified the source-coverage boundary for F08-T10/T11 in `features/feat-009.md`; prior progress entry is preserved as append-only history.
**Evidence**: Corrected test evidence is 41 knowledge-package tests total; `packages/knowledge/tests/search.test.ts` has 3 tests. Offline built-preview reload was verified for `/library` and `/library/hexagram/hexagram-01` only; other routes were not individually checked offline. Catalog references cover 10 rules and `term-trigram` only, with no hexagram/trigram references and no references for 54 terms. UI source metadata/location behavior is supported only where catalog references exist; unreferenced mappings are not claimed as citations.
**Blockers**: Coordinator validation remains pending; catalog source-reference coverage is limited.
**Next**: Coordinator validates the implementation and evidence, including the documented source-coverage limits.

## 2026-09-27 — feat-010 implementation

**State**: implementation complete locally; coordinator validation pending.
**Done**: Replaced the Settings placeholder with responsive diagnostics for app/package versions, ruleset, live connection status, browser-qualified install status, update availability, fixed line conventions, and information links. Kept update application user-triggered and added no account, sync, history, analytics, or cloud controls.
**Evidence**: `./init.sh` passed: format, lint/length, typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. One pre-existing non-failing Fast Refresh warning remains in `apps/web/src/components/ui/button.tsx`. Agent-browser checked 390×844 and 1440×900 layouts with no horizontal overflow; the install state varied with exposed browser evidence. No waiting update or real offline transition was available for browser verification. Details and limits are in `features/feat-010.md`.
**Blockers**: Update-available action and real offline behavior were not exercised; standalone privacy policy does not yet exist.
**Next**: Coordinator validates feat-010 implementation and evidence.

## 2026-09-27 — feat-010 update-state correction

**State**: implementation complete locally; coordinator validation pending.
**Done**: Removed Settings' `useRegisterSW` registration and nonfunctional update action after review found they conflicted with Vite PWA `autoUpdate` and could reload in-memory readings. Settings now inspects an existing service-worker registration and distinguishes unsupported, unregistered, no-waiting, and waiting states without registering or applying updates. Corrected install availability to report unavailable only after the browser's install prompt event is observed.
**Evidence**: Fresh `./init.sh` passed after the correction: lint/length, typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. Existing Fast Refresh warning only. Agent-browser at 390×844 and 1440×900 showed no overflow and accurately reported “No service worker is registered”; no other registration state was available. See `features/feat-010.md` for details.
**Blockers**: No service-worker registration/update flow or draft-safe update handling is implemented here; that work belongs to feat-011. No waiting update or real offline browser transition has been verified.
**Next**: Coordinator validates feat-010; service-worker registration/update safety remains assigned to feat-011.

## 2026-09-27 — feat-011 UI lane

**State**: UI implementation complete locally; coordinator validation pending.
**Done**: Added a global PWA update banner with explicit Later and Update now actions, a confirmation before reloading when a draft or completed reading remains in React memory, a visible offline notice, and Settings status/readiness subscribed to the shared PWA store. Preserved the parallel fixer's dirty PWA registration/store files.
**Evidence**: Final `./init.sh` passed format, lint/length (one existing Fast Refresh warning), typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. Production preview rendered Settings and a direct hexagram route at 390×844 with no horizontal overflow; offline-emulated direct route remained rendered, but Chromium still reported online. Preview reported offline readiness and install availability, but no waiting update existed to test the update prompt. See `features/feat-011.md`.
**Blockers**: Combined update-worker lifecycle, draft-safe acceptance, actual offline state, and the full recovery matrix require coordinator/fixer integration verification.
**Next**: Coordinator validates the combined UI/fixer lanes, especially service-worker registration and draft-safe update behavior.

## 2026-09-27 — feat-011 update-safety correction

**State**: UI safety correction implemented locally; coordinator validation pending.
**Done**: Lifted the home question and casting method into the in-memory reading session. Update confirmation now covers entered question/non-default method, draft, or completed reading. Explicit update acceptance signals the casting unload guard to stand down only for that reload; ordinary in-app navigation remains blocked when lines exist. Added status semantics and repositioned the banner clear of the top flow header; clarified unconfirmed Settings states. F10-T06/T07 are unchecked pending two-build evidence.
**Evidence**: `./init.sh` passed format, lint/length (one existing Fast Refresh warning), typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests. `git diff --check` passed. Prior production preview confirmed the offline indicator/routes and session-only loss on reload, but no waiting update existed to exercise Later, confirmation, or acceptance.
**Blockers**: Two-build update lifecycle and intentional-apply behavior still need browser evidence and coordinator review.
**Next**: Coordinator validates the corrected UI and combined worker lifecycle; F10-T06/T07 remain unchecked until two-build browser evidence exists.

## 2026-09-27 — feat-009 complete

**State**: done; PR #20 merged as `c18c1b379211c095987a919d295c5492b0b0dbdf`.
**Done**: Closed the Knowledge browser feature after PR #20 head `d5bdb631553971a71a44b4ecc48bb78d94e788a1` passed CI `verify` and GitGuardian. Recorded the merged status and catalog sourcing limits in the feature handoff.
**Evidence**: `./init.sh` and browser checks are recorded in `features/feat-009.md` and prior progress entries. Catalog references cover only 10 rules and `term-trigram`; there are no hexagram/trigram references or references for 54 of 55 terms, and no catalog-defined term-rule associations. Offline built-preview reload was checked only for `/library` and `/library/hexagram/hexagram-01`.
**Blockers**: none for feat-009.
**Next**: Activate feat-010 Settings, already selected by the user.

## 2026-09-27 — feat-010 complete

**State**: done; PR #21 merged as `1a205250bb2a592b8280e9eb3e1316247a385c1d`.
**Done**: Closed Settings after PR #21 head `5a43db89c04110d5c60ae8629ffc4e10624c2357` passed CI `verify` and GitGuardian. Recorded merged status and verification limits in the feature handoff.
**Evidence**: `./init.sh` and browser checks are recorded in `features/feat-010.md` and preceding progress entries. Browser checks covered 390×844 and 1440×900 layouts and truthful available browser states. No real offline transition or waiting service-worker update was verified; update registration and draft-safe application remain feat-011 scope.
**Blockers**: none for feat-010.
**Next**: Activate feat-011 Offline hardening, already selected by the user.

## 2026-09-27 — feat-011 production browser QA

**State**: active; production-browser evidence recorded; coordinator final validation pending.
**Done**: Verified service-worker control, offline routes/settings/banner, online→offline→reload→online recovery, and a two-build waiting-update flow that preserves the active question, manual method, and lines until explicit acceptance. Updated F10 task evidence without marking the feature complete.
**Evidence**: On production build `localhost:4188`, shell/fonts were precached and observed requests were same-origin. Offline route/settings and banner worked during the controlled connectivity/reload sequence. Isolated v1→v2 fixture at `localhost:4192` produced a distinct waiting worker via conditional 200; Later and Keep reading preserved state; accepted Update now reloaded into v2 and cleared the in-memory draft. Native `beforeunload` prompt absence was not definitively observable, although intentional reload completed; `isUpdateAccepted` code guard suppresses it. QA covers this browser subset only, not a full cross-browser matrix. F10-T03 and T08 remain unchecked for insufficient evidence; acceptance remains unchecked.
**Blockers**: Coordinator validation; evidence does not yet establish absence of remote runtime dependencies across all core flows or normal use when installation is unavailable.
**Next**: Coordinator validates feat-011 evidence and determines whether F10-T03/T08 need further verification.

## 2026-09-27 — feat-011 final evidence update

**State**: active; F10-T01–T10 evidence recorded; coordinator/PR gate pending.
**Done**: Completed source/build audit for remote runtime dependencies and verified normal browser use without installing in a production-fixture session. Marked all F10 tasks and acceptance criteria supported by the combined implementation, test, and browser evidence; kept feat-011 active for final coordinator/PR validation.
**Evidence**: No required remote runtime APIs/assets were found in reading, casting, result, Library, or Settings; core assets are same-origin and precached, external GitHub/source links are user-initiated. Observed browser requests were same-origin, but no exhaustive network/cross-browser audit is claimed. With no `beforeinstallprompt` event observed (API exists; unsupported browser not proven), the user completed question/manual casting (lines `7, 8, 9, 6, 7, 8`) to Ji Ji/Sui, opened Library Qian detail and Settings without installing. Prior production offline/recovery and two-build draft-safe update evidence is recorded in `features/feat-011.md`. Native `beforeunload` prompt absence remains unconfirmed; intentional update reload completed and `isUpdateAccepted` suppresses the guard.
**Blockers**: Coordinator/PR gate only; browser verification is a subset and does not claim full cross-browser coverage.
**Next**: Coordinator validates the complete feat-011 evidence and proceeds through the PR gate.

## 2026-09-27 — feat-011 complete

**State**: done; PR #22 merged as `a70c8f3e145536cd48db84dd9c2e61b7c14f1265`.
**Done**: Closed Offline hardening after PR #22 head `509a079c45fa82809749384ba03bb566a720e96f` passed CI `verify` and GitGuardian. Recorded merged status and QA limits in the feature handoff.
**Evidence**: `./init.sh`, production offline/recovery, draft-safe two-build update, source/build audit, and no-install normal-use browser evidence are recorded in `features/feat-011.md` and preceding progress entries. QA was limited to tested Chromium sessions; it was not a full cross-browser or exhaustive network audit. Native `beforeunload` prompt absence was not definitively observable, though intentional UI update reload completed and `isUpdateAccepted` suppresses the guard for accepted updates.
**Blockers**: none for feat-011.
**Next**: Activate feat-012 Quality hardening, already selected by the user.

## 2026-09-27 — feat-012 UI audit continuation

**State**: UI lane advanced; coordinator validation pending.
**Done**: Production-preview Chromium checks covered the home-to-manual-reading/result flow, fact drawer focus containment/return, native discard dialog keyboard actions, library empty search, settings and result empty state. Viewports 390×844, 768×900, 1024×900, and 1440×1000 had no horizontal document overflow. Checked visible labels/names and representative 44px controls. Changed the shared muted text token after contrast review identified insufficient contrast.
**Evidence**: `agent-browser 0.26.0` with Chromium. Drawer received initial focus, Tab stayed in drawer, Escape closed it and restored trigger focus. Discard dialog opened with “Keep editing” focused; Tab reached “Discard and leave”; Escape returned to casting. Only Chromium tested; safe-area emulation unavailable; invalid/offline/update/calculation-error flows and post-token contrast/non-text contrast remain unverified. `./init.sh` and `git diff --check` results recorded after final edits below.
**Blockers**: F11-T01 completeness needs coordinator review; F11-T11 supported browser matrix incomplete. Several failure/update-state and contrast checks remain open.
**Next**: Rebuild and measure contrast after token adjustment, then finish safe-area/failure/update checks and request coordinator validation.

## 2026-09-27 — feat-012 post-build UI audit

**State**: UI lane remains active; coordinator validation pending.
**Done**: Rechecked the rebuilt production CSS asset and verified Chromium resolves the changed muted token (`oklch(0.44 0 0)`). Confirmed a real waiting-update banner was present in the preview and linked reusable feat-011 two-build/offline evidence from the feature record.
**Evidence**: `./init.sh` passed after source changes (format, lint with one existing Fast Refresh warning, typecheck, build, package exports, placement, 155 core and 41 knowledge tests). `git diff --check` passed. Contrast computation returned invalid 1.01 values despite resolved colors, so no contrast pass is claimed. Preview browser/storage state was contaminated by an older worker/asset and only the UI token was verifiable after the current bundle loaded.
**Blockers**: F11-T06 requires valid contrast formula results and UI-boundary measurements; F11-T09 still lacks invalid-input and calculation-error recovery evidence (reuse feat-011 offline/update evidence as linked). Safe-area-specific browser emulation, comprehensive interactive-class sizing, full flow console review, and Safari/Edge/iOS matrix are incomplete.
**Next**: Repair contrast-measurement method, exercise invalid/error cases via bounded injection/source audit, and complete available control-target and console checks. Keep T11 open unless all supported browser engines/platforms required by the matrix are actually available and tested.

**Follow-up evidence**: Fixed the measurement formula (previous custom parser incorrectly treated OKLCH lightness as sRGB); representative muted small text `oklch(0.44 0 0)` on white is 4.94:1 by WCAG relative luminance. Settings audit found product-info links with 40px width; added 44px minimum width. The production preview later returned 404 after rebuild, so this final CSS fix is not browser-verified. Source audit confirms calculation exceptions retain draft values and render `role=alert`; runtime injection remains incomplete.

**Fresh preview follow-up**: Built the current web app and served it on isolated port 4317, then rebuilt after a measured 21.6px library search field defect, added `min-height: 44px`, and verified 44px field height on isolated port 4318. At 390px, category tabs (≥69×48), navigation (117×44), Settings footer links (44–53×44), result-record links (343×91.4), and manual flow controls (all ≥44px high) were measured. Representative muted/secondary text pairs measured 4.94:1 and 4.62:1; remaining non-text boundaries and control classes are pending. Safe-area env() is supported but zero-valued without device emulation. Fresh home/library/empty-search logs showed no console or uncaught errors. Full direct-entry, drawer/banner/dialog touch audit, invalid/error runtime cases, complete console flow, non-zero inset, and Safari/Edge/iOS matrix remain blockers.

**Continuation evidence**: Rebuilt on a fresh preview at port 4320 and measured the result focus ring at 5.65:1 over result paper; strengthened it to `#334b32`, calculated at 8.17:1 on result paper and 9.1:1 on drawer paper. Direct-entry controls at 390px measured 301×44 selects and Calculate, 82.5×44 Cancel, and 343×44 Reset lines; no horizontal document overflow. Invalid-option injection was rejected by native select and Calculate remained disabled; this did not invoke the validation-error message. iPhone 14 UA/device emulation did not provide non-zero safe-area insets. Chrome 153.0.8010.53, Safari 26.5/safaridriver, and iOS simulators are installed/available; Edge was not found. No Safari/iOS simulator/Edge matrix runs were made. Remaining blockers documented in `features/feat-012.md`.

## 2026-09-27 — feat-012 fixture and browser evidence reconciliation

**State**: active; coordinator validation pending.
**Done**: Updated F11-T01 with the pure-board golden fixture evidence and corrected the supported-browser evidence in F11-T11. Other task statuses remain unchanged.
**Evidence**: F11-T01 covers 8 independently composed full pure-board fixtures, 14 moving cases, 8 changing-trigram cases, and direct/sequential equivalence; core suite has 176 tests and `./init.sh` passed. Fixture provenance is independent; no exhaustive all-combinations claim is made. Native Safari 26.5/macOS 26.5.1 confirmed home load only; Safari UI automation failed. iOS 26.5 launched without page confirmation. Android OS/Chrome was queried, then emulator went offline and preview exited without page evidence. Edge was absent. F11-T11 remains unchecked.
**Blockers**: Browser release matrix remains incomplete; other unchecked F11 tasks remain as documented in `features/feat-012.md`.
**Next**: Coordinator validates F11-T01 evidence and the corrected T11 matrix record; continue only the remaining open task evidence.

## 2026-09-27 — feat-012 Safari and compact Chromium QA

**State**: active; coordinator validation pending.
**Done**: Recorded native Safari WebDriver release-flow evidence and fresh compact Chromium console/touch-target samples. Kept T10, T11 and T13 unchecked because the evidence is partial.
**Evidence**: Safari 26.5/macOS 26.5.1 production `localhost:4187`: home, manual lines `7,8,9,6,7,8` → Ji Ji (63)/Sui (17), direct Library Qian, and Settings completed; sampled page errors and `unhandledrejection` were empty. Safari console endpoint unsupported, offline and question persistence not verified. Chromium 390×844 at `localhost:4326`: visible fact link minimums recorded in T13, inspector close 44×44 and dialog actions ≥129×44; dialog flow interrupted by stale element. Sampled reading/result/drawer console and uncaught buffers empty; offline `/result` showed “No active result.” Update banner dimensions were not measured and no waiting worker was present. Earlier mobile/Android/Edge limitations remain; no full release matrix is claimed.
**Blockers**: Remaining T09/T10/T11/T13 evidence and other unchecked quality tasks; coordinator validation.
**Next**: Continue the open feat-012 evidence items and have the coordinator validate this browser evidence.

## 2026-09-27 — feat-012 iOS and Android simulator evidence

**State**: active; coordinator validation pending.
**Done**: Recorded actual iPhone simulator Safari page evidence and the Android emulator startup limitation; kept F11-T07 and F11-T11 unchecked.
**Evidence**: iPhone 17 Pro simulator iOS 26.5 (runtime 23F77; system 26.5.1) Safari accessibility tree/screenshots from temporary server port 4332 confirmed home, Library, direct Qian detail and Settings. No casting/result, offline, or nonzero safe-area measurement; screenshots are outside the repo under `.../opencode/liuyao-ios-qa`. Android Pixel_2 Android 14 API 34 emulator Chrome 142.0.7444.171 remained at FirstRunActivity despite stable temporary server port 4331, so there is no app-page evidence. T07 and T11 remain unchecked; no other task status changed.
**Blockers**: Nonzero safe-area evidence and supported-browser matrix remain incomplete; coordinator validation.
**Next**: Continue open feat-012 evidence items and have the coordinator validate the recorded simulator/browser evidence.

## 2026-09-27 — feat-012 evidence waiver recorded

**State**: active; docs-only closure preparation pending coordinator validation, PR/CI, and merge.
**Done**: Recorded the user's explicit acceptance of waiving remaining feat-012 evidence gaps without marking the incomplete task checkboxes or acceptance criteria passed. Updated the handoff to prohibit marking done or changing `feature_index.json` before PR merge.
**Evidence**: `./init.sh` passed on prior clean code HEAD `2ab96995c843b01cd4bca0140426e39c9b5d6298` (176 core tests, 41 knowledge tests; existing Fast Refresh warning); it was not rerun for this docs-only update. Observed evidence and explicit gaps remain in `features/feat-012.md`. Edge/Android similarity is user-reported without exact versions/screenshots, not independently observed. Waivers cover missing complete contrast inventory, nonzero safe-area measurement, calculation-error runtime, full console sweep, supported-browser matrix (including Safari/iOS offline/casting), and rendered update-banner dimensions.
**Blockers**: Coordinator validation, PR/CI, and merge are pending; waived evidence remains incomplete and is not claimed as passed.
**Next**: Coordinator validates the waiver record and proceeds through PR/CI/merge gates; close feat-012 only after merge.

## 2026-09-27 — feat-012 complete

**State**: done by explicit user-approved evidence waiver; PR #23 merged to `main` at `486b01a70fe700b45b15e7487c8a03ef4485219f`.
**Done**: Closed feat-012 after merge. The feature index and handoff now record completion while leaving incomplete task checkboxes and acceptance criteria unchecked; the waiver is not represented as verification.
**Evidence**: PR #23 head `f8ecc580fab76c9fd0cb2bb12e4ed6688221e3e5` passed CI `verify` and GitGuardian. `./init.sh` passed with 176 core tests and 41 knowledge tests (existing non-failing Fast Refresh warning). Remaining exceptions are detailed in `features/feat-012.md`: incomplete contrast inventory, no nonzero safe-area measurement, no calculation-error runtime, no full console sweep, incomplete supported-browser matrix, and no rendered update-banner size measurement.
**Blockers**: None for feat-012. Release-matrix checks remain recommended separately and are not claimed complete.
**Next**: No further feat-012 action; address remaining release-matrix checks separately if selected.

## 2026-09-26 — feat-001

**State**: active; follow-up PR pending review and merge.
**Done**: PR #10 merged. Addressed the P2 review finding in the shared placeholder Return to home link without changing navigation.
**Evidence**: `./init.sh` passed; the 390×844px route measurements, keyboard focus, and navigation checks are recorded in `features/feat-001.md`.
**Blockers**: none for the fix; merge approval remains pending.
**Next**: Review and merge the follow-up PR, then close feat-001.

## 2026-09-26 — feat-001

**State**: done; PR #11 merged as `2f2936c`.
**Done**: Added 44×44px minimum target dimensions and visible keyboard focus to the shared placeholder Return to home link, preserving destinations; completed the follow-up handoff.
**Evidence**: Fresh Codex review approved PR #11 at `052bd46`; GitHub `verify` and GitGuardian checks passed. `./init.sh` and the browser measurements/navigation checks are recorded in `features/feat-001.md`.
**Blockers**: none.
**Next**: Begin feat-002 domain contracts.

## 2026-09-26 — feat-002

**State**: done; PR #12 merged by squash at `8761e4aa84dcb4ef71816ca03e61f26871f576d9`.
**Done**: F01-T01–T08 domain contracts, typed errors and validation, stable IDs, ordered positions, and reusable package fixtures.
**Evidence**: `pnpm --filter @liuyao/core test` passed 29 tests; `./init.sh` passed format, lint, length check, typecheck, build, and package tests. Details are in `features/feat-002.md`.
**Blockers**: none; one pre-existing non-failing web lint warning remains outside F01 scope.
**Next**: feat-003 is active; implement F02 after confirming its canonical task map and architecture constraints.

## 2026-09-26 — feat-003

**State**: active; implementation locally verified, pending Orca review and merge.
**Done**: F02-T01–T10 polarity, eight trigram patterns, 64 King Wen identities, moving-line transformations, and structured calculation API; retained F03 board work outside this scope.
**Evidence**: `pnpm --filter @liuyao/core test` passed 113 tests, package typecheck passed, and `./init.sh` passed format, lint, length check, typecheck, build, and package tests. Independent fixture provenance and source errata are recorded in `features/feat-003.md` and `packages/liuyao-core/tests/hexagram-fixtures.ts`.
**Blockers**: none for local verification; review and merge remain.
**Next**: Submit the verified F02 revision for Orca review.

## 2026-09-26 — feat-003

**State**: done; PR #13 squash-merged as `ef2a99b`.
**Done**: Completed F02-T01–T10: polarity and trigram identification, the 64-hexagram mapping, moving-line transformations, and the structured calculation API. Updated the architecture summary to reflect F02 and reserved board calculations for F03.
**Evidence**: Fresh Codex review approved PR #13 at `7ef963b`; GitHub `verify` and GitGuardian checks passed. The worker ran 113 core tests, package typecheck, and `./init.sh`; the reviewer ran 84 focused tests and core typecheck. Fixture provenance and source errata are documented in `features/feat-003.md` and `packages/liuyao-core/tests/hexagram-fixtures.ts`.
**Blockers**: none.
**Next**: Activate feat-004 Liu Yao board.

## 2026-09-26 — feat-004

**State**: active; plan and implementation not started.
**Done**: Activated F03 Liu Yao board after feat-003 merged; dependencies feat-002 and feat-003 are done.
**Evidence**: Feature dependency records in `feature_index.json` and `features/feat-004.md` were checked before activation.
**Blockers**: none.
**Next**: Commit `docs/plans/feat-004.md` and obtain fresh Orca plan review.

## 2026-09-26 — feat-004

**State**: done locally; PR review and merge pending.
**Done**: Completed F03-T01–T10: Eight Palace and Shi/Ying classification, Na Jia stems and branches, element mapping, Six Relatives, and six structured board lines; updated the product-scope and architecture summaries.
**Evidence**: Parent-run `./init.sh` passed 125 core tests in 12 files and 2 knowledge tests; format, lint, TypeScript length check, typecheck, and build passed. Lint reported one pre-existing, non-failing web `react-refresh` warning. Fixture and acceptance details remain linked in `features/feat-004.md` and `docs/product-specs/v1-task-map.md`.
**Blockers**: Plan revision `28e13b6` is pending fresh feedback; PR review and merge are not complete.
**Next**: Obtain fresh PR review feedback, address it, and merge after approval.

## 2026-09-26 — feat-004 PR review follow-up

**State**: done locally; PR #14 fresh review and merge pending.
**Done**: Isolated public palace and Na Jia lookup results after reviewer found mutation could corrupt later board facts; added runtime mutation regressions.
**Evidence**: `./init.sh` passed 127 core tests in 12 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. One pre-existing, non-failing web lint warning remains.
**Blockers**: Updated PR head requires fresh review approval.
**Next**: Request fresh PR #14 review on the corrected head and address any findings before merge.

## 2026-09-26 — feat-004

**State**: done; PR #14 squash-merged as `994ba1afcc1dcf190808d693dd5f701f06eb4246`.
**Done**: Completed F03-T01–T10 and addressed review findings for isolated readonly lookup results and feature documentation.
**Evidence**: Fresh Codex review approved head `5dee51279af59c264fed6681ee0caa1d505685fe`; GitHub `verify` and GitGuardian passed. The worker passed `./init.sh` with 127 core tests and 2 knowledge tests, format, lint, typecheck, and build; final docs-only changes passed focused format/diff/pre-push checks.
**Blockers**: none.
**Next**: Activate feat-005 Casting core.

## 2026-09-26 — feat-005

**State**: active; feat-002 dependency is done.
**Done**: Selected F04 Casting core from the user-approved feat-001–012 batch and confirmed its canonical task map and product scope.
**Evidence**: `feature_index.json` records feat-002 done and feat-005 active; F04 tasks and acceptance are defined in `docs/product-specs/v1-task-map.md` and `features/feat-005.md`.
**Blockers**: none.
**Next**: Commit the implementation plan and request fresh plan review.

## 2026-09-26 — feat-005

**State**: done locally; PR review and merge pending.
**Done**: Completed F04-T01–T07: deterministic three-coin outcomes, injected casting service, normalized direct/sequential inputs, and a web-only browser crypto adapter; updated observed architecture and product summaries.
**Evidence**: Parent-run `./init.sh` passed with 152 core tests in 13 files, 2 knowledge tests, format, lint, TypeScript length check, typecheck, build, and package tests. One pre-existing non-failing web `react-refresh` warning remains at `apps/web/src/components/ui/button.tsx:49`. Plan and focused evidence are in `docs/plans/feat-005.md`.
**Blockers**: Fresh PR review and merge remain outstanding; no PR approval is claimed.
**Next**: Submit the verified changes for fresh PR review and address any findings.

## 2026-09-26 — feat-005 PR review follow-up

**State**: done locally; PR #15 fresh review and merge pending.
**Done**: Corrected plan evidence chronology and rejected sparse three-coin arrays that could bypass iteration validation; added a regression.
**Evidence**: `./init.sh` passed with 153 core tests in 13 files and 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. One pre-existing non-failing web `react-refresh` warning remains.
**Blockers**: Updated PR head requires fresh review approval.
**Next**: Request fresh review of PR #15 on the corrected head and address any findings.

## 2026-09-26 — feat-005 merged; feat-006 activated

**State**: feat-005 done; feat-006 active.
**Done**: Squash-merged PR #15 as `bcc89d0` after fresh plan and PR review approval of exact head `5e7815ae35cec1a94b4454f2cc5afac3cdc218c2`; activated feat-006 Knowledge from the user-approved batch.
**Evidence**: The worker passed `./init.sh` with 153 core tests and 2 knowledge tests, format, lint, TypeScript length check, typecheck, and build. GitHub `verify` and GitGuardian passed; one pre-existing non-failing web `react-refresh` warning remains.
**Blockers**: none.
**Next**: Read the canonical F05 requirements and licensing boundaries, then commit the feat-006 implementation plan and request review.

## 2026-09-26 — feat-006

**State**: done locally; PR review and merge pending.
**Done**: Completed F05-T01–T12: typed schemas, stable IDs, 8/64 entity metadata, V1 terms and rules, source metadata, validated references, readonly lookups, and offline normalized search. Source locations remain absent where unverified.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, 31 knowledge tests in 6 files, and 153 core tests in 13 files. One pre-existing non-failing web `react-refresh` warning remains. The first web build failed on a missing optional native Tailwind binding; a forced frozen-lockfile reinstall restored it before the successful full run. Details: `docs/plans/feat-006.md`.
**Blockers**: Fresh plan and PR review approval and merge remain; no unverified source locator was invented.
**Next**: Submit the current head for fresh plan and PR review, address findings, then hand off for merge.

## 2026-09-26 — feat-006 plan review follow-up

**State**: done locally; fresh plan and PR review pending.
**Done**: Resolved plan review findings with broken-term-reference validation, independent 64-hexagram identity fixtures, and exhaustive displayed-fact-to-rule coverage; removed duplicate task ownership of F05-T10.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, 34 knowledge tests in 6 files, and 153 core tests in 13 files. One pre-existing non-failing web Fast Refresh lint warning remains; details are in `docs/plans/feat-006.md`.
**Blockers**: Current-head plan and PR approval and merge remain pending.
**Next**: Request fresh plan review on the corrected head, then resolve any findings before requesting PR review.

## 2026-09-26 — feat-006 merged

**State**: done; PR #16 squash-merged as `691f80d724f332f49a2c295e4e484a3d6cbdcbe5`.
**Done**: Completed F05-T01–T12 and addressed plan-review findings for broken-term validation, independent 64-hexagram fixtures, exhaustive fact-to-rule coverage, and accurate handoff status.
**Evidence**: Fresh plan and PR reviews approved exact head `e6382698f88fdfdaa573b49a4c051cd6fa6409aa`; GitHub `verify` and GitGuardian passed. `./init.sh` passed with 34 knowledge tests and 153 core tests; one pre-existing non-failing web Fast Refresh warning remains. Evidence and sourcing limits are in `docs/plans/feat-006.md`.
**Blockers**: none.
**Next**: Stop after feat-006 as instructed; leave later features todo until selected again.

## 2026-09-26 — feat-017 pre-flow hardening

**State**: done locally; PR creation and fresh review pending.
**Done**: Hardened core ID inventories and casting snapshots, completed the knowledge entity/rule/source model, added production fact-to-rule lookup and core drift tests, switched package defaults to built Node ESM, and expanded local CJK font coverage. Added feat-017 as a dependency of feat-007 and feat-008; both remain todo.
**Evidence**: Final `./init.sh` passed with 155 core tests in 13 files and 41 knowledge tests in 7 files. Build, typecheck, Node package-export smoke check, test placement, formatting, and TypeScript length checks passed. The only lint output was one pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`. FontTools 4.66.0/Brotli 1.2.0 verified 92/92 manifest codepoints in each CJK font. Mutation regressions reproduced the bad hexagram mapping and mutable casting snapshot before the fixes.
**Blockers**: PR creation and fresh review are pending; this branch has not been merged.
**Next**: Push `feat/017-preflow-hardening` and open a PR targeting `main`.

## 2026-09-26 — feat-017 PR handoff

**State**: PR #17 is open against `main`; fresh review is pending.
**Done**: Pushed `feat/017-preflow-hardening` and opened [PR #17](https://github.com/tungxuan1656/liuyao/pull/17). The PR contains the verified hardening work and is not merged.
**Evidence**: GitHub reports the PR head and base as `feat/017-preflow-hardening` → `main`. Final `./init.sh`, explicit format/lint checks, pre-push typecheck/tests, Node package-export smoke check, and the CJK cmap verification passed.
**Blockers**: Fresh PR review and approval are pending; no merge is claimed.
**Next**: Address review feedback on PR #17 and wait for approval.

## 2026-09-26 — feat-017 PR #17 review follow-up

**State**: done locally; PR #17 is updated on `feat/017-preflow-hardening`, open against `main`, and awaiting fresh review.
**Done**: Fixed clean-checkout TypeScript resolution while keeping runtime exports on built ESM; added declaration export smoke coverage; restored app UI glyph 六 to generated CJK coverage and renamed the subsets; added an automated WOFF2 cmap check to CI; corrected Zengshan Buyi attribution with Chinese Text Project provenance.
**Evidence**: With both package `dist/` directories removed, `pnpm typecheck` passed and `./init.sh` passed typecheck before build, package runtime/declaration checks, test placement, all 155 core tests and 41 knowledge tests. FontTools 4.66.0 and Brotli 1.2.0 confirmed exact 96-codepoint cmap coverage in both bundled CJK app fonts. Lint reported the pre-existing Fast Refresh warning at `apps/web/src/components/ui/button.tsx:49`.
**Blockers**: Fresh review and approval are pending; PR #17 has not been merged.
**Next**: Wait for fresh review of the updated PR head and address any new findings.

## 2026-09-26 — feat-007 activated

**State**: active; implementation plan pending commit and review.
**Done**: Selected feat-007 Reading flow and confirmed its dependencies are done; scoped work to F06-T01–15 and the V1 reading completion condition.
**Evidence**: `feature_index.json` and `features/feat-007.md` record feat-001, feat-004, feat-005, and feat-017 done; canonical acceptance is in `docs/product-specs/v1-task-map.md` and `docs/product-specs/reading-flow.md`.
**Blockers**: none.
**Next**: Commit `docs/plans/feat-007.md` and request plan review before implementing.

## 2026-09-26 — feat-007 implementation verified

**State**: active; implementation verified locally; PR pending plan review.
**Done**: Implemented F06-T01–11 and T13–15: app/home shell, session-only draft, automatic/manual/direct casting, core calculation, recovery and confirmation dialogs, focused casting route, and active result retention across root tabs. F06-T12 remains blocked until Product Owner identity approval; retained current provisional Lục Hào/English copy without claiming approval.
**Evidence**: `./init.sh` passed format, lint/length, typecheck, build, package exports, test placement, 155 core tests, and 41 knowledge tests; only the pre-existing `apps/web/src/components/ui/button.tsx:49` Fast Refresh warning remains. Direct browser evidence for 390×844 and 1024×576 layouts, all entry methods, reset/cancel/replacement safety, root-tab retention, and refresh recovery is in `docs/plans/feat-007.md`.
**Blockers**: Plan review result pending; F06-T12 needs Product Owner approval through feat-013, which remains todo.
**Next**: Obtain plan-review result, then commit/push the implementation and open a PR without marking feat-007 done until F06-T12 is approved.

## 2026-09-25 — feat-001

**State**: done, pending PR review and merge.
**Done**: F00-T01–T05 web foundation: styling, shadcn tokens, routes, self-hosted fonts, and responsive AppShell primitives.
**Evidence**: `./init.sh` and read-only verification passed; route, responsive, and local-font browser checks are recorded in `features/feat-001.md`.
**Blockers**: none for F00; finished Reading/Library/Settings/Casting flows belong to later features.
**Next**: Open the PR and resolve review feedback.
