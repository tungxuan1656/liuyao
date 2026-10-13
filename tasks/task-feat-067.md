# feat-067 - Implement versioned audit ledgers and completion gates

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-101](task-feat-101.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Historical context

> Historical implementation. The [simplified knowledge model](../docs/design-docs/knowledge-model.md#migration-history) supersedes the former audit and provenance machinery. Preserve completed evidence; do not extend that machinery.

## Goal

Make audit completeness and stale-evidence rejection machine-checkable.

## Scope

**Implemented surface:**

- Inventory-bound expected units, scoped ledgers, strict schemas, and optional certification loading under `docs/reviews/knowledge/`.
- Structural validation, input-freshness checks, closed-by-default gates, separate audit status, and package tests.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Source units, six line units per quẻ, three-book cells, author layers, group decisions, and independent sign-off.
- [x] Agree the ledger schema before implementation; preserve the existing publication and package contracts.
- [x] Incremental decisions use source-inventoried expected units; unfinished units keep global gates closed.
- [x] Bind decisions to fingerprints, claims, citations, record hashes, membership, and project-contract revisions.
- [x] Supporting-claim changes invalidate dependent lessons, tables, diagrams, and fixtures transitively.
- [x] Apply feat-101 publication rules for supporting dependencies and unavailable navigation targets.
- [x] Replace the hardcoded complete=false report with evidence-derived gates that remain closed on missing or stale evidence.
- [x] Failure tests reject missing layers, unresolved units, stale support, cycles, and absent specialist approval.
- [x] CI enforces input fingerprints, generated freshness, and implemented evidence gates.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

Follow the [approved audit contract](../docs/design-docs/knowledge-model.md#migration-history) and [implementation plan](../docs/plans/feat-067.md). The audit tooling is implemented and verified; this does not claim real corpus review or specialist approval.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check`
- Optional local source-file check when supplied PDFs are available: `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done for implementation and verified acceptance; PR #63 awaits final lifecycle-head CI and merge.
- Evidence: Exact-SHA review at `9a347b3` closed F1/F2/F3/F7 with no material findings; 37 focused tests passed. Coordinator receipt and protected-file comparison are in the [plan](../docs/plans/feat-067.md). Audit gates remain closed: 2,057 required targets, zero decisions, 0/1,226 released claims covered, and no certification. Independent sign-off is implemented as a gate; no reviewer approval or real source audit is claimed.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Merge PR #63 after final lifecycle-head CI passes, then activate feat-097 for the correction drill.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-04 — feat-067 implementation accepted

**State**: done for implementation and verified acceptance; PR #63 awaits final lifecycle-head CI and merge.
**Done**: Closed feat-067 implementation criteria after exact-SHA review and coordinator validation; retained open real-audit and certification gates.
**Evidence**: Reviewed SHA `9a347b365a554fd85767d0ece97b67d5a5fcdbea`; F1/F2/F3/F7 closed without material findings, 37 focused tests passed. `./init.sh` receipt `sh_105d93047001obGaDflxxH16W3` passed 391 tests (181 core, 210 knowledge), typecheck/build/exports/length/lint and corpus/book checks. CI run `37186502264` job `111389426336` passed. 175 protected files remain unchanged. Audit gates are closed: 2,057 decisions missing, 0/1,226 claims covered, no certification.
**Blockers**: Final lifecycle-head CI and PR #63 merge. No source audit or specialist approval is claimed.
**Next**: Merge PR #63 after final-head CI, then activate feat-097 for the correction drill.

## Migration provenance

Migrated from [feat-067](../features/feat-067.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
