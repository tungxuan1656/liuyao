# feat-067 — Implement versioned audit ledgers and completion gates

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

Follow the [approved audit contract](../docs/design-docs/knowledge-model.md#approved-versioned-audit-contract) and [implementation plan](../docs/plans/feat-067.md). The audit tooling is implemented and verified; this does not claim real corpus review or specialist approval.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check`
- Optional local source-file check when supplied PDFs are available: `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: done for implementation and verified acceptance; PR #63 awaits final lifecycle-head CI and merge.
- Evidence: Exact-SHA review at `9a347b3` closed F1/F2/F3/F7 with no material findings; 37 focused tests passed. Coordinator receipt and protected-file comparison are in the [plan](../docs/plans/feat-067.md). Audit gates remain closed: 2,057 required targets, zero decisions, 0/1,226 released claims covered, and no certification. Independent sign-off is implemented as a gate; no reviewer approval or real source audit is claimed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Merge PR #63 after final lifecycle-head CI passes, then activate feat-097 for the correction drill.
