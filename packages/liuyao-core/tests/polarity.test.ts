import { describe, expect, it } from 'vitest';
import { isChangingLine, linePolarity, transformChangingLines } from '../src/index';

describe('line polarity and transformation', () => {
  it.each([
    [6, 'yin', true],
    [7, 'yang', false],
    [8, 'yin', false],
    [9, 'yang', true],
  ] as const)('classifies %i', (value, polarity, changing) => {
    expect(linePolarity(value)).toBe(polarity);
    expect(isChangingLine(value)).toBe(changing);
  });

  it('transforms only moving lines without mutating the input', () => {
    const lines = [6, 7, 8, 9, 6, 9] as const;
    expect(transformChangingLines(lines)).toEqual([7, 7, 8, 8, 7, 8]);
    expect(lines).toEqual([6, 7, 8, 9, 6, 9]);
  });
});
