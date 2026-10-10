import { describe, expect, it } from 'vitest';
import { calculateHexagram, InvalidReadingInputError, RULE_SET_ID } from '../src/index';
import { HEXAGRAM_FIXTURES } from './hexagram-fixtures';

const MOVING_LINE_GOLDENS = [
  {
    primary: 'hexagram-01',
    base: [7, 7, 7, 7, 7, 7],
    moving: 9,
    changedIds: [
      'hexagram-44',
      'hexagram-13',
      'hexagram-10',
      'hexagram-09',
      'hexagram-14',
      'hexagram-43',
    ],
  },
  {
    primary: 'hexagram-02',
    base: [8, 8, 8, 8, 8, 8],
    moving: 6,
    changedIds: [
      'hexagram-24',
      'hexagram-07',
      'hexagram-15',
      'hexagram-16',
      'hexagram-08',
      'hexagram-23',
    ],
  },
] as const;

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

  it.each(MOVING_LINE_GOLDENS)(
    'matches all six changing positions for $primary',
    ({ primary, base, moving, changedIds }) => {
      for (const [index, changedHexagramId] of changedIds.entries()) {
        const lines = [...base] as number[];
        lines[index] = moving;
        expect(calculateHexagram({ lines })).toEqual({
          ruleset: RULE_SET_ID,
          primaryHexagramId: primary,
          changedHexagramId,
          lowerTrigramId: expect.any(String),
          upperTrigramId: expect.any(String),
          changingPositions: [index + 1],
        });
      }
    },
  );

  it.each([
    { primary: 'hexagram-01', line: 9, changed: 'hexagram-02' },
    { primary: 'hexagram-02', line: 6, changed: 'hexagram-01' },
  ] as const)('changes all six lines of $primary to $changed', ({ primary, line, changed }) => {
    const lines = Array.from({ length: 6 }, () => line);
    expect(calculateHexagram({ lines })).toMatchObject({
      primaryHexagramId: primary,
      changedHexagramId: changed,
      changingPositions: [1, 2, 3, 4, 5, 6],
    });
  });

  it('rejects invalid input at the public boundary', () => {
    expect(() => calculateHexagram({ lines: [7] })).toThrow(InvalidReadingInputError);
  });
});
