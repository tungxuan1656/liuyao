# task-review-and-improve-bpct-questions-ha-tri-casting-supplements-and-criticisms - Review and improve BPCT questions Hà Tri casting supplements and criticisms

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-eighteen-questions-and-ha-tri-chuong](task-complete-bpct-eighteen-questions-and-ha-tri-chuong.md), [task-complete-bpct-casting-supplements-and-book-criticisms](task-complete-bpct-casting-supplements-and-book-criticisms.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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
