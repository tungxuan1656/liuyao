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

- [ ] Replace the scaffold with Reading home and responsive BottomNav (<768px)/TopNav (>=768px); use existing font, design-token, and safe-area patterns.
- [ ] Directly verify `/` at compact and wide sizes, home navigation, safe-area content clearance, and identity/language consistency without claiming unapproved brand decisions.

### Task 2: Session and entry methods (F06-T03–06, T15)

**Files:** `apps/web/src/App.tsx`, focused `apps/web/src` flow components/hooks only if needed, route composition; no persistence layer.

- [ ] Add optional question, automatic/manual/direct method selection, and memory-only draft state; verify question disappears after refresh and is never presented as saved.
- [ ] Preserve question, method, and partial line values through step/back navigation and across Reading/Library/Settings root tabs; keep completed reading active until explicit New Reading or reload.
- [ ] Directly verify all three methods reach equivalent normalized `@liuyao/core` input for equivalent lines; automatic uses the existing browser-crypto adapter.

### Task 3: Casting interaction and recovery (F06-T07–10, T14)

**Files:** `apps/web/src/routes.ts`, casting flow components, `apps/web/src/App.css`, and package tests only if a reusable core contract regression is needed.

- [ ] Implement focused `/casting` flow with bottom nav hidden, sequential steps for manual/automatic input, and direct six-line entry in visual sixth-to-first order while retaining canonical first-to-sixth data order.
- [ ] Implement Back, Reset, Cancel, and replacement safety using AlertDialog confirmation where destructive; add browser-native unload protection for entered lines when supported.
- [ ] Reject incomplete/invalid input actionably without clearing entered values; calculate only exactly six valid values through `@liuyao/core`, then return to active Reading result state.
- [ ] Directly exercise cancellation, reset, back preservation, invalid/incomplete recovery, successful completion, replacement confirmation/decline, and all root-tab preservation transitions.

### Task 4: Acceptance evidence and handoff

**Files:** `features/feat-007.md`, `feature_index.json`, `progress.md`, this plan; amend architecture/product-scope summaries only for observed behavior.

- [ ] Record evidence against F06-T01–15, run direct compact/wide browser smoke and `./init.sh`, and inspect the working tree before fixers.
- [ ] Mark only feat-007 done after acceptance; record exact evidence, dependencies, blockers/review status, and next action in feature handoff and append one progress block.
- [ ] Commit and push feature implementation; open PR; stop editing a reported head pending review, address blocking feedback, reverify and report each updated head.

## Verification evidence

Pending implementation. Record concrete `./init.sh` output, direct browser viewport/path/state transitions, and any remaining limits here; never infer unobserved behavior.
