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

- Coordinator `./init.sh` receipt `sh_1065aa617001KhSL6yo2WJaB6D`: 405 tests (181 core, 224 knowledge), format, lint (0 errors; 4 baseline warnings), typecheck, build, exports, placement, length, and corpus/book freshness passed.
- Exact-head review at `4b7ea6b9121ac03b9afe6c35514e2d0d9d39ed0c`: F1/F2 closed with no material findings. Focused follow-up (2), correction suite (14), knowledge tests (224), typecheck, lint/format, and diff checks passed.
- 177 protected assets and both audit reports remain byte-identical; zero real audit decisions and no certification exist.

## Handoff

- State: done for implementation and locally verified acceptance; final PR delivery is pending.
- Evidence: Exact-head review `4b7ea6b9121ac03b9afe6c35514e2d0d9d39ed0c` closed F1/F2 without material findings. Coordinator init and fresh pre-push validation passed; all 14 synthetic probes pass. Synthetic approvals remain in memory only. Validators are unchanged; no actual qualified review, audit decisions, or corpus certification is claimed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Complete current-head PR #64 CI and merge; then continue the feat-044 batch order. Watcher `sh_10673bc1d001Pmek1pV6cbOcRf` is pending; the earlier `a534eac` CI pass does not verify this head.
