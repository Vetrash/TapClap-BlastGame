import _ from 'lodash';

class ShuffleTable {
  static get(table) {
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
}
export default ShuffleTable;
