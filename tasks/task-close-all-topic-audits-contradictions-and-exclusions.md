# task-close-all-topic-audits-contradictions-and-exclusions - Close all topic audits contradictions and exclusions

- Status: done
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [task-close-the-authoring-inventory-for-all-supplied-sections](task-close-the-authoring-inventory-for-all-supplied-sections.md), [task-simplify-knowledge-and-rebuild-que-01-04](task-simplify-knowledge-and-rebuild-que-01-04.md), [task-review-and-improve-que-05-08-and-all-twenty-four-hao](task-review-and-improve-que-05-08-and-all-twenty-four-hao.md), [task-review-and-improve-que-09-12-and-all-twenty-four-hao](task-review-and-improve-que-09-12-and-all-twenty-four-hao.md), [task-review-and-improve-que-13-16-and-all-twenty-four-hao](task-review-and-improve-que-13-16-and-all-twenty-four-hao.md), [task-review-and-improve-que-17-20-and-all-twenty-four-hao](task-review-and-improve-que-17-20-and-all-twenty-four-hao.md), [task-review-and-improve-que-21-24-and-all-twenty-four-hao](task-review-and-improve-que-21-24-and-all-twenty-four-hao.md), [task-review-and-improve-que-25-28-and-all-twenty-four-hao](task-review-and-improve-que-25-28-and-all-twenty-four-hao.md), [task-review-and-improve-que-29-32-and-all-twenty-four-hao](task-review-and-improve-que-29-32-and-all-twenty-four-hao.md), [task-review-and-improve-que-33-36-and-all-twenty-four-hao](task-review-and-improve-que-33-36-and-all-twenty-four-hao.md), [task-review-and-improve-que-37-40-and-all-twenty-four-hao](task-review-and-improve-que-37-40-and-all-twenty-four-hao.md), [task-audit-que-41-44-and-all-twenty-four-hao](task-audit-que-41-44-and-all-twenty-four-hao.md), [task-review-and-improve-que-45-48-and-all-twenty-four-hao](task-review-and-improve-que-45-48-and-all-twenty-four-hao.md), [task-review-and-improve-que-49-52-and-all-twenty-four-hao](task-review-and-improve-que-49-52-and-all-twenty-four-hao.md), [task-review-and-improve-que-53-56-and-all-twenty-four-hao](task-review-and-improve-que-53-56-and-all-twenty-four-hao.md), [task-review-and-improve-que-57-60-and-all-twenty-four-hao](task-review-and-improve-que-57-60-and-all-twenty-four-hao.md), [task-review-and-improve-que-61-64-and-all-twenty-four-hao](task-review-and-improve-que-61-64-and-all-twenty-four-hao.md), [task-review-and-improve-sources-shared-foundations-casting-and-liu-yao-tables](task-review-and-improve-sources-shared-foundations-casting-and-liu-yao-tables.md), [task-review-and-improve-all-sixty-nine-bpct-chapter-6-sentences](task-review-and-improve-all-sixty-nine-bpct-chapter-6-sentences.md), [task-review-and-improve-bpct-applications-weather-life-career-and-wealth](task-review-and-improve-bpct-applications-weather-life-career-and-wealth.md), [task-review-and-improve-bpct-applications-loss-travel-study-marriage-and-household-members](task-review-and-improve-bpct-applications-loss-travel-study-marriage-and-household-members.md), [task-review-and-improve-bpct-applications-housing-boats-and-xuong-gia](task-review-and-improve-bpct-applications-housing-boats-and-xuong-gia.md), [task-review-and-improve-bpct-applications-illness-remedies-and-absent-travellers](task-review-and-improve-bpct-applications-illness-remedies-and-absent-travellers.md), [task-review-and-improve-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight](task-review-and-improve-bpct-applications-litigation-spirits-agriculture-state-conflict-and-flight.md), [task-review-and-improve-bpct-questions-ha-tri-casting-supplements-and-criticisms](task-review-and-improve-bpct-questions-ha-tri-casting-supplements-and-criticisms.md), [task-review-and-improve-classical-traditions-diagrams-and-all-he-tu-chapters](task-review-and-improve-classical-traditions-diagrams-and-all-he-tu-chapters.md), [task-review-and-improve-ordered-lessons-and-every-worked-example](task-review-and-improve-ordered-lessons-and-every-worked-example.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Reconcile useful content and source differences across the knowledge library.

## Scope

The existing knowledge records, useful source explanations, links, and visible gaps.
Use focused content review under the [quality contract](../docs/product-specs/knowledge-quality.md).

## Non-goals

A certification system, predictive efficacy claims, or a new calculation ruleset.

## Acceptance

- [x] Check foundations, quẻ/hào, casting, Liu Yao topics, classical context, and learning articles.
- [x] Correct material contradictions and source-location errors without hiding legitimate author differences.
- [x] Resolve broken record/line links and identify genuinely missing explanations.
- [x] Describe remaining unavailable source material precisely; do not block unrelated supported content.
- [x] Relevant package checks and ./init.sh pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [model](../docs/design-docs/knowledge-model.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md).

## Plan

1. Select a coherent record/topic group and compare its explanations with relevant source passages.
2. Correct material findings and check links and meaningful conditions.
3. Record concise remaining gaps and the next action.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- `pnpm tasks:check`

## Handoff

- Evidence: Completed comprehensive corpus and topic audit across all 381 released records in the 6 required categories (84 foundations, 64 hexagrams with 384 lines, 9 casting records, 118 Liu Yao topics, 94 terms, 8 trigrams, 4 learning lessons/worked examples) across 9 topic IDs. Audited link integrity across all 98 explicit ContentLinks, line positions, section IDs, relatedIds, and applicableRuleIds with 0 broken links or unresolved references. Reconciled author differences and material source discrepancies (BPCT-01 through BPCT-04, BPCT Chapter 6 Câu 4, commentator distinctions between PBC and NHL) as attributed readings in canonical records and `docs/references/book-sources.md`. Reconciled all 17 historical exclusions (manuscript lacunae and authorial omissions in PBC Hệ Từ Thượng ch06/09, Hệ Từ Hạ ch03/04/09, Thuyết Quái, Tự Quái, Tạp Quái) as attributed gap records without synthetic fills. Verified full test suites (181 core tests, 121 knowledge tests), corpus validation, and PWA build via `./init.sh`.
- Next: [task-review-knowledge-meaning-and-source-attribution](task-review-knowledge-meaning-and-source-attribution.md)
- Blockers: None.
