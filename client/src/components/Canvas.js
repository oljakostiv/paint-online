import React, {useEffect, useRef} from 'react';
import '../styles/canvas.scss';
import {observer} from "mobx-react-lite";
import canvasState from '../store/canvasState';
import toolState from "../store/toolState";
import Brush from "../tools/brush";

const Canvas = observer(() => {
  const canvasRef = useRef();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  const mouseDownHendler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());  //screen;
  };

  return (
    <div className='canvas'>
      <canvas onMouseDown={() => {mouseDownHendler()}} ref={canvasRef} height={500} width={800}/>
    </div>
  );
});

export default Canvas;
