# task-complete-ntt-and-pbc-introductory-traditions-and-diagrams - Complete NTT and PBC introductory traditions and diagrams

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-complete-nhl-introductory-chapters-and-framing](task-complete-nhl-introductory-chapters-and-framing.md), [task-complete-extended-knowledge-records-and-provenance-contracts](task-complete-extended-knowledge-records-and-provenance-contracts.md)
- Required to integrate/release: no additional gate recorded; see acceptance

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
- [x] Diagram units use the implemented task-complete-extended-knowledge-records-and-provenance-contracts representation with orientation and supporting claims.
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

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done; merged to `main` in PR #88 at `d082eeaad74affb181ec3f1904e312fd35f4a436`, from reviewed head `e2304267076afb81115c99c6fafd101f021fa29e`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. Verify run `37549113356`/job `112560098877`, Cloudflare Pages, and GitGuardian passed. Both pre-push and post-merge `./init.sh` passed 5,215 tests (5,034 knowledge, 181 core); corpus/books, production package exports/types, and prior-corpus preservation checks passed. Post-merge verification added `.codegraph/` to `.prettierignore` because formatting had tried to read a missing transient `codegraph.lock` from local ignored CodeGraph state. The measured 11,346,876-byte bundle fits the unchanged 11 MiB Workbox limit with 187,460 bytes headroom; all 18 precache entries remain.
- Coverage: Added 23 source-comparison articles, 487 new claims/citations, 489 dispositions including two reused selections, and 18 visually inspected figures with 235 evidence-backed labels. PBC scope is PDF 1–26 and 649–655; NTT is PDF 1–79 and 938. The PDF 79 Giải Nghĩa prose is represented separately from its heading while the parent ID/range/ownership remain stable; PDF 80 is outside scope. Existing PBC note 13 and 21 claims remain under their original quẻ owners.
- Open gates: Source audit 092, global source review, and certification remain open; their approval gates remain closed. PBC publication year and rights remain unconfirmed; NTT colophon dates printing/deposit only. Missing source text and uncertain labels/notes remain explicit, with no efficacy or modern advice claimed.
- Dependencies: See [frozen index](../tasks/index.md).
- Next: Continue with selected task-complete-he-tu-thuong-across-nhl-and-pbc from updated `main`.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-07 — task-complete-ntt-and-pbc-introductory-traditions-and-diagrams merged

**State**: done and merged to `main` in PR #88 at `d082eeaad74affb181ec3f1904e312fd35f4a436`; reviewed exact head `e2304267076afb81115c99c6fafd101f021fa29e`.
**Done**: Added 23 NTT/PBC source-comparison articles with 487 new claims/citations, 489 dispositions including two reused selections, and 18 visually inspected V2 figures with 235 supported labels. PBC scope includes PDF 1–26 and 649–655 after user approval to align with the canonical Phàm Lệ/Cương Lĩnh inventory; NTT scope is PDF 1–79 and 938. NTT PDF 79's heading and substantive Giải Nghĩa prose are separate dispositions; PDF 80 remains out of scope.
**Evidence**: Independent exact-head review returned `OK`, no findings. Verify run `37549113356`/job `112560098877`, Cloudflare Pages and GitGuardian passed. Pre-push and post-merge `./init.sh` passed 5,215 tests (5,034 knowledge, 181 core); `validate:corpus --check-books --check`, package-export/types and production-preservation checks passed. Post-merge validation added `.codegraph/` to `.prettierignore` after Prettier attempted to read a missing transient `codegraph.lock` in local ignored CodeGraph state. The 11,346,876-byte asset fits the unchanged 11 MiB Workbox cap with 187,460 bytes headroom; all 18 precache entries remain.
**Coverage**: Existing 298 released records and 8,196 citations are preserved; total release is 321 records/8,437 claims/8,683 citations. Note 13 and note 21 stay under existing PBC quẻ owners. PBC's missing-wing notices and NTT's lack of a separate full Hệ Từ appendix are recorded without reconstructing text. Source audit 092, global source review, and certification remain open; their approval gates remain closed. PBC year/rights remain unconfirmed. No efficacy or modern advice is claimed.
**Blockers**: none for task-complete-ntt-and-pbc-introductory-traditions-and-diagrams.
**Next**: Continue with selected task-complete-he-tu-thuong-across-nhl-and-pbc from updated `main`.
