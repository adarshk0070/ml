// src/App.jsx
import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Regular imports
import Home from "./Home";
import GameMenu from "./components/GameMenu";

// Lazy load game components
const BikeGame = lazy(() => import("./components/BikeGame"));
const QuizGame = lazy(() => import("./components/QuizGame"));
const CarGame = lazy(() => import("./components/CarGame"));
const ChessGame = lazy(() => import("./components/ChessGame"));
const TicTacToe = lazy(() => import("./components/TicTacToe"));
const ConnectFour = lazy(() => import("./components/ConnectFour"));
const SnakeAndLadder = lazy(() => import("./components/SnakeAndLadder"));

function App() {
  return (
    <Router>
      <Suspense
        fallback={
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            Loading Game...
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameMenu />} />
          <Route path="/games/bike" element={<BikeGame />} />
          <Route path="/games/quiz" element={<QuizGame />} />
          <Route path="/games/car" element={<CarGame />} />
          <Route path="/games/chess" element={<ChessGame />} />
          <Route path="/games/tictactoe" element={<TicTacToe />} />
          <Route path="/games/connect4" element={<ConnectFour />} />
          <Route path="/games/snakeladder" element={<SnakeAndLadder />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
