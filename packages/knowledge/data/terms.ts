// Compatibility export; authored content lives in JSON.
import { adaptedCatalog } from '../src/content-adapter.js';
import type { KnowledgeTerm } from '../src/schema.js';

export const TERMS = adaptedCatalog.terms satisfies readonly KnowledgeTerm[];
