import { describe, expect, it } from 'vitest';
import { lineAtPosition, lineIndexToPosition, linePositionToIndex } from '../src/positions';
import { InvalidReadingInputError } from '../src/validation';

describe('line positions', () => {
  it('maps all one-based bottom-to-top positions to tuple indices', () => {
    expect([1, 2, 3, 4, 5, 6].map(linePositionToIndex)).toEqual([0, 1, 2, 3, 4, 5]);
    expect([0, 1, 2, 3, 4, 5].map(lineIndexToPosition)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('reads lines by domain position without reversing their order', () => {
    const lines = [6, 7, 8, 9, 6, 7] as const;
    expect([1, 2, 3, 4, 5, 6].map(position => lineAtPosition(lines, position))).toEqual([
      6, 7, 8, 9, 6, 7,
    ]);
  });

  it.each([0, 7, 1.5, Number.NaN])('rejects invalid position %s', position => {
    expect(() => linePositionToIndex(position)).toThrow(InvalidReadingInputError);
  });

  it.each([-1, 6, 2.5])('rejects invalid tuple index %s', index => {
    expect(() => lineIndexToPosition(index)).toThrow(InvalidReadingInputError);
  });
});
