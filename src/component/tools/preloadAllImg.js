import preload from './preloadImg.js';
import createOffscreenCanvas from './createOffscreenCanvas.js';

const dataFugures = [
  './assets/images/blue_294.png',
  './assets/images/green_290.png',
  './assets/images/purple_293.png',
  './assets/images/red_292.png',
  './assets/images/yellow_291.png',
];
const superBlocks = [
  './assets/images/killAll.png',
  './assets/images/bomb.png',
  './assets/images/lightning.png',
  './assets/images/killRow.png',
  './assets/images/killCol.png',
];

const dataSpells = [
  './assets/images/btn.png',
  './assets/images/portal.png',
  './assets/images/bomb.png',
  './assets/images/lightning.png',
  './assets/images/star.png',
];
const terget = [
  './assets/images/target.png',
];

const dataUI = [
  './assets/images/brnBigLarge.png',
  './assets/images/btnSmall.png',
  './assets/images/pause.png',
  './assets/images/score.png',
  './assets/images/endScore.png',
  './assets/images/money.png',
  './assets/images/statysBar.png',
  './assets/images/click.png',
  './assets/images/win.png',
  './assets/images/lose.png',
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
    preload(dataFugures)
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
        brnLarge: img[0],
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
        const arrCanvas = img.map((elem) => createOffscreenCanvas(elem, 200, 200));
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
        dataFugures: res[0],
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
