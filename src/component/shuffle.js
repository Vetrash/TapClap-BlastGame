import _ from 'lodash';
import checkChain from './tools/checkChain.js';
import getSettings from '../settings.js';
import getGState from '../globalState.js';
import { renderFigures } from './gameTable/rendersGameTable.js';
import { renderAllPuffinArr } from './effects/puff.js';

const { sizefigureX, sizefigureY } = getSettings().gameMap;
const { shufleMax } = getSettings();
const { prise, arrSpell } = getSettings().spells;
const sortPriseSpell = _.sortBy(Object.values(prise));
let timerId;

const shuffle = (sumShuffle = 0) => {
  if (sortPriseSpell[0] > getGState().coin.value) {
    const { figures } = getGState().gametable;
    const fig = _.cloneDeep(figures).flat();
    const typeFig = _.map(fig, 'type');
    const intersection = _.intersection(typeFig, arrSpell);
    if (intersection.length === 0) {
      clearTimeout(timerId);
      if (sumShuffle >= shufleMax) { return; }
      if (!checkChain()) {
        const shuffleArr = _.shuffle(fig);
        const puffArr = [];
        for (let i = 0; i < sizefigureX; i += 1) {
          for (let k = 0; k < sizefigureY; k += 1) {
            const index = i * sizefigureY + k;
            figures[i][k].img = shuffleArr[index].img;
            figures[i][k].type = shuffleArr[index].type;
            const x = figures[i][k].corX;
            const y = figures[i][k].corY;
            puffArr.push({ y, x });
          }
        }
        getGState().gametable.watchZone = Array(sizefigureX).fill(sizefigureY);
        renderAllPuffinArr(puffArr);
        renderFigures();
        timerId = setTimeout(shuffle, 5000, sumShuffle + 1);
      }
    }
  }
};

export default shuffle;
