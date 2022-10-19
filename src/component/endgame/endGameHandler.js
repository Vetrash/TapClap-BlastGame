import startGame from '../../startGame.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { heightLayers, widthLayers } = getSettings();

const endGameHandler = (loc) => {
  const { stateImg } = getGState();
  const { width, height } = stateImg.dataUI.brnLarge;
  const posXbtn = (widthLayers / 2) - (width / 2);
  const posYbtn = (heightLayers / 2) + 520;
  if (loc.y >= posYbtn && loc.y <= posYbtn + height) {
    if (loc.x >= posXbtn && loc.x <= posXbtn + width) {
      setTimeout(startGame, 100);
    }
  }
};
export default endGameHandler;
