import getSettings from '../settings.js';

const { widthFigure, heightFigure } = getSettings().figure;

const findeIndexColRow = (loc, figures) => {
  const collumnIndex = figures.findIndex((collumn) => collumn[0].corX < loc.x
    && loc.x < (collumn[0].corX + widthFigure));
  const collumnArr = figures[0];
  const rowIndex = collumnArr.findIndex((elem) => elem.corY < loc.y
    && loc.y < (elem.corY + heightFigure));
  return ({ col: collumnIndex, row: rowIndex });
};

export default findeIndexColRow;
