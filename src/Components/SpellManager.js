import _ from 'lodash';

class SpellManager {
  constructor(sizeTableX, sizeTableY) {
    this.sizeTableX = sizeTableX;
    this.sizeTableY = sizeTableY;
    this.activSpell = '';
    this.arrClick = [];
    this.mySpell = ['bomb', 'port', 'lightning', 'killAll', 'killRow', 'killCol'];
    this.isSpellRight = false;
    this.prise = {
      bomb: 15,
      port: 3,
      lightning: 10,
    };
    this.watchOffsetBomb = [
      { colOffset: -1, rowOffset: 0 },
      { colOffset: -1, rowOffset: 1 },
      { colOffset: -1, rowOffset: -1 },
      { colOffset: 1, rowOffset: 0 },
      { colOffset: 1, rowOffset: 1 },
      { colOffset: 1, rowOffset: -1 },
      { colOffset: 0, rowOffset: -1 },
      { colOffset: 0, rowOffset: 1 },
    ];
    window.addEventListener('activSpell', (e) => {
      this.setActivSpell(e.detail.value);
      this.arrClick.length = 0;
    });
    window.addEventListener('clearBtnSpellbyNotType', (e) => {
      if (e.detail.value === 'none') { this.clearActivSpell(); }
    });
  }

  setActivSpell(spellName) {
    this.activSpell = spellName;
    this.isSpellRight = _.includes(this.mySpell, spellName);
  }

  clearActivSpell() {
    this.activSpell = '';
    this.isSpellRight = false;
  }

  getSpell(loc) {
    switch (this.activSpell) {
      case 'bomb':
        return this.bomb(loc);
      case 'port':
        return this.port(loc);
      case 'lightning':
        return this.lightning(loc);
      case 'killRow':
        return this.killRow(loc);
      case 'killCol':
        return this.killCol(loc);
      case 'killAll':
        return this.killAll();
      default:
        return { chain: [], prise: 0, type: 'block' };
    }
  }

  bomb(loc) {
    const chain = [];
    chain.push({ col: loc.col, row: loc.row });
    this.watchOffsetBomb.forEach((elem) => {
      const findeCellRow = loc.row + elem.rowOffset;
      const findeCellCol = loc.col + elem.colOffset;
      if (findeCellRow < this.sizeTableY && findeCellRow >= 0
        && findeCellCol < this.sizeTableX && findeCellCol >= 0) {
        chain.push({ col: findeCellCol, row: findeCellRow });
      }
    });
    this.activSpell = '';
    this.isSpellRight = false;
    window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: 'none' } }));
    return { chain, prise: this.prise.bomb, type: 'bomb' };
  }

  port(loc) {
    if (this.arrClick.length < 2 && !_.some(this.arrClick, loc)) {
      this.arrClick.push(loc);
    }
    if (this.arrClick.length === 2) {
      this.activSpell = '';
      this.isSpellRight = false;
      const safeArrClick = _.cloneDeep(this.arrClick);
      this.arrClick.length = 0;
      window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: 'none' } }));
      return ({ chain: safeArrClick, prise: this.prise.port, type: 'port' });
    }
    return ({ chain: this.arrClick, prise: 0, type: 'port' });
  }

  lightning(loc) {
    const lengthShot = 6;
    const chain = [];
    if (loc !== undefined) { chain.push(loc); }
    while (chain.length < lengthShot) {
      const col = Math.floor(Math.random() * this.sizeTableX);
      const row = Math.floor(Math.random() * this.sizeTableY);
      if (!_.some(chain, { col, row })) {
        chain.push({ col, row });
      }
    }
    this.activSpell = '';
    this.isSpellRight = false;
    window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: 'none' } }));
    return ({ chain, prise: this.prise.lightning, type: 'lightning' });
  }

  killRow(loc) {
    const chain = [];
    for (let col = 0; col < this.sizeTableX; col += 1) {
      chain.push({ col, row: loc.row });
    }
    this.activSpell = '';
    this.isSpellRight = false;
    return ({ chain, prise: 0, type: 'killRow' });
  }

  killCol(loc) {
    const chain = [];
    for (let row = 0; row < this.sizeTableY; row += 1) {
      chain.push({ col: loc.col, row });
    }
    this.activSpell = '';
    this.isSpellRight = false;
    return ({ chain, prise: 0, type: 'killCol' });
  }

  killAll() {
    const chain = [];
    for (let col = 0; col < this.sizeTableX; col += 1) {
      for (let row = 0; row < this.sizeTableY; row += 1) {
        chain.push({ col, row });
      }
    }
    this.activSpell = '';
    this.isSpellRight = false;
    return ({ chain, prise: 0, type: 'killAll' });
  }

  isSpellName(name) {
    return _.includes(this.mySpell, name);
  }
}

export default SpellManager;
