import _ from 'lodash';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { widthFigure, heightFigure } = getSettings().figure;
const matrixFindeNearby = [
  { upRow: 1, upCol: 0 },
  { upRow: -1, upCol: 0 },
  { upRow: 0, upCol: 1 },
  { upRow: 0, upCol: -1 },
];

const chain = (col, row, state, typeStart = undefined) => {
  state.watchChainArr.push((row * 9) + col);
  const CheckTypes = typeStart === undefined ? [state.figures[col][row].type] : [typeStart];
  const supBlocks = getGState().stateImg.dataSupBlock;
  supBlocks.forEach((elem) => {
    CheckTypes.push(elem.name);
  });
  state.chainArr.push({ col, row });
  const nearby = [];
  matrixFindeNearby.forEach((elem) => {
    if (row + elem.upRow < 9 && col + elem.upCol < 9
      && row + elem.upRow >= 0 && col + elem.upCol >= 0) {
      if (!state.watchChainArr.includes(((row + elem.upRow) * 9) + col + elem.upCol)) {
        nearby.push({ col: col + elem.upCol, row: row + elem.upRow });
        state.watchChainArr.push(((row + 1) * 9) + col);
      }
    }
  });

  if (nearby.length === 0) { return; }
  nearby.forEach((elem) => {
    const index = _.findIndex(state.chainArr, elem);
    if (index === -1) {
      const typeElem = state.figures[elem.col][elem.row].type;
      if (CheckTypes.includes(typeElem)) {
        chain(elem.col, elem.row, state, CheckTypes[0]);
      }
    }
  });
};

const findeChain = (loc) => {
  const { gametable } = getGState();
  const collumnIndex = gametable.figures.findIndex((collumn) => collumn[0].corX < loc.x
&& loc.x < (collumn[0].corX + widthFigure));
  const collumnArr = gametable.figures[0];
  const rowIndex = collumnArr.findIndex((elem) => elem.corY < loc.y
      && loc.y < (elem.corY + heightFigure));
  gametable.watchChainArr.length = 0;
  chain(collumnIndex, rowIndex, gametable);
};
export default findeChain;
