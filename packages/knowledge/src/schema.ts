/** Stable IDs shared with @liuyao/core; duplicated here to avoid a runtime dependency. */
export type TrigramId =
  | 'trigram-heaven'
  | 'trigram-lake'
  | 'trigram-fire'
  | 'trigram-thunder'
  | 'trigram-wind'
  | 'trigram-water'
  | 'trigram-mountain'
  | 'trigram-earth';

export type HexagramNumber =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31'
  | '32'
  | '33'
  | '34'
  | '35'
  | '36'
  | '37'
  | '38'
  | '39'
  | '40'
  | '41'
  | '42'
  | '43'
  | '44'
  | '45'
  | '46'
  | '47'
  | '48'
  | '49'
  | '50'
  | '51'
  | '52'
  | '53'
  | '54'
  | '55'
  | '56'
  | '57'
  | '58'
  | '59'
  | '60'
  | '61'
  | '62'
  | '63'
  | '64';
export type HexagramId = `hexagram-${HexagramNumber}`;
export type KnowledgeEntityId = TrigramId | HexagramId;
export type KnowledgeRecordId =
  `term-${string}` | `rule-${string}` | `source-${string}` | `reference-${string}`;
export type KnowledgeId = KnowledgeEntityId | KnowledgeRecordId;

export interface TrigramEntity {
  readonly kind: 'trigram';
  readonly id: TrigramId;
  readonly name: string;
  readonly han: string;
  readonly aliases: readonly string[];
}

export interface HexagramEntity {
  readonly kind: 'hexagram';
  readonly id: HexagramId;
  readonly name: string;
  readonly han: string;
  readonly aliases: readonly string[];
  readonly kingWenNumber: number;
  readonly upperTrigramId: TrigramId;
  readonly lowerTrigramId: TrigramId;
}

export type KnowledgeEntity = TrigramEntity | HexagramEntity;

export interface KnowledgeTerm {
  readonly id: `term-${string}`;
  readonly name: string;
  readonly aliases: readonly string[];
  readonly definition: string;
}

export interface KnowledgeRule {
  readonly id: `rule-${string}`;
  readonly ruleset: 'liuyao-standard-v1';
  readonly title: string;
  readonly explanation: string;
}

export interface KnowledgeSource {
  readonly id: `source-${string}`;
  readonly title: string;
  readonly author: string;
  readonly publication: string;
  readonly rights: string;
  readonly provenance: string;
}

export interface SourceReference {
  readonly id: `reference-${string}`;
  readonly sourceId: KnowledgeSource['id'];
  /** At least one target; each ID must name an entity, term, or rule in this catalog. */
  readonly targetIds: readonly (
    KnowledgeEntity['id'] | KnowledgeTerm['id'] | KnowledgeRule['id']
  )[];
  readonly location?: string;
}

export interface KnowledgeCatalog {
  readonly entities: readonly KnowledgeEntity[];
  readonly terms: readonly KnowledgeTerm[];
  readonly rules: readonly KnowledgeRule[];
  readonly sources: readonly KnowledgeSource[];
  readonly references: readonly SourceReference[];
}
