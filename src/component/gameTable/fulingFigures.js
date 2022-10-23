import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;
const { speedFuling } = getSettings().figure;

const fulingFigures = (dt) => {
  const { gametable, gameStatus, isRender } = getGState();

  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  let sumStopedFigures = 0;
  const endDraw = startDrawY + sizefigureY * (dataFigures.height + gapY);
  for (let i = 0; i < sizefigureX; i += 1) {
    if (gametable.watchZone[i] !== sizefigureY) {
      for (let k = 0; k < sizefigureY; k += 1) {
        const stopCorY = endDraw - k * (dataFigures.height + gapY) - dataFigures.height;
        if (gametable.figures[i][k].corY < stopCorY) {
          gametable.figures[i][k].corY += (dt * speedFuling);
        } else {
          gametable.figures[i][k].corY = stopCorY;
          sumStopedFigures += 1;
        }
      }
    } else {
      sumStopedFigures += sizefigureY;
    }
  }

  if (sumStopedFigures === sizefigureX * sizefigureY) {
    gameStatus.value = 'wait';
  } else {
    isRender.figures = true;
  }
};
export default fulingFigures;
