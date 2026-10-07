import { describe, expect, it } from 'vitest';
import {
  calculateReading,
  createAutomaticTossSnapshot,
  createStoredReadingRecord,
  filterReadingHistory,
  InvalidReadingInputError,
  sortReadingHistory,
  type StoredReadingRecord,
  validateReadingHistoryArchive,
  validateStoredReadingRecord,
} from '../src/index';

describe('reading history contracts & validation', () => {
  const sampleLines = [7, 8, 7, 8, 9, 6] as const;
  const sampleResult = calculateReading({ lines: sampleLines });

  const automaticTosses = createAutomaticTossSnapshot([
    { coins: [0, 0, 1], method: 'three-coin', coinCount: 3, line: 7 },
    { coins: [0, 1, 1], method: 'three-coin', coinCount: 3, line: 8 },
    { coins: [1, 0, 0], method: 'three-coin', coinCount: 3, line: 7 },
    { coins: [1, 1, 0], method: 'three-coin', coinCount: 3, line: 8 },
    { coins: [1, 1, 1], method: 'three-coin', coinCount: 3, line: 9 },
    { coins: [0, 0, 0], method: 'three-coin', coinCount: 3, line: 6 },
  ]);

  it('creates and freezes a manual reading record with defaults', () => {
    const record = createStoredReadingRecord({
      question: 'Sự nghiệp năm nay thế nào?',
      method: 'manual',
      lines: sampleLines,
      result: sampleResult,
      notes: 'Hào 5 và 6 động',
      tags: ['career', '2026'],
    });

    expect(record.id).toMatch(/^reading_\d+_[a-z0-9]+$/);
    expect(record.question).toBe('Sự nghiệp năm nay thế nào?');
    expect(record.method).toBe('manual');
    expect(record.lines).toEqual(sampleLines);
    expect(record.notes).toBe('Hào 5 và 6 động');
    expect(record.tags).toEqual(['career', '2026']);
    expect(Object.isFrozen(record)).toBe(true);
    expect(Object.isFrozen(record.tags)).toBe(true);
  });

  it('creates an automatic reading record with verified toss snapshot', () => {
    const record = createStoredReadingRecord({
      id: 'custom-reading-01',
      createdAt: '2026-03-30T10:00:00.000Z',
      question: 'Dự đoán thời tiết',
      method: 'automatic',
      lines: sampleLines,
      result: sampleResult,
      tosses: automaticTosses,
    });

    expect(record.id).toBe('custom-reading-01');
    expect(record.tosses).toHaveLength(6);
    expect(record.tosses?.[0]?.line).toBe(7);
    expect(record.tosses?.[4]?.line).toBe(9);
  });

  it('rejects automatic reading records missing toss evidence', () => {
    expect(() =>
      createStoredReadingRecord({
        question: 'Automatic reading test',
        method: 'automatic',
        lines: sampleLines,
        result: sampleResult,
      }),
    ).toThrow(TypeError);
  });

  it('rejects automatic reading records with mismatched toss lines', () => {
    const mismatchedTosses = createAutomaticTossSnapshot([
      { coins: [1, 1, 1], method: 'three-coin', coinCount: 3, line: 9 }, // mismatch line 7
      { coins: [0, 1, 1], method: 'three-coin', coinCount: 3, line: 8 },
      { coins: [1, 0, 0], method: 'three-coin', coinCount: 3, line: 7 },
      { coins: [1, 1, 0], method: 'three-coin', coinCount: 3, line: 8 },
      { coins: [1, 1, 1], method: 'three-coin', coinCount: 3, line: 9 },
      { coins: [0, 0, 0], method: 'three-coin', coinCount: 3, line: 6 },
    ]);

    expect(() =>
      createStoredReadingRecord({
        question: 'Mismatch test',
        method: 'automatic',
        lines: sampleLines,
        result: sampleResult,
        tosses: mismatchedTosses,
      }),
    ).toThrow(TypeError);
  });

  it('validates untrusted JSON record and re-calculates reading result', () => {
    const rawData = {
      id: 'valid-id-123',
      createdAt: '2026-03-30T12:00:00.000Z',
      question: 'Hỏi việc thi cử',
      method: 'direct',
      lines: [7, 7, 7, 7, 7, 7],
      notes: 'Quẻ Càn vi Thiên thuần dương',
      tags: ['study'],
    };

    const validated = validateStoredReadingRecord(rawData);
    expect(validated.id).toBe('valid-id-123');
    expect(validated.result.primaryHexagramId).toBe('hexagram-01');
    expect(validated.result.changedHexagramId).toBeNull();
    expect(validated.notes).toBe('Quẻ Càn vi Thiên thuần dương');
  });

  it('rejects malformed untrusted records', () => {
    expect(() => validateStoredReadingRecord(null)).toThrow(InvalidReadingInputError);
    expect(() => validateStoredReadingRecord({ id: '' })).toThrow(InvalidReadingInputError);
    expect(() =>
      validateStoredReadingRecord({
        id: '1',
        createdAt: 'invalid-date',
        question: 'Test',
        method: 'manual',
        lines: [7, 7, 7, 7, 7, 7],
      }),
    ).toThrow(InvalidReadingInputError);
    expect(() =>
      validateStoredReadingRecord({
        id: '1',
        createdAt: '2026-01-01T00:00:00.000Z',
        question: 'Test',
        method: 'unknown-method',
        lines: [7, 7, 7, 7, 7, 7],
      }),
    ).toThrow(InvalidReadingInputError);
  });

  it('validates and parses export/import archive format', () => {
    const archive = {
      version: 1,
      exportedAt: '2026-03-30T15:00:00.000Z',
      records: [
        {
          id: 'rec-1',
          createdAt: '2026-03-30T10:00:00.000Z',
          question: 'Hỏi tình duyên',
          method: 'manual',
          lines: [8, 8, 8, 8, 8, 8],
        },
      ],
    };

    const parsed = validateReadingHistoryArchive(archive);
    expect(parsed.version).toBe(1);
    expect(parsed.records).toHaveLength(1);
    expect(parsed.records[0]?.result.primaryHexagramId).toBe('hexagram-02');
  });

  it('rejects archive with unsupported version', () => {
    expect(() =>
      validateReadingHistoryArchive({
        version: 999,
        exportedAt: '2026-03-30T15:00:00.000Z',
        records: [],
      }),
    ).toThrow(InvalidReadingInputError);
  });

  describe('filtering & sorting history', () => {
    const r1: StoredReadingRecord = createStoredReadingRecord({
      id: 'r1',
      createdAt: '2026-03-20T00:00:00.000Z',
      question: 'Đầu tư tài chính',
      method: 'manual',
      lines: [7, 7, 7, 7, 7, 7],
      result: calculateReading({ lines: [7, 7, 7, 7, 7, 7] }),
      tags: ['finance'],
    });

    const r2: StoredReadingRecord = createStoredReadingRecord({
      id: 'r2',
      createdAt: '2026-03-25T00:00:00.000Z',
      question: 'Sức khỏe gia đình',
      method: 'direct',
      lines: [8, 8, 8, 8, 8, 8],
      result: calculateReading({ lines: [8, 8, 8, 8, 8, 8] }),
      notes: 'Bệnh cảm nhẹ',
    });

    const records = [r1, r2];

    it('filters by question keyword', () => {
      const filtered = filterReadingHistory(records, { query: 'tài chính' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.id).toBe('r1');
    });

    it('filters by tags and notes', () => {
      expect(filterReadingHistory(records, { query: 'finance' })).toHaveLength(1);
      expect(filterReadingHistory(records, { query: 'cảm nhẹ' })).toHaveLength(1);
    });

    it('filters by method', () => {
      expect(filterReadingHistory(records, { method: 'direct' })).toHaveLength(1);
      expect(filterReadingHistory(records, { method: 'automatic' })).toHaveLength(0);
    });

    it('sorts newest first and oldest first', () => {
      const newest = sortReadingHistory(records, 'newest');
      expect(newest[0]?.id).toBe('r2');
      expect(newest[1]?.id).toBe('r1');

      const oldest = sortReadingHistory(records, 'oldest');
      expect(oldest[0]?.id).toBe('r1');
      expect(oldest[1]?.id).toBe('r2');
    });
  });
});
