import { describe, expect, it } from 'vitest';
import { InvalidReadingInputError, RULE_SET_ID, calculateHexagram } from '../src/index';
import { HEXAGRAM_FIXTURES } from './hexagram-fixtures';

describe('public hexagram calculation', () => {
  it.each(HEXAGRAM_FIXTURES)('identifies static $id through the public API', fixture => {
    expect(calculateHexagram({ lines: fixture.lines })).toEqual({
      ruleset: RULE_SET_ID,
      primaryHexagramId: fixture.id,
      changedHexagramId: null,
      lowerTrigramId: fixture.lower,
      upperTrigramId: fixture.upper,
      changingPositions: [],
    });
  });

  it.each([
    { lines: [6, 7, 7, 7, 7, 7], changed: 'hexagram-01', positions: [1] },
    { lines: [9, 7, 7, 7, 7, 7], changed: 'hexagram-44', positions: [1] },
    { lines: [6, 7, 7, 7, 7, 9], changed: 'hexagram-43', positions: [1, 6] },
    { lines: [9, 8, 7, 6, 8, 9], changed: 'hexagram-62', positions: [1, 4, 6] },
  ] as const)('changes only moving lines $lines', ({ lines, changed, positions }) => {
    const input = { lines };
    expect(calculateHexagram(input)).toMatchObject({
      changedHexagramId: changed,
      changingPositions: positions,
    });
    expect(input.lines).toEqual(lines);
  });

  it('rejects invalid input at the public boundary', () => {
    expect(() => calculateHexagram({ lines: [7] })).toThrow(InvalidReadingInputError);
  });
});
