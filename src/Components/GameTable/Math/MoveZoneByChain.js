class MoveZoneByChain {
  static get(table, chain) {
    const moveZone = Array(table.length).fill(table[0].length);
    chain.forEach((elem) => {
      if (moveZone[elem.col] > elem.row) {
        moveZone[elem.col] = elem.row;
      }
    });
    return moveZone;
  }
}
export default MoveZoneByChain;
