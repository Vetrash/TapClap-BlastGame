import getGState from '../../globalState.js';
import tableToCor from '../tools/tableToCor.js';

let arrCorPuff = [];

const renderPuff = (cor, i = 0) => {
  const imgs = getGState().stateImg.dataPuff;
  const canvas = getGState().canvasLayer.effectLayer;
  const ctx = canvas.getContext('2d');
  if (i < imgs.length) {
    ctx.clearRect(cor.x, cor.y, 200, 200);
    ctx.drawImage(imgs[i].offCanvas, cor.x, cor.y);
    setTimeout(renderPuff, 60, cor, i + 1);
  } else {
    ctx.clearRect(cor.x, cor.y, 200, 200);
  }
};

export const renderAllPuff = () => {
  arrCorPuff.forEach((elem) => {
    renderPuff(elem);
  });
  arrCorPuff.length = 0;
};

export const managerPuff = (arrCor) => {
  arrCorPuff = tableToCor(arrCor);
};

export default renderPuff;
