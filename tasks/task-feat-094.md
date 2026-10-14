# feat-094 - Close all topic audits contradictions and exclusions

- Status: todo
- Owner: Product Owner (repository maintainer); implementation assigned on selection
- Required to start: [feat-066](task-feat-066.md), [feat-068](task-feat-068.md), [feat-069](task-feat-069.md), [feat-070](task-feat-070.md), [feat-071](task-feat-071.md), [feat-072](task-feat-072.md), [feat-073](task-feat-073.md), [feat-074](task-feat-074.md), [feat-075](task-feat-075.md), [feat-076](task-feat-076.md), [feat-077](task-feat-077.md), [feat-078](task-feat-078.md), [feat-079](task-feat-079.md), [feat-080](task-feat-080.md), [feat-081](task-feat-081.md), [feat-082](task-feat-082.md), [feat-083](task-feat-083.md), [feat-084](task-feat-084.md), [feat-085](task-feat-085.md), [feat-086](task-feat-086.md), [feat-087](task-feat-087.md), [feat-088](task-feat-088.md), [feat-089](task-feat-089.md), [feat-090](task-feat-090.md), [feat-091](task-feat-091.md), [feat-092](task-feat-092.md), [feat-093](task-feat-093.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Reconcile useful content and source differences across the knowledge library.

## Scope

The existing knowledge records, useful source explanations, links, and visible gaps.
Use focused content review under the [quality contract](../docs/product-specs/knowledge-quality.md).

## Non-goals

A certification system, predictive efficacy claims, or a new calculation ruleset.

## Acceptance

- [ ] Check foundations, quẻ/hào, casting, Liu Yao topics, classical context, and learning articles.
- [ ] Correct material contradictions and source-location errors without hiding legitimate author differences.
- [ ] Resolve broken record/line links and identify genuinely missing explanations.
- [ ] Describe remaining unavailable source material precisely; do not block unrelated supported content.
- [ ] Relevant package checks and ./init.sh pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [model](../docs/design-docs/knowledge-model.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md).

## Plan

1. Select a coherent record/topic group and compare its explanations with relevant source passages.
2. Correct material findings and check links and meaningful conditions.
3. Record concise remaining gaps and the next action.

## Handoff

- Next: Complete prerequisites and select this content pass when needed.
- Evidence: not executed; migration does not activate this task.
- Blockers: not evaluated until owner selection and dependency check.

## Migration provenance

Migrated from [feat-094](../features/feat-094.md). Legacy IDs, start gates, acceptance checkboxes, and completion caveats are preserved. Historical command results do not assert current checks passed. The original record retains detailed review/verification evidence and superseded decisions; its lifecycle instructions are not current policy.
