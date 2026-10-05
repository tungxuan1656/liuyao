# feat-084 — Audit sources shared foundations casting and Liu Yao tables

## Goal

Audit each assigned unit.

## Scope

**Intended work:**

- Intended group ledgers under docs/reviews/knowledge/; enumerate every assigned inventory unit.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Four edition fingerprints, exact citations, and original summaries under the [publication gate](../docs/product-specs/knowledge-quality.md#publication-gate).
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
- [ ] BPCT chapters 1–5 and front matter: all inventory dispositions.
- [ ] Use source-derived fixtures independent of liuyao-core.
- [ ] Decisions have current hashes, exact locators, findings, and reviewer identity; rejected units stay open.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Create the complete unit checklist for this group.
2. Review and commit each section/table checkpoint with current hashes and findings.
3. Resolve rejected units and verify every decision.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
