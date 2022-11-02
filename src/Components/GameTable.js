import _ from 'lodash';
import { drawSquareFill, drawSquareStroke, drawSquareClip } from '../tools/drawSquare.js';
import Figure from './Figure.js';
import SpellManager from './SpellManager.js';
import TableMath from './TableMath.js';

class GameTable {
  constructor(canvasLayers, imgs) {
    this.table = [];
    this.gapX = 2;
    this.gapY = -20;
    this.sizeTableX = 8;
    this.sizeTableY = 8;
    this.chainMinLigth = 2;
    this.minLigthToSupBlock = 7;
    this.SpellManager = new SpellManager(this.sizeTableX, this.sizeTableY);
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

    window.addEventListener('swithHandlers', (e) => {
      this.isHanderStop = e.detail.value;
    });

    window.addEventListener('click', (e) => {
      if (!this.isFuling) {
        const loc = window.toCanvasCor(this.canvasLayers.gameLayer, e.clientX, e.clientY);
        const corTable = this.TableMath.locToCorTable(this.table, loc);
        if (corTable.col !== -1 && corTable.row !== -1 && !this.isHanderStop) {
          this.handler(corTable);
        }
      }
    });

    window.addEventListener('clearBtnSpellbyNotType', () => {
      if (this.firstFigPort !== null) {
        this.firstFigPort.clearTarget();
      }
    });
  }

  createGameTable() {
    this.moveZone = Array(this.sizeTableX).fill(this.sizeTableY);
    const { gameLayer } = this.canvasLayers;
    const radiusTable = 80;
    const radiusBorderTable = 60;
    const borderWidth = 30;
    drawSquareFill({
      x1: this.borderGapX,
      x2: gameLayer.width - this.borderGapX,
      y1: this.startDrawY,
      y2: this.endDraw,
      radius: radiusTable,
      color: '#0d233d',
      canvas: this.canvasLayers.staticLayer,
    });
    drawSquareStroke({
      x1: this.borderGapX - borderWidth,
      x2: this.canvasLayers.gameLayer.width - this.borderGapX + borderWidth,
      y1: this.startDrawY - borderWidth,
      y2: this.endDraw + borderWidth,
      radius: radiusBorderTable,
      color: '#77bacb',
      canvas: this.canvasLayers.staticLayerUp,
      lWidth: borderWidth,
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

  renderPartGameTable() {
    const { gameLayer } = this.canvasLayers;
    const gameTableCtx = gameLayer.getContext('2d');
    const radiusClip = 30;
    drawSquareClip({
      x1: this.borderGapX,
      x2: gameLayer.width - this.borderGapX,
      y1: this.startDrawY,
      y2: this.endDraw,
      radius: radiusClip,
      canvas: gameLayer,
    });
    const { startRenderCol, endRenderCol } = this.TableMath.getRenderCol(this.moveZone,
      this.sizeTableY);
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

  clearBrokenFigures() {
    const filterFigure = [];
    this.table.forEach((collumn, col) => {
      if (this.moveZone[col] === this.sizeTableY) {
        filterFigure.push(collumn);
      } else {
        const filterCol = collumn.filter((elem, row) => !_.some(this.chainArr, { col, row }));
        filterFigure.push(filterCol);
      }
    });
    this.chainArr.forEach((e) => {
      this.table[e.col][e.row].puffAnimate();
    });
    this.table = filterFigure;
  }

  createNewFigures() {
    const countAddet = Array(this.sizeTableX).fill(0);
    this.chainArr.forEach((elem) => {
      countAddet[elem.col] += 1;
    });

    countAddet.forEach((elem, index) => {
      if (elem !== 0) {
        const corX = this.borderGapX + index * (this.widthFig + this.gapX);
        for (let i = 1; i <= elem; i += 1) {
          const indexType = Math.floor(Math.random() * this.imgs.dataFigures.length);
          const img = this.imgs.dataFigures[indexType].offCanvas;
          const type = this.imgs.dataFigures[indexType].name;
          const corY = (this.startDrawY + this.gapY - i * (this.heightFig + this.gapY));
          this.table[index].push(new Figure(corY, corX, img, type, this.imgs, this.canvasLayers));
        }
      }
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
    this.renderPartGameTable();
    if (sumShuffle >= maxShuffle) {
      window.dispatchEvent(new CustomEvent('endGame'));
      return;
    }
    this.timerId = setTimeout(() => { this.shuflle(sumShuffle + 1); }, 3000);
  }

  animFulingFig() {
    let lastTime = Date.now();
    const fulingCol = this.moveZone.map((e, i) =>  { return e !== this.sizeTableY ? i : 'X'; })
      .filter((elem) => elem !== 'X');
    const loop = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;
      this.isFuling = this.TableMath.fulingFigures(this.table, dt, this.gapY,
        this.endDraw, fulingCol);
      lastTime = now;
      if (this.isFuling) {
        requestAnimationFrame(loop);
      } else {
        window.cancelAnimationFrame(loop);
        this.timerId = setTimeout(() => { this.shuflle(); }, 3000);
      }
      this.renderPartGameTable();
    };
    requestAnimationFrame(loop);
  }

  port(chain) {
    if (chain.length < 2) {
      const firstFigPort = this.table[chain[0].col][chain[0].row];
      firstFigPort.renderTarget();
    } else {
      const firstFigPort = this.table[chain[0].col][chain[0].row];
      const secondFig = this.table[chain[1].col][chain[1].row];
      const safeFirstData = _.cloneDeep(firstFigPort);
      firstFigPort.changeType(secondFig.img, secondFig.type);
      secondFig.changeType(safeFirstData.img, safeFirstData.type);
      this.moveZone = this.TableMath.getMoveZoneByChain(this.table, chain);
      firstFigPort.clearTarget();
      firstFigPort.puffAnimate();
      secondFig.puffAnimate();
      this.renderPartGameTable();
    }
  }

  handler(corTable) {
    const { chain, isBySpell, prise, type } = this.TableMath.getChain(this.SpellManager,
      this.table, corTable);
    this.chainArr = chain;
    if (type === 'port') {
      this.port(chain);
      this.chainArr = [];
    }
    this.moveZone = this.TableMath.getMoveZoneByChain(this.table, chain);
    window.dispatchEvent(new CustomEvent('coinUpdate', { detail: { value: -prise } }));
    if (!isBySpell && this.chainArr.length >= this.minLigthToSupBlock) {
      const firstFigLoc = this.chainArr.shift();
      const firstFig = this.table[firstFigLoc.col][firstFigLoc.row];
      firstFig.changeTypetoSpecial();
      firstFig.puffAnimate();
    }
    if (this.chainArr.length >= this.chainMinLigth) {
      this.clearBrokenFigures();
      this.createNewFigures();
      this.animFulingFig();
      window.dispatchEvent(new CustomEvent('clickUpdate', { detail: { value: -1 } }));
      window.dispatchEvent(new CustomEvent('chainDelet', { detail: { value: chain.length } }));
    }
  }
}
export default GameTable;
