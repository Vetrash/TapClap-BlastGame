import SpellButton from './Buttons/SpellButton.js';
import TextBox from './TextBoxs/TextBox.js';

class SpellBar {
  constructor(staticLayer, UILayer, imgs, price) {
    this.staticLayer = staticLayer;
    this.UILayer = UILayer;
    this.imgsSpells = imgs;
    this.gapX = 50;
    this.gapYborder = 50;
    this.fontSize = {
      norm: 83.4,
    };
    this.btnSpell = this.imgsSpells.btn;
    this.price = price;
  }

  createButtons() {
    const useSpell = Object.keys(this.price);
    this.borderGapX = (this.UILayer.width
      - ((this.btnSpell.width + this.gapX) * useSpell.length)) / 2;
    this.StartDrawY = this.staticLayer.height - this.btnSpell.height - this.gapYborder;
    this.buttons = useSpell.map((spell, index) => {
      const posX = this.borderGapX + (this.btnSpell.width + this.gapX) * index;
      const posY = this.StartDrawY + this.gapYborder;

      const imgSpell = this.imgsSpells[spell];
      const prise = this.price[spell];
      const spellBtn = new SpellButton(posX, posY, this.UILayer,
        this.staticLayer, this.btnSpell, imgSpell, spell, prise);
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
