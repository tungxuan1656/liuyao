# task-add-topic-article-and-learning-browsing-with-local-search - Add topic article and learning browsing with local search

- Status: done
- Owner: Codex (selected by repository maintainer)
- Required to start: [task-integrate-reviewed-reference-records-into-library-details](task-integrate-reviewed-reference-records-into-library-details.md), [task-knowledge-browser](task-knowledge-browser.md), [task-offline-hardening](task-offline-hardening.md), [task-book-backed-json-knowledge-foundation-and-pilot](task-book-backed-json-knowledge-foundation-and-pilot.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Browse and search released BPCT, classical, and learning articles through canonical offline Library routes.

## Scope

Topic navigation, article details, reusable local search, related links, and PWA route verification.

## Non-goals

Lesson authoring, complete-corpus certification, remote search, PDF distribution, or automated interpretation.

## Acceptance

- [x] Implement the [topic/article contract](../docs/product-specs/knowledge-browser.md#topic-browsing-and-articles).
- [x] Topic collections use a small package-owned topic catalog and released records' `topicIds` through public APIs (approved replacement for the removed manifest).
- [x] Article explanations retain named layers, conditions, citations, and declared relationships.
- [x] Learning blocks follow declared sequence; unreleased related targets show unavailable states without draft prose.
- [x] Local search covers released titles, aliases, and Vietnamese explanations with existing normalization semantics.
- [x] Pending learning topics show empty states; subsequently released lessons use the same routes and presentation.
- [x] Existing Library categories, exact-ID search, and canonical deep links remain usable.
- [x] Cold online loading followed by offline lists, search, and direct article reloads passes.
- [x] Required verification and compact/wide accessibility evidence are recorded.

## Relevant docs

[Model](../docs/design-docs/knowledge-model.md#access), [content](../docs/product-specs/knowledge-content.md),
[quality](../docs/product-specs/knowledge-quality.md), [offline](../docs/design-docs/offline-pwa.md),
[verification](../docs/development.md).

## Plan

1. Inspect released articles, package topics, and public lookup/search contracts.
2. Add package-owned reusable search where required; compose topic and article views with task-integrate-reviewed-reference-records-into-library-details presentation.
3. Verify released/empty states, direct routes, and offline cache coverage; commit coherent checkpoints.

## Verify

- `./init.sh`
- Package tests for changed topic/search contracts, including eligibility and accent-sensitive cases.
- Direct compact/wide and offline article checks under the development contract.

## Handoff

- Evidence: Baseline and final `./init.sh` passed: build, exports, lint, format, typecheck, 181 core tests, and 130 knowledge tests. Active LSP checks reported zero diagnostics in 13 changed TypeScript files. Topic tests cover membership, sequence, eligibility, aliases, Vietnamese normalization, exact IDs, and empty collections.
- Browser: Direct Chrome/Orca checks covered wide and approximately 390px content widths, lesson order, expanded prose, citations, topic links, keyboard focus, and accentless search. After stopping the preview origin (confirmed unavailable by curl), topic lists, search, no-results states, lesson reloads, and a previously unopened BPCT article remained available through the service worker.
- Review: Read-only review found no defects in inspected modules; complete branch-diff review was unavailable. No draft lessons or new content were authored. The maintainer approved a package topic catalog instead of restoring the removed manifest.
- Next: Review and merge the PR.
- Blockers: none
