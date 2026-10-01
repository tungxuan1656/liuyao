# feat-029 — Compact casting and mobile header navigation

## Goal

Keep the forming hexagram, coins, outcome, and primary action visible together on common mobile viewports.

## Scope

- Apply the user-approved compact presentation to automatic and manual casting.
- Replace mobile bottom tabs with Library and Settings header icons.
- Remove header connection status and repeated casting descriptions.
- Preserve the desktop navigation, preset, domain logic, and draft safeguards.

## Acceptance

- [x] At 320px and 390px widths, the hexagram and coins appear side by side without horizontal overflow.
- [x] At 320×568 and 390×664, the casting action and outcome remain in view from waiting through all six reveals.
- [x] Three/four-coin controls share one row with progress; the latest outcome has one visible canonical name.
- [x] Mobile header links replace bottom tabs, retain accessible names, and respect unfinished-draft protection.
- [x] Back, reset, cancellation, manual confirmation, and completed-reading navigation retain their behavior.
- [x] Desktop layout and repository verification pass.

## Relevant docs

- `docs/product-specs/ui-layout.md`
- `docs/product-specs/reading-flow.md`
- `docs/development.md`

## Plan

- [x] Update the canonical layout contract and header navigation.
- [x] Compact both sequential workspaces and remove redundant visible copy.
- [x] Review mobile/desktop layouts and interaction states, then run `./init.sh` and `git diff --check`.
- [x] Record evidence and close this feature.

## Handoff

- State: done on `feat/compact-casting-mobile`; changes remain uncommitted.
- Evidence: final `./init.sh` and `git diff --check` passed with 225 package tests. Chromium review covered 320×568, 390×664, and 1440×900. The footer stayed at 517px through six automatic busy/revealed states on both mobile sizes. Three-coin completion, manual confirmation/revisit, reset, cancel, draft protection, completed-reading retention, and keyboard coin activation passed.
- Limits: physical-phone rendering and actual screen-reader announcements remain unverified. Existing lint, font-resolution, sourcemap, and bundle-size warnings remain.
- Blockers: none.
- Next: review the updated interface on the user's phone.
