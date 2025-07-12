import React, { useState, useEffect, useRef } from "react";
import { gameSettings } from "../data/config";

const GameScreen = ({ avatar, car, track, onGameOver }) => {
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gameLoopRef = useRef(null);
  const canvasRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Game state
  const gameState = useRef({
    position: { x: 50, y: 300 },
    velocity: { x: 0, y: 0 },
    obstacles: [],
    backgroundOffset: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ensure canvas can receive keyboard events
    canvas.focus();

    // Load assets
    const carImage = new Image();
    carImage.src = car.image;
    const trackImage = new Image();
    trackImage.src = track.image;

    const gameLoop = (timestamp) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (!isPaused) {
        // Update game state
        updateGameState(deltaTime);
        // Render game
        render(ctx, carImage, trackImage);
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    // Start game loop
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    // Add keyboard event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [car, track, isPaused]);

  const updateGameState = (deltaTime) => {
    const state = gameState.current;

    // Update position based on velocity
    state.position.x += state.velocity.x * deltaTime;
    state.position.y += state.velocity.y * deltaTime;

    // Keep car within bounds
    state.position.x = Math.max(0, Math.min(750, state.position.x));
    state.position.y = Math.max(0, Math.min(550, state.position.y));

    // Update background scroll
    state.backgroundOffset += speed * deltaTime * 0.1;

    // Generate obstacles
    if (Math.random() < 0.002 && state.obstacles.length < 5) {
      state.obstacles.push({
        x: Math.random() * 700,
        y: -50,
        width: 40,
        height: 40,
        speed: 0.2 + Math.random() * 0.3,
      });
    }

    // Update obstacles
    state.obstacles.forEach((obstacle) => {
      obstacle.y += obstacle.speed * deltaTime + speed * 0.001;
    });

    // Remove off-screen obstacles
    state.obstacles = state.obstacles.filter((obstacle) => obstacle.y < 650);

    // Update distance and score
    const distanceIncrement = (speed * deltaTime) / 1000;
    setDistance((prev) => prev + distanceIncrement);
    setScore(
      (prev) =>
        prev +
        distanceIncrement *
          gameSettings.scoreMultipliers[track.difficulty.toLowerCase()]
    );

    // Check collisions
    if (checkCollisions()) {
      handleGameOver();
    }
  };

  const render = (ctx, carImage, trackImage) => {
    const { width, height } = ctx.canvas;
    const state = gameState.current;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw background
    try {
      ctx.drawImage(
        trackImage,
        -state.backgroundOffset % width,
        0,
        width,
        height
      );
      ctx.drawImage(
        trackImage,
        width - (state.backgroundOffset % width),
        0,
        width,
        height
      );
    } catch (error) {
      // Fallback background if image fails to load
      ctx.fillStyle = "#2a2a2a";
      ctx.fillRect(0, 0, width, height);
    }

    // Draw car
    try {
      ctx.drawImage(carImage, state.position.x, state.position.y, 50, 30);
    } catch (error) {
      // Fallback car if image fails to load
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(state.position.x, state.position.y, 50, 30);
    }

    // Draw obstacles
    state.obstacles.forEach((obstacle) => {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Draw HUD
    drawHUD(ctx);
  };

  const drawHUD = (ctx) => {
    ctx.fillStyle = "#fff";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${Math.floor(score)}`, 20, 30);
    ctx.fillText(`Speed: ${Math.floor(speed)} km/h`, 20, 60);
    ctx.fillText(`Distance: ${Math.floor(distance)}m`, 20, 90);
  };

  const checkCollisions = () => {
    const state = gameState.current;
    return state.obstacles.some(
      (obstacle) =>
        state.position.x < obstacle.x + obstacle.width &&
        state.position.x + 50 > obstacle.x &&
        state.position.y < obstacle.y + obstacle.height &&
        state.position.y + 30 > obstacle.y
    );
  };

  const handleGameOver = () => {
    setIsGameOver(true);
    setIsPaused(true);
    onGameOver(Math.floor(score), Math.floor(distance));
  };

  const handleKeyDown = (e) => {
    if (isGameOver) return;

    switch (e.key) {
      case "ArrowUp":
      case "w":
      case "W":
        setSpeed((prev) => Math.min(prev + 5, 150));
        break;
      case "ArrowDown":
      case "s":
      case "S":
        setSpeed((prev) => Math.max(prev - 5, 0));
        break;
      case "ArrowLeft":
      case "a":
      case "A":
        gameState.current.velocity.x = -0.5;
        break;
      case "ArrowRight":
      case "d":
      case "D":
        gameState.current.velocity.x = 0.5;
        break;
      case "Escape":
        setIsPaused((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (e) => {
    if (isGameOver) return;

    switch (e.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case "a":
      case "A":
      case "d":
      case "D":
        gameState.current.velocity.x = 0;
        break;
      default:
        break;
    }
  };

  return (
    <div style={styles.container}>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={styles.canvas}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
      {isPaused && !isGameOver && (
        <div style={styles.pauseOverlay}>
          <h2>PAUSED</h2>
          <p>Press ESC to resume</p>
          <div style={styles.controls}>
            <p>Controls:</p>
            <p>↑/W: Accelerate | ↓/S: Brake</p>
            <p>←/A: Left | →/D: Right</p>
          </div>
        </div>
      )}
      <div style={styles.gameInfo}>
        <div style={styles.infoItem}>
          <span>Car: {car.name}</span>
        </div>
        <div style={styles.infoItem}>
          <span>Track: {track.name}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    width: "800px",
    height: "600px",
    margin: "0 auto",
  },
  canvas: {
    border: "2px solid #333",
    borderRadius: "8px",
    backgroundColor: "#000",
    outline: "none",
  },
  pauseOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "2rem",
  },
  controls: {
    fontSize: "1rem",
    textAlign: "center",
    marginTop: "2rem",
  },
  gameInfo: {
    position: "absolute",
    top: "10px",
    right: "10px",
    color: "#fff",
    fontSize: "0.9rem",
  },
  infoItem: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "5px 10px",
    borderRadius: "4px",
    marginBottom: "5px",
  },
};

export default GameScreen;
