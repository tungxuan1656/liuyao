import { describe, it, expect } from 'vitest';
import { validateCorpus } from '../scripts/content-validation.mjs';
import { projectCorpus } from '../scripts/release-projection.mjs';
const sources = [
  {
    id: 'source-book-test',
    title: 'Test book',
    author: 'Test author',
    contributors: [],
    editions: [
      {
        label: 'Test PDF',
        pdfPageCount: 100,
        localInputPath: 'private/book.pdf',
        sha256: 'private',
        publication: { publisher: null, year: null, note: 'Test edition' },
        rights: { note: 'Research copy' },
      },
    ],
  },
];
const reference = () => ({ sourceId: 'source-book-test', pdfPages: [1, 2] });
const article = () => ({
  id: 'article-test',
  type: 'article',
  title: 'Test article',
  status: 'ready',
  entries: [{ id: 'intro', text: 'Source explanation.', references: [reference()] }],
});
const bibliography = { sources: [], references: [] };
describe('simple content validation', () => {
  it('accepts coherent paragraphs and direct page references', () =>
    expect(validateCorpus([article()], sources).ready).toBe(1));
  it.each([
    ['duplicate IDs', r => [r, r]],
    [
      'unknown source',
      r => {
        r.entries[0].references[0].sourceId = 'missing';
        return [r];
      },
    ],
    [
      'page beyond edition',
      r => {
        r.entries[0].references[0].pdfPages = [99, 101];
        return [r];
      },
    ],
    [
      'reversed pages',
      r => {
        r.entries[0].references[0].pdfPages = [3, 1];
        return [r];
      },
    ],
    [
      'fractional pages',
      r => {
        r.entries[0].references[0].pdfPages = [1.1, 2];
        return [r];
      },
    ],
    [
      'missing reference',
      r => {
        r.entries[0].references = [];
        return [r];
      },
    ],
    [
      'unknown relation',
      r => {
        r.relatedIds = ['article-missing'];
        return [r];
      },
    ],
    [
      'duplicate sections',
      r => {
        r.entries.push({ ...r.entries[0] });
        return [r];
      },
    ],
    [
      'missing section',
      r => {
        r.links = [{ recordId: r.id, sectionId: 'missing' }];
        return [r];
      },
    ],
    [
      'line on article',
      r => {
        r.links = [{ recordId: r.id, position: 1 }];
        return [r];
      },
    ],
    [
      'ready links to draft',
      r => {
        const draft = { ...article(), id: 'article-draft', status: 'draft' };
        r.relatedIds = [draft.id];
        return [r, draft];
      },
    ],
    [
      'invented review field',
      r => {
        r.review = { status: 'accepted' };
        return [r];
      },
    ],
    [
      'missing lesson figure',
      r => {
        r.entries[0].target = { kind: 'figure', recordId: r.id, id: 'missing' };
        return [r];
      },
    ],
    [
      'fabricated specification',
      r => {
        r.entries[0].references = [{ documentPath: '../secret', section: 'Test' }];
        return [r];
      },
    ],
  ])('rejects %s', (_name, change) =>
    expect(() => validateCorpus(change(article()), sources)).toThrow(),
  );
  it('allows a record-scoped section link', () => {
    const r = article();
    r.links = [{ recordId: r.id, sectionId: 'intro' }];
    expect(() => validateCorpus([r], sources)).not.toThrow();
  });
  it('requires ordered matching six-line structure', () => {
    const lower = {
      id: 'trigram-water',
      type: 'trigram',
      title: 'Khảm',
      status: 'ready',
      entries: article().entries,
      lines: ['yin', 'yang', 'yin'],
      symbol: '☵',
      element: 'water',
    };
    const upper = {
      ...lower,
      id: 'trigram-heaven',
      title: 'Càn',
      lines: ['yang', 'yang', 'yang'],
      symbol: '☰',
      element: 'metal',
    };
    const r = {
      ...article(),
      id: 'hexagram-06',
      type: 'hexagram',
      kingWenNumber: 6,
      lowerTrigramId: lower.id,
      upperTrigramId: upper.id,
      lines: [...lower.lines, ...upper.lines].map((polarity, index) => ({
        position: index + 1,
        polarity,
        label: 'Hào',
        entries: article().entries.map(({ id, ...entry }) => entry),
      })),
    };
    expect(() => validateCorpus([lower, upper, r], sources)).not.toThrow();
    const bad = structuredClone(r);
    bad.lines[0].polarity = 'yang';
    expect(() => validateCorpus([lower, upper, bad], sources)).toThrow(/polarity/);
    const order = structuredClone(r);
    order.lines.reverse();
    expect(() => validateCorpus([lower, upper, order], sources)).toThrow(/order/);
    const short = structuredClone(r);
    short.lines.pop();
    expect(() => validateCorpus([lower, upper, short], sources)).toThrow();
    r.links = [{ recordId: r.id, position: 1, sectionId: 'intro' }];
    expect(() => validateCorpus([lower, upper, r], sources)).toThrow(/ambiguous/);
  });
  it('publishes only ready assets and excludes local PDF information from metadata', () => {
    const draft = { ...article(), id: 'article-draft', status: 'draft' };
    const result = projectCorpus([article(), draft], sources, bibliography);
    expect(result.ready.map(r => r.id)).toEqual(['article-test']);
    expect(result.metadata).toHaveLength(1);
    expect(JSON.stringify(result.metadata)).not.toMatch(/localInputPath|sha256|private|review/);
    expect(result.metadata[0].asset).toBe('knowledge/article-test.json');
  });
});
