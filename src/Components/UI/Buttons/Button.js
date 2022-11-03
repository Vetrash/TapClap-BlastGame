class Button {
  constructor(posX, posY, btnImg, layer, event) {
    this.layer = layer;
    this.btnImg = btnImg;
    this.posX = posX;
    this.posY = posY;
    this.isActiv = false;
    this.event = event;
    this.isSwithOff = false;
    window.addEventListener('clickCanvas', (e) => {
      if (this.isActiv) {
        const corCanvas = e.detail.value;
        if (corCanvas.x > this.posX && corCanvas.x < this.posX + this.btnImg.width
            && corCanvas.y > this.posY && corCanvas.y < this.posY + this.btnImg.height) {
          this.clickEvent();
        }
      }
    });
  }

  render() {
    const ctx = this.layer.getContext('2d');
    ctx.drawImage(this.btnImg, this.posX, this.posY);
    this.isActiv = true;
  }

  clickEvent() {
    this.event();
    if (this.isSwithOff) { this.isActiv = false; }
  }

  offButton() {
    this.isActiv = false;
  }
}

export default Button;
