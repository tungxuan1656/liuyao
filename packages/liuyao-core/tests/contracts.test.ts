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

describe('domain contracts', () => {
  it('exposes the single supported ruleset', () => {
    expect(RULE_SET_ID).toBe('liuyao-standard-v1');
  });

  it('exposes explicit unique IDs for each domain entity set', () => {
    expectUnique(TRIGRAM_IDS, 8);
    expectUnique(HEXAGRAM_IDS, 64);
    expectUnique(PALACE_IDS, 8);
  });
});
