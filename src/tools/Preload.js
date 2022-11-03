import OffScreenCanvas from './OffScreenCanvas.js';

class Preload {
  static font(name, url) {
    const myFont = new FontFace(name, url);
    myFont.load().then((font) => { document.fonts.add(font); });
  }

  static async imgs(images) {
    return Promise.all(
      images.map((source) => new Promise((resolve, reject) => {
        const img = new Image();
        img.src = source;
        img.onload = () => resolve(img);
        img.onerror = (event) => reject(event);
      })),
    );
  }

  static async imgByArr(arr) {
    const state = await Promise.all(
      arr.map((elemArr) => this.imgs(elemArr.arr).then((img) => {
        const arrCanvas = img.map((elem) => OffScreenCanvas.create(elem));
        const objCanvas = {};
        if (elemArr.type === 'obj') {
          arrCanvas.forEach((elem) => { objCanvas[elem.name] = elem.offCanvas; });
          return objCanvas;
        }
        return arrCanvas;
      })),
    )
      .then((res) => {
        const result = {};
        arr.forEach((elemArr, index) => {
          result[elemArr.name] = res[index];
        });
        return result;
      });
    return state;
  }
}
export default Preload;
