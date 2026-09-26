import type { LineValue, Polarity, SixLines } from './contracts.js';

/** Old yin and old yang are the moving lines. */
export function isChangingLine(value: LineValue): boolean {
  return value === 6 || value === 9;
}

export function linePolarity(value: LineValue): Polarity {
  return value === 6 || value === 8 ? 'yin' : 'yang';
}

/** Flip old lines to their new, static polarity without changing line order. */
export function transformChangingLines(lines: SixLines): SixLines {
  return lines.map(value => (value === 6 ? 7 : value === 9 ? 8 : value)) as unknown as SixLines;
}
