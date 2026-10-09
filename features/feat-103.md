# feat-103 — Check knowledge payload and offline delivery

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

- State: todo; not activated.
- Dependencies: See [feature index](../feature_index.json).
- Next: Select this check after the affected web flows exist. Feat-068 already measures its own loading migration.
