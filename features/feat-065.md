# feat-065 — Author ordered lessons and reviewed worked examples

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- Original Vietnamese learning content based on released reviewed claims.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Foundations: polarity, positions, trigrams, construction.
- [ ] Classical reading: passage types, six positions, author alternatives.
- [ ] Liu Yao board: casting, palaces, Thế/Ứng, Na Jia, elements, relatives.
- [ ] Worked examples: explicit inputs, moving lines, changed quẻ, board facts.
- [ ] Every block resolves to supporting claim IDs; expected outcomes are checked independently.
- [ ] Reference content does not activate browser, calendar, or interpretation changes.
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
