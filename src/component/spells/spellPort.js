import findeIndexColRow from '../../tools/findeIndexColRow.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { prise } = getSettings().spells;

const spellPort = (loc) => {
  const { gametable, coin, ActivSpell } = getGState();
  const { arrClick, figures } = gametable;

  if (arrClick.length < 2) {
    arrClick.push(loc);
  }
  if (arrClick.length === 2) {
    const firstFig = findeIndexColRow(arrClick[0], figures);
    const secondFig = findeIndexColRow(arrClick[1], figures);
    const imgFirst = figures[firstFig.col][firstFig.row].img;
    const typeFirst = figures[firstFig.col][firstFig.row].type;
    figures[firstFig.col][firstFig.row].img = figures[secondFig.col][secondFig.row].img;
    figures[firstFig.col][firstFig.row].type = figures[secondFig.col][secondFig.row].type;
    figures[secondFig.col][secondFig.row].img = imgFirst;
    figures[secondFig.col][secondFig.row].type = typeFirst;
    gametable.portFig.push(firstFig);
    gametable.portFig.push(secondFig);
    coin.value -= prise.port;
    ActivSpell.value = 'none';
    arrClick.length = 0;
  }
};

export default spellPort;
