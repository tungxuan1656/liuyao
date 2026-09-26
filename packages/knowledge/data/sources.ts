import type { KnowledgeSource } from '../src/schema';

export const SOURCES = [
  {
    id: 'source-zhouyi',
    title: 'Zhouyi (周易; Book of Changes)',
    author:
      'Traditionally associated with King Wen and the Duke of Zhou; received text of composite authorship.',
    publication:
      'Received classical text; date of composition and publication history are not asserted here.',
    rights:
      'Ancient work; the cited classical text is in the public domain. This record contains original bibliographic paraphrase only and no copied translation.',
    provenance:
      'The received Zhouyi presents hexagram and line statements; the received Ten Wings include Shuo Gua, a discussion of trigrams and their associations. Bibliographic provider: Chinese Text Project, https://ctext.org/book-of-changes.',
  },
  {
    id: 'source-jingshi-yizhuan',
    title: 'Jingshi Yizhuan (京氏易傳; Jing Fang’s Commentary on the Changes)',
    author: 'Jing Fang (京房), traditionally attributed.',
    publication:
      'Classical text attributed to Jing Fang; date of composition and publication history are not asserted here.',
    rights:
      'Ancient work; the cited classical text is in the public domain. This record contains original bibliographic paraphrase only and no copied translation.',
    provenance:
      'A work associated with Han-dynasty scholar Jing Fang and his Changes interpretation. Bibliographic provider: Chinese Text Project, https://ctext.org/jingshi-yizhuan/zh. Catalogued as historical context only; this record does not assert that the complete later operational Liu Yao tables occur in this work.',
  },
] as const satisfies readonly KnowledgeSource[];
