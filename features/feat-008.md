# feat-008 — Result view

## Goal

Single-pane / split-pane layouts show deterministic facts with upper/lower trigrams and rule links.

## Scope

- Implement the V1 work defined for F07 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [ ] Complete all F07 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Single-pane / split-pane layouts show deterministic facts with upper/lower trigrams and rule links.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F07-T01 — Show primary hexagram identity
- [ ] F07-T02 — Show changed hexagram only when changes exist
- [ ] F07-T03 — Show upper and lower trigram identities for primary and changed hexagrams
- [ ] F07-T04 — Show palace and palace element
- [ ] F07-T05 — Render sixth line at top and first line at bottom
- [ ] F07-T06 — Show Yin/Yang and moving indicators (6 as ✕, 9 as ○) via SVG/CSS YaoSymbol
- [ ] F07-T07 — Show Na Jia stem and branch
- [ ] F07-T08 — Show Five Element and Six Relative
- [ ] F07-T09 — Show Shi and Ying markers
- [ ] F07-T10 — Show changed polarity for moving lines
- [ ] F07-T11 — Link explainable facts to ruleset-backed rule IDs and canonical source references
- [ ] F07-T12 — Render fact, rule, and source as separate concepts
- [ ] F07-T13 — Add no-change state without an empty changed-hexagram card
- [ ] F07-T14 — Keep full input available when calculation fails
- [ ] F07-T15 — Avoid generated interpretation or predictive verdicts
- [ ] F07-T16 — Implement Wide Master-Detail layout and Compact Drawer-backed Fact Inspector
- [ ] F07-T17 — Support keyboard navigation, focus management, and non-drag dismissal for Drawer

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-004`
- `feat-006`
- `feat-007`
- `feat-017`

## Handoff

- State: todo
- Evidence: —
- Dependency check: pending
- Next: Verify dependencies, then select this feature for implementation.
