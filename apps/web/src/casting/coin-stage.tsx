import type { CoinTossResult } from '@liuyao/core';
import { useEffect, useRef, useState } from 'react';
import { CoinFace } from './coin-face';
import { coinIdentities } from './coin-identities';

type Props = {
  count: number;
  toss?: CoinTossResult;
  busy: boolean;
  onComplete: () => void;
};

export function CoinStage({ count, toss, busy, onComplete }: Props) {
  const [revealed, setRevealed] = useState<number[] | null>(null);
  const [flipPhase, setFlipPhase] = useState(0);
  const generation = useRef(0);
  const callback = useRef(onComplete);
  callback.current = onComplete;

  useEffect(() => {
    if (!busy) {
      generation.current += 1;
      setRevealed(toss ? [...toss.coins] : null);
      return;
    }
    const run = ++generation.current;
    let frame = 0;
    const started = performance.now();
    const duration = 1200;
    const phaseDuration = 300;
    setFlipPhase(0);
    const update = (now: number) => {
      if (generation.current !== run) return;
      const elapsed = Math.min(duration, now - started);
      if (elapsed >= duration) {
        setRevealed(toss ? [...toss.coins] : null);
        callback.current();
        return;
      }
      setFlipPhase(Math.floor(elapsed / phaseDuration));
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => {
      generation.current += 1;
      cancelAnimationFrame(frame);
    };
  }, [busy, toss]);

  const faces = busy
    ? Array.from({ length: count }, (_, index) => (index + flipPhase) % 2)
    : (revealed ?? toss?.coins ?? []);

  return (
    <section
      className="flex items-center justify-center w-full h-full"
      aria-label={busy ? 'Đang gieo đồng xu' : 'Kết quả đồng xu'}
    >
      <div
        className={`coin-arrangement ${count === 3 ? 'coin-arrangement--three' : 'coin-arrangement--four'} ${busy ? 'opacity-70' : 'opacity-100'} transition-opacity`}
      >
        {Array.from({ length: count }, (_, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: coin slots are positional; the arrangement never reorders.
          <div key={index} className="coin-position flex flex-col items-center gap-1.5">
            <CoinFace value={faces[index] ?? 0} identityIndex={count === 4 ? index : undefined} />
            {count === 4 && (
              <span className="text-xs text-muted-foreground">{coinIdentities[index]?.label}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
