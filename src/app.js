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
import endGameHandler from './component/endgame/endGameHandler.js'

let lastTime;

const { gapY, startDrawY } = getSettings().gameMap;
const { heightFigure } = getSettings().figure;
const StartDrawSpellY = startDrawY + 9 * (heightFigure + gapY) + 140;

const update = (dt) => {
  if (getGState().gameStatus.value !== 'win' || getGState().gameStatus.value !== 'losing') {
    if (getGState().gameStatus.value === 'fuling') {
      fulingFigures(dt);
    }
    if (getGState().score.value !== getGState().score.forProgress) {
      updateProgress();
      getCoins();
    }
  }
};

const render = () => {
  if (getGState().isRender.figures === true) {
    renderAllPuff();
    renderFigures();
  } else if (getGState().gametable.portFig.length !== 0) {
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
  if (getGState().ActivSpell.value !== null) {
    selectSpell();
  }
  if (getGState().gameStatus.value === 'win') {
    renderWin();
    getGState().gameStatus.value = 'gameover';
  }
  if (getGState().gameStatus.value === 'lose') {
    renderLose();
    getGState().gameStatus.value = 'gameover';
  }
};

const mineLoop = () => {
  const now = Date.now();
  const dt = (now - lastTime) / 1000.0;
  update(dt);
  render();
  lastTime = now;
  requestAnimationFrame(mineLoop);
};

const eventHandler = (e) => {
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
    } else {
      handlerSpell(loc);
    }
    if (getGState().gametable.chainArr.length !== 0) {
      managerPuff(getGState().gametable.chainArr);
    } else if (getGState().gametable.portFig.length !== 0) {
      managerPuff(getGState().gametable.portFig);
    }
  }
};

window.addEventListener('click', eventHandler);

const App = () => {
  createGameTable();
  renderStartGameTable();
  renderUIStatic();
  renderUIActive();
  renderSpellMenu();
  mineLoop();
};

export default App;
