# task-review-and-improve-bpct-questions-ha-tri-casting-supplements-and-criticisms - Review and improve BPCT questions Hà Tri casting supplements and criticisms

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-eighteen-questions-and-ha-tri-chuong](task-complete-bpct-eighteen-questions-and-ha-tri-chuong.md), [task-complete-bpct-casting-supplements-and-book-criticisms](task-complete-bpct-casting-supplements-and-book-criticisms.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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

- [ ] Questions 1–6.
- [ ] Questions 7–12.
- [ ] Questions 13–18.
- [ ] Every Hà Tri heading.
- [ ] All actual transformation sections.
- [ ] All eighteen Tạp Sự cases.
- [ ] All eleven Tinh Sát sections.
- [ ] All fifteen criticisms and closing pages.
- [ ] Every materially changed assertion names its exact source passage; objections and their target authors are preserved.
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

- Evidence: First source-grounded correction checkpoint recorded below. This does not complete T11.
- Next: Finish clause-level review of every assigned BPCT unit, arrange independent review of changes, and run repository verification.
- Blockers: remaining source comparison, independent review and verification are outstanding.

## 2026-10-14 — Source-review checkpoint (incomplete)

**Book inspected:** supplied Vĩnh Cao translation of *Tăng bổ Bốc phệ chính tông*, PDF 407 (printed 360), 464–466 (printed 372–374), alongside the existing question and criticism records. Page images were inspected for PDF 407, 465 and 466. The assigned 18 questions, Hà Tri, casting, Tạp Sự, Tinh Sát and criticism records were inventoried; this is **not** a claim that every passage and example has passed independent clause-level comparison.

**Source-supported findings and repairs:**

- `packages/knowledge/data/liuyao/bpct-question-16.json`, first entry, PDF 407 (printed 360): the original printed phrase reads **“Nguyên thần Dân thuỷ”**. The previous explanation silently called it `Dần thuỷ`. The accompanying chart contains Dần, which belongs to Mộc, so the printed wording and its conflict are now stated without inventing a repair or modifying a calculation rule.
- `packages/knowledge/data/liuyao/bpct-criticism-xiii.json`, first entry, PDF 464–465 (printed 372–373): the attribution was solely `Trương Tinh Nguyên`, although the same passage prints **Trương Tịnh Nguyện** on PDF 465. Both forms and the unresolved identity are now preserved.
- `packages/knowledge/data/liuyao/bpct-criticism-xiv.json`, first and third entries, PDF 465–466 (printed 373–374): the printed marriage examples use **Trương Tịnh Nguyện**, not the previously uniform `Trương Tinh Nguyên`. Target attribution is kept distinct from Vương Hồng Tự's objections; no outside identification or unsupported merging is asserted.

**Retained source gaps:** the casting heading on PDF 430 promises 64 quẻ / 384 lines, but PDF 430–432 actually supplies eight headings and 48 single-line transformations before IV; the other 56 headings cannot be manufactured. The final PDF 467 is blank. Existing explicit caveats must remain.

**Gate and next action:** only this focused correction checkpoint is complete. The T11 acceptance checkboxes remain open; no independent reviewer has yet confirmed the changed assertions. `./init.sh` and `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` have **not** been executed in this connector-only session, so CI and a local source-aware run are still required before marking T11 done. No schema, ID, document route, calendar or core-engine change was made.
