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

## Activation decisions

- Selection: already user-authorized in the feat-045–083 sequence; feat-058 is done and this is the next dependency-ready feature.
- Source: use `source-book-nhl`, `edition-nhl-supplied`, PDF SHA-256 `9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e` (393 pages). Author 059 routes to audit 092.
- Scope: author the foreword and chapters 1–7 on PDF 10–126, Part II framing 127–130, and the retrospective 389–392. PDF 388 is still Hệ Từ Hạ chapter 12; PDF 393 is blank apart from a footer/web address. Do not classify the contents pages 4–9 as body section starts; the body starts at PDF 12.
- Existing coverage: chapter 4 technical citations are selected only; feature 084 is a limited cross-reference for matching technical fixtures, not a co-owner of the chapter. Preserve and reconcile matching claims without duplicating or implying full-chapter coverage.
- Evidence: the source-derived child anchors in the inventory are navigation candidates, not exhaustive maps; visually verify passages and diagrams before transcribing claims. Separate historical attribution from structural facts and NHL's own evaluations. Edition year and rights status remain unconfirmed/research-only.
- Planning: the current inline plan is sufficient for this bounded knowledge-package cohort; no API, migration, workspace, UI, or calendar changes are planned.

## Handoff

- State: active on `feat/059-nhl-intro-chapters-framing`.
- Evidence: source fingerprint and 393-page count match `packages/knowledge/data/sources.json`; `feat-058` is merged and main is clean at `931a035`.
- Dependencies: See [feature index](../feature_index.json).
- Next: Reconcile selected intro/chapter-4 claims, inspect the assigned source pages and diagrams, and implement the accepted scope.
