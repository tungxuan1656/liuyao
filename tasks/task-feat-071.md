# feat-071 - Review and improve quẻ 13–16 and all twenty-four hào

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-067](task-feat-067.md), [feat-041](task-feat-041.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Improve each quẻ and position as readable source-backed knowledge.

## Scope

**Intended work:**

- 13 Thiên Hỏa Đồng Nhân; 14 Hỏa Thiên Đại Hữu; 15 Địa Sơn Khiêm; 16 Lôi Địa Dự.
- Each line checkbox requires a useful explanation with relevant sources and meaningful author differences.
- Use a concise content checklist; follow the simplified knowledge model.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] 13 · Sơ (1).
- [x] 13 · Nhị (2).
- [x] 13 · Tam (3).
- [x] 13 · Tứ (4).
- [x] 13 · Ngũ (5).
- [x] 13 · Thượng (6).
- [x] 14 · Sơ (1).
- [x] 14 · Nhị (2).
- [x] 14 · Tam (3).
- [x] 14 · Tứ (4).
- [x] 14 · Ngũ (5).
- [x] 14 · Thượng (6).
- [x] 15 · Sơ (1).
- [x] 15 · Nhị (2).
- [x] 15 · Tam (3).
- [x] 15 · Tứ (4).
- [x] 15 · Ngũ (5).
- [x] 15 · Thượng (6).
- [x] 16 · Sơ (1).
- [x] 16 · Nhị (2).
- [x] 16 · Tam (3).
- [x] 16 · Tứ (4).
- [x] 16 · Ngũ (5).
- [x] 16 · Thượng (6).
- [x] All four names, aliases, structures, overviews, Thoán/Tượng, notes, and author layers pass.
- [x] Inspect full passages/images; review each source error and exclusion.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and improve one quẻ at a time.
2. Repair material content findings and check affected source passages.
3. Verify all twenty-four positions before closing the feature.

## Verify

- `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build).
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed: 381 records; 381 ready; 4 supplied books verified against SHA-256 fingerprints.
- Round 7 independent review at `c5e78bf` returned **PASS**, no P0: all twenty round-6 corrections (`N01`–`N18`, `E01`, `E02`) landed, the written acceptance bar holds, and structure passed — 4 records `ready`, five non-empty overview entries each, six ordered lines each, no legacy `section`/`printedPages`/`condition`.
- All assigned units and document routes confirmed.

## Handoff

- Evidence: inherited completion and any later superseding follow-ups below; not re-executed by this migration.
- Blockers and next action: preserve the final inherited handoff, including delivery caveats; do not restart completed work automatically.

### Inherited handoff and follow-ups (historical evidence)

- Historical state: done.
- Evidence: `./init.sh` passed (181 core tests + 97 knowledge tests) and `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. Seven independent read-only review rounds against the extracted source text: rounds 1–6 found 10, 5, 11, 10, 15 and 18 attribution defects, each fixed by removing only the unsupported clause and restoring the source's own wording; round 6 was the first fully exhaustive audit (all 112 attributed entries, 94 clean) and round 7 was the verification round, returning PASS with no P0. Merged to `main` in `67e0565` (PR #99), squash-merged at the exact reviewed head `c5e78bf6c4be0b8e0f552bacd1a3efe61f1b9b79`.
- Dependencies: See [frozen index](../feature_index.json).
- Next: Activate `feat-072` (Review and improve quẻ 17–20 and all twenty-four hào) from `main` at `67e0565`.
- Limits: the reviewers read the extracted page text but could not inspect PDF page images, so the acceptance criterion “inspect full passages/images” is attested from text only; they also could not execute the repository gates, which the Leader ran and recorded here. The baseline-vs-final invariant comparison (`0 of 4` files changed invariant fields; all line tuples unchanged) is Leader-generated. The review bar is the written acceptance bar recorded in the decision log, not clause-level author fidelity.

### Completion evidence on the latest recorded date (historical supplements)

Same-day file order is not chronology. The inherited final handoff and its superseding follow-ups control; these are completion snapshots, not new instructions.

#### 2026-10-09 — feat-071 reviewed and improved quẻ 13–16

- Historical status: done; merged to `main` in `67e0565` (PR #99), squash-merged at the exact reviewed head `c5e78bf6c4be0b8e0f552bacd1a3efe61f1b9b79`.
- Result: reviewed and improved all four assigned quẻ (13 Thiên Hỏa Đồng Nhân, 14 Hỏa Thiên Đại Hữu, 15 Địa Sơn Khiêm, 16 Lôi Địa Dự) and all twenty-four hào under the simplified knowledge model.
- Content: five overview entries per quẻ and four attributed explanations on every hào — Nguyễn Hiến Lê, Phan Bội Châu, Trình Di and Chu Hy (the last two via “Ngô Tất Tố — dịch và chú giải”). Author-specific readings are kept distinct rather than harmonised and unresolved readings stay explicit. The legacy `section` and `printedPages` reference fields are gone from these four records; two reference ranges were widened where the cited passage continued onto a neighbouring page (`hexagram-14.json` `[308,309]` → `[306,309]`; `hexagram-15.json` `[317,317]` → `[316,317]`).
- Defect class: **author-layer padding** — a writer working to a per-hào length target filled the short Nguyễn Hiến Lê layers with other commentators' explaining clauses, causal connectives, general premises and degree words. Seven review rounds found 10, 5, 11, 10, 15 and 18 instances; 69 clauses were removed and replaced with the source's own wording. The class did not converge under spot-fixing, because each broader audit found it in cells a narrower one had cleared.
- Acceptance bar: after six non-converging rounds the operator fixed the governing standard — the **written acceptance criteria** (correct book/page references and no invented content), with a Vietnamese degree or superlative word where the source gives none treated as a style difference rather than a defect. All eighteen round-6 findings and the two baseline-era dispositions (`E01`, `E02`) were applied anyway. This is the only decision in the feature that changes what “pass” means and it now governs the rest of the batch.
- Evidence: `./init.sh` passed via `=== Verification passed ===` (181 core tests + 97 knowledge tests; format, lint, typecheck, build). `validate:corpus --check-books --check` reported 381 records, 381 ready, 4 supplied books. Round 6 was the first fully exhaustive audit (all 112 attributed entries, 94 clean, plus 4 introductions and 8 notes); round 7 was verification-only and returned **PASS**, no P0, confirming all twenty corrections landed and the acceptance bar holds.
- Limits: reviewers inspected extracted page text, not page images, and did not execute the test commands; the baseline-vs-final invariant comparison (0 of 4 files changed invariant fields, all line tuples unchanged) is Leader-generated.
- Blockers: none for feat-071.
- Next: activate feat-072 (Review and improve quẻ 17–20 and all twenty-four hào) from `main` at `67e0565`, using the writer and review briefs in `.agent-work/batch-writer-brief.md` and `.agent-work/batch-review-brief.md`.

## Migration provenance

Migrated from [feat-071](../features/feat-071.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
