class TextBox {
  constructor(value, posX, posY, layer, fontSize, width = 0, height = 0, align = 'center') {
    this.value = value;
    this.posX = posX;
    this.posY = posY;
    this.layer = layer;
    this.align = align;
    this.fontSize = fontSize;
    this.width = width;
    this.height = height;
    this.font = 'Marvin';
    this.color = '#ffffff';
  }

  clear() {
    const ctx = this.layer.getContext('2d');
    ctx.clearRect(this.posX, this.posY, this.width, this.height);
  }

  updteValue(value) {
    this.value = value;
  }

  render() {
    this.clear();
    const ctx = this.layer.getContext('2d');
    ctx.fillStyle = this.color;
    ctx.font = `${this.fontSize}px ${this.font}`;
    ctx.textAlign = this.align;
    const posX = this.posX + this.width / 2;
    ctx.fillText(this.value, posX, this.posY + this.height / 2 + this.fontSize / 4);
  }
}
export default TextBox;
