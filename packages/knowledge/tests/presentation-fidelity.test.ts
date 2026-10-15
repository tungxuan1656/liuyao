import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';
import type { ContentRecord } from '../src/content-schema';
import { resolveReadingReferenceContext } from '../src/context';
import { loadContent } from '../src/node';

async function authored(path: string): Promise<ContentRecord> {
  return JSON.parse(await readFile(new URL(`../data/${path}.json`, import.meta.url), 'utf8'));
}

describe('released presentation fidelity', () => {
  it.each([
    'hexagrams/hexagram-01',
    'hexagrams/hexagram-44',
    'liuyao/advancing-retreating-spirits',
    'liuyao/na-jia',
    'foundations/pbc-image-plates',
    'casting/rule-reading-result-fields',
    'casting/moving-lines',
    'lessons/lesson-worked-readings',
  ])('preserves the complete authored record through loading: %s', async path => {
    const record = await authored(path);
    // Compare the authoring input, not another projection of the generated asset.
    expect(await loadContent(record.id)).toEqual(record);
  });

  it('keeps conditions, book locations, and convention evidence distinguishable', async () => {
    const conditional = await loadContent('article-advancing-retreating-spirits');
    assert(conditional);
    expect(conditional.entries.some(entry => entry.condition)).toBe(true);
    const naJia = await loadContent('rule-na-jia-assignment');
    expect(naJia?.entries[0]?.references).toEqual([
      {
        sourceId: 'source-book-bpct',
        pdfPages: [13, 13],
        section: 'XII — Nạp Giáp trang quái ca',
        printedPages: ['7', '7'],
      },
    ]);
    const convention = await loadContent('rule-reading-result-fields');
    expect(
      convention?.entries.some(entry =>
        entry.references.some(reference => 'documentPath' in reference),
      ),
    ).toBe(true);
  });

  it.each([
    ['primary', 'hexagram-01', ['Sơ cửu', 'Cửu nhị', 'Cửu tam', 'Cửu tứ', 'Cửu ngũ', 'Thượng cửu']],
    ['changed', 'hexagram-44', ['Sơ lục', 'Cửu nhị', 'Cửu tam', 'Cửu tứ', 'Cửu ngũ', 'Thượng cửu']],
  ] as const)(
    'resolves all six %s positions to their own commentary',
    async (contextType, hexagramId, labels) => {
      const record = await loadContent(hexagramId);
      assert(record?.type === 'hexagram');
      for (let position = 1; position <= 6; position++) {
        expect(resolveReadingReferenceContext({ contextType, hexagramId, position })).toEqual({
          contextType,
          hexagramId,
          position,
          anchor: `#line-${position}`,
          canonicalPath: `/library/hexagram/${hexagramId}#line-${position}`,
        });
        const line = record.lines.find(line => line.position === position);
        expect(line?.label).toBe(labels[position - 1]);
        expect(line?.polarity).toBe(contextType === 'changed' && position === 1 ? 'yin' : 'yang');
        expect(line?.entries.length).toBeGreaterThan(0);
        expect(line?.entries.some(entry => entry.attribution?.author === 'Chu Hy')).toBe(true);
      }
    },
  );
});
