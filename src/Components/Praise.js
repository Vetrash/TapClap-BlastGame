class Praise {
  constructor(canvasLayers, priseImg) {
    this.praiseLayer = canvasLayers.praiseLayer;
    this.ctx = canvasLayers.praiseLayer.getContext('2d');
    this.corLastPraise = { x: 0, y: 0 };
    this.timerId = 0;
    this.priseImg = priseImg;
    this.priseWidth = 600;
    this.priseHeight = 600;
    window.addEventListener('chainDelet', (e) => {
      if (e.detail.value >= 3) {
        this.renderPraise(e.detail.value);
      }
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
    const comboFilt = combo > 7 ? 7 : combo;
    const interpritator = {
      3: 'great',
      4: 'cool',
      5: 'wellDone',
      6: 'ohYes',
      7: 'awesome',
    };
    const nameImg = interpritator[comboFilt];
    this.ctx.drawImage(this.priseImg[nameImg].offCanvas, corX, corY);
    this.timerId = setTimeout(() => this.clear(), 1000);
  }
}
export default Praise;
