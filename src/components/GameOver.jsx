import React from 'react';

const GameOver = ({ score, distance, track, car, onRestart, onMainMenu }) => {
  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>Race Complete!</h2>
        
        <div style={styles.stats}>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Score</span>
            <span style={styles.statValue}>{score}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Distance</span>
            <span style={styles.statValue}>{distance}m</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Track</span>
            <span style={styles.statValue}>{track}</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statLabel}>Car</span>
            <span style={styles.statValue}>{car}</span>
          </div>
        </div>

        <div style={styles.buttons}>
          <button
            onClick={onRestart}
            style={{ ...styles.button, ...styles.restartButton }}
          >
            Race Again
          </button>
          <button
            onClick={onMainMenu}
            style={{ ...styles.button, ...styles.menuButton }}
          >
            Main Menu
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderRadius: '12px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)',
    animation: 'modalFadeIn 0.3s ease-out',
  },
  title: {
    fontSize: '2.5rem',
    color: '#fff',
    textAlign: 'center',
    marginBottom: '2rem',
    textShadow: '0 0 10px rgba(255,255,255,0.3)',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1.5rem',
    marginBottom: '2rem',
  },
  statItem: {
    backgroundColor: '#2a2a2a',
    padding: '1rem',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  },
  statLabel: {
    color: '#aaa',
    fontSize: '0.9rem',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  statValue: {
    color: '#fff',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  button: {
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
  restartButton: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#43A047',
    },
  },
  menuButton: {
    backgroundColor: '#333',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#444',
    },
  },
};

// Add animation keyframes
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes modalFadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(styleSheet);

export default GameOver;