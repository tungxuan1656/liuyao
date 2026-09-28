import { describe, expect, it } from 'vitest';
import { HEXAGRAMS } from '../data/hexagrams';
import { TRIGRAMS } from '../data/trigrams';
import { RULES } from '../data/rules';
import type { KnowledgeCatalog } from '../src/schema';
import { knowledgeCatalog } from '../src/catalog';
import { validateKnowledgeCatalog } from '../src/validation';

// Independent display fixture: upper trigram per row, lower trigram per column.
// Each cell contains the King Wen number and its canonical Vietnamese display name.
const TRIGRAM_ORDER = [
  'heaven',
  'lake',
  'fire',
  'thunder',
  'wind',
  'water',
  'mountain',
  'earth',
] as const;
const EXPECTED_HEXAGRAM_GRID = [
  '01:Thuần Càn|10:Thiên Trạch Lý|13:Thiên Hỏa Đồng Nhân|25:Thiên Lôi Vô Vọng|44:Thiên Phong Cấu|06:Thiên Thủy Tụng|33:Thiên Sơn Độn|12:Thiên Địa Bĩ',
  '43:Trạch Thiên Quải|58:Thuần Đoài|49:Trạch Hỏa Cách|17:Trạch Lôi Tùy|28:Trạch Phong Đại Quá|47:Trạch Thủy Khốn|31:Trạch Sơn Hàm|45:Trạch Địa Tụy',
  '14:Hỏa Thiên Đại Hữu|38:Hỏa Trạch Khuê|30:Thuần Ly|21:Hỏa Lôi Phệ Hạp|50:Hỏa Phong Đỉnh|64:Hỏa Thủy Vị Tế|56:Hỏa Sơn Lữ|35:Hỏa Địa Tấn',
  '34:Lôi Thiên Đại Tráng|54:Lôi Trạch Quy Muội|55:Lôi Hỏa Phong|51:Thuần Chấn|32:Lôi Phong Hằng|40:Lôi Thủy Giải|62:Lôi Sơn Tiểu Quá|16:Lôi Địa Dự',
  '09:Phong Thiên Tiểu Súc|61:Phong Trạch Trung Phu|37:Phong Hỏa Gia Nhân|42:Phong Lôi Ích|57:Thuần Tốn|59:Phong Thủy Hoán|53:Phong Sơn Tiệm|20:Phong Địa Quan',
  '05:Thủy Thiên Nhu|60:Thủy Trạch Tiết|63:Thủy Hỏa Ký Tế|03:Thủy Lôi Truân|48:Thủy Phong Tỉnh|29:Thuần Khảm|39:Thủy Sơn Kiển|08:Thủy Địa Tỷ',
  '26:Thiên Sơn Đại Súc|41:Sơn Trạch Tổn|22:Sơn Hỏa Bí|27:Sơn Lôi Di|18:Sơn Phong Cổ|04:Sơn Thủy Mông|52:Thuần Cấn|23:Sơn Địa Bác',
  '11:Địa Thiên Thái|19:Địa Trạch Lâm|36:Địa Hỏa Minh Di|24:Địa Lôi Phục|46:Địa Phong Thăng|07:Địa Thủy Sư|15:Địa Sơn Khiêm|02:Thuần Khôn',
] as const;

const FORBIDDEN_CJK = /[\p{Script=Han}\u3000-\u303f\uff00-\uffef]/u;

function catalogText(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(catalogText);
  if (value !== null && typeof value === 'object') return Object.values(value).flatMap(catalogText);
  return [];
}

describe('@liuyao/knowledge display entities', () => {
  it('provides eight Vietnamese-named trigrams with unique IDs', () => {
    expect(TRIGRAMS).toHaveLength(8);
    expect(new Set(TRIGRAMS.map(({ id }) => id)).size).toBe(8);
    expect(TRIGRAMS[0]).toMatchObject({
      kind: 'trigram',
      id: 'trigram-heaven',
      name: 'Càn',
    });
    expect(TRIGRAMS.map(({ name }) => name)).toEqual([
      'Càn',
      'Đoài',
      'Ly',
      'Chấn',
      'Tốn',
      'Khảm',
      'Cấn',
      'Khôn',
    ]);
  });

  it('provides 64 uniquely identified King Wen hexagrams and all trigram pairs', () => {
    expect(HEXAGRAMS).toHaveLength(64);
    expect(new Set(HEXAGRAMS.map(({ id }) => id)).size).toBe(64);
    const pairs = HEXAGRAMS.map(
      ({ upperTrigramId, lowerTrigramId }) => `${upperTrigramId}/${lowerTrigramId}`,
    );
    expect(new Set(pairs).size).toBe(64);
    expect(
      new Set(
        HEXAGRAMS.flatMap(({ upperTrigramId, lowerTrigramId }) => [upperTrigramId, lowerTrigramId]),
      ),
    ).toEqual(new Set(TRIGRAMS.map(({ id }) => id)));
    expect(HEXAGRAMS[0]).toMatchObject({
      kind: 'hexagram',
      id: 'hexagram-01',
      name: 'Thuần Càn',
      kingWenNumber: 1,
      aliases: [],
      upperTrigramId: 'trigram-heaven',
      lowerTrigramId: 'trigram-heaven',
    });
    expect(HEXAGRAMS[62]).toMatchObject({
      id: 'hexagram-63',
      name: 'Thủy Hỏa Ký Tế',
      upperTrigramId: 'trigram-water',
      lowerTrigramId: 'trigram-fire',
    });
    expect(HEXAGRAMS[63]).toMatchObject({
      id: 'hexagram-64',
      name: 'Hỏa Thủy Vị Tế',
      upperTrigramId: 'trigram-fire',
      lowerTrigramId: 'trigram-water',
    });
  });

  it('matches every King Wen number, name and upper/lower trigram against an independent fixture', () => {
    const expected = EXPECTED_HEXAGRAM_GRID.flatMap((row, upperIndex) =>
      row.split('|').map((cell, lowerIndex) => {
        const [number, name] = cell.split(':');
        return {
          id: `hexagram-${number}`,
          name,
          kingWenNumber: Number(number),
          upperTrigramId: `trigram-${TRIGRAM_ORDER[upperIndex]}`,
          lowerTrigramId: `trigram-${TRIGRAM_ORDER[lowerIndex]}`,
        };
      }),
    ).sort((a, b) => a.kingWenNumber - b.kingWenNumber);
    expect(expected).toHaveLength(64);
    expect(
      HEXAGRAMS.map(({ id, name, kingWenNumber, upperTrigramId, lowerTrigramId }) => ({
        id,
        name,
        kingWenNumber,
        upperTrigramId,
        lowerTrigramId,
      })),
    ).toEqual(expected);
  });

  it('validates the complete trigram and hexagram data catalog', () => {
    const catalog: KnowledgeCatalog = {
      entities: [...TRIGRAMS, ...HEXAGRAMS],
      terms: [],
      rules: RULES,
      sources: [],
      references: [],
    };
    expect(() => validateKnowledgeCatalog(catalog)).not.toThrow();
  });

  it('contains no Han characters, CJK punctuation, or full-width text', () => {
    const forbidden = catalogText(knowledgeCatalog).flatMap(text =>
      [...text].filter(char => FORBIDDEN_CJK.test(char)),
    );
    expect(forbidden).toEqual([]);
  });
});
