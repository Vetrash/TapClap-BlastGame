import Game from '../Game.js';
import WindowToCanvasCor from './WindowToCanvasCor.js';
import AnimFramePolifil from './AnimFramePolifil.js';
import '../css/style.css';
import '../css/fonts.css';
import Preload from './Preload.js';

const dataFigures = [
  './assets/images/blocks/blue.png',
  './assets/images/blocks/green.png',
  './assets/images/blocks/purple.png',
  './assets/images/blocks/red.png',
  './assets/images/blocks/yellow.png',
];
const superBlocks = [
  './assets/images/spells/bloks/killAll.png',
  './assets/images/spells/bloks/bomb.png',
  './assets/images/spells/bloks/lightning.png',
  './assets/images/spells/bloks/killRow.png',
  './assets/images/spells/bloks/killCol.png',
];
const dataSpells = [
  './assets/images/UI/buttons/btn.png',
  './assets/images/spells/port.png',
  './assets/images/spells/bomb.png',
  './assets/images/spells/lightning.png',
];
const target = [
  './assets/images/effects/target.png',
];
const dataUI = [
  './assets/images/UI/buttons/btnBigLarge.png',
  './assets/images/UI/buttons/btnSmall.png',
  './assets/images/UI/buttons/pause.png',
  './assets/images/UI/buttons/score.png',
  './assets/images/UI/endScore.png',
  './assets/images/UI/buttons/money.png',
  './assets/images/UI/statysBar.png',
  './assets/images/UI/buttons/click.png',
  './assets/images/UI/win.png',
  './assets/images/UI/lose.png',
];
const dataPraise = [
  './assets/images/praise/awesome.png',
  './assets/images/praise/cool.png',
  './assets/images/praise/great.png',
  './assets/images/praise/wellDone.png',
  './assets/images/praise/ohYes.png',
];
const dataPuff = [
  './assets/images/effects/puff/1.png',
  './assets/images/effects/puff/2.png',
  './assets/images/effects/puff/3.png',
  './assets/images/effects/puff/4.png',
  './assets/images/effects/puff/5.png',
  './assets/images/effects/puff/6.png',
  './assets/images/effects/puff/7.png',
  './assets/images/effects/puff/8.png',
];
const arrPreload = [
  { arr: dataFigures, name: 'dataFigures', type: 'arr' },
  { arr: superBlocks, name: 'dataSupBlock', type: 'arr' },
  { arr: dataSpells, name: 'dataSpells', type: 'obj' },
  { arr: target, name: 'target', type: 'arr' },
  { arr: dataUI, name: 'dataUI', type: 'obj' },
  { arr: dataPraise, name: 'dataPraise', type: 'obj' },
  { arr: dataPuff, name: 'dataPuff', type: 'arr' },
];

class Initialization {
  static run() {
    WindowToCanvasCor.addToWindow();
    AnimFramePolifil.addCancel();
    AnimFramePolifil.addRequest();
    const myGame = new Game();
    Promise.all([
      Preload.font('Marvin', 'url(../../assets/fonts/Marvin.woff)'),
      Preload.imgByArr(arrPreload)
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
  }
}
export default Initialization;
