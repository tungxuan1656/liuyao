import { CanvasTexture, SRGBColorSpace } from 'three';
import { coinIdentities } from './coin-identities';

/** Original, locally generated engravings: no remote assets or runtime font dependency. */
export function createCoinTexture(heads: boolean, identity?: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const element = identity === undefined ? undefined : coinIdentities[identity];
  const gold = ctx.createRadialGradient(170, 130, 20, 256, 256, 350);
  gold.addColorStop(0, element?.light ?? '#e3c487');
  gold.addColorStop(0.5, element?.color ?? '#b99554');
  gold.addColorStop(1, element?.dark ?? '#806039');
  ctx.fillStyle = gold;
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 1800; i++) {
    const x = (i * 137.508) % 512;
    const y = (i * 79.317) % 512;
    ctx.fillStyle = i % 2 ? '#ffffff0b' : '#3727140d';
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  ctx.strokeStyle = element?.ink ?? '#49300d';
  ctx.lineWidth = 3;
  for (const radius of [219, 205]) {
    ctx.beginPath();
    ctx.arc(256, 256, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  for (let i = 0; i < 64; i++) {
    const angle = (i * Math.PI) / 32;
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(angle) * 228, 256 + Math.sin(angle) * 228);
    ctx.lineTo(256 + Math.cos(angle) * 237, 256 + Math.sin(angle) * 237);
    ctx.stroke();
  }
  ctx.lineWidth = 13;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = '#00000030';
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 1;
  ctx.save();
  if (element) {
    // Large elemental engraving at the top; a separate sun/moon medallion below.
    ctx.translate(256, 330);
    ctx.scale(0.64, 0.64);
    ctx.translate(-256, -250);
  }
  ctx.beginPath();
  if (heads) {
    ctx.arc(256, 250, 57, 0, Math.PI * 2);
    ctx.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i * Math.PI) / 6;
      ctx.beginPath();
      ctx.moveTo(256 + Math.cos(a) * 83, 250 + Math.sin(a) * 83);
      ctx.lineTo(256 + Math.cos(a) * 108, 250 + Math.sin(a) * 108);
      ctx.stroke();
    }
  } else {
    ctx.moveTo(285, 151);
    ctx.bezierCurveTo(160, 123, 127, 300, 242, 342);
    ctx.bezierCurveTo(304, 365, 353, 326, 362, 286);
    ctx.bezierCurveTo(247, 334, 207, 204, 285, 151);
    ctx.stroke();
  }
  ctx.restore();
  if (element) {
    ctx.save();
    ctx.translate(160, 87);
    ctx.scale(8, 8);
    ctx.lineWidth = 1.9;
    ctx.stroke(new Path2D(element.path));
    ctx.restore();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
