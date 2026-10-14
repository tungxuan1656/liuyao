import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const KNOWLEDGE_DATA = new URL('../data', import.meta.url).pathname;

function loadAllRecords(dir) {
  const records = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      records.push(...loadAllRecords(fullPath));
    } else if (entry.name.endsWith('.json')) {
      try {
        const parsed = JSON.parse(readFileSync(fullPath, 'utf8'));
        records.push(parsed);
      } catch {
        // Skip unparseable
      }
    }
  }
  return records;
}

describe('BPCT Chapter 6 — sixty-nine sentences coverage and verification', () => {
  const allRecords = loadAllRecords(KNOWLEDGE_DATA);

  // Map each sentence 1..69 to its referencing records
  const sentenceMap = new Map();
  for (let i = 1; i <= 69; i++) {
    sentenceMap.set(i, []);
  }

  for (const record of allRecords) {
    const refs = [];
    if (Array.isArray(record.sourceReferences)) {
      refs.push(...record.sourceReferences);
    }
    if (Array.isArray(record.entries)) {
      for (const entry of record.entries) {
        if (Array.isArray(entry.references)) {
          refs.push(...entry.references);
        }
      }
    }

    for (const ref of refs) {
      if (ref?.sourceId !== 'source-book-bpct' || typeof ref.section !== 'string') {
        continue;
      }
      // Match direct Chapter 6 sentence references
      const directMatch = ref.section.match(/^Câu\s+(\d+)(?:[–-](\d+))?\b/);
      if (directMatch) {
        const start = parseInt(directMatch[1], 10);
        const end = directMatch[2] ? parseInt(directMatch[2], 10) : start;
        for (let snum = start; snum <= end; snum++) {
          if (snum >= 1 && snum <= 69) {
            sentenceMap.get(snum).push({
              recordId: record.id,
              section: ref.section,
              pdfPages: ref.pdfPages,
              printedPages: ref.printedPages,
            });
          }
        }
      }
    }
  }

  it('maps every single sentence from 1 to 69 to at least one knowledge record', () => {
    for (let snum = 1; snum <= 69; snum++) {
      const entries = sentenceMap.get(snum);
      expect(
        entries.length,
        `Sentence ${snum} must be represented in knowledge records`,
      ).toBeGreaterThan(0);
    }
  });

  it('strictly validates page boundaries for all direct Chapter 6 references (PDF 77-100, printed 63-86)', () => {
    let checkedDirectRefs = 0;

    for (const record of allRecords) {
      const refs = [
        ...(record.sourceReferences || []),
        ...(record.entries?.flatMap(e => e.references || []) || []),
      ];

      for (const ref of refs) {
        if (ref?.sourceId !== 'source-book-bpct' || typeof ref.section !== 'string') {
          continue;
        }

        // Direct Chapter 6 sentence references
        if (/^Câu\s+\d+(?:[–-]\d+)?\b/.test(ref.section)) {
          checkedDirectRefs++;
          expect(
            Array.isArray(ref.pdfPages) && ref.pdfPages.length === 2,
            `Direct Chapter 6 ref "${ref.section}" in ${record.id} must have 2-element pdfPages`,
          ).toBe(true);

          const [pdfStart, pdfEnd] = ref.pdfPages;
          expect(pdfStart).toBeGreaterThanOrEqual(77);
          expect(pdfStart).toBeLessThanOrEqual(100);
          expect(pdfEnd).toBeGreaterThanOrEqual(77);
          expect(pdfEnd).toBeLessThanOrEqual(100);
          expect(pdfStart).toBeLessThanOrEqual(pdfEnd);

          expect(
            Array.isArray(ref.printedPages) && ref.printedPages.length === 2,
            `Direct Chapter 6 ref "${ref.section}" in ${record.id} must have 2-element printedPages`,
          ).toBe(true);

          const pStart = parseInt(ref.printedPages[0], 10);
          const pEnd = parseInt(ref.printedPages[1], 10);
          expect(pStart).toBeGreaterThanOrEqual(63);
          expect(pStart).toBeLessThanOrEqual(86);
          expect(pEnd).toBeGreaterThanOrEqual(63);
          expect(pEnd).toBeLessThanOrEqual(86);
          expect(pStart).toBeLessThanOrEqual(pEnd);
        }
      }
    }

    expect(checkedDirectRefs).toBeGreaterThanOrEqual(150);
  });

  it('verifies Câu 4 documents internal discrepancy between Thủy cục and Chapter 1 Mục XVI Mộc cục', () => {
    const record = allRecords.find(r => r.id === 'article-support-and-control-context');
    expect(record).toBeDefined();

    const entry = record.entries.find(e => e.text.includes('Hợi Mão Mùi'));
    expect(entry).toBeDefined();
    expect(entry.text).toContain('Thuỷ cục');
    expect(entry.text).toContain('Mục XVI');
    expect(entry.text).toContain('Mộc cục');

    const crossRef = entry.references.find(r => r.section.includes('Mục XVI'));
    expect(crossRef).toBeDefined();
    expect(crossRef.pdfPages).toEqual([16, 16]);
    expect(crossRef.printedPages).toEqual(['10', '10']);
  });

  it('verifies Câu 11 documents Footnote 3 on Quái thân vs Thế and the Nguyệt quái thân method', () => {
    const record = allRecords.find(r => r.id === 'article-hexagram-body-context');
    expect(record).toBeDefined();

    // Check method text
    const methodEntry = record.entries.find(e => e.text.includes('Nguyệt quái thân'));
    expect(methodEntry).toBeDefined();
    expect(methodEntry.text).toContain('Tý');
    expect(methodEntry.text).toContain('Ngọ');

    // Check footnote 3 entry
    const fn3Entry = record.entries.find(e => e.text.includes('chú thích số 3'));
    expect(fn3Entry).toBeDefined();
    expect(fn3Entry.text).toContain('Vĩnh Cao');
    expect(fn3Entry.text).toContain('hào Thế');
    expect(fn3Entry.references.some(r => r.section.includes('Chú thích 3'))).toBe(true);
  });

  it('verifies Câu 51 documents translation discrepancy between Thê and Thế', () => {
    const record = allRecords.find(
      r => r.id === 'article-adverse-support-store-intervening-lines-and-release-context',
    );
    expect(record).toBeDefined();

    const entry = record.entries.find(e => e.references?.some(r => r.section.includes('Câu 51')));
    expect(entry).toBeDefined();
    expect(entry.text).toContain('心退悔兮世空');
    expect(entry.text).toContain('Tâm thoái hối hề Thế Không');
    expect(entry.text).toContain('Thê lâm Không');
    expect(entry.text).toContain('Tuần Không');
  });

  it('verifies Câu 53 includes full historical exam divination parameters', () => {
    const record = allRecords.find(
      r => r.id === 'article-adverse-support-store-intervening-lines-and-release-context',
    );
    expect(record).toBeDefined();

    const entry = record.entries.find(e =>
      e.references?.some(r => r.section.includes('Câu 53') && r.section.includes('bình giải')),
    );
    expect(entry).toBeDefined();
    expect(entry.text).toContain('Quý Dậu');
    expect(entry.text).toContain('tháng Thìn');
    expect(entry.text).toContain('Tiết biến Khảm');
    expect(entry.text).toContain('Tị Hỏa động hóa Kỵ thần Dần Mộc');
    expect(entry.text).toContain('Mão Mộc là Kỵ thần ám động sinh Thế');
    expect(entry.text).toContain('bệnh khi vào trường thi');
  });

  it('maintains sentences 1-24 core records', () => {
    // Sentence 1: moving lines
    expect(sentenceMap.get(1).some(e => e.recordId === 'rule-moving-line-change')).toBe(true);
    // Sentence 10: year authority
    expect(sentenceMap.get(10).some(e => e.recordId === 'article-year-authority-context')).toBe(
      true,
    );
    // Sentence 11: hexagram body
    expect(sentenceMap.get(11).some(e => e.recordId === 'article-hexagram-body-context')).toBe(
      true,
    );
    // Sentence 12-16: Shi-Ying
    for (let i = 12; i <= 16; i++) {
      expect(
        sentenceMap.get(i).some(e => e.recordId === 'article-shi-ying-interaction-context'),
      ).toBe(true);
    }
    // Sentence 17-24: useful spirit rescue
    for (let i = 17; i <= 24; i++) {
      expect(
        sentenceMap
          .get(i)
          .some(e => e.recordId === 'article-useful-spirit-rescue-empty-combination-context'),
      ).toBe(true);
    }
  });

  it('maintains sentences 25-48 core records', () => {
    // Sentence 25-32: hidden movement, store, branch
    for (let i = 25; i <= 32; i++) {
      expect(
        sentenceMap
          .get(i)
          .some(e => e.recordId === 'article-hidden-movement-store-strength-and-branch-context'),
      ).toBe(true);
    }
    // Sentence 33-40: hidden spirit, release, restraint
    for (let i = 33; i <= 40; i++) {
      expect(
        sentenceMap
          .get(i)
          .some(
            e => e.recordId === 'article-hidden-spirit-release-restraint-and-combination-context',
          ),
      ).toBe(true);
    }
    // Sentence 41-48: useful spirit avoidance, rescue, transformation
    for (let i = 41; i <= 48; i++) {
      expect(
        sentenceMap
          .get(i)
          .some(
            e => e.recordId === 'article-useful-spirit-avoidance-rescue-and-transformation-context',
          ),
      ).toBe(true);
    }
  });

  it('maintains sentences 49-69 core records', () => {
    // Sentence 49-56: adverse support, store, intervening lines
    for (let i = 49; i <= 56; i++) {
      expect(
        sentenceMap
          .get(i)
          .some(
            e =>
              e.recordId === 'article-adverse-support-store-intervening-lines-and-release-context',
          ),
      ).toBe(true);
    }
    // Sentence 57-69: timing, relatives, body, spirits, sincerity
    for (let i = 57; i <= 69; i++) {
      expect(
        sentenceMap
          .get(i)
          .some(e => e.recordId === 'article-timing-relatives-body-spirits-and-sincerity-context'),
      ).toBe(true);
    }
  });
});
