# feat-009 — Knowledge browser

## Goal

A user can browse, search, and deep-link V1 reference content (hexagrams, trigrams, terms, rules).

## Scope

- Implement the V1 work defined for F08 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F08 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: A user can browse, search, and deep-link V1 reference content (hexagrams, trigrams, terms, rules).
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F08-T01 — Build Library navigation with category tabs (Hexagrams, Trigrams, Terms, Rules)
- [ ] F08-T02 — Add trigram list
- [ ] F08-T03 — Add hexagram list
- [ ] F08-T04 — Add term list
- [ ] F08-T05 — Add rule list with category filters
- [ ] F08-T06 — Add local search input
- [ ] F08-T07 — Normalize supported names and aliases for search
- [ ] F08-T08 — Add clear no-results state
- [ ] F08-T09 — Add canonical detail page for each entity type
- [ ] F08-T10 — Show related entities and rule references
- [ ] F08-T11 — Show source metadata and locations
- [ ] F08-T12 — Support direct links to canonical detail content
- [ ] F08-T13 — Verify all V1 knowledge while offline

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-006`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
