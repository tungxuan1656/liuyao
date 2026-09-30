import type { ReadingResult } from '@liuyao/core';
import { Link } from 'react-router-dom';
import { YaoSymbol } from './components/yao-symbol';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import { Separator } from './components/ui/separator';
import { FactButton, type FactSelection } from './result-facts';
import { ROUTES } from './route-paths';
import {
  branchName,
  elementName,
  hexagramLabel,
  relativeName,
  stemName,
  trigramLabel,
} from './result-labels';

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
  const changedId = changed ? result.changedHexagramId : null;
  const upperId = trigramIds?.upper ?? result.upperTrigramId;
  const lowerId = trigramIds?.lower ?? result.lowerTrigramId;

  return (
    <Card aria-label={changed ? 'Quẻ biến' : 'Quẻ chính'} className="min-w-0">
      <CardHeader>
        <CardTitle role="heading" aria-level={2}>
          {changed ? 'Quẻ biến' : 'Quẻ chính'}
        </CardTitle>
        <CardDescription>
          {changed ? 'Sau khi đổi các hào động' : 'Sáu hào từ dưới lên trên'}
        </CardDescription>
        <CardAction>
          <Badge variant="outline">
            {changed
              ? (changedId?.replace('hexagram-', '') ?? '—')
              : result.primaryHexagramId.replace('hexagram-', '')}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex min-w-0 flex-col gap-4">
        <h2 className="font-serif text-2xl font-semibold">
          {changed
            ? changedId
              ? hexagramLabel(changedId)
              : 'Không có thông tin quẻ biến'
            : hexagramLabel(result.primaryHexagramId)}
        </h2>
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
        {changed && changedId && (
          <FactButton
            fact={{
              id: 'result.changedHexagramId',
              label: 'Quẻ biến',
              value: hexagramLabel(changedId),
              libraryTarget: { kind: 'hexagram', id: changedId },
            }}
            onSelect={select}
          />
        )}
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
            return (
              <li
                key={line.position}
                className="grid min-h-12 min-w-0 grid-cols-[2rem_5rem_minmax(0,1fr)] items-center gap-2"
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
                  {changed
                    ? line.changing
                      ? 'Đã đổi âm dương'
                      : 'Giữ nguyên'
                    : `${stemName(line.naJiaStem)} ${branchName(line.naJiaBranch)} · ${elementName(line.element)} · ${relativeName(line.relative)}`}
                </span>
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
