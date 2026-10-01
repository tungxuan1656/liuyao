import { mapCoinsToLine, type CastingMethod, type CoinTossResult } from '@liuyao/core';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { CoinFace } from './casting/coin-face';
import { CastingHexagram } from './casting/casting-hexagram';
import { CastingOutcome } from './casting/casting-outcome';
import { coinIdentities } from './casting/coin-identities';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import type { useReadingSession } from './reading-session';
import './casting/casting-workspace.css';

type Draft = NonNullable<ReturnType<typeof useReadingSession>['draft']>;

type Props = {
  draft: Draft;
  step: number;
  setDraft: (draft: Draft | null) => void;
  onBack: () => void;
  onNext: () => void;
  onFinish: () => void;
  onReset: () => void;
};

export function ManualCastingPanel({
  draft,
  step,
  setDraft,
  onBack,
  onNext,
  onFinish,
  onReset,
}: Props) {
  const count = draft.coinMethod === 'three-coin' ? 3 : 4;
  const previous = draft.manualTosses?.[step];
  const coins = previous ? [...previous.coins] : Array.from({ length: count }, () => 0 as 0 | 1);
  const line = previous?.line;
  const confirmed = draft.manualConfirmed?.[step] ?? false;

  function flip(index: number) {
    if (confirmed) return;
    coins[index] = (coins[index] ? 0 : 1) as 0 | 1;
    const coinSet = coins as unknown as CoinTossResult['coins'];
    const toss: CoinTossResult = {
      coins: coinSet,
      method: draft.coinMethod,
      coinCount: count,
      line: mapCoinsToLine(coinSet, draft.coinMethod),
    };
    const all = [...(draft.manualTosses ?? [])];
    all[step] = toss;
    const previews = [...(draft.manualPreviewLines ?? [])];
    previews[step] = toss.line;
    const lines = [...draft.lines];
    delete lines[step];
    const confirmations = [...(draft.manualConfirmed ?? [])];
    confirmations[step] = false;
    setDraft({
      ...draft,
      manualTosses: all,
      manualConfirmed: confirmations,
      manualPreviewLines: previews,
      lines,
    });
  }

  return (
    <Card aria-label="Gieo từng hào">
      <CardHeader className="casting-workspace-header">
        <ToggleGroup
          aria-label="Số lượng đồng xu"
          variant="outline"
          size="lg"
          value={[draft.coinMethod]}
          onValueChange={value => {
            const method = value[0] as CastingMethod | undefined;
            if (!method || method === draft.coinMethod) return;
            setDraft({
              ...draft,
              coinMethod: method,
              manualTosses: [],
              manualConfirmed: [],
              manualPreviewLines: [],
              lines: [],
            });
          }}
          disabled={(draft.manualTosses?.some(Boolean) ?? false) || draft.lines.length > 0}
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
          aria-label={`${draft.manualConfirmed?.filter(Boolean).length ?? 0} trên 6 hào đã xác nhận`}
        >
          {draft.manualConfirmed?.filter(Boolean).length ?? 0}/6
        </span>
      </CardHeader>
      <CardContent className="casting-workspace-content">
        <div className="casting-hexagram-column">
          <CastingHexagram
            lines={Array.from({ length: 6 }, (_, index) =>
              draft.manualConfirmed?.[index] ? draft.manualTosses?.[index]?.line : undefined,
            )}
            step={step}
          />
        </div>
        <section className="casting-coin-stage" aria-label="Đồng xu">
          <div
            className={`coin-arrangement ${count === 3 ? 'coin-arrangement--three' : 'coin-arrangement--four'}`}
          >
            {coins.map((coin, index) => (
              <Button
                type="button"
                variant="ghost"
                className="manual-coin-button"
                key={index}
                aria-pressed={Boolean(coin)}
                disabled={confirmed}
                aria-label={`${count === 4 ? `${coinIdentities[index]?.label}, ` : `Đồng xu ${index + 1}, `}${coin ? 'mặt trời' : 'mặt trăng'}. Chạm để lật.`}
                onClick={() => flip(index)}
              >
                <CoinFace value={coin} identityIndex={count === 4 ? index : undefined} />
                {count === 4 && (
                  <span className="text-xs text-muted-foreground">
                    {coinIdentities[index]?.label}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </section>
        <CastingOutcome step={step} value={line} manual confirmed={confirmed} />
      </CardContent>
      <CardFooter className="casting-workspace-footer">
        <Button
          type="button"
          variant="ghost"
          size="icon-lg"
          aria-label="Quay lại hào trước"
          title="Quay lại hào trước"
          disabled={step === 0}
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
        {confirmed ? (
          <Button type="button" size="lg" onClick={step === 5 ? onFinish : onNext}>
            {step === 5 ? 'Tính quẻ' : 'Tiếp theo'}
          </Button>
        ) : (
          <Button
            type="button"
            size="lg"
            aria-label="Xác nhận hào"
            disabled={!previous}
            onClick={() => {
              if (!previous) return;
              const all = [...(draft.manualTosses ?? [])];
              all[step] = previous;
              const lines = [...draft.lines];
              lines[step] = previous.line;
              const confirmations = [...(draft.manualConfirmed ?? [])];
              confirmations[step] = true;
              setDraft({ ...draft, manualTosses: all, manualConfirmed: confirmations, lines });
            }}
          >
            <span className="sm:hidden">Xác nhận</span>
            <span className="hidden sm:inline">Xác nhận hào</span>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
