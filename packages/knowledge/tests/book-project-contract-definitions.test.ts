import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { calculateHexagram, isChangingLine, linePolarity } from '@liuyao/core';
import {
  getBookRecord,
  getRule,
  getTerm,
  listBookRecords,
  listRules,
  listTerms,
  resolveBookNavigation,
} from '../src/index';
import manifest from '../data/manifest.json';
import legacy from '../data/legacy/catalog.json';
import coverage from '../reports/coverage.json';
import audit from '../reports/audit-status.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';

const domain = 'docs/design-docs/domain-model.md';
const pipeline = 'docs/design-docs/calculation-pipeline.md';
const definitions = [
  [
    'term-ruleset',
    [
      [domain, '## Stable IDs'],
      [pipeline, '## Rules'],
    ],
  ],
  [
    'term-primary-hexagram',
    [
      [domain, '## Line contract'],
      [domain, '## Reading result'],
    ],
  ],
  ['term-changed-hexagram', [[pipeline, '## Changed hexagram']]],
  ['term-line-value', [[domain, '## Line contract']]],
  [
    'rule-reading-result-fields',
    [
      [domain, '## Stable IDs'],
      [domain, '## Reading result'],
    ],
  ],
  [
    'rule-line-polarity-values',
    [
      [domain, '## Line contract'],
      [domain, '## Reading result'],
    ],
  ],
] as const;

// These are software-contract expectations, not independent doctrinal fixtures.
describe('feat-064 stable project-contract definitions', () => {
  it.each(definitions)(
    'releases %s once with exact reviewed V1 project evidence',
    (id, sections) => {
      const record = getBookRecord(id)!;
      expect(record.schemaVersion).toBe(2);
      if (record.schemaVersion !== 2) throw new Error(`Not a V2 definition: ${id}`);
      expect(record.type).toBe(id.startsWith('term-') ? 'term' : 'rule');
      expect(manifest.releaseIds.filter(released => released === id)).toHaveLength(1);
      expect(listBookRecords().filter(candidate => candidate.id === id)).toHaveLength(1);
      expect(record.claims).toHaveLength(1);
      const claim = record.claims[0]!;
      expect(claim.kind).toBe('project-convention');
      expect(claim.citationIds).toEqual([]);
      if (claim.kind !== 'project-convention') throw new Error(`Not a project claim: ${id}`);
      expect(claim.projectEvidence).toEqual(
        sections.map(([documentPath, section]) => ({ documentPath, section, revision: 'v1' })),
      );
      expect(record.review.status).toBe('reviewed');
      expect(record.review.evidenceClaimIds).toEqual([claim.id]);
      expect(record.review.evidenceCitationIds).toBeUndefined();
      expect(record.review.note).toMatch(/quy ước phần mềm.*không phải chứng cứ giáo lý từ sách/);
      for (const evidence of claim.projectEvidence) {
        const accepted = manifest.projectContracts.find(
          c => c.documentPath === evidence.documentPath,
        )!;
        expect(accepted.revision).toBe(evidence.revision);
        expect(accepted.sections).toContain(evidence.section);
        const document = readFileSync(
          new URL(`../../../${evidence.documentPath}`, import.meta.url),
          'utf8',
        );
        expect(document.split(/\r?\n/)).toContain(evidence.section);
      }
      expect(resolveBookNavigation(id)).toEqual({ availability: 'available', record });
      expect(Object.isFrozen(record)).toBe(true);
      expect(
        Object.values(legacy.catalog)
          .flat()
          .some(candidate => candidate.id === id),
      ).toBe(false);
      if (record.type === 'term') {
        expect(listTerms().filter(candidate => candidate.id === id)).toHaveLength(1);
        expect(getTerm(record.id)?.definition).toBe(claim.text);
        expect(getTerm(record.id)?.applicableRuleIds).toEqual(record.applicableRuleIds);
      } else if (record.type === 'rule') {
        expect(listRules().filter(candidate => candidate.id === id)).toHaveLength(1);
        expect(getRule(record.id)?.explanation).toBe(claim.text);
        expect(getRule(record.id)?.ruleset).toBe('liuyao-standard-v1');
      }
    },
  );

  it('registers only the sections actually used by the six definitions', () => {
    const used = new Set(
      definitions.flatMap(([, sections]) =>
        sections.map(([path, section]) => `${path}:${section}`),
      ),
    );
    expect(manifest.projectContracts).toHaveLength(2);
    expect(
      new Set(
        manifest.projectContracts.flatMap(contract =>
          contract.sections.map(section => `${contract.documentPath}:${section}`),
        ),
      ),
    ).toEqual(used);
  });

  it('reports project evidence without marking intentionally empty book citations missing', () => {
    expect(coverage.records).toMatchObject({ authored: 377, released: 377 });
    expect(coverage.claims).toEqual({ total: 9503, missingCitationIds: [] });
    expect(coverage.citations.total).toBe(9744);
    expect(coverage.legacyUnaudited).toEqual({ entities: [], terms: [], rules: [] });
    expect(legacy.catalog.sources).toHaveLength(4);
    expect(legacy.catalog.references).toHaveLength(8);
    expect(legacy.reviewStatus).toBe('unaudited');
    expect(coverage.complete).toBe(false);
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification).toMatchObject({ status: 'closed', state: 'missing' });
    expect(audit.totals).toMatchObject({
      releasedClaimsCovered: 197,
      releasedClaimsRequired: 9503,
      currentDecisions: 84,
    });
    expect(registry.registryRevision).toBe(57);
    expect(registry.counts).toEqual({
      overviewCells: 192,
      positionCells: 1152,
      hexagramCells: 1344,
      specialPassages: 6,
      groups: 4638,
      exclusions: 17,
    });
  });

  it.each([
    [6, 'yin', true],
    [7, 'yang', false],
    [8, 'yin', false],
    [9, 'yang', true],
  ] as const)(
    'retains the documented primary polarity and moving flag for %s',
    (value, polarity, moving) => {
      expect(linePolarity(value)).toBe(polarity);
      expect(isChangingLine(value)).toBe(moving);
    },
  );

  it('retains the software distinction between primary and optional changed hexagrams', () => {
    expect(calculateHexagram({ lines: [7, 7, 7, 7, 7, 7] })).toMatchObject({
      primaryHexagramId: 'hexagram-01',
      changedHexagramId: null,
    });
    expect(calculateHexagram({ lines: [9, 9, 9, 9, 9, 9] })).toMatchObject({
      primaryHexagramId: 'hexagram-01',
      changedHexagramId: 'hexagram-02',
    });
  });
});
