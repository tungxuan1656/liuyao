# Supplied book sources

This document owns the supplied PDF inventory, source locations, and known source discrepancies.
The books support domain review. Their presence does not establish permission to redistribute them.
See [Licensing](../../LICENSING.md) for usage rights.
The section-to-record and owner crosswalk is in the [source-section inventory](../reviews/knowledge/source-inventory.md).

## Source inventory

The keys below identify these exact files for documentation review.
The [JSON source inventory](../../packages/knowledge/data/sources.json) owns runtime work IDs, edition IDs, fingerprints, local file paths, and bibliographic metadata.
Runtime IDs use `source-book-<key>` with lowercase keys.
Page numbers count PDF pages from one, including covers.

| Key    | Supplied source                   | PDF pages | Edition evidence                                                                                                               | Use                                                                        |
| ------ | --------------------------------- | --------: | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `BPCT` | Tăng bổ Bốc Phệ Chính Tông        |       467 | Vương Hồng Tự compilation. Vĩnh Cao translates and annotates the Vietnamese text, identified on PDF pages 1–3.                 | Liu Yao board rules and attributed advanced doctrine.                      |
| `PBC`  | Quốc văn Chu Dịch diễn giải       |       655 | Phan Bội Châu. Chương Thâu discusses manuscript and edition history on PDF pages 9–10.                                         | Hexagram names, classical text, and attributed commentary.                 |
| `NTT`  | Kinh Dịch trọn bộ                 |       938 | Ngô Tất Tố translates and annotates. The title page names Nhà xuất bản Văn Học. PDF 938 dates printing and deposit to Q1 2004. | Classical terminology and commentary associated with Trình Di and Chu Hy.  |
| `NHL`  | Kinh Dịch — Đạo của người quân tử |       393 | Nguyễn Hiến Lê. PDF page 2 reports correction against a ninth Văn Học reprint and Alfred Huang, dated 2014-11-01.              | Introductory terminology, hexagram structure, and attributed explanations. |

All four PDFs contain extractable text.
Some diagrams and blank pages contain little text.
The electronic editions contain transcription errors and editorial additions.
An electronic file date does not establish a book publication date.

### File fingerprints

Use the SHA-256 values in the [JSON source inventory](../../packages/knowledge/data/sources.json).
`pnpm --filter @liuyao/knowledge validate:corpus --check-books` verifies all four supplied inputs.
When a file changes, repeat its passage and locator review.
Keep the supplied filenames unchanged.

The four PDFs are local research inputs and are not versioned in this repository.
Place each file at the `localInputPath` recorded in the JSON source inventory before reviewing a passage.

## Reviewed locations

This inventory records focused V1 review. It does not claim a complete review of the 2,453 PDF pages.

| Topic                                 | Location                                                                                    | Evidence boundary                                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Five Element cycles and Six Relatives | `BPCT`, chapter 1, IV–V, PDF 9 (printed 3)                                                  | General rules reviewed. The worked Wood example contains a contradictory element.                                      |
| Earthly Branch elements               | `BPCT`, chapter 1, III, PDF 8 (printed 2)                                                   | Branch associations used by the V1 board.                                                                              |
| Trigram symbols and elements          | `BPCT`, chapter 1, VIII–IX, PDF 10–11 (printed 4–5)                                         | Symbols require visual inspection.                                                                                     |
| Three-coin casting and moving lines   | `BPCT`, chapter 1, X, PDF 11–12 (printed 5–6)                                               | Describes physical coin faces and line classes.                                                                        |
| Palace membership                     | `BPCT`, chapter 1, XI, PDF 12–13 (printed 6–7). Chapter 4, PDF 49–66 (printed 38–55).       | The chapter 4 headings resolve the incomplete Khảm list. Full board annotations need separate review.                  |
| Na Jia                                | `BPCT`, chapter 1, XII, PDF 13 (printed 7)                                                  | All eight inner/outer sequences reviewed.                                                                              |
| Shi/Ying                              | `BPCT`, chapter 1, XIII, PDF 14–15 (printed 8–9)                                            | Palace sequence and marker separation reviewed.                                                                        |
| Basic terminology                     | `NHL`, chapter 4, PDF 59–74                                                                 | Structure and moving-line discussion reviewed. PDF 73 gives Tụng changing to Lý.                                       |
| Classical text and editorial context  | `NTT`, PDF 2–8, 938. `PBC`, PDF 2, 9–10, 15–16, 655.                                        | Title pages, introductions, colophon, and selected endnotes reviewed. Unreleased commentary remains unaudited.         |
| Truân, Mông, Nhu, and Sư              | `NHL`, PDF 142–152, 157–159. `PBC`, PDF 73–99, 110–118. `NTT`, PDF 155–195, 209–221.        | Overviews and all six positions reviewed. The JSON records preserve selected author readings and their exact locators. |
| Tỷ, Tiểu Súc, Thái, and Bĩ            | `NHL`, PDF 160–165, 169–175. `PBC`, PDF 119–134, 142–162, 655. `NTT`, PDF 222–247, 259–283. | Complete passages, footnotes, headings, and diagrams reviewed. Selected interpretations remain attributed.             |

The [batch-four classical citations](../../packages/knowledge/data/citations/batch-four-hexagrams.json)
cover Đồng Nhân, Đại Hữu, Khiêm, and Dự: NHL PDF 176–187, PBC PDF 163–196, and NTT PDF 284–332.
Review includes complete passages, six positions, footnotes, and rendered headings and diagrams.
Selected Ngô Tất Tố notes remain separate from Trình Di and Chu Hy commentary.

The [batch-five classical citations](../../packages/knowledge/data/citations/batch-five-hexagrams.json)
cover Tùy, Cổ, Lâm, and Quán: NHL PDF 188–199, PBC PDF 197–228, and NTT PDF 333–381.
Review includes complete passages, all six positions, footnotes, and rendered headings and discrepancy pages.
The Quan display name remains stable; Quán and the supplied spelling variants are search aliases.

The [batch-six classical citations](../../packages/knowledge/data/citations/batch-six-hexagrams.json) locate Phệ Hạp, Bí, Bác, and Phục.
Review covers NHL PDF 200–211, PBC PDF 229–260, and NTT PDF 382–431.

Review includes complete passages, six positions, footnotes, and rendered headings and discrepancy pages.
Related evidence includes NHL chapter 5, PDF 94, and PBC endnote 18, PDF 655.
Ngô Tất Tố's selected footnote citations remain separate from Trình Di and Chu Hy commentary.

The [batch-seven classical citations](../../packages/knowledge/data/citations/batch-seven-hexagrams.json) locate Vô Vọng, Đại Súc, Di, and Đại Quá.
Review covers NHL PDF 212–223, PBC PDF 261–293, and NTT PDF 433–482.
It includes complete passages, six positions, footnotes, rendered headings, diagrams, and discrepancy pages.
Selected Tiên Nho statements retain the named commentator's attribution through Ngô Tất Tố.

The [batch-eight classical citations](../../packages/knowledge/data/citations/batch-eight-hexagrams.json) locate Khảm, Ly, Hàm, and Hằng.
Review covers NHL PDF 224–235, PBC PDF 294–328, and NTT PDF 483–533.
It includes complete passages, six positions, available footnotes, rendered headings, diagrams, and discrepancy pages.
Trình Di and Chu Hy retain separate readings, including Khảm's fourth and fifth lines and Hàm's third and fifth lines.

The [batch-nine classical citations](../../packages/knowledge/data/citations/batch-nine-hexagrams.json) locate Độn, Đại Tráng, Tấn, and Minh Di.
Review covers NHL PDF 236–247, PBC PDF 329–357, and NTT PDF 534–582, including the blank PDF 557.
It includes complete passages, six positions, available footnotes, rendered headings, diagrams, and discrepancy pages.
PBC endnotes 19–20 at PDF 655 were also read; their historical stories do not become verified history claims.

The [batch-ten classical citations](../../packages/knowledge/data/citations/batch-ten-hexagrams.json) locate Gia Nhân, Khuê, Kiển, and Giải.
Review covers NHL PDF 248–260, PBC PDF 358–394, and NTT PDF 583–635.
It includes complete passages, six positions, footnotes, rendered headings, diagrams, and discrepancy pages.
Khấu Kiến An's selected Tiên Nho explanation remains attributed through Ngô Tất Tố, separate from Trình Di and Chu Hy.

The [advanced citation collection](../../packages/knowledge/data/citations/batch-two-advanced.json)
records BPCT chapter 5, sections 1–4, PDF 67–68 (printed 55–56).
Review covers question-specific Dụng thần choices, conditional Nguyên/Kỵ/Cừu effects, and translator footnotes.
These records do not activate automated interpretation.

The [Phi–Phục and Lục thú citation collection](../../packages/knowledge/data/citations/batch-three-advanced.json)
records chapter 5, sections 5–7, PDF 68–69 (printed 56–57).
Related evidence includes chapter 1, XIV, PDF 15; chapter 4, PDF 49–50; and chapter 6 commentary, PDF 98–99.
The records separate source definitions, worked examples, and conditional interpretation.
The exclusions below keep ambiguous wording outside released claims.

The [Tứ sinh, Nguyệt phá, and Tuần không citations](../../packages/knowledge/data/citations/batch-four-advanced.json)
cover chapter 5, sections 8–10, PDF 70 (printed 58).
Related definitions appear in chapter 1, XVII, PDF 16–17 (printed 10–11),
and chapter 2, XVIII–XIX, PDF 41 (printed 34).
Vĩnh Cao's notes on PDF 68 and PDF 462 (printed 370) support the definition of trị nhật.
Chapter 6 commentary at PDF 83, 85, and 90 (printed 69, 71, and 76) cross-checks the selected Tuần Không conditions.
Review preserves compound conditions and the distinction between a line's effect and a favorable outcome.
These records describe doctrine; calendar calculations remain outside their scope.

The [Phản ngâm and Phục ngâm citations](../../packages/knowledge/data/citations/batch-five-advanced.json)
cover chapter 5, sections 11–12, PDF 70–71 (printed 58–59).
Related evidence includes chapter 1, XI–XII, PDF 13 (printed 7),
and part II, questions 5–6 with their examples, PDF 375–378 (printed 328–331).
Phản ngâm records distinguish directional examples from line-branch opposition.
All 14 listed Phục ngâm pairs were checked against Na Jia: changed Càn/Chấn halves preserve branches but change stems.
The records retain Dụng, Thế, and Ứng conditions; they do not certify the reported outcomes.
The ambiguous statements listed below remain outside released rules.

The [seasonal-strength and combination/control citations](../../packages/knowledge/data/citations/batch-six-advanced.json)
cover BPCT chapter 5, sections 13–14, PDF 72 (printed 60).
Related passages include chapter 1, VI, PDF 10 (printed 4), and chapter 5, section 8, PDF 70 (printed 58).
Chapter 6, PDF 85 and 87 (printed 71 and 73), cross-checks support, seasonal groups, and Hình/Hợp conditions.

Vĩnh Cao's footnote 5 at PDF 85 explains the four season-end months.
Review also covers part II, question 14, PDF 401–403 (printed 354–356).
Its critical Ghi chú at PDF 403 remains a separate translator opinion.

The records preserve conditions and the Thân-to-Tị exception without activating a calendar or classifier.

The [combination/opposition and recovery citations](../../packages/knowledge/data/citations/batch-seven-advanced.json)
cover BPCT chapter 5, sections 15–16, PDF 72–73 (printed 60–61).
Related evidence includes chapter 6, PDF 78, 84, and 94 (printed 64, 70, and 80).
Review also covers complete questions 12–13 and their notes, PDF 393–401 (printed 346–354).
Vĩnh Cao's footnotes 8 at PDF 72 and 9 at PDF 399 remain separate translator statements.

The records distinguish whole-quẻ changes from effects on individual hào.
They preserve the question's purpose, affected spirit, support strength, and conditional readings of Thổ at Tị.

The [advance/retreat and proxy-context citations](../../packages/knowledge/data/citations/batch-eight-advanced.json)
cover BPCT chapter 5, sections 17–18, PDF 73–74 (printed 61–62).
Related review covers chapter 6, sentence 52, PDF 92–93 (printed 78–79), and question 10, PDF 388–389 (printed 341–342).
The records retain the affected spirit's role, strength, timing conditions, and the actual relationship of a person asking for another.
Section 18's religious explanation remains attributed doctrine, without an empirical accuracy claim or application ritual requirement.

The [balance, support, and Sinh/Vượng citations](../../packages/knowledge/data/citations/batch-nine-advanced.json)
cover BPCT chapter 6, sentences 1–6, PDF 77–79 (printed 63–65).
Related review includes casting at PDF 11–12, the stage list at PDF 16–17, Tứ sinh at PDF 70, and Vĩnh Cao's Ghi chú at PDF 403.
Sentence 1 adds evidence and attributed context to the existing moving-line record.
The new articles retain excess/deficiency, affected spirit, support strength, and sentence 6's Nhật thần scope.
They distinguish author commentary from translator notes without adding a calendar, scoring, or prediction algorithm.

The [stage, day/month/year, and Quái thân citations](../../packages/knowledge/data/citations/batch-ten-advanced.json)
cover BPCT chapter 6, sentences 7–11, PDF 79–81 (printed 65–67), including Vĩnh Cao's footnote 3.
Related review includes Quái thân and the stage list at PDF 15–17, calendar definitions at PDF 41, and chapter 5 at PDF 68/70.
The records preserve the affected spirit, day/month distinction, conditional Tuế quân readings, and separate meanings of Thân.
Calendar calculation and Quái thân placement remain outside the released behavior.

NHL printed footer labels were checked on every page used by its released citations.
The labels match the PDF numbers for those locations; the citation collections now include both.
That correspondence does not establish page labels for other editions or uncited NHL pages.

The three Chu Dịch commentaries support classical meanings.
Their explanations do not automatically establish Na Jia, palace, or interpretation rules.
`NHL`, PDF 74, explicitly distinguishes classical line text from later Five Element divination.

## Known discrepancies

The source-section inspection also confirmed these edition locators:

| Key    | Location                                        | Finding                                                                                                                                                                                                                                                     |
| ------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PBC`  | Contents PDF 5; Cấn / canonical quẻ 52, PDF 493 | The contents lists Bát Thuần Chấn and Bát Thuần Cấn as quẻ 51, then Tiệm as 53. PDF 4 starts the contents but ends at quẻ 31. The body also labels Cấn as 51. Keep the source label and map the body section to canonical `hexagram-52`; quẻ 52 is present. |
| `NHL`  | Contents PDF 4–9; Ký Tế/Vị Tế, PDF 328/331      | The contents points to quẻ 63 at printed page 326 and quẻ 64 at 329. The observed body headings start at PDF 328 and 331. Use body headings for section locators; do not treat contents pages as section starts.                                            |
| `BPCT` | Chương 4, Chấn palace, PDF 57                   | A fresh image check confirms board 6 is Thủy Phong Tỉnh. Earlier extraction missed its heading.                                                                                                                                                             |
| `BPCT` | Chương 6, PDF 80 and 95                         | A fresh image check confirms printed label 11 on PDF 80 and printed label 60 on PDF 95. Punctuation and adjacent glyphs obscured the earlier heading scan.                                                                                                  |

| Key       | Location                                   | Problem                                                                                                        | Review treatment                                                                                                        |
| --------- | ------------------------------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `BPCT-01` | PDF 13, chapter 1, XI                      | The Khảm list declares eight entries but lists seven. It omits Trạch Hỏa Cách.                                 | Chapter 4, PDF 52, identifies Cách as the fifth entry. Use that complete sequence.                                      |
| `BPCT-02` | PDF 13, chapter 1, XII                     | The Na Jia row labels Khôn as Wood.                                                                            | The palace list on the same page and chapter 4, PDF 62, identify Khôn as Earth. The can/branch sequence agrees with V1. |
| `BPCT-03` | PDF 9, chapter 1, V                        | The Wood example says Metal controls Wood, then labels Quan quỷ as Wood.                                       | Use the general relation stated above the example. For a Wood palace, Quan quỷ is Metal.                                |
| `BPCT-04` | PDF 429–430, supplementary casting section | Two mixed outcomes receive the same Thiếu dương label. The chapter 1 description distinguishes their polarity. | Resolve the line class against PDF 11–12 and the drawn symbols before importing this appendix.                          |

The [Khôn record](../../packages/knowledge/data/hexagrams/hexagram-02.json) owns three additional label discrepancies:

- NHL PDF 139 labels the fourth line as “Lục cửu”. Its Chinese heading supports “Lục tứ”.
- PBC PDF 66 and NTT PDF 144 label the final line as Thượng cửu in Chinese.
  Their Vietnamese labels and commentary support Thượng lục.

The pilot line comparisons preserve distinct Trình Di and Chu Hy readings, including Khôn's fifth line and the special passages.

The [Truân](../../packages/knowledge/data/hexagrams/hexagram-03.json),
[Mông](../../packages/knowledge/data/hexagrams/hexagram-04.json), and
[Nhu](../../packages/knowledge/data/hexagrams/hexagram-05.json) records own further label and response-reference discrepancies.
Their resolutions use related passages and rendered pages.
Nhu preserves different readings of its final line; Sư preserves different readings of “dư thi”.

NTT PDF 183 and 221 refer readers to end-of-book criticism.
That section was not located in this supplied PDF, which ends with Vị Tế, a blank page, and the colophon.
The Mông summaries retain the historical setting of punishment passages.
They do not claim review of the missing criticism.

The [Tỷ](../../packages/knowledge/data/hexagrams/hexagram-08.json),
[Tiểu Súc](../../packages/knowledge/data/hexagrams/hexagram-09.json),
[Thái](../../packages/knowledge/data/hexagrams/hexagram-11.json), and
[Bĩ](../../packages/knowledge/data/hexagrams/hexagram-12.json) records own seven further discrepancies.
These concern a line reference, an inner trigram, polarity counts, a response pair, missing negation, and inner/outer positions.
PBC PDF 160 and its endnote 13 on PDF 655 also conflict with the three outer lines in the Bĩ diagram.
The resolutions use complete passages and rendered pages; the electronic correction does not override the diagram.

The selected comparisons preserve different readings of Tiểu Súc's first two lines and Bĩ's first and fourth lines.
Thái's fifth line retains uncertainty about historical identity and different uses of its marriage image.
These interpretations do not become fixed calculation rules.

The [Đồng Nhân](../../packages/knowledge/data/hexagrams/hexagram-13.json),
[Đại Hữu](../../packages/knowledge/data/hexagrams/hexagram-14.json), and
[Dự](../../packages/knowledge/data/hexagrams/hexagram-16.json) records own six further resolutions.
They concern missing negation, an inner trigram, a response polarity, a line tally, and two upper-trigram labels.
Complete passages and rendered pages support the selected structures and meanings.

Distinct readings remain attributed, including Đồng Nhân's fourth and fifth lines,
Đại Hữu's third and fourth lines, Khiêm's final line, and Dự's third line.
The [Khiêm record](../../packages/knowledge/data/hexagrams/hexagram-15.json) keeps Trình Di's self-discipline image
separate from Chu Hy's local military reading.

The [Tùy](../../packages/knowledge/data/hexagrams/hexagram-17.json),
[Cổ](../../packages/knowledge/data/hexagrams/hexagram-18.json),
[Lâm](../../packages/knowledge/data/hexagrams/hexagram-19.json), and
[Quán](../../packages/knowledge/data/hexagrams/hexagram-20.json) records own 13 further resolutions.
These cover names, symbols, polarity counts, line references, missing negation, and copied text.
NTT PDF 352–353 copies Tùy's first-line Chinese text into Cổ's second line; its Vietnamese translation and commentary retain Cổ's meaning.

Selected differences remain attributed: Tùy's final ritual image, Cổ's trigram reading, and Lâm's bát nguyệt and first two lines.
Quán preserves differences in ritual purpose and who observes whom at the fifth line.
Chu Hy's uncertainty at Lâm's second line remains explicit.

The [Phệ Hạp](../../packages/knowledge/data/hexagrams/hexagram-21.json),
[Bí](../../packages/knowledge/data/hexagrams/hexagram-22.json),
[Bác](../../packages/knowledge/data/hexagrams/hexagram-23.json), and
[Phục](../../packages/knowledge/data/hexagrams/hexagram-24.json) records own nine further source-error resolutions.
These concern a line's polarity, trigram order and name, a quẻ name, copied Tượng text, humility, and footnote glyphs.

NHL PDF 94 and NTT PDF 420 also call the first-yin quẻ Cấn where related passages identify Cấu.
The resolutions use complete passages and rendered pages.
Erroneous names do not become aliases.

Selected differences remain attributed: Phệ Hạp's gold/arrow image, Bí's fourth and fifth lines, and Phục's timing and fourth line.
Punishment and gender-role images retain their historical setting.
The selected Phục summaries distinguish traditional text readings from a date-conversion or prediction algorithm.

The [Vô Vọng](../../packages/knowledge/data/hexagrams/hexagram-25.json),
[Đại Súc](../../packages/knowledge/data/hexagrams/hexagram-26.json), and
[Di](../../packages/knowledge/data/hexagrams/hexagram-27.json) records own six further source-error resolutions.
These concern a line label, a Chinese numeral, copied fifth-line text, a quẻ name, a footnote glyph, and a danger word.
Rendered pages and the surrounding translations and commentary support each resolution.

Đại Súc is Sơn Thiên: Cấn above Càn.
NHL PDF 215, PBC PDF 268, and NTT PDF 446 agree on this structure.
The legacy catalog and product glossary reversed the name to Thiên Sơn.
The correction preserves `hexagram-26` and its existing trigram IDs.
The reversed name is not a source spelling variant.

Vô Vọng preserves different readings of unplanned gain and unsolicited harm.
Di keeps Trình Di's authority image separate from Chu Hy's focused request for help.
[Đại Quá](../../packages/knowledge/data/hexagrams/hexagram-28.json) distinguishes Trình Di's self-caused danger from Chu Hy's moral reading of the final line.

The [Khảm](../../packages/knowledge/data/hexagrams/hexagram-29.json),
[Ly](../../packages/knowledge/data/hexagrams/hexagram-30.json), and
[Hằng](../../packages/knowledge/data/hexagrams/hexagram-32.json) records own nine further source-error resolutions.
They concern Dự's comparison number, line polarity and references, a Chinese numeral, and Hằng's name.
Rendered pages, diagrams, surrounding translations, and related commentary support the resolutions.

Khảm keeps the conditions of its fifth-line no-error statement explicit.
[Hàm](../../packages/knowledge/data/hexagrams/hexagram-31.json) preserves different following directions at line three and different limits on influence at line five.
Hằng retains different readings of trinh in its first and third lines.

The [Độn](../../packages/knowledge/data/hexagrams/hexagram-33.json),
[Đại Tráng](../../packages/knowledge/data/hexagrams/hexagram-34.json),
[Tấn](../../packages/knowledge/data/hexagrams/hexagram-35.json), and
[Minh Di](../../packages/knowledge/data/hexagrams/hexagram-36.json) records own seven further source-discrepancy resolutions.
They concern a missing negation, two line labels, a duplicated Chinese verb, a Vietnamese word, an added negation, and a reading mismatch.
Rendered passages and the three commentaries support the selected meanings; the NHL Minh Di resolution does not rewrite its author's interpretation.

Độn preserves the two readings of tiểu and the different aims of its second-line binding image.
Đại Tráng retains each author's reading of dụng võng and the conditions of centrality versus correctness.
Tấn preserves internal self-correction versus action within a private domain at its final line.
Minh Di keeps Trình Di's adverse fourth-line reading and Chu Hy's expressly tentative alternative.
Its second line separates NHL's recovery-then-strength reading from interpretations of rescue with a strong horse.

### Quẻ 41–44 selected coverage

The [Tổn](../../packages/knowledge/data/hexagrams/hexagram-41.json),
[Ích](../../packages/knowledge/data/hexagrams/hexagram-42.json),
[Quải](../../packages/knowledge/data/hexagrams/hexagram-43.json), and
[Cấu](../../packages/knowledge/data/hexagrams/hexagram-44.json) records contain attributed selections from inspected overviews, line passages, named commentaries, supplements, and translator notes. Their source-comparison reports are retained outside the repository under the feat-078 review inputs. These selected summaries and citation repairs do not complete the 84-cell source comparison, classify every source unit, close layer rosters, grant rights, provide independent specialist approval, or certify the corpus. The per-cell source remainder remains open, including unrepresented passages and translation-layer citation mapping.

#### Edition-form observations: Tổn and Ích

The following are observations of the supplied editions, not decisions about a correct or standard reading. Keep each witness and its own translation or gloss distinct; do not silently emend the printed form. They are evidence-only notes in this source catalog, not Han-text runtime content or approved corrections to the Vietnamese summaries.

- For Tổn's top line, PBC PDF 402 and NTT PDF 649 visibly print `利肴攸往…得臣無彖`. These forms differ from the received wording; this catalog does not select or supply a correction. The PBC/NTT images and the source notes are in the feat-078 q41 review inputs.
- For Tổn's turtle/offering line, PBC PDF 396 and NTT PDFs 637 and 639 print `二蕢可用亨`; NHL PDF 261 prints `二簋可用享`. These are edition-specific printed forms, not a harmonized quotation.
- The Đại Tượng line for Tổn prints `善下有澤` on NTT PDF 641 and PBC PDF 397, differing from the received `山下有澤`. This records the printed forms only and does not select a correction.
- NTT PDF 643 prints `參曰` at the line-two Tượng opener. This is an edition-form observation, not an emendation.
- NHL PDF 262 prints “thành quẻ trùng tổn” in its line-three explanation. The extra word is recorded as the supplied edition's wording; no runtime summary adopts it.
- Ích's overview at PBC PDF 408 and NTT PDF 656 prints `風雨益` in the Đại Tượng line while the Vietnamese rendering says “Phong Lôi”. Preserve both visible layers without choosing which one to correct.
- NTT PDF 658 prints `之悉` in the line-two text, while the surrounding transliteration and Vietnamese gloss read “qui”/“rùa” and PBC PDF 409 and NHL PDF 266 print the tortoise graph `龜`. This is a source-form discrepancy, not an emendation in the authored summary.
- NTT note 3 at PDF 666–667 prints “quẻ Tốn” three times and “hào Chín Năm” twice, while NTT's parallel line at PDF 659 says “quẻ Tổn” and “hào Sáu Năm”. Retain the note as printed; its intended cross-reference remains unresolved.
- NTT PDF 660 includes an extra `用` in the line-three classical text relative to the parallel PBC and NHL forms and NTT's own transliteration. Do not remove it from a source quotation or treat this observation as an adjudicated correction.
- For Ích line four, PBC PDF 411 has “đời quốc đô” where its context suggests “dời”; NHL PDF 267 prints “dời quốc đo” rather than “dời đô”. These edition spellings are separate observations, not a single normalized reading.
- NHL PDF 267 prints `勿周`, with its transliteration “vật vấn” and Vietnamese “chẳng cần hỏi”; PBC and NTT print `勿問`. NTT PDF 663 prints `有手` at the second occurrence where PBC and NTT's rendering give `有孚`. NTT's “Hữa phu”, “nguyên cắt”, and “chi kỹ” on PDFs 663–664 are further visible transliteration differences; none is silently repaired here.
- PBC PDF 413 and NTT PDF 665 print `立新勿恆` while their transliteration reads “lập tâm”; NHL PDF 267 prints `立心`. Keep the printed and rendered forms edition-specific and unresolved.

#### Quải and Cấu source limits and variants

Quải's third-line summaries retain NHL's uncertainty and NTT's separate Trình Di proposals and Chu Hy's reading of the printed text. No competing wording is selected. NTT notes 9 and 10 (PDF 683) say two instances are read as “hiệu” and one as “hào” without locating them; note 3 (PDF 682) gives a different count/location mapping. The reports do not reconcile these counts or assign the readings to passage locations. NTT's line-three alternatives at PDFs 676–677 also remain unresolved; the summaries do not establish a standard text.

For Cấu, NHL PDF 271 prints “Cấn” in both its Tự Quái sentence and a separate Thoán explanation. Neither occurrence is treated as an alias or emended. NTT prints `垢` for the quẻ name on PDFs 684–697; its Phùng Hậu Trai report and note 3 name the ancient form `遘`. NHL and PBC print `姤`. These are the observed forms and attributions in the supplied editions; this catalog does not establish their historical identity, choose a standard character, or normalize NTT to either other witness. NTT also prints `土九` in its line-six heading at PDF 695, while the Vietnamese heading reads “Thượng Cửu”; PBC has the same visible heading form on PDF 431. Retain these as printed-source observations.

PBC's Cấu overview citations now span PDFs 424–427, but this locator does not mean every page or layer is represented by a claim: the Soán explanation and PHỤ CHÚ material on PDF 426 remain an explicit source-unit remainder in the q44 audit.

Other bounded Cấu print differences reported from NTT include `于金柅` and `豕孚蹢獨` at PDF 688; `于命柅, 柔遇牵` in the line-one Tượng at PDF 689; `包有枣` at PDF 690 where the Tượng at 691 and Vietnamese rendering read the fish image; and `起蛛凶` at PDF 692. These are not corrected in source quotations or used to assert a definitive text. NTT's report attributes the named edition change in the overview to Vương Thù alone; it does not support a broader claim about all later editions.

The q41–q44 comparisons were checked against the supplied page images after rechecking the PDF fingerprints against `sources.json`. For NHL citations, the 58 footer labels now recorded for these four quẻ match their PDF page numbers 261–273; that correspondence does not establish page labels for other editions or uncited pages. NTT PDF 666 note 1 says Trình Di changes printed `大` (glossed “mộc”) to 益 (ích) and renders the phrase as “đạo ích”; the printed graph and stated gloss conflict. The claim summarizes this report without reproducing the graph or deciding which reading is correct. NTT note 3 also compares “mười bằng” and the punctuation/continuation of Trình Di's reading across PDFs 666–667. The selected Tiên Nho passage on PDFs 669–670 records Chu Hy's caution that vigilance is not confined to the moment when yin declines and yang flourishes; even after petty people have declined, gentlemen must not forget caution.

Precise checked page scopes, source limitations, and remaining coverage are documented in the q41 evidence report, q42 per-cell reports and `source-catalog-notes.md`, q43 evidence report, and q44 evidence report in the approved external feat-078 review inputs. Those reports are source-comparison evidence only, not machine ledger decisions, specialist approval, rights clearance, or certification.

BPCT chapter 6 sentences 12–16 have separate numbered verse and Vương Hồng Tự commentary citations in [batch eleven](../../packages/knowledge/data/citations/batch-eleven-advanced.json). No translator notes are attached to these five labels; the footnote at sentence 11 remains with its existing citation. Sentence 13's historical relationship examples and sentence 16's horse image remain bounded, source-attributed summaries. Chapter-wide coverage remains open.

The [Gia Nhân](../../packages/knowledge/data/hexagrams/hexagram-37.json),
[Khuê](../../packages/knowledge/data/hexagrams/hexagram-38.json), and
[Kiển](../../packages/knowledge/data/hexagrams/hexagram-39.json) records own four further source-discrepancy resolutions.
They concern a reading mismatch, Khuê's third-line polarity and neighbors, and the fifth-line label in Chu Hy's Kiển explanation.
Rendered passages, diagrams, and surrounding commentary support these bounded resolutions.

Gia Nhân preserves different meanings of phú gia and cách gia.
Khuê separates deep attachment from easy union at line five and preserves different speakers for the final-line marriage statement.
Kiển retains Trình Di's limit of reduced difficulty beside Chu Hy's possibility of great achievement at the final line.
[Giải](../../packages/knowledge/data/hexagrams/hexagram-40.json) separates readings of trinh and Khấu Kiến An's unified third-line symbolism.

The [Phản ngâm article](../../packages/knowledge/data/liuyao/reverse-chant-context.json)
owns the Cấn naming resolution on BPCT PDF 71.
The mountain examples and chapter 1 palace list support Cấn–Khôn despite the inconsistent Càn/Cần names in that paragraph.

The [Tứ sinh](../../packages/knowledge/data/terms/term-four-birthplaces.json) and
[Trường Sinh](../../packages/knowledge/data/terms/term-growth-stage.json) records own two stage-list resolutions.
The complete chapter 1 list and chapter 5 summary support the selected stage names and birthplaces.

### Quẻ 45–48 and BPCT 17–24 selected comparison

The [batch-twelve classical citations](../../packages/knowledge/data/citations/batch-twelve-hexagrams.json)
support original Vietnamese selections for Tụy, Thăng, Khốn and Tỉnh. Comparison inspected the complete
supplied sections and rendered pages: NHL PDFs 274–285; PBC 432–466; NTT 698–752.
The NHL footer labels on these pages match their PDF numbers. No printed folio is inferred for PBC or NTT.
NTT PDF 713 is a blank transition apart from the website footer, not an omitted Tụy commentary.
NHL/PBC six-line figures and NTT's quái headings, line labels and commentary were checked separately.
These selections do not close the per-cell audit or establish a complete quotation/translation-layer mapping.

Supported structural selections are recorded in the quẻ JSON discrepancies. Other observations below
retain the printed witness without selecting a corrected or standard source text:

| Scope                   | Source observation                                                                                                                                                                                                                                                                                                                                                                                                                                | Treatment                                                                                                                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tụy labels              | NTT PDFs 703–704 print Sơ Cửu / Hào Chín Đầu, while Chu Hy calls the position Sáu Đầu. PBC 438 and NTT 711 print an upper-yang Han heading beside the Vietnamese Thượng Lục / Sáu Trên and yin commentary.                                                                                                                                                                                                                                        | Released positions 1 and 6 are yin, supported by the NHL/PBC diagrams, NHL labels and the commentary; the printed source labels are not emended.                                                                                                     |
| Tụy correspondence      | NHL 275 first identifies the fourth line as the first line's partner, then mentions calling line five and following four. PBC 436 explains the second line's Tượng through the central virtue of Ngũ rather than Nhị.                                                                                                                                                                                                                             | Preserve the edition-specific references; do not silently rewrite them or derive a general response rule. Tụy's third and sixth lines are both yin, and Trình Di expressly distinguishes their affinity from opposite-polarity chính ứng at NTT 707. |
| Tụy Đại Tượng           | NHL 274 says to put weapons away; PBC 435 and NTT 703 discuss assembling or repairing them. The Han Đại Tượng opener is printed as a Thoán opener in PBC 435 / NTT 703; NTT 703 also prints a different graph in the final warning than its transliteration reads.                                                                                                                                                                                | Keep each author's practical reading distinct. The opener and final graph remain edition observations, not a new critical edition.                                                                                                                   |
| Tụy other forms         | NTT 705 prints a different Thược graph than PBC/NHL; NTT 706 prints `引士` while its transliteration and translation read dẫn cát. NTT 708's line-three Tượng prints a different no-fault graph than its transliteration reads; NTT 709 prints `苹` at the line-five opener.                                                                                                                                                                      | No Han runtime text or correction is imported. Summaries follow the named commentary with its own locator, not a synthesized quotation.                                                                                                              |
| Thăng line 2            | NTT 718 prints two successive Chu Hy headings, one over a long sincerity explanation and one over a short Tụy cross-reference; the Tiểu Tượng explanation at 719 is also labelled Chu Hy. Its Han Tượng at 718 reproduces wording about going without fault and the upper line yielding, while the transliteration/translation discuss Cửu Nhị's sincerity.                                                                                       | Keep three separate printed Chu Hy layers with attribution uncertainty. Do not infer Trình Di authorship from the usual paired layout or silently repair the Tượng.                                                                                  |
| Thăng other forms       | NTT 715 prints a Tượng opener above the Thoán translation. NTT 722 ends the upper-line Han text with thăng, while the transliteration, translation and explanation read trinh. Note 3 on 723 visibly prints “lên tháng.”                                                                                                                                                                                                                          | Retain the observations and note as printed. Do not invent a corrected ending, note word, or calendar meaning.                                                                                                                                       |
| Khốn first/second lines | NHL 281 calls line three yang and responding to line one, then names four as the rescuer; three is visibly yin. The same page says advancing does not meet a bad time despite its Han `征凶` and the adverse advance readings in PBC 452 / NTT 730.                                                                                                                                                                                               | The first structural selection uses one–four, corroborated by PBC/NTT and the diagrams. The second-line negation conflict stays visible; it supports no favorable-advance promise.                                                                   |
| Khốn Đại Tượng          | NTT 727's Trình Di paragraph says “Nếu biết mệnh” before describing fear and loss of constancy, conflicting with the immediately preceding explanation of knowing mệnh.                                                                                                                                                                                                                                                                           | Do not reconstruct the missing or changed negation. Preserve the supported preceding explanation separately from Chu Hy's trao-mệnh reading.                                                                                                         |
| Khốn other forms        | PBC 455 / NTT 735 print `志位得` beside readings of chí vị đắc; PBC 455 / NTT 737 print `位當` beside commentary that the position or conduct is not appropriate. NTT 735 prints an upper-yang Han heading, while 736 reads Thượng Lục / Sáu Trên. NTT 730 uses a line-two heading for the Tượng. PBC 450 prints `殿` where the other two witnesses print `臀`; NTT 726 prints `尚口不窮` while its following readings give thượng khẩu nãi cùng. | Select only the supported yin structure at position 6. Do not supply corrected Han text. Khâu Kiến An's unfavorable upper-line comparison at NTT 737–738 stays distinct from the conditional chinh cát readings of Trình Di and Chu Hy.              |
| Tỉnh words and imagery  | NHL/PBC use a fish image at line two, while NTT 745–746 gives Trình Di's small amphibian readings and note 7 on 752 identifies that translation choice. Trình Di's hành trắc at NTT 748 concerns anxiety to exercise the đạo; Chu Hy reads passers-by grieving. Trình Di says the fifth line has not yet completed the upward use at NTT 749, unlike the NHL/PBC readings of water already usable.                                                | Preserve these author differences. No zoological, hydrological, physiological or drinking-water fact is certified.                                                                                                                                   |
| Tỉnh overview and forms | NTT 740's Trương Trung Khê passage prints Khốn for the upper source quái, then discusses Khôn changing to Khảm. NTT 740 reverses the mất/được order in transliteration relative to its Han and translation. NHL/PBC/NTT have different visible near-completion and rope graphs; PBC 464 and NTT 748 print the same unusual graph in the fourth-line giếng-sửa text.                                                                               | Do not infer a source-quẻ algorithm, silently harmonize witnesses, or author corrected Han forms. Trình Di's wooden-vessel reading and Chu Hy's qualified upward-sap reading at NTT 743 remain separate.                                             |

Named Tiên Nho selections and all attached NTT note labels are represented separately:
Tụy notes 1–6 at PDF 712; Thăng notes 1–3 at 723; Khốn notes 1–5 at 738;
Tỉnh notes 1–5 at 751 and 6–7 at 752. Khốn note 4 points to a later Hệ Từ,
but this supplied edition has no separate full Hệ Từ appendix; the summary records the pointer, not review of absent text.
Tỉnh's Lý Long Sơn physiology analogy remains attributed historical explanation, not biology or medical guidance.
Political, ritual, household and punishment imagery does not establish modern duties or predicted injuries;
Khốn's sacrificial-mortality language is not advice to harm oneself.

The [batch-twelve BPCT citations](../../packages/knowledge/data/citations/batch-twelve-advanced.json)
separate the verse and Vương Hồng Tự commentary of sentences 17–24.
The inspected full intervals are 17: PDF 82–83 (printed 68–69); 18–20: 83 (69);
21: 83–84 (69–70); 22–23: 84 (70); 24: 84–85 (70–71).
The only attached translator note is Vĩnh Cao's note 4 on PDF 84, which points to the basic Tam hình section;
chapter 1, XX on PDF 18 (printed 12) supplies that location and the listed Ngọ self-Hình.
Note 5 on PDF 85 belongs to sentence 26 and is not moved into this batch.
The previously cited Vĩnh Cao criticism on PDF 403 remains a separate dissent from main-text Hình usage.
This comparison does not publish a complete Tam hình table, infer a priority algorithm for conflicting Không readings,
calculate dates from the sentence-24 examples, or certify the reported efficacy of divination.

### Quẻ 49-52 and BPCT 25-32 selected comparison

The [batch-thirteen classical citations](../../packages/knowledge/data/citations/batch-thirteen-hexagrams.json)
support original Vietnamese selections for [Cách](../../packages/knowledge/data/hexagrams/hexagram-49.json),
[Đỉnh](../../packages/knowledge/data/hexagrams/hexagram-50.json),
[Chấn](../../packages/knowledge/data/hexagrams/hexagram-51.json) and
[Cấn](../../packages/knowledge/data/hexagrams/hexagram-52.json).
The component source comparison inspected complete passages and rendered pages at NHL PDFs 286–296,
PBC 467–500 and NTT 753–801, with the PBC contents at 4–5 checked separately.
NHL's cited footer labels match those PDF numbers; no PBC/NTT printed folio is inferred.
NHL/PBC figures and NTT quái prose and line passages provide distinct structural witnesses.
Selected overviews and all six positions retain NHL, PBC, Trình Di and Chu Hy interpretations,
plus separately attributed supplements and named material where present.
The selections do not close feat-080's per-cell audit, source-unit remainder or full translation-layer mapping.

Five bounded structural discrepancy records reside in the quẻ JSON, not in a corrected source edition:

- PBC contents PDF 5 and body PDF 493 both label Cấn as 51. A fresh integration image check confirms
  the repeated contents number and the body heading/figure/prose. Contents PDF 4 does not contain those entries.
  Keep the source's 51 and map Cấn to canonical `hexagram-52`, supported by NHL's 52 and the three structures.
- Chấn at PBC 491 / NTT 785 has a Lục tứ witness beside yang commentary, and NTT 782 calls the second
  line Chín Hai beside Sáu Hai material. Preserve yin two and yang four from figures and corroborating passages.
- NTT 783 names Sáu Năm in Chu Hy's Chấn line-two paragraph; PBC 490 has Cửu Nhị while explaining
  Lục Nhị. Neither inconsistent name becomes a new structural relation.
- NHL 295 calls Cấn's fourth line Hào 3, âm in its rendering; PBC 497 calls the third line Lục Tam
  in the second-line Tiểu Tượng. Preserve yin four and yang three without rewriting either witness.
- PBC 484 calls Đỉnh's fifth line Cửu Ngũ while its preceding explanation and line-five section at 485
  call Lục Ngũ. The released fifth line remains yin.

Other edition limitations remain observations in the records' review notes: Cách's misplaced/repeated
upper-line Tiểu Tượng; Đỉnh's visually identical hình ốc forms carrying different glosses and tai/quai wording;
Chấn's shortened line-five ending and unusual Thoán/Tượng openers; Cấn's repeated inner/outer mình,
negation and noisy words, NTT note-3 printed-form mismatch, and NHL's Bĩ beside PBC's Bí in the closing list.
No Han quotation, emended source text or definitive critical edition is published.

All 14 attached NTT note labels are separate: Cách 1 at PDF 765; Đỉnh 1–4 at 777;
Chấn 1–3 at 789; Cấn 1–5 at 800 and 6 at 801. Đỉnh note 4 retains Ngô Tất Tố's stated translation
choice and distinct punishment glosses. Cấn note 3 does not select a corrected form.
Cách's printed Trình Truyện passage at PBC 477 remains attributed through PBC, not reassigned to PBC himself.
Đỉnh retains tử-as-master versus son and lộc vị versus food, competing hình ốc meanings and ngưng mệnh scopes.
Chấn retains Chu Hy's uncertainty about ức, nine hills and seven days, and the two line-six trung readings.
Cấn preserves PBC's unity reading beside Trình Di's non-sharing reading, and Trình Di's critical minister
reading at line four beside Chu Hy's simpler no-fault reading. Chu Hy's proposed textual omissions stay opinions.

Đỉnh's third and sixth lines are both yang; response wording does not establish an opposite-polarity pair.
Political, ritual, punishment and family/gender hierarchy images do not establish modern obligations.
PBC animal-change analogies and Hồ Vân Phong's seasonal analogy do not become biology.
The Mục Liên anecdote is not verified miracle evidence or advice to endure violence.
Anatomy/danger images do not become medical diagnoses or injury forecasts; day/mùa images supply no calendar algorithm.

The [batch-thirteen advanced citations](../../packages/knowledge/data/citations/batch-thirteen-advanced.json)
support the [BPCT 25–32 article](../../packages/knowledge/data/liuyao/hidden-movement-store-strength-and-branch-context.json).
Every numbered verse is separate from Vương Hồng Tự's commentary: 25–27 at PDF 85 (printed 71),
28–29 at 86 (72), 30 at 86–87 (72–73), and 31–32 at 87 (73).
Sentence 30's second example and closing explanation continue onto 87 before sentence 31;
sentence 24's continuation and sentences 33 onward are not absorbed.
Vĩnh Cao's note 5 attaches to the season-end months in sentence 26, though its footer lies below 27.
Note 6 attaches to sentence 30's rendering at 86 and explains tự as the chi in the quẻ; it is not sentence 31's note.
These are the only attached notes in 25–32. Note 4 at PDF 84 belongs to 23; note 7 at 88 belongs to 36.

BPCT PDF 1 assigns the Phú đoán to Lưu Bá Ôn and its commentary to Vương Hồng Tự;
the new front-matter citation records this supplied-edition attribution, not verified historical authorship
of individual verses. PDFs 2–3 support the compiler's account and Vĩnh Cao's translator/footnote role.
An integration image check of PDF 1 confirms the credits. Older batch labels are not retrospectively changed.
Vĩnh Cao's previously cited PDF-403 criticism remains a separate dissent, not an attached sentence-31 note.

The article retains sentence 25's Nhật thần xung and separate moving-line statement without inventing
an ám động/Nhật phá threshold; sentence 26's two directions of Mộ and conditional vượng/tướng Không;
sentence 27's Dụng/Kỵ role distinction; and sentence 28's sinh/hợp directed toward the line harming Dụng.
Sentence 29 permits control of a month-bearing line in the quẻ while 32 protects Dụng as Nguyệt kiến;
both remain attributed without a new harmonization or priority rule. Sentence 30's Nhật thần biến hoại
is source language tied to same-chi line examples, not transformation of a calendar day or blanket cancellation
of day xung. Sentence 31's listed groups, missing-member examples and động/tĩnh conditions stay prose,
not an executable/exhaustive table; no two-moving requirement is generalized to every Nhị hình or Tự hình.
No minimum repeated-branch count, calendar boundary, scoring rule, automatic interpretation or efficacy
certification is inferred. Global inventory, source audit, separate verification and certification remain open.

### Quẻ 53-56 and BPCT 33-40 selected comparison

[Batch-fourteen classical citations](../../packages/knowledge/data/citations/batch-fourteen-hexagrams.json)
route to original Vietnamese selections for [Tiệm](../../packages/knowledge/data/hexagrams/hexagram-53.json),
[Quy Muội](../../packages/knowledge/data/hexagrams/hexagram-54.json),
[Phong](../../packages/knowledge/data/hexagrams/hexagram-55.json) and
[Lữ](../../packages/knowledge/data/hexagrams/hexagram-56.json).
Component source comparison read complete assigned passages and visually reviewed contact sheets covering
NHL PDF 297–308, PBC 501–531 and NTT 802–851. Full-size focused NTT images at 813, 836, 847 and 851
and an enlarged PBC heading/diagram composite were additionally inspected. Contact-sheet review is not
individual full-size review of all pages. NHL/PBC diagrams and NTT named quái/line labels support the
six-line structures; NHL printed folios match 297–308, while no PBC/NTT numerical folios were invented.
All six positions retain NHL, PBC, Trình Di and Chu Hy separately; NTT transmission stays through
Ngô Tất Tố. Supplements, additional commentators and translator notes are not merged into those layers.
Complete original/translation-layer mapping, full rosters and per-cell audit remain open under feat-081.

Bounded discrepancies and display resolutions are recorded in the quẻ JSON; resolution does not repair
or certify the supplied text:

- Tiệm preserves PBC/NTT line-five original forms beside the lăng/gò reading, and NHL/NTT line-six
  forms beside quì/cloud readings. Hồ An Định, Trình Di and Chu Hy's proposals remain opinions.
  NHL's tiểu nhân/tiểu tử, hãn/khản and hồng/sếu differences remain source-specific. NTT 803 labels
  a Thoán passage Tượng; 805 has mixed script and an incomplete reading; 806 conflicts about speech;
  808 has an inconsistent negative. PBC 506 calls yin nhị Cửu Nhị. None supplies reconstructed text.
- Quy Muội keeps NTT 814's truncated Trình Di paragraph and 815's translation/negative discrepancy
  visible, without supplying the absent ending. NTT 822's line-four Tượng original/reading forms differ.
  Tu-as-waiting and tu-as-low-status-girl remain alternatives; Khâu Kiến An and Chu Hán Thượng are
  separate commentators, with the latter's Lục Chấn testimony reported through him, not independently read.
- Phong keeps NHL 304's ngũ versus PBC/NTT's thượng in the right-arm explanation. PBC 520 calls
  Lục Nhị Cửu Nhị, and 522 describes ngũ inconsistently in its talent roster. NTT bái/mạt variants,
  Chu Hy's supplied softness wording at 836 and line-six alternatives remain visible. NHL's choice of
  PBC's line-six reading is identified as that choice, not an independent witness of identical meaning.
- Lữ retains NTT 841's Sáu Trên/ngôi Năm and PBC 527/529/530's inconsistent position/polarity labels.
  NHL/PBC's same-yin nhị/ngũ response wording does not redefine structural chính ứng. NTT minh thuận
  beside commentary/note carefulness and PBC/NHL minh thận, and vô cữu/vô vưu at line two, remain distinct.
  Trinh punctuation at line three, tư phủ's money/protection/sharp-axe readings and the line-five arrow
  and thượng đãi explanations are not harmonized. NTT 847 repeats the Chu Hy heading before quoted
  material and separately names Từ Tiến Trai and Hồ Song Phương; these remain supplemental attributions.

All 24 attached numbered NTT notes remain represented: Tiệm 1–5 at PDF 813; Quy Muội 1–4 at 825;
Phong 1–5 at 838 and 6–7 at 839; Lữ 1–8 at 851. Tiệm note 3 attributes Ngô Lâm Xuyên's opinion through NTT;
identical notes 4–5 keep separate IDs. Lữ note 8 joins overlapping retained adjacent portions into
Đoài/Tốn; it is not fixed-position polarity substitution, changed primary quái or Nạp Giáp transformation.
PBC explicit PHỤ CHÚ and closing selections keep their own locators.

Gender hierarchy, concubinage, sacrificial roles and political judgments stay historical author views,
not modern duties. Named historical figures and religious/supernatural comparisons remain source
illustrations, not independently verified history or efficacy. References to Tốn, Ngữ Lục, Hán thư,
Thiên quan and Kinh Thi are supplied authors' testimony, not additional whole-work review.
No medical, astronomical, calendar, ritual, predictive or automated-interpretation authority is released.

[Batch-fourteen advanced citations](../../packages/knowledge/data/citations/batch-fourteen-advanced.json)
support the [BPCT 33–40 article](../../packages/knowledge/data/liuyao/hidden-spirit-release-restraint-and-combination-context.json).
Component review read full extracted context at PDFs 1–3, 86–91 and 403, and directly inspected individual
images at 1–3, 87–90 and 403. Generated images 86/91 are not counted as inspected.
Sentence 33 is on 87 (printed 73); sentence 34's verse crosses 87–88 (73–74), with commentary on 88;
35–37 are complete on 88 (74); 38–40 are on 89 (75). The earlier inventory continuation lead for 37
was incorrect: PDF 89 starts 38. Sentence 41 begins on 89 and continues at 90; it is not absorbed.
No table or diagram occurs in the selected passages.

Eight verse summaries report the supplied edition's Lưu Bá Ôn credits separately from eight
Vương Hồng Tự commentaries transmitted by Vĩnh Cao; front-matter evidence is reused, not duplicated.
Note 7's marker follows Tính dẫn in sentence 36 despite its footer after 37; note 8 follows trung hòa
in sentence 39 despite its footer beneath later passages. These are the only attached notes in 33–40.
Vĩnh Cao's reused PDF-403 criticism is separate dissent, not an attached note or new full question review.

Sentence 33's hidden Dụng lâm Không differs from Phi Không in 35; 34 keeps support to Phục and
xung khai of Phi as distinct targets. Sentence 36 preserves the commentator's Tính dẫn statement beside
note 7's objection rather than resolving the inconsistency. Sentence 37's Nhật/Nguyệt authority stays
attributed without harmonizing sentence 29 or erasing Vĩnh Cao's Hình/Hại dissent. Sentence 38 retains
xung and xung/khắc of the Mộ line without a threshold/table or mortality/ritual advice. Sentence 39's
Thân means Thế locally, not Nguyệt quái thân; no-official-position and moderate-control conditions stay
beside note 8's self-question/vượng-Thế qualification. Sentence 40's Đức means hợp, not human morality;
its four descriptions, hợp/xung warning and Kỵ counterpart do not invent a missing sinh hợp object or
an exhaustive priority rule. No verse quotation, replacement translation or source repair is published.
Source comparison supports bounded authoring only; feat-085's unit/layer audit and corpus-wide
independent verification/certification remain open.

### Quẻ 57-60 and BPCT 41-48 selected comparison

[Batch-fifteen classical citations](../../packages/knowledge/data/citations/batch-fifteen-hexagrams.json)
support original Vietnamese selections for [Tốn](../../packages/knowledge/data/hexagrams/hexagram-57.json),
[Đoài](../../packages/knowledge/data/hexagrams/hexagram-58.json),
[Hoán](../../packages/knowledge/data/hexagrams/hexagram-59.json) and
[Tiết](../../packages/knowledge/data/hexagrams/hexagram-60.json).
Component comparison read complete extracted context at NHL PDFs 309–320, PBC 532–563 and NTT 852–894,
and visually inspected contact sheets covering every assigned page. This is not individual full-size
review of every page. An enlarged NHL/PBC eight-heading composite and full-size NTT images at
860, 881, 884 and 894 were additionally inspected. NHL footer labels match 309–320;
no numerical PBC/NTT folios are inferred. NHL/PBC diagrams and NTT named quái/six line headings
provide separate structural witnesses; no NTT diagram is asserted. NTT 885 is blank except the web footer.

All 24 positions retain NHL, PBC and Trình Di; Chu Hy is separately represented at 23 positions,
not invented at Tiết six. NTT Hoán/Tiết Thoán and Đại Tượng have no separately labelled Chu Hy
commentary in the inspected passages. NHL's fused overview explanation is not an artificial layer roster.
PBC PHỤ CHÚ, named Tiên Nho and translator notes retain distinct citations and attribution.
All attached NTT numbered notes remain separate: Tốn 1–3 at 862, 4–6 at 863; Hoán 1–5 at 884;
Tiết 1 at 894. Đoài has none. Hoán duplicate note pairs 2/3 and 4/5 keep their separate call positions.

Five resolved discrepancy entries record bounded selection/display decisions, not source repairs:

- Tốn keeps NTT 860's missing negation, 861's omitted trinh and NHL 310's vô sở beside the
  corroborated explanations. NTT 853's Tượng/Thoán labels and NHL's eight-name can list are not repaired.
- Đoài preserves niệm/vong variants and NTT 867's first-line Tượng ending and unusual Chu Hy heading.
  Chu Hy's upper-line three-yang description does not change the four yang of the complete figure.
- Hoán retains yin four despite PBC 552's Cửu Tứ; NTT 881's misplaced fifth-line original Tượng
  is not used as the fourth-line meaning. NTT 875's missing negation and 874's Tiệm/Sáu ngôi Ba
  story do not supply corrected text or a transformation algorithm.
- Tiết's same-yang two/five response wording is not formal opposite-polarity chính ứng.
  NTT's mất cứng/mất đức is conduct criticism, not a polarity change; NHL's upper-line wording
  does not add a seventh position. Tốn one/four likewise remain both yin.

Tốn's tam-phẩm rosters, quoted Chu Hy criticism and upper-line trinh/hồ readings remain distinct.
Đoài's upper-line conduct, attraction and withheld cát/hung judgments are not harmonized.
Hoán preserves competing ghế, self/private-interest, royal-residence/stores and upper-line rescue readings;
proposed địch/dịch and missing khứ remain attributed opinions, not a reconstructed edition.
Tiết retains personal austerity versus permanent social enforcement, courtyard alternatives and
conditional versus stronger line-three judgments. Named scholars and cited works are testimony
through the supplied authors, not additional whole-work review. Sweating, wounds, physiology,
hunting, death, gender hierarchy, political mobilization and miracles are historical imagery or opinions,
not medical authority, forecasts, coercive duties, religious requirements or verified efficacy.
Full original/translation per-cell mapping, layer rosters and feat-082 audit/remainder closure remain open.

[Batch-fifteen advanced citations](../../packages/knowledge/data/citations/batch-fifteen-advanced.json)
support the [BPCT 41–48 article](../../packages/knowledge/data/liuyao/useful-spirit-avoidance-rescue-and-transformation-context.json).
Component review read full extracted context at PDFs 1–3, 88–93, 73, 79 and 403;
individual images at 1–3, 89–92 and 403 were directly inspected. Generated 88/93 images are not
counted as inspected; 73/79 are extracted-text comparisons only. No table/diagram occurs in 41–48.
The PDF-403 chart is outside the selection and its annotations/outcomes are not newly reviewed content.

Each verse keeps the supplied edition's Lưu Bá Ôn credits separate from Vương Hồng Tự commentary,
transmitted by Vĩnh Cao. Shared front-matter citations report edition attributions, not verified
historical authorship. Full bounds are 41: 89–90 (printed 75–76); 42–44: 90 (76);
45 verse: 90–91 (76–77), commentary: 91 (77); 46–47: 91 (77);
48 verse: 91–92 (77–78), commentary: 92 (78). Sentence 41's final explanation precedes label 42;
48's rendering ends on 92 before commentary and label 49. Note 9 at 91 belongs to sentence 45's
Thần marker despite the footer beneath 48; it explains twelve-stage terminology, not supernatural beings.
It is the sole attached note. Note 8 belongs to 39 and note 10 to 50. Reused PDF-403 dissent remains
Vĩnh Cao's separate objection to Hình/Hại, not an attached chapter-6 note or consensus.

Sentence 41 distinguishes Nhật/Nguyệt control from the conditional moving Kỵ context, without
unconditional Không/Phục immunity. Sentence 42 keeps rescue directed at the line harming Dụng;
its Hỏa is not renamed Nguyên thần. Sentence 43's verse roster and shorter Mộ/Tuyệt commentary stay
distinct; its rhetorical question is not structural impossibility. Sentence 44 keeps exit-Tuần conditions
and Tiến versus Thoái/Phục ngâm, without immediate universal cancellation of Không.
Sentence 45 separates stage imagery from the commentator's rejection of literal inference;
46 retains Dụng/Hung contrasts and later-day language without calculating dates or overwriting sentence 6.
Sentence 47's six local contexts are not a certified/exhaustive stage table; its Tài/Thế roles and
unspecified rescue qualifications stay bounded. Sexuality, wife, family reputation and mortality
judgments are not modern facts, duties, death forecasts or permission to control a partner.
Sentence 48 separates hồi đầu khắc from Dụng sinh/hợp toward another line, keeps Thân unspecified,
and retains the prerequisite about not sinh/hợp Thế Thân; Đức is relational language, not moral ranking.
No copied verse, Han quotation, replacement translation, source repair, calendar, scoring,
automated interpretation or efficacy certification is published. Feat-085's layer audit and
inventory remainder, separate verification and corpus certification remain open.

### Quẻ 61-64 and BPCT 49-56 selected comparison

[Batch-sixteen classical citations](../../packages/knowledge/data/citations/batch-sixteen-hexagrams.json)
support original Vietnamese selections for [Trung Phu](../../packages/knowledge/data/hexagrams/hexagram-61.json),
[Tiểu Quá](../../packages/knowledge/data/hexagrams/hexagram-62.json),
[Ký Tế](../../packages/knowledge/data/hexagrams/hexagram-63.json) and
[Vị Tế](../../packages/knowledge/data/hexagrams/hexagram-64.json).
Component comparison read full passages at NHL PDF 321–333, PBC 564–600 and NTT 895–936;
contact sheets covering every assigned page were directly inspected. This is not individual full-size
review of every page. Full-size focused images at NHL 331, NTT 911/912/930/933 and PBC 655 were
also inspected. NHL/PBC diagrams and NTT named quái/six line labels are distinct structural witnesses;
NHL printed footer labels match PDF numbers, while no numerical PBC/NTT folios are inferred.

All 24 positions retain NHL, PBC, Trình Di and Chu Hy separately, with NTT transmission attributed
through Ngô Tất Tố. PBC explicit PHỤ CHÚ, Trương Trung Khê at NTT 900 and uncredited PBC endnote 21
at 655 remain separate. All eight numbered NTT notes are represented: Trung Phu 1–2 at 904,
Tiểu Quá 1–3 at 916, Ký Tế 1–2 at 926 and Vị Tế 1 at 936. NTT 912 has only an empty Tiên Nho
heading after Tiểu Quá tam; no commentary is invented. None of these four NTT Thoán passages has
a separately labelled Chu Hy block. Ký Tế Đại Tượng has only Trình Di; Vị Tế nhị lacks a separately
printed Tiểu Tượng between its Chu Hy paragraph and tam. Do not supply absent text from other editions.
Full original/translation mapping, layer rosters and feat-083 per-cell/source-unit audit remain open.

Six bounded discrepancy records are display/selection decisions, not critical-edition repairs:

- Trung Phu nhị/ngũ are both yang. NHL/PBC/Chu Hy response language is shared virtue or sentiment,
  not an opposite-polarity formal chính ứng.
- Tiểu Quá NTT 911 places tam's original Tiểu Tượng in the nhị section, while reading/meaning and
  both authors explain the minister's limits; 912 contains tam's own Tiểu Tượng. Keep the nhị commentary
  separately and do not import tam's meaning. Individual images confirm the layout.
- Tiểu Quá nhị/ngũ stay yin despite shared-type response language. Trình Di explicitly says they do not
  respond as opposite polarities at NTT 914. PBC/NTT's cương thất vị overview language does not make
  yang tam structurally misplaced; NTT 912 says tam alone chính. PBC 578–579's repeated Cửu Nhị
  wording remains a noted inconsistency beside Lục Nhị headings and the yin figures.
- Ký Tế PBC 588 calls nhị Cửu Nhị in commentary/Tượng although its heading is Lục Nhị. Figures and
  NHL/NTT witnesses retain yin two; the source wording is not repaired.
- Vị Tế NHL 331 twice says five misplaced hào. Its six-line figure, six line passages and PBC 594/NTT 928
  support all six positions; a full-size image confirms the erroneous five, not an extraction artifact.
- Vị Tế NTT 930 original/reading says tail while meaning and Trình Di's Tượng paragraph say head.
  Keep the first-line tail and limitation visible rather than reassigning this to the upper line.

Other observed wording limitations remain in review notes rather than reconstructed prose:
NTT 896's unusual negation about chính bền; Trung Phu mã xuất/mã thất, hàn/hà and missing-negation
wording; PBC's Bĩ in the prison-quẻ list; Tiểu Quá's reduced/mixed Thoán opening and omitted reading;
Ký Tế original line-five missing thược beside its reading, chờ/chớ, thăm dò, truncated PBC thược gloss
and cửu/cứu ending; Vị Tế Tượng/Thoán opener, vô/vong hối and NTT 933's repeated contradictory
Chu Hy tư chất phrases including ăn năn sẽ chết. The last passage is individually image-confirmed;
only its clear opening and closing meaning is selected, not a completed or repaired paragraph.
NHL 325/327 reference-1 content was not located and supports no released claim.

Trung Phu preserves Trình Di/Chu Hy's tước/virtue beside NHL/PBC's wine illustration and inline Hệ Từ
extension; PBC endnote 21's Vị Sinh story has no identified note author and does not advise self-harm.
Tiểu Quá preserves amplified thunder in Trình Di beside attenuated thunder in NHL/PBC, PBC's quân-tử
reading of đại cát, NHL's doubts about nhị and Chu Hy's uncertainty about phất quá ngộ chi and ngộ/quá.
Ký Tế retains hanh tiểu versus proposed tiểu hanh, cloth versus vehicle-cover phất in note 2 and
Trình Di's conditional war justification beside PBC's caution against provoking war.
Vị Tế keeps Trình Di's ngật proposal beside Chu Hy's hất, extreme/kính and absent-bất proposals as opinions,
PBC nonliteral drinking and special phu gloss, and Trình Di's inability to tế without position beside
Chu Hy's possible action with self-cultivation/waiting. Named historical, religious, animal, medical,
physiological, meteorological and technological examples are supplied-author testimony, not independently
verified science/history, forecasts, modern gender/social obligations, coercion or ritual instructions.
No current calendar, injury/health/mortality prediction, automated interpretation or efficacy is released.

[Batch-sixteen advanced citations](../../packages/knowledge/data/citations/batch-sixteen-advanced.json)
support the [BPCT 49–56 article](../../packages/knowledge/data/liuyao/adverse-support-store-intervening-lines-and-release-context.json).
Full extracted context at 1–3, 91–95 and 403 was read; individual images at 1–3, 92–94 and 403
were directly inspected. Generated 91/95 renders are not counted as individually inspected.
No diagram or table occurs in the selected passages; the chart at 403 remains outside the selection.
Full verse/commentary bounds are 49–51: 92 (printed 78); 52 verse: 92–93 (78–79), commentary: 93 (79);
53: 93 (79); 54–56: 94 (80). Sentence 48's continuation and 57 onward are not absorbed.

Every verse keeps the supplied edition's Lưu Bá Ôn credits separate from Vương Hồng Tự's commentary
transmitted by Vĩnh Cao. Shared front-matter citations record edition credits, not verified historical
authorship of each verse. Note 10 belongs to 50, despite its footer after label 52; it explicitly admits
unclear commentary and supplies a Thủy/Thìn example. Note 11 attaches to vật in 53 and points to 32,
calling vật a moving line locally. These are the only attached notes. Reused PDF-403 dissent is Vĩnh Cao's
separate objection to Hình/Hại, not an attached note, whole-question audit or agreement with the main text.

Sentence 49 preserves day/month support exceptions to cô hàn; lâm khởi/trị does not establish a universal
Nhật-xung classifier. Sentence 50's terse thích nhật and unspecified Thân stay ambiguous; note 10's
explanation does not rewrite the author. Sentence 51 keeps external gian obstruction distinct from
inward Thế Không reluctance; Thê in one rendered line does not change the Thế of the reading/commentary.
Sentence 52 preserves Giao/Trùng temporal convention and the two Dần/Mão Tiến/Thoái examples without
changing casting polarity mechanics or supplying an exhaustive table. Sentence 53 keeps local Sinh-as-hợp,
Thân-as-Thế for self-questions, Kỵ harming Dụng versus Dụng khắc Thế, and the Dụng sinh/hợp Ứng exception;
the thi-Hương illness story is not verified outcome, health evidence or a reconstructed board.
Sentence 54's original bát-form beside bất reading remains visible, with relative Hại, suy-vượng/sinh-khắc
qualification and Tuyệt rescue; disease and gender accusations are attributed, not facts or judgments
about current people. Sentence 55 retains four tĩnh/động and Không/non-Không contexts, with tán/thoát effects
only in the fourth; missing strength thresholds, source-of-xung distinctions and cross-passage priority rules
are not invented. Sentence 56 retains day and transformation Tuyệt plus sinh phù, not an unconditional
rescue guarantee. No copied verse, Han quotation, replacement translation, source repair, complete classifier,
stage/calendar table, scoring, automated interpretation or efficacy certification is published.
Feat-085 discovery/layer audit, separate corpus verification and certification remain open.

### BPCT 57-69 selected comparison

[Batch-seventeen citations](../../packages/knowledge/data/citations/batch-seventeen-advanced.json)
support the [timing, relatives, body, spirits and sincerity article](../../packages/knowledge/data/liuyao/timing-relatives-body-spirits-and-sincerity-context.json).
The supplied BPCT SHA-256 is `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`.
Complete extracted text and each individual full-page image at PDFs 1–3 and 93–101 were inspected.
Pages 93 and 101 are neighboring context, not newly authored units; no selected diagram or table occurs.
Printed labels for the assigned 94–100 are 80–86. PDF 101 restarts at printed 85;
that next-chapter label does not alter the chapter-6 locators.

Every numbered passage retains the edition-attributed Phú separately from Vĩnh Cao's Vietnamese
meaning and Vương Hồng Tự's commentary through Vĩnh Cao. The citation enum has no translation value:
rendering citations use `original-text` with an explicitly named Vietnamese-meaning section and
Vĩnh Cao attribution, not attribution to the verse author. Credits at 1–3 establish edition roles,
not verified historical authorship of each verse or complete front-matter coverage.
The [inventory dispositions](../reviews/knowledge/source-inventory.md#feat-050-numbered-passage-dispositions)
record exact original/reading/meaning/commentary continuations, note owners and selection limits.

- Sentence 57 keeps all three sources of hợp trú (Nhật, self-transformation, moving line), both Dụng
  and Kỵ, and delayed adverse as well as favorable response; xung does not guarantee good results.
- Sentence 58 retains all twelve timing cases, the same-day variants in case 4, the xuất Tuần
  prerequisites and case 12's immediate xung thực beside them. Chế sát remains unspecified;
  overlapping cases and hợp as delay in 57 versus ứng kỳ in 58 have no supplied complete priority rule.
  Note 12 belongs to trị in case 10, despite the footer below label 60, and explains matching branch
  with a Dần-after-Tuần example. No calendar conversion, branch-stage table or classifier is released.
- Sentence 59 distinguishes động khắc, động sinh and tĩnh sinh, then relative suy/vượng pace;
  its accuracy assertion is testimony. Sentence 60's opening limits itself to public affairs,
  but its second paragraph explicitly treats private affairs. Neither paragraph is suppressed.
- Sentence 61 preserves Quan's seven question-specific examples and need for a present static Quan
  as the author's opinion, not a structural rule rejecting boards without it. Sentence 62's meaning
  says bị khắc nhiều, but commentary separately glosses Đa as many appearances and Phản as being
  controlled. Both layers remain visible; medication/wealth illustrations are not medical/financial advice.
- Sentence 63 retains all five roles and the author's ancestry, Huyền Vũ and competing-Huynh examples.
  The original first line has an unusual Phu-form beside Phụ in the reading; no original is repaired.
  Note 13 belongs to năm loại in 63, despite its footer after the beginning of 65: five relatives plus Ta
  explain six, not five Lục thú. Class, ancestry and crime judgments are not facts about current people.
- Sentence 64 expressly identifies Nguyệt quái thân and gives only the quoted starting convention,
  not a released placement algorithm. Its original body glyph differs from the Quái thân reading;
  preserve this without supplying a repaired source. Keep appearance/absence, two places,
  collaborative/competing roles, static/moving/transformed/hidden contexts, authority at Thế/Ứng,
  and both directions of khắc. The warning not to use it for thân mệnh sits beside a tướng mạo
  illustration in the same paragraph; retain the tension without turning either into a body assessment.
- Sentence 65 has seven verse clauses at 97–98 and a commentary continuation through 99, not a
  short passage on 97. Vietnamese meaning says Huyền Vũ/Chu Tước không nên ở Quan/Huynh,
  whereas reading and commentary require those co-locations for the theft/dispute meanings.
  The Huyền Vũ original ends with a giao-form beside hào in its reading; no critical text is reconstructed.
  Keep actual layers and the affirmative commentary as a bounded author reading, not unanimity.
  Thiên Hỷ's illness and Vãng Vong's travel cases are critiques of star-only readings, not mortality
  evidence or travel guidance. Lục thân as root, Lục thú as appearance/temperament, and lesser
  Thiên Hỷ/Thiên Y/Tang xa remain distinct; no count-based score or personality diagnosis follows.
- Sentence 66's tri tiền reading and thông biến meaning remain separate; its critique of rigid
  Long/Hổ, Water/Fire, Không/Phá, Thân/Ứng readings is not a complete replacement classifier.
  Sentence 67's short commentary defines the questioner's đạo by thành tâm, not a new audit process.
  Sentence 68 preserves every stated ritual/proxy criticism as the author's religious/social opinion,
  without efficacy endorsement, user blame, incense/clothing/handwashing rules or a proxy ban.
- Sentence 69 continues at 100, rejecting a Tí-day taboo through attributed divine-response language;
  no present-day calendar boundary or empirical validation is inferred. The unnumbered concluding
  paragraph at 100 is a separate author-commentary claim/citation, not a verse or invented sentence 70.

No copied verse, Han quotation, replacement translation, recovered absent text, source emendation,
medical/mortality prediction, class/gender ranking, supernatural fact, ritual requirement, automated
interpretation or new UI is published. Specific malformed words stay visible in review rather than
being used as calculation evidence. These selections do not close chapter-wide layer discovery,
feat-085 audit, global inventory reconciliation, separate verification or corpus certification.

### Classical exclusions

- Phệ Hạp's second-line explanations use ứng for the fifth line, although both positions are yin.
  NTT PDF 391 explicitly says the fifth line has no response.
  The selected second-line summaries do not turn that wording into a formal response-pair rule.
- NHL PDF 209 gives a sequence around the seven-day phrase that differs from the explicit Cấu-to-Phục sequence at PDF 94.
  The selected summary uses PDF 94 for that sequence.
  The content of PDF 209's reference (1) was not located during this review and does not support a released timing claim.
- NTT PDF 461 labels both a long paragraph and its short counterpart as Chu Hy.
  The selected Di overview uses the clearly attributed Trình Di passage at PDF 459–460.
  This batch does not reassign the long paragraph or author a new claim from it without the underlying edition.
- Đại Súc's third and sixth lines are both yang.
  The commentaries' shared-purpose wording does not establish an opposite-polarity formal response pair.
- Vô Vọng's illness/medicine and Di's nourishment images remain historical commentary, not medical or nutrition guidance.
  Đại Quá's final-line summaries preserve danger and do not recommend self-harm.
- NTT PDF 499 labels two consecutive Ly first-line paragraphs as Trình Di.
  The selected summary uses the first clearly attributed paragraph.
  The second paragraph is not reassigned to Chu Hy without evidence from the underlying edition.
- Ly's second-line explanations use response language toward the fifth line, although both positions are yin.
  The records preserve their shared virtues without deriving an opposite-polarity formal response pair.
- PBC PDF 312 illustrates Hàm through historical claims about animals changing species.
  Those claims are not imported as biology facts.
  NHL PDF 230 marks reference (1), whose content was not located during this review; it supports no released claim.
- Khảm's captivity and Ly's military and punishment images retain their historical setting.
  Hàm and Hằng's gender-role images do not establish fixed modern roles or qualities.

- Độn's month association differs between NHL PDF 236 and PBC PDF 329 / NTT PDF 535.
  This batch does not derive a calendar conversion from those associations.
  NTT PDF 538 starts its first-line explanation without an author label; the summary uses the explicit Trình Di passage at PDF 539.
- NHL PDF 240 attributes its restrained reading of dụng võng to Chu Hy, unlike the daring reading in NTT PDF 552.
  The underlying edition used by NHL remains unidentified; the records preserve the readings without reconstructing that edition.
- Tấn's second and fifth lines are both yin.
  Their shared central virtues do not establish an opposite-polarity formal response pair.
  Its first-line patience preserves Trình Di's not-yet-appointed condition, rather than excusing neglect of an accepted duty.
- NTT PDF 575 says con người khỏe mạnh beside the horse image.
  The selected Minh Di summary retains effective rescue without deciding whether that wording is a typo or an image substitution.
  Trình Di's fourth-line passage calls the fifth line the ruler; later passages assign the dark ruler to the final line.
  These are contextual roles, not a universal position-to-ruler rule.
- Độn's dependent-household roles, Tấn's rewards and punishment, and Minh Di's hunger, injury, and campaigns retain their historical setting.
  They do not establish modern gender roles, medical treatment, fasting requirements, or instructions to harm others.

- Khuê's first and fourth lines are both yang.
  Shared-virtue response wording in NHL/PBC does not establish a formal opposite-polarity pair; Trình Di explicitly distinguishes this at NTT PDF 599.
- NTT PDF 617 calls Chu Hy's Kiển fourth-line partner Chín Hai, although the second line is yin.
  The passage does not establish whether the label or the target position needs correction; that statement remains excluded.
- NHL PDF 256 lists Kiển's fifth-line friends as 1, 3, 5, including the recipient itself.
  The selected summary omits that list without reconstructing its intended membership.
- Gia Nhân's household roles and strictness remain historical judgments, without fixed modern duties or permission for coercion.
  Khuê's mutilation and ghost images do not establish injury predictions, supernatural facts, or medical diagnoses.
  Giải's quoted Hệ commentary assigning blame for sexual assault to its victim is excluded from released causal or ethical claims.

### Advanced exclusions

- BPCT PDF 68, Phi thần type 2, says “năm loại Lục thú”.
  PDF 15 lists six Lục thú, while PDF 97, footnote 13, explains five Lục thân categories.
  Those passages do not establish which meaning type 2 intended.
  The released article covers the supported meanings and does not silently replace Lục thú with Lục thân.
- BPCT PDF 69 says Đằng Xà “thuộc Mộc”.
  PDF 39 discusses Đằng Xà on a Mộc line, but does not establish the spirit's own element.
  The records retain its symbolic meaning without assigning an intrinsic element.
- BPCT PDF 69 ends with language about many favorable or adverse spirits.
  PDF 98–99 gives priority to Lục thân and sinh khắc.
  The released comparisons retain that context and do not turn names into a count-based score.
- BPCT PDF 70 says Ngọ has Lâm Quan at Ngọ and calls this Thoái thần.
  Chapter 1, PDF 16, places Fire's Lâm Quan at Tị; chapter 5, section 17, PDF 73, lists Ngọ changing to Tị as Thoái.
  The wording on PDF 70 remains unclear. The selected article omits that example.
- BPCT PDF 70, footnote 7, calls Dần điền thực for a Thân line broken in a Dần month.
  The matching-day notes on PDF 68 and 462 require the same branch as the line being considered.
  The released article retains the author's general conditions but omits this contradictory timing example.
- BPCT PDF 16 places Fire's Tử at Tị, while PDF 70 places it at Dậu.
  The conflicting Tử association remains excluded; a complete twelve-stage branch table needs separate review.
- BPCT PDF 41 names Kinh Trập in the Mão row but Vũ Thủy in its following calendar explanation.
  The released definition uses branch opposition only. It does not import a date-conversion or solar-term boundary rule.

- BPCT PDF 70, section 11, names “Không” changing to Tốn and back as the only quẻ pair.
  PDF 71 then presents four pairs through directional opposition.
  These passages do not establish one exhaustive transition classifier.
  The released article keeps directional examples separate from line-branch opposition.
- BPCT PDF 71 ends section 12 by restricting Phục ngâm to Càn/Chấn and saying other quẻ have none.
  Earlier paragraphs list 14 hexagram pairs, all changing Càn/Chấn in one or both halves.
  The closing sentence's scope remains unclear.
  The records retain the supported groups without using that sentence as a rejection rule.
- BPCT PDF 377, question 6, uses Phản ngâm in one sentence within its Phục ngâm answer.
  The released article uses the unambiguous statements and role-specific conditions around that sentence.
  It does not rely on the mixed label or silently replace it.

- BPCT PDF 72, section 13, groups Hưu/Tù elements without assigning the two states separately.
  The records preserve those groups and omit an inferred complete five-state table.
- BPCT PDF 72, section 14, gives conditional alternatives for interpreting combination and control.
  It does not resolve every mixed-support case.
  The records do not infer a complete Boolean classifier.
  Its three/seven wording supplies no probability calculation and does not become a forecast percentage.
- BPCT PDF 72 uses Tam hình in the Thân-to-Tị exception, while Vĩnh Cao's Ghi chú at PDF 403 rejects Tam hình/Lục hại.
  The [combination/control article](../../packages/knowledge/data/liuyao/combination-control-context.json) preserves both textual layers without combining them into one rule.
  No exhaustive Tam hình table or outcome classifier is released.
- BPCT PDF 73, section 16, places Tuyệt at the day beside hóa Tuyệt in its negative Thổ sentence.
  The attributed article preserves that wording and its adverse condition without deriving a complete priority table for day, month, and transformation.
- BPCT PDF 78, sentence 4, calls Hợi–Mão–Mùi a Thủy cục; chapter 1, PDF 16, identifies it as Mộc.
  The [support/control article](../../packages/knowledge/data/liuyao/support-and-control-context.json) retains the role distinction and selected examples, without importing the wrong element or a complete table.
- Questions 12–13 contain illness outcomes and timing claims, including conflicting timing in the PDF 400 example.
  This batch selects support conditions and role distinctions, not medical predictions or evidence that the reported outcomes occurred.
- Vĩnh Cao's footnote 9 at PDF 399 disputes the main text's Dụng thần selection for a letter.
  The [combination/opposition article](../../packages/knowledge/data/liuyao/combination-opposition-turnarounds.json) retains the disagreement instead of importing a unanimous worked example.
- BPCT PDF 73, section 17, lists seven Tiến pairs and eight Thoái pairs.
  Thìn-to-Mùi is absent from the Tiến list; Mùi-to-Thìn appears in the Thoái list.
  The [advance/retreat article](../../packages/knowledge/data/liuyao/advancing-retreating-spirits.json) retains the listed pairs without inferring the missing forward entry or an exhaustive classifier.
- BPCT PDF 388 calls the fifth line of Hằng Cửu ngũ in its first question-10 example.
  The classical diagrams and commentary identify Lục ngũ.
  The selected advanced conditions do not depend on that example's label, timing, or reported outcome.
- Section 18 ends before the separator on PDF 74.
  The following inserted essay lacks clear author attribution and does not support main-author or calculation-authority claims. Feat-051 separately summarizes it as an uncredited supplement without endorsing its efficacy assertions.
  The [proxy-context article](../../packages/knowledge/data/liuyao/divination-context-and-proxy-role.json) keeps religious and repetition judgments attributed.
  These judgments do not become an accuracy guarantee, user filter, ritual requirement, or recasting restriction.

- BPCT PDF 77 illustrates change with three Giao becoming three Đơn, named Khôn and Càn.
  The [moving-line record](../../packages/knowledge/data/casting/moving-lines.json) preserves the three-line versus six-line distinction established by chapter 1.
  The example does not replace a complete six-line transformation rule.
- BPCT PDF 78, sentence 3, has unclear negation in its older definition of a weak Dụng thần.
  The [balance article](../../packages/knowledge/data/liuyao/balance-excess-and-deficiency.json) retains the critique of a narrow reading without reconstructing that sentence's exact condition.
  Vĩnh Cao's footnote about seasonal authority remains a separate translator claim.
- BPCT PDF 78 lists seven Phù and seven Củng examples.
  Tuất-to-Sửu is absent from Phù and Sửu-to-Tuất from Củng; no complete table is inferred or equated with Tiến/Thoái.
- Sentence 5's main commentary retains Hình while Vĩnh Cao's Ghi chú at PDF 403 rejects Tam Hình and Lục Hại.
  The support/control article preserves both layers without treating either author's efficacy assertion as empirical validation.
- Sentence 6's Sinh/Vượng explanation concerns Nhật thần, expressly excluding biến hào for that sentence.
  The [day-context article](../../packages/knowledge/data/liuyao/growth-and-peak-day-context.json) keeps this scope and relative pace, without an exact forecast date.
  The [Đế Vượng term](../../packages/knowledge/data/terms/term-peak-stage.json) adds a stage definition and the reviewed Fire-at-Ngọ example, not a complete twelve-stage branch table.

- Sentence 7 treats Trường Sinh, Mộ, and Tuyệt at Nhật thần and biến hào; it excludes the other nine stage names at biến hào.
  The [stage-scope article](../../packages/knowledge/data/liuyao/death-store-extinction-empty-context.json) keeps this beside sentence 6's narrower Nhật thần reading.
  Death and hell imagery does not become a mortality forecast or evidence about an afterlife.
- Sentence 8 lists xung khởi, xung thực, and xung tán without defining an exhaustive classifier there.
  The [day/month article](../../packages/knowledge/data/liuyao/day-and-month-authority-context.json) retains supported effects and roles without inventing those classification rules.
- Sentence 9 rejects favorable/adverse month readings based only on stage names; day and month authority retain different scopes in this commentary.
  The [year article](../../packages/knowledge/data/liuyao/year-authority-context.json) preserves sentence 10's conditions instead of treating Tuế quân as invariably harmful.
  Its imperial metaphor does not establish modern legal obligations or official involvement.
- Sentence 11 defines Thân as Nguyệt quái thân; Vĩnh Cao's footnote 3 says some other works instead mean Thế.
  The [Quái thân term](../../packages/knowledge/data/terms/term-hexagram-body.json) preserves both layers without identifying unnamed schools.
  Chapter 1's placement instructions and example at PDF 15–16 do not become a released calculation table or algorithm.

The selected summaries retain historical context for gender roles, birth omens, and official punishment.
This review does not certify every medical, self-harm, ritual, or punishment verse.

These findings do not exhaust the edition's errors.
Record each additional discrepancy with its location and resolution evidence.
If evidence remains contradictory, keep the claim unresolved.

## Citation procedure

1. Identify the source key and file fingerprint.
2. Record the chapter, section, PDF page, and printed page when available.
3. Inspect the complete page and its footnotes.
4. For tables or hexagrams, inspect the rendered page.
5. Separate original text, author commentary, translator notes, and supplementary material.
6. Compare the claim with related passages before resolving a discrepancy.
7. Write an original summary and retain the source location.

`BPCT` combines historical material, author commentary, translator notes, and supplementary sections.
Its introduction describes rearranged chapters and additional notes.
Treat each layer according to its attribution.

## Existing external citations

The current runtime catalog cites Chu Dịch, Kinh Thị Dịch Truyện, and Tăng San Bốc Dịch.
Tăng San Bốc Dịch is a different work from `BPCT`.
An existing citation cannot be relabeled as one of the supplied PDFs.
The [knowledge quality contract](../product-specs/knowledge-quality.md) defines the supplied-book evidence gate.

## Related documents

- V1 rules and source mapping → [Liu Yao ruleset](../design-docs/liuyao-ruleset-v1.md)
- Content acceptance → [Knowledge quality](../product-specs/knowledge-quality.md)
- Data ownership and storage → [Knowledge model](../design-docs/knowledge-model.md)

### Feat-051 front matter and chapter-one comparison

Full extracted passages and each individual page image at BPCT PDFs 1–76 were inspected;
77 is chapter-boundary context only. The verified fingerprint remains the source catalog's BPCT SHA.
[Front voices](../../packages/knowledge/data/liuyao/bpct-front-voices.json) separates title credits,
Vĩnh Cao, Trương Cảnh Tùng, all six Phàm lệ, seven footnotes, and Vương Hồng Tự's maxims.
Credits are edition testimony, not historical authorship certification. Nhu Tuân Thì on the title
and Nhu Tôn Thì in the preface remain distinct spellings.
[Chapter one](../../packages/knowledge/data/liuyao/bpct-chapter-one-foundations.json) covers I–XXV,
including two VI headings, thirty Nạp âm pairs and six inspected diagram/layout groups.
Its Ghi chú has no separate signature: transmission through Vĩnh Cao does not prove authorship
of every inserted line. Existing selected records, claims and corrections remain unchanged.

Additional source limitations: XIX's meaning omits Tí in the Ất/Kỷ pair and the Canh/Tân line;
XVIII has no Tân Lộc/Nhẫn row. XVII repeats Hỏa at Tị/Dần in the numbered starts and has
lược marks for most stage rosters. XX has Mão-to-Ngọ beside Mão-to-Tí and Tí/Mão/Ngọ;
no complete Hình table is inferred. XXV's ten points per watch, 24 minutes per point and
3:24 example conflict with its two-hour watch statement. Original summaries report these
without supplying missing words, a modern calendar, stage algorithm, ritual or body assessment.
The source inventory records unit-by-unit authoring routes; feat-084 and global gates remain open.

### Feat-051 complete boards and discussions 1–6

All 64 board figures on PDFs 49–66 are separately represented by source-unit ID, heading,
six image-read polarities and printed annotations, actual Phục/Quái thân/Thế/Ứng dispositions,
and their own full commentary bounds. No expectations came from the core calculator.
The inventory's per-board table retains missing or conflicting markers and relational labels,
including Đại Hữu lục-Thế, Hằng nhị-Thế, Di's two Thế labels, Vị Tế's ngũ-Ứng,
Phục's absent Thế, Độn/Bí/Tiệm/Đại Quá/Đại Tráng relatives, Lý's swapped exterior branches,
Sư's swapped Hợi/Dậu and Tỉnh's Canh exterior stems. None repairs source images or replaces
previously reviewed calculation tables. Tỉnh's footnote 1 is separate from Đại Quá.
The closing Độn-to-Đồng Nhân example stays separate with its Tí/Dần wording conflict.

Full ch5 discussions 1–6 at PDFs 67–69 now include all five Dụng rosters, both burial-question
roles, all three question/answer contexts, Nguyên/Kỵ/Cừu compound conditions, six Phi meanings,
Phục method/criticism/examples and attached notes 1–4. Existing selected claims remain unchanged;
new full-passage records do not treat prior citations as complete coverage.

Full ch5 discussions 7–12 at PDFs 69–71 preserve all six spirit descriptions and inserted
star examples, all stage contrasts, Nguyệt phá and Tuần Không conditions, four directional
Phản ngâm groups plus six opposing line pairs, and all fourteen Phục ngâm pairs in their
both/outer/inner groups. Three translator notes remain separate. Note 6's purported twelve-stage
list actually omits Tử (eleven names); no omitted name is inserted. Type-2 Phi, intrinsic
Đằng Xà Mộc, Ngọ Lâm Quan, Dần điền thực, Phản ngâm uniqueness and the Phục ngâm
closing scope remain explicitly unsupported as calculation authority, not silently fixed.

### Feat-051 final discussions and inserted contribution

Complete discussions 13–18 at PDFs 72–74 preserve both seasonal paragraphs, temporary strength,
mixed hợp/khắc and the Thân/Tị exception, all three xung/hợp types in each direction, all four
Tuyệt rescue examples, both Thổ cases and the Dậu/Dần control example, the seven Tiến/eight
Thoái rosters, and the full proxy/repetition continuation. Note 8 remains Vĩnh Cao's separate
terminology explanation. No missing forward Thìn/Mùi pair or seasonal state is inferred.

The unnumbered italic essay starts after the separator on 74 and ends with address to vantinh
on 76. Its six original summaries separately account for uncredited identity, cosmological
certainty rhetoric, the political authority analogy, seasonal/group-strength examples,
Nguyệt versus supported strength and leader/peer illustrations, timing and admission of
complex overlapping cases. It is not Vương Hồng Tự's item 18 or an invented 19, and no signature
is supplied by inference. This new evidence justifies a narrower exclusion statement: no
main-author attribution or calculation authority, rather than no original summary of the essay.
No source image, quoted passage, repaired source, calendar, classifier, medical/ritual advice,
new interpretation behavior, independent audit approval or certification is released.

Chapter-two prose units have no individual signed author. Their attribution names the supplied
Vương Hồng Tự compilation, not a claim that he composed every formula or paragraph.
The edition's generic Phú credit is not used to assign these poems to Lưu Bá Ôn.

### Feat-052 application comparison — Thiên Thời

BPCT PDFs 101–110 (printed85–94) have 44 numbered passages. Full extracted passages
and contact-sheet images were inspected; this is not full-size individual review of every page.
The [weather article](../../packages/knowledge/data/liuyao/bpct-chapter-seven-weather.json)
keeps the Phú/original-reading summary, Vĩnh Cao's separately printed meaning and
Vương Hồng Tự's commentary distinct. Generic edition credits do not prove authorship of each verse.
Note1 at109 attaches to trợ-Phụ in43, not Phụ Mẫu as a relative. No diagram/table occurs.

Weather roles remain question-specific: Tài means tạnh, not automatically sun;
Tử denotes sun/moon appearances, Huynh wind/cloud, Quan thunder/dimness, with explicit
season, strength, movement, support and obstruction conditions. All fourteen timing
cases in43 are separately represented, including the printed tĩnh Không gặp chờ with
missing encounter object and the unclear Nguyên hợp cục khắc; neither is repaired.
Verse37's Xà differs from commentary's Thanh Long/Thìn; meaning39's Phúc Mộc differs
from commentary's Mộc Tài. Verse42's đồng nhân is glossed as Huynh, not a mandatory
hexagram identity. Verse34 is not a three-yin/three-yang classifier. Eclipse, dragon,
weather accuracy and divine imagery remain attributed doctrine, not established events,
meteorology, astronomy, forecasts, calendar computation or efficacy. Existing source-compared
records stay unchanged; later feat-086 layer/unit audit and global gates remain open.

### Feat-052 unnumbered Niên Thời

The [year section](../../packages/knowledge/data/liuyao/bpct-nien-thoi.json) has36 passages,
five separately attributed Vĩnh Cao notes and eleven illustration obligations at PDF111–118
(printed94–101). It is not chapter8. Original/reading, meaning and commentary remain separate;
36 has no commentary block. Complete extracted passages and contact-sheet images were compared.
No tables/diagrams occur. Note1 belongs to3,2 to6,3 to10,4 to19,5 to20.

The tứ xung Thân of3 differs from commentary's Tử sinh hợp Thế;13's hóa Phúc/Tài
conditions are not repeated in the commentary;16 places Xà at Thế in the phú but lục
in the commentary. Keep these differences, not a repaired consensus.31 distinguishes
Thủy/Hỏa for hot/cold from Phụ/Tài for rain/drought, so it does not overwrite chapter7's
question roles. The geographic examples Tí/Tề, Sửu/Ngô, Dần/Yên are not a complete map.
Historical omen, dragon, earthquake, disease, warfare and imperial-administration accounts
remain author testimony, not verified events, efficacy, modern politics or safety advice.
The existing year/day/weather terms are cross-references, not merged source-unit identities.

### Feat-052 Thân Mệnh and inserted lifetime essay

The [life article](../../packages/knowledge/data/liuyao/bpct-chapter-nine-life.json) covers80
numbered passages and all attached notes at PDF119–137, then the distinct inserted essay at
137–141 (whole chapter printed101–123). Full extracted context and contact sheets were read;
individual137 confirms the red inserted heading, website credit and30-item original roster.
Thirty separately located Vietnamese items start at138 and end141; their individual translator
is not identified. The essay is not verse81, Vương Hồng Tự's commentary or a signed Vĩnh Cao note.
Note1 attaches to13,2 to25,3 to41,4 to43,5 to53. No table/diagram occurs.

Six separate contexts in18 cover wealth, office, children, old age, lifespan and rejected
periods. The rejection of Dịch Lâm Bổ Di's30/30/60-year scheme is the author's testimony,
not proof of a replacement's efficacy. The inserted essay's item8 says a poor person in a rich
house in the Hán source but the Vietnamese says a miser in a rich house. Other awkward/malformed
words and repeated negatives are retained as limitations, not reconstructed critical text.
Items19–23 of the supplement qualify each relative's Thế role, and20 allows fame without office;
these are that supplement's opinions, not a rewrite of the80 main passages.

Observed name differences remain source-specific:37 has Quách Uy in the phú versus Quách Anh
in reading/meaning;42's Trần labels differ from its Trần Bình commentary;45's Hứa Tử Hòa differs
from Hứa Bình Hòa;65's Lý Lệnh Bá differs from Lý Ngụy Công.58's Long/Phúc phrase is rendered
using Long/Lộc Mã and inconsistent spouse wording.75's lung/voice,76's milk and all health,
lifespan, disability, birth, marriage, adultery, rank and character claims stay historical views,
not diagnoses, forecasts, facts about current people or ethical obligations.51's suicide account
and53/55's fidelity/coercion language do not advise self-harm, victim blame or forced marriage.
Historical examples are separately cited reports, never verified efficacy. No source correction,
modern calendar, interpretation engine, psychological/medical assessment or global approval is added.

### Feat-052 Cầu Danh

The [fame article](../../packages/knowledge/data/liuyao/bpct-chapter-ten-fame.json) has the
unnumbered opening/closing and26 observed labelled passages at142–148 (printed118–124).
PDF143's individual image confirms two label5 blocks;05a/05b preserve these, not a renumbered
26.1 and the closing have no commentary. Four Vĩnh Cao notes stay separate:1 attaches3,
2 to9,3 to14,4 to the closing. Complete extracted context/contact sheets and focused143
were inspected; no diagram/table appears. The21 historical illustration has its own obligation.

The two Phụ/Quan roles, rival Huynh, assisting Nhật and differing question-owner roles stay
conditional.7 allows Tài-only assistance with Phụ Không but rejects Tài/Quan both moving;
23's phú says Không while commentary says Mộ/Tuyệt, not a silently repaired identity.
24's Quái Thân differs from25's self-Thế or child-Tử. Contemporary exam success, appointments,
recognition, bribery, travel safety, illness, lifespan, timing and predictive accuracy are not
inferred from these historical claims. The final continuation of25 is on148, before the
separate closing verse and note4; no next-chapter content is absorbed.

### Feat-052 Sĩ Hoạn

The [office article](../../packages/knowledge/data/liuyao/bpct-chapter-eleven-office.json)
accounts for26 labels and a separate closing verse starting154 and continuing155
(printed129–130);155 was inspected in the contact sheet. Three notes at150/153 attach4,
6 and19 respectively. Full extracted context and contact sheets were reviewed; no table or
diagram appears. Each source layer and exact continuation has its own evidence.

6 has the Tuế clause in reading/meaning but no separately printed original Hán line;
no original is supplied.10's Phúc in phú differs from the Tài/Phụ conditions of commentary.
13 reverses Huynh hóa Quỷ in phú to Quỷ hóa Huynh in commentary; both stay visible.
5's hidden-Quan warning and16's retained-office Quan under Thế are not harmonized by rewriting.
7's outside-patrol exception,9's patrol/administration movement contrast,23's ordinary office
versus active military question and26's Tử for monks/Daoists/court physicians stay separate.
These are historical opinions, not civil-service, legal, medical, military, bribery, ethnic,
travel, mortality or supernatural authority. No reported outcome is independent efficacy evidence.

### Feat-052 Cầu Tài and folio-only165 correction

The [wealth article](../../packages/knowledge/data/liuyao/bpct-chapter-twelve-wealth.json)
covers opening,41 labelled passages, closing and two Vĩnh Cao dissent notes at156–164
(printed130–138). Complete extracted text and contact-sheet images156–163, plus individual
164–166, were inspected. PDF165 has only printed139, not the previously assumed closing
fragment. The closing prose/verse is complete on164. The inventory keeps the exclusive
chapter12 parent156–165 and gives165 its own non-content child, not a source omission;
chapter13 begins166. No table/diagram occurs. Notes1/2 on158 attach10/11, not following clauses.

10's Huynh thái quá claim is distinct from Vĩnh Cao's objection that the example merely
shows Huynh sinh Tử sinh Tài.11's Quái Thân authority remains beside his doubtful-efficacy
and Thế-strength qualification.15's author rejects the old Huynh hóa Quan reading in favor
of two moving relatives; his testimony is not verification.03's useful Quan movement and09's
obstruction keep their different Tử/Huynh conditions.12 includes Tài khắc Thế as coming toward
the self;26–32 retain partnership, public office, cửu lưu, livestock, lending, shop-opening
and object-specific borrowing roles.29's huyết Tài versus Vietnamese khó kiếm tiền stays a
layer discrepancy.20's Thê in commentary is not silently corrected to Thế.24's seven timing
cases and25's critique of element-only season pricing do not produce a calendar or financial
classifier. Source statements about profits, theft, disease, death, gambling, prices, ritual
sincerity and prediction do not establish efficacy or give financial, veterinary, safety,
legal, medical or religious advice. All prior selected records remain unchanged.

### Feat-053 loss applications — chapter13

The [loss article](../../packages/knowledge/data/liuyao/bpct-chapter-thirteen-loss.json)
compares PDF166–175 (printed139–148), all37 numbered clauses, opening/closing and five
translator notes. The exact BPCT SHA and467-page count were checked. Full extracted
PDF166–230 passages and contact sheets165–231 were read; individual images1–3,174,190,219–222,227
were inspected. This is not full-size image review of every page. No table/diagram occurs.
Front credits conventionally associate phú with Lưu Bá Ôn, compilation/commentary with
Vương Hồng Tự, translation/notes with Vĩnh Cao; individual passage authorship remains uncertain.

Note2 on167 explicitly disputes clause03: phú puts tha/ngoại at neighbors while commentary
puts the missing object outside and difficult to find, using intervening lines for neighbors.
Note1 defines bản/tha as primary/changed in this local explanation; this is not a repair of
palace calculation. Notes3/4/5 explain mistaken loan, religious names and the nã/na reading.
Clause26 retains all12 branch-linked witness examples, without profiling people. Clause33
separates catching a thief from locating concealed objects; clause34's Phi/Phục specifically
means Thế/Quỷ, not every useful-spirit question. Clause37 switches to Phụ for vehicles,
clothes/documents and Tử for animals. Historical identity, theft and capture assertions are
not evidence of guilt, verified outcomes or safe pursuit instructions. No prior released record
or citation is rewritten; later feat-087 audit, separate verification and certification stay open.

### Feat-053 travel applications — chapter14

The [travel article](../../packages/knowledge/data/liuyao/bpct-chapter-fourteen-travel.json)
covers PDF176–183, printed148–155: opening,27 clauses and note1. The heading actually
prints23 under chapter14; no missing22 is inferred. Item7 has no independent Vietnamese
meaning, while item27's meaning extends to183. Item1 commentary crosses176–177, item10
original/reading crosses178–179, and item13 commentary starts180 rather than179.
Item13 phú names Tài/Phụ directions while commentary names Tài/Phúc; item16 meaning
prints Thế against Thế where phú/reading has Thê against Thế. Neither is silently repaired.
Note1 belongs to item10 and distinguishes xung Thế from xung the combining line. Roles
remain self/destination/intervening route or companion, with item25 requiring the traveler’s
actual relation and item18 excluding visits to officials from its favorable Phúc context.
Travel, weather, theft, danger and trading outcomes remain historical claims, never route,
safety, suspect-profile, calendar or investment authority. Inspection limits are those of the
feat-053 loss section; the source-unit map and release are not later audit approval.

### Feat-053 teacher and teaching-house applications — chapters15–16

The [teacher article](../../packages/knowledge/data/liuyao/bpct-chapter-fifteen-teacher.json)
covers PDF184–190, printed155–161, opening, printed1–15/17–25, closing and four notes.
The [teaching-house article](../../packages/knowledge/data/liuyao/bpct-chapter-sixteen-study.json)
covers PDF191–199, printed161–169, opening,34 clauses and eleven notes. Complete passages
and contact sheets were inspected within the previously stated image boundary. Individually
inspected PDF190 has only folio161: the earlier plan's short continuation was incorrect.
Coordinator approval retains the184–190 parent interval but places closing wholly on189
and a separate non-content accounting child on190. Chapter15 does not print16; no passage
is reconstructed. Chapter16 clause34 original/reading spans198–199; note11 on197 belongs
to clause24 on196. Chapter16 notes6/7 attach20/21, not the following clauses.

Chapter15 self-seeking learner uses Thế as pupil/Phụ as teacher, whereas a parent inviting
an unknown teacher uses Thế as parent/Tử as child/Ứng as teacher. Known relations and
questions for others must use actual relation, including vocational or religious learning.
Chapter16 asks about a teaching appointment: Thế is teacher, Ứng host, Phụ teaching books/
place, Tử pupils, Tài pay; querying pay differs from querying the school. Chapter15 clause09
phú names Long Đức while commentary names Bạch Hổ; chapter16 clause03 meaning says
weak where original/reading says young, and clause23 meaning uses flourishing where
original says Dưỡng. Separate summaries retain these differences. Biên Thiều/Hiếu Tiên,
Lão Tử, Trình brothers, Lưu Thứ, Mã Dung, Quỷ Cốc’s Tôn Tẫn/Bàng Quyên and Y Xuyên’s
Dương Thì/Du Tạc stay attributed allusions, not verified fortune-telling case results. Physical
punishment, class/gender and ability stereotypes, income and litigation assertions remain
historical source claims, not modern education, discipline, medical or financial guidance.

### Feat-053 marriage applications — chapter17

The [marriage article](../../packages/knowledge/data/liuyao/bpct-chapter-seventeen-marriage.json)
covers PDF200–211, printed169–180, opening, printed1–30/32–45 and three notes. The source
skips31 without a reconstructed clause. Shared-page verse/reading continuations and later
commentary starts remain separately located. Item04 phú's particular benefit differs from the
Vietnamese negative rendering; item16 commentary both implies prior unfamiliarity under tam
hợp and later says prior meeting. Item26 original wording, reading and commentary differ in
hợp/hòa/hoá. These remain source-layer statements, not silent harmonizations. Item25 rejects
season-only bản mệnh reasoning and invokes the commentator's own experience; that reported
experience is not scientific verification.

Items17/45 explicitly reject indiscriminate Tài=wife/Quan=husband and mortality inference
from Không; parents, siblings and question context require their actual useful-spirit relations.
Item19's in-law roles and item33's intervening matchmaker versus separate Ứng question stay
intact. Coercion in07, gender authority in18, sexuality accusations in10/20, widowhood in21,
beauty/class judgments, reproduction and historical attendants in26 remain attributed source
beliefs, not current duties, consent evidence, diagnosis or advice. All45 printed-label slots
except the observed31 gap are accounted for, with no efficacy or later audit claim.

### Feat-053 childbirth and household reception — chapters18–19

The [childbirth article](../../packages/knowledge/data/liuyao/bpct-chapter-eighteen-childbirth.json)
covers PDF212–222, printed180–190, opening, printed1–40/42, four notes and folio-only222.
Individual image222 confirms no planned short fragment: item42 ends221; parent212–222 is
unchanged with coordinator approval. No item41 is inferred. The
[household article](../../packages/knowledge/data/liuyao/bpct-chapter-nineteen-household.json)
covers PDF223–230, printed190–197, opening and30 clauses; chapter20 begins231 and remains
outside this feature. No household footer note, table or diagram was observed. All passages and
contact sheets were inspected; individual220 was additionally checked for note4 and item15
of the household was compared to the extracted passage without supplying its unclear object.

Childbirth note2 disputes the opening’s bow/towel placement against Nội tắc (boy’s bow left,
girl’s towel right). Item04 phú uses Tài hoá Tử while commentary uses Tài hợp Phúc; item07
phú/reading/meaning differ around Long/Thai as the joyous sign. Note4 reports Nội should be
Ngoại, but the supplied image220 already prints Ngoại; the other original edition mentioned
by the note is unavailable, so no reconstruction is claimed. Birth question Tử, pregnancy-existence
question Thai, husband/self roles, third-party absent-father conditions and note3's month bound
stay distinct. Intervening bà đỡ in a birth question differs from Tài when separately asking
about a bà đỡ/vú em. Item32's devaluation of daughters and item40's revival promise are only
historical source assertions, never endorsed values or efficacy evidence. No medical, pregnancy,
feeding, sex-determination, due-date, delay, medication or emergency guidance is released.

Household reception includes historical adoption, attendants and persons in distress with
relation-specific roles, not modern rights to buy, retain or classify people. The opening’s tiện bế
and Vietnamese affection wording remain distinct. Item15 commentary's incomplete object of
hợp is not repaired. Item22 phú prints vi Phụ whereas reading/meaning/commentary say absent
Phụ; the difference is explicit. Theft, character, health/death, contracts, money and abandoned-child
claims remain non-authoritative source ideas, not safeguarding, legal or financial decisions.
All seven units have bounded original summaries and unresolved later audit/verification gates.

### Feat-053 final reconciliation

Individual image174 confirms clause34 in chapter13 has no independently printed Vietnamese
meaning, only phú/reading and commentary; the interim synthetic meaning was removed from the
new batch before final release review. Along with chapter14 item7, it has an explicit absent
meaning disposition and no translation-layer obligation. The final comparison inspected individual
images1–3,174,190,219–222,227 in addition to contact sheets165–231, not every page individually.
The registry retains all unrelated units and17 prior exclusions:276 stable children plus seven
assigned parents, all mapped to seven articles with760 separately cited claims. Of the children,
237 are numbered units, seven openings, two closings,28 notes and two folio-only non-content
units. No missing numbered passage is fabricated. Prior released records/citations are semantically
unchanged. Source review/certification remain closed; global discovery and later feat-087 review
are unresolved. At feat-053 completion, feat-054, PDF231–269, was the next authoring batch; its source comparison is recorded below.

## feat-054 source comparison

The fingerprinted BPCT edition's PDF231–269 passages and all39 individual page images
were inspected, along with boundary images230/270 and credits1–3. The four parent
intervals remain231–250,251–262,263–265 and266–269. Printed labels are197–216,
215–226,226–228 and228–231: they overlap/restart across units, not a single offset.
There are no folio-only pages in this cohort. PDF265 contains chapter21 item8's
closing commentary, not merely folio228. No diagrams or tables were observed.

- Chapter20 has opening/1–73, followed by the separately headed **Thuyền Gia Trạch**
  opening/1–20 within the same unit. Item73 has meaning on246 but no separate
  commentary; the nested boat passages have no separate commentary. They must not
  be conflated with chapter21. The nested mappings vary by passage: nhị is liệp mộc
  in6 but rope in17; lục is rear rudder in3, chèo/mái che in11, rudder in19.
- Chapter20 item7's phú says Đế Vượng whereas its commentary says Trường Sinh.
  Item10's commentary elaborates the intervening-branch Môn/Lộ examples but gives
  no separate account of the verse's house-exchange clause. Item43's rendering
  changes the dragon/snake image. Item68's meaning prints a negative form involving
  no Nhẫn where the phú/cách đọc describes accumulated Hình/Nhẫn;69 likewise has a
  negative-form meaning. Keep the differences, not a repaired common sentence.
- Chapter20 note2 explicitly remarks that the commentary uses natal nạp âm instead
  of Thế. Note4, physically after31 on238, names29/30 and doubts the basis and original
  authorship of the tinh sát account. Preserve both the printed numbers and location;
  do not silently renumber the note or certify a later author. Note8 only gives two
  Hàm Trì branch-group examples; it is not a complete calendar table.
- The supplement has1–27 and29–47, with no28. Individual257 confirms the jump.
  Item37 on259 has no independent Vietnamese meaning. Item1 has Thuỷ in the source
  and meaning but Quỷ in the reading;47 has Quỷ in source/reading/commentary but Phụ
  in the meaning. Note1 reports substituting Tuỳ for original Trục for metre.
  Inline glosses at12/40 remain distinct from verse and commentary.
- Supplement16/25/35/41 reject fixing mother/siblings/mother/father respectively to
  nhị/tam/tứ/ngũ irrespective of Lục thân and question roles. Item36 retains the
  qualification that ngũ khắc nhị can be favourable but moving to harm Trạch is not.
  Item33's verse denies no-door while its commentary allows no main door or damage;
  34 rejects the external-family inference attributed to Dịch Lâm Bổ Di.
- Chapter21 has opening/1–8 and one note. Its original opening is about buying a
  boat; the Vietnamese meaning says trading boat and note1 defines thuyền hộ as
  people living on boats. Its commentary distinguishes trading/rental enquiries
  from an owner's own enquiry using Gia Trạch. Phụ is boat or pilot according to
  question, and Bạch Hổ's sail symbolism has both favourable and adverse conditions.
- Chapter22 has opening/1–15 and three notes;15 has no commentary. Note1 reports a
  missing original word and the translator's inserted Bản, not a recovered original.
  Its historical roles are Thế proprietor, Ứng visitors, Tài working women and Quan
  resident customers. Tử's motion, stillness and concealment are distinguished in6/10;
  Quan sinh/hợp Thế is still favourable when moving in7. Item9's commentary literally
  says supported Huynh still fails to suffice; no missing negative is invented.

General compilation/phú/translation credits establish conventional attribution, not
an individual author roster. The translator preface on3 reports moving Tân Tăng Gia
Trạch here and mixing earlier/later material. Its verse and commentary therefore
retain an uncredited-supplement attribution rather than certain Vương Hồng Tự/Lưu
Bá Ôn authorship. Translator glosses use the general Vĩnh Cao credit with explicit
uncertainty for unsigned inline notes. This is source comparison, not feat-088 audit,
independent verification, corpus certification, rights clearance or predictive efficacy.
All medical, safety, financial, gender/class, occupation and moral accusations remain
attributed historical claims, not advice or authority over real people.

## feat-055 source comparison

Codex worker compared the complete extracted BPCT PDF270–301 passages and
individually opened every page image, including279; boundary images269/302 and
credits1–3 were also opened. SHA-256 remains
`713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`,467 pages.
The [inventory register](../reviews/knowledge/source-inventory.md#feat-055-illness-remedies-and-absent-travellers-passage-register)
owns child IDs, exact layer page bounds and dispositions. Chapter23 is Tật Bệnh,
subsection I Bệnh Chứng;24 Bệnh Thể;25 Y Dược;26 Hành Nhân. Page279 contains
only printed241, not omitted medical prose. Folios232–240,240–245,246–254 and
254–260 restart/overlap;294/295 repeat254 across the last two intervals. No
source tables or diagrams occur; the Hằng example on284 is a textual example.

- Chapter23 has28 numbered phú and3 translator notes. Item5 has no separate
  commentary. Item4's Hán Quỷ/cách đọc Quan is retained without splitting
  concepts. Item8's note defines bản cung as initial quẻ and tha quái as changed
  quẻ, not automatically Bát cung. Item11 need not use Quan but must concern
  Dụng; its printed account of cold/hot changes is not repaired. Item13's phú
  says xung Tài while the commentary says khắc Tài; translator note3 explicitly
  rejects Quan khắc Tài because Tài sinh Quan. Keep the disagreement, not a
  corrected universal rule. Item14's meaning omits hoá Thổ;15 says cung Kim
  instead of the phú's Đoài. Item17's Chấn at ngoại quái must not be fixed to
  legs; its cổ medical term ung thư is not a modern cancer diagnosis. Item20
  concerns Quỷ Tuyệt restored by sinh, unlike Dụng Tuyệt restored in24/16.
- The closing portion of278 is a different-font Vietnamese-only insertion,
  framing plus11 numbered observations, signed **Đông tà cẩn bút**. No separate
  Hán text, reading, meaning or classical commentary is printed for it. Retain
  the signature and a separate supplement layer; identity and insertion date
  remain unknown, not compiler/translator authorship. Its directive to cast
  again when Dụng is absent (except Nhật/Nguyệt Dụng) is only a source claim.
- Chapter24 has26 printed labels and2 notes. Label14 repeats13's phú, meaning
  and commentary, with a doubled14 in the image; no missing alternative is
  reconstructed. Opening and25 have no separate commentary. Item1 has explicit
  exceptions for parents/husband;7 needs Phụ motion for siblings despite its
  general warning;18 is limited to parents, high official and husband, with
  Quan both phục and Không even though the meaning omits phục. Item12 rejects
  reading every Dụng hoá Quan as death: Quỷ sát here is Kỵ/hồi đầu khắc without
  Nhật/Nguyệt/động rescue. Item26 similarly distinguishes Phúc=Tử narrowly or
  Nguyên broadly, Quỷ sát=Kỵ rather than Quan. Item20's commentary prints
  không xung khắc while the verse warns about xung khắc; preserve the
  qualification/wording instead of deleting không. Item24 has an unclear
  Dụng/động subject; no new subject is supplied. Item22's Hằng example is
  attributed as a source example: tam/ngũ Quan around tứ Ngọ Tử, not a new
  calculation fixture or independent prediction result. Item23 retains
  visible/changed Mộ and the xung phá Mộ rescue qualification. Item19's
  ritual names, âm/dương distinctions, onward reference to Quỷ Thần and
  warning against costly careless divination are historical assertions.
- Chapter25 has31 items,6 notes and prose closing. Item5's Phụ warning is not
  separately explained by its commentary. Item6's broad Tử hoá Tử verse is
  qualified by Tiến/Thoái and Phục ngâm in the commentary. Item9 distinguishes
  Nhật Quan hiện/ẩn. Item13's meaning adds suy to Phụ phục; commentary's
  không thể không tĩnh/không động is left as printed. Item17's Vietnamese
  meaning has an either/or form rather than the commentary's element/thermal
  pairings. Item18 has Sửu Dần in Hán/reading but Sửu Mùi in meaning. Item19
  starts Mộc Tài but its fish/cold commentary uses Thuỷ, and explicitly forbids
  careless application when Tài does not move. Item24 repeats Mộc for two
  prohibitions; do not replace an occurrence with another element. Note6
  identifies hoàn as pills, not a drug ingredient. Item28's phú/reading mạc
  dục bế môn contrasts with the affirmative meaning/commentary; retain the
  unresolved difference. Illness, prescriptions, food prohibitions, vomiting,
  sweating, needles, moxibustion, stopping/spacing medicines and self-recovery
  are summarized only as the source's historical views. Closing assertions
  of always effective divination are not independent efficacy evidence.
- Chapter26 has30 actual labels,1–25 then27–31; image300 confirms absent26.
  No missing item is synthesized. Two translator notes and the unnumbered
  closing phú/meaning are separate. Item1 assigns question-specific Lục thân
  or Ứng outside them;29/30 are instead questions about letters, using Phụ as
  Dụng. Items2/6 distinguish bare stillness from still Dụng sinh/hợp Thế.
  Item3's Thế Không speed inference cannot override10's Dụng also Không;
  4 requires unrestrained/unhidden moving Dụng,8 distinguishes hợp detention,
  13 xung Phi versus Phi Không/hợp, and11 distinguishes distant enquiry from
  nearby12. Item23's source alternates illness and imprisonment symbols;
  25's criminal accusation remains attributed, not evidence about a traveller.
  All timing formulas remain descriptive, not a calendar or return-date engine.

General front credits establish conventional phú/compilation/translation
attribution, not certain individual authorship of each passage. Translator notes
remain separate; the observed Đông tà signature is not collapsed into them.
This is feat-055 source comparison, not feat-089 audit, separate verification,
certification, rights clearance, or medical/predictive efficacy. No source prose
or images are redistributed, and no medical, legal, travel or safety advice or
application behavior is added.

## feat-056 source comparison

Codex worker read the complete extracted passages and all 63 rendered BPCT pages
302–364: 302–315 individually, 316–363 as full-resolution page pairs, and 364
individually. Boundary images 301/365 and credits 1–3 were also inspected.
The supplied 467-page edition retains SHA-256
`713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`.
The [passage register](../reviews/knowledge/source-inventory.md#feat-056-litigation-spirits-agriculture-state-conflict-and-flight-passage-register)
owns exact child IDs, layer locators and dispositions. No diagrams or tables occur
in the assigned interval; page 365's boards belong to Part II, not chapter 35.
Printed folios overlap at chapter boundaries, jump from 272 to 275 at 315/316,
and repeat at both head and foot of 323–329. This is an observed label gap, not
evidence of missing PDF pages or a licence to invent omitted content.

- Chapter 27 has an opening, 1–34 and one footnote. Opening/34 have no separate
  commentary. Item 6's commentary stops after six quiet lines and Thế/Ứng not
  sinh/hợp; do not complete the sentence or silently reconcile quiet quẻ with
  moving Tử in the phú. Item 9 ends with the literal **x** for the second nearby
  witness; no Ứng replacement is established. Item 3 distinguishes dominance
  from victory: Thế khắc Ứng is insufficient without Quỷ, Nhật/Nguyệt or moving
  line khắc Ứng. Item 14 still calls Tài Kỵ after using it as lý; 20's petition
  role and 28's money-to-official role are different questions. Bribery, guilt,
  punishment, imprisonment and release are attributed claims, not legal advice.
  In 31 the reading has Nhật/Đức while the meaning has Nhật/Phúc; preserve both.
- Chapter 28 has an opening, 1–25 and nine translator notes. Meaning 3 omits
  Chấn; commentary still says Càn at this place belongs to Hoả, without silently
  replacing Càn's established element. Meaning 10 prints **người khắc ta** for
  elders where the reading/commentary have **sinh**. Item 11's vô tự becomes no
  descendants in the meaning. Item 12's phú has Nhật/Nguyệt but commentary
  explains Nhật only. Note 9 explicitly rejects commentary 14 as unrelated to
  the phú: the compiler's adultery allegation and translator's household-spirit/
  village-friend reading are separate. Item 21 repeats Huyền Vũ for strange and
  stolen objects; do not substitute another Lục thần. Item 22's original and
  commentary retain độc phát/kinh văn despite abbreviated reading/meaning.
  Spirits, ritual, disease, carpenters and sexual accusations are beliefs in
  the source, not evidence about real causes or persons.
- Chapter 29 has an opening, 1–22, two distinct labels 23, then 24–27 and one
  note. Children `23a`/`23b` preserve source order, not corrected numbering.
  Tài must be present yet normally quiet in 1, with hoá Phúc exception; Huynh
  motion in 4 is rescued by Tử motion. In 8, no injury to Thân/Thế with quiet
  vượng Tài is an exception; 13 qualifies the general less-banking claim.
  Item 16 literally includes Tài hoá Huynh Tử among adverse changes, yet later
  favours vượng Tài hoá Tử; neither statement is deleted. Item 17 requires
  separate questions by seed type. Item 26 has no Cấn explanation and says
  Càn in nội is still not low, unlike 20's general nội/ngoại contrast. No soil,
  weather, market, land title or agronomic recommendation is established.
- Chapter 30 has 1–30, two footnotes and an unsigned inline diệp gloss in 7.
  The gloss uses the general translation credit with uncertainty about its
  individual author. Questions separate Tử life, Tài price/profit and cattle/
  horse strength, purchase, breeding, treatment, betting and hunting/fishing.
  Item 9 retains the malformed **Canmf** palace label and inconsistent second
  example's body colour, not a reconstructed animal diagram. Item 18 prints
  Nhật in commentary despite Quan in phú. Item 19's thô/tế becomes ít/tạp in
  meaning/commentary. In 22, đạo lai chi súc suggests stolen-origin livestock,
  while meaning/commentary talk about theft; keep the difference unresolved.
  Item 23's commentary gives Quỷ hoá Huynh or both moving, not both directions
  of transformation. No husbandry, veterinary, gambling, animal-fighting or
  hunting practice is endorsed.
- Chapter 31 has opening/1–20 and one note. Item 1 explicitly rejects fixed
  Thuỷ Kỵ/Hoả Dụng; tằm, silk and leaf price use different question roles, while
  Tài hợp Ứng or a moving line can mean the female keeper. Item 14 distinguishes
  silk, leaf price and worms rather than claiming universal benefit from Huynh
  Không. Items 15/18 distinguish spring/summer, with Tị/Ngọ indicating seasonal
  strength and Thuỷ Tử favourable in summer. Item 20 says cục strength is not
  bounded by season here: Phụ harms Tử; Quan harms its Nguyên Huynh. These are
  source doctrines, not activated calendar/cục calculations. Claims about
  supposedly impure people, women, pregnancy, infidelity, fire, illness and
  silkworm rooms do not identify people or establish safety/causation.
- Chapter 32 has 1–23 and two notes; 23 has no separate commentary. Courtier
  enquiry in 1 gives Tuế king, its agreeing line queen, Nguyệt officials, Nhật
  heir, Tử populace, Phụ state; royal self-enquiry in 4–6 instead uses Thế king
  and Ứng queen. Tử tha cung is a minister in 9, bản cung heir in 12–16.
  Item 18 retains cát thần khắc; 22 retains a generally adverse Càn→Tốn with
  favourable stars. Historical allusions are what the edition reports, not
  independently checked history, political predictions or moral accusations.
- Chapter 33 has 1–26, an unnumbered closing phú and one note. In 2 Hán says
  Kim hào while reading/meaning add Phụ. Item 4's commentary literally starts
  Thế động sinh Thế/Thân; no Thuỷ replacement is inferred. In 9, afflicted Quan
  in phú differs from vượng Quan in commentary. Item 11 needs many quiet Quan
  and few strong moving Tử; 13 warns that victory need not prevent internal
  destruction. Item 14's Tử hào is the death phase, not another Tử Tôn line.
  Item 18's commentary prints Duy Dương versus Tuy Dương in phú; 19 prints
  vượng Quỷ/weak Thế together. Military stories and numbers, arms, ambush,
  siege, assassinations and surrender are source accounts, not instructions.
- Chapter 34 has opening/1–42, a prose closing and four notes. Item 29 frames
  30–42 as appended avoidance-of-misfortune material; no unprinted heading is
  invented. Item 5's luyến đề khởi contrasts with commentary warning against
  revived hidden Quỷ; note 2 says Tử Vong here means Tuần Không, not death.
  Item 8 prioritizes usable xung-tán Quan, then sinh/hợp Thế when Tử is
  ineffective. Item 13 retains **cũng cần** Huynh cục and distinct family/
  property consequences; 27 includes the Phúc-vượng/Quan-suy rescue after its
  child-cry allegation. In 32, the vượng moving subject is unnamed; in 33
  Nhật động remains as printed. Calm quẻ in 38 still requires Quan not xung.
  Ritual, directions, shelter, evacuation, arrest, sexual violence and survival
  claims are not safety/legal guidance, accusations or victim blame.
- Chapter 35 has opening/1–4/6–30 and seven notes. No 5 is reconstructed;
  opening/30 have no separate commentary. Item 2 distinguishes stationary
  current direction from moving changed direction. Item 12 distinguishes hợp
  khởi/trú, 13 xung động/khai. Item 16's phú/reading/meaning say tương sinh,
  commentary instead động xung; both remain with their own citations. Item
  17 stops mid-sentence after biến sinh hợp Dụng before 18, whose commentary
  uses hoá Thoái/khứ against phú hoá xuất; do not join or complete them. In 21,
  phú uses Ứng but commentary uses Dụng. Item 23 is explicitly a fugitive's
  self-enquiry, unlike enquiries about another person; 25 supports both enquiry
  directions, and 22 concerns news. Item 29's meaning drops độc phát while
  commentary specifies Huynh độc phát. No tracking, detention, fugitive safety,
  evasion of law or modern legal authority is supplied.

General phú/compilation/translation credits are conventional attribution, not a
certain author roster for each passage. Distinct meanings and translator notes
remain separate even when their summaries agree. All prior records, obligations
and exclusions remain. This is feat-056 source comparison, not feat-090 source
audit, separate verification, certification or predictive efficacy. No source
text/images are redistributed and no UI, calculation or interpretation behaviour
is added. The audit/certification gates retain their existing unfulfilled status.

## feat-057 source comparison

The worker read complete PyMuPDF extraction artifacts `/tmp/feat057/365.txt` through
`/tmp/feat057/428.txt`, boundary364/429 and credits1–3, and individually opened every
corresponding full-page PNG (1.5x render,918x1188). No contact sheet substitutes for
an assigned page. This covers all64 assigned page images including dense charts and
footnote overlaps, not an independent audit. The supplied467-page fingerprint remains
`713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`.
The [passage register](../reviews/knowledge/source-inventory.md#feat-057-questions-and-ha-tri-passage-register)
owns unit IDs, individual locators, reused claims and fine dispositions.

Questions1–18 occupy365–412. Their131 separate example contexts include repeated
casts and repeated stories, with129 separately inspected charts; Q9's two religious
stories on387 have no printed chart. Each question/query, answer rule, example context,
attributed experiment, chart observation, printed note and separate concluding passage
has its own disposition. Charts release only specifically selected image-read annotation
summaries, not full board reconstructions or calculation fixtures. There are35 numbered
question notes:1–18 before Q12, then1–17 with repeated labels after the reset. The
unnumbered Ghi chú403 is a separate translator dissent, never full Q14 coverage.

- Q1 distinguishes competing sinh/khắc from sufficient support: note11 in Q7 later
  requires strength for xung Không. The Q1 Đại Quá chart prints Dậu as a relative label;
  it is not silently replaced. Q2's Trung Phu chart shows a Tị transformation without
  a movement marker while prose calls ngũ; selected annotation/prose remain separate.
- Q3 note7 expressly says the casting year is unrecorded, so Thái Tuế cannot be supplied.
  Q4 retains the one-impaired-member cục cases (quiet, Không, Phá, hợp, Mộ, Tuyệt),
  incomplete printed transformation labels and stray line strokes without extra hào.
  Its hụi story's Tài at Ứng is another person's wife, not indiscriminately the self's wife.
- Q5/Q6 selected conditional claims remain unchanged and are reused. New contexts and
  attributed outcomes extend, not replace, those selections. Q6's answer actually prints
  nội Phản ngâm in its Phục ngâm discussion. Q7's Đồng Nhân prose says Hợi Quan at Thế,
  while its chart puts Thế at Sửu Tử; no calculator repairs this difference.
- Q7's corpse-search story fails the first Canh Thân prediction and later reports Nhâm
  Thân. Its last rain story fails the proposed Ất Mão date before the later Tân Dậu account.
  Q13's chronic-illness story predicts not today, yet reports death today; note10 gives
  another rationale. Success language does not conceal these failures or certify efficacy.
- Q10's complete three Tiến/three Thoái conditions reuse the existing four claims.
  Q12's existing rescue-limit claim remains the owner of that conditional explanation;
  the newly located dialogue/outcome is separate. Its Tổn chart repeats Ứng at both ends;
  note4 states that the childbirth questioner is unknown and suggests only the baby died.
- Q13 note9 retains its existing Tuất-versus-Thìn Dụng disagreement. Note11 separately
  rejects the compiler's Phụ-khắc-Tử account in favour of hidden Tử restrained by Phi.
  Q14's full answer/examples are not represented by the older403 objection alone.
  Its Ghi chú gives another Hình roster and rejects the first example's reasoning; neither
  roster becomes a harmonized Hình table. Self-Hình definition and the three differently
  named branches of its second example are preserved, not silently made consistent.
- Q16 prints mười sau. Its Li chart contains a Quan transformation although the passage
  calls it tận tĩnh; another paragraph prints nên nên chôn beside an explicit warning
  against burial. Q17's Sư→Hoán story has an unmarked six-line chart, not a reconstructed
  moving board; Q18's Lữ→Cấn story likewise lacks drawn transformation annotations.
  Q17 repeats Q7's Tiểu Súc context but adds giờ Tị and another Không annotation.
  Q18 distinguishes stated question, actual purpose and who initiated proxy enquiry;
  its claim that the questioner causes failed readings is author rhetoric, not established blame.

PDF412's separately headed, unsigned **Một Cách Xem Lục Hào** follows Q18 after a
separator. It has its own supplement article with18 separate framing, special-passage,
0–6 moving-line rules and examples. References to Trương Lý, Chu tử and Thiệu Vĩ Hoa
are attributed to that insertion, not signatures establishing its writer/translator.
The Ký Tế→Quải example and the Lâm example choosing sơ despite calling for quiet lines
remain as printed; the six-moving rule does not identify which quẻ's Soán to use.
No missing subject, calculation correction or interpretation behavior is supplied.
PDF413 contains only folio366. Hà Tri starts414 at printed375, not367; it ends428 at389.
PDF429 starts the next casting supplement at printed388 and is excluded from feat-057.

Hà Tri has all60 numbered verse/reading pairs and independently printed Vietnamese
meanings, but no separately printed commentary/explanation. Item4's meaning begins415;
21/25/29/42/46 cross page boundaries. Four notes attach12,17,23,54 respectively, and
428 has a separately disposed closing verse/reading and meaning. General front phú
credits do not establish individual Hà Tri authorship. The meaning adds giao trùng in6,
omits explicit động in9, changes đắc vị to vượng in16, says Mộ Khố in17 where note2
rejects nhập Mộ, and changes Hợi/Tí to Tị/Hợi in30. Item39's Quỷ vị xuyết differs from
its meaning's bị Quỷ phá;40's meaning calling Tước Mộc is not a new fixed spirit element.
49's đầu thuỷ question differs from its meaning's chết nước. These differences remain
separately cited, not silently translated into agreement. The closing's claimed efficacy
and kiếm cơm rhetoric are source assertions, not proof or advice.

No supplied prose/images, reconstructed missing labels, certified outcomes, medical,
legal, tactical, safety, financial, ritual, self-harm or human-ownership authority is
released. All prior authored records/citations and exclusions remain semantically unchanged.
Global layer rosters/discovery, feat-091 source audit, separate verification and corpus
certification remain unfulfilled; this authoring comparison does not close their gates.

## Feat-058 source comparison

The worker compared complete PyMuPDF extraction artifacts `/tmp/feat058/429.txt`
through `/tmp/feat058/467.txt` with individually opened full-page PNGs for every one
of those39 pages (1.5x render,918x1188), plus boundary428 and credits1–3. Dense and
shared-boundary pages were opened at the same full-page resolution, not as contact
sheets. `inspection-artifacts.json` in that local directory records file hashes and
render/extraction metadata. The467-page supplied BPCT fingerprint remains
`713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`.
The [passage register](../reviews/knowledge/source-inventory.md#feat-058-casting-supplements-and-criticisms-passage-register)
owns stable unit IDs, source-layer locators and mappings, not accepted audit decisions.

Printed labels restart:429–457 show388–416, while458–466 show366–374. The shared
boundaries430/432/435/451 are real;467 is entirely blank, with no observed printed
folio or further closing text. CriticismIII continues460, IV/VI are wholly460, X
continues463, XI is wholly463, XII continues464, XIII continues465, XIV continues466,
and XV is wholly466. Earlier navigation starts were not complete passage bounds.

The II heading claims64 hexagrams/384 lines, but the supplied pages visibly enumerate
only eight named entries (1–8), each with six transformations (48 rows), before IV
begins. No III heading appears. Stable obligations II-09..64 remain: no corresponding
entry observed in supplied pages; source-audit/edition reconciliation unresolved.
They are not source-reported omissions. No missing names, rows or diagrams are
fabricated. IV has eight diagrams and56 printed transformation rows; their selected
line/branch annotations and transformations are image-read summaries, not reconstructed
calculation fixtures. SectionI's two mixed outcomes both print Thiếu Dương; the new
article retains the conflicting label rather than silently correcting it against
chapter1. II's Tồn, IV's Sơ nhị/Sơ lục, and VI's repeated Kỷ stay visible.

V has eighteen cases, with seven nested relational verses each in cases7/8 and
multiple stanzas in4/6/16/17/18. Original/reading and Vietnamese meaning are separate;
no independent prose commentary is printed. V8 relation6 has Hán and Vietnamese
meaning but no separate Hán-Việt reading. V10 changes Tài minh to Tài giao; V11 changes
Tài minh/Tử vượng to Tài hưng/Tử động; V18's last meaning says đi in a về context.
These differences are not harmonized. Notes1–15 span casting/framing, Tạp Sự and Tinh
Sát; suggested metrical corrections and note13's uncertain cát sát identification
remain translator opinions, not recovered original editions. VI10 has four Hán lines
but six reading/meaning lines; no extra Hán is supplied. VI8 repeats Kỷ without Ất.
VI7's Đào Hoa/Tử Vi note gives only two explicit examples, not a new complete calendar.

The fifteen criticisms distinguish target, proposition, illustrative example,
reply/partial reconciliation and translator notes. Opposing works are not directly
consulted: their positions are only what BPCT attributes to them. Credits conventionally
associate the criticism chapter with Vương Hồng Tự and translation/notes with Vĩnh Cao;
individual casting-supplement authorship is not established by the general phú credit.
The old X-note9 citation and `term-matching-day-definition` are reused unchanged,
without a duplicate claim/citation; neither stands for all ofX. V's rejection of
Thiên Y coexists with VI-03's efficacy claim, VII's critique with VIII's conditional
star use, and I's repeat-casting criticism with XII's praise for Dã Hạc's question-specific
chung thân. XII retains its Sửu-child prediction discrepancy and later rationalization.
XIV's two marriage stories and XV's partial concession are separately attributed,
not validated outcomes. CriticismII-note4's Quái differs from the main text's Cấu.

Medical, mortality, fertility/sex, marriage, theft, class/gender, human-ownership,
legal, travel, gambling and wealth assertions are historical source positions, not
advice, accusations, demonstrated efficacy or authority over people. No source
prose/images, inferred missing content, calendar/interpretation behavior or UI changes
are released. Prior authored records/citations, exclusions and global layer rosters
remain semantically unchanged apart from validated058 cohort assignments. This is
source comparison, not feat-091 audit, independent verification, certification,
rights clearance or predictive efficacy. Those gates remain open work and report closed.

## Feat-059 source comparison

The worker compared NHL foreword10–11, all seven chapters12–126, PartII
framing127–130 and retrospective389–392 against every corresponding page image,
with context1–9 and boundaries131/388/393. All137 individual page renderings were
opened as unscaled full-resolution horizontal pairs (1.5x,918x1188 per page),
except393 individually; no contact-sheet sample stands for assigned page review.
Complete extracted passages were also compared; the local `/tmp/feat059/`
`inspection-artifacts.json` binds rendered/extracted artifacts to the supplied
393-page SHA. This is not whole-book visual review, independent verification or
feat-092 audit. The [passage register](../reviews/knowledge/source-inventory.md#feat-059-nhl-introduction-and-framing-passage-register)
owns all child IDs, locators, non-content accounting, selected reuse and source
label/diagram discrepancies discovered in this direct record.

The eleven new articles release original Vietnamese summaries, not copied text
or images. Quoted classical works, reported scholars, traditional authorship and
NHL's evaluations remain separate attributed claims. NHL's Thập Dực arguments
and historical/social examples are positions/reports, not independently verified
history. His PartII method describes selective translation and commentary; it
cannot establish later full-layer coverage. The five reused selections retain
prior chapter4 terminology/casting and chapter5 p94 evidence unchanged; neither
selection nor old navigation anchors establish complete chapters by themselves.

All corpus records/citations outside059 remain semantically unchanged. This
cohort has213 dispositions,208 new claims/citations and five reused selections.
Global layer rosters,17 exclusions and audit/certification status are retained;
only the source-supported388 boundary projection is reconciled outside the new
child mappings. Edition year/rights remain unconfirmed. Orphan note markers,
traditional author identities, source label conflicts and global layer discovery
remain for later audit/edition reconciliation. No predictive efficacy, modern
medical/legal/safety/financial/political advice, calendar, UI or core behavior is
released, and no audit or certification gate is closed as completed work.

## Feat-060 NTT and PBC introductory source comparison

The worker compared complete extraction with every individually opened assigned
page image: NTT1–79/938 (80 pages) and PBC1–26/649–655 (33 pages). Each rendering
was opened at full-page resolution,1.5x (NTT893×1263,PBC918×1188); no contact sheet
or pre-existing anchor substitutes for this inspection. Boundary NTT80/937 and
PBC27 were additionally opened. PBC24 was also opened rotated90 degrees clockwise
for its sideways chart. Local `/tmp/feat060/inspection-artifacts.json` records
per-page extraction/image hashes and dimensions against the supplied938-/655-page
fingerprints. The [passage register](../reviews/knowledge/source-inventory.md#feat-060-ntt-and-pbc-introductory-passage-register)
owns the source-unit identities, locators, finer dispositions and released mappings.
This is source comparison, not whole-book visual review, separate audit or certification.

PBC11–12 are two image-only4×8 plates, with header groups Càn1 through Khôn8,
not blank pages. Their64 named cells remain in column order. The other inspected
figures occur at19,21,24 and25. The circle/square64 figure is described on22–23
but no separate corresponding plate is present in1–26; it is not reconstructed.
PBC19's Vietnamese image reads _nhất thất_ where its Hà Đồ image and extraction
support _nhị thất_. The source's Phàm LệI wings count and its final Cương Lĩnh
value associations remain attributed positions, not harmonized author history,
science, moral classifications of people or interpretation behavior.

PBC649 labels chapter1 **Khuyết**, while chapter2 **Độc tiết** survives with Hán,
reading, Vietnamese explanation and a separate philosophical Phụ Chú.650 explicitly
leaves chapters3–11 out because the author finds the trigram imagery difficult.
651 says the Tự Quái sequence explanations were translated at quẻ heads, leaving
this separate translation omitted;652 leaves Tạp Quái untranslated and also prints
an incongruous Hệ Từ Hạ ending label. Only these surviving notices are represented;
no omitted wing is recreated. Chương Thâu's report of four missing manuscript
chapters is a distinct edition-history statement, not a replacement for these notices.

All21 PBC655 notes have dispositions. Existing note13/Bĩ discrepancy and
note21/Trung Phu line6 claim/citation retain their owners without duplicate selections.
Only the explicitly signed notes receive1953snake attribution; unsigned notes are
not assigned automatically to Phan Bội Châu or the electronic editor. Notes1–3
refer to the introductory Cấu passages on22–23. Remaining body-note attachment
reconciliation outside the assigned pages is not claimed. Reported historical
stories, including Vị Sinh, are not verified history, efficacy or advice.

NTT's nine named introductory figures have V2 ordered labels and claim support;
inline generation, note10's two quái and the casting-symbol legend are separate
figures.32's top Hán labels are intrinsically blurred: the legible structural bands
are recorded, but no complete per-name glyph transcription is claimed or fabricated.
35's ring labels place Kiền left/Khôn right and Ly below/Khảm above, unlike the
prose's compass orientation; the64 ring labels and unlabelled8×8 interior are
kept distinct.40 calls both Ly and Khảm children _nhỏ_; these labels are not
silently changed to middle children.43–45 retain the actual panels and repeated
names, not calculator-derived transformations. Hồ Song Hồ's note55 at62–63
explicitly distinguishes the charts from most Bản Nghĩa transformations.

NTT's notes remain separate: six translator-introduction notes, six preface notes,
57 diagram/procedure notes and12 Cương Lĩnh notes. The numbered resets are not
one global note sequence. Named classical voices retain their authors through
Ngô Tất Tố's translation; unsigned editorial6 is not identified solely from the
colophon's Phan Cự Đệ introduction credit. The Trình Di Cương Lĩnh block crosses
64 into the first two paragraphs of65 before the explicit Chu Hy block. Note15
of the diagram section has an imperfect marker at24; notes50/51 repeat the same
Chấn example despite different attached sentences. Note8 at78 preserves itsX/XX
blurred-glyph notice. Other visible differences (55/25,Âm1/Dương2 versus
Dương1/Âm2,Cấn in the âm-origin passages,Chấn Thủy/Đoài Dần and the printed
26 remaining stalks for Lão Dương) are not repaired into rules or fixtures.

Individually inspected79 includes substantive Giải Nghĩa below the Thượng Kinh
heading. With coordinator approval, its existing parent ID becomes content and
separate heading/prose children retain the original range and060→092 route;
80's Càn body remains outside scope.937 contains only the website footer and938
is a colophon.938 prints permit1678/CXB dated05/12/2003 and completion/deposit
inQ1 2004, not an independently inferred publication year. The supplied volume's
lack of a separate full Hệ Từ appendix is a source-evidence finding only, not a
new domain claim; quoted fragments do not create that appendix. The earlier
end-criticism references remain unlocated/unresolved.

Original summaries and structured observations are released, not copied prose,
source images, a diagram DSL, new calendar/interpretation logic or UI behavior.
Prior authored records/citations remain semantically unchanged. Global layer
rosters,17 exclusions and source-audit/certification gates stay unresolved/closed.
