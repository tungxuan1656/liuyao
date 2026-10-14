# task-integrate-reviewed-reference-records-into-library-details - Integrate reviewed reference records into Library details

- Status: done
- Owner: Agent
- Required to start: [task-knowledge-browser](task-knowledge-browser.md), [task-complete-library-rule-and-source-relationships](task-complete-library-rule-and-source-relationships.md), [task-book-backed-json-knowledge-foundation-and-pilot](task-book-backed-json-knowledge-foundation-and-pilot.md), [task-reviewed-knowledge-batch-ten](task-reviewed-knowledge-batch-ten.md), [task-complete-extended-knowledge-records-and-provenance-contracts](task-complete-extended-knowledge-records-and-provenance-contracts.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Read released quẻ/hào, trigram, term, and rule explanations with conditions, attribution, and supporting evidence.

## Scope

**Intended work:** Existing Library detail routes, released knowledge APIs, and shared commentary/citation presentation.

## Non-goals

Corpus authoring or certification, automated interpretation, calendar analysis, and PDF distribution.

## Acceptance

- [x] Implement the [expanded Library contract](../docs/product-specs/knowledge-browser.md#book-backed-content) for quẻ and hào.
- [x] Overviews, six positions, and separate special passages resolve to released records.
- [x] Explanations retain author/translator layers, conditions, and exact citations.
- [x] Trigrams, terms, rules, tables, diagrams, and project conventions use the same entry presentation.
- [x] Source attribution is visible without audit or certification badges.
- [x] Direct links select the correct position; invalid targets recover without mismatched content.
- [x] Missing commentary remains explicit; do not show internal layer-resolution or audit states.
- [x] Existing entity, term, rule, and source routes remain usable.
- [x] Compact, wide, keyboard, and offline detail checks pass.
- [x] Required verification and implementation evidence are recorded.

## Relevant docs

[Model](../docs/design-docs/knowledge-model.md#access), [quality](../docs/product-specs/knowledge-quality.md),
[architecture](../ARCHITECTURE.md), [verification](../docs/development.md).

## Plan

1. Inspect public book lookups and current `library-detail.tsx` / `library-data.ts` composition.
2. Add reusable web presentation and source-preserving position links; preserve compatibility routes.
3. Verify reviewed/unavailable examples, accessibility, and offline reloads; commit coherent checkpoints.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Package tests for changed reusable projections; direct web checks under the development contract.

## Handoff

- Evidence:
  - Updated `apps/web/src/library-data.ts`, `apps/web/src/knowledge-entries.tsx`, `apps/web/src/knowledge-content.tsx`, and `apps/web/src/library-detail.tsx`.
  - Integrated book-backed knowledge records into Library details for hexagrams, trigrams, terms, rules, and articles; hexagram overviews, 6 positions (`#line-1`..`#line-6`), and special passages (`#special-0`..`#special-N`) are navigable with touch targets >= 44px and target highlight rings.
  - Preserved existing entity, term, rule, and source compatibility routes; bibliographic details rendered for sources; explicit fallback text rendered for unreleased/missing commentary or target links without audit badges or certification ledgers.
  - Verified with `agent-browser` on desktop and mobile viewports (360x640), testing `#line-1` anchor jump, special passages, tables (`rule-branch-element`), figures (`article-nhl-he-tu-ha-02`), source bibliographies (`source-zhouyi`), and 404 recovery (`hexagram-99`).
  - Verified full test and build suite with `./init.sh` (all lint, format, check-ts-length, check-test-placement, check-package-exports, and unit/corpus tests passing).
  - Verified corpus and supplied books with `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` (`Knowledge: 381 records; 381 ready; 4 supplied books. Structural links and source pages valid.`).
  - Addressed PR review feedback:
    - Separated source detail page presentation: source metadata displayed once at top; reverse references cleanly divided into "Nội dung sử dụng nguồn" (covering articles, lessons via `listContent({ sourceId })`) and "Mục từ tham chiếu" (resolved entity/rule/term targets via `listSourceReferences()`), removing redundant source title repetitions.
    - Linked citation source titles in `KnowledgeReferences` to `/library/source/:id` with >=44px touch targets.
    - Added unit test in `packages/knowledge/tests/content.test.ts` for reverse content lookup by `sourceId`.
- Next: Advance to `task-connect-reading-results-to-contextual-que-and-hao-knowledge` (Step 6 Task 099).
- Blockers: none.
