import _ from 'lodash';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { prise } = getSettings().spells;
const { sizefigureX, sizefigureY } = getSettings().gameMap;

const spelLightning = (loc, mode = 'pay') => {
  const { gametable, coin, ActivSpell } = getGState();
  const lengthShot = 6;
  const setIndex = [];
  while (setIndex.length < lengthShot && gametable.chainArr.length !== sizefigureX * sizefigureY) {
    const col = Math.floor(Math.random() * sizefigureX);
    const row = Math.floor(Math.random() * sizefigureY);
    const index = row * sizefigureX + col;
    const findeIndex = setIndex.findIndex((elem) => elem === index);
    const indexChain = _.findIndex(gametable.chainArr, { col, row });
    if (findeIndex === -1 && indexChain === -1) {
      gametable.chainArr.push({ col, row });
      setIndex.push(index);
    }
  }
  if (mode === 'pay') {
    coin.value -= prise.lightning;
  }
  ActivSpell.value = 'none';
};

export default spelLightning;
