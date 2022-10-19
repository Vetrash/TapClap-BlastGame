import getGState from '../globalState.js';

const updateScore = () => {
  const lengthScore = String(getGState().score.value).length;
  const { score } = getGState().score.value;
  if (lengthScore < 6) {
    getGState().score.str = String(score);
  } else if (lengthScore < 9) {
    getGState().score.str = `${String(score).slice(0, 3)}К`;
  } else if (lengthScore < 12) {
    getGState().score.str = `${String(score).slice(0, 3)}М`;
  }
  getGState().progressLevel = score / getGState().maxLevelScore;
};
export default updateScore;
