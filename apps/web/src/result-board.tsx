import type { ReadingResult } from '@liuyao/core';
import { Link } from 'react-router-dom';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Separator } from './components/ui/separator';
import { YaoSymbol } from './components/yao-symbol';
import { FactButton, type FactSelection } from './result-facts';
import {
  branchName,
  elementName,
  hexagramLabel,
  relativeName,
  stemName,
  trigramLabel,
} from './result-labels';
import { ROUTES } from './route-paths';

export function HexagramBoard({
  result,
  changed = false,
  trigramIds,
  select,
}: {
  result: ReadingResult;
  changed?: boolean;
  trigramIds?: { upper: ReadingResult['upperTrigramId']; lower: ReadingResult['lowerTrigramId'] };
  select: (fact: FactSelection) => void;
}) {
  const lines = [...result.lines].reverse();
  const hexagramId = changed ? result.changedHexagramId : result.primaryHexagramId;
  const upperId = trigramIds?.upper ?? result.upperTrigramId;
  const lowerId = trigramIds?.lower ?? result.lowerTrigramId;

  return (
    <Card aria-label={changed ? 'Quẻ biến' : 'Quẻ chính'} className="min-w-0">
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          {changed ? 'Quẻ biến' : 'Quẻ chính'}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex min-w-0 flex-col gap-4">
        {hexagramId ? (
          <FactButton
            hideLabel
            fact={{
              id: changed ? 'result.changedHexagramId' : 'result.primaryHexagramId',
              label: changed ? 'Quẻ biến' : 'Quẻ chính',
              value: hexagramLabel(hexagramId),
              libraryTarget: { kind: 'hexagram', id: hexagramId },
              context: {
                contextType: changed ? 'changed' : 'primary',
                hexagramId,
                lines: result.lines,
                selectionToken: Date.now(),
              },
            }}
            onSelect={select}
          />
        ) : (
          <p>Không có thông tin quẻ biến</p>
        )}
        <div className="grid gap-2">
          {changed ? (
            <>
              <Button
                variant="outline"
                size="lg"
                render={<Link to={ROUTES.libraryDetail('trigram', upperId)} />}
              >
                Ngoại quái · {trigramLabel(upperId)}
              </Button>
              <Button
                variant="outline"
                size="lg"
                render={<Link to={ROUTES.libraryDetail('trigram', lowerId)} />}
              >
                Nội quái · {trigramLabel(lowerId)}
              </Button>
            </>
          ) : (
            <>
              <FactButton
                fact={{
                  id: 'result.upperTrigramId',
                  label: 'Ngoại quái',
                  value: trigramLabel(upperId),
                  libraryTarget: { kind: 'trigram', id: upperId },
                }}
                onSelect={select}
              />
              <FactButton
                fact={{
                  id: 'result.lowerTrigramId',
                  label: 'Nội quái',
                  value: trigramLabel(lowerId),
                  libraryTarget: { kind: 'trigram', id: lowerId },
                }}
                onSelect={select}
              />
            </>
          )}
        </div>
        <Separator />
        <ol
          className="flex flex-col divide-y"
          aria-label={
            changed
              ? 'Tính âm dương sau biến đổi; hào sáu ở trên, hào một ở dưới'
              : 'Các hào, hào sáu ở trên và hào một ở dưới'
          }
        >
          {lines.map(line => {
            const polarity =
              changed && line.changing ? (line.polarity === 'yin' ? 'yang' : 'yin') : line.polarity;
            const lineFact: FactSelection | undefined = hexagramId
              ? {
                  id: 'context.line',
                  label: changed
                    ? `Hào ${line.position} · Quẻ biến`
                    : `Hào ${line.position} · Quẻ chính`,
                  value: changed
                    ? `${hexagramLabel(hexagramId)} · Hào ${line.position}`
                    : `${hexagramLabel(hexagramId)} · Hào ${line.position}${
                        line.position === result.shiPosition
                          ? ' (Thế)'
                          : line.position === result.yingPosition
                            ? ' (Ứng)'
                            : ''
                      }`,
                  context: {
                    contextType: changed ? 'changed' : 'primary',
                    hexagramId,
                    position: line.position,
                    lines: result.lines,
                    selectionToken: Date.now(),
                  },
                }
              : undefined;

            return (
              <li key={line.position} className="min-w-0">
                {lineFact ? (
                  <Button
                    variant="ghost"
                    type="button"
                    className="grid min-h-12 w-full min-w-0 grid-cols-[2rem_5rem_minmax(0,1fr)] items-center gap-2 rounded-none px-2 py-1.5 text-left font-normal hover:bg-accent focus-visible:ring-1"
                    onClick={() => select(lineFact)}
                    aria-label={`Hào ${line.position}${
                      !changed && line.position === result.shiPosition
                        ? ' (Thế)'
                        : !changed && line.position === result.yingPosition
                          ? ' (Ứng)'
                          : ''
                    }: ${
                      changed
                        ? line.changing
                          ? 'Biến từ hào động'
                          : 'Hào tĩnh'
                        : line.changing
                          ? 'Động'
                          : 'Tĩnh'
                    }. Xem giải nghĩa hào.`}
                  >
                    <span className="text-sm font-medium">
                      {changed
                        ? line.position
                        : line.position === result.shiPosition
                          ? 'Thế'
                          : line.position === result.yingPosition
                            ? 'Ứng'
                            : line.position}
                    </span>
                    <YaoSymbol polarity={polarity} changing={!changed && line.changing} />
                    <span className="min-w-0 truncate text-sm text-muted-foreground">
                      {changed ? (
                        <span className={line.changing ? undefined : 'sr-only'}>
                          {line.changing ? 'Đổi âm dương' : 'Giữ nguyên'}
                        </span>
                      ) : (
                        `${stemName(line.naJiaStem)} ${branchName(line.naJiaBranch)} · ${elementName(line.element)} · ${relativeName(line.relative)}`
                      )}
                    </span>
                  </Button>
                ) : (
                  <div className="grid min-h-12 min-w-0 grid-cols-[2rem_5rem_minmax(0,1fr)] items-center gap-2 px-2 py-1.5">
                    <span className="text-sm font-medium">{line.position}</span>
                    <YaoSymbol polarity={polarity} changing={!changed && line.changing} />
                    <span className="min-w-0 truncate text-sm text-muted-foreground">
                      {line.changing ? 'Đổi âm dương' : 'Giữ nguyên'}
                    </span>
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </CardContent>
      {!changed && (
        <CardFooter className="flex-col items-stretch gap-2">
          <FactButton
            fact={{
              id: 'result.palaceId',
              label: 'Cung',
              value:
                (
                  {
                    'palace-heaven': 'Càn',
                    'palace-lake': 'Đoài',
                    'palace-fire': 'Ly',
                    'palace-thunder': 'Chấn',
                    'palace-wind': 'Tốn',
                    'palace-water': 'Khảm',
                    'palace-mountain': 'Cấn',
                    'palace-earth': 'Khôn',
                  } as const
                )[result.palaceId] ?? 'Không xác định',
            }}
            onSelect={select}
          />
          <FactButton
            fact={{
              id: 'result.palaceElement',
              label: 'Ngũ hành của cung',
              value: elementName(result.palaceElement),
            }}
            onSelect={select}
          />
        </CardFooter>
      )}
    </Card>
  );
}
