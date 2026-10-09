// Compatibility export; authored content lives in JSON.
import { adaptedCatalog } from '../src/content-adapter.js';
import type { SourceReference } from '../src/schema.js';

export const REFERENCES = adaptedCatalog.references satisfies readonly SourceReference[];
