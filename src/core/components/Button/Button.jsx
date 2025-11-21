import React from "react";
import "./Button.css";

const Button = ({ 
  children, 
  variant = "primary", 
  onClick, 
  disabled = false, 
  fullWidth = false 
}) => {
  return (
    <button
      className={`btn btn-${variant} ${fullWidth ? "btn-full" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;