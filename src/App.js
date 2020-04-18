import React from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Score from './components/Score';

import './App.css'

const emptyBoard = ['', '', '', '', '', '', '', '', ''];
const startingPlayer = 'X';
const emptyScoreBoard = {'O':0,'X':0,'ties':0};

const App = () => {
  const [currentBoard, setCurrentBoard] = React.useState(JSON.parse(localStorage.getItem('currentBoard')) || emptyBoard);
  const [currentPlayer, setCurrentPlayer] = React.useState(JSON.parse(localStorage.getItem('currentPlayer')) || startingPlayer);
  const [scores, setScores] = React.useState(JSON.parse(localStorage.getItem('scores')) || {...emptyScoreBoard});
  const [message, setMessage] = React.useState('');

  const [gameOver, setGameOver] = React.useState(JSON.parse(localStorage.getItem('gameOver')) || false)

  // const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    saveToLocal()
  }, [currentBoard, currentPlayer, scores, gameOver])

  const resetBoard = () => {
    setCurrentBoard(emptyBoard);
    setCurrentPlayer(startingPlayer);
    setGameOver(false)
    setMessage('')
  }

  const resetScoreBoard = () => {
    setScores(emptyScoreBoard);
  }

  const saveToLocal = () => {
    localStorage.setItem('currentBoard',JSON.stringify(currentBoard))
    localStorage.setItem('currentPlayer',JSON.stringify(currentPlayer))
    localStorage.setItem('scores',JSON.stringify(scores))
    localStorage.setItem('gameOver',JSON.stringify(gameOver))
  }

  const nextPlayer = () => {
    if (currentPlayer === 'X') {
      setCurrentPlayer('O')
    } else {
      setCurrentPlayer('X')
    }
    console.log("next player")
  }

  const checkForWin = (board) => {
    console.log("check for win/tie")
    console.log(board)
    if (boardFull(board)) {
      let newScores = scores
      newScores['ties'] = scores['ties'] + 1
      setScores(newScores)
      setMessage('Looks like it was a tie')
      return true
    } else if (
      board[0] != '' && board[0] === board[1] && board[1] === board[2] ||
      board[3] != '' && board[3] === board[4] && board[4] === board[5] ||
      board[6] != '' && board[6] === board[7] && board[7] === board[8] ||
      board[0] != '' && board[0] === board[3] && board[3] === board[6] ||
      board[1] != '' && board[1] === board[4] && board[4] === board[7] ||
      board[2] != '' && board[2] === board[5] && board[5] === board[8] ||
      board[0] != '' && board[0] === board[4] && board[4] === board[8] ||
      board[2] != '' && board[2] === board[4] && board[4] === board[6]) {
        let newScores = scores
        newScores[currentPlayer] = newScores[currentPlayer] + 1
        setScores(newScores)
        setGameOver(true)
        setMessage('Player ' + currentPlayer + " won!")
        return true
      }
    return false
  }

  const boardFull = (board) => {
    for (var i = 0; i < 10; i++) {
      if (board[i] === '') {
        return false;
      }
    }
    return true;
  }

  const updateBoard = (index) => {
    if (!gameOver) {
      if (currentBoard[index] === '')  {
        let newArr = [...currentBoard];
        newArr[index] = currentPlayer;
        setCurrentBoard(newArr);
        if (checkForWin(newArr)) {
          console.log('game over')
        } else {
          nextPlayer();
        }
        // saveToLocal()
      } else {
        console.log("cant pick that one")
      }
    }
  }

  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <Score scores={scores}/>
      CurrentPlayer: {currentPlayer}
      <Board currentBoard={currentBoard} updateBoard={updateBoard} currentPlayer={currentPlayer}/>
      <br/>
      <Controls resetBoard={resetBoard} resetScoreBoard={resetScoreBoard}/>
      {message &&
        <h2>
          {message}
        </h2>
      }
    </div>
  );
}

export default App;
