# feat-066 — Close the authoring inventory for all supplied sections

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- The source inventory, every released collection, remaining legacy entries, and exclusions.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Every supplied section, including later workload splits.
- [ ] Every included unit has complete released coverage; each exclusion has a reviewed specific reason.
- [ ] No unowned or unreviewed unit remains; all 64 quẻ have six positions in the three commentary books.
- [ ] Reconcile topics, legacy routes, and nextBatch without claiming independent certification.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
