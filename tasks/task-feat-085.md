# feat-085 - Review and improve all sixty-nine BPCT chapter 6 sentences

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-040](task-feat-040.md), [feat-041](task-feat-041.md), [feat-044](task-feat-044.md), [feat-045](task-feat-045.md), [feat-046](task-feat-046.md), [feat-047](task-feat-047.md), [feat-048](task-feat-048.md), [feat-049](task-feat-049.md), [feat-050](task-feat-050.md), [feat-105](task-feat-105.md)
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

- [ ] Sentences 1–24.
- [ ] Sentences 25–48.
- [ ] Sentences 49–69.
- [ ] Every materially changed assertion names its exact source passage; conditions and author differences are preserved.
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

Migrated from [feat-085](../features/feat-085.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
