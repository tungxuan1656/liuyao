import { describe, expect, it } from 'vitest';
import locators from './fixtures/bpct-loss-household-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import { getBookCitation, getBookRecord } from '../src/index';

const chapters = [
  [13, 'thirteen-loss', 166, 175],
  [14, 'fourteen-travel', 176, 183],
  [15, 'fifteen-teacher', 184, 190],
  [16, 'sixteen-study', 191, 199],
  [17, 'seventeen-marriage', 200, 211],
  [18, 'eighteen-childbirth', 212, 222],
  [19, 'nineteen-household', 223, 230],
] as const;

describe('feat-053 independently mapped source obligations', () => {
  it.each(locators)('registers $id with exact bounds and layers before authoring', unit => {
    const pages = [unit.originalReadingPages, unit.meaningPages, unit.commentaryPages]
      .filter(p => p !== null)
      .flat();
    const layers = [];
    if (unit.originalReadingPages) layers.push('layer-bpct-original-text');
    if (unit.meaningPages) layers.push('layer-bpct-translation');
    if (unit.commentaryPages)
      layers.push(
        unit.kind === 'non-content'
          ? 'layer-bpct-uncredited-supplement'
          : unit.id.includes('-note-')
            ? 'layer-bpct-translator-note'
            : 'layer-bpct-author-commentary',
      );
    expect(registry.groups.find(g => g.id === unit.id)).toMatchObject({
      parentId: `bpct-part1-ch${unit.chapter}`,
      kind: unit.kind,
      pdfPageStart: Math.min(...pages),
      pdfPageEnd: Math.max(...pages),
      authorFeatureId: 'feat-053',
      auditFeatureId: 'feat-087',
      layerScopeIds: layers,
      discoveryStatus: 'unresolved',
    });
  });
  it('preserves parent intervals, observed gaps, and actual folio-only boundaries', () => {
    for (const [ch, , start, end] of chapters) {
      expect(registry.groups.find(g => g.id === `bpct-part1-ch${ch}`)).toMatchObject({
        pdfPageStart: start,
        pdfPageEnd: end,
        discoveryStatus: 'unresolved',
      });
    }
    for (const id of ['bpct-ch15-16', 'bpct-ch17-31', 'bpct-ch18-41'])
      expect(locators.some(u => u.id === id)).toBe(false);
    expect(locators.find(u => u.id === 'bpct-ch15-closing')).toMatchObject({
      originalReadingPages: [189, 189],
      meaningPages: [189, 189],
      commentaryPages: [189, 189],
    });
    expect(locators.find(u => u.id === 'bpct-ch15-folio-190')).toMatchObject({
      kind: 'non-content',
      commentaryPages: [190, 190],
      printedPages: ['161', '161'],
    });
    expect(locators.find(u => u.id === 'bpct-ch18-folio-222')).toMatchObject({
      kind: 'non-content',
      commentaryPages: [222, 222],
      printedPages: ['190', '190'],
    });
    expect(locators.find(u => u.id === 'bpct-ch18-42')?.commentaryPages).toEqual([221, 221]);
    expect(locators.find(u => u.id === 'bpct-ch14-07')?.meaningPages).toBeNull();
  });
});

// Checkpoints enter the manifest only after passage comparison; pending maps are not releases.
for (const [chapter, name] of chapters) {
  const record = getBookRecord(`article-bpct-chapter-${name}`);
  if (!record) continue;
  describe(`feat-053 source-compared chapter ${chapter}`, () => {
    it.each(locators.filter(u => u.chapter === chapter))(
      'projects every actual layer of $id with its exact locator and attribution',
      unit => {
        const layers = [
          ['verse', unit.originalReadingPages, 'original-text'],
          ['rendering', unit.meaningPages, 'original-text'],
          [
            unit.kind === 'non-content'
              ? 'folio'
              : unit.id.includes('-note-')
                ? 'discussion'
                : 'commentary',
            unit.commentaryPages,
            unit.kind === 'non-content'
              ? 'supplement'
              : unit.id.includes('-note-')
                ? 'translator-note'
                : 'author-commentary',
          ],
        ] as const;
        for (const [suffix, pages, textLayer] of layers) {
          const claim = record.claims.find(c => c.id === `${record.id}-${unit.id}-${suffix}`);
          if (!pages) {
            expect(claim).toBeUndefined();
            continue;
          }
          expect(claim).toBeDefined();
          expect(claim!.kind).toBe('author-interpretation');
          expect(claim!.conditions?.join(' ')).toMatch(/không phải kết quả thực chứng/);
          expect(claim!.conditions?.join(' ')).toMatch(/không dùng làm phép lịch/);
          expect(claim!.text).not.toMatch(/[\p{Script=Han}]/u);
          expect(claim!.attribution?.author).toBeTruthy();
          for (const id of claim!.citationIds) {
            const citation = getBookCitation(id)!;
            expect(citation.editionId).toBe('edition-bpct-supplied');
            expect(citation.textLayer).toBe(textLayer);
            expect(citation.attributedTo).toBe(claim!.attribution?.author);
            expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(pages);
            expect(record.review.evidenceCitationIds).toContain(id);
          }
        }
        expect(registry.groups.find(g => g.id === unit.id)?.recordIds).toContain(record.id);
      },
    );
  });
}

describe('feat-053 loss qualifications', () => {
  it('keeps the note2 disagreement and question-specific useful spirits separate', () => {
    const record = getBookRecord('article-bpct-chapter-thirteen-loss')!;
    const text = (suffix: string) => record.claims.find(c => c.id.endsWith(suffix))!.text;
    expect(text('bpct-ch13-03-verse')).toMatch(/láng giềng/);
    expect(text('bpct-ch13-03-commentary')).toMatch(/gian hào/);
    expect(text('bpct-ch13-note-02-discussion')).toMatch(/Hai lớp.*không chọn/);
    expect(text('bpct-ch13-33-commentary')).toMatch(/đã hoá Quan.*không xét Phục/);
    expect(text('bpct-ch13-34-commentary')).toMatch(/riêng Quỷ.*riêng Thế/);
    expect(text('bpct-ch13-37-commentary')).toMatch(
      /xe\/thuyền\/áo\/văn thư lấy Phụ.*chim\/thú lấy Tử/,
    );
    expect(text('bpct-ch13-26-commentary')).toMatch(
      /Tí.*Sửu.*Dần.*Mão.*Thìn.*Tị.*Ngọ.*Mùi.*Thân.*Dậu.*Tuất.*Hợi/,
    );
    expect(record.review.note).toMatch(/Not individual full-size review/);
    expect(record).not.toHaveProperty('tables');
    expect(record).not.toHaveProperty('figures');
  });
});

describe('feat-053 travel context and source discrepancies', () => {
  it('does not invent22, flatten Phụ/Phúc, or make all travel use Thế', () => {
    const record = getBookRecord('article-bpct-chapter-fourteen-travel')!;
    const text = (suffix: string) => record.claims.find(c => c.id.endsWith(suffix))!.text;
    expect(text('bpct-ch14-opening-verse')).toMatch(/nhãn23.*không.*22/i);
    expect(text('bpct-ch14-13-verse')).toMatch(/Tài\/Phụ/);
    expect(text('bpct-ch14-13-commentary')).toMatch(/Tài\/Phúc.*giữ khác lớp/i);
    expect(text('bpct-ch14-16-rendering')).toMatch(/Thế khắc Thế.*không sửa ngầm/);
    expect(text('bpct-ch14-25-commentary')).toMatch(/con cháu dùng Tử.*không mặc định Thế/);
    expect(text('bpct-ch14-18-commentary')).toMatch(/quyền quý riêng.*Tử động khắc Quan/);
    expect(text('bpct-ch14-note-01-discussion')).toMatch(/xung Thế.*xung hào.*hợp/);
  });
});

describe('feat-053 teacher versus teaching-house roles', () => {
  it('preserves actual roles, allusions and folio190 without inventing16', () => {
    const teacher = getBookRecord('article-bpct-chapter-fifteen-teacher')!;
    const study = getBookRecord('article-bpct-chapter-sixteen-study')!;
    const text = (record: typeof teacher, suffix: string) =>
      record.claims.find(c => c.id.endsWith(suffix))!.text;
    expect(text(teacher, 'bpct-ch15-02-commentary')).toMatch(/chưa rõ.*Ứng.*Học trò.*Phụ/);
    expect(text(teacher, 'bpct-ch15-18-commentary')).toMatch(
      /tự hỏi dùng Thế.*cha\/anh hỏi dùng Tử/,
    );
    expect(text(teacher, 'bpct-ch15-21-commentary')).toMatch(
      /Thế cho cha.*Tử cho con.*Ứng cho thầy/,
    );
    expect(text(teacher, 'bpct-ch15-closing-commentary')).toMatch(
      /học nghề\/tu.*bạn\/anh em dùng Huynh/,
    );
    expect(text(teacher, 'bpct-ch15-folio-190-folio')).toMatch(/chỉ có số in161.*đã hết.*189/);
    expect(text(teacher, 'bpct-ch15-09-commentary')).toMatch(/Long Đức.*Hổ.*không gộp/);
    expect(text(study, 'bpct-ch16-01-commentary')).toMatch(/Thế cho thầy.*không học trò/);
    expect(text(study, 'bpct-ch16-12-commentary')).toMatch(/Tài làm thu nhập.*Dụng thư quán/);
    expect(text(study, 'bpct-ch16-03-rendering')).toMatch(/kém khoẻ.*khác thiếu tráng/);
    expect(text(study, 'bpct-ch16-23-rendering')).toMatch(/vượng địa.*không ghi Dưỡng/);
    expect(text(study, 'bpct-ch16-note-11-discussion')).toMatch(/Dương Thì\/Du Tạc.*24.*196.*197/);
    expect(getBookCitation('citation-bpct-ch16-21-verse')?.location.pdfPageEnd).toBe(195);
    expect(getBookCitation('citation-bpct-ch16-21-rendering')?.location.pdfPageStart).toBe(196);
  });
});

describe('feat-053 marriage limitations and source differences', () => {
  it('does not universalize Tài/Quan, mortality, gender duties or contradictory layers', () => {
    const record = getBookRecord('article-bpct-chapter-seventeen-marriage')!;
    const text = (suffix: string) => record.claims.find(c => c.id.endsWith(suffix))!.text;
    expect(text('bpct-ch17-17-commentary')).toMatch(/không được suy vợ\/chồng chết/);
    expect(text('bpct-ch17-17-commentary')).toMatch(/Cha\/chú.*Tử.*anh hỏi em.*Huynh/);
    expect(text('bpct-ch17-45-commentary')).toMatch(/bác lấy Quan\/Tài chung/);
    expect(text('bpct-ch17-33-commentary')).toMatch(/riêng người mối.*Ứng, không gian/);
    expect(text('bpct-ch17-07-commentary')).toMatch(/không chấp thuận cưỡng hôn/);
    expect(text('bpct-ch17-18-commentary')).toMatch(/gia trưởng.*không nghĩa vụ phục tùng/);
    expect(text('bpct-ch17-16-commentary')).toMatch(/chưa biết.*đã từng gặp.*giữ mâu thuẫn/);
    expect(text('bpct-ch17-25-commentary')).toMatch(/bác chú cũ.*không thực chứng/);
    expect(text('bpct-ch17-04-rendering')).toMatch(/khác sắc thái/);
    expect(text('bpct-ch17-26-verse')).toMatch(/hợp Tài\/Quỷ hoà Quỷ.*hoá Quỷ/);
  });
});
