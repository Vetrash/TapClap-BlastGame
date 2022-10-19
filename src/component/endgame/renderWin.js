import getGState from '../../globalState.js';
import getSettings from '../../settings.js';
import sample from './sample.js';

const { widthLayers, heightLayers } = getSettings();
let isStopRender = false;

const renderWin = () => {
  if (!isStopRender) {
    const { canvasLayer, stateImg } = getGState();
    const ctx = canvasLayer.msgLayer.getContext('2d');
    sample();
    const posX = (widthLayers / 2) - (stateImg.dataUI.win.width / 2);
    const posY = (heightLayers / 2) - (stateImg.dataUI.endScore.height / 2)
        - stateImg.dataUI.win.height;
    ctx.drawImage(stateImg.dataUI.win, posX, posY);
    isStopRender = true;
  }
};
export default renderWin;
