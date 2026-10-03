# feat-101 — Extended knowledge contracts

## Goal

Represent extended records, evidence dependencies, and release identity.

## Scope and non-goals

Implement versioned schemas, non-mutating V1 upcast, evidence validation, release projection, and snapshot identity. Exclude bulk content, calculations, web/PWA behavior, and specialist certification.

## Acceptance

- [x] Implement the approved [record](../docs/design-docs/knowledge-model.md#approved-extended-record-contract) and [release](../docs/design-docs/knowledge-model.md#approved-release-projection-and-snapshot-identity) contracts.
- [x] Validate lesson blocks, evidence, ordering, prerequisites, targets, and cycles at build time and runtime.
- [x] Preserve figure/table evidence, orientation, source references, and alternatives.
- [x] Validate project-convention evidence against registered sections and revisions without fabricated book citations.
- [x] Keep evidence dependencies distinct from navigation and withhold unavailable-target details.
- [x] Keep schemas, readonly public types, V1 migration, and compatibility APIs consistent.
- [x] Generate a release-only payload without local paths or draft prose, with snapshot identity.
- [x] Record test and verification evidence in the [plan](../docs/plans/feat-101.md).

Criteria pass; feat-101 stays active pending review, CI/PR, and coordinator decision.

## Evidence and limits

- Tests: C1 18; C2 107; knowledge 171; full suite 352 (181 core, 171 knowledge).
- Format, lint, typecheck, test, build, corpus, book, and init checks passed. Four baseline lint warnings remain; six new-test warnings were fixed. 173 protected V1 records/schema files are unchanged.
- No V2 content was authored. Structural evidence is not certification, specialist approval, or audit binding. Web/PWA, scale, and offline behavior are excluded.
- Independent review, CI/PR, and final acceptance remain pending. Keep active.

## Handoff

- State: active; implementation and validation pass, delivery review remains.
- See the [knowledge model](../docs/design-docs/knowledge-model.md#implemented-surface-and-limits) and [plan](../docs/plans/feat-101.md) for implementation evidence.
- Blockers: Review, CI/PR, and acceptance.
- Next: Coordinator commits the verified batch for risk review.
