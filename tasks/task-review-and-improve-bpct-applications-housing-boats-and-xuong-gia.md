# task-review-and-improve-bpct-applications-housing-boats-and-xuong-gia - Review and improve BPCT applications — Housing boats and Xướng Gia

- Status: active
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-applications-housing-boats-and-xuong-gia](task-complete-bpct-applications-housing-boats-and-xuong-gia.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Record current evidence for every assigned review unit.

## Scope

**Intended work:**

- Review the assigned concepts, examples, and tables; record material content findings.

## Non-goals

New interpretation, calendar, or UI behavior. No unrelated refactors, record splits, ID or
route changes, or edits outside the assigned group.

## Acceptance

- [ ] Chapter 20 — Gia Trạch: every passage, condition, example, and note.
- [ ] Chapter 20 supplement — Tân Tăng Gia Trạch: every passage, condition, example, and note.
- [ ] Chapter 21 — Châu Thuyền: every passage, condition, example, and note.
- [ ] Chapter 22 — Xướng Gia: every passage, condition, example, and note.
- [ ] Preserve reported outcomes as attributed claims; reconcile reused rules and explicit exclusions.
- [ ] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality and agent execution gate](../docs/product-specs/knowledge-quality.md#agent-execution-gate),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Identify the useful explanations and tables in this group.
2. Review each section/table and record its material content findings.
3. Resolve every gate finding: repair supported defects, then re-verify the final revision.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Evidence (2026-10-14, partial source review): Owner selected T08. All three start dependencies are `done`. The attached BPCT edition has 467 PDF pages and SHA-256 `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a`, matching `sources.json`. Inspected the actual text of PDF 231–269 (Gia Trạch, Thuyền Gia Trạch, Tân Tăng Gia Trạch, Châu Thuyền, Xướng Gia) and page images 264 and 266. The four existing ready records have 494 direct references, all within the assigned page window; no entry, record ID, or citation was removed.
- Findings repaired: BPCT PDF 266 (printed 228), Xướng Gia opening `若要安甯必得世無冲剋`, says Thế must avoid both xung and khắc; both the phú and Vietnamese-meaning summaries had omitted xung. BPCT PDF 264 (printed 227), Châu Thuyền §6, describes Đằng Xà hưu tù lâm Không as `khô cháy`; its commentary summary previously weakened that to `khô hỏng`. Corrected these three text occurrences without changing references or source-layer attributions.
- Remaining review: This is not a completed clause-by-clause independent review of the two long housing records (including their conditions, examples, source-image-dependent variants, and notes). The changed entries in Châu Thuyền and Xướng Gia also require independent final-head review under the publication gate. No local `./init.sh` or `validate:corpus --check-books --check` run is claimed, because a checkout/dependencies were not available in this execution environment.
- Blockers: Independent source-fidelity reviewer and required full repository checks are pending. Do not mark the task `done` or claim publication acceptance yet.
- Next: Review every attributed housing entry against BPCT PDF 231–262 and the Châu Thuyền/Xướng Gia final entries against PDF 263–269; inspect page images where glyphs or page boundaries affect meaning, repair only supported defects, then run the required validation and `./init.sh` against the final revision.
