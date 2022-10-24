import getGState from '../../globalState.js';

const findeIndexColRow = (loc, figures) => {
  const dataFigures = getGState().stateImg.dataFigures[0].offCanvas;
  const collumnIndex = figures.findIndex((collumn) => collumn[0].corX < loc.x
    && loc.x < (collumn[0].corX + dataFigures.width));
  const collumnArr = figures[0];
  const rowIndex = collumnArr.findIndex((elem) => elem.corY < loc.y
    && loc.y < (elem.corY + dataFigures.height));
  return ({ col: collumnIndex, row: rowIndex });
};

export default findeIndexColRow;
