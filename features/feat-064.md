# feat-064 — Resolve the six remaining legacy project definitions

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- Legacy term-ruleset, term-primary-hexagram, term-changed-hexagram, term-line-value.
- Legacy rule-reading-result-fields and rule-line-polarity-values.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Each of the four terms and two rules, with a stable replacement route.
- [ ] Separate book-supported meaning from accepted software conventions.
- [ ] Use the project contract for software fields; do not invent book citations.
- [ ] Persist convention evidence and reviewed specification revisions through the implemented feat-101 contract.
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
