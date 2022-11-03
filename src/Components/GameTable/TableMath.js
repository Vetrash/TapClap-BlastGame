import _ from 'lodash';

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
    return { chain: this.chainArr, isBySpell: false, price: 0, type: 'basic' };
  }

  getRenderCol(moveZone, sizeTableY) {
    let fulingCol = moveZone.map((e, i) =>  { return e !== sizeTableY ? i : 'X'; })
      .filter((elem) => elem !== 'X');

    if (fulingCol.length === 0) { fulingCol = [0, moveZone.length - 1]; }
    const startRenderCol = _.first(fulingCol);
    const endRenderCol = _.last(fulingCol);
    return { startRenderCol, endRenderCol };
  }

  fulingFigures(table, dt, gapY, endDraw, fulingCol) {
    const sizeTableY = table[0].length;
    const sizeTableX = table.length;
    const sumFig = sizeTableX * sizeTableY;
    let sumStopedFigures = sumFig - (fulingCol.length * sizeTableY);
    const heightFig = table[0][0].img.height;
    const speedFuling = 800;
    for (let row = 0; row < sizeTableY; row += 1) {
      const stopCorY = endDraw - row * (heightFig + gapY) - heightFig;
      for (const col of fulingCol) {
        const newCor = table[col][row].corY + (dt * speedFuling);
        if (newCor < stopCorY) {
          table[col][row].corY = newCor;
          continue;
        }
        table[col][row].corY = stopCorY;
        sumStopedFigures += 1;
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
    const figFlat = table.flat();
    const typeFig = _.map(figFlat, 'type');
    const intersection = _.intersection(typeFig, this.supBlocks);
    if (intersection.length !== 0) { return true; }

    for (let col = 0; col < sizefigureX; col += minLength) {
      for (let row = 0; row < sizefigureY; row += minLength) {
        const { chain } = this.getChainFig(table, col, row);
        if (chain.length >= minLength) { return true; }
      }
    }
    return false;
  }

  getChain(SpellManager, table, corTable) {
    const { isSpellRight, activSpell } = SpellManager;
    const nameFig = table[corTable.col][corTable.row].type;
    const isSpellFig = SpellManager.isSpellName(nameFig);
    const spellname = isSpellFig && isSpellRight ? activSpell : nameFig;

    if (isSpellRight || isSpellFig) {
      return this.getChainSpell(corTable, isSpellFig, spellname, SpellManager, table);
    }
    return this.getChainFig(table, corTable.col, corTable.row);
  }

  getChainSpell(corTable, isSpellOfTable, spellName, SpellManager) {
    if (isSpellOfTable) { SpellManager.setActivSpell(spellName); }
    const { chain, price, type } = SpellManager.getSpell(corTable);
    const useSpellPrise = !isSpellOfTable ? price : 0;
    return { chain, isBySpell: true, price: useSpellPrise, type };
  }
}
export default TableMath;
