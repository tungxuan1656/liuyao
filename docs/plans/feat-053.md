# Complete BPCT applications: loss, travel, study, marriage, and household

> **Execution:** Follow repository implementation and verification rules. Keep one writer active. Commit each source-mapped chapter checkpoint after its focused tests and corpus checks.

**Goal:** Publish source-compared BPCT chapters 13–19 with explicit claim, layer, and source-unit dispositions.

**Architecture:** Reuse the existing V2 knowledge, citation, and expected-unit contracts. Keep original text, Vietnamese rendering, commentary, translator notes, examples, and continuation fragments separately attributed. Extend canonical source inventory and registry without changing unrelated obligations.

**Tech Stack:** Knowledge JSON, centralized citation JSON, existing corpus validators, Vitest, TypeScript, and generated knowledge release snapshots.

## Global Constraints

- Work only within `features/feat-053.md`: BPCT PDF 166–230.
- Verify the supplied BPCT fingerprint in `packages/knowledge/data/sources.json` before authoring.
- Inspect complete passages, page images, tables/diagrams if present, and adjacent pages at boundaries. State the actual image-inspection limits; do not claim every page was individually inspected when contact sheets were used.
- Use actual chapter boundaries. Preserve the chapter 14 opening label 23 without inferring a missing 22. Individually inspected PDF190/222 are folio-only (161/190), correcting the planned fragments with coordinator approval. Keep chapter15 closing on189 and chapter18 item42 on221, with unchanged parent intervals.
- Keep source authorship/translation uncertainty visible. Preserve question roles, conditions, and author disagreements. Treat reported outcomes as historical source claims, not verified efficacy.
- Use original summaries and follow `LICENSING.md`; do not copy source passages or images.
- Preserve prior reviewed data. Do not add UI, calendar, automated interpretation, audit, or certification behavior; keep global review gates open.
- Measure the fresh integrated bundle after rebuilding knowledge. Raise only the per-file Workbox cap if the measured main asset exceeds it; keep it precached and preserve all other PWA behavior.

## Task 1: Map PDF 166–230 source units

**Files:**

- Read: `features/feat-053.md`
- Read: `docs/reviews/knowledge/source-inventory.md`
- Read: `docs/reviews/knowledge/expected-units.json`
- Read: `docs/references/book-sources.md`
- Read: `packages/knowledge/data/sources.json`
- Inspect: `docs/books/Tăng bổ bốc phệ chính tông.pdf`

- [x] Verify exact PDF fingerprint and page count.
- [x] Inspect PDF 166–230 plus boundary images for chapter openings, endings, and continuations.
- [x] Map each source passage, condition, example, note, named voice, and any table/diagram to child obligations under the existing seven parent intervals.
- [x] Reconcile selected earlier claims and citations as partial coverage; do not rewrite without fresh evidence.
- [x] Add exact PDF/printed-folio bounds, source-layer dispositions, and attribution uncertainties to `docs/reviews/knowledge/source-inventory.md`.
- [x] Bind expected-unit revision to the exact inventory bytes; preserve unrelated groups and dispositions.
- [x] Run `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`; commit the source-unit map before content.

## Task 2: Author chapter 13 — Thất Thoát

**Files:**

- Create/update: `packages/knowledge/data/liuyao/bpct-chapter-thirteen-loss.json`
- Create/update: `packages/knowledge/data/citations/batch-twenty-advanced.json`
- Test: `packages/knowledge/tests/book-batch-twenty.test.ts`
- Update: `docs/references/book-sources.md`

- [x] Cover complete passages, conditions, examples, notes, and source layers on PDF 166–175.
- [x] Keep loss/theft claims qualified and attributable; do not present outcomes as verified predictions.
- [x] Add tests for all mapped subunits, citations, attribution, exclusions, and release projection.
- [x] Run focused tests and corpus freshness checks; commit checkpoint.

## Task 3: Author chapter 14 — Xuất Hành

**Files:**

- Create/update: `packages/knowledge/data/liuyao/bpct-chapter-fourteen-travel.json`
- Update: `packages/knowledge/data/citations/batch-twenty-advanced.json`
- Test: `packages/knowledge/tests/book-batch-twenty.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [ ] Cover passages, travel conditions, examples, notes, and source layers on PDF 176–183.
- [ ] Preserve the observed opening label 23; do not infer chapter absence from numbering.
- [ ] Add locator, unit identity, attribution, and non-authority tests.
- [ ] Run focused tests and corpus freshness checks; commit checkpoint.

## Task 4: Author chapters 15–16 — Cầu Sư and Học Quán

**Files:**

- Create/update: `packages/knowledge/data/liuyao/bpct-chapter-fifteen-teacher.json`
- Create/update: `packages/knowledge/data/liuyao/bpct-chapter-sixteen-study.json`
- Update: `packages/knowledge/data/citations/batch-twenty-advanced.json`
- Test: `packages/knowledge/tests/book-batch-twenty.test.ts`
- Update: `docs/references/book-sources.md`

- [ ] Cover Cầu Sư PDF 184–190, including the folio-only PDF190 child (closing prose on189).
- [ ] Cover Học Quán PDF 191–199, including every passage, condition, example, and note.
- [ ] Preserve source role/context and translator disagreements; do not convert historical outcomes into claims of efficacy.
- [ ] Test the closing and folio-only bounds, all source-unit locators, attribution, and withheld claims.
- [ ] Run focused tests and corpus freshness checks; commit checkpoint.

## Task 5: Author chapter 17 — Hôn Nhân

**Files:**

- Create/update: `packages/knowledge/data/liuyao/bpct-chapter-seventeen-marriage.json`
- Update: `packages/knowledge/data/citations/batch-twenty-advanced.json`
- Test: `packages/knowledge/tests/book-batch-twenty.test.ts`
- Update: `docs/reviews/knowledge/source-inventory.md`

- [ ] Cover all passages, examples, qualifications, notes, and distinct source layers on PDF 200–211.
- [ ] Preserve historical and culturally specific claims as attributed source summaries, not current relationship advice or coercive duties.
- [ ] Keep contradictory source layers separate and test the withheld authority/non-efficacy boundary.
- [ ] Run focused tests and corpus freshness checks; commit checkpoint.

## Task 6: Author chapters 18–19 — Sản Dục and Tiến Nhân Khẩu

**Files:**

- Create/update: `packages/knowledge/data/liuyao/bpct-chapter-eighteen-childbirth.json`
- Create/update: `packages/knowledge/data/liuyao/bpct-chapter-nineteen-household.json`
- Update: `packages/knowledge/data/citations/batch-twenty-advanced.json`
- Test: `packages/knowledge/tests/book-batch-twenty.test.ts`
- Update: `docs/references/book-sources.md`

- [ ] Cover Sản Dục PDF 212–222, including the folio-only PDF222 child (item42 on221).
- [ ] Cover Tiến Nhân Khẩu PDF 223–230 and its complete source boundary.
- [ ] Preserve health, childbirth, household, safety, and outcome content as historical source claims, not medical, safety, financial, or predictive guidance.
- [ ] Test all closing and folio-only bounds, notes, roles, attribution, exclusions, and release projection.
- [ ] Run focused tests and corpus freshness checks; commit checkpoint.

## Task 7: Reconcile release and verify

**Files:**

- Update: `packages/knowledge/data/manifest.json`
- Update: `docs/reviews/knowledge/expected-units.json`
- Update: `docs/reviews/knowledge/source-inventory.md`
- Update: `docs/references/book-sources.md`
- Update: `packages/knowledge/tests/`
- Regenerate via existing scripts: `packages/knowledge/src/book-release.generated.json` and reports
- Update: `features/feat-053.md`

- [ ] Register only source-compared content. Preserve prior records, citations, and release contracts.
- [ ] Account for every assigned source unit and layer; bind registry to inventory bytes without altering unrelated obligations or opening audit gates.
- [ ] Advance `nextBatch` to feat-054 with regression coverage.
- [ ] Verify no PDF path or copied source prose/image enters released knowledge; compare prior released records/citations for semantic identity.
- [ ] Rebuild knowledge before measuring integrated asset. If it exceeds current Workbox cap 5,570,560 bytes, increase only that cap to a measured value, retaining precaching and all other PWA behavior. Record size/cap/headroom and service-worker inclusion.
- [ ] Run `./init.sh`, `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`, and `pnpm --dir apps/web run check:package-exports`.
- [ ] Inspect full diff; document image-inspection limits, residual ambiguities, and verification evidence. Keep feat-053 active until exact-head independent review and merge.
- [ ] Commit final verification checkpoint.
