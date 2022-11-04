import _ from 'lodash';
import DrawSquare from '../../Tools/DrawSquare.js';
import Figure from '../Figure.js';
import SpellManager from '../Spells/SpellManager.js';
import TableMath from './TableMath.js';

class GameTable {
  constructor(canvasLayers, imgs, settingGT) {
    this.table = [];
    this.gapX = 2;
    this.gapY = -20;
    this.sizeTableX = settingGT.sizeTableX;
    this.sizeTableY = settingGT.sizeTableY;
    this.chainMinLigth = settingGT.chainMinLigth;
    this.minLigthToSupBlock = settingGT.minLigthToSupBlock;
    this.priceSpell = settingGT.priceSpell;
    this.SpellManager = new SpellManager(this.sizeTableX, this.sizeTableY, this.priceSpell);
    this.canvasLayers = canvasLayers;
    this.imgs = imgs;
    this.TableMath = new TableMath(_.map(this.imgs.dataSupBlock, 'name'));
    this.widthFig = this.imgs.dataFigures[0].offCanvas.width;
    this.heightFig = this.imgs.dataFigures[0].offCanvas.height;
    this.borderGapX = (this.canvasLayers.gameLayer.width
      - ((this.widthFig + this.gapX) * this.sizeTableX)) / 2;
    this.startDrawY = (this.canvasLayers.gameLayer.height
      - ((this.heightFig + this.gapY) * this.sizeTableY)) / 2;
    this.endDraw = this.startDrawY + this.sizeTableY * (this.heightFig + this.gapY);
    this.chainArr = [];
    this.moveZone = Array(this.sizeTableX).fill(this.sizeTableY);
    this.isFuling = false;
    this.firstFigPort = null;
    this.isHanderStop = false;
    window.addEventListener('swithHandlers', (e) => { this.isHanderStop = e.detail.value; });
    window.addEventListener('clickCanvas', (e) => {
      if (!this.isFuling) {
        const corTable = this.TableMath.locToCorTable(this.table, e.detail.value);
        if (corTable.col !== -1 && corTable.row !== -1 && !this.isHanderStop) {
          this.handler(corTable);
        }
      }
    });
    window.addEventListener('clearBtnSpellbyNotType', () => {
      if (this.firstFigPort !== null) { this.firstFigPort.clearTarget(); }
    });
  }

  createGameTable() {
    this.moveZone = Array(this.sizeTableX).fill(this.sizeTableY);
    const { gameLayer } = this.canvasLayers;
    const radiusTable = 80;
    const radiusBorderTable = 60;
    const borderWidth = 30;
    DrawSquare.fill({
      x1: this.borderGapX,
      x2: gameLayer.width - this.borderGapX,
      y1: this.startDrawY,
      y2: this.endDraw,
      radius: radiusTable,
      color: '#0d233d',
      canvas: this.canvasLayers.staticLayer,
    });
    DrawSquare.stroke({
      x1: this.borderGapX - borderWidth,
      x2: this.canvasLayers.gameLayer.width - this.borderGapX + borderWidth,
      y1: this.startDrawY - borderWidth,
      y2: this.endDraw + borderWidth,
      radius: radiusBorderTable,
      color: '#77bacb',
      canvas: this.canvasLayers.staticLayerUp,
      lWidth: borderWidth,
    });
    const radiusClip = 30;
    DrawSquare.clip({
      x1: this.borderGapX,
      x2: gameLayer.width - this.borderGapX,
      y1: this.startDrawY,
      y2: this.endDraw,
      radius: radiusClip,
      canvas: gameLayer,
    });
    const newTable = [];
    for (let row = 0; row < this.sizeTableX; row += 1) {
      const collumnFigures = [];
      for (let collumn = 0; collumn < this.sizeTableY; collumn += 1) {
        const indexType = Math.floor(Math.random() * this.imgs.dataFigures.length);
        const corY = this.endDraw - collumn * (this.heightFig + this.gapY) - this.heightFig;
        const corX = this.borderGapX + row * (this.widthFig + this.gapX);
        const img = this.imgs.dataFigures[indexType].offCanvas;
        const type = this.imgs.dataFigures[indexType].name;
        collumnFigures.push(new Figure(corY, corX, img, type, this.imgs, this.canvasLayers));
      }
      newTable.push(collumnFigures);
    }
    this.table = newTable;
  }

  renderPartGameTable(startRenderCol = 0, endRenderCol = this.sizeTableX - 1) {
    const { gameLayer } = this.canvasLayers;
    const gameTableCtx = gameLayer.getContext('2d');
    const corStartClear = this.borderGapX + startRenderCol * (this.widthFig + this.gapX);
    const corEndClear = (endRenderCol - startRenderCol + 1) * (this.widthFig + this.gapX);
    gameTableCtx.clearRect(corStartClear, this.startDrawY, corEndClear,
      this.endDraw - (this.heightFig * 2));
    for (let col = startRenderCol; col <= endRenderCol; col += 1) {
      this.table[col].forEach((elem) => {
        gameTableCtx.drawImage(elem.img, elem.corX, elem.corY);
      });
    }
  }

  shiftBrokenFigures() {
    const filterFigure = this.table.map((collumn, col) => {
      if (this.moveZone[col] === this.sizeTableY) {
        return collumn;
      }
      return collumn.filter((elem, row) => !_.some(this.chainArr, { col, row }));
    });
    const countAddet = Array(this.sizeTableX).fill(0);
    const shiftFigures = this.chainArr.map((e) => {
      countAddet[e.col] += 1;
      const indexShift = countAddet[e.col];
      const indexType = Math.floor(Math.random() * this.imgs.dataFigures.length);
      const corY = (this.startDrawY + this.gapY - indexShift * (this.heightFig + this.gapY));
      const img = this.imgs.dataFigures[indexType].offCanvas;
      const type = this.imgs.dataFigures[indexType].name;
      this.table[e.col][e.row].puffAnimate();
      this.table[e.col][e.row].updateFigure(corY, img, type);
      return { col: e.col, fig: this.table[e.col][e.row] };
    });
    this.table = filterFigure;
    shiftFigures.forEach((elem) => {
      this.table[elem.col].push(elem.fig);
    });
  }

  shuflle(sumShuffle = 0) {
    clearTimeout(this.timerId);
    const maxShuffle = 2;
    const isShaffling = !this.TableMath.checkForMove(this.table, this.chainMinLigth);
    if (!isShaffling) { return; }
    this.table = this.TableMath.shuffle(this.table);
    this.table.forEach((col) => {
      col.forEach((fig) => { fig.puffAnimate(); });
    });
    this.moveZone = Array(this.sizeTableX).fill(this.sizeTableY);
    const { startRenderCol, endRenderCol } = this.TableMath.getRenderCol(this.moveZone,
      this.sizeTableY);
    this.renderPartGameTable(startRenderCol, endRenderCol);
    if (sumShuffle >= maxShuffle) {
      window.dispatchEvent(new CustomEvent('endGame', { detail: { value: false } }));
      return;
    }
    this.timerId = setTimeout(() => { this.shuflle(sumShuffle + 1); }, 3000);
  }

  animFulingFig() {
    let lastTime = Date.now();
    const fulingCol = this.moveZone.map((elem, index) => {
      if (elem !== this.sizeTableY) { return index; }
      return 'X';
    })
      .filter((elem) => elem !== 'X');
    const { startRenderCol, endRenderCol } = this.TableMath.getRenderCol(this.moveZone,
      this.sizeTableY);
    this.isFuling = true;
    const loop = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;
      const isFuling = this.TableMath.fulingFigures(this.table, dt, this.gapY,
        this.endDraw, fulingCol);
      lastTime = now;
      if (isFuling) {
        requestAnimationFrame(loop);
      } else {
        window.cancelAnimationFrame(loop);
        setTimeout(() => { this.isFuling = false; }, 200);
        this.timerId = setTimeout(() => { this.shuflle(); }, 3000);
      }
      this.renderPartGameTable(startRenderCol, endRenderCol);
    };
    requestAnimationFrame(loop);
  }

  port(chain) {
    if (chain.length < 2) {
      this.firstFigPort = this.table[chain[0].col][chain[0].row];
      this.firstFigPort.renderTarget();
    } else {
      this.firstFigPort = this.table[chain[0].col][chain[0].row];
      const secondFig = this.table[chain[1].col][chain[1].row];
      const safeFirstData = _.cloneDeep(this.firstFigPort);
      this.firstFigPort.changeType(secondFig.img, secondFig.type);
      secondFig.changeType(safeFirstData.img, safeFirstData.type);
      this.moveZone = this.TableMath.getMoveZoneByChain(this.table, chain);
      this.firstFigPort.clearTarget();
      this.firstFigPort.puffAnimate();
      secondFig.puffAnimate();
      const { startRenderCol, endRenderCol } = this.TableMath.getRenderCol(this.moveZone,
        this.sizeTableY);
      this.renderPartGameTable(startRenderCol, endRenderCol);
    }
  }

  handler(corTable) {
    const { chain, isBySpell, price, type } = this.TableMath.getChain(this.SpellManager,
      this.table, corTable);
    this.chainArr = chain;
    const decreaseClick = isBySpell ? 0 : -1;
    if (type === 'port') {
      this.port(chain);
      this.chainArr = [];
    }
    this.moveZone = this.TableMath.getMoveZoneByChain(this.table, chain);
    window.dispatchEvent(new CustomEvent('coinUpdate', { detail: { value: -price } }));
    if (!isBySpell && this.chainArr.length >= this.minLigthToSupBlock) {
      const firstFigLoc = this.chainArr.shift();
      const firstFig = this.table[firstFigLoc.col][firstFigLoc.row];
      firstFig.changeTypetoSpecial();
      firstFig.puffAnimate();
    }
    if (this.chainArr.length >= this.chainMinLigth) {
      this.shiftBrokenFigures();
      this.animFulingFig();
      window.dispatchEvent(new CustomEvent('clickUpdate', { detail: { value: decreaseClick } }));
      window.dispatchEvent(new CustomEvent('chainDelet', { detail: { value: chain.length } }));
    }
  }
}
export default GameTable;
