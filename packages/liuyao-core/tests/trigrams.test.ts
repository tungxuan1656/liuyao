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

  it.each([
    [[9, 9, 9], 'trigram-heaven'],
    [[9, 9, 6], 'trigram-lake'],
    [[9, 6, 9], 'trigram-fire'],
    [[9, 6, 6], 'trigram-thunder'],
    [[6, 9, 9], 'trigram-wind'],
    [[6, 9, 6], 'trigram-water'],
    [[6, 6, 9], 'trigram-mountain'],
    [[6, 6, 6], 'trigram-earth'],
  ] as const)('identifies changing values %s by polarity', (lines, expected) => {
    expect(identifyTrigram(lines)).toBe(expected);
  });
});
