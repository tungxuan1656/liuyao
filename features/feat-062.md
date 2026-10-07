# feat-062 — Complete Hệ Từ Hạ across NHL and PBC

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 363–387; PBC PDF 631–648; confirm twelve chapter boundaries.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Hạ chapters 1–6: both books and all named layers.
- [ ] Hạ chapters 7–12: both books and all named layers.
- [ ] Each chapter requires its own passage disposition; quoted NTT fragments do not create an absent appendix.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review chapters 1–6 and commit.
2. Review chapters 7–12 and commit.
3. Reconcile quẻ-level quotations, notes, and exclusions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- Selection: Next dependency-ready feature in the user-authorized feat-045–083 sequence; skip completed feat-067 and feat-078.
- Dependencies: feat-061 is done on `main` at `66cc2ea`; feat-061 was the only dependency. Feat-101 is also done.
- Sources: NHL is Nguyễn Hiến Lê's `source-book-nhl` / `edition-nhl-supplied`, 393 pages, SHA-256 `9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e`. PBC is Phan Bội Châu's `source-book-pbc` / `edition-pbc-supplied`, 655 pages, SHA-256 `cbe589d41b3285a8287800a0ed3789c5c0324fba6c80f35e9c27a25377a4d2d6`. Both local PDFs match `sources.json`.
- Source boundaries: NHL Hạ is PDF363–388 after Thượng closes on362; its retrospective begins at389, outside scope. PBC Hạ is PDF631–648, followed by separate wings at649. The canonical chapter registers are in the [source inventory](../docs/reviews/knowledge/source-inventory.md) (lines302–313 and539). Feat059 corrected NHL chapter12's old page-end from386 to388 but authored no Hạ content; feat062 owns the complete Hạ source comparison (source-inventory line3677).
- PBC state: The source labels the wing `lược trích`; preserve each chapter's missing notice or selected sections as PBC-specific, and do not reconstruct absent text or transfer PBC omissions to NHL. See the canonical chapter register rather than creating a duplicate table. Neither edition's Hạ content is interchangeable with NTT fragments.
- Parent source check: Direct PyMuPDF metadata/page-text probes matched both fingerprints and chapter starts. Full-page samples opened for NHL PDF363,382,388 and PBC PDF631,634,638,643,648; the worker must inspect all 44 assigned page images individually before completing dispositions. Inventory locators are navigation, not image review.
- Planning: Retain the inline plan; this is one bounded knowledge-package batch with no schema, API, workspace, calendar, or UI change. Route new units to author feat-062 → audit feat-092; do not alter previous feat-061 routes. Keep source audit/review/certification open.

## Handoff

- State: active on `feat/062-nhl-pbc-he-tu-ha`.
- Evidence: Clean, synced `main` at `66cc2ea`; feat-061 is done. Source identities match the canonical catalog; the scope follows the assigned NHL and PBC intervals.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect every assigned NHL/PBC page image and all twelve chapter boundaries, preserving PBC's abbreviated/missing selections separately from NHL.
