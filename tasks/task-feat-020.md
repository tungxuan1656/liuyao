# feat-020 - Capture PWA install prompts globally

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-010](task-feat-010.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Keep install-prompt availability when the browser event fires outside Settings.

## Scope

- Capture and expose deferred install-prompt state at application level.
- Let Settings consume and clear the prompt after use; preserve truthful standalone detection.
- Add browser evidence for capture on Home followed by use in Settings.

## Non-goals

- Require installation for normal web use.

## Acceptance

- [x] Application bootstrap listens for `beforeinstallprompt` independent of route.
- [x] A prompt captured on Home remains usable after navigation to Settings and clears after accepted or dismissed use.
- [x] Browsers without the event retain truthful install/standalone state.
- [x] Browser/E2E evidence covers Home capture through Settings use.
- [x] `./init.sh` passes.

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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done
- Evidence: App startup registers an install-prompt store. Headless Chromium browser test dispatched a mock cancelable `beforeinstallprompt` on Home (`preventDefault` confirmed), navigated to Settings, used its install action, and observed dismissal feedback plus action removal. This is simulated event evidence, not a native browser install. Existing standalone check remains. `./init.sh` passed on 2026-09-28 (one existing lint warning).
- Dependency check: feat-010 is done.
- Next: Integrate the verified branch and close issue #26 after confirmed merge.

## Migration provenance

Migrated from [feat-020](../features/feat-020.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
