class KillAll {
  static getChain(setting) {
    const { sizeX, sizeY } = setting;
    const chain = [];
    for (let col = 0; col < sizeX; col += 1) {
      for (let row = 0; row < sizeY; row += 1) {
        chain.push({ col, row });
      }
    }
    return ({ chain, type: 'killAll', isFinished: true });
  }
}
export default KillAll;
