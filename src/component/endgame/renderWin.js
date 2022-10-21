import getGState from '../../globalState.js';
import sample from './sample.js';

let isStopRender = false;

const renderWin = () => {
  if (!isStopRender) {
    const { canvasLayer, stateImg } = getGState();
    const ctx = canvasLayer.msgLayer.getContext('2d');
    sample();
    const posX = (canvasLayer.msgLayer.width / 2) - (stateImg.dataUI.win.width / 2);
    const posY = (canvasLayer.msgLayer.height / 2) - (stateImg.dataUI.endScore.height / 2)
        - stateImg.dataUI.win.height;
    ctx.drawImage(stateImg.dataUI.win, posX, posY);
    isStopRender = true;
  }
};
export default renderWin;
