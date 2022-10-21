import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { sizefigureX, sizefigureY } = getSettings().gameMap;

const spellKillAll = () => {
  for (let col = 0; col < sizefigureX; col += 1) {
    for (let row = 0; row < sizefigureY; row += 1) {
      getGState().gametable.chainArr.push({ col, row });
    }
  }
};

export default spellKillAll;
