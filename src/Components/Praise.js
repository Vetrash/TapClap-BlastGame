class Prise {
  constructor(canvasLayers, priseImg) {
    this.praiseLayer = canvasLayers.praiseLayer;
    this.ctx = canvasLayers.praiseLayer.getContext('2d');
    this.corLastPraise = { x: 0, y: 0 };
    this.timerId = 0;
    this.priseImg = priseImg;
    this.priseWidth = 600;
    this.priseHeight = 600;
    window.addEventListener('chainDelet', (e) => {
      this.renderPraise(e.detail.value);
    });
  }

  clear() {
    this.ctx.clearRect(this.corLastPraise.x, this.corLastPraise.y,
      this.priseWidth, this.priseHeight);
  }

  renderPraise(combo) {
    clearTimeout(this.timerId);
    this.clear();
    const corX = Math.floor(Math.random()
    * (this.praiseLayer.width - 2 * this.priseWidth)) + this.priseWidth;
    const corY = Math.floor(Math.random()
    * (this.praiseLayer.height - 2 * this.priseHeight)) + this.priseHeight;
    this.corLastPraise.x = corX;
    this.corLastPraise.y = corY;
    if (combo >= 3) {
      switch (combo) {
        case 3:
          this.ctx.drawImage(this.priseImg.great.offCanvas, corX, corY);
          break;
        case 4:
          this.ctx.drawImage(this.priseImg.cool.offCanvas, corX, corY);
          break;
        case 5:
          this.ctx.drawImage(this.priseImg.wellDone.offCanvas, corX, corY);
          break;
        case 6:
          this.ctx.drawImage(this.priseImg.ohYes.offCanvas, corX, corY);
          break;
        case 7:
          this.ctx.drawImage(this.priseImg.awesome.offCanvas, corX, corY);
          break;
        default:
          this.ctx.drawImage(this.priseImg.awesome.offCanvas, corX, corY);
          break;
      }
      this.timerId = setTimeout(() => this.clear(), 1000);
    }
  }
}
export default Prise;
