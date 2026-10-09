import type { HexagramId, TrigramId, KnowledgeRuleCategory, KnowledgeSource } from './schema.js';
import type { ContentTable } from './content-tables.js';

export type ContentReference =
  | {
      readonly sourceId: KnowledgeSource['id'];
      readonly pdfPages: readonly [number, number];
      readonly printedPages?: readonly [string, string];
      readonly section?: string;
    }
  | { readonly documentPath: string; readonly section: string };
export interface ContentLink {
  readonly recordId: string;
  readonly position?: number;
  readonly sectionId?: string;
}
export interface ContentEntry {
  readonly id?: string;
  readonly title?: string;
  readonly text: string;
  readonly references: readonly ContentReference[];
  readonly attribution?: { readonly author: string; readonly via?: string };
  readonly condition?: string;
  readonly links?: readonly ContentLink[];
  readonly target?: {
    readonly kind: 'table' | 'figure';
    readonly recordId: string;
    readonly id: string;
  };
}
export interface ContentLine {
  readonly position: number;
  readonly polarity: 'yin' | 'yang';
  readonly label: string;
  readonly entries: readonly ContentEntry[];
}
export interface ContentFigure {
  readonly id: string;
  readonly kind: string;
  readonly title: string;
  readonly labels: readonly {
    readonly id: string;
    readonly text: string;
    readonly references: readonly ContentReference[];
  }[];
  readonly orientation: {
    readonly description: string;
    readonly references: readonly ContentReference[];
  };
  readonly references: readonly ContentReference[];
  readonly authorAlternatives?: readonly {
    readonly author: string;
    readonly via?: string;
    readonly description: string;
    readonly references: readonly ContentReference[];
  }[];
}
interface ContentBase {
  readonly id: string;
  readonly type: 'hexagram' | 'trigram' | 'term' | 'rule' | 'article';
  readonly title: string;
  readonly status: 'draft' | 'ready';
  readonly aliases?: readonly string[];
  readonly topicIds?: readonly string[];
  readonly relatedIds?: readonly string[];
  readonly links?: readonly ContentLink[];
  readonly applicableRuleIds?: readonly string[];
  readonly entries: readonly ContentEntry[];
  readonly tables?: readonly ContentTable[];
  readonly figures?: readonly ContentFigure[];
  readonly notes?: readonly ContentEntry[];
}
export interface ContentHexagram extends ContentBase {
  readonly type: 'hexagram';
  readonly id: HexagramId;
  readonly kingWenNumber: number;
  readonly lowerTrigramId: TrigramId;
  readonly upperTrigramId: TrigramId;
  readonly lines: readonly ContentLine[];
  readonly specialPassages?: readonly {
    readonly title: string;
    readonly entries: readonly ContentEntry[];
  }[];
}
export interface ContentTrigram extends ContentBase {
  readonly type: 'trigram';
  readonly id: TrigramId;
  readonly lines: readonly ('yin' | 'yang')[];
  readonly symbol: string;
  readonly element: string;
}
export interface ContentRule extends ContentBase {
  readonly type: 'rule';
  readonly id: `rule-${string}`;
  readonly ruleset: 'liuyao-standard-v1';
  readonly category: KnowledgeRuleCategory;
}
export interface ContentArticle extends ContentBase {
  readonly type: 'article';
  readonly sequence?: number;
}
export interface ContentTerm extends ContentBase {
  readonly type: 'term';
  readonly id: `term-${string}`;
}
export type ContentRecord =
  ContentHexagram | ContentTrigram | ContentRule | ContentArticle | ContentTerm;
export interface ContentMetadata {
  readonly id: string;
  readonly type: ContentRecord['type'];
  readonly title: string;
  readonly aliases: readonly string[];
  readonly summary: string;
  readonly topicIds: readonly string[];
  readonly sourceIds: readonly string[];
  readonly asset: string;
}
