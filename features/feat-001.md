# feat-001 — Web UI foundation

## Goal

Tailwind, shadcn/ui new-york, routing, path aliases, base tokens, local fonts, and AppShell primitives.

## Scope

- Implement the V1 work defined for F00 in the canonical task map.
- Preserve the architecture and product boundaries in the relevant docs.

## Non-goals

- Work assigned to other V1 features.
- Product capabilities listed as V1 non-goals in `docs/product-specs/product-scope.md`.

## Acceptance

- [x] Complete all F00 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [x] Meet the V1 completion condition: Tailwind, shadcn/ui new-york, routing, path aliases, base tokens, local fonts, and AppShell primitives.
- [x] Pass the repository verification workflow in `./init.sh`.
- [x] Resolve the shared placeholder Return to home target review finding: at least 44×44 CSS pixels and visible keyboard focus on `/library`, `/settings`, and `/casting`, without changing its destination.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [x] F00-T01 — Configure Tailwind CSS, PostCSS, and path aliases (`@/*`) in `apps/web`
- [x] F00-T02 — Initialize shadcn/ui with `new-york` style, CSS variables, and base design tokens
- [x] F00-T03 — Define SPA route infrastructure, router provider, and route constants
- [x] F00-T04 — Install, bundle, and self-host local typography assets without remote CDN
- [x] F00-T05 — Establish AppShell primitives, responsive breakpoints, and iOS safe-area utilities

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

Execution plan: `docs/plans/feat-001.md`.
Follow-up plan: `docs/plans/feat-001-placeholder-link-hit-target.md`.

## Dependencies

- None.

## Handoff

- State: done; PR #10 and the placeholder target follow-up are merged.
- Evidence: `./init.sh` and `pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build` passed on 2026-09-25. ESLint reported one non-blocking shadcn Button fast-refresh export warning.
- F00-T01/T02: web build resolves `@/lib/utils`; `components.json` records `new-york` and CSS variables; Button primitive and semantic tokens audited.
- F00-T03: browser navigation `/` → `/library`, direct `/library/hexagram/42` reload, and focused `/casting` checked; library detail keeps root nav, casting hides it.
- F00-T04: browser loaded all five font faces via local 200 responses, including 六 from the nine-glyph CJK subset; built CSS references local `/fonts/` assets only. `apps/web/public/fonts/README.md` records a 538,052-byte payload, pinned sources, CJK subsets, and per-family OFL notices. F10 owns install-time precaching.
- F00-T05: browser checked 390px mobile bottom nav (64px), 1024px desktop top nav (56px), content offsets, selected Library tab, desktop Online badge, and no horizontal overflow. Browser measured the Back to Library link at 132×44px on mobile. All Button sizes provide at least 44×44px targets; border and focus tokens meet the 3:1 non-text contrast requirement. Safe-area CSS uses `env(safe-area-inset-bottom)`; device-specific inset remains for F06 integration.
- P2 review follow-up: PR #10's shared `RouteShell` Return to home anchors lacked the documented 44×44px minimum and focus-visible styling. At a 390×844px viewport, browser checks measured each on `/library`, `/settings`, and `/casting` at 118.47×44px, with a 2px solid keyboard-visible focus outline; clicking each navigated to `/` (`ROUTES.home`). The library-detail Back to Library link remains 131.92×44px and targets `/library`. `./init.sh` passed on 2026-09-26 (one existing non-blocking shadcn Button fast-refresh warning). PR #11 was approved at `052bd46` and squash-merged as `2f2936c` on 2026-09-26.
- Dependency check: none.
- Next: Start feat-002 after confirming the clean main checkout.
