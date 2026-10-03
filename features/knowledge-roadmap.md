# Knowledge completion and verification roadmap

This document owns navigation and sequencing for the requested supplied-book corpus and its web integration.
It was created on 2026-10-02 after feat-041.
[Feature state](../feature_index.json) owns status and dependencies; each feature owns its scope and acceptance.
The [coverage report](../packages/knowledge/reports/coverage.json) owns live dataset counts.
The [quality contract](../docs/product-specs/knowledge-quality.md#full-corpus-verification) owns evidence requirements.

## Current gaps

This is a dated baseline snapshot, not evidence that later audits have run.
There are 172 released records, 1,226 claims, and 1,015 citations.
Quẻ 01–40 have source-compared overviews and all six positions in NHL, PBC, and NTT.
Quẻ 41–64 remain unaudited compatibility entries: 24 quẻ and 144 positions lack reviewed commentary in each required book.
That leaves 432 book-position cells to author.
The later full audit covers all 384 positions and at least 1,152 book-position cells, including existing content.
Actual NTT commentators remain separate attribution layers within those cells.

| Group                | Baseline coverage                | Remaining work                                                                               |
| -------------------- | -------------------------------- | -------------------------------------------------------------------------------------------- |
| Foundations          | Partial; seven released records  | Complete definitions, diagrams, vocabulary, and project-convention distinctions.             |
| Trigrams             | Eight entities source-compared   | Reconcile remaining source associations and audit all eight.                                 |
| Hexagrams            | 40/64 source-compared            | Author quẻ 41–64; audit all 64.                                                              |
| Line commentary      | 240/384 positions per book       | Author all six positions in quẻ 41–64; audit every position and layer.                       |
| Casting              | Partial; four released records   | Complete supplied procedures, transformations, examples, and convention labels.              |
| Liu Yao foundations  | Selected records source-compared | Close source gaps; audit eight palaces, 64 boards, and full tables independently.            |
| Advanced Liu Yao     | Partial; 65 released records     | Complete BPCT numbered passages, applications, questions, and criticisms.                    |
| Classical traditions | Pending                          | Complete actual source framing, schools, diagrams, surviving wings, and author distinctions. |
| Learning articles    | Pending                          | Build ordered lessons and independently checked examples from reviewed claims.               |

Current source comparison records Codex passage review.
It does not establish complete chapter coverage or independent specialist approval.
Four legacy terms and two legacy rules also remain; software conventions need project-contract evidence rather than invented book citations.

## Missing quẻ and hào

Every quẻ below lacks reviewed Sơ, Nhị, Tam, Tứ, Ngũ, and Thượng commentary in all three required books.
Positions are bottom-to-top; special Càn/Khôn passages are outside this count.

| Delivery feature        | Missing quẻ                                                                         | Missing positions per quẻ     | Paired BPCT chapter 6 group |
| ----------------------- | ----------------------------------------------------------------------------------- | ----------------------------- | --------------------------- |
| [feat-044](feat-044.md) | 41 Sơn Trạch Tổn; 42 Phong Lôi Ích; 43 Trạch Thiên Quải; 44 Thiên Phong Cấu         | Sơ, Nhị, Tam, Tứ, Ngũ, Thượng | Sentences 12–16             |
| [feat-045](feat-045.md) | 45 Trạch Địa Tụy; 46 Địa Phong Thăng; 47 Trạch Thủy Khốn; 48 Thủy Phong Tỉnh        | Sơ, Nhị, Tam, Tứ, Ngũ, Thượng | Sentences 17–24             |
| [feat-046](feat-046.md) | 49 Trạch Hỏa Cách; 50 Hỏa Phong Đỉnh; 51 Thuần Chấn; 52 Thuần Cấn                   | Sơ, Nhị, Tam, Tứ, Ngũ, Thượng | Sentences 25–32             |
| [feat-047](feat-047.md) | 53 Phong Sơn Tiệm; 54 Lôi Trạch Quy Muội; 55 Lôi Hỏa Phong; 56 Hỏa Sơn Lữ           | Sơ, Nhị, Tam, Tứ, Ngũ, Thượng | Sentences 33–40             |
| [feat-048](feat-048.md) | 57 Thuần Tốn; 58 Thuần Đoài; 59 Phong Thủy Hoán; 60 Thủy Trạch Tiết                 | Sơ, Nhị, Tam, Tứ, Ngũ, Thượng | Sentences 41–48             |
| [feat-049](feat-049.md) | 61 Phong Trạch Trung Phu; 62 Lôi Sơn Tiểu Quá; 63 Thủy Hỏa Ký Tế; 64 Hỏa Thủy Vị Tế | Sơ, Nhị, Tam, Tứ, Ngũ, Thượng | Sentences 49–56             |

## Feature size and execution route

The backlog groups work into **61 intended execution features**: 55 original corpus features, three web integration features, and three supporting features.
A feature closes a coherent content or audit group.
Quẻ, hào, chapters, questions, diagrams, and source cells remain separately reviewable units inside it.

- Authoring groups use chapter or passage checkpoints and verified commits.
- Sixteen audit features cover four quẻ each, with 24 explicit hào acceptance items per feature.
- Intended ledgers retain one record per quẻ and individual decisions for every source unit.
- Ten group audit features cover foundations, tables, BPCT groups, classical traditions, and learning content.
- Independent approval, final certification, and later correction checks have separate gates.
- Three web features reuse released records for Library details, result explanations, and topic/article browsing.
- Three supporting features complete representation contracts, runtime fidelity, and measured offline delivery.

Execution statuses live in [the feature index](../feature_index.json). Feat-101 is active after the inventory phase; [feat-042](feat-042.md) records completed corpus-roadmap creation.
Adding plans and changing dependencies does not activate their implementation.
Creating features does not execute authoring, audits, web changes, or certification.

1. Merge completed feat-101 after final-head checks, then activate feat-067 audit tooling before feat-097 correction probes and bulk authoring. PR #62 awaits final-head CI and merge; implementation and reviewed-SHA checks are complete [as recorded in the handoff](feat-101.md).
2. Complete feat-067 audit tooling and feat-097 correction probes before bulk authoring.
3. Continue feat-044 through feat-066, interleaving eligible quẻ/group audits after their source batches finish.
4. Reconcile topic/source findings, obtain named specialist approval, and certify the authored snapshot through feat-094–096.
5. Repeat affected evidence checks after input changes; preserve earlier decisions and their reviewed inputs.

The web branch can use existing released content after feat-101, before corpus authoring or certification finishes.
Complete feat-098 first; feat-099 and feat-100 then reuse its claim-level presentation.
Feat-102 checks the released content across package and web contexts; feat-103 establishes measured payload and offline-update guards.
Future learning articles from feat-065 populate existing article routes when released; their absence does not block browser delivery.
Volume fixtures support early hardening. Actual complete authored builds must pass before full-volume delivery is claimed.

Keep at most one feature active and follow [repository lifecycle rules](../AGENTS.md#feature-state).
Plans stay inline until selected work meets the repository criteria for an external plan.
If inventory reveals an unowned section, add bounded work and update the closing dependencies before proceeding.
Split a selected feature only when its checkpoints have distinct acceptance or blocking requirements.

| Phase                            | Features                              | Exit condition                                                                                       |
| -------------------------------- | ------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Source inventory                 | [043](feat-043.md)                    | Every supplied unit has a disposition and authoring/audit owner.                                     |
| Representation contracts         | [101](feat-101.md)                    | Lessons, figures, conventions, dependencies, and snapshot identity have compatible public contracts. |
| Versioned audit evidence         | [067](feat-067.md)                    | Incremental decisions validate; missing or stale evidence keeps global completion closed.            |
| Correction probes                | [097](feat-097.md)                    | Isolated probes invalidate affected and derived decisions before certification.                      |
| Remaining quẻ and chapter 6      | [044](feat-044.md)–[050](feat-050.md) | Three-book content covers all 64 quẻ; remaining numbered passages are accounted for.                 |
| BPCT source groups               | [051](feat-051.md)–[058](feat-058.md) | Parts I–III have complete included coverage and explicit exclusions.                                 |
| Classical framing and wings      | [059](feat-059.md)–[063](feat-063.md) | Actual NHL/NTT/PBC introductions, diagrams, surviving wings, and special passages are accounted for. |
| Conventions, learning, closure   | [064](feat-064.md)–[066](feat-066.md) | Legacy definitions resolve; lessons and every inventory unit have supported dispositions.            |
| All quẻ and hào                  | [068](feat-068.md)–[083](feat-083.md) | 64 quẻ and 384 distinct position decisions pass with required layers.                                |
| All source groups and tables     | [084](feat-084.md)–[093](feat-093.md) | Every assigned unit and independent expected table passes.                                           |
| Reconciliation and certification | [094](feat-094.md)–[096](feat-096.md) | Current decisions, resolved findings, and specialist approval satisfy all gates.                     |
| Web reference integration        | [098](feat-098.md)–[100](feat-100.md) | Released quẻ/hào, result contexts, and topic/article routes satisfy their web and offline checks.    |
| Runtime fidelity and scale       | [102](feat-102.md)–[103](feat-103.md) | Snapshot-bound projections, rendered evidence, budgets, and offline updates pass.                    |

## Source boundaries and coverage ownership

The heading inventory inspected four editions: BPCT 467, PBC 655, NTT 938, NHL 393 pages.
This is navigation evidence, not a full fidelity review of all 2,453 pages.
[Book sources](../docs/references/book-sources.md) owns edition identity, exact locators, and source discrepancies.
Feature page ranges are planning anchors; feat-043 confirms actual boundaries and printed/PDF numbering.

- BPCT Niên Thời is unnumbered between chapters 7 and 9 in the supplied heading. Do not invent an observed chapter 8 label.
- BPCT chapter 20 includes the separate Tân Tăng Gia Trạch supplement.
- BPCT Yếu Quyết sections share pages. A heading claiming 384 transformations does not establish 384 printed examples.
- PBC Thuyết Quái explicitly lacks chapter 1 and preserves limited subsequent content. Keep the omission visible.
- NTT ends after quẻ 64 and a colophon; it has no separate full Hệ Từ appendix.
- NHL Part II introductory pages, Hệ Từ introduction, and retrospective require explicit ownership.

| Source/content group                                      | Authoring owner         | Later audit owner |
| --------------------------------------------------------- | ----------------------- | ----------------- |
| Remaining classical quẻ 41–64                             | 044–049                 | 078–083           |
| Existing classical quẻ 01–40                              | Prior completed batches | 068–077           |
| BPCT front matter and chapters 1–5                        | 051                     | 084               |
| BPCT chapter 6, sentences 1–69                            | Prior batches, 044–050  | 085               |
| BPCT weather/life/career/wealth                           | 052                     | 086               |
| BPCT loss/travel/study/family                             | 053                     | 087               |
| BPCT housing/boats/Xướng Gia                              | 054                     | 088               |
| BPCT illness/remedies/travellers                          | 055                     | 089               |
| BPCT litigation/spirits/agriculture/state/conflict/flight | 056                     | 090               |
| BPCT questions and Hà Tri                                 | 057                     | 091               |
| BPCT casting supplements and criticisms                   | 058                     | 084, 091          |
| NHL introduction, framing, and retrospective              | 059                     | 084, 092          |
| NTT/PBC framing, diagrams, surviving Thuyết/Tự/Tạp        | 060                     | 084, 092          |
| Hệ Từ Thượng/Hạ in NHL/PBC                                | 061–062                 | 092               |
| Càn/Khôn special passages                                 | 063                     | 068               |
| Four legacy terms and two project rules                   | 064                     | 084               |
| Ordered learning articles and examples                    | 065                     | 093               |
| Global omissions, exclusions, and source corrections      | 043, 066                | 094               |
| Extended records and project evidence contracts           | 101                     | 067, 084, 093     |
| Released-record presentation and web contexts             | 098–100                 | 102               |
| Snapshot assets, budgets, and offline updates             | 101, 103                | 102, 103          |

The ownership table routes work; the linked feature scopes define exact included units.
No final article count is fixed before the source crosswalk.

## Authoring and tooling feature index

| Feature                 | Planned work                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------- |
| [feat-043](feat-043.md) | Inventory every supplied-book section and exclusion                                   |
| [feat-044](feat-044.md) | Reviewed quẻ 41–44 and BPCT sentences 12–16                                           |
| [feat-045](feat-045.md) | Reviewed quẻ 45–48 and BPCT sentences 17–24                                           |
| [feat-046](feat-046.md) | Reviewed quẻ 49–52 and BPCT sentences 25–32                                           |
| [feat-047](feat-047.md) | Reviewed quẻ 53–56 and BPCT sentences 33–40                                           |
| [feat-048](feat-048.md) | Reviewed quẻ 57–60 and BPCT sentences 41–48                                           |
| [feat-049](feat-049.md) | Reviewed quẻ 61–64 and BPCT sentences 49–56                                           |
| [feat-050](feat-050.md) | Complete BPCT chapter 6 sentences 57–69                                               |
| [feat-051](feat-051.md) | Complete BPCT foundational chapters and front matter                                  |
| [feat-052](feat-052.md) | Complete BPCT applications — Weather life career and wealth                           |
| [feat-053](feat-053.md) | Complete BPCT applications — Loss travel study marriage and household members         |
| [feat-054](feat-054.md) | Complete BPCT applications — Housing boats and Xướng Gia                              |
| [feat-055](feat-055.md) | Complete BPCT applications — Illness remedies and absent travellers                   |
| [feat-056](feat-056.md) | Complete BPCT applications — Litigation spirits agriculture state conflict and flight |
| [feat-057](feat-057.md) | Complete BPCT eighteen questions and Hà Tri Chương                                    |
| [feat-058](feat-058.md) | Complete BPCT casting supplements and book criticisms                                 |
| [feat-059](feat-059.md) | Complete NHL introductory chapters and framing                                        |
| [feat-060](feat-060.md) | Complete NTT and PBC introductory traditions and diagrams                             |
| [feat-061](feat-061.md) | Complete Hệ Từ Thượng across NHL and PBC                                              |
| [feat-062](feat-062.md) | Complete Hệ Từ Hạ across NHL and PBC                                                  |
| [feat-063](feat-063.md) | Reconcile Càn and Khôn special classical passages                                     |
| [feat-064](feat-064.md) | Resolve the six remaining legacy project definitions                                  |
| [feat-065](feat-065.md) | Author ordered lessons and reviewed worked examples                                   |
| [feat-066](feat-066.md) | Close the authoring inventory for all supplied sections                               |
| [feat-067](feat-067.md) | Implement versioned audit ledgers and completion gates                                |
| [feat-101](feat-101.md) | Complete extended knowledge records and provenance contracts                          |

## Quẻ and hào audit index

Every linked feature contains Sơ, Nhị, Tam, Tứ, Ngũ, and Thượng checkboxes for each of its four quẻ.
Each checkbox requires NHL/PBC/NTT cells and all actual author/translator layers.
Later audits are pending for every quẻ, including the 40 already source-compared.

| Audit feature           | Quẻ with separate six-position decisions                                            |
| ----------------------- | ----------------------------------------------------------------------------------- |
| [feat-068](feat-068.md) | 01 Thuần Càn; 02 Thuần Khôn; 03 Thủy Lôi Truân; 04 Sơn Thủy Mông                    |
| [feat-069](feat-069.md) | 05 Thủy Thiên Nhu; 06 Thiên Thủy Tụng; 07 Địa Thủy Sư; 08 Thủy Địa Tỷ               |
| [feat-070](feat-070.md) | 09 Phong Thiên Tiểu Súc; 10 Thiên Trạch Lý; 11 Địa Thiên Thái; 12 Thiên Địa Bĩ      |
| [feat-071](feat-071.md) | 13 Thiên Hỏa Đồng Nhân; 14 Hỏa Thiên Đại Hữu; 15 Địa Sơn Khiêm; 16 Lôi Địa Dự       |
| [feat-072](feat-072.md) | 17 Trạch Lôi Tùy; 18 Sơn Phong Cổ; 19 Địa Trạch Lâm; 20 Phong Địa Quan              |
| [feat-073](feat-073.md) | 21 Hỏa Lôi Phệ Hạp; 22 Sơn Hỏa Bí; 23 Sơn Địa Bác; 24 Địa Lôi Phục                  |
| [feat-074](feat-074.md) | 25 Thiên Lôi Vô Vọng; 26 Sơn Thiên Đại Súc; 27 Sơn Lôi Di; 28 Trạch Phong Đại Quá   |
| [feat-075](feat-075.md) | 29 Thuần Khảm; 30 Thuần Ly; 31 Trạch Sơn Hàm; 32 Lôi Phong Hằng                     |
| [feat-076](feat-076.md) | 33 Thiên Sơn Độn; 34 Lôi Thiên Đại Tráng; 35 Hỏa Địa Tấn; 36 Địa Hỏa Minh Di        |
| [feat-077](feat-077.md) | 37 Phong Hỏa Gia Nhân; 38 Hỏa Trạch Khuê; 39 Thủy Sơn Kiển; 40 Lôi Thủy Giải        |
| [feat-078](feat-078.md) | 41 Sơn Trạch Tổn; 42 Phong Lôi Ích; 43 Trạch Thiên Quải; 44 Thiên Phong Cấu         |
| [feat-079](feat-079.md) | 45 Trạch Địa Tụy; 46 Địa Phong Thăng; 47 Trạch Thủy Khốn; 48 Thủy Phong Tỉnh        |
| [feat-080](feat-080.md) | 49 Trạch Hỏa Cách; 50 Hỏa Phong Đỉnh; 51 Thuần Chấn; 52 Thuần Cấn                   |
| [feat-081](feat-081.md) | 53 Phong Sơn Tiệm; 54 Lôi Trạch Quy Muội; 55 Lôi Hỏa Phong; 56 Hỏa Sơn Lữ           |
| [feat-082](feat-082.md) | 57 Thuần Tốn; 58 Thuần Đoài; 59 Phong Thủy Hoán; 60 Thủy Trạch Tiết                 |
| [feat-083](feat-083.md) | 61 Phong Trạch Trung Phu; 62 Lôi Sơn Tiểu Quá; 63 Thủy Hỏa Ký Tế; 64 Hỏa Thủy Vị Tế |

## Group audit index

Each ledger enumerates source units separately even when several chapters share a feature.
Palace-board checks are distinct from classical quẻ-commentary checks.
Domain expected fixtures must come from independent source evidence rather than the production implementation.
Synthetic validation fixtures test gate behavior without establishing doctrine or independent approval.

| Feature                 | Planned work                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------- |
| [feat-084](feat-084.md) | Audit sources shared foundations casting and Liu Yao tables                        |
| [feat-085](feat-085.md) | Audit all sixty-nine BPCT chapter 6 sentences                                      |
| [feat-086](feat-086.md) | Audit BPCT applications — Weather life career and wealth                           |
| [feat-087](feat-087.md) | Audit BPCT applications — Loss travel study marriage and household members         |
| [feat-088](feat-088.md) | Audit BPCT applications — Housing boats and Xướng Gia                              |
| [feat-089](feat-089.md) | Audit BPCT applications — Illness remedies and absent travellers                   |
| [feat-090](feat-090.md) | Audit BPCT applications — Litigation spirits agriculture state conflict and flight |
| [feat-091](feat-091.md) | Audit BPCT questions Hà Tri casting supplements and criticisms                     |
| [feat-092](feat-092.md) | Audit classical traditions diagrams and all Hệ Từ chapters                         |
| [feat-093](feat-093.md) | Audit ordered lessons and every worked example                                     |

## Final gates and corrections

| Feature                 | Planned work                                            |
| ----------------------- | ------------------------------------------------------- |
| [feat-094](feat-094.md) | Close all topic audits contradictions and exclusions    |
| [feat-095](feat-095.md) | Obtain independent specialist review of the full corpus |
| [feat-096](feat-096.md) | Certify corpus completion against the evidence gates    |

Final certification requires complete source classification, complete included coverage, current unit decisions, and named independent approval.
The [correction drill](feat-097.md) runs before authoring and remains a prerequisite for final certification.
Source limitations and excluded uncertainty remain visible in the reviewed snapshot.
Coverage counts do not establish numerical certainty or predictive efficacy.
The [quality contract](../docs/product-specs/knowledge-quality.md#completion-and-later-corrections) defines what completion can establish.

## Web integration branch

These plans add reference views using the existing package boundaries.
They preserve calculated results and do not activate automated interpretation or calendar analysis.
The [Library specification](../docs/product-specs/knowledge-browser.md#intended-book-backed-expansion) and
[result specification](../docs/product-specs/reading-result.md#intended-book-reference-contexts) own intended behavior.

| Feature                 | Planned delivery                                                                            | Prerequisites                                                   |
| ----------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| [feat-098](feat-098.md) | Claim-level quẻ/hào, trigram, term, rule, and table/diagram details with evidence.          | feat-101 and existing Library/released-corpus contracts.        |
| [feat-099](feat-099.md) | Correct primary/changed quẻ and selected-position explanations from reading results.        | feat-098 presentation and existing result/navigation contracts. |
| [feat-100](feat-100.md) | Topic groups, BPCT/classical/learning articles, local search, and offline detail routes.    | feat-098 presentation and existing PWA/Library contracts.       |
| [feat-102](feat-102.md) | Snapshot-bound fidelity checks across public records, rendered claims, and result contexts. | feat-098–100.                                                   |
| [feat-103](feat-103.md) | Measured payload/query/cache budgets, consistent snapshots, offline updates, and rollback.  | feat-102 and existing offline hardening.                        |

These features do not depend on corpus completion or independent certification.
Their acceptance checks released and unavailable content, correct context, accessibility, and offline behavior.
Suggested PR grouping follows each coherent delivery, with checkpoint commits inside each PR.
The [approved extended model](../docs/design-docs/knowledge-model.md#approved-extended-record-contract) owns supporting versus navigation references.
The [quality contract](../docs/product-specs/knowledge-quality.md#intended-runtime-fidelity) owns fidelity evidence; the
[PWA contract](../docs/design-docs/offline-pwa.md#intended-knowledge-scale-and-updates) owns volume and update behavior.

## Concrete next action

Merge feat-101 after final-head CI confirms the [reviewed implementation](feat-101.md); Checkpoint 1 is complete.
Then activate feat-067, followed by feat-097 before bulk authoring.
Then complete feat-067 audit tooling and feat-097 correction probes before bulk authoring. Web integration starts with feat-098 after feat-101.
The next content group remains Tổn, Ích, Quải, Cấu and BPCT chapter 6, sentences 12–16.
