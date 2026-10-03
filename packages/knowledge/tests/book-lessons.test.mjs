import { describe, expect, it } from 'vitest';
import { checkCorpus } from '../scripts/corpus-checks.mjs';

const citation = {
  id: 'citation-fixture',
  sourceId: 'source-fixture',
  editionId: 'edition-fixture',
  location: { chapter: 'Fixture', section: 'Fixture', pdfPageStart: 1, pdfPageEnd: 1 },
  textLayer: 'original-text',
};
const source = {
  id: 'source-fixture',
  title: 'Synthetic source',
  author: 'Fixture',
  contributors: [],
  editions: [
    {
      id: 'edition-fixture',
      label: 'Fixture',
      sha256: '0'.repeat(64),
      pdfPageCount: 1,
      localInputPath: 'synthetic.pdf',
      publication: { publisher: null, year: null, note: '' },
      rights: { status: 'unconfirmed', use: 'research-only', note: '' },
    },
  ],
};
const rights = { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' };
const reviewed = {
  status: 'reviewed',
  reviewer: 'Synthetic fixture',
  reviewedAt: '2026-01-01',
  method: 'source-comparison',
  evidenceCitationIds: ['citation-fixture'],
  evidenceClaimIds: ['claim-support'],
  note: 'Synthetic fixture, not approval.',
};
const topic = { id: 'topic-fixture', title: 'Synthetic topic', track: 'shared', status: 'partial' };
const claim = id => ({
  id,
  kind: 'structural-fact',
  text: 'Synthetic claim.',
  citationIds: ['citation-fixture'],
});

function fixture(changes = {}) {
  const support = {
    schemaVersion: 2,
    id: 'article-support',
    type: 'article',
    title: 'Synthetic support',
    aliases: [],
    topicIds: ['topic-fixture'],
    claims: [claim('claim-support')],
    relatedIds: [],
    review: reviewed,
    rights,
    tables: [
      {
        kind: 'coin-outcomes',
        id: 'table-support',
        claimIds: ['claim-support'],
        sourceUnitIds: ['unit-synthetic'],
        rows: [
          { sapCount: 0, nguaCount: 3, lineClass: 'young-yin', polarity: 'yin', changing: false },
          { sapCount: 1, nguaCount: 2, lineClass: 'young-yang', polarity: 'yang', changing: false },
          { sapCount: 2, nguaCount: 1, lineClass: 'young-yin', polarity: 'yin', changing: false },
          { sapCount: 3, nguaCount: 0, lineClass: 'young-yang', polarity: 'yang', changing: false },
        ],
      },
    ],
    figures: [
      {
        id: 'figure-support',
        kind: 'board',
        title: 'Synthetic figure',
        sourceUnitIds: ['unit-synthetic'],
        labels: [{ id: 'label-support', text: 'Synthetic label', claimIds: ['claim-support'] }],
        claimIds: ['claim-support'],
        inspectionStatus: 'visually-inspected',
      },
    ],
  };
  const lesson = {
    schemaVersion: 2,
    id: 'lesson-fixture',
    type: 'lesson',
    title: 'Synthetic lesson',
    aliases: [],
    topicIds: ['topic-fixture'],
    claims: [claim('claim-lesson')],
    relatedIds: [],
    review: { ...reviewed, evidenceClaimIds: ['claim-support'] },
    rights,
    sequence: 1,
    prerequisiteLessonIds: [],
    blocks: [
      {
        id: 'block-prose',
        position: 1,
        kind: 'prose',
        text: 'Synthetic prose.',
        supportingClaimIds: ['claim-support'],
      },
      {
        id: 'block-table',
        position: 2,
        kind: 'table',
        target: { kind: 'table', recordId: 'article-support', id: 'table-support' },
        supportingClaimIds: ['claim-support'],
      },
      {
        id: 'block-figure',
        position: 3,
        kind: 'figure',
        target: { kind: 'figure', recordId: 'article-support', id: 'figure-support' },
        supportingClaimIds: ['claim-support'],
      },
    ],
    ...changes,
  };
  const records = [support, lesson];
  const released = records
    .filter(record => record.review.status === 'reviewed')
    .map(record => record.id);
  return {
    manifest: {
      schemaVersion: 1,
      corpusId: 'synthetic-fixture',
      language: 'vi',
      sourceFile: 'sources.json',
      citationFiles: [],
      recordFiles: [],
      releaseIds: released,
      topics: [topic],
      coverageAuthors: ['Fixture'],
      nextBatch: { hexagramIds: [], topicIds: [], note: 'Synthetic only.' },
    },
    sources: [source],
    citations: [citation],
    records,
    legacy: { catalog: { entities: [], terms: [], rules: [] } },
  };
}
const check = data => checkCorpus(data);

describe('lesson graph and typed target contracts', () => {
  it('accepts ordered blocks, prerequisites, evidence coverage, and typed targets', () => {
    expect(() => check(fixture())).not.toThrow();
  });

  it.each([
    ['non-positive sequence', { sequence: 0 }, /positive integer/],
    [
      'duplicate block position',
      {
        blocks: [
          {
            id: 'block-prose',
            position: 2,
            kind: 'prose',
            text: 'Synthetic',
            supportingClaimIds: ['claim-support'],
          },
        ],
      },
      /position must be 1/,
    ],
    ['missing prerequisite', { prerequisiteLessonIds: ['lesson-missing'] }, /missing prerequisite/],
    [
      'duplicate prerequisite',
      { prerequisiteLessonIds: ['lesson-other', 'lesson-other'] },
      /duplicate prerequisite/,
    ],
    [
      'prerequisite cycle',
      { prerequisiteLessonIds: ['lesson-fixture'] },
      /prerequisite lesson cycle/,
    ],
    [
      'unknown block evidence',
      {
        blocks: [
          {
            id: 'block-prose',
            position: 1,
            kind: 'prose',
            text: 'Synthetic',
            supportingClaimIds: ['claim-missing'],
          },
        ],
      },
      /unknown claim/,
    ],
    [
      'review evidence omits block support',
      { review: { ...reviewed, evidenceClaimIds: ['claim-lesson'] } },
      /review evidence omits/,
    ],
    [
      'table target missing in declared owner',
      {
        blocks: [
          {
            id: 'block-table',
            position: 1,
            kind: 'table',
            target: { kind: 'table', recordId: 'article-support', id: 'table-other' },
            supportingClaimIds: ['claim-support'],
          },
        ],
      },
      /table target ID table-other is not record-scoped/,
    ],
    [
      'wrong figure target owner',
      {
        blocks: [
          {
            id: 'block-figure',
            position: 1,
            kind: 'figure',
            target: { kind: 'figure', recordId: 'lesson-fixture', id: 'figure-support' },
            supportingClaimIds: ['claim-support'],
          },
        ],
      },
      /missing figure target/,
    ],
    [
      'wrong target kind',
      {
        blocks: [
          {
            id: 'block-table',
            position: 1,
            kind: 'table',
            target: { kind: 'figure', recordId: 'article-support', id: 'figure-support' },
            supportingClaimIds: ['claim-support'],
          },
        ],
      },
      /target kind does not match/,
    ],
    [
      'target evidence omits block support',
      {
        blocks: [
          {
            id: 'block-figure',
            position: 1,
            kind: 'figure',
            target: { kind: 'figure', recordId: 'article-support', id: 'figure-support' },
            supportingClaimIds: ['claim-lesson'],
          },
        ],
      },
      /does not include support claim/,
    ],
  ])('rejects %s', (_label, changes, error) => {
    expect(() => check(fixture(changes))).toThrow(error);
  });

  it('rejects duplicate lesson sequence across owners', () => {
    const data = fixture();
    const second = structuredClone(data.records[1]);
    second.id = 'lesson-second';
    second.sequence = 1;
    second.claims = [{ ...claim('claim-second') }];
    data.records.push(second);
    data.manifest.releaseIds.push(second.id);
    expect(() => check(data)).toThrow(/duplicate lesson sequence/);
  });

  it('rejects a reviewed lesson when its declared block support is not covered', () => {
    const data = fixture();
    const lesson = data.records[1];
    lesson.review.evidenceClaimIds = ['claim-lesson'];
    expect(() => check(data)).toThrow(/review evidence omits block support claim claim-support/);
  });
});
