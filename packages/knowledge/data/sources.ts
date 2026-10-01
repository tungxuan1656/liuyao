// Compatibility export; authored content lives in JSON.
import { adaptedCatalog } from '../src/book-adapter.js';
import type { KnowledgeSource } from '../src/schema.js';

export const SOURCES = adaptedCatalog.sources satisfies readonly KnowledgeSource[];
