import React, { useState } from "react";
import { cars } from "../data/config";

const CarSelect = ({ onSelect }) => {
  const [selectedCar, setSelectedCar] = useState(null);

  const handleSelect = (car) => {
    setSelectedCar(car);
    onSelect(car);
  };

  return (
    <div className="game-content">
      <h2 className="section-title">Choose Your Vehicle</h2>
      <div className="selection-grid">
        {cars.map((car) => (
          <div
            key={car.id}
            className={`selection-card ${
              selectedCar?.id === car.id ? "selected" : ""
            }`}
            onClick={() => handleSelect(car)}
          >
            <div style={styles.imageContainer}>
              <img src={car.image} alt={car.name} style={styles.image} />
            </div>
            <h3 style={styles.carName}>{car.name}</h3>
            <div style={styles.stats}>
              <div style={styles.stat}>
                <span>Speed: {car.stats.speed}</span>
                <div style={styles.statBar}>
                  <div
                    style={{
                      ...styles.statFill,
                      width: `${(car.stats.speed / 10) * 100}%`,
                    }}
                  />
                </div>
              </div>
              <div style={styles.stat}>
                <span>Durability: {car.stats.durability}</span>
                <div style={styles.statBar}>
                  <div
                    style={{
                      ...styles.statFill,
                      width: `${(car.stats.durability / 10) * 100}%`,
                    }}
                  />
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
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  carName: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
    textAlign: "center",
  },
  stats: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  stat: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  statBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#333",
    borderRadius: "4px",
    overflow: "hidden",
  },
  statFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    transition: "width 0.3s ease",
  },
};

export default CarSelect;
