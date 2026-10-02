# feat-060 — Complete NTT and PBC introductory traditions and diagrams

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NTT PDF 1–79 and final colophon 938; PBC PDF 1–17 and 649–655.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] NTT translator introduction and Trình Di preface.
- [ ] NTT Chu Hy diagrams (20–63).
- [ ] NTT Dịch Thuyết Cương Lĩnh (64–79).
- [ ] PBC introductions, Phàm Lệ, and end matter.
- [ ] PBC surviving Thuyết Quái, Tự Quái, Tạp Quái.
- [ ] Identify translator, commentator, and quoted-author roles.
- [ ] Diagram units use the implemented feat-101 representation with orientation and supporting claims.
- [ ] Record PBC’s absent Thuyết Quái chapter; NTT has no separate full Hệ Từ appendix.
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
