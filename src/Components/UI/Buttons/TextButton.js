import TextBox from '../TextBoxs/TextBox.js';
import Button from './Button.js';

class TextButton extends Button {
  constructor(posX, posY, btnImg, text, layer, event, isSwithOff, fontSize) {
    super();
    super.layer = layer;
    super.btnImg = btnImg;
    super.posX = posX;
    super.posY = posY;
    this.isSwithOff = isSwithOff;
    this.fontSize = fontSize;
    this.isVisible = false;
    this.event = event;
    this.TextBox = new TextBox(text, this.posX + this.btnImg.width / 2,
      this.posY + this.btnImg.height / 2, this.layer, this.fontSize.norm);
  }

  render() {
    super.render();
    this.TextBox.render();
  }
}

export default TextButton;
