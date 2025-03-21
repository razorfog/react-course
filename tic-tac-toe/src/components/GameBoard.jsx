

export default function GameBoard({onSelectSquare, board}) {
    return (
    <ol id="game-board">
      {board.map((row,rowI) => {
        return (
        <li key={rowI}>
         <ol>
          {row.map((symbol, colI) => (
            <li key={colI}>
              <button
                onClick={() => onSelectSquare(rowI, colI)}
                disabled={symbol !== null}
              >
                {symbol}
              </button>
            </li>))
           }
        </ol>
        </li>)})}
      </ol>);
}