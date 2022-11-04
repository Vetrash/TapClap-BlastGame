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
    this.targetOffsetY = 15;
  }

  updateFigure(corY, img, type) {
    this.corY = corY;
    this.changeType(img, type);
  }

  puffAnimate() {
    const canvas = this.canvasLayers.effectLayer;
    const ctx = canvas.getContext('2d');
    let numFrame = 0;
    let lastTime = Date.now();
    const frameDelay = 60;
    const offset = 20;
    const frizX = this.corX;
    const frizY = this.corY + offset;
    const loop = () => {
      const now = Date.now();
      const stepTime = (now - lastTime);
      if (stepTime >= frameDelay) {
        ctx.clearRect(frizX, frizY, this.img.width, this.img.height - offset);
        ctx.drawImage(this.puffImgs[numFrame].offCanvas, frizX, frizY);
        numFrame += 1;
        lastTime = now;
      }
      if (numFrame >= this.puffImgs.length) {
        ctx.clearRect(frizX, frizY, this.img.width, this.img.height - offset);
        cancelAnimationFrame(loop);
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
