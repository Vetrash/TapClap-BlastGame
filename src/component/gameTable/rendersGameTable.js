import { drawSquareClip } from '../tools/drawSquare.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;
const { widthFigure, heightFigure } = getSettings().figure;

export const renderStartGameTable = () => {
  const { canvasLayer, gametable } = getGState();
  const gameTableCtx = canvasLayer.gameTableLayer.getContext('2d');
  gametable.figures.forEach((collumn) => {
    collumn.forEach((elem) => {
      gameTableCtx.drawImage(elem.img, elem.corX, elem.corY);
    });
  });
};

export const renderFigures = () => {
  const { gametable } = getGState();
  const { gameTableLayer } = getGState().canvasLayer;
  const gameTableCtx = gameTableLayer.getContext('2d');
  const borderGapX = (gameTableLayer.width - ((widthFigure + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (heightFigure + gapY);
  drawSquareClip({
    x1: borderGapX - 30, x2: gameTableLayer.width - borderGapX + 30, y1: startDrawY - 20, y2: gameTableLayer.height, radius: 60, color: '#0d233d', canvas: gameTableLayer,
  });
  let startRenderCol = -1;
  let endRenderCol = -1;
  for (let i = 0; i < gametable.watchZone.length; i += 1) {
    if (gametable.watchZone[i] !== 9 && startRenderCol === -1) { startRenderCol = i; }
    if (gametable.watchZone[i] !== 9 && startRenderCol !== -1) { endRenderCol = i; }
  }
  const corStartClear = borderGapX + startRenderCol * (widthFigure + gapX);
  const corEndClear = (endRenderCol - startRenderCol + 1) * (widthFigure + gapX);
  gameTableCtx.clearRect(corStartClear, startDrawY, corEndClear, endDraw - heightFigure * 2);
  for (let col = startRenderCol; col <= endRenderCol; col += 1) {
    gametable.figures[col].forEach((elem) => {
      gameTableCtx.drawImage(elem.img, elem.corX, elem.corY);
    });
  }
};

export const renderPort = () => {
  const { gametable } = getGState();
  const { gameTableLayer } = getGState().canvasLayer;
  const gameTableCtx = gameTableLayer.getContext('2d');
  const borderGapX = (gameTableLayer.width - ((widthFigure + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (heightFigure + gapY);
  gametable.portFig.forEach((elem) => {
    const corY = endDraw - elem.row * (heightFigure + gapY) - heightFigure;
    const corX = borderGapX + elem.col * (widthFigure + gapX);
    gameTableCtx.clearRect(corX, corY, widthFigure, heightFigure);
  });
  gametable.portFig.forEach((elem) => {
    const corY = endDraw - elem.row * (heightFigure + gapY) - heightFigure;
    const corX = borderGapX + elem.col * (widthFigure + gapX);
    gameTableCtx.clearRect(corX, corY, widthFigure, heightFigure);
    const { img } = gametable.figures[elem.col][elem.row];
    gameTableCtx.drawImage(img, corX, corY);
  });
  gametable.portFig.length = 0;
};
