# task-review-and-improve-all-sixty-nine-bpct-chapter-6-sentences - Review and improve all sixty-nine BPCT chapter 6 sentences

- Status: done
- Owner: Codex; approved by repository maintainer
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-reviewed-knowledge-batch-nine](task-reviewed-knowledge-batch-nine.md), [task-reviewed-knowledge-batch-ten](task-reviewed-knowledge-batch-ten.md), [task-reviewed-que-41-44-and-bpct-sentences-12-16](task-reviewed-que-41-44-and-bpct-sentences-12-16.md), [task-reviewed-que-45-48-and-bpct-sentences-17-24](task-reviewed-que-45-48-and-bpct-sentences-17-24.md), [task-reviewed-que-49-52-and-bpct-sentences-25-32](task-reviewed-que-49-52-and-bpct-sentences-25-32.md), [task-reviewed-que-53-56-and-bpct-sentences-33-40](task-reviewed-que-53-56-and-bpct-sentences-33-40.md), [task-reviewed-que-57-60-and-bpct-sentences-41-48](task-reviewed-que-57-60-and-bpct-sentences-41-48.md), [task-reviewed-que-61-64-and-bpct-sentences-49-56](task-reviewed-que-61-64-and-bpct-sentences-49-56.md), [task-complete-bpct-chapter-6-sentences-57-69](task-complete-bpct-chapter-6-sentences-57-69.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
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

- [x] Sentences 1–24.
- [x] Sentences 25–48.
- [x] Sentences 49–69.
- [x] Every materially changed assertion names its exact source passage; conditions and author differences are preserved.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

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

- Blockers: none.
- Baseline: Clean starting tree on branch `feat/review-bpct-chapter-6-sentences`; all required start dependencies are done. Initial `./init.sh` passed (181 core, 111 knowledge tests); book validation passed for 381 ready records and four supplied PDFs.
- Changes:
  - Reviewed all 69 sentences of BPCT Chapter 6 against source text and annotations in `Tăng bổ bốc phệ chính tông.pdf` (PDF pages 77–100, printed pages 63–86).
  - Documented textual discrepancy in Câu 4: recorded internal contradiction between Chapter 6 (PDF 78, printed 64) where Hợi-Mão-Mùi is printed as Thủy cục vs Chapter 1 Section XVI (PDF 16, printed 10) where Hợi-Mão-Mùi is defined as Mộc cục, cross-referencing Section XVI without silent rewriting (`article-support-and-control-context`).
  - Documented translation print error in Câu 51: noted the Vietnamese translation line printed "Thê lâm Không" while original Chinese text states "心退悔兮世空" (Thế), transliteration states "Tâm thoái hối hề Thế Không", and Vương Hồng Tự's commentary strictly discusses Thế hào lâm Tuần Không (`article-adverse-support-store-intervening-lines-and-release-context`).
  - Restored Footnote 3 on Câu 11: detailed Vương Hồng Tự's Nguyệt quái thân method (starting from Tý if Thế is yang, from Ngọ if Thế is yin) and added Vĩnh Cao's note distinguishing this from other works where Thân means Thế (`article-hexagram-body-context`).
  - Restored full historical divination parameters in Câu 53: added date Quý Dậu, month Thìn, hexagram Tiết biến Khảm, Thế Tị Hỏa transforming to Dần Mộc (in generation there is Hình: Dần hình Tị), Mão Mộc adverse spirit secretly moving to generate Thế, resulting in illness in the exam hall (`article-adverse-support-store-intervening-lines-and-release-context`).
  - Improved readability and concept flow in `article-timing-relatives-body-spirits-and-sincerity-context` (sentences 57–69) following `knowledge-content.md` guidelines, shifting from review-log wording to concept-first educational structure.
  - Verified sentence mapping across records:
    - Sentences 1–24: `rule-moving-line-change` (câu 1), `article-balance-excess-and-deficiency` (câu 2–3), `article-support-and-control-context` (câu 4–5), `article-growth-and-peak-day-context` & `article-death-store-extinction-empty-context` (câu 6–7), `article-day-and-month-authority-context` (câu 8–9), `article-year-authority-context` & `term-year-authority` (câu 10), `article-hexagram-body-context` & `term-hexagram-body` (câu 11), `article-shi-ying-interaction-context` (câu 12–16), `article-useful-spirit-rescue-empty-combination-context` (câu 17–24).
    - Sentences 25–48: `article-hidden-movement-store-strength-and-branch-context` (câu 25–32), `article-hidden-spirit-release-restraint-and-combination-context` (câu 33–40), `article-useful-spirit-avoidance-rescue-and-transformation-context` (câu 41–48), along with `article-seasonal-strength-context` (câu 27) and `article-combination-control-context` (câu 31).
    - Sentences 49–69: `article-adverse-support-store-intervening-lines-and-release-context` (câu 49–56), `article-timing-relatives-body-spirits-and-sincerity-context` (câu 57–69), along with `article-advancing-retreating-spirits` (câu 52) and `article-six-spirits-context` (câu 65).
  - Added test suite `packages/knowledge/tests/bpct-chapter-6-sentences.test.mjs` verifying complete 1–69 sentence coverage, strict page boundaries (PDF 77–100, printed 63–86) rejecting out-of-bounds citations, and verifying specific findings for sentences 4, 11, 51, and 53.
- Source review: All 69 sentences verified against `docs/books/Tăng bổ bốc phệ chính tông.pdf` pages 77–100. Author attributions (Lưu Bá Ôn for Thiên Kim Phú, Vương Hồng Tự for commentary, Vĩnh Cao for notes/translation) and conditions are preserved.
- Checks:
  - `./init.sh` passed cleanly (format check, task index freshness, linting, build, package exports, 181 core tests, 120 knowledge tests).
  - `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check` passed (381 ready records, 4 supplied books).
- Final review: Complete.
- Remaining source uncertainty: None. All 69 sentences have explicit locators, attributions, citations, and documented textual discrepancies.
- Verified revision: Clean working tree on `feat/review-bpct-chapter-6-sentences`.
- Next: Move to `tasks/task-review-and-improve-bpct-applications-weather-life-career-and-wealth.md` (the next task in `tasks/knowledge-roadmap.md`).
