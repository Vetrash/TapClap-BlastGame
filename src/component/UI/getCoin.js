import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { coinPrise, borderPrise } = getSettings();

const getCoins = () => {
  const { coin, score } = getGState();
  if (score.value >= score.borderPrise) {
    coin.value += coinPrise;
    score.borderPrise += borderPrise;
  }
};
export default getCoins;
