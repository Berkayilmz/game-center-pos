import React from "react";
import "./Input.css";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  disabled = false,
  fullWidth = true,
}) => {
  return (
    <div className={`input-group ${fullWidth ? "full" : ""}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        className="input-field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;