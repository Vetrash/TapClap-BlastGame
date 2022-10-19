import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapY, sizefigureY, startDrawY,
} = getSettings().gameMap;
const { heightFigure, speedFuling } = getSettings().figure;

const fulingFigures = (dt) => {
  const { gametable, gameStatus, isRender } = getGState();
  let sumStopedFigures = 0;
  const endDraw = startDrawY + sizefigureY * (heightFigure + gapY);
  for (let i = 0; i < 9; i += 1) {
    if (gametable.watchZone[i] !== 9) {
      for (let k = 0; k < 9; k += 1) {
        const stopCorY = endDraw - k * (heightFigure + gapY) - heightFigure;
        if (gametable.figures[i][k].corY < stopCorY) {
          gametable.figures[i][k].corY += (dt * speedFuling);
        } else {
          gametable.figures[i][k].corY = stopCorY;
          sumStopedFigures += 1;
        }
      }
    } else {
      sumStopedFigures += 9;
    }
  }

  if (sumStopedFigures === 81) {
    gameStatus.value = 'wait';
    isRender.figures = false;
  } else {
    isRender.figures = true;
  }
};
export default fulingFigures;
