import _ from 'lodash';

class Lightning {
  static getChain(setting) {
    const { loc, sizeX, sizeY } = setting;
    const lengthShot = 6;
    const chain = [];
    if (loc !== undefined) { chain.push(loc); }
    while (chain.length < lengthShot) {
      const col = Math.floor(Math.random() * sizeX);
      const row = Math.floor(Math.random() * sizeY);
      if (!_.some(chain, { col, row })) {
        chain.push({ col, row });
      }
    }
    return ({ chain, type: 'lightning', isFinished: true });
  }
}
export default Lightning;
