import _ from 'lodash';
import findeIndexColRow from '../tools/findeIndexColRow.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { prise } = getSettings().spells;

const spellPort = (loc) => {
  const { gametable, coin, ActivSpell } = getGState();
  const { arrClick, figures } = gametable;

  if (arrClick.length < 2) {
    const corFig = findeIndexColRow(loc, figures);
    if (corFig.col !== -1 && corFig.row !== -1) {
      if (!_.some(arrClick, corFig)) {
        arrClick.push(corFig);
      }
    }
  }
  if (arrClick.length === 2) {
    const imgFirst = figures[arrClick[0].col][arrClick[0].row].img;
    const typeFirst = figures[arrClick[0].col][arrClick[0].row].type;
    figures[arrClick[0].col][arrClick[0].row].img = figures[arrClick[1].col][arrClick[1].row].img;
    figures[arrClick[0].col][arrClick[0].row].type = figures[arrClick[1].col][arrClick[1].row].type;
    figures[arrClick[1].col][arrClick[1].row].img = imgFirst;
    figures[arrClick[1].col][arrClick[1].row].type = typeFirst;
    gametable.portFig.push(arrClick[0]);
    gametable.portFig.push(arrClick[1]);
    coin.value -= prise.port;
    ActivSpell.value = 'none';
    arrClick.length = 0;
  }
};

export default spellPort;
