import { getStartState } from './settings.js';
import getGState from './globalState.js';
// eslint-disable-next-line import/no-cycle
import App from './app.js';

const startGame = () => {
  const { canvasLayer } = getGState();
  const startState = getStartState();
  const keycanvas = Object.keys(canvasLayer);
  keycanvas.forEach((canvas) => {
    const ctx = canvasLayer[canvas].getContext('2d');
    ctx.clearRect(0, 0, canvasLayer[canvas].width, canvasLayer[canvas].height);
  });
  const keyState = Object.keys(startState);
  keyState.forEach((key) => {
    getGState()[key] = startState[key];
  });
  keycanvas.forEach((canvas) => {
    const displayWidth = document.documentElement.clientWidth;
    const displayHeight = document.documentElement.clientHeight;
    const canvasWidth = canvasLayer[canvas].width;
    const canvasHeight = canvasLayer[canvas].height;
    const scaleX = Math.floor((displayWidth / canvasWidth) * 100) / 100;
    const scaleY = Math.floor((displayHeight / canvasHeight) * 100) / 100;
    if (scaleX < scaleY) {
      canvasLayer[canvas].style.width = `${canvasWidth * scaleX}px`;
      canvasLayer[canvas].style.height = `${canvasHeight * scaleX}px`;
    } else {
      canvasLayer[canvas].style.width = `${canvasWidth * scaleY}px`;
      canvasLayer[canvas].style.height = `${canvasHeight * scaleY}px`;
    }
  });
  App();
};
export default startGame;
