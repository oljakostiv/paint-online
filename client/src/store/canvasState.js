import {makeAutoObservable} from "mobx";

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  userName = '';
  socket = null;
  sessionId = null;

  constructor() {
    makeAutoObservable(this);
  };

  setCanvas(canvas) {
    this.canvas = canvas;
  };

  pushToUndo(data) {
    this.undoList.push(data);
  };

  pushToRedo(data) {
    this.redoList.push(data);
  };

  undo() {
    let context = this.canvas.getContext('2d');

    if (this.undoList.length > 0) {
      let data = this.undoList.pop();
      this.redoList.push(this.canvas.toDataURL()); //save for redo fn, поточний стан;
      let img = new Image();
      img.src = data;

      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    } else {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  };

  redo() {
    let context = this.canvas.getContext('2d');

    if (this.redoList.length > 0) {
      let data = this.redoList.pop();
      this.undoList.push(this.canvas.toDataURL()); //save for undo fn;
      let img = new Image();
      img.src = data;

      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      };
    }
  };

  setUserName(userName) {
    this.userName = userName;
  };

  setSocket(socket) {
    this.socket = socket;
  };

  setSessionId(id) {
    this.sessionId = id;
  };
}

export default new CanvasState();
