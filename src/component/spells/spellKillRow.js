import _ from 'lodash';
import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { sizefigureX } = getSettings().gameMap;

const spellKillRow = (loc) => {
  const dataFigures = getGState().stateImg.dataFigures[0].offCanvas;
  const { gametable } = getGState();
  const { chainArr } = gametable;
  const collumnArr = gametable.figures[0];
  const row = collumnArr.findIndex((elem) => elem.corY <= loc.y
    && loc.y <= (elem.corY + dataFigures.height));
  for (let col = 0; col < sizefigureX; col += 1) {
    if (!_.some(chainArr, { col, row })) {
      chainArr.push({ col, row });
    }
  }
};

export default spellKillRow;
