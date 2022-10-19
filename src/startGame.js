import getSettings, { getStartState } from './settings.js';
import getGState from './globalState.js';
import App from './app.js';

const startGame = () => {
  const { canvasLayer } = getGState();
  const startState = getStartState();
  const { widthLayers, heightLayers } = getSettings();
  const keycanvas = Object.keys(canvasLayer);
  keycanvas.forEach((canvas) => {
    const ctx = canvasLayer[canvas].getContext('2d');
    ctx.clearRect(0, 0, widthLayers, heightLayers);
  });
  const keyState = Object.keys(startState);
  keyState.forEach((key) => {
    getGState()[key] = startState[key];
  });
  App();
};
export default startGame;
