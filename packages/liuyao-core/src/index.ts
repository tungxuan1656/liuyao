export * from './contracts';
export * from './positions';
export * from './validation';
export * from './polarity';
export * from './trigrams';
export * from './hexagrams';
export * from './calculation';
export * from './palaces';
export * from './na-jia';
export * from './board';
export * from './casting';

import type { HexagramReadingInput, LineValue } from './contracts';
import { isChangingLine } from './polarity';

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
