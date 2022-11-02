import UI from './Components/UI/UI.js';
import GameTable from './Components/GameTable.js';
import Praise from './Components/Praise.js';

class Game {
  constructor() {
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
  }

  saveImg(imgs) { this.imgs = imgs; }

  createElements() {
    this.UI = new UI(this.canvasLayers, this.imgs);
    this.UI.createElements();
    this.GameTable = new GameTable(this.canvasLayers, this.imgs);
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
