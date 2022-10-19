import getGState from '../../globalState.js';
import getSettings from '../../settings.js';

const { coastLevel } = getSettings();

const managerEndGame = () => {
  const { gameStatus, click, score } = getGState();
  if (score.value >= coastLevel) {
    gameStatus.value = 'win';
  } else if (click.value <= 0) {
    gameStatus.value = 'lose';
  }
};
export default managerEndGame;
