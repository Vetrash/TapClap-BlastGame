import _ from 'lodash';

class RenderCol {
  static get(moveZone, sizeTableY) {
    let fulingCol = moveZone.map((elem, index) => {
      if (elem !== sizeTableY) { return index; }
      return 'X';
    })
      .filter((elem) => elem !== 'X');
    if (fulingCol.length === 0) { fulingCol = [0, moveZone.length - 1]; }
    const startRenderCol = _.first(fulingCol);
    const endRenderCol = _.last(fulingCol);
    return { startRenderCol, endRenderCol };
  }
}
export default RenderCol;
