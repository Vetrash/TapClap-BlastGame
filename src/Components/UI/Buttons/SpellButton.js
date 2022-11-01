import { drawSquareStroke } from '../../../tools/drawSquare.js';
import Button from './Button.js';

class SpellButton extends Button {
  constructor(posX, posY, UILayer, staticLayer, imgsBtn, imgSpell, type, prise) {
    super();
    super.posX = posX;
    super.posY = posY;
    super.layer = staticLayer;
    super.btnImg = imgsBtn;
    this.type = type;
    this.isSelected = false;
    this.isHanderStop = false;

    window.addEventListener('offHandlers', () => {
      this.isHanderStop = true;
    });

    window.addEventListener('onHandlers', () => {
      this.isHanderStop = false;
    });

    super.event = () => {
      if (!this.isHanderStop) {
        if (this.isSelected) {
          this.clearSelected();
          window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: 'none' } }));
        } else {
          this.selectSpell();
          window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: this.type } }));
        }
      }
    };

    this.UILayer = UILayer;
    this.spellIcon = imgSpell;
    this.prise = prise;

    this.gapSpellIcon = 40;
    this.gapPrise = 320;
    this.radiusSelector = 65;
    this.lWidth = 10;

    this.isHanderStop = false;
    window.addEventListener('offHandlers', () => {
      this.isHanderStop = true;
    });
    window.addEventListener('onHandlers', () => {
      this.isHanderStop = false;
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
    if (this.coin >= this.prise) {
      const x1 = this.posX;
      const x2 = x1 + this.btnImg.width;
      const y1 = this.posY - this.lWidth;
      const y2 = y1 + this.btnImg.height + this.lWidth;
      const radius = this.radiusSelector;
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

  renderSpellBtn() {
    super.render();
    const ctx = this.layer.getContext('2d');
    const corSpell = this.posX + this.spellIcon.width / 2;
    ctx.drawImage(this.spellIcon, corSpell, this.posY + this.gapSpellIcon);
    ctx.textAlign = 'left';
    ctx.fillText(this.prise, corSpell, this.posY + this.gapPrise);
  }
}

export default SpellButton;
