import Tool from './tools';

export default class Line extends Tool {
  constructor(canvas) {
    super(canvas);
    this.listen();
  };

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  };

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.currentX = e.pageX - e.target.offsetLeft;
    this.currentY = e.pageY - e.target.offsetTop;
    this.context.beginPath();
    this.context.moveTo(this.currentX, this.currentY);
    this.saved = this.canvas.toDataURL();
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
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.moveTo(this.currentX, this.currentY);  //start;
      this.context.lineTo(x, y);
      this.context.stroke();
    }
  };
}
