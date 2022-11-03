import _ from 'lodash';
import Bomb from './Bomb.js';
import Port from './Port.js';
import Lightning from './Lightning.js';
import KillAll from './KillAll.js';
import KillCol from './KillCol.js';
import KillRow from './KillRow.js';

class SpellManager {
  constructor(sizeTableX, sizeTableY, price) {
    this.sizeTableX = sizeTableX;
    this.sizeTableY = sizeTableY;
    this.activSpell = '';
    this.arrClick = [];
    this.mySpell = {
      bomb: (set) => Bomb.getChain(set),
      port: (set) => Port.getChain(set),
      lightning: (set) => Lightning.getChain(set),
      killAll: (set) => KillAll.getChain(set),
      killCol: (set) => KillCol.getChain(set),
      killRow: (set) => KillRow.getChain(set),
    };
    this.isSpellRight = false;
    this.price = price;
    window.addEventListener('activSpell', (e) => {
      this.setActivSpell(e.detail.value);
      this.arrClick.length = 0;
    });
    window.addEventListener('clearBtnSpellbyNotType', (e) => {
      if (e.detail.value === 'none') { this.clearActivSpell(); }
      this.arrClick.length = 0;
    });
  }

  setActivSpell(spellName) {
    this.activSpell = spellName;
    this.isSpellRight = _.includes(_.keys(this.mySpell), spellName);
  }

  clearActivSpell() {
    this.activSpell = '';
    this.isSpellRight = false;
  }

  getSpell(loc) {
    const setting = {
      loc, sizeX: this.sizeTableX, sizeY: this.sizeTableY, arrClick: this.arrClick,
    };
    let price = 0;
    const infoSpell = this.mySpell[this.activSpell](setting);
    if (infoSpell.isFinished) {
      const nameSpell = this.activSpell;
      price = _.includes(_.keys(this.price), nameSpell) ? this.price[nameSpell] : 0;
      this.clearActivSpell();
      window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: 'none' } }));
    }
    return { price, ...infoSpell };
  }

  isSpellName(name) {
    return _.includes(_.keys(this.mySpell), name);
  }
}

export default SpellManager;
