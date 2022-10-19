import _ from 'lodash';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { prise } = getSettings().spells;

const spelLightning = (loc, mode = 'pay') => {
  const { gametable, coin, ActivSpell } = getGState();
  const lengthShot = 6;
  const setIndex = [];
  while (setIndex.length < lengthShot) {
    const col = Math.floor(Math.random() * 9);
    const row = Math.floor(Math.random() * 9);
    const index = row * 9 + col;
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
