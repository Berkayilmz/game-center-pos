import React from "react";
import "./Col.css";

const Col = ({ children, width = "100%", grow = false }) => {
  return (
    <div
      className="col"
      style={{
        flex: grow ? "1" : "0 0 auto",
        width,
      }}
    >
      {children}
    </div>
  );
};

export default Col;