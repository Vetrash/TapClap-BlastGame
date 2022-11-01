import SpellBtn from './SpellBtn.js';
import TextBox from './TextBox.js';

class SpellBar {
  constructor(canvasLayers, imgs) {
    this.canvasLayers = canvasLayers;
    this.imgs = imgs;
    this.amount = 3;
    this.gapX = 50;
    this.gapYborder = 50;
    this.gapTitle = 30;
    this.prise = {
      bomb: 15,
      port: 3,
      lightning: 10,
    };
    this.fontSize = {
      norm: 83.4,
    };
    this.arrSpell = ['bomb', 'port', 'lightning', 'killAll', 'killRow', 'killCol'];
    this.spellBtns = [];
    this.btnSpell = this.imgs.dataSpells.btnSpell;
    this.borderGapX = (this.canvasLayers.UILayer.width
      - ((this.btnSpell.width + this.gapX) * this.amount)) / 2;
  }

  render() {
    const { UILayer, staticLayer } = this.canvasLayers;
    const StartDrawY = staticLayer.height - this.imgs.dataSpells.btnSpell.height - this.gapYborder;

    const title = new TextBox('БОНУСЫ', staticLayer.width / 2, StartDrawY, staticLayer, this.fontSize.norm);
    title.render();

    for (let i = 0; i < this.amount; i += 1) {
      const nameSpell = this.arrSpell[i];
      const posX = this.borderGapX + (this.btnSpell.width + this.gapX) * i;
      const posY = StartDrawY + this.gapYborder;
      const imgSpell = this.imgs.dataSpells[nameSpell];
      const prise = this.prise[nameSpell];
      const spellBtn = new SpellBtn(posX, posY, UILayer,
        staticLayer, this.btnSpell, imgSpell, nameSpell, prise);
      spellBtn.renderSpellBtn();
    }
  }
}
export default SpellBar;
