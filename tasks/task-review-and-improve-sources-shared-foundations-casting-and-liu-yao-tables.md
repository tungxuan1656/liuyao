# task-review-and-improve-sources-shared-foundations-casting-and-liu-yao-tables - Review and improve sources shared foundations casting and Liu Yao tables

- Status: done
- Owner: Codex; approved by repository maintainer
- Required to start: [task-implement-versioned-audit-ledgers-and-completion-gates](task-implement-versioned-audit-ledgers-and-completion-gates.md), [task-complete-bpct-foundational-chapters-and-front-matter](task-complete-bpct-foundational-chapters-and-front-matter.md), [task-complete-bpct-casting-supplements-and-book-criticisms](task-complete-bpct-casting-supplements-and-book-criticisms.md), [task-resolve-the-six-remaining-legacy-project-definitions](task-resolve-the-six-remaining-legacy-project-definitions.md), [task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates](task-consolidate-docs-knowledge-ownership-and-harden-agent-quality-gates.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Review and improve the assigned knowledge content.

## Scope

**Intended work:**

- Review the assigned concepts, examples, and tables; record material content findings.

## Non-goals

New interpretation, calendar, or UI behavior. No unrelated refactors, record splits, ID or
route changes, or edits outside the assigned group.

## Acceptance

- [x] Correct supplied-edition references and original summaries under the [publication gate](../docs/product-specs/knowledge-quality.md#publication-gate).
- [x] Vocabulary, aliases, and the six project definitions.
- [x] All eight trigram patterns and attributed associations.
- [x] Casting, moving lines, and every supplied transformation example.
- [x] Càn palace: all eight boards and every line annotation.
- [x] Khảm palace: all eight boards and every line annotation.
- [x] Cấn palace: all eight boards and every line annotation.
- [x] Chấn palace: all eight boards and every line annotation.
- [x] Tốn palace: all eight boards and every line annotation.
- [x] Ly palace: all eight boards and every line annotation.
- [x] Khôn palace: all eight boards and every line annotation.
- [x] Đoài palace: all eight boards and every line annotation.
- [x] 48 Na Jia pairs, twelve branch elements, 25 element relations.
- [x] Ten stems, six spirits, and sourced table exceptions.
- [x] BPCT chapters 1–5 and front matter: useful sourced explanations.
- [x] Use source-derived fixtures independent of liuyao-core.
- [x] Useful explanations have correct book/page references; material unresolved readings remain explicit.
- [x] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality and agent execution gate](../docs/product-specs/knowledge-quality.md#agent-execution-gate),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Identify the useful explanations and tables in this group.
2. Review each section/table and record its material content findings.
3. Resolve supported corrections, then re-verify the final revision and check useful content and links.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- Blockers: none; all five required start dependencies are done.
- Baseline: Clean starting tree; all five start dependencies are done. `./init.sh` passed (181 core, 107 knowledge tests); book validation passed for 381 ready records and four supplied PDFs.
- Changes: Enriched ten stem definitions with sourced polarity, element, and direction. Added source-backed aliases Tí, Tị, and Lục thần; included the opening page of BPCT verse 65. Removed repetitive editorial instructions in the eight palace records, restored the closing Phục condition without resolving its ambiguous wording, and supplied chapter-1 references for their explicit comparisons. Removed the 25-paragraph metadata-only Hán-Việt entry from the poems record, retaining its identification and reading references beside the substantive explanation. Removed repeated internal instructions from all 48 appendix hexagram transformations, 56 trigram transformations, and eight diagrams. Removed the historical-author attribution and audit-status wording from the modern source-gap observation. No IDs, routes, schemas, or core behavior changed.
- Source review: Independent reviewers inspected all 94 term records and six project definitions; all eight palace records, 64 boards, 384 line annotations, and 64 orientations against BPCT PDF 49–66 text and images; and all 29 original entries plus six chapter-1 figures in front matter and chapters 1–5 against BPCT PDF 1–48 and 67–77 text (52/62 for cross-references), with images for diagrams, variants, and attribution boundaries. Stem repairs were independently checked against PDF 8 imagery. Board repairs were checked against PDF 9/13/14/15/66 text and images. Vocabulary locators were checked against their full cited BPCT/NHL passages. Remaining proposed locator wording changes are stylistic, not source errors; descriptive section locators are allowed.
- Checks: Added four independent source-derived tests for eight patterns, 48 Na Jia pairs, twelve branch elements, eight marker pairs, and the 25-cell relative matrix; expected values do not import or derive from liuyao-core. The latest `./init.sh` passes (181 core, 111 knowledge tests); `validate:corpus --check-books --check` passes (381 ready records, four books); `git diff --check` passes. New test-file LSP diagnostics were clear. Existing font-resolution, sourcemap, and bundle-size warnings remain outside scope.
- Casting/catalog review: Independently compared all 48 hexagram transformations, 56 trigram transformations, and eight appendix diagrams against BPCT PDF 429–435 text and images; all eight trigram records against PDF 10–11 imagery and variants in NTT 9/PBC 541; and NHL casting examples against PDF 72–73 text and images. Read both source catalogs completely and checked supplied-edition metadata against BPCT 1–3/467, PBC 1–3/9–10/655, NTT 1–3/5–7/9/13–14/938, and NHL 1–2/393. All six project definitions remain specification-backed rather than book-attributed.
- Final review: No material findings remain after the bounded repairs. The final delta reviewer checked alias/locator changes, the five substantive poem entries, board disclaimer removal, and all fixture expectations against BPCT text 8/9/14/15/44–46/97–99/164 and images 8–11/13/45. The appendix reviewer approved the final cleanup against PDF 430–432 and image 432. Main-agent assertions against HEAD confirmed all 64 palace figures unchanged except shortened orientation prose, preserved poem meanings/references, and unchanged appendix facts/references except the explicitly approved edits; this resolves the delta reviewer's unavailable mechanical-diff check.
- Remaining source uncertainty: Existing Khảm-list omission, Khôn/relative misprints, board/marker disagreements, poem-layer variants, and incomplete appendix inventory remain explicit and are not calculation authority. External bibliography URLs were not opened. No UI/loading behavior changed, so no new browser/offline run was required.
- Verified revision: Final uncommitted working tree based on `3143f6cc1f31468483f0eeb47f5fa31bb93a7ed7`, after all source repairs. Full verification and book validation pass; task index regenerated and freshness/self-checks pass. Source review and verification precede the requested PR commit.
- Next: Maintainer review of the completed batch in its pull request before merging.
