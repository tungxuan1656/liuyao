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
  const fallback = useRef<HTMLDivElement>(null);

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
    if (state === 'ready') scene.current?.update(count, toss, busy, onComplete);
    if (!busy || state !== 'fallback') return;
    // Explicit casting always animates, including without WebGL or with reduced motion.
    const animations = Array.from(fallback.current!.children).map((coin, index) =>
      coin.animate(
        [
          { translate: '0 0', rotate: '0deg' },
          { translate: '0 -65px', rotate: `${index % 2 ? -160 : 160}deg`, offset: 0.4 },
          { translate: '0 0', rotate: `${index % 2 ? -360 : 360}deg`, offset: 0.82 },
          { translate: '0 -4px', rotate: `${index % 2 ? -365 : 365}deg`, offset: 0.9 },
          { translate: '0 0', rotate: `${index % 2 ? -360 : 360}deg` },
        ],
        { duration: 1450, delay: index * 45, easing: 'ease-in-out' },
      ),
    );
    void Promise.all(animations.map(animation => animation.finished))
      .then(onComplete)
      .catch(() => {});
    return () => animations.forEach(animation => animation.cancel());
  }, [count, toss, busy, state, onComplete]);

  return (
    <div
      className={`casting-stage${busy ? ' is-casting' : ''}`}
      data-renderer={state}
      aria-hidden="true"
    >
      <div ref={host} className="coin-canvas" hidden={state === 'fallback'} />
      {state !== 'ready' && (
        <div ref={fallback} className="coin-static-scene">
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
