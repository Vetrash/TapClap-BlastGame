class KillCol {
  static getChain(setting) {
    const { loc, sizeY } = setting;
    const chain = [];
    for (let row = 0; row < sizeY; row += 1) {
      chain.push({ col: loc.col, row });
    }
    return ({ chain, type: 'killCol', isFinished: true });
  }
}
export default KillCol;
