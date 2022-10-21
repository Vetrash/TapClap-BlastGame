import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { sizefigureY } = getSettings().gameMap;

const spellKillCol = (loc) => {
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const { gametable } = getGState();
  const col = gametable.figures.findIndex((collumn) => collumn[0].corX <= loc.x
    && loc.x <= (collumn[0].corX + dataFigures.width));
  for (let row = 0; row < sizefigureY; row += 1) {
    getGState().gametable.chainArr.push({ col, row });
  }
};

export default spellKillCol;
