import getGState from '../../globalState.js';
import getSettings from '../../settings.js';
import sample from './sample.js';

const { widthLayers, heightLayers } = getSettings();

export const renderLosing = () => {
  const { canvasLayer, stateImg } = getGState();
  const ctx = canvasLayer.msgLayer.getContext('2d');
  sample();
  const posX = (widthLayers / 2) - (stateImg.dataUI.lose.width / 2);
  const posY = (heightLayers / 2) - (stateImg.dataUI.endScore.height / 2)
    - stateImg.dataUI.lose.height;
  ctx.drawImage(stateImg.dataUI.lose, posX, posY);
};
export default renderLosing;
