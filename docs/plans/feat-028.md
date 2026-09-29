# feat-028 — Implementation plan

This plan is separate because the approved implementation spans at least four files across casting logic, reading-flow state, and UI presentation.

## Sequence

1. Review and confirm the product contract in `docs/product-specs/reading-flow.md` and `docs/product-specs/ui-layout.md` before implementation.
2. Implement and test three-/four-coin outcome mapping and deterministic evidence handling in the casting domain.
3. Implement manual per-coin input, explicit line confirmation, direct six-row choices, and preservation/reset behavior in the reading flow.
4. Implement the automatic shell/coin reveal animation and accessible, responsive reduced-motion behavior.
5. Verify line mappings/distributions, state preservation, animation repeat protection, and UI accessibility. Give motion review top priority: visually review mobile and desktop for natural inertial shell shake/tip, staggered individual coin falls, restrained contact/settle wobble, no synchronized repetitive spins/bounces, no layout shift, and no dropped-feeling motion. Record the review, then run repository verification.

## Review gate

Do not begin implementation until the design review confirms the coin markings and mappings, automatic animation contract, and reset/revisit behavior. Keep product rules in `reading-flow.md` and presentation rules in `ui-layout.md`.
