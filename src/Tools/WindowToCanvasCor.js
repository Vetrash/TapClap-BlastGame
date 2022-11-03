class WindowToCanvasCor {
  static addToWindow() {
    window.toCanvasCor = (canvas, x, y) => {
      const bbox = canvas.getBoundingClientRect();
      return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height),
      };
    };
  }
}
export default WindowToCanvasCor;
