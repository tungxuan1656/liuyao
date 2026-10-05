# feat-096 — Certify corpus completion against the evidence gates

## Goal

Mark the dataset complete only when all recorded evidence gates pass.

## Scope

**Intended work:**

- The complete authored and independently audited dataset, generated coverage, and release manifest.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Full source classification and complete in-scope coverage.
- [ ] 64 quẻ, 384 positions, minimum 1,152 three-book cells, and special passages.
- [ ] All group ledgers, fixtures, source fingerprints, and verification decisions under the [AI review policy](../docs/product-specs/knowledge-quality.md#group-units-and-independent-evidence).
- [ ] Run the implemented completion gates; any stale or missing evidence rejects certification.
- [ ] Feat-097 correction probes passed before certification; the released snapshot matches all approval inputs.
- [ ] Remove unaudited legacy fallback, or explicitly classify retained software conventions.
- [ ] Record edition-bound accuracy and remaining source limitations; do not assert predictive efficacy or absolute certainty.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm all audit and verification decisions match the released snapshot.
2. Run completion gates and inspect every required coverage total.
3. Record source limitations, verify, and commit the certified snapshot.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
