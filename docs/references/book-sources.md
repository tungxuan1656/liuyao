# Supplied book sources

This document owns the supplied PDF inventory, source locations, and known source discrepancies.
The books support domain review. Their presence does not establish permission to redistribute them.
See [Licensing](../../LICENSING.md) for usage rights.

## Source inventory

The keys below identify these exact files for documentation review.
They do not replace the runtime source IDs in `packages/knowledge/data/sources.ts`.
Page numbers count PDF pages from one, including covers.

| Key    | Supplied source                                                                                    | PDF pages | Edition evidence                                                                                                          | Use                                                                        |
| ------ | -------------------------------------------------------------------------------------------------- | --------: | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `BPCT` | [Tăng bổ Bốc Phệ Chính Tông](<../books/Tăng bổ bốc phệ chính tông.pdf>)                            |       467 | Vương Hồng Tự compilation. Vĩnh Cao translates and annotates the Vietnamese text, identified on PDF pages 1–3.            | Liu Yao board rules and attributed advanced doctrine.                      |
| `PBC`  | [Quốc văn Chu Dịch diễn giải](<../books/Quốc văn chu dịch diễn giải Phan Bội Châu.pdf>)            |       655 | Phan Bội Châu. Chương Thâu discusses manuscript and edition history on PDF pages 9–10.                                    | Hexagram names, classical text, and attributed commentary.                 |
| `NTT`  | [Kinh Dịch trọn bộ](<../books/Kinh dịch Ngô Tất Tố.pdf>)                                           |       938 | Ngô Tất Tố translates and annotates. The title page names Nhà xuất bản Văn Học. An exact publication year is unconfirmed. | Classical terminology and commentary associated with Trình Di and Chu Hy.  |
| `NHL`  | [Kinh Dịch — Đạo của người quân tử](<../books/Kinh dịch đạo của người quân tử Nguyễn Hiến Lê.pdf>) |       393 | Nguyễn Hiến Lê. PDF page 2 reports correction against a ninth Văn Học reprint and Alfred Huang, dated 2014-11-01.         | Introductory terminology, hexagram structure, and attributed explanations. |

All four PDFs contain extractable text.
Some diagrams and blank pages contain little text.
The electronic editions contain transcription errors and editorial additions.
An electronic file date does not establish a book publication date.

### File fingerprints

| Key    | SHA-256                                                            |
| ------ | ------------------------------------------------------------------ |
| `BPCT` | `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a` |
| `PBC`  | `cbe589d41b3285a8287800a0ed3789c5c0324fba6c80f35e9c27a25377a4d2d6` |
| `NTT`  | `2ac72f723af153ecfd7e15389d1037119d30c8405830471c75f9ed3f0f94f4fd` |
| `NHL`  | `9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e` |

When a file changes, recheck its fingerprint, page locations, and affected claims.
Keep the supplied filenames unchanged during documentation work.

## Reviewed locations

This inventory records focused V1 review. It does not claim a complete review of the 2,453 PDF pages.

| Topic                                 | Location                                                                              | Evidence boundary                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Five Element cycles and Six Relatives | `BPCT`, chapter 1, IV–V, PDF 9 (printed 3)                                            | General rules reviewed. The worked Wood example contains a contradictory element.                      |
| Earthly Branch elements               | `BPCT`, chapter 1, III, PDF 8 (printed 2)                                             | Branch associations used by the V1 board.                                                              |
| Trigram symbols and elements          | `BPCT`, chapter 1, VIII–IX, PDF 10–11 (printed 4–5)                                   | Symbols require visual inspection.                                                                     |
| Three-coin casting and moving lines   | `BPCT`, chapter 1, X, PDF 11–12 (printed 5–6)                                         | Describes physical coin faces and line classes.                                                        |
| Palace membership                     | `BPCT`, chapter 1, XI, PDF 12–13 (printed 6–7). Chapter 4, PDF 49–66 (printed 38–55). | The chapter 4 headings resolve the incomplete Khảm list. Full board annotations need separate review.  |
| Na Jia                                | `BPCT`, chapter 1, XII, PDF 13 (printed 7)                                            | All eight inner/outer sequences reviewed.                                                              |
| Shi/Ying                              | `BPCT`, chapter 1, XIII, PDF 14–15 (printed 8–9)                                      | Palace sequence and marker separation reviewed.                                                        |
| Basic terminology                     | `NHL`, chapter 4, PDF 59–74                                                           | Structure and moving-line discussion reviewed. PDF 73 gives Tụng changing to Lý.                       |
| Classical text and editorial context  | `NTT`, PDF 2–8. `PBC`, PDF 2, 9–10, 15–16.                                            | Title pages, contents, introductions, and terminology reviewed. Detailed commentary remains unaudited. |

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
