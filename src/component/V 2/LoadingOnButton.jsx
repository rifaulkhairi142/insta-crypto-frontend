import React from "react";

const LoadingOnButton = ({className}) => {
  return (
    <div className={`loading-on-btn ${className}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default LoadingOnButton;
