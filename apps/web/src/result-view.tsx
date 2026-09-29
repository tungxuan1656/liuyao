import { useEffect, useRef, useState } from 'react';
import { getHexagram } from '@liuyao/knowledge';
import { Link } from 'react-router-dom';
import { ROUTES } from './route-paths';
import { useReadingSession } from './reading-session';
import { FactButton, FactInspector, type FactSelection } from './result-facts';
import { HexagramBoard } from './result-board';
import { YaoSymbol } from './components/yao-symbol';
import { branchName, elementName, hexagramLabel, relativeName, stemName } from './result-labels';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from './components/ui/sheet';

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
      if (!media.matches) {
        requestAnimationFrame(() => returnFocus.current?.focus());
      }
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
      <main className="max-w-2xl py-8 text-neutral-900 mx-auto">
        <p className="text-xs font-semibold tracking-wider uppercase text-neutral-500 mb-2">
          Chưa có kết quả
        </p>
        <h1 className="text-3xl font-medium mb-4">Bắt đầu bằng cách gieo quẻ</h1>
        <p className="text-neutral-600 mb-4">
          Quẻ đã hoàn tất chỉ được giữ trong bộ nhớ của phiên trình duyệt này.
        </p>
        <Link
          className="inline-flex items-center min-h-[44px] px-4 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors"
          to={ROUTES.home}
        >
          Quay lại trang gieo quẻ
        </Link>
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
    <main className="w-full max-w-6xl mx-auto text-neutral-900 grid gap-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 py-4 mb-2 border-b border-border">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-1">
            Kết quả gieo quẻ · Quy ước: {reading.result.ruleset}
          </p>
          <h1 className="text-2xl md:text-4xl font-medium mt-1 mb-2">
            {reading.question || 'Quẻ chưa đặt tên'}
          </h1>
          <p className="max-w-[62ch] text-sm text-neutral-500 m-0">
            Các dữ kiện được tính từ sáu hào. Quẻ này chỉ được giữ trong bộ nhớ của phiên hiện tại.
          </p>
        </div>
        <Link
          to={ROUTES.home}
          className="inline-flex min-h-[44px] items-center px-3 text-sm text-neutral-900 hover:text-neutral-600"
        >
          Trang gieo quẻ
        </Link>
      </header>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="flex-1 grid gap-4 min-w-0 w-full">
          <FactButton
            fact={{
              id: 'result.primaryHexagramId',
              label: 'Quẻ chính',
              value: hexagramLabel(reading.result.primaryHexagramId),
              libraryTarget: { kind: 'hexagram', id: reading.result.primaryHexagramId },
            }}
            onSelect={selectFact}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            ) : reading.result.changedHexagramId ? (
              <p
                className="text-sm text-neutral-500 p-4 border-l-2 border-neutral-900"
                role="status"
              >
                Không có thông tin về quẻ biến.
              </p>
            ) : (
              <p className="text-sm text-neutral-500 p-4 border-l-2 border-neutral-900">
                Không có hào động nên quẻ này không có quẻ biến.
              </p>
            )}
          </div>

          <section className="pt-2" aria-labelledby="line-facts-heading">
            <div className="flex items-baseline justify-between gap-2 pb-2 mb-2">
              <h2 id="line-facts-heading" className="text-xl font-medium m-0">
                Thông tin các hào
              </h2>
              <span className="text-xs text-neutral-500">Hào sáu ở trên</span>
            </div>

            <div className="grid gap-1">
              {[...reading.result.lines].reverse().map(line => (
                <div
                  className="flex items-center gap-2 md:gap-4 min-h-[50px] py-1 border-b border-neutral-100 last:border-0"
                  key={line.position}
                >
                  <div className="w-8 text-center shrink-0">
                    <span className="text-base font-medium">{line.position}</span>
                    <small className="block min-h-[0.8rem] text-[0.6rem] font-semibold text-neutral-900">
                      {line.position === reading.result.shiPosition
                        ? 'Thế'
                        : line.position === reading.result.yingPosition
                          ? 'Ứng'
                          : ''}
                    </small>
                  </div>
                  <div className="w-16 shrink-0 flex justify-center">
                    <YaoSymbol polarity={line.polarity} changing={line.changing} />
                  </div>

                  <div className="flex-1 grid grid-cols-3 gap-1 md:gap-2">
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

                  <div className="w-24 text-right shrink-0 flex flex-col items-end justify-center">
                    <span className="text-[0.65rem] text-neutral-500 font-medium">
                      {getYaoName(line.inputValue)}
                      {line.changing ? ' · động' : ''}
                    </span>
                    {line.changing && (
                      <small className="text-neutral-900 text-[0.65rem] mt-0.5">
                        → {line.polarity === 'yin' ? 'Dương' : 'Âm'}
                      </small>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside
          className="hidden md:block sticky top-20 min-h-[350px] w-80 shrink-0 pl-6 border-l border-border"
          aria-label="Giải thích dữ kiện"
        >
          {selectedFact ? (
            <FactInspector fact={selectedFact} close={closeInspector} />
          ) : (
            <div className="py-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-2">
                Giải thích dữ kiện
              </p>
              <h2 className="text-xl font-medium mb-2">Khám phá dữ kiện của kết quả</h2>
              <p className="text-sm text-neutral-500 leading-relaxed mb-4">
                Chọn dữ kiện được gạch chân để xem quy tắc và nguồn tham khảo.
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
        </aside>
      </div>

      <Sheet
        open={Boolean(selectedFact && compact)}
        onOpenChange={open => {
          if (!open) closeInspector();
        }}
      >
        <SheetContent
          side={compact ? 'bottom' : 'right'}
          showCloseButton={false}
          className="border-0 rounded-t-xl md:rounded-none bg-white p-6 max-h-[85vh] md:max-h-screen overflow-y-auto w-full md:max-w-md shadow-none"
        >
          {selectedFact && (
            <>
              <SheetTitle className="sr-only">Chi tiết dữ kiện: {selectedFact.label}</SheetTitle>
              <SheetDescription className="sr-only">Quy tắc và nguồn tham khảo</SheetDescription>
              <FactInspector fact={selectedFact} close={closeInspector} />
            </>
          )}
        </SheetContent>
      </Sheet>
    </main>
  );
}
