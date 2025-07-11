import React from "react";
import "../styles/CircularProgress.css";

const CircularProgress = ({ percentage }) => {
  const strokeDashoffset = 282.6 - (282.6 * percentage) / 100;

  return (
    <div className="circular-progress-container">
      <svg className="progress-ring" width="100" height="100">
        <circle className="progress-ring__bg" cx="50" cy="50" r="45" />
        <circle
          className="progress-ring__circle"
          cx="50"
          cy="50"
          r="45"
          style={{ strokeDashoffset }}
        />
      </svg>
      <span className="progress-text">{percentage}%</span>
    </div>
  );
};

export default CircularProgress;
