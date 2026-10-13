# feat-043 - Inventory every supplied-book section and exclusion

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-042](task-feat-042.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Make every supplied section visible before further bulk authoring.

## Scope

**Intended work:**

- All four fingerprinted editions: BPCT 467, PBC 655, NTT 938, NHL 393 PDF pages.
- Intended artifact: docs/reviews/knowledge/source-inventory.md; map sections to records, exclusions, and owning features.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] BPCT Parts I–III, including the unnumbered Niên Thời section and chapter 20 supplement.
- [x] PBC front matter, 64 quẻ, Hệ Từ, surviving Thuyết/Tự/Tạp Quái, and end matter.
- [x] NTT front matter, Trình Di preface, Chu Hy diagrams, Cương Lĩnh, and 64 quẻ.
- [x] NHL front matter, seven introductory chapters, 64 quẻ, Hệ Từ, and end matter.
- [x] Every page belongs to a section; blanks, diagrams, and incomplete passages have explicit dispositions.
- [x] Each meaningful section has an authoring and audit owner. Split oversized work before activation; never leave an unowned unit.
- [x] Expected passages, author layers, and source units come from inspection, independently of existing record counts.
- [x] Distinguish PDF pages from printed numbers. Confirm all planning anchors and absent headings.
- [x] Preserve reviewed records; identify their uncovered passages and existing exclusions.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Partition each supplied edition into exclusive PDF intervals and record source-derived child units separately where pages are shared.
2. Crosswalk source units to current records/citations, explicit dispositions, and author/audit routes without treating selected citations as whole-section coverage.
3. Verify partitions, fingerprints, manifest/document routes, and repository checks; preserve unresolved passage-level audits for their owning features.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; inventory and assigned repository verification are complete. This closes the source-section crosswalk only, not passage-level audits or corpus certification.
- Evidence: `docs/reviews/knowledge/source-inventory.md` partitions BPCT 467, PBC 655, NTT 938 and NHL 393 PDF pages. External structural verification confirmed 44/18/77/104 adjacent intervals, all four SHA-256/page-count fingerprints, 172 manifest records, 20 citation files, 1,015 citations, feature/document routes, and the 64 ordered PBC quẻ ranges. `./init.sh` passed: format, lint (zero errors; four existing warnings), typecheck, build (existing source-map/font/chunk warnings), package exports, test-placement check, and 263 tests (181 core + 82 knowledge). `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` also passed. `git diff --check` passed.
- Limits: Selected citations do not establish complete chapter or passage coverage. PBC per-quẻ candidate layer locators, NTT note-to-passage links, NHL source-layer boundaries, and other unresolved passage-level dispositions remain for their listed owners. All 1,152 fine-grained book-position audit cells, independent specialist approval, and corpus certification remain open; none is claimed complete here.
- Dependencies: See [frozen index](../feature_index.json).
- Next: After the coordinator's PR is merged, select feat-101 to implement the extended knowledge record and provenance contracts using this inventory; keep open source-layer gaps with their routed author/audit features.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-03 — feat-043

**State**: done; source-section crosswalk and repository verification complete.
**Done**: Partitioned all four supplied editions and mapped sections, dispositions, existing evidence, and author/audit routes in `docs/reviews/knowledge/source-inventory.md`; preserved source discrepancies in the canonical catalog.
**Evidence**: External structural checks confirmed 2,453 pages, all four PDF fingerprints/counts, manifest/document/feature routes, and ordered PBC quẻ ranges. `./init.sh` passed: 263 tests (181 core, 82 knowledge), package exports, format, lint (0 errors; 4 existing warnings), typecheck, build (existing source-map/font/chunk warnings), and test placement. Knowledge corpus validation with `--check-books --check` and `git diff --check` passed.
**Blockers**: Fine source-layer reconciliations, 1,152 book-position audit cells, specialist approval, and corpus certification remain open under routed owners; no passage-fidelity or certification claim is made.
**Next**: After coordinator PR merge, select feat-101 and use this inventory to implement extended knowledge records and provenance contracts.

## Migration provenance

Migrated from [feat-043](../features/feat-043.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
