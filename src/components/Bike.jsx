import React from "react";
import bikeImage from "../assets/bike/bike1.jpg";
import "./Bike.css";

const Bike = ({ position }) => {
  return (
    <img
      src={bikeImage}
      alt="Bike"
      style={{
        position: "absolute",
        bottom: position.y,
        left: position.x,
        width: "35px",
        height: "35px",
      }}
    />
  );
};

export default Bike;
