# feat-021 — Make update acceptance bypass transient

## Goal

Allow the intentional update reload without letting a failed update bypass draft protection later.

## Scope

- Bound update-acceptance state to the intentional update attempt.
- Preserve draft-safe update UX and the casting unload guard.
- Add regression coverage for rejected, failed, or no-op update application.

## Non-goals

- Change update cancellation or unrelated casting-draft behavior.

## Acceptance

- [ ] Failed or no-op update application cannot leave the bypass armed.
- [ ] Ordinary close/reload with entered casting lines retains unload protection.
- [ ] Accepted updates can reload without the casting guard blocking them.
- [ ] Cancellation never arms the bypass.
- [ ] Regression coverage exercises unsuccessful update application.
- [ ] `./init.sh` passes.

## Relevant docs

- [GitHub issue #27](https://github.com/tungxuan1656/liuyao/issues/27) — canonical acceptance source
- `features/feat-011.md`

## Plan

1. Scope the bypass to the update attempt and its intended reload.
2. Test successful, cancelled, failed, and no-op paths.

## Verify

- `./init.sh`

## Handoff

- State: todo
- Evidence: Issue #27 confirmed; implementation not started.
- Dependency check: feat-011 is done.
- Next: Verify dependencies, then select the feature for implementation.
