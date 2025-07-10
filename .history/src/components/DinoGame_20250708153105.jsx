import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Dino images
import dinoRun1 from "../assets/Dino/DinoRun1.png";
import dinoRun2 from "../assets/Dino/DinoRun2.png";
import dinoJump from "../assets/Dino/DinoJump.png";
import dinoDuck1 from "../assets/Dino/DinoDuck1.png";
import dinoDuck2 from "../assets/Dino/DinoDuck2.png";
import dinoDead from "../assets/Dino/DinoDead.png";

// Cactus images
import largeCactus1 from "../assets/Cactus/LargeCactus1.png";
import largeCactus2 from "../assets/Cactus/LargeCactus2.png";
import largeCactus3 from "../assets/Cactus/LargeCactus3.png";
import smallCactus1 from "../assets/Cactus/SmallCactus1.png";
import smallCactus2 from "../assets/Cactus/SmallCactus2.png";
import smallCactus3 from "../assets/Cactus/SmallCactus3.png";

// Bird images
import bird1 from "../assets/Bird/Bird1.png";
import bird2 from "../assets/Bird/Bird2.png";

// Other UI
import cloud from "../assets/Others/Cloud.png";
import trackImg from "../assets/Others/Track.png";
import gameOverImg from "../assets/Others/GameOver.png";
import resetImg from "../assets/Others/Reset.png";

import "../styles/game.css";

const cactusImages = [largeCactus1, largeCactus2, largeCactus3, smallCactus1, smallCactus2, smallCactus3];
const birdFrames = [bird1, bird2];
const dinoRunFrames = [dinoRun1, dinoRun2];
const dinoDuckFrames = [dinoDuck1, dinoDuck2];

export default function DinoGame() {
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false);
  const [dinoFrame, setDinoFrame] = useState(0);
  const [obstacleX, setObstacleX] = useState(1000);
  const [obstacleType, setObstacleType] = useState("cactus");
  const [obstacleImage, setObstacleImage] = useState(largeCactus1);
  const [birdFrame, setBirdFrame] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const [distance, setDistance] = useState(0);
  const [jumps, setJumps] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [minHeight, setMinHeight] = useState(Infinity);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("highScore");
    return saved ? JSON.parse(saved) : { distance: 0, jumps: 0, maxHeight: 0 };
  });

  const [scoreHistory, setScoreHistory] = useState(() => {
    const saved = localStorage.getItem("scoreHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const dinoRef = useRef();
  const obsRef = useRef();

  useEffect(() => {
    if (isJumping || gameOver) return;
    const interval = setInterval(() => {
      setDinoFrame((prev) => (prev + 1) % 2);
    }, 200);
    return () => clearInterval(interval);
  }, [isJumping, isDucking, gameOver]);

  useEffect(() => {
    if (obstacleType !== "bird") return;
    const flap = setInterval(() => {
      setBirdFrame((prev) => (prev + 1) % 2);
    }, 300);
    return () => clearInterval(flap);
  }, [obstacleType]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setObstacleX((prev) => {
        if (prev < -50) {
          const isBird = Math.random() < 0.3;
          setObstacleType(isBird ? "bird" : "cactus");
          setObstacleImage(isBird ? birdFrames[0] : cactusImages[Math.floor(Math.random() * cactusImages.length)]);
          return 1000;
        }
        return prev - 10;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "ArrowDown" && !isJumping) setIsDucking(true);
    };

    const handleKeyUp = (e) => {
      if (e.code === "Space" && !isJumping && !gameOver) {
        setJumps((prev) => prev + 1);
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 700);
      }
      if (e.code === "ArrowDown") setIsDucking(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isJumping, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setDistance((prev) => prev + 1);
      const dino = dinoRef.current?.getBoundingClientRect();
      if (dino) {
        const heightFromBottom = 200 - dino.bottom;
        if (heightFromBottom > maxHeight) setMaxHeight(heightFromBottom);
        if (heightFromBottom < minHeight) setMinHeight(heightFromBottom);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const dino = dinoRef.current?.getBoundingClientRect();
      const obs = obsRef.current?.getBoundingClientRect();
      if (dino && obs) {
        const hit =
          dino.left < obs.right &&
          dino.right > obs.left &&
          dino.bottom > obs.top &&
          dino.top < obs.bottom;
        if (hit) {
          setGameOver(true);

          const current = {
            distance,
            jumps,
            maxHeight: Number(maxHeight.toFixed(2)),
            minHeight: Number(minHeight.toFixed(2)),
            timestamp: new Date().toLocaleString(),
          };

          const updatedHistory = [current, ...scoreHistory].slice(0, 10);
          setScoreHistory(updatedHistory);
          localStorage.setItem("scoreHistory", JSON.stringify(updatedHistory));

          const ws = XLSX.utils.json_to_sheet(updatedHistory);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Dino Scores");
          const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
          const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
          saveAs(blob, "Dino_Score_History.xlsx");

          setHighScore((prevHigh) => {
            const better = {
              distance: Math.max(prevHigh.distance, current.distance),
              jumps: Math.max(prevHigh.jumps, current.jumps),
              maxHeight: Math.max(prevHigh.maxHeight, current.maxHeight),
            };
            localStorage.setItem("highScore", JSON.stringify(better));
            return better;
          });
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver]);

  const getDinoImage = () => {
    if (gameOver) return dinoDead;
    if (isJumping) return dinoJump;
    if (isDucking) return dinoDuckFrames[dinoFrame];
    return dinoRunFrames[dinoFrame];
  };

  const resetGame = () => {
    setGameOver(false);
    setObstacleX(1000);
    setIsJumping(false);
    setIsDucking(false);
    setDistance(0);
    setJumps(0);
    setMaxHeight(0);
    setMinHeight(Infinity);
  };

//   return (
//   <div
//     style={{
//       textAlign: "center",
//       padding: "30px",
//       backgroundColor: "#fff",
//       fontFamily: "'Segoe UI', sans-serif",
//       minHeight: "100vh",
//     }}
//   >
//     {/* Heading with symbol */}
//     <div
//       style={{
//         fontSize: "28px",
//         fontWeight: "bold",
//         marginBottom: "20px",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "12px",
//         color: "#222",
//       }}
//     >
//       <span role="img" aria-label="joystick">🕹️</span>
//       No Internet Game
    

//     {/* Game Box Centered */}
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <div className="game-container">
//         {/* ...existing game elements here like cloud, dino, track, etc... */}

//         {/* all your game logic elements — dino, obstacle, gameOver UI, etc. */}
//         {/* You can paste everything that was previously inside your <div className="game-container"> here */}

//       </div>
//     </div>
//   </div>


    
//     <div className="game-container">
//       <img src={cloud} alt="cloud" className="cloud" />
//       <img src={trackImg} alt="track" className="track" />

//       <div
//         className="dino"
//         ref={dinoRef}
//         style={{
//           transform: isJumping ? "translateY(-120px)" : "translateY(0)",
//           height: isDucking ? "35px" : "50px",
//           backgroundImage: `url(${getDinoImage()})`,
//         }}
//       />

//       {!gameOver && (
//         <div
//           className="obstacle"
//           ref={obsRef}
//           style={{
//             left: `${obstacleX}px`,
//             backgroundImage: `url(${obstacleType === "bird" ? birdFrames[birdFrame] : obstacleImage})`,
//             height: obstacleType === "bird" ? "40px" : "50px",
//             bottom: obstacleType === "bird" ? "80px" : "20px",
//           }}
//         />
//       )}

//       {gameOver && (
//         <>
//           <img src={gameOverImg} alt="Game Over" className="game-over-img" />
//           <img src={resetImg} alt="Reset" className="reset-button" onClick={resetGame} />

//           <div className="scoreboard">
//             <p>🏃‍♂️ Distance: {distance}m</p>
//             <p>🦘 Jumps: {jumps}</p>
//             <p>🏔️ Max Height: {maxHeight.toFixed(2)}px</p>
//             <p>⬇️ Lowest Duck: {minHeight === Infinity ? 0 : minHeight.toFixed(2)}px</p>
//             <h4>🔥 High Score</h4>
//             <p>📏 Distance: {highScore.distance}m</p>
//             <p>🦘 Jumps: {highScore.jumps}</p>
//             <p>🏔️ Max Height: {highScore.maxHeight.toFixed(2)}px</p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
