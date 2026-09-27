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
- [x] F08-T10 — Show related hexagram-trigram links; the catalog does not define term-rule associations.
- [x] F08-T11 — Display source metadata and locations where catalog references provide them; otherwise show an unavailable-state message. This does not claim complete source coverage.
- [x] F08-T12 — Support direct links to canonical detail content
- [x] F08-T13 — Verify all V1 knowledge while offline

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-006`

## Handoff

- State: done; PR #20 merged as `c18c1b379211c095987a919d295c5492b0b0dbdf`.
- Evidence: `./init.sh` passed format, lint (one pre-existing `button.tsx` warning), typecheck, build, package exports, and 41 knowledge-package tests. `search.test.ts` contains 3 passing tests covering normalization and name/alias search. Browser checks confirmed category totals (64 hexagrams, 8 trigrams, 55 terms, 10 rules), alias query `heaven` finding Qian, no-results state, and direct hexagram and rule detail URLs. A trigram-to-hexagram related link opened the canonical hexagram detail. Source metadata/location appeared for a rule with a catalog reference; the UI states when a detail has no source location. The catalog references only 10 rules and `term-trigram`; it has no hexagram/trigram references and no references for 54 of 55 terms. Do not treat missing mappings as implemented citations. Built-preview offline reload succeeded for `/library` and `/library/hexagram/hexagram-01`; other pages were not individually checked offline, though their catalog data is bundled and covered by the app precache.
- Dependency check: passed; feat-001 and feat-006 are done.
- Merge: PR #20 head `d5bdb631553971a71a44b4ecc48bb78d94e788a1` passed CI `verify` and GitGuardian, then merged at `c18c1b379211c095987a919d295c5492b0b0dbdf`.
- Known catalog limits: references cover only 10 rules and `term-trigram`; there are no hexagram/trigram references and no references for 54 of 55 terms. The catalog does not define term-rule associations. These gaps are not claimed as citations or implemented associations.
- Next: Activate feat-010 Settings, already selected by the user.
