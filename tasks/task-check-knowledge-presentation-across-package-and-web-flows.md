# task-check-knowledge-presentation-across-package-and-web-flows - Check knowledge presentation across package and web flows

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-integrate-reviewed-reference-records-into-library-details](task-integrate-reviewed-reference-records-into-library-details.md), [task-connect-reading-results-to-contextual-que-and-hao-knowledge](task-connect-reading-results-to-contextual-que-and-hao-knowledge.md), [task-add-topic-article-and-learning-browsing-with-local-search](task-add-topic-article-and-learning-browsing-with-local-search.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Show each explanation in the correct quẻ, position, or article context with its source references.

## Scope

Package adapters, record/line links, table presentation, and direct web checks.

## Acceptance

- [ ] Satisfy the [runtime fidelity contract](../docs/product-specs/knowledge-quality.md#runtime-fidelity).
- [ ] Text, meaningful conditions, attribution, tables, diagrams, and references survive presentation.
- [ ] Primary/changed quẻ and positions 1–6 resolve against explicit expected contexts.
- [ ] Missing content and project conventions remain clear to the reader.
- [ ] Focused package cases reject swapped contexts, dropped conditions, and wrong sources.
- [ ] Compact/wide, keyboard, and offline checks cover the changed web flows.
- [ ] Relevant checks and ./init.sh pass.

## Relevant docs

[Library](../docs/product-specs/knowledge-browser.md), [result](../docs/product-specs/reading-result.md),
[model](../docs/design-docs/knowledge-model.md), [verification](../docs/development.md).

## Handoff

- Next: Complete the affected web flows, then select this presentation check.
- Evidence: not executed; migration does not activate this task.
- Blockers: not evaluated until owner selection and dependency check.
