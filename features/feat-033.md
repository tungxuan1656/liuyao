# feat-033 — Reviewed knowledge batch two

## Goal

Expand both approved content tracks and commit each reviewed group.

## Scope

- Add PBC/NTT line comparisons to Càn, Khôn, Tụng, and Lý.
- Add Truân, Mông, Nhu, and Sư with attributed overviews and six line positions.
- Add BPCT chapter 5, sections 1–4: Dụng thần, Thế–Ứng, Nguyên thần, Cừu thần, and Kỵ thần.

## Non-goals

Automated interpretation, calendar behavior, UI changes, and complete corpus certification.

## Acceptance

- [x] Pilot comparisons preserve author attribution, special passages, and exact edition locators.
- [x] Four additional quẻ have source-reviewed structure and six cited line summaries.
- [ ] Advanced records preserve source conditions and remain descriptive knowledge.
- [ ] Each content group has passage review, valid references, and a separate verified commit.
- [ ] Coverage and the next batch reflect the released corpus.
- [ ] `./init.sh`, fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Plan

Execute inline under the approved content sequence and the user's continuation request.

1. Read complete PBC/NTT pilot passages, add line comparisons, verify, and commit.
2. Read Truân–Mông–Nhu–Sư chapters, replace legacy IDs, verify, and commit.
3. Read BPCT PDF 67–68 and related definitions, preserve conditions, verify, and commit.
4. Reconcile source review and coverage, record the next batch, and commit the handoff.

## Handoff

- State: active.
- Evidence: Pilot comparisons and four new quẻ pass `./init.sh` with 263 tests and PDF fingerprint checks.
- Blockers: none.
- Next: Author BPCT chapter 5, sections 1–4.
