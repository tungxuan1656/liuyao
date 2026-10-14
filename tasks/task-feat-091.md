# feat-091 - Review and improve BPCT questions Hà Tri casting supplements and criticisms

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-057](task-feat-057.md), [feat-058](task-feat-058.md), [feat-105](task-feat-105.md)
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

- [ ] Questions 1–6.
- [ ] Questions 7–12.
- [ ] Questions 13–18.
- [ ] Every Hà Tri heading.
- [ ] All actual transformation sections.
- [ ] All eighteen Tạp Sự cases.
- [ ] All eleven Tinh Sát sections.
- [ ] All fifteen criticisms and closing pages.
- [ ] Every materially changed assertion names its exact source passage; objections and their target authors are preserved.
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

Migrated from [feat-091](../features/feat-091.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
