import React from "react";
import "./Row.css";

const Row = ({ children, gap = "16px", align = "flex-start" }) => {
  return (
    <div className="row" style={{ gap, alignItems: align }}>
      {children}
    </div>
  );
};

export default Row;