import _ from 'lodash';
import Figure from './Figure.js';

class TableMath {
  constructor(supBlock) {
    this.watchTable = Array(this.sizeTableX).fill(0)
      .map(() => Array(this.sizeTableY).fill(0));
    this.moveZone = Array(this.sizeTableX).fill(this.sizeTableY);
    this.chainArr = [];
    this.handingFigure = [];
    this.supBlocks = supBlock;
    this.mFindNearby = [
      { upRow: 1, upCol: 0 },
      { upRow: -1, upCol: 0 },
      { upRow: 0, upCol: 1 },
      { upRow: 0, upCol: -1 },
    ];
  }

  getNewGameTable() {
    const table = [];
    for (let row = 0; row < this.sizeTableX; row += 1) {
      const collumnFigures = [];
      for (let collumn = 0; collumn < this.sizeTableY; collumn += 1) {
        const indexType = Math.floor(Math.random() * this.imgsFig.length);
        const corY = this.startPosY - collumn * (this.heightFig + this.gapY) - this.heightFig;
        const corX = this.startPosX + row * (this.widthFig + this.gapX);
        const img = this.imgsFig[indexType].offCanvas;
        const type = this.imgsFig[indexType].name;
        collumnFigures.push(new Figure(corY, corX, img, type, this.layer, this.layerEffect));
      }
      table.push(collumnFigures);
    }
    return table;
  }

  locToCorTable(table, loc) {
    const widthFig = table[0][0].img.width;
    const heightFig = table[0][0].img.height;
    const collumnIndex = table.findIndex((col) => col[0].corX < loc.x
          && loc.x < (col[0].corX + widthFig));
    const collumnArr = table[0];
    const rowIndex = collumnArr.findIndex((elem) => elem.corY < loc.y
          && loc.y < (elem.corY + heightFig));
    return ({ col: collumnIndex, row: rowIndex });
  }

  getChain(table, col, row, typeStart = undefined) {
    if (col === -1 || row === -1) { return { chain: [], moveZone: [] }; }
    const sizeTableX = table.length;
    const sizeTableY = table[0].length;
    if (typeStart === undefined) {
      this.watchTable = Array(sizeTableX).fill(0)
        .map(() => Array(sizeTableY).fill(0));
      this.moveZone = Array(sizeTableX).fill(sizeTableY);
      this.chainArr.length = 0;
    }
    const CheckTypes = typeStart === undefined ? table[col][row].type : typeStart;
    if (this.watchTable[col][row] !== 'x') {
      this.chainArr.push({ col, row });
      this.watchTable[col][row] = 'x';
    }
    if (this.moveZone[col] > row) { this.moveZone[col] = row; }
    const nearby = [];
    this.mFindNearby.forEach((e) => {
      if (row + e.upRow < sizeTableY && col + e.upCol < sizeTableX
              && row + e.upRow >= 0 && col + e.upCol >= 0) {
        if (this.watchTable[col + e.upCol][row + e.upRow] === 0) {
          nearby.push({ col: col + e.upCol, row: row + e.upRow });
          this.watchTable[col + e.upCol][row + e.upRow] = 1;
          if (this.moveZone[col] > row) { this.moveZone[col] = row; }
        }
      }
    });
    nearby.forEach((elem) => {
      const typeElem = table[elem.col][elem.row].type;
      if (CheckTypes === typeElem) {
        this.getChain(table, elem.col, elem.row, CheckTypes);
      }
    });
    return { chain: this.chainArr, moveZone: this.moveZone };
  }

  createNewFigures(table, chainArr) {
    const cloneTable = _.cloneDeep(table);
    const countAddet = Array(this.sizeTableX).fill(0);
    chainArr.forEach((elem) => {
      countAddet[elem.col] += 1;
    });
    countAddet.forEach((elem, index) => {
      if (elem !== 0) {
        const corX = this.startPosX + index * (this.widthFig + this.gapX);
        for (let i = 1; i <= elem; i += 1) {
          const indexType = Math.floor(Math.random() * this.imgsFig.length);
          const img = this.imgsFig[indexType].offCanvas;
          const type = this.imgsFig[indexType].name;
          const corY = (this.startPosY + this.gapY - i * (this.heightFig + this.gapY));
          cloneTable[index].push(new Figure(corY, corX, img, type, this.imgsSuperBlock,
            this.layer));
        }
      }
    });
    return cloneTable;
  }

  fulingFigures(table, dt) {
    const cloneTable = _.cloneDeep(table);
    let sumStopedFigures = 0;
    for (let k = 0; k < this.sizeTableY; k += 1) {
      const stopCorY = this.startPosY - k * (this.heightFig + this.gapY) - this.heightFig;
      for (let i = 0; i < this.sizeTableX; i += 1) {
        if (this.moveZone[i] !== this.sizeTableY) {
          const newCor = cloneTable[i][k].corY + (dt * this.speedFuling);
          if (newCor < stopCorY) {
            cloneTable[i][k].corY = newCor;
          } else {
            cloneTable[i][k].corY = stopCorY;
            sumStopedFigures += 1;
          }
        } else {
          sumStopedFigures += 1;
        }
      }
    }
    if (sumStopedFigures === this.sizeTableX * this.sizeTableY) {
      return { table: cloneTable, isStoped: false };
    }
    return { table: cloneTable, isStoped: true };
  }

  getMoveZoneByChain(table, chain) {
    this.moveZone = Array(table.length).fill(table[0].length);
    chain.forEach((elem) => {
      if (this.moveZone[elem.col] > elem.row) {
        this.moveZone[elem.col] = elem.row;
      }
    });
    return this.moveZone;
  }

  shuffle(table) {
    const sizefigureX = table.length;
    const sizefigureY = table[0].length;
    const cloneTable = _.cloneDeep(table);
    const fig = _.cloneDeep(table).flat();
    const shuffleArr = _.shuffle(fig);
    for (let i = 0; i < sizefigureX; i += 1) {
      for (let k = 0; k < sizefigureY; k += 1) {
        const index = i * sizefigureY + k;
        cloneTable[i][k].img = shuffleArr[index].img;
        cloneTable[i][k].type = shuffleArr[index].type;
      }
    }
    return cloneTable;
  }

  checkForMove(table, minLength) {
    const sizefigureX = table.length;
    const sizefigureY = table[0].length;
    const fig = _.cloneDeep(table).flat();
    const typeFig = _.map(fig, 'type');
    const intersection = _.intersection(typeFig, this.supBlocks);
    if (intersection.length !== 0) return true;

    for (let collumnIndex = 0; collumnIndex < sizefigureX; collumnIndex += 1) {
      for (let rowIndex = 0; rowIndex < sizefigureY; rowIndex += 1) {
        const { chain } = this.getChain(table, collumnIndex, rowIndex);
        if (chain.length >= minLength) { return true; }
      }
    }
    return false;
  }
}
export default TableMath;
