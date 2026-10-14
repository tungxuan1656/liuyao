# task-reading-flow - Reading flow

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-web-ui-foundation](task-web-ui-foundation.md), [task-liu-yao-board](task-liu-yao-board.md), [task-casting-core](task-casting-core.md), [task-pre-flow-hardening](task-pre-flow-hardening.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; PR #18 was merged at `dda7973c12d4191ae43f4260fe661c49717e04ef`.
- Evidence: PR #18 head `08d19d5` passed CI `verify` and GitGuardian; code review had no blocking findings. The updated head was merged; `./init.sh` had passed. Direct browser flows/viewports and prior verification evidence are in `docs/plans/task-reading-flow.md`. The approved name and language are recorded canonically in `docs/product-specs/product-identity.md`. PR: https://github.com/tungxuan1656/liuyao/pull/18.
- Dependency check: passed; task-web-ui-foundation, task-liu-yao-board, task-casting-core, and task-pre-flow-hardening are done. F06-T12 is complete for the approved Lục Hào name and English interface; broader release identity remains under task-product-identity.
- Next: Activate task-result-view, already selected in the user's task-reading-flow–012 batch.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-09-27 — task-reading-flow complete

**State**: done; PR #18 merged at `dda7973c12d4191ae43f4260fe661c49717e04ef`.
**Done**: Closed task-reading-flow after PR review and acceptance. F06-T12 is complete for the approved Lục Hào name and English interface; broader identity tasks remain with task-product-identity.
**Evidence**: PR head `08d19d5` passed CI `verify` and GitGuardian; code review had no blocking findings. `./init.sh` previously passed, with evidence in `docs/plans/task-reading-flow.md`.
**Blockers**: none for task-reading-flow.
**Next**: Activate task-result-view, already selected in the user's task-reading-flow–012 batch.
