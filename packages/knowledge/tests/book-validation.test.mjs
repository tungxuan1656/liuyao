import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { checkCorpus } from '../scripts/corpus-checks.mjs';
import { recordSchemaName } from '../scripts/record-schema-dispatch.mjs';
import { coverageReport } from '../scripts/corpus-coverage.mjs';

const readJson = file => JSON.parse(readFileSync(new URL(file, import.meta.url), 'utf8'));
const manifest = readJson('../data/manifest.json');
const corpus = {
  repositoryRoot: fileURLToPath(new URL('../../..', import.meta.url)),
  manifest,
  sources: readJson(`../data/${manifest.sourceFile}`).sources,
  citations: manifest.citationFiles.flatMap(file => readJson(`../data/${file}`).citations),
  records: manifest.recordFiles.map(file => readJson(`../data/${file}`)),
  legacy: readJson('../data/legacy/catalog.json'),
};
const ajv = new Ajv({ allErrors: true, strictTypes: false, strictRequired: false });
addFormats(ajv);
const validators = Object.fromEntries(
  ['manifest', 'sources', 'citations', 'record', 'record-v2'].map(name => [
    name,
    ajv.compile(readJson(`../schema/${name}.schema.json`)),
  ]),
);

describe('book corpus publication boundary', () => {
  it('accepts the authored corpus without certifying the remaining commentary', () => {
    expect(() => checkCorpus(corpus)).not.toThrow();
    expect(validators.manifest(corpus.manifest)).toBe(true);
    expect(validators.sources({ schemaVersion: 1, sources: corpus.sources })).toBe(true);
    expect(validators.citations({ schemaVersion: 1, citations: corpus.citations })).toBe(true);
    for (const record of corpus.records)
      expect(
        validators[recordSchemaName(record, record.id)](record),
        `${record.id}: ${ajv.errorsText(validators[recordSchemaName(record, record.id)].errors)}`,
      ).toBe(true);
    const report = coverageReport({ ...corpus, checked: checkCorpus(corpus) });
    const claimCount = corpus.records.reduce(
      (total, record) =>
        total +
        record.claims.length +
        (record.lines ?? []).reduce((lineTotal, line) => lineTotal + line.claims.length, 0) +
        (record.specialPassages ?? []).reduce(
          (passageTotal, passage) => passageTotal + passage.claims.length,
          0,
        ),
      0,
    );
    expect(claimCount).toBe(9503);
    expect(report.complete).toBe(false);
    expect(corpus.records.find(record => record.id === 'hexagram-41')).toBeDefined();
    expect(
      corpus.records.find(record => record.id === 'article-shi-ying-interaction-context'),
    ).toMatchObject({
      review: { status: 'reviewed', method: 'source-comparison' },
      claims: [
        { id: 'article-shi-ying-interaction-context-ch06-12' },
        { id: 'article-shi-ying-interaction-context-ch06-13' },
        { id: 'article-shi-ying-interaction-context-ch06-14' },
        { id: 'article-shi-ying-interaction-context-ch06-15' },
        { id: 'article-shi-ying-interaction-context-ch06-16' },
      ],
    });
    for (const hexagram of [41, 42, 43, 44]) {
      const record = corpus.records.find(item => item.id === `hexagram-${hexagram}`);
      expect(record.lines).toHaveLength(6);
      expect(record.review.status).toBe('reviewed');
      expect(record.claims.some(claim => claim.kind === 'structural-fact')).toBe(true);
    }
    expect(report.hexagrams.reviewed).toBe(64);
    expect(report.records.released).toBe(377);
    expect(report.lines.reviewedPositions).toBe(384);
    expect(report.hexagrams.missingIds).toHaveLength(0);
    expect(report.lines.byAuthor.find(row => row.author === 'Ngô Tất Tố')).toMatchObject({
      overviewHexagrams: 64,
      reviewedLinePositions: 384,
    });
    expect(
      report.lines.byAuthor.find(row => row.author === 'Phan Bội Châu').missingPilotPositions,
    ).toHaveLength(0);
  });

  it('publishes Feature 044 hexagrams and migrates their stable IDs out of legacy content', () => {
    for (const hexagram of [41, 42, 43, 44]) {
      expect(corpus.manifest.releaseIds).toContain(`hexagram-${hexagram}`);
      expect(
        corpus.legacy.catalog.entities.some(entity => entity.id === `hexagram-${hexagram}`),
      ).toBe(false);
    }
    expect(corpus.manifest.releaseIds).toContain('article-shi-ying-interaction-context');
  });

  it.each([
    [
      'extra fields',
      record => {
        record.unexpected = 'unreviewed';
      },
    ],
    [
      'missing citation',
      record => {
        record.claims[0].citationIds = [];
      },
    ],
    [
      'false review',
      record => {
        delete record.review.evidenceCitationIds;
      },
    ],
    [
      'invalid date',
      record => {
        record.review.reviewedAt = '2026-02-30';
      },
    ],
    [
      'wrong collection field',
      record => {
        record.ruleset = 'liuyao-standard-v1';
      },
    ],
  ])('rejects schema violations: %s', (_label, mutate) => {
    const record = structuredClone(corpus.records[0]);
    mutate(record);
    expect(validators.record(record)).toBe(false);
  });

  it.each([
    [
      'unknown citation',
      data => {
        data.records[0].claims[0].citationIds = ['citation-missing'];
      },
      /unknown citation/,
    ],
    [
      'missing attribution',
      data => {
        delete data.records.find(r => r.id === 'hexagram-01').claims[1].attribution;
      },
      /attribution/,
    ],
    [
      'review omits discrepancy evidence',
      data => {
        data.records.find(r => r.id === 'rule-na-jia-assignment').review.evidenceCitationIds = [
          'citation-bpct-p13-technical',
        ];
      },
      /review evidence omits/,
    ],
    [
      'unknown topic',
      data => {
        data.records[0].topicIds = ['topic-missing'];
      },
      /unknown topic/,
    ],
    [
      'unknown related record',
      data => {
        data.records[0].relatedIds = ['term-missing'];
      },
      /unknown record/,
    ],
    [
      'unknown structural claim',
      data => {
        data.records[0].structure.claimIds = ['claim-missing'];
      },
      /unknown claim/,
    ],
    [
      'duplicate claim',
      data => {
        data.records[1].claims[0].id = data.records[0].claims[0].id;
      },
      /duplicate claim/,
    ],
    [
      'duplicate record',
      data => {
        data.records.push(data.records[0]);
      },
      /duplicate record/,
    ],
    [
      'duplicate legacy authoring',
      data => {
        data.legacy.catalog.terms.push({ id: data.records[0].id });
      },
      /also authored/,
    ],
    [
      'wrong edition',
      data => {
        data.citations[0].editionId = 'edition-ntt-supplied';
      },
      /source and edition/,
    ],
    [
      'page beyond edition',
      data => {
        data.citations[0].location.pdfPageEnd = 9999;
      },
      /page range/,
    ],
    [
      'reversed page range',
      data => {
        data.citations[0].location.pdfPageStart = 999;
      },
      /page range/,
    ],
    [
      'draft release',
      data => {
        data.records[0].review = { status: 'draft' };
      },
      /release requires/,
    ],
    [
      'disputed release',
      data => {
        data.records[0].review = { status: 'disputed' };
      },
      /release requires/,
    ],
    [
      'unknown release',
      data => {
        data.manifest.releaseIds.push('term-missing');
      },
      /release requires/,
    ],
    [
      'unreleased dependency',
      data => {
        data.manifest.releaseIds = data.manifest.releaseIds.filter(id => id !== 'trigram-heaven');
      },
      /unreleased trigram/,
    ],
    [
      'unresolved discrepancy',
      data => {
        data.records.find(r => r.id === 'rule-na-jia-assignment').discrepancies[0].status =
          'unresolved';
      },
      /unresolved discrepancy/,
    ],
    [
      'wrong line order',
      data => {
        data.records.find(r => r.id === 'hexagram-01').lines.reverse();
      },
      /line order/,
    ],
    [
      'wrong hexagram composition',
      data => {
        data.records.find(r => r.id === 'hexagram-01').structure.lines[0] = 'yin';
      },
      /composition differs/,
    ],
    [
      'invalid transformation',
      data => {
        data.records.find(r => r.id === 'article-tung-to-ly').tables[0].rows[0].movingPositions = [
          2,
        ];
      },
      /example changes/,
    ],
    [
      'wrong Shi/Ying distance',
      data => {
        data.records
          .find(r => r.id === 'rule-palace-and-markers')
          .tables.find(t => t.kind === 'markers').rows[0].yingPosition = 6;
      },
      /separation/,
    ],
    [
      'incomplete palace inventory',
      data => {
        data.records.find(r => r.id === 'rule-palace-and-markers').tables[0].rows.pop();
      },
      /palaces inventory/,
    ],
  ])('rejects cross-file violations: %s', (_label, mutate, error) => {
    const data = structuredClone(corpus);
    mutate(data);
    expect(() => checkCorpus(data)).toThrow(error);
  });
});
