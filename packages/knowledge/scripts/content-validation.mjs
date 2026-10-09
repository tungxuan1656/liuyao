import Ajv from 'ajv';
import standaloneCode from 'ajv/dist/standalone/index.js';
import { entriesOf, anchorIdsOf, getContentTableId } from '../src/content-structure.ts';
export { entriesOf } from '../src/content-structure.ts';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const schema = JSON.parse(
  readFileSync(new URL('../schema/record.schema.json', import.meta.url), 'utf8'),
);
const validate = new Ajv({ allErrors: true, strict: false }).compile(schema);
/** Compile the same schema for lazy browser/Node validation, without bundling Ajv. */
export function runtimeValidatorSource() {
  const ajv = new Ajv({ strict: false, inlineRefs: false, code: { esm: true, source: true } });
  const code = standaloneCode(ajv, ajv.compile(schema));
  return (
    '// @ts-nocheck\n// Generated from record.schema.json; do not edit.\n' +
    'import unicodeLength from "ajv/dist/runtime/ucs2length.js";\n' +
    'const ucs2length = typeof unicodeLength === "function" ? unicodeLength : unicodeLength.default;\n' +
    code.replace('require("ajv/dist/runtime/ucs2length").default', 'ucs2length')
  );
}
function walk(value, visit) {
  if (Array.isArray(value)) {
    for (const child of value) walk(child, visit);
    return;
  }
  if (!value || typeof value !== 'object') return;
  visit(value);
  for (const child of Object.values(value)) walk(child, visit);
}
function fail(message) {
  throw new Error(message);
}
export function validateCorpus(records, sources, { repositoryRoot } = {}) {
  const byId = new Map();
  const sourceById = new Map();
  for (const source of sources) {
    if (!source.id || sourceById.has(source.id)) fail('Duplicate or missing source ID');
    if (!source.title || !source.author || !source.editions?.length)
      fail(source.id + ': missing bibliography');
    for (const edition of source.editions) {
      if (!Number.isInteger(edition.pdfPageCount) || edition.pdfPageCount < 1)
        fail(source.id + ': invalid PDF page count');
    }
    sourceById.set(source.id, source);
  }
  for (const record of records) {
    if (!validate(record)) fail(record.id + ': ' + JSON.stringify(validate.errors.slice(0, 4)));
    if (byId.has(record.id)) fail('Duplicate record ' + record.id);
    byId.set(record.id, record);
    const ids = anchorIdsOf(record);
    if (new Set(ids).size !== ids.length) fail(record.id + ': duplicate content anchor ID');
    if (record.type === 'hexagram') {
      if (record.lines.some((line, index) => line.position !== index + 1))
        fail(record.id + ': line order must be 1–6');
      if (record.id !== 'hexagram-' + String(record.kingWenNumber).padStart(2, '0'))
        fail(record.id + ': incorrect King Wen number');
    }
    if (
      record.status === 'ready' &&
      (!record.entries.length ||
        (record.type === 'hexagram' && record.lines.some(line => !line.entries.length)))
    )
      fail(record.id + ': ready content must have explanations');
  }
  function checkTarget(id, owner) {
    const target = byId.get(id);
    if (!target) fail(owner.id + ': unknown linked record ' + id);
    if (owner.status === 'ready' && target.status !== 'ready')
      fail(owner.id + ': ready record links to draft ' + id);
    return target;
  }
  for (const record of records) {
    for (const id of [...(record.relatedIds ?? []), ...(record.applicableRuleIds ?? [])])
      checkTarget(id, record);
    if (record.type === 'hexagram') {
      const lower = checkTarget(record.lowerTrigramId, record);
      const upper = checkTarget(record.upperTrigramId, record);
      if (lower.type !== 'trigram' || upper.type !== 'trigram')
        fail(record.id + ': invalid trigram target');
      if (
        record.lines.some(
          (line, index) => line.polarity !== [...lower.lines, ...upper.lines][index],
        )
      )
        fail(record.id + ': polarity does not match trigrams');
    }
    walk(record, object => {
      if (object.references) {
        if (!Array.isArray(object.references) || !object.references.length)
          fail(record.id + ': source references required');
        for (const ref of object.references) {
          if (ref.sourceId) {
            const source = sourceById.get(ref.sourceId);
            if (!source) fail(record.id + ': unknown source ' + ref.sourceId);
            const pages = ref.pdfPages;
            if (
              !Array.isArray(pages) ||
              pages.length !== 2 ||
              !pages.every(Number.isInteger) ||
              pages[0] < 1 ||
              pages[1] < pages[0] ||
              pages[1] > source.editions[0].pdfPageCount
            )
              fail(record.id + ': invalid PDF page bounds');
          } else if (ref.documentPath) {
            if (
              !ref.section ||
              !ref.documentPath.startsWith('docs/') ||
              ref.documentPath.includes('..')
            )
              fail(record.id + ': invalid specification reference');
            if (repositoryRoot) {
              const file = path.join(repositoryRoot, ref.documentPath);
              if (!existsSync(file) || !readFileSync(file, 'utf8').includes(ref.section))
                fail(record.id + ': missing specification section');
            }
          } else fail(record.id + ': invalid source reference');
        }
      }
      if (object.links)
        for (const link of object.links) {
          const target = checkTarget(link.recordId, record);
          if (
            link.position !== undefined &&
            (target.type !== 'hexagram' ||
              !Number.isInteger(link.position) ||
              link.position < 1 ||
              link.position > 6)
          )
            fail(record.id + ': invalid line link');
          if (
            link.sectionId !== undefined &&
            !entriesOf(target).some(entry => entry.id === link.sectionId)
          )
            fail(record.id + ': unknown section link');
          if (link.position !== undefined && link.sectionId !== undefined)
            fail(record.id + ': ambiguous link');
        }
      if (object.target) {
        const target = checkTarget(object.target.recordId, record);
        const items = object.target.kind === 'figure' ? target.figures : target.tables;
        if (
          !items?.some(
            item =>
              (object.target.kind === 'table' ? getContentTableId(item) : item.id) ===
              object.target.id,
          )
        )
          fail(record.id + ': unknown lesson target');
      }
    });
  }
  return {
    records: records.length,
    ready: records.filter(record => record.status === 'ready').length,
  };
}
