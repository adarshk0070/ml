// src/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  
  console.log('🏠 Home component rendering...');

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎮 Welcome to GameZone</h1>
      <p style={styles.text}>Play fun games right in your browser!</p>
      <button onClick={() => navigate("/games")} style={styles.button}>
        Explore Games
      </button>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#000",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  heading: {
    fontSize: "2.5rem",
  },
  text: {
    fontSize: "1.2rem",
    color: "#aaa",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Home;
