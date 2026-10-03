# feat-032 — Book-backed JSON knowledge foundation and pilot

## Goal

Deliver a cited JSON pilot for classical Kinh Dịch and Liu Yao learning.

## Scope

- Validated JSON, edition citations, review states, and coverage.
- Eight trigrams; Càn, Khôn, Tụng, Lý; 24 lines and separate special passages.
- Casting, foundational Liu Yao tables, and compatible readonly APIs.

## Non-goals

Full corpus certification, automated interpretation, calendar changes, core rewrites, and PDF redistribution.

## Acceptance

- [x] Four editions have fingerprints, bibliographic metadata, and rights boundaries.
- [x] Checks reject invalid shapes, references, evidence, and release states.
- [x] Eight trigrams and four quẻ have cited structure; each quẻ has six cited line summaries.
- [x] Casting and Liu Yao records preserve conditions and resolve documented discrepancies.
- [x] JSON owns migrated content; adapters preserve IDs and readonly APIs.
- [x] Coverage distinguishes reviewed content, missing author commentary, and remaining corpus.
- [x] `./init.sh` and `git diff --check` pass; source review has separate evidence.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [model](../docs/design-docs/knowledge-model.md),
[quality](../docs/product-specs/knowledge-quality.md), [sources](../docs/references/book-sources.md),
[ruleset](../docs/design-docs/liuyao-ruleset-v1.md), [licensing](../LICENSING.md).

## Plan

The user approved both tracks. Follow [the staged plan](../docs/plans/feat-032.md) in this workspace.

## Evidence

- `./init.sh`: passes, including 263 tests.
- `validate:corpus --check-books --check` and `git diff --check`: pass.
- Source passages and rendered symbols were inspected; details are in the plan.
- [Coverage](../packages/knowledge/reports/coverage.json): 73 records, 119 claims, 43 citations.
- Chromium loads Càn and source metadata offline.

## Handoff

- State: done; pilot only. Blockers: none.
- Next: Truân, Mông, Nhu, Sư; BPCT chapter 5, sections 1–4, PDF 67–68; missing PBC/NTT pilot line comparisons.
