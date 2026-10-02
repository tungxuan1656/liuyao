# feat-097 — Verify audit invalidation and future correction workflow

## Goal

Prove that future corrections reopen affected approvals.

## Scope

**Intended work:**

- Affected-unit invalidation, source-edition changes, correction handoffs, and regenerated completion status.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Record-content change.
- [ ] Source-fingerprint change.
- [ ] Citation/attribution change.
- [ ] New or reopened discrepancy.
- [ ] Use temporary mutation probes to show each affected approval becomes stale and completion closes.
- [ ] Unchanged units retain valid evidence; restore all probes before verification.
- [ ] Document a concrete correction route with focused re-review and specialist reapproval when affected.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Define temporary mutation probes for each input-change category.
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
- Next: Confirm dependencies, select this feature, then inspect its first unit.
