import { describe, expect, it } from 'vitest';
import locators from './fixtures/bpct-litigation-spirits-state-conflict-flight-locators.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import citations from '../data/citations/batch-twenty-three-advanced.json';
import manifest from '../data/manifest.json';
import audit from '../reports/audit-status.json';
import { getBookCitation, getBookRecord } from '../src/index';

const chapters = [
  ['27', 'twenty-seven-litigation', 302, 309, 42, 36],
  ['28', 'twenty-eight-spirits', 310, 315, 43, 35],
  ['29', 'twenty-nine-agriculture', 316, 322, 41, 30],
  ['30', 'thirty-livestock', 323, 329, 42, 33],
  ['31', 'thirty-one-sericulture', 330, 334, 43, 22],
  ['32', 'thirty-two-state', 335, 339, 44, 25],
  ['33', 'thirty-three-conflict', 340, 346, 44, 28],
  ['34', 'thirty-four-disorder', 347, 356, 45, 48],
  ['35', 'thirty-five-flight', 357, 364, 46, 37],
] as const;
const record = (name: string) => getBookRecord(`article-bpct-chapter-${name}`)!;
const claim = (name: string, suffix: string) =>
  record(name).claims.find(c => c.id.endsWith(suffix))!;
const text = (name: string, suffix: string) => claim(name, suffix).text;

describe('feat-056 inspected chapter27–35 source layers', () => {
  it.each(locators)('keeps every observed layer and exact locator for $id', unit => {
    const article = getBookRecord(unit.recordId)!;
    const note = unit.voice === 'note';
    const pages = [unit.originalReadingPages, unit.meaningPages, unit.commentaryPages]
      .filter(p => p !== null)
      .flat();
    const layers = [];
    if (unit.originalReadingPages) layers.push('layer-bpct-original-text');
    if (unit.meaningPages) layers.push('layer-bpct-translation');
    if (unit.commentaryPages)
      layers.push(note ? 'layer-bpct-translator-note' : 'layer-bpct-author-commentary');
    expect(registry.groups.find(g => g.id === unit.id)).toMatchObject({
      parentId: unit.parentId,
      pdfPageStart: Math.min(...pages),
      pdfPageEnd: Math.max(...pages),
      authorFeatureId: 'feat-056',
      auditFeatureId: 'feat-090',
      layerScopeIds: layers,
      discoveryStatus: 'unresolved',
      recordIds: [article.id],
    });
    for (const [suffix, bounds, layer] of [
      ['verse', unit.originalReadingPages, 'original-text'],
      ['rendering', unit.meaningPages, 'original-text'],
      [
        note ? 'discussion' : 'commentary',
        unit.commentaryPages,
        note ? 'translator-note' : 'author-commentary',
      ],
    ] as const) {
      const c = article.claims.find(c => c.id === `${article.id}-${unit.id}-${suffix}`);
      if (!bounds) {
        expect(c).toBeUndefined();
        continue;
      }
      expect(c!.kind).toBe('author-interpretation');
      expect(c!.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(c!.conditions?.join(' ')).toMatch(/không phải kết quả thực chứng/);
      expect(c!.conditions?.join(' ')).toMatch(/không dùng làm phép lịch/);
      expect(c!.conditions?.join(' ')).toMatch(/pháp lý\/an toàn\/di tản/);
      expect(c!.conditions?.join(' ')).toMatch(/không xác nhận hoặc quy lỗi nạn nhân/);
      const author = c!.attribution!.author;
      if (suffix === 'verse') {
        expect(author).toMatch(/tín chỉ chung Lưu Bá Ôn/);
        expect(c!.attribution!.via).toMatch(/chưa xác lập tác giả riêng/);
      } else if (suffix === 'rendering') expect(author).toBe('Vĩnh Cao — nghĩa tiếng Việt');
      else if (note) expect(author).toBe('Vĩnh Cao');
      else {
        expect(author).toBe('Vương Hồng Tự');
        expect(c!.attribution!.via).toMatch(/không bảo đảm từng đoạn/);
      }
      const citation = getBookCitation(c!.citationIds[0]!)!;
      expect(citation.editionId).toBe('edition-bpct-supplied');
      expect(citation.textLayer).toBe(layer);
      expect(citation.attributedTo).toBe(author);
      expect([citation.location.pdfPageStart, citation.location.pdfPageEnd]).toEqual(bounds);
      const offset = chapters.find(ch => ch[0] === unit.chapter)![4];
      expect([citation.location.printedPageStart, citation.location.printedPageEnd]).toEqual(
        bounds.map(p => String(p - offset)),
      );
      for (const id of c!.citationIds) {
        expect(getBookCitation(id)).toBeDefined();
        expect(article.review.evidenceCitationIds).toContain(id);
      }
    }
  });

  it('preserves parent boundaries, actual numbering, missing commentary and prior exclusions', () => {
    expect(locators).toHaveLength(294);
    expect(locators.filter(u => u.voice === 'note')).toHaveLength(29);
    for (const [ch, name, start, end, , count] of chapters) {
      expect(locators.filter(u => u.chapter === ch)).toHaveLength(count);
      expect(registry.groups.find(g => g.id === `bpct-part1-ch${ch}`)).toMatchObject({
        pdfPageStart: start,
        pdfPageEnd: end,
        authorFeatureId: 'feat-056',
        auditFeatureId: 'feat-090',
        discoveryStatus: 'unresolved',
        recordIds: [record(name).id],
      });
    }
    expect(locators.find(u => u.id === 'bpct-ch29-23a')?.label).toBe('23a');
    expect(locators.find(u => u.id === 'bpct-ch29-23b')?.label).toBe('23b');
    expect(locators.some(u => u.id === 'bpct-ch35-05')).toBe(false);
    for (const id of [
      'bpct-ch27-opening',
      'bpct-ch27-34',
      'bpct-ch32-23',
      'bpct-ch33-closing',
      'bpct-ch35-opening',
      'bpct-ch35-30',
    ])
      expect(locators.find(u => u.id === id)?.commentaryPages).toBeNull();
    expect(locators.find(u => u.id === 'bpct-ch34-closing')?.originalReadingPages).toBeNull();
    expect(locators.find(u => u.id === 'bpct-ch34-closing')?.meaningPages).toBeNull();
    expect(registry.exclusions).toHaveLength(17);
    expect(registry.groups).toHaveLength(2070);
    expect(citations.citations.every(c => c.location.pdfPageStart >= 302)).toBe(true);
    expect(citations.citations.every(c => c.location.pdfPageEnd <= 364)).toBe(true);
    expect(text('thirty-livestock', 'bpct-ch30-note-diep-discussion')).toMatch(/không ký/);
  });
});

describe('feat-056 qualifications, source disagreements and question scope', () => {
  it('does not invent missing text or normalize unresolved words', () => {
    expect(text('twenty-seven-litigation', 'bpct-ch27-06-commentary')).toMatch(
      /dừng.*Không bổ sung/,
    );
    expect(text('twenty-seven-litigation', 'bpct-ch27-09-commentary')).toMatch(
      /ký tự x.*không tự sửa/,
    );
    expect(text('twenty-seven-litigation', 'bpct-ch27-03-commentary')).toMatch(/chưa đủ.*Quỷ/);
    expect(text('twenty-nine-agriculture', 'bpct-ch29-16-commentary')).toMatch(
      /Huynh Tử.*giữ cả hai/,
    );
    expect(text('thirty-livestock', 'bpct-ch30-09-commentary')).toMatch(/Canmf.*chưa giải/);
    expect(text('thirty-three-conflict', 'bpct-ch33-04-commentary')).toMatch(
      /Thế tự sinh không sửa/,
    );
    expect(text('thirty-five-flight', 'bpct-ch35-17-commentary')).toMatch(/dừng giữa ý.*không nối/);
  });

  it('keeps the translator rejection and the original/meaning alternatives separately cited', () => {
    expect(text('twenty-eight-spirits', 'bpct-ch28-14-commentary')).toMatch(/tư thông.*bác/);
    expect(text('twenty-eight-spirits', 'bpct-ch28-note-09-discussion')).toMatch(/không ăn khớp/);
    expect(claim('twenty-eight-spirits', 'bpct-ch28-note-09-discussion').citationIds).toEqual([
      'citation-bpct-ch28-note-09-discussion',
      'citation-bpct-ch28-14-verse',
      'citation-bpct-ch28-14-commentary',
    ]);
    expect(text('twenty-eight-spirits', 'bpct-ch28-03-rendering')).toMatch(/bỏ vế Chấn/);
    expect(text('twenty-eight-spirits', 'bpct-ch28-10-rendering')).toMatch(
      /người khắc ta.*người sinh ta/,
    );
    expect(text('thirty-five-flight', 'bpct-ch35-16-verse')).toMatch(/tương sinh/);
    expect(text('thirty-five-flight', 'bpct-ch35-16-commentary')).toMatch(
      /động xung.*Giữ tương sinh/,
    );
    expect(claim('thirty-five-flight', 'bpct-ch35-16-commentary').citationIds).toContain(
      'citation-bpct-ch35-16-verse',
    );
    expect(text('thirty-livestock', 'bpct-ch30-22-verse')).toMatch(/nguồn trộm/);
    expect(text('thirty-livestock', 'bpct-ch30-22-commentary')).toMatch(/đến trộm.*Giữ khác biệt/);
  });

  it('retains agricultural and animal qualifications without actionable advice', () => {
    expect(text('twenty-nine-agriculture', 'bpct-ch29-01-commentary')).toMatch(/trừ.*hoá Phúc/);
    expect(text('twenty-nine-agriculture', 'bpct-ch29-04-commentary')).toMatch(/Tử cùng động đảo/);
    expect(text('twenty-nine-agriculture', 'bpct-ch29-17-commentary')).toMatch(/riêng loại giống/);
    expect(text('thirty-livestock', 'bpct-ch30-03-commentary')).toMatch(
      /Trâu\/ngựa hỏi sức.*cùng dùng Tài/,
    );
    expect(text('thirty-one-sericulture', 'bpct-ch31-01-commentary')).toMatch(
      /bác.*Thuỷ Kỵ\/Hoả Dụng/,
    );
    expect(text('thirty-one-sericulture', 'bpct-ch31-14-commentary')).toMatch(
      /tơ tốt, giá lá đắt, tằm không vượng/,
    );
    expect(text('thirty-one-sericulture', 'bpct-ch31-18-commentary')).toMatch(/Tử Thuỷ tốt/);
  });

  it('distinguishes courtier, royal, conflict and fugitive questions', () => {
    expect(text('thirty-two-state', 'bpct-ch32-01-commentary')).toMatch(/Bề tôi.*Tuế vua.*Tử dân/);
    expect(text('thirty-two-state', 'bpct-ch32-06-commentary')).toMatch(/Vua tự bói Ứng hậu/);
    expect(text('thirty-two-state', 'bpct-ch32-09-commentary')).toMatch(/Tử tha cung.*bề tôi/);
    expect(text('thirty-two-state', 'bpct-ch32-12-commentary')).toMatch(/Tử bản cung/);
    expect(text('thirty-three-conflict', 'bpct-ch33-11-commentary')).toMatch(
      /Quan nhiều nhưng tĩnh.*Tử ít nhưng vượng động/,
    );
    expect(text('thirty-three-conflict', 'bpct-ch33-14-verse')).toMatch(/không Tử Tôn/);
    expect(text('thirty-four-disorder', 'bpct-ch34-29-commentary')).toMatch(
      /câu sau phụ vào Tị Loạn/,
    );
    expect(text('thirty-four-disorder', 'bpct-ch34-08-commentary')).toMatch(
      /Phúc tĩnh\/Quan động.*Tử Không/,
    );
    expect(text('thirty-four-disorder', 'bpct-ch34-27-commentary')).toMatch(
      /Phúc vượng\/Quan suy vô hại/,
    );
    expect(text('thirty-five-flight', 'bpct-ch35-23-commentary')).toMatch(/người bỏ trốn tự hỏi/);
    expect(text('thirty-five-flight', 'bpct-ch35-22-commentary')).toMatch(
      /hỏi tin khác Dụng người/,
    );
    expect(text('thirty-five-flight', 'bpct-ch35-25-commentary')).toMatch(/hai hướng hỏi/);
  });

  it('releases source-compared originals but does not approve audit or certification', () => {
    const articles = chapters.map(([, name]) => record(name));
    expect(articles.reduce((sum, r) => sum + r.claims.length, 0)).toBe(813);
    expect(citations.citations).toHaveLength(813);
    for (const r of articles) {
      expect(manifest.releaseIds).toContain(r.id);
      expect(r.review.status).toBe('reviewed');
      expect(r.review.method).toBe('source-comparison');
      expect(r.review.note).toMatch(/all63 page images/);
      expect(r.review.note).toMatch(/feat-090 audit.*remain open/);
      expect(r.rights.basis).toBe('original-summary-and-structured-facts');
    }
    expect(audit.gates.sourceReview.status).toBe('closed');
    expect(audit.gates.certification.status).toBe('closed');
    expect(audit.complete).toBe(false);
    expect(manifest.nextBatch.note).toMatch(/feat-057/);
  });
});
