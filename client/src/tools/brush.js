import Tool from './tools';

export default class Brush extends Tool {
  constructor(canvas, id, socket) {
    super(canvas, id, socket);
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
      // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop);

      //щоб інші учвсники бачили, що малюється:
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.id,
        element: {
          type: 'brush',  //for switch case in canvas comp;
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop
        }
      }));
    }
  };

  mouseUpHandler() {
    this.mouseDown = false;

    //щоб лінія переривалась у всіх користувачів:
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      element: {
        type: 'newPath'
      }
    }));
  };

  static draw(context, x, y) { //щоб далі вик не створ екземпляр класа;
    context.lineTo(x, y);  //створ. лінія;
    context.stroke();  //щоб мала колір;
  };
}
