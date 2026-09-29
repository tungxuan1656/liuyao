# Reading flow

This document owns V1 reading creation behavior.

User-facing labels use Vietnamese. English terms below describe behavior, not approved interface copy. See `vietnamese-language.md` for canonical labels.

## Flow

Trang gieo quẻ
→ Lập quẻ mới
→ Chọn phương pháp
→ Nhập hoặc gieo sáu hào
→ Kiểm tra dữ liệu
→ Tính quẻ
→ Kết quả gieo quẻ

## Methods

### Manual casting

The user performs the physical casting outside the app.

For each line, the user flips three or four individual virtual coins to match the physical toss, then confirms the line. The app derives the numeric line value (`6`, `7`, `8`, or `9`) but presents the canonical line name as the primary result: **Lão âm (6)**, **Thiếu dương (7)**, **Thiếu âm (8)**, or **Lão dương (9)**. The number remains secondary metadata.

The flow starts with the first (bottom) line and ends with the sixth (top) line. Returning to a completed line preserves its coin faces and outcome unless the user explicitly resets the draft.

### Automatic casting

The user casts one line at a time, from the first (bottom) to the sixth (top). For each line, the app obtains one cryptographically random outcome before animation begins, then animates a turtle shell shake, tip, and coins falling into a dish before revealing that outcome and its line value. The outcome must not change during or after the animation. The user proceeds until all six outcomes are present; the app then calculates the reading. Keep the six raw outcomes with the active in-memory automatic reading. Returning to an already cast line must preserve its outcome unless the user explicitly resets the draft. Prevent repeat actions while an animation is in progress.

Each line uses either three or four coins, selected as part of the casting method. For three coins, heads contributes `1` and tails contributes `0`; map the number of heads `0 → 6`, `1 → 7`, `2 → 8`, `3 → 9` (probabilities `1:3:3:1`). Four-coin outcomes use individually identified Earth, Water, Fire, and Wind coins, with weights `8`, `4`, `2`, and `1` respectively; heads is `1` and tails is `0`. Map weighted totals `0 → 6`, `1–5 → 7`, `6–12 → 8`, `13–15 → 9` (probabilities `1:5:7:3`).

Three-coin lines therefore follow this distribution:

| Value | Probability |
| ----- | ----------: |
| 6     |         1/8 |
| 7     |         3/8 |
| 8     |         3/8 |
| 9     |         1/8 |

Four-coin lines follow this distribution:

| Value | Probability |
| ----- | ----------: |
| 6     |        1/16 |
| 7     |        5/16 |
| 8     |        7/16 |
| 9     |        3/16 |

Use browser cryptographic randomness for automatic outcomes. Do not use `Math.random()` or time-based formulas. Coin appearance and animation are specified in `ui-layout.md`; the coin mapping is a product-defined randomization model, not a traditional Liu Yao doctrinal claim.

### Direct input

The user selects all six line values simultaneously, with four named options per line: **Lão âm** — moving yin (`6`), **Thiếu dương** — static yang (`7`), **Thiếu âm** — static yin (`8`), or **Lão dương** — moving yang (`9`). The canonical name and yao symbol are primary; the number is secondary metadata.

Use the same bottom-to-top domain order as other methods.

## Draft state

- A draft exists only in browser memory.
- An optional question can exist in the draft.
- V1 does not save the question or reading.
- A refresh can erase the draft.
- The app must not imply that a draft is backed up.

## Validation

- Require exactly six lines.
- Accept only `6`, `7`, `8`, and `9`.
- Do not calculate from incomplete input.
- Preserve entered values when a validation error is shown.
- Normalize all three methods into the same `@liuyao/core` input.

## Navigation

A user can return to the current draft before calculation.

After calculation, starting a new reading replaces the current in-memory reading only after an explicit action.

Navigating between root destinations (Gieo quẻ, Thư viện, Cài đặt) preserves the active completed reading.

V1 has no reading history.
