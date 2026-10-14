import type { ContentHexagram, ContentRecord, KnowledgeFactId } from '@liuyao/knowledge';
import { getRulesForFact, resolveReadingReferenceContext } from '@liuyao/knowledge';
import { type RefObject, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';
import { loadContentRecord } from './knowledge-content';
import { KnowledgeEntries } from './knowledge-entries';
import {
  FactRulesContent,
  type FactSelection,
  type HexagramKnowledgeContext,
} from './result-facts';
import { ROUTES } from './route-paths';

function getYaoName(value?: number) {
  switch (value) {
    case 6:
      return 'Lão Âm';
    case 7:
      return 'Thiếu Dương';
    case 8:
      return 'Thiếu Âm';
    case 9:
      return 'Lão Dương';
    default:
      return '';
  }
}

export function ResultKnowledgeInspector({
  fact,
  close,
  closeRef,
}: {
  fact: FactSelection & { context: HexagramKnowledgeContext };
  close: () => void;
  closeRef?: RefObject<HTMLButtonElement | null>;
}) {
  const { context } = fact;
  const [selectedPosition, setSelectedPosition] = useState<number | undefined>(context.position);
  const [specialIndex, setSpecialIndex] = useState<number | undefined>();
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    id: string;
    attempt: number;
    record?: ContentHexagram;
    error?: boolean;
  }>();

  useEffect(() => {
    setSelectedPosition(context.position);
    setSpecialIndex(undefined);
  }, [context.position, context.selectionToken]);

  useEffect(() => {
    let active = true;
    loadContentRecord(context.hexagramId)
      .then((record: ContentRecord | undefined) => {
        if (!active) return;
        if (record && record.type === 'hexagram') {
          setState({ id: context.hexagramId, attempt, record });
        } else {
          setState({ id: context.hexagramId, attempt, error: true });
        }
      })
      .catch(() => {
        if (active) setState({ id: context.hexagramId, attempt, error: true });
      });
    return () => {
      active = false;
    };
  }, [context.hexagramId, attempt]);

  const isCurrent = state?.id === context.hexagramId && state.attempt === attempt;
  const record = isCurrent ? state?.record : undefined;
  const hasError = isCurrent && Boolean(state?.error);

  const contextTitle = context.contextType === 'primary' ? 'Quẻ chính' : 'Quẻ biến';
  const hexagramTitle = record ? record.title : fact.value;

  const currentLine =
    record && selectedPosition !== undefined
      ? record.lines.find(l => l.position === selectedPosition)
      : undefined;
  const currentLineData =
    selectedPosition !== undefined
      ? context.lines?.find(l => l.position === selectedPosition)
      : undefined;
  const currentSpecial =
    record && specialIndex !== undefined ? record.specialPassages?.[specialIndex] : undefined;

  const isCalculatedFact = fact.id !== 'context.hexagram' && fact.id !== 'context.line';
  const rules = isCalculatedFact ? getRulesForFact(fact.id as KnowledgeFactId) : [];

  const resolvedContext = resolveReadingReferenceContext({
    contextType: context.contextType,
    hexagramId: context.hexagramId,
    position: selectedPosition,
  });

  const libraryHref =
    specialIndex !== undefined
      ? `${ROUTES.libraryDetail('hexagram', context.hexagramId)}#special-${specialIndex}`
      : (resolvedContext?.canonicalPath ?? ROUTES.libraryDetail('hexagram', context.hexagramId));

  return (
    <section aria-label={`Giải nghĩa ${contextTitle}`} className="flex min-w-0 flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{contextTitle}</Badge>
            {selectedPosition !== undefined ? (
              <Badge variant="outline">Hào {selectedPosition}</Badge>
            ) : null}
          </div>
          <p className="break-words font-serif text-xl font-semibold">
            {selectedPosition !== undefined && currentLine
              ? `Hào ${selectedPosition} · ${currentLine.label}`
              : currentSpecial
                ? currentSpecial.title
                : hexagramTitle}
          </p>
          {selectedPosition !== undefined && currentLineData && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              {context.contextType === 'primary' ? (
                <>
                  <span className="font-medium text-foreground">
                    {getYaoName(currentLineData.inputValue)}
                  </span>
                  <span>· {currentLineData.changing ? 'Hào động' : 'Hào tĩnh'}</span>
                  <span>· {currentLineData.polarity === 'yin' ? 'Âm' : 'Dương'}</span>
                </>
              ) : (
                <span>
                  {currentLineData.changing
                    ? `Biến từ hào động → ${currentLineData.polarity === 'yin' ? 'Dương' : 'Âm'}`
                    : `Hào tĩnh · ${currentLineData.polarity === 'yin' ? 'Âm' : 'Dương'}`}
                </span>
              )}
            </div>
          )}
        </div>
        <Button
          ref={closeRef}
          variant="ghost"
          size="lg"
          onClick={close}
          aria-label="Đóng phần giải nghĩa"
        >
          Đóng
        </Button>
      </div>

      <nav className="flex flex-wrap gap-1.5" aria-label="Chọn phần giải nghĩa quẻ và hào">
        <Button
          variant={
            selectedPosition === undefined && specialIndex === undefined ? 'default' : 'outline'
          }
          size="sm"
          className="min-h-11"
          type="button"
          aria-pressed={selectedPosition === undefined && specialIndex === undefined}
          onClick={() => {
            setSelectedPosition(undefined);
            setSpecialIndex(undefined);
          }}
        >
          Tổng quan
        </Button>
        {[1, 2, 3, 4, 5, 6].map(pos => (
          <Button
            key={pos}
            variant={selectedPosition === pos ? 'default' : 'outline'}
            size="sm"
            className="min-h-11"
            type="button"
            aria-pressed={selectedPosition === pos}
            onClick={() => {
              setSelectedPosition(pos);
              setSpecialIndex(undefined);
            }}
          >
            Hào {pos}
          </Button>
        ))}
        {record?.specialPassages?.map((passage, idx) => (
          <Button
            key={passage.title}
            variant={specialIndex === idx ? 'default' : 'outline'}
            size="sm"
            className="min-h-11"
            type="button"
            aria-pressed={specialIndex === idx}
            onClick={() => {
              setSelectedPosition(undefined);
              setSpecialIndex(idx);
            }}
          >
            {passage.title}
          </Button>
        ))}
      </nav>

      <Separator />

      {!isCurrent ? (
        <p role="status" className="text-muted-foreground">
          Đang tải nội dung…
        </p>
      ) : hasError || !record ? (
        <Alert>
          <AlertTitle>Chưa tải được nội dung</AlertTitle>
          <AlertDescription className="flex flex-col gap-3">
            <p>Hãy thử lại khi có kết nối hoặc khi thư viện ngoại tuyến đã tải xong.</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setAttempt(a => a + 1)}>
                Thử lại
              </Button>
              <Button variant="ghost" size="sm" onClick={close}>
                Đóng
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      ) : (
        <div className="flex flex-col gap-4">
          {selectedPosition !== undefined && currentLine ? (
            <KnowledgeEntries entries={currentLine.entries} expanded />
          ) : currentSpecial ? (
            <KnowledgeEntries entries={currentSpecial.entries} expanded />
          ) : (
            <KnowledgeEntries entries={record.entries} expanded />
          )}

          <Separator />
          <Button
            variant="outline"
            size="lg"
            className="h-auto min-h-11 whitespace-normal text-left"
            render={<Link to={libraryHref} />}
          >
            Xem trong thư viện
          </Button>

          {isCalculatedFact && rules.length > 0 && (
            <details className="group flex flex-col gap-3 rounded-lg border p-3.5 text-sm">
              <summary className="cursor-pointer font-medium select-none text-foreground hover:underline">
                Quy tắc tính & nguồn tham khảo ({rules.length})
              </summary>
              <div className="mt-2">
                <FactRulesContent factId={fact.id as KnowledgeFactId} />
              </div>
            </details>
          )}
        </div>
      )}
    </section>
  );
}
