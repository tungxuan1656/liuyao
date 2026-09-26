# Progress

Append-only history for repository-local tracked features. Do not record no-feature work here.

<!-- Log template

## YYYY-MM-DD — <id>

**State**: todo
**Done**: —
**Evidence**: —
**Blockers**: none
**Next**: <One action.>

-->

<!-- Add each new block below this note. Do not edit older blocks. -->

## 2026-09-25 — feat-001

**State**: done, pending PR review and merge.
**Done**: F00-T01–T05 web foundation: styling, shadcn tokens, routes, self-hosted fonts, and responsive AppShell primitives.
**Evidence**: `./init.sh` and read-only verification passed; route, responsive, and local-font browser checks are recorded in `features/feat-001.md`.
**Blockers**: none for F00; finished Reading/Library/Settings/Casting flows belong to later features.
**Next**: Open the PR and resolve review feedback.

## 2026-09-26 — feat-001

**State**: active; follow-up PR pending review and merge.
**Done**: PR #10 merged. Addressed the P2 review finding in the shared placeholder Return to home link without changing navigation.
**Evidence**: `./init.sh` passed; the 390×844px route measurements, keyboard focus, and navigation checks are recorded in `features/feat-001.md`.
**Blockers**: none for the fix; merge approval remains pending.
**Next**: Review and merge the follow-up PR, then close feat-001.

## 2026-09-26 — feat-001

**State**: done; PR #11 merged as `2f2936c`.
**Done**: Added 44×44px minimum target dimensions and visible keyboard focus to the shared placeholder Return to home link, preserving destinations; completed the follow-up handoff.
**Evidence**: Fresh Codex review approved PR #11 at `052bd46`; GitHub `verify` and GitGuardian checks passed. `./init.sh` and the browser measurements/navigation checks are recorded in `features/feat-001.md`.
**Blockers**: none.
**Next**: Begin feat-002 domain contracts.

## 2026-09-26 — feat-002

**State**: active; implementation complete, pending PR review and merge.
**Done**: F01-T01–T08 domain contracts, typed errors and validation, stable IDs, ordered positions, and reusable package fixtures.
**Evidence**: `pnpm --filter @liuyao/core test` passed 29 tests; `./init.sh` passed format, lint, length check, typecheck, build, and package tests. Details are in `features/feat-002.md`.
**Blockers**: none; one pre-existing non-failing web lint warning remains outside F01 scope.
**Next**: Review and merge the feat-002 PR, then mark feat-002 done.
