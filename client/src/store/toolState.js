import {makeAutoObservable} from "mobx";

class ToolState {
  tool = null;

  constructor() {
    makeAutoObservable(this);
  }

  //actions (set from tools.js):
  setTool(tool) {
    this.tool = tool;
  };

  setFillColor(color) {
    this.tool.fillColorStyle= color;
  };

  setStrokeColor(color) {
    this.tool.strokeColorStyle = color;
  };

  setLineWidth(width) {
    this.tool.lineWidth = width;
  };
}

export default new ToolState();
