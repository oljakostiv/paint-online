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

  return (
    <div className='canvas'>
      <canvas ref={canvasRef} height={500} width={800}/>
    </div>
  );
});

export default Canvas;