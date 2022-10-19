import _ from 'lodash';
import spellBomb from './spellBomb.js';
import spellPort from './spellPort.js';
import spellLightning from './spelLightning.js';
import getGState from '../../globalState.js';

const spellData = {
  bomb: spellBomb,
  port: spellPort,
  lightning: spellLightning,
};
const keysspell = Object.keys(spellData);

const getSpell = (loc, spell = undefined) => {
  const { ActivSpell } = getGState();
  if (spell !== undefined) {
    if (_.includes(keysspell, spell)) {
      spellData[spell](loc, 'free');
    }
  } else {
    spellData[ActivSpell.value](loc);
  }
};

export default getSpell;
