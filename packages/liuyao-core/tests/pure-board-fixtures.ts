import type {
  EarthlyBranch,
  FiveElement,
  HeavenlyStem,
  HexagramId,
  PalaceId,
  SixLines,
  SixRelative,
  TrigramId,
} from '../src/contracts';

type PureLineFixture = readonly [
  HeavenlyStem,
  EarthlyBranch,
  FiveElement,
  SixRelative,
  'shi' | 'ying' | undefined,
];

type PureBoardFixture = {
  id: HexagramId;
  trigram: TrigramId;
  lines: SixLines;
  palace: PalaceId;
  palaceElement: FiveElement;
  board: readonly [
    PureLineFixture,
    PureLineFixture,
    PureLineFixture,
    PureLineFixture,
    PureLineFixture,
    PureLineFixture,
  ];
};

/**
 * Independent golden values cross-checked against the named-trigram codes in
 * hexagram-fixtures.ts, the explicit inner/outer assignments in na-jia.test.ts,
 * and the sourced palace/marker rows in palace-fixtures.ts. Six Relatives use
 * the rules documented in docs/plans/feat-004.md:28. Line tuples are ordered
 * bottom-to-top as [stem, branch, branch element, relative, marker].
 */
export const PURE_BOARD_FIXTURES: readonly PureBoardFixture[] = [
  {
    id: 'hexagram-01',
    trigram: 'trigram-heaven',
    lines: [7, 7, 7, 7, 7, 7],
    palace: 'palace-heaven',
    palaceElement: 'metal',
    board: [
      ['jia', 'zi', 'water', 'child', undefined],
      ['jia', 'yin', 'wood', 'wealth', undefined],
      ['jia', 'chen', 'earth', 'parent', 'ying'],
      ['ren', 'wu', 'fire', 'official-ghost', undefined],
      ['ren', 'shen', 'metal', 'sibling', undefined],
      ['ren', 'xu', 'earth', 'parent', 'shi'],
    ],
  },
  {
    id: 'hexagram-02',
    trigram: 'trigram-earth',
    lines: [8, 8, 8, 8, 8, 8],
    palace: 'palace-earth',
    palaceElement: 'earth',
    board: [
      ['yi', 'wei', 'earth', 'sibling', undefined],
      ['yi', 'si', 'fire', 'parent', undefined],
      ['yi', 'mao', 'wood', 'official-ghost', 'ying'],
      ['gui', 'chou', 'earth', 'sibling', undefined],
      ['gui', 'hai', 'water', 'wealth', undefined],
      ['gui', 'you', 'metal', 'child', 'shi'],
    ],
  },
  {
    id: 'hexagram-58',
    trigram: 'trigram-lake',
    lines: [7, 7, 8, 7, 7, 8],
    palace: 'palace-lake',
    palaceElement: 'metal',
    board: [
      ['ding', 'si', 'fire', 'official-ghost', undefined],
      ['ding', 'mao', 'wood', 'wealth', undefined],
      ['ding', 'chou', 'earth', 'parent', 'ying'],
      ['ding', 'hai', 'water', 'child', undefined],
      ['ding', 'you', 'metal', 'sibling', undefined],
      ['ding', 'wei', 'earth', 'parent', 'shi'],
    ],
  },
  {
    id: 'hexagram-30',
    trigram: 'trigram-fire',
    lines: [7, 8, 7, 7, 8, 7],
    palace: 'palace-fire',
    palaceElement: 'fire',
    board: [
      ['ji', 'mao', 'wood', 'parent', undefined],
      ['ji', 'chou', 'earth', 'child', undefined],
      ['ji', 'hai', 'water', 'official-ghost', 'ying'],
      ['ji', 'you', 'metal', 'wealth', undefined],
      ['ji', 'wei', 'earth', 'child', undefined],
      ['ji', 'si', 'fire', 'sibling', 'shi'],
    ],
  },
  {
    id: 'hexagram-51',
    trigram: 'trigram-thunder',
    lines: [7, 8, 8, 7, 8, 8],
    palace: 'palace-thunder',
    palaceElement: 'wood',
    board: [
      ['geng', 'zi', 'water', 'parent', undefined],
      ['geng', 'yin', 'wood', 'sibling', undefined],
      ['geng', 'chen', 'earth', 'wealth', 'ying'],
      ['geng', 'wu', 'fire', 'child', undefined],
      ['geng', 'shen', 'metal', 'official-ghost', undefined],
      ['geng', 'xu', 'earth', 'wealth', 'shi'],
    ],
  },
  {
    id: 'hexagram-57',
    trigram: 'trigram-wind',
    lines: [8, 7, 7, 8, 7, 7],
    palace: 'palace-wind',
    palaceElement: 'wood',
    board: [
      ['xin', 'chou', 'earth', 'wealth', undefined],
      ['xin', 'hai', 'water', 'parent', undefined],
      ['xin', 'you', 'metal', 'official-ghost', 'ying'],
      ['xin', 'wei', 'earth', 'wealth', undefined],
      ['xin', 'si', 'fire', 'child', undefined],
      ['xin', 'mao', 'wood', 'sibling', 'shi'],
    ],
  },
  {
    id: 'hexagram-29',
    trigram: 'trigram-water',
    lines: [8, 7, 8, 8, 7, 8],
    palace: 'palace-water',
    palaceElement: 'water',
    board: [
      ['wu', 'yin', 'wood', 'child', undefined],
      ['wu', 'chen', 'earth', 'official-ghost', undefined],
      ['wu', 'wu', 'fire', 'wealth', 'ying'],
      ['wu', 'shen', 'metal', 'parent', undefined],
      ['wu', 'xu', 'earth', 'official-ghost', undefined],
      ['wu', 'zi', 'water', 'sibling', 'shi'],
    ],
  },
  {
    id: 'hexagram-52',
    trigram: 'trigram-mountain',
    lines: [8, 8, 7, 8, 8, 7],
    palace: 'palace-mountain',
    palaceElement: 'earth',
    board: [
      ['bing', 'chen', 'earth', 'sibling', undefined],
      ['bing', 'wu', 'fire', 'parent', undefined],
      ['bing', 'shen', 'metal', 'child', 'ying'],
      ['bing', 'xu', 'earth', 'sibling', undefined],
      ['bing', 'zi', 'water', 'wealth', undefined],
      ['bing', 'yin', 'wood', 'official-ghost', 'shi'],
    ],
  },
];
