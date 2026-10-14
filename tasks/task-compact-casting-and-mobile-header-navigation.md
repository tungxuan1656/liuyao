# task-compact-casting-and-mobile-header-navigation - Compact casting and mobile header navigation

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-shadcn-ui-migration-and-coin-casting-modes](task-shadcn-ui-migration-and-coin-casting-modes.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #53 is open from `feat/compact-casting-mobile`.
- Evidence: final `./init.sh` and `git diff --check` passed with 225 package tests. Chromium review covered 320×568, 390×664, and 1440×900. The footer stayed at 517px through six automatic busy/revealed states on both mobile sizes. Three-coin completion, manual confirmation/revisit, reset, cancel, draft protection, completed-reading retention, and keyboard coin activation passed. The pre-push hook passed typecheck and all 225 package tests. A browser focus check confirmed that the input group shows only its bottom focus border.
- Limits: physical-phone rendering and actual screen-reader announcements remain unverified. Existing lint, font-resolution, sourcemap, and bundle-size warnings remain.
- Blockers: none.
- Next: review PR #53.
