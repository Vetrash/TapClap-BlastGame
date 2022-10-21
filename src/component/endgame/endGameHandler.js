// eslint-disable-next-line import/no-cycle
import startGame from '../../startGame.js';
import getGState from '../../globalState.js';

const { UILayer } = getGState().canvasLayer;
const endGameHandler = (loc) => {
  const { stateImg } = getGState();
  const { width, height } = stateImg.dataUI.brnLarge;
  const posXbtn = (UILayer.width / 2) - (width / 2);
  const posYbtn = (UILayer.height / 2) + 520;
  if (loc.y >= posYbtn && loc.y <= posYbtn + height) {
    if (loc.x >= posXbtn && loc.x <= posXbtn + width) {
      setTimeout(startGame, 100);
    }
  }
};
export default endGameHandler;
