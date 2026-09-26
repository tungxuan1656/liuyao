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

- [x] Complete all F05 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: V1 entities, terms, rules, and sources are local, licensed, and validated.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F05-T01 — Define knowledge entity, term, rule, source, and source-reference schemas
- [x] F05-T02 — Define stable IDs for knowledge entities, terms, rules, sources, and source references
- [x] F05-T03 — Add display metadata for all 8 trigrams
- [x] F05-T04 — Add display metadata for all 64 hexagrams
- [x] F05-T05 — Add V1 terminology required by result screens
- [x] F05-T06 — Add V1 rule explanations for displayed deterministic facts
- [x] F05-T07 — Add bibliographic source metadata
- [x] F05-T08 — Add source locations when chapter, section, or page is known
- [x] F05-T09 — Remove or rewrite unlicensed modern text
- [x] F05-T10 — Validate duplicate IDs and broken references
- [x] F05-T11 — Expose read-only lookup APIs
- [x] F05-T12 — Expose local normalized search APIs

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`

## Plan and evidence

- Implementation plan and decision log: `docs/plans/feat-006.md` (plan-only commit `50aef2e`).
- Package tests: 34 knowledge tests in 6 files cover schema/IDs, independent 8/64 metadata, exhaustive result field-to-rule coverage, source links, lookup immutability, and normalized search.
- Full `./init.sh` passed format, lint, TypeScript length, typecheck, build, 34 knowledge tests, and 153 core tests. One pre-existing non-failing web `react-refresh` warning remains at `apps/web/src/components/ui/button.tsx:49`.
- First harness run failed on a missing optional native Tailwind binding in this checkout. `pnpm install --frozen-lockfile --force` restored it without source changes; fresh full verification passed.

## Handoff

- State: done locally; PR review and merge pending.
- Evidence: local tests and full harness pass; exact evidence and sourcing limitations are in `docs/plans/feat-006.md`.
- Dependency check: passed; feat-002 is done.
- Next: Submit the verified implementation for fresh plan and PR review, then resolve any findings before merge.
