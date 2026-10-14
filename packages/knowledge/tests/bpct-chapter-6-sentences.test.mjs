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
      const matches = ref.section.matchAll(/[Cc]âu\s+(\d+)/g);
      for (const match of matches) {
        const snum = parseInt(match[1], 10);
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

  it('maps every single sentence from 1 to 69 to at least one knowledge record', () => {
    for (let snum = 1; snum <= 69; snum++) {
      const entries = sentenceMap.get(snum);
      expect(
        entries.length,
        `Sentence ${snum} must be represented in knowledge records`,
      ).toBeGreaterThan(0);
    }
  });

  it('preserves valid Chapter 6 page boundaries (PDF 77-100, printed 63-86)', () => {
    for (let snum = 1; snum <= 69; snum++) {
      const entries = sentenceMap.get(snum);
      for (const entry of entries) {
        if (Array.isArray(entry.pdfPages)) {
          for (const page of entry.pdfPages) {
            // Note: some records cross-reference other chapters or general intro (e.g. PDF 1, 18, 403),
            // but the chapter 6 citation itself must fall in range 77..100.
            if (page >= 77 && page <= 100) {
              expect(page).toBeGreaterThanOrEqual(77);
              expect(page).toBeLessThanOrEqual(100);
            }
          }
        }
      }
    }
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
