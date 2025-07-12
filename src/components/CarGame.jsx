import React, { useState, useEffect, useRef } from "react";
import CharacterSelect from "./CharacterSelect";
import CarSelect from "./CarSelect";
import TrackSelect from "./TrackSelect";
import GameScreen from "./GameScreen";
import GameOver from "./GameOver";

const CarGame = () => {
  const [gameState, setGameState] = useState("character"); // character, car, track, playing, gameOver
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [finalScore, setFinalScore] = useState(0);
  const [finalDistance, setFinalDistance] = useState(0);

  const handleGameOver = (score, distance) => {
    setFinalScore(score);
    setFinalDistance(distance);
    setGameState("gameOver");
  };

  const resetGame = () => {
    setGameState("character");
    setSelectedAvatar(null);
    setSelectedCar(null);
    setSelectedTrack(null);
    setFinalScore(0);
    setFinalDistance(0);
  };

  const renderGameState = () => {
    switch (gameState) {
      case "character":
        return (
          <CharacterSelect
            onSelect={(avatar) => {
              setSelectedAvatar(avatar);
              setGameState("car");
            }}
          />
        );
      case "car":
        return (
          <CarSelect
            onSelect={(car) => {
              setSelectedCar(car);
              setGameState("track");
            }}
          />
        );
      case "track":
        return (
          <TrackSelect
            onSelect={(track) => {
              setSelectedTrack(track);
              setGameState("playing");
            }}
          />
        );
      case "playing":
        return (
          <GameScreen
            avatar={selectedAvatar}
            car={selectedCar}
            track={selectedTrack}
            onGameOver={handleGameOver}
          />
        );
      case "gameOver":
        return (
          <GameOver
            score={finalScore}
            distance={finalDistance}
            track={selectedTrack?.name}
            car={selectedCar?.name}
            onRestart={resetGame}
          />
        );
      default:
        return null;
    }
  };

  const [isMuted, setIsMuted] = useState(false);
  const bgMusicRef = useRef(null);

  useEffect(() => {
    const initializeAudio = async () => {
      try {
        bgMusicRef.current = new Audio("/assets/sounds/bg-music.mp3");
        bgMusicRef.current.loop = true;
        bgMusicRef.current.volume = 0.3;

        // Handle audio loading errors
        bgMusicRef.current.addEventListener("error", (e) => {
          console.warn("Background music failed to load:", e);
          setIsMuted(true);
        });

        // Try to play audio (may fail due to browser autoplay policies)
        bgMusicRef.current.play().catch((error) => {
          console.warn("Audio autoplay blocked:", error);
          setIsMuted(true);
        });
      } catch (error) {
        console.warn("Failed to initialize audio:", error);
        setIsMuted(true);
      }
    };

    initializeAudio();

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleMute = () => {
    if (bgMusicRef.current) {
      if (isMuted) {
        bgMusicRef.current.play().catch((error) => {
          console.warn("Failed to resume audio:", error);
        });
        bgMusicRef.current.muted = false;
      } else {
        bgMusicRef.current.pause();
        bgMusicRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="car-game-container">
      <div className="parallax-bg">
        <div className="layer layer-1"></div>
        <div className="layer layer-2"></div>
        <div className="layer layer-3"></div>
      </div>
      <div className="game-content">{renderGameState()}</div>
      <div className="audio-control" onClick={toggleMute}>
        <img
          src={`/assets/icons/volume-${isMuted ? "off" : "on"}.svg`}
          alt={isMuted ? "Unmute" : "Mute"}
          style={{ width: "24px", height: "24px" }}
        />
      </div>
    </div>
  );
};

export default CarGame;
