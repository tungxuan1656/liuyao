import type { ContentTable, KnowledgeEntity } from '@liuyao/knowledge';
import { getContentTableId, getKnowledgeEntity, getTerm } from '@liuyao/knowledge';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { KnowledgeReferences } from './knowledge-entries';

const labels: Record<string, string> = {
  trigramId: 'Quái',
  element: 'Ngũ hành',
  hexagramIds: 'Các quẻ',
  inner: 'Nội quái',
  outer: 'Ngoại quái',
  stage: 'Giai đoạn',
  palaceSequence: 'Thứ tự trong cung',
  shiPosition: 'Thế',
  yingPosition: 'Ứng',
  branchId: 'Địa chi',
  stemId: 'Thiên can',
  from: 'Từ',
  relation: 'Quan hệ',
  to: 'Đến',
  relativeId: 'Lục thân',
  sapCount: 'Sấp',
  nguaCount: 'Ngửa',
  lineClass: 'Loại hào',
  polarity: 'Âm dương',
  changing: 'Động',
  primaryHexagramId: 'Quẻ gốc',
  changedHexagramId: 'Quẻ biến',
  movingPositions: 'Hào động',
  primaryLines: 'Hình gốc',
  changedLines: 'Hình biến',
};
const names: Record<string, string> = {
  wood: 'Mộc',
  fire: 'Hỏa',
  earth: 'Thổ',
  metal: 'Kim',
  water: 'Thủy',
  yin: 'Âm',
  yang: 'Dương',
  generates: 'Sinh',
  controls: 'Khắc',
  same: 'Đồng hành',
  'palace-generates-line': 'Cung sinh hào',
  'palace-controls-line': 'Cung khắc hào',
  'line-controls-palace': 'Hào khắc cung',
  'line-generates-palace': 'Hào sinh cung',
  'young-yang': 'Thiếu dương',
  'young-yin': 'Thiếu âm',
  'old-yang': 'Lão dương',
  'old-yin': 'Lão âm',
};
const titles: Record<ContentTable['kind'], string> = {
  palaces: 'Bát cung',
  'na-jia': 'Nạp Giáp',
  markers: 'Thế và Ứng',
  'branch-elements': 'Ngũ hành địa chi',
  'element-cycles': 'Ngũ hành sinh khắc',
  'relative-relations': 'Lục thân',
  'coin-outcomes': 'Kết quả ba đồng tiền',
  transformation: 'Ví dụ biến quẻ',
};
function display(value: unknown): string {
  if (Array.isArray(value)) return value.map(display).join(' · ');
  if (value && typeof value === 'object') return Object.values(value).map(display).join(' ');
  if (typeof value === 'boolean') return value ? 'Có' : 'Không';
  const text = String(value);
  return (
    getKnowledgeEntity(text as KnowledgeEntity['id'])?.name ??
    getTerm(text as `term-${string}`)?.name ??
    names[text] ??
    text
  );
}
export function KnowledgeTables({ tables }: { tables: readonly ContentTable[] }) {
  return (
    <>
      {tables.map(table => {
        const keys = Object.keys(table.rows[0] ?? {});
        return (
          <Card
            key={getContentTableId(table)}
            id={getContentTableId(table)}
            className="scroll-mt-24"
          >
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                {titles[table.kind]}
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    {keys.map(key => (
                      <th key={key} scope="col" className="p-3 text-left">
                        {labels[key] ?? key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {table.rows.map((row, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: reference rows are static corpus data and never reordered.
                    <tr key={index}>
                      {keys.map(key => (
                        <td key={key} className="p-3 align-top">
                          {display((row as unknown as Record<string, unknown>)[key])}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <KnowledgeReferences references={table.references} />
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}
