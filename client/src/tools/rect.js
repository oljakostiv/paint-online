import Tool from './tools';

export default class Rect extends Tool {
  constructor(canvas,  id, socket) {
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
    this.saved = this.canvas.toDataURL(); //збереження форми прямокутника;
  };

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  };

  mouseUpHandler() {
    this.mouseDown = false;

    //відображення для учасників коли вже намалювався квадрат:
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      element: {
        type: 'rect',
        x: this.startX,
        y: this.startY,
        w: this.width,
        h: this.height,
        color: this.context.fillStyle
      }
    }));
  };

  //for creator:
  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved;

    //щоб бачити тільки поточе зображення фігури:
    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.context.beginPath();
      this.context.rect(x, y, w, h);
      this.context.fill();  //колір всередині;
      this.context.stroke();  //колір контуру;
    }
  };

  //for partner:
  static staticDraw(context, x, y, w, h, color) {
    context.beginPath();
    context.rect(x, y, w, h);
    context.fillStyle = color;
    context.fill();
    context.stroke();
  };
}
