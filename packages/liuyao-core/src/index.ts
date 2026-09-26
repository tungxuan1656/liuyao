export * from './contracts';
export * from './positions';
export * from './validation';

import type { HexagramReadingInput, LineValue } from './contracts';

export interface MinimalReadingSummary {
  hasChangingLines: boolean;
  changingLineCount: number;
}

/** Returns true for old/moving lines (6 and 9). */
export function isChangingLine(value: LineValue): boolean {
  return value === 6 || value === 9;
}

/** Counts changing lines in their stored bottom-to-top order. */
export function countChangingLines(lines: readonly LineValue[]): number {
  return lines.filter(isChangingLine).length;
}

/** Preserved compatibility summary; this does not calculate a hexagram. */
export function inspectReading(input: HexagramReadingInput): MinimalReadingSummary {
  const changingCount = countChangingLines(input.lines);
  return {
    hasChangingLines: changingCount > 0,
    changingLineCount: changingCount,
  };
}
