import _ from 'lodash';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { widthFigure, heightFigure } = getSettings().figure;
const { prise } = getSettings().spells;
const watchOffsetArr = [
  { colOffset: -1, rowOffset: 0 },
  { colOffset: -1, rowOffset: 1 },
  { colOffset: -1, rowOffset: -1 },
  { colOffset: 1, rowOffset: 0 },
  { colOffset: 1, rowOffset: 1 },
  { colOffset: 1, rowOffset: -1 },
  { colOffset: 0, rowOffset: -1 },
  { colOffset: 0, rowOffset: 1 },
];
const chain = (col, row, state) => {
  let index = _.findIndex(state.chainArr, { col, row });
  if (index === -1) { state.chainArr.push({ col, row }); }
  watchOffsetArr.forEach((elem) => {
    const findeCellRow = row + elem.rowOffset;
    const findeCellCol = col + elem.colOffset;
    index = _.findIndex(state.chainArr, { col: findeCellCol, row: findeCellRow });
    if (findeCellRow < 9 && findeCellRow >= 0
        && findeCellCol < 9 && findeCellCol >= 0) {
      if (index === -1) {
        state.chainArr.push({ col: findeCellCol, row: findeCellRow });
      }
    }
  });
};

const spellBomb = (loc, mod = 'pay') => {
  const { gametable, coin, ActivSpell } = getGState();
  const collumnIndex = gametable.figures.findIndex((collumn) => collumn[0].corX <= loc.x
    && loc.x <= (collumn[0].corX + widthFigure));
  const collumnArr = gametable.figures[0];
  const rowIndex = collumnArr.findIndex((elem) => elem.corY <= loc.y
    && loc.y <= (elem.corY + heightFigure));
  chain(collumnIndex, rowIndex, gametable);
  if (mod === 'pay') { coin.value -= prise.bomb; }
  ActivSpell.value = 'none';
};

export default spellBomb;
