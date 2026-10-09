import { listSources } from './catalog.js';
export const KNOWLEDGE_PACKAGE_VERSION = '0.1.0';
export * from './catalog.js';
export * from './content.js';
export * from './search.js';
export type * from './content-schema.js';
export type { ContentTable } from './content-tables.js';
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
export function getKnowledgeMetadata(): KnowledgeMetadata {
  return {
    name: 'Kho tri thức Lục Hào',
    description: 'Thuật ngữ, dữ liệu tham khảo về quẻ và thông tin thư mục kinh điển.',
    sourceCount: listSources().length,
  };
}
