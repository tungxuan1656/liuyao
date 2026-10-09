# feat-058 — Complete BPCT casting supplements and book criticisms

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II chapter 3, PDF 429–457; Part III, PDF 458–467.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Observed transformation headings I, II, IV and actual examples (429–435).
- [x] All eighteen Tạp Sự cases (435–451).
- [x] All eleven Tinh Sát sections (451–457).
- [x] All fifteen criticisms and closing pages (458–467).
- [x] Check missing numbering and shared-page continuations; do not invent unprinted transformation rows.
- [x] Preserve criticised views and objections separately with named textual layers.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

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

- Selection: previously authorized within the feat-045–083 sequence; feat-057 is merged and this is the next dependency-ready feature.
- Planning: use the existing acceptance and inline plan; this is one bounded knowledge-package cohort with no API, migration, or workspace change.
- Source: supplied BPCT PDF SHA-256 `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a` (467 pages). Follow inventory locators and inspect PDF429–467 individually for shared-page boundaries and text layers; PDF467 is visually blank in the baseline inspection and must be recorded only as source evidence, not as an invented missing section.
- Transformation headings: preserve observed I, II, IV only. PDF432 has II ending and IV beginning with no III heading; do not invent a heading or transformation rows. Shared boundaries at430,432,435,451 are real.
- Existing citation: the translator note under criticism X is only that note, not coverage of the criticism itself. Preserve criticised claims, objections, replies, and translator notes as distinct attributed layers.
- Boundaries: author the specified BPCT summaries with claim-specific evidence. Keep author058/audit091 routing; source audit, independent verification, and certification remain separate open gates.

## Decision log

- Source reconciliation (supervisor-approved,2026-10-06): direct images430–432 show
  onlyII entries1–8/six rows each beforeIV, despite the64-quẻ/384-hào heading and
  existing64 obligations. Retain II-09..64 as unresolved source-not-found placeholders:
  no corresponding entry observed in supplied pages; source-audit/edition reconciliation
  unresolved. Do not delete obligations, fabricate rows/names, call this a source-reported
  omission, or inventIII. Eight actual entries/48 rows are authored. The rejected
  alternatives were generating64 entries from a calculator or shrinking the registry.
  This changes source-derived census evidence, not selected scope or audit acceptance.
- Existing X-note9: reuse the unchanged `term-matching-day-definition` and
  `citation-bpct-appendix-matching-day-note`; map its separate child to the old term.
  Do not add duplicate semantic content/citations or count that note as fullX coverage.
- Layer treatment: casting-supplement individual authors are uncertain; criticisms
  use the front conventional Vương Hồng Tự credit. Criticized books are attributed
  through BPCT, not purported direct consultations. Opposing example readings and
  the X whole/half-emptiness rhetorical reply have distinct claims/attributions.
  V/VI have original/reading and meanings, no independently printed commentary;
  absent reading/Hán tails are observed dispositions rather than reconstructions.
- Offline cap: fresh final integrated JS is10,384,705 bytes, within the existing
  10MiB cap by101,055 bytes; no cap or other PWA configuration change is required.
  All18 precache entries, including the integrated asset, remain present.

## Implementation checkpoints

- [x] Boundaries/source evidence: complete extracted passages and all39 individual
      images429–467, boundary428 and credits1–3 compared; PyMuPDF1.28.0,1.5x render,
      918x1188. `/tmp/feat058/inspection-artifacts.json` records exact text/PNG paths and
      SHA-256 values. This is not extraction-only semantic inspection or contact-sheet
      review. Source hash/page count verified; printed folios and shared boundaries retained.
- [x] Authored19 articles,328 new claims/citations,329 fine source dispositions
      including one reused claim. I keeps four definitions under its original stable parent;
      II has48 observed rows, IV eight diagrams/56 rows, V18 cases/14 nested relational
      verses, VI11 entries, criticismsI–XV with separate opposing layers and notes;467 blank.
- [x] Inventory/registry paired revision52:2861 groups,17 unchanged exclusions;
      feat058 has445 obligations,389 mapped,56 unobservedII placeholders unmapped.
      Added325 fine registry units (four I definitions stay claim-only). All19 layer
      rosters and discovery/audit statuses remain unresolved; all2416 non-cohort groups
      and all120 prior cohort IDs retained. Audit091 ownership remains unchanged.
- [x] Corpus generation:287 released records,7742 claims,7988 citations;64 quẻ/
      384 positions unchanged. `nextBatch` points to feat-059 without modifying that feature.
- [x] Prior-content preservation: production package-export probe compares all268
      prior records/7414 claims and7660 citations against activation5c1208e, plus source
      metadata, layer rosters, exclusions and non-cohort registry rows. All remain
      semantically unchanged. Only validated058 cohort assignments/locators are revised.
- [x] Verification: baseline and final `./init.sh` pass. Final code run on2026-10-07
      passes format, lint/TS length, typecheck, integrated build, package exports and4499
      package tests (4318 knowledge/181 core). Knowledge full suite98.78s; focused new
      source-named test336 cases passes in1.46s. Existing tests change only exact fresh
      census/next-batch literals; every assertion structure and timeout stays unchanged.
- [x] `validate:corpus --check-books --check`, production export/preservation check,
      and `git diff --check` pass. Evidence: `/tmp/feat058/init-final.log`,
      `/tmp/feat058/corpus-check.log`, `/tmp/feat058/focused.log`, `/tmp/feat058/exports.log`.
      Asset `index-CrXjOlkh.js`:10,384,705 bytes;10,485,760-byte cap;101,055 headroom;
      18 precache entries (build total10766.10KiB); PWA config byte-identical to activation.

- [x] Final locator self-check increments the registry to revision52 and extends VI-03 framing to452–453 and VI-06 framing
      to454–455: headings precede their Vietnamese introductory propositions. Verse
      locators remain453 and455 respectively. Framing correction full init passes4499
      tests; knowledge99.13s. Bundle byte size/cap/headroom remain unchanged, fresh asset
      `index-CrXjOlkh.js`; evidence `/tmp/feat058/framing-init.log`,
      `/tmp/feat058/framing-corpus.log`, `/tmp/feat058/framing-exports.log`.

## Implementation evidence and limitations

- Canonical source fidelity findings and dispositions are in the
  [book source comparison](../docs/reviews/knowledge/README.md)
  and [passage register](../docs/reviews/knowledge/README.md).
  The fixture/test preserves their per-claim PDF/printed locators and attributed layers.
- Publication state is source-comparison only, not source-audit/independent verification
  or certification approval. No new audit ledgers are created. Existing84 decisions
  remain current,197 claims covered;7742 required. Source-review/certification gates
  remain closed, `complete:false`, with no approved verification decisions.
- No third-party prose/images, missing labels/rows, calculator-derived source evidence,
  outcome certification, advice, calendar, interpretation or UI behavior is added.
  Individual supplement authorship, the56 source-not-foundII obligations, global
  discovery/layer rosters and later091/095/096 reviews remain unresolved.
- Final required-verification/hand-off acceptance checkbox remains for the parent:
  implementation checks pass, but independent acceptance review, final Handoff,
  feature/progress state, publication and merge are parent-owned. Nothing is pushed.

## Handoff

- State: done; merged to `main` in PR #86 at `914bef4d7e98bd5784303a00cf37261b01e9abbe`, from reviewed head `93f9e943fe0b0a2fe2b3c995b5b2f9ea38fe2fdf`.
- Evidence: Fresh exact-head independent review returned `OK`, no findings. PR verify run `37504128763`/job `112408327418`, Cloudflare Pages, and GitGuardian passed. The pre-push `./init.sh` passed 4,499 tests (4,318 knowledge, 181 core); corpus source/freshness and production package-export preservation checks passed. The measured 10,384,705-byte asset fits the 10 MiB Workbox cap by 101,055 bytes; all18 precache entries remain.
- Coverage: Added19 records,328 claims/citations,325 registry units; feature cohort has445 obligations (389 mapped,56 unresolved II placeholders). The heading for II claims64 hexagrams/384 lines, while only eight named entries/48 rows appear in the supplied section. Keep II-09..64 unresolved pending source-audit/edition reconciliation. feat-091 audit, global source review, and corpus certification remain open; no modern advice or efficacy authority is claimed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Continue with selected feat-059 from updated `main`.
