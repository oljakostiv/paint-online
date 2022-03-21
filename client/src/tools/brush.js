import Tool from './tools';

export default class Brush extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();  //одразу слухає всі ф-іх миші;
  };

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  };

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.context.beginPath();  //нова лінія;
    this.context.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);  //координати, перемістити курсор;
  };

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);
    }
  };

  mouseUpHandler(e) {
    this.mouseDown = false;
  };

  draw(x, y) {
    this.context.lineTo(x, y);  //створ. лінія;
    this.context.stroke();  //щоб мала колір;
  };
}
