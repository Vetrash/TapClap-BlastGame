import getSettings from "../../settings"
import getGState from "../../globalState"

const { coinPrise, borderPrise } = getSettings();

const getCoins = () => {
  const { coin, score } = getGState();
  if (score.value >= score.borderPrise) {
    coin.value += coinPrise;
    score.borderPrise += borderPrise;
  }
};
export default getCoins;