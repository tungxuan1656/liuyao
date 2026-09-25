# V1 domain model

This document owns V1 domain contracts and line conventions for `@liuyao/core`.

## Line contract

`LineValue = 6 | 7 | 8 | 9`.

A six-line tuple is always stored from first line to sixth line. The first line is the bottom line.

| Value | Primary polarity | Changes | Changed polarity |
| ----- | ---------------- | ------- | ---------------- |
| 6     | Yin              | Yes     | Yang             |
| 7     | Yang             | No      | Yang             |
| 8     | Yin              | No      | Yin              |
| 9     | Yang             | Yes     | Yin              |

Views can reverse the visual order. Domain arrays must not reverse it.

## Stable IDs

Use stable IDs for domain references.

Required ID classes:

- trigram;
- hexagram;
- palace;
- rule;
- knowledge entity;
- ruleset.

Display names do not act as identifiers.

V1 uses one ruleset: `liuyao-standard-v1`.

## Reading input

The V1 calculation input contains:

- six `LineValue` values;
- a ruleset ID.

Question text belongs to the web draft, not the core calculation input.

The current scaffold accepts optional date and timezone fields. V1 calculation must not depend on them.

## Reading result

A V1 result contains:

- primary hexagram ID;
- optional changed hexagram ID;
- lower and upper trigram IDs;
- palace ID and palace element;
- Shi and Ying positions;
- six structured primary-line results.

Each line result contains:

- position `1..6`;
- input value;
- polarity;
- changing flag;
- Na Jia stem;
- Na Jia branch;
- Five Element;
- Six Relative;
- Shi or Ying marker when applicable.

The result contains IDs and structured facts. It does not contain explanatory prose.

## Ownership

`@liuyao/core` owns constants and tables required to calculate these fields.

`@liuyao/knowledge` can describe the same stable IDs. It must not become a runtime dependency of the calculation engine.
