# feat-012 — Quality hardening

## Goal

Golden tests, accessibility, responsive behavior, browsers, and failure states pass.

## Scope

- Implement the V1 work defined for F11 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F11 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Golden tests, accessibility, responsive behavior, browsers, and failure states pass.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F11-T01 — Add complete golden fixtures for supported deterministic rules
- [ ] F11-T02 — Add regression fixtures for every corrected domain bug
- [ ] F11-T03 — Audit keyboard navigation, focus visibility, and focus trap in Drawer / Dialogs
- [ ] F11-T04 — Audit visible labels and accessible names
- [ ] F11-T05 — Audit focus order and focus visibility
- [ ] F11-T06 — Audit text contrast (≥4.5:1 / ≥3:1) and non-text UI boundary contrast (≥3:1)
- [ ] F11-T07 — Verify layout at compact mobile with safe-area insets, tablet, and wide desktop
- [ ] F11-T08 — Verify long labels in the approved primary language and long source names do not break layout
- [ ] F11-T09 — Verify empty, invalid, offline, update, and calculation-error states
- [ ] F11-T10 — Verify no blocking console errors in release flows
- [ ] F11-T11 — Run supported-browser release matrix
- [ ] F11-T12 — Run `./init.sh` and read-only merge checks
- [ ] F11-T13 — Audit interactive touch target sizing (≥44×44px) across compact and mobile views

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-002`
- `feat-003`
- `feat-004`
- `feat-005`
- `feat-006`
- `feat-007`
- `feat-008`
- `feat-009`
- `feat-010`
- `feat-011`

## Handoff

- State: todo
- Evidence: —
- Blockers: none
- Next: Check dependency status, then select this feature for implementation.
