import React from 'react'

import './Board.css'

const Board = ({currentBoard, currentPlayer, updateBoard}) => {
  return (
    <div>
        <div className="play-area">
            {currentBoard.map((player, index) => (<div key={index} id={"block_" + index} className="block" onClick={() => updateBoard(index)}>{player}</div>))}
        </div>
    </div>
    
  );
}

export default Board;