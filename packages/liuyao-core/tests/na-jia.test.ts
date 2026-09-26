import { describe, expect, it } from 'vitest';
import type { EarthlyBranch, FiveElement, HeavenlyStem, TrigramId } from '../src/contracts';
import { assignNaJia, branchElement } from '../src/na-jia';

interface ExpectedNaJia {
  trigram: TrigramId;
  side: 'inner' | 'outer';
  assignments: readonly [
    { stem: HeavenlyStem; branch: EarthlyBranch },
    { stem: HeavenlyStem; branch: EarthlyBranch },
    { stem: HeavenlyStem; branch: EarthlyBranch },
  ];
}

// Independent transcription of the traditional 裝卦納甲表 and 納甲 verse:
// https://www.quanxue.cn/qt_mingxiang/boshi/boshi07.html (裝卦納甲表)
// https://www.shidianguji.com/book/SK1619/chapter/1l9llosnxdd0i (納甲)
// Cross-checked against modern references:
// https://www.zhangjiming.cn/12949.html and https://www.cosmictao.com/zh/library/najia
const EXPECTED_NA_JIA: readonly ExpectedNaJia[] = [
  {
    trigram: 'trigram-heaven',
    side: 'inner',
    assignments: [
      { stem: 'jia', branch: 'zi' },
      { stem: 'jia', branch: 'yin' },
      { stem: 'jia', branch: 'chen' },
    ],
  },
  {
    trigram: 'trigram-heaven',
    side: 'outer',
    assignments: [
      { stem: 'ren', branch: 'wu' },
      { stem: 'ren', branch: 'shen' },
      { stem: 'ren', branch: 'xu' },
    ],
  },
  {
    trigram: 'trigram-lake',
    side: 'inner',
    assignments: [
      { stem: 'ding', branch: 'si' },
      { stem: 'ding', branch: 'mao' },
      { stem: 'ding', branch: 'chou' },
    ],
  },
  {
    trigram: 'trigram-lake',
    side: 'outer',
    assignments: [
      { stem: 'ding', branch: 'hai' },
      { stem: 'ding', branch: 'you' },
      { stem: 'ding', branch: 'wei' },
    ],
  },
  {
    trigram: 'trigram-fire',
    side: 'inner',
    assignments: [
      { stem: 'ji', branch: 'mao' },
      { stem: 'ji', branch: 'chou' },
      { stem: 'ji', branch: 'hai' },
    ],
  },
  {
    trigram: 'trigram-fire',
    side: 'outer',
    assignments: [
      { stem: 'ji', branch: 'you' },
      { stem: 'ji', branch: 'wei' },
      { stem: 'ji', branch: 'si' },
    ],
  },
  {
    trigram: 'trigram-thunder',
    side: 'inner',
    assignments: [
      { stem: 'geng', branch: 'zi' },
      { stem: 'geng', branch: 'yin' },
      { stem: 'geng', branch: 'chen' },
    ],
  },
  {
    trigram: 'trigram-thunder',
    side: 'outer',
    assignments: [
      { stem: 'geng', branch: 'wu' },
      { stem: 'geng', branch: 'shen' },
      { stem: 'geng', branch: 'xu' },
    ],
  },
  {
    trigram: 'trigram-wind',
    side: 'inner',
    assignments: [
      { stem: 'xin', branch: 'chou' },
      { stem: 'xin', branch: 'hai' },
      { stem: 'xin', branch: 'you' },
    ],
  },
  {
    trigram: 'trigram-wind',
    side: 'outer',
    assignments: [
      { stem: 'xin', branch: 'wei' },
      { stem: 'xin', branch: 'si' },
      { stem: 'xin', branch: 'mao' },
    ],
  },
  {
    trigram: 'trigram-water',
    side: 'inner',
    assignments: [
      { stem: 'wu', branch: 'yin' },
      { stem: 'wu', branch: 'chen' },
      { stem: 'wu', branch: 'wu' },
    ],
  },
  {
    trigram: 'trigram-water',
    side: 'outer',
    assignments: [
      { stem: 'wu', branch: 'shen' },
      { stem: 'wu', branch: 'xu' },
      { stem: 'wu', branch: 'zi' },
    ],
  },
  {
    trigram: 'trigram-mountain',
    side: 'inner',
    assignments: [
      { stem: 'bing', branch: 'chen' },
      { stem: 'bing', branch: 'wu' },
      { stem: 'bing', branch: 'shen' },
    ],
  },
  {
    trigram: 'trigram-mountain',
    side: 'outer',
    assignments: [
      { stem: 'bing', branch: 'xu' },
      { stem: 'bing', branch: 'zi' },
      { stem: 'bing', branch: 'yin' },
    ],
  },
  {
    trigram: 'trigram-earth',
    side: 'inner',
    assignments: [
      { stem: 'yi', branch: 'wei' },
      { stem: 'yi', branch: 'si' },
      { stem: 'yi', branch: 'mao' },
    ],
  },
  {
    trigram: 'trigram-earth',
    side: 'outer',
    assignments: [
      { stem: 'gui', branch: 'chou' },
      { stem: 'gui', branch: 'hai' },
      { stem: 'gui', branch: 'you' },
    ],
  },
];

const EXPECTED_BRANCH_ELEMENTS: readonly [EarthlyBranch, FiveElement][] = [
  ['zi', 'water'],
  ['chou', 'earth'],
  ['yin', 'wood'],
  ['mao', 'wood'],
  ['chen', 'earth'],
  ['si', 'fire'],
  ['wu', 'fire'],
  ['wei', 'earth'],
  ['shen', 'metal'],
  ['you', 'metal'],
  ['xu', 'earth'],
  ['hai', 'water'],
];

describe('Na Jia', () => {
  it('assigns the independently transcribed stems and branches for all trigram sides', () => {
    expect(EXPECTED_NA_JIA).toHaveLength(16);

    for (const { trigram, side, assignments } of EXPECTED_NA_JIA) {
      expect(assignNaJia(trigram, side), `${trigram} ${side}`).toEqual(assignments);
    }
  });

  it('uses the distinct heaven and earth stems on the outer and inner sides', () => {
    expect(assignNaJia('trigram-heaven', 'inner').map(({ stem }) => stem)).toEqual([
      'jia',
      'jia',
      'jia',
    ]);
    expect(assignNaJia('trigram-heaven', 'outer').map(({ stem }) => stem)).toEqual([
      'ren',
      'ren',
      'ren',
    ]);
    expect(assignNaJia('trigram-earth', 'inner').map(({ stem }) => stem)).toEqual([
      'yi',
      'yi',
      'yi',
    ]);
    expect(assignNaJia('trigram-earth', 'outer').map(({ stem }) => stem)).toEqual([
      'gui',
      'gui',
      'gui',
    ]);
  });

  it('maps all twelve earthly branches to their five elements', () => {
    expect(EXPECTED_BRANCH_ELEMENTS).toHaveLength(12);

    for (const [branch, element] of EXPECTED_BRANCH_ELEMENTS) {
      expect(branchElement(branch), branch).toBe(element);
    }
  });
});
