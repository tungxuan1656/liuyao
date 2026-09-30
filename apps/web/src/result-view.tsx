import { useEffect, useRef, useState } from 'react';
import { getHexagram } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { useReadingSession } from './reading-session';
import { FactButton, FactInspector, type FactSelection } from './result-facts';
import { HexagramBoard } from './result-board';
import { YaoSymbol } from './components/yao-symbol';
import { branchName, elementName, hexagramLabel, relativeName, stemName } from './result-labels';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from './components/ui/empty';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './components/ui/sheet';
import './components/route-layout.css';
import './result-view.css';

function getYaoName(value: number) {
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
      return value.toString();
  }
}

export function ResultView() {
  const { reading } = useReadingSession();
  const [selectedFact, setSelectedFact] = useState<FactSelection | null>(null);
  const [compact, setCompact] = useState(() => window.matchMedia('(max-width: 899px)').matches);
  const returnFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 899px)');
    const update = () => {
      if (!media.matches) requestAnimationFrame(() => returnFocus.current?.focus());
      setCompact(media.matches);
    };
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const closeInspector = () => {
    setSelectedFact(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  };

  if (!reading)
    return (
      <main className="route-page">
        <Empty>
          <EmptyHeader>
            <EmptyTitle role="heading" aria-level={1}>
              Bắt đầu bằng cách gieo quẻ
            </EmptyTitle>
            <EmptyDescription>
              Quẻ đã hoàn tất chỉ được giữ trong bộ nhớ của phiên trình duyệt này.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="lg" render={<Link to={ROUTES.home} />}>
              Đến trang gieo quẻ
            </Button>
          </EmptyContent>
        </Empty>
      </main>
    );

  function selectFact(fact: FactSelection) {
    const active = document.activeElement;
    returnFocus.current = active instanceof HTMLElement ? active : null;
    setSelectedFact(fact);
  }

  const changedHexagram = reading.result.changedHexagramId
    ? getHexagram(reading.result.changedHexagramId)
    : undefined;

  return (
    <main className="route-page flex flex-col gap-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <Badge variant="secondary">Kết quả gieo quẻ · {reading.result.ruleset}</Badge>
          <h1 className="font-serif text-3xl font-semibold tracking-tight md:text-5xl">
            {reading.question || hexagramLabel(reading.result.primaryHexagramId)}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            Chọn từng dữ kiện để xem quy tắc và nguồn tham khảo. Quẻ này chỉ được giữ trong phiên
            hiện tại.
          </p>
        </div>
        <Button variant="outline" size="lg" render={<Link to={ROUTES.home} />}>
          Trang gieo quẻ
        </Button>
      </header>

      <div className="result-layout flex min-w-0 items-start gap-6">
        <div className="grid min-w-0 w-full flex-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Tổng quan
              </CardTitle>
              <CardDescription>Quẻ được tạo từ sáu hào đã nhập.</CardDescription>
              <CardAction>
                <Badge variant="outline">Quẻ chính</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <FactButton
                fact={{
                  id: 'result.primaryHexagramId',
                  label: 'Quẻ chính',
                  value: hexagramLabel(reading.result.primaryHexagramId),
                  libraryTarget: { kind: 'hexagram', id: reading.result.primaryHexagramId },
                }}
                onSelect={selectFact}
              />
            </CardContent>
          </Card>

          <div className="grid min-w-0 gap-6 lg:grid-cols-2">
            <HexagramBoard result={reading.result} select={selectFact} />
            {changedHexagram ? (
              <HexagramBoard
                result={reading.result}
                changed
                trigramIds={{
                  upper: changedHexagram.upperTrigramId,
                  lower: changedHexagram.lowerTrigramId,
                }}
                select={selectFact}
              />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle role="heading" aria-level={2}>
                    Quẻ biến
                  </CardTitle>
                  <CardDescription>
                    {reading.result.changedHexagramId
                      ? 'Không có thông tin về quẻ biến.'
                      : 'Không có hào động nên quẻ này không có quẻ biến.'}
                  </CardDescription>
                </CardHeader>
              </Card>
            )}
          </div>

          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Thông tin các hào
              </CardTitle>
              <CardDescription>Hào sáu ở trên. Mở một dữ kiện để xem cách tính.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col divide-y">
              {[...reading.result.lines].reverse().map(line => (
                <section
                  key={line.position}
                  className="flex min-w-0 flex-col gap-3 py-4 first:pt-0 last:pb-0"
                  aria-label={`Hào ${line.position}`}
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-3">
                    <Badge variant="outline">Hào {line.position}</Badge>
                    <YaoSymbol polarity={line.polarity} changing={line.changing} />
                    <span className="font-medium">
                      {getYaoName(line.inputValue)}
                      {line.changing ? ' · động' : ''}
                    </span>
                    {line.position === reading.result.shiPosition && (
                      <Badge variant="secondary">Thế</Badge>
                    )}
                    {line.position === reading.result.yingPosition && (
                      <Badge variant="secondary">Ứng</Badge>
                    )}
                    {line.changing && (
                      <span className="text-muted-foreground">
                        → {line.polarity === 'yin' ? 'Dương' : 'Âm'}
                      </span>
                    )}
                  </div>
                  <div className="grid min-w-0 gap-2 sm:grid-cols-3">
                    <FactButton
                      fact={{
                        id: 'line.naJiaStem',
                        label: 'Nạp Giáp',
                        value: `${stemName(line.naJiaStem)} ${branchName(line.naJiaBranch)}`,
                      }}
                      onSelect={selectFact}
                    />
                    <FactButton
                      fact={{
                        id: 'line.element',
                        label: 'Ngũ hành',
                        value: elementName(line.element),
                      }}
                      onSelect={selectFact}
                    />
                    <FactButton
                      fact={{
                        id: 'line.relative',
                        label: 'Lục thân',
                        value: relativeName(line.relative),
                      }}
                      onSelect={selectFact}
                    />
                  </div>
                </section>
              ))}
            </CardContent>
          </Card>
        </div>

        <aside
          className="result-fact-inspector hidden sticky top-6 w-[min(32%,24rem)] shrink-0"
          aria-label="Giải thích dữ kiện"
        >
          <Card>
            <CardHeader>
              <CardTitle role="heading" aria-level={2}>
                Giải thích dữ kiện
              </CardTitle>
              <CardDescription>Quy tắc và nguồn liên quan đến mục đang chọn.</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedFact ? (
                <FactInspector fact={selectedFact} close={closeInspector} />
              ) : (
                <div className="flex flex-col gap-4">
                  <p className="text-muted-foreground">
                    Chọn một dữ kiện trong bảng quẻ để xem giải thích.
                  </p>
                  <FactButton
                    fact={{
                      id: 'result.ruleset',
                      label: 'Quy ước tính',
                      value: reading.result.ruleset,
                    }}
                    onSelect={selectFact}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>

      <Sheet
        open={Boolean(selectedFact && compact)}
        onOpenChange={open => {
          if (!open) closeInspector();
        }}
      >
        <SheetContent
          side="bottom"
          showCloseButton={false}
          className="max-h-[85dvh] overflow-y-auto"
        >
          {selectedFact && (
            <>
              <SheetHeader>
                <SheetTitle>Chi tiết dữ kiện: {selectedFact.label}</SheetTitle>
                <SheetDescription>Quy tắc và nguồn tham khảo</SheetDescription>
              </SheetHeader>
              <div className="px-8 pb-8">
                <FactInspector fact={selectedFact} close={closeInspector} />
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}
