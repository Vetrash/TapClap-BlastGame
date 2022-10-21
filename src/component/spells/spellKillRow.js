import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { sizefigureX } = getSettings().gameMap;

const spellKillRow = (loc) => {
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const { gametable } = getGState();
  const collumnArr = gametable.figures[0];
  const row = collumnArr.findIndex((elem) => elem.corY <= loc.y
    && loc.y <= (elem.corY + dataFigures.height));
  for (let col = 0; col < sizefigureX; col += 1) {
    getGState().gametable.chainArr.push({ col, row });
  }
};

export default spellKillRow;
