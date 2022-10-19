export const drawSquareFill = (setting) => {
  const { x1, x2, y1, y2, radius, color, canvas } = setting;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = color;
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

export const drawSquareStroke = (setting) => {
  const { x1, x2, y1, y2, radius, color, canvas, lWidth } = setting;
  const corX1 = x1 + lWidth / 2;
  const corX2 = x2 - lWidth / 2;
  const corY1 = y1 + lWidth / 2;
  const corY2 = y2 - lWidth / 2;
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(corX1 + radius, corY1);
  ctx.lineTo(corX2 - radius, corY1);
  ctx.arcTo(corX2, corY1, corX2, corY1 + radius, radius);
  ctx.lineTo(corX2, corY2 - radius);
  ctx.arcTo(corX2, corY2, corX2 - radius, corY2, radius);
  ctx.lineTo(corX1 + radius, corY2);
  ctx.arcTo(corX1, corY2, corX1, corY2 - radius, radius);
  ctx.lineTo(corX1, corY1 + radius);
  ctx.arcTo(corX1, corY1, corX1 + radius, corY1, radius);
  ctx.lineWidth = lWidth;
  ctx.stroke();
};

export const drawSquareClip = (setting) => {
  const { x1, x2, y1, y2, radius, canvas } = setting;
  const ctx = canvas.getContext('2d');
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
  ctx.clip();
};
