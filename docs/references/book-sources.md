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

| Key    | Location                                        | Finding                                                                                                                                                                                                          |
| ------ | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PBC`  | Contents PDF 4; Cấn / canonical quẻ 52, PDF 493 | The contents lists Thuần Chấn and Thuần Cấn as quẻ 51, then Tiệm as 53. The body also labels Cấn as 51. Keep the source label and map the body section to canonical `hexagram-52`; quẻ 52 is present.            |
| `NHL`  | Contents PDF 4–9; Ký Tế/Vị Tế, PDF 328/331      | The contents points to quẻ 63 at printed page 326 and quẻ 64 at 329. The observed body headings start at PDF 328 and 331. Use body headings for section locators; do not treat contents pages as section starts. |
| `BPCT` | Chương 4, Chấn palace, PDF 57                   | A fresh image check confirms board 6 is Thủy Phong Tỉnh. Earlier extraction missed its heading.                                                                                                                  |
| `BPCT` | Chương 6, PDF 80 and 95                         | A fresh image check confirms printed label 11 on PDF 80 and printed label 60 on PDF 95. Punctuation and adjacent glyphs obscured the earlier heading scan.                                                       |

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
[Cấu](../../packages/knowledge/data/hexagrams/hexagram-44.json) records add attributed summaries for the inspected overviews, supplied main-commentary layers, named NTT supplements, and NTT notes. These records are source-compared selections, not a completion of feat-078's per-cell audit, a full inventory of each edition, independent specialist approval, rights clearance, or certification.

Quải's third-line summaries preserve NHL's stated uncertainty and NTT's separate Trình Di proposals and Chu Hy's reading of the printed text; no wording is selected or normalized. Cấu retains NHL's printed “Cấn” in its Tự Quái sentence without emendation. NTT's attributed 垢/遘 discussion is retained as reported; 姤 is not added or normalized.

The selected NTT comparisons were checked against the supplied PDF images: Phong Lôi Ích PDF 654 and 657, 662–667; Quải PDF 678–683; and Cấu PDF 694. The PDF fingerprint was rechecked against `sources.json` before inspection. At PDF 666, Ngô Tất Tố's note 1 says that Trình Di changes the printed graph 大 (mộc) to 益 (ích) and translates the phrase as “đạo ích”; the printed graph conflicts with the stated gloss. This note ends on PDF 666. The released note summarizes this report without reproducing Han text or deciding which reading is correct. Separately, note 3 compares the readings of “mười bằng” and the punctuation/continuation of Trình Di's reading across PDF 666–667. Quải's notes 9 and 10 separately say that two occurrences are read as “hiệu” and one as “hào”, without locating those occurrences; note 3 gives a different one-quẻ/one-hào location mapping, so the notes' counts and locations remain unresolved rather than reconciled here. The selected Tiên Nho passage on PDF 669–670 records Chu Hy's caution that vigilance is not confined to the moment when yin declines and yang flourishes; even after petty people have declined, gentlemen must not forget caution.

All 52 citations for Tổn, Ích, Quải, and Cấu attributed to Nguyễn Hiến Lê were checked against the footer images on NHL PDF 261–273. The printed-page labels visible on those images match the PDF page numbers, 261–273; the citations retain the PDF locations and include matching printed-page fields.

BPCT chapter 6 sentences 12–16 have separate numbered verse and Vương Hồng Tự commentary citations in [batch eleven](../../packages/knowledge/data/citations/batch-eleven.json). No translator notes are attached to these five labels; the footnote at sentence 11 remains with its existing citation. Sentence 13's historical relationship examples and sentence 16's horse image remain bounded, source-attributed summaries. Chapter-wide coverage remains open.

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
