import getSettings from '../../settings.js';
import getGState from '../../globalState.js';
import { drawSquareStroke } from '../tools/drawSquare.js';

const { gapY, startDrawY } = getSettings().gameMap;
const { widthLayers } = getSettings();
const { heightFigure } = getSettings().figure;
const {
  amount, widthSpellIcon, heightSpellIcon, gapX, prise, arrSpell, widthIcon,
} = getSettings().spells;

const borderGapX = (widthLayers - ((widthSpellIcon + gapX) * amount)) / 2;
const StartDrawY = startDrawY + 9 * (heightFigure + gapY) + 140;

export const clearSelected = () => {
  const canvas = getGState().canvasLayer.UILayer;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, StartDrawY, widthLayers, StartDrawY + 600);
};

export const selectSpell = () => {
  clearSelected();
  const index = arrSpell.findIndex((elem) => elem === getGState().ActivSpell.value);
  if (index !== -1) {
    const lWidth = 10;
    const x1 = borderGapX + index * (widthSpellIcon + gapX);
    const x2 = x1 + widthSpellIcon + lWidth;
    const y1 = StartDrawY + lWidth;
    const y2 = y1 + heightSpellIcon + lWidth;
    const radius = 65;
    const color = '#ffd700';
    const canvas = getGState().canvasLayer.UILayer;
    const setting = {
      x1, x2, y1, y2, radius, color, canvas, lWidth,
    };
    drawSquareStroke(setting);
  }
};

const renderSpellMenu = () => {
  const { stateImg } = getGState();
  const { staticLayer } = getGState().canvasLayer;
  const staticCtx = staticLayer.getContext('2d');
  staticCtx.fillStyle = '#ffffff';
  staticCtx.font = '83.4px Marvin';
  staticCtx.textAlign = 'center';
  staticCtx.fillText('БОНУСЫ', widthLayers / 2, StartDrawY);
  for (let i = 0; i < amount; i += 1) {
    const posX = borderGapX + (widthSpellIcon + gapX) * i;
    staticCtx.drawImage(stateImg.dataSpells.btnSpell, posX, StartDrawY + 20);
    const corSpell = posX + widthIcon / 2;
    const nameSpell = arrSpell[i];
    staticCtx.drawImage(stateImg.dataSpells[nameSpell], corSpell, StartDrawY + 60);
    staticCtx.textAlign = 'left';
    staticCtx.fillText(prise[nameSpell], corSpell, StartDrawY + 340);
  }
};
export default renderSpellMenu;
