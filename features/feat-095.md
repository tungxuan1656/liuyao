# feat-095 — Verify the full corpus with AI models

## Goal

Obtain explicit AI verification approval for the reviewed snapshot.

## Scope

**Intended work:**

- Separate AI review runs and the frozen audit snapshot under the [verification policy](../docs/product-specs/knowledge-quality.md#group-units-and-independent-evidence).

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] All 64 quẻ and 384 positions, with three-book cells and actual commentator layers.
- [ ] Every foundation, table, application, tradition, lesson, and exclusion ledger.
- [ ] Record model provider, model ID, review-run identity, role, date, scope, hashes, findings, and explicit unit-level decisions.
- [ ] Resolve rejected units and repeat affected reviews before approval.
- [ ] AI review passes are separate from authoring and source comparison; a different model and human specialist review are optional.
- [ ] Missing review remains pending; model names, automated tests, and synthetic approvals do not establish actual verification.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Freeze the completed audit snapshot and identify the AI reviewer model and review run.
2. Review supplied passages and current inputs, record unit decisions, and resolve rejected findings.
3. Obtain explicit verification approval for the corrected snapshot, verify, and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
