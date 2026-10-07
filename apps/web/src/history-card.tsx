import { type StoredReadingRecord, countChangingLines } from '@liuyao/core';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { hexagramLabel } from './result-labels';

type HistoryCardProps = {
  record: StoredReadingRecord;
  onSelect: (record: StoredReadingRecord) => void;
  onDelete: (id: string) => void;
};

const METHOD_LABELS: Record<string, string> = {
  automatic: 'Tự động',
  manual: 'Thủ công',
  direct: 'Trực tiếp',
};

function formatTimestamp(isoString: string): string {
  try {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function HistoryCard({ record, onSelect, onDelete }: HistoryCardProps) {
  const primaryName = hexagramLabel(record.result.primaryHexagramId);
  const changedName = record.result.changedHexagramId
    ? hexagramLabel(record.result.changedHexagramId)
    : null;
  const changingCount = countChangingLines(record.lines);
  const methodLabel = METHOD_LABELS[record.method] ?? record.method;

  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold leading-tight line-clamp-1">
              {record.question.trim().length > 0 ? record.question : 'Không ghi câu hỏi'}
            </CardTitle>
            <div className="text-xs text-muted-foreground">{formatTimestamp(record.createdAt)}</div>
          </div>
          <Badge variant="outline" className="text-xs shrink-0">
            {methodLabel}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-3 text-sm">
        <div className="flex items-center gap-2 font-medium">
          <span className="text-primary">{primaryName}</span>
          {changedName && (
            <>
              <span className="text-muted-foreground text-xs">→</span>
              <span className="text-primary">{changedName}</span>
            </>
          )}
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{changingCount > 0 ? `${changingCount} hào động` : 'Quẻ tĩnh'}</span>
          <span>•</span>
          <span>Hào: [{record.lines.join(', ')}]</span>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2 pt-0">
        <Button size="sm" variant="outline" onClick={() => onSelect(record)}>
          Xem chi tiết
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="text-destructive hover:bg-destructive/10"
          onClick={() => onDelete(record.id)}
        >
          Xóa
        </Button>
      </CardFooter>
    </Card>
  );
}
