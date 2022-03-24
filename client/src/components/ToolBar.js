import React from 'react';
import '../styles/bar.scss';
import toolState from "../store/toolState";
import canvasState from "../store/canvasState";
import Brush from "../tools/brush";
import Rect from "../tools/rect";
import Circle from "../tools/circle";
import Line from "../tools/line";
import Eraser from "../tools/eraser";

const ToolBar = () => {
   const onChangeColor = e => {
       toolState.setFillColor(e.target.value);
       toolState.setStrokeColor(e.target.value);
    };

   const savePicture = () => {
     const data = canvasState.canvas.toDataURL();  //отримуєм поточе;
     const a = document.createElement('a'); //створ силку;
     a.href = data;
     a.download = canvasState.sessionId + '.jpg';   //creat name;
     document.body.appendChild(a);  //add href;
     a.click();
     document.body.removeChild(a);
   };

  return (
    <div className='bar z-index'>
      <button
        className='bar__btn brush'
        onClick={() =>
          toolState.setTool(new Brush(canvasState.canvas, canvasState.sessionId, canvasState.socket))}
      />
      <button
        className='bar__btn circle'
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      />
      <button
        className='bar__btn rect'
        onClick={() =>
          toolState.setTool(new Rect(canvasState.canvas, canvasState.sessionId, canvasState.socket))}
      />
      <button
        className='bar__btn line'
        onClick={() => toolState.setTool(new Line(canvasState.canvas))}
      />
      <button
        className='bar__btn eraser'
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      />
      <input
        className='ml10'
        onChange={e => {onChangeColor(e)}}
        type="color"
      />
      <button
        className='bar__btn undo'
        onClick={() => {canvasState.undo()}}
      />
      <button
        className='bar__btn redo'
        onClick={() => {canvasState.redo()}}
      />
      <button
        className='bar__btn save'
        onClick={() => {savePicture()}}
      />
    </div>
  );
};

export default ToolBar;
