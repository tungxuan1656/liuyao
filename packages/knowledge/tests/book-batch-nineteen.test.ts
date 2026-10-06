import { describe, expect, it } from 'vitest';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import nien from '../data/liuyao/bpct-nien-thoi.json';
import life from '../data/liuyao/bpct-chapter-nine-life.json';
import fame from '../data/liuyao/bpct-chapter-ten-fame.json';
import office from '../data/liuyao/bpct-chapter-eleven-office.json';
import weather from '../data/liuyao/bpct-chapter-seven-weather.json';
import citations from '../data/citations/batch-nineteen-advanced.json';
import { getBookCitation, getBookRecord, listBookSources } from '../src/index';

const checkpoints = [
  { prefix: 'bpct-ch11-', parent: 'bpct-part1-ch11', record: office, bounds: [149, 155] },
  { prefix: 'bpct-ch10-', parent: 'bpct-part1-ch10', record: fame, bounds: [142, 148] },
  { prefix: 'bpct-ch09-', parent: 'bpct-part1-ch09', record: life, bounds: [119, 141] },
  { prefix: 'bpct-nien-', parent: 'bpct-part1-nien-thoi', record: nien, bounds: [111, 118] },
  { prefix: 'bpct-ch07-', parent: 'bpct-part1-ch07', record: weather, bounds: [101, 110] },
];

// Registry obligations were mapped from source before authoring, not from claim counts.
for (const { prefix, parent, record, bounds } of checkpoints) {
  describe(`feat-052 source and public projection: ${parent}`, () => {
    it('releases only the source-compared record and preserves the exclusive parent', () => {
      expect(getBookRecord(record.id)).toEqual(record);
      expect(record.schemaVersion).toBe(2);
      expect(record.review.method).toBe('source-comparison');
      expect(registry.groups.find(g => g.id === parent)).toMatchObject({
        pdfPageStart: bounds[0],
        pdfPageEnd: bounds[1],
        discoveryStatus: 'unresolved',
        recordIds: [record.id],
      });
      expect(record).not.toHaveProperty('tables');
      expect(record).not.toHaveProperty('figures');
    });
    it.each(registry.groups.filter(g => g.id.startsWith(prefix)))(
      'gives $id its own claim evidence, attribution and exact source bounds',
      unit => {
        expect(unit.recordIds).toContain(record.id);
        expect(unit.discoveryStatus).toBe('unresolved');
        const claims = record.claims.filter(c =>
          c.citationIds.some(id => id.startsWith(`citation-${unit.id}-`)),
        );
        expect(claims.length).toBeGreaterThan(0);
        const locators = claims.flatMap(c => c.citationIds.map(id => getBookCitation(id)!));
        expect(Math.min(...locators.map(c => c.location.pdfPageStart))).toBe(unit.pdfPageStart);
        expect(Math.max(...locators.map(c => c.location.pdfPageEnd))).toBe(unit.pdfPageEnd);
        for (const claim of claims) {
          expect(claim.kind).toBe('author-interpretation');
          expect(claim.conditions.join(' ')).toMatch(/không phải kết quả thực chứng/);
          expect(claim.conditions.join(' ')).toMatch(/không dùng làm phép lịch/);
          expect(claim.text).not.toMatch(/[\p{Script=Han}]/u);
          expect(claim.attribution.author.length).toBeGreaterThan(0);
          for (const id of claim.citationIds) {
            const citation = getBookCitation(id)!;
            expect(citation).toBeDefined();
            expect(citation.editionId).toBe('edition-bpct-supplied');
            expect(citation.attributedTo).toBe(claim.attribution.author);
            expect(record.review.evidenceCitationIds).toContain(id);
            expect(citation.location.pdfPageStart).toBeGreaterThanOrEqual(unit.pdfPageStart);
            expect(citation.location.pdfPageEnd).toBeLessThanOrEqual(unit.pdfPageEnd);
            expect(citation.location.printedPageStart).toBeDefined();
            expect(citation.location.printedPageEnd).toBeDefined();
          }
        }
      },
    );
    it.each(record.claims)('preserves $id with its distinct layer in public lookup', claim => {
      const citation = citations.citations.find(c => c.id === claim.citationIds[0])!;
      expect(getBookCitation(citation.id)).toEqual(citation);
      if (claim.id.endsWith('-verse')) {
        expect(citation.textLayer).toBe('original-text');
        expect(claim.attribution.author).toMatch(/tín chỉ chung/);
      } else if (claim.id.endsWith('-rendering') && !claim.id.includes('supplement')) {
        expect(citation.textLayer).toBe('original-text');
        expect(claim.attribution.author).toBe('Vĩnh Cao — nghĩa tiếng Việt');
      } else if (claim.id.includes('-note-')) {
        expect(citation.textLayer).toBe('translator-note');
        expect(claim.attribution.author).toBe('Vĩnh Cao');
      } else if (claim.id.includes('-supplement') || claim.id.includes('-folio-')) {
        expect(citation.textLayer).toBe('supplement');
        expect(claim.attribution.author).toMatch(/không ký tên/);
      } else {
        expect(citation.textLayer).toBe('author-commentary');
        expect(claim.attribution.author).toBe('Vương Hồng Tự');
      }
    });
  });
}

describe('feat-052 weather qualifications and exclusions', () => {
  it('covers all 44 verse/meaning units and all fourteen timing cases without a classifier', () => {
    expect(weather.claims.filter(c => c.id.endsWith('-verse'))).toHaveLength(44);
    expect(weather.claims.filter(c => c.id.endsWith('-rendering'))).toHaveLength(44);
    expect(weather.claims.filter(c => c.id.includes('-43-timing-'))).toHaveLength(14);
    expect(weather.claims.find(c => c.id.endsWith('timing-05-discussion'))?.text).toMatch(
      /không sửa thành gặp hợp/,
    );
    expect(weather.claims.find(c => c.id.endsWith('32-commentary'))?.text).toMatch(
      /đích Quỷ xung.*đích Huynh khắc phá/,
    );
    expect(weather.claims.find(c => c.id.endsWith('37-commentary'))?.text).toMatch(
      /Xà.*khác Thanh Long/,
    );
    expect(weather.claims.find(c => c.id.endsWith('39-commentary'))?.text).toMatch(
      /không sửa Tài thành Tử/,
    );
  });
  it.each([
    ['ch07-04-verse', 101, 102, '85', '86'],
    ['ch07-26-commentary', 106, 106, '90', '90'],
    ['ch07-32-verse', 106, 107, '90', '91'],
    ['ch07-37-commentary', 108, 108, '92', '92'],
    ['ch07-42-rendering', 109, 109, '93', '93'],
    ['ch07-note-01-discussion', 109, 109, '93', '93'],
  ])('keeps inspected continuation %s', (suffix, a, b, pa, pb) => {
    expect(getBookCitation(`citation-bpct-${suffix}`)?.location).toMatchObject({
      pdfPageStart: a,
      pdfPageEnd: b,
      printedPageStart: pa,
      printedPageEnd: pb,
    });
  });
  it('does not publish local book paths, images or an independent approval', () => {
    expect(JSON.stringify(checkpoints.map(c => getBookRecord(c.record.id)))).not.toMatch(
      /localInputPath|docs\/books|data:image|specialistReview/,
    );
    expect(JSON.stringify(listBookSources())).not.toContain('localInputPath');
  });
});

describe('feat-052 unnumbered Niên Thời', () => {
  it('keeps 36 passages, five attached notes, all illustrations and no chapter8', () => {
    expect(nien.claims.filter(c => c.id.endsWith('-verse'))).toHaveLength(36);
    expect(nien.claims.filter(c => c.id.endsWith('-commentary'))).toHaveLength(35);
    expect(nien.claims.filter(c => c.id.includes('-note-'))).toHaveLength(5);
    expect(nien.claims.filter(c => c.id.includes('-examples-'))).toHaveLength(11);
    expect(nien.title).toContain('không đánh số chương');
    expect(registry.groups.some(g => g.id === 'bpct-part1-ch08')).toBe(false);
    expect(nien.claims.find(c => c.id.endsWith('31-commentary'))?.text).toMatch(/lạnh\/nóng/);
    expect(nien.claims.find(c => c.id.endsWith('03-commentary'))?.text).toMatch(
      /khác phú nói xung Thân/,
    );
  });
  it.each([
    ['03-verse', 111, 112],
    ['07-commentary', 113, 113],
    ['12-commentary', 114, 114],
    ['18-rendering', 115, 115],
    ['23-commentary', 116, 116],
    ['35-verse', 117, 118],
    ['36-rendering', 118, 118],
  ])('retains exact continuation %s', (suffix, a, b) => {
    expect(getBookCitation(`citation-bpct-nien-${suffix}`)?.location).toMatchObject({
      pdfPageStart: a,
      pdfPageEnd: b,
    });
  });
});

describe('feat-052 life passages, separate question roles and inserted essay', () => {
  it('covers80 verses and meanings, five notes, six question contexts, and thirty bilingual supplement items', () => {
    expect(life.claims.filter(c => c.id.endsWith('-verse'))).toHaveLength(80);
    expect(
      life.claims.filter(c => c.id.endsWith('-rendering') && !c.id.includes('supplement')),
    ).toHaveLength(80);
    expect(life.claims.filter(c => c.id.includes('-note-'))).toHaveLength(5);
    expect(registry.groups.filter(g => g.parentId === 'bpct-ch09-18')).toHaveLength(6);
    expect(life.claims.filter(c => /supplement-\d+-original$/.test(c.id))).toHaveLength(30);
    expect(life.claims.filter(c => /supplement-\d+-rendering$/.test(c.id))).toHaveLength(30);
    for (const c of life.claims.filter(c => c.id.includes('-supplement'))) {
      expect(c.attribution.author).toMatch(/không ký tên/);
      expect(getBookCitation(c.citationIds[0]!)?.textLayer).toBe('supplement');
    }
    expect(life.claims.find(c => c.id.endsWith('supplement-08-rendering'))?.text).toMatch(
      /keo kiệt.*khác nghĩa nghèo/,
    );
    expect(life.claims.find(c => c.id.endsWith('51-examples-discussion'))?.text).toMatch(
      /Không cổ vũ tự tử/,
    );
    expect(life.claims.find(c => c.id.endsWith('56-commentary'))?.text).toMatch(
      /Tài hợp Thế không luận/,
    );
    expect(life.claims.find(c => c.id.endsWith('18-rejected-periods-discussion'))?.text).toMatch(
      /30 năm.*60 năm.*testimony/,
    );
    expect(registry.groups.some(g => g.id === 'bpct-ch09-81')).toBe(false);
  });
  it.each([
    ['03-verse', 119, 120],
    ['18-commentary', 123, 124],
    ['23-verse', 124, 125],
    ['36-rendering', 128, 128],
    ['47-rendering', 130, 130],
    ['57-commentary', 131, 132],
    ['62-commentary', 133, 133],
    ['71-commentary', 135, 135],
    ['76-verse', 135, 136],
    ['80-rendering', 136, 137],
    ['supplement-19-original', 137, 137],
    ['supplement-19-rendering', 140, 140],
    ['supplement-closing-original', 138, 138],
    ['supplement-closing-rendering', 141, 141],
  ])('preserves full layer continuation %s', (suffix, a, b) => {
    expect(getBookCitation(`citation-bpct-ch09-${suffix}`)?.location).toMatchObject({
      pdfPageStart: a,
      pdfPageEnd: b,
    });
  });
});

describe('feat-052 examinations and recognition', () => {
  it('keeps both printed5 labels, opening and closing and all four notes', () => {
    expect(fame.claims.filter(c => c.id.endsWith('-verse'))).toHaveLength(28);
    expect(fame.claims.filter(c => c.id.endsWith('-commentary'))).toHaveLength(26);
    expect(fame.claims.filter(c => c.id.includes('-note-'))).toHaveLength(4);
    for (const label of ['05a', '05b'])
      expect(registry.groups.find(g => g.id === `bpct-ch10-${label}`)).toBeDefined();
    expect(registry.groups.some(g => g.id === 'bpct-ch10-26')).toBe(false);
    expect(fame.claims.find(c => c.id.endsWith('07-commentary'))?.text).toMatch(
      /Tài và Quan đều động.*lại xấu/,
    );
    expect(fame.claims.find(c => c.id.endsWith('23-commentary'))?.text).toMatch(
      /khác Không với Mộ\/Tuyệt/,
    );
    expect(fame.claims.find(c => c.id.endsWith('25-commentary'))?.text).toMatch(
      /hỏi cho con lấy Tử/,
    );
  });
  it.each([
    ['02-verse', 142, 143],
    ['06-rendering', 144, 144],
    ['11-verse', 144, 145],
    ['16-commentary', 146, 146],
    ['21-verse', 146, 147],
    ['25-commentary', 148, 148],
    ['closing-verse', 148, 148],
  ])('preserves boundary %s', (suffix, a, b) => {
    expect(getBookCitation(`citation-bpct-ch10-${suffix}`)?.location).toMatchObject({
      pdfPageStart: a,
      pdfPageEnd: b,
    });
  });
});

describe('feat-052 office roles and closing continuation', () => {
  it('covers26 labels, a separate closing through155 and three notes', () => {
    expect(office.claims.filter(c => c.id.endsWith('-verse'))).toHaveLength(27);
    expect(office.claims.filter(c => c.id.endsWith('-commentary'))).toHaveLength(26);
    expect(office.claims.filter(c => c.id.includes('-note-'))).toHaveLength(3);
    expect(office.claims.find(c => c.id.endsWith('13-commentary'))?.text).toMatch(
      /Giữ đảo chiều phú\/bình/,
    );
    expect(office.claims.find(c => c.id.endsWith('23-commentary'))?.text).toMatch(
      /Hai loại câu hỏi giữ riêng/,
    );
    expect(office.claims.find(c => c.id.endsWith('26-commentary'))?.text).toMatch(
      /không đánh giá thuốc/,
    );
  });
  it.each([
    ['03-rendering', 150, 150],
    ['07-commentary', 151, 151],
    ['17-commentary', 153, 153],
    ['closing-verse', 154, 155],
    ['closing-rendering', 155, 155],
  ])('retains source boundary %s', (suffix, a, b) => {
    expect(getBookCitation(`citation-bpct-ch11-${suffix}`)?.location).toMatchObject({
      pdfPageStart: a,
      pdfPageEnd: b,
    });
  });
});
