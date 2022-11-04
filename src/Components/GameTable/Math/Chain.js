import _ from 'lodash';

let watchTable;
const chainArr = [];
const mFindNearby = [
  { upRow: 1, upCol: 0 },
  { upRow: -1, upCol: 0 },
  { upRow: 0, upCol: 1 },
  { upRow: 0, upCol: -1 },
];

class Chain {
  static getForFig(table, col, row, typeStart = undefined) {
    if (col === -1 || row === -1) { return { chain: [], moveZone: [] }; }
    const sizeTableX = table.length;
    const sizeTableY = table[0].length;
    if (typeStart === undefined) {
      watchTable = Array(sizeTableX).fill(0)
        .map(() => Array(sizeTableY).fill(0));
      chainArr.length = 0;
    }
    const CheckTypes = typeStart === undefined ? table[col][row].type : typeStart;
    if (watchTable[col][row] !== 'x') {
      chainArr.push({ col, row });
      watchTable[col][row] = 'x';
    }
    const nearby = [];
    mFindNearby.forEach((e) => {
      if (row + e.upRow < sizeTableY && col + e.upCol < sizeTableX
                  && row + e.upRow >= 0 && col + e.upCol >= 0) {
        if (watchTable[col + e.upCol][row + e.upRow] === 0) {
          nearby.push({ col: col + e.upCol, row: row + e.upRow });
          watchTable[col + e.upCol][row + e.upRow] = 1;
        }
      }
    });
    nearby.forEach((elem) => {
      const typeElem = table[elem.col][elem.row].type;
      if (CheckTypes === typeElem) {
        this.getForFig(table, elem.col, elem.row, CheckTypes);
      }
    });
    return {
      chain: chainArr, isBySpell: false, price: 0, type: 'basic',
    };
  }

  static isMoveExists(table, minLength, supBlocks) {
    const sizefigureX = table.length;
    const sizefigureY = table[0].length;
    const figFlat = table.flat();
    const typeFig = _.map(figFlat, 'type');
    const intersection = _.intersection(typeFig, supBlocks);
    if (intersection.length !== 0) { return true; }
    for (let col = 0; col < sizefigureX; col += minLength) {
      for (let row = 0; row < sizefigureY; row += minLength) {
        const { chain } = this.getForFig(table, col, row);
        if (chain.length >= minLength) { return true; }
      }
    }
    return false;
  }

  static get(SpellManager, table, corTable) {
    const { isSpellRight, activSpell } = SpellManager;
    const nameFig = table[corTable.col][corTable.row].type;
    const isSpellFig = SpellManager.isSpellName(nameFig);
    const spellname = isSpellFig && isSpellRight ? activSpell : nameFig;

    if (isSpellRight || isSpellFig) {
      return this.getForSpell(corTable, isSpellFig, spellname, SpellManager, table);
    }
    return this.getForFig(table, corTable.col, corTable.row);
  }

  static getForSpell(corTable, isSpellOfTable, spellName, SpellManager) {
    if (isSpellOfTable) { SpellManager.setActivSpell(spellName); }
    const { chain, price, type } = SpellManager.getSpell(corTable);
    const useSpellPrise = !isSpellOfTable ? price : 0;
    return {
      chain, isBySpell: true, price: useSpellPrise, type,
    };
  }
}

export default Chain;
