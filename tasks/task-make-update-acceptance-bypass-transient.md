# task-make-update-acceptance-bypass-transient - Make update acceptance bypass transient

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-offline-hardening](task-offline-hardening.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Allow the intentional update reload without letting a failed update bypass draft protection later.

## Scope

- Bound update-acceptance state to the intentional update attempt.
- Preserve draft-safe update UX and the casting unload guard.
- Add regression coverage for rejected, failed, or no-op update application.

## Non-goals

- Change update cancellation or unrelated casting-draft behavior.

## Acceptance

- [x] Failed or no-op update application cannot leave the bypass armed (code review; runtime not tested).
- [x] Ordinary close/reload with entered casting lines retains unload protection (code review and synthetic `beforeunload` event; native prompt not tested).
- [x] Accepted updates can reload without the casting guard blocking them (code review; runtime takeover/reload not tested).
- [x] Cancellation never arms the bypass (code review and browser confirmation cancellation).
- [x] Regression coverage exercises unsuccessful update application (exception: no executable regression in this feature; user approved code-inspection evidence and deferral to task-add-web-release-flow-regression-coverage).
- [x] `./init.sh` passes.

## Relevant docs

- [GitHub issue #27](https://github.com/tungxuan1656/liuyao/issues/27) — canonical acceptance source
- `task-offline-hardening`

## Plan

1. Scope the bypass to the update attempt and its intended reload.
2. Test successful, cancelled, failed, and no-op paths.

## Verify

- `./init.sh`

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done, with user-approved runtime and automated-regression limitations.
- Evidence: Oracle's read-only review of PR #37 at `af6884004314337a7d6bba177944be2590fb4aa6` found no blocking code defect. No-op, rejection and cancellation cannot arm the bypass; only `onNeedReload` arms it immediately before reload, and casting `beforeunload` consumes it once. The draft-safe confirmation UI remains unchanged. `./init.sh` passed on 2026-09-28. Headless Chrome 148 on macOS registered a real waiting worker and showed cancellation; a synthetic `beforeunload` after entering a line was prevented. Actual takeover/reload and rejected/no-op acceptance were **not runtime-tested**. The user approved code inspection as an explicit exception; executable regression coverage is deferred to task-add-web-release-flow-regression-coverage.
- Dependency check: task-offline-hardening is done.
- Next: Integrate the branch, close issue #27 after merge, and add release-flow E2E coverage in task-add-web-release-flow-regression-coverage.
