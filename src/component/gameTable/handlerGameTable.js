import findeChain from './findeChain.js';
import getSpell from '../spells/getSpell.js';
import checkPostClick from './checkPostClick.js';
import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { minLengthChain } = getSettings();
const { sizefigureX, sizefigureY } = getSettings().gameMap;
const handlerGameTable = (loc) => {
  const { gametable } = getGState();
  gametable.chainArr.length = 0;
  gametable.watchZone = Array(sizefigureX).fill(sizefigureY);
  switch (getGState().ActivSpell.value) {
    case 'none':
      findeChain(loc);
      if (gametable.chainArr.length >= minLengthChain) {
        getGState().click.value -= 1;
      }
      break;
    default:
      getSpell(loc);
      break;
  }
  checkPostClick();
};
export default handlerGameTable;
