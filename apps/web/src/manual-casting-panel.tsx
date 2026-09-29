import { mapCoinsToLine, type CastingMethod, type CoinTossResult } from '@liuyao/core';
import { CoinFace } from './casting/coin-face';
import { CastingHexagram } from './casting/casting-hexagram';
import { coinNames } from './casting/coin-names';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { describeLineValue, getLinePresentation } from './line-value-presentation';
import { YaoSymbol } from './components/yao-symbol';
import type { useReadingSession } from './reading-session';
import './casting/input-workspace.css';

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
    <Card className="manual-coin-card input-workspace" aria-label={`Đồng xu cho hào ${step + 1}`}>
      <CardHeader className="input-workspace-header">
        <div>
          <CardTitle>Hào {step + 1}</CardTitle>
          <p>Chạm từng đồng xu để nhập mặt đã gieo.</p>
        </div>
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
          className="input-method-switch"
        >
          <ToggleGroupItem value="three-coin">Ba đồng xu</ToggleGroupItem>
          <ToggleGroupItem value="four-coin">Bốn đồng xu</ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="input-workspace-content">
        <div className="manual-workspace-grid">
          <CastingHexagram
            lines={Array.from({ length: 6 }, (_, index) =>
              draft.manualConfirmed?.[index] ? draft.manualTosses?.[index]?.line : undefined,
            )}
            step={step}
          />
          <div className="manual-coin-workspace">
            <div className={`manual-coins manual-coins-${count}`}>
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
                  <span>
                    {count === 4 ? ['Địa', 'Thủy', 'Hỏa', 'Phong'][index] : `Đồng ${index + 1}`}
                  </span>
                </Button>
              ))}
            </div>
            <div className="manual-outcome" aria-live="polite">
              {line === undefined || !presentation ? (
                <span>Chọn mặt từng đồng xu</span>
              ) : (
                <>
                  <YaoSymbol
                    polarity={line === 7 || line === 9 ? 'yang' : 'yin'}
                    changing={line === 6 || line === 9}
                  />
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
              <p role="status">
                Hãy nhập hào sáu trước khi tính quẻ. Các hào đã nhập vẫn được giữ lại.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
