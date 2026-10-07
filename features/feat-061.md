# feat-061 — Complete Hệ Từ Thượng across NHL and PBC

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 334–362; PBC PDF 601–630; confirm twelve chapter boundaries.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Thượng chapters 1–6: both books and all named layers.
- [ ] Thượng chapters 7–12: both books and all named layers.
- [ ] Give each chapter and named layer its own disposition. Keep PBC's explicit omissions edition-specific; do not treat NHL's complete text or NTT (Ngô Tất Tố) excerpts as PBC coverage.
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
- Dependencies: feat-060 is done at `6139d39`; it is the sole dependency in [feature index](../feature_index.json).
- Sources: NHL is Nguyễn Hiến Lê's `source-book-nhl` / `edition-nhl-supplied`, 393 pages, SHA-256 `9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e`. PBC is Phan Bội Châu's `source-book-pbc` / `edition-pbc-supplied`, 655 pages, SHA-256 `cbe589d41b3285a8287800a0ed3789c5c0324fba6c80f35e9c27a25377a4d2d6`. Local PDFs and `sources.json` match these identities.
- Source boundaries: NHL PDF334 is the Hệ Từ title, not chapter prose; chapters1–12 occupy 335–362. NHL chapters6 and9 are present; parentheticals say Phan Bội Châu omitted them. PBC PDF601 contains its own introductory framing and chapter1; chapter headings may share a PDF page. PBC chapters6 and9 are explicitly `Khuyết`, chapter8 is selected sections3–6, chapter10 sections5–6, chapter11 sections1,2,4, and chapter12 says five sections are missing and two are translated. Keep those PBC dispositions distinct from the complete NHL chapters.
- Evidence: Independently checked source hashes and extracted text, then opened NHL page334 and chapters6/9 (346/352) and PBC pages601,619,620,623,625,628 at full-page scale. Complete extraction/inventory locators are navigation only; inspect each assigned page image individually before authoring claims or label-level data.
- Scope distinction: NTT (Ngô Tất Tố) is not the NHL source and is not an authoring source for this feature. Its quotations do not establish coverage of either NHL or PBC. Author new original summaries only; preserve source layers, exact PDF/printed locations and attribution. Route new units author061→audit092; do not close source review or certification.
- Planning: Retain the inline plan; this is one bounded knowledge-package batch, with no schema, API, workspace, calendar or UI change authorized.

## Handoff

- State: active on `feat/061-nhl-pbc-he-tu-thuong`.
- Evidence: Branch starts from clean, synced `main` at `6139d39`; feat-060 is done. Source identities, chapter boundaries and edition-specific omissions were checked against the local PDFs and canonical inventory.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect all assigned pages and named layers, starting with chapters1–6; keep the two editions' coverage and omissions separate.
