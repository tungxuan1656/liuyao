import { describe, expect, it } from 'vitest';
import { HEXAGRAM_IDS, PALACE_IDS, type FiveElement } from '../src/contracts';
import { identifyPalace } from '../src/palaces';
import { PALACE_FIXTURES } from './palace-fixtures';

describe('eight-palace classification and Shi/Ying positions', () => {
  it('matches independent fixtures for all 64 stable hexagram IDs exactly once', () => {
    expect(PALACE_FIXTURES).toHaveLength(64);
    expect(new Set(PALACE_FIXTURES.map(({ hexagramId }) => hexagramId))).toEqual(
      new Set(HEXAGRAM_IDS),
    );
    for (const fixture of PALACE_FIXTURES) {
      expect(identifyPalace(fixture.hexagramId)).toEqual({
        palaceId: fixture.palaceId,
        palaceElement: expect.any(String),
        shiPosition: fixture.shiPosition,
        yingPosition: fixture.yingPosition,
      });
    }
  });

  it('contains eight independently listed hexagrams for every palace', () => {
    for (const palaceId of PALACE_IDS) {
      expect(PALACE_FIXTURES.filter(fixture => fixture.palaceId === palaceId)).toHaveLength(8);
    }
  });

  it('assigns the correct five element to each palace', () => {
    const elements: Record<(typeof PALACE_IDS)[number], FiveElement> = {
      'palace-heaven': 'metal',
      'palace-lake': 'metal',
      'palace-fire': 'fire',
      'palace-thunder': 'wood',
      'palace-wind': 'wood',
      'palace-water': 'water',
      'palace-mountain': 'earth',
      'palace-earth': 'earth',
    };
    for (const fixture of PALACE_FIXTURES) {
      expect(identifyPalace(fixture.hexagramId).palaceElement).toBe(elements[fixture.palaceId]);
    }
  });

  it('places Ying three lines opposite Shi, including wraparound', () => {
    for (const fixture of PALACE_FIXTURES) {
      const { shiPosition, yingPosition } = identifyPalace(fixture.hexagramId);
      expect(yingPosition).toBe(((shiPosition + 2) % 6) + 1);
    }
  });
});
