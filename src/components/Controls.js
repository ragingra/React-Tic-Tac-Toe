import React from 'react';
import './Controls.css';

const Controls = ({resetBoard, resetScoreBoard}) => {
  return (
    <div>
        <button onClick={() => resetBoard()}>Reset Board</button>
        <button onClick={() => resetScoreBoard()}>Reset Scores</button>
    </div>
  );
}

export default Controls;