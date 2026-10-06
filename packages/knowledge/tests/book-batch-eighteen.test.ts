import { describe, expect, it } from 'vitest';
import registry from '../../../docs/reviews/knowledge/expected-units.json';

// These bounds are observed passage continuations, not inferred neighboring headings.
const boardEnds = [
  [3, 50],
  [7, 51],
  [10, 52],
  [14, 53],
  [21, 55],
  [28, 57],
  [31, 58],
  [35, 59],
  [43, 61],
  [47, 62],
  [51, 63],
  [55, 64],
  [59, 65],
  [63, 66],
];

describe('feat-051 complete BPCT front matter and chapters 1–5', () => {
  it('keeps dependencies, all boards and all discussions as separate audit obligations', () => {
    expect(
      registry.groups.filter(
        g => g.parentId === 'bpct-part1-ch04' && g.id.startsWith('bpct-board-'),
      ),
    ).toHaveLength(64);
    expect(registry.groups.filter(g => g.parentId === 'bpct-part1-ch05')).toHaveLength(19);
    for (const [n, end] of boardEnds) {
      expect(
        registry.groups.find(g => g.id === `bpct-board-${String(n).padStart(2, '0')}`)?.pdfPageEnd,
      ).toBe(end);
    }
    expect(registry.groups.find(g => g.id === 'bpct-ch05-postscript')).toMatchObject({
      pdfPageStart: 74,
      pdfPageEnd: 76,
    });
  });
  it('records the two printed VI units, XXIII–XXV and the folio-only page without inventing doctrine', () => {
    for (const id of ['vi-can', 'vi-chi', 'xxiii', 'xxiv', 'xxv']) {
      expect(registry.groups.find(g => g.id === `bpct-ch01-${id}`)).toBeDefined();
    }
    expect(registry.groups.find(g => g.id === 'bpct-ch02-folio-42')).toMatchObject({
      kind: 'non-content',
      pdfPageStart: 42,
      pdfPageEnd: 42,
    });
    expect(registry.groups.filter(g => g.parentId === 'bpct-front')).toHaveLength(17);
    expect(registry.groups.filter(g => g.parentId === 'bpct-part1-ch03')).toHaveLength(2);
  });
});

// Original summary checks complement corpus schema/link validation.
import front from '../data/liuyao/bpct-front-voices.json';
import foundations from '../data/liuyao/bpct-chapter-one-foundations.json';
import citations from '../data/citations/batch-eighteen-advanced.json';
import { getBookCitation, getBookRecord } from '../src/index';

describe('BPCT front voices and chapter-one evidence', () => {
  it.each([front, foundations])(
    'projects reviewed $id with its own citations and no source images',
    record => {
      expect(getBookRecord(record.id)).toEqual(record);
      expect(record.review.method).toBe('source-comparison');
      for (const claim of record.claims) {
        expect(claim.conditions.join(' ')).toMatch(/không phải kết quả thực chứng/);
        expect(claim.text).not.toMatch(/[\p{Script=Han}]/u);
        for (const id of claim.citationIds) {
          expect(getBookCitation(id)).toBeDefined();
          expect(record.review.evidenceCitationIds).toContain(id);
        }
      }
    },
  );
  it('keeps named voices and all seven front notes independent', () => {
    expect(front.claims.filter(c => c.id.includes('front-note-'))).toHaveLength(7);
    expect(new Set(front.claims.map(c => c.attribution.author))).toContain('Trương Cảnh Tùng');
    expect(front.claims.filter(c => c.id.includes('pham-le-'))).toHaveLength(6);
    expect(front.claims.find(c => c.id.endsWith('credits-phu'))?.text).toMatch(
      /không coi.*từng bài/,
    );
  });
  it('accounts for all observed chapter-one units, complete Nạp âm and six diagram/layout groups', () => {
    const units = registry.groups.filter(g => g.parentId === 'bpct-part1-ch01');
    expect(units).toHaveLength(28);
    for (const unit of units) expect(unit.recordIds).toContain(foundations.id);
    expect(foundations.claims.filter(c => /-pair-\d+$/.test(c.id))).toHaveLength(30);
    expect(foundations.figures).toHaveLength(6);
    for (const figure of foundations.figures) {
      expect(figure.inspectionStatus).toBe('visually-inspected');
      expect(figure.sourceUnitIds).toHaveLength(1);
      for (const label of figure.labels)
        expect(figure.claimIds).toEqual(expect.arrayContaining(label.claimIds));
    }
    const b = foundations.figures.find(f => f.id.includes('xv-example'));
    expect(b?.labels.map(l => l.text)).toEqual(
      expect.arrayContaining(['Hào 6: dương; Ứng', 'Hào 3: âm; Thế']),
    );
    expect(
      citations.citations.find(c => c.id === 'citation-bpct-ch01-xv-line-3')?.location.pdfPageStart,
    ).toBe(16);
    expect(foundations.claims.find(c => c.id.endsWith('xviii-discussion'))?.text).toMatch(
      /Không có dòng Tân/,
    );
    expect(foundations.claims.find(c => c.id.endsWith('xxv-discussion'))?.text).toMatch(
      /24 phút.*không khớp/,
    );
  });
});

import caQuyet from '../data/liuyao/bpct-chapter-two-ca-quyet.json';
describe('BPCT chapter-two complete formulas', () => {
  it('covers every numbered formula and subordinate roster, with own evidence', () => {
    for (const unit of registry.groups.filter(g => g.id.startsWith('bpct-ch02-'))) {
      expect(unit.recordIds).toContain(caQuyet.id);
    }
    expect(getBookRecord(caQuyet.id)).toEqual(caQuyet);
    expect(caQuyet.claims.filter(c => c.id.endsWith('-formula'))).toHaveLength(29);
    expect(caQuyet.claims.filter(c => c.id.endsWith('-rendering'))).toHaveLength(29);
    expect(caQuyet.claims.filter(c => c.id.includes('note-'))).toHaveLength(3);
    for (const claim of caQuyet.claims)
      for (const id of claim.citationIds) expect(getBookCitation(id)).toBeDefined();
  });
  it('keeps full continuations, meaning differences, uncredited variants and folio-only 42', () => {
    expect(
      citations.citations.find(c => c.id === 'citation-bpct-ch02-xi-formula')?.location,
    ).toMatchObject({
      pdfPageStart: 31,
      pdfPageEnd: 32,
      printedPageStart: '24',
      printedPageEnd: '25',
    });
    expect(caQuyet.claims.find(c => c.id.endsWith('xi-rendering'))?.text).toMatch(
      /bỏ điều kiện gặp xung/,
    );
    expect(caQuyet.claims.find(c => c.id.includes('variants-reading'))?.attribution.author).toMatch(
      /không ký/,
    );
    expect(caQuyet.claims.find(c => c.id.endsWith('folio-42-folio'))?.text).toMatch(
      /chỉ có số in 35/,
    );
    expect(caQuyet.claims.find(c => c.id.endsWith('xix-prose'))?.text).toMatch(
      /Vũ Thủy.*Kinh Trập/,
    );
  });
});
