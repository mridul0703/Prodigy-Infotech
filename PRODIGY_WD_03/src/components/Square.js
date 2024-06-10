// src/components/Square.js
import React from 'react';


const Square = ({ value, onClick, isWinningSquare }) => {
  return (
    <button className={`square ${isWinningSquare ? 'winning-square' : ''}`} onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
