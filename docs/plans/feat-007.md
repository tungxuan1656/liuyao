# Reading Flow Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Use `subagent-driven-development` or `executing-plans` only when installed and appropriate. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver F06 reading creation so users can start, complete, recover, and restart readings, preserving the active completed result across root tabs until explicit replacement or reload.

**Architecture:** Keep draft/session state in the web application memory and deterministic calculation in `@liuyao/core`; adapt secure browser randomness only in the web layer. Compose the existing router and AppShell with focused casting and persistent in-memory reading state, without adding persistence, history, a backend, or result-view scope from F07.

**Tech Stack:** React 19, TypeScript, React Router, Vite, `@liuyao/core`, existing shadcn/ui/Radix dependencies, Playwright/browser UI smoke, pnpm.

## Global Constraints

- F06-T01–T15 and their evidence in `docs/product-specs/v1-task-map.md` are canonical.
- Keep line values in first-to-sixth (bottom-to-top) order; accept only `6`, `7`, `8`, `9`; normalize all methods through `@liuyao/core`.
- Reading/question/draft state is in-memory only; refresh may erase it. No history, account, backend, analytics, or generated interpretation.
- Tests belong in `packages/*/tests`, not under `apps/web`; verify app behavior by typecheck/build and direct browser interaction.
- Preserve mobile safe areas, responsive navigation, keyboard/accessibility basics, and local/offline operation.
- Product identity remains provisional until Product Owner approval; do not describe provisional branding as approved.

---

## Decision log

- 2026-09-26: Keep reading/session state in the existing web app runtime rather than storage; root-tab preservation is achieved by retaining the app-level session while routed destinations change. Reload intentionally starts a fresh session, consistent with `reading-flow.md`.
- 2026-09-26: Do not implement result-board facts or explanations owned by F07. F06 shows a completion/reading summary using the normalized core output and keeps input recoverable; integrate only existing result contracts needed to demonstrate completion.
- 2026-09-26: F12 product identity is not approved in `product-identity.md`; retain the repository's current Vietnamese interface conventions and flag branding as provisional rather than asserting F06 has Product Owner approval.
- 2026-09-26: Protect destructive transitions (discarding entered lines and replacing a completed reading) with the existing/native-compatible AlertDialog interaction pattern; preserve draft values on recoverable validation failures.

## Work stages

### Task 1: App shell and home entry (F06-T01–T02, T12–T13)

**Files:** `apps/web/src/App.tsx`, `apps/web/src/App.css`, `apps/web/src/components/app-shell.tsx`, `apps/web/src/components/navigation.tsx`, `apps/web/src/routes.ts`, and local UI components as needed; identity audit evidence in feature record.

- [x] Replace the scaffold with Reading home and responsive BottomNav (<768px)/TopNav (>=768px); use existing font, design-token, and safe-area patterns.
- [x] Directly verify `/` at compact 390×844 and wide 1024×576 viewports, home navigation, safe-area content clearance, and identity/language consistency without claiming unapproved brand decisions.

### Task 2: Session and entry methods (F06-T03–06, T15)

**Files:** `apps/web/src/App.tsx`, focused `apps/web/src` flow components/hooks only if needed, route composition; no persistence layer.

- [x] Add optional question, automatic/manual/direct method selection, and memory-only draft state; verify question and reading disappear after refresh and are never presented as saved.
- [x] Preserve question and method in the memory-only draft, partial line values through Back navigation, and completed readings across Reading/Library/Settings root tabs until New Reading or reload.
- [x] Directly verify direct and manual equivalent inputs produce the same core result; automatic uses the existing browser-crypto adapter.

### Task 3: Casting interaction and recovery (F06-T07–10, T14)

**Files:** `apps/web/src/routes.ts`, casting flow components, `apps/web/src/App.css`, and package tests only if a reusable core contract regression is needed.

- [x] Implement focused `/casting` flow with bottom nav hidden, sequential steps for manual/automatic input, and direct six-line entry in visual sixth-to-first order while retaining canonical first-to-sixth data order.
- [x] Implement Back, Reset, Cancel, and replacement safety using native modal `alertdialog` confirmation where destructive; add browser-native unload protection for entered lines when supported.
- [x] Reject incomplete/invalid input actionably without clearing entered values; calculate only exactly six valid values through `@liuyao/core`, then return to active Reading result state.
- [x] Directly exercise cancellation, reset, back preservation, incomplete recovery, successful completion, replacement confirmation/decline, and all root-tab preservation transitions.

### Task 4: Acceptance evidence and handoff

**Files:** `features/feat-007.md`, `feature_index.json`, `progress.md`, this plan; amend architecture/product-scope summaries only for observed behavior.

- [x] Record evidence against F06-T01–11 and T13–15, run direct compact/wide browser smoke and `./init.sh`, and inspect the working tree before fixers. F06-T12 remains blocked on unapproved Product Owner identity; retain explicit blocked status.
- [x] Commit and push feature implementation; open draft PR #18 on `tungxuan1656/feat-007-reading-flow` and update its handoff records.
- [ ] Obtain plan/PR review, address blocking findings, reverify every updated head, and report each new head.
- [ ] Mark feat-007 done only after F06-T12 identity approval and all acceptance criteria pass; otherwise retain the blocked handoff and next action.

## Verification evidence (2026-09-27)

`./init.sh` passed formatting, lint/length, typecheck, build, package exports, test placement, 41 knowledge tests in 7 files, and 155 core tests in 13 files. Initial lint findings in this branch (native dialog cleanup and colocated session hook Fast Refresh) were corrected; the pre-existing button Fast Refresh warning remains.

Direct browser smoke used 1024×576 and compact 390×844 emulation. Home showed optional session-only question and all three methods; `/casting` hid root navigation; direct and sequential manual values `[7, 8, 9, 8, 7, 6]` both produced primary `hexagram-63` and changed `hexagram-42`; automatic browser-crypto casting completed with generated values. Checked incomplete guidance, manual Back value retention, Reset/Cancel confirmation, blocked browser Back followed by Keep editing, confirmed discard, completed-reading replacement decline/accept, Reading/Library/Settings tab preservation, and refresh clearing the active reading/question.

F06-T12 remains blocked: `docs/product-specs/product-identity.md` has no approved public name or primary language and feat-013 is todo. Current provisional Lục Hào branding/English copy were retained without claiming approval, per coordinator direction. Application tests are not added because `docs/development.md` forbids tests under `apps/web`; direct browser interaction is the UI evidence.
