import { CastingService, type CoinBitSource } from '@liuyao/core';

/** Browser-only entropy boundary. Never substitute a non-cryptographic source. */
export function createBrowserCoinSource(): CoinBitSource {
  if (!globalThis.crypto?.getRandomValues) {
    throw new Error('Secure random generation is unavailable in this browser.');
  }

  return () => {
    const bytes = new Uint8Array(1);
    globalThis.crypto.getRandomValues(bytes);
    return (bytes[0]! & 1) as 0 | 1;
  };
}

export function createBrowserCastingService(): CastingService {
  return new CastingService(createBrowserCoinSource());
}
