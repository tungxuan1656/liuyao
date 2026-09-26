import { describe, expect, it } from 'vitest';
import { HEXAGRAMS } from '../data/hexagrams';
import { TRIGRAMS } from '../data/trigrams';
import type { KnowledgeCatalog } from '../src/schema';
import { validateKnowledgeCatalog } from '../src/validation';

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
});
