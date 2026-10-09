# feat-092 — Review and improve classical traditions diagrams and all Hệ Từ chapters

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- Review the assigned concepts, examples, and tables; record material content findings.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] NHL chapters 1–7, front matter, Part II introduction, and retrospective.
- [ ] NTT translator, Trình Di, Chu Hy diagrams, Cương Lĩnh, and colophon.
- [ ] PBC front/end matter and surviving Thuyết/Tự/Tạp Quái.
- [ ] Hệ Từ Thượng: each of twelve chapters in both NHL and PBC.
- [ ] Hệ Từ Hạ: each of twelve chapters in both NHL and PBC.
- [ ] Record each diagram and author layer separately; never imply edition omissions were recovered.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Identify the useful explanations and tables in this group.
2. Review each section/table and record its material content findings.
3. Verify all unit decisions and close only after rejected units are repaired.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
