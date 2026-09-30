import type { CSSProperties } from 'react';
import { coinIdentities } from './coin-identities';

type CoinFaceProps = { value: number; name?: string; identityIndex?: number };

export function CoinFace({ value, name, identityIndex }: CoinFaceProps) {
  const isHeads = Boolean(value);
  const identity =
    identityIndex === undefined ? undefined : coinIdentities[identityIndex % coinIdentities.length];
  return (
    <span
      className={`coin-face flex flex-col items-center justify-center w-16 h-16 rounded-full border-2 transition-all select-none ${identity ? 'coin-face--identified' : ''} ${isHeads ? 'coin-face--heads' : 'coin-face--tails'}`}
      style={
        identity
          ? ({
              '--coin-color': identity.color,
              '--coin-light': identity.light,
              '--coin-dark': identity.dark,
              '--coin-ink': identity.ink,
            } as CSSProperties)
          : undefined
      }
    >
      {name && (
        <span className="text-[9px] leading-none mb-0.5 font-medium opacity-70">{name}</span>
      )}
      <span className="text-xl leading-none" aria-hidden="true">
        {isHeads ? '☀' : '☾'}
      </span>
      <span className="sr-only">
        {name ? `${name}, ` : ''}
        {isHeads ? 'mặt trời' : 'mặt trăng'}
      </span>
    </span>
  );
}
