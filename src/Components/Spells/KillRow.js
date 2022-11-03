class KillRow {
  static getChain(setting) {
    const { loc, sizeX } = setting;
    const chain = [];
    for (let col = 0; col < sizeX; col += 1) {
      chain.push({ col, row: loc.row });
    }
    return ({ chain, type: 'killRow', isFinished: true });
  }
}
export default KillRow;
