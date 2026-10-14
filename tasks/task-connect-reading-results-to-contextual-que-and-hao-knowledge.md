# task-connect-reading-results-to-contextual-que-and-hao-knowledge - Connect reading results to contextual quẻ and hào knowledge

- Status: done
- Owner: Agent
- Required to start: [task-integrate-reviewed-reference-records-into-library-details](task-integrate-reviewed-reference-records-into-library-details.md), [task-result-view](task-result-view.md), [task-correct-changed-result-facts-and-library-links](task-correct-changed-result-facts-and-library-links.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Open the correct source explanation from a reading's primary or changed quẻ and selected hào.

## Scope

**Intended work:** Result controls, context selection, shared commentary presentation, and canonical Library links.

## Non-goals

Changing core results, generating predictions, adding calendar analysis, or authoring new source claims.

## Acceptance

- [x] Implement the [result reference contract](../docs/product-specs/reading-result.md#book-reference-contexts).
- [x] Quẻ overviews use the displayed ID; hào explanations also use the domain position, including 1 and 6.
- [x] Primary/changed contexts, moving/static labels, and no-change behavior remain distinct.
- [x] Selected commentary retains attribution, conditions, and citations from task-integrate-reviewed-reference-records-into-library-details presentation.
- [x] Fact-rule explanations preserve their own supporting records and distinguish accepted project conventions.
- [x] Unavailable commentary preserves the result and offers a clear recovery path.
- [x] Library round trips preserve the active reading and reach the same quẻ/position.
- [x] Compact/wide interactions, keyboard dismissal, and focus restoration pass.
- [x] Required verification and implementation evidence are recorded.

## Relevant docs

[Library](../docs/product-specs/knowledge-browser.md), [scope](../docs/product-specs/product-scope.md),
[architecture](../ARCHITECTURE.md), [verification](../docs/development.md).

## Plan

1. Trace `result-view.tsx`, `result-board.tsx`, and `result-facts.tsx` context and navigation.
2. Reuse released lookups and task-integrate-reviewed-reference-records-into-library-details presentation for correctly identified quẻ/position contexts.
3. Verify no/single/multiple moving-line cases and unavailable records; commit the result integration.

## Verify

- `./init.sh`
- Package checks for changed reusable context mappings, with explicit expected IDs/positions.
- Direct compact/wide and offline result-to-Library checks under the development contract.

## Handoff

- Evidence: Added `resolveReadingReferenceContext` in `@liuyao/knowledge` with comprehensive tests (`packages/knowledge/tests/context.test.ts`). Integrated `ResultKnowledgeInspector` in web app reusing `KnowledgeEntries` for quẻ overview and hào lines with explicit position navigation, attribution, conditions, and deep links to Library details. Connected `HexagramBoard` and `ResultView` line items to contextual inspector. Added project convention badge and source detail links for fact rules. Verified via `./init.sh`.
- Next: Advance to the next scheduled task in the roadmap.
- Blockers: none.
