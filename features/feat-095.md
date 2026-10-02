# feat-095 — Obtain independent specialist review of the full corpus

## Goal

Obtain explicit independent approval for the reviewed snapshot.

## Scope

**Intended work:**

- A named Liu Yao/Kinh Dịch reviewer, distinct from Codex source comparison, and the frozen audit snapshot.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] All 64 quẻ and 384 positions, with three-book cells and actual commentator layers.
- [ ] Every foundation, table, application, tradition, lesson, and exclusion ledger.
- [ ] Record reviewer identity, role, date, scope, hashes, findings, and explicit unit-level decisions.
- [ ] Resolve rejected units and repeat affected reviews before approval.
- [ ] If no specialist is available, leave acceptance open; never substitute another Codex pass.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Freeze the completed audit snapshot and identify the specialist reviewer.
2. Record the returned unit decisions and resolve rejected findings.
3. Obtain explicit approval for the corrected snapshot, verify, and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
