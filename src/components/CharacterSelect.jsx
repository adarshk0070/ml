import React, { useState } from "react";
import { avatars } from "../data/config";

const CharacterSelect = ({ onSelect }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleSelect = (avatar) => {
    setSelectedAvatar(avatar);
    onSelect(avatar);
  };

  return (
    <div className="character-select" style={styles.container}>
      <h2 style={styles.title}>Choose Your Driver</h2>
      <div style={styles.grid}>
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            style={{
              ...styles.card,
              ...(selectedAvatar?.id === avatar.id ? styles.selectedCard : {}),
            }}
            onClick={() => handleSelect(avatar)}
          >
            <div style={styles.imageContainer}>
              <img src={avatar.image} alt={avatar.name} style={styles.image} />
            </div>
            <h3 style={styles.avatarName}>{avatar.name}</h3>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span>Handling: {avatar.stats.handling}</span>
              </div>
              <div style={styles.stat}>
                <span>Acceleration: {avatar.stats.acceleration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#1a1a1a",
    borderRadius: "12px",
    color: "#fff",
  },
  title: {
    fontSize: "2rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#fff",
    textShadow: "0 0 10px rgba(255,255,255,0.5)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
    padding: "1.5rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    border: "2px solid transparent",
    "&:hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
    },
  },
  selectedCard: {
    border: "2px solid #4CAF50",
    boxShadow: "0 0 15px rgba(76,175,80,0.3)",
  },
  imageContainer: {
    width: "100%",
    height: "200px",
    marginBottom: "1rem",
    borderRadius: "4px",
    overflow: "hidden",
    backgroundColor: "#333",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarName: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  stat: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
};

export default CharacterSelect;
