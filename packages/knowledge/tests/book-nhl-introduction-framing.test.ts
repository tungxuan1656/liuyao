import { describe, expect, it } from 'vitest';
import locators from './fixtures/nhl-introduction-framing-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord, getBookSource } from '../src/index';

const unit = (id: string) => locators.find(u => u.id === id)!;
const text = (id: string) => {
  const u = unit(id);
  return getBookRecord(u.recordIds[0]!)!.claims.find(c => c.id === u.claimIds[0])!.text;
};

describe('feat-059 NHL introduction and framing source dispositions', () => {
  it.each(locators)('projects inspected evidence without audit approval for $id', u => {
    expect(registry.groups.find(g => g.id === u.id)).toMatchObject({
      parentId: u.parentId,
      kind: u.kind,
      pdfPageStart: u.pdfPages[0]!,
      pdfPageEnd: u.pdfPages[1]!,
      authorFeatureId: 'feat-059',
      auditFeatureId: 'feat-092',
      discoveryStatus: 'unresolved',
      recordIds: u.recordIds,
    });
    for (const id of u.recordIds) {
      const owner = getBookRecord(id)!;
      expect(owner).toBeDefined();
      expect(manifest.releaseIds).toContain(id);
      expect(owner.review.method).toBe('source-comparison');
    }
    for (const id of u.claimIds) {
      const claim = u.recordIds
        .map(r => getBookRecord(r)!.claims.find(c => c.id === id))
        .find(c => c !== undefined)!;
      expect(claim).toBeDefined();
      if (u.voice !== 'prior-selected') {
        expect(claim.kind).toBe('author-interpretation');
        expect(claim.attribution?.author).toBe(u.attributedTo);
        expect(claim.conditions?.join(' ')).toContain('không xác minh');
        expect(claim.text).not.toMatch(/[\p{Script=Han}]/u);
      }
      expect(claim.citationIds.every(c => getBookCitation(c))).toBe(true);
    }
    for (const id of u.citationIds) {
      const citation = getBookCitation(id)!;
      expect(citation.sourceId).toBe('source-book-nhl');
      expect(citation.editionId).toBe('edition-nhl-supplied');
      if (u.voice !== 'prior-selected') {
        expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(u.pdfPages);
        expect(citation.attributedTo).toBe(u.attributedTo);
        const owner = getBookRecord(u.recordIds[0]!)!;
        expect(owner.review.evidenceCitationIds).toContain(id);
        if (u.pdfPages[0]! >= 10) {
          expect([citation.location.printedPageStart, citation.location.printedPageEnd]).toEqual(
            u.pdfPages.map(String),
          );
        } else {
          expect(citation.location.printedPageStart).toBeUndefined();
        }
      }
    }
  });

  it('accounts for every assigned page but authors no hexagram or actual He Tu chapter', () => {
    const pages = new Set(
      locators.flatMap(u =>
        Array.from({ length: u.pdfPages[1]! - u.pdfPages[0]! + 1 }, (_, i) => u.pdfPages[0]! + i),
      ),
    );
    for (const n of [...Array.from({ length: 130 }, (_, i) => i + 1), 389, 390, 391, 392, 393])
      expect(pages.has(n)).toBe(true);
    expect(pages.has(131)).toBe(false);
    expect(pages.has(388)).toBe(false);
    expect(unit('nhl-contents-accounting').kind).toBe('non-content');
    expect(unit('nhl-contents-accounting').pdfPages).toEqual([4, 9]);
    expect(unit('nhl-blank-393-accounting').kind).toBe('non-content');
    expect(registry.groups.find(g => g.id === 'nhl-he-tu-ha-12')).toMatchObject({
      pdfPageStart: 386,
      pdfPageEnd: 388,
      authorFeatureId: 'feat-062',
    });
  });

  it('retains the eleven bounded article owners and all seven introduction parents', () => {
    const ids = [
      ...new Set(locators.filter(u => u.voice !== 'prior-selected').flatMap(u => u.recordIds)),
    ];
    expect(ids).toHaveLength(11);
    expect(ids.every(id => id.startsWith('article-nhl-'))).toBe(true);
    for (let n = 1; n <= 7; n++) {
      const suffix = String(n).padStart(2, '0');
      expect(registry.groups.find(g => g.id === `nhl-intro-ch${suffix}`)?.recordIds).toContain(
        `article-nhl-introduction-${suffix}`,
      );
    }
  });

  it('distinguishes traditional authorship, NHL arguments, and quoted voices', () => {
    expect(text('nhl-intro-ch02-traditional-authorship')).toMatch(/Khổng Tử.*Không.*chứng minh/);
    expect(text('nhl-intro-ch02-authorship-evaluation')).toMatch(
      /Âu Dương Tu.*nhiều người.*không consensus/,
    );
    expect(unit('nhl-intro-ch02-tuan-example').attributedTo).toContain('tác giả chưa xác lập');
    expect(text('nhl-intro-ch02-seven-ten')).toMatch(/bảy truyện.*mười thiên.*PBC.*Legge/);
    expect(text('nhl-part2-framing-selective-wings')).toMatch(
      /không dịch trọn.*không absence finding/,
    );
    expect(text('nhl-part2-framing-method-limit')).toMatch(/không certify downstream/);
  });

  it('retains competing theories and diagram/text discrepancies without calculator repairs', () => {
    expect(text('nhl-intro-ch01-generation')).toMatch(
      /hình2 thiếu dương.*hình4 thiếu âm.*gọi ngược/,
    );
    expect(text('nhl-intro-ch01-doubling-authorship')).toMatch(
      /Vương Bật.*Trịnh Huyền.*Tôn Thịnh.*Tư Mã Thiên/,
    );
    expect(text('nhl-intro-ch01-later-order')).toMatch(/Khảm.*Đại Súc.*giữ sai khác/);
    expect(text('nhl-intro-ch01-tai-diagram')).toMatch(/quẻ trên.*không.*đồng nhất/);
    expect(text('nhl-intro-ch04-jiji-central-chart')).toMatch(/nét vẽ liền cả sáu.*Không dựng lại/);
    expect(text('nhl-intro-ch04-chai-relation')).toMatch(/hai thuyết.*thứ ba/);
    expect(text('nhl-intro-ch07-small-times')).toMatch(/lặp hào5.*không sửa hào6/);
  });

  it('keeps inspected diagrams descriptive and the two numbering systems distinct', () => {
    expect(text('nhl-intro-ch01-magic-square')).toContain('4,9,2 / 3,5,7 / 8,1,6');
    expect(text('nhl-intro-ch01-earlier-heaven')).toMatch(/Nam.*trên.*Bắc.*dưới/);
    expect(text('nhl-intro-ch03-binary-chart')).toMatch(/0–63.*không thứ tự1–64/);
    expect(text('nhl-intro-ch05-month-chart')).toMatch(/tháng4 Càn.*3 Quải.*không tạo lịch/);
    expect(text('nhl-part2-framing-number-warning')).toContain('không phải số ở đồ Phục Hi');
  });

  it('reuses selected chapter-four material without duplicating its claims or citations', () => {
    expect(locators.filter(u => u.voice === 'prior-selected')).toHaveLength(5);
    expect(unit('nhl-intro-ch04-selected-tung-ly')).toMatchObject({
      recordIds: ['article-tung-to-ly'],
      claimIds: ['claim-tung-to-ly'],
      citationIds: ['citation-nhl-p73-technical'],
    });
    expect(
      getBookRecord('article-nhl-introduction-04')!.claims.some(c => c.id === 'claim-tung-to-ly'),
    ).toBe(false);
    expect(getBookRecord('article-tung-to-ly')!.schemaVersion).toBe(1);
    expect(
      getBookCitation('citation-nhl-q24-overview-seven-changes-nhl')!.location.pdfPageStart,
    ).toBe(94);
    expect(unit('nhl-intro-ch05-selected-seven-changes').claimIds).toEqual([
      'hexagram-24-overview-nhl',
    ]);
  });

  it('keeps reported cases, ethical opinions and efficacy claims non-authoritative', () => {
    expect(text('nhl-intro-ch03-jung-second')).toMatch(/không chẩn đoán tâm lý/);
    expect(text('nhl-intro-ch05-fate-efficacy')).toMatch(/không dám quyết.*người.*không tin/);
    expect(text('nhl-intro-ch06-education-case')).toMatch(/không kiểm chứng.*không.*advice/);
    expect(text('nhl-intro-ch06-family-gender')).toMatch(/không nghĩa vụ giới/);
    expect(text('nhl-intro-ch07-optimism-conflict')).toMatch(
      /Không xác minh.*không.*|Không xác minh.*thúc bạo lực/,
    );
    expect(text('nhl-retrospective-closing')).toMatch(/11-04-1979.*không publication date/);
    expect(getBookSource('source-book-nhl')!.editions[0]!.pdfPageCount).toBe(393);
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
  });
});
