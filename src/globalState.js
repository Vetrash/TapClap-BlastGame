import getSettings from './settings.js';

const gameTableLayer = document.getElementById('game-layer');
const staticLayer = document.getElementById('static-layer');
const staticLayerUp = document.getElementById('static-layer-up');
const UILayer = document.getElementById('UI-layer');
const effectLayer = document.getElementById('effect-layer');
const praiseLayer = document.getElementById('praise-layer');
const msgLayer = document.getElementById('msg-layer');
const { sizefigureX, sizefigureY } = getSettings().gameMap;

const globalState = {

  gameStatus: { value: 'wait' },
  ActivSpell: { value: 'none' },
  combo: { value: 0 },
  coin: { value: 30 },
  click: { value: 1 },
  score: {
    value: 0, str: '0', forProgress: 0, borderPrise: 1000,
  },
  progress: { value: 0 },
  stateImg: [],
  gametable: {
    fuguresImg: [],
    figures: [],
    chainArr: [],
    watchChainArr: [],
    handingFigure: [],
    stopFigures: [],
    status: 'wait',
    watchZone: Array(sizefigureX).fill(sizefigureY),
    arrClick: [],
    portFig: [],
  },
  canvasLayer: {
    gameTableLayer,
    staticLayer,
    staticLayerUp,
    UILayer,
    effectLayer,
    praiseLayer,
    msgLayer,
  },
  isRender: {
    figures: false,
    port: false,
    ui: false,
    spellSekect: false,
    endGame: false,
  },
};

const getGState = () => globalState;

export default getGState;
