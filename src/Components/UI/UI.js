import TextBox from './TextBox.js';
import ProgressLine from './ProgressLine.js';
import TextCounterBox from './TextCounterBox.js';
import SpellBar from './SpellBar.js';
import EndGamePage from './EndGamePage.js';

class UI {
  constructor(canvasLayers, imgs) {
    this.coins = 30;
    this.score = 0;
    this.clicks = 21;
    this.canvasLayers = canvasLayers;
    this.imgs = imgs;
    this.borderAddCoin = 1000;
    this.magnifierBorderAddCoin = 1000;
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
    this.coins = 100;
    this.score = 0;
    this.clicks = 30;
    this.borderAddCoin = 1000;
    this.progressLine.update(this.score);
    this.scoreTextBox.updateCounter(this.score);
    this.coinTextBox.updateCounter(this.coins);
    this.clickTextBox.updateCounter(this.clicks);
  }

  updateScore(value) {
    const increaseSet = 1.1;
    const coinPrise = 1;
    const addScore = value < this.sizefigureX * this.sizefigureY
      ? Math.round(increaseSet ** value * this.coastFigure)
      : Math.round(value * (this.coastFigure / 10));
    this.score += addScore;
    this.progressLine.update(this.score);
    this.scoreTextBox.updateCounter(this.score);
    if (this.score >= this.coastLevel) { this.MsgPage.render(this.score, this.clicks, true); }
    if (this.clicks <= 0) { this.MsgPage.render(this.score, this.clicks, false); }
    if (this.score >= this.borderAddCoin) {
      const delta = this.score - this.borderAddCoin;
      const numAddLoop = Math.floor(delta / this.magnifierBorderAddCoin);
      this.coins += coinPrise * numAddLoop;
      this.borderAddCoin += this.magnifierBorderAddCoin * numAddLoop;
      this.coinTextBox.updateCounter(this.coins);
      window.dispatchEvent(new CustomEvent('watchCoin', { detail: { value: this.coins } }));
    }
  }

  createElements() {
    const { staticLayer, UILayer } = this.canvasLayers;
    const titlePosY = 60;
    const maxWidthLoadLine = 1245;
    const heightLoadLine = 86;
    const gapLoadLineX = 40;
    const gapLoadLineY = 116;
    const amountBtn = 3;
    const barImg = this.imgs.dataUI.statysBar;
    this.startDrawX = (staticLayer.width - barImg.width) / 2;
    const sumGapX = this.gapUnderBtn * amountBtn;
    const widthDrawBtn = this.imgs.dataUI.score.width
      + this.imgs.dataUI.money.width + this.imgs.dataUI.click.width + sumGapX;
    this.gapBorder = (staticLayer.width - widthDrawBtn) / 2;
    this.scorePosX = (this.canvasLayers.staticLayer.width / 2) - (this.imgs.dataUI.score.width / 2);
    this.coinPosX = staticLayer.width - this.gapBorder - this.imgs.dataUI.money.width;

    this.title = new TextBox('ПРОГРЕСC', staticLayer.width / 2, titlePosY, staticLayer, this.fontSize.norm);

    this.clickTextBox = new TextCounterBox(this.clicks, this.gapBorder, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.click.width, this.imgs.dataUI.click.height, 'left');

    this.scoreTextBox = new TextCounterBox(this.score, this.scorePosX - this.scoreOffset, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.score.width + this.scoreOffset, this.imgs.dataUI.score.height, 'left');

    this.coinTextBox = new TextCounterBox(this.coins, this.coinPosX, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.money.width, this.imgs.dataUI.money.height, 'left');

    const startDrawPrgoressLine = this.startDrawX + gapLoadLineX;
    this.progressLine = new ProgressLine(startDrawPrgoressLine, gapLoadLineY,
      this.coastLevel, UILayer, maxWidthLoadLine, heightLoadLine);
    this.spellBar = new SpellBar(staticLayer, UILayer, this.imgs.dataSpells);
    this.spellBar.createButtons();
  }

  renderUI() {
    const { staticLayer } = this.canvasLayers;
    const ctx = staticLayer.getContext('2d');
    ctx.drawImage(this.imgs.dataUI.statysBar, this.startDrawX, 0);
    this.title.render();
    ctx.drawImage(this.imgs.dataUI.click, this.gapBorder, this.startDrawBtnY);
    ctx.drawImage(this.imgs.dataUI.score, this.scorePosX, this.startDrawBtnY);
    ctx.drawImage(this.imgs.dataUI.money, this.coinPosX, this.startDrawBtnY);
    this.clickTextBox.render();
    this.scoreTextBox.render();
    this.coinTextBox.render();
    this.progressLine.render();
    this.spellBar.render();
    window.dispatchEvent(new CustomEvent('watchCoin', { detail: { value: this.coins } }));
  }
}

export default UI;
