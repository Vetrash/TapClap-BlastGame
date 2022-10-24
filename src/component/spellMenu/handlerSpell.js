import getSettings from '../../settings.js';
import getSpell from '../spells/getSpell.js';
import checkPostClick from '../gameTable/checkPostClick.js';
import getGState from '../../globalState.js';

const { gapY, startDrawY } = getSettings().gameMap;
const {
  amount, gapX, prise, arrSpell, quickSpell, doubleClickSpell,
} = getSettings().spells;
const { sizefigureY } = getSettings().gameMap;

export const handlerSpell = (loc) => {
  const { btnSpell } = getGState().stateImg.dataSpells;
  const dataFigures = getGState().stateImg.dataFigures[0].offCanvas;
  const { staticLayer } = getGState().canvasLayer;
  const borderGapX = (staticLayer.width - ((btnSpell.width + gapX) * amount)) / 2;
  const StartDrawY = startDrawY + sizefigureY * (dataFigures.height + gapY) + 140;
  const { coin, ActivSpell } = getGState();
  if (loc.y > StartDrawY + 20 && loc.y < StartDrawY + 20 + 439) {
    const index = Math.floor((loc.x - borderGapX) / (btnSpell.width + gapX));
    const nameSpell = arrSpell[index];
    if (ActivSpell.value === nameSpell) {
      ActivSpell.value = 'none';
    } else if (prise[nameSpell] <= coin.value) {
      ActivSpell.value = nameSpell;
      if (doubleClickSpell.includes(nameSpell)) {
        getGState().gametable.arrClick.length = 0;
      }
      if (quickSpell.includes(nameSpell)) {
        getSpell();
        checkPostClick();
      }
    }
  }
};

export default handlerSpell;
