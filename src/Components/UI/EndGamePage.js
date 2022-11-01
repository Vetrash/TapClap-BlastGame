import TextBox from './TextBox.js';
import UIbtn from './UIbtn.js';

class EndGamePage {
  constructor(layer, baseImg, fontSize, btnLarge, imgTitles) {
    this.layer = layer;
    this.baseImg = baseImg;
    this.fontSize = fontSize;
    this.offsetTitle = 200;
    this.offsetScore = 140;
    this.offsetClick = 160;
    this.btnLarge = btnLarge;
    this.offsetBtn = 360;
    this.imgTtles = imgTitles;
  }

  sample(score, click) {
    const ctx = this.layer.getContext('2d');
    const posX = (this.layer.width / 2) - (this.baseImg.width / 2);
    const posY = (this.layer.height / 2) - (this.baseImg.height / 2);
    ctx.drawImage(this.baseImg, posX, posY);
    const textPosX = (this.layer.width / 2);
    const textPosY = (this.layer.height / 2) + this.offsetTitle;

    const titleTextBox = new TextBox('Очки:', textPosX, textPosY, this.layer, this.fontSize.norm);
    titleTextBox.render();

    const scoreTextBox = new TextBox(score, textPosX, textPosY + this.offsetScore,
      this.layer, this.fontSize.big);
    scoreTextBox.render();

    const clickTextPosY = (this.layer.height / 2) - this.offsetClick;
    const clickTextBox = new TextBox(click, textPosX, clickTextPosY,
      this.layer, this.fontSize.large);
    clickTextBox.render();

    const posXbtn = (this.layer.width / 2) - (this.btnLarge.width / 2);
    const posYbtn = textPosY + this.offsetBtn;

    const event = () => {
      window.dispatchEvent(new CustomEvent('onHandlers'));
      window.dispatchEvent(new CustomEvent('replay'));
    };
    const btn = new UIbtn(posXbtn, posYbtn, this.btnLarge, 'Повторим?', this.layer, event);
    btn.render();
  }

  render(score, click, isWin) {
    this.sample(score, click);
    const ctx = this.layer.getContext('2d');
    const titleimg = isWin ? this.imgTtles.win : this.imgTtles.lose;
    const posX = (this.layer.width / 2) - (titleimg.width / 2);
    const posY = (this.layer.height / 2) - (this.baseImg.height / 2) - titleimg.height;
    ctx.drawImage(titleimg, posX, posY);
    window.dispatchEvent(new CustomEvent('offHandlers'));
  }
}
export default EndGamePage;
