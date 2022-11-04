import TextBox from './TextBoxs/TextBox.js';
import TextButton from './Buttons/TextButton.js';

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

  sampleRender(score, click) {
    const ctx = this.layer.getContext('2d');
    const posX = (this.layer.width / 2) - (this.baseImg.width / 2);
    const posY = (this.layer.height / 2) - (this.baseImg.height / 2);
    ctx.drawImage(this.baseImg, posX, posY);
    this.scoreTextBox.updteValue(score);
    this.clickTextBox.updteValue(click);
    this.titleTextBox.render();
    this.scoreTextBox.render();
    this.clickTextBox.render();
    this.btn.render();
  }

  createSample() {
    const textPosX = (this.layer.width / 2);
    const textPosY = (this.layer.height / 2) + this.offsetTitle;

    this.titleTextBox = new TextBox('Очки:', textPosX, textPosY, this.layer, this.fontSize.norm);
    this.scoreTextBox = new TextBox(0, textPosX, textPosY + this.offsetScore,
      this.layer, this.fontSize.big);
    const clickTextPosY = (this.layer.height / 2) - this.offsetClick;
    this.clickTextBox = new TextBox(0, textPosX, clickTextPosY,
      this.layer, this.fontSize.large);
    const posXbtn = (this.layer.width / 2) - (this.btnLarge.width / 2);
    const posYbtn = textPosY + this.offsetBtn;

    const event = () => {
      window.dispatchEvent(new CustomEvent('replay'));
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('swithHandlers', { detail: { value: false } }));
      }, 500);
    };
    this.btn = new TextButton(posXbtn, posYbtn, this.btnLarge, 'Повторим?', this.layer, event, true, this.fontSize);
  }

  render(score, click, isWin) {
    this.sampleRender(score, click);
    const ctx = this.layer.getContext('2d');
    const titleimg = isWin ? this.imgTtles.win : this.imgTtles.lose;
    const posX = (this.layer.width / 2) - (titleimg.width / 2);
    const posY = (this.layer.height / 2) - (this.baseImg.height / 2) - titleimg.height;
    ctx.drawImage(titleimg, posX, posY);
  }
}
export default EndGamePage;
