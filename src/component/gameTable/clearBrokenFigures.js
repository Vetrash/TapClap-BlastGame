import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;
const { widthFigure, heightFigure } = getSettings().figure;

const clearBrokenFigures = () => {
  const { gametable, canvasLayer } = getGState();

  const borderGapX = (canvasLayer.gameTableLayer.width - ((widthFigure + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (heightFigure + gapY);

  gametable.chainArr.forEach((elem) => {
    if (gametable.watchZone[elem.col] > elem.row) {
      gametable.watchZone[elem.col] = elem.row;
    }
  });
  const indexArr = gametable.chainArr.map((elem) => (elem.row * 9) + elem.col);
  const filterFigure = [];
  gametable.figures.forEach((collumn, index) => {
    if (gametable.watchZone[index] === 9) {
      filterFigure.push(collumn);
    } else {
      const filterCol = collumn.filter((elem) => {
        const col = Math.floor((elem.corX - borderGapX) / (widthFigure + gapX));
        const row = Math.floor((endDraw - elem.corY) / (heightFigure + gapY));
        const num = (row * 9) + col;
        return !indexArr.includes(num);
      });
      filterFigure.push(filterCol);
    }
  });
  gametable.figures = filterFigure;
};
export default clearBrokenFigures;
