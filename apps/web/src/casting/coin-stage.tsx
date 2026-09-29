import { useEffect, useRef, useState } from 'react';
import type { CoinTossResult } from '@liuyao/core';
import { CoinFace } from './coin-face';
import { coinNames } from './coin-names';

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
    <div
      className={`casting-stage${busy ? ' is-casting' : ''}`}
      aria-label={busy ? 'Đang gieo đồng xu' : 'Kết quả đồng xu'}
    >
      <div className={`coin-grid coin-grid-${count}`}>
        {Array.from({ length: count }, (_, index) => (
          <div className={`stage-coin stage-coin-${index}`} key={index}>
            <CoinFace value={faces[index] ?? 0} name={count === 4 ? coinNames[index] : undefined} />
            {count === 4 && (
              <span className="stage-coin-label">{['Địa', 'Thủy', 'Hỏa', 'Phong'][index]}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
