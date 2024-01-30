/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';

const Keyboard = ({ onKeyPress }) => {
  const firstRow = 'QWERTYUIOP';
  const secondRow = 'ASDFGHJKL';
  const thirdRow = 'ZXCVBNM';
  const specialKeys = ['Enter', 'Backspace', 'Reset Game'];

  const handleKeyPress = (key) => {
    onKeyPress(key);
  };

  return (
    <>
    <div className="grid grid-cols-10 gap-2 mt-4">
      {firstRow.split('').map((letter) => (
        <button key={letter} onClick={() => handleKeyPress(letter)} className="m-1 px-4 py-2 bg-blue-500 text-white rounded">
          {letter}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-9 gap-2 mt-4">
      {secondRow.split('').map((letter) => (
        <button key={letter} onClick={() => handleKeyPress(letter)} className="m-1 px-4 py-2 bg-blue-500 text-white rounded">
          {letter}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-7 gap-2 mt-4">
      {thirdRow.split('').map((letter) => (
        <button key={letter} onClick={() => handleKeyPress(letter)} className="m-1 px-4 py-2 bg-blue-500 text-white rounded">
          {letter}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-2 mt-4">
      {specialKeys.map((key) => (
        <button key={key} onClick={() => handleKeyPress(key)} className="m-1 px-1 py-2 bg-blue-500 text-white rounded">
          {key}
        </button>
      ))}
    </div>
    </>
  );
};

export default Keyboard;
