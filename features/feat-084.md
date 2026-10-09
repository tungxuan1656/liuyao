# feat-084 — Review and improve sources shared foundations casting and Liu Yao tables

## Goal

Review and improve the assigned knowledge content.

## Scope

**Intended work:**

- Review the assigned concepts, examples, and tables; record material content findings.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Correct supplied-edition references and original summaries under the [publication gate](../docs/product-specs/knowledge-quality.md#publication-gate).
- [ ] Vocabulary, aliases, and the six project definitions.
- [ ] All eight trigram patterns and attributed associations.
- [ ] Casting, moving lines, and every supplied transformation example.
- [ ] Càn palace: all eight boards and every line annotation.
- [ ] Khảm palace: all eight boards and every line annotation.
- [ ] Cấn palace: all eight boards and every line annotation.
- [ ] Chấn palace: all eight boards and every line annotation.
- [ ] Tốn palace: all eight boards and every line annotation.
- [ ] Ly palace: all eight boards and every line annotation.
- [ ] Khôn palace: all eight boards and every line annotation.
- [ ] Đoài palace: all eight boards and every line annotation.
- [ ] 48 Na Jia pairs, twelve branch elements, 25 element relations.
- [ ] Ten stems, six spirits, and sourced table exceptions.
- [ ] BPCT chapters 1–5 and front matter: useful sourced explanations.
- [ ] Use source-derived fixtures independent of liuyao-core.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Identify the useful explanations and tables in this group.
2. Review each section/table and record its material content findings.
3. Resolve supported corrections and check useful content and links.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
