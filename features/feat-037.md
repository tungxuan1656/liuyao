# feat-037 — Reviewed knowledge batch six

## Goal

Expand the next selected classical and Liu Yao groups with reviewed evidence.

## Scope

- Phệ Hạp, Bí, Bác, Phục: three-book overviews and all six positions.
- BPCT chapter 5, sections 13–14: Vượng tướng hưu tù and Trong hợp có khắc.
- Author differences, supported source errors, exclusions, and citation review.
- Source documentation and the next exact batch.
- Reconcile verification for the generated import inventory.

## Non-goals

Automated interpretation, calendars, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve IDs, display names, reviewed structures, aliases, and attributed summaries.
- [x] Advanced records preserve source conditions and textual layers.
- [x] Each released claim has passage review and an exact edition citation.
- [ ] Each content group has a separate verified commit.
- [ ] Coverage and the manifest identify remaining gaps and the next batch.
- [ ] `./init.sh`, fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Plan

1. Read complete classical passages and footnotes; inspect diagrams and source errors.
2. Author four quẻ, migrate legacy records, verify, and commit.
3. Read BPCT and related evidence; author conditional records, verify, and commit.
4. Reconcile source documentation, verify, and commit the handoff.

## Evidence

- Classical passages and footnotes reviewed; nine source-error resolutions inspected visually.
- Five BPCT records preserve seasonal strength, compound conditions, Thân–Tị exceptions, and Vĩnh Cao's separate Tam hình objection.
- Coverage: 135 records, 771 claims, 614 locators; 24/64 quẻ and 144/384 positions per commentary book.
- `./init.sh`: 263 tests passed; fingerprint/freshness and diff checks passed.
- Generated-import length exception verified (`159797e`); authored-file limits remain enforced.

## Handoff

- State: active.
- Blockers: none.
- Next: Commit BPCT, then reconcile source documentation and complete the handoff.
