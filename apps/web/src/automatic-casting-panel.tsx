import type { CastingMethod, CoinTossResult } from '@liuyao/core';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { CoinStage } from './casting/coin-stage';
import { CastingHexagram } from './casting/casting-hexagram';
import { CastingOutcome } from './casting/casting-outcome';
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
        >
          <ToggleGroupItem value="three-coin" aria-label="Ba đồng xu">
            3 xu
          </ToggleGroupItem>
          <ToggleGroupItem value="four-coin" aria-label="Bốn đồng xu">
            4 xu
          </ToggleGroupItem>
        </ToggleGroup>
        <span
          className="text-sm text-muted-foreground whitespace-nowrap"
          aria-label={`${revealedCount} trên 6 hào đã gieo`}
        >
          {revealedCount}/6
        </span>
      </CardHeader>
      <CardContent className="casting-workspace-content">
        <div className="casting-hexagram-column">
          <CastingHexagram
            lines={tosses.map((toss, index) => (busy && index === step ? undefined : toss.line))}
            step={step}
          />
        </div>
        <section className="casting-coin-stage" aria-label="Đồng xu">
          <CoinStage count={count} toss={toss} busy={busy} onComplete={onAnimationComplete} />
        </section>
        <CastingOutcome step={step} value={completed ? toss?.line : undefined} busy={busy} />
      </CardContent>
      <CardFooter className="casting-workspace-footer">
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          aria-label="Quay lại hào trước"
          title="Quay lại hào trước"
          disabled={step === 0 || busy}
          onClick={onBack}
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          aria-label="Xóa các hào"
          title="Xóa các hào"
          onClick={onReset}
        >
          <RotateCcw aria-hidden="true" />
        </Button>
        <Button
          type="button"
          size="lg"
          disabled={busy}
          aria-label={completed && !final && !successorExists ? 'Gieo hào tiếp' : undefined}
          onClick={final ? onFinish : completed ? onNext : onToss}
        >
          {busy ? (
            'Đang gieo…'
          ) : final ? (
            'Tính quẻ'
          ) : completed ? (
            successorExists ? (
              'Tiếp theo'
            ) : (
              <>
                <span className="sm:hidden">Gieo tiếp</span>
                <span className="hidden sm:inline">Gieo hào tiếp</span>
              </>
            )
          ) : (
            'Gieo hào'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
