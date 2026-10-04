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

- [ ] Source units, six line units per quẻ, three-book cells, author layers, group decisions, and independent sign-off.
- [ ] Agree the ledger schema before implementation; preserve the existing publication and package contracts.
- [ ] Incremental decisions use source-inventoried expected units; unfinished units keep global gates closed.
- [ ] Bind decisions to fingerprints, claims, citations, record hashes, membership, and project-contract revisions.
- [ ] Supporting-claim changes invalidate dependent lessons, tables, diagrams, and fixtures transitively.
- [ ] Apply feat-101 publication rules for supporting dependencies and unavailable navigation targets.
- [ ] Replace the hardcoded complete=false report with evidence-derived gates that remain closed on missing or stale evidence.
- [ ] Failure tests reject missing layers, unresolved units, stale support, cycles, and absent specialist approval.
- [ ] CI enforces input fingerprints, generated freshness, and implemented evidence gates.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

Follow the [approved audit contract](../docs/design-docs/knowledge-model.md#approved-versioned-audit-contract) and [implementation plan](../docs/plans/feat-067.md). The implementation exists; all original acceptance criteria remain pending final review and delivery gates.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check`
- Optional local source-file check when supplied PDFs are available: `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: active; implementation and local verification are recorded, but acceptance remains open.
- Evidence: Coordinator receipt `sh_10575faea001SigKv3L0CXTuyy` passed `./init.sh`: 387 tests (181 core, 206 knowledge), format, lint (0 errors; 4 baseline warnings), typecheck, build, exports, placement, length, and corpus/book freshness. All 175 protected files remain unchanged. `--require-complete` exited 1 as expected with both gates closed: 2,057 decisions missing, zero current, 0/1,226 released claims covered, and certification absent. No source audit or approval is claimed; exact-SHA review and CI/PR remain pending. See the [plan](../docs/plans/feat-067.md).
- Dependencies: See [feature index](../feature_index.json).
- Next: Obtain the coordinator's fresh `./init.sh` receipt, then complete exact-SHA review and CI/PR; keep feat-067 active until all original acceptance criteria and delivery gates pass.
