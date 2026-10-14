# task-complete-he-tu-ha-across-nhl-and-pbc - Complete Hệ Từ Hạ across NHL and PBC

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-complete-he-tu-thuong-across-nhl-and-pbc](task-complete-he-tu-thuong-across-nhl-and-pbc.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 363–388; PBC PDF 631–648; confirm twelve chapter boundaries.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Hạ chapters 1–6: both books and all named layers.
- [x] Hạ chapters 7–12: both books and all named layers.
- [x] Each chapter requires its own passage disposition; quoted NTT fragments do not create an absent appendix.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #90 at `f08dd82241cf505c3e00c9b69497ea8d63ccadb0`, from reviewed head `2d65e1e28aadb1ceb98c5326b5c740e1f7e95242`.
- Evidence: Fresh exact-head independent review returned `OK with notes`, no findings. The review verified all44 individual page-image/text inspection records, edition-specific boundaries and omissions, preservation, and closed audit gates. Verify run `37562090969`/job `112601424630`, Cloudflare Pages, and GitGuardian passed. `./init.sh` passed6,027 tests (5,846 knowledge,181 core); corpus/books, exports, focused tests, preservation and199 documentation-route/offline checks passed.
- Coverage:24 articles add370 claims/citations and370 child dispositions for all12 NHL/PBC chapter pairs. NHL chapters1–12 remain present even where NHL says PBC omitted a chapter. PBC's `lược trích`, missing sections and referrals remain specific to that edition; no text was reconstructed or borrowed from NHL/NTT. Total release is371 records,9,237 claims,9,483 citations; prior347 records/9,113 citations remain byte-identical.
- PWA: Integrated JS is12,364,549 bytes under the unchanged12 MiB cap by218,363 bytes; all18 precache entries remain.
- Open gates: Source audit092, global review, independent corpus verification/certification and source rights remain unresolved/closed. Referred Kinh attachments are not newly certified; no modern advice or predictive efficacy is claimed.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Continue with selected task-reconcile-can-and-khon-special-classical-passages from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-07 — task-complete-he-tu-ha-across-nhl-and-pbc merged

**State**: done; merged to `main` in PR #90 at `f08dd82241cf505c3e00c9b69497ea8d63ccadb0`; reviewed exact head `2d65e1e28aadb1ceb98c5326b5c740e1f7e95242`.
**Done**: Added24 articles for NHL Hệ Từ Hạ PDF363–388 and PBC PDF631–648, with370 source-attributed claims/citations and370 child dispositions. All44 assigned pages were individually image-inspected and recorded. NHL and PBC states remain distinct; PBC's `lược trích`, missing sections and referrals are not transferred to NHL or reconstructed.
**Evidence**: Independent exact-head review returned `OK with notes`, no findings. Verify run `37562090969`/job `112601424630`, Cloudflare Pages and GitGuardian passed. Pre-push `./init.sh` passed6,027 tests (5,846 knowledge,181 core); corpus/books validation, package exports, preservation,376 focused cases and199 offline documentation-route checks passed.
**Coverage**: Release now has371 records,9,237 claims,9,483 citations; all347 prior records and9,113 citations remain byte-identical. Registry revision56 has4,351 groups and17 exclusions. The12,364,549-byte integrated JS remains under the unchanged12 MiB cap by218,363 bytes; all18 precache entries remain. Audit092, global source review, corpus verification/certification and rights remain unresolved/closed. No source attachment coverage, efficacy or modern advice is claimed.
**Blockers**: none for task-complete-he-tu-ha-across-nhl-and-pbc.
**Next**: Continue with selected task-reconcile-can-and-khon-special-classical-passages from updated `main`.
