# feat-092 - Review and improve classical traditions diagrams and all Hệ Từ chapters

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-059](task-feat-059.md), [feat-060](task-feat-060.md), [feat-061](task-feat-061.md), [feat-062](task-feat-062.md), [feat-105](task-feat-105.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- Review the assigned concepts, examples, and tables; record material content findings.

## Non-goals

New interpretation, calendar, or UI behavior. No unrelated refactors, record splits, ID or
route changes, or edits outside the assigned group.

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

[Content](../docs/product-specs/knowledge-content.md), [quality and agent execution gate](../docs/product-specs/knowledge-quality.md#agent-execution-gate),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Identify the useful explanations and tables in this group.
2. Review each section/table and record its material content findings.
3. Resolve every gate finding: repair supported defects, then re-verify the final revision.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence: Not executed.
- Next: Confirm dependencies, select this feature, then inspect its first unit.
- Blockers: not evaluated until owner selection and dependency check.

## Migration provenance

Migrated from [feat-092](../features/feat-092.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
