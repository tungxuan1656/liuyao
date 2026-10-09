import catalog from '../.generated/runtime/catalog.json' with { type: 'json' };
import type { KnowledgeCatalog } from './schema.js';
/** Compact projection for existing casting and reference screens. */
export const adaptedCatalog = catalog as KnowledgeCatalog;
