import React from "react";

const Loading = ({className}) => {
  return (
    <div className={`loading ${className}`}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default Loading;
