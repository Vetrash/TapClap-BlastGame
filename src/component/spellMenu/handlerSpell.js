import getSettings from '../../settings.js';
import getSpell from '../spells/getSpell.js';
import checkPostClick from '../gameTable/checkPostClick.js';
import getGState from '../../globalState.js';

const { gapY, startDrawY } = getSettings().gameMap;
const { heightFigure } = getSettings().figure;
const {
  amount, widthSpellIcon, gapX, prise, arrSpell, quickSpell,
} = getSettings().spells;
const { widthLayers } = getSettings();

const borderGapX = (widthLayers - ((widthSpellIcon + gapX) * amount)) / 2;
const StartDrawY = startDrawY + 9 * (heightFigure + gapY) + 140;

export const handlerSpell = (loc) => {
  const { coin, ActivSpell } = getGState();
  if (loc.y > StartDrawY + 20 && loc.y < StartDrawY + 20 + 439) {
    const index = Math.floor((loc.x - borderGapX) / (widthSpellIcon + gapX));
    const nameSpell = arrSpell[index];
    if (ActivSpell.value === nameSpell) {
      ActivSpell.value = 'none';
    } else if (prise[nameSpell] <= coin.value) {
      ActivSpell.value = nameSpell;
      if (quickSpell.includes(nameSpell)) {
        getSpell();
        checkPostClick();
      }
    }
  }
};

export default handlerSpell;
