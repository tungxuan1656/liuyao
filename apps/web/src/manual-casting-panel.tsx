import { mapCoinsToLine, type CastingMethod, type CoinTossResult } from '@liuyao/core';
import { CoinFace, coinNames } from './automatic-casting-panel';
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
    <section className="reading-card manual-coin-card" aria-label={`Đồng xu cho hào ${step + 1}`}>
      <div className="casting-method-switch" role="group" aria-label="Số lượng đồng xu">
        {(['three-coin', 'four-coin'] as const).map((method: CastingMethod) => (
          <button
            key={method}
            type="button"
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
          </button>
        ))}
      </div>
      <p>Chạm từng đồng xu để khớp với lần gieo bên ngoài.</p>
      <div className="manual-coins">
        {coins.map((coin, index) => (
          <button
            type="button"
            className="manual-coin-control"
            key={index}
            aria-pressed={Boolean(coin)}
            disabled={confirmed}
            aria-label={`${count === 4 ? coinNames[index] + ', ' : `Đồng xu ${index + 1}, `}${coin ? 'mặt trời' : 'mặt trăng'}. Chạm để lật.`}
            onClick={() => flip(index)}
          >
            <CoinFace value={coin} name={count === 4 ? coinNames[index] : undefined} />
            <span>{count === 4 ? coinNames[index] : `Đồng ${index + 1}`}</span>
          </button>
        ))}
      </div>
      <p className="manual-outcome" aria-live="polite">
        {line === undefined ? (
          'Chọn mặt từng đồng xu'
        ) : (
          <>
            Kết quả hào <strong>{line}</strong>
            {confirmed ? '' : ' · chưa xác nhận'}
          </>
        )}
      </p>
      <button
        type="button"
        disabled={confirmed}
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
      </button>
      {step === 5 && draft.lines[5] === undefined && (
        <p role="status">Hãy nhập hào sáu trước khi tính quẻ. Các hào đã nhập vẫn được giữ lại.</p>
      )}
    </section>
  );
}
