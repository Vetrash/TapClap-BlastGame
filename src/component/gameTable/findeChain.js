import _ from 'lodash';
import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { sizefigureX, sizefigureY } = getSettings().gameMap;
const matrixFindeNearby = [
  { upRow: 1, upCol: 0 },
  { upRow: -1, upCol: 0 },
  { upRow: 0, upCol: 1 },
  { upRow: 0, upCol: -1 },
];

const chain = (col, row, state, typeStart = undefined) => {
  state.watchChainArr.push((row * sizefigureX) + col);
  const CheckTypes = typeStart === undefined ? state.figures[col][row].type : typeStart;
  state.chainArr.push({ col, row });
  const nearby = [];
  matrixFindeNearby.forEach((elem) => {
    if (row + elem.upRow < sizefigureY && col + elem.upCol < sizefigureX
      && row + elem.upRow >= 0 && col + elem.upCol >= 0) {
      if (!state.watchChainArr.includes(((row + elem.upRow) * sizefigureX) + col + elem.upCol)) {
        nearby.push({ col: col + elem.upCol, row: row + elem.upRow });
        state.watchChainArr.push(((row + 1) * sizefigureX) + col);
      }
    }
  });

  if (nearby.length === 0) { return; }
  nearby.forEach((elem) => {
    const index = _.findIndex(state.chainArr, elem);
    if (index === -1) {
      const typeElem = state.figures[elem.col][elem.row].type;
      if (CheckTypes === typeElem) {
        chain(elem.col, elem.row, state, CheckTypes);
      }
    }
  });
};

const findeChain = (loc) => {
  const { gametable } = getGState();
  const dataFigures = getGState().stateImg.dataFigures[0].offCanvas;
  const collumnIndex = gametable.figures.findIndex((collumn) => collumn[0].corX < loc.x
&& loc.x < (collumn[0].corX + dataFigures.width));
  const collumnArr = gametable.figures[0];
  const rowIndex = collumnArr.findIndex((elem) => elem.corY < loc.y
      && loc.y < (elem.corY + dataFigures.height));
  gametable.watchChainArr.length = 0;
  if (collumnIndex !== -1 && rowIndex !== -1) {
    chain(collumnIndex, rowIndex, gametable);
  }
};
export default findeChain;
