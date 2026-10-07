import { describe, expect, it } from 'vitest';
import locators from './fixtures/bpct-casting-criticisms-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import citations from '../data/citations/bpct-casting-criticisms.json';
import { getBookCitation, getBookRecord, getBookSource } from '../src/index';

const unit = (id: string) => locators.find(u => u.id === id)!;
const text = (id: string) => {
  const u = unit(id);
  return getBookRecord(u.recordId)!.claims.find(c => c.id === u.claimIds[0])!.text;
};
const roman = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
  'XIII',
  'XIV',
  'XV',
];

describe('feat-058 BPCT casting supplements and criticism source dispositions', () => {
  it.each(locators)('preserves independent source evidence for $id', u => {
    const owner = getBookRecord(u.recordId)!;
    expect(owner).toBeDefined();
    expect(manifest.releaseIds).toContain(owner.id);
    if (u.registered) {
      expect(registry.groups.find(g => g.id === u.id)).toMatchObject({
        parentId: u.parentId,
        pdfPageStart: u.pdfPages[0],
        pdfPageEnd: u.pdfPages[1],
        authorFeatureId: 'feat-058',
        auditFeatureId: 'feat-091',
        discoveryStatus: 'unresolved',
        recordIds: [u.recordId],
      });
    }
    for (const id of u.claimIds) {
      const claim = owner.claims.find(c => c.id === id)!;
      expect(claim.kind).toBe('author-interpretation');
      expect(claim.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(claim.attribution?.author).toBe(u.attributedTo);
      for (const cid of claim.citationIds) {
        expect(getBookCitation(cid)).toBeDefined();
        expect(owner.review.evidenceCitationIds).toContain(cid);
      }
    }
    for (const id of u.citationIds) {
      const citation = getBookCitation(id)!;
      expect(citation.sourceId).toBe('source-book-bpct');
      expect(citation.editionId).toBe('edition-bpct-supplied');
      expect(citation.textLayer).toBe(u.textLayer);
      expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(u.pdfPages);
      if (u.pdfPages[0] === 467) {
        expect(citation.location.printedPageStart).toBeUndefined();
        expect(citation.location.printedPageEnd).toBeUndefined();
      } else {
        expect([citation.location.printedPageStart, citation.location.printedPageEnd]).toEqual(
          u.pdfPages.map(p => String(p - (p <= 457 ? 41 : 92))),
        );
      }
    }
  });

  it('keeps the64 obligations but authors only the eight observed II entries and48 rows', () => {
    const entries = registry.groups.filter(g => g.group === 'BPCT casting II entries');
    expect(entries).toHaveLength(64);
    expect(entries.map(g => g.number)).toEqual(Array.from({ length: 64 }, (_, i) => i + 1));
    expect(
      entries.slice(0, 8).every(g => g.recordIds?.includes('article-bpct-casting-supplement')),
    ).toBe(true);
    expect(
      entries.slice(8).every(g => g.recordIds === undefined && g.discoveryStatus === 'unresolved'),
    ).toBe(true);
    expect(locators.filter(u => /^bpct-casting-II-\d+-row-/.test(u.id))).toHaveLength(48);
    for (let n = 1; n <= 8; n++) {
      const prefix = `bpct-casting-II-${String(n).padStart(2, '0')}`;
      expect(locators.filter(u => u.id.startsWith(prefix + '-row-'))).toHaveLength(6);
    }
    expect(text('bpct-casting-II-census')).toMatch(/tám mục.*48 dòng/);
    expect(text('bpct-casting-II-census')).toMatch(/không gọi là nguồn thông báo lược bỏ/);
    expect(text('bpct-casting-II-02-row-04')).toMatch(/Tồn.*không chuẩn hoá/);
    expect(unit('bpct-casting-II-08-heading').pdfPages).toEqual([432, 432]);
    expect(registry.groups.some(g => g.id.startsWith('bpct-casting-III'))).toBe(false);
    expect(text('bpct-casting-II-transition')).toMatch(/Không có tiêu đềIII/);
  });

  it('keeps four definitions under I and seven actual transformations per IV diagram', () => {
    expect(locators.filter(u => u.id.startsWith('bpct-casting-I-definition-'))).toHaveLength(4);
    expect(registry.groups.some(g => /^bpct-casting-I-\d/.test(g.id))).toBe(false);
    expect(text('bpct-casting-I-definition-02')).toMatch(/Thiếu Dương.*không sửa/);
    expect(unit('bpct-casting-I-definition-02').pdfPages).toEqual([429, 430]);
    expect(locators.filter(u => /^bpct-casting-IV-\d+-row-/.test(u.id))).toHaveLength(56);
    expect(locators.filter(u => u.voice === 'chart-observation')).toHaveLength(8);
    const diagrams = ['Càn', 'Khảm', 'Cấn', 'Chấn', 'Tốn', 'Li', 'Khôn', 'Đoài'];
    for (const [index, title] of diagrams.entries()) {
      const prefix = `bpct-casting-IV-${String(index + 1).padStart(2, '0')}`;
      expect(text(prefix + '-diagram')).toContain(title);
      expect(locators.filter(u => u.id.startsWith(prefix + '-row-'))).toHaveLength(7);
    }
    expect(unit('bpct-casting-IV-02-row-06').pdfPages).toEqual([433, 433]);
    expect(unit('bpct-casting-IV-05-diagram').pdfPages).toEqual([433, 433]);
    expect(unit('bpct-casting-IV-05-row-01').pdfPages).toEqual([434, 434]);
    expect(text('bpct-casting-IV-03-diagram')).toMatch(/Sơ nhị.*không sửa/);
    expect(unit('bpct-casting-IV-08-row-07').pdfPages).toEqual([435, 435]);
  });

  it('accounts for all18 Tạp Sự cases,14 nested relational units and actual source layers', () => {
    expect(registry.groups.filter(g => g.group === 'BPCT casting V entries')).toHaveLength(18);
    for (const n of [7, 8]) {
      expect(
        locators.filter(
          u => u.id.startsWith(`bpct-casting-V-0${n}-relation-`) && u.voice === 'verse',
        ),
      ).toHaveLength(7);
      expect(
        locators.filter(
          u => u.id.startsWith(`bpct-casting-V-0${n}-relation-`) && u.voice === 'meaning',
        ),
      ).toHaveLength(7);
    }
    expect(locators.filter(u => /^bpct-casting-V-\d+-note-/.test(u.id))).toHaveLength(10);
    expect(text('bpct-casting-V-08-relation-06-verse')).toMatch(/Không có khối Hán-Việt riêng/);
    expect(text('bpct-casting-V-10-meaning')).toMatch(/Tài giao thay minh/);
    expect(text('bpct-casting-V-12-meaning')).toMatch(/Tử động.*Tử vượng/);
    expect(text('bpct-casting-V-17-note-13')).toMatch(/không rõ.*phỏng đoán/);
    expect(unit('bpct-casting-V-18-stanza-01-verse').pdfPages).toEqual([450, 451]);
    expect(text('bpct-casting-V-18-stanza-02-meaning')).toMatch(/không thay đi bằng về/);
    expect(
      locators.filter(
        u => u.id.startsWith('bpct-casting-V-') && u.textLayer === 'author-commentary',
      ),
    ).toEqual([]);
  });

  it('keeps11 Tinh Sát entries and notes without repairing missing Hán or repeated Kỷ', () => {
    expect(registry.groups.filter(g => g.group === 'BPCT casting VI entries')).toHaveLength(11);
    expect(
      locators.filter(u => u.id.startsWith('bpct-casting-VI-') && u.voice === 'meaning'),
    ).toHaveLength(11);
    expect(unit('bpct-casting-VI-01-verse').pdfPages).toEqual([451, 452]);
    expect(unit('bpct-casting-VI-03-framing').pdfPages).toEqual([452, 453]);
    expect(unit('bpct-casting-VI-06-framing').pdfPages).toEqual([454, 455]);
    expect(unit('bpct-casting-VI-03-verse').pdfPages).toEqual([453, 453]);
    expect(unit('bpct-casting-VI-06-verse').pdfPages).toEqual([455, 455]);
    expect(text('bpct-casting-VI-07-note-14')).toMatch(/Không mở rộng hai ví dụ/);
    expect(text('bpct-casting-VI-08-verse')).toMatch(/Kỷ lặp.*không có Ất.*không sửa/);
    expect(text('bpct-casting-VI-10-verse')).toMatch(
      /bốn dòng.*thêm hai dòng.*không có hai dòng Hán/,
    );
    expect(text('bpct-casting-VI-11-note-15')).toMatch(/tháng12 Sửu.*Mùi bị Nguyệt phá/);
  });

  it('keeps all15 criticism targets and their opposing attributed layers distinct', () => {
    expect(registry.groups.filter(g => g.group === 'BPCT criticism items')).toHaveLength(15);
    for (const id of roman) {
      const owner = getBookRecord(`article-bpct-criticism-${id.toLowerCase()}`)!;
      expect(owner.claims.length).toBeGreaterThan(1);
      expect(
        locators.some(
          u =>
            u.parentId === `bpct-criticism-${id}` && ['reply', 'reconciliation'].includes(u.voice),
        ),
      ).toBe(true);
    }
    const quoted = locators.filter(u => u.voice === 'criticized-proposition');
    expect(quoted.length).toBeGreaterThan(15);
    for (const u of quoted)
      expect(u.attributedTo).toMatch(/BPCT thuật lại.*không đối chiếu trực tiếp/);
    expect(text('bpct-criticism-V-target-proposition')).toMatch(
      /không nêu tên sách.*Không gán.*Bốc Dịch Toàn Thư/,
    );
    expect(text('bpct-criticism-V-reply')).toMatch(/bất đồng với VI-03/);
    expect(text('bpct-criticism-VIII-reply')).toMatch(/không bác sạch nhưVII/);
    expect(text('bpct-criticism-XII-positive-reference')).toMatch(/không xoá phê bìnhI/);
    expect(text('bpct-criticism-XII-example-family')).toMatch(/trái tuổi dự kiến.*loại khỏi số/);
    expect(text('bpct-criticism-XIV-example-phuc')).toMatch(/20 năm.*không chứng minh/);
    expect(text('bpct-criticism-XV-target-proposition')).toMatch(
      /Thiên Huyền Phú.*Không gán.*Dịch Lâm Bổ Di/,
    );
  });

  it('reuses only the existing X-note9 claim and observes the blank ending without duplication', () => {
    expect(unit('bpct-criticism-X-note-09')).toMatchObject({
      recordId: 'term-matching-day',
      claimIds: ['term-matching-day-definition'],
      citationIds: ['citation-bpct-appendix-matching-day-note'],
      voice: 'translator-note-reused',
    });
    expect(citations.citations.some(c => c.id === 'citation-bpct-criticism-x-note-09')).toBe(false);
    expect(
      getBookRecord('article-bpct-criticism-x')!.claims.some(c => c.id.endsWith('note-09')),
    ).toBe(false);
    expect(registry.groups.find(g => g.id === 'bpct-criticism-X')?.recordIds).toContain(
      'term-matching-day',
    );
    expect(unit('bpct-criticism-X-whole-half-proposition').pdfPages).toEqual([462, 463]);
    expect(unit('bpct-criticism-XI-reconciliation').pdfPages).toEqual([463, 463]);
    expect(text('bpct-criticism-end')).toMatch(/467.*hoàn toàn trắng.*Không phục nguyên/);
    expect(registry.groups.find(g => g.id === 'bpct-blank-467')?.kind).toBe('non-content');
  });

  it('publishes source comparison only, preserving audit ownership and later gates', () => {
    const ids = [...new Set(locators.map(u => u.recordId))].filter(
      id => id !== 'term-matching-day',
    );
    expect(ids).toHaveLength(19);
    expect(ids.reduce((n, id) => n + getBookRecord(id)!.claims.length, 0)).toBe(328);
    expect(citations.citations).toHaveLength(328);
    expect(locators).toHaveLength(329);
    for (const id of ids) {
      const owner = getBookRecord(id)!;
      expect(owner.review.method).toBe('source-comparison');
      expect(owner.review.note).toMatch(/individually opened all39 full-page PNGs/);
      expect(owner.review.note).toMatch(/feat-091 audit.*remain open/);
      expect(owner.rights.basis).toBe('original-summary-and-structured-facts');
      for (const c of owner.claims)
        expect(c.conditions?.join(' ')).toMatch(/Không dùng làm phép lịch/);
    }
    expect(registry.groups.filter(g => g.authorFeatureId === 'feat-058')).toHaveLength(445);
    expect(registry.counts.groups).toBe(4638);
    expect(registry.exclusions).toHaveLength(17);
    expect(registry.layers.every(l => l.rosterStatus === 'unresolved')).toBe(true);
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(audit.complete).toBe(false);
    expect(manifest.nextBatch.note).toMatch(/feat-061.*Hệ Từ Thượng.*PBC.*NHL/);
    expect(getBookSource('source-book-bpct')!.editions[0]?.sha256).toBe(
      '713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a',
    );
  });
});
