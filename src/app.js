import renderSpellMenu, { selectSpell } from './component/spellMenu/renderSpellMenu.js';
import getSettings from './settings.js';
import windowToCanvasCor from './component/tools/windowToCanvasCor.js';
import { renderStartGameTable, renderFigures, renderPort } from './component/gameTable/rendersGameTable.js';
import createGameTable from './component/gameTable/createGameTable.js';
import fulingFigures from './component/gameTable/fulingFigures.js';
import handlerGameTable from './component/gameTable/handlerGameTable.js';
import renderUIActive from './component/UI/renderUIActive.js';
import renderUIStatic from './component/UI/renderUIStatic.js';
import handlerUI from './component/UI/handlerUI.js';
import getGState from './globalState.js';
import { updateProgress } from './component/UI/drawLoadLine.js';
import { handlerSpell } from './component/spellMenu/handlerSpell.js';
import renderPraise from './component/praise.js';
import { managerPuff, renderAllPuff } from './component/effects/puff.js';
import getCoins from './component/UI/getCoin.js';
import renderWin from './component/endgame/renderWin.js';
import renderLose from './component/endgame/renderLose.js';
// eslint-disable-next-line import/no-cycle
import endGameHandler from './component/endgame/endGameHandler.js';
import shuffle from './component/shuffle.js';
import { clearSelectedPort } from './component/spellMenu/portRender.js';
import animFramePolifil from './component/tools/animFramePolifil.js';
import managerEndGame from './component/endgame/managerEndGame.js';

let lastTime;

const { gapY, startDrawY, sizefigureY } = getSettings().gameMap;
const { minLengthChain } = getSettings();

const update = async (dt) => {
  if (getGState().gameStatus.value !== 'gameover') {
    if (getGState().gameStatus.value === 'fuling') {
      fulingFigures(dt);
    }
    if (getGState().score.value !== getGState().score.forProgress) {
      updateProgress(dt);
      getCoins();
    }
  }
  if (getGState().gameStatus.value === 'wait') {
    managerEndGame();
  }
};

const render = async () => {
  if (getGState().gameStatus.value !== 'gameover') {
    if (getGState().isRender.figures === true) {
      renderAllPuff();
      renderFigures();
      if (getGState().gameStatus.value === 'wait') {
        getGState().isRender.figures = false;
      }
    }
    if (getGState().gametable.portFig.length !== 0) {
      renderAllPuff();
      renderPort();
      renderUIActive();
    }
    if (getGState().score.value !== getGState().score.forProgress) {
      renderUIActive();
    }
    if (getGState().combo.value > 3) {
      renderPraise();
      getGState().combo.value = 0;
    }
    if (getGState().isRender.spellSekect === true) {
      selectSpell();
      getGState().isRender.spellSekect = false;
    }
    if (getGState().gametable.arrClick.length !== 0
    && getGState().ActivSpell.value !== 'port') {
      console.log('clearport');
      clearSelectedPort();
      getGState().gametable.arrClick.length = 0;
    }
    if (getGState().gameStatus.value === 'win') {
      renderWin();
    }
    if (getGState().gameStatus.value === 'lose') {
      renderLose();
    }
  }
};

const mineLoop = () => {
  const now = Date.now();
  const dt = (now - lastTime) / 1000.0;
  update(dt);
  render();
  if (getGState().gametable.chainArr.length > 0
      && getGState().gameStatus.value === 'wait') {
    shuffle();
    getGState().gametable.chainArr.length = 0;
  }
  lastTime = now;
  requestAnimationFrame(mineLoop);
};

const eventHandler = (e) => {
  const dataFigures = getGState().stateImg.dataFigures[0].offCanvas;
  const StartDrawSpellY = startDrawY + sizefigureY * (dataFigures.height + gapY) + 140;
  if (getGState().gameStatus.value === 'gameover') {
    const canvas = getGState().canvasLayer.gameTableLayer;
    const loc = windowToCanvasCor(canvas, e.clientX, e.clientY);
    endGameHandler(loc);
  }
  if (getGState().gameStatus.value === 'wait') {
    const canvas = getGState().canvasLayer.gameTableLayer;
    const loc = windowToCanvasCor(canvas, e.clientX, e.clientY);
    if (loc.y < startDrawY) {
      handlerUI(loc);
    } else if (loc.y < StartDrawSpellY) {
      handlerGameTable(loc);
      getGState().isRender.spellSekect = true;
    } else {
      handlerSpell(loc);
      getGState().isRender.spellSekect = true;
    }
    if (getGState().gametable.chainArr.length >= minLengthChain) {
      managerPuff(getGState().gametable.chainArr);
    } else if (getGState().gametable.portFig.length !== 0) {
      managerPuff(getGState().gametable.portFig);
    }
  }
};

window.addEventListener('click', eventHandler);

const App = () => {
  animFramePolifil();
  createGameTable();
  renderStartGameTable();
  renderUIStatic();
  renderUIActive();
  renderSpellMenu();
  mineLoop();
};

export default App;
