# feat-057 — Complete BPCT eighteen questions and Hà Tri Chương

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II, chapters 1–2; PDF 365–428.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [x] Questions 1–6.
- [x] Questions 7–12.
- [x] Questions 13–18.
- [ ] Every Hà Tri Chương heading, explanation, and note.
- [ ] Give each question and subordinate passage its own inventory disposition.
- [ ] Distinguish the question, attributed experiment, example, and general conditional rule.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Review and commit each six-question checkpoint.
2. Review and commit Hà Tri Chương.
3. Reconcile overlap with existing claims and verify all dispositions.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- Selection: previously user-authorized in the feat-045–083 sequence; feat-056 is done and this feature is the next dependency-ready item.
- Scope: retain the existing 18-question and Hà Tri Chương boundaries; inventory routes questions to audit091 and preserves selected prior coverage of Q5, Q6, Q10, and Q12–14.
- Source: use `docs/books/Tăng bổ bốc phệ chính tông.pdf`, SHA-256 `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a` (467 pages); inspect assigned pages 365–428 and transitions 413/429. Keep PDF 413 as its image-checked folio-only disposition.
- Planning: existing acceptance and inline plan are sufficient for this one-package authoring cohort; no API, migration, or workspace change is planned.
- Boundaries: distinguish questions, attributed experiments/examples, and conditional rules; preserve existing claims and source differences. Authoring does not close source audit, verification, or corpus-certification gates.

## Decision log

- Preserve existing selected Q5/Q6 answer claims and citations; reuse Q5 answer rather than publish a duplicate. New records account for complete question contexts, dated/repeated experiments, separate selected chart annotations and translator notes. Full board reconstruction/calculation fixtures are explicitly excluded per chart; no source image is copied and no calculator-derived repair is made.
- Treat the unsigned different-font insertion after Q18 on PDF412 as a separate supplement within the assigned page interval, not a nineteenth question or certain compiler/translator text.
- Supervisor approved updating only the existing aggregate registry census expectations to the source-derived total, preserving assertion strength and all test/child-process timeouts. Final next-batch matches will move to actual feat-058, not preserve obsolete planning text.

## Implementation checkpoints

- Questions1–6: inspected all source passages/images, added six original-summary articles,41 dated/repeated example contexts and41 separate chart observations,10 notes, six queries, five new answer summaries plus reused Q5 answer. Checkpoint corpus validates254 records/6951 claims/7197 citations; new cohort145 claims with146 dispositions. Baseline `./init.sh` passed181 core and3366 knowledge tests. Full final gates remain pending.

- Questions7–12: checkpoint `bb12a1b` preserves Q1–6. Added six articles and54 separately located example contexts/experiments,52 charts (two Q9 passages have no chart),16 notes; Q10 answer reuses four existing claims. Cumulative332 new claims/334 dispositions,260 records/7138 claims/7384 citations,2258 registry groups. Source-specific tests retain two failed timing claims, different Thế/Ứng labels, repeated questioning and note disagreements.

- Questions13–18: checkpoint `30f33a5` preserves Q1–12. Added six question articles,36 examples/experiments/charts, nine printed notes (Q13 note9 reuses the existing disagreement), Q12 separate conclusion, Q13 red emphasis and Q14 full detailed Ghi chú. The unsigned412 insertion has its own article and18 separate framing/rule/example/special dispositions using the existing uncredited-supplement layer. Cumulative481 new claims/484 mapped fine dispositions;267 records/7287 claims/7533 citations;2409 registry groups. Individual413 confirms folio-only366; Hà Tri release remains the next checkpoint.

## Handoff

- State: active on `feat/057-bpct-eighteen-questions-ha-tri-chuong`.
- Evidence: Dependency feat-056 is merged; the supplied BPCT source hash matches the canonical reference.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect the assigned source interval and existing selected claims, then implement the accepted scope.
