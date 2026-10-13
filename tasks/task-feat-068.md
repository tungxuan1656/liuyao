# feat-068 - Simplify knowledge and rebuild quẻ 01–04

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-041](task-feat-041.md), [feat-063](task-feat-063.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done. Contracts, corpus/runtime migration, and quẻ 01–04 content acceptance pass.
- Blockers: none. Known source gaps remain explicit in their records.
- Recovery: feat/068-audit-hexagrams-01-04 remains unchanged at c80c38d560a1bd904465db6a73cc7079b09e3c38.
- Delivery: feat/068-knowledge-simplification was based on main 0b06640. [PR #96](https://github.com/tungxuan1656/liuyao/pull/96) is open into main; review repairs are prepared on the same branch. Merge remains pending.
- Next: review and merge the pull request. No dependent feature has been activated.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — feat-068 completed: simplified linked knowledge

- Design approved. Migrated 381 canonical records to coherent entries, direct book/page references, and stable record/line/section links.
- Removed claim/citation registries, review/hash ledgers, audit gates, source-unit inventories, and the committed monolithic release. Git retains prior history.
- Rebuilt Càn, Khôn, Truân, Mông and 24 positions with distinct author views. Added source-checked Chu Hy Khôn views; retained the unlocated NTT Mông referral.
- Detailed assets load by ID; compact metadata supports lookup/search. Node access, tables, worked examples, and current calculation behavior remain usable.
- JavaScript: 832.67 KB raw / 232.14 KB gzip. Full offline precache: 5,346.54 KiB raw; 381 record assets included.
- Verification: ./init.sh passed (181 core + 85 knowledge tests). Knowledge suite: 1.86 seconds versus 151.75 seconds at the main baseline. Corpus freshness and four supplied-PDF checks passed.
- Direct browser checks covered offline routes/search/reload with the server stopped, interrupted-load recovery, articles, source references, and mobile hào anchors.
- Documentation now describes the implemented model; the source guide was reduced to the supplied inventory, core discrepancies, and canonical-record routes.
- Historical status: done; no blockers and no dependent feature activated. Source gaps remain record-level notes.
- Handoff: [feat-068](../features/feat-068.md). Changes remain uncommitted on feat/068-knowledge-simplification. Old branch remains unchanged at c80c38d.

#### 2026-10-09 — feat-068 PR #96 review repairs

- Reproduced malformed-asset acceptance, duplicate rendered targets, and omitted table/figure sources with focused regression cases; corrected all three.
- Loader uses the authored schema through a generated standalone validator. It loads with the selected asset, preserves failed-load retry, and adds a separate 14.11 KB gzip chunk.
- Shared table IDs resolve consistently in validation and rendering. Metadata and compatibility references include every figure reference layer and tables.
- Direct browser checks confirmed collapsed-entry deep links, custom table targets, malformed Mông recovery, mobile layout, and first-use offline validator loading after stopping the server.
- Evidence: final ./init.sh passed (181 core + 97 knowledge tests; knowledge 2.14 seconds). Corpus/source freshness, Node access, 619 local links, and diff checks passed.
- Initial JavaScript: 832.86 KB raw / 232.47 KB gzip. Full precache: 400 build entries, 5,473.54 KiB raw. Authored corpus content remains unchanged.
- Historical status: done. Repairs are prepared on the existing PR branch; merge remains pending. No dependent feature was activated.

## Migration provenance

Migrated from [feat-068](../features/feat-068.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
