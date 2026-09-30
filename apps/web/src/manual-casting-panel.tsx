import { mapCoinsToLine, type CastingMethod, type CoinTossResult } from '@liuyao/core';
import { CoinFace } from './casting/coin-face';
import { CastingHexagram } from './casting/casting-hexagram';
import { coinIdentities } from './casting/coin-identities';
import { Button } from './components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { describeLineValue, getLinePresentation } from './line-value-presentation';
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
  const presentation = line === undefined ? null : getLinePresentation(line);

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
    <Card className="casting-workspace" aria-label="Gieo từng hào">
      <CardHeader className="casting-workspace-header">
        <ToggleGroup
          aria-label="Số lượng đồng xu"
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
          className="border border-border bg-background"
        >
          <ToggleGroupItem
            value="three-coin"
            className="min-h-11 rounded-none text-sm data-[state=on]:bg-foreground data-[state=on]:text-background"
          >
            Ba đồng xu
          </ToggleGroupItem>
          <ToggleGroupItem
            value="four-coin"
            className="min-h-11 rounded-none text-sm data-[state=on]:bg-foreground data-[state=on]:text-background"
          >
            Bốn đồng xu
          </ToggleGroupItem>
        </ToggleGroup>
        <span className="text-sm text-neutral-500 whitespace-nowrap">
          {draft.manualConfirmed?.filter(Boolean).length ?? 0} / 6 hào
        </span>
      </CardHeader>
      <CardContent className="casting-workspace-content">
        <div>
          <CastingHexagram
            lines={Array.from({ length: 6 }, (_, index) =>
              draft.manualConfirmed?.[index] ? draft.manualTosses?.[index]?.line : undefined,
            )}
            step={step}
          />
        </div>
        <section className="casting-coin-workspace-stage" aria-label="Sân khấu gieo đồng xu">
          <div className="casting-coin-stage">
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
                  <span className="text-sm text-neutral-600">
                    {count === 4 ? coinIdentities[index]?.label : `Đồng ${index + 1}`}
                  </span>
                </Button>
              ))}
            </div>
          </div>
          <div className="casting-result-region" aria-live="polite">
            {line === undefined || !presentation ? (
              <span className="text-neutral-500">Chọn mặt từng đồng xu</span>
            ) : (
              <>
                <strong data-line-value={line} className="font-medium">
                  {presentation.name}
                </strong>
                <span className="text-sm text-neutral-500">
                  {describeLineValue(line)}
                  {confirmed ? ' · đã xác nhận' : ' · chưa xác nhận'}
                </span>
              </>
            )}
          </div>
        </section>
      </CardContent>
      <CardFooter className="casting-workspace-footer casting-manual-footer">
        <Button
          type="button"
          variant="outline"
          className="casting-back-action"
          disabled={step === 0}
          onClick={onBack}
        >
          Quay lại
        </Button>
        {confirmed ? (
          <Button
            type="button"
            className="casting-primary-action"
            onClick={step === 5 ? onFinish : onNext}
          >
            {step === 5 ? 'Tính quẻ' : 'Tiếp theo'}
          </Button>
        ) : (
          <Button
            type="button"
            className="casting-primary-action"
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
            Xác nhận hào
          </Button>
        )}
        <Button type="button" variant="ghost" className="casting-reset-action" onClick={onReset}>
          Xóa các hào
        </Button>
      </CardFooter>
    </Card>
  );
}
