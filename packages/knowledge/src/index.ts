import { listSources } from './catalog.js';

export const KNOWLEDGE_PACKAGE_VERSION = '0.1.0';

export * from './catalog.js';
export * from './book-catalog.js';
export type * from './book-schema.js';
export type { BookTable } from './book-tables.js';
export * from './search.js';
export type {
  FactDefinition,
  KnowledgeEntity,
  KnowledgeRule,
  KnowledgeRuleCategory,
  KnowledgeTerm,
  KnowledgeSource,
  SourceReference,
  KnowledgeFactId,
} from './schema.js';

export interface KnowledgeMetadata {
  name: string;
  description: string;
  sourceCount: number;
}

/**
 * Returns basic information about the Lục Hào knowledge repository.
 */
export function getKnowledgeMetadata(): KnowledgeMetadata {
  return {
    name: 'Kho tri thức Lục Hào',
    description: 'Thuật ngữ, dữ liệu tham khảo về quẻ và thông tin thư mục kinh điển.',
    sourceCount: listSources().length,
  };
}
