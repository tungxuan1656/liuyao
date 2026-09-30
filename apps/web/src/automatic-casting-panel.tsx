import type { CastingMethod, CoinTossResult } from '@liuyao/core';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { getLinePresentation, describeLineValue } from './line-value-presentation';
import { CoinStage } from './casting/coin-stage';
import { coinIdentities } from './casting/coin-identities';
import { CastingHexagram } from './casting/casting-hexagram';
import './casting/casting-workspace.css';

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
  onReset: () => void;
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
  onReset,
}: Props) {
  const toss = tosses[step];
  const count = method === 'three-coin' ? 3 : 4;
  const completed = Boolean(toss) && !busy;
  const final = completed && step === 5;
  const successorExists = Boolean(tosses[step + 1]);
  const revealedCount = tosses.length - (busy ? 1 : 0);
  return (
    <Card aria-label="Gieo từng hào">
      <CardHeader className="casting-workspace-header">
        <ToggleGroup
          aria-label="Số lượng đồng xu"
          variant="outline"
          size="lg"
          value={[method]}
          onValueChange={value => {
            if (value[0]) onMethodChange(value[0] as CastingMethod);
          }}
          disabled={busy || tosses.length > 0}
          className="grid w-full grid-cols-1 sm:flex sm:w-fit"
        >
          <ToggleGroupItem value="three-coin" aria-label="Ba đồng xu" className="w-full sm:w-auto">
            Ba đồng xu
          </ToggleGroupItem>
          <ToggleGroupItem value="four-coin" aria-label="Bốn đồng xu" className="w-full sm:w-auto">
            Bốn đồng xu
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {revealedCount} / 6 hào
        </span>
      </CardHeader>
      <CardContent className="casting-workspace-content">
        <div className="casting-hexagram-column">
          <CastingHexagram
            lines={tosses.map((toss, index) => (busy && index === step ? undefined : toss.line))}
            step={step}
          />
        </div>
        <section className="casting-coin-workspace-stage" aria-label="Sân khấu gieo đồng xu">
          <div className="casting-coin-stage">
            <CoinStage count={count} toss={toss} busy={busy} onComplete={onAnimationComplete} />
          </div>
          <div className="casting-result-region" aria-live="polite">
            {completed && toss ? (
              <div
                className="flex h-full flex-col items-center justify-center gap-1 overflow-hidden"
                role="status"
              >
                <div className="flex items-baseline gap-3">
                  <span className="text-xs text-muted-foreground">Hào {step + 1}</span>
                  <strong data-line-value={toss.line} className="font-medium text-xl md:text-2xl">
                    {getLinePresentation(toss.line).name}
                  </strong>
                </div>
                <span className="sr-only">{describeLineValue(toss.line)}</span>
                <span className="max-w-92.5 text-xs leading-snug text-muted-foreground">
                  {toss.coins
                    .map(
                      (coin, index) =>
                        `${count === 4 ? `${coinIdentities[index]?.label}: ` : ''}${coin ? 'mặt trời' : 'mặt trăng'}`,
                    )
                    .join(' · ')}
                </span>
              </div>
            ) : (
              <div
                className="h-full flex flex-col items-center justify-center gap-1 text-muted-foreground"
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
      <CardFooter className="casting-workspace-footer">
        <Button
          type="button"
          variant="ghost"
          size={'sm'}
          disabled={step === 0 || busy}
          onClick={onBack}
        >
          Quay lại
        </Button>
        <div className="flex gap-4">
          <Button type="button" variant="ghost" size={'sm'} onClick={onReset}>
            Xóa các hào
          </Button>
          <Button
            type="button"
            disabled={busy}
            onClick={final ? onFinish : completed ? onNext : onToss}
          >
            {busy
              ? 'Đang gieo…'
              : final
                ? 'Tính quẻ'
                : completed
                  ? successorExists
                    ? 'Tiếp theo'
                    : 'Gieo hào tiếp'
                  : 'Gieo hào'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
