import React from "react";

const LoadingSpinner = (props: { className?: string }) => {
  return (
    <div className={`lds-roller ${props.className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingSpinner;
