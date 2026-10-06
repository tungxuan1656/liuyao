# feat-057 — Complete BPCT eighteen questions and Hà Tri Chương

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II, chapters 1–2; PDF 365–428.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Questions 1–6.
- [ ] Questions 7–12.
- [ ] Questions 13–18.
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

## Handoff

- State: active on `feat/057-bpct-eighteen-questions-ha-tri-chuong`.
- Evidence: Dependency feat-056 is merged; the supplied BPCT source hash matches the canonical reference.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect the assigned source interval and existing selected claims, then implement the accepted scope.
