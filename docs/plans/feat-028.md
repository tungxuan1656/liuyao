# feat-028 — shadcn Base UI and CSS coin casting implementation plan

> **Execution:** Follow repository implementation and verification rules. Work inline on `feat/028-coin-casting`, as requested. Implementation awaits review of this plan.

**Goal:** Replace the web interface with the selected shadcn system and simple, readable coin casting.

**Architecture:** React owns drafts, predetermined outcomes, and navigation. Official shadcn components use Base UI for interaction. Small domain renderers own coin faces and yao geometry, with a cancellable DOM/CSS flip.

**Tech stack:** React 19, Vite, Tailwind CSS 4, shadcn preset `b59jufSZGa`, Base UI, Lucide, and locally bundled Noto fonts.

## Global constraints

- Canonical presentation: [`ui-layout.md`](../product-specs/ui-layout.md), especially sections marked `Intended` and `Proposed`.
- Canonical casting behavior: [`reading-flow.md`](../product-specs/reading-flow.md).
- Verification and test placement: [`development.md`](../development.md).
- Use Base UI explicitly. The preset code does not encode the primitive library.
- Migrate every web route and shared interaction surface. Redesign Home, automatic casting, manual casting, and direct input.
- Preserve core calculations, weighted coin identity order, cryptographic randomness, in-memory drafts, and PWA update behavior.
- Keep Vietnamese labels, local fonts, 44px touch targets, keyboard access, and responsive layouts.
- Remove Three.js and Radix dependencies after their consumers migrate.
- Keep the existing monorepo, Vite application, branch, and PR #49.

## Decision and review state

The user requested this replacement after reviewing commit `46441cc`. Earlier 3D acceptance criteria are superseded.

The user selected six vertical direct-input rows. Full-page control migration is included in the requested full-shadcn scope.

The proposed 1200ms flip timing and detailed compositions await plan review. No application migration has run during planning.

Two execution approaches were considered:

| Approach                                                               | Trade-off                                                                              |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Replace primitives, then migrate each surface and remove legacy styles | Recommended. Every stage has a focused verification boundary.                          |
| Rebuild all routes and dependencies in one change                      | Fewer intermediate states, but harder to isolate focus, draft, and layout regressions. |

## File responsibilities

All source paths below are relative to `apps/web/src/` unless they start at the repository root.

| Files                                                                                                                            | Responsibility after migration                                                 |
| -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `apps/web/components.json`, `apps/web/package.json`, `pnpm-lock.yaml`, `index.css`                                               | Preset, dependencies, local fonts, semantic tokens, pointer behavior           |
| `components/ui/*`                                                                                                                | Official generated Base UI primitives and standard shadcn compositions         |
| `components/confirmation-dialog.tsx`                                                                                             | Reusable product confirmation copy and callbacks over shadcn `AlertDialog`     |
| `components/app-shell.tsx`, `components/navigation.tsx`, `App.tsx`                                                               | Shared navigation and Home form                                                |
| `casting-flow.tsx`, `automatic-casting-panel.tsx`, `manual-casting-panel.tsx`, `direct-casting-panel.tsx`                        | Existing casting state integration and redesigned pages                        |
| `casting/coin-face.tsx`, `casting/coin-stage.tsx`, `casting/coin-identities.ts`                                                  | Unicode faces, fixed arrangements, palette/identity order, flip lifecycle      |
| `casting/casting-hexagram.tsx`, `components/yao-symbol.tsx`                                                                      | Confirmed/revealed lines and shared line geometry                              |
| `result-view.tsx`, `result-board.tsx`, `result-facts.tsx`                                                                        | Result composition, facts, and Base UI sheet                                   |
| `library-browser.tsx`, `library-detail.tsx`, `settings.tsx`, `components/pwa-update-banner.tsx`                                  | Remaining route controls and feedback                                          |
| `App.css`, `casting/casting-workspace.css`, `result-view.css`, `library.css`, `settings.css`, `components/pwa-update-banner.css` | Remove duplicated control styles and obsolete decoration during each migration |
| `e2e/release/reading-library.spec.ts`, `e2e/release/pwa.spec.ts`, `e2e/release/qa.spec.ts`                                       | Existing release scenarios adapted to real Base UI roles and DOM flip behavior |

## Task 1 — Apply the preset and replace shared primitives

**Deliverable:** The app builds with the selected Base UI configuration and functional confirmations.

- [ ] Inspect the working tree and run `./init.sh` for the implementation baseline.
- [ ] Record the current dependency graph, generated component inventory, and font declarations.
- [ ] Run the preset command inside the existing web workspace:

```bash
pnpm dlx shadcn@latest init --preset b59jufSZGa --template vite --pointer --base base --force --reinstall
```

- [ ] Inspect the generated diff before changing consumers. Verify `base: base` and the decoded preset with `info --json`.
- [ ] Add the required official components from that same workspace:

```bash
pnpm dlx shadcn@latest add field textarea radio-group toggle-group badge tabs sheet input-group alert empty separator
```

- [ ] Read generated files and component documentation. Use their actual Base UI APIs, including `render` instead of Radix `asChild`.
- [ ] Adapt `ConfirmationDialog` to the standard `AlertDialog` composition. Keep cancel focus, labels, destructive actions, and caller callbacks.
- [ ] Keep locally bundled Noto fonts. Remove any generated remote font import or duplicate font delivery.
- [ ] Set shared minimum touch targets to 44px where the generated compact defaults are smaller.
- [ ] Remove broad legacy selectors that override generated Button, Card, input, and dialog styling.
- [ ] Run `pnpm typecheck` and `pnpm build`. Exercise cancel/reset/replacement dialogs before migrating the pages.

## Task 2 — Rebuild Home and shared navigation

**Deliverable:** Home follows the first reference's hierarchy using the neutral preset.

- [ ] Compose the form with Card sections, Field components, Textarea, and RadioGroup.
- [ ] Use one session-storage note and one full-width primary action. Preserve continue-draft and replace-reading states.
- [ ] Compose navigation links with shadcn link/button primitives and Lucide icons. Keep router link semantics and `aria-current`.
- [ ] Retain desktop navigation and mobile safe-area behavior from the canonical layout contract.
- [ ] Use preset typography for the brand. Remove Cinzel files only after the last consumer migrates, and update font notices accordingly.
- [ ] Verify all three Home choices reach the correct casting mode by mouse and keyboard.
- [ ] Verify the completed reading survives Library and Settings navigation.

## Task 3 — Replace 3D rendering with the fixed coin flip

**Deliverable:** Automatic casting shows triangle/square coins with a visible flip and unchanged outcomes.

**Interfaces:** Keep `CoinStage({ count, toss, busy, onComplete })`. Keep `CoinFace({ value, name })` or update its existing callers together.

- [ ] Replace the scene lifecycle in `casting/coin-stage.tsx` with DOM elements and a cancellable animation completion path.
- [ ] Use CSS grid positions for the triangle and square. Coin positions must not depend on the sampled faces.
- [ ] Simplify `coin-identities.ts` to names, semantic palette tokens, and the existing weighted order.
- [ ] Replace SVG sun/moon and elemental paths with Unicode text. Add Vietnamese labels outside decorative glyphs.
- [ ] Implement the proposed flip using this presentation-only state flow:

```text
idle / revisit: show preview or stored faces
cast: obtain one CoinTossResult in CastingFlow
busy: four 300ms scaleX flip cycles, alternating display glyphs at edge-on frames
complete: show CoinTossResult.coins and call onComplete once
reset / cancel / unmount: cancel frames, timers, animations, and completion
```

- [ ] Use one elapsed-time source for the flip and reveal. Protect React Strict Mode cleanup and stale callbacks with cancellation.
- [ ] Keep the current result hidden until completion. Disable repeat casts and step changes while busy.
- [ ] Apply the same flip under reduced-motion preferences. Do not use a global reduced-motion rule to suppress this explicit action.
- [ ] Compose the automatic workspace with Card sections, ToggleGroup, Separator, the forming hexagram, and a stationary footer.
- [ ] Change motion copy to `Đang gieo…`. Replace the separate elemental legend with labels below the four coins.
- [ ] Remove `casting/coin-scene.ts`, `casting/coin-motion.ts`, `casting/coin-texture.ts`, and `casting/coin-legend.tsx` after their imports disappear.
- [ ] Remove the rendering dependencies:

```bash
pnpm --filter @liuyao/web remove three @types/three
```

- [ ] Verify three-coin and four-coin casts through all six lines, revisit, reset mid-flip, cancel, and repeated clicks.
- [ ] Capture actual intermediate frames under normal and reduced motion. Verify fixed centers and visible face changes before the final result.

## Task 4 — Rebuild manual and direct input

**Deliverable:** Both input modes use consistent shadcn controls and readable line symbols.

- [ ] Reuse the triangle/square presentation for manual coins. Wrap interactive faces in shadcn Button controls.
- [ ] Preserve each face, the preview, explicit confirmation, locked confirmed lines, and revisit behavior.
- [ ] Verify that an all-moon physical toss can be recorded through the manual controls.
- [ ] Extend `CastingHexagram` to accept revealed line values rather than automatic-only toss records:

```ts
type CastingHexagramProps = {
  lines: readonly (LineValue | undefined)[];
  step: number;
};
```

Automatic callers exclude the pending toss until completion. Manual callers supply only confirmed lines. `LineValue` comes from `@liuyao/core`.

- [ ] Integrate manual progress and actions into the same Card structure. Remove `manual-casting-actions.tsx` if it becomes unused.
- [ ] Render direct input as six vertical rows, from Hào 6 to Hào 1, with one controlled ToggleGroup per row.
- [ ] Use four columns for each desktop choice group and two columns on mobile. Prevent wrapping glyphs into neighboring choices.
- [ ] Keep the chosen value on repeated activation. Use the generated single-select API rather than hand-written pressed states.
- [ ] Retain `YaoSymbol`, with a dedicated marker area and short labels. Replace duplicate per-choice descriptions with one common legend.
- [ ] Keep `Tính quẻ` disabled until all six positions are valid. Preserve domain storage order from Hào 1 to Hào 6.
- [ ] Verify fixed manual/direct inputs produce identical results, including both moving-line types.

## Task 5 — Complete the full-shadcn migration

**Deliverable:** Results, Library, Settings, and shared feedback use the same primitives and tokens.

- [ ] Replace result fact buttons and panels with Button/Card/Badge compositions while retaining all facts and Library targets.
- [ ] Replace the hand-written result overlay with the Base UI Sheet, anchored at the bottom below 900px.
- [ ] Remove custom focus-trap, scrim, and scroll-lock implementations once Sheet owns those interactions.
- [ ] Preserve focus restoration to the selected fact and the existing resize behavior across 900px.
- [ ] Replace Library categories with Tabs, search with InputGroup, rule filters with ToggleGroup, and empty results with Empty.
- [ ] Migrate Library detail panels and links. Keep exact-ID search, source references, and related-figure counts.
- [ ] Migrate Settings sections and status presentation to Card/Badge/Alert. Preserve install and update subscriptions.
- [ ] Migrate PWA feedback controls and confirmations. Preserve explicit update acceptance and draft protection.
- [ ] Remove obsolete route CSS and unreferenced components after each surface migrates. Keep only geometry/layout rules without shadcn equivalents.
- [ ] Remove `@radix-ui/react-slot`. Inspect transitive dependencies for any other Radix package before declaring completion.
- [ ] Verify package imports, generated components, and runtime bundles contain no Radix or Three.js implementation.

## Task 6 — Verification and preview review

The implementer owns the following evidence. Existing release scenarios are the automated browser boundary. Direct inspection establishes visual claims.

| Claim                                | Minimum evidence                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------ |
| Exact preset and Base UI migration   | `shadcn info --json`, package graph, source/import audit, successful build                 |
| 3D removal                           | No scene/texture/motion imports, no WebGL canvas, no Three.js dependency or scene chunk    |
| Visible flip and correct final faces | Intermediate frames plus deterministic browser crypto input for three/four coins           |
| No stale outcome                     | Reset/cancel mid-flip, duplicate-click prevention, revisit without animation               |
| Manual and direct correctness        | Existing fixed-value release scenario and both moving-line markers                         |
| Modal behavior                       | Escape, scrim close, Tab containment, return focus, and result resize checks               |
| Full UI consistency                  | Review every route at 390×844 and 1280×900, plus a 320px overflow check                    |
| Offline and update safety            | Existing production PWA release scenarios and offline casting with local glyph/font assets |

- [ ] Update existing release selectors for Base UI roles. Replace the WebGL-ready assertion with the actual DOM flip state.
- [ ] Preserve the stationary-primary-action assertion and reduced-motion scenario.
- [ ] Run `./init.sh` and `pnpm test:release` after the final application changes.
- [ ] Review Home, both automatic arrangements, manual input, all direct rows, both moving markers, results, Library, and Settings.
- [ ] Verify local font delivery, text-presentation glyphs, focus rings, touch targets, and absence of horizontal overflow.
- [ ] Record concrete evidence and limitations in `features/feat-028.md`. Append only new material results to `progress.md`.
- [ ] Present the updated preview for user visual review before marking the feature done.

Repeat checks only when later changes invalidate their evidence. Browser emulation does not establish physical-phone appearance or frame pacing.

## Task 7 — Normalize the sitewide composition (approved follow-up)

**Goal:** Implement the shared composition and spacing contract in `ui-layout.md` without changing the selected fonts, control dimensions, touch targets, or domain calculations.

**Ownership:** Designer owns `apps/web/src/App.tsx`, `components/app-shell.tsx`, `components/navigation.tsx`, `result-view.tsx`, `result-board.tsx`, `result-facts.tsx`, `library-browser.tsx`, `library-detail.tsx`, `settings.tsx`, `direct-casting-panel.tsx`, and their presentation CSS. No other lane edits these files.

- [ ] Establish reusable route/container, card, header, group, and row rhythm with existing utilities or small shared layout styles; avoid duplicated near-identical per-route spacing.
- [ ] Apply 16px/24px route gutters, 16px/24px card padding, 24px mobile/32px desktop section rhythm, and documented width variants across every route. Preserve the existing shadcn preset and Noto fonts.
- [ ] Ensure the result board's mobile interactive rows meet the documented 48px minimum; preserve the 900px split and fact inspection behavior.
- [ ] Review Home, result, Library index/detail, Settings, and direct input at 320px, 390px, and 1280px, including overflow and keyboard focus.

## Task 8 — Unify casting visuals and one-press next toss

**Ownership:** Designer owns `apps/web/src/automatic-casting-panel.tsx`, `manual-casting-panel.tsx`, `casting/coin-face.tsx`, `casting/coin-stage.tsx`, `casting/casting-hexagram.tsx`, `components/yao-symbol.tsx`, `components/yao-symbol.css`, `casting/casting-workspace.css`, `casting/input-workspace.css`. Fixer owns only `apps/web/src/casting-flow.tsx` and `apps/web/src/manual-casting-actions.tsx` if needed. Coordinate the action contract; no concurrent edits to the same file.

- [ ] Designer: share triangle/square coin geometry in manual and automatic modes. Render 64px faces and labels in the 2×2 four-coin stage; keep stage and footer stable during animation.
- [ ] Designer: align forming-hexagram columns and replace boxed moving symbols with high-contrast unboxed markers, preserving semantic labels and line value mapping.
- [ ] Fixer: when a completed automatic line has an uncast successor, advance and trigger one cryptographic toss on the same activation. Preserve existing evidence on revisits, prevent repeat actions while busy, and keep sixth-line completion unchanged. Coordinate the `onNext` contract with designer before edits.
- [ ] Verify all six lines, back/revisit, reset/cancel mid-animation, three/four coins, and one-press behavior via direct UI inspection. Application test placement remains restricted by `docs/development.md`.

## Task 9 — Reconcile, verify, and hand off

- [ ] Reconcile both ownership lanes, run `./init.sh` and `git diff --check`, and inspect unintended changes.
- [ ] Verify screens and interaction states at 320×720, 390×844, and 1280×900 using direct browser inspection; capture findings, including limitations of simulated mobile.
- [ ] Update `features/feat-028.md` and append a `progress.md` block only for a changed result or blocker. Do not mark the feature done until its outstanding acceptance criteria and user preview review pass.
