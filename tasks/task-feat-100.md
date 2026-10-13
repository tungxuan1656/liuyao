# feat-100 - Add topic article and learning browsing with local search

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-098](task-feat-098.md), [feat-009](task-feat-009.md), [feat-011](task-feat-011.md), [feat-032](task-feat-032.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Browse and search released BPCT, classical, and learning articles through canonical offline Library routes.

## Scope

**Intended work:** Topic navigation, article details, reusable local search, related links, and PWA route verification.

## Non-goals

Lesson authoring, complete-corpus certification, remote search, PDF distribution, or automated interpretation.

## Acceptance

- [ ] Implement the [topic/article contract](../docs/product-specs/knowledge-browser.md#intended-topic-browsing-and-article-improvements).
- [ ] Topic collections use manifest definitions and released records' `topicIds` through public APIs.
- [ ] Article explanations retain named layers, conditions, citations, and declared relationships.
- [ ] Learning blocks follow declared sequence; unreleased related targets show unavailable states without draft prose.
- [ ] Local search covers released titles, aliases, and Vietnamese explanations with existing normalization semantics.
- [ ] Pending learning topics show empty states; subsequently released lessons use the same routes and presentation.
- [ ] Existing Library categories, exact-ID search, and canonical deep links remain usable.
- [ ] Cold online loading followed by offline lists, search, and direct article reloads passes.
- [ ] Required verification and compact/wide accessibility evidence are recorded.

## Relevant docs

[Model](../docs/design-docs/knowledge-model.md#access), [content](../docs/product-specs/knowledge-content.md),
[quality](../docs/product-specs/knowledge-quality.md), [offline](../docs/design-docs/offline-pwa.md),
[verification](../docs/development.md).

## Plan

1. Inspect released articles, manifest topics, and public lookup/search contracts.
2. Add package-owned reusable search where required; compose topic and article views with feat-098 presentation.
3. Verify released/empty states, direct routes, and offline cache coverage; commit coherent checkpoints.

## Verify

- `./init.sh`
- Package tests for changed topic/search contracts, including eligibility and accent-sensitive cases.
- Direct compact/wide and offline article checks under the development contract.

## Handoff

- Evidence: Design recorded; implementation and web verification have not started.
- Next: Complete feat-098, select this feature, and assess external-plan criteria before coding.
- Blockers: not evaluated until owner selection and dependency check.

## Migration provenance

Migrated from [feat-100](../features/feat-100.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
