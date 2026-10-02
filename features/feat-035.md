# feat-035 — Reviewed knowledge batch four

## Goal

Expand the next selected classical and Liu Yao groups with reviewed source evidence.

## Scope

- Add Đồng Nhân, Đại Hữu, Khiêm, and Dự with three-book overviews and all six line positions.
- Add BPCT chapter 5, sections 8–10: Tứ sinh, Nguyệt phá, and Tuần không.
- Resolve supported source errors and preserve author differences or explicit exclusions.

## Non-goals

Automated interpretation, calendar calculations, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve stable IDs, reviewed structures, source spelling variants, and attributed line summaries.
- [x] Advanced records preserve source conditions and distinguish author text from translator notes.
- [x] Each released claim has passage review and an exact supplied-edition citation.
- [ ] Each content group has a separate verified commit.
- [ ] Coverage and the manifest identify remaining gaps and the next exact batch.
- [ ] `./init.sh`, PDF fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Plan

Continue the approved JSON design and batch sequence with an inline plan.

1. Read complete quẻ passages and footnotes; inspect diagrams and discrepancy pages.
2. Author four quẻ, remove duplicate legacy records, regenerate coverage, verify, and commit.
3. Read BPCT sections 8–10 with related evidence; author conditional advanced records, verify, and commit.
4. Reconcile source documentation, record the next batch, verify, and commit the handoff.

## Handoff

- State: active.
- Evidence: Both content groups passed `./init.sh` (263 tests), PDF fingerprints, generated-output freshness, and diff checks. Four-quẻ commit: `be42a75`.
- Blockers: none.
- Next: Commit the advanced group, reconcile source locations and documentation, then record the handoff.
