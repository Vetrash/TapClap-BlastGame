import _ from 'lodash';
import getHandingFigure from './getHandingFigure.js';
import createNewFigures from './createNewFigures.js';
import clearBrokenFigures from './clearBrokenFigures.js';
import getSettings from '../../settings.js';
import updateScore from '../updateScore.js';
import getGState from '../../globalState.js';
import managerEndGame from '../endgame/managerEndGame.js';
import getSpell from '../spells/getSpell.js';

const { increaseSet, coastFigure, minChainToSBlock } = getSettings();

const checkPostClick = () => {
  const { gametable, combo, stateImg } = getGState();
  if (gametable.chainArr.length >= 2) {
    const arrSupBlock = [];
    gametable.chainArr.forEach((elem) => {
      const { type } = gametable.figures[elem.col][elem.row];
      const index = _.findIndex(stateImg.dataSupBlock, { name: type });
      if (index !== -1) {
        const x = gametable.figures[elem.col][elem.row].corX;
        const y = gametable.figures[elem.col][elem.row].corY;
        arrSupBlock.push({ loc: { x, y }, type });
      }
    });
    if (arrSupBlock.length !== 0) {
      arrSupBlock.forEach((elem) => {
        getSpell(elem.loc, elem.type);
      });
    } else if (gametable.chainArr.length >= minChainToSBlock) {
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
    getGState().score.value += Math.round(increaseSet ** gametable.chainArr.length * coastFigure);
    updateScore();
    clearBrokenFigures();
    getGState().gameStatus.value = 'fuling';
    managerEndGame();
  }
  combo.value = gametable.chainArr.length;
};
export default checkPostClick;
