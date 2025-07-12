import React, { useState } from "react";
import { tracks } from "../data/config";

const TrackSelect = ({ onSelect }) => {
  const [selectedTrack, setSelectedTrack] = useState(null);

  const handleSelect = (track) => {
    setSelectedTrack(track);
    onSelect(track);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "#4CAF50";
      case "medium":
        return "#FFA726";
      case "hard":
        return "#F44336";
      default:
        return "#757575";
    }
  };

  return (
    <div className="track-select" style={styles.container}>
      <h2 style={styles.title}>Select Your Track</h2>
      <div style={styles.grid}>
        {tracks.map((track) => (
          <div
            key={track.id}
            style={{
              ...styles.card,
              ...(selectedTrack?.id === track.id ? styles.selectedCard : {}),
            }}
            onClick={() => handleSelect(track)}
          >
            <div style={styles.imageContainer}>
              <img src={track.image} alt={track.name} style={styles.image} />
            </div>
            <div style={styles.content}>
              <h3 style={styles.trackName}>{track.name}</h3>
              <div style={styles.details}>
                <div
                  style={{
                    ...styles.difficulty,
                    backgroundColor: getDifficultyColor(track.difficulty),
                  }}
                >
                  {track.difficulty}
                </div>
                <div style={styles.length}>{track.length}m</div>
              </div>
              <div style={styles.obstacles}>
                <h4 style={styles.obstaclesTitle}>Track Obstacles:</h4>
                <div style={styles.obstaclesList}>
                  {track.obstacles.map((obstacle, index) => (
                    <span
                      key={`${track.id}-obstacle-${index}`}
                      style={styles.obstacle}
                    >
                      {obstacle.type} ({obstacle.frequency})
                    </span>
                  ))}
                </div>
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
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gap: "2rem",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#2a2a2a",
    borderRadius: "8px",
    overflow: "hidden",
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
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: "1.5rem",
  },
  trackName: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  details: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  },
  difficulty: {
    padding: "0.25rem 0.75rem",
    borderRadius: "4px",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  length: {
    padding: "0.25rem 0.75rem",
    borderRadius: "4px",
    backgroundColor: "#333",
    fontSize: "0.9rem",
  },
  obstacles: {
    backgroundColor: "#333",
    padding: "1rem",
    borderRadius: "4px",
  },
  obstaclesTitle: {
    fontSize: "1rem",
    marginBottom: "0.5rem",
    color: "#aaa",
  },
  obstaclesList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  obstacle: {
    backgroundColor: "#444",
    padding: "0.25rem 0.75rem",
    borderRadius: "4px",
    fontSize: "0.9rem",
  },
};

export default TrackSelect;
