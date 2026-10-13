# feat-103 - Check knowledge payload and offline delivery

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-102](task-feat-102.md), [feat-011](task-feat-011.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Keep the actual published knowledge fast to open and usable offline.

## Scope

Production assets, startup loading, record loading, cache completeness, and the existing update flow.

## Acceptance

- [ ] The initial JavaScript contains compact lookups and metadata, not detailed full-corpus prose.
- [ ] Record JSON assets load by ID and work through direct routes.
- [ ] Raw/gzip sizes, largest record, and total offline assets are measured.
- [ ] Local search, record opening, and memory are checked in a representative browser.
- [ ] The complete published library works after its offline assets finish caching.
- [ ] Interrupted retrieval and updates preserve cached content and reading drafts.
- [ ] Relevant checks and ./init.sh pass.

## Relevant docs

[Delivery](../docs/design-docs/offline-pwa.md#knowledge-delivery),
[model](../docs/design-docs/knowledge-model.md#generated-files), [verification](../docs/development.md).

## Handoff

- Next: Select this check after the affected web flows exist. Feat-068 already measures its own loading migration.
- Evidence: not executed; migration does not activate this task.
- Blockers: not evaluated until owner selection and dependency check.

## Migration provenance

Migrated from [feat-103](../features/feat-103.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
