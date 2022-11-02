import { drawSquareStroke } from '../../../tools/drawSquare.js';
import Button from './Button.js';

class SpellButton extends Button {
  constructor(posX, posY, UILayer, staticLayer, imgsBtn, imgSpell, type,
    prise, event = undefined) {
    super();
    super.posX = posX;
    super.posY = posY;
    super.layer = staticLayer;
    super.btnImg = imgsBtn;
    this.type = type;
    this.isSelected = false;
    this.isHanderStop = false;
    super.event = event === undefined ? () => { this.useSpellEvent(); } : event;
    this.UILayer = UILayer;
    this.spellIcon = imgSpell;
    this.prise = prise;
    this.lWidth = 10;
    window.addEventListener('swithHandlers', (e) => {
      this.isHanderStop = e.detail.value;
    });
    window.addEventListener('clearBtnSpellbyNotType', (e) => {
      if (e.detail.value !== this.type) { this.clearSelected(); }
    });
    window.addEventListener('watchCoin', (e) => {
      this.coin = e.detail.value;
    });
  }

  clearSelected() {
    const ctx = this.UILayer.getContext('2d');
    ctx.clearRect(this.posX, this.posY - this.lWidth, this.btnImg.width,
      this.btnImg.height + this.lWidth);
    this.isSelected = false;
  }

  selectSpell() {
    const radiusSelector = 65;
    if (this.coin >= this.prise) {
      const x1 = this.posX;
      const x2 = x1 + this.btnImg.width;
      const y1 = this.posY - this.lWidth;
      const y2 = y1 + this.btnImg.height + this.lWidth;
      const radius = radiusSelector;
      const color = '#ffd700';
      const canvas = this.UILayer;
      const setting = {
        x1, x2, y1, y2, radius, color, canvas, lWidth: this.lWidth,
      };
      drawSquareStroke(setting);
      this.isSelected = true;
      window.dispatchEvent(new CustomEvent('activSpell', { detail: { value: this.type } }));
    }
  }

  render() {
    const gapPrise = 320;
    const gapSpellIcon = 40;
    super.render();
    const ctx = this.layer.getContext('2d');
    const corSpell = this.posX + this.spellIcon.width / 2;
    ctx.drawImage(this.spellIcon, corSpell, this.posY + gapSpellIcon);
    ctx.textAlign = 'left';
    ctx.fillText(this.prise, corSpell, this.posY + gapPrise);
  }

  useSpellEvent() {
    if (!this.isHanderStop) {
      if (this.isSelected) {
        this.clearSelected();
        window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: 'none' } }));
      } else {
        this.selectSpell();
        window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: this.type } }));
      }
    }
  }
}

export default SpellButton;
