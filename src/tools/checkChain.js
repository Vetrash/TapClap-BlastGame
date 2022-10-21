import _ from 'lodash';
import getGState from '../globalState.js';
import getSettings from '../settings.js';

const { sizefigureX, sizefigureY } = getSettings().gameMap;
const { minLengthChain } = getSettings();
const watchFigures = [];
const matrixFindeNearby = [
  { upRow: 1, upCol: 0 },
  { upRow: -1, upCol: 0 },
  { upRow: 0, upCol: 1 },
  { upRow: 0, upCol: -1 },
];

const chain = (col, row, state, chainArr, typeStart = undefined) => {
  const CheckTypes = typeStart === undefined ? state.figures[col][row].type : typeStart;
  if (chainArr.length >= minLengthChain) { return true; }
  const nearby = [];
  matrixFindeNearby.forEach((elem) => {
    if (row + elem.upRow < sizefigureY && col + elem.upCol < sizefigureX
        && row + elem.upRow >= 0 && col + elem.upCol >= 0) {
      nearby.push({ col: col + elem.upCol, row: row + elem.upRow });
    }
  });

  for (let i = 0; i < nearby.length; i += 1) {
    const elem = nearby[i];
    if (!_.includes(chainArr, { col: elem.col, row: elem.row })) {
      const typeElem = state.figures[elem.col][elem.row].type;
      if (CheckTypes === typeElem) {
        chainArr.push({ col: elem.col, row: elem.row });
        return chain(elem.col, elem.row, state, chainArr, CheckTypes);
      }
    }
  }
  return false;
};

const checkChain = () => {
  watchFigures.length = 0;
  const { gametable } = getGState();
  for (let collumnIndex = 0; collumnIndex < sizefigureX; collumnIndex += 1) {
    for (let rowIndex = 0; rowIndex < sizefigureY; rowIndex += 1) {
      const chainArr = [];
      if (chain(collumnIndex, rowIndex, gametable, chainArr)) { return true; }
    }
  }
  return false;
};

export default checkChain;
