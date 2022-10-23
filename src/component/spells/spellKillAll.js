import _ from 'lodash';
import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { sizefigureX, sizefigureY } = getSettings().gameMap;

const spellKillAll = () => {
  const { chainArr } = getGState().gametable;
  for (let col = 0; col < sizefigureX; col += 1) {
    for (let row = 0; row < sizefigureY; row += 1) {
      if (!_.some(chainArr, { col, row })) {
        chainArr.push({ col, row });
      }
    }
  }
};

export default spellKillAll;
