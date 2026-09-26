import { TRIGRAM_IDS, type HexagramId, type TrigramId } from './contracts';

/** King Wen IDs: rows are upper trigrams, columns are lower, both in TRIGRAM_IDS order. */
const HEXAGRAM_BY_UPPER_AND_LOWER = [
  ['01', '10', '13', '25', '44', '06', '33', '12'],
  ['43', '58', '49', '17', '28', '47', '31', '45'],
  ['14', '38', '30', '21', '50', '64', '56', '35'],
  ['34', '54', '55', '51', '32', '40', '62', '16'],
  ['09', '61', '37', '42', '57', '59', '53', '20'],
  ['05', '60', '63', '03', '48', '29', '39', '08'],
  ['26', '41', '22', '27', '18', '04', '52', '23'],
  ['11', '19', '36', '24', '46', '07', '15', '02'],
] as const;

export function identifyHexagram(lower: TrigramId, upper: TrigramId): HexagramId {
  const row = HEXAGRAM_BY_UPPER_AND_LOWER[TRIGRAM_IDS.indexOf(upper)];
  const number = row?.[TRIGRAM_IDS.indexOf(lower)];
  if (!number) throw new Error(`Unknown hexagram pair: ${lower}, ${upper}`);
  return `hexagram-${number}`;
}
