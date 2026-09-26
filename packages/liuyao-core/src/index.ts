export * from './contracts.js';
export * from './positions.js';
export * from './validation.js';
export * from './polarity.js';
export * from './trigrams.js';
export * from './hexagrams.js';
export * from './calculation.js';
export * from './palaces.js';
export * from './na-jia.js';
export * from './board.js';
export * from './casting.js';

import type { HexagramReadingInput, LineValue } from './contracts.js';
import { isChangingLine } from './polarity.js';

export interface MinimalReadingSummary {
  hasChangingLines: boolean;
  changingLineCount: number;
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
