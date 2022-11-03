import TextBox from './TextBox.js';

class TextCounterBox extends TextBox {
  constructor(startvalue, posX, posY, layer, fontSize, width = 0, height = 0, align = 'center', event = 'none') {
    super();
    super.posX = posX;
    super.posY = posY;
    super.layer = layer;
    super.fontSize = fontSize;
    super.width = width;
    super.height = height;
    super.align = align;
    this.valueCounter = startvalue;
    super.value = String(this.valueCounter);

    if (event !== 'none') {
      window.addEventListener(event, (e) => {
        this.updateCounter(e.detail.value);
      });
    }
  }

  updateCounter(value) {
    this.valueCounter = value;
    const lengthScore = String(this.valueCounter).length;
    if (lengthScore < 6) {
      super.value = String(this.valueCounter);
    } else if (lengthScore < 9) {
      super.value = `${String(this.valueCounter).slice(0, 3)}К`;
    } else if (lengthScore < 12) {
      super.value = `${String(this.valueCounter).slice(0, 3)}М`;
    }
    this.render();
  }
}
export default TextCounterBox;
