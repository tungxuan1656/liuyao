import type { CastingMethod, CoinTossResult } from '@liuyao/core';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { getLinePresentation, describeLineValue } from './line-value-presentation';
import { CoinStage } from './casting/coin-stage';
import { coinNames } from './casting/coin-names';
import { CastingHexagram } from './casting/casting-hexagram';

type Props = {
  step: number;
  tosses: readonly CoinTossResult[];
  method: CastingMethod;
  busy: boolean;
  onMethodChange: (method: CastingMethod) => void;
  onBack: () => void;
  onNext: () => void;
  onToss: () => void;
  onFinish: () => void;
  onAnimationComplete: () => void;
};

export function AutomaticCastingPanel({
  step,
  tosses,
  method,
  busy,
  onMethodChange,
  onBack,
  onNext,
  onToss,
  onFinish,
  onAnimationComplete,
}: Props) {
  const toss = tosses[step];
  const count = method === 'three-coin' ? 3 : 4;
  const completed = Boolean(toss) && !busy;
  const final = completed && step === 5;
  const revealedCount = tosses.length - (busy ? 1 : 0);
  return (
    <Card
      className="flex flex-col gap-0 border-0 shadow-none bg-white text-neutral-900 rounded-none overflow-hidden"
      aria-label="Gieo từng hào"
    >
      <CardHeader className="flex flex-row items-center justify-between p-4 md:px-7 md:py-5 border-b-0 gap-4">
        <ToggleGroup
          aria-label="Số lượng đồng xu"
          value={[method]}
          onValueChange={value => {
            if (value[0]) onMethodChange(value[0] as CastingMethod);
          }}
          disabled={busy || tosses.length > 0}
          className="bg-neutral-100 border-0"
        >
          <ToggleGroupItem
            value="three-coin"
            aria-label="Ba đồng xu"
            className="min-h-[44px] text-sm data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-none"
          >
            Ba đồng xu
          </ToggleGroupItem>
          <ToggleGroupItem
            value="four-coin"
            aria-label="Bốn đồng xu"
            className="min-h-[44px] text-sm data-[state=on]:bg-neutral-900 data-[state=on]:text-white rounded-none"
          >
            Bốn đồng xu
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-sm text-neutral-500 whitespace-nowrap">{revealedCount} / 6 hào</span>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-[35%_minmax(0,1fr)] min-h-[400px] p-0">
        <div className="flex flex-col justify-center p-4 md:p-8 md:pr-6 border-b md:border-b-0 md:border-r border-neutral-100 bg-neutral-50">
          <CastingHexagram
            lines={tosses.map((toss, index) => (busy && index === step ? undefined : toss.line))}
            step={step}
          />
        </div>
        <section
          className="min-w-0 relative grid grid-rows-[190px_80px] md:grid-rows-[300px_100px]"
          aria-label="Sân khấu gieo đồng xu"
        >
          <div className="relative overflow-hidden isolate h-full bg-neutral-100 flex items-center justify-center">
            <CoinStage count={count} toss={toss} busy={busy} onComplete={onAnimationComplete} />
          </div>
          <div
            className="grid grid-rows-1 p-4 md:px-6 md:pb-4 text-center h-[80px] md:h-[100px]"
            aria-live="polite"
          >
            {completed && toss ? (
              <div className="h-full flex flex-col items-center justify-center gap-1" role="status">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-neutral-500">Hào {step + 1}</span>
                  <strong data-line-value={toss.line} className="font-medium text-xl md:text-2xl">
                    {getLinePresentation(toss.line).name}
                  </strong>
                </div>
                <span className="sr-only">{describeLineValue(toss.line)}</span>
                <span className="max-w-[370px] text-xs leading-relaxed text-neutral-500">
                  {toss.coins
                    .map(
                      (coin, index) =>
                        `${count === 4 ? `${coinNames[index]}: ` : ''}${coin ? 'mặt trời' : 'mặt trăng'}`,
                    )
                    .join(' · ')}
                </span>
              </div>
            ) : (
              <div
                className="h-full flex flex-col items-center justify-center gap-1 text-neutral-500"
                role="status"
              >
                <span className="text-xs">Hào {step + 1}</span>
                <p className="m-0 text-lg md:text-xl font-normal">
                  {busy ? 'Đồng xu đang rơi…' : 'Tĩnh tâm, rồi gieo một hào.'}
                </p>
              </div>
            )}
          </div>
        </section>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between p-4 md:px-7 md:py-5 border-t border-neutral-100">
        <Button
          type="button"
          variant="ghost"
          className="w-auto border-0 bg-transparent text-neutral-900 px-0 hover:bg-transparent"
          disabled={step === 0 || busy}
          onClick={onBack}
        >
          Quay lại
        </Button>
        <span className="hidden md:inline text-xs text-neutral-500">
          {final ? 'Sáu hào đã đủ' : 'Mỗi lần gieo, một hào thành hình'}
        </span>
        <Button
          type="button"
          className="w-36 min-h-[46px] rounded-none bg-neutral-900 text-white hover:bg-neutral-800 border-0"
          disabled={busy}
          onClick={final ? onFinish : completed ? onNext : onToss}
        >
          {busy ? 'Đang gieo…' : final ? 'Tính quẻ' : completed ? 'Tiếp theo' : 'Gieo hào'}
        </Button>
      </CardFooter>
    </Card>
  );
}
