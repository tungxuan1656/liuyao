# feat-057 — Complete BPCT eighteen questions and Hà Tri Chương

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II, chapters 1–2; PDF 365–428.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Questions 1–6.
- [ ] Questions 7–12.
- [ ] Questions 13–18.
- [ ] Every Hà Tri Chương heading, explanation, and note.
- [ ] Give each question and subordinate passage its own inventory disposition.
- [ ] Distinguish the question, attributed experiment, example, and general conditional rule.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and commit each six-question checkpoint.
2. Review and commit Hà Tri Chương.
3. Reconcile overlap with existing claims and verify all dispositions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
