# Core beliefs

This document owns the accepted engineering principles used to resolve recurring architecture trade-offs.

## Domain logic is deterministic and portable

`@liuyao/core` receives structured input and returns structured output. It must not require React, the DOM, storage, network access, or a backend.

## Applications consume domain packages

`apps/web` is the first product surface, not the owner of Liu Yao rules. Reusable calculations belong in `@liuyao/core`.

## Calculation and knowledge are separate

`@liuyao/core` owns calculations. `@liuyao/knowledge` owns structured reference data and explanatory content.

A calculation result must not depend on prose lookup. Knowledge content must not become hidden calculation logic.

## V1 is offline-first

The V1 core experience must work without a required backend. The PWA shell and local packages are the primary runtime foundation.

## Facts come before interpretation

V1 computes and displays deterministic facts and rules. Automated divination interpretation is not a V1 responsibility.

## Add abstractions after a real need appears

Do not create future apps, packages, contracts, or service layers only to reserve architecture. Add a boundary when a real consumer or invariant requires it.

## Enforcement

- Package tests protect deterministic behavior.
- TypeScript and ESLint protect static contracts.
- `scripts/check_ts_length.sh` limits oversized TypeScript files.
- `ARCHITECTURE.md` defines allowed and forbidden dependency direction.
