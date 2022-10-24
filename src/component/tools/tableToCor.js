import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;

const tableToCor = (pos) => {
  const { gameTableLayer } = getGState().canvasLayer;
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const borderGapX = (gameTableLayer.width - ((dataFigures.width + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (dataFigures.height + gapY);
  if (Array.isArray(pos)) {
    const solution = pos.map((elem) => {
      const y = endDraw - elem.row * (dataFigures.height + gapY) - dataFigures.height;
      const x = borderGapX + elem.col * (dataFigures.width + gapX);
      return { y, x };
    });
    return solution;
  }
  const y = endDraw - pos.row * (dataFigures.height + gapY) - dataFigures.height;
  const x = borderGapX + pos.col * (dataFigures.width + gapX);
  return { y, x };
};

export default tableToCor;
