import { TRIGRAMS } from './trigrams.js';
import type { HexagramEntity, HexagramId, TrigramId } from '../src/schema.js';

export type HexagramRecord = HexagramEntity;

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

const DISPLAY_NAMES = [
  'Thuần Càn',
  'Thuần Khôn',
  'Thủy Lôi Truân',
  'Sơn Thủy Mông',
  'Thủy Thiên Nhu',
  'Thiên Thủy Tụng',
  'Địa Thủy Sư',
  'Thủy Địa Tỷ',
  'Phong Thiên Tiểu Súc',
  'Thiên Trạch Lý',
  'Địa Thiên Thái',
  'Thiên Địa Bĩ',
  'Thiên Hỏa Đồng Nhân',
  'Hỏa Thiên Đại Hữu',
  'Địa Sơn Khiêm',
  'Lôi Địa Dự',
  'Trạch Lôi Tùy',
  'Sơn Phong Cổ',
  'Địa Trạch Lâm',
  'Phong Địa Quan',
  'Hỏa Lôi Phệ Hạp',
  'Sơn Hỏa Bí',
  'Sơn Địa Bác',
  'Địa Lôi Phục',
  'Thiên Lôi Vô Vọng',
  'Thiên Sơn Đại Súc',
  'Sơn Lôi Di',
  'Trạch Phong Đại Quá',
  'Thuần Khảm',
  'Thuần Ly',
  'Trạch Sơn Hàm',
  'Lôi Phong Hằng',
  'Thiên Sơn Độn',
  'Lôi Thiên Đại Tráng',
  'Hỏa Địa Tấn',
  'Địa Hỏa Minh Di',
  'Phong Hỏa Gia Nhân',
  'Hỏa Trạch Khuê',
  'Thủy Sơn Kiển',
  'Lôi Thủy Giải',
  'Sơn Trạch Tổn',
  'Phong Lôi Ích',
  'Trạch Thiên Quải',
  'Thiên Phong Cấu',
  'Trạch Địa Tụy',
  'Địa Phong Thăng',
  'Trạch Thủy Khốn',
  'Thủy Phong Tỉnh',
  'Trạch Hỏa Cách',
  'Hỏa Phong Đỉnh',
  'Thuần Chấn',
  'Thuần Cấn',
  'Phong Sơn Tiệm',
  'Lôi Trạch Quy Muội',
  'Lôi Hỏa Phong',
  'Hỏa Sơn Lữ',
  'Thuần Tốn',
  'Thuần Đoài',
  'Phong Thủy Hoán',
  'Thủy Trạch Tiết',
  'Phong Trạch Trung Phu',
  'Lôi Sơn Tiểu Quá',
  'Thủy Hỏa Ký Tế',
  'Hỏa Thủy Vị Tế',
] as const;

const TRIGRAM_NAME_BY_ID: Readonly<Record<TrigramId, string>> = Object.freeze(
  Object.fromEntries(TRIGRAMS.map(({ id, name }) => [id, name])) as Record<TrigramId, string>,
);

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
export const HEXAGRAMS = DISPLAY_NAMES.map((name, index) => {
  const number = String(index + 1).padStart(2, '0');
  const [upperTrigramId, lowerTrigramId] = pairForKingWenNumber(number);
  return {
    kind: 'hexagram' as const,
    id: `hexagram-${number}` as HexagramId,
    name,
    aliases: [],
    explanation: `Quẻ số ${index + 1} theo thứ tự Văn Vương, gồm nội quái ${TRIGRAM_NAME_BY_ID[lowerTrigramId]} và ngoại quái ${TRIGRAM_NAME_BY_ID[upperTrigramId]}.`,
    kingWenNumber: index + 1,
    upperTrigramId,
    lowerTrigramId,
    applicableRuleIds: ['rule-trigram-composition'],
  };
}) as readonly HexagramRecord[];
