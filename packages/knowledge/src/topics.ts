import { deepFreeze } from './immutable.js';

export interface ContentTopic {
  readonly id: string;
  readonly title: string;
}

const topics: readonly ContentTopic[] = deepFreeze([
  { id: 'topic-learning', title: 'Học tập' },
  { id: 'topic-foundations', title: 'Nền tảng Dịch học' },
  { id: 'topic-trigrams', title: 'Bát quái' },
  { id: 'topic-hexagrams', title: 'Sáu mươi tư quẻ' },
  { id: 'topic-line-commentary', title: 'Lời hào và chú giải' },
  { id: 'topic-classical-traditions', title: 'Kinh điển và truyền thống' },
  { id: 'topic-casting', title: 'Gieo quẻ' },
  { id: 'topic-liuyao-foundations', title: 'Nền tảng Lục Hào' },
  { id: 'topic-liuyao-advanced', title: 'Lục Hào chuyên sâu' },
]);

/** Topic definitions remain available even before their first article is released. */
export function listTopics(): readonly ContentTopic[] {
  return topics;
}
export function getTopic(id: string): ContentTopic | undefined {
  return topics.find(topic => topic.id === id);
}
