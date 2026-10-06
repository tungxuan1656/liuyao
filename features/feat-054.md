# feat-054 — Complete BPCT applications — Housing boats and Xướng Gia

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, PDF 231–269; use each actual chapter/supplement boundary.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Chapter 20 — Gia Trạch: all passages, conditions, examples, and notes.
- [x] Chapter 20 supplement — Tân Tăng Gia Trạch: all passages, conditions, examples, and notes.
- [x] Chapter 21 — Châu Thuyền: all passages, conditions, examples, and notes.
- [x] Chapter 22 — Xướng Gia: all passages, conditions, examples, and notes.
- [x] Preserve question-specific roles, qualifications, and translator disagreements.
- [x] Treat reported outcomes as attributed source claims; do not imply verified efficacy.
- [x] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm the supplied BPCT edition fingerprint and inspect the complete source passages for PDF 231–269, including page-boundary images.
2. Map the four assigned inventory units and their source layers before authoring; preserve prior records and unresolved audit obligations.
3. Author source-compared summaries for chapters 20, the chapter 20 supplement, 21, and 22, with claim-specific citations and tests.
4. Reconcile inventory, expected-unit registry, release manifest, generated projection, and next batch; measure the rebuilt web asset and adjust only the Workbox file limit if needed.
5. Run required local gates, inspect the full diff, and record review evidence and handoff.

## Decision log

- **Question:** Does this bounded feature need a separate external plan?
  **Decision:** Keep the plan inline in this feature record.
  **Alternatives:** Create `docs/plans/feat-054.md` or use only the existing acceptance record.
  **Rationale:** The scope is one consecutive BPCT source cohort in the existing knowledge package; acceptance already defines the four units, and the execution steps fit in this record. No migration, API break, or multi-workspace ownership is planned.
  **Evidence:** `features/feat-054.md`, `docs/reviews/knowledge/source-inventory.md`, and the repository's inline-plan guidance in `AGENTS.md`.
  **Effect:** No external plan or additional tracking file; keep source map, acceptance, evidence, and handoff here.

- **Question:** How should nested boat passages and overlapping folios be owned?
  **Decision:** Keep Thuyền Gia Trạch opening/1–20 within chapter20, distinct from chapter21; keep all four parent intervals and piecewise image-checked printed labels. No folio-only exclusion is needed.
  **Alternatives:** Move the nested verses to chapter21, use one page offset, or treat sparse265 as folio-only.
  **Rationale:** These would change the actual headings or suppress extant commentary.
  **Evidence:** Individual images231–269, especially246/250/251/262/263/265/266/269, plus boundary230/270. PDF265 contains chapter21/8 commentary.
  **Effect:**185 children are mapped to the four existing parents; no new exclusions, and discovery/audit remain unresolved.

- **Question:** Can the supplement be attributed certainly to the compilation/phú authors?
  **Decision:** Give its source/reading and commentary an uncredited Tân Tăng attribution, Vietnamese meaning to Vĩnh Cao; retain general-credit caveats and distinct translator notes.
  **Alternatives:** Apply certain Vương Hồng Tự/Lưu Bá Ôn attribution throughout, or withhold all extant supplement content.
  **Rationale:** The preface describes moving Tân Tăng here and mixed later additions; general credits do not establish individual authorship. Original summaries can preserve that uncertainty without reconstructing text.
  **Evidence:** Individual credits1–3 and supplement251–262; existing preface citation. The gap28, missing independent meaning37, Thuỷ/Quỷ and Quỷ/Phụ alternatives, and inline glosses are retained.
  **Effect:** The supplement parent gains the existing uncredited-supplement layer; children and citations keep actual layers, without claiming roster discovery or audit approval.

- **Question:** Should the new measured bundle be excluded from precache or the cap increased?
  **Decision:** Increase only Workbox's per-file cap from6,553,600 to7,340,032 bytes (7 MiB).
  **Alternatives:** Exclude the integrated asset or change bundling/PWA behavior.
  **Rationale:** The fresh integrated asset is7,112,047 bytes; the small measured cap increase preserves offline reference availability and all other settings.
  **Evidence:** Initial knowledge/web rebuild emitted7,111,901-byte `index-DUv42tFi.js` and correctly rejected the old cap. Final summaries emit7,112,047-byte `index-BYIjvtS4.js`; the same7 MiB cap preserves it.
  **Effect:**227,985 bytes reserve; final precache verification confirms18 entries and the main asset. Authority is the repository's explicit knowledge/Workbox exception.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Verification Evidence

- Dispatch branch and HEAD match `feat/054-bpct-applications-housing-boats-xuong-gia` at `27d31f1b376252edd97c5c88eaf813af4e36020b`; initial worktree clean. Baseline `./init.sh` passed2,901 tests (181 core +2,720 knowledge).
- Local BPCT SHA-256 matches `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`,467 pages. Complete text and all39 individual page images read, plus boundaries230/270 and credits1–3. No folio-only pages, tables or diagrams in scope. Canonical findings: [Book sources](../docs/references/book-sources.md#feat-054-source-comparison); locators: [inventory](../docs/reviews/knowledge/source-inventory.md#feat-054-housing-boats-and-xướng-gia-passage-register).
- Four V2 articles add494 source-compared claims/citations and185 children. Focused `book-batch-twenty-one.test.ts` passes192 tests. Corpus validates235 released records,5,614 claims,5,860 citations,64 quẻ/384 positions. Expected-unit revision44 has1,485 groups;18 notes/inline glosses remain separate. The17 exclusions, prior content and unrelated audit obligations remain preserved. No new ledger decisions or independent verification/certification approval.
- Final `./init.sh` passes3,093 tests (181 core +2,912 knowledge), formatting, lint, TS length, typecheck, builds and package exports. Explicit `validate:corpus --check-books --check` and `pnpm --dir apps/web run check:package-exports` pass. Built public exports exactly match all four authored records/494 claims and494 citations. All231 prior released records and5,366 citations compare semantically unchanged against dispatch HEAD; all1,300 prior registry groups remain unchanged apart from the four scoped parent record mappings and supplement layer addition. Other registry sections, source metadata, feature index and progress are unchanged.
- Asset `index-BYIjvtS4.js` measures7,112,047 bytes with7,340,032-byte cap and227,985-byte reserve; all18 entries and the main asset are precached. Only the cap/comment changes, no other PWA behavior. All905 local Markdown file targets resolve; `git diff --check` passes. Existing four Fast Refresh lint warnings and the Vite large-chunk warning remain non-blocking. Initial web measurement and first final workflow failed only on the old Workbox cap because an unavailable `apply_patch` command did not apply the cap; the available editing tool applied the authorised change and the workflow passed.
- Reconciliation scripts and validation logs live locally under `/tmp/feat054/`; the worker acceptance report records exact delivery SHA, paths and final checks. No PDF passages/images are committed. Independent exact-head branch review is still required; this feature evidence records local acceptance, not a global audit gate.

## Handoff

- State: active; local implementation and acceptance checks complete, delivered for independent exact-head review. Parent owns delivery review, status transitions and progress completion.
- Evidence: Full verification, source fingerprint/freshness, exact public-export comparison, prior-content preservation and precache checks pass; see Verification Evidence.
- Blockers: none for this cohort. Authorship uncertainty, extant source alternatives and all discovery/feat-088/global audit/verification/certification obligations remain unresolved; no efficacy, safety advice or rights clearance claimed.
- Next: Parent arranges independent acceptance review of the exact implementation commit before publication or feature-state/progress completion; do not begin feat-055.
