import getGState from '../../globalState.js';
import tableToCor from '../tools/tableToCor.js';

let arrCorPuff = [];

const renderPuff = (cor) => {
  const imgs = getGState().stateImg.dataPuff;
  const canvas = getGState().canvasLayer.effectLayer;
  const ctx = canvas.getContext('2d');
  let numFrame = 0;
  let start = 0;
  const frameDelay = 60;
  const loop = (timestamp) => {
    if (start === 0) { start = timestamp; }
    const stepTime = timestamp - start;
    if (stepTime >= frameDelay * numFrame) {
      ctx.clearRect(cor.x, cor.y, 200, 200);
      if (numFrame < imgs.length) {
        ctx.drawImage(imgs[numFrame].offCanvas, cor.x, cor.y);
        numFrame += 1;
      }
    }
    if (numFrame >= imgs.length) {
      ctx.clearRect(cor.x, cor.y, 200, 200);
      window.cancelAnimationFrame(loop);
    } else {
      requestAnimationFrame(loop);
    }
  };
  requestAnimationFrame(loop);
};

export const renderAllPuff = () => {
  arrCorPuff.forEach((elem) => {
    renderPuff(elem);
  });
  arrCorPuff.length = 0;
};

export const renderAllPuffinArr = (arr) => {
  arr.forEach((elem) => {
    renderPuff(elem);
  });
};

export const managerPuff = (arrCor) => {
  arrCorPuff = tableToCor(arrCor);
};

export default renderPuff;
