import getSettings from '../../settings.js';
import getGState from '../../globalState.js';
import { drawSquareStroke } from '../tools/drawSquare.js';

const { gapY, startDrawY } = getSettings().gameMap;
const {
  amount, gapX, prise, arrSpell,
} = getSettings().spells;
const { sizefigureY } = getSettings().gameMap;

export const clearSelected = () => {
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const StartDrawY = startDrawY + sizefigureY * (dataFigures.height + gapY) + 140;
  const canvas = getGState().canvasLayer.UILayer;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, StartDrawY, canvas.width, StartDrawY + 600);
};

export const selectSpell = () => {
  clearSelected();
  const canvas = getGState().canvasLayer.UILayer;
  const { btnSpell } = getGState().stateImg.dataSpells;
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const borderGapX = (canvas.width - ((btnSpell.width + gapX) * amount)) / 2;
  const StartDrawY = startDrawY + sizefigureY * (dataFigures.height + gapY) + 140;

  const index = arrSpell.findIndex((elem) => elem === getGState().ActivSpell.value);
  if (index !== -1) {
    const lWidth = 10;
    const x1 = borderGapX + index * (btnSpell.width + gapX);
    const x2 = x1 + btnSpell.width;
    const y1 = StartDrawY + lWidth;
    const y2 = y1 + btnSpell.height + lWidth;
    const radius = 65;
    const color = '#ffd700';
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
  const { spellIcon, btnSpell } = getGState().stateImg.dataSpells;
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const borderGapX = (staticLayer.width - ((btnSpell.width + gapX) * amount)) / 2;
  const StartDrawY = startDrawY + sizefigureY * (dataFigures.height + gapY) + 140;
  staticCtx.fillStyle = '#ffffff';
  staticCtx.font = '83.4px Marvin';
  staticCtx.textAlign = 'center';
  staticCtx.fillText('БОНУСЫ', staticLayer.width / 2, StartDrawY);
  for (let i = 0; i < amount; i += 1) {
    const posX = borderGapX + (btnSpell.width + gapX) * i;
    staticCtx.drawImage(stateImg.dataSpells.btnSpell, posX, StartDrawY + 20);
    const corSpell = posX + spellIcon.width / 2;
    const nameSpell = arrSpell[i];
    staticCtx.drawImage(stateImg.dataSpells[nameSpell], corSpell, StartDrawY + 60);
    staticCtx.textAlign = 'left';
    staticCtx.fillText(prise[nameSpell], corSpell, StartDrawY + 340);
  }
};
export default renderSpellMenu;
