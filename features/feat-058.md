# feat-058 — Complete BPCT casting supplements and book criticisms

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part II chapter 3, PDF 429–457; Part III, PDF 458–467.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Observed transformation headings I, II, IV and actual examples (429–435).
- [ ] All eighteen Tạp Sự cases (435–451).
- [ ] All eleven Tinh Sát sections (451–457).
- [ ] All fifteen criticisms and closing pages (458–467).
- [ ] Check missing numbering and shared-page continuations; do not invent unprinted transformation rows.
- [ ] Preserve criticised views and objections separately with named textual layers.
- [ ] Released claims pass the publication gate; inventory dispositions and coverage are current.
- [ ] Required verification passes; evidence and handoff are recorded.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md), [verification](../docs/development.md).

## Plan

1. Confirm dependencies and source boundaries.
2. Review each unit, record supported decisions, and commit each coherent checkpoint.
3. Verify all acceptance items and record the handoff.

## Verify

- `./init.sh`
- `pnpm --filter @liuyao/knowledge validate:corpus --check-books --check`
- Confirm all assigned units and document routes.

## Activation decisions

- Selection: previously authorized within the feat-045–083 sequence; feat-057 is merged and this is the next dependency-ready feature.
- Planning: use the existing acceptance and inline plan; this is one bounded knowledge-package cohort with no API, migration, or workspace change.
- Source: supplied BPCT PDF SHA-256 `713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a` (467 pages). Follow inventory locators and inspect PDF429–467 individually for shared-page boundaries and text layers; PDF467 is visually blank in the baseline inspection and must be recorded only as source evidence, not as an invented missing section.
- Transformation headings: preserve observed I, II, IV only. PDF432 has II ending and IV beginning with no III heading; do not invent a heading or transformation rows. Shared boundaries at430,432,435,451 are real.
- Existing citation: the translator note under criticism X is only that note, not coverage of the criticism itself. Preserve criticised claims, objections, replies, and translator notes as distinct attributed layers.
- Boundaries: author the specified BPCT summaries with claim-specific evidence. Keep author058/audit091 routing; source audit, independent verification, and certification remain separate open gates.

## Handoff

- State: active on `feat/058-bpct-casting-supplements-book-criticisms`.
- Evidence: Dependency feat-057 is merged; source hash and page boundaries match the canonical source reference.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect assigned passages/images and existing selected citations, then implement the accepted scope.
