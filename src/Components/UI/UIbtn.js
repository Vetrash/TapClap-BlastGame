import TextBox from './TextBox.js';

class UIbtn {
  constructor(posX, posY, btnImg, text, layer, event) {
    this.layer = layer;
    this.btnImg = btnImg;
    this.posX = posX;
    this.posY = posY;
    this.fontSize = {
      norm: 83.4,
      big: 140,
      large: 231,
    };
    this.isVisible = false;
    this.event = event;
    this.TextBox = new TextBox(text, this.posX + this.btnImg.width / 2,
      this.posY + this.btnImg.height / 2, this.layer, this.fontSize.norm);

    window.addEventListener('click', (e) => {
      if (this.isVisible) {
        const corCanvas = window.toCanvasCor(layer, e.clientX, e.clientY);
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
    this.TextBox.render();
    this.isVisible = true;
  }

  clickEvent() {
    this.event();
    this.isVisible = false;
  }
}

export default UIbtn;
