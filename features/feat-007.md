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

- [ ] Complete all F06 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`. F06-T12 is blocked until Product Owner identity approval in feat-013.
- [x] Meet the V1 completion condition: A user can start, complete, recover, and restart a reading; active reading preserved across root tabs.
- [x] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Plan and evidence

- Implementation plan and decision log: `docs/plans/feat-007.md` (plan-only commit `4240b6c`).
- `./init.sh` passed: 41 knowledge tests in 7 files, 155 core tests in 13 files, format, lint/length, typecheck, build, package exports, and test placement. One pre-existing non-failing Fast Refresh warning remains at `apps/web/src/components/ui/button.tsx:49`.
- Direct browser viewport/state-transition evidence is recorded in `docs/plans/feat-007.md`; F06-T12 is the only unfinished task, blocked by unavailable Product Owner identity approval.

[features/feat-007.md#7450]

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
- [ ] F06-T12 — Apply approved product name and interface language (blocked: `product-identity.md` has no approved name/language; feat-013 is todo)
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

- State: active; implementation locally verified; PR pending plan review.
- Evidence: `./init.sh` passed (155 core, 41 knowledge tests); direct browser flows and viewports are documented in `docs/plans/feat-007.md`.
- Dependency check: passed; feat-001, feat-004, feat-005, and feat-017 are done. F06-T12 is blocked until Product Owner approves the name and primary language in feat-013.
- Next: Receive plan-review result, then commit/push the implementation and open its PR; keep the feature not-done until the identity blocker clears.
