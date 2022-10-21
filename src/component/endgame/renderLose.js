import getGState from '../../globalState.js';
import sample from './sample.js';

export const renderLosing = () => {
  const { canvasLayer, stateImg } = getGState();
  const ctx = canvasLayer.msgLayer.getContext('2d');
  sample();
  const posX = (canvasLayer.msgLayer.width / 2) - (stateImg.dataUI.lose.width / 2);
  const posY = (canvasLayer.msgLayer.height / 2) - (stateImg.dataUI.endScore.height / 2)
    - stateImg.dataUI.lose.height;
  ctx.drawImage(stateImg.dataUI.lose, posX, posY);
};
export default renderLosing;
