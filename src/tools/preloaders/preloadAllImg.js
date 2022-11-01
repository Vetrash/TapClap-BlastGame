import preload from './preloadImg.js';
import createOffscreenCanvas from '../createOffscreenCanvas.js';

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
  './assets/images/spells/portal.png',
  './assets/images/spells/bomb.png',
  './assets/images/spells/lightning.png',
];
const terget = [
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
  './assets/images/praise/well-done.png',
  './assets/images/praise/yes.png',
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

const preloadAllimg = async () => {
  const state = await Promise.all([
    preload(dataFigures)
      .then((img) => {
        const arrCanvas = img.map((elem) => createOffscreenCanvas(elem, 171, 192));
        return arrCanvas;
      }),
    preload(dataSpells)
      .then((img) => (
        {
          btnSpell: img[0],
          spellIcon: img[1],
          port: img[1],
          bomb: img[2],
          lightning: img[3],
          star: img[4],
        }
      )),
    preload(dataUI)
      .then((img) => ({
        btnLarge: img[0],
        btnSmall: img[1],
        pause: img[2],
        score: img[3],
        endScore: img[4],
        money: img[5],
        statysBar: img[6],
        click: img[7],
        win: img[8],
        lose: img[9],
      })),
    preload(dataPraise)
      .then((img) => {
        const arrCanvas = img.map((elem) => createOffscreenCanvas(elem, 512, 512));
        return ({
          awesome: arrCanvas[0],
          cool: arrCanvas[1],
          great: arrCanvas[2],
          wellDone: arrCanvas[3],
          ohYes: arrCanvas[4],
        });
      }),
    preload(dataPuff)
      .then((img) => {
        const arrCanvas = img.map((elem) => createOffscreenCanvas(elem, 171, 192, 'center'));
        return arrCanvas;
      }),
    preload(superBlocks)
      .then((img) => {
        const arrCanvas = img.map((elem) => createOffscreenCanvas(elem, 171, 192, 'center'));
        return arrCanvas;
      }),
    preload(terget)
      .then((img) => {
        const arrCanvas = img.map((elem) => createOffscreenCanvas(elem, 171, 192, 'center'));
        return arrCanvas;
      }),
  ])
    .then((res) => (
      {
        dataFigures: res[0],
        dataSpells: res[1],
        dataUI: res[2],
        dataPraise: res[3],
        dataPuff: res[4],
        dataSupBlock: res[5],
        target: res[6],
      }
    ));
  return state;
};

export default preloadAllimg;
