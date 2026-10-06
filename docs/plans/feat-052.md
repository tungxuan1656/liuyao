# Complete BPCT applications: weather, life, career, and wealth Implementation Plan

> **Execution:** Follow the repository implementation and verification rules. Use one writer at a time and commit each reviewed chapter checkpoint. Track completed steps with `- [x]`.

**Goal:** Publish source-compared BPCT chapters 7, 9–12 and the unnumbered Niên Thời section with complete source-unit dispositions.

**Architecture:** Reuse existing V2 record, citation, figure/table, and expected-unit contracts. Keep each passage, example, note, author interpretation, translator note, and supplement separately attributed. Update canonical coverage through the source inventory and expected-unit registry.

**Tech Stack:** Knowledge JSON, centralized citation JSON, existing corpus validators, Vitest, TypeScript, and generated release snapshots.

## Global Constraints

- Work only within `features/feat-052.md`: BPCT PDF 101–165.
- Verify the edition fingerprint in `packages/knowledge/data/sources.json` before authoring.
- Inspect complete passages, page images, tables, diagrams, and adjacent continuation pages.
- Use actual chapter boundaries. Niên Thời is unnumbered, not chapter 8. Preserve the short continuations on PDF 155 and PDF 165.
- Keep author prose, translator notes, source examples, and reported outcomes distinct. Do not imply that a reported result is verified or establishes efficacy.
- Keep source summaries original and follow `LICENSING.md`; do not copy source prose or images.
- Preserve prior reviewed claims unless new source evidence requires a narrow correction. Reuse concepts without rewriting their existing records unnecessarily.
- Do not add interpretation, calendar, classifier, UI, audit, or certification behavior. Keep global review gates open.
- Measure the fresh integrated bundle after knowledge rebuild. Raise only the per-file Workbox cap when the measured asset exceeds it; retain the main asset in precache and preserve all other PWA behavior.

## Task 1: Inspect and map assigned source units

**Files:**

- Read: `features/feat-052.md`
- Read: `docs/reviews/knowledge/source-inventory.md`
- Read: `docs/reviews/knowledge/expected-units.json`
- Read: `docs/references/book-sources.md`
- Read: `packages/knowledge/data/sources.json`
- Inspect: `docs/books/Tăng bổ bốc phệ chính tông.pdf`

- [x] Confirm the source fingerprint and page count.
- [x] Inspect PDF 101–165 and relevant adjacent page images; distinguish actual chapter boundaries from printed folios.
- [x] Map every passage, example, condition, note, disagreement, table, diagram, and continuation under the six assigned source units.
- [x] Compare current claims and citations; treat selected earlier citations as partial, not full coverage.
- [x] Add stable child units and exact page/printed-folio bounds to the canonical source inventory. Keep the six top-level units and unrelated mappings unchanged.
- [x] Run `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` and commit the unit map before authoring.

## Task 2: Author chapter 7 — Thiên Thời

**Files:**

- Create or update: `packages/knowledge/data/liuyao/bpct-chapter-seven-weather.json`
- Create or update: `packages/knowledge/data/citations/batch-nineteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-nineteen.test.ts`
- Update: `docs/references/book-sources.md`

- [x] Cover every chapter 7 passage, qualification, example, note, and source layer on PDF 101–110.
- [x] Preserve date/weather question roles and conditions as attributed source claims; do not derive calendar behavior or verified outcomes.
- [x] Add claim, citation, attribution, exclusion, and public-release tests for the complete unit.
- [x] Run focused tests and the corpus validator; commit this checkpoint.

## Task 3: Author the unnumbered Niên Thời section

**Files:**

- Create or update: `packages/knowledge/data/liuyao/bpct-nien-thoi.json`
- Update: `packages/knowledge/data/citations/batch-nineteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-nineteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [x] Cover all passages, conditions, examples, and notes on PDF 111–118.
- [x] Keep Niên Thời a separate unnumbered unit between chapters 7 and 9; do not invent chapter 8.
- [x] Preserve overlaps with year/time concepts in chapter 7 as cross-references, not merged source units.
- [x] Test the full locator bounds, distinct unnumbered identity, layer attribution, and exclusions.
- [x] Run focused tests and the corpus validator; commit this checkpoint.

## Task 4: Author chapter 9 — Thân Mệnh

**Files:**

- Create or update: `packages/knowledge/data/liuyao/bpct-chapter-nine-life.json`
- Update: `packages/knowledge/data/citations/batch-nineteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-nineteen.test.ts`
- Update: `docs/references/book-sources.md`

- [x] Cover all passages, question roles, conditions, examples, disagreements, and notes on PDF 119–141.
- [x] Keep personal-life statements qualified and attributed; do not turn reported outcomes into efficacy claims or general rules.
- [x] Reuse existing terms and records where supported without changing earlier claims unnecessarily.
- [x] Add tests for all mapped source units, notes, exact page bounds, attribution, and withheld claims.
- [x] Run focused tests and the corpus validator; commit this checkpoint.

## Task 5: Author chapter 10 — Cầu Danh

**Files:**

- Create or update: `packages/knowledge/data/liuyao/bpct-chapter-ten-fame.json`
- Update: `packages/knowledge/data/citations/batch-nineteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-nineteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [x] Cover every passage, question-specific role, condition, example, disagreement, and note on PDF 142–148.
- [x] Keep claims about examination, office, or recognition within the source's stated conditions and attribution.
- [x] Add exact-unit, citation, attribution, and publication projection assertions.
- [x] Run focused tests and the corpus validator; commit this checkpoint.

## Task 6: Author chapter 11 — Sĩ Hoạn

**Files:**

- Create or update: `packages/knowledge/data/liuyao/bpct-chapter-eleven-office.json`
- Update: `packages/knowledge/data/citations/batch-nineteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-nineteen.test.ts`
- Update: `docs/references/book-sources.md`

- [ ] Cover every passage and continuation on PDF 149–155, including the short continuation on PDF 155.
- [ ] Preserve translator disagreements, attributed outcomes, conditions, and scope.
- [ ] Add tests that prove PDF 155 is included and every mapped subunit has its own evidence.
- [ ] Run focused tests and the corpus validator; commit this checkpoint.

## Task 7: Author chapter 12 — Cầu Tài

**Files:**

- Create or update: `packages/knowledge/data/liuyao/bpct-chapter-twelve-wealth.json`
- Update: `packages/knowledge/data/citations/batch-nineteen-advanced.json`
- Test: `packages/knowledge/tests/book-batch-nineteen.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [ ] Cover every passage, question-specific role, condition, example, disagreement, and note on PDF 156–165.
- [ ] Include the closing prose on PDF 164 and the image-confirmed folio-only non-content page 165 under the unchanged chapter-12 parent (supervisor-approved source correction).
- [ ] Keep source claims about gain/loss attributed and conditional; do not present them as validated predictions.
- [ ] Add tests for full page bounds, closing fragment, notes, attribution, and exclusions.
- [ ] Run focused tests and the corpus validator; commit this checkpoint.

## Task 8: Reconcile publication, registry, and final verification

**Files:**

- Update: `packages/knowledge/data/manifest.json`
- Update: `docs/reviews/knowledge/expected-units.json`
- Update: `docs/reviews/knowledge/source-inventory.md`
- Update: `docs/references/book-sources.md`
- Update: `packages/knowledge/tests/book-batch-nineteen.test.ts`
- Regenerate through existing scripts: `packages/knowledge/src/book-release.generated.json` and `packages/knowledge/reports/`
- Update: `features/feat-052.md`

- [ ] Register only source-compared records and citations. Preserve all previous record IDs, release contracts, and unrelated registry obligations.
- [ ] Account for every assigned unit, layer, note, example, table, and diagram in inventory and expected-unit dispositions.
- [ ] Bind the registry to the exact source-inventory bytes and retain unresolved discovery/audit states.
- [ ] Set `nextBatch` to feat-053 and test the transition.
- [ ] Verify old released claims and citations remain semantically identical and no local PDF path or copied source text enters the release.
- [ ] Measure the fresh integrated asset after rebuilding knowledge. Change only the Workbox per-file cap if needed; record bytes, cap, headroom, and precache inclusion.
- [ ] Run `./init.sh`, `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`, and `pnpm --dir apps/web run check:package-exports`.
- [ ] Inspect the complete diff. Record verification results, remaining source limits, and the independent-review handoff; keep the feature active through review and merge.
- [ ] Commit the final verification checkpoint.
