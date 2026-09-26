import { describe, expect, it } from 'vitest';
import {
  HEXAGRAM_IDS,
  PALACE_IDS,
  RULE_SET_ID,
  TRIGRAM_IDS,
  type HexagramReadingInput,
  type ResultLinePosition,
  type LineValue,
  type PrimaryLineResult,
  type ReadingResult,
  type SixPrimaryLineResults,
  type SixLines,
  type HeavenlyStem,
  type EarthlyBranch,
  type FiveElement,
  type SixRelative,
} from '../src';

const lines: SixLines = [6, 7, 8, 9, 6, 7];
const validValue: LineValue = 9;
const input: HexagramReadingInput = { lines, ruleset: RULE_SET_ID };
function primaryLine(position: ResultLinePosition): PrimaryLineResult {
  return {
    position,
    inputValue: position === 1 ? 6 : 7,
    polarity: position === 1 ? 'yin' : 'yang',
    changing: position === 1,
    naJiaStem: 'jia',
    naJiaBranch: 'zi',
    element: 'wood',
    relative: 'sibling',
    ...(position === 1 ? { shiYing: 'shi' as const } : {}),
  };
}
const primaryLines: SixPrimaryLineResults = [
  primaryLine(1),
  primaryLine(2),
  primaryLine(3),
  primaryLine(4),
  primaryLine(5),
  primaryLine(6),
];
const result: ReadingResult = {
  ruleset: RULE_SET_ID,
  lines: primaryLines,
  primaryHexagramId: 'hexagram-01',
  changedHexagramId: null,
  lowerTrigramId: 'trigram-heaven',
  upperTrigramId: 'trigram-earth',
  palaceId: 'palace-heaven',
  palaceElement: 'metal',
  shiPosition: 1,
  yingPosition: 4,
};
// @ts-expect-error A six-line tuple must contain exactly six values.
const tooFewLines: SixLines = [6, 7, 8, 9, 6];
// @ts-expect-error Line values are restricted to 6, 7, 8, and 9.
const invalidLine: LineValue = 5;
// @ts-expect-error Result positions are restricted to 1 through 6.
const invalidPosition: ResultLinePosition = 7;
// @ts-expect-error Stems use the finite heavenly-stem vocabulary.
const invalidStem: HeavenlyStem = 'jiazi';
// @ts-expect-error Branches use the finite earthly-branch vocabulary.
const invalidBranch: EarthlyBranch = 'ziwei';
// @ts-expect-error Elements are restricted to the five elements.
const invalidElement: FiveElement = 'air';
// @ts-expect-error Six Relative uses the five traditional relationship categories.
const invalidRelative: SixRelative = 'friend';
// @ts-expect-error Primary-line results require exactly six entries.
const tooFewPrimaryLines: SixPrimaryLineResults = [primaryLine(1), primaryLine(2)];
// @ts-expect-error Structured lines cannot use an unsupported polarity.
const invalidPolarity: PrimaryLineResult = { ...primaryLine(1), polarity: 'neutral' };
void [
  validValue,
  input,
  result,
  tooFewLines,
  invalidLine,
  invalidPosition,
  invalidStem,
  invalidBranch,
  invalidElement,
  invalidRelative,
  tooFewPrimaryLines,
  invalidPolarity,
];

function expectUnique(values: readonly string[], length: number): void {
  expect(values).toHaveLength(length);
  expect(new Set(values).size).toBe(length);
}

function expectExactMembers(actual: readonly string[], expected: readonly string[]): void {
  expectUnique(actual, expected.length);
  expect([...actual].sort()).toEqual([...expected].sort());
}

const EXPECTED_TRIGRAM_IDS = [
  'trigram-heaven',
  'trigram-lake',
  'trigram-fire',
  'trigram-thunder',
  'trigram-wind',
  'trigram-water',
  'trigram-mountain',
  'trigram-earth',
];

const EXPECTED_HEXAGRAM_IDS = [
  'hexagram-01',
  'hexagram-02',
  'hexagram-03',
  'hexagram-04',
  'hexagram-05',
  'hexagram-06',
  'hexagram-07',
  'hexagram-08',
  'hexagram-09',
  'hexagram-10',
  'hexagram-11',
  'hexagram-12',
  'hexagram-13',
  'hexagram-14',
  'hexagram-15',
  'hexagram-16',
  'hexagram-17',
  'hexagram-18',
  'hexagram-19',
  'hexagram-20',
  'hexagram-21',
  'hexagram-22',
  'hexagram-23',
  'hexagram-24',
  'hexagram-25',
  'hexagram-26',
  'hexagram-27',
  'hexagram-28',
  'hexagram-29',
  'hexagram-30',
  'hexagram-31',
  'hexagram-32',
  'hexagram-33',
  'hexagram-34',
  'hexagram-35',
  'hexagram-36',
  'hexagram-37',
  'hexagram-38',
  'hexagram-39',
  'hexagram-40',
  'hexagram-41',
  'hexagram-42',
  'hexagram-43',
  'hexagram-44',
  'hexagram-45',
  'hexagram-46',
  'hexagram-47',
  'hexagram-48',
  'hexagram-49',
  'hexagram-50',
  'hexagram-51',
  'hexagram-52',
  'hexagram-53',
  'hexagram-54',
  'hexagram-55',
  'hexagram-56',
  'hexagram-57',
  'hexagram-58',
  'hexagram-59',
  'hexagram-60',
  'hexagram-61',
  'hexagram-62',
  'hexagram-63',
  'hexagram-64',
];

const EXPECTED_PALACE_IDS = [
  'palace-heaven',
  'palace-lake',
  'palace-fire',
  'palace-thunder',
  'palace-wind',
  'palace-water',
  'palace-mountain',
  'palace-earth',
];

describe('domain contracts', () => {
  it('exposes the single supported ruleset', () => {
    expect(RULE_SET_ID).toBe('liuyao-standard-v1');
  });

  it('exposes the exact unique stable ID inventories', () => {
    expectExactMembers(TRIGRAM_IDS, EXPECTED_TRIGRAM_IDS);
    expectExactMembers(HEXAGRAM_IDS, EXPECTED_HEXAGRAM_IDS);
    expectExactMembers(PALACE_IDS, EXPECTED_PALACE_IDS);
  });
});
