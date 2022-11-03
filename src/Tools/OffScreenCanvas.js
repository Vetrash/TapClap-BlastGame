class OffScreenCanvas {
  static create(img) {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = img.width;
    offCanvas.height = img.height;
    const ctx = offCanvas.getContext('2d');
    const splitSrc = img.src.split('/');
    const name = splitSrc[splitSrc.length - 1].split('.')[0];
    ctx.drawImage(img, 0, 0);
    return { offCanvas, name };
  }
}
export default OffScreenCanvas;
