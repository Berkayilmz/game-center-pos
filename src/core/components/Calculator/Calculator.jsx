import React, { useState } from "react";
import Modal from "../Modal/Modal";
import "./Calculator.css";

const Calculator = ({ open, onClose }) => {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [newNumber, setNewNumber] = useState(true);

  const handleNumber = (num) => {
    if (newNumber) {
      setDisplay(num.toString());
      setNewNumber(false);
    } else {
      setDisplay(display === "0" ? num.toString() : display + num);
    }
  };

  const handleOperator = (op) => {
    setExpression(display + " " + op + " ");
    setNewNumber(true);
  };

  const handleEqual = () => {
    try {
      // Note: eval is generally unsafe, but for a simple calculator with controlled input it's acceptable.
      // For a production app with more complex needs, a parser would be better.
      // We'll replace 'x' with '*' for evaluation if we use 'x' for display.
      const result = eval((expression + display).replace(/x/g, "*"));
      setDisplay(result.toString());
      setExpression("");
      setNewNumber(true);
    } catch (error) {
      setDisplay("Error");
      setExpression("");
      setNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setNewNumber(true);
  };

  const handleDecimal = () => {
    if (newNumber) {
      setDisplay("0.");
      setNewNumber(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  return (
    <Modal open={open} title="Hesap Makinesi" onClose={onClose}>
      <div className="calculator">
        <div className="calculator-display">
          <div className="calculator-expression">{expression}</div>
          <div className="calculator-current">{display}</div>
        </div>
        <div className="calculator-keypad">
          <button className="calc-btn clear" onClick={handleClear}>C</button>
          <button className="calc-btn operator" onClick={() => handleOperator("/")}>/</button>
          <button className="calc-btn operator" onClick={() => handleOperator("*")}>x</button>
          <button className="calc-btn operator" onClick={() => handleOperator("-")}>-</button>

          <button className="calc-btn" onClick={() => handleNumber(7)}>7</button>
          <button className="calc-btn" onClick={() => handleNumber(8)}>8</button>
          <button className="calc-btn" onClick={() => handleNumber(9)}>9</button>
          <button className="calc-btn operator" onClick={() => handleOperator("+")}>+</button>

          <button className="calc-btn" onClick={() => handleNumber(4)}>4</button>
          <button className="calc-btn" onClick={() => handleNumber(5)}>5</button>
          <button className="calc-btn" onClick={() => handleNumber(6)}>6</button>
          <button className="calc-btn equals" onClick={handleEqual}>=</button>

          <button className="calc-btn" onClick={() => handleNumber(1)}>1</button>
          <button className="calc-btn" onClick={() => handleNumber(2)}>2</button>
          <button className="calc-btn" onClick={() => handleNumber(3)}>3</button>
          
          <button className="calc-btn zero" onClick={() => handleNumber(0)}>0</button>
          <button className="calc-btn" onClick={handleDecimal}>.</button>
        </div>
      </div>
    </Modal>
  );
};

export default Calculator;
