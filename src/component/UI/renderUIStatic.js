import getGState from '../../globalState.js';

const { staticLayer } = getGState().canvasLayer;

const drawTitle = (ctx) => {
  ctx.fillStyle = '#ffffff';
  ctx.font = '83.4px Marvin';
  ctx.textAlign = 'center';
  ctx.fillText('ПРОГРЕСС', staticLayer.width / 2, 80);
};

const renderStatusBar = (imgs, startDrawX, ctx) => {
  ctx.drawImage(imgs.dataUI.statysBar, startDrawX, 0);
  drawTitle(ctx);
};

const renderScoreBtn = (imgs, startDrawBtnY, ctx) => {
  const posX = (staticLayer.width / 2) - (imgs.dataUI.score.width / 2);
  ctx.drawImage(imgs.dataUI.score, posX, startDrawBtnY);
};
const renderClickBtn = (imgs, gapBorder, startDrawBtnY, ctx) => {
  ctx.drawImage(imgs.dataUI.click, gapBorder, startDrawBtnY);
};

const renderCoinBtn = (imgs, gapBorder, startDrawBtnY, ctx) => {
  const posX = staticLayer.width - gapBorder - imgs.dataUI.money.width;
  ctx.drawImage(imgs.dataUI.money, posX, startDrawBtnY);
};
const renderPauseBtn = (imgs, ctx) => {
  const posX = staticLayer.width - imgs.dataUI.pause.width;
  ctx.drawImage(imgs.dataUI.pause, posX, 0);
};

const renderUIStatic = () => {
  const barImg = getGState().stateImg.dataUI.statysBar;
  const ctx = staticLayer.getContext('2d');
  const startDrawX = (staticLayer.width - barImg.width) / 2;
  const imgs = getGState().stateImg;
  const sumGapX = 50 * 3;
  const widthDrawBtn = imgs.dataUI.score.width
    + imgs.dataUI.money.width + imgs.dataUI.click.width + sumGapX;
  const gapBorder = (staticLayer.width - widthDrawBtn) / 2;
  const startDrawBtnY = imgs.dataUI.statysBar.height + 30;
  renderStatusBar(imgs, startDrawX, ctx);
  renderClickBtn(imgs, gapBorder, startDrawBtnY, ctx);
  renderScoreBtn(imgs, startDrawBtnY, ctx);
  renderCoinBtn(imgs, gapBorder, startDrawBtnY, ctx);
  renderPauseBtn(imgs, ctx);
};
export default renderUIStatic;
