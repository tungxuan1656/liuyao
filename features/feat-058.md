# feat-058 — Complete BPCT casting supplements and book criticisms

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II chapter 3, PDF 429–457; Part III, PDF 458–467.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Observed transformation headings I, II, IV and actual examples (429–435).
- [ ] All eighteen Tạp Sự cases (435–451).
- [ ] All eleven Tinh Sát sections (451–457).
- [ ] All fifteen criticisms and closing pages (458–467).
- [ ] Check missing numbering and shared-page continuations; do not invent unprinted transformation rows.
- [ ] Preserve criticised views and objections separately with named textual layers.
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
