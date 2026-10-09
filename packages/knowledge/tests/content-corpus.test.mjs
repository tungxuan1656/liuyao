import { readFileSync, readdirSync } from 'node:fs';
import { describe, it, expect } from 'vitest';
import validateRuntime from '../.generated/runtime/validate-record.ts';
import { validateCorpus } from '../scripts/content-validation.mjs';
const data = new URL('../data/', import.meta.url);
function read(url) {
  return JSON.parse(readFileSync(url, 'utf8'));
}
function files(url) {
  return readdirSync(url, { withFileTypes: true }).flatMap(item =>
    item.isDirectory()
      ? files(new URL(item.name + '/', url))
      : item.name.endsWith('.json')
        ? [new URL(item.name, url)]
        : [],
  );
}
const records = ['trigrams', 'hexagrams', 'terms', 'casting', 'liuyao', 'foundations', 'lessons']
  .flatMap(dir => files(new URL(dir + '/', data)))
  .map(read);
describe('authored corpus integration', () => {
  it('validates the corpus once, including section links and supplied pages', () =>
    expect(
      validateCorpus(records, read(new URL('sources.json', data)).sources, {
        repositoryRoot: new URL('../../../', import.meta.url).pathname,
      }).ready,
    ).toBe(records.filter(r => r.status === 'ready').length));
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
