import UI from './Components/UI/UI.js';
import GameTable from './Components/GameTable/GameTable.js';
import Praise from './Components/Praise.js';

class Game {
  constructor() {
    this.sizeTableX = 8;
    this.sizeTableY = 8;
    this.chainMinLigth = 2;
    this.minLigthToSupBlock = 7;
    this.priceSpell = { bomb: 15, port: 3, lightning: 10 };
    this.fontSize = { norm: 83.4, big: 140, large: 231 };
    this.coins = 30;
    this.clicks = 21;
    this.borderAddCoin = 1000;
    this.magnifierBorderAddCoin = 1000;
    this.coastLevel = 30000;
    this.coastFigure = 500;
    this.increaseSet = 1.1;
    this.coinPrise = 1;
    this.canvasLayers = {};
    const layers = document.querySelectorAll('canvas');
    layers.forEach((elem) => {
      const name = elem.getAttribute('id');
      this.canvasLayers[name] = elem;
    });
    this.imgs = [];
    window.addEventListener('replay', () => {
      this.startNewGame();
    });
    window.addEventListener('click', (e) => {
      const corCanvas = window.toCanvasCor(this.canvasLayers.gameLayer, e.clientX, e.clientY);
      window.dispatchEvent(new CustomEvent('clickCanvas', { detail: { value: corCanvas } }));
    });
  }

  saveImg(imgs) { this.imgs = imgs; }

  createElements() {
    const settingsUI = {
      coins: this.coins,
      clicks: this.clicks,
      borderAddCoin: this.borderAddCoin,
      magnifierBorderAddCoin: this.magnifierBorderAddCoin,
      coastLevel: this.coastLevel,
      sizeTableX: this.sizeTableX,
      sizeTableY: this.sizeTableY,
      fontSize: this.fontSize,
      coastFigure: this.coastFigure,
      increaseSet: this.increaseSet,
      coinPrise: this.coinPrise,
      priceSpell: this.priceSpell,
    };
    const settingsGT = {
      sizeTableX: this.sizeTableX,
      sizeTableY: this.sizeTableY,
      chainMinLigth: this.chainMinLigth,
      minLigthToSupBlock: this.minLigthToSupBlock,
      priceSpell: this.priceSpell,
    };
    this.UI = new UI(this.canvasLayers, this.imgs, settingsUI);
    this.UI.createElements();
    this.GameTable = new GameTable(this.canvasLayers, this.imgs, settingsGT);
    this.Prise = new Praise(this.canvasLayers, this.imgs.dataPraise);
  }

  startNewGame() {
    const keycanvas = Object.keys(this.canvasLayers);
    keycanvas.forEach((canvasName) => {
      const canvas = this.canvasLayers[canvasName];
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const displayWidth = document.documentElement.clientWidth;
      const displayHeight = document.documentElement.clientHeight;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const scaleX = Math.floor((displayWidth / canvasWidth) * 100) / 100;
      const scaleY = Math.floor((displayHeight / canvasHeight) * 100) / 100;
      canvas.style.width = scaleX < scaleY ? `${canvasWidth * scaleX}px` : `${canvasWidth * scaleY}px`;
      canvas.style.height = scaleX < scaleY ? `${canvasHeight * scaleX}px` : `${canvasHeight * scaleY}px`;
    });
    this.GameTable.createGameTable();
    this.UI.loadStartValue();
    this.UI.renderUI();
    this.GameTable.renderPartGameTable();
  }
}
export default Game;
