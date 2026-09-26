# feat-007 — Reading flow

## Goal

A user can start, complete, recover, and restart a reading; active reading preserved across root tabs.

## Scope

- Implement the V1 work defined for F06 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete all F06 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`, including F06-T12 for the user-approved Lục Hào name and English interface.
- [x] Meet the V1 completion condition: A user can start, complete, recover, and restart a reading; active reading preserved across root tabs.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Plan and evidence

- Implementation plan and decision log: `docs/plans/feat-007.md` (plan-only commit `4240b6c`).
- Full verification passed: `./init.sh` ran format, lint/length, typecheck, build, package exports, test placement, 41 knowledge tests in 7 files, and 155 core tests in 13 files. One pre-existing non-failing Fast Refresh warning remains at `apps/web/src/components/ui/button.tsx:49`. Previous direct browser viewport/state-transition evidence is in `docs/plans/feat-007.md`.
- F06-T12 is complete for the reading-flow UI: its visible product name and interface language match the approval recorded in `docs/product-specs/product-identity.md`. Release metadata and other identity work remain owned by feat-013.

## Tasks

- [x] F06-T01 — Replace scaffold screen with AppShell (BottomNav on compact, TopNav on wide)
- [x] F06-T02 — Build the Home entry point at `/`
- [x] F06-T03 — Build New Reading entry state with question and method selectors
- [x] F06-T04 — Add optional question text with clear session-only behavior
- [x] F06-T05 — Add method selection and in-memory draft state for sequential and direct entry
- [x] F06-T06 — Preserve draft state when moving between steps
- [x] F06-T07 — Add Back, Reset, and Cancel navigation safety with AlertDialog confirmation
- [x] F06-T08 — Connect normalized input to `@liuyao/core`
- [x] F06-T09 — Show actionable invalid and incomplete input states
- [x] F06-T10 — Keep entered values after recoverable errors
- [x] F06-T11 — Confirm via AlertDialog before replacing an existing completed reading
- [x] F06-T12 — Apply approved product name and interface language (Lục Hào; English)
- [x] F06-T13 — Implement mobile safe-area inset handling for fixed navigation and content container
- [x] F06-T14 — Implement casting flow isolation (hide bottom navigation during active line input)
- [x] F06-T15 — Preserve active completed reading across root-tab navigation until explicit restart

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-004`
- `feat-005`
- `feat-017`

## Handoff

- State: active; implementation and acceptance criteria are locally verified; PR #18 remains draft with plan/PR review pending.
- Evidence: Existing direct browser flows/viewports and this revision's `./init.sh` evidence are in `docs/plans/feat-007.md`. The approved name and language are recorded canonically in `docs/product-specs/product-identity.md`. PR: https://github.com/tungxuan1656/liuyao/pull/18.
- Dependency check: passed; feat-001, feat-004, feat-005, and feat-017 are done. F06-T12 applies to the reading-flow UI and is complete. Broader release identity remains under feat-013.
- Next: Send the updated head for plan/PR review, address any further findings, and only then complete the PR handoff.
