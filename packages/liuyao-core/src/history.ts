import { calculateReading } from './board.js';
import {
  type AutomaticTossSnapshot,
  type CoinTossResult,
  createAutomaticTossSnapshot,
} from './casting.js';
import type { ReadingResult, SixLines } from './contracts.js';
import { InvalidReadingInputError, validateSixLines } from './validation.js';

export type StoredReadingMethod = 'automatic' | 'manual' | 'direct';

export interface StoredReadingRecord {
  readonly id: string;
  readonly createdAt: string;
  readonly question: string;
  readonly method: StoredReadingMethod;
  readonly lines: SixLines;
  readonly result: ReadingResult;
  readonly tosses?: AutomaticTossSnapshot;
  readonly notes?: string;
  readonly tags?: readonly string[];
}

export interface ReadingHistoryArchive {
  readonly version: 1;
  readonly exportedAt: string;
  readonly records: readonly StoredReadingRecord[];
}

export interface CreateStoredReadingParams {
  readonly id?: string;
  readonly createdAt?: string;
  readonly question: string;
  readonly method: StoredReadingMethod;
  readonly lines: SixLines;
  readonly result: ReadingResult;
  readonly tosses?: readonly CoinTossResult[];
  readonly notes?: string;
  readonly tags?: readonly string[];
}

export interface HistoryFilterCriteria {
  readonly query?: string;
  readonly method?: StoredReadingMethod;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function generateRecordId(timestamp: number): string {
  const randomSuffix = Math.random().toString(36).slice(2, 10);
  return `reading_${timestamp}_${randomSuffix}`;
}

/** Create and freeze a validated stored reading record. */
export function createStoredReadingRecord(params: CreateStoredReadingParams): StoredReadingRecord {
  const lines = validateSixLines(params.lines);
  const now = Date.now();
  const createdAt = params.createdAt ?? new Date(now).toISOString();
  const id = params.id ?? generateRecordId(now);
  const question = params.question.trim();

  let validatedTosses: AutomaticTossSnapshot | undefined;
  if (params.method === 'automatic') {
    if (!params.tosses) {
      throw new TypeError('Automatic reading requires toss evidence.');
    }
    validatedTosses = createAutomaticTossSnapshot(params.tosses);
    if (validatedTosses.some((toss, idx) => toss.line !== lines[idx])) {
      throw new TypeError('Toss evidence does not match line sequence.');
    }
  }

  const record: {
    id: string;
    createdAt: string;
    question: string;
    method: StoredReadingMethod;
    lines: SixLines;
    result: ReadingResult;
    tosses?: AutomaticTossSnapshot;
    notes?: string;
    tags?: readonly string[];
  } = {
    id,
    createdAt,
    question,
    method: params.method,
    lines,
    result: params.result,
  };

  if (validatedTosses) {
    record.tosses = validatedTosses;
  }
  if (params.notes) {
    record.notes = params.notes.trim();
  }
  if (params.tags && params.tags.length > 0) {
    record.tags = Object.freeze([...params.tags.map(t => t.trim()).filter(Boolean)]);
  }

  return Object.freeze(record);
}

/** Validate an untrusted object into a StoredReadingRecord or throw InvalidReadingInputError. */
export function validateStoredReadingRecord(value: unknown): StoredReadingRecord {
  if (!isRecord(value)) {
    throw new InvalidReadingInputError('Stored reading record must be an object.');
  }

  if (typeof value.id !== 'string' || value.id.trim().length === 0) {
    throw new InvalidReadingInputError('Record id must be a non-empty string.');
  }

  if (typeof value.createdAt !== 'string' || Number.isNaN(Date.parse(value.createdAt))) {
    throw new InvalidReadingInputError('Record createdAt must be a valid ISO date string.');
  }

  if (typeof value.question !== 'string') {
    throw new InvalidReadingInputError('Record question must be a string.');
  }

  if (value.method !== 'automatic' && value.method !== 'manual' && value.method !== 'direct') {
    throw new InvalidReadingInputError('Record method must be automatic, manual, or direct.');
  }

  const lines = validateSixLines(value.lines);
  const result = calculateReading({ lines });

  let tosses: AutomaticTossSnapshot | undefined;
  if (value.method === 'automatic') {
    if (!Array.isArray(value.tosses)) {
      throw new InvalidReadingInputError('Automatic reading records require tosses array.');
    }
    tosses = createAutomaticTossSnapshot(value.tosses as readonly CoinTossResult[]);
    if (tosses.some((toss, idx) => toss.line !== lines[idx])) {
      throw new InvalidReadingInputError('Toss evidence does not match line sequence.');
    }
  }

  const notes = typeof value.notes === 'string' ? value.notes.trim() : undefined;
  const tags = Array.isArray(value.tags)
    ? Object.freeze(
        value.tags.filter((t): t is string => typeof t === 'string' && t.trim().length > 0),
      )
    : undefined;

  const record: {
    id: string;
    createdAt: string;
    question: string;
    method: StoredReadingMethod;
    lines: SixLines;
    result: ReadingResult;
    tosses?: AutomaticTossSnapshot;
    notes?: string;
    tags?: readonly string[];
  } = {
    id: value.id,
    createdAt: value.createdAt,
    question: value.question,
    method: value.method,
    lines,
    result,
  };

  if (tosses) {
    record.tosses = tosses;
  }
  if (notes) {
    record.notes = notes;
  }
  if (tags) {
    record.tags = tags;
  }

  return Object.freeze(record);
}

/** Validate an imported archive payload containing multiple reading records. */
export function validateReadingHistoryArchive(value: unknown): ReadingHistoryArchive {
  if (!isRecord(value)) {
    throw new InvalidReadingInputError('Archive must be a JSON object.');
  }

  if (value.version !== 1) {
    throw new InvalidReadingInputError('Unsupported archive version. Expected version 1.');
  }

  if (typeof value.exportedAt !== 'string' || Number.isNaN(Date.parse(value.exportedAt))) {
    throw new InvalidReadingInputError('Archive exportedAt must be a valid ISO date string.');
  }

  if (!Array.isArray(value.records)) {
    throw new InvalidReadingInputError('Archive records must be an array.');
  }

  const validatedRecords = value.records.map(r => validateStoredReadingRecord(r));

  return Object.freeze({
    version: 1,
    exportedAt: value.exportedAt,
    records: Object.freeze(validatedRecords),
  });
}

/** Filter reading history records by question keyword or casting method. */
export function filterReadingHistory(
  records: readonly StoredReadingRecord[],
  criteria: HistoryFilterCriteria,
): readonly StoredReadingRecord[] {
  let filtered = records;

  if (criteria.method) {
    filtered = filtered.filter(rec => rec.method === criteria.method);
  }

  if (criteria.query && criteria.query.trim().length > 0) {
    const q = criteria.query.trim().toLowerCase();
    filtered = filtered.filter(rec => {
      const matchQuestion = rec.question.toLowerCase().includes(q);
      const matchHexagram = rec.result.primaryHexagramId.toLowerCase().includes(q);
      const matchNotes = rec.notes ? rec.notes.toLowerCase().includes(q) : false;
      const matchTags = rec.tags ? rec.tags.some(tag => tag.toLowerCase().includes(q)) : false;
      return matchQuestion || matchHexagram || matchNotes || matchTags;
    });
  }

  return filtered;
}

/** Sort reading history records by creation date. Default newest first. */
export function sortReadingHistory(
  records: readonly StoredReadingRecord[],
  order: 'newest' | 'oldest' = 'newest',
): readonly StoredReadingRecord[] {
  return [...records].sort((a, b) => {
    const timeA = Date.parse(a.createdAt);
    const timeB = Date.parse(b.createdAt);
    return order === 'newest' ? timeB - timeA : timeA - timeB;
  });
}
