export default class Tools {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.destroyEvents(); //різна логіка для різних інструментів, обнуляєм при переході;
  };

  //change state:
  set fillColorStyle(color) {
    this.context.fillStyle = color;
  };

  set strokeColorStyle(color) {
    this.context.strokeStyle = color;
  };

  set lineWidth(width) {
    this.context.lineWidth = width;
  };

  destroyEvents() {
    this.canvas.onmousedown = null;
    this.canvas.onmousemove = null;
    this.canvas.onmouseup = null;
  }
}
