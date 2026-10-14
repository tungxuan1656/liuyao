# feat-102 - Check knowledge presentation across package and web flows

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-098](task-feat-098.md), [feat-099](task-feat-099.md), [feat-100](task-feat-100.md)
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

## Migration provenance

Migrated from [feat-102](../features/feat-102.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
