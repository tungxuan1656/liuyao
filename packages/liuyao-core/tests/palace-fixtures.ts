import type { HexagramId, PalaceId, ResultLinePosition } from '../src/contracts';

/**
 * Independent oracle: all eight named palace sequences in 京氏易傳,
 * https://ctext.org/jingshi-yizhuan/zhs ; King Wen number/name correspondence
 * cross-checked against Stanford Encyclopedia of Philosophy, Yijing Appendix 3,
 * https://plato.stanford.edu/entries/chinese-change/appendix.html .
 * The numerical palace grouping is also cross-checked against UAYA Foundation,
 * https://uaya.org/zh/learn/iching/advanced-studies/wen-wang-gua/hexagram-skeleton/eight-palaces/ .
 * Shi/Ying positions follow 安世應訣, https://www.quanxue.cn/qt_mingxiang/boshi/boshi07.html .
 * Each row lists explicit (hexagram, Shi, Ying) tuples in source order. Positions are bottom-to-top.
 */
type FixtureTuple = readonly [HexagramId, ResultLinePosition, ResultLinePosition];
const PALACE_ROWS: readonly (readonly [PalaceId, readonly FixtureTuple[]])[] = [
  [
    'palace-heaven',
    [
      ['hexagram-01', 6, 3],
      ['hexagram-44', 1, 4],
      ['hexagram-33', 2, 5],
      ['hexagram-12', 3, 6],
      ['hexagram-20', 4, 1],
      ['hexagram-23', 5, 2],
      ['hexagram-35', 4, 1],
      ['hexagram-14', 3, 6],
    ],
  ],
  [
    'palace-lake',
    [
      ['hexagram-58', 6, 3],
      ['hexagram-47', 1, 4],
      ['hexagram-45', 2, 5],
      ['hexagram-31', 3, 6],
      ['hexagram-39', 4, 1],
      ['hexagram-15', 5, 2],
      ['hexagram-62', 4, 1],
      ['hexagram-54', 3, 6],
    ],
  ],
  [
    'palace-fire',
    [
      ['hexagram-30', 6, 3],
      ['hexagram-56', 1, 4],
      ['hexagram-50', 2, 5],
      ['hexagram-64', 3, 6],
      ['hexagram-04', 4, 1],
      ['hexagram-59', 5, 2],
      ['hexagram-06', 4, 1],
      ['hexagram-13', 3, 6],
    ],
  ],
  [
    'palace-thunder',
    [
      ['hexagram-51', 6, 3],
      ['hexagram-16', 1, 4],
      ['hexagram-40', 2, 5],
      ['hexagram-32', 3, 6],
      ['hexagram-46', 4, 1],
      ['hexagram-48', 5, 2],
      ['hexagram-28', 4, 1],
      ['hexagram-17', 3, 6],
    ],
  ],
  [
    'palace-wind',
    [
      ['hexagram-57', 6, 3],
      ['hexagram-09', 1, 4],
      ['hexagram-37', 2, 5],
      ['hexagram-42', 3, 6],
      ['hexagram-25', 4, 1],
      ['hexagram-21', 5, 2],
      ['hexagram-27', 4, 1],
      ['hexagram-18', 3, 6],
    ],
  ],
  [
    'palace-water',
    [
      ['hexagram-29', 6, 3],
      ['hexagram-60', 1, 4],
      ['hexagram-03', 2, 5],
      ['hexagram-63', 3, 6],
      ['hexagram-49', 4, 1],
      ['hexagram-55', 5, 2],
      ['hexagram-36', 4, 1],
      ['hexagram-07', 3, 6],
    ],
  ],
  [
    'palace-mountain',
    [
      ['hexagram-52', 6, 3],
      ['hexagram-22', 1, 4],
      ['hexagram-26', 2, 5],
      ['hexagram-41', 3, 6],
      ['hexagram-38', 4, 1],
      ['hexagram-10', 5, 2],
      ['hexagram-61', 4, 1],
      ['hexagram-53', 3, 6],
    ],
  ],
  [
    'palace-earth',
    [
      ['hexagram-02', 6, 3],
      ['hexagram-24', 1, 4],
      ['hexagram-19', 2, 5],
      ['hexagram-11', 3, 6],
      ['hexagram-34', 4, 1],
      ['hexagram-43', 5, 2],
      ['hexagram-05', 4, 1],
      ['hexagram-08', 3, 6],
    ],
  ],
];

export const PALACE_FIXTURES = PALACE_ROWS.flatMap(([palaceId, hexagramIds]) =>
  hexagramIds.map(([hexagramId, shiPosition, yingPosition]) => ({
    hexagramId,
    palaceId,
    shiPosition,
    yingPosition,
  })),
);
