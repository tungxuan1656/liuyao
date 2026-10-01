// Compatibility export; authored content lives in JSON.
import { adaptedCatalog } from '../src/book-adapter.js';
import type { HexagramEntity } from '../src/schema.js';

export const HEXAGRAMS = adaptedCatalog.entities.filter(
  (entity): entity is HexagramEntity => entity.kind === 'hexagram',
) satisfies readonly HexagramEntity[];
