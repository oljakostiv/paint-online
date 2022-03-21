import React from 'react';
import toolState from "../store/toolState";

const SettingBar = () => {
  return (
    <div className='bar t40'>
      <label className='ml10' htmlFor="line">Line thickness:</label>
      <input
        className='ml10 mr10'
        onChange={e => toolState.setLineWidth(e.target.value)}
        id='line'
        type="number"
        defaultValue={1}
        min={1} max={66}
      />
      <label className='ml10' htmlFor="stroke">Stroke color:</label>
      <input
        className='ml10 mr10'
        onChange={e => toolState.setStrokeColor(e.target.value)}
        id='stroke'
        type="color"
      />
    </div>
  );
};

export default SettingBar;
