import React, { useState, useEffect } from 'react';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('human'); // 'human' or 'ai'
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [gameOver, setGameOver] = useState(false);

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result);
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        [result]: prev[result] + 1
      }));
    } else if (board.every(cell => cell !== null)) {
      setWinner('tie');
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        ties: prev.ties + 1
      }));
    }
  }, [board]);

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'O' && !gameOver) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameOver]);

  const checkWinner = (currentBoard) => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  const makeMove = (index) => {
    if (board[index] || winner || gameOver) return;
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  };

  const makeAIMove = () => {
    const bestMove = getBestMove(board, 'O');
    if (bestMove !== -1) {
      makeMove(bestMove);
    }
  };

  const getBestMove = (currentBoard, player) => {
    // AI using minimax algorithm
    const availableMoves = currentBoard.map((cell, index) => cell === null ? index : null).filter(val => val !== null);
    
    if (availableMoves.length === 0) return -1;
    
    // Check for winning move
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = player;
      if (checkWinner(testBoard) === player) {
        return move;
      }
    }
    
    // Check for blocking move
    const opponent = player === 'X' ? 'O' : 'X';
    for (let move of availableMoves) {
      const testBoard = [...currentBoard];
      testBoard[move] = opponent;
      if (checkWinner(testBoard) === opponent) {
        return move;
      }
    }
    
    // Take center if available
    if (availableMoves.includes(4)) {
      return 4;
    }
    
    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(corner => availableMoves.includes(corner));
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }
    
    // Take any available move
    return availableMoves[Math.floor(Math.random() * availableMoves.length)];
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
    setGameOver(false);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0, ties: 0 });
  };

  const renderSquare = (index) => {
    const isWinningSquare = winner && winner !== 'tie' && 
      winningCombinations.some(combo => 
        combo.includes(index) && combo.every(i => board[i] === winner)
      );

    return (
      <button
        key={index}
        style={{
          ...styles.square,
          ...(isWinningSquare ? styles.winningSquare : {}),
          ...(board[index] === 'X' ? styles.playerX : {}),
          ...(board[index] === 'O' ? styles.playerO : {})
        }}
        onClick={() => makeMove(index)}
        disabled={gameOver || board[index] !== null}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.gameInfo}>
        <h1 style={styles.title}>Tic-Tac-Toe</h1>
        
        <div style={styles.gameMode}>
          <label style={styles.label}>
            <input
              type="radio"
              value="human"
              checked={gameMode === 'human'}
              onChange={(e) => setGameMode(e.target.value)}
              style={styles.radio}
            />
            Human vs Human
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              value="ai"
              checked={gameMode === 'ai'}
              onChange={(e) => setGameMode(e.target.value)}
              style={styles.radio}
            />
            Human vs AI
          </label>
        </div>
        
        <div style={styles.scores}>
          <h3>Scoreboard</h3>
          <div style={styles.scoreBoard}>
            <div style={styles.scoreItem}>
              <span style={styles.playerX}>X</span>: {scores.X}
            </div>
            <div style={styles.scoreItem}>
              <span style={styles.playerO}>O</span>: {scores.O}
            </div>
            <div style={styles.scoreItem}>
              Ties: {scores.ties}
            </div>
          </div>
        </div>
      </div>
      
      <div style={styles.gameArea}>
        <div style={styles.status}>
          {winner ? (
            winner === 'tie' ? (
              <span style={styles.tieMessage}>It's a tie!</span>
            ) : (
              <span style={styles.winnerMessage}>
                Player <span style={winner === 'X' ? styles.playerX : styles.playerO}>{winner}</span> wins!
              </span>
            )
          ) : (
            <span>
              Current player: <span style={currentPlayer === 'X' ? styles.playerX : styles.playerO}>{currentPlayer}</span>
              {gameMode === 'ai' && currentPlayer === 'O' && ' (AI thinking...)'}
            </span>
          )}
        </div>
        
        <div style={styles.board}>
          {board.map((_, index) => renderSquare(index))}
        </div>
        
        <div style={styles.controls}>
          <button style={styles.button} onClick={resetGame}>
            New Game
          </button>
          <button style={styles.button} onClick={resetScores}>
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#1a1a2e',
    minHeight: '100vh',
    color: '#fff',
    fontFamily: 'Arial, sans-serif'
  },
  gameInfo: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    color: '#eee',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
  },
  gameMode: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    justifyContent: 'center'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer'
  },
  radio: {
    marginRight: '5px'
  },
  scores: {
    marginBottom: '20px'
  },
  scoreBoard: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center'
  },
  scoreItem: {
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  gameArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px'
  },
  status: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  winnerMessage: {
    color: '#4CAF50',
    fontSize: '2rem'
  },
  tieMessage: {
    color: '#FF9800',
    fontSize: '2rem'
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '5px',
    padding: '20px',
    backgroundColor: '#16213e',
    borderRadius: '10px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  square: {
    width: '100px',
    height: '100px',
    fontSize: '3rem',
    fontWeight: 'bold',
    backgroundColor: '#0f3460',
    color: '#fff',
    border: '2px solid #533483',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  winningSquare: {
    backgroundColor: '#4CAF50',
    boxShadow: '0 0 20px rgba(76, 175, 80, 0.6)'
  },
  playerX: {
    color: '#e74c3c'
  },
  playerO: {
    color: '#3498db'
  },
  controls: {
    display: 'flex',
    gap: '15px'
  },
  button: {
    padding: '12px 24px',
    fontSize: '1.1rem',
    backgroundColor: '#533483',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: 'bold'
  }
};

export default TicTacToe;