import { mapCoinsToLine, type CastingMethod, type CoinTossResult } from '@liuyao/core';
import { CoinFace } from './casting/coin-face';
import { coinNames } from './casting/coin-names';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { describeLineValue, getLinePresentation } from './line-value-presentation';
import type { useReadingSession } from './reading-session';

type Draft = NonNullable<ReturnType<typeof useReadingSession>['draft']>;

type Props = {
  draft: Draft;
  step: number;
  setDraft: (draft: Draft | null) => void;
};

export function ManualCastingPanel({ draft, step, setDraft }: Props) {
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
    <Card className="manual-coin-card" aria-label={`Đồng xu cho hào ${step + 1}`}>
      <div className="casting-method-switch" role="group" aria-label="Số lượng đồng xu">
        {(['three-coin', 'four-coin'] as const).map((method: CastingMethod) => (
          <Button
            key={method}
            type="button"
            size="sm"
            variant={draft.coinMethod === method ? 'secondary' : 'ghost'}
            className="casting-method-button"
            aria-pressed={draft.coinMethod === method}
            disabled={(draft.manualTosses?.some(Boolean) ?? false) || draft.lines.length > 0}
            onClick={() =>
              setDraft({
                ...draft,
                coinMethod: method,
                manualTosses: [],
                manualConfirmed: [],
                manualPreviewLines: [],
                lines: [],
              })
            }
          >
            {method === 'three-coin' ? 'Ba đồng xu' : 'Bốn đồng xu'}
          </Button>
        ))}
      </div>
      <p>Chạm từng đồng xu để khớp với lần gieo bên ngoài.</p>
      <div className="manual-coins">
        {coins.map((coin, index) => (
          <Button
            type="button"
            variant="ghost"
            className="manual-coin-control"
            key={index}
            aria-pressed={Boolean(coin)}
            disabled={confirmed}
            aria-label={`${count === 4 ? coinNames[index] + ', ' : `Đồng xu ${index + 1}, `}${coin ? 'mặt trời' : 'mặt trăng'}. Chạm để lật.`}
            onClick={() => flip(index)}
          >
            <CoinFace value={coin} name={count === 4 ? coinNames[index] : undefined} />
            <span>{count === 4 ? coinNames[index] : `Đồng ${index + 1}`}</span>
          </Button>
        ))}
      </div>
      <div className="manual-outcome" aria-live="polite">
        {line === undefined || !presentation ? (
          <span>Chọn mặt từng đồng xu</span>
        ) : (
          <>
            <strong data-line-value={line}>{presentation.name}</strong>
            <span>
              {describeLineValue(line)}
              {confirmed ? ' · đã xác nhận' : ' · chưa xác nhận'}
            </span>
          </>
        )}
      </div>
      <Button
        type="button"
        disabled={confirmed || !previous}
        onClick={() => {
          if (!previous) return;
          const all = [...(draft.manualTosses ?? [])];
          all[step] = previous;
          const lines = [...draft.lines];
          lines[step] = previous.line;
          const confirmedLines = [...(draft.manualConfirmed ?? [])];
          confirmedLines[step] = true;
          setDraft({ ...draft, manualTosses: all, manualConfirmed: confirmedLines, lines });
        }}
      >
        {confirmed ? 'Đã xác nhận hào' : 'Xác nhận hào'}
      </Button>
      {step === 5 && draft.lines[5] === undefined && (
        <p role="status">Hãy nhập hào sáu trước khi tính quẻ. Các hào đã nhập vẫn được giữ lại.</p>
      )}
    </Card>
  );
}
