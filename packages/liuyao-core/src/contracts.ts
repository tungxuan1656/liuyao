/** 6 Old Yin (changing), 7 Young Yang, 8 Young Yin, 9 Old Yang (changing). */
export type LineValue = 6 | 7 | 8 | 9;

/** Lines are always stored first-to-sixth, from the bottom of the hexagram up. */
export type SixLines = readonly [LineValue, LineValue, LineValue, LineValue, LineValue, LineValue];

export const RULE_SET_ID = 'liuyao-standard-v1' as const;
export type RuleSetId = typeof RULE_SET_ID;

export const TRIGRAM_IDS = [
  'trigram-heaven',
  'trigram-lake',
  'trigram-fire',
  'trigram-thunder',
  'trigram-wind',
  'trigram-water',
  'trigram-mountain',
  'trigram-earth',
] as const;
export type TrigramId = (typeof TRIGRAM_IDS)[number];

export const HEXAGRAM_IDS = [
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
] as const;
export type HexagramId = (typeof HEXAGRAM_IDS)[number];

export const PALACE_IDS = [
  'palace-heaven',
  'palace-lake',
  'palace-fire',
  'palace-thunder',
  'palace-wind',
  'palace-water',
  'palace-mountain',
  'palace-earth',
] as const;
export type PalaceId = (typeof PALACE_IDS)[number];

export type HeavenlyStem =
  'jia' | 'yi' | 'bing' | 'ding' | 'wu' | 'ji' | 'geng' | 'xin' | 'ren' | 'gui';

export type EarthlyBranch =
  'zi' | 'chou' | 'yin' | 'mao' | 'chen' | 'si' | 'wu' | 'wei' | 'shen' | 'you' | 'xu' | 'hai';

export type FiveElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';
export type SixRelative = 'sibling' | 'child' | 'wealth' | 'official-ghost' | 'parent';
export type Polarity = 'yin' | 'yang';
export type ResultLinePosition = 1 | 2 | 3 | 4 | 5 | 6;
export type ShiYingMarker = 'shi' | 'ying';

export interface PrimaryLineResult {
  position: ResultLinePosition;
  inputValue: LineValue;
  polarity: Polarity;
  changing: boolean;
  naJiaStem: HeavenlyStem;
  naJiaBranch: EarthlyBranch;
  element: FiveElement;
  relative: SixRelative;
  shiYing?: ShiYingMarker;
}

export type SixPrimaryLineResults = readonly [
  PrimaryLineResult,
  PrimaryLineResult,
  PrimaryLineResult,
  PrimaryLineResult,
  PrimaryLineResult,
  PrimaryLineResult,
];

export interface HexagramReadingInput {
  /** First through sixth line, bottom to top. */
  lines: SixLines;
  datetime?: Date | string;
  timezone?: string;
  ruleset?: RuleSetId;
}

/** Structured facts only; this contract does not calculate or explain them. */
export interface ReadingResult {
  ruleset: RuleSetId;
  lines: SixPrimaryLineResults;
  primaryHexagramId: HexagramId;
  changedHexagramId: HexagramId | null;
  lowerTrigramId: TrigramId;
  upperTrigramId: TrigramId;
  palaceId: PalaceId;
  palaceElement: FiveElement;
  shiPosition: ResultLinePosition;
  yingPosition: ResultLinePosition;
}

/** F02-only facts; board fields in ReadingResult are calculated by F03. */
export interface HexagramCalculationResult {
  ruleset: RuleSetId;
  primaryHexagramId: HexagramId;
  changedHexagramId: HexagramId | null;
  lowerTrigramId: TrigramId;
  upperTrigramId: TrigramId;
  changingPositions: readonly ResultLinePosition[];
}
