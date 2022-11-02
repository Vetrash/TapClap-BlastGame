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

  getChainFig(table, col, row, typeStart = undefined) {
    if (col === -1 || row === -1) { return { chain: [], moveZone: [] }; }
    const sizeTableX = table.length;
    const sizeTableY = table[0].length;
    if (typeStart === undefined) {
      this.watchTable = Array(sizeTableX).fill(0)
        .map(() => Array(sizeTableY).fill(0));
      this.chainArr.length = 0;
    }
    const CheckTypes = typeStart === undefined ? table[col][row].type : typeStart;
    if (this.watchTable[col][row] !== 'x') {
      this.chainArr.push({ col, row });
      this.watchTable[col][row] = 'x';
    }
    const nearby = [];
    this.mFindNearby.forEach((e) => {
      if (row + e.upRow < sizeTableY && col + e.upCol < sizeTableX
              && row + e.upRow >= 0 && col + e.upCol >= 0) {
        if (this.watchTable[col + e.upCol][row + e.upRow] === 0) {
          nearby.push({ col: col + e.upCol, row: row + e.upRow });
          this.watchTable[col + e.upCol][row + e.upRow] = 1;
        }
      }
    });
    nearby.forEach((elem) => {
      const typeElem = table[elem.col][elem.row].type;
      if (CheckTypes === typeElem) {
        this.getChainFig(table, elem.col, elem.row, CheckTypes);
      }
    });
    return { chain: this.chainArr, isBySpell: false, prise: 0, type: 'basic' };
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

  fulingFigures(table, dt, gapY, endDraw, fulingCol) {
    const cloneTable = table;
    const sizeTableY = table[0].length;
    const sizeTableX = table.length;
    const sumFig = sizeTableX * sizeTableY;
    let sumStopedFigures = sumFig - (fulingCol.length * sizeTableY);
    const heightFig = table[0][0].img.height;
    const speedFuling = 500;
    for (let k = 0; k < sizeTableY; k += 1) {
      const stopCorY = endDraw - k * (heightFig + gapY) - heightFig;
      for (let i = 0; i < fulingCol.length; i += 1) {
        const newCor = cloneTable[fulingCol[i]][k].corY + (dt * speedFuling);
        cloneTable[fulingCol[i]][k].corY = newCor < stopCorY ? newCor : stopCorY;
        sumStopedFigures = newCor < stopCorY ? sumStopedFigures : sumStopedFigures + 1;
      }
    }
    return sumStopedFigures !== sumFig;
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
        const { chain } = this.getChainFig(table, collumnIndex, rowIndex);
        if (chain.length >= minLength) { return true; }
      }
    }
    return false;
  }

  getChain(SpellManager, table, corTable) {
    const { isSpellRight } = SpellManager;
    const nameFig = table[corTable.col][corTable.row].type;
    const isSpellFig = SpellManager.isSpellName(nameFig);

    if (isSpellRight || isSpellFig) {
      return this.getChainSpell(corTable, isSpellFig, nameFig, SpellManager, table);
    }
    return this.getChainFig(table, corTable.col, corTable.row);
  }

  getChainSpell(corTable, isSpellOfTable, spellName, SpellManager) {
    if (isSpellOfTable) { SpellManager.setActivSpell(spellName); }
    const { chain, prise, type } = SpellManager.getSpell(corTable);
    const useSpellPrise = !isSpellOfTable ? prise : 0;
    return { chain, isBySpell: true, prise: useSpellPrise, type };
  }
}
export default TableMath;
