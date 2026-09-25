# Product scope

This document owns durable product boundaries. Detailed V1 behavior lives in the linked product specifications.

## Observed now

- `apps/web` is an installable React and Vite PWA shell.
- `@liuyao/core` defines line values and detects changing lines.
- `@liuyao/knowledge` exposes package metadata and a data directory.
- Package Vitest suites verify the current core and knowledge APIs.

## Intended V1

V1 is an offline-first web tool for deterministic Liu Yao reading construction and reference lookup.

It includes:

- three supported reading-entry methods;
- primary and changed hexagram identification;
- Eight Palace, Shi/Ying, Na Jia, Five Element, and Six Relative facts;
- a result board that separates facts from explanation;
- a local Liu Yao knowledge browser;
- settings and diagnostics required by the V1 flows;
- PWA operation without a required network after the first successful load.

See `docs/product-specs/v1-mvp.md` for the canonical V1 feature set and acceptance criteria.

## V1 non-goals

- Saved readings, history, notes, tags, or backup.
- User accounts, cloud synchronization, or a backend.
- Native mobile applications or an admin application.
- Automated divination interpretation or AI-generated analysis.
- Use of God, Original Spirit, Avoid Spirit, Enemy Spirit, or similar advanced analysis.
- Month Command, Day Spirit, Empty Branches, solar-term boundaries, or other calendar-based analysis.
- Six Spirits, because V1 does not yet define a calendar convention.
- Multiple selectable rulesets.

## Later phases

Later work can add local reading history and backup, advanced Liu Yao analysis, calendar-derived facts, optional cloud services, and AI assistance.

A later item remains out of scope until its behavior has a canonical specification.
