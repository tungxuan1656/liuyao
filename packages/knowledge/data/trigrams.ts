// Compatibility export; authored content lives in JSON.
import { adaptedCatalog } from '../src/book-adapter.js';
import type { TrigramEntity } from '../src/schema.js';

export const TRIGRAMS = adaptedCatalog.entities.filter(
  (entity): entity is TrigramEntity => entity.kind === 'trigram',
) satisfies readonly TrigramEntity[];
