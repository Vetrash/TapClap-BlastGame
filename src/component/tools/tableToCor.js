import getSettings from '../../settings.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;
const { widthFigure, heightFigure } = getSettings().figure;
const { widthLayers } = getSettings();

const borderGapX = (widthLayers - ((widthFigure + gapX) * sizefigureX)) / 2;
const endDraw = startDrawY + sizefigureY * (heightFigure + gapY);
const tableToCor = (pos) => {
  if (Array.isArray(pos)) {
    const solution = pos.map((elem) => {
      const y = endDraw - elem.row * (heightFigure + gapY) - heightFigure;
      const x = borderGapX + elem.col * (widthFigure + gapX);
      return { y, x };
    });
    return solution;
  }
  const y = endDraw - pos.col * (heightFigure + gapY) - heightFigure;
  const x = borderGapX + pos.row * (widthFigure + gapX);
  return { y, x };
};

export default tableToCor;
