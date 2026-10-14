# task-complete-extended-knowledge-records-and-provenance-contracts - Complete extended knowledge records and provenance contracts

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-inventory-every-supplied-book-section-and-exclusion](task-inventory-every-supplied-book-section-and-exclusion.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Historical context

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
- [x] Record test and verification evidence in the [plan](../docs/plans/task-complete-extended-knowledge-records-and-provenance-contracts.md).

Implementation criteria pass. PR #62 awaits final-head CI and merge.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done for implementation and local validation; PR #62 merge remains pending.
- Evidence: Reviewed SHA `ae1d1f5c647408bc38d9fa2cffe6db80f54c84c1`; init receipt and checks are in the [plan](../docs/plans/task-complete-extended-knowledge-records-and-provenance-contracts.md). PR #62 CI run `37130792089`, job `111225312559`, passed.
- Limits: No V2 content, task-review-knowledge-meaning-and-source-attribution approval, task-implement-versioned-audit-ledgers-and-completion-gates audit gates, or corpus certification is claimed.
- Next: Coordinator checks CI on the final lifecycle commit and merges PR #62.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-03 — task-complete-extended-knowledge-records-and-provenance-contracts lifecycle finalization

**State**: done for implementation/local validation; PR #62 awaits final-head CI and merge.
**Done**: Set task-complete-extended-knowledge-records-and-provenance-contracts done after all implementation criteria and reviewed-SHA verification passed; preserved certification and authoring boundaries.
**Evidence**: Reviewed SHA `ae1d1f5c647408bc38d9fa2cffe6db80f54c84c1`; init `sh_102393ac4001AJk2OSBMttFf5u` passed with 354 tests (181 core, 173 knowledge), typecheck/build/exports/length/lint (4 baseline warnings), corpus/book freshness, and locale checks. 173 protected V1 files are unchanged. PR #62 CI run `37130792089`, job `111225312559`, passed.
**Blockers**: Final-head CI and merge; no V2 content, independent task-review-knowledge-meaning-and-source-attribution approval, task-implement-versioned-audit-ledgers-and-completion-gates audit, or corpus certification is claimed.
**Next**: Coordinator verifies CI on this lifecycle commit and merges PR #62.
