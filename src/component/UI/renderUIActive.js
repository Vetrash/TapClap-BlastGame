import drawLoadLine from './drawLoadLine.js';
import getSettings from '../../settings.js';
import getGState from '../../globalState.js';

const { coastLevel } = getSettings();
const { UILayer } = getGState().canvasLayer;

const renderScore = (score, startDrawBtnY, ctx, imgs) => {
  const barImg = imgs.dataUI.statysBar;
  const fontSize = 83.4;
  ctx.fillStyle = '#ffffff';
  ctx.font = `${fontSize}px Marvin`;
  ctx.textAlign = 'left';
  const posX = (UILayer.width / 2) - (imgs.dataUI.score.width / 2);
  ctx.clearRect(posX, barImg.height,
    posX + imgs.dataUI.score.width, barImg.height + imgs.dataUI.score.height);
  const startTextX = posX + 200;
  const stratTextY = startDrawBtnY + (fontSize / 2) + (imgs.dataUI.score.height / 2);
  ctx.fillText(score, startTextX, stratTextY);
};

const renderCoin = (coin, gapBorder, startDrawBtnY, ctx, imgs) => {
  const barImg = imgs.dataUI.statysBar;
  const fontSize = 83.4;
  ctx.fillStyle = '#ffffff';
  ctx.font = `${fontSize}px Marvin`;
  ctx.textAlign = 'left';
  const posX = UILayer.width - imgs.dataUI.money.width - gapBorder;
  ctx.clearRect(posX, barImg.height,
    UILayer.width, barImg.height + imgs.dataUI.money.height);
  const startTextX = posX + (imgs.dataUI.money.width / 2);
  const stratTextY = startDrawBtnY + (fontSize / 2) + (imgs.dataUI.money.height / 2);
  ctx.fillText(coin, startTextX, stratTextY);
};

const renderClick = (click, gapBorder, startDrawBtnY, ctx, imgs) => {
  const barImg = imgs.dataUI.statysBar;
  const fontSize = 83.4;
  ctx.fillStyle = '#ffffff';
  ctx.font = `${fontSize}px Marvin`;
  ctx.textAlign = 'left';
  const posX = gapBorder;
  ctx.clearRect(posX, barImg.height,
    posX + imgs.dataUI.click.width, barImg.height + imgs.dataUI.click.height);
  const startTextX = posX + (imgs.dataUI.click.width / 2);
  const stratTextY = startDrawBtnY + (fontSize / 2) + (imgs.dataUI.click.height / 2);
  ctx.fillText(click, startTextX, stratTextY);
};

const renderUIActive = () => {
  const { score, coin, click } = getGState();
  const barImg = getGState().stateImg.dataUI.statysBar;
  const progress = (score.forProgress / coastLevel) > 1 ? 1 : (score.forProgress / coastLevel);
  const ctx = UILayer.getContext('2d');

  const startDrawX = (UILayer.width - barImg.width) / 2;
  const imgs = getGState().stateImg;
  const sumGapX = 50 * 3;
  const widthDrawBtn = imgs.dataUI.score.width
    + imgs.dataUI.money.width + imgs.dataUI.click.width + sumGapX;
  const gapBorder = (UILayer.width - widthDrawBtn) / 2;
  const startDrawBtnY = imgs.dataUI.statysBar.height + 20;

  drawLoadLine(progress, startDrawX, ctx);
  renderScore(score.str, startDrawBtnY, ctx, imgs);
  renderCoin(coin.value, gapBorder, startDrawBtnY, ctx, imgs);
  renderClick(click.value, gapBorder, startDrawBtnY, ctx, imgs);
};
export default renderUIActive;
