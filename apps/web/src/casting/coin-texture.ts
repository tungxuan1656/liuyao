import { CanvasTexture, SRGBColorSpace } from 'three';

/** Original, locally generated engravings: no remote assets or runtime font dependency. */
export function createCoinTexture(heads: boolean, identity?: number) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  const gold = ctx.createRadialGradient(170, 130, 20, 256, 256, 350);
  gold.addColorStop(0, '#e3c487');
  gold.addColorStop(0.5, '#b99554');
  gold.addColorStop(1, '#806039');
  ctx.fillStyle = gold;
  ctx.fillRect(0, 0, 512, 512);
  for (let i = 0; i < 1800; i++) {
    const x = (i * 137.508) % 512;
    const y = (i * 79.317) % 512;
    ctx.fillStyle = i % 2 ? '#ffffff0b' : '#3727140d';
    ctx.fillRect(x, y, 1.5, 1.5);
  }
  ctx.strokeStyle = '#6b4a27';
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
  ctx.lineWidth = 9;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.shadowColor = '#fce6b0';
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 1;
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
  if (identity !== undefined) {
    ctx.save();
    ctx.translate(256, 411);
    ctx.lineWidth = 5;
    ctx.beginPath();
    if (identity === 0) {
      ctx.moveTo(0, -19);
      ctx.lineTo(19, 0);
      ctx.lineTo(0, 19);
      ctx.lineTo(-19, 0);
      ctx.closePath();
    } else if (identity === 2) {
      ctx.moveTo(0, -20);
      ctx.lineTo(21, 15);
      ctx.lineTo(-21, 15);
      ctx.closePath();
    } else {
      for (const y of [-9, 9]) {
        ctx.moveTo(-24, y);
        ctx.bezierCurveTo(-10, y - 15, 10, y + 15, 24, y);
      }
      if (identity === 3) {
        ctx.moveTo(-15, 24);
        ctx.lineTo(15, 24);
      }
    }
    ctx.stroke();
    ctx.restore();
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}
