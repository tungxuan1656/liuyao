import index from '../.generated/runtime/index.json' with { type: 'json' };
import type { ContentMetadata, ContentRecord } from './content-schema.js';
import { deepFreeze } from './immutable.js';
import { normalizeKnowledgeQuery } from './search.js';
const metadata = deepFreeze(index as ContentMetadata[]);
const byId = new Map(metadata.map(record => [record.id, record]));
export interface ContentFilters {
  readonly type?: ContentMetadata['type'];
  readonly query?: string;
  readonly topicId?: string;
  readonly sourceId?: string;
}
const exact = (text: string) =>
  text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .trim()
    .replace(/\s+/gu, ' ');
export function getContentMetadata(id: string): ContentMetadata | undefined {
  return byId.get(id);
}
export function listContent(filters: ContentFilters = {}): readonly ContentMetadata[] {
  const query = normalizeKnowledgeQuery(filters.query ?? '');
  const candidates = metadata.filter(
    record =>
      (!filters.type || record.type === filters.type) &&
      (!filters.topicId || record.topicIds.includes(filters.topicId)) &&
      (!filters.sourceId || record.sourceIds.includes(filters.sourceId)),
  );
  if (!query) return deepFreeze(candidates);
  const fields = (record: ContentMetadata) => [record.title, ...record.aliases, record.summary];
  const matches = candidates.filter(
    record =>
      fields(record).some(text => normalizeKnowledgeQuery(text).includes(query)) ||
      exact(record.id) === exact(filters.query!),
  );
  const accented = exact(filters.query!) !== query;
  const preferred = accented
    ? matches.filter(
        record =>
          fields(record).some(text => exact(text).includes(exact(filters.query!))) ||
          exact(record.id) === exact(filters.query!),
      )
    : [];
  return deepFreeze(preferred.length ? preferred : matches);
}
export type ContentAssetReader = (metadata: ContentMetadata) => Promise<unknown>;
/** Share pending loads, cache successful records, and allow failed loads to retry. */
export function createContentLoader(readAsset: ContentAssetReader) {
  const cache = new Map<string, Promise<ContentRecord | undefined>>();
  return function load(id: string): Promise<ContentRecord | undefined> {
    const item = byId.get(id);
    if (!item) return Promise.resolve(undefined);
    const pending = cache.get(id);
    if (pending) return pending;
    const request = Promise.resolve()
      .then(() => readAsset(item))
      .then(value => {
        const record = value as ContentRecord;
        if (
          !record ||
          record.id !== item.id ||
          record.type !== item.type ||
          record.status !== 'ready' ||
          !Array.isArray(record.entries)
        )
          throw new Error('Invalid knowledge asset: ' + id);
        return deepFreeze(record);
      })
      .catch(error => {
        cache.delete(id);
        throw error;
      });
    cache.set(id, request);
    return request;
  };
}
export const loadContent = createContentLoader(async item => {
  const response = await fetch('/' + item.asset);
  if (!response.ok) throw new Error('Knowledge unavailable: ' + item.id);
  return response.json();
});
