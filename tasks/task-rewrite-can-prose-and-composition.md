# task-rewrite-can-prose-and-composition - Rewrite Càn prose and composition

- Status: done
- Owner: Codex
- Required to start: none
- Required to integrate/release: independent source review and focused verification below

## Scope

User approved rewriting `hexagram-01.json` directly after reviewing its prose. Turn the teaching text into connected explanations, with author comparisons placed around the question they clarify. Retain substantive disagreements, examples, references, attribution, conditions, stable IDs, six positions and special-passage anchors. Remove reader-facing editorial jargon where it interrupts explanation. Do not change other hexagrams, UI, schema, calculations or dependencies.

## Acceptance

- [x] Overview, six hào and study sections explain their reasoning in original Vietnamese rather than juxtaposing compressed summaries.
- [x] Source meanings, differing readings and uncertainties survive; no author's reading becomes an unattributed consensus.
- [x] An independent reviewer checks materially changed assertions and their direct uses against supplied passages.
- [x] Corpus/package checks, reference/anchor preservation and formatting pass against the final revision.

## Sources

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md), [model](../docs/design-docs/knowledge-model.md), [licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Read the existing record and cited book passages; establish package-test baseline.
2. Rewrite connected teaching explanations within the existing record and preserve its source apparatus.
3. Independently review meaning and readability, repair supported findings, run focused checks and record handoff.

## Handoff

- Blockers: none.
- Baseline: clean working tree; `pnpm --filter @liuyao/knowledge test` passes all 268 tests before editing.
- Authoring: rewrote 38 teaching texts and 32 source-summary texts; all 110 entries, metadata, references, conditions, order and anchors are preserved. No other hexagram or application code changed.
- Author source inspection: complete NHL PDF 40–41, 59–63, 131–136; NTT PDF 80–128; PBC PDF 30–57. Inspected NTT images 123 and 128 and NHL image 136 for the textual question, notes and diagram. Page numbers count from the PDF cover.
- Independent review: Reviewer inspected all 70 changed texts and their direct uses against the complete supplied NHL PDF 40–41, 59–63, 131–136; NTT PDF 80–128; PBC PDF 30–57 extracts, and directly viewed NTT images 123/128 and NHL image 136. The reviewer used the complete extracts rather than regenerating them. One finding identified Phùng Hậu Trai's connected explanation at NTT 125 being wrongly split into competing readings. Corrected that paragraph and independently rechecked the final working-tree record, its reference/attribution and direct Thượng Cửu uses; no findings remain within the inspected scope. No content changes followed that recheck.
- Verification: package tests pass (268 tests); package build/typecheck and Biome pass; structural comparison confirms text-only changes. `./init.sh` passes all gates after the source repair, including 449 package tests, production build and knowledge-delivery checks. Active JSON diagnostics report only English-dictionary suggestions for Vietnamese words, not structural errors. No browser or novice-reader trial was run.
- Next: user can read Càn in the library and judge the prose direction before approving work on any other hexagram.
