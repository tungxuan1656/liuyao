import type { CSSProperties } from 'react';
import { coinIdentities } from './coin-identities';

export function CoinLegend() {
  return (
    <ul className="coin-legend" aria-label="Bốn đồng xu Địa Thủy Hỏa Phong">
      {coinIdentities.map(coin => (
        <li
          key={coin.name}
          style={{ '--coin-color': coin.color, '--coin-ink': coin.ink } as CSSProperties}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d={coin.path} />
          </svg>
          <span>{coin.label}</span>
        </li>
      ))}
    </ul>
  );
}
