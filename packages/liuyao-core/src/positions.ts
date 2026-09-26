import type { LineValue, SixLines } from './contracts';
import { InvalidReadingInputError } from './validation';

export type LinePosition = 1 | 2 | 3 | 4 | 5 | 6;

/** Convert the domain position (first/bottom line is 1) to its tuple index. */
export function linePositionToIndex(position: number): number {
  if (!Number.isInteger(position) || position < 1 || position > 6) {
    throw new InvalidReadingInputError('Line position must be an integer from 1 through 6.');
  }
  return position - 1;
}

/** Convert a tuple index into its one-based bottom-to-top domain position. */
export function lineIndexToPosition(index: number): LinePosition {
  if (!Number.isInteger(index) || index < 0 || index > 5) {
    throw new InvalidReadingInputError('Line index must be an integer from 0 through 5.');
  }
  return (index + 1) as LinePosition;
}

/** Read one line by its one-based bottom-to-top position; the tuple is never reversed. */
export function lineAtPosition(lines: SixLines, position: number): LineValue {
  return lines[linePositionToIndex(position)] as LineValue;
}
