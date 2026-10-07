import { describe, expect, it } from 'vitest';
import locators from './fixtures/nhl-pbc-he-tu-thuong-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord, getBookSource } from '../src/index';

const unit = (id: string) => locators.find(u => u.id === id)!;
const text = (id: string) => {
  const u = unit(id);
  return getBookRecord(u.recordIds[0]!)!.claims.find(c => c.id === u.claimIds[0])!.text;
};

// Chapter intervals are independently read page boundaries, not inferred from
// adjacent starts: PBC chapters share pages and missing notices still have owners.
const chapterPages = {
  nhl: [
    [335, 337],
    [338, 339],
    [340, 341],
    [342, 343],
    [344, 345],
    [346, 346],
    [347, 347],
    [348, 351],
    [352, 355],
    [356, 357],
    [358, 360],
    [361, 362],
  ],
  pbc: [
    [601, 605],
    [605, 608],
    [608, 610],
    [611, 614],
    [614, 618],
    [619, 619],
    [620, 620],
    [620, 622],
    [623, 623],
    [623, 624],
    [625, 627],
    [628, 630],
  ],
};

describe('feat-061 NHL/PBC He Tu Thuong source dispositions', () => {
  it.each(locators)('projects each inspected disposition with its own evidence: $id', u => {
    expect(registry.groups.find(g => g.id === u.id)).toMatchObject({
      parentId: u.parentId,
      kind: u.kind,
      pdfPageStart: u.pdfPages[0],
      pdfPageEnd: u.pdfPages[1],
      editionId: `edition-${u.book}-supplied`,
      authorFeatureId: 'feat-061',
      auditFeatureId: 'feat-092',
      discoveryStatus: 'unresolved',
      recordIds: u.recordIds,
    });
    const owner = getBookRecord(u.recordIds[0]!)!;
    const claim = owner.claims.find(c => c.id === u.claimIds[0])!;
    expect(manifest.releaseIds).toContain(owner.id);
    expect(owner.review.status).toBe('reviewed');
    expect(owner.review.method).toBe('source-comparison');
    expect(claim.attribution?.author).toBe(u.attributedTo);
    expect(claim.conditions?.join(' ')).toContain('không xác minh');
    expect(claim.text).not.toMatch(/[\p{Script=Han}]/u);
    expect(claim.citationIds).toEqual(u.citationIds);
    for (const id of u.citationIds) {
      const c = getBookCitation(id)!;
      expect(c.sourceId).toBe(`source-book-${u.book}`);
      expect(c.editionId).toBe(`edition-${u.book}-supplied`);
      expect(c.attributedTo).toBe(u.attributedTo);
      expect([c.location.pdfPageStart, c.location.pdfPageEnd]).toEqual(u.pdfPages);
      expect(owner.review.evidenceCitationIds).toContain(id);
      if (u.book === 'nhl')
        expect([c.location.printedPageStart, c.location.printedPageEnd]).toEqual(u.printedPages);
      else {
        expect(c.location.printedPageStart).toBeUndefined();
        expect(c.location.printedPageEnd).toBeUndefined();
      }
    }
  });

  it('accounts for exactly the assigned 59 pages and all twelve parents per edition', () => {
    for (const book of ['nhl', 'pbc'] as const) {
      const pages = new Set(
        locators
          .filter(u => u.book === book)
          .flatMap(u =>
            Array.from(
              { length: u.pdfPages[1]! - u.pdfPages[0]! + 1 },
              (_, i) => u.pdfPages[0]! + i,
            ),
          ),
      );
      expect([...pages].sort((a, b) => a - b)).toEqual(
        Array.from(
          { length: book === 'nhl' ? 29 : 30 },
          (_, i) => i + (book === 'nhl' ? 334 : 601),
        ),
      );
      chapterPages[book].forEach((p, i) => {
        const suffix = String(i + 1).padStart(2, '0');
        expect(registry.groups.find(g => g.id === `${book}-he-tu-shang-${suffix}`)).toMatchObject({
          pdfPageStart: p[0],
          pdfPageEnd: p[1],
          recordIds: [`article-${book}-he-tu-thuong-${suffix}`],
          authorFeatureId: 'feat-061',
          auditFeatureId: 'feat-092',
        });
      });
    }
    expect(new Set(locators.flatMap(u => u.recordIds)).size).toBe(26);
    expect(locators).toHaveLength(430);
    expect(unit('nhl-he-tu-title-title-accounting').kind).toBe('non-content');
    expect(unit('pbc-he-tu-thuong-introductory-framing').chapter).toBe(0);
    expect(text('pbc-he-tu-thuong-introductory-framing')).toContain('không phải tiết1');
  });

  it('keeps PBC missing chapters edition-specific without filling from NHL or NTT', () => {
    for (const [ch, count] of [
      ['06', 3],
      ['09', 10],
    ] as const) {
      const missing = unit(`pbc-he-tu-shang-${ch}-missing-notice`);
      expect(missing.disposition).toContain('all chapter text layers absent');
      expect(text(missing.id)).toContain('Khuyết');
      expect(locators.filter(u => u.parentId === missing.parentId)).toHaveLength(1);
      const readings = locators.filter(
        u => u.parentId === `nhl-he-tu-shang-${ch}` && u.voice === 'original-reading',
      );
      expect(readings).toHaveLength(count);
      expect(text(`nhl-he-tu-shang-${ch}-pbc-omission-notice`)).toMatch(/NHL.*(?:còn|trình)/);
    }
    expect(locators.every(u => u.book === 'nhl' || u.book === 'pbc')).toBe(true);
  });

  it('preserves partial sections, referrals and shared page starts', () => {
    expect(text('pbc-he-tu-shang-08-selection-notice')).toContain('3,4,5,6');
    expect(text('pbc-he-tu-shang-08-section-05-referral')).toContain('không có Hán/đọc/dịch');
    expect(text('pbc-he-tu-shang-08-other-five-referral')).toContain('không tuyên bố');
    expect(unit('pbc-he-tu-shang-08-section-06-original-reading').pdfPages).toEqual([621, 622]);
    expect(text('pbc-he-tu-shang-10-selection-notice')).toContain('5 và6');
    expect(text('pbc-he-tu-shang-11-selection-notice')).toContain('1,2,4');
    expect(text('pbc-he-tu-shang-12-selection-notice')).toContain('1,2,3,5,6');
    expect(unit('pbc-he-tu-shang-12-section-07-translation').pdfPages).toEqual([629, 630]);
    expect(text('nhl-he-tu-shang-12-section-05-repeat-notice')).toContain('không dựng');
    expect(text('pbc-he-tu-shang-11-section-02-commentary')).toContain('không phần thi viên');
  });

  it('retains source labels and translation alternatives rather than harmonizing editions', () => {
    expect(text('nhl-he-tu-shang-07-section-02-translation')).toContain('thành tín');
    expect(text('pbc-he-tu-shang-07-section-02-commentary')).toContain('thành tính');
    expect(text('pbc-he-tu-shang-03-section-04-commentary')).toMatch(/giới.*hối/);
    expect(text('nhl-he-tu-shang-09-s05-chu-hi-arithmetic')).toContain('Kinh Thi');
    expect(text('nhl-he-tu-shang-11-section-07b-translation')).toContain('7 lần thứ hai');
    expect(text('nhl-he-tu-shang-11-s07a-chu-hi-lost-word')).toContain('Không thêm');
    expect(text('nhl-he-tu-shang-08-s04-wilhelm-subject')).toMatch(/thánh nhân.*người học/);
    expect(text('nhl-he-tu-shang-09-s03-nguyen-duy-tinh')).toContain('e sai');
    expect(text('nhl-he-tu-shang-09-s09-nguyen-duy-tinh')).toContain('danh từ');
  });

  it('keeps all observed named layers and quote-versus-comment voices discoverable', () => {
    const names = new Set(locators.map(u => u.attributedTo));
    for (const name of [
      'Nguyễn Hiến Lê',
      'Phan Bội Châu',
      'R. Wilhelm',
      'J. Legge',
      'Chu Hi',
      'Nguyễn Duy Tỉnh',
      'Trang Tử',
      'Mạnh Tử',
      'Tuân Tử',
      'Đổng Trọng Thư',
      'Dương Hùng',
      'Lão Tử',
      'Dương Thành Trai',
      'Vua Thuấn — lời được PBC dẫn',
    ])
      expect(names.has(name)).toBe(true);
    for (const n of [5, 6, 7, 8, 9, 10, 11]) {
      const suffix = String(n).padStart(2, '0');
      expect(unit(`nhl-he-tu-shang-08-section-${suffix}-kinh-quotation`).voice).toBe(
        'original-reading',
      );
      expect(unit(`nhl-he-tu-shang-08-section-${suffix}-confucius-comment`).attributedTo).toContain(
        'truyền gán',
      );
    }
    expect(
      locators
        .filter(u => u.book === 'pbc' && u.voice === 'translation')
        .every(u => u.disposition.includes('integrated Vietnamese explanation')),
    ).toBe(true);
  });

  it('retains exact supplied identities and leaves audit/certification gates closed', () => {
    expect(getBookSource('source-book-nhl')?.editions[0]).toMatchObject({
      id: 'edition-nhl-supplied',
      pdfPageCount: 393,
      sha256: '9967d19f5ecd805ba6a14bad22e4456040a05d959a633452d3a85a14c92d619e',
    });
    expect(getBookSource('source-book-pbc')?.editions[0]).toMatchObject({
      id: 'edition-pbc-supplied',
      pdfPageCount: 655,
      sha256: 'cbe589d41b3285a8287800a0ed3789c5c0324fba6c80f35e9c27a25377a4d2d6',
    });
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(registry.exclusions).toHaveLength(17);
    expect(registry.layers.every(l => l.rosterStatus === 'unresolved')).toBe(true);
  });
});
