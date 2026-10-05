# Hexagram 44 — Thiên Phong Cấu knowledge ledger

This page summarizes the bounded q44 AI source-comparison ledger. The canonical per-cell decisions and machine-computed input closures are in the [JSON ledger](ledgers/hexagram-44.json). This is not feat-095 specialist approval, feat-096 certification, rights clearance, or feat-078 completion.

## Scope and outcome

- 21 registered cells across PBC, NTT, and NHL; the 21 decisions assign all 43 current q44 claims and resolve 77 registered layer entries using same-cell citations. The structure claim is deliberately covered by all three overview decisions. These are integrity and assignment counts, not proof of full source coverage.
- All 21 cells are accepted at the AI source-comparison stage on the recorded evidence. Specialist review remains pending for every cell.
- Layer presence/absence is based on inspected pages. Under the recorded F5 mapping, the distinct PBC translation layer is absent; this does not mean Vietnamese explanation is absent. NHL/NTT translation layers are present.
- NTT supplement cell observations do not close the incomplete source-anchor roster. Roster/discovery status and global audit gates remain unresolved/closed. Other audit targets remain open; this q44 ledger does not complete feat-078.

## Cell index

The JSON ledger is canonical for decision evidence, claim IDs, same-cell citation IDs, input hashes, and per-cell residuals.

| Edition              | Cell       | PDF pages | Claims assigned | AI source comparison            | Registered layer observations                                                                                     |
| -------------------- | ---------- | --------: | --------------: | ------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| edition-pbc-supplied | overview   |   424–427 |               5 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: absent                                           |
| edition-ntt-supplied | overview   |   684–697 |               9 | accepted — AI source comparison | original-text: present, commentator: present, translation: present, translator-note: present, supplement: present |
| edition-nhl-supplied | overview   |   271–273 |               2 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: present                                          |
| edition-pbc-supplied | position-1 |   427–428 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: absent                                           |
| edition-ntt-supplied | position-1 |   688–690 |               2 | accepted — AI source comparison | original-text: present, commentator: present, translation: present, translator-note: absent, supplement: absent   |
| edition-nhl-supplied | position-1 |   271–272 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: present                                          |
| edition-pbc-supplied | position-2 |   428–429 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: absent                                           |
| edition-ntt-supplied | position-2 |   690–691 |               2 | accepted — AI source comparison | original-text: present, commentator: present, translation: present, translator-note: absent, supplement: absent   |
| edition-nhl-supplied | position-2 |   272–272 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: present                                          |
| edition-pbc-supplied | position-3 |   429–429 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: absent                                           |
| edition-ntt-supplied | position-3 |   691–692 |               2 | accepted — AI source comparison | original-text: present, commentator: present, translation: present, translator-note: absent, supplement: absent   |
| edition-nhl-supplied | position-3 |   272–272 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: present                                          |
| edition-pbc-supplied | position-4 |   429–430 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: absent                                           |
| edition-ntt-supplied | position-4 |   692–693 |               2 | accepted — AI source comparison | original-text: present, commentator: present, translation: present, translator-note: absent, supplement: absent   |
| edition-nhl-supplied | position-4 |   272–272 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: present                                          |
| edition-pbc-supplied | position-5 |   430–430 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: absent                                           |
| edition-ntt-supplied | position-5 |   693–697 |               4 | accepted — AI source comparison | original-text: present, commentator: present, translation: present, translator-note: present, supplement: absent  |
| edition-nhl-supplied | position-5 |   272–273 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: present                                          |
| edition-pbc-supplied | position-6 |   431–431 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: absent                                           |
| edition-ntt-supplied | position-6 |   695–697 |               5 | accepted — AI source comparison | original-text: present, commentator: present, translation: present, translator-note: present, supplement: present |
| edition-nhl-supplied | position-6 |   273–273 |               1 | accepted — AI source comparison | original-text: present, author-commentary: present, translation: present                                          |

## Evidence, residuals, and limits

The writer recomputed all 21 `computedInputs` closures against the current worktree and compared them with the prepared cell values; all were byte-current. The exact helper-generated inputs are recorded per decision. External evidence roots are identified by artifact key and SHA-256 fingerprint below; no machine-local paths are embedded.

| Evidence artifact         | SHA-256                                                          |
| ------------------------- | ---------------------------------------------------------------- |
| q44Cells                  | 6b3cc345140e46ba4d2711e9113c1abd33b28c67e36345e63f9bbfbbb1d54d92 |
| q44PostreviewCells        | 2dbaa161360b5e64a1fdbeaafb51235e2738079af19eda2a9c4595b2a78e26a6 |
| q44PostreviewReport       | 14e697c051c987ee6d244853f3106e656b77b6a06977e36a42c2bed24758e776 |
| q44PostreviewFixReport    | d896c1af50b000c9be04d8835c16761f4a40f9f0422e34842477017397ec838a |
| secondDeltaFindings       | 950ae146886660413568d08cd91df3bf1ec2972b90933bc89a9b332ab3ba0730 |
| secondDeltaReport         | 8d23289cc3e8e44ee82e583cdeed725507b771dbcad32c18e958d3c7ab8191b1 |
| finalBindingsReport       | 9a82d36c29bfb76f19784cf2c84e8f620524c573a1e1f1a213a7227f6522c508 |
| conditionsFollowupReceipt | 416ea1fab1c9384bfe36ca9540c38819e887dfe28bc430cb9268790e3ce17eb4 |
| translationBindings       | 80f54c887be1d2d46491c3bb3b9465f8639d718826d22542fb74849607e36d32 |
| supplementBindings        | d36b99ae2b12a3a5b8eafd88d4543511dc577f9682db9278e030c3e37e86d224 |
| ledgerInputsManifest      | e44312218449ff18ce7b2586df14c65ae13270a8afd6d83e4e992e2e55c3da25 |

Explicit gaps and remainders remain open; locator ranges do not mean these passages were summarized or fully covered:

- **PBC:** PDF 426 Soán continuation and PHỤ CHÚ have no claim/citation. The Tự Quái PHỤ CHÚ quoting Thầy Thiệu (424) is uncovered; the Soán text and its PHỤ CHÚ (425) are only partly reflected. Other uncovered remainders include the quân tử/tiểu nhân “ở tinh thần” PHỤ CHÚ (428), the Càn-changing/circumstance PHỤ CHÚ and explicit caveat on page 430, and the PHỤ CHÚ on page 431. The structure line and figure/seal were observed but are not claimed. The distinct translation layer is absent only under the recorded F5 mapping. PR-07's Vietnamese `attributedTo` convention for two repaired citations still needs an owner decision.
- **NHL:** no dedicated overview original-text citation exists; that layer uses the same-unit overview citation as inspected-page evidence. The overview Thoán positive reading and Đại tượng remain uncovered, the page-273 closing advice is only partly reflected, and the figure/seal were observed but not claimed. The source's report of the PBC reading must retain its wording. The printed NHL page-271 typo remains evidence-only.
- **NTT:** the overview 彖曰 segments and Trình Di/Chu Hy line-by-line Thoán explanations, plus the Đại tượng truyện and Trình Di explanation, are not covered as claims. Small-symbol explanations on pages 689 and 691–696 remain unsummarized: position 1 (689), positions 2–4 (691–693), position 5 (694–695), and position 6 (696, only indirectly within a citation range). The position-1 closing remark is only implicit. The translator notes at positions 5 and 6 remain bounded recitals. The registry's supplement source-anchor list omits two q44 supplement citations (PR-06); cell observations do not resolve that roster gap.
- **Shared:** translation-layer citation mapping is still open. Source print errors (S-NTT-1..5, S-PBC-1, and the NHL page-271 printed typo) remain evidence-only and unnormalized. The whole-record remainders above are not closed by 43 assigned claims or 63 referenced citations.

Full details are recorded in each affected decision's findings. These gaps do not block an AI source-comparison disposition for the bounded cells, but remain explicit coverage limits.

The AI source comparison and current input hashes do not establish comprehensive coverage, specialist approval, certification, rights clearance, or completion. Counts must not be read as a corpus-wide coverage claim; unresolved global rosters and other target decisions remain outside this ledger's scope.
