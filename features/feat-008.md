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

- State: implementation complete; awaiting coordinator validation.
- Evidence: `./init.sh` passed after the latest code edits (format, lint, typecheck, build, package exports, tests); `git diff --check` passed. On Vite `http://127.0.0.1:5173`, earlier direct checks confirmed Start Casting navigation, no-change input `7,7,7,7,7,7` (primary only), changed input `6,7,8,9,6,7` (primary and changed panels), and wide layout at 1024×576 (`601px 320px`, inspector visible). Compact 390×844 layout stacks boards; earlier measurement reported `343px` grid column. The prior compact screenshot at `.../feat008-compact.png` predates stacking and shows the old cramped layout. In this session, opening the trigram drawer produced one dialog, one scrim, and focused Close. `agent-browser press Tab` and `press Shift+Tab`, each followed by `document.activeElement` inspection, left focus on the sole drawer tab stop (Close). A CSS-selector `click('.drawer-scrim')` did not dismiss in this automation session; a real mouse click on the scrim above the drawer did dismiss, removed the dialog, restored focus to the triggering trigram button, and restored body overflow. Forced failure was not triggered; code audit of `CastingFlow.finish` confirms the catch writes all supplied `values` back to `draft.lines` and sets an alert error, but this is not a runtime verification. Existing Escape dismissal and focus restoration were previously observed. Wide screenshot: `/private/var/folders/y_/7jmnw4n12f9686g6xqj07hj80000gn/T/opencode/feat008-wide.png`.
- Dependency check: existing feature dependencies assumed completed; coordinator to confirm.
- Next: Coordinator to validate the recorded evidence and decide whether forced-failure runtime coverage is still required.
