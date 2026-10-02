# feat-094 — Close all topic audits contradictions and exclusions

## Goal

Close corpus-wide topic coverage and source-fidelity findings.

## Scope

**Intended work:**

- Source inventory, generated coverage, all quẻ/group ledgers, discrepancies, and exclusions.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Foundations and trigrams.
- [ ] Hexagrams and line commentary.
- [ ] Casting and Liu Yao foundations.
- [ ] Advanced Liu Yao.
- [ ] Classical traditions and learning.
- [ ] Every discrepancy, alternative reading, and exclusion.
- [ ] Every assigned source unit and claim has a current accepted decision, or a specifically reviewed exclusion.
- [ ] Report 64 quẻ, 384 positions, and at least 1,152 book-position cells; count extra author layers separately.
- [ ] A reviewer distinct from the original summarizer rechecks source corrections; preserve legitimate disagreements.
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
