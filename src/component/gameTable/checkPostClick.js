import _ from 'lodash';
import getHandingFigure from './getHandingFigure.js';
import createNewFigures from './createNewFigures.js';
import clearBrokenFigures from './clearBrokenFigures.js';
import getSettings from '../../settings.js';
import updateScore from '../updateScore.js';
import getGState from '../../globalState.js';
import managerEndGame from '../endgame/managerEndGame.js';
import getSpell from '../spells/getSpell.js';

const {
  increaseSet, coastFigure, minChainToSBlock, minLengthChain,
} = getSettings();
const { arrSpell } = getSettings().spells;
const { sizefigureX, sizefigureY } = getSettings().gameMap;

const checkPostClick = () => {
  const { gametable, combo, stateImg } = getGState();
  if (gametable.chainArr.length === 1) {
    const elem = gametable.chainArr[0];
    const { type, corX, corY } = gametable.figures[elem.col][elem.row];
    if (_.includes(arrSpell, type)) {
      getSpell({ y: corY, x: corX }, type);
    }
  }
  if (gametable.chainArr.length >= minLengthChain) {
    const arrType = gametable.chainArr.map((elem) => gametable.figures[elem.col][elem.row].type);
    const supBlocksInChain = _.intersection(arrType, arrSpell);
    console.log(supBlocksInChain);
    if (gametable.chainArr.length >= minChainToSBlock && supBlocksInChain.length === 0) {
      const indexType = Math.floor(Math.random() * stateImg.dataSupBlock.length);
      const img = stateImg.dataSupBlock[indexType].offCanvas;
      const type = stateImg.dataSupBlock[indexType].name;
      const cor = gametable.chainArr.shift();
      gametable.figures[cor.col][cor.row].img = img;
      gametable.figures[cor.col][cor.row].type = type;
      gametable.watchZone[cor.col] = cor.row;
      gametable.handingFigure.push(cor);
    }
    getHandingFigure();
    createNewFigures();
    if (gametable.chainArr.length < sizefigureX * sizefigureY) {
      getGState().score.value += Math.round(increaseSet ** gametable.chainArr.length * coastFigure);
    } else {
      getGState().score.value += Math.round(gametable.chainArr.length * coastFigure);
    }
    updateScore();
    clearBrokenFigures();
    getGState().gameStatus.value = 'fuling';
    managerEndGame();
  }
  combo.value = gametable.chainArr.length;
};
export default checkPostClick;
