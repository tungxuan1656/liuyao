# feat-020 — Capture PWA install prompts globally

## Goal

Keep install-prompt availability when the browser event fires outside Settings.

## Scope

- Capture and expose deferred install-prompt state at application level.
- Let Settings consume and clear the prompt after use; preserve truthful standalone detection.
- Add browser evidence for capture on Home followed by use in Settings.

## Non-goals

- Require installation for normal web use.

## Acceptance

- [ ] Application bootstrap listens for `beforeinstallprompt` independent of route.
- [ ] A prompt captured on Home remains usable after navigation to Settings and clears after accepted or dismissed use.
- [ ] Browsers without the event retain truthful install/standalone state.
- [ ] Browser/E2E evidence covers Home capture through Settings use.
- [ ] `./init.sh` passes.

## Relevant docs

- [GitHub issue #26](https://github.com/tungxuan1656/liuyao/issues/26) — canonical acceptance source
- `features/feat-010.md`
- `features/feat-011.md`

## Plan

1. Move event ownership to an application-level store.
2. Connect Settings to the store and verify the navigation scenario.

## Verify

- `./init.sh`

## Handoff

- State: todo
- Evidence: Issue #26 confirmed; implementation not started.
- Dependency check: feat-010 is done.
- Next: Verify dependencies, then select the feature for implementation.
