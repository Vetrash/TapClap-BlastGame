import _ from 'lodash';

class Port {
  static getChain(setting) {
    const { loc, arrClick } = setting;
    if (arrClick.length < 2 && !_.some(arrClick, loc)) {
      arrClick.push(loc);
    }
    if (arrClick.length === 2) {
      const safeArrClick = _.cloneDeep(arrClick);
      return ({ chain: safeArrClick, type: 'port', isFinished: true });
    }
    return ({ chain: arrClick, type: 'port', isFinished: false });
  }
}
export default Port;
