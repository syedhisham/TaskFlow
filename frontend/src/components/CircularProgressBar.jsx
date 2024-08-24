import React from "react";
import "../styles/circularProgressBar.css"; // Import the CSS file for styling

const CircularProgressBar = ({ completed, total }) => {
  const percentage = Math.round((completed / total) * 100);
  const radius = 70; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (circumference * (percentage / 100));

  return (
    <div className="progress-container ">
      
      <svg className="progress-ring" width="200" height="200">
        {/* Thick light blue background circle */}
        <circle
          className="progress-ring-circle-bg"
          stroke="#ADD8E6"  // Light blue color
          strokeWidth="20"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
        />
        {/* Thin white circle that fills with a gradient */}
        <circle
          className="progress-ring-circle"
          stroke="#fff"  // Start as white
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
        {/* <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="green" />
            <stop offset="100%" stopColor="darkblue" />
          </linearGradient>
        </defs> */}
        {/* Apply gradient when percentage > 0 */}
        {percentage > 0 && (
          <circle
            className="progress-ring-circle-overlay"
            stroke="url(#gradient)"
            strokeWidth="10"
            fill="transparent"
            r={radius}
            cx="100"
            cy="100"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
          />
        )}
      </svg>
      {/* Percentage text as a <p> tag positioned absolutely */}
      <p className="progress-percentage">
        {percentage}%
      </p>
    </div>
  );
};

export default CircularProgressBar;

