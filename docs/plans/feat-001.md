# Web UI foundation implementation plan

**Goal:** Deliver the F00 foundation described in [the task map](../product-specs/v1-task-map.md) using the selected [UI layout](../product-specs/ui-layout.md), without building later feature flows.

**Architecture:** Keep configuration, router, visual primitives, and locally bundled assets in `apps/web`. The router exposes stable destinations while the AppShell owns responsive navigation and safe-area spacing; product content remains the existing scaffold until F06–F09. Domain packages remain untouched.

**Stack:** React 19, Vite 7, Tailwind CSS, shadcn/ui `new-york`, React Router, local WOFF2 font assets, pnpm.

## Scope and constraints

- F00-T01–T05 only; do not implement reading, library, settings, casting behavior, identity approval, or domain logic.
- Use `/`, `/library`, `/settings`, `/library/:entityType/:id`, and `/casting` as stable paths. Root navigation is hidden on the focused casting route and remains visible on library details.
- Respect the `<768px` mobile bottom-navigation and `>=768px` desktop top-navigation boundary, 64px bottom-nav height, 56px top-nav height, safe-area insets, visible keyboard focus, and 44px touch targets.
- Self-host the canonical `Noto Serif`, `Noto Sans`, `Noto Serif CJK`, `Noto Sans CJK`, and Latin-only `Cinzel` families from `docs/product-specs/ui-layout.md`. For each asset, record source, version, license, subset provenance, and required notices following `LICENSING.md`; audit bundled sizes and allow no runtime font CDN.
- Do not change provisional product naming or implement the future user flows assigned to F06–F09. Preserve the existing PWA behavior unless F00 requires a direct configuration change.

## Tasks and acceptance

1. **F00-T01 — Styling and aliases:** Set up Tailwind/PostCSS and `@/*` in TypeScript and Vite. Build with `pnpm --filter @liuyao/web build` and confirm aliases resolve.
2. **F00-T02 — Components and tokens:** Initialize `components.json` with `new-york`, CSS variables, semantic base tokens, `cn` utility, and a representative shadcn primitive. Audit the generated component and confirm keyboard focus styling; avoid installing the complete future component inventory.
3. **F00-T03 — Routing:** Add a router provider and named path constants for all five documented route shapes; preserve an operable scaffold on `/` and use restrained route shells for unfinished destinations. Smoke-check navigation, deep links, history, and reloads locally without claiming later feature behavior.
4. **F00-T04 — Fonts:** Bundle and reference the five named local font families in CSS with explicit serif/sans CJK fallbacks and Latin-only Cinzel. Audit the built assets and requests for locally served fonts and no runtime CDN/remote font dependency; report per-font and total payload, source/version/license, subset provenance, and required notices under `LICENSING.md`. Install-time precache and offline availability are F10, not F00.
5. **F00-T05 — AppShell:** Build reusable responsive TopNav, BottomNav, content-area primitives, and safe-area utilities using the documented breakpoints and offsets. Check compact, tablet, and wide layouts, focused-route nav exclusion, touch targets, and absence of content occlusion in the shell foundation. F06-T01 consumes these primitives to replace the scaffold with the completed reading flow; F06-T13 integrates the safe-area utilities in that flow rather than duplicating the shell or inset implementation.
6. **Verification and handoff:** Run `./init.sh` and the read-only checks in `docs/development.md`; record build, component, route, asset, and responsive evidence in `features/feat-001.md`. Mark only feat-001 done after all acceptance passes, and append a material result in `progress.md`.

## Risks

- Font payload and license constraints may require separate CJK subsets and a clear audit before completion.
- Router integration must not imply unfinished routes have their future product behavior.
- Existing PWA `autoUpdate` is outside F00; do not silently widen into F10.

## Reference documents

- `features/feat-001.md` and `docs/product-specs/v1-task-map.md` own F00 execution and evidence.
- `docs/product-specs/ui-layout.md` owns typography and responsive layout.
- `ARCHITECTURE.md`, `docs/product-specs/product-scope.md`, and `LICENSING.md` govern boundaries and third-party assets.

## Decision log

- **2026-09-25 — Selected design:** Implement the documented F00 design in `docs/product-specs/ui-layout.md`; no new product identity or visual direction is approved here.
- **2026-09-25 — Delivery boundary:** Route shells and AppShell primitives are foundation only. Full destination screens and draft-safety behavior remain F06–F09.
- **2026-09-25 — Workspace:** The user explicitly selected the existing checkout on `feat/feat-001-web-ui-foundation` for this batch. Do not create another workspace; this overrides the original dispatch's new-worktree instruction.
