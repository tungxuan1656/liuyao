import type { HexagramId, KnowledgeRuleCategory, TrigramId } from './schema.js';
import type { BookRecordV1, BookElement, BookSource, BookManifest } from './book-schema.js';
import type { BookTable } from './book-tables.js';
import type { BookFigure, BookTableMetadata, BookAuthorAlternative } from './book-figures.js';
import type { NonEmptyReadonlyArray } from './book-figures.js';
import type { BookLessonBlock, BookLessonTarget } from './book-lessons.js';

export type {
  BookFigure,
  BookFigureKind,
  BookFigureLabel,
  BookTableMetadata,
  BookAuthorAlternative,
} from './book-figures.js';
export type {
  BookLessonBlock,
  BookLessonTarget,
  BookLessonTextBlock,
  BookLessonTableBlock,
  BookLessonFigureBlock,
} from './book-lessons.js';

export interface BookProjectEvidence {
  readonly documentPath: string;
  readonly section: string;
  readonly revision: string;
}

export interface BookProjectContract {
  readonly documentPath: string;
  readonly revision: string;
  readonly sections: readonly string[];
}

export type BookManifestV2 = BookManifest & {
  readonly projectContracts?: readonly BookProjectContract[];
};

export interface ReleasedBookManifest {
  readonly schemaVersion: number;
  readonly recordSchemaVersions: readonly number[];
  readonly corpusId: string;
  readonly language: 'vi';
  readonly releaseIds: readonly string[];
  readonly snapshotIdentity: string;
  readonly topics: readonly BookManifest['topics'][number][];
  readonly projectContracts: readonly BookProjectContract[];
}

interface BookClaimBaseV2 {
  readonly id: string;
  readonly text: string;
  readonly attribution?: { readonly author: string; readonly via?: string };
  readonly conditions?: readonly string[];
  readonly dependsOnClaimIds?: readonly string[];
}

export interface BookCitationClaimV2 extends BookClaimBaseV2 {
  readonly kind:
    'structural-fact' | 'classical-meaning' | 'author-interpretation' | 'calculation-rule';
  readonly citationIds: NonEmptyReadonlyArray<string>;
  readonly projectEvidence?: never;
}

export interface BookProjectConventionClaimV2 extends BookClaimBaseV2 {
  readonly kind: 'project-convention';
  readonly citationIds: readonly [];
  readonly projectEvidence: readonly [BookProjectEvidence, ...BookProjectEvidence[]];
}

export type BookClaimV2 = BookCitationClaimV2 | BookProjectConventionClaimV2;

export interface BookReviewV2 {
  readonly status: 'draft' | 'reviewed' | 'disputed' | 'superseded';
  readonly reviewer?: string;
  readonly reviewedAt?: string;
  readonly method?: 'source-comparison';
  readonly evidenceCitationIds?: readonly string[];
  readonly evidenceClaimIds?: readonly string[];
  readonly note?: string;
}

type BookTableV2 = BookTable & BookTableMetadata;

interface BookRecordBaseV2 {
  readonly schemaVersion: 2;
  readonly title: string;
  readonly aliases: readonly string[];
  readonly topicIds: readonly string[];
  readonly claims: readonly BookClaimV2[];
  readonly relatedIds: readonly string[];
  readonly review: BookReviewV2;
  readonly rights: {
    readonly basis: 'original-summary-and-structured-facts';
    readonly license: 'All Rights Reserved';
  };
  readonly applicableRuleIds?: readonly `rule-${string}`[];
  readonly tables?: readonly BookTableV2[];
  readonly figures?: readonly BookFigure[];
  readonly discrepancies?: readonly {
    readonly id: string;
    readonly status: 'resolved' | 'unresolved';
    readonly description: string;
    readonly citationIds: readonly string[];
    readonly resolution?: string;
  }[];
}

interface BookStructureV2 {
  readonly lineOrder: 'bottom-to-top';
  readonly lines: readonly ('yin' | 'yang')[];
  readonly claimIds: readonly string[];
}

export interface BookTrigramV2 extends BookRecordBaseV2 {
  readonly id: TrigramId;
  readonly type: 'trigram';
  readonly structure: BookStructureV2 & { readonly symbol: string; readonly element: BookElement };
}

export interface BookHexagramV2 extends BookRecordBaseV2 {
  readonly id: HexagramId;
  readonly type: 'hexagram';
  readonly structure: BookStructureV2 & {
    readonly kingWenNumber: number;
    readonly upperTrigramId: TrigramId;
    readonly lowerTrigramId: TrigramId;
  };
  readonly lines: readonly {
    readonly position: number;
    readonly polarity: 'yin' | 'yang';
    readonly label: string;
    readonly claims: readonly BookClaimV2[];
  }[];
  readonly specialPassages: readonly {
    readonly id: string;
    readonly title: string;
    readonly claims: readonly BookClaimV2[];
  }[];
}

export interface BookTermV2 extends BookRecordBaseV2 {
  readonly id: `term-${string}`;
  readonly type: 'term';
}

export interface BookRuleV2 extends BookRecordBaseV2 {
  readonly id: `rule-${string}`;
  readonly type: 'rule';
  readonly ruleset: 'liuyao-standard-v1';
  readonly category: KnowledgeRuleCategory;
}

export interface BookArticleV2 extends BookRecordBaseV2 {
  readonly id: `article-${string}`;
  readonly type: 'article';
}

export interface BookLessonV2 extends BookRecordBaseV2 {
  readonly id: `lesson-${string}`;
  readonly type: 'lesson';
  readonly sequence: number;
  readonly prerequisiteLessonIds: readonly `lesson-${string}`[];
  readonly blocks: readonly BookLessonBlock[];
}

export type BookRecordV2 =
  BookTrigramV2 | BookHexagramV2 | BookTermV2 | BookRuleV2 | BookArticleV2 | BookLessonV2;

export type BookRecordVersioned = BookRecordV1 | BookRecordV2;

/** Authored source editions retain their local input paths. */
export type AuthoredBookSource = BookSource;

/** Runtime source editions omit local input paths from authored data. */
export type ReleasedBookSource = Omit<BookSource, 'editions'> & {
  readonly editions: readonly Omit<BookSource['editions'][number], 'localInputPath'>[];
};

// Re-export the target type here to keep lesson consumers on the versioned contract entry point.
export type { BookLessonTarget as LessonTargetV2 };
export type { BookAuthorAlternative as BookAuthorAlternativeV2 };
