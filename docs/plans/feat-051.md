# Complete BPCT foundational chapters and front matter Implementation Plan

> **Execution:** Follow the repository's implementation and verification rules. Use the repository worker and reviewer flow; keep one writer at a time. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Publish source-compared BPCT front matter and Part I chapters 1–5 with explicit source-unit dispositions.

**Architecture:** Reuse the knowledge package's existing record and citation schemas. Keep each numbered formula, board, note, table, diagram, and named textual layer separately attributable. Use the source inventory for coverage ownership and the existing expected-unit registry for obligations.

**Tech Stack:** Versioned knowledge JSON, centralized citation JSON, Node validation scripts, Vitest, TypeScript, and the existing generated knowledge snapshot.

## Global Constraints

- Keep authored summaries original and follow `LICENSING.md`; do not copy source passages or images.
- Match the BPCT fingerprint in `packages/knowledge/data/sources.json` before authoring.
- Inspect the complete passage and relevant page images, tables, diagrams, and adjacent context.
- Keep author, translator, commentary, verse, meaning, notes, and project-convention claims separate.
- Do not infer missing material, resolve unsupported contradictions, or add automated interpretation, calendar, or UI behavior.
- Preserve the existing release, audit, and certification gates; authoring does not close corpus-wide review.
- Keep every chapter and board within `features/feat-051.md`; record supported dispositions in the canonical source inventory.
- Measure the integrated bundle if knowledge additions exceed the current Workbox cap. Keep the asset precached and preserve all other PWA behavior.

---

## Task 1: Inventory the assigned source units

**Files:**

- Read: `features/feat-051.md`
- Read: `docs/reviews/knowledge/source-inventory.md`
- Read: `docs/references/book-sources.md`
- Read: `packages/knowledge/data/sources.json`
- Inspect: `docs/books/Tăng bổ bốc phệ chính tông.pdf`

- [x] Verify the PDF fingerprint and page count against `sources.json`.
- [x] Inspect pages 1–76 and adjacent page images where a passage continues across a page.
- [x] Map each front-matter voice, ch1 topic, ch2 formula, ch3 poem, ch4 board, ch5 item, footnote, table, and diagram to an inventory child.
- [x] Reconcile the map with existing released records and citations. Treat selected citations as partial coverage.
- [x] Record the exact page bounds, printed labels, attribution uncertainty, and source-reported omissions in `docs/reviews/knowledge/source-inventory.md`.
- [x] Run `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` and confirm the source inventory remains consistent.
- [x] Commit the source-unit map before content authoring.

## Task 2: Author front matter and chapter 1

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Create or update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/references/book-sources.md`

- [x] Author the front matter voices and credits on PDF 1–6 as separate claims.
- [x] Author all numbered definitions, methods, and diagrams in chapter 1 on PDF 7–21.
- [x] Cover the observed topics I–XXII without inferring that extraction gaps prove source absence.
- [x] Reconcile the already selected chapter 1 claims and the known examples at PDFs 8–15 without altering them absent new source evidence.
- [x] Add tests for claim IDs, citations, attribution, diagram evidence, exclusions, and public release projection.
- [x] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 3: Author chapter 2

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [x] Inspect all numbered Ca Quyết formulas, explanations, examples, tables, and notes on PDF 22–42.
- [x] Include the sparse PDF 42 page and its printed label 35 as a source unit.
- [x] Keep each formula and its explanation linked to exact page locators and the correct source voice.
- [x] Add regression assertions for every numbered unit, its continuation, and any explicit omission.
- [x] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 4: Author chapter 3

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [x] Inspect complete `Thông Huyền Phú` and `Túy Kim Phú` on PDF 43–48, including poem lines, explanations, notes, and attribution.
- [x] Preserve the two named works and their source layers as separate claims.
- [x] Add tests for both poems, their passage bounds, layer attribution, and source-backed exclusions.
- [x] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 5: Author Càn, Khảm, and Cấn palace boards

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [x] Inspect each of the 24 board headings and full diagrams listed under chapter 4 in the source inventory.
- [x] Record each board's source title, six line images and annotations, hidden/flying annotations where printed, explanatory text, and actual absences.
- [x] Use the feat-101 evidence contract for every figure or table claim.
- [x] Preserve known source conflicts, including the incomplete Khảm list in chapter 1 and the correction in chapter 4.
- [x] Add tests for each board ID, exact citation coverage, figure links, and layer/absence claims.
- [x] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 6: Author Chấn, Tốn, and Ly palace boards

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [x] Inspect each of the 24 board headings and complete diagrams listed under chapter 4 in the source inventory.
- [x] Keep shared-page board citations separate; a neighboring board's evidence does not cover the current board.
- [x] Verify the Chấn sixth board `Thủy Phong Tỉnh` against PDF 57's image.
- [x] Add tests for each board ID, citation bounds, figure evidence, and actual annotation presence.
- [x] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 7: Author Khôn and Đoài palace boards

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [x] Inspect the final 16 board headings and complete diagrams listed under chapter 4 in the source inventory.
- [x] Keep each board separate even when two boards share a page.
- [x] Reconcile all 64 board units with the printed order and the current table/figure contract.
- [x] Add tests that assert all eight palaces and 64 distinct board units have a disposition and resolvable evidence.
- [x] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 8: Author chapter 5 items 1–6

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/references/book-sources.md`

- [x] Inspect complete items 1–6 on PDF 67–69, including examples and each textual layer.
- [x] Reconcile earlier selected claims without treating them as full item coverage or rewriting them without new evidence.
- [x] Add tests for each item's full bounds, claims, attribution, conditions, and exclusions.
- [x] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 9: Author chapter 5 items 7–12

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/references/book-sources.md`

- [ ] Inspect complete items 7–12 on PDF 69–71, including examples, diagrams, and notes.
- [ ] Keep each item separately attributable and preserve incomplete or conflicting source statements.
- [ ] Add tests for each item's complete passage range, claim conditions, and non-authority limits.
- [ ] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 10: Author chapter 5 items 13–18 and the postscript

**Files:**

- Create or update: `packages/knowledge/data/liuyao/`
- Update: `packages/knowledge/data/citations/batch-eighteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-eighteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`
- Update: `docs/references/book-sources.md`

- [ ] Inspect complete items 13–18 on PDF 72–74, including continuations, examples, and notes.
- [ ] Inspect the separate unnumbered `Tứ thời vượng tướng...` contribution on PDF 74–76.
- [ ] Keep the postscript separate; do not treat it as item 19 or merge it into item 18.
- [ ] Add tests for all six numbered items and the distinct postscript.
- [ ] Run the batch tests and corpus validator, then commit this checkpoint.

## Task 11: Reconcile release and verification surfaces

**Files:**

- Update: `packages/knowledge/data/manifest.json`
- Update: `docs/reviews/knowledge/expected-units.json`
- Update: `docs/reviews/knowledge/source-inventory.md`
- Update: `docs/references/book-sources.md`
- Update: `packages/knowledge/tests/`
- Regenerate through existing scripts: `packages/knowledge/src/book-release.generated.json` and `packages/knowledge/reports/`
- Update: `features/feat-051.md`

- [ ] Register only source-reviewed records and citations; retain existing record IDs and public contracts.
- [ ] Account for every assigned unit and layer in the inventory and expected-unit registry.
- [ ] Bind the registry revision to the exact source-inventory bytes without changing unrelated obligations or audit states.
- [ ] Update `nextBatch` to feat-052 and assert the transition in tests.
- [ ] Verify public projections preserve earlier records and citations; verify no local PDF path or copied source text enters release data.
- [ ] Record any bundle measurement. Change only the measured Workbox per-file cap if the asset exceeds it.
- [ ] Run `./init.sh`, `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`, and `pnpm --dir apps/web run check:package-exports`.
- [ ] Resolve introduced failures, inspect the complete diff, and record verification and limitations in the feature handoff.
- [ ] Commit the final verification checkpoint; leave feat-051 active until fresh independent review and merge.
