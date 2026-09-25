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

- [ ] Complete all F06 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: A user can start, complete, recover, and restart a reading; active reading preserved across root tabs.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F06-T01 — Replace scaffold screen with AppShell (BottomNav on compact, TopNav on wide)
- [ ] F06-T02 — Build the Home entry point at `/`
- [ ] F06-T03 — Build New Reading entry state with question and method selectors
- [ ] F06-T04 — Add optional question text with clear session-only behavior
- [ ] F06-T05 — Add method selection and in-memory draft state for sequential and direct entry
- [ ] F06-T06 — Preserve draft state when moving between steps
- [ ] F06-T07 — Add Back, Reset, and Cancel navigation safety with AlertDialog confirmation
- [ ] F06-T08 — Connect normalized input to `@liuyao/core`
- [ ] F06-T09 — Show actionable invalid and incomplete input states
- [ ] F06-T10 — Keep entered values after recoverable errors
- [ ] F06-T11 — Confirm via AlertDialog before replacing an existing completed reading
- [ ] F06-T12 — Apply approved product name and interface language
- [ ] F06-T13 — Implement mobile safe-area inset handling for fixed navigation and content container
- [ ] F06-T14 — Implement casting flow isolation (hide bottom navigation during active line input)
- [ ] F06-T15 — Preserve active completed reading across root-tab navigation until explicit restart

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-004`
- `feat-005`

## Handoff

- State: todo
- Evidence: —
- Blockers: none
- Next: Check dependency status, then select this feature for implementation.
