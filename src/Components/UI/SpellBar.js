import SpellButton from './Buttons/SpellButton.js';
import TextBox from './TextBox.js';

class SpellBar {
  constructor(staticLayer, UILayer, imgs) {
    this.staticLayer = staticLayer;
    this.UILayer = UILayer;
    this.imgsSpells = imgs;
    this.gapX = 50;
    this.gapYborder = 50;
    this.fontSize = {
      norm: 83.4,
    };
    this.btnSpell = this.imgsSpells.btnSpell;
  }

  createButtons() {
    const useSpell = [
      ['bomb', 15],
      ['port', 3],
      ['lightning', 10],
    ];

    this.borderGapX = (this.UILayer.width
      - ((this.btnSpell.width + this.gapX) * useSpell.length)) / 2;
    this.StartDrawY = this.staticLayer.height - this.btnSpell.height - this.gapYborder;
    this.buttons = useSpell.map((spell, index) => {
      const posX = this.borderGapX + (this.btnSpell.width + this.gapX) * index;
      const posY = this.StartDrawY + this.gapYborder;
      const imgSpell = this.imgsSpells[spell[0]];
      const prise = spell[1];
      const spellBtn = new SpellButton(posX, posY, this.UILayer,
        this.staticLayer, this.btnSpell, imgSpell, spell[0], prise);
      return spellBtn;
    });

    this.title = new TextBox('БОНУСЫ', this.staticLayer.width / 2, this.StartDrawY, this.staticLayer, this.fontSize.norm);
  }

  render() {
    this.title.render();
    this.buttons.forEach((btn) => btn.render());
  }
}
export default SpellBar;
