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

- [ ] Complete all F00 tasks and their evidence requirements in `docs/product-specs/v1-task-map.md`.
- [ ] Meet the V1 completion condition: Tailwind, shadcn/ui new-york, routing, path aliases, base tokens, local fonts, and AppShell primitives.
- [ ] Pass the repository verification workflow in `./init.sh`.

## Relevant docs

- `docs/product-specs/v1-mvp.md`
- `docs/product-specs/v1-task-map.md`
- `docs/product-specs/product-scope.md`
- `ARCHITECTURE.md`

## Tasks

- [ ] F00-T01 — Configure Tailwind CSS, PostCSS, and path aliases (`@/*`) in `apps/web`
- [ ] F00-T02 — Initialize shadcn/ui with `new-york` style, CSS variables, and base design tokens
- [ ] F00-T03 — Define SPA route infrastructure, router provider, and route constants
- [ ] F00-T04 — Install, bundle, and self-host local typography assets without remote CDN
- [ ] F00-T05 — Establish AppShell primitives, responsive breakpoints, and iOS safe-area utilities

Task details and evidence remain canonical in `docs/product-specs/v1-task-map.md`.

Execution plan: `docs/plans/feat-001.md`.

## Dependencies

- None.

## Handoff

- State: active
- Evidence: —
- Dependency check: none.
- Next: Implement F00-T01–T05 and collect the task-map evidence.
