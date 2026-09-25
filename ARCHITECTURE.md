# Architecture

This document owns the current system topology, code map, dependency direction, and major runtime flow.

## System

```text
                 ┌──────────────────────┐
                 │      apps/web        │
                 │ React + Vite + PWA   │
                 └──────────┬───────────┘
                            │
                 ┌──────────┴──────────┐
                 ▼                     ▼
        packages/liuyao-core   packages/knowledge
        deterministic logic    reference knowledge
```

All current runtime behavior is local to the browser. The repository has no backend, account system, or persistence service.

## Code map

| Area                   | Responsibility                                                                |
| ---------------------- | ----------------------------------------------------------------------------- |
| `apps/web`             | Render the PWA and compose package APIs into user-facing flows.               |
| `packages/liuyao-core` | Own deterministic Liu Yao input types and calculation logic.                  |
| `packages/knowledge`   | Own structured reference data, terminology, source metadata, and access APIs. |
| `scripts`              | Own repository-level mechanical checks that are not package logic.            |

## Boundaries

Allowed:

```text
apps/web -> @liuyao/core
apps/web -> @liuyao/knowledge
```

Forbidden:

```text
@liuyao/core -X-> React / DOM / browser APIs / persistence / network
@liuyao/core -X-> apps/web
@liuyao/knowledge -X-> apps/web
apps/web -X-> reusable Liu Yao calculation rules
```

Packages currently have no runtime dependency on each other. Introduce a package edge only when one package has a real owned responsibility that requires it.

## Current flow

1. `apps/web` starts through Vite and registers the PWA behavior.
2. The UI sends structured reading input to `@liuyao/core`.
3. `@liuyao/core` returns deterministic structured results.
4. The UI reads descriptive or reference material from `@liuyao/knowledge`.
5. The UI renders facts and knowledge without moving reusable domain rules into React components.

The current core implementation only detects and counts changing lines. Broader Liu Yao calculations are future work.

## Related docs

- Engineering principles → `docs/design-docs/core-beliefs.md`
- Product scope → `docs/product-specs/product-scope.md`
- Development and verification → `docs/development.md`
