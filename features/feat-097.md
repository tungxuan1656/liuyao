# feat-097 — Verify audit invalidation and future correction workflow

## Goal

Prove that future corrections reopen affected approvals.

## Scope

**Intended work:**

- Isolated approved fixtures, affected-unit invalidation, correction handoffs, and regenerated completion status before certification.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Record-content change.
- [ ] Source-fingerprint change.
- [ ] Citation/attribution change.
- [ ] New or reopened discrepancy.
- [ ] Release-membership and accepted project-contract revision changes.
- [ ] A changed supporting claim reopens dependent lesson, table, diagram, and example decisions transitively.
- [ ] Temporary probes close completion on affected approvals; unavailable or superseded support cannot preserve authority.
- [ ] Unchanged units retain valid evidence; restore all probes before verification.
- [ ] Isolated synthetic approvals test gate behavior without claiming real specialist review or requiring feat-096.
- [ ] Document a concrete correction route with focused re-review and specialist reapproval when affected.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Build isolated approved fixtures after feat-067; define each input-change probe.
2. Confirm affected evidence becomes stale and completion closes; restore each probe.
3. Verify unchanged decisions and document the correction/reapproval route.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Complete feat-067, select this feature, and assess external-plan criteria before coding.
