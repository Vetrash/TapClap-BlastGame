import getGState from '../../globalState.js';

const getHandingFigure = () => {
  const { gametable } = getGState();
  gametable.handingFigure.length = 0;
  gametable.stopFigures.length = 0;
  gametable.chainArr.forEach((elem) => {
    for (let i = 0; elem.row + i < 9; i += 1) {
      gametable.handingFigure.push(gametable.figures[elem.col][elem.row + i]);
    }
  });
};
export default getHandingFigure;
