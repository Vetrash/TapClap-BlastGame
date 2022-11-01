import TextBox from './TextBox.js';
import ProgressLine from './ProgressLine.js';
import TextCounterBox from './TextCounterBox.js';
import SpellBar from './SpellBar.js';
import EndGamePage from './EndGamePage.js';

class UI {
  constructor(canvasLayers, imgs) {
    this.coins = 30;
    this.score = 0;
    this.clicks = 2;
    this.canvasLayers = canvasLayers;
    this.imgs = imgs;
    this.coinPrise = 1;
    this.borderAddCoin = 1000;
    this.magnifierBorderAddCoin = 1000;
    this.amountBtn = 3;
    this.gapUnderBtn = 50;
    this.gapUnderstatysBar = 30;
    this.startDrawBtnY = this.imgs.dataUI.statysBar.height + this.gapUnderstatysBar;
    this.coastLevel = 30000;
    this.scoreOffset = 80;
    this.fontSize = {
      norm: 83.4,
      big: 140,
      large: 231,
    };
    this.maxWidthLoadLine = 1245;
    this.heightLoadLine = 86;
    this.gapLoadLineX = 40;
    this.gapLoadLineY = 116;
    this.increaseSet = 1.1;
    this.coastFigure = 500;
    this.MsgPage = new EndGamePage(this.canvasLayers.msgLayer, this.imgs.dataUI.endScore,
      this.fontSize, this.imgs.dataUI.btnLarge, {
        win: this.imgs.dataUI.win,
        lose: this.imgs.dataUI.lose,
      });
    window.addEventListener('endGame', () => {
      this.MsgPage.render(this.score, this.clicks, false);
    });
    window.addEventListener('chainDelet', (e) => {
      this.updateScore(e.detail.value);
    });
    window.addEventListener('coinUpdate', (e) => {
      this.coins += e.detail.value;
      this.coinTextBox.updateCounter(this.coins);
      window.dispatchEvent(new CustomEvent('watchCoin', { detail: { value: this.coins } }));
    });
    window.addEventListener('clickUpdate', () => {
      this.clicks -= 1;
      this.clickTextBox.updateCounter(this.clicks);
    });
  }

  loadStartValue() {
    this.coins = 30;
    this.score = 0;
    this.clicks = 21;
    this.borderAddCoin = 1000;
  }

  updateScore(value) {
    const addScore = value < this.sizefigureX * this.sizefigureY
      ? Math.round(this.increaseSet ** value * this.coastFigure)
      : Math.round(value * (this.coastFigure / 10));
    this.score += addScore;
    this.progressLine.update(this.score);
    this.scoreTextBox.updateCounter(this.score);
    if (this.score >= this.coastLevel) { this.MsgPage.render(this.score, this.clicks, true); }
    if (this.clicks <= 0) { this.MsgPage.render(this.score, this.clicks, false); }
    if (this.score >= this.borderAddCoin) {
      const delta = this.score - this.borderAddCoin;
      const numAddLoop = Math.floor(delta / this.magnifierBorderAddCoin);
      this.coins += this.coinPrise * numAddLoop;
      this.borderAddCoin += this.magnifierBorderAddCoin * numAddLoop;
      this.coinTextBox.updateCounter(this.coins);
      window.dispatchEvent(new CustomEvent('watchCoin', { detail: { value: this.coins } }));
    }
  }

  renderUI() {
    const barImg = this.imgs.dataUI.statysBar;
    const { staticLayer, UILayer } = this.canvasLayers;
    this.startDrawX = (staticLayer.width - barImg.width) / 2;
    const sumGapX = this.gapUnderBtn * this.amountBtn;
    const widthDrawBtn = this.imgs.dataUI.score.width
      + this.imgs.dataUI.money.width + this.imgs.dataUI.click.width + sumGapX;
    this.gapBorder = (staticLayer.width - widthDrawBtn) / 2;
    this.scorePosX = (this.canvasLayers.staticLayer.width / 2) - (this.imgs.dataUI.score.width / 2);
    this.coinPosX = staticLayer.width - this.gapBorder - this.imgs.dataUI.money.width;
    const ctx = staticLayer.getContext('2d');
    ctx.drawImage(this.imgs.dataUI.statysBar, this.startDrawX, 0);
    const titlePosY = 60;
    const title = new TextBox('ПРОГРЕСC', staticLayer.width / 2, titlePosY, staticLayer, this.fontSize.norm);
    title.render();
    ctx.drawImage(this.imgs.dataUI.click, this.gapBorder, this.startDrawBtnY);
    ctx.drawImage(this.imgs.dataUI.score, this.scorePosX, this.startDrawBtnY);
    ctx.drawImage(this.imgs.dataUI.money, this.coinPosX, this.startDrawBtnY);

    this.clickTextBox = new TextCounterBox(this.clicks, this.gapBorder, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.click.width, this.imgs.dataUI.click.height, 'left');

    this.scoreTextBox = new TextCounterBox(this.score, this.scorePosX - this.scoreOffset, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.score.width + this.scoreOffset, this.imgs.dataUI.score.height, 'left');

    this.coinTextBox = new TextCounterBox(this.coins, this.coinPosX, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.money.width, this.imgs.dataUI.money.height, 'left');

    this.clickTextBox.render();
    this.scoreTextBox.render();
    this.coinTextBox.render();

    const startDrawPrgoressLine = this.startDrawX + this.gapLoadLineX;
    this.progressLine = new ProgressLine(startDrawPrgoressLine, this.gapLoadLineY,
      this.coastLevel, UILayer, this.maxWidthLoadLine, this.heightLoadLine);
    this.progressLine.render();

    const spellBar = new SpellBar(this.canvasLayers, this.imgs);
    spellBar.render();
    window.dispatchEvent(new CustomEvent('watchCoin', { detail: { value: this.coins } }));
  }
}

export default UI;
