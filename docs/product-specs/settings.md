# Settings

This document owns the V1 Settings and diagnostics screen.

## V1 content

Show:

- web app version;
- `@liuyao/core` version;
- `@liuyao/knowledge` version;
- ruleset ID `liuyao-standard-v1`;
- PWA installation state when the browser exposes it;
- online or offline state;
- update availability when a new app version is waiting.

## Conventions

Show the fixed V1 conventions that affect results:

- line positions use first line through sixth line;
- domain line order is bottom to top;
- `6` and `9` are changing lines;
- calendar-based analysis is not part of V1.

These values are read-only in V1.

## Actions

The screen can expose an app-update action when a new service worker is ready.

Do not reload the page automatically while a reading draft is active.

## Not in V1

Do not add:

- login or account controls;
- sync controls;
- analytics controls;
- cloud backup;
- selectable rulesets;
- calendar convention selectors;
- reading-history settings.
