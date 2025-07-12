import React, { useState, useEffect, useRef } from "react";
import CarGame from "./CarGame";
import BikeGame from "./BikeGame";
import ChessGame from "./ChessGame";
import TicTacToe from "./TicTacToe";
import ConnectFour from "./ConnectFour";
import SnakeAndLadder from "./SnakeAndLadder";
import QuizGame from "./QuizGame";

const GameMenu = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredCard, setHoveredCard] = useState(null);
  const containerRef = useRef(null);

  // Track mouse movement for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const games = [
    {
      id: "car",
      name: "Car Racing",
      description: "High-speed racing with multiple cars and tracks",
      icon: "🏎️",
      component: CarGame,
      color: "#e74c3c",
    },
    {
      id: "bike",
      name: "Bike Racing",
      description: "Thrilling bike racing adventure",
      icon: "🏍️",
      component: BikeGame,
      color: "#3498db",
    },
    {
      id: "chess",
      name: "Chess",
      description: "Classic strategy game with AI opponent",
      icon: "♛",
      component: ChessGame,
      color: "#2c3e50",
    },
    {
      id: "tictactoe",
      name: "Tic-Tac-Toe",
      description: "Classic X and O game with AI",
      icon: "⭕",
      component: TicTacToe,
      color: "#9b59b6",
    },
    {
      id: "connect4",
      name: "Connect Four",
      description: "Drop pieces to get four in a row",
      icon: "🔴",
      component: ConnectFour,
      color: "#f39c12",
    },
    {
      id: "snakeladder",
      name: "Snake & Ladder",
      description: "Classic board game with dice rolling",
      icon: "🐍",
      component: SnakeAndLadder,
      color: "#27ae60",
    },
    {
      id: "quiz",
      name: "Quiz Game",
      description: "Test your knowledge with fun questions",
      icon: "🧠",
      component: QuizGame,
      color: "#16a085",
    },
  ];

  const handleGameSelect = (gameId) => {
    const game = games.find((g) => g.id === gameId);
    setSelectedGame(game);
  };

  const handleBackToMenu = () => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    const GameComponent = selectedGame.component;
    return (
      <div style={styles.gameContainer}>
        <div style={styles.backButton} onClick={handleBackToMenu}>
          ← Back to Menu
        </div>
        <GameComponent />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        ...styles.container,
        transform: `rotateX(${mousePosition.y * 2}deg) rotateY(${
          mousePosition.x * 2
        }deg)`,
      }}
    >
      {/* 3D Floating Background Elements */}
      <div style={styles.floating3DBackground}>
        <div style={styles.floatingOrb1}></div>
        <div style={styles.floatingOrb2}></div>
        <div style={styles.floatingOrb3}></div>
      </div>

      {/* 3D Parallax Header */}
      <div
        style={{
          ...styles.header,
          transform: `translateZ(50px) translateY(${mousePosition.y * 10}px)`,
        }}
      >
        <h1
          style={{
            ...styles.title,
            transform: `rotateX(${mousePosition.y * 5}deg) rotateY(${
              mousePosition.x * 5
            }deg)`,
          }}
        >
          🎮 Game Hub
        </h1>
        <p
          style={{
            ...styles.subtitle,
            transform: `translateZ(30px) translateX(${mousePosition.x * 15}px)`,
          }}
        >
          Choose your favorite game to play!
        </p>
      </div>

      {/* 3D Games Grid */}
      <div style={styles.gamesGrid}>
        {games.map((game, index) => (
          <div
            key={game.id}
            className="game-card"
            style={{
              ...styles.gameCard,
              "--hover-color": game.color,
              transform:
                hoveredCard === index
                  ? `rotateX(-15deg) rotateY(${
                      mousePosition.x * 10
                    }deg) translateZ(50px) scale(1.05)`
                  : `rotateX(${mousePosition.y * 3}deg) rotateY(${
                      mousePosition.x * 3
                    }deg) translateZ(${index * 5}px)`,
              animationDelay: `${index * 0.1}s`,
            }}
            onClick={() => handleGameSelect(game.id)}
            onMouseEnter={(e) => {
              setHoveredCard(index);
              e.currentTarget.style.borderColor = game.color;
              e.currentTarget.style.boxShadow = `0 25px 50px rgba(${hexToRgb(
                game.color
              )}, 0.4), 0 0 30px rgba(${hexToRgb(game.color)}, 0.2)`;
            }}
            onMouseLeave={(e) => {
              setHoveredCard(null);
              e.currentTarget.style.borderColor = "#6366f1";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
            }}
          >
            {/* 3D Card Inner Container */}
            <div style={styles.cardInner}>
              {/* Floating Game Icon */}
              <div
                style={{
                  ...styles.gameIcon,
                  transform:
                    hoveredCard === index
                      ? `rotateY(360deg) translateZ(20px) scale(1.2)`
                      : `rotateY(${mousePosition.x * 20}deg) translateZ(10px)`,
                }}
              >
                {game.icon}
              </div>

              {/* 3D Text Elements */}
              <h3
                style={{
                  ...styles.gameName,
                  transform: `translateZ(15px) rotateX(${
                    mousePosition.y * 2
                  }deg)`,
                }}
              >
                {game.name}
              </h3>

              <p
                style={{
                  ...styles.gameDescription,
                  transform: `translateZ(10px) translateY(${
                    mousePosition.y * 5
                  }px)`,
                }}
              >
                {game.description}
              </p>

              {/* 3D Play Button */}
              <div
                style={{
                  ...styles.playButton,
                  backgroundColor: game.color,
                  transform:
                    hoveredCard === index
                      ? `translateZ(25px) rotateX(-10deg) scale(1.1)`
                      : `translateZ(5px)`,
                }}
              >
                <span style={styles.playButtonText}>Play Now</span>
                <div
                  className="play-button-glow"
                  style={styles.playButtonGlow}
                ></div>
              </div>
            </div>

            {/* 3D Holographic Border Effect */}
            <div
              className="holographic-border"
              style={{
                ...styles.holographicBorder,
                background: `linear-gradient(45deg, ${game.color}, transparent, ${game.color})`,
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* 3D Floating Footer */}
      <div
        style={{
          ...styles.footer,
          transform: `translateZ(20px) rotateX(${mousePosition.y * 3}deg)`,
        }}
      >
        {/* <p style={styles.footerText}>Made with ❤️ for game enthusiasts</p> */}
      </div>
    </div>
  );
};

// Helper function to convert hex to RGB
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(
        result[3],
        16
      )}`
    : "0, 0, 0";
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f0f23",
    background:
      "radial-gradient(circle at 30% 40%, #1a1a3e 0%, #0f0f23 50%, #0a0a1a 100%)",
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
    perspective: "1000px",
    transformStyle: "preserve-3d",
    transition: "transform 0.1s ease-out",
    position: "relative",
    overflow: "hidden",
  },

  floating3DBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
  },

  floatingOrb1: {
    position: "absolute",
    width: "200px",
    height: "200px",
    background: "radial-gradient(circle, #6366f1, transparent)",
    borderRadius: "50%",
    top: "10%",
    left: "10%",
    animation: "float3D 6s ease-in-out infinite",
    opacity: 0.15,
  },

  floatingOrb2: {
    position: "absolute",
    width: "150px",
    height: "150px",
    background: "radial-gradient(circle, #8b5cf6, transparent)",
    borderRadius: "50%",
    top: "60%",
    right: "15%",
    animation: "float3D 8s ease-in-out infinite reverse",
    opacity: 0.12,
  },

  floatingOrb3: {
    position: "absolute",
    width: "100px",
    height: "100px",
    background: "radial-gradient(circle, #06b6d4, transparent)",
    borderRadius: "50%",
    bottom: "20%",
    left: "70%",
    animation: "float3D 10s ease-in-out infinite",
    opacity: 0.18,
  },

  gameContainer: {
    minHeight: "100vh",
    backgroundColor: "#0f0f23",
    position: "relative",
    perspective: "1000px",
  },

  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "12px 25px",
    backgroundColor: "#6366f1",
    color: "#fff",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    zIndex: 1000,
    border: "none",
    boxShadow: "0 10px 30px rgba(99, 102, 241, 0.3)",
    transform: "translateZ(0)",
    "&:hover": {
      transform: "translateZ(20px) rotateX(-10deg)",
      boxShadow: "0 20px 40px rgba(99, 102, 241, 0.5)",
    },
  },

  header: {
    textAlign: "center",
    marginBottom: "60px",
    transformStyle: "preserve-3d",
    zIndex: 10,
    position: "relative",
  },

  title: {
    fontSize: "5rem",
    marginBottom: "15px",
    background: "linear-gradient(45deg, #6366f1, #8b5cf6, #06b6d4, #10b981)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    textShadow: "0 0 30px rgba(99, 102, 241, 0.5)",
    transition: "all 0.3s ease",
    transformStyle: "preserve-3d",
    animation: "titleGlow 3s ease-in-out infinite alternate",
  },

  subtitle: {
    fontSize: "1.8rem",
    color: "#bdc3c7",
    marginBottom: "0",
    textShadow: "0 0 20px rgba(189, 195, 199, 0.3)",
    transition: "all 0.3s ease",
    transformStyle: "preserve-3d",
  },

  gamesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "40px",
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    transformStyle: "preserve-3d",
    zIndex: 5,
    position: "relative",
  },

  gameCard: {
    backgroundColor: "#1e1e3f",
    background: "linear-gradient(145deg, #252556, #181830)",
    borderRadius: "25px",
    padding: "35px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    border: "2px solid #6366f1",
    boxShadow:
      "0 10px 30px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    animation: "cardFloat 4s ease-in-out infinite",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background:
        "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
      transform: "translateX(-100%)",
      transition: "transform 0.6s ease",
    },
  },

  cardInner: {
    position: "relative",
    zIndex: 2,
    transformStyle: "preserve-3d",
  },

  holographicBorder: {
    position: "absolute",
    top: "-2px",
    left: "-2px",
    right: "-2px",
    bottom: "-2px",
    borderRadius: "27px",
    opacity: 0,
    transition: "opacity 0.3s ease",
    animation: "holographicRotate 3s linear infinite",
    zIndex: 1,
  },

  gameIcon: {
    fontSize: "5rem",
    marginBottom: "25px",
    display: "block",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    transformStyle: "preserve-3d",
    filter: "drop-shadow(0 0 20px rgba(255,255,255,0.3))",
    animation: "iconFloat 3s ease-in-out infinite",
  },

  gameName: {
    fontSize: "2rem",
    marginBottom: "18px",
    color: "#ecf0f1",
    textShadow: "0 0 10px rgba(236, 240, 241, 0.3)",
    transition: "all 0.3s ease",
    transformStyle: "preserve-3d",
  },

  gameDescription: {
    fontSize: "1.1rem",
    color: "#bdc3c7",
    marginBottom: "30px",
    lineHeight: "1.6",
    textShadow: "0 0 5px rgba(189, 195, 199, 0.2)",
    transition: "all 0.3s ease",
    transformStyle: "preserve-3d",
  },

  playButton: {
    padding: "15px 40px",
    borderRadius: "30px",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "1.2rem",
    border: "none",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    overflow: "hidden",
    transformStyle: "preserve-3d",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
  },

  playButtonText: {
    position: "relative",
    zIndex: 2,
  },

  playButtonGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.2)",
    borderRadius: "30px",
    transform: "translate(-50%, -50%) scale(0)",
    transition: "transform 0.3s ease",
    zIndex: 1,
  },

  footer: {
    textAlign: "center",
    marginTop: "80px",
    padding: "30px",
    transformStyle: "preserve-3d",
    zIndex: 10,
    position: "relative",
  },

  footerText: {
    color: "#7f8c8d",
    fontSize: "1.2rem",
    textShadow: "0 0 10px rgba(127, 140, 141, 0.3)",
    transition: "all 0.3s ease",
  },
};

// Add CSS animations for 3D effects
const style3D = document.createElement("style");
style3D.textContent = `
  @keyframes float3D {
    0%, 100% { 
      transform: translateZ(0px) rotateX(0deg) rotateY(0deg); 
    }
    50% { 
      transform: translateZ(30px) rotateX(10deg) rotateY(10deg); 
    }
  }
  
  @keyframes cardFloat {
    0%, 100% { 
      transform: translateY(0px) rotateX(0deg); 
    }
    50% { 
      transform: translateY(-10px) rotateX(2deg); 
    }
  }
  
  @keyframes iconFloat {
    0%, 100% { 
      transform: rotateY(0deg) translateZ(0px); 
    }
    50% { 
      transform: rotateY(180deg) translateZ(10px); 
    }
  }
  
  @keyframes titleGlow {
    0%, 100% { 
      text-shadow: 0 0 30px rgba(52, 152, 219, 0.5), 0 0 60px rgba(155, 89, 182, 0.3); 
    }
    50% { 
      text-shadow: 0 0 60px rgba(52, 152, 219, 0.8), 0 0 90px rgba(155, 89, 182, 0.6); 
    }
  }
  
  @keyframes holographicRotate {
    0% { 
      transform: rotateZ(0deg); 
    }
    100% { 
      transform: rotateZ(360deg); 
    }
  }
  
  @keyframes shimmer {
    0% { 
      transform: translateX(-100%); 
    }
    100% { 
      transform: translateX(100%); 
    }
  }
  
  /* Enhanced hover effects */
  .game-card:hover {
    transform: rotateX(-15deg) rotateY(15deg) translateZ(50px) scale(1.05) !important;
    box-shadow: 0 30px 60px rgba(0,0,0,0.5) !important;
  }
  
  .game-card:hover .holographic-border {
    opacity: 1 !important;
  }
  
  .game-card:hover::before {
    transform: translateX(100%) !important;
  }
  
  .game-card:hover .play-button-glow {
    transform: translate(-50%, -50%) scale(1) !important;
  }
  
  .game-card:active {
    transform: rotateX(-10deg) rotateY(10deg) translateZ(30px) scale(0.98) !important;
  }
  
  /* 3D transforms for different screen sizes */
  @media (max-width: 768px) {
    .game-card {
      transform: none !important;
    }
    
    .game-card:hover {
      transform: translateY(-10px) scale(1.02) !important;
    }
  }
`;

// Apply the styles
if (!document.querySelector("#game-menu-3d-styles")) {
  style3D.id = "game-menu-3d-styles";
  document.head.appendChild(style3D);
}

export default GameMenu;
