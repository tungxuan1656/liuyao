import type { HexagramId, KnowledgeRuleCategory, TrigramId } from './schema.js';
import type { BookTable } from './book-tables.js';

export interface BookClaim {
  readonly id: string;
  readonly kind:
    'structural-fact' | 'classical-meaning' | 'author-interpretation' | 'calculation-rule';
  readonly text: string;
  readonly citationIds: readonly string[];
  readonly attribution?: { readonly author: string; readonly via?: string };
  readonly conditions?: readonly string[];
}

export interface BookReview {
  readonly status: 'draft' | 'reviewed' | 'disputed' | 'superseded';
  readonly reviewer?: string;
  readonly reviewedAt?: string;
  readonly method?: 'source-comparison';
  readonly evidenceCitationIds?: readonly string[];
  readonly note?: string;
}

interface BookRecordBase {
  readonly schemaVersion: 1;
  readonly title: string;
  readonly aliases: readonly string[];
  readonly topicIds: readonly string[];
  readonly claims: readonly BookClaim[];
  readonly relatedIds: readonly string[];
  readonly review: BookReview;
  readonly rights: {
    readonly basis: 'original-summary-and-structured-facts';
    readonly license: 'All Rights Reserved';
  };
  readonly applicableRuleIds?: readonly `rule-${string}`[];
  readonly tables?: readonly BookTable[];
  readonly discrepancies?: readonly {
    readonly id: string;
    readonly status: 'resolved' | 'unresolved';
    readonly description: string;
    readonly citationIds: readonly string[];
    readonly resolution?: string;
  }[];
}

interface BookStructure {
  readonly lineOrder: 'bottom-to-top';
  readonly lines: readonly ('yin' | 'yang')[];
  readonly claimIds: readonly string[];
}

export interface BookTrigram extends BookRecordBase {
  readonly id: TrigramId;
  readonly type: 'trigram';
  readonly structure: BookStructure & { readonly symbol: string; readonly element: BookElement };
}

export interface BookHexagram extends BookRecordBase {
  readonly id: HexagramId;
  readonly type: 'hexagram';
  readonly structure: BookStructure & {
    readonly kingWenNumber: number;
    readonly upperTrigramId: TrigramId;
    readonly lowerTrigramId: TrigramId;
  };
  readonly lines: readonly {
    readonly position: number;
    readonly polarity: 'yin' | 'yang';
    readonly label: string;
    readonly claims: readonly BookClaim[];
  }[];
  readonly specialPassages: readonly {
    readonly id: string;
    readonly title: string;
    readonly claims: readonly BookClaim[];
  }[];
}

export interface BookTerm extends BookRecordBase {
  readonly id: `term-${string}`;
  readonly type: 'term';
}

export interface BookRule extends BookRecordBase {
  readonly id: `rule-${string}`;
  readonly type: 'rule';
  readonly ruleset: 'liuyao-standard-v1';
  readonly category: KnowledgeRuleCategory;
}

export interface BookArticle extends BookRecordBase {
  readonly id: `article-${string}`;
  readonly type: 'article';
}

export type BookRecord = BookTrigram | BookHexagram | BookTerm | BookRule | BookArticle;
export type BookElement = 'wood' | 'fire' | 'earth' | 'metal' | 'water';

export interface BookCitation {
  readonly id: string;
  readonly sourceId: `source-${string}`;
  readonly editionId: string;
  readonly location: {
    readonly chapter: string;
    readonly section: string;
    readonly pdfPageStart: number;
    readonly pdfPageEnd: number;
    readonly printedPageStart?: string;
    readonly printedPageEnd?: string;
  };
  readonly textLayer:
    | 'original-text'
    | 'author-commentary'
    | 'translator-note'
    | 'supplement'
    | 'technical-exposition';
  readonly attributedTo?: string;
}

export interface BookSource {
  readonly id: `source-${string}`;
  readonly title: string;
  readonly author: string;
  readonly contributors: readonly string[];
  readonly editions: readonly {
    readonly id: string;
    readonly label: string;
    readonly sha256: string;
    readonly pdfPageCount: number;
    readonly localInputPath: string;
    readonly publication: {
      readonly publisher: string | null;
      readonly year: number | null;
      readonly note: string;
    };
    readonly rights: {
      readonly status: 'unconfirmed';
      readonly use: 'research-only';
      readonly note: string;
    };
  }[];
}

export interface BookManifest {
  readonly schemaVersion: 1;
  readonly corpusId: string;
  readonly language: 'vi';
  readonly sourceFile: string;
  readonly citationFiles: readonly string[];
  readonly recordFiles: readonly string[];
  readonly releaseIds: readonly string[];
  readonly topics: readonly {
    readonly id: string;
    readonly title: string;
    readonly track: 'shared' | 'classical' | 'liuyao';
    readonly status: 'partial' | 'pending' | 'reviewed';
  }[];
  readonly coverageAuthors: readonly string[];
  readonly nextBatch: {
    readonly hexagramIds: readonly HexagramId[];
    readonly topicIds: readonly string[];
    readonly note: string;
  };
}
