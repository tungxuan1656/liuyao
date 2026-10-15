# task-check-knowledge-presentation-across-package-and-web-flows - Check knowledge presentation across package and web flows

- Status: done
- Owner: Coding agent (selected by repository maintainer)
- Required to start: [task-integrate-reviewed-reference-records-into-library-details](task-integrate-reviewed-reference-records-into-library-details.md), [task-connect-reading-results-to-contextual-que-and-hao-knowledge](task-connect-reading-results-to-contextual-que-and-hao-knowledge.md), [task-add-topic-article-and-learning-browsing-with-local-search](task-add-topic-article-and-learning-browsing-with-local-search.md)
- Required to integrate/release: no additional gate recorded; see acceptance

## Goal

Show each explanation in the correct quẻ, position, or article context with its source references.

## Scope

Package adapters, record/line links, table presentation, and direct web checks.

## Acceptance

- [x] Satisfy the [runtime fidelity contract](../docs/product-specs/knowledge-quality.md#runtime-fidelity).
- [x] Text, meaningful conditions, attribution, tables, diagrams, and references survive presentation.
- [x] Primary/changed quẻ and positions 1–6 resolve against explicit expected contexts.
- [x] Missing content and project conventions remain clear to the reader.
- [x] Focused package cases reject swapped contexts, dropped conditions, and wrong sources.
- [x] Compact/wide, keyboard, and offline checks cover the changed web flows.
- [x] Relevant checks and ./init.sh pass.

## Relevant docs

[Library](../docs/product-specs/knowledge-browser.md), [result](../docs/product-specs/reading-result.md),
[model](../docs/design-docs/knowledge-model.md), [verification](../docs/development.md).

## Plan

1. Compare package loading and web presentation with canonical record fields and explicit primary/changed position contexts.
2. Add focused fidelity regression cases and repair only confirmed presentation defects; do not change authored interpretations.
3. Check wide/compact, keyboard, and offline flows directly, run `./init.sh`, and publish incremental commits and a PR.

## Handoff

- Next: Merge the presentation-fidelity PR after repository checks and maintainer review.
- Evidence: Baseline `./init.sh` passed on `main` (181 core and 130 knowledge tests). Final `./init.sh` passed with 181 core and 141 knowledge tests; no authored interpretations or dependencies changed.
- Package coverage: `presentation-fidelity.test.ts` compares eight complete authored records with loaded assets: hexagrams 01/44, advancing/retreating spirits, Nạp Giáp, PBC image plates, result-field conventions, moving lines, and worked readings. Explicit primary Càn / changed Cấu fixtures verify positions 1–6, labels, polarities, paths, and named commentary; focused checks retain conditions and distinguish book pages from project documents.
- Review: Independent static review inspected the runtime fidelity, Library, and result contracts; shared entries/content/table renderers; Library detail; result board/view/facts/contextual inspector; schema, fact mapping, release projection, and selected records. Two confirmed findings were repaired: result facts now load canonical rules instead of pairing a catalog summary with projected references; figures now retain orientation and label citations. Follow-up review found no concrete defects in those repairs at `d3f918f` (tests at `0893c66`).
- Direct web evidence: Built preview in isolated Chrome. Wide result flow used six direct inputs (bottom line 9, others 7), producing primary Càn and changed Cấu. Expanded changed-quẻ calculation rules show both transformation entries, Vương Hồng Tự / Vĩnh Cao attribution, the condition, and BPCT PDF 77 / printed page 63 beside the correct entry. At a 500px compact window, changed line 1 is Sơ lục / Âm while primary line 1 is Sơ cửu / Dương; Tab + Return switches to changed line 2. Changed line 6 remains Thượng cửu. Compact text, controls, and figure citations fit without visible clipping.
- Offline evidence: Stopped the preview origin (`curl` exit 7) after precaching. Changed-line commentary remained available; direct reload of PBC plates displayed distinct orientation and label-01 PDF 11 sections. Nạp Giáp retained accessible table headers/cells and normalization notes. Result-field convention prose stayed explicitly software-specific; an unknown article showed the named missing-item state. This checks a warm installed service worker, not a cold offline first visit.
- Limits: Bounded runtime presentation audit, not a fresh book-prose audit, exhaustive record-by-record GUI review, physical-device test, or screen-reader certification. UI verification used direct computer-use; no app test suite was added. No remaining confirmed findings or blockers.
