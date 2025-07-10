import React from 'react';

const GameOver = ({ score, onRestart }) => {
    return (
        <div className="game-over">
            <h1>Game Over</h1>
            <p>Your Score: {score}</p>
            <button onClick={onRestart}>Restart Game</button>
        </div>
    );
};

export default GameOver;