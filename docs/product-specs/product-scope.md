# Product scope

This document owns durable product scope. It separates observed capability from intended work so agents do not treat roadmap items as implemented behavior.

## Observed now

- `apps/web` is an installable React/Vite PWA shell.
- `@liuyao/core` defines line values and detects changing lines.
- `@liuyao/knowledge` exposes initial knowledge metadata and a location for structured datasets.
- Package-level Vitest suites verify the current core and knowledge APIs.

## Intended V1

V1 is the smallest Liu Yao tool that is useful without accounts or a backend.

- Create a reading through casting or direct six-line input.
- Calculate and identify the reading deterministically.
- Display the primary and changed hexagram information needed by supported rules.
- Explain deterministic facts and rules from structured knowledge.
- Browse Liu Yao reference knowledge.
- Provide settings required by these flows.
- Keep the core experience available offline.

## V1 non-goals

- Automated divination interpretation.
- User accounts or cloud synchronization.
- AI-generated reading analysis.
- Advanced rule analysis that is not yet supported by tested domain logic.
- A backend API, native mobile app, or admin application.

## Later phases

Later work can add personal reading history and backup, advanced Liu Yao analysis, and optional cloud or AI capabilities.

Those items remain future scope until their behavior is specified and implemented.
