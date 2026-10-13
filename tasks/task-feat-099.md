# feat-099 - Connect reading results to contextual quẻ and hào knowledge

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-098](task-feat-098.md), [feat-008](task-feat-008.md), [feat-022](task-feat-022.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Open the correct source explanation from a reading's primary or changed quẻ and selected hào.

## Scope

**Intended work:** Result controls, context selection, shared commentary presentation, and canonical Library links.

## Non-goals

Changing core results, generating predictions, adding calendar analysis, or authoring new source claims.

## Acceptance

- [ ] Implement the [result reference contract](../docs/product-specs/reading-result.md#intended-book-reference-contexts).
- [ ] Quẻ overviews use the displayed ID; hào explanations also use the domain position, including 1 and 6.
- [ ] Primary/changed contexts, moving/static labels, and no-change behavior remain distinct.
- [ ] Selected commentary retains attribution, conditions, and citations from feat-098 presentation.
- [ ] Fact-rule explanations preserve their own supporting records and distinguish accepted project conventions.
- [ ] Unavailable commentary preserves the result and offers a clear recovery path.
- [ ] Library round trips preserve the active reading and reach the same quẻ/position.
- [ ] Compact/wide interactions, keyboard dismissal, and focus restoration pass.
- [ ] Required verification and implementation evidence are recorded.

## Relevant docs

[Library](../docs/product-specs/knowledge-browser.md), [scope](../docs/product-specs/product-scope.md),
[architecture](../ARCHITECTURE.md), [verification](../docs/development.md).

## Plan

1. Trace `result-view.tsx`, `result-board.tsx`, and `result-facts.tsx` context and navigation.
2. Reuse released lookups and feat-098 presentation for correctly identified quẻ/position contexts.
3. Verify no/single/multiple moving-line cases and unavailable records; commit the result integration.

## Verify

- `./init.sh`
- Package checks for changed reusable context mappings, with explicit expected IDs/positions.
- Direct compact/wide and offline result-to-Library checks under the development contract.

## Handoff

- Evidence: Design recorded; implementation and web verification have not started.
- Next: Complete feat-098, select this feature, and assess external-plan criteria before coding.
- Blockers: not evaluated until owner selection and dependency check.

## Migration provenance

Migrated from [feat-099](../features/feat-099.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
