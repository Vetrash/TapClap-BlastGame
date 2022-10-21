import { drawSquareFill, drawSquareStroke } from '../tools/drawSquare.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;

const createGameTable = () => {
  const { gametable, canvasLayer } = getGState();
  const { gameTableLayer } = canvasLayer;
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;

  const imgs = getGState().stateImg;
  const borderGapX = (gameTableLayer.width - ((dataFigures.width + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (dataFigures.height + gapY);

  drawSquareFill({
    x1: borderGapX - 30, x2: gameTableLayer.width - borderGapX + 30, y1: startDrawY - 20, y2: endDraw + 40, radius: 80, color: '#0d233d', canvas: canvasLayer.staticLayer,
  });
  drawSquareStroke({
    x1: borderGapX - 30, x2: canvasLayer.gameTableLayer.width - borderGapX + 30, y1: startDrawY - 20, y2: endDraw + 40, radius: 60, color: '#77bacb', canvas: canvasLayer.staticLayerUp, lWidth: 30,
  });
  const arrFigures = [];
  for (let row = 0; row < sizefigureX; row += 1) {
    const collumnFigures = [];
    for (let collumn = 0; collumn < sizefigureY; collumn += 1) {
      const indexType = Math.floor(Math.random() * imgs.dataFugures.length);
      const corY = endDraw - collumn * (dataFigures.height + gapY) - dataFigures.height;
      const corX = borderGapX + row * (dataFigures.width + gapX);
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
