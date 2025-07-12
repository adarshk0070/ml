import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const GameList = () => {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const games = [
    {
      title: "Bike Racing",
      path: "#/games/bike",
      description: "Race, jump, and survive with your bike!",
      category: "racing",
      color: "from-orange-500 to-red-600",
      icon: "🏍️",
    },
    {
      title: "Quiz Game",
      path: "#/games/quiz",
      description: "Test your general knowledge with fun questions.",
      category: "puzzle",
      color: "from-blue-500 to-purple-600",
      icon: "🧠",
    },
    {
      title: "Snake & Ladder",
      path: "#/games/snakeladder",
      description: "Classic board game with dice rolling.",
      category: "arcade",
      color: "from-green-500 to-teal-600",
      icon: "🐍",
    },
    {
      title: "Chess",
      path: "#/games/chess",
      description: "Strategic chess game for masterminds.",
      category: "strategy",
      color: "from-gray-600 to-gray-800",
      icon: "♛",
    },
    {
      title: "Car Racing",
      path: "#/games/car",
      description: "Race, jump, and survive with friends!",
      category: "racing",
      color: "from-yellow-500 to-orange-600",
      icon: "🏎️",
    },
    {
      title: "Tic Tac Toe",
      path: "#/games/tictactoe",
      description: "Classic Tic-Tac-Toe game for two players",
      category: "strategy",
      color: "from-indigo-500 to-blue-600",
      icon: "⭕",
    },
    {
      title: "Connect Four",
      path: "#/games/connect4",
      description: "Drop pieces to get four in a row",
      category: "strategy",
      color: "from-red-500 to-pink-600",
      icon: "🔴",
    },
  ];

  const categories = ["all", "racing", "puzzle", "arcade", "strategy"];

  const filteredGames = selectedFilter === "all" 
    ? games 
    : games.filter(game => game.category === selectedFilter);

  const handleCardClick = (path) => {
    // Remove the '#' from the path when using navigate
    navigate(path.replace('#', ''));
  };

  return (
    <div style={styles.container}>
      {/* Animated background */}
      <div style={styles.backgroundAnimation}></div>
      
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.heading}>
          <span style={styles.headingIcon}>🎮</span>
          Game Arena
        </h1>
        <p style={styles.subtitle}>Choose your adventure and start playing!</p>
      </div>

      {/* Category Filter */}
      <div style={styles.filterContainer}>
        {categories.map((category) => (
          <button
            key={category}
            style={{
              ...styles.filterButton,
              ...(selectedFilter === category ? styles.filterButtonActive : {}),
            }}
            onClick={() => setSelectedFilter(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Games Grid */}
      <div style={styles.gameGrid}>
        {filteredGames.map((game, index) => (
          <div
            key={index}
            style={{
              ...styles.gameCard,
              ...(hoveredCard === index ? styles.gameCardHover : {}),
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => handleCardClick(game.path)}
          >
            {/* Card gradient background */}
            <div 
              style={{
                ...styles.cardGradient,
                background: `linear-gradient(135deg, ${game.color.replace('from-', '').replace('to-', ', ')})`,
              }}
            ></div>
            
            {/* Card content */}
            <div style={styles.cardContent}>
              <div style={styles.cardIcon}>{game.icon}</div>
              <h3 style={styles.cardTitle}>{game.title}</h3>
              <p style={styles.cardDescription}>{game.description}</p>
              <div style={styles.cardCategory}>
                <span style={styles.categoryTag}>{game.category}</span>
              </div>
            </div>
            
            {/* Play button */}
            <div style={styles.playButton}>
              <span style={styles.playIcon}>▶</span>
              <span>PLAY NOW</span>
            </div>
            
            {/* Hover effect overlay */}
            {hoveredCard === index && (
              <div style={styles.hoverOverlay}>
                <div style={styles.hoverText}>Click to Play!</div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>{filteredGames.length}</div>
          <div style={styles.statLabel}>Games Available</div>
        </div>
        <div style={styles.statItem}>
          <div style={styles.statNumber}>∞</div>
          <div style={styles.statLabel}>Hours of Fun</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    position: "relative",
    overflow: "hidden",
    paddingBottom: "2rem",
  },
  backgroundAnimation: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.3) 0%, transparent 50%)
    `,
    animation: "float 6s ease-in-out infinite",
  },
  header: {
    textAlign: "center",
    padding: "3rem 2rem 1rem",
    position: "relative",
    zIndex: 2,
  },
  heading: {
    fontSize: "3.5rem",
    fontWeight: "bold",
    color: "#fff",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    marginBottom: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  headingIcon: {
    fontSize: "4rem",
    filter: "drop-shadow(0 0 10px rgba(255,255,255,0.5))",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "rgba(255,255,255,0.8)",
    fontWeight: "300",
  },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    padding: "2rem",
    flexWrap: "wrap",
    position: "relative",
    zIndex: 2,
  },
  filterButton: {
    padding: "0.75rem 1.5rem",
    borderRadius: "25px",
    border: "2px solid rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  filterButtonActive: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderColor: "rgba(255,255,255,0.8)",
    transform: "scale(1.05)",
    boxShadow: "0 5px 15px rgba(255,255,255,0.2)",
  },
  gameGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "2rem",
    padding: "2rem",
    maxWidth: "1400px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2,
  },
  gameCard: {
    position: "relative",
    height: "280px",
    borderRadius: "20px",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  gameCardHover: {
    transform: "translateY(-10px) scale(1.02)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  },
  cardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.9,
  },
  cardContent: {
    position: "relative",
    zIndex: 2,
    padding: "2rem",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
  },
  cardIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
  },
  cardTitle: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#fff",
    marginBottom: "0.5rem",
    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
  },
  cardDescription: {
    fontSize: "1rem",
    color: "rgba(255,255,255,0.9)",
    lineHeight: "1.4",
    marginBottom: "1rem",
  },
  cardCategory: {
    marginTop: "auto",
  },
  categoryTag: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: "12px",
    fontSize: "0.8rem",
    color: "#fff",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  playButton: {
    position: "absolute",
    bottom: "1rem",
    right: "1rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1.5rem",
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#333",
    borderRadius: "25px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    zIndex: 3,
  },
  playIcon: {
    fontSize: "1.2rem",
    color: "#4CAF50",
  },
  hoverOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 4,
  },
  hoverText: {
    fontSize: "1.5rem",
    color: "#fff",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
    animation: "pulse 1s ease-in-out infinite",
  },
  statsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "4rem",
    padding: "2rem",
    position: "relative",
    zIndex: 2,
  },
  statItem: {
    textAlign: "center",
    color: "#fff",
  },
  statNumber: {
    fontSize: "3rem",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
  },
  statLabel: {
    fontSize: "1rem",
    opacity: 0.8,
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
};

// Add keyframes for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;
document.head.appendChild(styleSheet);

export default GameList;