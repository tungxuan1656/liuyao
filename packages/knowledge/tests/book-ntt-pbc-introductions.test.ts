import { describe, expect, it } from 'vitest';
import locators from './fixtures/ntt-pbc-introduction-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord, type BookClaim, type BookClaimV2 } from '../src/index';

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
        .flatMap<BookClaim | BookClaimV2>(r => {
          const owner = getBookRecord(r)!;
          return [
            ...owner.claims,
            ...(owner.type === 'hexagram'
              ? owner.lines.flatMap<BookClaim | BookClaimV2>(l => [...l.claims])
              : []),
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
    expect(text('pbc-thuyet-quai-chapters-03-11-notice')).toContain('chương 3 đến 11');
    expect(text('pbc-tu-quai-notice')).toContain('thông báo');
    expect(text('pbc-tap-quai-notice')).toContain('Hệ Từ Hạ Truyện/chung');
    expect(text('pbc-pham-le-and-cuong-linh-vi-circle-described')).toContain(
      'không có tấm vòng 64/vuông 64',
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
      notes.claims.some(c =>
        c.citationIds.some(id => id === 'citation-pbc-q61-line-6-edition-note-21'),
      ),
    ).toBe(false);
  });

  it('accounts for every assigned page without authoring the next body sections', () => {
    for (const [source, pages] of [
      ['ntt', [...Array.from({ length: 79 }, (_, i) => i + 1), 938]],
      [
        'pbc',
        [
          ...Array.from({ length: 26 }, (_, i) => i + 1),
          ...Array.from({ length: 7 }, (_, i) => i + 649),
        ],
      ],
    ] as const) {
      const assigned = locators.filter(u => u.id.startsWith(source));
      const covered = new Set(
        assigned.flatMap(u =>
          Array.from({ length: u.pdfPages[1]! - u.pdfPages[0]! + 1 }, (_, i) => u.pdfPages[0]! + i),
        ),
      );
      expect([...covered].sort((a, b) => a - b)).toEqual(pages);
    }
    expect(cohort()).toHaveLength(23);
    expect(cohort().reduce((total, id) => total + getBookRecord(id)!.claims.length, 0)).toBe(487);
    expect(registry.groups.find(g => g.id === 'ntt-upper-divider')).toMatchObject({
      kind: 'content',
      pdfPageStart: 79,
      pdfPageEnd: 79,
    });
    expect(unit('ntt-upper-divider-heading').kind).toBe('non-content');
    expect(unit('ntt-upper-divider-explanation').kind).toBe('content');
  });

  it('retains the nine named NTT figures plus separately inspected inline symbols', () => {
    const owner = getBookRecord('article-ntt-chu-xi-diagrams')!;
    if (owner.schemaVersion !== 2) throw new Error('Expected V2 NTT diagrams');
    expect(owner.figures).toHaveLength(12);
    const named = registry.groups.filter(g => g.id.startsWith('ntt-figure-'));
    expect(named).toHaveLength(9);
    for (const g of named)
      expect(owner.figures!.some(f => f.sourceUnitIds.includes(g.id))).toBe(true);
    expect(text('ntt-chu-xi-diagrams-phuc-hi-64-orientation')).toMatch(/Kiền ở trái.*Khôn phải/);
    expect(text('ntt-chu-xi-diagrams-van-vuong-eight-order-label-04')).toContain('con gái nhỏ');
    expect(text('ntt-chu-xi-diagrams-note-51')).toMatch(/lặp.*Khôn\/Chấn/);
    expect(text('ntt-chu-xi-diagrams-casting-symbols-label-01')).toContain('còn 26');
    expect(unit('ntt-chu-xi-diagrams-hexagram-transformations-alternative-1').pdfPages).toEqual([
      62, 63,
    ]);
  });

  it('keeps each note and printed colophon attribution separate', () => {
    expect(locators.filter(u => /^ntt-chu-xi-diagrams-note-\d{2}$/.test(u.id))).toHaveLength(57);
    expect(locators.filter(u => /^ntt-cuong-linh-notes-\d{2}$/.test(u.id))).toHaveLength(12);
    expect(text('ntt-cuong-linh-notes-08')).toContain('X/XX');
    expect(text('ntt-cuong-linh-notes-11')).toContain('Chu Hy');
    expect(text('ntt-colophon-938-printing')).toMatch(/05\/12\/2003.*quý I 2004/);
    expect(text('ntt-editorial-introduction-evaluation')).toContain('không ký');
    expect(text('ntt-dich-thuyet-cuong-linh-trinh-time')).toContain('Hai đoạn đầu 65 còn Trình Di');
  });

  it('keeps source-review and certification gates closed', () => {
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
  });
});
