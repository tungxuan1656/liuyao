# feat-101 — Extended knowledge contracts

> Historical implementation. The [simplified knowledge model](../docs/design-docs/knowledge-model.md#migration-history) supersedes the former audit and provenance machinery. Preserve completed evidence; do not extend that machinery.

## Goal

Represent versioned knowledge records and evidence.

## Scope and non-goals

Implement versioned schemas, V1 upcast, evidence checks, release projection, and snapshot identity. Exclude bulk content, calculations, UI, and specialist certification.

## Acceptance

- [x] Implement the approved [record](../docs/design-docs/knowledge-model.md#record-contract) and [release](../docs/design-docs/knowledge-model.md#generated-files) contracts.
- [x] Validate lesson evidence, ordering, prerequisites, targets, and cycles at build time and runtime.
- [x] Preserve figure/table evidence, orientation, and alternatives.
- [x] Validate project-convention evidence against registered sections and revisions without fabricated book citations.
- [x] Separate evidence dependencies from navigation; withhold unavailable targets.
- [x] Keep schemas, readonly public types, V1 migration, and compatibility APIs consistent.
- [x] Generate a release-only payload without local paths or draft prose; include snapshot identity.
- [x] Record test and verification evidence in the [plan](../docs/plans/feat-101.md).

Implementation criteria pass. PR #62 awaits final-head CI and merge.

## Evidence and limits

- Tests: C1 18; C2 107; knowledge 173; full suite 354 (181 core, 173 knowledge).
- Format, lint, typecheck, test, build, corpus, book, and init passed. Four baseline lint warnings remain; six new-test warnings were fixed. 173 V1 files are unchanged.
- No V2 content was authored. Structural evidence is not certification, specialist approval, or audit binding. UI and scale are excluded.
- No specialist approval, audit binding, or corpus certification is claimed. PR #62 final-head CI and merge remain pending.

## Handoff

- State: done for implementation and local validation; PR #62 merge remains pending.
- Evidence: Reviewed SHA `ae1d1f5c647408bc38d9fa2cffe6db80f54c84c1`; init receipt and checks are in the [plan](../docs/plans/feat-101.md). PR #62 CI run `37130792089`, job `111225312559`, passed.
- Limits: No V2 content, feat-095 approval, feat-067 audit gates, or corpus certification is claimed.
- Next: Coordinator checks CI on the final lifecycle commit and merges PR #62.
