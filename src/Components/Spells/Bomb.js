const watchOffsetBomb = [
  { colOffset: -1, rowOffset: 0 },
  { colOffset: -1, rowOffset: 1 },
  { colOffset: -1, rowOffset: -1 },
  { colOffset: 1, rowOffset: 0 },
  { colOffset: 1, rowOffset: 1 },
  { colOffset: 1, rowOffset: -1 },
  { colOffset: 0, rowOffset: -1 },
  { colOffset: 0, rowOffset: 1 },
];

class Bomb {
  static getChain(setting) {
    const { loc, sizeY, sizeX } = setting;
    const chain = [];
    chain.push({ col: loc.col, row: loc.row });
    watchOffsetBomb.forEach((elem) => {
      const findeCellRow = loc.row + elem.rowOffset;
      const findeCellCol = loc.col + elem.colOffset;
      if (findeCellRow < sizeY && findeCellRow >= 0
          && findeCellCol < sizeX && findeCellCol >= 0) {
        chain.push({ col: findeCellCol, row: findeCellRow });
      }
    });
    return { chain, type: 'bomb', isFinished: true };
  }
}
export default Bomb;
