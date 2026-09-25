# feat-006 — Knowledge

## Goal

V1 entities, terms, rules, and sources are local, licensed, and validated.

## Scope

- Implement the V1 work defined for F05 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F05 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: V1 entities, terms, rules, and sources are local, licensed, and validated.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F05-T01 — Define knowledge entity, term, rule, source, and source-reference schemas
- [ ] F05-T02 — Define stable IDs for knowledge entities, terms, rules, sources, and source references
- [ ] F05-T03 — Add display metadata for all 8 trigrams
- [ ] F05-T04 — Add display metadata for all 64 hexagrams
- [ ] F05-T05 — Add V1 terminology required by result screens
- [ ] F05-T06 — Add V1 rule explanations for displayed deterministic facts
- [ ] F05-T07 — Add bibliographic source metadata
- [ ] F05-T08 — Add source locations when chapter, section, or page is known
- [ ] F05-T09 — Remove or rewrite unlicensed modern text
- [ ] F05-T10 — Validate duplicate IDs and broken references
- [ ] F05-T11 — Expose read-only lookup APIs
- [ ] F05-T12 — Expose local normalized search APIs

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
