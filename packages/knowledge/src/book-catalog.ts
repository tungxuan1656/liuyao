import {
  BOOK_RECORDS,
  BOOK_CITATIONS,
  BOOK_SOURCES,
  BOOK_MANIFEST,
} from './book-data.generated.js';
import type { BookCitation, BookRecord, BookSource } from './book-schema.js';
import { deepFreeze } from './immutable.js';

const releaseIds = new Set(BOOK_MANIFEST.releaseIds);
const records = deepFreeze(BOOK_RECORDS.filter(record => releaseIds.has(record.id)));
for (const record of records) {
  if (
    record.review.status !== 'reviewed' ||
    record.discrepancies?.some(d => d.status === 'unresolved')
  ) {
    throw new Error(`Ineligible book release: ${record.id}`);
  }
}
const citations = deepFreeze([...BOOK_CITATIONS]);
const sources = deepFreeze([...BOOK_SOURCES]);
const recordById = new Map(records.map(record => [record.id, record]));
const citationById = new Map(citations.map(citation => [citation.id, citation]));
const sourceById = new Map(sources.map(source => [source.id, source]));

/** Released source-compared records only. Draft and disputed content stays outside this API. */
export function listBookRecords(): readonly BookRecord[] {
  return records;
}
export function getBookRecord(id: string): BookRecord | undefined {
  return recordById.get(id as BookRecord['id']);
}
export function listBookCitations(): readonly BookCitation[] {
  return citations;
}
export function getBookCitation(id: string): BookCitation | undefined {
  return citationById.get(id);
}
export function listBookSources(): readonly BookSource[] {
  return sources;
}
export function getBookSource(id: BookSource['id']): BookSource | undefined {
  return sourceById.get(id);
}
