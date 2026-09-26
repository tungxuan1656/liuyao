import {
  RULE_SET_ID,
  type HexagramReadingInput,
  type LineValue,
  type SixLines,
} from '../src/index';
import type { LinePosition } from '../src/positions';

const DEFAULT_LINES: SixLines = [7, 8, 9, 6, 7, 8];

/** Return a fresh bottom-to-top tuple, optionally overriding one-based positions. */
export function createLines(overrides: Partial<Record<LinePosition, LineValue>> = {}): SixLines {
  return DEFAULT_LINES.map(
    (line, index) => overrides[(index + 1) as LinePosition] ?? line,
  ) as unknown as SixLines;
}

export function createReadingInput(
  overrides: Partial<Record<LinePosition, LineValue>> = {},
): HexagramReadingInput {
  return { lines: createLines(overrides), ruleset: RULE_SET_ID };
}
