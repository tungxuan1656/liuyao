# feat-059 — Complete NHL introductory chapters and framing

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- NHL PDF 1–126, Part II introduction 127–130, and end matter 388–393.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Origins and contents (12–32).
- [ ] Thập Dực (33–44).
- [ ] Interpretive schools (45–58).
- [ ] Terminology and rules (59–76).
- [ ] Đạo Trời (77–97).
- [ ] Việc Người (98–108).
- [ ] Tu Thân (109–126).
- [ ] Front matter, Part II introduction, and retrospective.
- [ ] Separate historical/philosophical attribution from structural facts.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Reconcile existing selected introductory claims.
2. Review and commit each chapter or framing checkpoint.
3. Check diagrams, exclusions, and cross-record terminology.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Handoff

- State: todo.
- Evidence: Not executed.
- Dependencies: See [feature index](../feature_index.json).
- Next: Confirm dependencies, select this feature, then inspect its first unit.
