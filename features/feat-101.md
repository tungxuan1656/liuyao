# feat-101 — Complete extended knowledge records and provenance contracts

## Goal

Represent lessons, source figures, and project conventions with explicit reusable evidence dependencies.

## Scope

**Intended work:** Knowledge schemas, readonly types, public projections, release generation, and supported-version migration.

## Non-goals

Bulk authoring, calculation changes, web layout, remote storage, and specialist certification.

## Acceptance

- [ ] Implement the [extended record contract](../docs/design-docs/knowledge-model.md#intended-extended-records).
- [ ] Lesson blocks resolve supporting claims; declared sequence and prerequisites validate without missing IDs or cycles.
- [ ] Inventoried tables and diagrams retain unit evidence, orientation, and author alternatives.
- [ ] Project conventions identify accepted specification sections and revisions without fabricated book citations.
- [ ] Supporting dependencies require publishable evidence; navigation links retain distinct unavailable-target semantics.
- [ ] JSON Schema and public types agree; stable identities and existing compatibility consumers survive migration.
- [ ] Published payload excludes draft prose and exposes the [snapshot identity](../docs/design-docs/knowledge-model.md#intended-snapshot-identity).
- [ ] Required verification and migration/rejection evidence are recorded.

## Relevant docs

[Quality](../docs/product-specs/knowledge-quality.md), [content](../docs/product-specs/knowledge-content.md),
[architecture](../ARCHITECTURE.md), [verification](../docs/development.md).

## Plan

1. Use feat-043 inventory to select required representations and document supported-version migration.
2. Implement schema/type alignment, dependency checks, release projections, and snapshot generation.
3. Verify legacy compatibility and rejection fixtures; commit coherent contract checkpoints.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Package tests for migration, supporting references, project evidence, and draft-free runtime output.

## Handoff

- State: todo.
- Evidence: Planning recorded; implementation has not started.
- Dependencies: See [feature index](../feature_index.json).
- Next: Complete feat-043, select this feature, and assess external-plan criteria before coding.
