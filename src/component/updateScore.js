import getGState from '../globalState.js';
import getSettings from '../settings.js';

const { sizefigureX, sizefigureY } = getSettings().gameMap;
const { increaseSet, coastFigure } = getSettings();

const updateScore = () => {
  const { score } = getGState();
  const { chainArr } = getGState().gametable;
  if (chainArr.length < sizefigureX * sizefigureY) {
    score.value += Math.round(increaseSet ** chainArr.length * coastFigure);
  } else {
    score.value += Math.round(chainArr.length * (coastFigure / 10));
  }
  const lengthScore = String(score.value).length;

  if (lengthScore < 6) {
    score.str = String(score.value);
  } else if (lengthScore < 9) {
    score.str = `${String(score.value).slice(0, 3)}К`;
  } else if (lengthScore < 12) {
    score.str = `${String(score.value).slice(0, 3)}М`;
  }
  getGState().progressLevel = score.value / getGState().maxLevelScore;
};
export default updateScore;
