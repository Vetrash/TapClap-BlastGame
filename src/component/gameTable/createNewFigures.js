import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, startDrawY,
} = getSettings().gameMap;

const createNewFigures = () => {
  const { gametable } = getGState();
  const { gameTableLayer } = getGState().canvasLayer;
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;

  const borderGapX = (gameTableLayer.width - ((dataFigures.width + gapX) * sizefigureX)) / 2;
  const countAddet = Array(9).fill(0);
  gametable.chainArr.forEach((elem) => {
    if (countAddet[elem.col] <= 9) {
      countAddet[elem.col] += 1;
    }
  });
  countAddet.forEach((elem, index) => {
    if (elem !== 0) {
      const corX = borderGapX + index * (dataFigures.width + gapX);
      for (let i = 1; i <= elem; i += 1) {
        const indexType = Math.floor(Math.random() * gametable.fuguresImg.length);
        const img = gametable.fuguresImg[indexType].offCanvas;
        const type = gametable.fuguresImg[indexType].name;
        const corY = (startDrawY - i * (dataFigures.height + gapY));
        gametable.figures[index].push({
          corX, corY, img, type,
        });
        gametable.handingFigure.push(gametable.figures[index][gametable.figures[index].length - 1]);
      }
    }
  });
};
export default createNewFigures;
