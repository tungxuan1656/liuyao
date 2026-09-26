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
  {
    id: 'source-zengshan-buyi',
    title: 'Zengshan Buyi (增刪卜易; Added and Subtracted Divinations)',
    author:
      'Traditionally attributed to Liu Bowen (劉伯溫); attribution is not independently verified here.',
    publication:
      'Traditional text; edition, composition date, and publication history are not asserted here.',
    rights:
      'Classical original text is in the public domain. This record contains original bibliographic paraphrase only and no copied transcription or translation.',
    provenance:
      'The cited text is hosted by Wikisource at https://zh.wikisource.org/zh-hans/%E5%A2%9E%E5%88%AA%E5%8D%9C%E6%98%93. Chapter locators refer to the main work; contributor-added appendices are not cited as the book text.',
  },
  {
    id: 'source-liuyao-v1-contract',
    title: 'LiuYao V1 calculation contract',
    author: 'LiuYao project maintainers',
    publication: 'Repository source contract and deterministic V1 implementation.',
    rights: 'Project source code is licensed under AGPL-3.0-only.',
    provenance:
      'The core contracts and calculations at packages/liuyao-core/src/contracts.ts, calculation.ts, and board.ts define the exact result fields and V1 conventions implemented by this repository.',
  },
] as const satisfies readonly KnowledgeSource[];
