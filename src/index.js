import Game from './Game.js';
import preloadAllimg from './tools/preloaders/preloadAllImg.js';
import preloadFont from './tools/preloaders/preloadFont.js';
import windowToCanvasCor from './tools/windowToCanvasCor.js';
import animFramePolifil from './tools/animFramePolifil.js';
import './css/style.css';
import './css/fonts.css';

windowToCanvasCor();
animFramePolifil();
const myGame = new Game();
Promise.all([
  preloadFont(),
  preloadAllimg()
    .then((stateImg) => {
      myGame.saveImg(stateImg);
    }),
])
  .then(() => {
    window.addEventListener('load', () => {
      myGame.createElements();
      myGame.startNewGame();
    });
  });
