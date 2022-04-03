import Tool from './tools';

export default class Circle extends Tool {
  constructor(canvas, id, socket) {
    super(canvas, id, socket);
    this.listen();
  };

  listen() {
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  };

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.context.beginPath();
    this.startX = e.pageX - e.target.offsetLeft;
    this.startY = e.pageY - e.target.offsetTop;
    this.saved = this.canvas.toDataURL(); //збереження форми;
  };

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      let width = currentX - this.startX;
      let height = currentY - this.startY;
      this.radius = Math.sqrt(width ** 2 + height ** 2);
      this.draw(this.startX, this.startY, this.radius);
    }
  };

  mouseUpHandler(e) {
    this.mouseDown = false;

    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      element: {
        type: 'circle',
        x: this.startX,
        y: this.startY,
        radius: this.radius,
        color: this.context.fillStyle
      }
    }));
  };

  draw(x, y, radius) {
    const img = new Image();
    img.src = this.saved;

    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);

      // if (img > 1) {
        this.context.fill();
      // } else {
        this.context.stroke();
      // }
    }
  };

  //for partner:
  static staticDraw(context, x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    context.stroke();
  };
}
