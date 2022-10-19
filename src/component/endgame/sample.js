import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { widthLayers, heightLayers } = getSettings();

const sample = () => {
  const {
    canvasLayer, stateImg, score, click,
  } = getGState();
  const ctx = canvasLayer.msgLayer.getContext('2d');
  const posX = (widthLayers / 2) - (stateImg.dataUI.endScore.width / 2);
  const posY = (heightLayers / 2) - (stateImg.dataUI.endScore.height / 2);
  ctx.drawImage(stateImg.dataUI.endScore, posX, posY);
  const fontSize = 83.4;
  ctx.fillStyle = '#ffffff';
  ctx.font = `${fontSize}px Marvin`;
  ctx.textAlign = 'center';
  const textPosX = (widthLayers / 2);
  const textPosY = (heightLayers / 2) + 220;
  ctx.fillText('Очки:', textPosX, textPosY);
  ctx.font = '140px Marvin';
  ctx.fillText(score.value, textPosX, textPosY + 140);
  const clickTextPosY = (heightLayers / 2) - 120;
  ctx.font = '231px Marvin';
  ctx.fillText(click.value, textPosX, clickTextPosY);
  const posXbtn = (widthLayers / 2) - (stateImg.dataUI.brnLarge.width / 2);
  const posYbtn = textPosY + 300;
  ctx.drawImage(stateImg.dataUI.brnLarge, posXbtn, posYbtn);
  ctx.font = '83.4px Marvin';
  ctx.fillText('Повторим?', textPosX, posYbtn + 100);
};
export default sample;
