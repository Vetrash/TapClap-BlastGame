import LocToCorTable from './Math/LocToCorTable.js';
import Chain from './Math/Chain.js';
import RenderCol from './Math/RenderCol.js';
import FullingFigures from './Math/FullingFigures.js';
import MoveZoneByChain from './Math/MoveZoneByChain.js';
import ShuffleTable from './Math/ShuffleTable.js';

class TableMath {
  constructor(supBlock) {
    this.supBlocks = supBlock;
  }

  locToCorTable(table, loc) { return LocToCorTable.get(table, loc); }

  getRenderCol(moveZone, sizeTableY) {
    return RenderCol.get(moveZone, sizeTableY);
  }

  fulingFigures(table, dt, gapY, endDraw, fulingCol) {
    return FullingFigures.move(table, dt, gapY, endDraw, fulingCol);
  }

  getMoveZoneByChain(table, chain) {
    return MoveZoneByChain.get(table, chain);
  }

  shuffle(table) {
    return ShuffleTable.get(table);
  }

  checkForMove(table, minLength) {
    return Chain.isMoveExists(table, minLength, this.supBlocks);
  }

  getChain(SpellManager, table, corTable) {
    return Chain.get(SpellManager, table, corTable);
  }
}
export default TableMath;
