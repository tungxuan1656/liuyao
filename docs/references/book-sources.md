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

The [Tứ sinh](../../packages/knowledge/data/terms/term-four-birthplaces.json) and
[Trường Sinh](../../packages/knowledge/data/terms/term-growth-stage.json) records own two stage-list resolutions.
The complete chapter 1 list and chapter 5 summary support the selected stage names and birthplaces.

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
The [knowledge quality contract](../product-specs/knowledge-quality.md) defines the intended supplied-book evidence gate.

## Related documents

- V1 rules and source mapping → [Liu Yao ruleset](../design-docs/liuyao-ruleset-v1.md)
- Content acceptance → [Knowledge quality](../product-specs/knowledge-quality.md)
- Data ownership and storage → [Knowledge model](../design-docs/knowledge-model.md)
