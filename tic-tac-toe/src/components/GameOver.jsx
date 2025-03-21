

export default function GameOver({winner, onRestart}) {
    const gameStatus = winner ? `${winner} won!` : "It's a draw!";
    return (
    <div id="game-over">
        <h2>Game Over!</h2>
        <p>{gameStatus}</p>
        <p>
            <button onClick={onRestart}>Rematch!</button>
        </p>
    </div>
    );
}