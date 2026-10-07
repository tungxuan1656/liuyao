import { describe, expect, it } from 'vitest';
import { coverageReport } from '../scripts/corpus-coverage.mjs';

function reportFor(claims) {
  return coverageReport({
    manifest: {
      corpusId: 'synthetic-coverage',
      releaseIds: [],
      coverageAuthors: [],
      topics: [],
      nextBatch: { hexagramIds: [], topicIds: [], note: 'Synthetic only.' },
    },
    records: [{ id: 'term-fixture', type: 'term', claims, review: { status: 'draft' } }],
    citations: [],
    legacy: { catalog: { entities: [], terms: [], rules: [] } },
    checked: { allClaims: record => record.claims },
  });
}

describe('claim citation coverage', () => {
  it('does not label intentional project-convention citation absence as missing book evidence', () => {
    const report = reportFor([
      { id: 'claim-project', kind: 'project-convention', citationIds: [] },
    ]);
    expect(report.claims).toEqual({ total: 1, missingCitationIds: [] });
    expect(report.complete).toBe(false);
    expect(report.records.released).toBe(0);
  });

  it('still reports citation absence on book-supported claim kinds', () => {
    const report = reportFor([
      { id: 'claim-book-missing', kind: 'structural-fact', citationIds: [] },
      { id: 'claim-book-cited', kind: 'calculation-rule', citationIds: ['citation-fixture'] },
    ]);
    expect(report.claims).toEqual({ total: 2, missingCitationIds: ['claim-book-missing'] });
  });
});
