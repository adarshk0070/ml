// // src/App.jsx
// import React from "react";
// import { HashRouter as Router, Routes, Route } from "react-router-dom"; // 👈
// import Home from "./Home";
// import GameList from "./GameList";
// import DinoGame from "./components/DinoGame";
// import QuizGame from "./components/QuizGame";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/games" element={<GameList />} />
//         <Route path="/games/dino" element={<DinoGame />} />
//         <Route path="/games/quiz" element={<QuizGame />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// src/App.jsx
import React, { Suspense, lazy } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

// Regular imports
import Home from "./Home";
import GameList from "./GameList";

// ✅ Lazy load game components
const DinoGame = lazy(() => import("./components/DinoGame"));
const QuizGame = lazy(() => import("./components/QuizGame"));

function App() {
  return (
    <Router>
      {/* Wrap routes in Suspense to show fallback while loading */}
      <Suspense fallback={<div style={{ textAlign: "center", marginTop: "50px" }}>Loading Game...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<GameList />} />
          <Route path="/games/dino" element={<DinoGame />} />
          <Route path="/games/quiz" element={<QuizGame />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
