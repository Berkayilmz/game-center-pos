import React from "react";
import "./CardContainer.css";

const CardContainer = ({ title, children, width = "100%" }) => {
  return (
    <div className="card-container" style={{ width }}>
      {title && <div className="card-header">{title}</div>}
      {children}
    </div>
  );
};

export default CardContainer;