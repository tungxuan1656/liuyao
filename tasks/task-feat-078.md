# feat-078 - Audit quẻ 41–44 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-044](task-feat-044.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Audit the existing quẻ 41–44 records against the supplied books and repair every real defect.

## Scope

**Intended work:**

- 41 Sơn Trạch Tổn; 42 Phong Lôi Ích; 43 Trạch Thiên Quải; 44 Thiên Phong Cấu.
- Compare every attributed overview and line entry with the page it cites.
- Correct wrong or too-narrow book/page references, unsupported attribution, invented content, and material inherited errors.
- Keep the existing record structure: no forced overview or hào entry count, no length target, and no removal of optional fields the model still supports.

**Superseded:** the feature's former acceptance (per-unit decisions, current hashes, exact locators, rejected units staying open) belongs to the retired audit and provenance machinery. The [simplified model](../docs/design-docs/knowledge-model.md) replaces it, so this feature is not resumed on those terms.
The feature was reopened on operator direction because feat-068 migrated quẻ 41–44 to the simplified model without reviewing them, and the batch checkpoint had recorded feat-078 as already done and skipped.

## Non-goals

New interpretation, calendar, or UI behavior. Structural normalisation of the four records.

## Acceptance

- [x] 41 · Sơ (1).
- [x] 41 · Nhị (2).
- [x] 41 · Tam (3).
- [x] 41 · Tứ (4).
- [x] 41 · Ngũ (5).
- [x] 41 · Thượng (6).
- [x] 42 · Sơ (1).
- [x] 42 · Nhị (2).
- [x] 42 · Tam (3).
- [x] 42 · Tứ (4).
- [x] 42 · Ngũ (5).
- [x] 42 · Thượng (6).
- [x] 43 · Sơ (1).
- [x] 43 · Nhị (2).
- [x] 43 · Tam (3).
- [x] 43 · Tứ (4).
- [x] 43 · Ngũ (5).
- [x] 43 · Thượng (6).
- [x] 44 · Sơ (1).
- [x] 44 · Nhị (2).
- [x] 44 · Tam (3).
- [x] 44 · Tứ (4).
- [x] 44 · Ngũ (5).
- [x] 44 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Every repair is a material defect under the written acceptance bar, not a restyle or a length change.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. One writer per quẻ audits its record clause by clause and repairs only material defects; each writes a provenance table for every attributed entry, outside the published JSON.
2. A fresh read-only reviewer walks every attributed entry; its findings are reconciled and applied, then a verification round confirms them.
3. The Leader inspects the PDF pages any note makes an image claim about, then runs the repository gates on the frozen revision.

## Verify

- Content: `packages/knowledge/data/hexagrams/hexagram-41.json`, `-42`, `-43`, `-44`; branch `feat/078-hexagram-audit-41-44`, PR [#103](https://github.com/tungxuan1656/liuyao/pull/103), merged to `main` as `025efaf`.
- Revision ladder: `dbb364d` (writer pass), `7d93e71` (quẻ 41–43 round-1 repairs), `d327359` (quẻ 44 round-1 repairs) — the reviewed head, and the head the CI check `verify` passed on.
- Writers: one `worker` per quẻ, each leaving a per-entry provenance table outside the published JSON (`.agent-work/feat-078/reports/hNN-report.md`).
- Round 1, exhaustive and read-only: 150 attributed entries walked cell by cell — 41: 36 entries, 3 P1; 42: 36, 2 P0 + 1 P1; 43: 36, 6 P0; 44: 42, 4 P0 + 6 P1. Reports `.agent-work/feat-078/reviews/r1-hNN.md`.
- Round 2, verification of every correction: `r2-h41`, `r2-h42`, `r2-h43`, `r2-h44` all `PASS`, 0 new defects, `Merge verdict: OK`; each correction is quoted against the page that carries it.
- Edits applied: 27 `text` fields, 1 `condition` (`hexagram-44.json` `entries[3]`), 4 new reference objects (PBC 403 in `hexagram-41.json` `lines[5].entries[0]`; NTT 683 notes 9–10 in `hexagram-43.json` `lines[5].entries[2]`; NTT 684 in `hexagram-44.json` `entries[9]`), and one narrowed range (`hexagram-43.json` `entries[1].references[0]` 268–269 → 268). The writer pass supplied 7 text edits, round 1 supplied 11, and the quẻ-44 round supplied 9 plus the condition.
- Images inspected by the Leader with PyMuPDF on the supplied books: NTT PDF 662 prints “hình thi, thì không thể thế.” (supports the quẻ-42 wording) and NTT PDF 676 shows the hào-3 Chinese line with visibly corrupt glyphs, so `hexagram-43.json` `lines[2].entries[2].condition` stays explicitly unresolved. `notes[]` is empty in all four records, so no other entry claimed an image check.
- Gates on the reviewed head: `./init.sh` → `=== Verification passed ===` (format, lint, typecheck, build, tests); `pnpm --dir packages/knowledge run validate:corpus` → 381 records, 381 ready, 4 supplied books, source pages valid; knowledge tests 12 files / 97 tests pass.
- Structure held: ids, `kingWenNumber`, trigram ids, aliases, `topicIds`, `relatedIds`, status, line positions, polarity, labels, entry counts and reference counts are identical to the pre-audit base apart from the four added references; the optional `section`, `printedPages` and `condition` fields are retained.
- Non-blocking observations: `notes[]` empty in all four records; legacy `section`/`printedPages` retained by operator decision; `hexagram-43.json` `lines[2].entries[2].condition` records an unresolved glyph reading; `hexagram-44.json` `entries[9]` now carries two references because the quoted Trình Di line and the translator’s gloss sit on different pages.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- **Status:** done. The audited content is merged to `main` as `025efaf` (PR [#103](https://github.com/tungxuan1656/liuyao/pull/103)); CI `verify` passed on the reviewed head `d327359`.
- **Blockers:** none.
- **Next action:** none inside this feature. The parallel hexagram batch continues with the next queued record; activate the next `todo` feature only after operator selection, as the repository harness requires.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — feat-078 audited quẻ 41–44

- Historical status: done; merged to `main` in `025efaf` (PR #103), squash-merged at the exact reviewed head `d32735968fce8b51afe4e4445b6dcec89e27248d`.
- Result: audited quẻ 41 Sơn Trạch Tổn, 42 Phong Lôi Ích, 43 Trạch Thiên Quải and 44 Thiên Phong Cấu — all twenty-four hào plus every overview entry — against the four supplied books, and repaired every material defect found.
- Why reopened: the feature was `done` from the retired audit machinery, but feat-068 migrated these four records to the simplified model mechanically and never reviewed them; the batch checkpoint had recorded feat-078 as already done and skipped it.
- Scope: operator-set bounded audit, not a restructure. Content correctness only — no five-overview / four-entry normalisation, no length target, and the optional `section`, `printedPages` and `condition` fields stay. All four records keep their pre-audit shape (overview 8/7/12/14 entries; hào counts 24–43 attributed entries per quẻ).
- Defects: 22 findings over two exhaustive rounds — quẻ 41: 3 P1; 42: 2 P0 + 1 P1; 43: 6 P0; 44: 4 P0 + 6 P1. Dominant classes were changed certainty (“có thể” where the source says “quyết chắc”/“ắt”), changed causation or object (quẻ 44 `lines[4].entries[1]` turned PBC's restraint of Sơ into sheltering Sơ), omitted conditions, and quotes or instructions attributed to a page that does not carry them. Corrections are 27 `text` edits, 1 `condition` edit, 4 added references (PBC 403, NTT 683 notes 9–10, NTT 684) and one narrowed range (`hexagram-43.json` `entries[1].references[0]` 268–269 → 268, since NHL 269 carries only hào 1–4).
- Review: four writers audited one quẻ each with a per-entry provenance table outside the JSON; then independent read-only reviewers ran a full round 1 over all 150 attributed entries, and a round 2 that re-checked every correction against the page that carries it. `r2-h41`, `r2-h42`, `r2-h43` and `r2-h44` all returned `PASS`, 0 new defects.
- Evidence: `./init.sh` → `=== Verification passed ===` on the reviewed head (format, lint, typecheck, build, 181 core + 97 knowledge tests); `validate:corpus` → 381 records, 381 ready, 4 supplied books, source pages valid. Exact-head CI on `d327359` was green (`verify`, Cloudflare Pages, GitGuardian) with `mergeStateStatus: CLEAN`. Structure invariants (ids, `kingWenNumber`, trigrams, aliases, topics, relations, status, line tuples, entry and reference counts) are unchanged apart from the four added references.
- Image claims: `notes[]` is empty in all four records, so no entry asserted a page image. The Leader still rendered the two pages a decision hinged on with PyMuPDF — NTT PDF 662 prints “hình thi, thì không thể thế.” (the quẻ-42 wording), and NTT PDF 676 shows the hào-3 Chinese line with visibly corrupt glyphs, which is why `hexagram-43.json` `lines[2].entries[2].condition` keeps the reading explicitly unresolved.
- Limits: reviewers read extracted page text, never page images, and did not execute the gates; the structure invariant comparison and the image renders are Leader-generated. Quẻ 44's round-1 reviewer was killed by a provider usage limit and had to be re-dispatched, and its round-2 report was written to the managed artifact path rather than the reviewer directory.
- Blockers: none.
- Next: none inside this feature. The batch continues with the next queued hexagram record — feat-073 (Review and improve quẻ 21–24 and all twenty-four hào, dependencies feat-067 and feat-041 both done) — which needs operator selection before activation.

## Migration provenance

Migrated from [feat-078](../features/feat-078.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
