import type { BookRecordV1 } from './book-schema.js';
import type { BookRecordV2 } from './book-schema-v2.js';

function cloneValue<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(entry => cloneValue(entry)) as T;

  const clone: Record<string, unknown> = {};
  for (const [key, entry] of Object.entries(value)) clone[key] = cloneValue(entry);
  return clone as T;
}

/** Upcast a prevalidated V1 record without changing its fields or nested values. */
export function upcastBookRecordV1(record: BookRecordV1): BookRecordV2 {
  if (record === null || typeof record !== 'object' || Array.isArray(record)) {
    throw new TypeError('Cannot upcast a non-object book record');
  }
  if (!('schemaVersion' in record) || record.schemaVersion !== 1) {
    throw new TypeError('Cannot upcast a book record without schemaVersion 1');
  }

  const copied = cloneValue(record) as Omit<BookRecordV2, 'schemaVersion'> & {
    schemaVersion: number;
  };
  return { ...copied, schemaVersion: 2 } as BookRecordV2;
}
