import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  maxWidthLoadLine, heightLoadLine, gapLoadLineX, gapLoadLineY,
} = getSettings().loadBar;

export const updateProgress = (dt) => {
  const { score } = getGState();
  const deltaScore = score.value - score.forProgress;
  if (deltaScore > 30) {
    score.forProgress += (1000 * dt);
  } else {
    score.forProgress += deltaScore;
  }
};

const drawLoadLine = (progress, startDrawX, ctx) => {
  const x1 = startDrawX + gapLoadLineX;
  const y1 = gapLoadLineY;
  let radius = heightLoadLine / 2;
  const x2 = progress * maxWidthLoadLine >= 2 * radius
    ? x1 + (progress * maxWidthLoadLine)
    : x1 + 2 * radius;
  const y2 = y1 + heightLoadLine;
  const gr = ctx.createLinearGradient(x1, y2, x1, y1);
  gr.addColorStop(0.0, '#60ff00');
  gr.addColorStop(0.3, '#1d9b00');
  gr.addColorStop(0.8, '#a2ff00');
  gr.addColorStop(1.0, '#ecffcc');
  ctx.fillStyle = gr;
  radius = Math.min(radius, (x2 - x1) / 2, (y2 - y1) / 2);
  ctx.clearRect(x1, y1, maxWidthLoadLine, y2 - y1);
  ctx.beginPath();
  ctx.moveTo(x1 + radius, y1);
  ctx.lineTo(x2 - radius, y1);
  ctx.arcTo(x2, y1, x2, y1 + radius, radius);
  ctx.lineTo(x2, y2 - radius);
  ctx.arcTo(x2, y2, x2 - radius, y2, radius);
  ctx.lineTo(x1 + radius, y2);
  ctx.arcTo(x1, y2, x1, y2 - radius, radius);
  ctx.lineTo(x1, y1 + radius);
  ctx.arcTo(x1, y1, x1 + radius, y1, radius);
  ctx.fill();
};
export default drawLoadLine;
