import Line from './line';

export default class Eraser extends Line {
  constructor(canvas) {
    super(canvas);
  };

  draw(x, y) {
      this.context.lineTo(x, y);
      this.context.strokeStyle = 'white';
      this.context.stroke();
    };
}
