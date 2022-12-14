class AnimFramePolifil {
  static addRequest() {
    window.requestAnimFrame = (() => window.requestAnimationFrame
      || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame
      || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame
      || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    )();
  }

  static addCancel() {
    window.cancelAnimationFrame = (() => window.cancelAnimationFrame
    || window.msCancelAnimationFrame
    || window.mozCancelAnimationFrame
    || window.webkitCancelAnimationFrame
    || window.oCancelAnimationFrame
    || window.msCancelRequestAnimationFrame
    || window.mozCancelRequestAnimationFrame
    || window.webkitCancelRequestAnimationFrame
    || window.oCancelRequestAnimationFrame
    || function (id) { clearTimeout(id); }
    )();
  }
}
export default AnimFramePolifil;
