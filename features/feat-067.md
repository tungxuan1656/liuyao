# feat-067 — Implement versioned audit ledgers and completion gates

## Goal

Make audit completeness and stale-evidence rejection machine-checkable.

## Scope

**Intended work:**

- Intended review artifacts under docs/reviews/knowledge/, linked to record and citation IDs.
- Knowledge validation, generated coverage, schema contracts, and package tests.

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

1. Agree the ledger schema after inventory and feat-101, before bulk authoring.
2. Implement validators, evidence-derived reports, and rejection tests.
3. Verify missing/stale evidence probes and commit.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Complete feat-101, select this feature, and assess external-plan criteria before coding.
