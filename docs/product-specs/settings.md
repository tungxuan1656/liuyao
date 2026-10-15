# Settings

This document owns the V1 Settings and diagnostics screen.

User-facing labels and messages use Vietnamese. See `vietnamese-language.md` for canonical terminology.

## V1 content

Show:

- web app version;
- `@liuyao/core` version;
- `@liuyao/knowledge` version;
- ruleset ID `liuyao-standard-v1`;
- PWA installation state when the browser exposes it;
- online or offline state;
- update availability when a new app version is waiting.

Show the app version and browser state directly. Place package versions and the ruleset ID in collapsed technical details.

## Theme

- Default to Light until the user selects a theme in Settings.
- Offer exactly two choices: Sáng (Light) and Tối (Dark). Do not follow the operating-system color scheme.
- Apply the choice to every route immediately, remember it on the device, and restore it before first paint, including offline launches.
- Set `color-scheme` and the `theme-color` metadata from the active theme.
- The canonical palettes live in `docs/product-specs/v1-mvp.md`. The Light palette stays unchanged.

## Conventions

Show the fixed V1 conventions that affect results:

- line positions use first line through sixth line;
- domain line order is bottom to top;
- `6` and `9` are changing lines;
- calendar-based analysis is not part of V1.

These values are read-only in V1.

Keep conventions in the same technical details disclosure.

## Actions

The screen can expose an app-update action when a new service worker is ready.

Do not reload the page automatically while a reading draft is active.

## Product information

Settings links to the local `/settings/about` page and its About, privacy, licensing, use-disclaimer, and security-reporting sections. These sections remain available after the PWA is ready offline; external repository links still require a connection.

The privacy statement distinguishes in-memory questions/readings, the persisted theme choice, offline caches, same-origin application/update traffic, hosting logs, and user-activated external links. Do not promise that a web application makes no network requests.

The Product Owner approved the learning/reference-only disclaimer and short result-page reminder on 2026-10-15. The disclaimer does not guarantee predictions or replace medical, legal, or financial advice. Opening it from a result must preserve the current in-memory reading. Licensing follows `../../LICENSING.md`; security reporting follows `../../SECURITY.md`.

An unsuccessful update keeps the current session and displays a Vietnamese retry message. The reload warning and explicit confirmation still apply when the session contains unsaved input.

## Not in V1

Do not add:

- login or account controls;
- sync controls;
- analytics controls;
- cloud backup;
- selectable rulesets;
- calendar convention selectors;
- reading-history settings.
