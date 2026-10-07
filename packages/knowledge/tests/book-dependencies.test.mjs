import { describe, expect, it } from 'vitest';
import { checkCorpus } from '../scripts/corpus-checks.mjs';

const topic = { id: 'topic-fixture', title: 'Synthetic topic', track: 'shared', status: 'partial' };
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
      localInputPath: 'synthetic-only.pdf',
      publication: { publisher: null, year: null, note: '' },
      rights: { status: 'unconfirmed', use: 'research-only', note: '' },
    },
  ],
};
const rights = { basis: 'original-summary-and-structured-facts', license: 'All Rights Reserved' };
const reviewed = {
  status: 'reviewed',
  reviewer: 'Fixture only',
  reviewedAt: '2026-01-01',
  method: 'source-comparison',
  evidenceCitationIds: ['citation-fixture'],
  note: 'Synthetic fixture; not approval.',
};
const claim = (id, extras = {}) => ({
  id,
  kind: 'structural-fact',
  text: 'Synthetic evidence only.',
  citationIds: ['citation-fixture'],
  ...extras,
});
const record = (id, claims, fields = {}) => ({
  schemaVersion: 2,
  id,
  type: 'article',
  title: 'Synthetic record',
  aliases: [],
  topicIds: ['topic-fixture'],
  claims,
  relatedIds: [],
  review: reviewed,
  rights,
  ...fields,
});

function createCorpus(records) {
  const released = records.filter(item => item.review.status === 'reviewed').map(item => item.id);
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

const check = records => checkCorpus(createCorpus(records));

describe('claim dependency and evidence contracts', () => {
  it('does not let claim review evidence substitute for book citation review', () => {
    const owner = record('article-owner', [claim('claim-owner')], {
      review: { ...reviewed, evidenceClaimIds: ['claim-owner'] },
    });
    delete owner.review.evidenceCitationIds;
    expect(() => check([owner])).toThrow(/review evidence omits citation-fixture/);
  });

  it('accepts cross-record reviewed selected support and repeated source units', () => {
    const support = record('article-support', [claim('claim-support')]);
    const owner = record(
      'article-owner',
      [claim('claim-owner', { dependsOnClaimIds: ['claim-support'] })],
      {
        figures: [
          {
            id: 'figure-owner',
            kind: 'board',
            title: 'Synthetic figure',
            sourceUnitIds: ['unit-synthetic', 'unit-synthetic'],
            labels: [{ id: 'label-owner', text: 'Synthetic label', claimIds: ['claim-support'] }],
            claimIds: ['claim-support'],
            inspectionStatus: 'visually-inspected',
            orientation: { description: 'Synthetic orientation', claimIds: ['claim-support'] },
            authorAlternatives: [
              {
                author: 'Fixture',
                description: 'Synthetic alternative',
                claimIds: ['claim-support'],
              },
            ],
          },
        ],
      },
    );
    expect(() => check([support, owner])).not.toThrow();
  });

  it('accepts a corpus containing unchanged V1 and new V2 record shapes', () => {
    const versionOneClaim = { ...claim('claim-v1'), citationIds: ['citation-fixture'] };
    const v1 = {
      schemaVersion: 1,
      id: 'article-v1-fixture',
      type: 'article',
      title: 'Synthetic V1 record',
      aliases: [],
      topicIds: ['topic-fixture'],
      claims: [versionOneClaim],
      relatedIds: [],
      review: reviewed,
      rights,
    };
    const v2 = record('article-v2-fixture', [claim('claim-v2')]);
    expect(() => check([v1, v2])).not.toThrow();
  });

  it.each([
    [
      'missing referenced claim',
      records => {
        records[1].claims[0].dependsOnClaimIds = ['claim-missing'];
      },
      /unknown claim/,
    ],
    [
      'self dependency',
      records => {
        records[0].claims[0].dependsOnClaimIds = ['claim-support'];
      },
      /dependency cycle/,
    ],
    [
      'multi-node dependency cycle',
      records => {
        records[0].claims[0].dependsOnClaimIds = ['claim-owner'];
        records[1].claims[0].dependsOnClaimIds = ['claim-support'];
      },
      /dependency cycle/,
    ],
    [
      'draft support',
      records => {
        records[0].review = { status: 'draft' };
        records[1].claims[0].dependsOnClaimIds = ['claim-support'];
      },
      /non-reviewed record/,
    ],
    [
      'missing table support',
      records => {
        records[1].tables = [{ kind: 'coin-outcomes', claimIds: ['claim-missing'], rows: [] }];
      },
      /unknown claim/,
    ],
    [
      'missing table alternative evidence',
      records => {
        records[1].tables = [
          {
            kind: 'coin-outcomes',
            claimIds: ['claim-owner'],
            rows: [],
            id: 'table-owner',
            sourceUnitIds: ['unit-synthetic'],
            authorAlternatives: [
              { author: 'Fixture', description: 'Synthetic', claimIds: ['claim-missing'] },
            ],
          },
        ];
      },
      /unknown claim/,
    ],
  ])('rejects %s', (_label, mutate, error) => {
    const records = [
      record('article-support', [claim('claim-support')]),
      record('article-owner', [claim('claim-owner')]),
    ];
    mutate(records);
    expect(() => check(records)).toThrow(error);
  });

  it('requires every evidence reference surface to resolve', () => {
    const owner = record('article-owner', [claim('claim-owner')], {
      structure: {
        lineOrder: 'bottom-to-top',
        lines: ['yin', 'yang', 'yin'],
        claimIds: ['claim-missing'],
      },
    });
    expect(() => check([owner])).toThrow(/unknown claim/);
  });

  it('rejects duplicate table IDs within one record', () => {
    const owner = record('article-table-owner', [claim('claim-table-owner')], {
      tables: [
        { id: 'table-fixture', kind: 'coin-outcomes', rows: [], claimIds: ['claim-table-owner'] },
        { id: 'table-fixture', kind: 'coin-outcomes', rows: [], claimIds: ['claim-table-owner'] },
      ],
    });
    expect(() => check([owner])).toThrow(/duplicate article-table-owner table ID table-fixture/);
  });

  it('validates table source-unit identifiers without rejecting repeats', () => {
    const owner = record('article-source-units', [claim('claim-source-units')], {
      tables: [
        {
          id: 'table-source-units',
          kind: 'coin-outcomes',
          claimIds: ['claim-source-units'],
          sourceUnitIds: ['unit-synthetic', 'unit-synthetic'],
          rows: [
            { sapCount: 0, nguaCount: 3, lineClass: 'young-yin', polarity: 'yin', changing: false },
            {
              sapCount: 1,
              nguaCount: 2,
              lineClass: 'young-yang',
              polarity: 'yang',
              changing: false,
            },
            { sapCount: 2, nguaCount: 1, lineClass: 'young-yin', polarity: 'yin', changing: false },
            {
              sapCount: 3,
              nguaCount: 0,
              lineClass: 'young-yang',
              polarity: 'yang',
              changing: false,
            },
          ],
        },
      ],
    });
    expect(() => check([owner])).not.toThrow();
    owner.tables[0].sourceUnitIds = [' '];
    expect(() => check([owner])).toThrow(/sourceUnitIds must contain non-empty IDs/);
  });

  it('rejects an unreleased transitive claim dependency', () => {
    const draft = record('article-draft-support', [claim('claim-draft')]);
    const middle = record(
      'article-middle-support',
      [claim('claim-middle', { dependsOnClaimIds: ['claim-draft'] })],
      { review: reviewed },
    );
    const owner = record('article-owner', [
      claim('claim-owner', { dependsOnClaimIds: ['claim-middle'] }),
    ]);
    const corpus = createCorpus([draft, middle, owner]);
    corpus.manifest.releaseIds = ['article-middle-support', 'article-owner'];
    expect(() => checkCorpus(corpus)).toThrow(/unselected claim claim-draft/);
  });
});
