import { useEffect, useRef, useState } from 'react';
import type { CoinTossResult } from '@liuyao/core';
import { CoinFace } from './coin-face';
import { coinNames } from './coin-names';
import type { createCoinScene } from './coin-scene';

type Props = {
  count: number;
  toss?: CoinTossResult;
  busy: boolean;
  onComplete: () => void;
};

export function CoinStage({ count, toss, busy, onComplete }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const scene = useRef<ReturnType<typeof createCoinScene> | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const [reduced, setReduced] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReduced(preference.matches);
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const element = host.current!;
    const lost = (event: Event) => {
      event.preventDefault();
      scene.current?.dispose();
      scene.current = null;
      setState('fallback');
    };
    element.addEventListener('webglcontextlost', lost, true);
    void import('./coin-scene')
      .then(({ createCoinScene }) => {
        if (cancelled) return;
        try {
          scene.current = createCoinScene(element);
          setState('ready');
        } catch {
          setState('fallback');
        }
      })
      .catch(() => {
        if (!cancelled) setState('fallback');
      });
    return () => {
      cancelled = true;
      element.removeEventListener('webglcontextlost', lost, true);
      scene.current?.dispose();
      scene.current = null;
    };
  }, []);

  useEffect(() => {
    if (state === 'ready') scene.current?.update(count, toss, busy && !reduced, onComplete);
    if (busy && (reduced || state === 'fallback')) onComplete();
  }, [count, toss, busy, reduced, state, onComplete]);

  return (
    <div
      className={`casting-stage${busy ? ' is-casting' : ''}`}
      data-renderer={state}
      aria-hidden="true"
    >
      <div ref={host} className="coin-canvas" hidden={state === 'fallback'} />
      {state !== 'ready' && (
        <div className="coin-static-scene">
          {Array.from({ length: count }, (_, index) => (
            <div className={`static-coin static-coin-${index}`} key={index}>
              <CoinFace
                value={busy ? index % 2 : (toss?.coins[index] ?? index % 2)}
                name={count === 4 ? coinNames[index] : undefined}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
