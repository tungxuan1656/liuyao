import { describe, expect, it } from 'vitest';
import { validateCorpus } from '../scripts/content-validation.mjs';
import { projectCorpus } from '../scripts/release-projection.mjs';
import { getContentTableId } from '../src/content-structure.ts';

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
  it('rejects table and entry IDs that share an HTML target', () => {
    const r = article();
    r.entries[0].id = 'table-branch-elements';
    r.tables = [
      {
        kind: 'branch-elements',
        references: [reference()],
        rows: [{ branchId: 'term-ty', element: 'water' }],
      },
    ];
    expect(() => validateCorpus([r], sources)).toThrow(/duplicate.*ID/);
  });
  it('resolves authored table IDs consistently and rejects the unused fallback', () => {
    const r = article();
    const table = {
      id: 'custom-table',
      kind: 'branch-elements',
      references: [reference()],
      rows: [{ branchId: 'term-ty', element: 'water' }],
    };
    r.tables = [table];
    r.entries[0].target = { kind: 'table', recordId: r.id, id: getContentTableId(table) };
    expect(getContentTableId(table)).toBe('custom-table');
    expect(getContentTableId({ ...table, id: undefined })).toBe('table-branch-elements');
    expect(() => validateCorpus([r], sources)).not.toThrow();
    r.entries[0].target.id = 'table-branch-elements';
    expect(() => validateCorpus([r], sources)).toThrow(/unknown lesson target/);
    r.entries[0].target.id = 'custom-table';
    r.tables.push({ ...table });
    expect(() => validateCorpus([r], sources)).toThrow(/duplicate.*ID/);
  });
  it('rejects entry and figure IDs that share an HTML target', () => {
    const r = article();
    r.figures = [
      {
        id: 'intro',
        kind: 'diagram',
        title: 'Diagram',
        references: [reference()],
        orientation: { description: 'North up', references: [reference()] },
        labels: [{ id: 'north', text: 'North', references: [reference()] }],
      },
    ];
    expect(() => validateCorpus([r], sources)).toThrow(/duplicate.*ID/);
  });
  it('collects sources used only by tables and nested figure content', () => {
    const r = article();
    const extra = ['table', 'figure', 'orientation', 'label', 'alternative'].map(name => ({
      ...sources[0],
      id: `source-${name}`,
    }));
    const ref = name => ({ sourceId: `source-${name}`, pdfPages: [1, 2] });
    r.tables = [
      {
        kind: 'branch-elements',
        references: [ref('table')],
        rows: [{ branchId: 'term-ty', element: 'water' }],
      },
    ];
    r.figures = [
      {
        id: 'diagram',
        kind: 'diagram',
        title: 'Diagram',
        references: [ref('figure')],
        orientation: { description: 'North up', references: [ref('orientation')] },
        labels: [{ id: 'north', text: 'North', references: [ref('label')] }],
        authorAlternatives: [
          { author: 'Author', description: 'Alternative', references: [ref('alternative')] },
        ],
      },
    ];
    validateCorpus([r], [...sources, ...extra]);
    const result = projectCorpus([r], [...sources, ...extra], bibliography);
    expect(result.metadata[0].sourceIds).toEqual([
      'source-book-test',
      ...extra.map(source => source.id),
    ]);
  });
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
        entries: article().entries.map(({ id: _id, ...entry }) => entry),
      })),
    };
    expect(() => validateCorpus([lower, upper, r], sources)).not.toThrow();
    const bad = structuredClone(r);
    bad.lines[0].polarity = 'yang';
    expect(() => validateCorpus([lower, upper, bad], sources)).toThrow(/polarity/);
    const order = structuredClone(r);
    order.lines.reverse();
    expect(() => validateCorpus([lower, upper, order], sources)).toThrow(/order/);
    const repeatedPosition = structuredClone(r);
    repeatedPosition.lines[1].position = 1;
    expect(() => validateCorpus([lower, upper, repeatedPosition], sources)).toThrow(
      /duplicate content anchor ID/,
    );
    const missingLineReference = structuredClone(r);
    missingLineReference.lines[0].entries[0].references = [];
    expect(() => validateCorpus([lower, upper, missingLineReference], sources)).toThrow();
    const invalidLinePage = structuredClone(r);
    invalidLinePage.lines[0].entries[0].references[0].pdfPages = [99, 101];
    expect(() => validateCorpus([lower, upper, invalidLinePage], sources)).toThrow(
      /invalid PDF page bounds/,
    );
    const short = structuredClone(r);
    short.lines.pop();
    expect(() => validateCorpus([lower, upper, short], sources)).toThrow();
    const duplicate = structuredClone(r);
    duplicate.entries[0].id = 'line-1';
    expect(() => validateCorpus([lower, upper, duplicate], sources)).toThrow(/duplicate.*ID/);
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
