import { drawSquareStroke } from '../../tools/drawSquare.js';

class SpellBtn {
  constructor(corX, corY, UILayer, staticLayer, imgsBtn, imgSpell, type, prise) {
    this.corX = corX;
    this.corY = corY;

    this.staticLayer = staticLayer;
    this.UILayer = UILayer;

    this.btnSpell = imgsBtn;
    this.spellIcon = imgSpell;
    this.type = type;
    this.prise = prise;

    this.gapSpellIcon = 40;
    this.gapPrise = 320;
    this.radiusSelector = 65;
    this.lWidth = 10;
    this.isSelected = false;

    this.isHanderStop = false;
    window.addEventListener('offHandlers', () => {
      this.isHanderStop = true;
    });
    window.addEventListener('onHandlers', () => {
      this.isHanderStop = false;
    });

    window.addEventListener('click', (e) => {
      if (!this.isHanderStop) {
        const corCanvas = window.toCanvasCor(UILayer, e.clientX, e.clientY);
        if (corCanvas.x > this.corX && corCanvas.x < this.corX + this.btnSpell.width
          && corCanvas.y > this.corY && corCanvas.y < this.corY + this.btnSpell.height) {
          if (this.isSelected) {
            this.clearSelected();
            window.dispatchEvent(new CustomEvent('clearSpell'));
          } else {
            this.selectSpell();
            window.dispatchEvent(new CustomEvent('clearBtnSpellbyNotType', { detail: { value: this.type } }));
          }
        }
      }
    });

    window.addEventListener('clearBtnSpellbyNotType', (e) => {
      if (e.detail.value !== this.type) { this.clearSelected(); }
    });

    window.addEventListener('clearAllBtnSpell', () => {
      this.clearSelected();
    });

    window.addEventListener('watchCoin', (e) => {
      this.coin = e.detail.value;
    });
  }

  clearSelected() {
    const ctx = this.UILayer.getContext('2d');
    ctx.clearRect(this.corX, this.corY - this.lWidth, this.btnSpell.width,
      this.btnSpell.height + this.lWidth);
    this.isSelected = false;
  }

  selectSpell() {
    if (this.coin >= this.prise) {
      const x1 = this.corX;
      const x2 = x1 + this.btnSpell.width;
      const y1 = this.corY - this.lWidth;
      const y2 = y1 + this.btnSpell.height + this.lWidth;
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
    const ctx = this.staticLayer.getContext('2d');
    ctx.drawImage(this.btnSpell, this.corX, this.corY);
    const corSpell = this.corX + this.spellIcon.width / 2;
    ctx.drawImage(this.spellIcon, corSpell, this.corY + this.gapSpellIcon);
    ctx.textAlign = 'left';
    ctx.fillText(this.prise, corSpell, this.corY + this.gapPrise);
  }
}

export default SpellBtn;
