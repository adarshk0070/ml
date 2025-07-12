import React, { useState, useEffect } from "react";

const SnakeAndLadder = () => {
  const BOARD_SIZE = 100;
  const [players, setPlayers] = useState([
    { id: 1, name: "Player 1", position: 0, color: "#e74c3c" },
    { id: 2, name: "Player 2", position: 0, color: "#3498db" },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [isRolling, setIsRolling] = useState(false);
  const [moveHistory, setMoveHistory] = useState([]);
  const [gameMode, setGameMode] = useState("human");

  // Snakes and Ladders configuration
  const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78,
  };

  const ladders = {
    1: 38,
    4: 14,
    9: 21,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100,
  };

  useEffect(() => {
    if (gameMode === "ai" && currentPlayer === 1 && !gameOver) {
      const timer = setTimeout(() => {
        rollDice();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameOver]);

  const rollDice = () => {
    if (isRolling || gameOver) return;

    setIsRolling(true);

    // Animate dice roll
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;

      if (rollCount >= 10) {
        clearInterval(rollInterval);
        const finalDiceValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalDiceValue);
        movePlayer(finalDiceValue);
        setIsRolling(false);
      }
    }, 100);
  };

  const movePlayer = (diceValue) => {
    setPlayers((prevPlayers) => {
      const newPlayers = [...prevPlayers];
      const player = newPlayers[currentPlayer];
      let newPosition = player.position + diceValue;

      // Check if player exceeds 100
      if (newPosition > 100) {
        newPosition = player.position; // Stay in same position
      }

      // Check for snakes and ladders
      let specialMove = null;
      if (snakes[newPosition]) {
        specialMove = `Snake! Moved from ${newPosition} to ${snakes[newPosition]}`;
        newPosition = snakes[newPosition];
      } else if (ladders[newPosition]) {
        specialMove = `Ladder! Moved from ${newPosition} to ${ladders[newPosition]}`;
        newPosition = ladders[newPosition];
      }

      player.position = newPosition;

      // Add to history
      setMoveHistory((prev) => [
        ...prev,
        {
          player: player.name,
          dice: diceValue,
          from: player.position - diceValue,
          to: newPosition,
          special: specialMove,
        },
      ]);

      // Check for winner
      if (newPosition === 100) {
        setWinner(player);
        setGameOver(true);
      } else {
        // Switch to next player
        setCurrentPlayer((prevPlayer) => (prevPlayer + 1) % newPlayers.length);
      }

      return newPlayers;
    });
  };

  const resetGame = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) => ({ ...player, position: 0 }))
    );
    setCurrentPlayer(0);
    setDiceValue(1);
    setGameOver(false);
    setWinner(null);
    setMoveHistory([]);
  };

  const getBoardPosition = (position) => {
    if (position === 0) return { row: 10, col: 0 };

    const row = Math.floor((position - 1) / 10);
    const col = (position - 1) % 10;

    // Reverse direction for odd rows (snake pattern)
    const actualRow = 9 - row;
    const actualCol = row % 2 === 0 ? col : 9 - col;

    return { row: actualRow, col: actualCol };
  };

  const renderBoard = () => {
    const board = [];

    for (let row = 0; row < 10; row++) {
      const rowElements = [];
      for (let col = 0; col < 10; col++) {
        const position =
          row % 2 === 0
            ? (9 - row) * 10 + col + 1
            : (9 - row) * 10 + (9 - col) + 1;

        const isSnake = snakes[position];
        const isLadder = ladders[position];
        const playersOnSquare = players.filter((p) => p.position === position);

        rowElements.push(
          <div
            key={`${row}-${col}`}
            style={{
              ...styles.square,
              ...(isSnake ? styles.snakeSquare : {}),
              ...(isLadder ? styles.ladderSquare : {}),
              ...(position === 100 ? styles.winningSquare : {}),
            }}
          >
            <div style={styles.squareNumber}>{position}</div>
            {isSnake && <div style={styles.snakeIcon}>🐍</div>}
            {isLadder && <div style={styles.ladderIcon}>🪜</div>}
            <div style={styles.playersContainer}>
              {playersOnSquare.map((player) => (
                <div
                  key={player.id}
                  style={{
                    ...styles.playerToken,
                    backgroundColor: player.color,
                  }}
                >
                  {player.id}
                </div>
              ))}
            </div>
          </div>
        );
      }
      board.push(
        <div key={row} style={styles.row}>
          {rowElements}
        </div>
      );
    }

    return board;
  };

  return (
    <div style={styles.container}>
      <div style={styles.gameInfo}>
        <h1 style={styles.title}>Snake and Ladder</h1>

        <div style={styles.gameMode}>
          <label style={styles.label}>
            <input
              type="radio"
              value="human"
              checked={gameMode === "human"}
              onChange={(e) => setGameMode(e.target.value)}
              style={styles.radio}
            />
            Human vs Human
          </label>
          <label style={styles.label}>
            <input
              type="radio"
              value="ai"
              checked={gameMode === "ai"}
              onChange={(e) => setGameMode(e.target.value)}
              style={styles.radio}
            />
            Human vs AI
          </label>
        </div>

        <div style={styles.playerInfo}>
          {players.map((player, index) => (
            <div
              key={player.id}
              style={{
                ...styles.playerStatus,
                ...(index === currentPlayer ? styles.activePlayer : {}),
                borderColor: player.color,
              }}
            >
              <span style={{ color: player.color }}>{player.name}</span>
              <div>Position: {player.position}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.gameArea}>
        <div style={styles.leftPanel}>
          <div style={styles.diceContainer}>
            <div style={styles.dice}>
              <div style={styles.diceValue}>{diceValue}</div>
            </div>
            <button
              style={{
                ...styles.rollButton,
                ...(isRolling ? styles.rollingButton : {}),
              }}
              onClick={rollDice}
              disabled={isRolling || gameOver}
            >
              {isRolling ? "Rolling..." : "Roll Dice"}
            </button>
          </div>

          {gameOver && (
            <div style={styles.gameOverMessage}>
              <h2 style={styles.winnerText}>🎉 {winner?.name} Wins! 🎉</h2>
              <button style={styles.newGameButton} onClick={resetGame}>
                New Game
              </button>
            </div>
          )}

          <div style={styles.legend}>
            <h3>Legend:</h3>
            <div style={styles.legendItem}>
              <span>🐍 Snake</span>
            </div>
            <div style={styles.legendItem}>
              <span>🪜 Ladder</span>
            </div>
          </div>
        </div>

        <div style={styles.boardContainer}>
          <div style={styles.board}>{renderBoard()}</div>
        </div>

        <div style={styles.rightPanel}>
          <div style={styles.history}>
            <h3>Move History</h3>
            <div style={styles.historyList}>
              {moveHistory
                .slice(-10)
                .reverse()
                .map((move, index) => (
                  <div key={index} style={styles.historyItem}>
                    <div>
                      {move.player}: Rolled {move.dice}
                    </div>
                    <div style={styles.historyMove}>
                      {move.from} → {move.to}
                    </div>
                    {move.special && (
                      <div style={styles.historySpecial}>{move.special}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#1a1a2e",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
  },
  gameInfo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "20px",
    color: "#eee",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  },
  gameMode: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    justifyContent: "center",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  radio: {
    marginRight: "5px",
  },
  playerInfo: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
  },
  playerStatus: {
    padding: "10px",
    border: "2px solid",
    borderRadius: "8px",
    backgroundColor: "#16213e",
    textAlign: "center",
  },
  activePlayer: {
    backgroundColor: "#533483",
    boxShadow: "0 0 10px rgba(83, 52, 131, 0.5)",
  },
  gameArea: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
  },
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    width: "200px",
  },
  diceContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  dice: {
    width: "60px",
    height: "60px",
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
  },
  diceValue: {
    fontSize: "2rem",
  },
  rollButton: {
    padding: "10px 20px",
    fontSize: "1.1rem",
    backgroundColor: "#533483",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "bold",
  },
  rollingButton: {
    backgroundColor: "#e74c3c",
    transform: "scale(0.95)",
  },
  gameOverMessage: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#16213e",
    borderRadius: "10px",
  },
  winnerText: {
    color: "#4CAF50",
    marginBottom: "15px",
  },
  newGameButton: {
    padding: "10px 20px",
    fontSize: "1.1rem",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  legend: {
    padding: "15px",
    backgroundColor: "#16213e",
    borderRadius: "8px",
  },
  legendItem: {
    margin: "5px 0",
  },
  boardContainer: {
    display: "flex",
    justifyContent: "center",
  },
  board: {
    display: "flex",
    flexDirection: "column",
    border: "3px solid #533483",
    borderRadius: "10px",
    padding: "10px",
    backgroundColor: "#16213e",
  },
  row: {
    display: "flex",
  },
  square: {
    width: "50px",
    height: "50px",
    border: "1px solid #333",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#0f3460",
    fontSize: "10px",
  },
  snakeSquare: {
    backgroundColor: "#e74c3c",
  },
  ladderSquare: {
    backgroundColor: "#4CAF50",
  },
  winningSquare: {
    backgroundColor: "#FFD700",
    color: "#000",
  },
  squareNumber: {
    fontSize: "8px",
    fontWeight: "bold",
    position: "absolute",
    top: "2px",
    left: "2px",
  },
  snakeIcon: {
    fontSize: "12px",
    position: "absolute",
    top: "2px",
    right: "2px",
  },
  ladderIcon: {
    fontSize: "12px",
    position: "absolute",
    top: "2px",
    right: "2px",
  },
  playersContainer: {
    display: "flex",
    gap: "2px",
    position: "absolute",
    bottom: "2px",
  },
  playerToken: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "8px",
    fontWeight: "bold",
    color: "#fff",
  },
  rightPanel: {
    width: "200px",
  },
  history: {
    backgroundColor: "#16213e",
    padding: "15px",
    borderRadius: "8px",
    height: "400px",
    overflow: "hidden",
  },
  historyList: {
    maxHeight: "350px",
    overflowY: "auto",
    fontSize: "12px",
  },
  historyItem: {
    margin: "8px 0",
    padding: "8px",
    backgroundColor: "#0f3460",
    borderRadius: "4px",
  },
  historyMove: {
    color: "#3498db",
    fontWeight: "bold",
  },
  historySpecial: {
    color: "#e74c3c",
    fontSize: "10px",
    fontStyle: "italic",
  },
};

export default SnakeAndLadder;
