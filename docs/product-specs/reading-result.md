# Reading result

This document owns the V1 result content and presentation rules.

## Content order

1. Primary hexagram.
2. Changed hexagram when at least one line changes.
3. Six-line Liu Yao board.
4. Fact explanations and source links.

## Hexagram summary

Show:

- stable hexagram ID and traditional display name;
- upper and lower trigram names;
- Eight Palace identity;
- palace element;
- changed hexagram identity when applicable.

Do not show a changed hexagram when no line changes.

## Board

Render the sixth line at the top and the first line at the bottom.

Each primary line can show:

| Field                 | V1              |
| --------------------- | --------------- |
| Position              | Required        |
| Yin or Yang           | Required        |
| Changing state        | Required        |
| Na Jia stem           | Required        |
| Na Jia branch         | Required        |
| Five Element          | Required        |
| Six Relative          | Required        |
| Shi or Ying           | When applicable |
| Six Spirit            | Not in V1       |
| Day or month strength | Not in V1       |

The domain result keeps positions in bottom-to-top order. Only the view reverses the visual order.

## Facts and explanations

Keep three concepts separate:

- **Fact:** a deterministic result from `@liuyao/core`.
- **Rule:** the structured reason that explains a fact.
- **Interpretation:** a human conclusion about the situation.

V1 renders facts and rules. V1 does not generate interpretations.

When a fact has an explanation, link it to a stable rule or knowledge entity ID.

## Error behavior

If calculation fails, show no partial board.

Keep the input draft available so the user can correct it.
