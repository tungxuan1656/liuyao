import type { BookFigure, BookRecordV2 } from '../../src/book-schema-v2.js';

const shared = {
  schemaVersion: 2 as const,
  title: 'Synthetic fixture',
  aliases: [],
  topicIds: ['topic-fixture'],
  claims: [
    {
      id: 'claim-fixture',
      kind: 'structural-fact' as const,
      text: 'Synthetic evidence only.',
      citationIds: ['citation-fixture'] as const,
    },
  ],
  relatedIds: [],
  review: { status: 'draft' as const },
  rights: {
    basis: 'original-summary-and-structured-facts' as const,
    license: 'All Rights Reserved' as const,
  },
};

const figures = (['sequence', 'placement', 'transformation', 'board', 'plate'] as const).map(
  (kind, index): BookFigure => {
    const id = `figure-fixture-${index}` as `figure-${string}`;
    if (kind === 'plate') {
      return {
        id,
        kind,
        title: 'Synthetic figure fixture',
        sourceUnitIds: [],
        labels: [],
        claimIds: [],
        inspectionStatus: 'uninspected',
      };
    }
    return {
      id,
      kind,
      title: 'Synthetic figure fixture',
      sourceUnitIds: ['unit-fixture'],
      labels: [
        {
          id: `label-${index}`,
          text: 'Synthetic label',
          claimIds: ['claim-fixture'] as const,
        },
      ],
      claimIds: ['claim-fixture'],
      inspectionStatus: 'uninspected',
      ...(kind === 'board'
        ? {
            orientation: {
              description: 'Synthetic orientation.',
              claimIds: ['claim-fixture'] as const,
            },
            authorAlternatives: [
              {
                author: 'Synthetic author',
                description: 'Synthetic alternative.',
                claimIds: ['claim-fixture'] as const,
              },
            ],
          }
        : {}),
    };
  },
);

const records = [
  {
    ...shared,
    id: 'trigram-heaven',
    type: 'trigram',
    structure: {
      lineOrder: 'bottom-to-top',
      lines: ['yang', 'yang', 'yang'],
      claimIds: ['claim-fixture'],
      symbol: '☰',
      element: 'metal',
    },
    figures,
  },
  {
    ...shared,
    id: 'hexagram-01',
    type: 'hexagram',
    structure: {
      lineOrder: 'bottom-to-top',
      lines: ['yang', 'yang', 'yang', 'yang', 'yang', 'yang'],
      claimIds: ['claim-fixture'],
      kingWenNumber: 1,
      upperTrigramId: 'trigram-heaven',
      lowerTrigramId: 'trigram-heaven',
    },
    claims: [
      {
        id: 'claim-fixture',
        kind: 'structural-fact',
        text: 'Synthetic evidence only.',
        citationIds: ['citation-fixture'] as const,
      },
    ],
    lines: Array.from({ length: 6 }, (_, index) => ({
      position: index + 1,
      polarity: 'yang' as const,
      label: `Synthetic line ${index + 1}`,
      claims: [
        {
          id: 'claim-fixture',
          kind: 'structural-fact',
          text: 'Synthetic evidence only.',
          citationIds: ['citation-fixture'] as const,
        },
      ],
    })),
    specialPassages: [],
  },
  { ...shared, id: 'term-fixture', type: 'term' },
  {
    ...shared,
    id: 'rule-fixture',
    type: 'rule',
    ruleset: 'liuyao-standard-v1',
    category: 'metadata',
  },
  {
    ...shared,
    id: 'article-fixture',
    type: 'article',
    tables: [
      {
        kind: 'coin-outcomes',
        claimIds: ['claim-fixture'] as const,
        rows: [
          { sapCount: 0, nguaCount: 3, lineClass: 'young-yin', polarity: 'yin', changing: false },
        ],
        id: 'table-fixture',
        sourceUnitIds: ['unit-fixture'],
        authorAlternatives: [
          {
            author: 'Synthetic author',
            description: 'Synthetic alternative',
            claimIds: ['claim-fixture'] as const,
          },
        ],
      },
    ],
  },
  {
    ...shared,
    id: 'lesson-fixture',
    type: 'lesson',
    sequence: 1,
    prerequisiteLessonIds: [],
    blocks: [
      {
        id: 'block-prose',
        position: 1,
        kind: 'prose',
        text: 'Synthetic prose.',
        supportingClaimIds: ['claim-fixture'],
      },
      {
        id: 'block-table',
        position: 2,
        kind: 'table',
        target: { kind: 'table', recordId: 'article-fixture', id: 'table-fixture' },
        supportingClaimIds: ['claim-fixture'],
      },
      {
        id: 'block-figure',
        position: 3,
        kind: 'figure',
        target: { kind: 'figure', recordId: 'trigram-heaven', id: 'figure-fixture-0' },
        supportingClaimIds: ['claim-fixture'],
      },
    ],
  },
] satisfies readonly BookRecordV2[];

export const bookV2Fixtures = records;

export const projectConventionFixture = {
  ...shared,
  id: 'article-convention-fixture',
  type: 'article',
  claims: [
    {
      id: 'claim-project-convention',
      kind: 'project-convention',
      text: 'Synthetic project convention only.',
      citationIds: [] as const,
      projectEvidence: [
        { documentPath: 'docs/example.md', section: '## Example', revision: 'test-revision' },
      ],
    },
  ],
} satisfies BookRecordV2;
