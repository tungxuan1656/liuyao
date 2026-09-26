import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { HEXAGRAMS } from '../data/hexagrams';
import { TRIGRAMS } from '../data/trigrams';
import type { KnowledgeCatalog } from '../src/schema';
import { knowledgeCatalog } from '../src/catalog';
import { validateKnowledgeCatalog } from '../src/validation';

// Independent display fixture: upper trigram per row, lower trigram per column.
// Each cell contains the King Wen number and its romanized display name.
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
  '01:Qian|10:Lu|13:Tong Ren|25:Wu Wang|44:Gou|06:Song|33:Dun|12:Pi',
  '43:Guai|58:Dui|49:Ge|17:Sui|28:Da Guo|47:Kun|31:Xian|45:Cui',
  '14:Da You|38:Kui|30:Li|21:Shi He|50:Ding|64:Wei Ji|56:Lu|35:Jin',
  '34:Da Zhuang|54:Gui Mei|55:Feng|51:Zhen|32:Heng|40:Xie|62:Xiao Guo|16:Yu',
  '09:Xiao Chu|61:Zhong Fu|37:Jia Ren|42:Yi|57:Xun|59:Huan|53:Jian|20:Guan',
  '05:Xu|60:Jie|63:Ji Ji|03:Zhun|48:Jing|29:Kan|39:Jian|08:Bi',
  '26:Da Chu|41:Sun|22:Bi|27:Yi|18:Gu|04:Meng|52:Gen|23:Bo',
  '11:Tai|19:Lin|36:Ming Yi|24:Fu|46:Sheng|07:Shi|15:Qian|02:Kun',
] as const;

const CJK_CHARACTER = /[\p{Script=Han}\u3000-\u303f\uff00-\uffef]/u;

function catalogText(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(catalogText);
  if (value !== null && typeof value === 'object') return Object.values(value).flatMap(catalogText);
  return [];
}

describe('@liuyao/knowledge display entities', () => {
  it('provides eight trigrams with unique IDs', () => {
    expect(TRIGRAMS).toHaveLength(8);
    expect(new Set(TRIGRAMS.map(({ id }) => id)).size).toBe(8);
    expect(TRIGRAMS[0]).toMatchObject({
      kind: 'trigram',
      id: 'trigram-heaven',
      name: 'Qian',
      han: '乾',
    });
    expect(TRIGRAMS[7]).toMatchObject({ id: 'trigram-earth', name: 'Kun', han: '坤' });
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
      name: 'Qian',
      han: '乾',
      kingWenNumber: 1,
      aliases: [],
      upperTrigramId: 'trigram-heaven',
      lowerTrigramId: 'trigram-heaven',
    });
    expect(HEXAGRAMS[62]).toMatchObject({
      id: 'hexagram-63',
      name: 'Ji Ji',
      han: '既濟',
      upperTrigramId: 'trigram-water',
      lowerTrigramId: 'trigram-fire',
    });
    expect(HEXAGRAMS[63]).toMatchObject({
      id: 'hexagram-64',
      name: 'Wei Ji',
      han: '未濟',
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
      rules: [],
      sources: [],
      references: [],
    };
    expect(() => validateKnowledgeCatalog(catalog)).not.toThrow();
  });

  it('covers all CJK characters and punctuation in the knowledge catalog', () => {
    const required = new Set(
      catalogText(knowledgeCatalog).flatMap(text =>
        [...text].filter(char => CJK_CHARACTER.test(char)),
      ),
    );
    const manifestCharacters = [
      ...readFileSync(
        new URL('../../../apps/web/public/fonts/cjk-coverage.txt', import.meta.url),
        'utf8',
      ),
    ];
    const manifest = new Set(manifestCharacters);

    expect([...required]).toEqual(expect.arrayContaining(['，', '。', '；', '（', '）']));
    expect(manifestCharacters).toEqual(
      [...new Set(manifestCharacters)].sort(
        (left, right) => left.codePointAt(0)! - right.codePointAt(0)!,
      ),
    );
    expect([...required].filter(char => !manifest.has(char))).toEqual([]);
  });
});
