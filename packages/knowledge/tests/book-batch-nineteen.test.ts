import { describe, expect, it } from 'vitest';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import nien from '../data/liuyao/bpct-nien-thoi.json';
import weather from '../data/liuyao/bpct-chapter-seven-weather.json';
import citations from '../data/citations/batch-nineteen-advanced.json';
import { getBookCitation, getBookRecord, listBookSources } from '../src/index';

const checkpoints = [
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
