import type { CoinSet } from '@liuyao/core';
import type { Group, PerspectiveCamera } from 'three';

export const TOSS_DURATION = 1620;
const destinations = [
  [-1.18, 0.62],
  [-0.62, -0.94],
  [0.57, 0.72],
  [1.12, -0.7],
] as const;
const angles = [-0.38, 0.56, -0.16, 0.8];
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => {
  const t = clamp(n);
  return t * t * (3 - 2 * t);
};

export function poseCoins(
  coins: Group[],
  faces: CoinSet | undefined,
  elapsed: number,
  casting: boolean,
) {
  coins.forEach((coin, index) => {
    const [x, z] = destinations[index]!;
    const targetX = coins.length === 3 ? x + 0.3 : x;
    const face = faces?.[index] ?? index % 2;
    const finalX = face ? 0 : Math.PI;
    const yaw = angles[index]!;
    if (!casting) {
      coin.position.set(targetX, 0.09, z);
      coin.rotation.set(finalX, yaw, 0);
      return;
    }
    const time = elapsed - index * 38;
    const gather = smooth(time / 150);
    const flight = clamp((time - 150) / (710 + index * 24));
    const spread = smooth(flight);
    const startX = targetX * (1 - gather * 0.65);
    const startZ = z * (1 - gather * 0.55);
    coin.position.set(startX + (targetX - startX) * spread, 0.09, startZ + (z - startZ) * spread);
    const height = 1.85 + index * 0.14;
    coin.position.y += 4 * height * flight * (1 - flight);
    // Whole turns end on the predetermined face; no simulated physics chooses an outcome.
    const spin = smooth(flight);
    coin.rotation.set(
      (index % 2 ? 0 : Math.PI) * (1 - spin) + (finalX + Math.PI * 4) * spin,
      yaw + Math.sin(flight * Math.PI) * (index % 2 ? 1.2 : -0.9),
      Math.sin(flight * Math.PI) * 0.65,
    );
    if (flight >= 1) {
      const settle = clamp((time - 860 - index * 24) / 220);
      const wobble = Math.sin(settle * Math.PI * 3) * (1 - settle);
      coin.position.y += Math.sin(settle * Math.PI) * (1 - settle) * 0.12;
      coin.rotation.z = wobble * 0.18;
    }
  });
}

export function poseCamera(camera: PerspectiveCamera, elapsed: number, revealed: boolean) {
  const focus = revealed ? 1 : smooth((elapsed - 1110) / 510);
  camera.position.set(0.25 * (1 - focus), 5.7 + focus * 2.5, 6.7 - focus * 4.1);
  camera.lookAt(0, 0.45 * (1 - focus), 0);
}
