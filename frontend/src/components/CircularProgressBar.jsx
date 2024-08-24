import React from "react";
import "../styles/circularProgressBar.css"; 

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
          stroke="#ADD8E6"  
          strokeWidth="20"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
        />

        <circle
          className="progress-ring-circle"
          stroke="#fff"  
          strokeWidth="10"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
        />
       
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
      <p className="progress-percentage">
        {percentage}%
      </p>
    </div>
  );
};

export default CircularProgressBar;

