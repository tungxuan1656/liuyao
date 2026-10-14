# task-light-and-dark-theme-preference - Light and Dark theme preference

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-settings](task-settings.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

A user can choose Light or Dark in Settings, and every route keeps that choice across reloads and offline launches.

## Scope

- Add the F09-T11 Light/Dark setting from `docs/product-specs/v1-task-map.md`.
- Apply the Dark palette from `docs/product-specs/v1-mvp.md` through the existing semantic tokens.
- Restore the saved theme before first paint and keep `color-scheme` and `theme-color` in sync.
- Keep the Light palette and the existing layout unchanged.

## Non-goals

- Changing PWA manifest theme colors, favicon, or other release identity assets.
- Adding a system-following automatic mode.

## Acceptance

- [x] With no saved choice, every route renders the Light theme.
- [x] Selecting Tối in Settings switches all routes to the Dark palette; selecting Sáng restores Light.
- [x] The choice survives reload and an offline launch, and applies before first paint.
- [x] `color-scheme` and `theme-color` follow the active theme.
- [x] `./init.sh` passes.

## Relevant docs

- `docs/product-specs/settings.md`
- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/ui-layout.md`

## Plan

1. Add the pre-paint restore script and the Dark palette tokens.
2. Add the theme module and the Settings appearance control.
3. Review Light and Dark across routes, reload, and offline in Chromium, then run `./init.sh`.
4. Record evidence and close the feature.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #54 is open for review with the implementation and storage-failure review fix.
- Evidence: see the Evidence section above.
- Dependency check: task-settings is done.
- Limits: verification used Chromium only; physical-device rendering is unverified. The PWA manifest theme colors and the favicon stay Light-only identity assets and belong to the identity work. The theme module has no package-level test because app test files are not allowed by `docs/development.md`.
- Next: Review PR #54.
