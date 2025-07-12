// // src/Home.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const navigate = useNavigate();

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>🎮 Welcome to GameZone</h1>
//       <p style={styles.text}>Play fun games right in your browser!</p>
//       <button onClick={() => navigate("/games")} style={styles.button}>
//         Explore Games
//       </button>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     height: "100vh",
//     background: "linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)",
//     color: "#fff",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: "1.5rem",
//     padding: "1rem",
//   },
//   heading: {
//     fontSize: "3rem",
//     textAlign: "center",
//     textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
//     animation: "fadeIn 1s ease-out",
//   },
//   text: {
//     fontSize: "1.4rem",
//     color: "#ccc",
//     textAlign: "center",
//     maxWidth: "600px",
//     animation: "slideUp 1s ease-out 0.3s both",
//   },
//   button: {
//     padding: "1rem 2rem",
//     fontSize: "1.2rem",
//     backgroundColor: "#4CAF50",
//     color: "white",
//     border: "none",
//     borderRadius: "30px",
//     cursor: "pointer",
//     transition: "all 0.3s ease",
//     boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
//     animation: "slideUp 1s ease-out 0.6s both",
//     "&:hover": {
//       transform: "translateY(-2px)",
//       boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)",
//     },
//   },
// };

// // Add animations
// const styleSheet = document.createElement('style');
// styleSheet.textContent = `
//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }

//   @keyframes slideUp {
//     from {
//       opacity: 0;
//       transform: translateY(20px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }
// `;
// document.head.appendChild(styleSheet);

// export default Home;

// src/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);
  const [isButtonPressed, setIsButtonPressed] = React.useState(false);

  const handleButtonClick = () => {
    console.log("Button clicked! Navigating to /games");
    navigate("/games");
  };

  const handleMouseEnter = () => {
    setIsButtonHovered(true);
  };

  const handleMouseLeave = () => {
    setIsButtonHovered(false);
    setIsButtonPressed(false);
  };

  const handleMouseDown = () => {
    setIsButtonPressed(true);
  };

  const handleMouseUp = () => {
    setIsButtonPressed(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.heading}>
          <span style={styles.headingMain}>🎮 GAME</span>
          <span style={styles.headingSecondary}>ZONE</span>
        </h1>

        <p style={styles.text}>
          <span style={styles.textHighlight}>Play</span> the hottest browser
          games
          <br />
          <span style={styles.textHighlight}>Compete</span> with players
          worldwide
          <br />
          <span style={styles.textHighlight}>Enjoy</span> endless entertainment
        </p>

        <div style={styles.buttonContainer}>
          <div style={styles.buttonGlow}></div>
          <button
            onClick={handleButtonClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            style={{
              ...styles.button,
              ...(isButtonHovered ? styles.buttonHover : {}),
              ...(isButtonPressed ? styles.buttonPressed : {}),
            }}
          >
            EXPLORE GAMES
          </button>
        </div>

        <div style={styles.gridBackground}></div>
        <div style={styles.cornerDecorations}>
          <div style={styles.cornerTL}></div>
          <div style={styles.cornerTR}></div>
          <div style={styles.cornerBL}></div>
          <div style={styles.cornerBR}></div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    background: "radial-gradient(circle at center, #0f0f1a 0%, #05050c 100%)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    overflow: "hidden",
    position: "relative",
  },
  contentWrapper: {
    position: "relative",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    maxWidth: "800px",
  },
  heading: {
    margin: 0,
    textAlign: "center",
    lineHeight: 1.2,
    textShadow: "0 0 10px rgba(100, 255, 255, 0.5)",
    animation: "fadeIn 0.8s ease-out, float 6s ease-in-out infinite",
  },
  headingMain: {
    display: "block",
    fontSize: "5rem",
    fontWeight: "800",
    background: "linear-gradient(90deg, #00ffff, #ff00ff)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  },
  headingSecondary: {
    display: "block",
    fontSize: "4.5rem",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "0.5rem",
  },
  text: {
    fontSize: "1.5rem",
    color: "#aaa",
    textAlign: "center",
    lineHeight: "2.2rem",
    textShadow: "0 0 5px rgba(255,255,255,0.1)",
    animation: "slideUp 1s ease-out 0.3s both",
  },
  textHighlight: {
    color: "#fff",
    fontWeight: "600",
  },
  buttonContainer: {
    position: "relative",
    animation: "slideUp 1s ease-out 0.6s both",
    zIndex: 10,
  },
  button: {
    position: "relative",
    padding: "1.2rem 3rem",
    fontSize: "1.3rem",
    fontWeight: "700",
    letterSpacing: "0.1rem",
    background: "linear-gradient(45deg, #6e45e2, #88d3ce)",
    color: "white",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 0 20px rgba(110, 69, 226, 0.5)",
    zIndex: 10,
    textTransform: "uppercase",
    overflow: "hidden",
  },
  buttonHover: {
    transform: "translateY(-3px)",
    boxShadow: "0 0 30px rgba(110, 69, 226, 0.8)",
  },
  buttonPressed: {
    transform: "translateY(1px)",
    boxShadow: "0 0 15px rgba(110, 69, 226, 0.6)",
  },
  buttonGlow: {
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    background: "linear-gradient(45deg, #6e45e2, #88d3ce)",
    borderRadius: "50px",
    filter: "blur(10px)",
    opacity: "0.7",
    zIndex: 1,
    animation: "pulse 2s infinite alternate",
    pointerEvents: "none",
  },
  gridBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `
      linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
    `,
    backgroundSize: "50px 50px",
    animation: "gridScroll 20s linear infinite",
    zIndex: 1,
    pointerEvents: "none",
  },
  cornerDecorations: {
    position: "absolute",
    width: "100%",
    height: "100%",
    pointerEvents: "none",
  },
  cornerTL: {
    position: "absolute",
    top: "20px",
    left: "20px",
    width: "50px",
    height: "50px",
    borderTop: "3px solid #6e45e2",
    borderLeft: "3px solid #6e45e2",
  },
  cornerTR: {
    position: "absolute",
    top: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderTop: "3px solid #88d3ce",
    borderRight: "3px solid #88d3ce",
  },
  cornerBL: {
    position: "absolute",
    bottom: "20px",
    left: "20px",
    width: "50px",
    height: "50px",
    borderBottom: "3px solid #6e45e2",
    borderLeft: "3px solid #6e45e2",
  },
  cornerBR: {
    position: "absolute",
    bottom: "20px",
    right: "20px",
    width: "50px",
    height: "50px",
    borderBottom: "3px solid #88d3ce",
    borderRight: "3px solid #88d3ce",
  },
};

// Create style element for animations
const styleElement = document.createElement("style");
styleElement.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.9;
    }
  }

  @keyframes gridScroll {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 50px 50px;
    }
  }
`;
document.head.appendChild(styleElement);

export default Home;
