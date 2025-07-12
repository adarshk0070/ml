import React, { useState, useEffect } from "react";

const ChessGame = () => {
  const [board, setBoard] = useState(initializeBoard());
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState("white");
  const [gameStatus, setGameStatus] = useState("playing");
  const [capturedPieces, setCapturedPieces] = useState({
    white: [],
    black: [],
  });

  function initializeBoard() {
    const board = Array(8)
      .fill(null)
      .map(() => Array(8).fill(null));

    // Place pawns
    for (let i = 0; i < 8; i++) {
      board[1][i] = { type: "pawn", color: "black" };
      board[6][i] = { type: "pawn", color: "white" };
    }

    // Place other pieces
    const pieceOrder = [
      "rook",
      "knight",
      "bishop",
      "queen",
      "king",
      "bishop",
      "knight",
      "rook",
    ];
    for (let i = 0; i < 8; i++) {
      board[0][i] = { type: pieceOrder[i], color: "black" };
      board[7][i] = { type: pieceOrder[i], color: "white" };
    }

    return board;
  }

  const getPieceSymbol = (piece) => {
    if (!piece) return "";

    const symbols = {
      white: {
        king: "♔",
        queen: "♕",
        rook: "♖",
        bishop: "♗",
        knight: "♘",
        pawn: "♙",
      },
      black: {
        king: "♚",
        queen: "♛",
        rook: "♜",
        bishop: "♝",
        knight: "♞",
        pawn: "♟",
      },
    };

    return symbols[piece.color][piece.type];
  };

  const isValidMove = (fromRow, fromCol, toRow, toCol) => {
    const piece = board[fromRow][fromCol];
    if (!piece || piece.color !== currentPlayer) return false;

    const targetPiece = board[toRow][toCol];
    if (targetPiece && targetPiece.color === piece.color) return false;

    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);

    switch (piece.type) {
      case "pawn":
        const direction = piece.color === "white" ? -1 : 1;
        const startRow = piece.color === "white" ? 6 : 1;

        // Forward move
        if (fromCol === toCol && !targetPiece) {
          if (toRow === fromRow + direction) return true;
          if (fromRow === startRow && toRow === fromRow + 2 * direction)
            return true;
        }
        // Capture
        if (colDiff === 1 && toRow === fromRow + direction && targetPiece) {
          return true;
        }
        return false;

      case "rook":
        return (
          (rowDiff === 0 || colDiff === 0) &&
          isPathClear(fromRow, fromCol, toRow, toCol)
        );

      case "bishop":
        return (
          rowDiff === colDiff && isPathClear(fromRow, fromCol, toRow, toCol)
        );

      case "queen":
        return (
          (rowDiff === 0 || colDiff === 0 || rowDiff === colDiff) &&
          isPathClear(fromRow, fromCol, toRow, toCol)
        );

      case "king":
        return rowDiff <= 1 && colDiff <= 1;

      case "knight":
        return (
          (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)
        );

      default:
        return false;
    }
  };

  const isPathClear = (fromRow, fromCol, toRow, toCol) => {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
      if (board[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }

    return true;
  };

  const handleSquareClick = (row, col) => {
    if (gameStatus !== "playing") return;

    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;

      if (fromRow === row && fromCol === col) {
        setSelectedSquare(null);
        return;
      }

      if (isValidMove(fromRow, fromCol, row, col)) {
        const newBoard = board.map((row) => [...row]);
        const capturedPiece = newBoard[row][col];

        if (capturedPiece) {
          setCapturedPieces((prev) => ({
            ...prev,
            [currentPlayer]: [...prev[currentPlayer], capturedPiece],
          }));
        }

        newBoard[row][col] = newBoard[fromRow][fromCol];
        newBoard[fromRow][fromCol] = null;

        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "white" ? "black" : "white");
        setSelectedSquare(null);

        // Check for checkmate (simplified)
        if (capturedPiece && capturedPiece.type === "king") {
          setGameStatus(`${currentPlayer} wins!`);
        }
      } else {
        setSelectedSquare([row, col]);
      }
    } else {
      const piece = board[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setSelectedSquare(null);
    setCurrentPlayer("white");
    setGameStatus("playing");
    setCapturedPieces({ white: [], black: [] });
  };

  return (
    <div style={styles.container}>
      <div style={styles.gameInfo}>
        <h2 style={styles.title}>Chess Game</h2>
        <div style={styles.status}>
          Current Player:{" "}
          <span style={{ color: currentPlayer === "white" ? "#fff" : "#000" }}>
            {currentPlayer.toUpperCase()}
          </span>
        </div>
        <div style={styles.gameStatus}>{gameStatus}</div>
        <button style={styles.resetButton} onClick={resetGame}>
          New Game
        </button>
      </div>

      <div style={styles.gameArea}>
        <div style={styles.capturedPieces}>
          <h4>Captured by White:</h4>
          <div style={styles.pieces}>
            {capturedPieces.white.map((piece, index) => (
              <span key={index} style={styles.capturedPiece}>
                {getPieceSymbol(piece)}
              </span>
            ))}
          </div>
        </div>

        <div style={styles.board}>
          {board.map((row, rowIndex) => (
            <div key={rowIndex} style={styles.row}>
              {row.map((piece, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    ...styles.square,
                    backgroundColor:
                      (rowIndex + colIndex) % 2 === 0 ? "#f0d9b5" : "#b58863",
                    ...(selectedSquare &&
                    selectedSquare[0] === rowIndex &&
                    selectedSquare[1] === colIndex
                      ? styles.selectedSquare
                      : {}),
                  }}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                >
                  <span style={styles.piece}>{getPieceSymbol(piece)}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={styles.capturedPieces}>
          <h4>Captured by Black:</h4>
          <div style={styles.pieces}>
            {capturedPieces.black.map((piece, index) => (
              <span key={index} style={styles.capturedPiece}>
                {getPieceSymbol(piece)}
              </span>
            ))}
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
    backgroundColor: "#2c3e50",
    minHeight: "100vh",
    color: "#fff",
  },
  gameInfo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "10px",
    color: "#ecf0f1",
  },
  status: {
    fontSize: "1.5rem",
    marginBottom: "10px",
  },
  gameStatus: {
    fontSize: "1.2rem",
    marginBottom: "15px",
    color: "#e74c3c",
  },
  resetButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  gameArea: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
  },
  capturedPieces: {
    width: "150px",
    padding: "10px",
    backgroundColor: "#34495e",
    borderRadius: "5px",
  },
  pieces: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  },
  capturedPiece: {
    fontSize: "1.5rem",
  },
  board: {
    display: "flex",
    flexDirection: "column",
    border: "3px solid #34495e",
    borderRadius: "5px",
  },
  row: {
    display: "flex",
  },
  square: {
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  selectedSquare: {
    backgroundColor: "#e74c3c !important",
    boxShadow: "0 0 10px rgba(231, 76, 60, 0.5)",
  },
  piece: {
    fontSize: "2rem",
    userSelect: "none",
  },
};

export default ChessGame;
