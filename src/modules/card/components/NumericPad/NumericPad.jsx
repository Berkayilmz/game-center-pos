import React, { useState, useEffect } from "react";
import "./NumericPad.css";

const NumericPad = ({ onChange }) => {
  const [value, setValue] = useState("0");

  const handleClick = (num) => {
    setValue((prev) => {
      if (prev === "0" && num !== ",") return num;
      if (prev.length >= 8) return prev;
      return prev + num;
    });
  };

  const handleBackspace = () => {
    setValue((prev) => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  };

  const handleClearAll = () => setValue("0");

  const handleQuickSelect = (amount) => {
    setValue(String(amount));
  };

  useEffect(() => {
    if (onChange) onChange(value);
  }, [value, onChange]);

  const buttons = [
    "1", "2", "3",
    "4", "5", "6",
    "7", "8", "9",
    "0", ",", "←"
  ];

  const quickAmounts = [ 200, 300, 500, 1000];

  return (
    <div className="numeric-pad">
      <div className="display">{value}</div>

      <div className="pad-grid">
        {buttons.map((num) => (
          <button
            key={num}
            className={`pad-btn ${num === "←" ? "backspace" : ""}`}
            onClick={() =>
              num === "←" ? handleBackspace() : handleClick(num)
            }
          >
            {num}
          </button>
        ))}
        <button className="pad-btn clear" onClick={handleClearAll}>
          Sil
        </button>
      </div>

      {/* 🔹 Hızlı tutarlar bölümü */}
      <div className="quick-amounts">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            className="quick-btn"
            onClick={() => handleQuickSelect(amount)}
          >
            {amount} ₺
          </button>
        ))}
      </div>
    </div>
  );
};

export default NumericPad;