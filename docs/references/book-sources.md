# Supplied book sources

This document owns the supplied PDF inventory, source locations, and known source discrepancies.
The books support domain review. Their presence does not establish permission to redistribute them.
See [Licensing](../../LICENSING.md) for usage rights.

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

NHL printed footer labels were checked on every page used by its released citations.
The labels match the PDF numbers for those locations; the citation collections now include both.
That correspondence does not establish page labels for other editions or uncited NHL pages.

The three Chu Dịch commentaries support classical meanings.
Their explanations do not automatically establish Na Jia, palace, or interpretation rules.
`NHL`, PDF 74, explicitly distinguishes classical line text from later Five Element divination.

## Known discrepancies

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
  Only the selected Sinh, Mộ, and Tuyệt associations are imported; a complete twelve-stage branch table needs separate review.
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
  This batch uses only the Dụng/Kỵ support distinction, not that paragraph's entire củng/hợp inventory.
- Questions 12–13 contain illness outcomes and timing claims, including conflicting timing in the PDF 400 example.
  This batch selects support conditions and role distinctions, not medical predictions or evidence that the reported outcomes occurred.
- Vĩnh Cao's footnote 9 at PDF 399 disputes the main text's Dụng thần selection for a letter.
  The [combination/opposition article](../../packages/knowledge/data/liuyao/combination-opposition-turnarounds.json) retains the disagreement instead of importing a unanimous worked example.

The selected summaries retain historical context for gender roles, birth omens, and official punishment.
They do not claim exhaustive coverage of the medical, self-harm, ritual, or punishment verses in section 7.

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
