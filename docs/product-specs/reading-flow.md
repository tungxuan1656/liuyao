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

The app collects one final line value at a time: `6`, `7`, `8`, or `9`.

The flow starts with the first line and ends with the sixth line.

### Automatic casting

The user casts one line at a time, from the first (bottom) to the sixth (top). Each action generates one three-coin outcome and reveals its line value. The user proceeds to the next line until all six outcomes are present; the app then calculates the reading. Keep the six raw three-coin outcomes with the active in-memory automatic reading. Returning to an already cast line must not generate or replace its outcome without an explicit reset.

Each line must follow this distribution:

| Value | Probability |
| ----- | ----------: |
| 6     |         1/8 |
| 7     |         3/8 |
| 8     |         3/8 |
| 9     |         1/8 |

Use browser cryptographic randomness. Do not use `Math.random()` or time-based formulas.

### Direct input

The user enters all six final line values directly.

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
