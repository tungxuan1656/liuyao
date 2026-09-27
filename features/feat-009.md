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

- [x] F08-T01 — Build Library navigation with category tabs (Hexagrams, Trigrams, Terms, Rules)
- [x] F08-T02 — Add trigram list
- [x] F08-T03 — Add hexagram list
- [x] F08-T04 — Add term list
- [x] F08-T05 — Add rule list with category filters
- [x] F08-T06 — Add local search input
- [x] F08-T07 — Normalize supported names and aliases for search
- [x] F08-T08 — Add clear no-results state
- [x] F08-T09 — Add canonical detail page for each entity type
- [x] F08-T10 — Show related entities and rule references
- [x] F08-T11 — Show source metadata and locations
- [x] F08-T12 — Support direct links to canonical detail content
- [x] F08-T13 — Verify all V1 knowledge while offline

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-006`

## Handoff

- State: active; implementation, browser checks, and search audit complete; coordinator validation pending.
- Evidence: `./init.sh` passed format, lint (one existing `button.tsx` warning), typecheck, build, package exports, and 196 package tests. Agent-browser compact viewport (390×844) and wide viewport (1440×900) confirmed list totals 64 hexagrams, 8 trigrams, 55 terms, 10 rules; alias query `heaven` found Qian; unmatched query showed “No entries found”; direct hexagram and rule detail URLs loaded, and rule source metadata/location displayed; trigram related link opened canonical hexagram detail. Built preview offline reload of `/library` and `/library/hexagram/hexagram-01` succeeded with content. `pnpm --filter @liuyao/knowledge test -- search.test.ts` passed 41 tests; search normalization for names/aliases is covered, and stable IDs are not required by the canonical task map.
- Dependency check: passed; feat-001 and feat-006 are done.
- Next: Coordinator reviews implementation and verification evidence. Term-to-rule associations remain unavailable in existing catalog data.
