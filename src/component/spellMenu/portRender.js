import getGState from '../../globalState.js';
import tableToCor from '../tools/tableToCor.js';

export const clearSelectedPort = () => {
  const { arrClick } = getGState().gametable;
  const { dataFugures } = getGState().stateImg;
  const canvas = getGState().canvasLayer.UILayer;
  const ctx = canvas.getContext('2d');
  const loc = tableToCor(arrClick[0]);
  const widthFig = dataFugures[0].offCanvas.width;
  const heightFig = dataFugures[0].offCanvas.height;
  ctx.clearRect(loc.x, loc.y, widthFig, heightFig);
};

export const selectPortPos = () => {
  const { arrClick } = getGState().gametable;
  const canvas = getGState().canvasLayer.UILayer;
  const ctx = canvas.getContext('2d');
  const target = getGState().stateImg.target[0].offCanvas;
  const loc = tableToCor(arrClick[0]);
  ctx.drawImage(target, loc.x, loc.y + 10);
};
