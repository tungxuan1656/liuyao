// Compatibility export; authored content lives in JSON.
import { adaptedCatalog } from '../src/content-adapter.js';
import type { KnowledgeRule } from '../src/schema.js';

export const RULES = adaptedCatalog.rules satisfies readonly KnowledgeRule[];
