import type { EarthlyBranch, FiveElement, HeavenlyStem, TrigramId } from './contracts';

export type NaJiaSide = 'inner' | 'outer';

export interface NaJiaAssignment {
  readonly stem: HeavenlyStem;
  readonly branch: EarthlyBranch;
}

type NaJiaTrigramAssignment = readonly [
  Readonly<NaJiaAssignment>,
  Readonly<NaJiaAssignment>,
  Readonly<NaJiaAssignment>,
];

type NaJiaTable = Record<TrigramId, Record<NaJiaSide, NaJiaTrigramAssignment>>;

// Explicit Jing Fang inner/outer assignments; tuple order is bottom-to-top.
const NA_JIA_TABLE: NaJiaTable = {
  'trigram-heaven': {
    inner: [
      { stem: 'jia', branch: 'zi' },
      { stem: 'jia', branch: 'yin' },
      { stem: 'jia', branch: 'chen' },
    ],
    outer: [
      { stem: 'ren', branch: 'wu' },
      { stem: 'ren', branch: 'shen' },
      { stem: 'ren', branch: 'xu' },
    ],
  },
  'trigram-lake': {
    inner: [
      { stem: 'ding', branch: 'si' },
      { stem: 'ding', branch: 'mao' },
      { stem: 'ding', branch: 'chou' },
    ],
    outer: [
      { stem: 'ding', branch: 'hai' },
      { stem: 'ding', branch: 'you' },
      { stem: 'ding', branch: 'wei' },
    ],
  },
  'trigram-fire': {
    inner: [
      { stem: 'ji', branch: 'mao' },
      { stem: 'ji', branch: 'chou' },
      { stem: 'ji', branch: 'hai' },
    ],
    outer: [
      { stem: 'ji', branch: 'you' },
      { stem: 'ji', branch: 'wei' },
      { stem: 'ji', branch: 'si' },
    ],
  },
  'trigram-thunder': {
    inner: [
      { stem: 'geng', branch: 'zi' },
      { stem: 'geng', branch: 'yin' },
      { stem: 'geng', branch: 'chen' },
    ],
    outer: [
      { stem: 'geng', branch: 'wu' },
      { stem: 'geng', branch: 'shen' },
      { stem: 'geng', branch: 'xu' },
    ],
  },
  'trigram-wind': {
    inner: [
      { stem: 'xin', branch: 'chou' },
      { stem: 'xin', branch: 'hai' },
      { stem: 'xin', branch: 'you' },
    ],
    outer: [
      { stem: 'xin', branch: 'wei' },
      { stem: 'xin', branch: 'si' },
      { stem: 'xin', branch: 'mao' },
    ],
  },
  'trigram-water': {
    inner: [
      { stem: 'wu', branch: 'yin' },
      { stem: 'wu', branch: 'chen' },
      { stem: 'wu', branch: 'wu' },
    ],
    outer: [
      { stem: 'wu', branch: 'shen' },
      { stem: 'wu', branch: 'xu' },
      { stem: 'wu', branch: 'zi' },
    ],
  },
  'trigram-mountain': {
    inner: [
      { stem: 'bing', branch: 'chen' },
      { stem: 'bing', branch: 'wu' },
      { stem: 'bing', branch: 'shen' },
    ],
    outer: [
      { stem: 'bing', branch: 'xu' },
      { stem: 'bing', branch: 'zi' },
      { stem: 'bing', branch: 'yin' },
    ],
  },
  'trigram-earth': {
    inner: [
      { stem: 'yi', branch: 'wei' },
      { stem: 'yi', branch: 'si' },
      { stem: 'yi', branch: 'mao' },
    ],
    outer: [
      { stem: 'gui', branch: 'chou' },
      { stem: 'gui', branch: 'hai' },
      { stem: 'gui', branch: 'you' },
    ],
  },
};

const BRANCH_ELEMENTS: Record<EarthlyBranch, FiveElement> = {
  zi: 'water',
  chou: 'earth',
  yin: 'wood',
  mao: 'wood',
  chen: 'earth',
  si: 'fire',
  wu: 'fire',
  wei: 'earth',
  shen: 'metal',
  you: 'metal',
  xu: 'earth',
  hai: 'water',
};

/** Returns the trigram's three Na Jia assignments from the bottom line upward. */
export function assignNaJia(trigram: TrigramId, side: NaJiaSide): NaJiaTrigramAssignment {
  const assignments = NA_JIA_TABLE[trigram][side];
  return assignments.map(({ stem, branch }) => ({
    stem,
    branch,
  })) as unknown as NaJiaTrigramAssignment;
}

/** Returns the traditional five-element association for an earthly branch. */
export function branchElement(branch: EarthlyBranch): FiveElement {
  return BRANCH_ELEMENTS[branch];
}
