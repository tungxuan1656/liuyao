# feat-030 — Light and Dark theme preference

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

## Evidence

- Final `./init.sh` passed: format, lint, typecheck, build, package exports, test placement, and 225 package tests.
- Chromium reviewed the production build through `vite preview`. With no stored value: no `dark` class, body `oklch(1 0 0)`, `color-scheme: light`, `theme-color` `#ffffff`, empty storage.
- Selecting Tối set `html.dark` with body `#151B1E`, card surface `#1E2629`, muted text `#B3C1BD`, `color-scheme: dark`, `theme-color` `#151b1e`, and storage `dark`. `/`, `/library`, `/settings`, and `/result` all rendered dark, and the Settings radio reflected the stored value.
- After reload the `dark` class was present at `DOMContentLoaded` through the `index.html` bootstrap, before the app module ran.
- Offline: with the production service worker active, the preview server was stopped and `/` and `/settings` still loaded from the workbox precache with the dark class, dark body color, `theme-color` `#151b1e`, and stored `dark`.
- Light restore: selecting Sáng returned every route to the Light rendering and kept the moving-line marker at `#8f2e24`; `--moving-marker` in Dark is `#e8836f` (6.5:1 on the dark background; the Light literal measured 2.1:1 there).
- Four-coin labels use `text-muted-foreground` (`#B3C1BD` in Dark, `#5d5d5d` in Light) instead of the `#525252` literal (2.4:1 in Dark).
- Settings at 390×844: appearance card 358px, both options 318×75, no horizontal overflow. No page errors or console output on `/`, `/settings`, or `/library`.

## Handoff

- State: done; changes are uncommitted.
- Evidence: see the Evidence section above.
- Dependency check: feat-010 is done.
- Limits: verification used Chromium only; physical-device rendering is unverified. The PWA manifest theme colors and the favicon stay Light-only identity assets and belong to the identity work. The theme module has no package-level test because app test files are not allowed by `docs/development.md`.
- Next: Review the uncommitted theme changes and commit them.
