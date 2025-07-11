import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Bike images
import bikeRun1 from "../assets/bike/bike1.jpg";
import bikeRun2 from "../assets/bike/bike2.jpg";
import bikeJump from "../assets/bike/bike3.jpg";
import bikeDead from "../assets/bike/bike4.jpg";

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

const cactusImages = [
  largeCactus1,
  largeCactus2,
  largeCactus3,
  smallCactus1,
  smallCactus2,
  smallCactus3,
];
const birdFrames = [bird1, bird2];
const bikeRunFrames = [bikeRun1, bikeRun2];

// Sound effects
const playSound = (soundType) => {
  try {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    let frequency = 440; // Default frequency

    switch (soundType) {
      case "jump":
        frequency = 800;
        break;
      case "collision":
        frequency = 200;
        break;
      case "engine":
        frequency = 300;
        break;
      default:
        frequency = 440;
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.001,
      audioContext.currentTime + 0.3
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.warn("🔇 Audio playback failed:", error.message);
  }
};

export default function BikeGame() {
  const [isJumping, setIsJumping] = useState(false);
  const [bikeFrame, setBikeFrame] = useState(0);
  const [obstacleX, setObstacleX] = useState(1000);
  const [obstacleType, setObstacleType] = useState("cactus");
  const [obstacleImage, setObstacleImage] = useState(largeCactus1);
  const [birdFrame, setBirdFrame] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  // Component initialization logging
  useEffect(() => {
    console.log("🚴‍♂️ BikeGame component initialized");
    console.log("🎮 Game ready - Press SPACE to jump!");
    return () => {
      console.log("🚴‍♂️ BikeGame component unmounted");
    };
  }, []);

  const [distance, setDistance] = useState(0);
  const [jumps, setJumps] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [minHeight, setMinHeight] = useState(Infinity);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("bikeHighScore");
    return saved ? JSON.parse(saved) : { distance: 0, jumps: 0, maxHeight: 0 };
  });

  const [scoreHistory, setScoreHistory] = useState(() => {
    const saved = localStorage.getItem("bikeScoreHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const bikeRef = useRef();
  const obsRef = useRef();
  const engineSoundRef = useRef();

  // Engine sound loop
  useEffect(() => {
    if (!gameOver) {
      const engineSound = setInterval(() => {
        playSound("engine");
      }, 2000);
      engineSoundRef.current = engineSound;
      return () => clearInterval(engineSound);
    }
  }, [gameOver]);

  useEffect(() => {
    if (isJumping || gameOver) return;
    const interval = setInterval(() => {
      setBikeFrame((prev) => (prev + 1) % 2);
    }, 200);
    return () => clearInterval(interval);
  }, [isJumping, gameOver]);

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
          setObstacleImage(
            isBird
              ? birdFrames[0]
              : cactusImages[Math.floor(Math.random() * cactusImages.length)]
          );
          return 1000;
        }
        return prev - 10;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const handleJump = () => {
      if (!isJumping && !gameOver) {
        setJumps((prev) => prev + 1);
        setIsJumping(true);
        playSound("jump");
        setTimeout(() => setIsJumping(false), 700);
      }
    };

    // Mobile-first touch controls
    const gameContainer = document.querySelector('.game-container');
    
    const handleSpace = (e) => {
      if (e.code === 'Space') handleJump();
    };
    
    const handleTap = (e) => {
      e.preventDefault();
      handleJump();
    };

    // Attach events to game container for better mobile handling
    window.addEventListener('keyup', handleSpace);
    gameContainer?.addEventListener('touchstart', handleTap);
    gameContainer?.addEventListener('click', handleTap);

    return () => {
      window.removeEventListener('keyup', handleSpace);
      gameContainer?.removeEventListener('touchstart', handleTap);
      gameContainer?.removeEventListener('click', handleTap);
    };
  }, [isJumping, gameOver]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setDistance((prev) => {
        const newDistance = prev + 1;
        // Log every 100m to avoid spam
        if (newDistance % 100 === 0) {
          console.log(`🏁 Distance milestone: ${newDistance}m`);
        }
        return newDistance;
      });
      const bike = bikeRef.current?.getBoundingClientRect();
      if (bike) {
        const heightFromBottom = 200 - bike.bottom;
        if (heightFromBottom > maxHeight) setMaxHeight(heightFromBottom);
        if (heightFromBottom < minHeight) setMinHeight(heightFromBottom);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver, maxHeight, minHeight]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      const bike = bikeRef.current?.getBoundingClientRect();
      const obs = obsRef.current?.getBoundingClientRect();
      if (bike && obs) {
        const hit =
          bike.left < obs.right &&
          bike.right > obs.left &&
          bike.bottom > obs.top &&
          bike.top < obs.bottom;
        if (hit) {
          console.log("💥 Collision detected! Game Over.");
          setGameOver(true);
          playSound("collision");

          // Clear engine sound
          if (engineSoundRef.current) {
            clearInterval(engineSoundRef.current);
          }

          const current = {
            distance,
            jumps,
            maxHeight: Number(maxHeight.toFixed(2)),
            minHeight: Number(
              minHeight === Infinity ? 0 : minHeight.toFixed(2)
            ),
            timestamp: new Date().toLocaleString(),
          };

          const updatedHistory = [current, ...scoreHistory].slice(0, 10);
          setScoreHistory(updatedHistory);
          localStorage.setItem(
            "bikeScoreHistory",
            JSON.stringify(updatedHistory)
          );

          try {
            console.log("📊 Saving score data to Excel...", current);
            const ws = XLSX.utils.json_to_sheet(updatedHistory);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Bike Scores");
            const excelBuffer = XLSX.write(wb, {
              bookType: "xlsx",
              type: "array",
            });
            const blob = new Blob([excelBuffer], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            saveAs(
              blob,
              `Bike_Score_History_${
                new Date().toISOString().split("T")[0]
              }.xlsx`
            );
            console.log("✅ Excel file saved successfully!");
          } catch (error) {
            console.error("❌ Error saving Excel file:", error);
            // Fallback: download as JSON
            const jsonData = JSON.stringify(updatedHistory, null, 2);
            const jsonBlob = new Blob([jsonData], { type: "application/json" });
            saveAs(
              jsonBlob,
              `Bike_Score_History_${
                new Date().toISOString().split("T")[0]
              }.json`
            );
            console.log("💾 Fallback: Saved as JSON file");
          }

          setHighScore((prevHigh) => {
            const better = {
              distance: Math.max(prevHigh.distance, current.distance),
              jumps: Math.max(prevHigh.jumps, current.jumps),
              maxHeight: Math.max(prevHigh.maxHeight, current.maxHeight),
            };
            localStorage.setItem("bikeHighScore", JSON.stringify(better));
            return better;
          });
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [gameOver, distance, jumps, maxHeight, minHeight, scoreHistory]);

  const getBikeImage = () => {
    const image = gameOver
      ? bikeDead
      : isJumping
      ? bikeJump
      : bikeRunFrames[bikeFrame];
    // console.log("🖼️ Current bike image:", image);
    return image;
  };

  const resetGame = () => {
    console.log("🔄 Resetting game...");
    setGameOver(false);
    setObstacleX(1000);
    setIsJumping(false);
    setDistance(0);
    setJumps(0);
    setMaxHeight(0);
    setMinHeight(Infinity);
    setBikeFrame(0);
    setBirdFrame(0);
    setObstacleType("cactus");
    setObstacleImage(largeCactus1);
    console.log("✅ Game reset complete!");
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px 10px",
        fontFamily: "'Segoe UI', sans-serif",
        minHeight: "100vh",
        boxSizing: "border-box",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* ✅ Live Score at Top Right */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "40px",
          padding: "10px 15px",
          borderRadius: "8px",
          textAlign: "left",
          fontSize: "14px",
          lineHeight: "1.4",
          zIndex: 999,
        }}
      >
        <strong>🎮 Live Score</strong>
        <div>🚴‍♂️ {distance}m</div>
        <div>🦘 Jumps: {jumps}</div>
        <div>⬆️ Max Height: {maxHeight.toFixed(2)}px</div>
      </div>

      {/* Heading with symbol */}
      <div
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "12px",
          color: "#222",
        }}
      >
        <span role="img" aria-label="joystick">
          🕹️
        </span>
        <span>Bike Racing Game</span>
      </div>
      <style>
        {`
    html, body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      width: 100%;
      height: 100%;
    }

    .game-container {
      position: relative;
      width: 100%;
      width: 100%;
      height: 50vh;
      max-width: 1000px;
      min-height: 200px;
      max-height: 400px;
      touch-action: none; /* Disable browser touch gestures */
      overflow: hidden;
      margin: 20px auto;
    }

    .cloud {
      position: absolute;
      top: 20px;
      left: 30%;
      width: 80px;
      height: 40px;
      z-index: 1;
      object-fit: contain;
    }

    .track {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 20px;
      z-index: 1;
      object-fit: cover;
    }

    .bike {
      position: absolute;
      bottom: 20px;
      left: 10%;
      width: 60px;
      height: 60px;
      background-size: contain;
      background-repeat: no-repeat;
      border-radius: 5px;
      z-index: 3;
    }

    .obstacle {
      position: absolute;
      width: 60px;
      height: 60px;
      background-size: contain;
      background-repeat: no-repeat;
      border-radius: 5px;
      z-index: 2;
    }

    .game-over-img {
      margin-top: 20px;
      width: 200px;
      max-width: 80%;
    }

    .reset-button {
      margin-top: 10px;
      cursor: pointer;
      width: 60px;
      max-width: 20%;
    }

    .scoreboard {
      padding: 20px;
      margin-top: 20px;
      display: inline-block;
      border-radius: 10px;
      font-size: 16px;
      width: 90%;
      max-width: 400px;
    }

    /* Mobile-first responsive design */
    @media (max-width: 767px) {
      .game-container {
        height: 40vh;
      }
      
      .bike {
        width: 50px !important;
        height: 50px !important;
        left: 15% !important;
      }
      
      .obstacle {
        width: 40px !important;
        height: 40px !important;
        left: 85% !important;
      }
      
      .scoreboard {
        padding: 10px;
        font-size: 14px;
      }
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      .game-container {
        height: 50vh;
      }
      
      .bike {
        width: 70px !important;
        height: 70px !important;
      }
      
      .obstacle {
        width: 60px !important;
        height: 60px !important;
      }
    }

    @media (min-width: 1025px) {
      .game-container {
        height: 60vh;
      }
      
      .bike {
        width: 80px !important;
        height: 80px !important;
      }
      
      .obstacle {
        width: 70px !important;
        height: 70px !important;
      }
    }
      .game-container {
        height: 150px;
      }
      
      .bike {
        width: 40px;
        height: 40px;
        left: 5%;
      }
      
      .obstacle {
        width: 35px;
        height: 35px;
      }
      
      .scoreboard {
        padding: 10px;
        font-size: 12px;
      }
      
      .reset-button {
        width: 40px;
      }
    }
    
    @media (min-width: 481px) and (max-width: 768px) {
      .game-container {
        height: 180px;
      }

      .bike {
        width: 45px;
        height: 45px;
      }
      
      .obstacle {
        width: 45px;
        height: 45px;
      }

      .cloud {
        width: 60px;
        height: 30px;
      }

      .game-over-img {
        width: 160px;
      }

      .reset-button {
        width: 50px;
      }

      .scoreboard {
        font-size: 14px;
        padding: 15px;
        touch-action: manipulation;
        -webkit-tap-highlight-color: transparent;
      }
    }
  `}
      </style>

      {/* Game Box Centered */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="game-container">
          <img src={cloud} alt="cloud" className="cloud" />
          <img src={trackImg} alt="track" className="track" />

          <div
            className="bike"
            ref={bikeRef}
            style={{
              transform: isJumping ? "translateY(-120px)" : "translateY(0)",
              backgroundImage: `url(${getBikeImage()})`,
            }}
          />

          {!gameOver && (
            <div
              className="obstacle"
              ref={obsRef}
              style={{
                left: `${obstacleX}px`,
                backgroundImage: `url(${
                  obstacleType === "bird"
                    ? birdFrames[birdFrame]
                    : obstacleImage
                })`,
                height: obstacleType === "bird" ? "40px" : "60px",
                bottom: obstacleType === "bird" ? "120px" : "20px",
              }}
            />
          )}

          {gameOver && (
            <>
              <img
                src={gameOverImg}
                alt="Game Over"
                className="game-over-img"
              />
              <img
                src={resetImg}
                alt="Reset"
                className="reset-button"
                onClick={resetGame}
              />

              <div className="scoreboard">
                <p>🚴‍♂️ Distance: {distance}m</p>
                <p>🦘 Jumps: {jumps}</p>
                <p>🏔️ Max Height: {maxHeight.toFixed(2)}px</p>
                <p>
                  ⬇️ Lowest Position:{" "}
                  {minHeight === Infinity ? 0 : minHeight.toFixed(2)}px
                </p>
                <h4>🔥 High Score</h4>
                <p>📏 Distance: {highScore.distance}m</p>
                <p>🦘 Jumps: {highScore.jumps}</p>
                <p>🏔️ Max Height: {highScore.maxHeight.toFixed(2)}px</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
