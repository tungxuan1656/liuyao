import { describe, expect, it } from 'vitest';
import { checkCorpus } from '../scripts/corpus-checks.mjs';

const baseClaim = {
  id: 'claim-fixture',
  kind: 'structural-fact',
  text: 'Synthetic claim.',
  citationIds: ['citation-fixture'],
};
const figure = {
  id: 'figure-fixture',
  kind: 'board',
  title: 'Synthetic figure',
  sourceUnitIds: ['unit-synthetic'],
  labels: [{ id: 'label-fixture', text: 'Synthetic label', claimIds: ['claim-fixture'] }],
  claimIds: ['claim-fixture'],
  inspectionStatus: 'visually-inspected',
};
const record = (id, fields = {}) => ({
  schemaVersion: 2,
  id,
  type: 'article',
  title: 'Synthetic record',
  aliases: [],
  topicIds: ['topic-fixture'],
  claims: [{ ...baseClaim }],
  relatedIds: [],
  review: {
    status: 'reviewed',
    reviewer: 'Synthetic',
    reviewedAt: '2026-01-01',
    method: 'source-comparison',
    evidenceCitationIds: ['citation-fixture'],
    note: 'Synthetic test only.',
  },
  rights: { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' },
  ...fields,
});
function check(records) {
  const released = records.filter(item => item.review.status === 'reviewed').map(item => item.id);
  return checkCorpus({
    manifest: {
      schemaVersion: 1,
      corpusId: 'synthetic-fixture',
      language: 'vi',
      sourceFile: 'sources.json',
      citationFiles: [],
      recordFiles: [],
      releaseIds: released,
      topics: [{ id: 'topic-fixture', title: 'Synthetic', track: 'shared', status: 'partial' }],
      coverageAuthors: ['Synthetic'],
      nextBatch: { hexagramIds: [], topicIds: [], note: 'Synthetic.' },
    },
    sources: [
      {
        id: 'source-fixture',
        title: 'Synthetic',
        author: 'Synthetic',
        contributors: [],
        editions: [
          {
            id: 'edition-fixture',
            label: 'Synthetic',
            sha256: '0'.repeat(64),
            pdfPageCount: 1,
            localInputPath: 'synthetic.pdf',
            publication: { publisher: null, year: null, note: '' },
            rights: { status: 'unconfirmed', use: 'research-only', note: '' },
          },
        ],
      },
    ],
    citations: [
      {
        id: 'citation-fixture',
        sourceId: 'source-fixture',
        editionId: 'edition-fixture',
        location: { chapter: 'Synthetic', section: 'Synthetic', pdfPageStart: 1, pdfPageEnd: 1 },
        textLayer: 'original-text',
      },
    ],
    records,
    legacy: { catalog: { entities: [], terms: [], rules: [] } },
  });
}

describe('figure evidence and release gates', () => {
  it('accepts ordered labels and repeated source-unit references', () => {
    const repeated = { ...figure, sourceUnitIds: ['unit-synthetic', 'unit-synthetic'] };
    expect(() => check([record('article-figure', { figures: [repeated] })])).not.toThrow();
  });

  it.each([
    ['empty non-plate inventory', { ...figure, sourceUnitIds: [] }, /needs sourceUnitIds/],
    ['empty figure claims', { ...figure, claimIds: [] }, /needs claimIds/],
    ['empty labels', { ...figure, labels: [] }, /needs ordered labels/],
    [
      'label without evidence',
      { ...figure, labels: [{ ...figure.labels[0], claimIds: [] }] },
      /label needs claimIds/,
    ],
    [
      'unknown orientation evidence',
      { ...figure, orientation: { description: 'Synthetic', claimIds: ['claim-missing'] } },
      /unknown claim/,
    ],
    [
      'unknown alternative evidence',
      {
        ...figure,
        authorAlternatives: [
          { author: 'Synthetic', description: 'Synthetic', claimIds: ['claim-missing'] },
        ],
      },
      /unknown claim/,
    ],
    [
      'duplicate label IDs',
      { ...figure, labels: [{ ...figure.labels[0] }, { ...figure.labels[0] }] },
      /duplicate figure-fixture label ID/,
    ],
  ])('rejects %s', (_label, invalid, error) => {
    expect(() => check([record('article-figure', { figures: [invalid] })])).toThrow(error);
  });

  it('rejects release of uninspected plates and global figure ID collisions', () => {
    const plate = {
      id: 'figure-plate',
      kind: 'plate',
      title: 'Synthetic placeholder',
      sourceUnitIds: [],
      labels: [],
      claimIds: [],
      inspectionStatus: 'uninspected',
    };
    expect(() => check([record('article-plate', { figures: [plate] })])).toThrow(
      /not visually inspected/,
    );
    const duplicate = { ...figure, id: 'article-collision' };
    expect(() => check([record('article-collision', { figures: [duplicate] })])).toThrow(
      /duplicate corpus ID/,
    );
  });

  it('rejects two figures that reuse an ID across records', () => {
    const first = record('article-first', { figures: [{ ...figure }] });
    const second = record('article-second', {
      figures: [{ ...figure, id: 'figure-second' }],
    });
    second.claims[0].id = 'claim-second';
    second.figures[0].claimIds = ['claim-second'];
    second.figures[0].labels[0].claimIds = ['claim-second'];
    second.figures[0].id = figure.id;
    expect(() => check([first, second])).toThrow(/duplicate corpus ID figure-fixture/);
  });
});
