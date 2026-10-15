import { describe, expect, it } from 'vitest';
import { getContentMetadata, getTopic, listContent, listTopics } from '../src/index';
import { loadContent } from '../src/node';

describe('released topic and learning collections', () => {
  it('exposes immutable named topics without requiring a released record', () => {
    const topics = listTopics();
    expect(new Set(topics.map(topic => topic.id)).size).toBe(topics.length);
    expect(Object.isFrozen(topics)).toBe(true);
    for (const topic of topics) {
      expect(topic.title.trim()).not.toBe('');
      expect(Object.isFrozen(topic)).toBe(true);
      expect(getTopic(topic.id)).toBe(topic);
    }
    for (const record of listContent()) {
      for (const id of record.topicIds) expect(getTopic(id), id).toBeDefined();
    }
    expect(getTopic('topic-not-released')).toBeUndefined();
    expect(listContent({ topicId: 'topic-not-released', type: 'article' })).toEqual([]);
  });

  it('preserves the authored lesson sequence in metadata and filtered lists', async () => {
    const lessons = listContent({ type: 'article', topicId: 'topic-learning' });
    expect(lessons.map(item => item.id)).toEqual([
      'lesson-foundations',
      'lesson-classical-reading',
      'lesson-liuyao-board',
      'lesson-worked-readings',
    ]);
    expect(lessons.map(item => item.sequence)).toEqual([1, 2, 3, 4]);
    for (const lesson of lessons) {
      const record = await loadContent(lesson.id);
      expect(record?.type === 'article' && record.sequence).toBe(lesson.sequence);
    }
    expect(listContent({ type: 'article' }).slice(0, 4)).toEqual(lessons);
    expect(getContentMetadata('hexagram-01')?.sequence).toBeUndefined();
  });

  it('combines local article search with topic eligibility and exact IDs', () => {
    const topicId = 'topic-learning';
    for (const query of [
      'Từ nét hào đến hình quẻ',
      'tu net hao den hinh que',
      'lesson-foundations',
    ]) {
      expect(listContent({ type: 'article', topicId, query }).map(item => item.id)).toContain(
        'lesson-foundations',
      );
    }
    expect(listContent({ type: 'article', topicId, query: 'lesson-foundation' })).toEqual([]);
    expect(listContent({ type: 'article', topicId, query: 'không có bài này' })).toEqual([]);
    expect(
      listContent({
        type: 'article',
        topicId: 'topic-liuyao-advanced',
        query: 'lesson-foundations',
      }),
    ).toEqual([]);
    for (const article of listContent({ type: 'article' })) {
      for (const alias of article.aliases) {
        expect(listContent({ type: 'article', query: alias }).map(item => item.id)).toContain(
          article.id,
        );
      }
    }
  });
});
