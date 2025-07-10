import React from "react";
import { useNavigate } from "react-router-dom";

const GameList = () => {
  const navigate = useNavigate();

  const games = [
    {
      title: "Chrome Dino",
      path: "/games/dino",
      description: "Run, jump, and survive in offline mode!",
    },
    {
      title: "Quiz Game",
      path: "/games/quiz",
      description: "Test your general knowledge with fun questions.",
    },
    // Add more games here if needed
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎮 Game List</h1>
      <div style={styles.list}>
        {games.map((game, index) => (
          <div
            key={index}
            style={styles.card}
            onClick={() => navigate(game.path)}
          >
            <h2 style={styles.cardTitle}>{game.title}</h2>
            <p style={styles.cardDesc}>{game.description}</p>
            <button style={styles.button}>Play</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#fff",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "2rem",
  },
  list: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#1e1e1e",
    padding: "1.5rem",
    borderRadius: "10px",
    width: "280px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
  cardTitle: {
    fontSize: "1.4rem",
    marginBottom: "0.5rem",
  },
  cardDesc: {
    fontSize: "1rem",
    color: "#aaa",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default GameList;
