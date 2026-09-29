# feat-028 — Coin casting implementation plan

This plan is separate because the approved implementation spans at least four files across casting logic, reading-flow state, and UI presentation.

## Sequence

1. Review and confirm the product contract in `docs/product-specs/reading-flow.md` and `docs/product-specs/ui-layout.md` before implementation.
2. Implement and test three-/four-coin outcome mapping and deterministic evidence handling in the casting domain.
3. Implement manual per-coin input, explicit line confirmation, direct six-row choices, and preservation/reset behavior in the reading flow.
4. Implement the automatic 3D coin launch, landing, camera reveal, and six-line forming hexagram.
5. Verify line mappings, preserved outcomes, repeat protection, accessibility, and desktop/mobile motion. Run repository and release verification.

## Review gate

The user approved the replacement concept and inline execution on PR #49 on 2026-09-29. Keep product rules in `reading-flow.md` and presentation rules in `ui-layout.md`.

## Approved redesign sequence

**Architecture:** React owns outcomes and navigation. A lazy-loaded Three.js stage owns meshes, lighting, camera, and a cancellable timeline. Completion reveals the stored outcome; motion never generates outcomes.

- [x] Replace the progress pills with six bottom-to-top slots in `automatic-casting-panel.tsx`; retain named results and evidence.
- [x] Add `casting/coin-texture.ts`, `casting/coin-motion.ts`, and `casting/coin-scene.ts` for locally generated bronze art, choreographed trajectories, and disposable WebGL resources.
- [x] Add `casting/coin-stage.tsx` for lazy loading, lifecycle cleanup, reduced motion, and static fallback when WebGL is unavailable.
- [x] Replace the timer in `casting-flow.tsx` with the scene completion callback. Preserve reset, cancel, revisit, and duplicate-action guards.
- [x] Remove numeric values from automatic, manual, and direct casting presentation. Retain internal numeric mapping.
- [x] Replace obsolete turtle/dish styling with ivory, ink, and bronze workspace styling. Keep mobile actions stationary.
- [x] Update existing release scenarios for named-only results; verify all six outcomes, revisit/reset, reduced motion, fallback, and offline loading.
- [x] Run `./init.sh` and `pnpm test:release`; inspect desktop/mobile animation frames and record the evidence and limitations before pushing PR #49.

## Readability follow-up — 2026-09-29

User requested always-on toss animation, prominent moving lines, and gold/blue/red/white elemental coins.

1. Remove the reduced-motion bypass; animate the DOM fallback with cancellable completion.
2. Share `components/yao-symbol.tsx` across casting, direct/manual entry, and result boards. Use fixed-size SVG markers.
3. Share elemental icon paths and palettes between generated textures, DOM faces, and a named stage legend.
4. Verify actual frame changes under reduced motion, both moving markers at desktop/mobile widths, both faces of all four coins, reset/fallback, and release regressions. Run `./init.sh` before pushing.
