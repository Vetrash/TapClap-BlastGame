class Figure {
  constructor(corY, corX, img, type, imgs, canvasLayers) {
    this.corY = corY;
    this.corX = corX;
    this.img = img;
    this.specImg = imgs.dataSupBlock;
    this.type = type;
    this.puffImgs = imgs.dataPuff;
    this.canvasLayers = canvasLayers;
    this.imgs = imgs;
    this.target = imgs.target;
    this.widthClear = 200;
    this.heightClear = 200;
    this.targetOffsetY = 15;
  }

  puffAnimate() {
    const canvas = this.canvasLayers.effectLayer;
    const ctx = canvas.getContext('2d');
    let numFrame = 0;
    let start = 0;
    const frameDelay = 60;
    const frizX = this.corX;
    const frizY = this.corY;
    const loop = (timestamp) => {
      if (start === 0) { start = timestamp; }
      const stepTime = timestamp - start;
      if (stepTime >= frameDelay * numFrame) {
        ctx.clearRect(frizX, frizY, this.img.width, this.img.height);
        if (numFrame < this.puffImgs.length) {
          ctx.drawImage(this.puffImgs[numFrame].offCanvas, frizX, frizY);
          numFrame += 1;
        }
      }
      if (numFrame >= this.puffImgs.length) {
        ctx.clearRect(frizX, frizY, this.widthClear, this.heightClear);
        window.cancelAnimationFrame(loop);
      } else {
        requestAnimationFrame(loop);
      }
    };
    requestAnimationFrame(loop);
  }

  changeType(img, type) {
    this.img = img;
    this.type = type;
  }

  changeTypetoSpecial() {
    const indexType = Math.floor(Math.random() * this.specImg.length);
    this.img = this.specImg[indexType].offCanvas;
    this.type = this.specImg[indexType].name;
  }

  renderTarget() {
    const canvas = this.canvasLayers.effectLayer;
    const ctx = canvas.getContext('2d');
    const target = this.target[0].offCanvas;
    ctx.drawImage(target, this.corX, this.corY + this.targetOffsetY);
  }

  clearTarget() {
    const canvas = this.canvasLayers.effectLayer;
    const ctx = canvas.getContext('2d');
    const target = this.target[0].offCanvas;
    ctx.clearRect(this.corX, this.corY + this.targetOffsetY, target.width, target.height);
  }
}

export default Figure;
