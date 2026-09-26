import { describe, expect, it } from 'vitest';
import { HEXAGRAM_IDS, TRIGRAM_IDS, identifyHexagram } from '../src/index';
import { HEXAGRAM_FIXTURES } from './hexagram-fixtures';

describe('canonical hexagram mapping', () => {
  it('matches every independently sourced lower/upper pair', () => {
    expect(HEXAGRAM_FIXTURES).toHaveLength(64);
    for (const { lower, upper, id } of HEXAGRAM_FIXTURES) {
      expect(identifyHexagram(lower, upper)).toBe(id);
    }
    expect(new Set(HEXAGRAM_FIXTURES.map(({ id }) => id))).toEqual(new Set(HEXAGRAM_IDS));
    expect(new Set(HEXAGRAM_FIXTURES.map(({ lower, upper }) => `${lower}/${upper}`)).size).toBe(
      TRIGRAM_IDS.length ** 2,
    );
  });
});
