import app from './app.js';
import startGame from './startGame.js';
import preloadAllimg from './component/tools/preloadAllImg.js';
import preloadFont from './component/tools/preloadFont.js';
import getGState from './globalState.js';
import './css/style.css';
import './css/fonts.css';

const start = async () => {
  Promise.all([
    preloadFont(),
    preloadAllimg()
      .then((stateImg) => {
        getGState().stateImg = stateImg;
      }),
  ])
    .then(() => {
      window.addEventListener('load', () => {
        startGame();
      });
    });
};

start();
