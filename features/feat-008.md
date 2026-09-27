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

- [x] Complete all F07 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: Single-pane / split-pane layouts show deterministic facts with upper/lower trigrams and rule links.
- [x] Pass the repository verification workflow in `./init.sh`.

## Design direction

- Quiet editorial: warm restrained canvas, ink-like line diagram, clear fact hierarchy.
- Wide screens keep the line board and fact inspector together; compact screens open a keyboard-accessible inspector drawer.
- The result screen presents calculated facts and source knowledge only. It does not generate interpretation or prediction.
- Interim F07 decision (coordinator): the changed board shows the changed polarity diagram and changed upper/lower trigram identities only. Primary Na Jia, element, relative, Shi, and Ying facts remain on the primary board and dedicated line-facts section; they are not duplicated as changed-board facts.
- At widths through 899px, use the compact single-pane board and inspector drawer. At 900px and wider, use wide master-detail.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F07-T01 — Show primary hexagram identity
- [x] F07-T02 — Show changed hexagram only when changes exist
- [x] F07-T03 — Show upper and lower trigram identities for primary and changed hexagrams
- [x] F07-T04 — Show palace and palace element
- [x] F07-T05 — Render sixth line at top and first line at bottom
- [x] F07-T06 — Show Yin/Yang and moving indicators (6 as ✕, 9 as ○) via SVG/CSS YaoSymbol
- [x] F07-T07 — Show Na Jia stem and branch
- [x] F07-T08 — Show Five Element and Six Relative
- [x] F07-T09 — Show Shi and Ying markers
- [x] F07-T10 — Show changed polarity for moving lines
- [x] F07-T11 — Link explainable facts to ruleset-backed rule IDs and canonical source references
- [x] F07-T12 — Render fact, rule, and source as separate concepts
- [x] F07-T13 — Add no-change state without an empty changed-hexagram card
- [x] F07-T14 — Keep full input available when calculation fails
- [x] F07-T15 — Avoid generated interpretation or predictive verdicts
- [x] F07-T16 — Implement Wide Master-Detail layout and Compact Drawer-backed Fact Inspector
- [x] F07-T17 — Support keyboard navigation, focus management, and non-drag dismissal for Drawer

## Plan

1. Add the result route and deterministic result/knowledge composition, preserving root-session navigation.
2. Render primary and optional changed hexagrams, line facts, rule and source citations, and accessible inspector behavior.
3. Validate with `./init.sh` and direct wide/compact UI checks where available.

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

## Dependencies

- `feat-001`
- `feat-004`
- `feat-006`
- `feat-007`
- `feat-017`

## Handoff

- State: done; PR #19 merged at `93df44096fd0eabbb5c6a65cb3a9e2205f6e90d1`.
- Coordinator decision implemented: changed board shows the new polarity diagram and changed upper/lower trigram identities only. It no longer repeats the primary Na Jia, element, relative, Shi, or Ying facts; the primary board and dedicated line-facts section retain those values. Compact breakpoint is max-width 899px; wide master-detail starts at 900px. A resize across the breakpoint updates the compact drawer lifecycle, body scroll lock, and focus restoration.
- Evidence: PR #19 head `5b27046d8e64ed5a23ca757050a61c10a256be00` passed CI `verify` and GitGuardian before merge. `./init.sh` and browser checks are recorded above and in the preceding progress entries. Browser checks cover changed/no-change results, responsive inspector behavior, keyboard dismissal/focus restoration, and scrim dismissal. Forced calculation failure remains code-audited, not runtime-forced; do not describe it as runtime-tested. The compact screenshot predates the final stacking change.
- Dependency check: feat-001, feat-004, feat-006, feat-007, and feat-017 are done.
- Next: Activate feat-009, already selected in the user's feat-007–012 batch.
