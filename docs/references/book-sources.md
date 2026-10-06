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
  The following inserted essay lacks clear author attribution and does not support released claims.
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
