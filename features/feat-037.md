# feat-037 — Reviewed knowledge batch six

## Goal

Expand the next selected classical and Liu Yao groups with reviewed evidence.

## Scope

- Phệ Hạp, Bí, Bác, Phục: three-book overviews and all six positions.
- BPCT chapter 5, sections 13–14: Vượng tướng hưu tù and Trong hợp có khắc.
- Author differences, supported source errors, exclusions, and citation review.
- Source documentation and the next exact batch.

## Non-goals

Automated interpretation, calendars, UI changes, and complete corpus certification.

## Acceptance

- [ ] Four quẻ preserve IDs, display names, reviewed structures, aliases, and attributed summaries.
- [ ] Advanced records preserve source conditions and textual layers.
- [ ] Each released claim has passage review and an exact edition citation.
- [ ] Each content group has a separate verified commit.
- [ ] Coverage and the manifest identify remaining gaps and the next batch.
- [ ] `./init.sh`, fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Plan

Continue the approved JSON design and batch sequence with an inline plan.

1. Read complete classical passages and footnotes; inspect diagrams and source errors.
2. Author four quẻ, migrate legacy records, verify, and commit.
3. Read BPCT and related evidence; author conditional records, verify, and commit.
4. Reconcile source documentation, verify, and commit the handoff.

## Evidence

- Read all four classical passages and footnotes; inspected headings, structures, and nine source-error resolutions. Preserved selected author differences and excluded unclear response/sequence wording.
- Classical group: 130 records, 754 claims, 606 locators; 24/64 quẻ and 144/384 positions per commentary book.
- `./init.sh`: 263 tests passed; fingerprint/freshness checks and `git diff --check` passed.

## Handoff

- State: active.
- Blockers: none.
- Next: Commit the classical group, then review BPCT sections 13–14 and related passages.
