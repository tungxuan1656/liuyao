# feat-097 — Verify audit invalidation and future correction workflow

## Goal

Prove that future corrections reopen affected approvals.

## Scope

**Intended work:**

- Isolated approved fixtures, affected-unit invalidation, correction handoffs, and regenerated completion status before certification.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Record-content change.
- [x] Source-fingerprint change.
- [x] Citation/attribution change.
- [x] New or reopened discrepancy.
- [x] Release-membership and accepted project-contract revision changes.
- [x] A changed supporting claim reopens dependent lesson, table, diagram, and example decisions transitively.
- [x] Temporary probes close completion on affected approvals; unavailable or superseded support cannot preserve authority.
- [x] Unchanged units retain valid evidence; restore all probes before verification.
- [x] Isolated synthetic approvals test gate behavior without claiming real specialist review or requiring feat-096.
- [x] Document a concrete correction route with focused re-review and specialist reapproval when affected.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md),
[correction workflow](../docs/reviews/knowledge/correction-workflow.md).

## Plan

1. Build isolated approved fixtures; keep synthetic reviewer and certification metadata in memory only.
2. Probe record, citation, edition, discrepancy, support-closure, fixture, project-contract, release, registry, and history changes.
3. Confirm affected evidence becomes stale and completion closes; restore every probe and confirm unaffected evidence remains current.
4. Document the correction/reapproval route.

## Verify

- `./init.sh` — coordinator receipt `sh_1065aa617001KhSL6yo2WJaB6D`.
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` — passed.
- Confirm protected assets and audit-status/coverage reports remain byte-identical.

## Handoff

- State: active; implementation criteria and local verification pass; final review and CI remain pending.
- Evidence: 14 synthetic correction probes pass; coordinator `./init.sh` receipt passes 405 tests (181 core, 224 knowledge), format, lint (0 errors; 4 baseline warnings), typecheck, build, exports, placement, length, and corpus/book freshness. 177 protected assets and both audit reports are unchanged. No actual decisions or certification exist; validators are unchanged.
- Dependencies: See [feature index](../feature_index.json).
- Next: Commit this immutable test-proof, request final review, and complete PR CI; keep feat-097 active until coordinator acceptance.
