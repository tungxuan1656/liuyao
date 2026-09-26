import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { HEXAGRAMS } from '../data/hexagrams';
import { TRIGRAMS } from '../data/trigrams';

function coreSource(relativePath: string): string {
  return readFileSync(new URL(`../../liuyao-core/src/${relativePath}`, import.meta.url), 'utf8');
}

function coreInventory(source: string, name: string): string[] {
  const body = source.match(
    new RegExp(`export const ${name} = (?:Object\\.freeze\\()?\\[([\\s\\S]*?)\\] as const\\)?;`),
  )?.[1];
  if (!body) throw new Error(`Missing ${name} in core contracts`);
  return [...body.matchAll(/'([^']+)'/g)].map(match => match[1]!);
}

function coreHexagramGrid(source: string): string[][] {
  const body = source.match(/const HEXAGRAM_BY_UPPER_AND_LOWER = \[([\s\S]*?)\] as const;/)?.[1];
  if (!body) throw new Error('Missing core King Wen grid');
  return [...body.matchAll(/\[([^\]]+)\]/g)].map(row =>
    [...row[1]!.matchAll(/'([0-9]{2})'/g)].map(cell => cell[1]!),
  );
}

describe('knowledge and core source contracts', () => {
  it('keeps stable IDs and all King Wen pairs aligned without importing core at runtime', () => {
    const contracts = coreSource('contracts.ts');
    const coreTrigramIds = coreInventory(contracts, 'TRIGRAM_IDS');
    const coreHexagramIds = coreInventory(contracts, 'HEXAGRAM_IDS');
    const coreGrid = coreHexagramGrid(coreSource('hexagrams.ts'));

    expect(coreTrigramIds).toEqual(TRIGRAMS.map(({ id }) => id));
    expect(coreHexagramIds).toEqual(HEXAGRAMS.map(({ id }) => id));
    expect(coreGrid).toHaveLength(coreTrigramIds.length);
    expect(coreGrid.every(row => row.length === coreTrigramIds.length)).toBe(true);

    for (const hexagram of HEXAGRAMS) {
      const upperIndex = coreTrigramIds.indexOf(hexagram.upperTrigramId);
      const lowerIndex = coreTrigramIds.indexOf(hexagram.lowerTrigramId);
      const number = coreGrid[upperIndex]?.[lowerIndex];
      expect(`hexagram-${number}`, hexagram.id).toBe(hexagram.id);
    }
  });
});
