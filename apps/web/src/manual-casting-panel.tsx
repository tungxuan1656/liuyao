import { mapCoinsToLine, type CastingMethod, type CoinTossResult } from '@liuyao/core';
import { CoinFace } from './casting/coin-face';
import { CastingHexagram } from './casting/casting-hexagram';
import { coinIdentities } from './casting/coin-identities';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
import { describeLineValue, getLinePresentation } from './line-value-presentation';
import { YaoSymbol } from './components/yao-symbol';
import type { useReadingSession } from './reading-session';
import './casting/casting-workspace.css';

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
    <Card
      className="min-w-0 overflow-hidden w-full border-0 shadow-none bg-white text-neutral-900"
      aria-label={`Đồng xu cho hào ${step + 1}`}
    >
      <CardHeader className="flex flex-col sm:flex-row sm:items-stretch justify-between gap-4 p-0 pb-4">
        <div>
          <CardTitle className="text-lg font-medium">Hào {step + 1}</CardTitle>
          <p className="mt-1 text-sm text-neutral-500">Chạm từng đồng xu để nhập mặt đã gieo.</p>
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
          className="flex flex-wrap w-full sm:w-auto"
        >
          <ToggleGroupItem
            value="three-coin"
            className="flex-1 min-h-[44px] rounded-none data-[state=on]:bg-neutral-900 data-[state=on]:text-white"
          >
            Ba đồng xu
          </ToggleGroupItem>
          <ToggleGroupItem
            value="four-coin"
            className="flex-1 min-h-[44px] rounded-none data-[state=on]:bg-neutral-900 data-[state=on]:text-white"
          >
            Bốn đồng xu
          </ToggleGroupItem>
        </ToggleGroup>
      </CardHeader>
      <CardContent className="grid gap-5 p-0">
        <div className="grid grid-cols-1 md:grid-cols-[0.72fr_1.28fr] items-stretch gap-5">
          <div className="min-w-0 p-4 border-0 bg-neutral-50 order-first md:order-none">
            <CastingHexagram
              lines={Array.from({ length: 6 }, (_, index) =>
                draft.manualConfirmed?.[index] ? draft.manualTosses?.[index]?.line : undefined,
              )}
              step={step}
            />
          </div>
          <div className="grid content-start gap-4 min-w-0">
            <div
              className={`coin-arrangement grid place-items-center gap-4 py-4 ${count === 3 ? 'coin-arrangement--three' : 'coin-arrangement--four'}`}
            >
              {coins.map((coin, index) => (
                <Button
                  type="button"
                  variant="ghost"
                  className="grid justify-items-center content-start gap-2 min-w-[44px] min-h-[44px] p-2 hover:bg-transparent h-auto"
                  key={index}
                  aria-pressed={Boolean(coin)}
                  disabled={confirmed}
                  aria-label={`${count === 4 ? `${coinIdentities[index]?.label}, ` : `Đồng xu ${index + 1}, `}${coin ? 'mặt trời' : 'mặt trăng'}. Chạm để lật.`}
                  onClick={() => flip(index)}
                >
                  <div
                    className={`w-16 transition-transform duration-300 ${confirmed ? '' : 'active:scale-95'}`}
                  >
                    <CoinFace value={coin} identityIndex={count === 4 ? index : undefined} />
                  </div>
                  <span className="text-sm text-neutral-600">
                    {count === 4 ? coinIdentities[index]?.label : `Đồng ${index + 1}`}
                  </span>
                </Button>
              ))}
            </div>
            <div
              className="grid min-h-[96px] justify-items-center content-center gap-1.5 text-center"
              aria-live="polite"
            >
              {line === undefined || !presentation ? (
                <span className="text-neutral-500">Chọn mặt từng đồng xu</span>
              ) : (
                <>
                  <YaoSymbol
                    polarity={line === 7 || line === 9 ? 'yang' : 'yin'}
                    changing={line === 6 || line === 9}
                  />
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
            <Button
              type="button"
              className="w-full min-h-[46px] rounded-none bg-neutral-900 text-white hover:bg-neutral-800 border-0 disabled:bg-neutral-200 disabled:text-neutral-500"
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
              <p className="text-sm text-neutral-500 text-center" role="status">
                Hãy nhập hào sáu trước khi tính quẻ. Các hào đã nhập vẫn được giữ lại.
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
