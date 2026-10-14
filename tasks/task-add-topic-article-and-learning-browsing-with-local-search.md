# task-add-topic-article-and-learning-browsing-with-local-search - Add topic article and learning browsing with local search

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-integrate-reviewed-reference-records-into-library-details](task-integrate-reviewed-reference-records-into-library-details.md), [task-knowledge-browser](task-knowledge-browser.md), [task-offline-hardening](task-offline-hardening.md), [task-book-backed-json-knowledge-foundation-and-pilot](task-book-backed-json-knowledge-foundation-and-pilot.md)
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
2. Add package-owned reusable search where required; compose topic and article views with task-integrate-reviewed-reference-records-into-library-details presentation.
3. Verify released/empty states, direct routes, and offline cache coverage; commit coherent checkpoints.

## Verify

- `./init.sh`
- Package tests for changed topic/search contracts, including eligibility and accent-sensitive cases.
- Direct compact/wide and offline article checks under the development contract.

## Handoff

- Evidence: Design recorded; implementation and web verification have not started.
- Next: Complete task-integrate-reviewed-reference-records-into-library-details, select this feature, and assess external-plan criteria before coding.
- Blockers: not evaluated until owner selection and dependency check.
