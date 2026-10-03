import {
  BOOK_RECORDS,
  BOOK_CITATIONS,
  BOOK_SOURCES,
  BOOK_MANIFEST,
  BOOK_SNAPSHOT_IDENTITY,
} from './book-data.generated.js';
import type { BookCitation } from './book-schema.js';
import type {
  AuthoredBookSource,
  BookRecordVersioned,
  ReleasedBookSource,
} from './book-schema-v2.js';
import { deepFreeze } from './immutable.js';
import { assertEligibleRelease } from './book-release-checks.js';
import { parseBookSnapshotIdentity } from './book-snapshot.js';

assertEligibleRelease(BOOK_RECORDS, BOOK_CITATIONS, BOOK_SOURCES, BOOK_MANIFEST);
const records = deepFreeze([...BOOK_RECORDS]);
const citations = deepFreeze([...BOOK_CITATIONS]);
const sources = deepFreeze([...BOOK_SOURCES]);
const recordById = new Map(records.map(record => [record.id, record]));
const citationById = new Map(citations.map(citation => [citation.id, citation]));
const sourceById = new Map(sources.map(source => [source.id, source]));
const snapshotIdentity = parseBookSnapshotIdentity(BOOK_SNAPSHOT_IDENTITY);

/** Released source-compared records only. Draft and disputed content stays outside this API. */
export function listBookRecords(): readonly BookRecordVersioned[] {
  return records;
}
export function getBookRecord(id: string): BookRecordVersioned | undefined {
  return recordById.get(id as BookRecordVersioned['id']);
}
export function listBookCitations(): readonly BookCitation[] {
  return citations;
}
export function getBookCitation(id: string): BookCitation | undefined {
  return citationById.get(id);
}
export function listBookSources(): readonly ReleasedBookSource[] {
  return sources;
}
export function getBookSource(id: AuthoredBookSource['id']): ReleasedBookSource | undefined {
  return sourceById.get(id);
}

export type BookNavigationResult =
  | { readonly availability: 'available'; readonly record: BookRecordVersioned }
  | { readonly availability: 'unavailable' };

/** Resolve navigation without exposing metadata for draft or unavailable targets. */
export function resolveBookNavigation(id: string): BookNavigationResult {
  const record = recordById.get(id as BookRecordVersioned['id']);
  return record ? { availability: 'available', record } : { availability: 'unavailable' };
}

/** Build-time semantic identity carried as an immutable generated constant. */
export function getBookSnapshotIdentity() {
  return snapshotIdentity;
}
