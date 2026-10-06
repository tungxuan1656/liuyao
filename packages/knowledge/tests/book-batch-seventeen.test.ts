import { describe, expect, it } from 'vitest';
import article from '../data/liuyao/timing-relatives-body-spirits-and-sincerity-context.json';
import citations from '../data/citations/batch-seventeen-advanced.json';
import manifest from '../data/manifest.json';
import registry from '../../../docs/reviews/knowledge/expected-units.json';
import { getBookCitation, getBookRecord, getBookSource } from '../src/index';

function claim(number: number, layer: string) {
  const item = article.claims.find(c => c.id === `${article.id}-ch06-${number}-${layer}`);
  if (!item) throw new Error(`Missing BPCT ${number} ${layer}`);
  return item;
}
function citation(number: number, layer: string) {
  const item = citations.citations.find(c => c.id === `citation-bpct-ch6-${number}-${layer}`);
  if (!item) throw new Error(`Missing BPCT locator ${number} ${layer}`);
  return item;
}

// Expected bounds come from the supplied page images, not a heading-only scan.
const passages = [
  [57, 94, 94, 94, 94, 94, 94],
  [58, 94, 95, 95, 95, 95, 95],
  [59, 95, 95, 95, 95, 95, 95],
  [60, 95, 96, 96, 96, 96, 96],
  [61, 96, 96, 96, 96, 96, 96],
  [62, 96, 96, 96, 96, 96, 96],
  [63, 96, 97, 97, 97, 97, 97],
  [64, 97, 97, 97, 97, 97, 97],
  [65, 97, 98, 98, 98, 98, 99],
  [66, 99, 99, 99, 99, 99, 99],
  [67, 99, 99, 99, 99, 99, 99],
  [68, 99, 99, 99, 99, 99, 99],
  [69, 99, 99, 99, 99, 99, 100],
] as const;

describe('feat-050 BPCT chapter 6 sentences 57–69', () => {
  it.each(passages)(
    'keeps sentence %i verse, Vietnamese meaning and complete commentary distinct',
    (n, va, vb, ra, rb, ca, cb) => {
      expect(claim(n, 'verse').attribution.author).toMatch(/Lưu Bá Ôn/);
      expect(claim(n, 'rendering').attribution).toEqual({ author: 'Vĩnh Cao' });
      expect(claim(n, 'commentary').attribution).toEqual({
        author: 'Vương Hồng Tự',
        via: 'Vĩnh Cao — dịch và chú giải',
      });
      for (const [layer, start, end] of [
        ['verse', va, vb],
        ['rendering', ra, rb],
        ['commentary', ca, cb],
      ] as const) {
        expect(citation(n, layer)).toMatchObject({
          editionId: 'edition-bpct-supplied',
          textLayer: layer === 'commentary' ? 'author-commentary' : 'original-text',
          location: {
            pdfPageStart: start,
            pdfPageEnd: end,
            printedPageStart: String(start - 14),
            printedPageEnd: String(end - 14),
          },
        });
        expect(claim(n, layer).citationIds).toContain(citation(n, layer).id);
      }
      const sourceUnit = registry.groups.find(g => g.id === `bpct-ch06-${n}`);
      expect(sourceUnit).toMatchObject({
        pdfPageStart: va,
        pdfPageEnd: cb,
        recordIds: [article.id],
        authorFeatureId: 'feat-050',
        auditFeatureId: 'feat-085',
        discoveryStatus: 'unresolved',
      });
    },
  );

  it('registers and projects only reviewed original summaries with all own evidence', () => {
    expect(manifest.recordFiles).toContain(
      'liuyao/timing-relatives-body-spirits-and-sincerity-context.json',
    );
    expect(manifest.citationFiles).toContain('citations/batch-seventeen-advanced.json');
    expect(manifest.releaseIds).toContain(article.id);
    expect(article.claims).toHaveLength(61);
    expect(citations.citations).toHaveLength(43);
    expect(getBookRecord(article.id)).toEqual(article);
    for (const item of article.claims) {
      expect(item.text).not.toMatch(/[\p{Script=Han}]/u);
      expect(item.conditions.join(' ')).toMatch(/không phải kết quả thực chứng/);
      for (const id of item.citationIds) {
        expect(getBookCitation(id)).toBeDefined();
        expect(article.review.evidenceCitationIds).toContain(id);
      }
    }
    for (const item of citations.citations) expect(getBookCitation(item.id)).toEqual(item);
    expect(article.rights.basis).toBe('original-summary-and-structured-facts');
    expect(article.review).toMatchObject({ status: 'reviewed', method: 'source-comparison' });
    expect(article.review.note).toMatch(/No.*independent verification approval.*certification/);
    expect(article.review.note).toMatch(/individual full-page image/);
    expect(getBookSource('source-book-bpct')?.editions[0]?.sha256).toBe(
      '713f6f5b170a8e9e2dc39c137a2d18488bb5f185cdac1ade621953b5fa3f897a',
    );
    expect(manifest.nextBatch.note).toMatch(/feat-056/);
  });

  it('accounts for all twelve timing cases without a precedence or date algorithm', () => {
    const cases = article.claims.filter(c => c.id.includes('-58-commentary-case-'));
    expect(cases).toHaveLength(12);
    const sourceConditions = [
      /hợp trú.*kỳ xung/,
      /hưu tù.*vô khí.*vượng tướng/,
      /vượng tướng.*bất động.*xung động/,
      /hữu khí.*phát động.*ngày hợp.*hợp Nhật.*Nhật lâm.*Thế Thân.*ngày ấy/,
      /bị chế.*chế sát/,
      /đắc thời vượng động.*sinh phù.*quá vượng.*Mộ khố/,
      /vô khí phát động.*sinh phù.*ngày tháng sinh phù/,
      /nhập Mộ.*xung Mộ/,
      /Tuần Không an tĩnh.*xuất Tuần.*xung/,
      /Tuần Không phát động.*trị nhật.*xuất Tuần/,
      /Tuần Không động.*hợp.*xung.*ra Tuần/,
      /Tuần Không động.*xung.*xung thực.*ngày đó/,
    ];
    cases.forEach((item, index) => {
      expect(item.id).toBe(
        `${article.id}-ch06-58-commentary-case-${String(index + 1).padStart(2, '0')}`,
      );
      expect(item.text).toMatch(sourceConditions[index]!);
      expect(item.conditions.join(' ')).toMatch(/không bảng ưu tiên đầy đủ/);
      expect(item.citationIds).toEqual(['citation-bpct-ch6-58-commentary']);
    });
    expect(claim(57, 'commentary').text).toMatch(/Dụng.*Kỵ.*Nhật.*hóa hợp.*động hào.*cát.*hung/);
    expect(claim(58, 'commentary').text).toMatch(/chưa cho/);
    expect(claim(58, 'commentary-case-05').conditions.join(' ')).toMatch(/không cho bảng chế sát/);
    expect(claim(59, 'commentary').text).toMatch(/động khắc.*động sinh.*tĩnh sinh.*suy.*vượng/);
  });

  it('attaches only notes 12 and 13 to their marked passages, not their footer neighbors', () => {
    expect(
      citations.citations.filter(c => /^citation-bpct-ch6-.*-note-/.test(c.id)).map(c => c.id),
    ).toEqual(['citation-bpct-ch6-58-note-12', 'citation-bpct-ch6-63-note-13']);
    for (const [n, note, page] of [
      [58, 12, 95],
      [63, 13, 97],
    ] as const) {
      expect(claim(n, `note-${note}`).attribution).toEqual({ author: 'Vĩnh Cao' });
      expect(citation(n, `note-${note}`)).toMatchObject({
        textLayer: 'translator-note',
        location: { pdfPageStart: page, pdfPageEnd: page },
      });
    }
    expect(claim(58, 'note-12').text).toMatch(/cùng địa chi.*Dần.*hết Tuần/);
    expect(claim(63, 'note-13').text).toMatch(/Phụ Mẫu.*Quan Quỷ.*Tử Tôn.*Thê Tài.*Huynh Đệ.*Ta/);
    expect(article.claims.some(c => /-60-note-|-65-note-|-70-/.test(c.id))).toBe(false);
  });

  it('preserves role exceptions, source wording tensions and complete Quái thân contexts', () => {
    expect(claim(60, 'commentary').text).toMatch(/việc công.*việc tư.*không xóa/);
    expect(claim(61, 'commentary').text).toMatch(
      /quan chức.*văn thư.*kiện.*bệnh.*trộm.*quái dị.*tiền/,
    );
    expect(claim(62, 'rendering').text).toMatch(/bị khắc nhiều.*Đa.*Phản/);
    expect(claim(62, 'commentary').text).toMatch(/công danh.*thuốc.*Tài/);
    expect(claim(63, 'commentary').text).toMatch(/Quý Nhân.*Huyền Vũ.*Tài.*Tử.*Huynh/);
    expect(claim(64, 'commentary').text).toMatch(/Nguyệt quái thân.*Thế dương.*Tí.*Thế âm.*Ngọ/);
    expect(claim(64, 'commentary-presence').text).toMatch(
      /không hiện.*sinh.*trì.*hợp.*tĩnh.*động.*Ứng.*Tử.*phục/,
    );
    expect(claim(64, 'commentary-scope').text).toMatch(
      /Phi.*Biến.*Phục.*Không.*Mộ.*Tuyệt.*thân mệnh.*tướng mạo/,
    );
    expect(claim(64, 'commentary-direction').text).toMatch(
      /Thân khắc Thế.*Thế khắc Thân.*sinh hợp/,
    );
  });

  it('keeps all seven spirit clauses and the full continuation, with translator differences', () => {
    expect(claim(65, 'verse').text).toMatch(
      /Hổ.*Long.*Huyền Vũ.*Chu Tước.*Thiên Hỷ.*Vãng Vong.*sinh khắc/,
    );
    expect(claim(65, 'rendering').text).toMatch(/không nên ở.*tất\/tu.*Không.*đồng nhất/);
    expect(claim(65, 'commentary').text).toMatch(
      /Lục thân là gốc.*Lục thú là ngọn.*Thiên Hỷ.*Thiên Y.*Tang xa/,
    );
    expect(claim(65, 'commentary-tiger-dragon').text).toMatch(
      /Bạch Hổ.*sinh phù.*Thanh Long.*Kỵ.*Dụng/,
    );
    expect(claim(65, 'commentary-bird-tortoise').text).toMatch(/Huynh Đệ.*Huyền Vũ.*Quan/);
    expect(claim(65, 'commentary-joy').text).toMatch(/phê.*bệnh.*không kết luận sống\/chết/);
    expect(claim(65, 'commentary-travel').text).toMatch(
      /phê.*Vãng Vong.*Thế Thân Dụng.*Không dự báo tai nạn/,
    );
  });

  it('retains ritual/proxy and Tí-day doctrine as opinions, including the unnumbered conclusion', () => {
    expect(claim(66, 'rendering').text).toMatch(/thông biến.*tri tiền/);
    expect(claim(66, 'commentary').text).toMatch(
      /Long\/Hổ.*Thủy\/Hỏa.*Không.*Nguyệt phá.*Thân.*Ứng/,
    );
    expect(claim(67, 'commentary').text).toMatch(/thành tâm.*không dựng thêm/);
    expect(claim(68, 'commentary').text).toMatch(
      /y phục.*nhang.*rửa tay.*gia nhân.*thân hữu.*không quy định/,
    );
    expect(claim(69, 'commentary').text).toMatch(/Tí.*Lưu quốc sư.*không tùy Tí/);
    expect(claim(69, 'closing').text).toMatch(/không đánh số.*không câu 70/);
    expect(citation(69, 'closing')).toMatchObject({
      textLayer: 'author-commentary',
      location: { pdfPageStart: 100, pdfPageEnd: 100 },
    });
    expect(article.review.note).toMatch(/No other attached notes, diagrams or tables/);
    expect(registry.groups).toHaveLength(2070);
    expect(registry.exclusions).toHaveLength(17);
  });
});
