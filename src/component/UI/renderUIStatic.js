import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { widthLayers } = getSettings();
const { widthImgBar} = getSettings().loadBar;

const drawTitle = (ctx) => {
  ctx.fillStyle = '#ffffff';
  ctx.font = '83.4px Marvin';
  ctx.textAlign = 'center';
  ctx.fillText('ПРОГРЕСС', widthLayers / 2, 80);
};

const renderStatusBar = (imgs, startDrawX, ctx) => {
  ctx.drawImage(imgs.dataUI.statysBar, startDrawX, 0);
  drawTitle(ctx);
};

const renderScoreBtn = (imgs, startDrawBtnY, ctx) => {
  const posX = (widthLayers / 2) - (imgs.dataUI.score.width / 2);
  ctx.drawImage(imgs.dataUI.score, posX, startDrawBtnY);
};
const renderClickBtn = (imgs, gapBorder, startDrawBtnY, ctx) => {
  ctx.drawImage(imgs.dataUI.click, gapBorder, startDrawBtnY);
};

const renderCoinBtn = (imgs, gapBorder, startDrawBtnY, ctx) => {
  const posX = widthLayers - gapBorder - imgs.dataUI.money.width;
  ctx.drawImage(imgs.dataUI.money, posX, startDrawBtnY);
};
const renderPauseBtn = (imgs, ctx) => {
  const posX = widthLayers - imgs.dataUI.pause.width;
  ctx.drawImage(imgs.dataUI.pause, posX, 0);
};

const renderUIStatic = () => {
  const { staticLayer } = getGState().canvasLayer;
  const ctx = staticLayer.getContext('2d');
  const startDrawX = (widthLayers - widthImgBar) / 2;
  const imgs = getGState().stateImg;
  const sumGapX = 50 * 3;
  const widthDrawBtn = imgs.dataUI.score.width
    + imgs.dataUI.money.width + imgs.dataUI.click.width + sumGapX;
  const gapBorder = (widthLayers - widthDrawBtn) / 2;
  const startDrawBtnY = imgs.dataUI.statysBar.height + 30;
  renderStatusBar(imgs, startDrawX, ctx);
  renderClickBtn(imgs, gapBorder, startDrawBtnY, ctx);
  renderScoreBtn(imgs, startDrawBtnY, ctx);
  renderCoinBtn(imgs, gapBorder, startDrawBtnY, ctx);
  renderPauseBtn(imgs, ctx);
};
export default renderUIStatic;
