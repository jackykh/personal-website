import React from "react";
import classes from "@/styles/LoadingSpinner.module.css";

const LoadingSpinner = (props: { className?: string }) => {
  return (
    <div className={`${classes["lds-roller"]} ${props.className}`}>
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
