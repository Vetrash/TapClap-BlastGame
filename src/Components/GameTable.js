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
    this.maxShuffle = 2;
    this.sumShuffle = 0;
    this.SpellManager = new SpellManager(this.sizeTableX, this.sizeTableY);
    this.canvasLayers = canvasLayers;
    this.imgs = imgs;
    this.TableMath = new TableMath(_.map(this.imgs.dataSupBlock, 'name'));
    this.radiusTable = 80;
    this.radiusBorderTable = 60;
    this.radiusClip = 30;
    this.borderWidth = 30;
    this.widthFig = this.imgs.dataFigures[0].offCanvas.width;
    this.heightFig = this.imgs.dataFigures[0].offCanvas.height;
    this.borderGapX = (this.canvasLayers.gameLayer.width
      - ((this.widthFig + this.gapX) * this.sizeTableX)) / 2;
    this.startDrawY = (this.canvasLayers.gameLayer.height
      - ((this.heightFig + this.gapY) * this.sizeTableY)) / 2;
    this.endDraw = this.startDrawY + this.sizeTableY * (this.heightFig + this.gapY);
    this.chainArr = [];
    this.isShaffling = false;
    this.moveZone = Array(this.sizeTableX).fill(this.sizeTableY);
    ///
    this.speedFuling = 500;
    ///
    this.startRenderCol = 0;
    this.endRenderCol = this.sizeTableX - 1;
    this.lastLengthCombo = 0;
    this.isFuling = false;
    this.firstFigPort = null;
    this.isHanderStop = false;

    window.addEventListener('offHandlers', () => {
      this.isHanderStop = true;
    });

    window.addEventListener('onHandlers', () => {
      this.isHanderStop = false;
    });

    window.addEventListener('click', (e) => {
      if (!this.isFuling) {
        const loc = window.toCanvasCor(this.canvasLayers.gameLayer, e.clientX, e.clientY);
        this.shuflle();
        if (!this.isShaffling) { this.handler(loc); }
      }
    });

    window.addEventListener('clearSpell', () => {
      if (this.firstFigPort !== null) {
        this.firstFigPort.clearTarget();
      }
    });

    window.addEventListener('clearBtnSpellbyNotType', () => {
      if (this.firstFigPort !== null) {
        this.firstFigPort.clearTarget();
      }
    });
  }

  createGameTable() {
    const { gameLayer } = this.canvasLayers;
    drawSquareFill({
      x1: this.borderGapX,
      x2: gameLayer.width - this.borderGapX,
      y1: this.startDrawY,
      y2: this.endDraw,
      radius: this.radiusTable,
      color: '#0d233d',
      canvas: this.canvasLayers.staticLayer,
    });
    drawSquareStroke({
      x1: this.borderGapX - this.borderWidth,
      x2: this.canvasLayers.gameLayer.width - this.borderGapX + this.borderWidth,
      y1: this.startDrawY - this.borderWidth,
      y2: this.endDraw + this.borderWidth,
      radius: this.radiusBorderTable,
      color: '#77bacb',
      canvas: this.canvasLayers.staticLayerUp,
      lWidth: this.borderWidth,
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
    drawSquareClip({
      x1: this.borderGapX,
      x2: gameLayer.width - this.borderGapX,
      y1: this.startDrawY,
      y2: this.endDraw,
      radius: this.radiusClip,
      canvas: gameLayer,
    });
    ///
    this.startRenderCol = 0;
    this.endRenderCol = this.sizeTableX - 1;
    const indexWatch = [];
    this.moveZone.forEach((elem, index) => {
      if (elem !== this.sizeTableY) { indexWatch.push(index); }
    });
    if (indexWatch.length !== 0) {
      // eslint-disable-next-line prefer-destructuring
      this.startRenderCol = indexWatch[0];
      this.endRenderCol = _.last(indexWatch);
    }
    const corStartClear = this.borderGapX + this.startRenderCol * (this.widthFig + this.gapX);
    const corEndClear = (this.endRenderCol - this.startRenderCol + 1) * (this.widthFig + this.gapX);
    ///
    gameTableCtx.clearRect(corStartClear, this.startDrawY, corEndClear,
      this.endDraw - (this.heightFig * 2));

    for (let col = this.startRenderCol; col <= this.endRenderCol; col += 1) {
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

  fulingFigures(dt) {
    let sumStopedFigures = 0;
    for (let k = 0; k < this.sizeTableY; k += 1) {
      const stopCorY = this.endDraw - k * (this.heightFig + this.gapY) - this.heightFig;
      for (let i = 0; i < this.sizeTableX; i += 1) {
        if (this.moveZone[i] !== this.sizeTableY) {
          const newCor = this.table[i][k].corY + (dt * this.speedFuling);
          if (newCor < stopCorY) {
            this.table[i][k].corY = newCor;
          } else {
            this.table[i][k].corY = stopCorY;
            sumStopedFigures += 1;
          }
        } else {
          sumStopedFigures += 1;
        }
      }
    }
    if (sumStopedFigures === this.sizeTableX * this.sizeTableY) {
      return false;
    }
    return true;
  }

  shuflle() {
    this.isShaffling = !this.TableMath.checkForMove(this.table, 2);
    const loop = () => {
      this.table = this.TableMath.shuffle(this.table);
      this.table.forEach((col) => {
        col.forEach((fig) => { fig.puffAnimate(); });
      });
      this.moveZone = Array(this.sizeTableX).fill(this.sizeTableY);
      this.renderPartGameTable();
      this.sumShuffle += 1;
      if (this.sumShuffle > this.maxShuffle) {
        window.dispatchEvent(new CustomEvent('endGame'));
        return;
      }
      const reShaffle = !this.TableMath.checkForMove(this.table, 2);
      if (reShaffle) {
        setTimeout(loop, 3000);
      } else {
        this.sumShuffle = 0;
      }
    };
    if (this.isShaffling) { loop(); }
  }

  animFulingFig() {
    let lastTime = Date.now();
    const loop = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000.0;
      this.isFuling = this.fulingFigures(dt);
      lastTime = now;
      if (!this.isFuling) {
        window.cancelAnimationFrame(loop);
      } else {
        requestAnimationFrame(loop);
      }
      this.renderPartGameTable();
    };
    requestAnimationFrame(loop);
  }

  getChainFigSpell(corTable, mode = 'pay') {
    const { chain, prise, type } = this.SpellManager.getSpell(corTable);
    this.chainArr.length = 0;
    if (type === 'port') {
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
        this.renderPartGameTable();
      }
    } else {
      this.moveZone = this.TableMath.getMoveZoneByChain(this.table, chain);
      this.chainArr = chain;
      this.lastLengthCombo = chain.length;
      window.dispatchEvent(new CustomEvent('chainDelet', { detail: { value: this.lastLengthCombo } }));
    }
    if (mode === 'pay') {
      window.dispatchEvent(new CustomEvent('coinUpdate', { detail: { value: -prise } }));
    }
    this.clearBrokenFigures();
    this.createNewFigures();
    this.animFulingFig();
  }

  handler(loc) {
    const corTable = this.TableMath.locToCorTable(this.table, loc);
    if (corTable.col !== -1 && corTable.row !== -1 && !this.isHanderStop) {
      const figOfClick = this.table[corTable.col][corTable.row];
      const isSpellFig = this.SpellManager.isSpellName(figOfClick.type);
      if (this.SpellManager.isSpellRight) {
        this.getChainFigSpell(corTable);
      } else if (isSpellFig) {
        this.SpellManager.setActivSpell(figOfClick.type);
        this.getChainFigSpell(corTable, 'free');
      } else {
        const { chain, moveZone } = this.TableMath.getChain(this.table, corTable.col, corTable.row);
        this.chainArr = chain;
        this.moveZone = moveZone;
        this.lastLengthCombo = this.chainArr.length;
        if (this.chainArr.length >= this.chainMinLigth) {
          if (this.chainArr.length >= this.minLigthToSupBlock) {
            const firstFigLoc = this.chainArr.shift();
            const firstFig = this.table[firstFigLoc.col][firstFigLoc.row];
            firstFig.changeTypetoSpecial();
            firstFig.puffAnimate();
          }
          this.clearBrokenFigures();
          this.createNewFigures();
          this.animFulingFig();
          window.dispatchEvent(new CustomEvent('clickUpdate', { detail: { value: -1 } }));
          window.dispatchEvent(new CustomEvent('chainDelet', { detail: { value: this.lastLengthCombo } }));
        }
      }
    }
  }
}
export default GameTable;
