# feat-078 — Audit quẻ 41–44 and all twenty-four hào

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

## Decision log

### Repairs were split by round instead of restating the whole record

- **Question:** the reviewers reported 22 defects over three rounds. Rewrite the affected entries freely, or apply each correction as the smallest edit that removes the defect?
- **Decision:** each correction is the smallest edit that removes the defect — usually one clause — and no entry was restyled. A defect that spans several cells of one entry (for example quẻ 44 `entries[3]`, whose `text` and `condition` shared the same unsupported attribution) is counted once and repaired in both cells.
- **Alternatives:** rewrite the four records in one pass; or leave the weaker wording and record the difference as a note.
- **Rationale:** the acceptance bar asks for correct references, no invented content, and explicit unresolved readings. Rewriting would have made the diff reviewable only by re-auditing everything, and a note would have left a known defect in the published reading.
- **Effect:** the final diff is 27 text edits, one condition edit and four reference changes, all traceable to a named round-1 or round-2 finding.

### Operator reopens feat-078 as a bounded audit, not a restructure

- **Question:** feat-078 is `done` from the retired audit machinery, and quẻ 41–44 still carry the pre-feat-068 shape (overview 8 entries, `entries[0]` holding one 21-reference block, six entries on two hào, legacy `section`/`printedPages`, `notes: 0`). What does "reopen and audit again" mean for these four records?
- **Decision:** audit the existing content against the supplied books and repair material defects; keep the current structure. Do not normalise to the five-overview / four-entry shape, and do not re-run the retired ledger machinery.
- **Alternatives:** give quẻ 41–44 the full feat-070–072 rewrite; or run a read-only audit and report before touching content.
- **Rationale:** the operator chose the bounded audit. The written acceptance bar already governs content correctness, and the optional `section`, `printedPages` and entry `condition` fields remain supported by the model, so removing them is not required by any acceptance criterion — it would be scope, not repair.
- **Effect:** acceptance is correctness plus explicit unresolved readings, not structural conformance. Layer-count or field-shape differences are recorded as non-blocking observations. Delivery keeps the batch flow: one branch, one PR, exact-head CI, merge.

## Handoff

- **Status:** done. The audited content is merged to `main` as `025efaf` (PR [#103](https://github.com/tungxuan1656/liuyao/pull/103)); CI `verify` passed on the reviewed head `d327359`.
- **Blockers:** none.
- **Next action:** none inside this feature. The parallel hexagram batch continues with the next queued record; activate the next `todo` feature only after operator selection, as the repository harness requires.
