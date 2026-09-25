/**
 * LineValue represents the 4 possible coin-toss / yarrow-stalk line outcomes in Liu Yao:
 * 6: Old Yin (changing to Yang, - - x)
 * 7: Young Yang (stable Yang, ———)
 * 8: Young Yin (stable Yin, - -)
 * 9: Old Yang (changing to Yin, ——— o)
 */
export type LineValue = 6 | 7 | 8 | 9;

export interface HexagramReadingInput {
  lines: readonly [LineValue, LineValue, LineValue, LineValue, LineValue, LineValue];
  datetime?: Date | string;
  timezone?: string;
  ruleset?: string;
}

export interface MinimalReadingSummary {
  hasChangingLines: boolean;
  changingLineCount: number;
}

/**
 * Returns true if the line is an old/moving line (6 or 9).
 */
export function isChangingLine(value: LineValue): boolean {
  return value === 6 || value === 9;
}

/**
 * Counts how many changing lines exist in a sequence of lines.
 */
export function countChangingLines(lines: readonly LineValue[]): number {
  return lines.filter(isChangingLine).length;
}

/**
 * Deterministic domain function to inspect a reading input.
 */
export function inspectReading(input: HexagramReadingInput): MinimalReadingSummary {
  const changingCount = countChangingLines(input.lines);
  return {
    hasChangingLines: changingCount > 0,
    changingLineCount: changingCount,
  };
}
