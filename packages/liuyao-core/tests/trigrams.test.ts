import { describe, expect, it } from 'vitest';
import { identifyTrigram, identifyTrigrams } from '../src/index';

describe('trigrams', () => {
  it.each([
    [[7, 7, 7], 'trigram-heaven'],
    [[7, 7, 8], 'trigram-lake'],
    [[7, 8, 7], 'trigram-fire'],
    [[7, 8, 8], 'trigram-thunder'],
    [[8, 7, 7], 'trigram-wind'],
    [[8, 7, 8], 'trigram-water'],
    [[8, 8, 7], 'trigram-mountain'],
    [[8, 8, 8], 'trigram-earth'],
  ] as const)('identifies %s', (lines, expected) => {
    expect(identifyTrigram(lines)).toBe(expected);
  });

  it('does not swap lower and upper and ignores moving status for polarity', () => {
    expect(identifyTrigrams([9, 8, 6, 8, 8, 9])).toEqual({
      lowerTrigramId: 'trigram-thunder',
      upperTrigramId: 'trigram-mountain',
    });
  });
});
