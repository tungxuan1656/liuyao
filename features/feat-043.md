# feat-043 — Inventory every supplied-book section and exclusion

## Goal

Make every supplied section visible before further bulk authoring.

## Scope

**Intended work:**

- All four fingerprinted editions: BPCT 467, PBC 655, NTT 938, NHL 393 PDF pages.
- Intended artifact: docs/reviews/knowledge/source-inventory.md; map sections to records, exclusions, and owning features.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] BPCT Parts I–III, including the unnumbered Niên Thời section and chapter 20 supplement.
- [ ] PBC front matter, 64 quẻ, Hệ Từ, surviving Thuyết/Tự/Tạp Quái, and end matter.
- [ ] NTT front matter, Trình Di preface, Chu Hy diagrams, Cương Lĩnh, and 64 quẻ.
- [ ] NHL front matter, seven introductory chapters, 64 quẻ, Hệ Từ, and end matter.
- [ ] Every page belongs to a section; blanks, diagrams, and incomplete passages have explicit dispositions.
- [ ] Each meaningful section has an authoring and audit owner. Split oversized work before activation; never leave an unowned unit.
- [ ] Distinguish PDF pages from printed numbers. Confirm all planning anchors and absent headings.
- [ ] Preserve reviewed records; identify their uncovered passages and existing exclusions.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Inspect all section headings and page boundaries.
2. Map every unit to records, exclusions, and authoring/audit owners.
3. Review missing units and workload splits, verify, and commit.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
