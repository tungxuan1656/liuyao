# Reading result

This document owns the V1 result content and presentation rules.

User-facing labels use the Vietnamese terms in `vietnamese-language.md`.

## Content order

1. Primary hexagram.
2. Changed hexagram when at least one line changes.
3. Six-line Liu Yao board.
4. Fact explanations and source links.

## Hexagram summary

Show:

- traditional display name;
- upper and lower trigram names;
- Eight Palace identity;
- palace element;
- changed hexagram identity when applicable.

Do not show a changed hexagram when no line changes.

Keep stable IDs in result data and reference links. Do not show them as interface labels.

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

## Intended book-reference contexts

Result → select primary/changed quẻ → overview → select hào → attributed explanation → canonical Library detail.

This flow is planned. Current fact inspectors do not render complete quẻ or hào commentary.

- Identify a quẻ context with its displayed stable ID.
- For a hào context, add its domain position, numbered 1–6.
- Keep primary and changed contexts distinct when opening explanations or Library links.
- Use the selected position directly; visual row reversal must not change its identity.
- If no line changes, offer no changed-quẻ context.
- Preserve moving/static labels and the current changed-board fact boundary.
- Load explanations through released knowledge APIs, using the [Library content contract](knowledge-browser.md#intended-book-backed-expansion).
- Preserve each fact rule's conditions, attribution, and supporting evidence when reusing that presentation.
- Identify project-convention explanations through their specification evidence.
- If the selected context has no reviewed commentary, show an unavailable state and retain the result.
- Reuse the compact drawer and wide inspector interaction pattern.
- Preserve the active reading when following Library links and returning to the result.
- Support keyboard dismissal and focus restoration to the selected control.

Classical commentary describes a source passage. It does not conclude anything about the user's question.
Reference content does not change calculated facts or activate advanced analysis.

## Error behavior

If calculation fails, show no partial board.

Keep the input draft available so the user can correct it.
