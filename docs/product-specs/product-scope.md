# Product scope

This document owns durable product boundaries. Detailed V1 behavior lives in the linked product specifications.

## Observed now

- `apps/web` is an installable React and Vite PWA shell.
- `@liuyao/core` validates line values, identifies primary and changed hexagrams, and calculates structured Eight Palace, Shi/Ying, Na Jia, element, and Six Relative board facts.
- `@liuyao/knowledge` exposes package metadata and a data directory.
- Package Vitest suites verify the current core and knowledge APIs.
- The repository has CI but no production deployment workflow.
- Current public name, manifest metadata, and favicon are provisional until product identity is approved.

## Intended V1

V1 is an offline-first web product for deterministic Liu Yao reading construction and reference lookup.

It includes:

- three supported reading-entry methods;
- primary and changed hexagram identification;
- Eight Palace, Shi/Ying, Na Jia, Five Element, and Six Relative facts;
- a result board that separates facts from explanation;
- a local Liu Yao knowledge browser;
- settings and diagnostics required by the V1 flows;
- PWA operation without a required network after the first successful load;
- approved product name, logo, icons, interface copy, and public metadata;
- a production domain with HTTPS and a repeatable deployment path;
- privacy, licensing, security, and product-use information required for a public release;
- launch verification and rollback readiness.

See `docs/product-specs/v1-mvp.md` for the canonical V1 feature set and release acceptance.

## V1 non-goals

- Saved readings, history, notes, tags, or backup.
- User accounts, cloud synchronization, or a backend.
- Native mobile applications or an admin application.
- Automated divination interpretation or AI-generated analysis.
- Use of God, Original Spirit, Avoid Spirit, Enemy Spirit, or similar advanced analysis.
- Month Command, Day Spirit, Empty Branches, solar-term boundaries, or other calendar-based analysis.
- Six Spirits, because V1 does not yet define a calendar convention.
- Multiple selectable rulesets.
- Product analytics or behavioral tracking.

## Later phases

Later work can add local reading history and backup, advanced Liu Yao analysis, calendar-derived facts, optional cloud services, and AI assistance.

A later item remains out of scope until its behavior has a canonical specification.
