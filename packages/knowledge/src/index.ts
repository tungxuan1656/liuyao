import { listSources } from './catalog';

export const KNOWLEDGE_PACKAGE_VERSION = '0.1.0';

export * from './catalog';
export * from './search';
export type { FactDefinition, KnowledgeFactId, KnowledgeRuleCategory } from './schema';

export interface KnowledgeMetadata {
  name: string;
  description: string;
  sourceCount: number;
}

/**
 * Returns basic information about the LiuYao knowledge repository.
 */
export function getKnowledgeMetadata(): KnowledgeMetadata {
  return {
    name: 'LiuYao Structured Knowledge Base',
    description:
      'Structured terminology, hexagram reference data, and classical sources for Lục Hào divination',
    sourceCount: listSources().length,
  };
}
