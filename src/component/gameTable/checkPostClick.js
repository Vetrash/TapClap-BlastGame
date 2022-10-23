import _ from 'lodash';
import getHandingFigure from './getHandingFigure.js';
import createNewFigures from './createNewFigures.js';
import clearBrokenFigures from './clearBrokenFigures.js';
import getSettings from '../../settings.js';
import updateScore from '../updateScore.js';
import getGState from '../../globalState.js';
import managerEndGame from '../endgame/managerEndGame.js';
import getSpell from '../spells/getSpell.js';

const { minChainToSBlock, minLengthChain } = getSettings();
const { arrSpell } = getSettings().spells;

const checkPostClick = () => {
  const {
    gametable, combo, stateImg, ActivSpell,
  } = getGState();
  if (gametable.chainArr.length === 0) { return; }
  const figStart = gametable.chainArr[0];
  const { type, corX, corY } = gametable.figures[figStart.col][figStart.row];
  const hasChainSpell = _.includes(arrSpell, type);
  if (hasChainSpell) {
    getSpell({ y: corY, x: corX }, type);
  } else if (gametable.chainArr.length >= minChainToSBlock && ActivSpell.value === 'none') {
    const indexType = Math.floor(Math.random() * stateImg.dataSupBlock.length);
    const img = stateImg.dataSupBlock[indexType].offCanvas;
    const newType = stateImg.dataSupBlock[indexType].name;
    const cor = gametable.chainArr.shift();
    gametable.figures[cor.col][cor.row].img = img;
    gametable.figures[cor.col][cor.row].type = newType;
    gametable.watchZone[cor.col] = cor.row;
    gametable.handingFigure.push(cor);
  }

  if (hasChainSpell || gametable.chainArr.length >= minLengthChain) {
    getHandingFigure();
    createNewFigures();
    updateScore();
    clearBrokenFigures();
    getGState().gameStatus.value = 'fuling';
    managerEndGame();
    ActivSpell.value = 'none';
  }
  combo.value = gametable.chainArr.length;
};
export default checkPostClick;
