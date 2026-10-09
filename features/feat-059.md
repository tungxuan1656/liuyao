# feat-059 — Complete NHL introductory chapters and framing

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 1–126, Part II introduction 127–130, and end matter 388–393.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Origins and contents (12–32).
- [x] Thập Dực (33–44).
- [x] Interpretive schools (45–58).
- [x] Terminology and rules (59–76).
- [x] Đạo Trời (77–97).
- [x] Việc Người (98–108).
- [x] Tu Thân (109–126).
- [x] Front matter, Part II introduction, and retrospective.
- [x] Separate historical/philosophical attribution from structural facts.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Reconcile existing selected introductory claims.
2. Review and commit each chapter or framing checkpoint.
3. Check diagrams, exclusions, and cross-record terminology.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- Selection: already user-authorized in the feat-045–083 sequence; feat-058 is done and this is the next dependency-ready feature.
- Source: use `source-book-nhl`, `edition-nhl-supplied`, PDF SHA-256 `9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e` (393 pages). Author 059 routes to audit 092.
- Scope: author the foreword and chapters 1–7 on PDF 10–126, Part II framing 127–130, and the retrospective 389–392. PDF 388 is still Hệ Từ Hạ chapter 12; PDF 393 is blank apart from a footer/web address. Do not classify the contents pages 4–9 as body section starts; the body starts at PDF 12.
- Existing coverage: chapter 4 technical citations are selected only; feature 084 is a limited cross-reference for matching technical fixtures, not a co-owner of the chapter. Preserve and reconcile matching claims without duplicating or implying full-chapter coverage.
- Evidence: the source-derived child anchors in the inventory are navigation candidates, not exhaustive maps; visually verify passages and diagrams before transcribing claims. Separate historical attribution from structural facts and NHL's own evaluations. Edition year and rights status remain unconfirmed/research-only.
- Planning: the current inline plan is sufficient for this bounded knowledge-package cohort; no API, migration, workspace, UI, or calendar changes are planned.

## Handoff

- State: done; merged to `main` in PR #87 at `b474aeb74bdabad5448b482e253993bbdd7c983f`, from reviewed head `68d44f5a4610cf8a9ed7e36bd9697142d1a3a591`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. Verify run `37518032396`/job `112455890038`, Cloudflare Pages and GitGuardian passed. The pre-push `./init.sh` passed 4,719 tests (4,538 knowledge and 181 core); corpus/source fingerprints, production package exports/types and prior-corpus preservation checks passed. The measured 10,666,746-byte asset fits the 11 MiB Workbox cap with 867,590 bytes headroom; all 18 precache entries remain.
- Coverage: Added 11 records, 208 new claims/citations, 213 child dispositions and five reused selections. Chapter4 claims remain limited; feat-084 is only a cross-reference for matching selections. The `nhl-he-tu-ha-12` page projection is corrected to PDF 386–388 without adding feat-059 content or changing its `feat-062` ownership.
- Open gates: Source audit092, global layer review, verification/certification, publication year and rights remain open or unconfirmed. No efficacy or modern medical/legal/safety/political advice is claimed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Continue with selected feat-060 from updated `main`.

## Implementation checkpoints

Worker-owned source comparison is implemented; the final Handoff and feature
state remain coordinator-owned. No push, PR, merge, feature-index or progress
update is performed by this worker.

1. Prepared from clean activation HEAD `e29d4dc149271cd2d77a9f87fb501be881a442c6`
   on the selected branch. Baseline `./init.sh` passed:4318 knowledge/181 core
   tests. The supplied393-page NHL SHA matches the activation decision.
2. Inspected all137 page artifacts PDF1–131 and388–393: unscaled full-resolution
   horizontal pairs at1.5x (918x1188 per page),393 individually. This includes
   every assigned PDF10–130/389–392 image, credits/navigation and boundaries.
   Complete extracted passages were compared; the local artifact manifest is
   `/tmp/feat059/inspection-artifacts.json`. This is not whole-book visual review.
3. Reconciled prior selected NHL claims/citations without rewriting them.
   Eleven new article owners have208 new claim-specific citations/claims,
   with213 child dispositions including five reused selections. All chapters,
   sections, diagram/quotation/example clusters and non-content units are mapped
   in the [passage register](../docs/reviews/knowledge/README.md).
   The registry retains unresolved discovery/audit obligations;52→53 is its
   revision change, not audit approval. The existing Hệ Từ Hạ12 projection is
   reconciled from386-only to386–388 without adding out-of-scope content.
4. Focused source/production-projection fixtures pass220 tests. Corpus validation
   reports298 records,7950 claims,8196 citations,64 quẻ/384 positions. A preservation
   check against activation retains all287 prior authored/released records,
   all41 prior citation collections/7988 released citations, sources, layer
   rosters, cells and17 exclusions. Prior global memberships/order remain intact.
5. Fresh knowledge build before web build measures integrated main
   `index-CrbHiuXB.js` at10,666,745 bytes, exceeding10 MiB by180,985 bytes.
   Workbox's single per-file cap is raised to11 MiB (11,534,336 bytes), giving
   867,591 bytes headroom. The build retains all18 precache entries, main included;
   all other PWA options remain unchanged. The first web-only probe used stale
   package output and is not the fresh integrated measurement.

## Decision log

- Census fixture reconciliation: existing tests hardcode the previous global
  counts and059 queue text. The coordinator explicitly approved changing only
  those literals to validated059 counts and060 PBC/NTT queue text, retaining
  assertion shapes, semantic checks and child-process/test timeouts. No assertions
  are removed, weakened or broadened. New test type/field mistakes are corrected
  against the actual source/API rather than by weakening checks.
- Source representation: retain existing V2 article envelopes with original,
  source-attributed Vietnamese summaries of inspected figures and quoted/example
  clusters. No image bytes, full diagram reconstruction, calculation fixtures,
  new API or schema changes are added. Classical/traditional authorship remains
  distinct from NHL's evaluation and reported scholarly/historical positions.
- Edition reconciliation: preserve orphan note markers and conflicting source
  counts/names/line drawings explicitly; do not reconstruct absent notes, repair
  source labels, infer efficacy, publication year, rights or later source coverage.

## Verification checkpoint

- Baseline `./init.sh`: passed.
- Scoped source fixture:220 tests passed with `--maxWorkers=1 --no-file-parallelism`.
- Corpus validation: passed after authoring,298/7950/8196.
- Production package-export/type check: passed.
- Activation preservation check: passed; details are in the worker report.
- Fresh build: passed after the measured Workbox cap adjustment,18 entries retained.
- An interim full workflow failed on new test TypeScript inference/non-null errors
  and the old Workbox cap; these are corrected. An earlier suite failed on stale
  global census expectations; only the approved expected literals are updated.
- Final full workflow, fingerprint/freshness and final HEAD are recorded in the
  subsequent worker verification entry, not inferred from baseline checks.

Source audit092, global layer discovery/reconciliation094, separate verification
095 and certification096 remain unfulfilled. Fresh independent review approved the
exact head; see Handoff for PR and merge evidence.

### Resumed final verification

The original worker run hit the orchestration deadline before its final report/commit.
The same run resumed from the preserved activation HEAD and uncommitted checkpoint,
without discarding changes or switching protocol. `./init.sh` was rerun successfully
(`/tmp/feat059/init-resume-final.log`):4538 knowledge tests and181 core tests.
Production package exports/types were rerun with exit0 after the earlier aborted
command; the built package preserves287 prior records/7988 citations and resolves
all213 dispositions. The final source-name correction (Tiền Cơ Bác) changes the
fresh asset to `index-B3qwjfVs.js`,10,666,746 bytes,867,590 bytes headroom at11 MiB,
still18 precache entries. PartII title/number-warning children are classified
non-content consistently, without changing their meaningful framing summaries.

Final corpus/fingerprint/freshness and diff checks pass. Source fixture220 tests
pass; all7950 claims/8196 citations remain structurally valid. Coordinator review,
PR checks, merge and feature completion are recorded in the Handoff above.
