import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';

// import { WINNING_COMBINATIONS } from './winning-combinations.js';

const initialGameBoard = Array(3).fill().map(a => Array(3).fill().map(x=>null));

function deriveActivePlayer(gameTurns) {
  // don't really need this simple function
  return (gameTurns.length > 0 && gameTurns[0].player === 'X') ? 'O' : 'X';
}

function checkRow(row) {
  if (!row[0])
    return null;
  // return row.reduce((a,b) => a === b ? a : null, row[0]);
  return (row[0] == row[1] && row[1] == row[2]) ? row[0] : null;
}

function isWinner(gameBoard) {
  for (let r = 0; r < 3; r++) {
    if (checkRow(gameBoard[r]))
      return gameBoard[r][0];
    if (r === 0) {
      // top row:  check all the colums & down diag
      for (let c = 0; c < 3; c++) {
        if (checkRow([gameBoard[0][c], gameBoard[1][c], gameBoard[2][c]]))
          return gameBoard[0][c];
      }
      // check the down diag...
      if (checkRow([gameBoard[0][0], gameBoard[1][1], gameBoard[2][2]]))
        return gameBoard[0][0];
    } else if (r == 2) {
      // check diag-up
      if (checkRow([gameBoard[2][0], gameBoard[1][1], gameBoard[0][2]]))
        return gameBoard[2][0];
    }
  }
  return null;
}

function App() {
  const [turns, addTurn] = useState([]);
  const [players, setPlayers] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  // const [activePlayer, setPlayer] = useState('X');
  let activePlayer = deriveActivePlayer(turns);
  let gameBoard = [...initialGameBoard.map(a => [...a])]; // yes, should be a copy.
  // gameBoard = Array(3).fill().map(a => Array(3).fill().map(x=>null))

  for (const t of turns) {
    const {square: {row: row, col: col}, player } = t;
    gameBoard[row][col] = player;
  }

  let winner = isWinner(gameBoard);
  let isDraw = (!winner && turns.length == 9) ? true : false;
  if (winner) {
    console.log(`winner is ${winner} => ${players[winner]}`);
    winner = players[winner];
  }

  function handleSelectSquare(row, col) {
    addTurn(prevTurns => {
      const nextPlayer = deriveActivePlayer(prevTurns);
      return [ {square: {row, col}, player: nextPlayer}, ...prevTurns];
    });
  }
  
  function handleRestart() {
    console.log("Restart!");
    addTurn([]); // sets turns back to an empty array.
  }

  function playerNameChange(symbol, newName) {
    console.log(`Set player ${symbol} => ${newName}`);
    setPlayers(prevPlayers => ({...prevPlayers, [symbol]: newName}));
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >
          <Player initialName={players.X} symbol="X" isActive={activePlayer == 'X'}
            onChangeName={playerNameChange}
          />
          <Player initialName={players.O} symbol="O" isActive={activePlayer == 'O'}
            onChangeName={playerNameChange}
          />
        </ol>

        { (winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart}/> }
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App
