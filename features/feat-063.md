# feat-063 — Reconcile Càn and Khôn special classical passages

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- The complete Càn/Khôn chapters in NHL, PBC, and NTT; use the existing exact locators.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Dụng cửu, Dụng lục, Văn Ngôn, and other actual special headings.
- [ ] Keep special passages outside the six-position line inventory.
- [ ] Reconcile selected existing summaries with all supplied commentary layers.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
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
