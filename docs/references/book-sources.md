# Supplied book sources

This document owns the supplied PDF inventory, source locations, and known source discrepancies.
The books support domain review. Their presence does not establish permission to redistribute them.
See [Licensing](../../LICENSING.md) for usage rights.
[Historical reviews](../reviews/knowledge/README.md) remain recoverable from Git; they are not publication requirements.

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

## Record-specific findings

Canonical records own their attributed interpretations, page references, and local source-error notes.
Read the relevant record instead of a separate source-unit or batch-citation inventory.
[Khôn](../../packages/knowledge/data/hexagrams/hexagram-02.json),
[Truân](../../packages/knowledge/data/hexagrams/hexagram-03.json), and
[Mông](../../packages/knowledge/data/hexagrams/hexagram-04.json) retain their material label differences and known gaps.

[Knowledge quality](../product-specs/knowledge-quality.md) owns passage inspection and correction rules.
[The data guide](../../packages/knowledge/data/README.md) owns authoring commands.
Earlier batch comparisons, exclusions, and detailed edition observations remain in Git.
Use them when a specific passage needs further work; do not restore their audit gates or coverage accounting.
