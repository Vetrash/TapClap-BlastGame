import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { sizefigureX } = getSettings().gameMap;

const getHandingFigure = () => {
  const { gametable } = getGState();
  gametable.handingFigure.length = 0;
  gametable.stopFigures.length = 0;
  gametable.chainArr.forEach((elem) => {
    for (let i = 0; elem.row + i < sizefigureX; i += 1) {
      gametable.handingFigure.push(gametable.figures[elem.col][elem.row + i]);
    }
  });
};
export default getHandingFigure;
