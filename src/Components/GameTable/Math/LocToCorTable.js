class LocToCorTable {
  static get(table, loc) {
    const widthFig = table[0][0].img.width;
    const heightFig = table[0][0].img.height;
    const collumnIndex = table.findIndex((col) => col[0].corX < loc.x
              && loc.x < (col[0].corX + widthFig));
    const collumnArr = table[0];
    const rowIndex = collumnArr.findIndex((elem) => elem.corY < loc.y
              && loc.y < (elem.corY + heightFig));
    return ({ col: collumnIndex, row: rowIndex });
  }
}
export default LocToCorTable;
