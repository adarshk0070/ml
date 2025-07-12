import React, { useState, useEffect } from 'react';

const ConnectFour = () => {
  const ROWS = 6;
  const COLS = 7;
  const [board, setBoard] = useState(() => 
    Array(ROWS).fill(null).map(() => Array(COLS).fill(null))
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [winner, setWinner] = useState(null);
  const [gameMode, setGameMode] = useState('human');
  const [scores, setScores] = useState({ player1: 0, player2: 0, ties: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [winningCells, setWinningCells] = useState([]);
  const [isDropping, setIsDropping] = useState(false);

  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningCells(result.cells);
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        [`player${result.winner}`]: prev[`player${result.winner}`] + 1
      }));
    } else if (board.every(row => row.every(cell => cell !== null))) {
      setWinner('tie');
      setGameOver(true);
      setScores(prev => ({
        ...prev,
        ties: prev.ties + 1
      }));
    }
  }, [board]);

  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 2 && !gameOver) {
      const timer = setTimeout(() => {
        makeAIMove();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameOver]);

  const checkWinner = (currentBoard) => {
    // Check horizontal
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        const cells = [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]];
        if (cells.every(([r, c]) => currentBoard[r][c] === currentBoard[row][col] && currentBoard[r][c] !== null)) {
          return { winner: currentBoard[row][col], cells };
        }
      }
    }

    // Check vertical
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLS; col++) {
        const cells = [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]];
        if (cells.every(([r, c]) => currentBoard[r][c] === currentBoard[row][col] && currentBoard[r][c] !== null)) {
          return { winner: currentBoard[row][col], cells };
        }
      }
    }

    // Check diagonal (top-left to bottom-right)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 0; col < COLS - 3; col++) {
        const cells = [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]];
        if (cells.every(([r, c]) => currentBoard[r][c] === currentBoard[row][col] && currentBoard[r][c] !== null)) {
          return { winner: currentBoard[row][col], cells };
        }
      }
    }

    // Check diagonal (top-right to bottom-left)
    for (let row = 0; row < ROWS - 3; row++) {
      for (let col = 3; col < COLS; col++) {
        const cells = [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]];
        if (cells.every(([r, c]) => currentBoard[r][c] === currentBoard[row][col] && currentBoard[r][c] !== null)) {
          return { winner: currentBoard[row][col], cells };
        }
      }
    }

    return null;
  };

  const dropPiece = (col) => {
    if (gameOver || isDropping || board[0][col] !== null) return;

    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        setIsDropping(true);
        setTimeout(() => {
          setBoard(prev => {
            const newBoard = prev.map(row => [...row]);
            newBoard[row][col] = currentPlayer;
            return newBoard;
          });
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          setIsDropping(false);
        }, 300);
        break;
      }
    }
  };

  const makeAIMove = () => {
    const bestCol = getBestMove(board, 2);
    if (bestCol !== -1) {
      dropPiece(bestCol);
    }
  };

  const getBestMove = (currentBoard, player) => {
    const availableCols = [];
    for (let col = 0; col < COLS; col++) {
      if (currentBoard[0][col] === null) {
        availableCols.push(col);
      }
    }

    if (availableCols.length === 0) return -1;

    // Check for winning move
    for (let col of availableCols) {
      const testBoard = simulateMove(currentBoard, col, player);
      if (checkWinner(testBoard)) {
        return col;
      }
    }

    // Check for blocking move
    const opponent = player === 1 ? 2 : 1;
    for (let col of availableCols) {
      const testBoard = simulateMove(currentBoard, col, opponent);
      if (checkWinner(testBoard)) {
        return col;
      }
    }

    // Prefer center columns
    const centerCols = [3, 2, 4, 1, 5, 0, 6];
    for (let col of centerCols) {
      if (availableCols.includes(col)) {
        return col;
      }
    }

    return availableCols[Math.floor(Math.random() * availableCols.length)];
  };

  const simulateMove = (currentBoard, col, player) => {
    const newBoard = currentBoard.map(row => [...row]);
    for (let row = ROWS - 1; row >= 0; row--) {
      if (newBoard[row][col] === null) {
        newBoard[row][col] = player;
        break;
      }
    }
    return newBoard;
  };

  const resetGame = () => {
    setBoard(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
    setCurrentPlayer(1);
    setWinner(null);
    setGameOver(false);
    setWinningCells([]);
  };

  const resetScores = () => {
    setScores({ player1: 0, player2: 0, ties: 0 });
  };

  const isWinningCell = (row, col) => {
    return winningCells.some(([r, c]) => r === row && c === col);
  };

  const renderCell = (row, col) => {
    const cellValue = board[row][col];
    const isWinning = isWinningCell(row, col);
    
    return (
      <div
        key={`${row}-${col}`}
        style={{
          ...styles.cell,
          ...(isWinning ? styles.winningCell : {})
        }}
        onClick={() => dropPiece(col)}
      >
        <div
          style={{
            ...styles.piece,
            ...(cellValue === 1 ? styles.player1Piece : {}),
            ...(cellValue === 2 ? styles.player2Piece : {}),
            ...(cellValue ? styles.activePiece : {})
          }}
        />
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.gameInfo}>
        <h1 style={styles.title}>Connect Four</h1>
        
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
              <span style={styles.player1}>Player 1</span>: {scores.player1}
            </div>
            <div style={styles.scoreItem}>
              <span style={styles.player2}>Player 2</span>: {scores.player2}
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
                <span style={winner === 1 ? styles.player1 : styles.player2}>
                  Player {winner}
                </span> wins!
              </span>
            )
          ) : (
            <span>
              Current player: <span style={currentPlayer === 1 ? styles.player1 : styles.player2}>
                Player {currentPlayer}
              </span>
              {gameMode === 'ai' && currentPlayer === 2 && ' (AI thinking...)'}
            </span>
          )}
        </div>
        
        <div style={styles.board}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((_, colIndex) => renderCell(rowIndex, colIndex))}
            </div>
          ))}
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
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#16213e',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
  },
  row: {
    display: 'flex'
  },
  cell: {
    width: '80px',
    height: '80px',
    backgroundColor: '#0f3460',
    margin: '3px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: '3px solid #533483'
  },
  winningCell: {
    backgroundColor: '#4CAF50',
    boxShadow: '0 0 20px rgba(76, 175, 80, 0.6)'
  },
  piece: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    transition: 'all 0.3s ease'
  },
  activePiece: {
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
  },
  player1: {
    color: '#e74c3c'
  },
  player2: {
    color: '#3498db'
  },
  player1Piece: {
    backgroundColor: '#e74c3c',
    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3)'
  },
  player2Piece: {
    backgroundColor: '#3498db',
    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.3)'
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

export default ConnectFour;