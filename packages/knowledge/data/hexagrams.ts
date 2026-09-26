import type { HexagramEntity, HexagramId, TrigramId } from '../src/schema';

export type HexagramRecord = HexagramEntity & { readonly han: string };

const TRIGRAM_IDS: readonly TrigramId[] = [
  'trigram-heaven',
  'trigram-lake',
  'trigram-fire',
  'trigram-thunder',
  'trigram-wind',
  'trigram-water',
  'trigram-mountain',
  'trigram-earth',
] as const;

/** King Wen numbers; rows are upper trigrams and columns are lower trigrams. */
const HEXAGRAM_BY_UPPER_AND_LOWER = [
  ['01', '10', '13', '25', '44', '06', '33', '12'],
  ['43', '58', '49', '17', '28', '47', '31', '45'],
  ['14', '38', '30', '21', '50', '64', '56', '35'],
  ['34', '54', '55', '51', '32', '40', '62', '16'],
  ['09', '61', '37', '42', '57', '59', '53', '20'],
  ['05', '60', '63', '03', '48', '29', '39', '08'],
  ['26', '41', '22', '27', '18', '04', '52', '23'],
  ['11', '19', '36', '24', '46', '07', '15', '02'],
] as const;

const DISPLAY: readonly (readonly [string, string])[] = [
  ['Qian', '乾'],
  ['Kun', '坤'],
  ['Zhun', '屯'],
  ['Meng', '蒙'],
  ['Xu', '需'],
  ['Song', '訟'],
  ['Shi', '師'],
  ['Bi', '比'],
  ['Xiao Chu', '小畜'],
  ['Lu', '履'],
  ['Tai', '泰'],
  ['Pi', '否'],
  ['Tong Ren', '同人'],
  ['Da You', '大有'],
  ['Qian', '謙'],
  ['Yu', '豫'],
  ['Sui', '隨'],
  ['Gu', '蠱'],
  ['Lin', '臨'],
  ['Guan', '觀'],
  ['Shi He', '噬嗑'],
  ['Bi', '賁'],
  ['Bo', '剝'],
  ['Fu', '復'],
  ['Wu Wang', '無妄'],
  ['Da Chu', '大畜'],
  ['Yi', '頤'],
  ['Da Guo', '大過'],
  ['Kan', '坎'],
  ['Li', '離'],
  ['Xian', '咸'],
  ['Heng', '恆'],
  ['Dun', '遯'],
  ['Da Zhuang', '大壯'],
  ['Jin', '晉'],
  ['Ming Yi', '明夷'],
  ['Jia Ren', '家人'],
  ['Kui', '睽'],
  ['Jian', '蹇'],
  ['Xie', '解'],
  ['Sun', '損'],
  ['Yi', '益'],
  ['Guai', '夬'],
  ['Gou', '姤'],
  ['Cui', '萃'],
  ['Sheng', '升'],
  ['Kun', '困'],
  ['Jing', '井'],
  ['Ge', '革'],
  ['Ding', '鼎'],
  ['Zhen', '震'],
  ['Gen', '艮'],
  ['Jian', '漸'],
  ['Gui Mei', '歸妹'],
  ['Feng', '豐'],
  ['Lu', '旅'],
  ['Xun', '巽'],
  ['Dui', '兌'],
  ['Huan', '渙'],
  ['Jie', '節'],
  ['Zhong Fu', '中孚'],
  ['Xiao Guo', '小過'],
  ['Ji Ji', '既濟'],
  ['Wei Ji', '未濟'],
];

function pairForKingWenNumber(number: string): readonly [TrigramId, TrigramId] {
  const rows: readonly (readonly string[])[] = HEXAGRAM_BY_UPPER_AND_LOWER;
  const upperIndex = rows.findIndex(row => row.includes(number));
  const lowerIndex = rows[upperIndex]?.indexOf(number) ?? -1;
  const upperTrigramId = TRIGRAM_IDS[upperIndex];
  const lowerTrigramId = TRIGRAM_IDS[lowerIndex];
  if (
    upperIndex < 0 ||
    lowerIndex < 0 ||
    upperTrigramId === undefined ||
    lowerTrigramId === undefined
  ) {
    throw new Error(`Unknown King Wen number: ${number}`);
  }
  return [upperTrigramId, lowerTrigramId];
}

/** Display metadata in King Wen sequence. */
export const HEXAGRAMS = DISPLAY.map(([name, han], index) => {
  const number = String(index + 1).padStart(2, '0');
  const [upperTrigramId, lowerTrigramId] = pairForKingWenNumber(number);
  return {
    kind: 'hexagram' as const,
    id: `hexagram-${number}` as HexagramId,
    name,
    han,
    aliases: [],
    kingWenNumber: index + 1,
    upperTrigramId,
    lowerTrigramId,
  };
}) as readonly HexagramRecord[];
