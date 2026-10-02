# feat-036 — Reviewed knowledge batch five

## Goal

Expand the next selected classical and Liu Yao groups with reviewed source evidence.

## Scope

- Add Tùy, Cổ, Lâm, and Quán with three-book overviews and all six line positions.
- Add BPCT chapter 5, sections 11–12: Phản ngâm and Phục ngâm.
- Preserve author differences, resolve supported source errors, and exclude unclear claims.
- Review source documentation and affected citation metadata.

## Non-goals

Automated interpretation, calendar calculations, UI changes, and complete corpus certification.

## Acceptance

- [x] Four quẻ preserve stable IDs, reviewed structures, aliases, and attributed line summaries.
- [x] Advanced records preserve source conditions and distinguish textual layers.
- [x] Each released claim has passage review and an exact supplied-edition citation.
- [ ] Each content group has a separate verified commit.
- [x] Coverage and the manifest identify remaining gaps and the next exact batch.
- [x] `./init.sh`, PDF fingerprint/freshness checks, and `git diff --check` pass.

## Relevant docs

[Content](../docs/product-specs/knowledge-content.md), [quality](../docs/product-specs/knowledge-quality.md),
[model](../docs/design-docs/knowledge-model.md), [sources](../docs/references/book-sources.md),
[licensing](../LICENSING.md).

## Plan

Continue the approved JSON design and batch sequence with an inline plan.

1. Read complete quẻ passages and footnotes; inspect diagrams and discrepancy pages.
2. Author four quẻ, remove duplicate legacy records, regenerate coverage, verify, and commit.
3. Read BPCT sections 11–12 and related evidence; author conditional records, verify, and commit.
4. Reconcile source documentation, record the next batch, verify, and commit the handoff.

## Verification

- Classical group: 121 records, 644 claims, 503 citations; 20/64 quẻ and 120/384 positions per commentary book.
- Read complete passages and footnotes; visually checked 13 source errors and verified NHL footer locators.
- Initial full verification caught a display-name change for Quan; restored the existing name and retained Quán as an alias.
- After that correction, `./init.sh` passed 263 tests; PDF fingerprint/freshness and diff checks passed.

- Classical group committed as `ccf713b`.
- Advanced group: three terms and two articles; 126 records, 659 claims, 510 citations in the corpus.
- Checked 14 Phục ngâm pairs against Nạp Giáp. Withheld ambiguous parentheticals and the mixed Phản/Phục name in question 6.
- Final advanced `./init.sh` passed 263 tests; fingerprint/freshness and diff checks passed before commit.

## Handoff

- State: active.
- Blockers: none.
- Next: Commit the advanced group, reconcile canonical source documentation, and complete the handoff.
