import type { CSSProperties } from 'react';
import { coinIdentities } from './coin-identities';

export function CoinFace({ value, name }: { value: number; name?: string }) {
  const identity = coinIdentities.find(coin => coin.name === name);
  return (
    <span
      className={`coin-face ${value ? 'is-heads' : 'is-tails'}${identity ? ' has-identity' : ''}`}
      style={
        identity
          ? ({
              '--coin-accent': identity.dark,
              '--coin-light': identity.light,
              '--coin-color': identity.color,
              '--coin-ink': identity.ink,
            } as CSSProperties)
          : undefined
      }
    >
      {identity && (
        <span className="coin-identity-label" aria-hidden="true">
          {identity.label}
        </span>
      )}
      <span className="coin-glyph" aria-hidden="true">
        {value ? '☀' : '☾'}
      </span>
      <span className="sr-only">
        {name ? `${name}, ` : ''}
        {value ? 'mặt trời' : 'mặt trăng'}
      </span>
    </span>
  );
}
