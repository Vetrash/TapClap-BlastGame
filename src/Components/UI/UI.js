import TextBox from './TextBoxs/TextBox.js';
import ProgressLine from './ProgressLine.js';
import TextCounterBox from './TextBoxs/TextCounterBox.js';
import SpellBar from './SpellBar.js';
import EndGamePage from './EndGamePage.js';

class UI {
  constructor(canvasLayers, imgs, settingsUI) {
    this.settingsUI = settingsUI;
    this.coins = settingsUI.coins;
    this.score = 0;
    this.clicks = settingsUI.clicks;
    this.canvasLayers = canvasLayers;
    this.imgs = imgs;
    this.borderAddCoin = 0;
    this.magnifierBorderAddCoin = settingsUI.magnifierBorderAddCoin;
    this.gapUnderBtn = 50;
    this.gapUnderstatysBar = 30;
    this.startDrawBtnY = this.imgs.dataUI.statysBar.height + this.gapUnderstatysBar;
    this.coastLevel = settingsUI.coastLevel;
    this.scoreOffset = 80;
    this.sizeTableX = settingsUI.sizeTableX;
    this.sizeTableY = settingsUI.sizeTableY;
    this.fontSize = settingsUI.fontSize;
    this.coastFigure = settingsUI.coastFigure;
    this.priceSpell = settingsUI.priceSpell;
    window.addEventListener('endGame', (e) => {
      window.dispatchEvent(new CustomEvent('swithHandlers', { detail: { value: true } }));
      const isWin = e.detail.value;
      setTimeout(() => {
        this.MsgPage.render(this.score, this.clicks, isWin);
      }, 1000);
    });
    window.addEventListener('chainDelet', (e) => {
      this.updateScore(e.detail.value);
    });
    window.addEventListener('coinUpdate', (e) => {
      this.coins += e.detail.value;
      this.coinTextBox.updateCounter(this.coins);
      window.dispatchEvent(new CustomEvent('watchCoin', { detail: { value: this.coins } }));
    });
    window.addEventListener('clickUpdate', (e) => {
      this.clicks += e.detail.value;
      this.clickTextBox.updateCounter(this.clicks);
    });
  }

  loadStartValue() {
    this.coins = this.settingsUI.coins;
    this.score = 0;
    this.clicks = this.settingsUI.clicks;
    this.borderAddCoin = 0;
    this.progressLine.update(this.score);
    this.scoreTextBox.updateCounter(this.score);
    this.coinTextBox.updateCounter(this.coins);
    this.clickTextBox.updateCounter(this.clicks);
  }

  updateScore(value) {
    const { increaseSet, coinPrise } = this.settingsUI;
    const addScore = value < this.sizeTableX * this.sizeTableY
      ? Math.round((increaseSet ** value) * this.coastFigure)
      : Math.round(value * (this.coastFigure / 10));
    this.score += addScore;
    this.progressLine.update(this.score);
    this.scoreTextBox.updateCounter(this.score);
    if (this.score >= this.coastLevel) {
      window.dispatchEvent(new CustomEvent('endGame', { detail: { value: true } }));
      return;
    }
    if (this.clicks <= 0) {
      window.dispatchEvent(new CustomEvent('endGame', { detail: { value: false } }));
      return;
    }
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

    this.title = new TextBox('??????????????C', staticLayer.width / 2, titlePosY, staticLayer, this.fontSize.norm);

    this.clickTextBox = new TextCounterBox(this.clicks, this.gapBorder, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.click.width, this.imgs.dataUI.click.height, 'left');

    this.scoreTextBox = new TextCounterBox(this.score, this.scorePosX - this.scoreOffset, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.score.width + this.scoreOffset, this.imgs.dataUI.score.height, 'left');

    this.coinTextBox = new TextCounterBox(this.coins, this.coinPosX, this.startDrawBtnY, UILayer, this.fontSize.norm, this.imgs.dataUI.money.width, this.imgs.dataUI.money.height, 'left');

    const startDrawPrgoressLine = this.startDrawX + gapLoadLineX;
    this.progressLine = new ProgressLine(startDrawPrgoressLine, gapLoadLineY,
      this.coastLevel, UILayer, maxWidthLoadLine, heightLoadLine);
    this.spellBar = new SpellBar(staticLayer, UILayer, this.imgs.dataSpells, this.priceSpell);
    this.spellBar.createButtons();
    this.MsgPage = new EndGamePage(this.canvasLayers.msgLayer, this.imgs.dataUI.endScore,
      this.fontSize, this.imgs.dataUI.btnBigLarge, {
        win: this.imgs.dataUI.win,
        lose: this.imgs.dataUI.lose,
      });
    this.MsgPage.createSample();
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
