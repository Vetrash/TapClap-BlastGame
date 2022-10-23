const createOffscreenCanvas = (img, width, height, align = 'left') => {
  const offCanvas = document.createElement('canvas');
  offCanvas.width = width;
  offCanvas.height = height;
  const ctx = offCanvas.getContext('2d');
  const splitSrc = img.src.split('/');
  const name = splitSrc[splitSrc.length - 1].split('.')[0];
  if (align === 'left') {
    ctx.drawImage(img, 0, 0);
  } else if (align === 'center') {
    const posX = (width / 2) - (img.width / 2);
    const posY = (height / 2) - (img.height / 2);
    ctx.drawImage(img, posX, posY);
  }
  return { offCanvas, name };
};
export default createOffscreenCanvas;
