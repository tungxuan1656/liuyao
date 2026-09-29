# feat-028 — Manual and automatic coin casting modes

## Goal

Support user-matched physical tosses and the selected three- or four-coin casting model in the reading flow.

## Scope

- Implement per-line manual coin flips with confirmation, plus direct six-line selection.
- Implement automatic per-line outcomes, a forming hexagram, and a 3D coin/camera reveal.
- Follow the canonical product behavior in `docs/product-specs/reading-flow.md` and presentation rules in `docs/product-specs/ui-layout.md`.

## Acceptance

- [ ] Manual mode lets users set each individual coin to match a physical toss, confirms each line, and preserves completed lines on revisit unless explicitly reset.
- [ ] Three- and four-coin line values and distributions match `reading-flow.md`.
- [ ] Automatic outcomes are generated before animation, revealed without changing, and cannot be retriggered while animating.
- [ ] **Highest-priority motion criterion:** Review the approved 3D launch, staggered contact, settle, overhead camera reveal, and face readability on mobile and desktop. Record evidence and limitations under `ui-layout.md` criteria.
- [ ] All casting modes show named outcomes without numeric 6/7/8/9; direct mode exposes all six rows at once.
- [ ] The coin visuals, reduced-motion behavior, responsive layout, stable action-bar position, and keyboard/screen-reader behavior meet `ui-layout.md`.
- [ ] No history or persistence is added; prior completed readings remain available on revisit unless the user explicitly resets or starts over.
- [ ] Relevant tests and repository verification pass.

## Dependencies

- `feat-005` — Casting core
- `feat-007` — Reading flow

## Plan

- [`docs/plans/feat-028.md`](../docs/plans/feat-028.md)

## Handoff

- State: active on PR #49; the user-approved 3D redesign replaces the shell/dish concept.
- Verification: `./init.sh` passed (225 package tests, one existing lint warning); release E2E passed 16/16. Desktop 1280×900 and mobile 390×844 completed six fixed four-coin outcomes, revisit, and calculation. Action Y stayed at 700.14px and 706.75px respectively. Reduced motion, unavailable/lost WebGL, mid-flight reset, cancellation, and production offline scene loading passed browser checks.
- Visual evidence: reviewed launch/contact/camera frame captures at 200/450/750/1000/1300ms plus final desktop/mobile boards. Coins have visible thickness, distinct rotations, asymmetric landing positions, and readable sun/moon faces. Lowered launch height after detecting proximity to the upper stage edge. Mobile actions fit within 844px height.
- Limits: frame captures and desktop Chromium viewport emulation do not establish physical-phone frame pacing. The lazy 3D chunk adds about 133kB gzip and produces a non-blocking Vite size warning.
- Next: Review the updated PR preview live on desktop and a physical phone before accepting motion quality and marking the feature done.
