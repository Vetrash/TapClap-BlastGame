class ProgressLine {
  constructor(posX, posY, coastLevel, layer, width, height) {
    this.scoreProgress = 0;
    this.coastLevel = coastLevel;
    this.maxWidthLoadLine = width;
    this.heightLoadLine = height;
    this.layer = layer;
    this.posX = posX;
    this.posY = posY;
    this.isForceStop = false;
    window.addEventListener('replay', () => {
      this.isForceStop = true;
      this.scoreProgress = 0;
      this.clear();
    });
  }

  update(score) {
    let lastTime = Date.now();
    const speedAnim = 600;
    const loop = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;
      const delta = score - this.scoreProgress;
      lastTime = now;
      this.scoreProgress = this.scoreProgress + (speedAnim * dt) < score
        ? this.scoreProgress + speedAnim * dt
        : this.scoreProgress + delta;
      this.render();
      if (delta > 0 || this.isForceStop) {
        requestAnimationFrame(loop);
      } else {
        window.cancelAnimationFrame(loop);
      }
    };
    requestAnimationFrame(loop);
  }

  clear() {
    const ctx = this.layer.getContext('2d');
    ctx.clearRect(this.posX, this.posY, this.maxWidthLoadLine, this.heightLoadLine);
    this.isForceStop = false;
  }

  render() {
    const progress = (this.scoreProgress / this.coastLevel) > 1
      ? 1 : (this.scoreProgress / this.coastLevel);
    const x1 = this.posX;
    const y1 = this.posY;
    let radius = this.heightLoadLine / 2;
    const x2 = x1 + 2 * radius + (progress * (this.maxWidthLoadLine - (2 * radius)));
    const y2 = y1 + this.heightLoadLine;
    const ctx = this.layer.getContext('2d');
    const gr = ctx.createLinearGradient(x1, y2, x1, y1);
    gr.addColorStop(0.0, '#60ff00');
    gr.addColorStop(0.3, '#1d9b00');
    gr.addColorStop(0.8, '#a2ff00');
    gr.addColorStop(1.0, '#ecffcc');
    ctx.fillStyle = gr;
    radius = Math.min(radius, (x2 - x1) / 2, (y2 - y1) / 2);
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
  }
}
export default ProgressLine;
