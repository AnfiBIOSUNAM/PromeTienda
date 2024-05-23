import React from 'react';

const RangeBarControl = ({ value, onChange }) => {
  return (
    <div>
      <input 
        type="range" 
        id="range-bar" 
        name="range-bar" 
        min="0" 
        max="10000" 
        value={value}
        onChange={onChange}
      />
      <label htmlFor="range-bar">Precio: {value}</label>
    </div>
  );
};

export default RangeBarControl;

