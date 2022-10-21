import _ from 'lodash';
import { drawSquareClip } from '../tools/drawSquare.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const {
  gapX, gapY, sizefigureX, sizefigureY, startDrawY,
} = getSettings().gameMap;

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
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const borderGapX = (gameTableLayer.width - ((dataFigures.width + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (dataFigures.height + gapY);
  drawSquareClip({
    x1: borderGapX - 30, x2: gameTableLayer.width - borderGapX + 30, y1: startDrawY - 20, y2: gameTableLayer.height, radius: 60, color: '#0d233d', canvas: gameTableLayer,
  });
  let startRenderCol = 0;
  let endRenderCol = sizefigureX - 1;
  const indexWatch = [];
  gametable.watchZone.forEach((elem, index) => {
    if (elem !== sizefigureY) { indexWatch.push(index); }
  });
  if (indexWatch.length !== 0) {
    startRenderCol = indexWatch[0];
    endRenderCol = _.last(indexWatch);
  }

  const corStartClear = borderGapX + startRenderCol * (dataFigures.width + gapX);
  const corEndClear = (endRenderCol - startRenderCol + 1) * (dataFigures.width + gapX);
  gameTableCtx.clearRect(corStartClear, startDrawY, corEndClear, endDraw - dataFigures.height * 2);
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
  const dataFigures = getGState().stateImg.dataFugures[0].offCanvas;
  const borderGapX = (gameTableLayer.width - ((dataFigures.width + gapX) * sizefigureX)) / 2;
  const endDraw = startDrawY + sizefigureY * (dataFigures.height + gapY);
  gametable.portFig.forEach((elem) => {
    const corY = endDraw - elem.row * (dataFigures.height + gapY) - dataFigures.height;
    const corX = borderGapX + elem.col * (dataFigures.width + gapX);
    gameTableCtx.clearRect(corX, corY, dataFigures.width, dataFigures.height);
  });
  gametable.portFig.forEach((elem) => {
    const corY = endDraw - elem.row * (dataFigures.height + gapY) - dataFigures.height;
    const corX = borderGapX + elem.col * (dataFigures.width + gapX);
    gameTableCtx.clearRect(corX, corY, dataFigures.width, dataFigures.height);
    const { img } = gametable.figures[elem.col][elem.row];
    gameTableCtx.drawImage(img, corX, corY);
  });
  gametable.portFig.length = 0;
};
