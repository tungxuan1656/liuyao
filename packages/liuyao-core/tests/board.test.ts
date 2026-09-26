import { describe, expect, it } from 'vitest';
import type { FiveElement } from '../src/contracts';
import { InvalidReadingInputError, RULE_SET_ID, calculateReading, sixRelative } from '../src/index';

const ELEMENTS: readonly FiveElement[] = ['wood', 'fire', 'earth', 'metal', 'water'];

const RELATIVE_MATRIX: readonly (readonly string[])[] = [
  ['sibling', 'child', 'wealth', 'official-ghost', 'parent'],
  ['parent', 'sibling', 'child', 'wealth', 'official-ghost'],
  ['official-ghost', 'parent', 'sibling', 'child', 'wealth'],
  ['wealth', 'official-ghost', 'parent', 'sibling', 'child'],
  ['child', 'wealth', 'official-ghost', 'parent', 'sibling'],
];

describe('Six Relatives', () => {
  it('classifies every palace/line element pair using the five relations', () => {
    for (const [palaceIndex, palaceElement] of ELEMENTS.entries()) {
      for (const [lineIndex, lineElement] of ELEMENTS.entries()) {
        expect(sixRelative(palaceElement, lineElement)).toBe(
          RELATIVE_MATRIX[palaceIndex]![lineIndex],
        );
      }
    }
  });
});

describe('public board calculation', () => {
  it('returns a bottom-to-top pure-heaven board snapshot', () => {
    expect(calculateReading({ lines: [7, 7, 7, 7, 7, 7] })).toEqual({
      ruleset: RULE_SET_ID,
      lines: [
        {
          position: 1,
          inputValue: 7,
          polarity: 'yang',
          changing: false,
          naJiaStem: 'jia',
          naJiaBranch: 'zi',
          element: 'water',
          relative: 'child',
        },
        {
          position: 2,
          inputValue: 7,
          polarity: 'yang',
          changing: false,
          naJiaStem: 'jia',
          naJiaBranch: 'yin',
          element: 'wood',
          relative: 'wealth',
        },
        {
          position: 3,
          inputValue: 7,
          polarity: 'yang',
          changing: false,
          naJiaStem: 'jia',
          naJiaBranch: 'chen',
          element: 'earth',
          relative: 'parent',
          shiYing: 'ying',
        },
        {
          position: 4,
          inputValue: 7,
          polarity: 'yang',
          changing: false,
          naJiaStem: 'ren',
          naJiaBranch: 'wu',
          element: 'fire',
          relative: 'official-ghost',
        },
        {
          position: 5,
          inputValue: 7,
          polarity: 'yang',
          changing: false,
          naJiaStem: 'ren',
          naJiaBranch: 'shen',
          element: 'metal',
          relative: 'sibling',
        },
        {
          position: 6,
          inputValue: 7,
          polarity: 'yang',
          changing: false,
          naJiaStem: 'ren',
          naJiaBranch: 'xu',
          element: 'earth',
          relative: 'parent',
          shiYing: 'shi',
        },
      ],
      primaryHexagramId: 'hexagram-01',
      changedHexagramId: null,
      lowerTrigramId: 'trigram-heaven',
      upperTrigramId: 'trigram-heaven',
      palaceId: 'palace-heaven',
      palaceElement: 'metal',
      shiPosition: 6,
      yingPosition: 3,
    });
  });

  it('builds pure-earth facts and marks Shi/Ying in their positions', () => {
    const result = calculateReading({ lines: [8, 8, 8, 8, 8, 8] });
    expect(result).toMatchObject({
      primaryHexagramId: 'hexagram-02',
      palaceId: 'palace-earth',
      palaceElement: 'earth',
      shiPosition: 6,
      yingPosition: 3,
      changedHexagramId: null,
    });
    expect(result.lines).toEqual([
      expect.objectContaining({
        position: 1,
        naJiaStem: 'yi',
        naJiaBranch: 'wei',
        element: 'earth',
        relative: 'sibling',
      }),
      expect.objectContaining({
        position: 2,
        naJiaStem: 'yi',
        naJiaBranch: 'si',
        element: 'fire',
        relative: 'parent',
      }),
      expect.objectContaining({
        position: 3,
        naJiaStem: 'yi',
        naJiaBranch: 'mao',
        element: 'wood',
        relative: 'official-ghost',
        shiYing: 'ying',
      }),
      expect.objectContaining({
        position: 4,
        naJiaStem: 'gui',
        naJiaBranch: 'chou',
        element: 'earth',
        relative: 'sibling',
      }),
      expect.objectContaining({
        position: 5,
        naJiaStem: 'gui',
        naJiaBranch: 'hai',
        element: 'water',
        relative: 'wealth',
      }),
      expect.objectContaining({
        position: 6,
        naJiaStem: 'gui',
        naJiaBranch: 'you',
        element: 'metal',
        relative: 'child',
        shiYing: 'shi',
      }),
    ]);
  });

  it('uses inner and outer trigram assignments and keeps board facts primary-only when changing', () => {
    const input = { lines: [9, 8, 7, 9, 7, 8], datetime: '2026-09-26T10:00:00Z', timezone: 'UTC' };
    const original = structuredClone(input);
    const result = calculateReading(input);

    expect(result).toMatchObject({
      primaryHexagramId: 'hexagram-49',
      changedHexagramId: 'hexagram-39',
      lowerTrigramId: 'trigram-fire',
      upperTrigramId: 'trigram-lake',
    });
    expect(
      result.lines.map(({ naJiaStem, naJiaBranch, inputValue, changing }) => ({
        naJiaStem,
        naJiaBranch,
        inputValue,
        changing,
      })),
    ).toEqual([
      { naJiaStem: 'ji', naJiaBranch: 'mao', inputValue: 9, changing: true },
      { naJiaStem: 'ji', naJiaBranch: 'chou', inputValue: 8, changing: false },
      { naJiaStem: 'ji', naJiaBranch: 'hai', inputValue: 7, changing: false },
      { naJiaStem: 'ding', naJiaBranch: 'hai', inputValue: 9, changing: true },
      { naJiaStem: 'ding', naJiaBranch: 'you', inputValue: 7, changing: false },
      { naJiaStem: 'ding', naJiaBranch: 'wei', inputValue: 8, changing: false },
    ]);
    expect(result.lines.map(line => line.position)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(input).toEqual(original);
  });

  it('reports validation errors from the unchanged F02 boundary', () => {
    expect(() => calculateReading({ lines: [7] })).toThrow(InvalidReadingInputError);
    expect(() => calculateReading(null)).toThrow(InvalidReadingInputError);
    expect(() => calculateReading({ lines: [7, 7, 7, 7, 7, 7], ruleset: 'other' })).toThrow(
      'Unsupported ruleset',
    );
  });
});
