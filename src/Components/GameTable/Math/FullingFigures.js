class FullingFigures {
  static move(table, dt, gapY, endDraw, fulingCol) {
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
}
export default FullingFigures;
