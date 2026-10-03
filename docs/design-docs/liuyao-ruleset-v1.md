# Liu Yao ruleset V1

This document owns the calculation tables and domain derivations for `liuyao-standard-v1`.
It describes observed board behavior and records supporting passages from the supplied books.
The [source catalog](../references/book-sources.md) owns edition details, page conventions, and discrepancies.

## Reading route

Six line classes → trigrams → primary and changed hexagrams → palace → Shi/Ying → Na Jia → branch elements → Six Relatives.

- Input types and line codes → [Domain model](domain-model.md)
- Validation and execution order → [Calculation pipeline](calculation-pipeline.md)
- Display names and spelling → [Vietnamese product language](../product-specs/vietnamese-language.md)
- Evidence acceptance → [Knowledge quality](../product-specs/knowledge-quality.md)

The numeric line codes are project data representations.
Book descriptions support their Yin/Yang and static/changing meanings.
`BPCT`, chapter 1, X, PDF 11–12, describes casting from the bottom and reversing the polarity of moving lines.

## Trigrams and hexagrams

Each pattern lists the three lines from bottom to top.
`1` means Yang. `0` means Yin.

| Trigram ID         | Pattern |
| ------------------ | ------- |
| `trigram-heaven`   | `111`   |
| `trigram-lake`     | `110`   |
| `trigram-fire`     | `101`   |
| `trigram-thunder`  | `100`   |
| `trigram-wind`     | `011`   |
| `trigram-water`    | `010`   |
| `trigram-mountain` | `001`   |
| `trigram-earth`    | `000`   |

Lines 1–3 form the lower trigram. Lines 4–6 form the upper trigram.
The ordered pair identifies one of 64 hexagrams.
The hexagram ID suffix uses King Wen order, independently of palace order.
`BPCT`, chapter 1, VIII–X, PDF 10–12, supplies the trigram symbols and composition convention.
The supplied Chu Dịch commentaries organize their hexagram chapters in King Wen order.

Changing lines determine the changed hexagram through the same trigram lookup.
A changed hexagram ID does not imply a complete changed board or an interpretation.
The V1 board classifies the primary hexagram only.

## Eight Palaces

Each number below is the suffix of `hexagram-NN`.
Columns follow palace order: pure, first through fifth generation, Du hồn, then Quy hồn.

| Palace ID         | Element | Pure | 1   | 2   | 3   | 4   | 5   | Du hồn | Quy hồn | BPCT chapter 4 PDF |
| ----------------- | ------- | ---- | --- | --- | --- | --- | --- | ------ | ------- | ------------------ |
| `palace-heaven`   | `metal` | 01   | 44  | 33  | 12  | 20  | 23  | 35     | 14      | 49–51              |
| `palace-lake`     | `metal` | 58   | 47  | 45  | 31  | 39  | 15  | 62     | 54      | 64–66              |
| `palace-fire`     | `fire`  | 30   | 56  | 50  | 64  | 04  | 59  | 06     | 13      | 60–62              |
| `palace-thunder`  | `wood`  | 51   | 16  | 40  | 32  | 46  | 48  | 28     | 17      | 56–58              |
| `palace-wind`     | `wood`  | 57   | 09  | 37  | 42  | 25  | 21  | 27     | 18      | 58–60              |
| `palace-water`    | `water` | 29   | 60  | 03  | 63  | 49  | 55  | 36     | 07      | 51–53              |
| `palace-mountain` | `earth` | 52   | 22  | 26  | 41  | 38  | 10  | 61     | 53      | 53–55              |
| `palace-earth`    | `earth` | 02   | 24  | 19  | 11  | 34  | 43  | 05     | 08      | 62–64              |

The chapter 4 headings support all eight sequences.
The introductory Khảm list omits Cách. See discrepancy `BPCT-01` in the source catalog.
Every hexagram belongs to exactly one palace in this ruleset.
The palace element belongs to the palace, independently of the upper or lower trigram's element.

### Shi and Ying

`BPCT`, chapter 1, XIII, PDF 14, assigns Shi by palace position.

| Palace position | Pure | 1   | 2   | 3   | 4   | 5   | Du hồn | Quy hồn |
| --------------- | ---- | --- | --- | --- | --- | --- | ------ | ------- |
| Shi line        | 6    | 1   | 2   | 3   | 4   | 5   | 4      | 3       |
| Ying line       | 3    | 4   | 5   | 6   | 1   | 2   | 1      | 6       |

Ying is three line positions from Shi, with wraparound: `((shi + 2) % 6) + 1`.
Shi and Ying are distinct primary-line markers.
Changing a line does not move either marker on the primary board.

## Na Jia

`BPCT`, chapter 1, XII, PDF 13, supplies the following assignments.
Every cell lists a heavenly stem and earthly branch.
Inner columns apply to the lower trigram. Outer columns apply to the upper trigram.
Both triples run from their bottom line upward.

| Trigram ID         | Inner 1   | Inner 2  | Inner 3   | Outer 4   | Outer 5   | Outer 6   |
| ------------------ | --------- | -------- | --------- | --------- | --------- | --------- |
| `trigram-heaven`   | Giáp Tý   | Giáp Dần | Giáp Thìn | Nhâm Ngọ  | Nhâm Thân | Nhâm Tuất |
| `trigram-lake`     | Đinh Tỵ   | Đinh Mão | Đinh Sửu  | Đinh Hợi  | Đinh Dậu  | Đinh Mùi  |
| `trigram-fire`     | Kỷ Mão    | Kỷ Sửu   | Kỷ Hợi    | Kỷ Dậu    | Kỷ Mùi    | Kỷ Tỵ     |
| `trigram-thunder`  | Canh Tý   | Canh Dần | Canh Thìn | Canh Ngọ  | Canh Thân | Canh Tuất |
| `trigram-wind`     | Tân Sửu   | Tân Hợi  | Tân Dậu   | Tân Mùi   | Tân Tỵ    | Tân Mão   |
| `trigram-water`    | Mậu Dần   | Mậu Thìn | Mậu Ngọ   | Mậu Thân  | Mậu Tuất  | Mậu Tý    |
| `trigram-mountain` | Bính Thìn | Bính Ngọ | Bính Thân | Bính Tuất | Bính Tý   | Bính Dần  |
| `trigram-earth`    | Ất Mùi    | Ất Tỵ    | Ất Mão    | Quý Sửu   | Quý Hợi   | Quý Dậu   |

The Na Jia can/branch assignments do not use the casting date.
Càn and Khôn use different stems for inner and outer positions.
The Khôn element typo in the source does not change its can/branch sequence.

## Five Elements

`BPCT`, chapter 1, III–IV, PDF 8–9, supplies branch elements and element cycles.
An individual line receives its element from its Na Jia branch.
V1 does not substitute a heavenly stem element or a Nạp Âm element.

| Element | Earthly Branch IDs                                    |
| ------- | ----------------------------------------------------- |
| `water` | `zi` (Tý), `hai` (Hợi)                                |
| `earth` | `chou` (Sửu), `chen` (Thìn), `wei` (Mùi), `xu` (Tuất) |
| `wood`  | `yin` (Dần), `mao` (Mão)                              |
| `fire`  | `si` (Tỵ), `wu` (Ngọ)                                 |
| `metal` | `shen` (Thân), `you` (Dậu)                            |

| Relation   | Cycle                                      |
| ---------- | ------------------------------------------ |
| Generation | Wood → Fire → Earth → Metal → Water → Wood |
| Control    | Wood → Earth → Water → Fire → Metal → Wood |

Relations are directional. Reversing the two elements changes the relation.

## Six Relatives

Use the primary palace element as the reference element, called “Ta” in the book.
Compare each line's branch element with that reference.
`BPCT`, chapter 1, V, PDF 9, states the five relations.
Chapter 4, PDF 49, demonstrates them on the Càn board.

| Relation of line to palace | Result ID        | Meaning  |
| -------------------------- | ---------------- | -------- |
| Same element               | `sibling`        | Huynh đệ |
| Palace generates line      | `child`          | Tử tôn   |
| Palace controls line       | `wealth`         | Thê tài  |
| Line controls palace       | `official-ghost` | Quan quỷ |
| Line generates palace      | `parent`         | Phụ mẫu  |

The traditional name Lục thân covers five output categories in V1.
The book counts the reference self as the sixth relation.
This classification does not select Dụng thần or determine whether an outcome is favorable.
The source's Wood example contains an element typo. See discrepancy `BPCT-03`.

## Worked checks

These examples check board construction. They do not predict an event.

| Bottom-to-top input  | Expected result                                                                   | Book evidence                                                          |
| -------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `[7, 7, 7, 7, 7, 7]` | Càn (`01`), metal palace, Shi 6, Ying 3. Branches Tý, Dần, Thìn, Ngọ, Thân, Tuất. | `BPCT`, chapter 4, PDF 49.                                             |
| `[9, 7, 7, 7, 7, 7]` | Primary Càn (`01`), changed Cấu (`44`). Primary board retains Shi 6 and Ying 3.   | `BPCT`, supplementary casting section, PDF 430, Càn first-line change. |
| `[6, 7, 8, 7, 7, 7]` | Primary Tụng (`06`), changed Lý (`10`).                                           | `NHL`, chapter 4, PDF 73, Tụng first-line change.                      |

For the static Càn example, bottom-to-top relatives are child, wealth, parent, official-ghost, sibling, parent.
The numeric input arrays encode the books' diagrams through the project's line contract.

## Casting evidence boundary

[Reading flow](../product-specs/reading-flow.md) owns the current three-/four-coin mappings and probabilities.
Those mappings are product conventions.
The web coin faces use sun/moon symbols.
No reviewed passage establishes their correspondence to the physical faces named sấp/ngửa in `BPCT`.

`BPCT`, chapter 1, X, PDF 11–12, assigns all sấp to moving Yang and all ngửa to moving Yin.
Do not claim book equivalence until the physical-face mapping receives an explicit review.
No reviewed supplied-book passage supports the current weighted four-coin method.

## Explanation source mapping

These locations support review of the existing runtime rule IDs.
The mapping does not add runtime citations automatically.

| Existing rule ID                   | Supporting location                                                    | Claim boundary                                                       |
| ---------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `rule-reading-result-fields`       | [Domain model](domain-model.md)                                        | Project output contract.                                             |
| `rule-line-position-order`         | `BPCT`, chapter 1, X, PDF 11. `NHL`, chapter 4, PDF 59.                | Bottom-to-top order.                                                 |
| `rule-line-polarity-values`        | [Domain model](domain-model.md), with `BPCT`, chapter 1, X, PDF 11–12. | Project numeric codes encode book line classes.                      |
| `rule-moving-line-change`          | `BPCT`, chapter 1, X, PDF 12. `NHL`, chapter 4, PDF 73.                | Changing Yin/Yang polarity.                                          |
| `rule-trigram-composition`         | `BPCT`, chapter 1, VIII–X, PDF 10–12.                                  | Lower and upper triples.                                             |
| `rule-palace-and-markers`          | `BPCT`, chapter 1, XIII, PDF 14. Chapter 4, PDF 49–66.                 | Palace order and Shi/Ying.                                           |
| `rule-na-jia-assignment`           | `BPCT`, chapter 1, XII, PDF 13.                                        | Inner/outer stem and branch sequences.                               |
| `rule-branch-element`              | `BPCT`, chapter 1, III, PDF 8.                                         | Earthly Branch elements.                                             |
| `rule-five-element-cycles`         | `BPCT`, chapter 1, IV, PDF 9.                                          | Directed generation and control.                                     |
| `rule-six-relative-classification` | `BPCT`, chapter 1, V, PDF 9. Chapter 4, PDF 49.                        | Palace-relative classification, with discrepancy `BPCT-03` resolved. |

## Code and verification routes

| Responsibility             | Current implementation                                    | Existing package evidence                                 |
| -------------------------- | --------------------------------------------------------- | --------------------------------------------------------- |
| Trigram patterns           | `packages/liuyao-core/src/trigrams.ts`                    | `tests/trigrams.test.ts`                                  |
| Hexagram lookup and change | `packages/liuyao-core/src/hexagrams.ts`, `calculation.ts` | `tests/hexagram-fixtures.ts`, `tests/calculation.test.ts` |
| Palaces and Shi/Ying       | `packages/liuyao-core/src/palaces.ts`                     | `tests/palace-fixtures.ts`, `tests/palaces.test.ts`       |
| Na Jia and branch elements | `packages/liuyao-core/src/na-jia.ts`                      | `tests/na-jia.test.ts`                                    |
| Six Relatives and board    | `packages/liuyao-core/src/board.ts`                       | `tests/pure-board-fixtures.ts`, `tests/board.test.ts`     |

Test paths in this table are relative to `packages/liuyao-core/`.
Current tests establish implementation agreement with their fixtures.
Supplied-book provenance for fixtures follows the intended gate in [Knowledge quality](../product-specs/knowledge-quality.md).
When a calculation table changes, update this specification and review the affected book passages.
