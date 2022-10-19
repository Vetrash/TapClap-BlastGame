import { drawSquareFill, drawSquareStroke } from '../tools/drawSquare.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;
const { widthFigure, heightFigure } = getSettings().figure;

const createGameTable = () => {
  const { canvasLayer, gametable } = getGState();
  const imgs = getGState().stateImg;
  const borderGapX = (canvasLayer.gameTableLayer.width - ((widthFigure + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (heightFigure + gapY);

  drawSquareFill({
    x1: borderGapX - 30, x2: canvasLayer.gameTableLayer.width - borderGapX + 30, y1: startDrawY - 20, y2: startDrawY + 1807, radius: 80, color: '#0d233d', canvas: canvasLayer.staticLayer,
  });
  drawSquareStroke({
    x1: borderGapX - 30, x2: canvasLayer.gameTableLayer.width - borderGapX + 30, y1: startDrawY - 20, y2: startDrawY + 1807, radius: 60, color: '#77bacb', canvas: canvasLayer.staticLayerUp, lWidth: 30,
  });
  const arrFigures = [];
  for (let row = 0; row < 9; row += 1) {
    const collumnFigures = [];
    for (let collumn = 0; collumn < 9; collumn += 1) {
      const indexType = Math.floor(Math.random() * imgs.dataFugures.length);
      const corY = endDraw - collumn * (heightFigure + gapY) - heightFigure;
      const corX = borderGapX + row * (widthFigure + gapX);
      const img = imgs.dataFugures[indexType].offCanvas;
      const type = imgs.dataFugures[indexType].name;
      collumnFigures.push({
        corX, corY, img, type,
      });
    }
    arrFigures.push(collumnFigures);
  }
  gametable.figures = [...arrFigures];
  gametable.fuguresImg = imgs.dataFugures;
};

export default createGameTable;
