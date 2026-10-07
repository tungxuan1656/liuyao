# feat-060 — Complete NTT and PBC introductory traditions and diagrams

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NTT PDF 1–79 and final colophon 938; PBC PDF 1–26 and 649–655.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] NTT translator introduction and Trình Di preface.
- [x] NTT Chu Hy diagrams (20–63).
- [x] NTT Dịch Thuyết Cương Lĩnh (64–79).
- [x] PBC introductions, Phàm Lệ, and end matter.
- [x] PBC surviving Thuyết Quái, Tự Quái, Tạp Quái.
- [x] Identify translator, commentator, and quoted-author roles.
- [x] Diagram units use the implemented feat-101 representation with orientation and supporting claims.
- [x] Record PBC’s absent Thuyết Quái chapter; NTT has no separate full Hệ Từ appendix.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- Selection: next dependency-ready feature in the user-authorized feat-045–083 sequence; skip completed feat-067 and feat-078.
- Dependencies: feat-059 and feat-101 are done on main at `6ad1581`.
- Source identity: NTT `source-book-ntt` / `edition-ntt-supplied`, 938 pages, SHA-256 `2ac72f723af153ecfd7e15389d1037119d30c8405830471c75f9ed3f0f94f4fd`; PBC `source-book-pbc` / `edition-pbc-supplied`, 655 pages, SHA-256 `cbe589d41b3285a8287800a0ed3789c5c0324fba6c80f35e9c27a25377a4d2d6`. Both hash/page counts were checked against local PDFs and `sources.json`.
- Scope reconciliation: user approved PBC PDF 1–26 (not 1–17) because the canonical inventory assigns the complete Phàm Lệ/Cương Lĩnh and diagram units on PDF 15–26 to feat-060. PBC's Chu Dịch body begins at PDF 27, outside this feature. Preserve its end matter on PDF 649–655.
- Source boundaries: PBC PDF 7–10 editor/edition framing; 11–12 image plates; 13–14 author preface; 15–18 Phàm Lệ; 19–26 diagram/exposition; PDF 27 starts the quẻ text. NTT PDF 7–17 translator framing, 18–19 Trình Di preface, 20–63 Chu Hy diagrams/exposition, 64–78 Dịch Thuyết Cương Lĩnh and notes, and 79 starts the quẻ text; PDF 938 is the colophon.
- Figures: use the implemented feat-101 version-2 `figures` contract. Preserve source order, orientation, labels and attributed alternatives with supporting claim IDs; do not store image bytes or invent a generic diagram DSL. Do not treat visual-anchor inventories as exhaustive inspections.
- Exclusions: record the PBC Thuyết Quái first-chapter gap as the source presents it; do not reconstruct it. NTT has no separate full Hệ Từ appendix; do not infer missing content. Feature 084 remains a cross-reference only for matching technical fixtures, not a co-owner of these source sections. All new sources route author 060 → audit 092.
- Planning: keep the inline plan; no API, migration, workspace, calendar or UI changes are in scope.
- Source-supported correction approved by coordinator during implementation: NTT PDF79 includes substantive Giải Nghĩa below its Thượng Kinh heading. Reclassify `ntt-upper-divider` as content while retaining its ID/range/060→092 route, and add separate heading/prose children. PDF80 is boundary-only and remains outside authoring scope.

## Handoff

- State: done; merged to `main` in PR #88 at `d082eeaad74affb181ec3f1904e312fd35f4a436`, from reviewed head `e2304267076afb81115c99c6fafd101f021fa29e`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. Verify run `37549113356`/job `112560098877`, Cloudflare Pages, and GitGuardian passed. Both pre-push and post-merge `./init.sh` passed 5,215 tests (5,034 knowledge, 181 core); corpus/books, production package exports/types, and prior-corpus preservation checks passed. Post-merge verification added `.codegraph/` to `.prettierignore` because formatting had tried to read a missing transient `codegraph.lock` from local ignored CodeGraph state. The measured 11,346,876-byte bundle fits the unchanged 11 MiB Workbox limit with 187,460 bytes headroom; all 18 precache entries remain.
- Coverage: Added 23 source-comparison articles, 487 new claims/citations, 489 dispositions including two reused selections, and 18 visually inspected figures with 235 evidence-backed labels. PBC scope is PDF 1–26 and 649–655; NTT is PDF 1–79 and 938. The PDF 79 Giải Nghĩa prose is represented separately from its heading while the parent ID/range/ownership remain stable; PDF 80 is outside scope. Existing PBC note 13 and 21 claims remain under their original quẻ owners.
- Open gates: Source audit 092, global source review, and certification remain open; their approval gates remain closed. PBC publication year and rights remain unconfirmed; NTT colophon dates printing/deposit only. Missing source text and uncertain labels/notes remain explicit, with no efficacy or modern advice claimed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Continue with selected feat-061 from updated `main`.
