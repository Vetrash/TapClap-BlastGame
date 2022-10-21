import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;

const clearBrokenFigures = () => {
  const { gametable } = getGState();
  const { gameTableLayer } = getGState().canvasLayer;
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const borderGapX = (gameTableLayer.width - ((dataFigures.width + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (dataFigures.height + gapY);

  gametable.chainArr.forEach((elem) => {
    if (gametable.watchZone[elem.col] > elem.row) {
      gametable.watchZone[elem.col] = elem.row;
    }
  });
  const indexArr = gametable.chainArr.map((elem) => (elem.row * sizefigureX) + elem.col);
  const filterFigure = [];
  gametable.figures.forEach((collumn, index) => {
    if (gametable.watchZone[index] === sizefigureY) {
      filterFigure.push(collumn);
    } else {
      const filterCol = collumn.filter((elem) => {
        const col = Math.floor((elem.corX - borderGapX) / (dataFigures.width + gapX));
        const row = Math.floor((endDraw - elem.corY) / (dataFigures.height + gapY));
        const num = (row * sizefigureX) + col;
        return !indexArr.includes(num);
      });
      filterFigure.push(filterCol);
    }
  });
  gametable.figures = filterFigure;
};
export default clearBrokenFigures;
