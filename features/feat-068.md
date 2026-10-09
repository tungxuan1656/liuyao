# feat-068 — Simplify knowledge and rebuild quẻ 01–04

## Goal

Deliver linked learning content with source references and small offline assets.

## Scope

- Replace the formal audit model, validation plumbing, and monolithic generated runtime release.
- Preserve useful existing knowledge, stable IDs, and current calculation behavior.
- Rebuild Càn, Khôn, Truân, Mông and all 24 positions as coherent sourced explanations.
- Reuse meaningful writing from the preserved old feature branch.

## Non-goals

New prediction, calendar behavior, certification, PDF distribution, or a database.

## Acceptance

- [x] Knowledge contracts and future feature routes use the simplified model.
- [x] Structural validation replaces audit ledgers and hash closures.
- [x] Small metadata and per-record assets replace the full-corpus startup import.
- [x] Stable lookups, links, and offline update behavior remain usable.
- [x] Càn: overview, Sơ, Nhị, Tam, Tứ, Ngũ, Thượng, and special/context passages.
- [x] Khôn: overview, Sơ, Nhị, Tam, Tứ, Ngũ, Thượng, and special/context passages.
- [x] Truân: overview, Sơ, Nhị, Tam, Tứ, Ngũ, Thượng.
- [x] Mông: overview, Sơ, Nhị, Tam, Tứ, Ngũ, Thượng.
- [x] Meaningful source differences and known gaps remain explicit.
- [x] Payload measurements, source checks, and ./init.sh pass.

## Relevant docs

[Model](../docs/design-docs/knowledge-model.md), [content](../docs/product-specs/knowledge-content.md),
[quality](../docs/product-specs/knowledge-quality.md), [offline](../docs/design-docs/offline-pwa.md#knowledge-delivery),
[sources](../docs/references/book-sources.md), [licensing](../LICENSING.md),
[plan](../docs/plans/feat-068.md), [verification](../docs/development.md).

## Verification evidence

- ./init.sh passed after the final code changes: format, lint, length, type-check, build, package exports, and tests.
- Core: 181 tests passed. Knowledge: 85 tests passed in 1.86 seconds; the main baseline took 151.75 seconds for 6,197 tests.
- validate:corpus --check --check-books passed: 381 ready records, direct links/page bounds, output freshness, and four local PDF fingerprints.
- One-time conversion checks preserved existing prose before editorial changes, table values, diagram labels, and orientations. Independent table and worked-reading expectations still pass.
- Built Node access loads quẻ 01–04; existing lookup and Vietnamese search behavior pass.
- Source review reused useful writing from c80c38d and inspected NTT Khôn passages and Mông context/notes. Each of the 24 positions retains four named author views across the three classical books.
- Khôn's upper-line label remains Thượng lục despite the NTT PDF 144 Chinese label. Mông retains the unlocated PDF 183 notes 5–7 referral; no missing criticism was invented.
- Real-browser checks covered articles, quẻ, source visibility, linked sections, local search, and 390-pixel layout. Hào anchors clear the fixed header.
- Workbox cached all 381 record assets. Cached Khôn, Mông, Càn, search, and direct reloads worked with the preview server stopped.
- A simulated interrupted record request showed the error/retry state; retry recovered Mông from cache with six positions and its gap note.
- Prompt registration, clientsClaim=false, skipWaiting=false, and the existing draft/update components remain unchanged.

| Measurement           | Result                                                                              |
| --------------------- | ----------------------------------------------------------------------------------- |
| Initial JavaScript    | 832.86 KB raw; 232.47 KB gzip (main baseline about 12.7 MB / 1.12 MB)               |
| Metadata index        | 164,902 bytes raw; 33,743 bytes gzip                                                |
| Ready record assets   | 381 assets; 4,002,186 bytes raw; 836,696 summed gzip bytes                          |
| Largest record        | 127,302 bytes raw; 18,006 bytes gzip                                                |
| Full Workbox precache | 400 build entries; 5,473.54 KiB raw                                                 |
| Quẻ 01–04 assets      | 34,302 / 26,245 / 13,195 / 13,368 bytes raw                                         |
| JSON parse sample     | Metadata 0.270 ms; compatibility data 0.191 ms; Càn 0.059 ms median on this machine |

Compression figures describe build/local measurements, not a promise about hosting transfer settings.
Parsing samples are diagnostics, not timing assertions or device budgets.

## PR #96 review follow-up

- Runtime assets use the same JSON schema as authored records before caching. The generated standalone validator loads alongside the first record request and adds a separate 129.85 KB raw / 14.11 KB gzip chunk.
- Rendered entry, line, table, and figure anchors share one uniqueness check. Tables use their authored ID or the kind-based fallback consistently in validation and UI.
- Metadata and compatibility references include tables, figures, orientation, labels, and author alternatives. The existing corpus had no omitted metadata sources or anchor collisions; synthetic regression cases cover both.
- Regression tests first reproduced malformed-asset acceptance, anchor collisions, and omitted sources. The corrected suite passes 97 knowledge tests, including every published record against the runtime schema.
- Direct browser checks confirm a real collapsed entry deep link opens its parent and clears the header at 390 pixels. No change to the existing details/hash effect was needed.
- An injected missing-lines response shows the error/retry state; retry loads all six Mông positions. A synthetic custom table target renders and scrolls to its authored ID.
- A fresh browser session precached all 381 records and the validator. With the preview server stopped, opening Càn for the first time loaded the validator from cache and rendered six positions.
- Payload measurements above reflect this repair; corpus assets remain unchanged. Final ./init.sh passed all gates with 181 core and 97 knowledge tests; the knowledge suite took 2.14 seconds. Corpus/source freshness checks passed.

## Handoff

- State: done. Contracts, corpus/runtime migration, and quẻ 01–04 content acceptance pass.
- Blockers: none. Known source gaps remain explicit in their records.
- Recovery: feat/068-audit-hexagrams-01-04 remains unchanged at c80c38d560a1bd904465db6a73cc7079b09e3c38.
- Delivery: feat/068-knowledge-simplification was based on main 0b06640. [PR #96](https://github.com/tungxuan1656/liuyao/pull/96) is open into main; review repairs are prepared on the same branch. Merge remains pending.
- Next: review and merge the pull request. No dependent feature has been activated.
