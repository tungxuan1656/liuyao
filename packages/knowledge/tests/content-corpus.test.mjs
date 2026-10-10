import { readdirSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import validateRuntime from '../.generated/runtime/validate-record.ts';
import { validateCorpus } from '../scripts/content-validation.mjs';

const data = new URL('../data/', import.meta.url);
function read(url) {
  return JSON.parse(readFileSync(url, 'utf8'));
}
function files(url) {
  return readdirSync(url, { withFileTypes: true }).flatMap(item =>
    item.isDirectory()
      ? files(new URL(`${item.name}/`, url))
      : item.name.endsWith('.json')
        ? [new URL(item.name, url)]
        : [],
  );
}
const records = ['trigrams', 'hexagrams', 'terms', 'casting', 'liuyao', 'foundations', 'lessons']
  .flatMap(dir => files(new URL(`${dir}/`, data)))
  .map(read);
const expectedHexagramIds = Array.from(
  { length: 64 },
  (_, index) => `hexagram-${String(index + 1).padStart(2, '0')}`,
);
const expectedPositions = [1, 2, 3, 4, 5, 6];
const hexagrams = records.filter(record => record.type === 'hexagram');

function isCompleteHexagramInventory(ids) {
  return (
    ids.length === expectedHexagramIds.length &&
    new Set(ids).size === expectedHexagramIds.length &&
    expectedHexagramIds.every(id => ids.includes(id))
  );
}

describe('authored corpus integration', () => {
  it('validates the corpus once, including section links and supplied pages', () =>
    expect(
      validateCorpus(records, read(new URL('sources.json', data)).sources, {
        repositoryRoot: new URL('../../../', import.meta.url).pathname,
      }).ready,
    ).toBe(records.filter(r => r.status === 'ready').length));
  it('guards the 64 King Wen identities and all 384 source-backed line positions', () => {
    const authoredFileIds = readdirSync(new URL('hexagrams/', data))
      .filter(name => name.endsWith('.json'))
      .map(name => name.slice(0, -'.json'.length));
    expect(isCompleteHexagramInventory(authoredFileIds)).toBe(true);
    expect(isCompleteHexagramInventory(hexagrams.map(record => record.id))).toBe(true);

    const byId = new Map(records.map(record => [record.id, record]));
    let positions = 0;
    for (const [index, id] of expectedHexagramIds.entries()) {
      const record = byId.get(id);
      expect(record?.type, id).toBe('hexagram');
      expect(record.kingWenNumber, id).toBe(index + 1);
      expect(record.status, id).toBe('ready');
      expect(record.entries.length, id).toBeGreaterThan(0);
      expect(
        record.lines.map(line => line.position),
        id,
      ).toEqual(expectedPositions);
      const lower = byId.get(record.lowerTrigramId);
      const upper = byId.get(record.upperTrigramId);
      expect(
        record.lines.map(line => line.polarity),
        id,
      ).toEqual([...lower.lines, ...upper.lines]);
      for (const line of record.lines) {
        positions++;
        expect(line.entries.length, `${id} line ${line.position}`).toBeGreaterThan(0);
        for (const entry of line.entries) {
          expect(entry.text.trim().length, `${id} line ${line.position}`).toBeGreaterThan(0);
          expect(entry.references.length, `${id} line ${line.position}`).toBeGreaterThan(0);
        }
        expect(
          line.entries.some(entry =>
            entry.references.some(reference => reference.sourceId?.startsWith('source-book-')),
          ),
          `${id} line ${line.position}`,
        ).toBe(true);
      }
    }
    expect(positions).toBe(384);
  });

  it.each([
    ['missing', expectedHexagramIds.slice(1)],
    ['extra', [...expectedHexagramIds, 'hexagram-65']],
    ['duplicate', [...expectedHexagramIds.slice(0, -1), 'hexagram-01']],
  ])('detects %s hexagram inventory mutations', (_label, ids) => {
    expect(isCompleteHexagramInventory(ids)).toBe(false);
  });

  it('keeps the published hexagram metadata and 384 line positions aligned', () => {
    const metadata = read(new URL('../.generated/runtime/index.json', import.meta.url));
    const published = metadata.filter(record => record.type === 'hexagram');
    expect(isCompleteHexagramInventory(published.map(record => record.id))).toBe(true);
    const authored = new Map(hexagrams.map(record => [record.id, record]));
    let positions = 0;
    for (const id of expectedHexagramIds) {
      const item = published.find(record => record.id === id);
      expect(item.asset, id).toBe(`knowledge/${id}.json`);
      const record = read(new URL(`../dist/content/${id}.json`, import.meta.url));
      const source = authored.get(id);
      expect(record.id, id).toBe(id);
      expect(record.kingWenNumber, id).toBe(source.kingWenNumber);
      expect(
        record.lines.map(line => [line.position, line.polarity, line.entries.length]),
        id,
      ).toEqual(source.lines.map(line => [line.position, line.polarity, line.entries.length]));
      positions += record.lines.length;
    }
    expect(positions).toBe(384);
  });

  it('keeps the independently checked Chu Hy Đại Quá Thượng Lục locator on NTT PDF 482', () => {
    // Supplied Ngô Tất Tố PDF 482 contains "Bản nghĩa của Chu Hy" for quẻ 28, hào 6.
    const record = hexagrams.find(record => record.id === 'hexagram-28');
    const chuHy = record.lines[5].entries.find(entry => entry.attribution?.author === 'Chu Hy');
    expect(
      chuHy?.references.some(
        reference =>
          reference.sourceId === 'source-book-ntt' &&
          reference.pdfPages[0] <= 482 &&
          reference.pdfPages[1] >= 482,
      ),
    ).toBe(true);
  });

  it('accepts every published asset with the runtime schema validator', () => {
    for (const record of records.filter(r => r.status === 'ready'))
      expect(validateRuntime(record), record.id).toBe(true);
  });
  it.each(['hexagram-01', 'hexagram-02', 'hexagram-03', 'hexagram-04'])(
    '%s has all six positions and separate supplied author views',
    id => {
      const record = records.find(r => r.id === id);
      expect(record.lines.map(l => l.position)).toEqual([1, 2, 3, 4, 5, 6]);
      for (const entries of [record.entries, ...record.lines.map(l => l.entries)]) {
        const sourceIds = new Set(entries.flatMap(e => e.references.map(r => r.sourceId)));
        for (const source of ['source-book-nhl', 'source-book-pbc', 'source-book-ntt'])
          expect(sourceIds.has(source)).toBe(true);
      }
    },
  );
  it('retains named special passages outside ordinary positions', () => {
    for (const id of ['hexagram-01', 'hexagram-02']) {
      const r = records.find(r => r.id === id);
      expect(r.specialPassages.some(p => p.title.includes('Dụng'))).toBe(true);
      expect(r.specialPassages.some(p => p.title.includes('Văn Ngôn'))).toBe(true);
    }
  });
});
