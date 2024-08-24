// src/components/ErrorMessage.jsx
import React from "react";
import "../styles/errorMessage.css"; // Create a CSS file for error message styling

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
