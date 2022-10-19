import findeChain from './findeChain.js';
import getSpell from '../spells/getSpell.js';
import checkPostClick from './checkPostClick.js';
import getGState from '../../globalState.js';

const handlerGameTable = (loc) => {
  const { gametable } = getGState();
  gametable.chainArr.length = 0;
  gametable.watchZone = Array(9).fill(9);
  switch (getGState().ActivSpell.value) {
    case 'none':
      findeChain(loc);
      if (gametable.chainArr.length >= 2) {
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
