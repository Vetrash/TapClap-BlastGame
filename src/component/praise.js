import getGState from '../globalState.js';
import getSettings from '../settings.js';

const { widthLayers, heightLayers } = getSettings();
const { canvasLayer } = getGState();
const ctx = canvasLayer.praiseLayer.getContext('2d');
const corLastPraise = { x: 0, y: 0 };
let timerId;

export const clearPraise = () => {
  ctx.clearRect(corLastPraise.x, corLastPraise.y, 600, 600);
};

const renderPraise = () => {
  const { stateImg, combo } = getGState();
  clearTimeout(timerId);
  clearPraise();
  const corX = Math.floor(Math.random() * (widthLayers - 1200)) + 600;
  const corY = Math.floor(Math.random() * (heightLayers - 1200)) + 600;
  corLastPraise.x = corX;
  corLastPraise.y = corY;
  switch (combo.value) {
    case 3:
      ctx.drawImage(stateImg.dataPraise.great.offCanvas, corX, corY);
      break;
    case 4:
      ctx.drawImage(stateImg.dataPraise.cool.offCanvas, corX, corY);
      break;
    case 5:
      ctx.drawImage(stateImg.dataPraise.wellDone.offCanvas, corX, corY);
      break;
    case 6:
      ctx.drawImage(stateImg.dataPraise.ohYes.offCanvas, corX, corY);
      break;
    case 7:
      ctx.drawImage(stateImg.dataPraise.awesome.offCanvas, corX, corY);
      break;
    default:
      ctx.drawImage(stateImg.dataPraise.awesome.offCanvas, corX, corY);
      break;
  }
  timerId = setTimeout(clearPraise, 1000);
};

export default renderPraise;
