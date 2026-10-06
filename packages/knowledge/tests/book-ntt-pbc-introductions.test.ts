import { describe, expect, it } from 'vitest';
import locators from './fixtures/ntt-pbc-introduction-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord } from '../src/index';

const unit = (id: string) => locators.find(u => u.id === id)!;
const text = (id: string) => {
  const u = unit(id);
  return getBookRecord(u.recordIds[0]!)!.claims.find(c => c.id === u.claimIds[0])!.text;
};
const cohort = () =>
  manifest.releaseIds.filter(id => id.startsWith('article-pbc-') || id.startsWith('article-ntt-'));

describe('feat-060 NTT/PBC introductory source comparison', () => {
  it.each(locators)('binds the scoped disposition $id without audit approval', u => {
    expect(registry.groups.find(g => g.id === u.id)).toMatchObject({
      parentId: u.parentId,
      kind: u.kind,
      pdfPageStart: u.pdfPages[0],
      pdfPageEnd: u.pdfPages[1],
      authorFeatureId: 'feat-060',
      auditFeatureId: 'feat-092',
      discoveryStatus: 'unresolved',
      recordIds: u.recordIds,
    });
    for (const id of u.recordIds) expect(getBookRecord(id)).toBeDefined();
    for (const id of u.claimIds) {
      const claim = u.recordIds
        .flatMap(r => {
          const owner = getBookRecord(r)!;
          return [
            ...owner.claims,
            ...(owner.type === 'hexagram' ? owner.lines.flatMap(l => l.claims) : []),
          ];
        })
        .find(c => c.id === id)!;
      expect(claim).toBeDefined();
      expect(claim.citationIds.every(c => getBookCitation(c))).toBe(true);
      if (!u.disposition.startsWith('reused')) {
        expect(claim.attribution?.author).toBe(u.attributedTo);
        expect(claim.conditions?.join(' ')).toContain('không chứng minh');
      }
    }
    for (const id of u.citationIds) {
      const citation = getBookCitation(id)!;
      expect(citation.editionId).toBe(`edition-${u.id.startsWith('pbc') ? 'pbc' : 'ntt'}-supplied`);
      if (!u.disposition.startsWith('reused')) {
        expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(u.pdfPages);
        expect(citation.attributedTo).toBe(u.attributedTo);
      }
    }
  });

  it('keeps inspected figures, ordered labels and orientation evidence in their released owners', () => {
    for (const id of cohort()) {
      const record = getBookRecord(id)!;
      expect(record.schemaVersion).toBe(2);
      if (record.schemaVersion !== 2) throw new Error('Expected V2 figure owner');
      for (const figure of record.figures ?? []) {
        expect(figure.inspectionStatus).toBe('visually-inspected');
        expect(figure.labels.length).toBeGreaterThan(0);
        expect(figure.orientation?.claimIds.length).toBeGreaterThan(0);
        expect(figure.sourceUnitIds.every(u => registry.groups.some(g => g.id === u))).toBe(true);
        const supporting = new Set(record.claims.map(c => c.id));
        for (const label of figure.labels) {
          expect(label.claimIds.length).toBeGreaterThan(0);
          expect(label.claimIds.every(c => supporting.has(c) && figure.claimIds.includes(c))).toBe(
            true,
          );
        }
        for (const alternative of figure.authorAlternatives ?? []) {
          expect(
            alternative.claimIds.every(c => supporting.has(c) && figure.claimIds.includes(c)),
          ).toBe(true);
        }
      }
    }
  });

  it('preserves PBC plates and the absent/surviving wing distinction without reconstruction', () => {
    const plates = getBookRecord('article-pbc-image-plates')!;
    if (plates.schemaVersion !== 2) throw new Error('Expected V2 plates');
    expect(plates.figures!.map(f => f.labels.length)).toEqual([32, 32]);
    expect(text('pbc-thuyet-quai-chapter-01-gap')).toContain('Khuyết');
    expect(text('pbc-thuyet-quai-chapter-02-original-reading')).toContain('Độc tiết');
    expect(text('pbc-thuyet-quai-chapters-03-11-notice')).toContain('chương3 đến11');
    expect(text('pbc-tu-quai-notice')).toContain('thông báo');
    expect(text('pbc-tap-quai-notice')).toContain('Hệ Từ Hạ Truyện/chung');
    expect(text('pbc-pham-le-and-cuong-linh-vi-circle-described')).toContain(
      'không có tấm vòng64/vuông64',
    );
  });

  it('reuses note13 discrepancy and note21 claim without rewriting or duplicating their owners', () => {
    expect(unit('pbc-endnotes-note-13').recordIds).toEqual(['hexagram-12']);
    expect(unit('pbc-endnotes-note-13').claimIds).toEqual([]);
    expect(unit('pbc-endnotes-note-21').recordIds).toEqual(['hexagram-61']);
    expect(unit('pbc-endnotes-note-21').claimIds).toEqual(['hexagram-61-line-6-edition-note-21']);
    const notes = getBookRecord('article-pbc-endnotes')!;
    expect(notes.claims).toHaveLength(19);
    expect(
      notes.claims.some(c => c.citationIds.includes('citation-pbc-q61-line-6-edition-note-21')),
    ).toBe(false);
  });

  it('keeps source-review and certification gates closed', () => {
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
  });
});
