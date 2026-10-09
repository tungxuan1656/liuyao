import { describe, it, expect, vi } from 'vitest';
import { createContentLoader, listContent, getContentMetadata } from '../src/content';
import { loadContent } from '../src/node';
describe('selected content loading', () => {
  it('filters small metadata by Vietnamese title, source, and topic', () => {
    expect(listContent({ type: 'hexagram', query: 'thuần càn' }).map(r => r.id)).toEqual([
      'hexagram-01',
    ]);
    expect(listContent({ type: 'hexagram', query: 'thuan can' }).map(r => r.id)).toEqual([
      'hexagram-01',
      'hexagram-52',
    ]);
    expect(
      listContent({ sourceId: 'source-book-ntt' }).every(r =>
        r.sourceIds.includes('source-book-ntt'),
      ),
    ).toBe(true);
    expect(
      listContent({ topicId: 'topic-casting' }).every(r => r.topicIds.includes('topic-casting')),
    ).toBe(true);
    expect(getContentMetadata('missing')).toBeUndefined();
  });
  it('loads one selected asset, shares pending work, and freezes content', async () => {
    const record = await loadContent('hexagram-01');
    const reader = vi.fn(async (_metadata: unknown) => record);
    const load = createContentLoader(reader);
    const first = load('hexagram-01');
    const second = load('hexagram-01');
    expect(first).toBe(second);
    expect(await first).toBe(record);
    expect(reader).toHaveBeenCalledOnce();
    expect(reader.mock.calls[0]?.[0]).toEqual(getContentMetadata('hexagram-01'));
    expect(Object.isFrozen(record)).toBe(true);
    if (record?.type === 'hexagram') expect(Object.isFrozen(record.lines)).toBe(true);
    expect(await load('missing')).toBeUndefined();
    expect(reader).toHaveBeenCalledOnce();
  });
  it('retries failed loads and rejects a wrong record response', async () => {
    const record = await loadContent('hexagram-01');
    let calls = 0;
    const load = createContentLoader(async () => {
      if (++calls === 1) throw new Error('offline');
      return record;
    });
    await expect(load('hexagram-01')).rejects.toThrow('offline');
    expect(await load('hexagram-01')).toBe(record);
    const wrong = createContentLoader(async () => ({ ...record, id: 'hexagram-02' }));
    await expect(wrong('hexagram-01')).rejects.toThrow('Invalid knowledge asset');
  });
});
