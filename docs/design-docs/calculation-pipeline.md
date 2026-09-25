# V1 calculation pipeline

This document owns the deterministic calculation order and calculation-data boundary in `@liuyao/core`.

## Flow

Validated six lines
→ primary polarities
→ lower and upper trigrams
→ primary hexagram
→ changed polarities
→ optional changed hexagram
→ Eight Palace
→ Shi and Ying
→ Na Jia
→ branch elements
→ Six Relatives
→ structured result

## Rules

- Reject invalid input before calculation.
- Return no partial result after a calculation error.
- Keep the pipeline deterministic for the same input and ruleset.
- Do not read browser APIs, storage, network resources, or React state.
- Do not load explanatory prose during calculation.
- Keep all calculation-required lookup tables inside `@liuyao/core`.
- Keep calendar-derived calculations outside V1.

## Calculation-owned data

Calculation-owned data includes any table that changes the numeric or categorical result.

Examples:

- trigram polarity patterns;
- primary hexagram mapping;
- Eight Palace mapping;
- Shi and Ying positions;
- Na Jia assignments;
- Earthly Branch to Five Element mapping;
- Six Relative relation rules.

Reference labels and explanations do not belong in these tables.

## Changed hexagram

Transform only changing lines:

- `6` becomes Yang;
- `9` becomes Yin;
- `7` remains Yang;
- `8` remains Yin.

If no line changes, return no changed hexagram.

## Verification

Use table-driven or golden fixtures.

Minimum fixture coverage is defined in `docs/product-specs/v1-mvp.md`.

Keep package tests under `packages/liuyao-core/tests` as required by `docs/development.md`.
