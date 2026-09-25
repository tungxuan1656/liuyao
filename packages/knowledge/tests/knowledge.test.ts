import { describe, expect, it } from 'vitest';
import { getKnowledgeMetadata, KNOWLEDGE_PACKAGE_VERSION } from '../src/index';

describe('@liuyao/knowledge', () => {
  it('exports valid package version', () => {
    expect(KNOWLEDGE_PACKAGE_VERSION).toBe('0.1.0');
  });

  it('returns valid knowledge metadata', () => {
    const meta = getKnowledgeMetadata();
    expect(meta.name).toContain('LiuYao');
    expect(meta.sourceCount).toBeGreaterThan(0);
  });
});
