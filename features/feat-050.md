# feat-050 — Complete BPCT chapter 6 sentences 57–69

## Goal

Complete this source group with reviewed records and explicit exclusions.

## Scope

**Intended work:**

- BPCT Part I, Hoàng Kim Sách / Thiên Kim Phú, sentences 57–69; PDF 94–100.

## Non-goals

New interpretation, calendar, or UI behavior.

## Acceptance

- [ ] Sentences 57–64: full clauses, explanation, and notes.
- [ ] Sentences 65–69: full clauses, explanation, and notes.
- [ ] Previously cited fragments do not establish full numbered-passage coverage.
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

## Handoff

- State: active on `feat/050-bpct-ch06-57-69`, based on `main` at `70d312abcb99b442621f98ca49200c68cbe2146c`.
- Evidence: feat-049 is merged and marked done; this feature is within the user's selected feat-045–083 batch. No implementation verification has run.
- Dependencies: See [feature index](../feature_index.json).
- Next: Inspect BPCT pages 94–100 and identify complete verse, commentary, note, and exclusion boundaries for sentences 57–69.
