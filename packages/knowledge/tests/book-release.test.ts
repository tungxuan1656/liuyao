import { afterEach, describe, expect, it, vi } from 'vitest';
import manifest from '../data/manifest.json';
import draft from '../data/casting/three-coins.json';
import { assertEligibleRelease } from '../src/book-release-checks';
import type { BookCitation, BookClaim, BookRecordV1, BookReview } from '../src/book-schema';
import type { ReleasedBookManifest, ReleasedBookSource } from '../src/book-schema-v2';
import { createSnapshotIdentity } from '../scripts/snapshot-identity.mjs';

type MutableReleaseRecord<T> = T extends BookRecordV1
  ? Omit<T, 'claims' | 'review'> & {
      claims: Array<Omit<BookClaim, 'citationIds'> & { citationIds: string[] }>;
      review: Omit<BookReview, 'evidenceCitationIds'> & { evidenceCitationIds?: string[] };
    }
  : never;

afterEach(() => {
  vi.doUnmock('../src/book-data.generated.js');
  vi.resetModules();
});

async function release(
  status: string,
  selected: boolean,
  recordOverride?: unknown,
): Promise<typeof import('../src/book-catalog')> {
  vi.resetModules();
  vi.doMock('../src/book-data.generated.js', () => ({
    BOOK_RECORDS: selected
      ? [recordOverride ?? { ...draft, review: { ...draft.review, status } }]
      : [],
    BOOK_MANIFEST: {
      ...manifest,
      recordSchemaVersions: selected
        ? [(recordOverride as { schemaVersion?: number } | undefined)?.schemaVersion ?? 1]
        : [],
      releaseIds: selected ? [(recordOverride as { id?: string } | undefined)?.id ?? draft.id] : [],
      snapshotIdentity: 'liuyao-knowledge-snapshot-v1:sha256:' + '0'.repeat(64),
      topics: manifest.topics,
      projectContracts: [],
    },
    BOOK_SNAPSHOT_IDENTITY: 'liuyao-knowledge-snapshot-v1:sha256:' + '0'.repeat(64),
    BOOK_CITATIONS: [],
    BOOK_SOURCES: [],
  }));
  return import('../src/book-catalog');
}

function lesson(evidenceClaimIds?: string[]) {
  return {
    schemaVersion: 2,
    id: 'lesson-runtime',
    type: 'lesson',
    title: 'Synthetic runtime lesson',
    aliases: [],
    topicIds: [manifest.topics[0]!.id],
    claims: [
      {
        id: 'claim-block-support-1',
        kind: 'structural-fact',
        text: 'Synthetic direct support.',
        citationIds: [],
        dependsOnClaimIds: ['claim-transitive-support'],
      },
      {
        id: 'claim-block-support-2',
        kind: 'structural-fact',
        text: 'Synthetic second direct support.',
        citationIds: [],
      },
      {
        id: 'claim-transitive-support',
        kind: 'structural-fact',
        text: 'Synthetic transitive support.',
        citationIds: [],
      },
    ],
    relatedIds: [],
    review: { status: 'reviewed', evidenceClaimIds },
    rights: {
      basis: 'original-summary-and-structured-facts',
      license: 'All Rights Reserved',
    },
    sequence: 1,
    prerequisiteLessonIds: [],
    blocks: [
      {
        id: 'block-prose',
        position: 1,
        kind: 'prose',
        text: 'Synthetic lesson content.',
        supportingClaimIds: ['claim-block-support-1', 'claim-block-support-2'],
      },
    ],
  };
}

describe('book API release selection', () => {
  it('withholds draft and unselected reviewed records', async () => {
    const api = await release('draft', false);
    expect(api.listBookRecords()).toEqual([]);
    expect(api.getBookRecord(draft.id)).toBeUndefined();
  });

  it.each(['draft', 'disputed', 'superseded'])(
    'rejects selected %s content at runtime',
    async status => {
      await expect(release(status, true)).rejects.toThrow('Ineligible book release');
    },
  );

  it('rejects a released lesson with missing review evidence', async () => {
    await expect(release('reviewed', true, lesson())).rejects.toThrow(
      /lesson-runtime lesson review has no evidence claims/,
    );
  });

  it('rejects lesson review evidence that omits block support', async () => {
    await expect(
      release('reviewed', true, lesson(['claim-transitive-support', 'claim-block-support-2'])),
    ).rejects.toThrow(/lesson-runtime review omits block support claim claim-block-support-1/);
  });

  it('rejects lesson review evidence that omits transitive support', async () => {
    await expect(
      release('reviewed', true, lesson(['claim-block-support-1', 'claim-block-support-2'])),
    ).rejects.toThrow(/lesson-runtime review omits block support claim claim-transitive-support/);
  });

  it('accepts lesson review evidence covering direct and transitive block support', async () => {
    await expect(
      release(
        'reviewed',
        true,
        lesson(['claim-block-support-1', 'claim-block-support-2', 'claim-transitive-support']),
      ),
    ).resolves.toBeDefined();
  });
});

describe('runtime release validation and semantic snapshot identity', () => {
  it('rejects a tampered selected-record membership, broken citation links, and unreviewed records', () => {
    const record = structuredClone(draft) as unknown as MutableReleaseRecord<BookRecordV1>;
    const runtimeManifest: ReleasedBookManifest = {
      schemaVersion: 1,
      recordSchemaVersions: [1],
      corpusId: manifest.corpusId,
      language: 'vi' as const,
      releaseIds: [record.id],
      snapshotIdentity: 'liuyao-knowledge-snapshot-v1:sha256:' + '0'.repeat(64),
      topics: [
        {
          id: record.topicIds[0]!,
          title: 'Synthetic runtime topic',
          track: 'shared',
          status: 'partial',
        },
      ],
      projectContracts: [],
    };
    const citation: BookCitation = {
      id: 'citation-runtime',
      sourceId: 'source-runtime',
      editionId: 'edition-runtime',
      location: { chapter: 'Chapter', section: 'Section', pdfPageStart: 1, pdfPageEnd: 1 },
      textLayer: 'original-text',
    };
    const source: ReleasedBookSource = {
      id: 'source-runtime',
      title: 'Runtime source',
      author: 'Author',
      contributors: [],
      editions: [
        {
          id: 'edition-runtime',
          label: 'Edition',
          sha256: 'a'.repeat(64),
          pdfPageCount: 1,
          publication: { publisher: null, year: null, note: '' },
          rights: { status: 'unconfirmed', use: 'research-only', note: 'Synthetic' },
        },
      ],
    };
    record.claims[0]!.citationIds = ['citation-runtime'];
    record.review.evidenceCitationIds = ['citation-runtime'];
    expect(() =>
      assertEligibleRelease([record], [citation], [source], runtimeManifest),
    ).not.toThrow();
    expect(() =>
      assertEligibleRelease([record], [citation], [source], {
        ...runtimeManifest,
        releaseIds: [record.id, 'article-unavailable'],
      }),
    ).toThrow(/membership/);
    expect(() =>
      assertEligibleRelease([record], [citation], [source], { ...runtimeManifest, releaseIds: [] }),
    ).toThrow(/membership/);
    expect(() => assertEligibleRelease([record], [], [source], runtimeManifest)).toThrow(
      /unknown citation/,
    );
    const unreviewedRecord: MutableReleaseRecord<BookRecordV1> = {
      ...record,
      review: { ...record.review, status: 'draft' },
    };
    expect(() =>
      assertEligibleRelease([unreviewedRecord], [citation], [source], runtimeManifest),
    ).toThrow(/not reviewed/);
  });

  it('binds exact projection data and ignores only generation noise and object-key order', () => {
    const projection = {
      schemaVersion: 1,
      recordSchemaVersions: [1],
      corpusId: 'fixture',
      language: 'vi',
      releaseIds: ['record-a'],
      records: [
        { id: 'record-a', claims: [{ id: 'claim-a', citationIds: ['citation-a'], text: 'Text' }] },
      ],
      citations: [{ id: 'citation-a', location: { section: 'First' } }],
      sources: [{ id: 'source-a', contributors: ['A', 'B'] }],
      topics: [{ id: 'topic-a', title: 'Topic' }],
      projectContracts: [],
    };
    const identity = createSnapshotIdentity(projection);
    expect(
      createSnapshotIdentity({
        ...projection,
        records: [
          {
            ...projection.records[0],
            claims: [{ ...projection.records[0]!.claims[0], citationIds: ['citation-a'] }],
          },
        ],
      }),
    ).toBe(identity);
    expect(
      createSnapshotIdentity({
        ...projection,
        citations: [{ id: 'citation-a', location: { section: 'Changed' } }],
      }),
    ).not.toBe(identity);
    expect(
      createSnapshotIdentity({
        ...projection,
        sources: [{ id: 'source-a', contributors: ['B', 'A'] }],
      }),
    ).not.toBe(identity);
    expect(
      createSnapshotIdentity({ ...projection, topics: [{ id: 'topic-a', title: 'Changed' }] }),
    ).not.toBe(identity);
    expect(
      createSnapshotIdentity({
        ...projection,
        records: [
          {
            ...projection.records[0],
            claims: [{ ...projection.records[0]!.claims[0], text: 'Changed' }],
          },
        ],
      }),
    ).not.toBe(identity);
  });
});
